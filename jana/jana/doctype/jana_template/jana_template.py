# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

from frappe.model.document import Document


class JanaTemplate(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		agent_config: DF.JSON
		author: DF.Link
		category: DF.Literal["general", "accounting", "crm", "hr", "buying"]
		description: DF.Text
		downloads: DF.Int
		price: DF.Currency
		published: DF.Check
		rating: DF.Float
		template_name: DF.Data
	# end: auto-generated types

	pass
