# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Scheduled agent execution — runs agents headlessly on behalf of users.

Provides ``run_agent_for_user()`` which future scheduled/event-driven
agents can use to execute an agent session without a user-initiated chat.
"""

from __future__ import annotations

import frappe


def run_agent_for_user(agent_name: str, prompt: str, user: str) -> str:
	"""Run an agent session headlessly on behalf of *user*.

	Sets ``frappe.session.user`` so all downstream permission checks
	execute in the correct context.  The session is archived immediately
	after the response is generated (system-initiated, not user-facing).

	Returns the assistant's response text.
	"""
	from jana.services.chat import ChatService

	original_user = frappe.session.user
	try:
		frappe.set_user(user)

		chat = ChatService()
		session = chat.create_session(agent_name=agent_name)
		result = chat.send_message(
			session_id=session["session_id"],
			content=prompt,
		)

		# Archive immediately — this is a system-generated session
		frappe.db.set_value(
			"Jana Chat Session", session["session_id"],
			"status", "archived",
		)
		frappe.db.commit()

		return result["content"]
	finally:
		frappe.set_user(original_user)
