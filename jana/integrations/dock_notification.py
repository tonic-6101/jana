# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""
Dock Notification integration — publishes Jana events to Dock's bell icon.

Uses dock.api.notifications.publish() which validates notification_type
against dock_notification_types declared in jana/hooks.py, creates a
Dock Notification record, and pushes a realtime event to the recipient.

Dock is an optional dependency for Jana.
"""

import frappe
from frappe import _


def _dock_installed() -> bool:
	return "dock" in frappe.get_installed_apps()


def publish(
	notification_type: str,
	title: str,
	for_user: str,
	message: str = None,
	reference_doctype: str = None,
	reference_name: str = None,
	action_url: str = None,
):
	"""
	Publish a notification to Dock's bell icon.

	Safe to call when Dock is not installed — silently returns.
	Failures are logged but never break the calling code.
	"""
	if not _dock_installed():
		return

	if not action_url and reference_doctype == "Jana Chat Session":
		action_url = f"/jana/chat/{reference_name}" if reference_name else ""

	try:
		from dock.api.notifications import publish as dock_publish
		dock_publish(
			for_user=for_user,
			from_app="jana",
			notification_type=notification_type,
			title=title,
			message=message,
			reference_doctype=reference_doctype,
			reference_name=reference_name,
			action_url=action_url,
		)
	except Exception:
		frappe.log_error(
			frappe.get_traceback(),
			"Jana: failed to publish Dock notification",
		)


# ------------------------------------------------------------------
# Write confirmation (HIGH priority — user action required)
# ------------------------------------------------------------------

def on_write_confirmation_needed(
	user: str,
	session_name: str,
	action_type: str,
	doctype: str,
	document_preview: str,
):
	"""Notify when an agent drafted a write action needing user approval."""
	publish(
		notification_type="jana_write_confirmation_needed",
		title=_("Jana needs approval: {0} {1}").format(action_type, doctype),
		for_user=user,
		message=_("Agent wants to {0} a {1}: {2}").format(
			action_type, doctype, document_preview[:150]
		),
		reference_doctype="Jana Chat Session",
		reference_name=session_name,
	)


# ------------------------------------------------------------------
# Rate limit (HIGH priority)
# ------------------------------------------------------------------

def on_rate_limit_exceeded(user: str, limit_per_hour: int):
	"""Notify when a user hits the rate limit."""
	publish(
		notification_type="jana_rate_limit_exceeded",
		title=_("Rate limit reached ({0}/hour)").format(limit_per_hour),
		for_user=user,
		message=_("You've reached the limit of {0} messages per hour. Please wait.").format(
			limit_per_hour
		),
	)


# ------------------------------------------------------------------
# Provider errors (HIGH priority)
# ------------------------------------------------------------------

def on_provider_error(
	user: str,
	provider_name: str,
	error_type: str,
	error_message: str,
	session_name: str = None,
):
	"""Notify when an AI provider API call fails."""
	# Notify the affected user
	publish(
		notification_type="jana_provider_error",
		title=_("AI error: {0}").format(provider_name),
		for_user=user,
		message=_("{0}: {1}").format(error_type, error_message[:200]),
		reference_doctype="Jana Chat Session",
		reference_name=session_name,
	)

	# Also notify Jana Admins (if user is not already an admin)
	admins = frappe.get_all(
		"Has Role",
		filters={"role": "Jana Admin", "parenttype": "User"},
		pluck="parent",
	)
	for admin in set(admins):
		if admin != user:
			publish(
				notification_type="jana_provider_error",
				title=_("Provider error: {0}").format(provider_name),
				for_user=admin,
				message=_("User {0} hit {1} error: {2}").format(
					user, error_type, error_message[:150]
				),
			)
