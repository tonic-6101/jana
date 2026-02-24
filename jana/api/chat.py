# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _

from jana.services.chat import ChatService


@frappe.whitelist()
def create_session(
	agent: str = None,
	context_doctype: str = None,
	context_docname: str = None,
) -> dict:
	"""Create a new chat session."""
	service = ChatService()
	return service.create_session(
		agent_name=agent,
		context_doctype=context_doctype,
		context_docname=context_docname,
	)


@frappe.whitelist()
def send_message(
	session_id: str,
	content: str,
	context_doctype: str = None,
	context_docname: str = None,
) -> dict:
	"""Send a message to Jana and get an AI response."""
	if not session_id:
		frappe.throw(_("Session ID is required"))
	if not content or not content.strip():
		frappe.throw(_("Message content is required"))

	service = ChatService()
	return service.send_message(
		session_id=session_id,
		content=content.strip(),
		context_doctype=context_doctype,
		context_docname=context_docname,
	)


@frappe.whitelist()
def get_sessions(limit: int = 20) -> list:
	"""Get the current user's chat sessions."""
	return frappe.get_all(
		"Jana Chat Session",
		filters={
			"user": frappe.session.user,
			"status": "active",
		},
		fields=["name", "session_title", "agent", "context_doctype", "context_docname", "modified"],
		order_by="modified desc",
		limit_page_length=limit,
	)


@frappe.whitelist()
def get_session(session_id: str) -> dict:
	"""Get a session with its messages."""
	session = frappe.get_doc("Jana Chat Session", session_id)

	if session.user != frappe.session.user:
		frappe.throw(_("You do not have access to this session"))

	service = ChatService()
	messages = service.get_session_messages(session_id)

	return {
		"session": {
			"name": session.name,
			"session_title": session.session_title,
			"agent": session.agent,
			"status": session.status,
			"context_doctype": session.context_doctype,
			"context_docname": session.context_docname,
		},
		"messages": messages,
	}
