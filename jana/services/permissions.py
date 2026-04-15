# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Jana permission integration — reads and enforces ``jana_permissions`` hooks.

Every ecosystem app declares what Jana may access via a ``jana_permissions``
hook in its ``hooks.py``.  This module loads those declarations at request
time, merges them, and exposes simple predicate functions that the tool
executor calls before accessing data.

Hook contract (unified format)::

    # In <app>/hooks.py
    jana_permissions = {
        "doctypes": {
            "read":   ["App DocType 1", "App DocType 2"],
            "create": ["App DocType 1"],
            "update": [],
            "never":  ["dangerous_operation"],
        },
        "endpoints": [
            {
                "label": "App — Section",
                "description": "Human-readable description",
                "methods": ["app.api.module.function"],
                "scoping": "user",          # user | household | team | org
                "minimum_role": "RoleName", # optional
            },
        ],
    }

Legacy format (list of endpoint groups, no doctype gates) is also supported
for backward compatibility.
"""

from __future__ import annotations

import frappe

_CACHE_KEY = "_jana_permissions_merged"


# ------------------------------------------------------------------
# Loading & merging
# ------------------------------------------------------------------

def load_permissions() -> dict:
	"""Read ``jana_permissions`` from all installed apps and merge.

	Returns a dict with two keys:

	- ``doctypes``  — ``{"read": set, "create": set, "update": set, "never": set}``
	- ``endpoints`` — ``list[dict]`` (all endpoint groups from all apps)

	Results are cached on ``frappe.local`` for the duration of the request.
	"""
	cached = getattr(frappe.local, _CACHE_KEY, None)
	if cached is not None:
		return cached

	merged: dict = {
		"doctypes": {
			"read": set(),
			"create": set(),
			"update": set(),
			"never": set(),
		},
		"endpoints": [],
	}

	raw_hooks = frappe.get_hooks("jana_permissions") or []

	# Frappe's get_hooks() deep-merges all dict hooks into one dict.
	# So raw_hooks is either:
	#   - A single merged dict (when all apps use unified dict format)
	#   - A list (when apps use legacy list format, or mixed)
	#   - An empty list/dict (no hooks)
	if isinstance(raw_hooks, dict):
		# Already merged by Frappe — treat as single unified entry
		_merge_dict_format(merged, raw_hooks)
	elif isinstance(raw_hooks, list):
		for entry in raw_hooks:
			if isinstance(entry, dict):
				_merge_dict_format(merged, entry)
			elif isinstance(entry, list):
				# Legacy format: list of endpoint groups (Home <= v0.1)
				_merge_legacy_format(merged, entry)

	frappe.local._jana_permissions_merged = merged
	return merged


def _merge_dict_format(merged: dict, entry: dict) -> None:
	"""Merge a single app's unified-format declaration."""
	doctypes = entry.get("doctypes") or {}
	for action in ("read", "create", "update", "never"):
		items = doctypes.get(action) or []
		merged["doctypes"][action].update(items)

	endpoints = entry.get("endpoints") or []
	merged["endpoints"].extend(endpoints)


def _merge_legacy_format(merged: dict, groups: list) -> None:
	"""Merge Home's legacy list-of-endpoint-groups format.

	Legacy format::

	    jana_permissions = [
	        {
	            "label": "Home — Properties",
	            "description": "...",
	            "endpoints": ["home.api.property.get_property", ...],
	            "scoping": "household",
	        },
	    ]

	We convert ``endpoints`` key to ``methods`` for consistency.
	"""
	for group in groups:
		if not isinstance(group, dict):
			continue
		converted = {
			"label": group.get("label", ""),
			"description": group.get("description", ""),
			"methods": group.get("endpoints") or group.get("methods") or [],
			"scoping": group.get("scoping", "user"),
		}
		if "minimum_role" in group:
			converted["minimum_role"] = group["minimum_role"]
		merged["endpoints"].append(converted)


# ------------------------------------------------------------------
# Predicate functions
# ------------------------------------------------------------------

def can_read_doctype(doctype: str) -> bool:
	"""Return ``True`` if any app allows Jana to read *doctype*."""
	perms = load_permissions()
	return doctype in perms["doctypes"]["read"]


def can_create_doctype(doctype: str) -> bool:
	"""Return ``True`` if any app allows Jana to create *doctype*."""
	perms = load_permissions()
	return doctype in perms["doctypes"]["create"]


def can_update_doctype(doctype: str) -> bool:
	"""Return ``True`` if any app allows Jana to update *doctype*."""
	perms = load_permissions()
	return doctype in perms["doctypes"]["update"]


def is_never_allowed(operation: str) -> bool:
	"""Return ``True`` if *operation* appears in any app's ``never`` list."""
	perms = load_permissions()
	return operation in perms["doctypes"]["never"]


def can_call_endpoint(method: str) -> bool:
	"""Return ``True`` if *method* is declared in any app's endpoint groups."""
	perms = load_permissions()
	for group in perms["endpoints"]:
		methods = group.get("methods") or []
		if method in methods:
			return True
	return False


def get_endpoint_groups() -> list[dict]:
	"""Return all declared endpoint groups (for admin UI / introspection)."""
	perms = load_permissions()
	return perms["endpoints"]


def get_allowed_doctypes(action: str = "read") -> set[str]:
	"""Return the set of DocTypes Jana is allowed to *action* on."""
	perms = load_permissions()
	return set(perms["doctypes"].get(action) or set())


def has_any_permissions() -> bool:
	"""Return ``True`` if any app has declared ``jana_permissions``."""
	perms = load_permissions()
	has_doctypes = any(perms["doctypes"][k] for k in ("read", "create", "update"))
	return has_doctypes or bool(perms["endpoints"])
