# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe.translate import get_messages_for_boot


def get_context(context):
	frappe.sessions.get_csrf_token()
	frappe.db.commit()
	context.boot = get_boot()

	# The Jana SPA is a standalone Vue app — it does not use the standard
	# Frappe/ERPNext web bundles.  Clear the preload list so the framework
	# does not emit HTTP Link:rel=preload headers for unused resources.
	frappe.local.preload_assets = {"style": [], "script": [], "icons": []}

	return context


@frappe.whitelist(methods=["POST"], allow_guest=True)
def get_context_for_dev():
	"""Provide boot data for the Vite dev server."""
	return get_boot()


def _get_dock_boot():
	"""Return dock boot info if dock is installed, else None."""
	if "dock" not in frappe.get_installed_apps():
		return None
	try:
		from dock.boot import get_boot as dock_get_boot
		return dock_get_boot()
	except Exception:
		return {"installed": True}


def _get_jana_boot():
	"""Return jana config (terms, capabilities, etc.) for the SPA boot."""
	from jana.api.boot import get_widget_config

	return get_widget_config()


def get_boot():
	user = frappe.session.user
	user_info = frappe.get_doc("User", user)

	return {
		"frappe": {
			"boot": {
				"user": {
					"name": user,
					"email": user_info.email or "",
					"full_name": user_info.full_name or user,
					"user_image": user_info.user_image or "",
				},
				"user_roles": frappe.get_roles(user),
				"dock": _get_dock_boot(),
				"jana": _get_jana_boot(),
			},
			"csrf_token": frappe.sessions.get_csrf_token(),
		},
		"csrf_token": frappe.sessions.get_csrf_token(),
		"site_name": frappe.local.site,
		"default_route": "/jana",
		"lang": frappe.local.lang,
		"__messages": get_messages_for_boot(),
	}
