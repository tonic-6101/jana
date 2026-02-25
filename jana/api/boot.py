# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe.utils.password import get_decrypted_password


def extend_bootinfo(bootinfo):
	"""Inject Jana configuration into frappe.boot for client-side access."""
	jana_config = {
		"enabled": False,
		"default_agent": "General Assistant",
		"streaming": True,
		"oauth_providers": [],
		"terms_accepted": False,
		"terms_version": "1.0",
		"capabilities": {
			"chat": True,
			"read_documents": True,
			"draft_content": False,
			"create_documents": False,
			"navigate": False,
			"report_queries": False,
			"modify_documents": False,
		},
	}

	try:
		from jana.services.terms import CURRENT_TERMS_VERSION, has_accepted_terms

		jana_config["terms_accepted"] = has_accepted_terms(frappe.session.user)
		jana_config["terms_version"] = CURRENT_TERMS_VERSION

		settings = frappe.get_single("Jana Settings")
		if settings.default_provider:
			provider = frappe.get_doc("Jana Provider", settings.default_provider)

			# Check system-level API key
			api_key = get_decrypted_password(
				"Jana Provider", provider.name, "api_key", raise_exception=False
			)

			# Check per-user key
			user_key = frappe.db.get_value(
				"Jana User Key",
				{
					"user": frappe.session.user,
					"provider": provider.name,
					"enabled": 1,
				},
				"name",
			)

			if provider.enabled and (api_key or user_key):
				jana_config["enabled"] = True

		# Gather OAuth providers for "Connect" buttons
		oauth_providers = frappe.get_all(
			"Jana Provider",
			filters={"auth_method": "OAuth", "enabled": 1},
			fields=["name", "provider_name", "provider_type", "connected_app"],
		)
		for p in oauth_providers:
			# Check OAuth connection via Connected App token cache
			connected = False
			if p.connected_app:
				try:
					app_doc = frappe.get_doc("Connected App", p.connected_app)
					token = app_doc.get_user_token(frappe.session.user)
					connected = bool(token)
				except Exception:
					pass

			jana_config["oauth_providers"].append({
				"name": p.name,
				"provider_name": p.provider_name,
				"provider_type": p.provider_type,
				"connected": connected,
			})

			# If this OAuth provider is the default and user is connected, enable
			if (
				connected
				and settings.default_provider
				and p.name == settings.default_provider
			):
				jana_config["enabled"] = True

		jana_config["streaming"] = bool(settings.enable_streaming)
		jana_config["capabilities"] = {
			"chat": bool(settings.enable_chat),
			"read_documents": bool(settings.enable_read_documents),
			"draft_content": bool(settings.enable_draft_content),
			"create_documents": bool(settings.enable_create_documents),
			"navigate": bool(settings.enable_navigate),
			"report_queries": bool(settings.enable_report_queries),
			"modify_documents": bool(settings.enable_modify_documents),
		}
	except Exception:
		# Settings DocType may not exist yet during installation
		pass

	bootinfo.jana = jana_config


@frappe.whitelist()
def get_widget_config() -> dict:
	"""Return Jana widget configuration for non-Desk pages (SPAs, www).

	Same logic as extend_bootinfo but callable as a standalone API.
	"""
	jana_config = {
		"enabled": False,
		"default_agent": "General Assistant",
		"streaming": True,
		"oauth_providers": [],
		"terms_accepted": False,
		"terms_version": "1.0",
		"capabilities": {
			"chat": True,
			"read_documents": True,
			"draft_content": False,
			"create_documents": False,
			"navigate": False,
			"report_queries": False,
			"modify_documents": False,
		},
	}

	try:
		from jana.services.terms import CURRENT_TERMS_VERSION, has_accepted_terms

		jana_config["terms_accepted"] = has_accepted_terms(frappe.session.user)
		jana_config["terms_version"] = CURRENT_TERMS_VERSION

		settings = frappe.get_single("Jana Settings")
		if settings.default_provider:
			provider = frappe.get_doc("Jana Provider", settings.default_provider)

			api_key = get_decrypted_password(
				"Jana Provider", provider.name, "api_key", raise_exception=False
			)

			user_key = frappe.db.get_value(
				"Jana User Key",
				{
					"user": frappe.session.user,
					"provider": provider.name,
					"enabled": 1,
				},
				"name",
			)

			if provider.enabled and (api_key or user_key):
				jana_config["enabled"] = True

		oauth_providers = frappe.get_all(
			"Jana Provider",
			filters={"auth_method": "OAuth", "enabled": 1},
			fields=["name", "provider_name", "provider_type", "connected_app"],
		)
		for p in oauth_providers:
			connected = False
			if p.connected_app:
				try:
					app_doc = frappe.get_doc("Connected App", p.connected_app)
					token = app_doc.get_user_token(frappe.session.user)
					connected = bool(token)
				except Exception:
					pass

			jana_config["oauth_providers"].append({
				"name": p.name,
				"provider_name": p.provider_name,
				"provider_type": p.provider_type,
				"connected": connected,
			})

			if (
				connected
				and settings.default_provider
				and p.name == settings.default_provider
			):
				jana_config["enabled"] = True

		jana_config["streaming"] = bool(settings.enable_streaming)
		jana_config["capabilities"] = {
			"chat": bool(settings.enable_chat),
			"read_documents": bool(settings.enable_read_documents),
			"draft_content": bool(settings.enable_draft_content),
			"create_documents": bool(settings.enable_create_documents),
			"navigate": bool(settings.enable_navigate),
			"report_queries": bool(settings.enable_report_queries),
			"modify_documents": bool(settings.enable_modify_documents),
		}
	except Exception:
		pass

	return jana_config


@frappe.whitelist()
def get_widget_bootstrap() -> dict:
	"""Return the Jana widget bundle URLs for dynamic loading.

	Used by jana-widget-loader.js to inject the widget into any page.
	"""
	from frappe.utils import get_assets_json

	assets = get_assets_json()
	return {
		"js_url": assets.get("jana.bundle.ts", ""),
		"css_url": assets.get("jana.bundle.css", ""),
	}
