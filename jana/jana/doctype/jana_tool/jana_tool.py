# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import json

import frappe
from frappe import _
from frappe.model.document import Document


class JanaTool(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		description: DF.SmallText
		enabled: DF.Check
		method: DF.Data | None
		parameters_schema: DF.JSON | None
		tool_name: DF.Data
		tool_type: DF.Literal["frappe_api", "webhook", "custom"]
	# end: auto-generated types

	def validate(self):
		self.validate_parameters_schema()

	def validate_parameters_schema(self):
		if self.parameters_schema:
			try:
				json.loads(self.parameters_schema)
			except (json.JSONDecodeError, TypeError):
				frappe.throw(_("Parameters Schema must be valid JSON"))
