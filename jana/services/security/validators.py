# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Input validation and error sanitisation for the chat API.

Provides:
- Message length validation (Rule S6)
- Navigation URL validation (Rule S4)
- Error message sanitisation (Rule S7)
"""

import re
from urllib.parse import urlparse

import frappe
from frappe import _

# Dangerous URI schemes that must never be navigated to
_BLOCKED_URL_SCHEMES = ("javascript", "data", "vbscript", "blob")

# Patterns that should never appear in user-facing error messages
_SENSITIVE_PATTERNS = [
	re.compile(r"/workspace/frappe-bench/"),
	re.compile(r"/home/\w+/"),
	re.compile(r"Traceback \(most recent call last\)"),
	re.compile(r"File \".*\\.py\""),
	re.compile(r"sk-[a-zA-Z0-9]{20,}"),  # OpenAI API key pattern
	re.compile(r"key-[a-zA-Z0-9]{20,}"),  # Generic API key pattern
]


def validate_message_length(content: str, max_length: int = 0) -> None:
	"""Reject messages that exceed the configured length limit.

	Args:
		content: The user message text.
		max_length: Max characters. If 0, reads from Jana Settings.

	Raises:
		frappe.ValidationError: If the message exceeds the limit.
	"""
	if not max_length:
		from jana.services.guardrails.prompt_builder import get_guardrail_settings

		max_length = get_guardrail_settings()["max_message_length"]

	if max_length and len(content) > max_length:
		frappe.throw(
			_("Message is too long ({0} characters). Maximum is {1} characters.").format(
				len(content), max_length
			)
		)


def validate_navigation_url(url: str) -> str:
	"""Validate that a navigation URL is safe (same-origin, no dangerous schemes).

	Args:
		url: The URL returned by the LLM for navigation.

	Returns:
		The validated URL if safe.

	Raises:
		frappe.ValidationError: If the URL is unsafe.
	"""
	if not url or not url.strip():
		frappe.throw(_("Navigation URL is empty"))

	url = url.strip()
	url_lower = url.lower()

	# Block dangerous schemes
	for scheme in _BLOCKED_URL_SCHEMES:
		if url_lower.startswith(f"{scheme}:"):
			frappe.throw(_("Invalid navigation URL"))

	parsed = urlparse(url)

	# Allow relative paths (same-origin)
	if not parsed.scheme and not parsed.netloc:
		return url

	# Allow same-origin absolute URLs
	site_url = frappe.utils.get_url()
	if url.startswith(site_url):
		return url

	# Block all other URLs (external domains)
	frappe.throw(_("Navigation is restricted to this site"))


def sanitise_error_for_user(error_message: str, fallback: str = "") -> str:
	"""Strip sensitive information from an error message before showing to users.

	Args:
		error_message: The raw error string.
		fallback: Message to use if the original contains sensitive content.

	Returns:
		A sanitised error string.
	"""
	if not error_message:
		return fallback or _("An error occurred")

	for pattern in _SENSITIVE_PATTERNS:
		if pattern.search(error_message):
			return fallback or _("An error occurred")

	return error_message
