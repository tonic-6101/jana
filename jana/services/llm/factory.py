# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _

from jana.services.llm.base import LLMProvider
from jana.services.llm.ollama_provider import OllamaProvider
from jana.services.llm.openai_provider import OpenAIProvider

PROVIDER_MAP = {
	"openai": OpenAIProvider,
	"anthropic": OpenAIProvider,  # Anthropic supports OpenAI-compatible API
	"google": OpenAIProvider,  # Gemini supports OpenAI-compatible API
	"ollama": OllamaProvider,
	"vllm": OpenAIProvider,  # vLLM serves OpenAI-compatible API
	"custom": OpenAIProvider,  # Custom endpoints assumed OpenAI-compatible
}


def get_provider(provider_name: str = None) -> LLMProvider:
	"""Get an LLM provider instance.

	Args:
		provider_name: Name of the Jana Provider document.
			If None, uses the default provider from Jana Settings.

	Returns:
		LLMProvider instance ready for use.
	"""
	if not provider_name:
		provider_name = frappe.db.get_single_value("Jana Settings", "default_provider")

	if not provider_name:
		frappe.throw(
			_("No AI provider configured. Please set up a provider in Jana Settings.")
		)

	provider_doc = frappe.get_doc("Jana Provider", provider_name)

	if not provider_doc.enabled:
		frappe.throw(
			_("Provider {0} is disabled. Please enable it or choose a different provider.").format(
				provider_name
			)
		)

	provider_class = PROVIDER_MAP.get(provider_doc.provider_type)
	if not provider_class:
		frappe.throw(
			_("Unsupported provider type: {0}").format(provider_doc.provider_type)
		)

	return provider_class(provider_doc)
