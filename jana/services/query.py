# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Report discovery for the Data Analyst agent (Ask AI).

Queries available Frappe reports at runtime and formats them into the
agent's system prompt so the LLM knows which reports it can call via
the ``run_report`` tool.
"""

import frappe


def get_available_reports(limit: int = 50) -> list[dict]:
	"""Return reports the current user can access, with metadata.

	Results are permission-filtered — only reports the logged-in user
	is allowed to view are included.
	"""
	reports = frappe.get_all(
		"Report",
		filters={"disabled": 0},
		fields=["name", "report_type", "ref_doctype", "module"],
		order_by="modified desc",
		limit_page_length=limit * 2,
	)

	accessible: list[dict] = []
	for r in reports:
		try:
			if frappe.has_permission("Report", doc=r.name):
				accessible.append({
					"name": r.name,
					"type": r.report_type,
					"doctype": r.ref_doctype or "",
					"module": r.module or "",
				})
		except frappe.PermissionError:
			continue
		if len(accessible) >= limit:
			break

	return accessible


def format_reports_for_prompt(reports: list[dict]) -> str:
	"""Format the report list as a markdown block for the system prompt."""
	if not reports:
		return (
			"No reports are currently available. Use the list_documents "
			"tool to query data directly."
		)

	lines = ["## Available Reports", ""]
	for r in reports:
		parts = [f"- **{r['name']}**"]
		if r["module"]:
			parts.append(f"[{r['module']}]")
		if r["doctype"]:
			parts.append(f"(DocType: {r['doctype']})")
		lines.append(" ".join(parts))

	lines.append("")
	lines.append(
		"Use the `run_report` tool with the exact report name from this list. "
		"You can pass filters as a JSON object to narrow results."
	)
	return "\n".join(lines)
