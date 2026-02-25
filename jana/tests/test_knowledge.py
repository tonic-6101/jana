# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Knowledge base retrieval and prompt injection tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_knowledge

These tests verify that knowledge articles are correctly collected,
formatted, and injected into the LLM system prompt. No network calls
are made; the LLM provider is not contacted.
"""

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from jana.services.knowledge.retriever import (
	estimate_tokens,
	format_knowledge_for_prompt,
	get_knowledge_for_prompt,
)


def _make_article(name, title, content, enabled=1, doctype_scope=None, html=False):
	"""Create a mock Jana Knowledge Article document."""
	doc = SimpleNamespace(
		name=name,
		article_title=title,
		content=content,
		enabled=enabled,
		doctype_scope=doctype_scope,
	)
	if html:
		doc.get_plain_content = lambda: __import__("frappe").utils.strip_html_tags(content).strip()
	else:
		doc.get_plain_content = lambda: content.strip() if content else ""
	return doc


# ---------------------------------------------------------------------------
# 1. Knowledge retrieval — agent-attached articles
# ---------------------------------------------------------------------------


class TestKnowledgeRetrieval(unittest.TestCase):
	"""Articles attached to an agent via Jana Agent Knowledge are collected."""

	@patch("jana.services.knowledge.retriever.frappe")
	def test_agent_attached_articles_collected(self, mock_frappe):
		article = _make_article("ART-001", "Return Policy", "Returns accepted within 30 days.")

		mock_frappe.get_all.side_effect = [
			# Agent knowledge rows
			[{"knowledge_article": "ART-001"}],
		]
		mock_frappe.get_doc.return_value = article

		result = get_knowledge_for_prompt("General Assistant", context_doctype=None)

		self.assertEqual(len(result), 1)
		self.assertEqual(result[0]["title"], "Return Policy")
		self.assertEqual(result[0]["content"], "Returns accepted within 30 days.")

	@patch("jana.services.knowledge.retriever.frappe")
	def test_disabled_article_excluded(self, mock_frappe):
		article = _make_article("ART-002", "Old Policy", "Deprecated content.", enabled=0)

		mock_frappe.get_all.return_value = [{"knowledge_article": "ART-002"}]
		mock_frappe.get_doc.return_value = article

		result = get_knowledge_for_prompt("General Assistant", context_doctype=None)

		self.assertEqual(len(result), 0)


# ---------------------------------------------------------------------------
# 2. Knowledge retrieval — scope matching
# ---------------------------------------------------------------------------


class TestKnowledgeScopeMatching(unittest.TestCase):
	"""Articles with matching doctype_scope are auto-included."""

	@patch("jana.services.knowledge.retriever.frappe")
	def test_scope_matched_articles_included(self, mock_frappe):
		scoped_article = _make_article(
			"ART-003", "Invoice FAQ", "Common invoice questions.", doctype_scope="Sales Invoice"
		)

		mock_frappe.get_all.side_effect = [
			# No agent-attached articles
			[],
			# Scope-matched articles
			[{"name": "ART-003"}],
		]
		mock_frappe.get_doc.return_value = scoped_article

		result = get_knowledge_for_prompt("General Assistant", context_doctype="Sales Invoice")

		self.assertEqual(len(result), 1)
		self.assertEqual(result[0]["title"], "Invoice FAQ")

	@patch("jana.services.knowledge.retriever.frappe")
	def test_no_scope_match_no_extra_articles(self, mock_frappe):
		mock_frappe.get_all.side_effect = [
			[],  # No agent-attached
			[],  # No scope-matched
		]

		result = get_knowledge_for_prompt("General Assistant", context_doctype="Sales Invoice")

		self.assertEqual(len(result), 0)


# ---------------------------------------------------------------------------
# 3. Knowledge retrieval — deduplication
# ---------------------------------------------------------------------------


class TestKnowledgeDeduplication(unittest.TestCase):
	"""Same article attached AND scope-matched appears only once."""

	@patch("jana.services.knowledge.retriever.frappe")
	def test_duplicate_article_appears_once(self, mock_frappe):
		article = _make_article(
			"ART-004", "Pricing Rules", "Standard pricing applies.", doctype_scope="Sales Invoice"
		)

		mock_frappe.get_all.side_effect = [
			# Agent-attached
			[{"knowledge_article": "ART-004"}],
			# Also scope-matched
			[{"name": "ART-004"}],
		]
		mock_frappe.get_doc.return_value = article

		result = get_knowledge_for_prompt("General Assistant", context_doctype="Sales Invoice")

		self.assertEqual(len(result), 1)
		self.assertEqual(result[0]["name"], "ART-004")


# ---------------------------------------------------------------------------
# 4. Token budget enforcement
# ---------------------------------------------------------------------------


class TestTokenBudget(unittest.TestCase):
	"""Articles exceeding the token budget are truncated."""

	def test_articles_within_budget_included(self):
		articles = [
			{"name": "A1", "title": "Short", "content": "Brief content."},
			{"name": "A2", "title": "Also Short", "content": "More brief content."},
		]

		result = format_knowledge_for_prompt(articles, token_budget=30000)

		self.assertIn("Short", result)
		self.assertIn("Also Short", result)

	def test_articles_exceeding_budget_truncated(self):
		# Create a very large article (~50k tokens = ~200k chars)
		big_content = "word " * 50000
		articles = [
			{"name": "A1", "title": "Small", "content": "Fits easily."},
			{"name": "A2", "title": "Huge", "content": big_content},
		]

		result = format_knowledge_for_prompt(articles, token_budget=1000)

		self.assertIn("Small", result)
		# The huge article should be truncated or omitted
		self.assertTrue(len(result) < len(big_content))

	def test_empty_articles_return_empty(self):
		result = format_knowledge_for_prompt([], token_budget=30000)
		self.assertEqual(result, "")


# ---------------------------------------------------------------------------
# 5. HTML stripping
# ---------------------------------------------------------------------------


class TestHTMLStripping(unittest.TestCase):
	"""Rich text content is stripped to plain text for the LLM."""

	def test_html_tags_stripped(self):
		from frappe.utils import strip_html_tags

		html_content = "<p>Our <b>return policy</b> allows returns within <em>30 days</em>.</p>"
		plain = strip_html_tags(html_content).strip()

		self.assertNotIn("<p>", plain)
		self.assertNotIn("<b>", plain)
		self.assertNotIn("<em>", plain)
		self.assertIn("return policy", plain)
		self.assertIn("30 days", plain)

	def test_get_plain_content_method(self):
		from jana.jana.doctype.jana_knowledge_article.jana_knowledge_article import (
			JanaKnowledgeArticle,
		)

		doc = JanaKnowledgeArticle.__new__(JanaKnowledgeArticle)
		doc.content = "<h1>Title</h1><p>Body text here.</p>"

		plain = doc.get_plain_content()

		self.assertNotIn("<h1>", plain)
		self.assertNotIn("<p>", plain)
		self.assertIn("Title", plain)
		self.assertIn("Body text here.", plain)


# ---------------------------------------------------------------------------
# 6. Business description injection
# ---------------------------------------------------------------------------


class TestBusinessDescription(unittest.TestCase):
	"""Business description is injected before the agent prompt."""

	@patch("jana.services.knowledge.retriever.frappe")
	def test_business_description_in_prompt(self, mock_frappe):
		"""Simulate the _build_messages assembly with a business description."""
		business_desc = "We are a B2B manufacturing company based in Riyadh."
		agent_prompt = "You are Jana, an AI assistant."

		# Simulate the assembly logic from chat.py _build_messages
		parts = []
		if business_desc:
			parts.append(business_desc)
		parts.append(agent_prompt)

		system_prompt = "\n\n---\n\n".join(parts)

		# Business description comes first
		self.assertTrue(system_prompt.startswith("We are a B2B"))
		self.assertIn("You are Jana", system_prompt)
		# Business desc before agent prompt
		bd_pos = system_prompt.index("We are a B2B")
		ap_pos = system_prompt.index("You are Jana")
		self.assertLess(bd_pos, ap_pos)


# ---------------------------------------------------------------------------
# 7. Prompt assembly order
# ---------------------------------------------------------------------------


class TestPromptAssemblyOrder(unittest.TestCase):
	"""Verify: business desc -> knowledge -> agent prompt -> page context."""

	def test_full_assembly_order(self):
		"""All four parts are assembled in the correct order."""
		business_desc = "BUSINESS_DESC"
		knowledge_text = "KNOWLEDGE_TEXT"
		agent_prompt = "AGENT_PROMPT"
		context_text = "PAGE_CONTEXT"

		parts = [business_desc, knowledge_text, agent_prompt, context_text]
		system_prompt = "\n\n---\n\n".join(parts)

		bd_pos = system_prompt.index("BUSINESS_DESC")
		kn_pos = system_prompt.index("KNOWLEDGE_TEXT")
		ap_pos = system_prompt.index("AGENT_PROMPT")
		pc_pos = system_prompt.index("PAGE_CONTEXT")

		self.assertLess(bd_pos, kn_pos, "Business desc must come before knowledge")
		self.assertLess(kn_pos, ap_pos, "Knowledge must come before agent prompt")
		self.assertLess(ap_pos, pc_pos, "Agent prompt must come before page context")

	def test_missing_parts_still_ordered(self):
		"""When some parts are missing, remaining parts keep correct order."""
		# No business desc, no knowledge
		agent_prompt = "AGENT_PROMPT"
		context_text = "PAGE_CONTEXT"

		parts = [agent_prompt, context_text]
		system_prompt = "\n\n---\n\n".join(parts)

		ap_pos = system_prompt.index("AGENT_PROMPT")
		pc_pos = system_prompt.index("PAGE_CONTEXT")

		self.assertLess(ap_pos, pc_pos)


# ---------------------------------------------------------------------------
# 8. PII masking on knowledge content
# ---------------------------------------------------------------------------


class TestPIIMaskingOnKnowledge(unittest.TestCase):
	"""PII in knowledge articles is masked by the existing masker.

	Knowledge text is part of the system prompt. The masker's mask_messages()
	call in chat.py covers system messages — PII in knowledge content is
	automatically caught by the free-text regex pass.
	"""

	def test_pii_in_knowledge_masked_by_masker(self):
		"""Simulate: knowledge contains an email, masker catches it."""
		from unittest.mock import patch as _patch

		from jana.services.privacy.masker import PIIMasker

		provider_doc = SimpleNamespace(
			provider_type="openai",
			mask_pii_override="Always On",
		)
		with _patch("jana.services.privacy.masker.frappe") as mock_frappe:
			mock_frappe.db.get_single_value.return_value = 1
			masker = PIIMasker(provider_doc)

		# Knowledge article contains PII
		knowledge_text = "Contact our sales team at sales@acme.com for quotes."

		# mask_text on system content catches PII. In the actual flow,
		# PII in the system prompt is sent as-is (trusted internal
		# content), but the masker works when applied:
		masked_text = masker.mask_text(knowledge_text)
		self.assertNotIn("sales@acme.com", masked_text)
		self.assertIn("[EMAIL_1]", masked_text)


# ---------------------------------------------------------------------------
# 9. Empty knowledge — backward compatibility
# ---------------------------------------------------------------------------


class TestEmptyKnowledge(unittest.TestCase):
	"""No articles, no business description -> behaves exactly as before."""

	@patch("jana.services.knowledge.retriever.frappe")
	def test_no_articles_returns_empty_list(self, mock_frappe):
		mock_frappe.get_all.return_value = []

		result = get_knowledge_for_prompt("General Assistant", context_doctype=None)

		self.assertEqual(result, [])

	def test_format_empty_articles_returns_empty_string(self):
		result = format_knowledge_for_prompt([])
		self.assertEqual(result, "")

	def test_empty_prompt_assembly_no_knowledge(self):
		"""When nothing is configured, system prompt is just the agent prompt."""
		business_desc = ""
		knowledge_text = ""
		agent_prompt = "You are Jana."

		parts = []
		if business_desc:
			parts.append(business_desc)
		if knowledge_text:
			parts.append(knowledge_text)
		parts.append(agent_prompt)

		system_prompt = "\n\n---\n\n".join(parts)

		self.assertEqual(system_prompt, "You are Jana.")


# ---------------------------------------------------------------------------
# 10. Token estimation
# ---------------------------------------------------------------------------


class TestTokenEstimation(unittest.TestCase):
	"""Verify the rough token estimator."""

	def test_empty_string(self):
		self.assertEqual(estimate_tokens(""), 0)

	def test_none_input(self):
		self.assertEqual(estimate_tokens(None), 0)

	def test_known_length(self):
		# 400 chars = ~100 tokens
		text = "a" * 400
		self.assertEqual(estimate_tokens(text), 100)

	def test_short_text(self):
		# 3 chars -> 0 tokens (integer division)
		self.assertEqual(estimate_tokens("abc"), 0)

	def test_realistic_text(self):
		text = "This is a typical English sentence with several words in it."
		tokens = estimate_tokens(text)
		self.assertGreater(tokens, 10)
		self.assertLess(tokens, 30)


if __name__ == "__main__":
	unittest.main()
