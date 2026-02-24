# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

from frappe.model.document import Document


class JanaSettings(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		default_model: DF.Data | None
		default_provider: DF.Link | None
		enable_chat: DF.Check
		enable_create_documents: DF.Check
		enable_draft_content: DF.Check
		enable_modify_documents: DF.Check
		enable_navigate: DF.Check
		enable_read_documents: DF.Check
		enable_report_queries: DF.Check
		enable_streaming: DF.Check
		enable_tool_calling: DF.Check
		max_context_tokens: DF.Int
	# end: auto-generated types

	pass
