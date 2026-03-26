# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""API endpoints for provider management and connectivity testing."""

import json
import time

import frappe
from frappe import _

from jana.permissions import _is_jana_admin

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
		custom_models = [m.strip() for m in provider.available_models.split(",") if m.strip()]
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

	# For Google OAuth providers, verify the user has connected before attempting
	if provider_doc.auth_method == "OAuth" and provider_doc.provider_type == "google":
		if not provider_doc.connected_app:
			return {
				"success": False,
				"message": _("No Connected App configured for this provider."),
				"latency_ms": 0,
				"model": test_model,
			}
		app_doc = frappe.get_doc("Connected App", provider_doc.connected_app)
		token_cache = app_doc.get_token_cache(frappe.session.user)
		if not token_cache:
			return {
				"success": False,
				"message": _("Google account not connected. Connect in My Keys first."),
				"latency_ms": 0,
				"model": test_model,
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

	except Exception:
		frappe.log_error(title="Jana Provider Health Check Failed")
		return {
			"success": False,
			"message": _("Connection failed. Check the API key and endpoint URL."),
			"latency_ms": 0,
			"model": test_model,
		}


# -------------------------------------------------------------------
# Provider fields returned to the SPA
# -------------------------------------------------------------------

_PROVIDER_FIELDS = [
	"name",
	"provider_name",
	"provider_type",
	"enabled",
	"is_default",
	"auth_method",
	"api_base_url",
	"available_models",
	"mask_pii_override",
	"connected_app",
	"openrouter_callback_url",
]


@frappe.whitelist()
def list_providers() -> list:
	"""Return all providers with full detail for the Settings page."""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can manage providers"))

	return frappe.get_all(
		"Jana Provider",
		fields=_PROVIDER_FIELDS,
		limit_page_length=0,
		order_by="provider_name asc",
	)


@frappe.whitelist()
def get_provider(provider_name: str) -> dict:
	"""Return full provider details including the API key status."""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can view provider details"))

	doc = frappe.get_doc("Jana Provider", provider_name)
	result = {f: getattr(doc, f, None) for f in _PROVIDER_FIELDS}
	result["has_api_key"] = bool(doc.get_password("api_key", raise_exception=False))
	return result


@frappe.whitelist()
def create_provider(data: str) -> dict:
	"""Create a new provider.

	Only Jana Admin or System Manager can create providers.
	"""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can create providers"))

	if isinstance(data, str):
		data = json.loads(data)

	doc = frappe.new_doc("Jana Provider")
	doc.provider_name = (data.get("provider_name") or "").strip()
	doc.provider_type = data.get("provider_type") or "custom"
	doc.enabled = int(data.get("enabled", 1))
	doc.is_default = int(data.get("is_default", 0))
	doc.auth_method = data.get("auth_method") or "API Key"
	doc.api_base_url = (data.get("api_base_url") or "").strip() or None
	doc.available_models = (data.get("available_models") or "").strip() or None
	doc.mask_pii_override = data.get("mask_pii_override") or "Global Default"

	if data.get("api_key"):
		doc.api_key = data["api_key"]

	if data.get("connected_app"):
		doc.connected_app = data["connected_app"]

	doc.insert(ignore_permissions=True)

	result = {f: getattr(doc, f, None) for f in _PROVIDER_FIELDS}
	return result


@frappe.whitelist()
def save_provider(provider_name: str, data: str) -> dict:
	"""Update an existing provider.

	Only Jana Admin or System Manager can update providers.
	"""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can update providers"))

	if not provider_name:
		frappe.throw(_("Provider name is required"))

	if isinstance(data, str):
		data = json.loads(data)

	doc = frappe.get_doc("Jana Provider", provider_name)

	# Update fields
	for field in ("provider_type", "auth_method", "mask_pii_override"):
		if field in data:
			setattr(doc, field, data[field])

	for field in ("api_base_url", "available_models"):
		if field in data:
			val = data[field]
			setattr(doc, field, (val or "").strip() or None)

	if "enabled" in data:
		doc.enabled = int(data["enabled"])
	if "is_default" in data:
		doc.is_default = int(data["is_default"])

	if data.get("api_key"):
		doc.api_key = data["api_key"]

	if "connected_app" in data:
		doc.connected_app = data["connected_app"] or None

	doc.save(ignore_permissions=True)

	result = {f: getattr(doc, f, None) for f in _PROVIDER_FIELDS}
	return result


@frappe.whitelist()
def delete_provider(provider_name: str) -> dict:
	"""Delete a provider.

	Only Jana Admin or System Manager can delete providers.
	The DocType's ``on_trash`` hook prevents deletion if
	agents reference the provider.
	"""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can delete providers"))

	if not provider_name:
		frappe.throw(_("Provider name is required"))

	frappe.delete_doc("Jana Provider", provider_name, ignore_permissions=True)

	return {"deleted": True, "provider_name": provider_name}
