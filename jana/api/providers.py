# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import time

import frappe
from frappe import _

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
	"openrouter": [
		"anthropic/claude-sonnet-4",
		"anthropic/claude-haiku-4.5",
		"openai/gpt-4o",
		"openai/gpt-4o-mini",
		"google/gemini-2.0-flash-exp",
		"meta-llama/llama-3.3-70b-instruct",
		"mistralai/mistral-large-latest",
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


# Cheapest / fastest models per provider type for health checks
_TEST_MODELS = {
	"openai": "gpt-4o-mini",
	"anthropic": "claude-haiku-4-5-20251001",
	"google": "gemini-2.0-flash",
	"openrouter": "openai/gpt-4o-mini",
	"ollama": "llama3",
	"vllm": None,
	"custom": None,
}


@frappe.whitelist()
def test_connection(provider_name: str) -> dict:
	"""Test connectivity to an LLM provider.

	Admin-only. Sends a minimal completion request and measures latency.
	Returns ``{success, message, latency_ms, model}``.
	"""
	from jana.permissions import _is_jana_admin

	if not _is_jana_admin():
		frappe.throw(_("Only administrators can test provider connections"))

	if not provider_name:
		frappe.throw(_("Provider name is required"))

	if not frappe.db.exists("Jana Provider", provider_name):
		frappe.throw(_("Provider {0} does not exist").format(provider_name))

	provider_doc = frappe.get_doc("Jana Provider", provider_name)
	test_model = _TEST_MODELS.get(provider_doc.provider_type)

	if not test_model:
		# For vllm/custom, try the first available model
		if provider_doc.available_models:
			test_model = provider_doc.available_models.split(",")[0].strip()
		if not test_model:
			return {
				"success": False,
				"message": _("No test model available for provider type {0}").format(
					provider_doc.provider_type
				),
				"latency_ms": 0,
				"model": None,
			}

	try:
		from jana.services.llm.factory import get_provider

		provider = get_provider(provider_name)

		start = time.monotonic()
		result = provider.complete(
			messages=[{"role": "user", "content": "Say OK"}],
			model=test_model,
			max_tokens=5,
			temperature=0,
		)
		latency_ms = round((time.monotonic() - start) * 1000)

		return {
			"success": True,
			"message": _("Connection successful"),
			"latency_ms": latency_ms,
			"model": result.get("model", test_model),
		}

	except Exception as e:
		frappe.log_error(title="Jana Provider Health Check Failed")
		return {
			"success": False,
			"message": str(e),
			"latency_ms": 0,
			"model": test_model,
		}
