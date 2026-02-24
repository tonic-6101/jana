# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Content generation API — single-shot LLM calls for drafting and summarisation.

These endpoints do NOT create chat sessions. They call the LLM once with a
specialised system prompt and return the generated content directly.

All endpoints respect:
- ``enable_draft_content`` toggle in Jana Settings
- Rate limiting (shared counter with chat)
- PII masking (via provider-level setting)
- User permissions (document context is permission-checked)
"""

import frappe
from frappe import _


def _check_draft_content_enabled():
	"""Raise if the draft-content capability is disabled."""
	from frappe.utils import cint
	from jana.utils import get_jana_settings

	settings = get_jana_settings()
	if not cint(settings.get("enable_draft_content")):
		frappe.throw(
			_("Content generation is disabled. Enable 'Draft Content' in Jana Settings."),
			title=_("Feature Disabled"),
		)


def _get_provider_and_model():
	"""Resolve the default provider and model from Jana Settings."""
	from jana.services.llm.factory import get_provider
	from jana.utils import get_jana_settings

	settings = get_jana_settings()
	provider = get_provider(user=frappe.session.user)
	model = settings.get("default_model")
	if not model:
		frappe.throw(_("No default model configured. Set a model in Jana Settings."))
	return provider, model


def _generate(system_prompt: str, user_prompt: str, temperature: float = 0.5) -> dict:
	"""Run a single-shot LLM completion and return the result.

	Handles rate limiting and PII masking transparently.
	"""
	from jana.services.privacy import PIIMasker
	from jana.services.rate_limiter import check_rate_limit, increment_rate_counter

	check_rate_limit()

	provider, model = _get_provider_and_model()
	masker = PIIMasker(provider.provider_doc)

	messages = [
		{"role": "system", "content": system_prompt},
		{"role": "user", "content": user_prompt},
	]

	if masker.enabled:
		messages = masker.mask_messages(messages)

	result = provider.complete(
		messages=messages,
		model=model,
		temperature=temperature,
		max_tokens=2000,
	)

	content = result.get("content", "")
	if masker.enabled:
		content = masker.unmask(content)

	increment_rate_counter()

	return {
		"content": content,
		"model": result.get("model"),
		"tokens_used": result.get("tokens_used", 0),
	}


@frappe.whitelist()
def draft_email(
	doctype: str,
	docname: str,
	intent: str = "general",
	instructions: str = None,
) -> dict:
	"""Draft an email based on a document's context.

	Args:
		doctype: The DocType of the source document.
		docname: The document name.
		intent: The purpose of the email. One of:
			``general``, ``payment_reminder``, ``inquiry``,
			``follow_up``, ``thank_you``, ``complaint``.
		instructions: Optional free-text instructions for the LLM.

	Returns:
		dict with ``subject``, ``body``, ``model``, ``tokens_used``.
	"""
	_check_draft_content_enabled()

	from jana.services.context import format_context_for_prompt, get_page_context

	context = get_page_context(doctype, docname)
	if not context:
		frappe.throw(
			_("Cannot access {0} {1}. Check that it exists and you have permission.").format(
				doctype, docname
			)
		)

	context_text = format_context_for_prompt(context)

	intent_guidance = {
		"general": "Write a professional business email related to this document.",
		"payment_reminder": (
			"Write a polite but firm payment reminder email. Reference the "
			"outstanding amount, invoice number, and due date from the document."
		),
		"inquiry": (
			"Write a professional inquiry email about this document, asking for "
			"clarification or additional information."
		),
		"follow_up": (
			"Write a follow-up email referencing this document, checking on "
			"progress or next steps."
		),
		"thank_you": (
			"Write a brief thank-you email related to this document."
		),
		"complaint": (
			"Write a professional complaint or issue-report email referencing "
			"the details in this document."
		),
	}

	intent_text = intent_guidance.get(intent, intent_guidance["general"])

	system_prompt = (
		"You are a professional business email writer. Your emails are concise, "
		"clear, and appropriate for a business context.\n\n"
		"Generate the email with two clearly separated sections:\n"
		"1. A subject line (on the first line, prefixed with 'Subject: ')\n"
		"2. The email body (after a blank line)\n\n"
		"Do NOT include greetings like 'Dear [Name]' with placeholder brackets — "
		"use the actual party name from the document context if available, or "
		"use a generic greeting like 'Dear Sir/Madam'.\n\n"
		"Do NOT include a sign-off with placeholder names — end naturally or "
		"with 'Best regards'.\n\n"
		f"{context_text}"
	)

	user_msg = intent_text
	if instructions:
		user_msg += f"\n\nAdditional instructions: {instructions}"

	result = _generate(system_prompt, user_msg, temperature=0.5)

	# Parse subject and body from the response
	content = result["content"].strip()
	subject = ""
	body = content

	lines = content.split("\n", 1)
	if lines and lines[0].lower().startswith("subject:"):
		subject = lines[0].split(":", 1)[1].strip()
		body = lines[1].strip() if len(lines) > 1 else ""

	return {
		"subject": subject,
		"body": body,
		"model": result["model"],
		"tokens_used": result["tokens_used"],
	}


@frappe.whitelist()
def generate_description(
	doctype: str,
	docname: str,
	style: str = "professional",
	instructions: str = None,
) -> dict:
	"""Generate a text description for a document (e.g. item, product, project).

	Args:
		doctype: The DocType (e.g. "Item", "Project").
		docname: The document name.
		style: Writing style — ``professional``, ``marketing``, ``technical``,
			``brief``.
		instructions: Optional free-text instructions for the LLM.

	Returns:
		dict with ``description``, ``model``, ``tokens_used``.
	"""
	_check_draft_content_enabled()

	from jana.services.context import format_context_for_prompt, get_page_context

	context = get_page_context(doctype, docname)
	if not context:
		frappe.throw(
			_("Cannot access {0} {1}. Check that it exists and you have permission.").format(
				doctype, docname
			)
		)

	context_text = format_context_for_prompt(context)

	style_guidance = {
		"professional": (
			"Write a clear, professional description suitable for business documentation."
		),
		"marketing": (
			"Write an engaging, benefit-focused description suitable for a "
			"website or catalogue. Highlight key features and value propositions."
		),
		"technical": (
			"Write a precise technical description covering specifications, "
			"capabilities, and relevant details."
		),
		"brief": (
			"Write a concise one-to-two sentence summary."
		),
	}

	style_text = style_guidance.get(style, style_guidance["professional"])

	system_prompt = (
		"You are a skilled business writer. Generate a description for the "
		"document described below. Output ONLY the description text — no "
		"headings, labels, or preamble.\n\n"
		f"{context_text}"
	)

	user_msg = style_text
	if instructions:
		user_msg += f"\n\nAdditional instructions: {instructions}"

	result = _generate(system_prompt, user_msg, temperature=0.6)

	return {
		"description": result["content"].strip(),
		"model": result["model"],
		"tokens_used": result["tokens_used"],
	}


@frappe.whitelist()
def summarize_report(
	report_name: str,
	filters: str = None,
	limit: int = 50,
) -> dict:
	"""Run a Frappe report and generate a natural-language summary.

	Args:
		report_name: Name of the Report Builder or Script Report.
		filters: JSON string of report filters.
		limit: Max rows to include in the summary context (default 50).

	Returns:
		dict with ``summary``, ``row_count``, ``model``, ``tokens_used``.
	"""
	_check_draft_content_enabled()

	import json

	# Validate limit
	limit = min(int(limit), 100)

	# Parse filters
	parsed_filters = {}
	if filters:
		if isinstance(filters, str):
			parsed_filters = json.loads(filters)
		else:
			parsed_filters = filters

	# Run the report (permission-checked by Frappe)
	try:
		report_data = frappe.get_attr("frappe.desk.query_report.run")(
			report_name,
			filters=parsed_filters,
		)
	except Exception:
		frappe.log_error(title="Jana Report Summary Error")
		frappe.throw(
			_("Could not run report {0}. Check that it exists and you have permission.").format(
				report_name
			)
		)

	columns = report_data.get("columns", [])
	rows = report_data.get("result", [])
	total_rows = len(rows)
	rows = rows[:limit]

	# Format column headers
	col_names = []
	for col in columns:
		if isinstance(col, dict):
			col_names.append(col.get("label", col.get("fieldname", "")))
		else:
			col_names.append(str(col).split(":")[0])

	# Format rows as text table (truncated for prompt)
	table_lines = [" | ".join(col_names)]
	table_lines.append("-" * len(table_lines[0]))

	for row in rows:
		if isinstance(row, dict):
			values = [str(row.get(c.get("fieldname", ""), "")) if isinstance(c, dict) else str(row.get(str(c).split(":")[0], "")) for c in columns]
		elif isinstance(row, (list, tuple)):
			values = [str(v) for v in row]
		else:
			continue
		# Truncate long values
		values = [v[:80] if len(v) > 80 else v for v in values]
		table_lines.append(" | ".join(values))

	table_text = "\n".join(table_lines)

	system_prompt = (
		"You are a business analyst. Summarise the following report data in "
		"clear, natural language. Highlight key figures, trends, and notable "
		"items. Use bullet points for clarity. Do NOT reproduce the raw table — "
		"synthesise the information.\n\n"
		f"Report: {report_name}\n"
		f"Total rows: {total_rows}"
		f"{' (showing first ' + str(limit) + ')' if total_rows > limit else ''}\n\n"
		f"{table_text}"
	)

	user_msg = (
		f"Provide a concise summary of this {report_name} report. "
		"Focus on totals, outliers, and actionable insights."
	)

	result = _generate(system_prompt, user_msg, temperature=0.4)

	return {
		"summary": result["content"].strip(),
		"row_count": total_rows,
		"model": result["model"],
		"tokens_used": result["tokens_used"],
	}
