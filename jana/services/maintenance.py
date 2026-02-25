# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Scheduled maintenance tasks for Jana."""

import frappe
from frappe.utils import add_days, cint, now_datetime


def auto_archive_old_sessions():
	"""Archive sessions older than the configured retention period.

	Runs daily via scheduler. Respects the ``session_retention_days``
	setting in Jana Settings. A value of 0 means keep forever.
	"""
	from jana.utils import get_jana_settings

	settings = get_jana_settings()
	retention_days = cint(settings.get("session_retention_days") or 90)

	if retention_days <= 0:
		return

	cutoff_date = add_days(now_datetime(), -retention_days)

	stale_sessions = frappe.get_all(
		"Jana Chat Session",
		filters={
			"status": "active",
			"modified": ("<", cutoff_date),
		},
		fields=["name"],
		limit_page_length=500,
	)

	for session in stale_sessions:
		frappe.db.set_value(
			"Jana Chat Session",
			session.name,
			"status",
			"archived",
			update_modified=False,
		)

	if stale_sessions:
		frappe.db.commit()
		frappe.logger("jana").info(
			f"Auto-archived {len(stale_sessions)} sessions older than {retention_days} days"
		)


def cleanup_orphaned_messages():
	"""Delete messages whose parent session no longer exists.

	Catches messages left behind by incomplete deletions or database
	inconsistencies. Processes in batches of 1000 per run.
	"""
	orphaned = frappe.db.sql(
		"""
		SELECT m.name
		FROM `tabJana Chat Message` m
		LEFT JOIN `tabJana Chat Session` s ON m.session = s.name
		WHERE s.name IS NULL
		LIMIT 1000
		""",
		as_dict=True,
	)

	for msg in orphaned:
		frappe.delete_doc(
			"Jana Chat Message",
			msg.name,
			ignore_permissions=True,
			force=True,
		)

	if orphaned:
		frappe.db.commit()
		frappe.logger("jana").info(f"Cleaned up {len(orphaned)} orphaned messages")
