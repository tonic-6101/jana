# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""API endpoints for agent listing and retrieval."""

import frappe
from frappe import _

from jana.permissions import _is_jana_admin


@frappe.whitelist()
def list_agents() -> list:
	"""Return all agents visible to the current user.

	All authenticated users can see agents (they need to select one
	when starting a chat). Non-template agents are returned.
	"""
	return frappe.get_all(
		"Jana Agent",
		filters={"is_template": 0},
		fields=["name", "agent_name", "description", "provider", "model"],
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
		"tools": [
			{"tool": t.tool, "enabled": t.enabled}
			for t in agent.tools
		],
	}

	if _is_jana_admin():
		result["system_prompt"] = agent.system_prompt

	return result
