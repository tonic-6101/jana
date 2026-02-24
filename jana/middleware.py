# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Response middleware for injecting the Jana widget into HTML pages."""

WIDGET_LOADER_TAG = '<script src="/assets/jana/js/jana-widget-loader.js" defer></script>'


def inject_widget_loader(response, **kwargs):
	"""Inject Jana chat-widget loader into HTML responses.

	Runs as an ``after_request`` hook.  It only touches responses that:

	1. Have a ``text/html`` Content-Type,
	2. Contain a ``</body>`` tag (i.e. are full HTML pages),
	3. Do **not** already include a Jana script (Desk pages load the
	   bundle via ``app_include_js``; standard website pages via
	   ``web_include_js``).

	The loader script itself is tiny and has its own guards (skips
	``/jana`` pages, skips if the widget is already mounted, skips if
	the user is not authenticated).
	"""
	if not response or not hasattr(response, "headers"):
		return

	content_type = response.headers.get("Content-Type", "")
	if "text/html" not in content_type:
		return

	try:
		html = response.get_data(as_text=True)
	except Exception:
		return

	# Already has Jana scripts (Desk or standard website page) — nothing to do
	if "jana.bundle" in html or "jana-widget-loader" in html:
		return

	# Not a full HTML document — nothing to inject into
	if "</body>" not in html:
		return

	response.set_data(html.replace("</body>", f"{WIDGET_LOADER_TAG}\n</body>", 1))
