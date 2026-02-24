# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Agent template installation tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_agent_templates

These tests verify that the CRM Assistant, HR Assistant, and Data Analyst
agent templates are installed correctly via their respective install
functions. No database or network calls are made.
"""

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, call, patch

from jana.install import (
	CRM_ASSISTANT_PROMPT,
	DATA_ANALYST_PROMPT,
	HR_ASSISTANT_PROMPT,
	_install_crm_assistant,
	_install_data_analyst,
	_install_hr_assistant,
	_install_knowledge_articles,
)


def _mock_agent(agent_name, tools=None, knowledge=None):
	"""Create a mock Jana Agent document."""
	agent = MagicMock()
	agent.agent_name = agent_name
	agent.tools = tools or []
	agent.knowledge = knowledge or []
	return agent


# ---------------------------------------------------------------------------
# 1. CRM Assistant installation
# ---------------------------------------------------------------------------


class TestCRMAssistantInstall(unittest.TestCase):
	"""Verify _install_crm_assistant() creates agent, tools, knowledge, template."""

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_creates_agent_when_not_exists(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: False
		mock_frappe.session.user = "Administrator"
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc
		mock_frappe.get_doc.return_value = _mock_agent("CRM Assistant")

		_install_crm_assistant()

		# Agent created with correct properties
		new_doc_calls = mock_frappe.new_doc.call_args_list
		agent_call = [c for c in new_doc_calls if c[0][0] == "Jana Agent"]
		self.assertTrue(len(agent_call) >= 1)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_attaches_read_only_tools(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: dt != "Jana Template"
		mock_frappe.session.user = "Administrator"
		mock_frappe.new_doc.return_value = MagicMock()
		mock_frappe.get_doc.return_value = _mock_agent("CRM Assistant")

		_install_crm_assistant()

		expected_tools = ["read_document", "list_documents", "run_report", "navigate_to_page"]
		mock_attach.assert_called_once_with("CRM Assistant", expected_tools)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_creates_template_with_crm_category(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: False
		mock_frappe.session.user = "Administrator"
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc
		mock_frappe.get_doc.return_value = _mock_agent("CRM Assistant")

		_install_crm_assistant()

		# At least one new_doc call should set category = "crm"
		all_assigns = []
		for c in mock_frappe.new_doc.return_value.method_calls:
			pass
		# Check template category via attribute assignment
		self.assertEqual(mock_doc.category, "crm")

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_idempotent_agent_creation(self, mock_attach, mock_frappe):
		"""Calling twice when agent exists does not create duplicate."""
		mock_frappe.db.exists.return_value = True
		mock_frappe.session.user = "Administrator"
		mock_frappe.get_doc.return_value = _mock_agent("CRM Assistant")

		_install_crm_assistant()

		# new_doc should NOT be called for Jana Agent
		agent_calls = [
			c for c in mock_frappe.new_doc.call_args_list
			if c[0][0] == "Jana Agent"
		]
		self.assertEqual(len(agent_calls), 0)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_prompt_is_crm_specific(self, mock_attach, mock_frappe):
		"""CRM prompt contains CRM-relevant keywords."""
		self.assertIn("Lead", CRM_ASSISTANT_PROMPT)
		self.assertIn("Opportunity", CRM_ASSISTANT_PROMPT)
		self.assertIn("pipeline", CRM_ASSISTANT_PROMPT)
		self.assertIn("Quotation", CRM_ASSISTANT_PROMPT)


# ---------------------------------------------------------------------------
# 2. HR Assistant installation
# ---------------------------------------------------------------------------


class TestHRAssistantInstall(unittest.TestCase):
	"""Verify _install_hr_assistant() creates agent, tools, knowledge, template."""

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_creates_agent_when_not_exists(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: False
		mock_frappe.session.user = "Administrator"
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc
		mock_frappe.get_doc.return_value = _mock_agent("HR Assistant")

		_install_hr_assistant()

		agent_calls = [c for c in mock_frappe.new_doc.call_args_list if c[0][0] == "Jana Agent"]
		self.assertTrue(len(agent_calls) >= 1)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_attaches_read_only_tools(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: dt != "Jana Template"
		mock_frappe.session.user = "Administrator"
		mock_frappe.new_doc.return_value = MagicMock()
		mock_frappe.get_doc.return_value = _mock_agent("HR Assistant")

		_install_hr_assistant()

		expected_tools = ["read_document", "list_documents", "run_report", "navigate_to_page"]
		mock_attach.assert_called_once_with("HR Assistant", expected_tools)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_creates_template_with_hr_category(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: False
		mock_frappe.session.user = "Administrator"
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc
		mock_frappe.get_doc.return_value = _mock_agent("HR Assistant")

		_install_hr_assistant()

		self.assertEqual(mock_doc.category, "hr")

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_prompt_is_hr_specific(self, mock_attach, mock_frappe):
		"""HR prompt contains HR-relevant keywords."""
		self.assertIn("Leave", HR_ASSISTANT_PROMPT)
		self.assertIn("Payroll", HR_ASSISTANT_PROMPT)
		self.assertIn("Employee", HR_ASSISTANT_PROMPT)
		self.assertIn("Attendance", HR_ASSISTANT_PROMPT)


# ---------------------------------------------------------------------------
# 3. Data Analyst installation
# ---------------------------------------------------------------------------


class TestDataAnalystInstall(unittest.TestCase):
	"""Verify _install_data_analyst() creates agent, tools, knowledge, template."""

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_creates_agent_when_not_exists(self, mock_attach, mock_frappe):
		mock_frappe.db.exists.side_effect = lambda dt, name: False
		mock_frappe.session.user = "Administrator"
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc
		mock_frappe.get_doc.return_value = _mock_agent("Data Analyst")

		_install_data_analyst()

		agent_calls = [c for c in mock_frappe.new_doc.call_args_list if c[0][0] == "Jana Agent"]
		self.assertTrue(len(agent_calls) >= 1)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_temperature_is_low(self, mock_attach, mock_frappe):
		"""Data Analyst uses low temperature (0.3) for deterministic results."""
		mock_frappe.db.exists.side_effect = lambda dt, name: False
		mock_frappe.session.user = "Administrator"
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc
		mock_frappe.get_doc.return_value = _mock_agent("Data Analyst")

		_install_data_analyst()

		self.assertEqual(mock_doc.temperature, 0.3)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_prompt_contains_report_placeholder(self, mock_attach, mock_frappe):
		"""Data Analyst prompt includes the dynamic report injection placeholder."""
		self.assertIn("{{AVAILABLE_REPORTS}}", DATA_ANALYST_PROMPT)

	@patch("jana.install.frappe")
	@patch("jana.install.attach_tools_to_agent")
	def test_prompt_contains_run_report_instructions(self, mock_attach, mock_frappe):
		"""Data Analyst prompt instructs the LLM to use run_report."""
		self.assertIn("run_report", DATA_ANALYST_PROMPT)
		self.assertIn("YYYY-MM-DD", DATA_ANALYST_PROMPT)


# ---------------------------------------------------------------------------
# 4. Knowledge article installation
# ---------------------------------------------------------------------------


class TestKnowledgeArticleInstall(unittest.TestCase):
	"""Verify _install_knowledge_articles() creates all expected articles."""

	@patch("jana.install.frappe")
	def test_creates_all_articles(self, mock_frappe):
		mock_frappe.db.exists.return_value = False
		mock_frappe.new_doc.return_value = MagicMock()

		_install_knowledge_articles()

		# Count new_doc calls for Jana Knowledge Article
		article_calls = [
			c for c in mock_frappe.new_doc.call_args_list
			if c[0][0] == "Jana Knowledge Article"
		]
		# Should be 8: 3 accounting + 2 CRM + 2 HR + 1 data analysis
		self.assertEqual(len(article_calls), 8)

	@patch("jana.install.frappe")
	def test_skips_existing_articles(self, mock_frappe):
		mock_frappe.db.exists.return_value = True
		mock_frappe.new_doc.return_value = MagicMock()

		_install_knowledge_articles()

		article_calls = [
			c for c in mock_frappe.new_doc.call_args_list
			if c[0][0] == "Jana Knowledge Article"
		]
		self.assertEqual(len(article_calls), 0)

	def test_crm_articles_included(self):
		"""CRM knowledge articles (Lead Management, Sales Pipeline) exist as constants."""
		from jana.install import KNOWLEDGE_LEAD_MANAGEMENT, KNOWLEDGE_SALES_PIPELINE

		self.assertIn("Lead", KNOWLEDGE_LEAD_MANAGEMENT)
		self.assertIn("Opportunity", KNOWLEDGE_LEAD_MANAGEMENT)
		self.assertIn("Quotation", KNOWLEDGE_SALES_PIPELINE)
		self.assertIn("pipeline", KNOWLEDGE_SALES_PIPELINE.lower())

	@patch("jana.install.frappe")
	def test_hr_articles_included(self, mock_frappe):
		"""HR knowledge articles (Leave Management, Payroll Basics) are in the list."""
		from jana.install import KNOWLEDGE_LEAVE_MANAGEMENT, KNOWLEDGE_PAYROLL_BASICS

		self.assertIn("Leave Application", KNOWLEDGE_LEAVE_MANAGEMENT)
		self.assertIn("Salary Structure", KNOWLEDGE_PAYROLL_BASICS)


if __name__ == "__main__":
	unittest.main()
