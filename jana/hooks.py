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

# Includes in <head>
# ------------------

app_include_js = "jana.bundle.js"
app_include_css = "jana.bundle.css"

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

# Automatically update python controller files with type annotations for this app.
export_python_type_annotations = True
