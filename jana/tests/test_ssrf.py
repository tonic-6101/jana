# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for SSRF prevention in provider URL validation."""

import unittest
from unittest.mock import patch


class TestValidateProviderUrl(unittest.TestCase):
	"""Tests for security.ssrf.validate_provider_url."""

	@staticmethod
	def _make_throw():
		def throw(msg):
			raise Exception(msg)

		return throw

	@patch("jana.services.security.ssrf.frappe")
	def test_empty_url_passes(self, mock_frappe):
		"""Empty URLs should be accepted (no URL to validate)."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		validate_provider_url("")
		validate_provider_url("   ")

	@patch("jana.services.security.ssrf.frappe")
	def test_none_url_passes(self, mock_frappe):
		"""None URL should be accepted."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		validate_provider_url(None)

	@patch("jana.services.security.ssrf.frappe")
	def test_external_url_allowed(self, mock_frappe):
		"""External API URLs should be allowed."""
		mock_frappe.throw = self._make_throw()
		mock_frappe._ = lambda s: s
		from jana.services.security.ssrf import validate_provider_url

		# Should not raise for legitimate external URLs
		validate_provider_url("https://api.openai.com/v1")

	@patch("jana.services.security.ssrf.frappe")
	def test_localhost_blocked_for_openai(self, mock_frappe):
		"""Localhost should be blocked when allow_local is False."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception) as ctx:
			validate_provider_url("http://localhost:8080/v1", allow_local=False)
		self.assertIn("localhost", str(ctx.exception).lower())

	@patch("jana.services.security.ssrf.frappe")
	def test_127_0_0_1_blocked(self, mock_frappe):
		"""127.0.0.1 should be blocked when allow_local is False."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception):
			validate_provider_url("http://127.0.0.1:8080/v1", allow_local=False)

	@patch("jana.services.security.ssrf.frappe")
	def test_ipv6_loopback_blocked(self, mock_frappe):
		"""::1 should be blocked when allow_local is False."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception):
			validate_provider_url("http://[::1]:8080/v1", allow_local=False)

	@patch("jana.services.security.ssrf.frappe")
	def test_localhost_allowed_for_ollama(self, mock_frappe):
		"""Localhost should be allowed when allow_local is True (Ollama)."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		# Should not raise
		validate_provider_url("http://localhost:11434", allow_local=True)

	@patch("jana.services.security.ssrf.frappe")
	def test_127_0_0_1_allowed_for_ollama(self, mock_frappe):
		"""127.0.0.1 should be allowed when allow_local is True."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		validate_provider_url("http://127.0.0.1:11434", allow_local=True)

	@patch("jana.services.security.ssrf.socket")
	@patch("jana.services.security.ssrf.frappe")
	def test_metadata_ip_blocked(self, mock_frappe, mock_socket):
		"""AWS metadata IP 169.254.169.254 must be blocked."""
		import socket as real_socket

		mock_frappe.throw = self._make_throw()
		mock_socket.gaierror = real_socket.gaierror
		mock_socket.gethostbyname.return_value = "169.254.169.254"
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception) as ctx:
			validate_provider_url("http://metadata.internal/v1")
		self.assertIn("internal", str(ctx.exception).lower())

	@patch("jana.services.security.ssrf.socket")
	@patch("jana.services.security.ssrf.frappe")
	def test_rfc1918_10_network_blocked(self, mock_frappe, mock_socket):
		"""10.0.0.0/8 addresses must be blocked."""
		import socket as real_socket

		mock_frappe.throw = self._make_throw()
		mock_socket.gaierror = real_socket.gaierror
		mock_socket.gethostbyname.return_value = "10.0.1.5"
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception):
			validate_provider_url("http://internal-api.local/v1")

	@patch("jana.services.security.ssrf.socket")
	@patch("jana.services.security.ssrf.frappe")
	def test_rfc1918_172_network_blocked(self, mock_frappe, mock_socket):
		"""172.16.0.0/12 addresses must be blocked."""
		import socket as real_socket

		mock_frappe.throw = self._make_throw()
		mock_socket.gaierror = real_socket.gaierror
		mock_socket.gethostbyname.return_value = "172.16.0.1"
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception):
			validate_provider_url("http://internal-api.local/v1")

	@patch("jana.services.security.ssrf.socket")
	@patch("jana.services.security.ssrf.frappe")
	def test_rfc1918_192_network_blocked(self, mock_frappe, mock_socket):
		"""192.168.0.0/16 addresses must be blocked."""
		import socket as real_socket

		mock_frappe.throw = self._make_throw()
		mock_socket.gaierror = real_socket.gaierror
		mock_socket.gethostbyname.return_value = "192.168.1.100"
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception):
			validate_provider_url("http://internal-api.local/v1")

	@patch("jana.services.security.ssrf.socket")
	@patch("jana.services.security.ssrf.frappe")
	def test_dns_failure_passes(self, mock_frappe, mock_socket):
		"""DNS resolution failure should not block — let HTTP client handle it."""
		import socket as real_socket

		mock_frappe.throw = self._make_throw()
		mock_socket.gaierror = real_socket.gaierror
		mock_socket.gethostbyname.side_effect = real_socket.gaierror("Name resolution failed")
		from jana.services.security.ssrf import validate_provider_url

		# Should not raise
		validate_provider_url("http://nonexistent.example.com/v1")

	@patch("jana.services.security.ssrf.frappe")
	def test_no_hostname_throws(self, mock_frappe):
		"""URL with no hostname should throw."""
		mock_frappe.throw = self._make_throw()
		from jana.services.security.ssrf import validate_provider_url

		with self.assertRaises(Exception):
			validate_provider_url("http:///no-host")
