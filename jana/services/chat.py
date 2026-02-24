# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe import _

from jana.services.context import format_context_for_prompt, get_page_context
from jana.services.llm.factory import get_provider


class ChatService:
	"""Orchestrates chat sessions, messages, and LLM calls."""

	def create_session(
		self,
		agent_name: str = None,
		context_doctype: str = None,
		context_docname: str = None,
	) -> dict:
		"""Create a new chat session."""
		if not agent_name:
			agent_name = "General Assistant"

		session = frappe.new_doc("Jana Chat Session")
		session.user = frappe.session.user
		session.agent = agent_name
		session.status = "active"
		session.context_doctype = context_doctype
		session.context_docname = context_docname
		session.insert(ignore_permissions=True)

		return {
			"session_id": session.name,
			"agent": agent_name,
			"status": session.status,
		}

	def send_message(
		self,
		session_id: str,
		content: str,
		context_doctype: str = None,
		context_docname: str = None,
	) -> dict:
		"""Send a user message and get an AI response."""
		session = frappe.get_doc("Jana Chat Session", session_id)

		if session.user != frappe.session.user:
			frappe.throw(_("You do not have access to this session"))

		# Update context if the user navigated to a new page
		if context_doctype and context_docname:
			session.context_doctype = context_doctype
			session.context_docname = context_docname
			session.save(ignore_permissions=True)

		# Save user message
		self._save_message(session_id, "user", content)

		# Build the prompt
		agent = frappe.get_doc("Jana Agent", session.agent or "General Assistant")
		messages = self._build_messages(session, agent)

		# Get provider and call LLM
		provider_name = agent.provider or None
		provider = get_provider(provider_name)

		model = agent.model or frappe.db.get_single_value("Jana Settings", "default_model")
		temperature = agent.temperature or 0.7
		max_tokens = agent.max_tokens or None

		result = provider.complete(
			messages=messages,
			model=model,
			temperature=temperature,
			max_tokens=max_tokens,
		)

		# Save assistant response
		self._save_message(
			session_id,
			"assistant",
			result.get("content", ""),
			model=result.get("model"),
			tokens_used=result.get("tokens_used", 0),
			tool_calls=result.get("tool_calls"),
		)

		# Auto-title on first exchange
		if not session.session_title:
			title = content[:80]
			if len(content) > 80:
				title += "..."
			session.session_title = title
			session.save(ignore_permissions=True)

		return {
			"content": result.get("content", ""),
			"model": result.get("model"),
			"tokens_used": result.get("tokens_used", 0),
		}

	def get_session_messages(self, session_id: str, limit: int = 50) -> list:
		"""Get messages for a session."""
		messages = frappe.get_all(
			"Jana Chat Message",
			filters={"session": session_id},
			fields=["name", "role", "content", "model", "tokens_used", "creation"],
			order_by="creation asc",
			limit_page_length=limit,
		)
		return messages

	def _build_messages(self, session, agent) -> list:
		"""Build the message list for the LLM call."""
		messages = []

		# System prompt
		system_prompt = agent.system_prompt or ""

		# Inject page context
		if session.context_doctype and session.context_docname:
			context = get_page_context(session.context_doctype, session.context_docname)
			context_text = format_context_for_prompt(context)
			if context_text:
				system_prompt += "\n\n---\n\n" + context_text

		if system_prompt:
			messages.append({"role": "system", "content": system_prompt})

		# Chat history
		history = frappe.get_all(
			"Jana Chat Message",
			filters={"session": session.name},
			fields=["role", "content"],
			order_by="creation asc",
			limit_page_length=50,
		)

		for msg in history:
			if msg.role in ("user", "assistant"):
				messages.append({"role": msg.role, "content": msg.content})

		return messages

	def _save_message(self, session_id, role, content, **kwargs):
		"""Save a message to the database."""
		msg = frappe.new_doc("Jana Chat Message")
		msg.session = session_id
		msg.role = role
		msg.content = content
		msg.model = kwargs.get("model")
		msg.tokens_used = kwargs.get("tokens_used", 0)

		tool_calls = kwargs.get("tool_calls")
		if tool_calls:
			import json
			msg.tool_calls = json.dumps(tool_calls)

		msg.insert(ignore_permissions=True)
		frappe.db.commit()
		return msg
