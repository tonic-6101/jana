# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tool chain monitor — detects abuse patterns in tool call sequences.

Tracks writes per turn and flags enumeration-like sequential reads.
Instantiated once per send_message() call.
"""

import frappe
from frappe import _


class ToolChainMonitor:
	"""Monitor tool call sequences for abuse patterns within a single turn."""

	def __init__(self):
		self._calls: list[tuple[str, dict]] = []
		self._write_count = 0
		self._read_count = 0

	def record(self, tool_name: str, params: dict) -> None:
		"""Record a tool call. Call this BEFORE execution."""
		self._calls.append((tool_name, params))

		if tool_name in ("create_document", "update_document"):
			self._write_count += 1
		elif tool_name == "read_document":
			self._read_count += 1

	@property
	def write_blocked(self) -> bool:
		"""Return True if additional writes should be blocked this turn."""
		return self._write_count > 1

	@property
	def enumeration_detected(self) -> bool:
		"""Return True if sequential reads suggest enumeration."""
		return self._read_count >= 3

	def check_write_allowed(self, tool_name: str) -> dict | None:
		"""Check if a write operation is allowed. Returns error dict if blocked."""
		if tool_name not in ("create_document", "update_document"):
			return None

		if self._write_count > 1:
			frappe.log_error(
				title="Jana Tool Chain: Multiple Writes Blocked",
				message=f"Blocked {tool_name} — already {self._write_count} writes this turn",
			)
			return {
				"error": _(
					"Only one write operation is allowed per turn. "
					"Please send a new message to perform another write."
				)
			}
		return None

	def log_if_suspicious(self) -> None:
		"""Log if the call pattern looks suspicious."""
		if self._read_count >= 3:
			frappe.log_error(
				title="Jana Tool Chain: Potential Enumeration",
				message=f"{self._read_count} sequential read_document calls in one turn",
			)
