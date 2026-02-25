# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tool executor — resolves, validates, and runs tool calls from the LLM."""

import json
import re
import uuid

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

	def __init__(self, agent_doc, settings: dict | None = None, chain_monitor=None):
		self.agent = agent_doc
		self.settings = settings or self._load_settings()
		self._tools: list[dict] = self._resolve_tools()
		self._chain_monitor = chain_monitor

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

			resolved.append(
				{
					"tool_name": tool_doc.tool_name,
					"description": tool_doc.description,
					"parameters_schema": tool_doc.parameters_schema,
					"method": tool_doc.method,
				}
			)

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

			specs.append(
				{
					"type": "function",
					"function": {
						"name": tool["tool_name"],
						"description": tool["description"],
						"parameters": schema,
					},
				}
			)
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
		            "function": {"name": "read_document", "arguments": "{...}"},
		        }

		Returns ``{"tool_call_id": "...", "content": "..."}`` suitable
		for appending as a ``role: "tool"`` message.
		"""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		call_id = tool_call.get("id", "")
		func = tool_call.get("function", {})
		name = func.get("name", "")
		raw_args = func.get("arguments", "{}")

		try:
			args = json.loads(raw_args) if isinstance(raw_args, str) else raw_args
		except json.JSONDecodeError:
			error_result = annotate_tool_result(_("Invalid tool arguments"), name, status="error")
			return {
				"tool_call_id": call_id,
				"content": json.dumps(error_result, default=str, ensure_ascii=False),
			}

		handler = getattr(self, f"_handle_{name}", None)
		if handler is None:
			error_result = annotate_tool_result(_("Unknown tool: {0}").format(name), name, status="error")
			return {
				"tool_call_id": call_id,
				"content": json.dumps(error_result, default=str, ensure_ascii=False),
			}

		# Chain monitor: record call and check write limits
		if self._chain_monitor:
			self._chain_monitor.record(name, args)
			write_block = self._chain_monitor.check_write_allowed(name)
			if write_block:
				error_result = annotate_tool_result(write_block, name, status="error")
				return {
					"tool_call_id": call_id,
					"content": json.dumps(error_result, default=str, ensure_ascii=False),
				}

		try:
			result = handler(**args)
			annotated = annotate_tool_result(result, name, status="success")
			content = json.dumps(annotated, default=str, ensure_ascii=False)
		except frappe.PermissionError:
			error_result = annotate_tool_result({"error": _("Permission denied")}, name, status="error")
			content = json.dumps(error_result, default=str, ensure_ascii=False)
		except frappe.DoesNotExistError:
			error_result = annotate_tool_result({"error": _("Document does not exist")}, name, status="error")
			content = json.dumps(error_result, default=str, ensure_ascii=False)
		except Exception:
			frappe.log_error(title=f"Jana Tool Error: {name}")
			error_result = annotate_tool_result(
				{"error": _("An error occurred while executing the tool")}, name, status="error"
			)
			content = json.dumps(error_result, default=str, ensure_ascii=False)

		# Log suspicious patterns at end of execution
		if self._chain_monitor:
			self._chain_monitor.log_if_suspicious()

		return {"tool_call_id": call_id, "content": content}

	# ------------------------------------------------------------------
	# Handlers
	# ------------------------------------------------------------------

	def _validate_doctype_exists(self, doctype: str) -> dict | None:
		"""Check that a DocType exists. Returns error dict if not."""
		if not frappe.db.exists("DocType", doctype):
			return {"error": _("DocType '{0}' does not exist on this site").format(doctype)}
		return None

	@staticmethod
	def _filter_password_fields(data: dict, doctype: str) -> dict:
		"""Remove Password-type fields from document data."""
		try:
			meta = frappe.get_meta(doctype)
		except Exception:
			return data

		password_fields = {df.fieldname for df in meta.fields if df.fieldtype == "Password"}
		if not password_fields:
			return data

		return {k: v for k, v in data.items() if k not in password_fields}

	def _handle_read_document(self, doctype: str, name: str, **_kw) -> dict:
		"""Read a single document."""
		dt_error = self._validate_doctype_exists(doctype)
		if dt_error:
			return dt_error

		frappe.has_permission(doctype, doc=name, throw=True)
		doc = frappe.get_doc(doctype, name)
		data = doc.as_dict()
		return self._filter_password_fields(data, doctype)

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
		dt_error = self._validate_doctype_exists(doctype)
		if dt_error:
			return dt_error

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
		"""Create a new document, or return a preview if confirmation is required."""
		dt_error = self._validate_doctype_exists(doctype)
		if dt_error:
			return dt_error

		frappe.has_permission(doctype, ptype="create", throw=True)

		if cint(self.settings.get("require_write_confirmation")):
			confirmation_id = str(uuid.uuid4())
			cache_key = f"jana_pending_write:{frappe.session.user}:{confirmation_id}"
			frappe.cache.set_value(
				cache_key,
				{
					"type": "create",
					"doctype": doctype,
					"values": values,
					"user": frappe.session.user,
				},
				expires_in_sec=300,
			)
			return {
				"status": "pending_confirmation",
				"confirmation_id": confirmation_id,
				"action": "create",
				"doctype": doctype,
				"values": values,
				"message": _(
					"Preview: Create a new {0}. Present these values to the user "
					"and call confirm_write with the confirmation_id after they approve."
				).format(doctype),
			}

		doc = frappe.new_doc(doctype)
		doc.update(values)
		doc.insert()
		frappe.db.commit()
		url = f"/app/{frappe.scrub(doctype)}/{doc.name}"
		return {"doctype": doctype, "name": doc.name, "status": "created", "url": url}

	def _handle_update_document(self, doctype: str, name: str, values: dict, **_kw) -> dict:
		"""Update fields on an existing document, or return a preview if confirmation is required."""
		dt_error = self._validate_doctype_exists(doctype)
		if dt_error:
			return dt_error

		frappe.has_permission(doctype, doc=name, ptype="write", throw=True)

		if cint(self.settings.get("require_write_confirmation")):
			doc = frappe.get_doc(doctype, name)
			current_values = {field: doc.get(field) for field in values}

			confirmation_id = str(uuid.uuid4())
			cache_key = f"jana_pending_write:{frappe.session.user}:{confirmation_id}"
			frappe.cache.set_value(
				cache_key,
				{
					"type": "update",
					"doctype": doctype,
					"name": name,
					"values": values,
					"user": frappe.session.user,
				},
				expires_in_sec=300,
			)
			return {
				"status": "pending_confirmation",
				"confirmation_id": confirmation_id,
				"action": "update",
				"doctype": doctype,
				"name": name,
				"current_values": current_values,
				"new_values": values,
				"message": _(
					"Preview: Update {0} {1}. Show the user what will change "
					"and call confirm_write with the confirmation_id after they approve."
				).format(doctype, name),
			}

		doc = frappe.get_doc(doctype, name)
		doc.update(values)
		doc.save()
		frappe.db.commit()
		url = f"/app/{frappe.scrub(doctype)}/{doc.name}"
		return {"doctype": doctype, "name": doc.name, "status": "updated", "url": url}

	def _handle_confirm_write(self, confirmation_id: str, **_kw) -> dict:
		"""Execute a previously previewed write action after user confirmation."""
		cache_key = f"jana_pending_write:{frappe.session.user}:{confirmation_id}"
		action = frappe.cache.get_value(cache_key)

		if not action:
			return {"error": _("Confirmation expired or not found. Please try the action again.")}

		if action.get("user") != frappe.session.user:
			return {"error": _("Permission denied")}

		frappe.cache.delete_value(cache_key)

		if action["type"] == "create":
			frappe.has_permission(action["doctype"], ptype="create", throw=True)
			doc = frappe.new_doc(action["doctype"])
			doc.update(action["values"])
			doc.insert()
			frappe.db.commit()
			url = f"/app/{frappe.scrub(action['doctype'])}/{doc.name}"
			return {"doctype": action["doctype"], "name": doc.name, "status": "created", "url": url}

		if action["type"] == "update":
			frappe.has_permission(action["doctype"], doc=action["name"], ptype="write", throw=True)
			doc = frappe.get_doc(action["doctype"], action["name"])
			doc.update(action["values"])
			doc.save()
			frappe.db.commit()
			url = f"/app/{frappe.scrub(action['doctype'])}/{doc.name}"
			return {"doctype": action["doctype"], "name": doc.name, "status": "updated", "url": url}

		return {"error": _("Unknown action type")}

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
			c.get("label", c.get("fieldname", "")) if isinstance(c, dict) else str(c) for c in (columns or [])
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
			from jana.services.security.validators import validate_navigation_url

			validated = validate_navigation_url(url)
			return {"url": validated, "action": "navigate"}

		if doctype and name:
			route = f"/app/{frappe.scrub(doctype)}/{name}"
		elif doctype:
			route = f"/app/{frappe.scrub(doctype)}"
		else:
			return {"error": _("Provide doctype, name, or url")}

		return {"url": route, "action": "navigate"}
