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

		# Max length per field value to prevent prompt bloat
		max_value_len = 500

		for field in meta.fields:
			if field.fieldtype in (
				"Section Break",
				"Column Break",
				"Tab Break",
				"HTML",
				"HTML Editor",
				"Heading",
				"Password",
			):
				continue

			value = doc.get(field.fieldname)
			if value is not None and value != "":
				str_value = str(value)
				if len(str_value) > max_value_len:
					str_value = str_value[:max_value_len] + "..."
				fields[field.fieldname] = {
					"label": _(field.label) if field.label else field.fieldname,
					"value": str_value,
					"fieldtype": field.fieldtype,
					"options": field.options or None,
				}

		result = {
			"doctype": doctype,
			"docname": docname,
			"fields": fields,
			"status": doc.get("docstatus", 0),
		}

		# Workflow and action context
		result.update(_get_workflow_context(meta, doc, doctype, docname))

		return result

	except (frappe.DoesNotExistError, frappe.PermissionError):
		return None


_DOCSTATUS_LABELS = {0: "Draft", 1: "Submitted", 2: "Cancelled"}


def _get_workflow_context(meta, doc, doctype: str, docname: str) -> dict:
	"""Return workflow state, available actions, and submittable info.

	Checks both Frappe Workflow (state machine) and docstatus-based
	actions (Submit / Cancel / Amend) for submittable DocTypes.
	"""
	context: dict = {}
	available_actions: list[str] = []

	# --- Submittable DocType actions (docstatus-based) ---
	if meta.is_submittable:
		docstatus = doc.get("docstatus", 0)
		context["docstatus_label"] = _DOCSTATUS_LABELS.get(docstatus, str(docstatus))
		context["is_submittable"] = True

		if docstatus == 0:
			# Draft — can be submitted
			try:
				if frappe.has_permission(doctype, "submit", docname):
					available_actions.append("Submit")
			except frappe.PermissionError:
				pass
		elif docstatus == 1:
			# Submitted — can be cancelled or amended
			try:
				if frappe.has_permission(doctype, "cancel", docname):
					available_actions.append("Cancel")
			except frappe.PermissionError:
				pass
			try:
				if frappe.has_permission(doctype, "amend", docname):
					available_actions.append("Amend")
			except frappe.PermissionError:
				pass
		elif docstatus == 2:
			# Cancelled — can be amended
			try:
				if frappe.has_permission(doctype, "amend", docname):
					available_actions.append("Amend")
			except frappe.PermissionError:
				pass

	# --- Frappe Workflow (state machine) ---
	try:
		workflows = frappe.get_all(
			"Workflow",
			filters={"document_type": doctype, "is_active": 1},
			limit=1,
		)
		if workflows:
			workflow_doc = frappe.get_doc("Workflow", workflows[0].name)
			current_state = doc.get("workflow_state")
			if current_state:
				context["workflow_name"] = workflow_doc.name
				context["workflow_state"] = current_state

				# Find transitions from the current state
				for t in workflow_doc.transitions:
					if t.state == current_state:
						# Check if user's role allows this transition
						if t.allowed and frappe.get_roles():
							user_roles = set(frappe.get_roles())
							if t.allowed in user_roles:
								available_actions.append(t.action)
	except Exception:
		pass

	if available_actions:
		context["available_actions"] = available_actions

	return context


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
	]

	# Document status
	if context.get("docstatus_label"):
		lines.append(f"Document status: {context['docstatus_label']}")
	if context.get("workflow_state"):
		wf_name = context.get("workflow_name", "")
		lines.append(f"Workflow state: {context['workflow_state']} (workflow: {wf_name})")

	# Available actions
	if context.get("available_actions"):
		actions_str = ", ".join(context["available_actions"])
		lines.append(f"Available actions: {actions_str}")

	lines.append("")
	lines.append("Document fields:")

	for _fieldname, info in context["fields"].items():
		label = info["label"]
		value = info["value"]
		lines.append(f"  {label}: {value}")

	return "\n".join(lines)
