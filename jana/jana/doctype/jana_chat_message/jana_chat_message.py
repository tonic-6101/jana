# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

from frappe.model.document import Document


class JanaChatMessage(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		content: DF.LongText
		model: DF.Data | None
		role: DF.Literal["user", "assistant", "system", "tool"]
		session: DF.Link
		tokens_used: DF.Int
		tool_call_id: DF.Data | None
		tool_calls: DF.JSON | None
	# end: auto-generated types

	pass
