# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set default knowledge token budget for existing installations."""
	frappe.db.set_single_value("Jana Settings", "knowledge_token_budget", 30000)
	frappe.db.commit()
