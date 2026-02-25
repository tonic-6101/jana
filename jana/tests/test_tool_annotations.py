# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for tool result annotation and chain monitor."""

import unittest


class TestAnnotateToolResult(unittest.TestCase):
	"""Tests for tool_annotations.annotate_tool_result."""

	def test_success_result_has_required_fields(self):
		"""Successful results must include status, data, source, instruction."""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		data = {"name": "SINV-001", "grand_total": 5000}
		result = annotate_tool_result(data, "read_document")

		self.assertEqual(result["status"], "success")
		self.assertEqual(result["data"], data)
		self.assertEqual(result["source"], "frappe_api:read_document")
		self.assertIn("as-is", result["instruction"])

	def test_error_result_has_required_fields(self):
		"""Error results must include status, data, source, instruction."""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		result = annotate_tool_result("Something went wrong", "create_document", status="error")

		self.assertEqual(result["status"], "error")
		self.assertIn("error", result["data"])
		self.assertEqual(result["source"], "frappe_api:create_document")
		self.assertIn("honestly", result["instruction"])

	def test_error_with_dict_data(self):
		"""Error results with dict data should preserve the dict."""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		error_data = {"error": "DocType does not exist"}
		result = annotate_tool_result(error_data, "list_documents", status="error")

		self.assertEqual(result["data"], error_data)

	def test_source_includes_tool_name(self):
		"""Source field must include the tool name."""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		result = annotate_tool_result({}, "navigate_to_page")
		self.assertEqual(result["source"], "frappe_api:navigate_to_page")

	def test_success_instruction_warns_about_adding(self):
		"""Success instruction must tell LLM not to add extra info."""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		result = annotate_tool_result({}, "read_document")
		self.assertIn("Do not add information", result["instruction"])

	def test_error_instruction_warns_about_guessing(self):
		"""Error instruction must tell LLM not to guess results."""
		from jana.services.guardrails.tool_annotations import annotate_tool_result

		result = annotate_tool_result("err", "create_document", status="error")
		self.assertIn("Do NOT guess", result["instruction"])


class TestToolChainMonitor(unittest.TestCase):
	"""Tests for chain_monitor.ToolChainMonitor."""

	def test_first_write_allowed(self):
		"""First write operation should be allowed."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		monitor.record("create_document", {"doctype": "Todo"})
		self.assertFalse(monitor.write_blocked)

	def test_second_write_blocked(self):
		"""Second write operation in same turn should be blocked."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		monitor.record("create_document", {"doctype": "Todo"})
		monitor.record("update_document", {"doctype": "Todo", "name": "TODO-001"})
		self.assertTrue(monitor.write_blocked)

	def test_check_write_allowed_returns_error(self):
		"""check_write_allowed should return error dict for blocked writes."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		monitor.record("create_document", {"doctype": "Todo"})
		monitor.record("create_document", {"doctype": "Todo"})
		result = monitor.check_write_allowed("create_document")
		self.assertIsNotNone(result)
		self.assertIn("error", result)

	def test_reads_not_counted_as_writes(self):
		"""Read operations should not count toward write limit."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		monitor.record("read_document", {"doctype": "Todo", "name": "TODO-001"})
		monitor.record("read_document", {"doctype": "Todo", "name": "TODO-002"})
		self.assertFalse(monitor.write_blocked)

	def test_enumeration_detected_after_3_reads(self):
		"""3+ sequential reads should flag as potential enumeration."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		for i in range(3):
			monitor.record("read_document", {"doctype": "User", "name": f"user{i}"})
		self.assertTrue(monitor.enumeration_detected)

	def test_enumeration_not_detected_under_3_reads(self):
		"""Fewer than 3 reads should not flag enumeration."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		monitor.record("read_document", {"doctype": "User", "name": "user1"})
		monitor.record("read_document", {"doctype": "User", "name": "user2"})
		self.assertFalse(monitor.enumeration_detected)

	def test_read_operation_not_blocked_by_write_check(self):
		"""check_write_allowed should return None for read operations."""
		from jana.services.guardrails.chain_monitor import ToolChainMonitor

		monitor = ToolChainMonitor()
		result = monitor.check_write_allowed("read_document")
		self.assertIsNone(result)
