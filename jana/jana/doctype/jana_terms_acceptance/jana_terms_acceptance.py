# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now_datetime


class JanaTermsAcceptance(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		accepted_at: DF.Datetime | None
		ip_address: DF.Data | None
		terms_version: DF.Data
		user: DF.Link
	# end: auto-generated types

	def validate(self):
		if not self.accepted_at:
			self.accepted_at = now_datetime()
		if not self.ip_address:
			self.ip_address = frappe.local.request_ip if hasattr(frappe.local, "request_ip") else ""
		self.validate_unique_acceptance()

	def validate_unique_acceptance(self):
		existing = frappe.db.exists(
			"Jana Terms Acceptance",
			{
				"user": self.user,
				"terms_version": self.terms_version,
				"name": ("!=", self.name),
			},
		)
		if existing:
			frappe.throw(_("Terms version {0} already accepted by {1}").format(self.terms_version, self.user))
