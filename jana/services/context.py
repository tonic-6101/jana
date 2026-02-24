# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _


def get_page_context(doctype: str, docname: str) -> dict | None:
	"""Fetch document data for context injection into the AI prompt.

	Args:
		doctype: The DocType name (e.g. "Sales Invoice")
		docname: The document name (e.g. "SI-00042")

	Returns:
		dict with document fields, or None if not accessible.
	"""
	if not doctype or not docname:
		return None

	try:
		if not frappe.has_permission(doctype, "read", docname):
			return None

		doc = frappe.get_doc(doctype, docname)
		fields = {}
		meta = frappe.get_meta(doctype)

		for field in meta.fields:
			if field.fieldtype in (
				"Section Break", "Column Break", "Tab Break",
				"HTML", "HTML Editor", "Heading",
			):
				continue

			value = doc.get(field.fieldname)
			if value is not None and value != "":
				fields[field.fieldname] = {
					"label": _(field.label) if field.label else field.fieldname,
					"value": str(value),
					"fieldtype": field.fieldtype,
				}

		return {
			"doctype": doctype,
			"docname": docname,
			"fields": fields,
			"status": doc.get("docstatus", 0),
		}

	except (frappe.DoesNotExistError, frappe.PermissionError):
		return None


def format_context_for_prompt(context: dict) -> str:
	"""Format document context into a text block for the system prompt.

	Args:
		context: dict returned by get_page_context()

	Returns:
		Formatted string describing the current document.
	"""
	if not context:
		return ""

	lines = [
		f"The user is currently viewing: {context['doctype']} — {context['docname']}",
		"",
		"Document fields:",
	]

	for fieldname, info in context["fields"].items():
		label = info["label"]
		value = info["value"]
		lines.append(f"  {label}: {value}")

	return "\n".join(lines)
