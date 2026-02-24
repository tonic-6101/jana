# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe.model.document import Document


class JanaChatSession(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		agent: DF.Link | None
		context_docname: DF.Data | None
		context_doctype: DF.Data | None
		session_title: DF.Data | None
		status: DF.Literal["active", "archived"]
		user: DF.Link
	# end: auto-generated types

	def before_insert(self):
		if not self.user:
			self.user = frappe.session.user
