# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for the write confirmation feature in the tool executor."""

import json
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch


class TestCreateDocumentConfirmation(unittest.TestCase):
	"""Tests for create_document with write confirmation enabled/disabled."""

	def _make_executor(self, settings=None, tools=None):
		"""Create a ToolExecutor with mocked agent and settings."""
		from jana.services.tools.executor import ToolExecutor

		agent = SimpleNamespace(tools=tools or [], knowledge=[])
		default_settings = {
			"enable_tool_calling": 1,
			"enable_create_documents": 1,
			"enable_modify_documents": 1,
			"require_write_confirmation": 1,
		}
		if settings:
			default_settings.update(settings)
		return ToolExecutor(agent, settings=default_settings)

	@patch("jana.services.tools.executor.frappe")
	def test_create_returns_preview_when_confirmation_required(self, mock_frappe):
		"""When require_write_confirmation is ON, create_document returns a preview."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.cache = MagicMock()

		executor = self._make_executor({"require_write_confirmation": 1})
		result = executor._handle_create_document(doctype="ToDo", values={"description": "Test"})

		self.assertEqual(result["status"], "pending_confirmation")
		self.assertIn("confirmation_id", result)
		self.assertEqual(result["action"], "create")
		self.assertEqual(result["doctype"], "ToDo")
		self.assertEqual(result["values"], {"description": "Test"})
		mock_frappe.cache.set_value.assert_called_once()

	@patch("jana.services.tools.executor.frappe")
	def test_create_executes_directly_when_confirmation_off(self, mock_frappe):
		"""When require_write_confirmation is OFF, create_document executes immediately."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.scrub = MagicMock(return_value="todo")

		mock_doc = MagicMock()
		mock_doc.name = "TODO-001"
		mock_frappe.new_doc = MagicMock(return_value=mock_doc)

		executor = self._make_executor({"require_write_confirmation": 0})
		result = executor._handle_create_document(doctype="ToDo", values={"description": "Test"})

		self.assertEqual(result["status"], "created")
		self.assertEqual(result["name"], "TODO-001")
		self.assertIn("url", result)
		mock_doc.insert.assert_called_once()
		mock_frappe.db.commit.assert_called_once()

	@patch("jana.services.tools.executor.frappe")
	def test_create_preview_stores_action_in_cache(self, mock_frappe):
		"""Pending create action is stored in frappe.cache with correct key and TTL."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.cache = MagicMock()

		executor = self._make_executor({"require_write_confirmation": 1})
		result = executor._handle_create_document(doctype="ToDo", values={"description": "Cache test"})

		cache_call = mock_frappe.cache.set_value.call_args
		cache_key = cache_call[0][0]
		cache_data = cache_call[0][1]
		cache_ttl = cache_call[1]["expires_in_sec"]

		self.assertIn("jana_pending_write:test@example.com:", cache_key)
		self.assertIn(result["confirmation_id"], cache_key)
		self.assertEqual(cache_data["type"], "create")
		self.assertEqual(cache_data["doctype"], "ToDo")
		self.assertEqual(cache_data["user"], "test@example.com")
		self.assertEqual(cache_ttl, 300)


class TestUpdateDocumentConfirmation(unittest.TestCase):
	"""Tests for update_document with write confirmation enabled/disabled."""

	def _make_executor(self, settings=None):
		from jana.services.tools.executor import ToolExecutor

		agent = SimpleNamespace(tools=[], knowledge=[])
		default_settings = {
			"enable_tool_calling": 1,
			"enable_create_documents": 1,
			"enable_modify_documents": 1,
			"require_write_confirmation": 1,
		}
		if settings:
			default_settings.update(settings)
		return ToolExecutor(agent, settings=default_settings)

	@patch("jana.services.tools.executor.frappe")
	def test_update_returns_preview_with_diff(self, mock_frappe):
		"""When confirmation required, update_document shows current vs new values."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.cache = MagicMock()

		mock_doc = MagicMock()
		mock_doc.get = MagicMock(side_effect=lambda f: {"status": "Open"}.get(f))
		mock_frappe.get_doc = MagicMock(return_value=mock_doc)

		executor = self._make_executor({"require_write_confirmation": 1})
		result = executor._handle_update_document(
			doctype="ToDo", name="TODO-001", values={"status": "Closed"}
		)

		self.assertEqual(result["status"], "pending_confirmation")
		self.assertEqual(result["action"], "update")
		self.assertEqual(result["current_values"], {"status": "Open"})
		self.assertEqual(result["new_values"], {"status": "Closed"})
		self.assertIn("confirmation_id", result)

	@patch("jana.services.tools.executor.frappe")
	def test_update_executes_directly_when_confirmation_off(self, mock_frappe):
		"""When confirmation is OFF, update_document executes immediately."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.scrub = MagicMock(return_value="todo")

		mock_doc = MagicMock()
		mock_doc.name = "TODO-001"
		mock_frappe.get_doc = MagicMock(return_value=mock_doc)

		executor = self._make_executor({"require_write_confirmation": 0})
		result = executor._handle_update_document(
			doctype="ToDo", name="TODO-001", values={"status": "Closed"}
		)

		self.assertEqual(result["status"], "updated")
		self.assertEqual(result["name"], "TODO-001")
		mock_doc.save.assert_called_once()
		mock_frappe.db.commit.assert_called_once()


class TestConfirmWrite(unittest.TestCase):
	"""Tests for the confirm_write tool handler."""

	def _make_executor(self, settings=None):
		from jana.services.tools.executor import ToolExecutor

		agent = SimpleNamespace(tools=[], knowledge=[])
		default_settings = {
			"enable_tool_calling": 1,
			"enable_create_documents": 1,
			"enable_modify_documents": 1,
			"require_write_confirmation": 1,
		}
		if settings:
			default_settings.update(settings)
		return ToolExecutor(agent, settings=default_settings)

	@patch("jana.services.tools.executor.frappe")
	def test_confirm_create_executes_action(self, mock_frappe):
		"""confirm_write with a valid create action creates the document."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.scrub = MagicMock(return_value="todo")

		mock_doc = MagicMock()
		mock_doc.name = "TODO-002"
		mock_frappe.new_doc = MagicMock(return_value=mock_doc)

		cached_action = {
			"type": "create",
			"doctype": "ToDo",
			"values": {"description": "Confirmed"},
			"user": "test@example.com",
		}
		mock_frappe.cache = MagicMock()
		mock_frappe.cache.get_value = MagicMock(return_value=cached_action)

		executor = self._make_executor()
		result = executor._handle_confirm_write(confirmation_id="abc-123")

		self.assertEqual(result["status"], "created")
		self.assertEqual(result["name"], "TODO-002")
		self.assertIn("url", result)
		mock_doc.insert.assert_called_once()
		mock_frappe.cache.delete_value.assert_called_once()

	@patch("jana.services.tools.executor.frappe")
	def test_confirm_update_executes_action(self, mock_frappe):
		"""confirm_write with a valid update action updates the document."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.scrub = MagicMock(return_value="todo")

		mock_doc = MagicMock()
		mock_doc.name = "TODO-001"
		mock_frappe.get_doc = MagicMock(return_value=mock_doc)

		cached_action = {
			"type": "update",
			"doctype": "ToDo",
			"name": "TODO-001",
			"values": {"status": "Closed"},
			"user": "test@example.com",
		}
		mock_frappe.cache = MagicMock()
		mock_frappe.cache.get_value = MagicMock(return_value=cached_action)

		executor = self._make_executor()
		result = executor._handle_confirm_write(confirmation_id="xyz-789")

		self.assertEqual(result["status"], "updated")
		mock_doc.update.assert_called_with({"status": "Closed"})
		mock_doc.save.assert_called_once()

	@patch("jana.services.tools.executor.frappe")
	def test_confirm_expired_action_returns_error(self, mock_frappe):
		"""confirm_write with an expired/missing confirmation_id returns error."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.cache = MagicMock()
		mock_frappe.cache.get_value = MagicMock(return_value=None)

		executor = self._make_executor()
		result = executor._handle_confirm_write(confirmation_id="expired-id")

		self.assertIn("error", result)
		self.assertIn("expired", result["error"].lower())

	@patch("jana.services.tools.executor.frappe")
	def test_confirm_wrong_user_returns_error(self, mock_frappe):
		"""confirm_write rejects actions belonging to a different user."""
		mock_frappe.session = SimpleNamespace(user="other@example.com")
		mock_frappe.cache = MagicMock()
		mock_frappe.cache.get_value = MagicMock(
			return_value={
				"type": "create",
				"doctype": "ToDo",
				"values": {},
				"user": "test@example.com",
			}
		)

		executor = self._make_executor()
		result = executor._handle_confirm_write(confirmation_id="stolen-id")

		self.assertIn("error", result)

	@patch("jana.services.tools.executor.frappe")
	def test_confirm_deletes_cache_after_execution(self, mock_frappe):
		"""Cache entry is deleted after successful confirmation."""
		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.scrub = MagicMock(return_value="todo")
		mock_doc = MagicMock()
		mock_doc.name = "TODO-003"
		mock_frappe.new_doc = MagicMock(return_value=mock_doc)

		mock_frappe.cache = MagicMock()
		mock_frappe.cache.get_value = MagicMock(
			return_value={
				"type": "create",
				"doctype": "ToDo",
				"values": {},
				"user": "test@example.com",
			}
		)

		executor = self._make_executor()
		executor._handle_confirm_write(confirmation_id="one-time")

		mock_frappe.cache.delete_value.assert_called_once()


class TestConfirmWriteToolDefinition(unittest.TestCase):
	"""Tests for the confirm_write tool registration."""

	def test_confirm_write_in_builtin_tools(self):
		"""confirm_write is defined in BUILTIN_TOOLS."""
		from jana.services.tools.builtin import BUILTIN_TOOLS

		names = [t["tool_name"] for t in BUILTIN_TOOLS]
		self.assertIn("confirm_write", names)

	def test_confirm_write_schema_has_confirmation_id(self):
		"""confirm_write schema requires confirmation_id parameter."""
		from jana.services.tools.builtin import BUILTIN_TOOLS

		tool = next(t for t in BUILTIN_TOOLS if t["tool_name"] == "confirm_write")
		schema = json.loads(tool["parameters_schema"])
		self.assertIn("confirmation_id", schema["properties"])
		self.assertIn("confirmation_id", schema["required"])

	def test_confirm_write_toggle_is_enable_tool_calling(self):
		"""confirm_write uses enable_tool_calling as its settings toggle."""
		from jana.services.tools.builtin import BUILTIN_TOOLS

		tool = next(t for t in BUILTIN_TOOLS if t["tool_name"] == "confirm_write")
		self.assertEqual(tool["settings_toggle"], "enable_tool_calling")

	def test_create_document_description_mentions_confirmation(self):
		"""create_document description mentions the confirmation flow."""
		from jana.services.tools.builtin import BUILTIN_TOOLS

		tool = next(t for t in BUILTIN_TOOLS if t["tool_name"] == "create_document")
		self.assertIn("confirm_write", tool["description"])

	def test_update_document_description_mentions_confirmation(self):
		"""update_document description mentions the confirmation flow."""
		from jana.services.tools.builtin import BUILTIN_TOOLS

		tool = next(t for t in BUILTIN_TOOLS if t["tool_name"] == "update_document")
		self.assertIn("confirm_write", tool["description"])


class TestExecuteConfirmWrite(unittest.TestCase):
	"""Tests for calling confirm_write through the execute() dispatch method."""

	@patch("jana.services.tools.executor.frappe")
	def test_execute_dispatches_to_confirm_write_handler(self, mock_frappe):
		"""The execute() method correctly routes confirm_write tool calls."""
		from jana.services.tools.executor import ToolExecutor

		mock_frappe.session = SimpleNamespace(user="test@example.com")
		mock_frappe.has_permission = MagicMock()
		mock_frappe.scrub = MagicMock(return_value="todo")
		mock_frappe.cache = MagicMock()
		mock_frappe.cache.get_value = MagicMock(
			return_value={
				"type": "create",
				"doctype": "ToDo",
				"values": {"description": "Dispatch test"},
				"user": "test@example.com",
			}
		)
		mock_doc = MagicMock()
		mock_doc.name = "TODO-DISPATCH"
		mock_frappe.new_doc = MagicMock(return_value=mock_doc)

		agent = SimpleNamespace(tools=[], knowledge=[])
		executor = ToolExecutor(
			agent,
			settings={
				"enable_tool_calling": 1,
				"require_write_confirmation": 1,
			},
		)

		tool_call = {
			"id": "call_test",
			"type": "function",
			"function": {
				"name": "confirm_write",
				"arguments": json.dumps({"confirmation_id": "test-id"}),
			},
		}

		result = executor.execute(tool_call)
		content = json.loads(result["content"])

		self.assertEqual(result["tool_call_id"], "call_test")
		# Tool results are now wrapped by annotate_tool_result
		self.assertEqual(content["status"], "success")
		self.assertEqual(content["data"]["status"], "created")
