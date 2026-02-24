# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _

from jana.services.llm.base import LLMProvider
from jana.services.llm.anthropic_provider import AnthropicProvider
from jana.services.llm.ollama_provider import OllamaProvider
from jana.services.llm.openai_provider import OpenAIProvider

PROVIDER_MAP = {
	"openai": OpenAIProvider,
	"anthropic": AnthropicProvider,
	"google": OpenAIProvider,  # Gemini supports OpenAI-compatible API
	"openrouter": OpenAIProvider,  # OpenRouter serves OpenAI-compatible API
	"ollama": OllamaProvider,
	"vllm": OpenAIProvider,  # vLLM serves OpenAI-compatible API
	"custom": OpenAIProvider,  # Custom endpoints assumed OpenAI-compatible
}


def get_provider(provider_name: str = None, user: str = None) -> LLMProvider:
	"""Get an LLM provider instance.

	Args:
		provider_name: Name of the Jana Provider document.
			If None, uses the default provider from Jana Settings.
		user: User for per-user credential resolution.
			If None, uses the current session user.

	Returns:
		LLMProvider instance ready for use.
	"""
	if not provider_name:
		from jana.utils import get_jana_settings

		provider_name = get_jana_settings().get("default_provider")

	if not provider_name:
		frappe.throw(
			_("No AI provider configured. Please set up a provider in Jana Settings.")
		)

	from jana.utils import get_cached_provider

	provider_doc = get_cached_provider(provider_name)

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

	return provider_class(provider_doc, user=user)
