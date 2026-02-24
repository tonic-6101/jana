# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


class JanaUserKey(Document):
	def validate(self):
		self.validate_unique_per_user()

	def validate_unique_per_user(self):
		existing = frappe.db.exists(
			"Jana User Key",
			{"user": self.user, "provider": self.provider, "name": ("!=", self.name)},
		)
		if existing:
			frappe.throw(
				_("A key for {0} already exists for user {1}").format(
					self.provider, self.user
				)
			)
