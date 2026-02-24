# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


class JanaProvider(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		api_base_url: DF.Data | None
		api_key: DF.Password | None
		available_models: DF.SmallText | None
		enabled: DF.Check
		is_default: DF.Check
		provider_name: DF.Data
		provider_type: DF.Literal["openai", "anthropic", "google", "ollama", "vllm", "custom"]
	# end: auto-generated types

	def validate(self):
		self.validate_default()
		self.validate_connection()

	def validate_default(self):
		if self.is_default:
			existing = frappe.db.get_value(
				"Jana Provider",
				{"is_default": 1, "name": ("!=", self.name)},
				"name",
			)
			if existing:
				frappe.db.set_value("Jana Provider", existing, "is_default", 0)

	def validate_connection(self):
		if self.provider_type in ("ollama", "vllm", "custom") and not self.api_base_url:
			frappe.throw(
				_("API Base URL is required for {0} providers").format(self.provider_type)
			)
