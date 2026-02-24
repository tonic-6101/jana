# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import frappe


def execute():
	"""Install built-in tools and attach them to the General Assistant."""
	from jana.services.tools.builtin import attach_tools_to_agent, install_builtin_tools

	install_builtin_tools()
	attach_tools_to_agent("General Assistant")
