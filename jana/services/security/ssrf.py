# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""SSRF prevention for LLM provider URLs.

Validates that provider API base URLs do not target internal networks
(RFC 1918, link-local, loopback) — except for Ollama/vLLM which
legitimately run on localhost.
"""

import ipaddress
import socket
from urllib.parse import urlparse

import frappe
from frappe import _

_BLOCKED_RANGES = [
	ipaddress.ip_network("10.0.0.0/8"),
	ipaddress.ip_network("172.16.0.0/12"),
	ipaddress.ip_network("192.168.0.0/16"),
	ipaddress.ip_network("169.254.0.0/16"),  # Link-local (AWS metadata)
	ipaddress.ip_network("127.0.0.0/8"),
	ipaddress.ip_network("::1/128"),
]


def validate_provider_url(url: str, allow_local: bool = False) -> None:
	"""Validate that a provider URL does not target internal services.

	Args:
		url: The API base URL to validate.
		allow_local: If True, allow localhost (for Ollama/vLLM).

	Raises:
		frappe.ValidationError: If the URL targets an internal network.
	"""
	if not url or not url.strip():
		return

	parsed = urlparse(url.strip())
	hostname = parsed.hostname

	if not hostname:
		frappe.throw(_("Invalid provider URL"))

	# Allow localhost only for local model providers (Ollama/vLLM)
	if hostname in ("localhost", "127.0.0.1", "::1"):
		if not allow_local:
			frappe.throw(_("Provider URL cannot target localhost"))
		return

	# Resolve hostname and check against blocked ranges
	if not allow_local:
		try:
			resolved_ip = socket.gethostbyname(hostname)
			ip = ipaddress.ip_address(resolved_ip)
			for blocked in _BLOCKED_RANGES:
				if ip in blocked:
					frappe.throw(_("Provider URL cannot target internal networks"))
		except socket.gaierror:
			pass  # DNS resolution failed — let the HTTP client handle it
