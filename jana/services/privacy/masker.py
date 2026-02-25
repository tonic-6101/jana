# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import re
from collections import defaultdict

import frappe

from jana.services.privacy.detector import (
	_PERSONAL_LINK_DOCTYPES,
	classify_field,
	find_pii_in_text,
)

LOCAL_PROVIDER_TYPES: frozenset[str] = frozenset(["ollama", "vllm"])


class PIIMasker:
	"""Per-request PII masking layer for LLM message preparation.

	Instantiate once per send_message() call. The mapping table
	(token -> real value) is held exclusively in memory and is
	garbage-collected when the request ends.
	"""

	def __init__(self, provider_doc):
		self._mapping: dict[str, str] = {}
		self._reverse_mapping: dict[str, str] = {}
		self._counters: dict[str, int] = defaultdict(int)
		self._stream_buffer: str = ""
		self.enabled: bool = self._resolve_enabled(provider_doc)

	def _resolve_enabled(self, provider_doc) -> bool:
		"""Determine whether masking is active for this provider.

		Resolution: provider override -> global toggle -> local exemption.
		"""
		try:
			global_on = bool(frappe.db.get_single_value("Jana Settings", "mask_pii") or 0)
			override = getattr(provider_doc, "mask_pii_override", "Global Default") or "Global Default"
			provider_type = provider_doc.provider_type

			if override == "Always On":
				return True
			if override == "Always Off":
				return False

			if not global_on:
				return False

			# Global is ON: local providers exempt unless overridden
			if provider_type in LOCAL_PROVIDER_TYPES:
				return False

			return True
		except Exception:
			return False

	def _make_token(self, category: str) -> str:
		self._counters[category] += 1
		return f"[{category}_{self._counters[category]}]"

	def _get_or_create_token(self, value: str, category: str) -> str:
		"""Return an existing token for value, or create a new one.

		Uses O(1) reverse mapping lookup instead of iterating all entries.
		"""
		existing = self._reverse_mapping.get(value)
		if existing:
			return existing
		token = self._make_token(category)
		self._mapping[token] = value
		self._reverse_mapping[value] = token
		return token

	def mask_context_fields(self, context: dict) -> dict:
		"""Mask PII values in the structured context dict.

		Called BEFORE format_context_for_prompt(), while fieldtype
		metadata is still available.

		Detection order per field:
		1. Explicit metadata / heuristic via classify_field().
		2. Link-field fallback: if the field is a Link to a personal
		   DocType, apply regex to the *value* (catches emails in User
		   links, etc.).  Plain document IDs pass through unmasked.
		"""
		if not context or not self.enabled:
			return context

		for fieldname, info in context.get("fields", {}).items():
			fieldtype = info.get("fieldtype", "")
			options = info.get("options")
			value = info.get("value", "")

			if not value:
				continue

			category = classify_field(fieldtype, options or None, fieldname=fieldname)
			if category:
				token = self._get_or_create_token(value, category)
				info["value"] = token
				continue

			# Fallback for Link fields pointing to personal DocTypes.
			# Link values are document IDs (e.g. "CUST-00015") — not PII.
			# But some contain actual PII:
			#   - User links are email addresses
			#   - Customer naming_rule="Customer Name" → value is the name
			# Apply regex to catch emails/phones/IBANs in the value.
			if fieldtype == "Link" and options in _PERSONAL_LINK_DOCTYPES:
				spans = find_pii_in_text(str(value))
				if spans:
					token = self._get_or_create_token(value, spans[0].category)
					info["value"] = token

		return context

	def _replace_known_values(self, text: str) -> str:
		"""Replace previously-seen PII values with their existing tokens.

		This is the cross-referencing step: if ``mask_context_fields()``
		already mapped "Fatima Al-Rashid" → ``[PERSON_1]``, and the same
		name appears in a user message, it gets the same token.

		Processes longest values first to avoid partial-match problems
		(e.g. "John Smith" is replaced before "John").

		This follows the Microsoft Presidio pattern of maintaining a
		known-entities registry for consistent pseudonymisation across
		all text segments within a single processing request.
		"""
		if not self._reverse_mapping:
			return text

		# Sort by value length (longest first) to prevent partial matches.
		value_to_token = sorted(
			self._reverse_mapping.items(),
			key=lambda pair: len(pair[0]),
			reverse=True,
		)

		for value, token in value_to_token:
			if value in text:
				text = text.replace(value, token)

		return text

	def mask_text(self, text: str) -> str:
		"""Replace PII in free text with tokens.

		Two-phase approach:
		1. **Known-value pass** — replace values already seen during
		   structured field masking.  Ensures the same real value always
		   maps to the same token (GDPR-compliant consistency).
		2. **Regex pass** — detect any remaining PII (emails, phones,
		   IBANs) that wasn't seen in structured fields.
		"""
		if not text or not self.enabled:
			return text

		# Phase 1: cross-reference with known values from context fields.
		text = self._replace_known_values(text)

		# Phase 2: regex-based detection for new PII.
		spans = find_pii_in_text(text)
		if not spans:
			return text

		for span in reversed(spans):
			token = self._get_or_create_token(span.value, span.category)
			text = text[: span.start] + token + text[span.end :]

		return text

	def mask_messages(self, messages: list[dict]) -> list[dict]:
		"""Apply free-text masking to user, assistant, and tool messages.

		Skips system messages (already handled by mask_context_fields).
		"""
		if not self.enabled:
			return messages

		result = []
		for msg in messages:
			if msg.get("role") in ("user", "assistant", "tool"):
				result.append({**msg, "content": self.mask_text(msg.get("content", ""))})
			else:
				result.append(msg)
		return result

	def unmask(self, text: str) -> str:
		"""Restore real values in the LLM response."""
		if not text or not self.enabled or not self._mapping:
			return text

		escaped_tokens = [re.escape(token) for token in self._mapping]
		pattern = re.compile("|".join(escaped_tokens), re.IGNORECASE)

		def replace_token(match: re.Match) -> str:
			matched = match.group().upper()
			return self._mapping.get(matched, match.group())

		return pattern.sub(replace_token, text)

	def unmask_chunk(self, chunk: str) -> str:
		"""Unmask PII tokens in a streaming chunk, buffering partial tokens.

		When ``[`` appears without a closing ``]``, text from ``[`` onward
		is held back until the next chunk completes the token.
		"""
		if not self.enabled or not self._mapping:
			return chunk

		self._stream_buffer += chunk

		last_open = self._stream_buffer.rfind("[")
		if last_open != -1 and "]" not in self._stream_buffer[last_open:]:
			processable = self._stream_buffer[:last_open]
			self._stream_buffer = self._stream_buffer[last_open:]
		else:
			processable = self._stream_buffer
			self._stream_buffer = ""

		return self.unmask(processable) if processable else ""

	def flush_buffer(self) -> str:
		"""Flush any remaining buffer content at stream end."""
		if not self._stream_buffer:
			return ""
		remaining = self._stream_buffer
		self._stream_buffer = ""
		if self.enabled and self._mapping:
			return self.unmask(remaining)
		return remaining
