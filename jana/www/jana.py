# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


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


def get_boot():
	return {
		"csrf_token": frappe.sessions.get_csrf_token(),
		"site_name": frappe.local.site,
		"default_route": "/jana",
	}
