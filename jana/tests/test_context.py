# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for the document context service (context.py)."""

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch


class TestGetWorkflowContext(unittest.TestCase):
	"""Tests for _get_workflow_context helper."""

	def _call(self, meta, doc, doctype="Test DocType", docname="TEST-001"):
		from jana.services.context import _get_workflow_context

		return _get_workflow_context(meta, doc, doctype, docname)

	@patch("jana.services.context.frappe")
	def test_submittable_draft_can_submit(self, mock_frappe):
		"""Draft (docstatus=0) of a submittable DocType shows Submit action."""
		mock_frappe.has_permission = MagicMock(return_value=True)
		mock_frappe.get_all = MagicMock(return_value=[])

		meta = SimpleNamespace(is_submittable=True)
		doc = MagicMock()
		doc.get = MagicMock(side_effect=lambda f, d=None: {"docstatus": 0}.get(f, d))

		result = self._call(meta, doc)

		self.assertTrue(result["is_submittable"])
		self.assertEqual(result["docstatus_label"], "Draft")
		self.assertIn("Submit", result.get("available_actions", []))

	@patch("jana.services.context.frappe")
	def test_submittable_submitted_can_cancel_and_amend(self, mock_frappe):
		"""Submitted (docstatus=1) shows Cancel and Amend actions."""
		mock_frappe.has_permission = MagicMock(return_value=True)
		mock_frappe.get_all = MagicMock(return_value=[])

		meta = SimpleNamespace(is_submittable=True)
		doc = MagicMock()
		doc.get = MagicMock(side_effect=lambda f, d=None: {"docstatus": 1}.get(f, d))

		result = self._call(meta, doc)

		self.assertEqual(result["docstatus_label"], "Submitted")
		self.assertIn("Cancel", result.get("available_actions", []))
		self.assertIn("Amend", result.get("available_actions", []))

	@patch("jana.services.context.frappe")
	def test_submittable_cancelled_can_amend(self, mock_frappe):
		"""Cancelled (docstatus=2) shows Amend action."""
		mock_frappe.has_permission = MagicMock(return_value=True)
		mock_frappe.get_all = MagicMock(return_value=[])

		meta = SimpleNamespace(is_submittable=True)
		doc = MagicMock()
		doc.get = MagicMock(side_effect=lambda f, d=None: {"docstatus": 2}.get(f, d))

		result = self._call(meta, doc)

		self.assertEqual(result["docstatus_label"], "Cancelled")
		self.assertIn("Amend", result.get("available_actions", []))

	@patch("jana.services.context.frappe")
	def test_non_submittable_has_no_docstatus_actions(self, mock_frappe):
		"""Non-submittable DocTypes don't include submit/cancel/amend."""
		mock_frappe.get_all = MagicMock(return_value=[])

		meta = SimpleNamespace(is_submittable=False)
		doc = MagicMock()
		doc.get = MagicMock(return_value=None)

		result = self._call(meta, doc)

		self.assertNotIn("is_submittable", result)
		self.assertNotIn("available_actions", result)

	@patch("jana.services.context.frappe")
	def test_permission_denied_hides_submit(self, mock_frappe):
		"""If user lacks submit permission, Submit is not in available_actions."""
		mock_frappe.has_permission = MagicMock(side_effect=frappe_permission_error)
		mock_frappe.get_all = MagicMock(return_value=[])
		mock_frappe.PermissionError = PermissionError

		meta = SimpleNamespace(is_submittable=True)
		doc = MagicMock()
		doc.get = MagicMock(side_effect=lambda f, d=None: {"docstatus": 0}.get(f, d))

		result = self._call(meta, doc)

		self.assertNotIn("available_actions", result)

	@patch("jana.services.context.frappe")
	def test_workflow_state_included(self, mock_frappe):
		"""Workflow state and name are included when a Workflow is active."""
		mock_frappe.get_all = MagicMock(return_value=[SimpleNamespace(name="Invoice Approval")])

		transition = SimpleNamespace(state="Pending", action="Approve", allowed="Accounts Manager")
		workflow_doc = SimpleNamespace(name="Invoice Approval", transitions=[transition])
		mock_frappe.get_doc = MagicMock(return_value=workflow_doc)
		mock_frappe.get_roles = MagicMock(return_value=["Accounts Manager", "System Manager"])

		meta = SimpleNamespace(is_submittable=False)
		doc = MagicMock()
		doc.get = MagicMock(side_effect=lambda f, d=None: {"workflow_state": "Pending"}.get(f, d))

		result = self._call(meta, doc)

		self.assertEqual(result["workflow_state"], "Pending")
		self.assertEqual(result["workflow_name"], "Invoice Approval")
		self.assertIn("Approve", result.get("available_actions", []))

	@patch("jana.services.context.frappe")
	def test_workflow_wrong_role_hides_action(self, mock_frappe):
		"""Workflow transitions are hidden if user doesn't have the required role."""
		mock_frappe.get_all = MagicMock(return_value=[SimpleNamespace(name="Invoice Approval")])

		transition = SimpleNamespace(state="Pending", action="Approve", allowed="CEO")
		workflow_doc = SimpleNamespace(name="Invoice Approval", transitions=[transition])
		mock_frappe.get_doc = MagicMock(return_value=workflow_doc)
		mock_frappe.get_roles = MagicMock(return_value=["Guest"])

		meta = SimpleNamespace(is_submittable=False)
		doc = MagicMock()
		doc.get = MagicMock(side_effect=lambda f, d=None: {"workflow_state": "Pending"}.get(f, d))

		result = self._call(meta, doc)

		self.assertEqual(result["workflow_state"], "Pending")
		self.assertNotIn("available_actions", result)


class TestFormatContextForPrompt(unittest.TestCase):
	"""Tests for format_context_for_prompt including workflow data."""

	def test_includes_docstatus_label(self):
		from jana.services.context import format_context_for_prompt

		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {},
			"status": 1,
			"docstatus_label": "Submitted",
			"is_submittable": True,
		}
		result = format_context_for_prompt(context)
		self.assertIn("Document status: Submitted", result)

	def test_includes_workflow_state(self):
		from jana.services.context import format_context_for_prompt

		context = {
			"doctype": "Leave Application",
			"docname": "LA-001",
			"fields": {},
			"status": 0,
			"workflow_state": "Pending Approval",
			"workflow_name": "Leave Approval",
		}
		result = format_context_for_prompt(context)
		self.assertIn("Workflow state: Pending Approval", result)
		self.assertIn("Leave Approval", result)

	def test_includes_available_actions(self):
		from jana.services.context import format_context_for_prompt

		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {},
			"status": 0,
			"available_actions": ["Submit", "Cancel"],
		}
		result = format_context_for_prompt(context)
		self.assertIn("Available actions: Submit, Cancel", result)

	def test_no_actions_when_empty(self):
		from jana.services.context import format_context_for_prompt

		context = {
			"doctype": "ToDo",
			"docname": "TODO-001",
			"fields": {},
			"status": 0,
		}
		result = format_context_for_prompt(context)
		self.assertNotIn("Available actions", result)

	def test_empty_context_returns_empty_string(self):
		from jana.services.context import format_context_for_prompt

		self.assertEqual(format_context_for_prompt(None), "")
		self.assertEqual(format_context_for_prompt({}), "")

	def test_fields_still_included(self):
		from jana.services.context import format_context_for_prompt

		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer": {"label": "Customer", "value": "ACME Corp", "fieldtype": "Link"},
			},
			"status": 0,
		}
		result = format_context_for_prompt(context)
		self.assertIn("Customer: ACME Corp", result)


def frappe_permission_error(*args, **kwargs):
	"""Helper to simulate frappe.PermissionError."""
	raise PermissionError("No permission")
