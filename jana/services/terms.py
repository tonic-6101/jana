# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""BYOK terms acceptance service.

Manages the terms-of-use acceptance lifecycle. Users must accept the
current terms version before using Jana. Bumping CURRENT_TERMS_VERSION
forces re-acceptance for all users.
"""

import frappe
from frappe import _


def _get_app_version() -> str:
	"""Read the app version from the VERSION file (major.minor only)."""
	import os

	version_file = os.path.join(os.path.dirname(__file__), "..", "..", "VERSION")
	try:
		full = open(version_file).read().strip()
		# Use major.minor so patch releases don't force re-acceptance
		parts = full.split(".")
		return f"{parts[0]}.{parts[1]}" if len(parts) >= 2 else full
	except Exception:
		return "1.0"


CURRENT_TERMS_VERSION = _get_app_version()


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
