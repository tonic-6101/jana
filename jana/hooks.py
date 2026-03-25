# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

app_name = "jana"
app_title = "Jana"
app_publisher = "Tonic"
app_description = "AI Assistant for the Frappe Ecosystem"
app_email = "tonic@jana.ai"
app_license = "GNU Affero General Public License v3.0"

# Apps
# ------------------

# required_apps = []

add_to_apps_screen = [
	{
		"name": "jana",
		"logo": "/assets/jana/images/jana-logo.svg",
		"title": "Jana",
		"route": "/jana",
	}
]

export_python_type_annotations = True

# Dock integration
# ------------------
dock_app_registry = {
	"label": "Jana",
	"icon": "/assets/jana/images/jana-icon.svg",
	"color": "#7c3aed",
	"route": "/jana",
}

dock_settings_sections = [
	{
		"label": "Jana",
		"icon": "/assets/jana/images/jana-icon.svg",
		"icon_url": "/assets/jana/images/jana-icon.svg",
		"route": "jana",
		"component": "JanaSettings",
		"bundle": "/assets/jana/js/jana-settings.esm.js",
		"sections": [
			{"label": "General", "key": "general"},
			{"label": "Providers", "key": "providers"},
			{"label": "Capabilities", "key": "capabilities"},
			{"label": "Limits", "key": "limits"},
			{"label": "Knowledge", "key": "knowledge"},
			{"label": "My Keys", "key": "my-keys"},
		],
	}
]

# Includes in <head>
# ------------------

app_include_js = "jana.bundle.ts"
app_include_css = "jana.bundle.css"

# Also load the chat widget on website pages (other app SPAs, portals, etc.)
web_include_js = "jana.bundle.ts"
web_include_css = "jana.bundle.css"

# Home Pages
# ----------

website_route_rules = [
	{"from_route": "/jana/<path:app_path>", "to_route": "jana"},
]

# Installation
# ------------

after_install = "jana.install.after_install"

# Boot
# ----

extend_bootinfo = "jana.api.boot.extend_bootinfo"

# Fixtures
# --------

fixtures = [
	{"dt": "Role", "filters": [["name", "in", ["Jana User", "Jana Admin"]]]},
]

# Permissions
# -----------

has_permission = {
	"Jana Chat Session": "jana.permissions.session_has_permission",
	"Jana Chat Message": "jana.permissions.message_has_permission",
	"Jana User Key": "jana.permissions.user_key_has_permission",
	"Jana Terms Acceptance": "jana.permissions.terms_has_permission",
}

permission_query_conditions = {
	"Jana Chat Session": "jana.permissions.session_permission_query_conditions",
	"Jana Chat Message": "jana.permissions.message_permission_query_conditions",
	"Jana User Key": "jana.permissions.user_key_permission_query_conditions",
	"Jana Terms Acceptance": "jana.permissions.terms_permission_query_conditions",
}

# After Request
# -------------

after_request = ["jana.middleware.inject_widget_loader"]

# Scheduled Tasks
# ---------------

scheduler_events = {
	"daily": [
		"jana.services.maintenance.auto_archive_old_sessions",
		"jana.services.maintenance.cleanup_orphaned_messages",
	],
}
