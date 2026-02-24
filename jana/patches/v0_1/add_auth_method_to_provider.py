# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set auth_method to 'API Key' for all existing providers."""
	frappe.db.sql("""
		UPDATE `tabJana Provider`
		SET auth_method = 'API Key'
		WHERE auth_method IS NULL OR auth_method = ''
	""")
	frappe.db.commit()
