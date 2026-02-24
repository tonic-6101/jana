# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Custom permission hooks for Jana DocTypes.

Provides owner-scoped access for Jana User role on chat sessions,
messages, and user keys, while allowing Jana Admin and System Manager
full access.
"""

import frappe

_ADMIN_ROLES = frozenset({"System Manager", "Jana Admin", "Administrator"})


def _is_jana_admin(user: str = None) -> bool:
	"""Check if user has Jana Admin or System Manager role."""
	user = user or frappe.session.user
	user_roles = set(frappe.get_roles(user))
	return bool(user_roles & _ADMIN_ROLES)


# -------------------------------------------------------------------
# Jana Chat Session
# -------------------------------------------------------------------


def session_has_permission(doc, ptype="read", user=None):
	"""Owner-scoped permission for Jana Chat Session.

	Jana Admin / System Manager: full access to all sessions.
	Jana User: only own sessions (matched by ``user`` field).
	"""
	user = user or frappe.session.user
	if _is_jana_admin(user):
		return True
	return doc.user == user


def session_permission_query_conditions(user=None):
	"""SQL condition for list views of Jana Chat Session."""
	user = user or frappe.session.user
	if _is_jana_admin(user):
		return None
	return f"`tabJana Chat Session`.user = {frappe.db.escape(user)}"


# -------------------------------------------------------------------
# Jana Chat Message
# -------------------------------------------------------------------


def message_has_permission(doc, ptype="read", user=None):
	"""Owner-scoped permission for Jana Chat Message.

	Jana Admin / System Manager: full access.
	Jana User: only messages belonging to their own sessions.
	"""
	user = user or frappe.session.user
	if _is_jana_admin(user):
		return True

	session_user = frappe.db.get_value(
		"Jana Chat Session", doc.session, "user"
	)
	return session_user == user


def message_permission_query_conditions(user=None):
	"""SQL condition for list views of Jana Chat Message."""
	user = user or frappe.session.user
	if _is_jana_admin(user):
		return None
	return (
		f"`tabJana Chat Message`.session IN "
		f"(SELECT name FROM `tabJana Chat Session` "
		f"WHERE user = {frappe.db.escape(user)})"
	)


# -------------------------------------------------------------------
# Jana User Key
# -------------------------------------------------------------------


def user_key_has_permission(doc, ptype="read", user=None):
	"""Owner-scoped permission for Jana User Key."""
	user = user or frappe.session.user
	if _is_jana_admin(user):
		return True
	return doc.user == user


def user_key_permission_query_conditions(user=None):
	"""SQL condition for list views of Jana User Key."""
	user = user or frappe.session.user
	if _is_jana_admin(user):
		return None
	return f"`tabJana User Key`.user = {frappe.db.escape(user)}"
