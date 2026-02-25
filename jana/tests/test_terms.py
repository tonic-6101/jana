# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""BYOK Terms acceptance tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_terms
"""

import unittest
from unittest.mock import MagicMock, patch


class TestHasAcceptedTerms(unittest.TestCase):
	"""Verify has_accepted_terms() checks the database correctly."""

	@patch("jana.services.terms.frappe")
	def test_returns_false_before_acceptance(self, mock_frappe):
		mock_frappe.session.user = "user@test.com"
		mock_frappe.db.exists.return_value = None

		from jana.services.terms import has_accepted_terms

		self.assertFalse(has_accepted_terms("user@test.com"))

	@patch("jana.services.terms.frappe")
	def test_returns_true_after_acceptance(self, mock_frappe):
		mock_frappe.session.user = "user@test.com"
		mock_frappe.db.exists.return_value = "JTERMS-user@test.com-1.0"

		from jana.services.terms import has_accepted_terms

		self.assertTrue(has_accepted_terms("user@test.com"))

	@patch("jana.services.terms.frappe")
	def test_guest_always_accepted(self, mock_frappe):
		mock_frappe.session.user = "Guest"

		from jana.services.terms import has_accepted_terms

		self.assertTrue(has_accepted_terms("Guest"))

	@patch("jana.services.terms.frappe")
	def test_administrator_always_accepted(self, mock_frappe):
		mock_frappe.session.user = "Administrator"

		from jana.services.terms import has_accepted_terms

		self.assertTrue(has_accepted_terms("Administrator"))

	@patch("jana.services.terms.frappe")
	def test_checks_current_version(self, mock_frappe):
		"""Verify db.exists is called with CURRENT_TERMS_VERSION."""
		mock_frappe.session.user = "user@test.com"
		mock_frappe.db.exists.return_value = None

		from jana.services.terms import CURRENT_TERMS_VERSION, has_accepted_terms

		has_accepted_terms("user@test.com")
		mock_frappe.db.exists.assert_called_once_with(
			"Jana Terms Acceptance",
			{"user": "user@test.com", "terms_version": CURRENT_TERMS_VERSION},
		)


class TestAcceptTerms(unittest.TestCase):
	"""Verify accept_terms() creates a record."""

	@patch("jana.services.terms.frappe")
	def test_creates_acceptance_record(self, mock_frappe):
		mock_frappe.session.user = "user@test.com"
		mock_frappe.db.exists.return_value = None
		mock_doc = MagicMock()
		mock_frappe.new_doc.return_value = mock_doc

		from jana.services.terms import accept_terms

		result = accept_terms("user@test.com")
		self.assertTrue(result["accepted"])
		self.assertIn("terms_version", result)
		mock_frappe.new_doc.assert_called_once_with("Jana Terms Acceptance")
		mock_doc.insert.assert_called_once_with(ignore_permissions=True)

	@patch("jana.services.terms.frappe")
	def test_idempotent_when_already_accepted(self, mock_frappe):
		"""Calling accept_terms when already accepted does not create a new doc."""
		mock_frappe.session.user = "user@test.com"
		mock_frappe.db.exists.return_value = "JTERMS-user@test.com-1.0"

		from jana.services.terms import accept_terms

		result = accept_terms("user@test.com")
		self.assertTrue(result["accepted"])
		mock_frappe.new_doc.assert_not_called()


class TestTermsController(unittest.TestCase):
	"""Verify the Jana Terms Acceptance controller."""

	@patch("jana.jana.doctype.jana_terms_acceptance.jana_terms_acceptance.now_datetime")
	@patch("jana.jana.doctype.jana_terms_acceptance.jana_terms_acceptance.frappe")
	def test_validate_sets_accepted_at(self, mock_frappe, mock_now):
		"""accepted_at should be populated if not set."""
		mock_now.return_value = "2026-02-25 12:00:00"
		mock_doc = MagicMock()
		mock_doc.accepted_at = None
		mock_doc.ip_address = None
		mock_doc.user = "user@test.com"
		mock_doc.terms_version = "1.0"
		mock_doc.name = "JTERMS-user@test.com-1.0"
		mock_frappe.local.request_ip = "192.168.1.1"
		mock_frappe.db.exists.return_value = None

		from jana.jana.doctype.jana_terms_acceptance.jana_terms_acceptance import JanaTermsAcceptance

		JanaTermsAcceptance.validate(mock_doc)

		self.assertEqual(mock_doc.accepted_at, "2026-02-25 12:00:00")
		self.assertEqual(mock_doc.ip_address, "192.168.1.1")


class TestBootIncludesTerms(unittest.TestCase):
	"""Verify that boot API includes terms acceptance status."""

	@patch("jana.api.boot.frappe")
	def test_extend_bootinfo_includes_terms_fields(self, mock_frappe):
		"""extend_bootinfo should add terms_accepted and terms_version to boot."""
		from jana.api.boot import extend_bootinfo

		mock_settings = MagicMock(
			default_provider=None,
			enable_streaming=1,
			enable_chat=1,
			enable_read_documents=1,
			enable_draft_content=0,
			enable_create_documents=0,
			enable_navigate=0,
			enable_report_queries=0,
			enable_modify_documents=0,
		)
		mock_frappe.get_single.return_value = mock_settings
		mock_frappe.get_all.return_value = []
		mock_frappe.session.user = "user@test.com"
		mock_frappe.db.exists.return_value = None

		bootinfo = MagicMock()
		extend_bootinfo(bootinfo)

		jana_config = bootinfo.jana
		self.assertIn("terms_accepted", jana_config)
		self.assertIn("terms_version", jana_config)
		self.assertIsInstance(jana_config["terms_accepted"], bool)
		self.assertIsInstance(jana_config["terms_version"], str)
