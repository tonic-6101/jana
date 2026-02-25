# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import re
from dataclasses import dataclass

# Maps (fieldtype, options) pairs to a PII category token prefix.
# Covers both Data and Small Text since ERPNext uses both for similar fields.
FIELD_PII_MAP: dict[tuple[str, str | None], str] = {
	("Data", "Email"): "EMAIL",
	("Data", "Phone"): "PHONE",
	("Data", "Name"): "PERSON",
	("Data", "IBAN"): "IBAN",
	("Small Text", "Email"): "EMAIL",
	("Small Text", "Phone"): "PHONE",
	("Small Text", "Name"): "PERSON",
	("Phone", None): "PHONE",
	("Geolocation", None): "LOCATION",
	("Password", None): "PASSWORD",
}

# Fieldtypes that are always PII regardless of options value.
ALWAYS_PII_FIELDTYPES: frozenset[str] = frozenset(["Phone", "Geolocation", "Password"])

# Fieldname-based heuristics — catches PII fields where ERPNext doesn't set
# the ``options`` attribute (e.g. customer_name is Small Text with no options).
_NAME_FIELDNAMES: frozenset[str] = frozenset(
	{
		"customer_name",
		"supplier_name",
		"employee_name",
		"lead_name",
		"contact_name",
		"company_name",
		"full_name",
		"first_name",
		"last_name",
		"middle_name",
		"contact_person",
		"patient_name",
		"owner_name",
		"applicant_name",
		"guardian_name",
	}
)
_NAME_SUFFIXES: tuple[str, ...] = ("_name", "_person", "_full_name")

_EMAIL_FIELDNAMES: frozenset[str] = frozenset(
	{
		"email_id",
		"email",
		"contact_email",
		"personal_email",
		"company_email",
		"notification_email",
	}
)
_EMAIL_SUFFIXES: tuple[str, ...] = ("_email", "_email_id", "_email_address")

_PHONE_FIELDNAMES: frozenset[str] = frozenset(
	{
		"mobile_no",
		"phone",
		"contact_mobile",
		"contact_phone",
	}
)
_PHONE_SUFFIXES: tuple[str, ...] = ("_mobile", "_phone", "_mobile_no")

# Link fields pointing to these DocTypes MAY contain personal entity references.
# However, Link field *values* in Frappe are document names (IDs like
# "CUST-00015"), not personal names.  The actual PII lives in display fields
# (customer_name, employee_name, etc.) which are caught by fieldname heuristics.
#
# Edge cases where Link values ARE PII:
#   - Link → User: value is an email address (e.g. "john@example.com")
#   - Link → Customer with naming_rule="Customer Name": value is the name
#
# These are handled by applying regex detection to the Link value in the
# masker (find_pii_in_text fallback), rather than blindly classifying all
# Link→personal-DocType as PERSON.
_PERSONAL_LINK_DOCTYPES: frozenset[str] = frozenset(
	{
		"Customer",
		"Supplier",
		"Employee",
		"Lead",
		"Contact",
		"Sales Partner",
		"User",
	}
)

# Fieldtypes eligible for fieldname heuristic detection.
_HEURISTIC_FIELDTYPES: frozenset[str] = frozenset(
	{
		"Data",
		"Small Text",
		"Read Only",
	}
)


@dataclass
class PIISpan:
	"""A detected PII value in text."""

	value: str
	category: str
	start: int
	end: int


# Pre-compiled regex patterns for free-text PII detection.
# Intentionally conservative to minimise false positives in ERP documents.
_PATTERNS: list[tuple[str, re.Pattern]] = [
	(
		"EMAIL",
		re.compile(
			r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}",
			re.IGNORECASE,
		),
	),
	(
		"PHONE",
		re.compile(
			# Leading + (international) or bare 10+ digit strings.
			r"(?:\+\d[\d\s\-().]{7,}\d|\b\d{10,}\b)",
		),
	),
	(
		"IBAN",
		re.compile(r"\b[A-Z]{2}\d{2}[A-Z0-9]{4,30}\b"),
	),
]


def classify_field(
	fieldtype: str,
	options: str | None,
	fieldname: str | None = None,
) -> str | None:
	"""Return a PII category for a Frappe DocField, or None if not PII.

	Detection layers (evaluated in order):
	1. Explicit metadata: (fieldtype, options) lookup.
	2. Always-PII fieldtypes (Phone, Geolocation, Password).
	3. Link fields pointing to personal entity DocTypes.
	4. Fieldname heuristics for Data/Small Text/Read Only without options.
	"""
	# 1. Explicit metadata match (highest confidence)
	category = FIELD_PII_MAP.get((fieldtype, options))
	if category:
		return category

	# 2. Always-PII fieldtypes
	if fieldtype in ALWAYS_PII_FIELDTYPES:
		return FIELD_PII_MAP.get((fieldtype, None))

	# 3. Link fields: do NOT auto-classify.
	# Link values are document identifiers (e.g. "CUST-00015"), not personal
	# names.  Actual PII is captured by display fields (customer_name, etc.)
	# via heuristic rules below.  Regex-detectable PII in Link values (e.g.
	# email addresses in User links) is handled by the masker's fallback.

	# 4. Fieldname heuristics (for fields without typed options)
	if fieldname and fieldtype in _HEURISTIC_FIELDTYPES:
		fn = fieldname.lower()
		if fn in _NAME_FIELDNAMES or any(fn.endswith(s) for s in _NAME_SUFFIXES):
			return "PERSON"
		if fn in _EMAIL_FIELDNAMES or any(fn.endswith(s) for s in _EMAIL_SUFFIXES):
			return "EMAIL"
		if fn in _PHONE_FIELDNAMES or any(fn.endswith(s) for s in _PHONE_SUFFIXES):
			return "PHONE"

	return None


def find_pii_in_text(text: str) -> list[PIISpan]:
	"""Find PII spans in free text using regex patterns.

	Returns non-overlapping spans sorted by start position.
	"""
	if not text:
		return []

	spans: list[PIISpan] = []
	for category, pattern in _PATTERNS:
		for m in pattern.finditer(text):
			spans.append(PIISpan(value=m.group(), category=category, start=m.start(), end=m.end()))

	spans.sort(key=lambda s: s.start)
	deduped: list[PIISpan] = []
	last_end = -1
	for span in spans:
		if span.start >= last_end:
			deduped.append(span)
			last_end = span.end

	return deduped
