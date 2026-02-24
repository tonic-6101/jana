# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set default rate_limit_per_hour for existing installations."""
	if frappe.db.exists("DocType", "Jana Settings"):
		current = frappe.db.get_single_value("Jana Settings", "rate_limit_per_hour")
		if not current:
			frappe.db.set_single_value("Jana Settings", "rate_limit_per_hour", 60)
			frappe.db.commit()
