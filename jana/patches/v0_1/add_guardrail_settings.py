# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set default values for guardrail settings on existing installations."""
	if not frappe.db.exists("DocType", "Jana Settings"):
		return

	settings = frappe.get_single("Jana Settings")
	if not settings.get("enable_guardrails"):
		settings.db_set("enable_guardrails", 1)
	if not settings.get("max_message_length"):
		settings.db_set("max_message_length", 32000)
	if not settings.get("guardrail_reground_interval"):
		settings.db_set("guardrail_reground_interval", 5)
