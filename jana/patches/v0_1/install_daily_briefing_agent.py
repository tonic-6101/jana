# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Install the get_briefing_data tool and Daily Briefing agent."""

import frappe


def execute():
	from jana.services.tools.builtin import install_builtin_tools
	from jana.install import _install_daily_briefing_agent

	install_builtin_tools()
	_install_daily_briefing_agent()
