# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tool result annotation — wraps every tool result with metadata.

Every tool result is wrapped with:
- status: "success" | "error"
- data: the actual result
- source: "frappe_api:<tool_name>"
- instruction: how the LLM should present the data

This prevents the LLM from misrepresenting or embellishing tool output.
"""

from frappe import _

_SUCCESS_INSTRUCTION = (
	"Report this data as-is. Do not add information not present here. "
	"If you are unsure about anything, say so honestly."
)

_ERROR_INSTRUCTION = (
	"An error occurred. Report this error honestly. "
	"Do NOT guess what the result should have been."
)


def annotate_tool_result(
	data: dict | list | str,
	tool_name: str,
	status: str = "success",
) -> dict:
	"""Wrap a tool result with metadata for the LLM.

	Args:
		data: The raw tool result (dict, list, or error string).
		tool_name: The tool that produced this result (e.g., "read_document").
		status: "success" or "error".

	Returns:
		An annotated dict with status, data, source, and instruction.
	"""
	if status == "error":
		return {
			"status": "error",
			"data": data if isinstance(data, dict) else {"error": str(data)},
			"source": f"frappe_api:{tool_name}",
			"instruction": _ERROR_INSTRUCTION,
		}

	return {
		"status": "success",
		"data": data,
		"source": f"frappe_api:{tool_name}",
		"instruction": _SUCCESS_INSTRUCTION,
	}
