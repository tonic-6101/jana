# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Create Jana User and Jana Admin roles for existing installations.

	Runs in [pre_model_sync] so roles exist before DocType permission
	arrays reference them during migrate.
	"""
	for role_name in ("Jana User", "Jana Admin"):
		if not frappe.db.exists("Role", role_name):
			role = frappe.new_doc("Role")
			role.role_name = role_name
			role.desk_access = 1
			role.insert(ignore_permissions=True)
	frappe.db.commit()
