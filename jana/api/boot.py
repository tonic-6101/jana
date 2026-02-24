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
		settings = frappe.get_single("Jana Settings")
		if settings.default_provider:
			provider = frappe.get_doc("Jana Provider", settings.default_provider)
			api_key = get_decrypted_password(
				"Jana Provider", provider.name, "api_key", raise_exception=False
			)
			if provider.enabled and api_key:
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
