# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for the jana_permissions consumer (jana.services.permissions)."""

import unittest
from unittest.mock import patch


# Sample hook data: unified dict format (Watch-style)
_WATCH_PERMS = {
	"doctypes": {
		"read": ["Watch Entry", "Watch Timer", "Watch Tag"],
		"create": [],
		"update": [],
		"never": [],
	},
	"endpoints": [
		{
			"label": "Watch — Time Tracking",
			"description": "Time summaries and timer state",
			"methods": [
				"watch.api.timer.get_timer_state",
				"watch.api.time_entry.get_daily_summary",
			],
			"scoping": "user",
		},
	],
}

# Sample hook data: unified dict format (Micro-style, with never list)
_MICRO_PERMS = {
	"doctypes": {
		"read": ["Micro Lead", "Micro Offer"],
		"create": ["Micro Lead"],
		"update": ["Micro Lead"],
		"never": ["remove_watermark", "calculate_vat"],
	},
	"endpoints": [
		{
			"label": "Micro — Sales Intelligence",
			"description": "KPIs and pipeline",
			"methods": [
				"micro.api.dashboard.get_dashboard_kpis",
				"micro.api.pipeline.get_pipeline",
			],
			"scoping": "user",
		},
	],
}

# Sample hook data: legacy list format (Home <= v0.1)
_HOME_LEGACY_PERMS = [
	{
		"label": "Home — Properties",
		"description": "Property details and health scores",
		"endpoints": [
			"home.api.property.get_property",
			"home.api.property.get_health_score",
		],
		"scoping": "household",
	},
	{
		"label": "Home — Financial summary",
		"description": "Annual cost report",
		"endpoints": [
			"home.api.report.get_annual_summary",
		],
		"scoping": "household",
		"minimum_role": "Adult",
	},
]


def _clear_cache():
	"""Remove the cached permissions from frappe.local."""
	import frappe

	if hasattr(frappe.local, "_jana_permissions_merged"):
		delattr(frappe.local, "_jana_permissions_merged")


class TestLoadPermissions(unittest.TestCase):
	"""Tests for load_permissions() merging logic."""

	def tearDown(self):
		_clear_cache()

	@patch("jana.services.permissions.frappe")
	def test_empty_hooks(self, mock_frappe):
		"""No apps declare jana_permissions → empty result."""
		mock_frappe.get_hooks.return_value = []
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import load_permissions

		perms = load_permissions()
		self.assertEqual(perms["doctypes"]["read"], set())
		self.assertEqual(perms["doctypes"]["never"], set())
		self.assertEqual(perms["endpoints"], [])

	@patch("jana.services.permissions.frappe")
	def test_single_dict_format(self, mock_frappe):
		"""Single app with unified dict format."""
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import load_permissions

		perms = load_permissions()
		self.assertIn("Watch Entry", perms["doctypes"]["read"])
		self.assertIn("Watch Timer", perms["doctypes"]["read"])
		self.assertEqual(len(perms["endpoints"]), 1)
		self.assertEqual(perms["endpoints"][0]["label"], "Watch — Time Tracking")

	@patch("jana.services.permissions.frappe")
	def test_multiple_apps_merge(self, mock_frappe):
		"""Multiple apps' permissions merge correctly."""
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import load_permissions

		perms = load_permissions()
		# DocTypes from both apps
		self.assertIn("Watch Entry", perms["doctypes"]["read"])
		self.assertIn("Micro Lead", perms["doctypes"]["read"])
		# Create only from Micro
		self.assertIn("Micro Lead", perms["doctypes"]["create"])
		self.assertNotIn("Watch Entry", perms["doctypes"]["create"])
		# Never list from Micro
		self.assertIn("calculate_vat", perms["doctypes"]["never"])
		# Endpoints from both
		self.assertEqual(len(perms["endpoints"]), 2)

	@patch("jana.services.permissions.frappe")
	def test_legacy_list_format(self, mock_frappe):
		"""Home's legacy list format is converted to endpoints."""
		mock_frappe.get_hooks.return_value = [_HOME_LEGACY_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import load_permissions

		perms = load_permissions()
		# Legacy format has no doctypes
		self.assertEqual(perms["doctypes"]["read"], set())
		# But endpoints are converted
		self.assertEqual(len(perms["endpoints"]), 2)
		self.assertEqual(perms["endpoints"][0]["methods"], [
			"home.api.property.get_property",
			"home.api.property.get_health_score",
		])
		# minimum_role preserved
		self.assertEqual(perms["endpoints"][1].get("minimum_role"), "Adult")

	@patch("jana.services.permissions.frappe")
	def test_mixed_formats(self, mock_frappe):
		"""Dict and legacy formats coexist."""
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _HOME_LEGACY_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import load_permissions

		perms = load_permissions()
		self.assertIn("Watch Entry", perms["doctypes"]["read"])
		# 1 from Watch + 2 from Home legacy
		self.assertEqual(len(perms["endpoints"]), 3)


class TestPredicates(unittest.TestCase):
	"""Tests for the predicate functions."""

	def tearDown(self):
		_clear_cache()

	@patch("jana.services.permissions.frappe")
	def test_can_read_doctype(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import can_read_doctype

		self.assertTrue(can_read_doctype("Watch Entry"))
		self.assertTrue(can_read_doctype("Micro Lead"))
		self.assertFalse(can_read_doctype("Sales Invoice"))

	@patch("jana.services.permissions.frappe")
	def test_can_create_doctype(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import can_create_doctype

		self.assertTrue(can_create_doctype("Micro Lead"))
		self.assertFalse(can_create_doctype("Watch Entry"))

	@patch("jana.services.permissions.frappe")
	def test_can_update_doctype(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import can_update_doctype

		self.assertTrue(can_update_doctype("Micro Lead"))
		self.assertFalse(can_update_doctype("Micro Offer"))

	@patch("jana.services.permissions.frappe")
	def test_is_never_allowed(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import is_never_allowed

		self.assertTrue(is_never_allowed("calculate_vat"))
		self.assertTrue(is_never_allowed("remove_watermark"))
		self.assertFalse(is_never_allowed("read_document"))

	@patch("jana.services.permissions.frappe")
	def test_can_call_endpoint(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import can_call_endpoint

		self.assertTrue(can_call_endpoint("watch.api.timer.get_timer_state"))
		self.assertTrue(can_call_endpoint("micro.api.pipeline.get_pipeline"))
		self.assertFalse(can_call_endpoint("orga.api.dashboard.get_stats"))

	@patch("jana.services.permissions.frappe")
	def test_can_call_endpoint_legacy(self, mock_frappe):
		"""Legacy format endpoints are also discoverable."""
		mock_frappe.get_hooks.return_value = [_HOME_LEGACY_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import can_call_endpoint

		self.assertTrue(can_call_endpoint("home.api.property.get_property"))
		self.assertFalse(can_call_endpoint("home.api.item.get_lifetime_cost"))

	@patch("jana.services.permissions.frappe")
	def test_has_any_permissions_true(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import has_any_permissions

		self.assertTrue(has_any_permissions())

	@patch("jana.services.permissions.frappe")
	def test_has_any_permissions_false(self, mock_frappe):
		mock_frappe.get_hooks.return_value = []
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import has_any_permissions

		self.assertFalse(has_any_permissions())

	@patch("jana.services.permissions.frappe")
	def test_has_any_permissions_legacy_only(self, mock_frappe):
		"""Legacy format (endpoints only, no doctypes) still counts."""
		mock_frappe.get_hooks.return_value = [_HOME_LEGACY_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import has_any_permissions

		self.assertTrue(has_any_permissions())

	@patch("jana.services.permissions.frappe")
	def test_get_allowed_doctypes(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import get_allowed_doctypes

		read_set = get_allowed_doctypes("read")
		self.assertEqual(
			read_set,
			{"Watch Entry", "Watch Timer", "Watch Tag", "Micro Lead", "Micro Offer"},
		)

	@patch("jana.services.permissions.frappe")
	def test_get_endpoint_groups(self, mock_frappe):
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS, _MICRO_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import get_endpoint_groups

		groups = get_endpoint_groups()
		self.assertEqual(len(groups), 2)
		labels = {g["label"] for g in groups}
		self.assertIn("Watch — Time Tracking", labels)
		self.assertIn("Micro — Sales Intelligence", labels)


class TestCaching(unittest.TestCase):
	"""Tests for request-level caching."""

	def tearDown(self):
		_clear_cache()

	@patch("jana.services.permissions.frappe")
	def test_cached_on_second_call(self, mock_frappe):
		"""Second call within same request uses cached result."""
		mock_frappe.get_hooks.return_value = [_WATCH_PERMS]
		mock_frappe.local = type("Local", (), {})()

		from jana.services.permissions import load_permissions

		result1 = load_permissions()
		result2 = load_permissions()
		self.assertIs(result1, result2)
		# get_hooks called only once
		mock_frappe.get_hooks.assert_called_once()
