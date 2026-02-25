# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Legal disclaimer capability contract tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_disclaimer

These tests verify that the capabilities dict passed via boot API
contains the keys needed by the disclaimer banner logic.
"""

import unittest
from unittest.mock import MagicMock, patch


class TestDisclaimerCapabilities(unittest.TestCase):
	"""Verify the boot API exposes write capability flags."""

	@patch("jana.api.boot.frappe")
	def test_capabilities_include_create_documents(self, mock_frappe):
		"""create_documents key must exist in capabilities dict."""
		from jana.api.boot import get_widget_config

		mock_settings = MagicMock(
			default_provider=None,
			enable_streaming=1,
			enable_chat=1,
			enable_read_documents=1,
			enable_draft_content=0,
			enable_create_documents=1,
			enable_navigate=0,
			enable_report_queries=0,
			enable_modify_documents=0,
		)
		mock_frappe.get_single.return_value = mock_settings
		mock_frappe.get_all.return_value = []

		info = get_widget_config()
		self.assertIn("capabilities", info)
		self.assertIn("create_documents", info["capabilities"])
		self.assertTrue(info["capabilities"]["create_documents"])

	@patch("jana.api.boot.frappe")
	def test_capabilities_include_modify_documents(self, mock_frappe):
		"""modify_documents key must exist in capabilities dict."""
		from jana.api.boot import get_widget_config

		mock_settings = MagicMock(
			default_provider=None,
			enable_streaming=1,
			enable_chat=1,
			enable_read_documents=1,
			enable_draft_content=0,
			enable_create_documents=0,
			enable_navigate=0,
			enable_report_queries=0,
			enable_modify_documents=1,
		)
		mock_frappe.get_single.return_value = mock_settings
		mock_frappe.get_all.return_value = []

		info = get_widget_config()
		self.assertIn("modify_documents", info["capabilities"])
		self.assertTrue(info["capabilities"]["modify_documents"])


class TestDisclaimerVisibility(unittest.TestCase):
	"""Unit tests for disclaimer show/hide logic (pure Python, no DOM)."""

	def test_show_when_create_enabled(self):
		"""Disclaimer should show when create_documents is true."""
		capabilities = {"create_documents": True, "modify_documents": False}
		dismissed = False
		visible = (capabilities.get("create_documents") or capabilities.get("modify_documents")) and not dismissed
		self.assertTrue(visible)

	def test_show_when_modify_enabled(self):
		"""Disclaimer should show when modify_documents is true."""
		capabilities = {"create_documents": False, "modify_documents": True}
		dismissed = False
		visible = (capabilities.get("create_documents") or capabilities.get("modify_documents")) and not dismissed
		self.assertTrue(visible)

	def test_hide_when_both_disabled(self):
		"""Disclaimer should hide when neither write capability is enabled."""
		capabilities = {"create_documents": False, "modify_documents": False}
		dismissed = False
		visible = (capabilities.get("create_documents") or capabilities.get("modify_documents")) and not dismissed
		self.assertFalse(visible)

	def test_hide_when_dismissed(self):
		"""Disclaimer should hide after user dismisses it."""
		capabilities = {"create_documents": True, "modify_documents": True}
		dismissed = True
		visible = (capabilities.get("create_documents") or capabilities.get("modify_documents")) and not dismissed
		self.assertFalse(visible)

	def test_show_when_both_enabled(self):
		"""Disclaimer should show when both write capabilities are enabled."""
		capabilities = {"create_documents": True, "modify_documents": True}
		dismissed = False
		visible = (capabilities.get("create_documents") or capabilities.get("modify_documents")) and not dismissed
		self.assertTrue(visible)
