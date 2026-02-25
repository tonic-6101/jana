# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import json

import frappe
from frappe import _

from jana.services.context import format_context_for_prompt, get_page_context
from jana.services.knowledge import format_knowledge_for_prompt, get_knowledge_for_prompt
from jana.services.llm.factory import get_provider
from jana.services.privacy import PIIMasker
from jana.services.tools.executor import MAX_TOOL_ITERATIONS, ToolExecutor


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
		"""Send a user message and get an AI response.

		Supports multi-turn tool calling: if the LLM returns tool_calls,
		the tools are executed and results fed back until the LLM produces
		a final text response (or MAX_TOOL_ITERATIONS is reached).
		"""
		session = frappe.get_doc("Jana Chat Session", session_id)

		if session.user != frappe.session.user:
			frappe.throw(_("You do not have access to this session"))

		# Rate limiting — check before doing any work
		from jana.services.rate_limiter import check_rate_limit

		check_rate_limit()

		# Update context if the user navigated to a new page
		if context_doctype and context_docname:
			session.context_doctype = context_doctype
			session.context_docname = context_docname
			session.save(ignore_permissions=True)

		# Save user message (original, unmasked)
		self._save_message(session_id, "user", content)

		# Get provider first — masker needs provider_doc to resolve settings
		agent = frappe.get_doc("Jana Agent", session.agent or "General Assistant")
		provider_name = agent.provider or None
		provider = get_provider(provider_name, user=frappe.session.user)

		# PII masking: per-request instance, GC'd at end of request
		masker = PIIMasker(provider.provider_doc)

		# Build the prompt (structured PII masking happens inside)
		messages = self._build_messages(session, agent, masker=masker)

		# Free-text PII masking on user messages and chat history
		if masker.enabled:
			messages = masker.mask_messages(messages)

		from jana.utils import get_jana_settings

		settings = get_jana_settings()
		model = agent.model or settings.get("default_model")
		if not model:
			frappe.throw(_("No model configured. Set a model on the agent or in Jana Settings."))
		base_temperature = agent.temperature or 0.7
		max_tokens = agent.max_tokens or None

		# Determine provider tier for guardrail escalation
		from jana.services.guardrails.provider_tiers import get_provider_tier

		provider_tier_str = getattr(provider.provider_doc, "provider_tier", None)
		provider_type = getattr(provider.provider_doc, "provider_type", None)
		provider_tier = get_provider_tier(model, provider_tier_str, provider_type)

		# Resolve available tools for this agent
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		chain_monitor = ToolChainMonitor()
		executor = ToolExecutor(agent, chain_monitor=chain_monitor)
		tools_spec = executor.get_tools_for_llm() if executor.has_tools else None

		# Multi-turn tool loop
		previous_had_tool_calls = False
		for _iteration in range(MAX_TOOL_ITERATIONS):
			# Temperature control: force 0 after tool calls or for Tier 3
			if previous_had_tool_calls or provider_tier == 3:
				turn_temperature = 0
			else:
				turn_temperature = base_temperature

			result = provider.complete(
				messages=messages,
				model=model,
				temperature=turn_temperature,
				max_tokens=max_tokens,
				tools=tools_spec,
			)

			tool_calls = result.get("tool_calls")
			if not tool_calls:
				break

			previous_had_tool_calls = True

			# LLM wants to call tools — save the assistant message with tool_calls
			assistant_content = result.get("content", "") or ""
			self._save_message(
				session_id,
				"assistant",
				assistant_content or _("(tool call)"),
				model=result.get("model"),
				tokens_used=result.get("tokens_used", 0),
				tool_calls=tool_calls,
			)

			# Append assistant message (with tool_calls) to conversation
			assistant_msg = {"role": "assistant", "content": assistant_content}
			assistant_msg["tool_calls"] = tool_calls
			messages.append(assistant_msg)

			# Execute each tool call and append results
			for tc in tool_calls:
				tool_result = executor.execute(tc)
				# Save unmasked tool result to DB (for audit/history)
				self._save_message(
					session_id,
					"tool",
					tool_result["content"],
					tool_call_id=tool_result["tool_call_id"],
				)
				# Mask tool result before re-sending to LLM
				result_content = tool_result["content"]
				if masker.enabled:
					result_content = masker.mask_text(result_content)
				messages.append(
					{
						"role": "tool",
						"tool_call_id": tool_result["tool_call_id"],
						"content": result_content,
					}
				)

		# Final text response (no tool_calls)
		response_content = result.get("content", "")
		if masker.enabled:
			response_content = masker.unmask(response_content)

		# Save assistant response (unmasked — user sees real values)
		self._save_message(
			session_id,
			"assistant",
			response_content,
			model=result.get("model"),
			tokens_used=result.get("tokens_used", 0),
		)

		# Rate counter — successful AI response
		from jana.services.rate_limiter import increment_rate_counter

		increment_rate_counter()

		# Auto-title on first exchange
		if not session.session_title:
			title = content[:80]
			if len(content) > 80:
				title += "..."
			session.session_title = title
			session.save(ignore_permissions=True)

		return {
			"content": response_content,
			"model": result.get("model"),
			"tokens_used": result.get("tokens_used", 0),
		}

	def send_message_stream(
		self,
		session_id: str,
		content: str,
		context_doctype: str = None,
		context_docname: str = None,
	):
		"""Send a user message and yield streaming AI response chunks.

		Yields NDJSON lines: ``{"content": "...", "done": false}``

		When the agent has tools enabled, streaming falls back to the
		non-streaming ``send_message()`` path (tool execution is
		server-side and not streamable), then yields the final result
		as a single NDJSON chunk.
		"""
		session = frappe.get_doc("Jana Chat Session", session_id)

		if session.user != frappe.session.user:
			yield (
				json.dumps(
					{"content": "", "done": True, "error": _("You do not have access to this session")}
				)
				+ "\n"
			)
			return

		# Rate limiting — check before doing any work
		from jana.services.rate_limiter import check_rate_limit

		try:
			check_rate_limit()
		except frappe.ValidationError:
			yield (
				json.dumps(
					{
						"content": "",
						"done": True,
						"error": _("Rate limit exceeded. Please wait before sending more messages."),
					}
				)
				+ "\n"
			)
			return

		# Check if agent has tools — if so, delegate to non-streaming path
		agent = frappe.get_doc("Jana Agent", session.agent or "General Assistant")
		executor = ToolExecutor(agent)

		if executor.has_tools:
			try:
				result = self.send_message(
					session_id=session_id,
					content=content,
					context_doctype=context_doctype,
					context_docname=context_docname,
				)
				yield (
					json.dumps(
						{"content": result.get("content", ""), "done": True, "model": result.get("model", "")}
					)
					+ "\n"
				)
			except Exception:
				frappe.log_error(title="Jana Tool Streaming Error")
				yield json.dumps({"content": "", "done": True, "error": _("An error occurred")}) + "\n"
			return

		# No tools — stream normally
		if context_doctype and context_docname:
			session.context_doctype = context_doctype
			session.context_docname = context_docname
			session.save(ignore_permissions=True)

		self._save_message(session_id, "user", content)

		provider_name = agent.provider or None
		provider = get_provider(provider_name, user=frappe.session.user)
		masker = PIIMasker(provider.provider_doc)

		messages = self._build_messages(session, agent, masker=masker)
		if masker.enabled:
			messages = masker.mask_messages(messages)

		from jana.utils import get_jana_settings

		stream_settings = get_jana_settings()
		model = agent.model or stream_settings.get("default_model")
		if not model:
			yield (
				json.dumps(
					{
						"content": "",
						"done": True,
						"error": _("No model configured. Set a model on the agent or in Jana Settings."),
					}
				)
				+ "\n"
			)
			return

		# Temperature control for streaming: Tier 3 providers always get 0
		from jana.services.guardrails.provider_tiers import get_provider_tier

		provider_tier_str = getattr(provider.provider_doc, "provider_tier", None)
		provider_type = getattr(provider.provider_doc, "provider_type", None)
		stream_tier = get_provider_tier(model, provider_tier_str, provider_type)
		temperature = 0 if stream_tier == 3 else (agent.temperature or 0.7)
		max_tokens = agent.max_tokens or None

		full_content = ""

		try:
			for chunk in provider.stream(
				messages=messages,
				model=model,
				temperature=temperature,
				max_tokens=max_tokens,
			):
				chunk_text = chunk.get("content", "")
				is_done = chunk.get("done", False)

				if chunk_text:
					full_content += chunk_text
					if masker.enabled:
						unmasked = masker.unmask_chunk(chunk_text)
					else:
						unmasked = chunk_text
					if unmasked:
						yield json.dumps({"content": unmasked, "done": False}) + "\n"

				if is_done:
					if masker.enabled:
						remaining = masker.flush_buffer()
						if remaining:
							yield json.dumps({"content": remaining, "done": False}) + "\n"

					full_unmasked = masker.unmask(full_content) if masker.enabled else full_content
					self._save_message(session_id, "assistant", full_unmasked, model=model)

					# Rate counter — successful streaming response
					from jana.services.rate_limiter import increment_rate_counter

					increment_rate_counter()

					if not session.session_title:
						title = content[:80] + ("..." if len(content) > 80 else "")
						session.session_title = title
						session.save(ignore_permissions=True)

					yield json.dumps({"content": "", "done": True, "model": model}) + "\n"
					return

		except Exception:
			frappe.log_error(title="Jana Streaming Error")
			if masker.enabled:
				remaining = masker.flush_buffer()
				if remaining:
					yield json.dumps({"content": remaining, "done": False}) + "\n"
			yield (
				json.dumps({"content": "", "done": True, "error": _("An error occurred during streaming")})
				+ "\n"
			)
			return

		# Provider ended without done=True — save what we have
		if masker.enabled:
			remaining = masker.flush_buffer()
			if remaining:
				yield json.dumps({"content": remaining, "done": False}) + "\n"
		if full_content:
			full_unmasked = masker.unmask(full_content) if masker.enabled else full_content
			self._save_message(session_id, "assistant", full_unmasked, model=model)
		yield json.dumps({"content": "", "done": True, "model": model}) + "\n"

	def get_session_messages(self, session_id: str, limit: int = 50) -> list:
		"""Get messages for a session."""
		messages = frappe.get_all(
			"Jana Chat Message",
			filters={"session": session_id},
			fields=[
				"name",
				"role",
				"content",
				"model",
				"tokens_used",
				"tool_calls",
				"tool_call_id",
				"creation",
			],
			order_by="creation asc",
			limit_page_length=limit,
		)
		return messages

	def _build_messages(self, session, agent, masker=None) -> list:
		"""Build the message list for the LLM call.

		Prompt assembly order (via prompt_builder):
		1. Instruction hierarchy (priority declaration)
		2. Agent system prompt (personality, capabilities)
		3. Knowledge articles (wrapped in boundary markers)
		4. Page context (wrapped in boundary markers, with PII masking)
		5. Language instructions
		6. Guardrail rules (pinned LAST — recency bias)

		Includes tool messages and assistant tool_calls in history so the
		LLM can see previous tool interactions in the conversation.
		"""
		from jana.services.guardrails.prompt_builder import build_system_prompt, get_guardrail_settings
		from jana.services.language import get_language_instructions

		messages = []
		guardrail_settings = get_guardrail_settings()

		# Business description (prepended to agent prompt)
		business_desc = frappe.db.get_single_value("Jana Settings", "business_description")

		# Agent system prompt (with dynamic report injection for Ask AI)
		agent_prompt = ""
		if business_desc:
			agent_prompt = business_desc + "\n\n---\n\n"
		if agent.system_prompt:
			prompt_text = agent.system_prompt
			if "{{AVAILABLE_REPORTS}}" in prompt_text:
				from jana.services.query import format_reports_for_prompt, get_available_reports

				reports = get_available_reports(limit=50)
				prompt_text = prompt_text.replace("{{AVAILABLE_REPORTS}}", format_reports_for_prompt(reports))
			agent_prompt += prompt_text

		# Knowledge articles (agent-attached + scope-matched)
		knowledge_text = ""
		context_doctype = session.context_doctype if session.context_doctype else None
		knowledge_articles = get_knowledge_for_prompt(agent.name, context_doctype)
		if knowledge_articles:
			token_budget = frappe.db.get_single_value("Jana Settings", "knowledge_token_budget") or 30000
			knowledge_text = format_knowledge_for_prompt(knowledge_articles, token_budget) or ""

		# Page context (with PII masking)
		context_text = ""
		if session.context_doctype and session.context_docname:
			context = get_page_context(session.context_doctype, session.context_docname)
			if masker and masker.enabled and context:
				context = masker.mask_context_fields(context)
			context_text = format_context_for_prompt(context) or ""

		# Language instructions
		user_language = getattr(frappe.local, "lang", None)
		lang_instructions = get_language_instructions(user_language) or ""

		# Assemble via prompt builder (handles boundary markers + guardrail pinning)
		system_prompt = build_system_prompt(
			agent_prompt=agent_prompt,
			knowledge_text=knowledge_text,
			context_text=context_text,
			user_language=user_language,
			lang_instructions=lang_instructions,
			enable_guardrails=guardrail_settings["enable_guardrails"],
		)

		if system_prompt:
			messages.append({"role": "system", "content": system_prompt})

		# Chat history — include tool messages for proper tool-call context
		history = frappe.get_all(
			"Jana Chat Message",
			filters={"session": session.name},
			fields=["role", "content", "tool_calls", "tool_call_id"],
			order_by="creation asc",
			limit_page_length=50,
		)

		for msg in history:
			if msg.role == "assistant":
				entry = {"role": "assistant", "content": msg.content or ""}
				if msg.tool_calls:
					try:
						entry["tool_calls"] = json.loads(msg.tool_calls)
					except (json.JSONDecodeError, TypeError):
						pass
				messages.append(entry)
			elif msg.role == "tool":
				entry = {"role": "tool", "content": msg.content or ""}
				if msg.tool_call_id:
					entry["tool_call_id"] = msg.tool_call_id
				messages.append(entry)
			elif msg.role == "user":
				messages.append({"role": "user", "content": msg.content or ""})

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
			msg.tool_calls = json.dumps(tool_calls)

		tool_call_id = kwargs.get("tool_call_id")
		if tool_call_id:
			msg.tool_call_id = tool_call_id

		msg.insert(ignore_permissions=True)
		frappe.db.commit()
		return msg
