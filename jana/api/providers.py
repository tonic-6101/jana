# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe

KNOWN_MODELS = {
	"anthropic": [
		"claude-sonnet-4-20250514",
		"claude-haiku-4-5-20251001",
		"claude-opus-4-20250514",
	],
	"openai": [
		"gpt-4o",
		"gpt-4o-mini",
		"gpt-4-turbo",
		"gpt-3.5-turbo",
		"o1",
		"o1-mini",
	],
	"google": [
		"gemini-2.0-flash",
		"gemini-1.5-pro",
		"gemini-1.5-flash",
	],
	"ollama": [
		"llama3.1",
		"llama3",
		"mistral",
		"codellama",
		"gemma2",
		"phi3",
		"qwen2",
	],
	"vllm": [],
	"custom": [],
}


@frappe.whitelist()
def get_models_for_provider(provider_name: str) -> list:
	"""Return available models for a given provider.

	Merges known defaults with any models the user listed
	in the provider's available_models field.
	"""
	if not provider_name:
		return []

	provider = frappe.get_doc("Jana Provider", provider_name)
	provider_type = provider.provider_type

	# Start with known defaults
	models = list(KNOWN_MODELS.get(provider_type, []))

	# Merge user-defined models from the provider doc
	if provider.available_models:
		custom_models = [
			m.strip() for m in provider.available_models.split(",") if m.strip()
		]
		for m in custom_models:
			if m not in models:
				models.append(m)

	return models
