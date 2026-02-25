# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Set default 'Auto-detect' on existing providers."""
	if not frappe.db.exists("DocType", "Jana Provider"):
		return

	frappe.db.sql(
		"""UPDATE `tabJana Provider`
		SET provider_tier = 'Auto-detect'
		WHERE provider_tier IS NULL OR provider_tier = ''"""
	)
	frappe.db.commit()
