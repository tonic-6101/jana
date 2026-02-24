# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set default session_retention_days for existing installations."""
	if frappe.db.exists("DocType", "Jana Settings"):
		current = frappe.db.get_single_value("Jana Settings", "session_retention_days")
		if not current:
			frappe.db.set_single_value("Jana Settings", "session_retention_days", 90)
			frappe.db.commit()
