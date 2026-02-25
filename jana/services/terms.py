# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""BYOK terms acceptance service.

Manages the terms-of-use acceptance lifecycle. Users must accept the
current terms version before using Jana. Bumping CURRENT_TERMS_VERSION
forces re-acceptance for all users.
"""

import frappe
from frappe import _

CURRENT_TERMS_VERSION = "1.0"


def has_accepted_terms(user: str | None = None) -> bool:
	"""Check if user has accepted the current terms version."""
	user = user or frappe.session.user
	if user in ("Guest", "Administrator"):
		return True
	return bool(
		frappe.db.exists(
			"Jana Terms Acceptance",
			{"user": user, "terms_version": CURRENT_TERMS_VERSION},
		)
	)


def accept_terms(user: str | None = None) -> dict:
	"""Record user's acceptance of the current terms version.

	Returns:
		dict with ``accepted`` (bool) and ``terms_version`` (str).
	"""
	user = user or frappe.session.user

	if has_accepted_terms(user):
		return {"accepted": True, "terms_version": CURRENT_TERMS_VERSION}

	doc = frappe.new_doc("Jana Terms Acceptance")
	doc.user = user
	doc.terms_version = CURRENT_TERMS_VERSION
	doc.insert(ignore_permissions=True)

	return {"accepted": True, "terms_version": CURRENT_TERMS_VERSION}
