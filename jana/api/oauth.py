# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
import requests
from frappe import _
from frappe.utils import now_datetime


@frappe.whitelist()
def initiate_openrouter_oauth(provider_name: str) -> dict:
	"""Start the OpenRouter OAuth flow.

	Returns the auth URL the frontend should redirect to.
	"""
	provider = frappe.get_doc("Jana Provider", provider_name)

	if provider.provider_type != "openrouter":
		frappe.throw(_("This endpoint is only for OpenRouter providers"))
	if provider.auth_method != "OAuth":
		frappe.throw(_("Provider is not configured for OAuth"))

	callback_url = f"{frappe.utils.get_url()}/api/method/jana.api.oauth.openrouter_callback"

	auth_url = f"https://openrouter.ai/auth?callback_url={callback_url}"

	return {"auth_url": auth_url}


@frappe.whitelist(allow_guest=True)
def openrouter_callback(code: str = None):
	"""Handle the OpenRouter OAuth callback.

	OpenRouter redirects here with a ?code= param.
	We exchange it for a permanent API key.
	"""
	if not code:
		frappe.throw(_("Missing authorization code"))

	# Must have a logged-in user
	if frappe.session.user == "Guest":
		frappe.throw(_("You must be logged in to connect your OpenRouter account"))

	# Exchange the code for a permanent API key
	try:
		resp = requests.post(
			"https://openrouter.ai/api/v1/auth/keys",
			json={"code": code},
			headers={"Content-Type": "application/json"},
			timeout=30,
		)
		resp.raise_for_status()
		data = resp.json()
	except requests.exceptions.RequestException as e:
		frappe.log_error(f"OpenRouter OAuth key exchange failed: {e}")
		frappe.throw(_("Failed to exchange authorization code with OpenRouter"))

	api_key = data.get("key")
	if not api_key:
		frappe.throw(_("OpenRouter did not return an API key"))

	# Find the OpenRouter provider (there should be one with OAuth enabled)
	provider_name = frappe.db.get_value(
		"Jana Provider",
		{"provider_type": "openrouter", "auth_method": "OAuth", "enabled": 1},
		"name",
	)

	if not provider_name:
		frappe.throw(_("No active OpenRouter OAuth provider found"))

	# Create or update the user's key
	existing = frappe.db.get_value(
		"Jana User Key",
		{"user": frappe.session.user, "provider": provider_name},
		"name",
	)

	if existing:
		doc = frappe.get_doc("Jana User Key", existing)
		doc.api_key = api_key
		doc.auth_type = "oauth_key"
		doc.connected_at = now_datetime()
		doc.enabled = 1
		doc.save(ignore_permissions=True)
	else:
		doc = frappe.new_doc("Jana User Key")
		doc.user = frappe.session.user
		doc.provider = provider_name
		doc.auth_type = "oauth_key"
		doc.api_key = api_key
		doc.connected_at = now_datetime()
		doc.enabled = 1
		doc.insert(ignore_permissions=True)

	frappe.db.commit()

	# Redirect back to the app
	frappe.local.response["type"] = "redirect"
	frappe.local.response["location"] = "/app"


@frappe.whitelist()
def initiate_google_oauth(provider_name: str) -> dict:
	"""Start the Google Gemini OAuth flow using Frappe's Connected App.

	Returns the auth URL the frontend should redirect to.
	"""
	provider = frappe.get_doc("Jana Provider", provider_name)

	if provider.provider_type != "google":
		frappe.throw(_("This endpoint is only for Google providers"))
	if provider.auth_method != "OAuth":
		frappe.throw(_("Provider is not configured for OAuth"))
	if not provider.connected_app:
		frappe.throw(_("Connected App is required for Google OAuth"))

	connected_app = frappe.get_doc("Connected App", provider.connected_app)
	auth_url = connected_app.initiate_web_application_flow(
		success_uri="/app",
	)

	return {"auth_url": auth_url}


@frappe.whitelist()
def get_oauth_status() -> dict:
	"""Get OAuth connection status for the current user.

	Returns a dict of provider_name → {connected, provider_type, auth_method}.
	"""
	oauth_providers = frappe.get_all(
		"Jana Provider",
		filters={"auth_method": "OAuth", "enabled": 1},
		fields=["name", "provider_name", "provider_type"],
	)

	result = {}
	for p in oauth_providers:
		connected = False

		if p.provider_type == "openrouter":
			connected = bool(
				frappe.db.get_value(
					"Jana User Key",
					{"user": frappe.session.user, "provider": p.name, "enabled": 1},
					"name",
				)
			)
		elif p.provider_type == "google":
			# Check Frappe's Token Cache for an existing token
			# Token Cache names are "{connected_app}-{user}" per Frappe's get_token_cache()
			connected_app = frappe.db.get_value("Jana Provider", p.name, "connected_app")
			if connected_app:
				connected = frappe.db.exists(
					"Token Cache", connected_app + "-" + frappe.session.user
				)

		result[p.name] = {
			"connected": connected,
			"provider_type": p.provider_type,
			"provider_name": p.provider_name,
		}

	return result


@frappe.whitelist()
def disconnect_oauth(provider_name: str) -> dict:
	"""Disconnect OAuth for the current user from a provider."""
	provider = frappe.get_doc("Jana Provider", provider_name)

	if provider.provider_type == "openrouter":
		key_name = frappe.db.get_value(
			"Jana User Key",
			{"user": frappe.session.user, "provider": provider_name},
			"name",
		)
		if key_name:
			frappe.delete_doc("Jana User Key", key_name, ignore_permissions=True)
			frappe.db.commit()

	elif provider.provider_type == "google":
		# Token Cache names are "{connected_app}-{user}" per Frappe's get_token_cache()
		if provider.connected_app:
			token_name = provider.connected_app + "-" + frappe.session.user
			if frappe.db.exists("Token Cache", token_name):
				frappe.delete_doc("Token Cache", token_name, ignore_permissions=True)
				frappe.db.commit()

	return {"success": True}
