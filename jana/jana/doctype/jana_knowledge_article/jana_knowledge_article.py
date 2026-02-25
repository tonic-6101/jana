# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import re

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import strip_html_tags

_INJECTION_PATTERNS = [
	re.compile(r"ignore\s+(all\s+)?previous\s+instructions", re.IGNORECASE),
	re.compile(r"you\s+are\s+now\s+a", re.IGNORECASE),
	re.compile(r"system\s*:\s*", re.IGNORECASE),
	re.compile(r"new\s+instructions?\s*:", re.IGNORECASE),
	re.compile(r"forget\s+(everything|all|your\s+instructions)", re.IGNORECASE),
	re.compile(r"pretend\s+(you\s+are|to\s+be)", re.IGNORECASE),
	re.compile(r"disregard\s+(the\s+above|previous|all)", re.IGNORECASE),
]


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
		source_file: DF.Attach | None
	# end: auto-generated types

	def before_validate(self):
		self.extract_content_from_file()

	def validate(self):
		self.validate_content()
		self.check_for_injection_patterns()

	def extract_content_from_file(self):
		"""If a source file is attached and content is empty, extract text."""
		if not self.source_file:
			return

		# Don't overwrite existing content
		if self.get_plain_content():
			return

		from jana.services.knowledge.extractor import extract_text

		extracted = extract_text(self.source_file)
		if extracted:
			self.content = extracted

	def validate_content(self):
		plain = self.get_plain_content()
		if not plain or not plain.strip():
			frappe.throw(_("Article content cannot be empty"))

	def check_for_injection_patterns(self):
		"""Warn if article content contains prompt injection patterns."""
		plain = self.get_plain_content()
		if not plain:
			return

		matches = []
		for pattern in _INJECTION_PATTERNS:
			if pattern.search(plain):
				matches.append(pattern.pattern)

		if matches:
			frappe.msgprint(
				_(
					"This article contains patterns that may interfere with AI behaviour. "
					"Please review the content carefully."
				),
				indicator="orange",
				title=_("Content Review Recommended"),
			)

	def get_plain_content(self) -> str:
		"""Return content with HTML tags stripped, suitable for LLM injection."""
		if not self.content:
			return ""
		return strip_html_tags(self.content).strip()
