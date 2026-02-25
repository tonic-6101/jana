# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Update existing agents' system prompts with security rules.

Re-runs the install function for each built-in agent to update their
prompts with the new security rules appended to "What You Cannot Do".
"""

import frappe

from jana.install import (
	ACCOUNTING_ASSISTANT_PROMPT,
	CRM_ASSISTANT_PROMPT,
	DATA_ANALYST_PROMPT,
	GENERAL_ASSISTANT_PROMPT,
	HR_ASSISTANT_PROMPT,
)

_AGENT_PROMPTS = {
	"General Assistant": GENERAL_ASSISTANT_PROMPT,
	"CRM Assistant": CRM_ASSISTANT_PROMPT,
	"HR Assistant": HR_ASSISTANT_PROMPT,
	"Data Analyst": DATA_ANALYST_PROMPT,
	"Accounting Assistant": ACCOUNTING_ASSISTANT_PROMPT,
}


def execute():
	"""Update system prompts for built-in agents."""
	for agent_name, prompt in _AGENT_PROMPTS.items():
		if frappe.db.exists("Jana Agent", agent_name):
			frappe.db.set_value("Jana Agent", agent_name, "system_prompt", prompt)

	frappe.db.commit()
