# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

from abc import ABC, abstractmethod

import frappe
from frappe.utils.password import get_decrypted_password


class LLMProvider(ABC):
	"""Base class for LLM provider implementations."""

	def __init__(self, provider_doc):
		self.provider_doc = provider_doc
		self.provider_name = provider_doc.provider_name
		self.provider_type = provider_doc.provider_type
		self.api_base_url = provider_doc.api_base_url

	def _get_api_key(self) -> str:
		"""Read the decrypted API key from the provider document."""
		return get_decrypted_password(
			"Jana Provider", self.provider_doc.name, "api_key"
		) or ""

	@abstractmethod
	def complete(self, messages: list, model: str = None, temperature: float = 0.7,
				max_tokens: int = None, tools: list = None) -> dict:
		"""Send messages to the LLM and return a complete response.

		Returns:
			dict with keys: content, model, tokens_used, tool_calls (optional)
		"""
		raise NotImplementedError

	@abstractmethod
	def stream(self, messages: list, model: str = None, temperature: float = 0.7,
			  max_tokens: int = None, tools: list = None):
		"""Send messages to the LLM and yield streaming response chunks.

		Yields:
			dict with keys: content (partial), done (bool)
		"""
		raise NotImplementedError
