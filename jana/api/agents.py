# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""API endpoints for agent management (CRUD)."""

import json

import frappe
from frappe import _

from jana.permissions import _is_jana_admin


@frappe.whitelist()
def check_admin() -> dict:
	"""Check if the current user has Jana Admin permissions."""
	return {"is_admin": _is_jana_admin()}


@frappe.whitelist()
def list_agents() -> list:
	"""Return all agents visible to the current user.

	All authenticated users can see agents (they need to select one
	when starting a chat).
	"""
	return frappe.get_all(
		"Jana Agent",
		fields=["name", "agent_name", "description", "provider", "model", "is_template"],
		order_by="agent_name asc",
	)


@frappe.whitelist()
def get_agent(agent_name: str) -> dict:
	"""Return agent details.

	System prompt is only included for Jana Admin / System Manager.
	"""
	if not agent_name:
		frappe.throw(_("Agent name is required"))

	if not frappe.db.exists("Jana Agent", agent_name):
		frappe.throw(_("Agent {0} does not exist").format(agent_name))

	agent = frappe.get_doc("Jana Agent", agent_name)

	result = {
		"name": agent.name,
		"agent_name": agent.agent_name,
		"description": agent.description,
		"provider": agent.provider,
		"model": agent.model,
		"temperature": agent.temperature,
		"max_tokens": agent.max_tokens,
		"is_template": agent.is_template,
		"tools": [{"tool": t.tool, "enabled": t.enabled} for t in agent.tools],
		"knowledge": [
			{"knowledge_article": k.knowledge_article, "enabled": k.enabled} for k in (agent.knowledge or [])
		],
	}

	if _is_jana_admin():
		result["system_prompt"] = agent.system_prompt

	return result


@frappe.whitelist()
def create_agent(data: str) -> dict:
	"""Create a new agent.

	Only Jana Admin or System Manager can create agents.

	Args:
		data: JSON string with agent fields.
	"""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can create agents"))

	if isinstance(data, str):
		data = json.loads(data)

	agent_name_val = (data.get("agent_name") or "").strip()
	if not agent_name_val:
		frappe.throw(_("Agent name is required"))

	if frappe.db.exists("Jana Agent", agent_name_val):
		frappe.throw(_("An agent named '{0}' already exists").format(agent_name_val))

	agent = frappe.new_doc("Jana Agent")
	agent.agent_name = agent_name_val
	agent.description = (data.get("description") or "").strip()
	agent.system_prompt = (data.get("system_prompt") or "").strip()
	agent.provider = data.get("provider") or None
	agent.model = data.get("model") or None
	agent.temperature = float(data.get("temperature", 0.7))
	agent.max_tokens = int(data.get("max_tokens") or 0) or 0
	agent.is_template = int(data.get("is_template", 0))

	# Child table: tools
	for tool_row in data.get("tools") or []:
		agent.append(
			"tools",
			{
				"tool": tool_row["tool"],
				"enabled": int(tool_row.get("enabled", 1)),
			},
		)

	# Child table: knowledge
	for k_row in data.get("knowledge") or []:
		agent.append(
			"knowledge",
			{
				"knowledge_article": k_row["knowledge_article"],
				"enabled": int(k_row.get("enabled", 1)),
			},
		)

	agent.insert(ignore_permissions=True)

	return {"name": agent.name, "agent_name": agent.agent_name}


@frappe.whitelist()
def update_agent(agent_name: str, data: str) -> dict:
	"""Update an existing agent.

	Only Jana Admin or System Manager can update agents.

	Args:
		agent_name: The agent to update.
		data: JSON string with updated fields.
	"""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can update agents"))

	if not agent_name:
		frappe.throw(_("Agent name is required"))

	if isinstance(data, str):
		data = json.loads(data)

	agent = frappe.get_doc("Jana Agent", agent_name)

	# Update scalar fields
	for field in ("description", "system_prompt", "provider", "model"):
		if field in data:
			val = data[field]
			setattr(agent, field, (val or "").strip() if isinstance(val, str) else val)

	if "temperature" in data:
		agent.temperature = float(data["temperature"])
	if "max_tokens" in data:
		agent.max_tokens = int(data["max_tokens"] or 0) or 0
	if "is_template" in data:
		agent.is_template = int(data["is_template"])

	# Replace child table: tools
	if "tools" in data:
		agent.tools = []
		for tool_row in data["tools"] or []:
			agent.append(
				"tools",
				{
					"tool": tool_row["tool"],
					"enabled": int(tool_row.get("enabled", 1)),
				},
			)

	# Replace child table: knowledge
	if "knowledge" in data:
		agent.knowledge = []
		for k_row in data["knowledge"] or []:
			agent.append(
				"knowledge",
				{
					"knowledge_article": k_row["knowledge_article"],
					"enabled": int(k_row.get("enabled", 1)),
				},
			)

	agent.save(ignore_permissions=True)

	return {"name": agent.name, "agent_name": agent.agent_name}


@frappe.whitelist()
def delete_agent(agent_name: str) -> dict:
	"""Delete an agent.

	Only Jana Admin or System Manager can delete agents.
	The DocType's ``on_trash`` hook prevents deletion if
	active sessions reference the agent.
	"""
	if not _is_jana_admin():
		frappe.throw(_("Only administrators can delete agents"))

	if not agent_name:
		frappe.throw(_("Agent name is required"))

	frappe.delete_doc("Jana Agent", agent_name, ignore_permissions=True)

	return {"deleted": True, "agent_name": agent_name}


@frappe.whitelist()
def list_tools() -> list:
	"""Return all enabled tools (for the agent tool selector)."""
	return frappe.get_all(
		"Jana Tool",
		filters={"enabled": 1},
		fields=["name", "tool_name", "tool_type", "description"],
		order_by="tool_name asc",
	)


@frappe.whitelist()
def list_knowledge_articles() -> list:
	"""Return all enabled knowledge articles (for the agent knowledge selector)."""
	return frappe.get_all(
		"Jana Knowledge Article",
		filters={"enabled": 1},
		fields=["name", "article_title", "category"],
		order_by="article_title asc",
	)
