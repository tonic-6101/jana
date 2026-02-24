# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


class JanaProvider(Document):
	def validate(self):
		self.validate_default()
		self.validate_connection()
		self.validate_oauth()

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
		# Force API Key for local providers
		if self.provider_type in ("ollama", "vllm"):
			self.auth_method = "API Key"

	def validate_oauth(self):
		if self.auth_method == "OAuth":
			if self.provider_type == "google" and not self.connected_app:
				frappe.throw(_("Connected App is required for Google OAuth"))
			if self.provider_type == "openrouter":
				self.api_base_url = self.api_base_url or "https://openrouter.ai/api/v1"
				self.openrouter_callback_url = (
					f"{frappe.utils.get_url()}/api/method/jana.api.oauth.openrouter_callback"
				)
			if self.provider_type not in ("openrouter", "google"):
				frappe.throw(
					_("OAuth is only supported for OpenRouter and Google providers")
				)

	def on_update(self):
		from jana.utils import clear_provider_cache

		clear_provider_cache(self.name)

	def on_trash(self):
		from jana.utils import clear_provider_cache

		referencing_agents = frappe.get_all(
			"Jana Agent",
			filters={"provider": self.name},
			fields=["agent_name"],
			limit_page_length=5,
		)
		if referencing_agents:
			names = ", ".join(a.agent_name for a in referencing_agents)
			frappe.throw(
				_("Cannot delete provider {0}: referenced by agent(s): {1}").format(
					self.provider_name, names
				)
			)

		clear_provider_cache(self.name)
