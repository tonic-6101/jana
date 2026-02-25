# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for input validation and error sanitisation."""

import unittest
from unittest.mock import patch


class TestValidateMessageLength(unittest.TestCase):
	"""Tests for validate_message_length."""

	def test_short_message_passes(self):
		"""Normal-length messages should not raise."""
		from jana.services.security.validators import validate_message_length

		validate_message_length("Hello, how are you?", max_length=32000)

	def test_long_message_rejected(self):
		"""Messages exceeding the limit should raise ValidationError."""
		from jana.services.security.validators import validate_message_length

		with self.assertRaises(Exception) as ctx:
			validate_message_length("x" * 33000, max_length=32000)
		self.assertIn("too long", str(ctx.exception).lower())

	def test_exact_limit_passes(self):
		"""Message exactly at the limit should pass."""
		from jana.services.security.validators import validate_message_length

		validate_message_length("x" * 32000, max_length=32000)

	@patch("jana.utils.get_jana_settings")
	def test_zero_limit_reads_from_settings(self, mock_settings):
		"""A limit of 0 should read from settings (default behaviour)."""
		from jana.services.security.validators import validate_message_length

		mock_settings.return_value = {"enable_guardrails": 1, "max_message_length": 50000}
		# max_length=0 triggers reading from settings, which returns 50000
		validate_message_length("x" * 40000, max_length=0)


class TestValidateNavigationUrl(unittest.TestCase):
	"""Tests for validate_navigation_url."""

	@patch("jana.services.security.validators.frappe")
	def test_relative_path_allowed(self, mock_frappe):
		"""Relative paths like /app/sales-invoice should be allowed."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.validators import validate_navigation_url

		result = validate_navigation_url("/app/sales-invoice/SINV-001")
		self.assertEqual(result, "/app/sales-invoice/SINV-001")

	@patch("jana.services.security.validators.frappe")
	def test_javascript_url_blocked(self, mock_frappe):
		"""javascript: URLs must be blocked."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.validators import validate_navigation_url

		with self.assertRaises(Exception):
			validate_navigation_url("javascript:alert(1)")

	@patch("jana.services.security.validators.frappe")
	def test_data_url_blocked(self, mock_frappe):
		"""data: URLs must be blocked."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.validators import validate_navigation_url

		with self.assertRaises(Exception):
			validate_navigation_url("data:text/html,<h1>evil</h1>")

	@patch("jana.services.security.validators.frappe")
	def test_external_url_blocked(self, mock_frappe):
		"""External URLs must be blocked."""
		mock_frappe.throw = self._make_throw()
		mock_frappe.utils.get_url.return_value = "https://jana.localhost"
		from jana.services.security.validators import validate_navigation_url

		with self.assertRaises(Exception):
			validate_navigation_url("https://evil.com/steal-data")

	@patch("jana.services.security.validators.frappe")
	def test_same_origin_allowed(self, mock_frappe):
		"""Same-origin absolute URLs should be allowed."""
		mock_frappe.throw = self._make_throw()
		mock_frappe.utils.get_url.return_value = "https://jana.localhost"
		from jana.services.security.validators import validate_navigation_url

		result = validate_navigation_url("https://jana.localhost/app/todo")
		self.assertEqual(result, "https://jana.localhost/app/todo")

	@patch("jana.services.security.validators.frappe")
	def test_case_insensitive_scheme_check(self, mock_frappe):
		"""Scheme check should be case-insensitive."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.validators import validate_navigation_url

		with self.assertRaises(Exception):
			validate_navigation_url("JAVASCRIPT:alert(1)")

	@patch("jana.services.security.validators.frappe")
	def test_empty_url_rejected(self, mock_frappe):
		"""Empty URLs should be rejected."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.validators import validate_navigation_url

		with self.assertRaises(Exception):
			validate_navigation_url("")

	@staticmethod
	def _make_throw():
		def throw(msg):
			raise Exception(msg)

		return throw


class TestSanitiseErrorForUser(unittest.TestCase):
	"""Tests for sanitise_error_for_user."""

	def test_normal_message_passes_through(self):
		"""Non-sensitive messages should pass through unchanged."""
		from jana.services.security.validators import sanitise_error_for_user

		result = sanitise_error_for_user("Connection refused")
		self.assertEqual(result, "Connection refused")

	def test_file_path_sanitised(self):
		"""Messages containing file paths should be replaced."""
		from jana.services.security.validators import sanitise_error_for_user

		result = sanitise_error_for_user(
			"Error in /workspace/frappe-bench/apps/jana/services/chat.py",
			fallback="An error occurred",
		)
		self.assertEqual(result, "An error occurred")

	def test_traceback_sanitised(self):
		"""Messages containing tracebacks should be replaced."""
		from jana.services.security.validators import sanitise_error_for_user

		result = sanitise_error_for_user(
			"Traceback (most recent call last):\n  File ...",
			fallback="An error occurred",
		)
		self.assertEqual(result, "An error occurred")

	def test_api_key_sanitised(self):
		"""Messages containing API key patterns should be replaced."""
		from jana.services.security.validators import sanitise_error_for_user

		result = sanitise_error_for_user(
			"Invalid key: sk-abcdefghijklmnopqrstuvwxyz",
		)
		self.assertNotIn("sk-", result)

	def test_empty_message_uses_fallback(self):
		"""Empty error messages should use the fallback."""
		from jana.services.security.validators import sanitise_error_for_user

		result = sanitise_error_for_user("", fallback="Something went wrong")
		self.assertEqual(result, "Something went wrong")
