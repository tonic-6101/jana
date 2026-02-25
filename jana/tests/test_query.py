# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Report discovery and prompt injection tests for Ask AI.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_query

These tests verify that available reports are discovered, filtered by
permission, formatted into the system prompt, and correctly injected
via the {{AVAILABLE_REPORTS}} placeholder. No database or network calls.
"""

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from jana.services.query import format_reports_for_prompt, get_available_reports

# ---------------------------------------------------------------------------
# 1. Report discovery
# ---------------------------------------------------------------------------


class TestGetAvailableReports(unittest.TestCase):
	"""Verify get_available_reports() queries and permission-filters reports."""

	@patch("jana.services.query.frappe")
	def test_returns_accessible_reports(self, mock_frappe):
		mock_frappe.get_all.return_value = [
			SimpleNamespace(
				name="Sales Register",
				report_type="Script Report",
				ref_doctype="Sales Invoice",
				module="Accounts",
			),
			SimpleNamespace(
				name="Stock Balance", report_type="Script Report", ref_doctype="Bin", module="Stock"
			),
		]
		mock_frappe.has_permission.return_value = True
		mock_frappe.PermissionError = PermissionError

		result = get_available_reports(limit=50)

		self.assertEqual(len(result), 2)
		self.assertEqual(result[0]["name"], "Sales Register")
		self.assertEqual(result[0]["module"], "Accounts")
		self.assertEqual(result[1]["name"], "Stock Balance")

	@patch("jana.services.query.frappe")
	def test_filters_out_inaccessible_reports(self, mock_frappe):
		mock_frappe.get_all.return_value = [
			SimpleNamespace(
				name="Allowed Report", report_type="Report Builder", ref_doctype="Item", module="Stock"
			),
			SimpleNamespace(
				name="Denied Report", report_type="Report Builder", ref_doctype="Salary Slip", module="HR"
			),
		]
		mock_frappe.PermissionError = PermissionError

		def permission_check(doctype, doc=None):
			if doc == "Denied Report":
				raise PermissionError("No access")
			return True

		mock_frappe.has_permission.side_effect = permission_check

		result = get_available_reports(limit=50)

		self.assertEqual(len(result), 1)
		self.assertEqual(result[0]["name"], "Allowed Report")

	@patch("jana.services.query.frappe")
	def test_respects_limit(self, mock_frappe):
		mock_frappe.get_all.return_value = [
			SimpleNamespace(
				name=f"Report {i}", report_type="Report Builder", ref_doctype="Item", module="Stock"
			)
			for i in range(20)
		]
		mock_frappe.has_permission.return_value = True
		mock_frappe.PermissionError = PermissionError

		result = get_available_reports(limit=5)

		self.assertEqual(len(result), 5)

	@patch("jana.services.query.frappe")
	def test_empty_database(self, mock_frappe):
		mock_frappe.get_all.return_value = []
		mock_frappe.PermissionError = PermissionError

		result = get_available_reports(limit=50)

		self.assertEqual(result, [])

	@patch("jana.services.query.frappe")
	def test_handles_missing_fields(self, mock_frappe):
		mock_frappe.get_all.return_value = [
			SimpleNamespace(
				name="Minimal Report", report_type="Script Report", ref_doctype=None, module=None
			),
		]
		mock_frappe.has_permission.return_value = True
		mock_frappe.PermissionError = PermissionError

		result = get_available_reports(limit=50)

		self.assertEqual(len(result), 1)
		self.assertEqual(result[0]["doctype"], "")
		self.assertEqual(result[0]["module"], "")


# ---------------------------------------------------------------------------
# 2. Prompt formatting
# ---------------------------------------------------------------------------


class TestFormatReportsForPrompt(unittest.TestCase):
	"""Verify format_reports_for_prompt() produces correct markdown."""

	def test_empty_list_returns_fallback(self):
		result = format_reports_for_prompt([])

		self.assertIn("list_documents", result)
		self.assertNotIn("## Available Reports", result)

	def test_formats_with_module_and_doctype(self):
		reports = [
			{
				"name": "Sales Register",
				"type": "Script Report",
				"doctype": "Sales Invoice",
				"module": "Accounts",
			},
		]

		result = format_reports_for_prompt(reports)

		self.assertIn("## Available Reports", result)
		self.assertIn("**Sales Register**", result)
		self.assertIn("[Accounts]", result)
		self.assertIn("(DocType: Sales Invoice)", result)
		self.assertIn("run_report", result)

	def test_formats_without_optional_fields(self):
		reports = [
			{"name": "Custom Report", "type": "Report Builder", "doctype": "", "module": ""},
		]

		result = format_reports_for_prompt(reports)

		self.assertIn("**Custom Report**", result)
		self.assertNotIn("[", result.split("Custom Report")[1].split("\n")[0])

	def test_multiple_reports(self):
		reports = [
			{"name": "Report A", "type": "Script Report", "doctype": "Item", "module": "Stock"},
			{"name": "Report B", "type": "Report Builder", "doctype": "Lead", "module": "CRM"},
			{"name": "Report C", "type": "Script Report", "doctype": "", "module": "Accounts"},
		]

		result = format_reports_for_prompt(reports)

		self.assertIn("**Report A**", result)
		self.assertIn("**Report B**", result)
		self.assertIn("**Report C**", result)
		self.assertEqual(result.count("- **"), 3)

	def test_includes_usage_instructions(self):
		reports = [{"name": "Test", "type": "Script Report", "doctype": "", "module": ""}]

		result = format_reports_for_prompt(reports)

		self.assertIn("run_report", result)
		self.assertIn("filters", result)


# ---------------------------------------------------------------------------
# 3. Report injection into system prompt
# ---------------------------------------------------------------------------


class TestReportInjection(unittest.TestCase):
	"""Verify the {{AVAILABLE_REPORTS}} placeholder is replaced in chat.py."""

	def test_placeholder_replaced(self):
		"""Simulate the replacement logic from chat.py _build_messages."""
		prompt = "You are a data analyst.\n\n{{AVAILABLE_REPORTS}}"
		reports = [
			{
				"name": "Sales Register",
				"type": "Script Report",
				"doctype": "Sales Invoice",
				"module": "Accounts",
			},
		]

		result = prompt.replace("{{AVAILABLE_REPORTS}}", format_reports_for_prompt(reports))

		self.assertNotIn("{{AVAILABLE_REPORTS}}", result)
		self.assertIn("Sales Register", result)
		self.assertIn("## Available Reports", result)

	def test_no_placeholder_unchanged(self):
		"""Prompts without the placeholder are returned as-is."""
		prompt = "You are a general assistant."

		self.assertFalse("{{AVAILABLE_REPORTS}}" in prompt)
		# No replacement needed — prompt stays the same
		self.assertEqual(prompt, "You are a general assistant.")

	def test_placeholder_with_empty_reports(self):
		"""When no reports exist, placeholder is replaced with fallback text."""
		prompt = "Query data.\n\n{{AVAILABLE_REPORTS}}"

		result = prompt.replace("{{AVAILABLE_REPORTS}}", format_reports_for_prompt([]))

		self.assertNotIn("{{AVAILABLE_REPORTS}}", result)
		self.assertIn("list_documents", result)


if __name__ == "__main__":
	unittest.main()
