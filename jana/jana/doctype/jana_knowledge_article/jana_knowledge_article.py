# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import strip_html_tags


class JanaKnowledgeArticle(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		article_title: DF.Data
		category: DF.Literal["general", "policy", "process", "product", "faq"]
		content: DF.TextEditor
		doctype_scope: DF.Link | None
		enabled: DF.Check
	# end: auto-generated types

	def validate(self):
		self.validate_content()

	def validate_content(self):
		plain = self.get_plain_content()
		if not plain or not plain.strip():
			frappe.throw(_("Article content cannot be empty"))

	def get_plain_content(self) -> str:
		"""Return content with HTML tags stripped, suitable for LLM injection."""
		if not self.content:
			return ""
		return strip_html_tags(self.content).strip()
