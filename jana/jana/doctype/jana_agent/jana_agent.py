# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


class JanaAgent(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		from jana.jana.doctype.jana_agent_tool.jana_agent_tool import JanaAgentTool

		agent_name: DF.Data
		description: DF.SmallText | None
		is_template: DF.Check
		max_tokens: DF.Int
		model: DF.Data | None
		provider: DF.Link | None
		system_prompt: DF.LongText
		temperature: DF.Float
		tools: DF.Table[JanaAgentTool]
	# end: auto-generated types

	def validate(self):
		self.validate_provider()
		self.validate_temperature()

	def validate_provider(self):
		if self.provider and not frappe.db.exists("Jana Provider", self.provider):
			frappe.throw(_("Provider {0} does not exist").format(self.provider))

	def validate_temperature(self):
		if self.temperature is not None and (self.temperature < 0.0 or self.temperature > 2.0):
			frappe.throw(_("Temperature must be between 0.0 and 2.0"))
