# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe
from frappe.utils import strip_html_tags


def get_knowledge_for_prompt(agent_name: str, context_doctype: str = None) -> list[dict]:
	"""Collect relevant knowledge articles for the active agent.

	Selection logic:
	1. All enabled articles attached to the agent via Jana Agent Knowledge
	2. Plus any enabled articles with matching doctype_scope (if context_doctype is set)
	3. Deduplicated by article name
	4. Sorted: agent-attached first, then scope-matched

	Returns a list of dicts: [{"name": ..., "title": ..., "content": ...}, ...]
	"""
	seen = set()
	articles = []

	# 1. Agent-attached articles
	agent_rows = frappe.get_all(
		"Jana Agent Knowledge",
		filters={"parent": agent_name, "parenttype": "Jana Agent", "enabled": 1},
		fields=["knowledge_article"],
	)

	for row in agent_rows:
		article_name = row["knowledge_article"]
		if article_name in seen:
			continue

		doc = frappe.get_doc("Jana Knowledge Article", article_name)
		if not doc.enabled:
			continue

		plain = doc.get_plain_content()
		if plain:
			articles.append(
				{
					"name": doc.name,
					"title": doc.article_title,
					"content": plain,
				}
			)
			seen.add(article_name)

	# 2. Scope-matched articles (auto-selected by doctype_scope)
	if context_doctype:
		scope_articles = frappe.get_all(
			"Jana Knowledge Article",
			filters={"doctype_scope": context_doctype, "enabled": 1},
			fields=["name"],
		)

		for row in scope_articles:
			article_name = row["name"]
			if article_name in seen:
				continue

			doc = frappe.get_doc("Jana Knowledge Article", article_name)
			plain = doc.get_plain_content()
			if plain:
				articles.append(
					{
						"name": doc.name,
						"title": doc.article_title,
						"content": plain,
					}
				)
				seen.add(article_name)

	return articles


def format_knowledge_for_prompt(articles: list[dict], token_budget: int = 30000) -> str:
	"""Format articles into a text block for system prompt injection.

	- Estimate tokens (~4 chars per token)
	- Truncate if total exceeds budget
	- Return formatted string with article titles as headers
	"""
	if not articles:
		return ""

	parts = []
	tokens_used = 0

	for article in articles:
		header = f"## {article['title']}"
		body = article["content"]
		block = f"{header}\n\n{body}"

		block_tokens = estimate_tokens(block)

		if tokens_used + block_tokens > token_budget:
			# Fit as much of this article as possible
			remaining_tokens = token_budget - tokens_used
			if remaining_tokens > 100:  # Only include if we can fit something meaningful
				max_chars = remaining_tokens * 4
				truncated = block[:max_chars].rsplit(" ", 1)[0] + "..."
				parts.append(truncated)
			break

		parts.append(block)
		tokens_used += block_tokens

	if not parts:
		return ""

	return "# Knowledge Base\n\n" + "\n\n---\n\n".join(parts)


def estimate_tokens(text: str) -> int:
	"""Rough token estimate: len(text) / 4"""
	if not text:
		return 0
	return len(text) // 4
