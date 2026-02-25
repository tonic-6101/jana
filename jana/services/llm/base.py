# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

from abc import ABC, abstractmethod

import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password


class LLMProvider(ABC):
	"""Base class for LLM provider implementations."""

	def __init__(self, provider_doc, user: str = None):
		self.provider_doc = provider_doc
		self.provider_name = provider_doc.provider_name
		self.provider_type = provider_doc.provider_type
		self.api_base_url = provider_doc.api_base_url
		self.auth_method = getattr(provider_doc, "auth_method", "API Key")
		self.user = user or frappe.session.user

	def _get_api_key(self) -> str:
		"""Resolve API key: user key → system key.

		Checks the per-user Jana User Key first, then falls back
		to the system-level key on the provider document.

		Raises:
			frappe.ValidationError: If no key is found.
		"""
		user_key = self._get_user_key()
		if user_key:
			return user_key

		system_key = (
			get_decrypted_password(
				"Jana Provider",
				self.provider_doc.name,
				"api_key",
				raise_exception=False,
			)
			or ""
		)

		if not system_key:
			frappe.throw(
				_(
					"No API key configured for provider {0}. "
					"Add a key in Jana Provider settings or your personal Jana User Key."
				).format(self.provider_name)
			)

		return system_key

	def _get_user_key(self) -> str:
		"""Fetch a per-user API key from Jana User Key."""
		key_name = frappe.db.get_value(
			"Jana User Key",
			{"user": self.user, "provider": self.provider_doc.name, "enabled": 1},
			"name",
		)
		if not key_name:
			return ""
		return get_decrypted_password("Jana User Key", key_name, "api_key", raise_exception=False) or ""

	def _get_oauth_token(self) -> str:
		"""Fetch an OAuth token from Frappe's Token Cache (for Google OAuth)."""
		connected_app = getattr(self.provider_doc, "connected_app", None)
		if not connected_app:
			return ""
		try:
			app_doc = frappe.get_doc("Connected App", connected_app)
			token = app_doc.get_user_token(self.user)
			return token.get_password("access_token") if token else ""
		except Exception:
			return ""

	@abstractmethod
	def complete(
		self,
		messages: list,
		model: str = None,
		temperature: float = 0.7,
		max_tokens: int = None,
		tools: list = None,
	) -> dict:
		"""Send messages to the LLM and return a complete response.

		Returns:
			dict with keys: content, model, tokens_used, tool_calls (optional)
		"""
		raise NotImplementedError

	@abstractmethod
	def stream(
		self,
		messages: list,
		model: str = None,
		temperature: float = 0.7,
		max_tokens: int = None,
		tools: list = None,
	):
		"""Send messages to the LLM and yield streaming response chunks.

		Yields:
			dict with keys: content (partial), done (bool)
		"""
		raise NotImplementedError
