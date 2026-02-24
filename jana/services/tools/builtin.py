# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Built-in tool definitions for the Jana Tool Framework.

Each tool maps to a Frappe REST API operation and is gated by a
Jana Settings capability toggle.
"""

import json

import frappe
from frappe import _


BUILTIN_TOOLS = [
	{
		"tool_name": "read_document",
		"tool_type": "frappe_api",
		"method": "read_document",
		"description": (
			"Read a single Frappe document by DocType and name. "
			"Returns all fields the current user has permission to see."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"doctype": {
					"type": "string",
					"description": "The DocType to read (e.g. 'Sales Invoice')",
				},
				"name": {
					"type": "string",
					"description": "The document name/ID",
				},
			},
			"required": ["doctype", "name"],
		}),
		"settings_toggle": "enable_read_documents",
	},
	{
		"tool_name": "list_documents",
		"tool_type": "frappe_api",
		"method": "list_documents",
		"description": (
			"List or search Frappe documents of a given DocType. "
			"Supports filters, field selection, ordering, and pagination."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"doctype": {
					"type": "string",
					"description": "The DocType to list",
				},
				"filters": {
					"type": "object",
					"description": (
						"Filters as {field: value} or {field: ['operator', value]}"
					),
				},
				"fields": {
					"type": "array",
					"items": {"type": "string"},
					"description": "Fields to return (default: name, modified)",
				},
				"order_by": {
					"type": "string",
					"description": "Field to order by (default: modified desc)",
				},
				"limit": {
					"type": "integer",
					"description": "Max results (default: 20, max: 100)",
				},
			},
			"required": ["doctype"],
		}),
		"settings_toggle": "enable_read_documents",
	},
	{
		"tool_name": "create_document",
		"tool_type": "frappe_api",
		"method": "create_document",
		"description": (
			"Create a new Frappe document. Provide the DocType and field values. "
			"When write confirmation is enabled, returns a preview with a "
			"confirmation_id. Present the preview to the user and call "
			"confirm_write after they approve."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"doctype": {
					"type": "string",
					"description": "The DocType to create",
				},
				"values": {
					"type": "object",
					"description": "Field values for the new document",
				},
			},
			"required": ["doctype", "values"],
		}),
		"settings_toggle": "enable_create_documents",
	},
	{
		"tool_name": "update_document",
		"tool_type": "frappe_api",
		"method": "update_document",
		"description": (
			"Update fields on an existing Frappe document. "
			"When write confirmation is enabled, returns a preview showing "
			"current vs new values with a confirmation_id. Present the changes "
			"to the user and call confirm_write after they approve."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"doctype": {
					"type": "string",
					"description": "The DocType of the document",
				},
				"name": {
					"type": "string",
					"description": "The document name/ID",
				},
				"values": {
					"type": "object",
					"description": "Field values to update",
				},
			},
			"required": ["doctype", "name", "values"],
		}),
		"settings_toggle": "enable_modify_documents",
	},
	{
		"tool_name": "confirm_write",
		"tool_type": "frappe_api",
		"method": "confirm_write",
		"description": (
			"Execute a previously previewed write action after the user has "
			"confirmed. Requires the confirmation_id from the create_document "
			"or update_document preview response."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"confirmation_id": {
					"type": "string",
					"description": "The confirmation_id from the preview response",
				},
			},
			"required": ["confirmation_id"],
		}),
		"settings_toggle": "enable_tool_calling",
	},
	{
		"tool_name": "run_report",
		"tool_type": "frappe_api",
		"method": "run_report",
		"description": (
			"Run a Frappe Report Builder or Script Report and return the results. "
			"Provide the report name and optional filters."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"report_name": {
					"type": "string",
					"description": "Name of the report",
				},
				"filters": {
					"type": "object",
					"description": "Report filters",
				},
				"limit": {
					"type": "integer",
					"description": "Max rows (default: 20, max: 100)",
				},
			},
			"required": ["report_name"],
		}),
		"settings_toggle": "enable_report_queries",
	},
	{
		"tool_name": "navigate_to_page",
		"tool_type": "frappe_api",
		"method": "navigate_to_page",
		"description": (
			"Generate a URL for the user to navigate to a Frappe page, "
			"document form, or list view. The frontend will handle navigation."
		),
		"parameters_schema": json.dumps({
			"type": "object",
			"properties": {
				"doctype": {
					"type": "string",
					"description": "DocType to navigate to",
				},
				"name": {
					"type": "string",
					"description": "Document name (omit for list view)",
				},
				"url": {
					"type": "string",
					"description": "Direct URL path (alternative to doctype/name)",
				},
			},
		}),
		"settings_toggle": "enable_navigate",
	},
]


def install_builtin_tools():
	"""Create Jana Tool records for each built-in tool (idempotent)."""
	for tool_def in BUILTIN_TOOLS:
		if frappe.db.exists("Jana Tool", tool_def["tool_name"]):
			continue

		doc = frappe.new_doc("Jana Tool")
		doc.tool_name = tool_def["tool_name"]
		doc.tool_type = tool_def["tool_type"]
		doc.method = tool_def["method"]
		doc.description = tool_def["description"]
		doc.parameters_schema = tool_def["parameters_schema"]
		doc.enabled = 1
		doc.insert(ignore_permissions=True)

	frappe.db.commit()


def attach_tools_to_agent(agent_name: str, tool_names: list[str] | None = None):
	"""Attach built-in tools to an agent (idempotent).

	If *tool_names* is ``None``, attaches all built-in tools.
	"""
	if not frappe.db.exists("Jana Agent", agent_name):
		return

	if tool_names is None:
		tool_names = [t["tool_name"] for t in BUILTIN_TOOLS]

	agent = frappe.get_doc("Jana Agent", agent_name)
	existing = {row.tool for row in agent.tools}

	changed = False
	for name in tool_names:
		if name not in existing and frappe.db.exists("Jana Tool", name):
			agent.append("tools", {"tool": name, "enabled": 1})
			changed = True

	if changed:
		agent.save(ignore_permissions=True)
		frappe.db.commit()
