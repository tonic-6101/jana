# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import json

import frappe
from frappe import _
from werkzeug.wrappers import Response

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

	from jana.services.security.validators import validate_message_length

	validate_message_length(content)

	service = ChatService()
	return service.send_message(
		session_id=session_id,
		content=content.strip(),
		context_doctype=context_doctype,
		context_docname=context_docname,
	)


@frappe.whitelist(methods=["POST"])
def send_message_stream(
	session_id: str = None,
	content: str = None,
	context_doctype: str = None,
	context_docname: str = None,
):
	"""Send a message and stream the AI response as NDJSON.

	Returns a werkzeug Response with ``Content-Type: application/x-ndjson``.
	Each line is a JSON object: ``{"content": "...", "done": bool}``.
	Falls back to non-streaming if the setting is disabled.
	"""
	if not session_id:
		frappe.throw(_("Session ID is required"))
	if not content or not content.strip():
		frappe.throw(_("Message content is required"))

	from jana.services.security.validators import validate_message_length

	validate_message_length(content)

	content = content.strip()
	service = ChatService()

	from frappe.utils import cint

	from jana.utils import get_jana_settings

	enable_streaming = cint(get_jana_settings().get("enable_streaming") or 0)
	if not enable_streaming:
		result = service.send_message(
			session_id=session_id,
			content=content,
			context_doctype=context_doctype,
			context_docname=context_docname,
		)
		body = (
			json.dumps(
				{
					"content": result["content"],
					"done": True,
					"model": result.get("model"),
					"tokens_used": result.get("tokens_used", 0),
				}
			)
			+ "\n"
		)
		return Response(body, content_type="application/x-ndjson", status=200)

	def generate():
		try:
			yield from service.send_message_stream(
				session_id=session_id,
				content=content,
				context_doctype=context_doctype,
				context_docname=context_docname,
			)
		except Exception:
			frappe.log_error(title="Jana SSE Stream Error")
			yield json.dumps({"content": "", "done": True, "error": _("Streaming failed")}) + "\n"

	return Response(
		generate(),
		content_type="application/x-ndjson",
		status=200,
		headers={
			"Cache-Control": "no-cache",
			"X-Accel-Buffering": "no",
		},
	)


@frappe.whitelist()
def get_sessions(limit: int = 20, status: str = "active") -> list:
	"""Get the current user's chat sessions.

	Args:
		limit: Maximum number of sessions to return.
		status: Filter by status (``active``, ``archived``, or ``all``).
	"""
	filters = {"user": frappe.session.user}
	if status != "all":
		filters["status"] = status

	return frappe.get_all(
		"Jana Chat Session",
		filters=filters,
		fields=["name", "session_title", "agent", "status", "context_doctype", "context_docname", "modified"],
		order_by="modified desc",
		limit_page_length=limit,
	)


@frappe.whitelist()
def archive_session(session_id: str) -> dict:
	"""Archive a chat session.

	Only the session owner or a Jana Admin can archive a session.
	"""
	if not session_id:
		frappe.throw(_("Session ID is required"))

	session = frappe.get_doc("Jana Chat Session", session_id)

	from jana.permissions import _is_jana_admin

	if session.user != frappe.session.user and not _is_jana_admin():
		frappe.throw(_("You do not have permission to archive this session"))

	if session.status == "archived":
		frappe.throw(_("Session is already archived"))

	session.status = "archived"
	session.save(ignore_permissions=True)

	return {"session_id": session.name, "status": "archived"}


@frappe.whitelist()
def delete_session(session_id: str) -> dict:
	"""Delete a chat session and all its messages.

	Only the session owner or a Jana Admin can delete a session.
	Messages are cascade-deleted via the ``on_trash`` handler.
	"""
	if not session_id:
		frappe.throw(_("Session ID is required"))

	session = frappe.get_doc("Jana Chat Session", session_id)

	from jana.permissions import _is_jana_admin

	if session.user != frappe.session.user and not _is_jana_admin():
		frappe.throw(_("You do not have permission to delete this session"))

	frappe.delete_doc("Jana Chat Session", session_id, ignore_permissions=True)

	return {"session_id": session_id, "deleted": True}


@frappe.whitelist()
def rename_session(session_id: str, title: str) -> dict:
	"""Rename a chat session.

	Only the session owner or a Jana Admin can rename a session.
	"""
	if not session_id:
		frappe.throw(_("Session ID is required"))
	if not title or not title.strip():
		frappe.throw(_("Title is required"))

	session = frappe.get_doc("Jana Chat Session", session_id)

	from jana.permissions import _is_jana_admin

	if session.user != frappe.session.user and not _is_jana_admin():
		frappe.throw(_("You do not have permission to rename this session"))

	session.session_title = title.strip()
	session.save(ignore_permissions=True)

	return {"session_id": session.name, "session_title": session.session_title}


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
