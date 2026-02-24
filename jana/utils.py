# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Shared utility functions for the Jana app."""

import frappe

_SETTINGS_CACHE_KEY = "jana_settings_dict"


def get_jana_settings() -> dict:
	"""Get Jana Settings as a dict, using Redis cache.

	Returns a dict of all single values. Cache is invalidated by
	JanaSettings.on_update().
	"""
	settings = frappe.cache().get_value(_SETTINGS_CACHE_KEY)
	if settings is None:
		settings = frappe.db.get_singles_dict("Jana Settings")
		frappe.cache().set_value(_SETTINGS_CACHE_KEY, settings)
	return settings


def clear_jana_settings_cache():
	"""Invalidate the cached Jana Settings dict."""
	frappe.cache().delete_value(_SETTINGS_CACHE_KEY)


def get_cached_provider(provider_name: str):
	"""Get a cached Jana Provider document.

	Uses frappe.get_cached_doc which leverages Redis document cache.
	"""
	return frappe.get_cached_doc("Jana Provider", provider_name)


def clear_provider_cache(provider_name: str):
	"""Invalidate the cache for a specific provider."""
	frappe.clear_document_cache("Jana Provider", provider_name)
