# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Per-user rate limiting for AI calls using Redis."""

import frappe
from frappe import _
from frappe.utils import cint

_RATE_LIMIT_KEY_PREFIX = "jana:rate_limit:"
_RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds


def check_rate_limit(user: str = None) -> None:
	"""Check if the user has exceeded their hourly AI call limit.

	Raises frappe.ValidationError if the limit is exceeded.
	Does nothing if rate limiting is disabled (limit = 0).
	"""
	user = user or frappe.session.user

	from jana.utils import get_jana_settings

	settings = get_jana_settings()
	limit = cint(settings.get("rate_limit_per_hour") or 60)

	if limit <= 0:
		return

	cache_key = f"{_RATE_LIMIT_KEY_PREFIX}{user}"
	current_count = cint(frappe.cache().get_value(cache_key) or 0)

	if current_count >= limit:
		frappe.throw(
			_(
				"Rate limit exceeded. You can send up to {0} messages per hour. "
				"Please wait before sending more."
			).format(limit),
			title=_("Rate Limit Exceeded"),
		)


def increment_rate_counter(user: str = None) -> None:
	"""Increment the user's rate counter after a successful AI call."""
	user = user or frappe.session.user

	from jana.utils import get_jana_settings

	settings = get_jana_settings()
	limit = cint(settings.get("rate_limit_per_hour") or 60)

	if limit <= 0:
		return

	cache_key = f"{_RATE_LIMIT_KEY_PREFIX}{user}"
	current = cint(frappe.cache().get_value(cache_key) or 0)
	frappe.cache().set_value(cache_key, current + 1, expires_in_sec=_RATE_LIMIT_WINDOW)
