# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set default PII masking values for existing installations."""
	frappe.db.set_single_value("Jana Settings", "mask_pii", 1)

	frappe.db.sql("""
		UPDATE `tabJana Provider`
		SET mask_pii_override = 'Global Default'
		WHERE mask_pii_override IS NULL OR mask_pii_override = ''
	""")
	frappe.db.commit()
