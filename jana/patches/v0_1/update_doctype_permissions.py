# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Assign Jana Admin role to System Managers and Jana User to desk users.

	Ensures existing users retain access after the permission migration
	from "All" / "System Manager" to "Jana User" / "Jana Admin".
	"""
	# Grant Jana Admin to all System Managers
	system_managers = frappe.get_all(
		"Has Role",
		filters={"role": "System Manager", "parenttype": "User"},
		fields=["parent"],
		distinct=True,
	)
	for row in system_managers:
		user = row.parent
		if not frappe.db.exists("Has Role", {"parent": user, "role": "Jana Admin"}):
			doc = frappe.get_doc("User", user)
			doc.append("roles", {"role": "Jana Admin"})
			doc.save(ignore_permissions=True)

	# Grant Jana User to all active desk users
	desk_users = frappe.get_all(
		"User",
		filters={"enabled": 1, "user_type": "System User"},
		fields=["name"],
	)
	for row in desk_users:
		if not frappe.db.exists("Has Role", {"parent": row.name, "role": "Jana User"}):
			doc = frappe.get_doc("User", row.name)
			doc.append("roles", {"role": "Jana User"})
			doc.save(ignore_permissions=True)

	frappe.db.commit()
