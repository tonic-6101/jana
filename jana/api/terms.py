# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""API endpoints for BYOK terms acceptance."""

import frappe

from jana.services.terms import CURRENT_TERMS_VERSION, has_accepted_terms
from jana.services.terms import accept_terms as _accept


@frappe.whitelist()
def accept_terms() -> dict:
	"""Accept the current terms version for the logged-in user."""
	return _accept(frappe.session.user)


@frappe.whitelist()
def get_terms_status() -> dict:
	"""Return the current user's terms acceptance status."""
	return {
		"accepted": has_accepted_terms(frappe.session.user),
		"terms_version": CURRENT_TERMS_VERSION,
	}
