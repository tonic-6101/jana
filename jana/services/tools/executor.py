# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tool executor — resolves, validates, and runs tool calls from the LLM."""

import json
import re

import frappe
from frappe import _
from frappe.utils import cint

from jana.services.tools.builtin import BUILTIN_TOOLS

# Validates order_by: one or more "field_name [asc|desc]" clauses, comma-separated.
_SAFE_ORDER_BY_RE = re.compile(
	r"^[a-zA-Z_][a-zA-Z0-9_.]*(\s+(asc|desc))?"
	r"(\s*,\s*[a-zA-Z_][a-zA-Z0-9_.]*(\s+(asc|desc))?)*$",
	re.IGNORECASE,
)

MAX_TOOL_ITERATIONS = 5

# Map tool_name → settings_toggle for quick lookup
_TOGGLE_MAP: dict[str, str] = {t["tool_name"]: t["settings_toggle"] for t in BUILTIN_TOOLS}


class ToolExecutor:
	"""Resolves available tools for an agent and executes LLM tool calls.

	Instantiate once per ``send_message()`` call.
	"""

	def __init__(self, agent_doc, settings: dict | None = None):
		self.agent = agent_doc
		self.settings = settings or self._load_settings()
		self._tools: list[dict] = self._resolve_tools()

	@property
	def has_tools(self) -> bool:
		return bool(self._tools)

	# ------------------------------------------------------------------
	# Resolution
	# ------------------------------------------------------------------

	def _load_settings(self) -> dict:
		"""Load the relevant Jana Settings toggles (cached)."""
		from jana.utils import get_jana_settings

		return get_jana_settings()

	def _resolve_tools(self) -> list[dict]:
		"""Return the list of tool definitions this agent may use."""
		if not cint(self.settings.get("enable_tool_calling")):
			return []

		resolved = []
		for row in self.agent.tools:
			if not row.enabled:
				continue

			tool_doc = frappe.get_cached_doc("Jana Tool", row.tool)
			if not tool_doc.enabled:
				continue

			toggle = _TOGGLE_MAP.get(tool_doc.tool_name)
			if toggle and not cint(self.settings.get(toggle)):
				continue

			resolved.append({
				"tool_name": tool_doc.tool_name,
				"description": tool_doc.description,
				"parameters_schema": tool_doc.parameters_schema,
				"method": tool_doc.method,
			})

		return resolved

	# ------------------------------------------------------------------
	# LLM interface
	# ------------------------------------------------------------------

	def get_tools_for_llm(self) -> list[dict]:
		"""Return tool definitions in OpenAI function-calling format.

		Each provider normalises this format internally (e.g. Anthropic
		converts to its ``input_schema`` layout in ``_convert_tools``).
		"""
		specs = []
		for tool in self._tools:
			schema = tool["parameters_schema"]
			if isinstance(schema, str):
				schema = json.loads(schema)

			specs.append({
				"type": "function",
				"function": {
					"name": tool["tool_name"],
					"description": tool["description"],
					"parameters": schema,
				},
			})
		return specs

	# ------------------------------------------------------------------
	# Execution
	# ------------------------------------------------------------------

	def execute(self, tool_call: dict) -> dict:
		"""Execute a single tool call and return the result.

		*tool_call* follows the OpenAI format::

			{
				"id": "call_abc123",
				"type": "function",
				"function": {"name": "read_document", "arguments": "{...}"}
			}

		Returns ``{"tool_call_id": "...", "content": "..."}`` suitable
		for appending as a ``role: "tool"`` message.
		"""
		call_id = tool_call.get("id", "")
		func = tool_call.get("function", {})
		name = func.get("name", "")
		raw_args = func.get("arguments", "{}")

		try:
			args = json.loads(raw_args) if isinstance(raw_args, str) else raw_args
		except json.JSONDecodeError:
			return {"tool_call_id": call_id, "content": _("Invalid tool arguments")}

		handler = getattr(self, f"_handle_{name}", None)
		if handler is None:
			return {"tool_call_id": call_id, "content": _("Unknown tool: {0}").format(name)}

		try:
			result = handler(**args)
			content = json.dumps(result, default=str, ensure_ascii=False)
		except frappe.PermissionError:
			content = json.dumps({"error": _("Permission denied")})
		except frappe.DoesNotExistError:
			content = json.dumps({"error": _("Document does not exist")})
		except Exception:
			frappe.log_error(title=f"Jana Tool Error: {name}")
			content = json.dumps({"error": _("An error occurred while executing the tool")})

		return {"tool_call_id": call_id, "content": content}

	# ------------------------------------------------------------------
	# Handlers
	# ------------------------------------------------------------------

	def _handle_read_document(self, doctype: str, name: str, **_kw) -> dict:
		"""Read a single document."""
		frappe.has_permission(doctype, doc=name, throw=True)
		doc = frappe.get_doc(doctype, name)
		return doc.as_dict()

	def _handle_list_documents(
		self,
		doctype: str,
		filters: dict | None = None,
		fields: list[str] | None = None,
		order_by: str | None = None,
		limit: int | None = None,
		**_kw,
	) -> dict:
		"""List documents with optional filters."""
		frappe.has_permission(doctype, throw=True)

		limit = max(1, min(limit or 20, 100))
		fields = fields or ["name", "modified"]

		# Validate order_by to prevent SQL injection
		safe_order_by = "modified desc"
		if order_by and _SAFE_ORDER_BY_RE.match(order_by.strip()):
			safe_order_by = order_by.strip()

		results = frappe.get_list(
			doctype,
			filters=filters,
			fields=fields,
			order_by=safe_order_by,
			limit_page_length=limit,
		)
		return {"doctype": doctype, "count": len(results), "data": results}

	def _handle_create_document(self, doctype: str, values: dict, **_kw) -> dict:
		"""Create a new document."""
		frappe.has_permission(doctype, ptype="create", throw=True)

		doc = frappe.new_doc(doctype)
		doc.update(values)
		doc.insert()
		frappe.db.commit()
		return {"doctype": doctype, "name": doc.name, "status": "created"}

	def _handle_update_document(
		self, doctype: str, name: str, values: dict, **_kw
	) -> dict:
		"""Update fields on an existing document."""
		frappe.has_permission(doctype, doc=name, ptype="write", throw=True)

		doc = frappe.get_doc(doctype, name)
		doc.update(values)
		doc.save()
		frappe.db.commit()
		return {"doctype": doctype, "name": doc.name, "status": "updated"}

	def _handle_run_report(
		self,
		report_name: str,
		filters: dict | None = None,
		limit: int | None = None,
		**_kw,
	) -> dict:
		"""Run a report and return results."""
		limit = max(1, min(limit or 20, 100))

		report = frappe.get_doc("Report", report_name)
		frappe.has_permission("Report", doc=report_name, throw=True)

		columns, data = report.get_data(
			filters=filters or {},
			limit=limit,
			as_dict=True,
		)

		col_labels = [
			c.get("label", c.get("fieldname", "")) if isinstance(c, dict) else str(c)
			for c in (columns or [])
		]

		return {
			"report": report_name,
			"columns": col_labels,
			"row_count": len(data or []),
			"data": (data or [])[:limit],
		}

	def _handle_navigate_to_page(
		self,
		doctype: str | None = None,
		name: str | None = None,
		url: str | None = None,
		**_kw,
	) -> dict:
		"""Return a navigation URL for the frontend."""
		if url:
			return {"url": url, "action": "navigate"}

		if doctype and name:
			route = f"/app/{frappe.scrub(doctype)}/{name}"
		elif doctype:
			route = f"/app/{frappe.scrub(doctype)}"
		else:
			return {"error": _("Provide doctype, name, or url")}

		return {"url": route, "action": "navigate"}
