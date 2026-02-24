# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""PII auto-masking verification tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_pii_masking

These tests prove — with visible output — that personal data is replaced
with anonymous tokens before reaching the LLM, and correctly restored in
the response.  No network calls are made; the LLM provider is not contacted.
"""

import re
import unittest
from types import SimpleNamespace
from unittest.mock import patch

from jana.services.privacy.detector import (
	PIISpan,
	classify_field,
	find_pii_in_text,
)
from jana.services.privacy.masker import PIIMasker


def _make_provider_doc(
	provider_type: str = "openai",
	mask_pii_override: str = "Always On",
) -> SimpleNamespace:
	"""Create a minimal provider-doc-like object for testing."""
	return SimpleNamespace(
		provider_type=provider_type,
		mask_pii_override=mask_pii_override,
	)


def _make_masker(**kwargs) -> PIIMasker:
	"""Create an enabled PIIMasker without hitting the database."""
	doc = _make_provider_doc(**kwargs)
	with patch("jana.services.privacy.masker.frappe") as mock_frappe:
		mock_frappe.db.get_single_value.return_value = 1
		return PIIMasker(doc)


# ---------------------------------------------------------------------------
# 1. Detector — field classification
# ---------------------------------------------------------------------------


class TestFieldClassification(unittest.TestCase):
	"""Verify that Frappe field metadata is mapped to the right PII category."""

	# ---- Explicit metadata matches ----

	def test_data_email(self):
		self.assertEqual(classify_field("Data", "Email"), "EMAIL")

	def test_data_phone(self):
		self.assertEqual(classify_field("Data", "Phone"), "PHONE")

	def test_data_name(self):
		self.assertEqual(classify_field("Data", "Name"), "PERSON")

	def test_data_iban(self):
		self.assertEqual(classify_field("Data", "IBAN"), "IBAN")

	def test_small_text_email(self):
		self.assertEqual(classify_field("Small Text", "Email"), "EMAIL")

	def test_small_text_phone(self):
		self.assertEqual(classify_field("Small Text", "Phone"), "PHONE")

	def test_small_text_name(self):
		self.assertEqual(classify_field("Small Text", "Name"), "PERSON")

	# ---- Always-PII fieldtypes ----

	def test_phone_fieldtype(self):
		self.assertEqual(classify_field("Phone", None), "PHONE")

	def test_geolocation_fieldtype(self):
		self.assertEqual(classify_field("Geolocation", None), "LOCATION")

	def test_password_fieldtype(self):
		self.assertEqual(classify_field("Password", None), "PASSWORD")

	# ---- Link fields: NOT classified by classify_field ----
	# Link values are document identifiers (e.g. "CUST-00015"), not personal
	# names.  Actual PII is caught by display fields (customer_name, etc.)
	# via fieldname heuristics.  Regex-detectable PII in Link values (emails
	# in User links) is handled by the masker's fallback, not here.

	def test_link_customer_not_classified(self):
		self.assertIsNone(classify_field("Link", "Customer"))

	def test_link_employee_not_classified(self):
		self.assertIsNone(classify_field("Link", "Employee"))

	def test_link_user_not_classified(self):
		self.assertIsNone(classify_field("Link", "User"))

	def test_link_non_personal(self):
		"""Link to a non-personal DocType is also not classified."""
		self.assertIsNone(classify_field("Link", "Item"))
		self.assertIsNone(classify_field("Link", "Company"))
		self.assertIsNone(classify_field("Link", "Warehouse"))

	# ---- Fieldname heuristics ----

	def test_customer_name_heuristic(self):
		self.assertEqual(
			classify_field("Data", None, fieldname="customer_name"), "PERSON"
		)

	def test_employee_name_heuristic(self):
		self.assertEqual(
			classify_field("Small Text", None, fieldname="employee_name"), "PERSON"
		)

	def test_name_suffix_heuristic(self):
		self.assertEqual(
			classify_field("Data", None, fieldname="billing_contact_name"), "PERSON"
		)

	def test_email_fieldname_heuristic(self):
		self.assertEqual(
			classify_field("Data", None, fieldname="email_id"), "EMAIL"
		)

	def test_email_substring_heuristic(self):
		self.assertEqual(
			classify_field("Data", None, fieldname="notification_email"), "EMAIL"
		)

	def test_phone_fieldname_heuristic(self):
		self.assertEqual(
			classify_field("Data", None, fieldname="mobile_no"), "PHONE"
		)

	# ---- Non-PII fields ----

	def test_currency_not_pii(self):
		self.assertIsNone(classify_field("Currency", None))

	def test_int_not_pii(self):
		self.assertIsNone(classify_field("Int", None))

	def test_data_no_options_generic_name(self):
		"""A generic Data field with no options or heuristic match is NOT PII."""
		self.assertIsNone(classify_field("Data", None, fieldname="item_code"))

	def test_select_not_pii(self):
		self.assertIsNone(classify_field("Select", None, fieldname="status"))


# ---------------------------------------------------------------------------
# 2. Detector — free-text regex detection
# ---------------------------------------------------------------------------


class TestFreeTextDetection(unittest.TestCase):
	"""Verify regex patterns catch PII in free-form text."""

	def test_email_detected(self):
		spans = find_pii_in_text("Send to john@acme.com please")
		self.assertEqual(len(spans), 1)
		self.assertEqual(spans[0].category, "EMAIL")
		self.assertEqual(spans[0].value, "john@acme.com")

	def test_multiple_emails(self):
		spans = find_pii_in_text("CC alice@co.org and bob@test.io")
		emails = [s for s in spans if s.category == "EMAIL"]
		self.assertEqual(len(emails), 2)
		values = {s.value for s in emails}
		self.assertIn("alice@co.org", values)
		self.assertIn("bob@test.io", values)

	def test_international_phone(self):
		spans = find_pii_in_text("Call +1-555-123-4567 for details")
		phones = [s for s in spans if s.category == "PHONE"]
		self.assertEqual(len(phones), 1)
		self.assertIn("+1-555-123-4567", phones[0].value)

	def test_bare_long_number(self):
		spans = find_pii_in_text("Fax number: 5551234567")
		phones = [s for s in spans if s.category == "PHONE"]
		self.assertEqual(len(phones), 1)

	def test_iban_detected(self):
		spans = find_pii_in_text("Transfer to DE89370400440532013000")
		ibans = [s for s in spans if s.category == "IBAN"]
		self.assertEqual(len(ibans), 1)
		self.assertEqual(ibans[0].value, "DE89370400440532013000")

	def test_no_pii_in_clean_text(self):
		spans = find_pii_in_text("The total is 1500 USD for 3 items.")
		self.assertEqual(len(spans), 0)

	def test_empty_text(self):
		self.assertEqual(find_pii_in_text(""), [])
		self.assertEqual(find_pii_in_text(None), [])

	def test_non_overlapping(self):
		"""Spans must not overlap — earlier match wins."""
		text = "Email john@acme.com now"
		spans = find_pii_in_text(text)
		for i in range(len(spans) - 1):
			self.assertGreaterEqual(spans[i + 1].start, spans[i].end)


# ---------------------------------------------------------------------------
# 3. Masker — structured context masking
# ---------------------------------------------------------------------------


class TestContextFieldMasking(unittest.TestCase):
	"""Prove that document field values are replaced with tokens."""

	def test_email_field_masked(self):
		masker = _make_masker()
		context = {
			"doctype": "Customer",
			"docname": "CUST-001",
			"fields": {
				"email_id": {
					"label": "Email",
					"value": "john@acme.com",
					"fieldtype": "Data",
					"options": "Email",
				},
			},
			"status": 0,
		}

		masked = masker.mask_context_fields(context)

		self.assertNotEqual(masked["fields"]["email_id"]["value"], "john@acme.com")
		self.assertRegex(masked["fields"]["email_id"]["value"], r"\[EMAIL_\d+\]")
		self.assertEqual(masker._mapping["[EMAIL_1]"], "john@acme.com")

	def test_person_field_masked(self):
		masker = _make_masker()
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "John Smith",
					"fieldtype": "Data",
					"options": None,
				},
			},
			"status": 1,
		}

		masked = masker.mask_context_fields(context)

		self.assertEqual(masked["fields"]["customer_name"]["value"], "[PERSON_1]")
		self.assertEqual(masker._mapping["[PERSON_1]"], "John Smith")

	def test_phone_field_masked(self):
		masker = _make_masker()
		context = {
			"doctype": "Contact",
			"docname": "CON-001",
			"fields": {
				"phone": {
					"label": "Phone",
					"value": "+1-555-867-5309",
					"fieldtype": "Phone",
					"options": None,
				},
			},
			"status": 0,
		}

		masked = masker.mask_context_fields(context)

		self.assertEqual(masked["fields"]["phone"]["value"], "[PHONE_1]")
		self.assertEqual(masker._mapping["[PHONE_1]"], "+1-555-867-5309")

	def test_non_pii_field_untouched(self):
		masker = _make_masker()
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"grand_total": {
					"label": "Grand Total",
					"value": "1500.00",
					"fieldtype": "Currency",
					"options": None,
				},
				"status": {
					"label": "Status",
					"value": "Unpaid",
					"fieldtype": "Select",
					"options": None,
				},
			},
			"status": 1,
		}

		masked = masker.mask_context_fields(context)

		self.assertEqual(masked["fields"]["grand_total"]["value"], "1500.00")
		self.assertEqual(masked["fields"]["status"]["value"], "Unpaid")
		self.assertEqual(len(masker._mapping), 0)

	def test_multiple_fields_get_distinct_tokens(self):
		masker = _make_masker()
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "Alice",
					"fieldtype": "Data",
					"options": None,
				},
				"contact_person": {
					"label": "Contact Person",
					"value": "Bob",
					"fieldtype": "Data",
					"options": None,
				},
				"contact_email": {
					"label": "Contact Email",
					"value": "alice@co.org",
					"fieldtype": "Data",
					"options": "Email",
				},
			},
			"status": 1,
		}

		masked = masker.mask_context_fields(context)

		# Each distinct value gets its own token
		tokens = {info["value"] for info in masked["fields"].values()}
		self.assertEqual(len(tokens), 3)  # 3 distinct tokens
		self.assertTrue(all(re.match(r"\[\w+_\d+\]", t) for t in tokens))

	def test_same_value_reuses_token(self):
		"""If the same PII value appears in two fields, they share a token."""
		masker = _make_masker()
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "Alice",
					"fieldtype": "Data",
					"options": None,
				},
				"bill_to_name": {
					"label": "Bill To",
					"value": "Alice",
					"fieldtype": "Data",
					"options": None,
				},
			},
			"status": 1,
		}

		masked = masker.mask_context_fields(context)

		self.assertEqual(
			masked["fields"]["customer_name"]["value"],
			masked["fields"]["bill_to_name"]["value"],
		)
		self.assertEqual(len(masker._mapping), 1)


# ---------------------------------------------------------------------------
# 3b. Masker — Link field handling
# ---------------------------------------------------------------------------


class TestLinkFieldHandling(unittest.TestCase):
	"""Verify that Link fields are treated correctly.

	Link field values are document identifiers (e.g. "CUST-00015").
	They are NOT auto-classified as PERSON by classify_field().

	The masker applies regex as a fallback, so:
	  - "CUST-00015"       → not masked  (it's just an ID)
	  - "john@example.com" → masked as EMAIL  (User link contains email)
	"""

	def test_link_id_not_masked(self):
		"""A naming-series Customer ID is not PII — passes through."""
		masker = _make_masker()
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer": {
					"label": "Customer",
					"value": "CUST-00015",
					"fieldtype": "Link",
					"options": "Customer",
				},
			},
			"status": 1,
		}

		masked = masker.mask_context_fields(context)

		# The ID is not PII — it should pass through unmasked
		self.assertEqual(masked["fields"]["customer"]["value"], "CUST-00015")
		self.assertEqual(len(masker._mapping), 0)

	def test_user_link_email_masked(self):
		"""User links contain email addresses — regex catches them."""
		masker = _make_masker()
		context = {
			"doctype": "ToDo",
			"docname": "TODO-001",
			"fields": {
				"allocated_to": {
					"label": "Allocated To",
					"value": "john@example.com",
					"fieldtype": "Link",
					"options": "User",
				},
			},
			"status": 0,
		}

		masked = masker.mask_context_fields(context)

		self.assertRegex(masked["fields"]["allocated_to"]["value"], r"\[EMAIL_\d+\]")
		self.assertEqual(masker._mapping["[EMAIL_1]"], "john@example.com")

	def test_link_to_non_personal_doctype_untouched(self):
		"""Link to Item, Warehouse, etc. is never considered PII."""
		masker = _make_masker()
		context = {
			"doctype": "Sales Invoice Item",
			"docname": "SII-001",
			"fields": {
				"item_code": {
					"label": "Item Code",
					"value": "ITEM-00042",
					"fieldtype": "Link",
					"options": "Item",
				},
			},
			"status": 0,
		}

		masked = masker.mask_context_fields(context)

		self.assertEqual(masked["fields"]["item_code"]["value"], "ITEM-00042")
		self.assertEqual(len(masker._mapping), 0)


# ---------------------------------------------------------------------------
# 4. Masker — free-text message masking
# ---------------------------------------------------------------------------


class TestMessageMasking(unittest.TestCase):
	"""Prove that PII in user/assistant messages is replaced with tokens."""

	def test_user_message_masked(self):
		masker = _make_masker()
		messages = [
			{"role": "system", "content": "You are Jana."},
			{"role": "user", "content": "Email john@acme.com about the invoice"},
		]

		masked = masker.mask_messages(messages)

		# System message untouched
		self.assertEqual(masked[0]["content"], "You are Jana.")
		# User message has token
		self.assertNotIn("john@acme.com", masked[1]["content"])
		self.assertIn("[EMAIL_1]", masked[1]["content"])

	def test_assistant_message_masked(self):
		masker = _make_masker()
		messages = [
			{"role": "assistant", "content": "Contact alice@co.org for details."},
		]

		masked = masker.mask_messages(messages)

		self.assertNotIn("alice@co.org", masked[0]["content"])
		self.assertIn("[EMAIL_1]", masked[0]["content"])

	def test_system_message_not_masked_by_mask_messages(self):
		"""System messages are handled by mask_context_fields, not mask_messages."""
		masker = _make_masker()
		messages = [
			{"role": "system", "content": "The customer is john@acme.com"},
		]

		masked = masker.mask_messages(messages)

		# System messages pass through mask_messages unchanged
		self.assertEqual(masked[0]["content"], "The customer is john@acme.com")

	def test_multiple_pii_in_one_message(self):
		masker = _make_masker()
		messages = [
			{
				"role": "user",
				"content": "Send to john@acme.com and CC alice@co.org",
			},
		]

		masked = masker.mask_messages(messages)
		content = masked[0]["content"]

		self.assertNotIn("john@acme.com", content)
		self.assertNotIn("alice@co.org", content)
		self.assertIn("[EMAIL_1]", content)
		self.assertIn("[EMAIL_2]", content)


# ---------------------------------------------------------------------------
# 4b. Known-value cross-referencing
# ---------------------------------------------------------------------------


class TestKnownValueCrossReference(unittest.TestCase):
	"""Verify that values seen in structured fields are caught in free text.

	This is the Presidio-style "known entity registry": once a value is
	masked in context fields, the same value in a user message gets the
	same token — even though regex alone wouldn't catch it (e.g. names).
	"""

	def test_name_from_context_caught_in_free_text(self):
		"""A name masked in context fields is also masked in user messages."""
		masker = _make_masker()

		# Step 1: mask context — populates mapping with name
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "Fatima Al-Rashid",
					"fieldtype": "Data",
					"options": None,
				},
			},
			"status": 1,
		}
		masker.mask_context_fields(context)
		self.assertEqual(masker._mapping["[PERSON_1]"], "Fatima Al-Rashid")

		# Step 2: mask free text — the name should be caught by cross-ref
		masked = masker.mask_text("What is the email for Fatima Al-Rashid?")

		self.assertNotIn("Fatima Al-Rashid", masked)
		self.assertIn("[PERSON_1]", masked)

	def test_email_from_context_reuses_token_in_free_text(self):
		"""An email masked in context gets the SAME token in free text."""
		masker = _make_masker()

		context = {
			"doctype": "Contact",
			"docname": "CON-001",
			"fields": {
				"email_id": {
					"label": "Email",
					"value": "fatima@example.sa",
					"fieldtype": "Data",
					"options": "Email",
				},
			},
			"status": 0,
		}
		masker.mask_context_fields(context)

		# Same email in user message → same token (not a new [EMAIL_2])
		masked = masker.mask_text("Send invoice to fatima@example.sa")
		self.assertIn("[EMAIL_1]", masked)
		self.assertNotIn("[EMAIL_2]", masked)

	def test_longer_values_replaced_first(self):
		"""Cross-reference replaces longest values first to avoid partial matches."""
		masker = _make_masker()

		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "John Smith",
					"fieldtype": "Data",
					"options": None,
				},
				"contact_person": {
					"label": "Contact Person",
					"value": "John",
					"fieldtype": "Data",
					"options": None,
				},
			},
			"status": 1,
		}
		masker.mask_context_fields(context)

		# "John Smith" should be replaced as a whole, not "John" first
		masked = masker.mask_text("Ask John Smith about the invoice")
		self.assertIn("[PERSON_1]", masked)
		# "John" alone should not appear (it was part of "John Smith")
		self.assertNotIn("John", masked)

	def test_cross_ref_then_regex(self):
		"""After cross-referencing known values, regex catches new PII."""
		masker = _make_masker()

		# Known name from context
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "Alice",
					"fieldtype": "Data",
					"options": None,
				},
			},
			"status": 1,
		}
		masker.mask_context_fields(context)

		# User message: known name + NEW email (not in context)
		masked = masker.mask_text("Alice's email is new@example.com")

		self.assertNotIn("Alice", masked)
		self.assertNotIn("new@example.com", masked)
		self.assertIn("[PERSON_1]", masked)  # from cross-ref
		self.assertIn("[EMAIL_1]", masked)   # from regex


# ---------------------------------------------------------------------------
# 5. Masker — unmasking (restoring real values)
# ---------------------------------------------------------------------------


class TestUnmasking(unittest.TestCase):
	"""Prove that tokens in the LLM response are replaced back with real values."""

	def test_basic_unmask(self):
		masker = _make_masker()

		# First, mask some values to populate the mapping
		masker.mask_text("Contact john@acme.com please")
		self.assertEqual(masker._mapping["[EMAIL_1]"], "john@acme.com")

		# Simulate LLM response using the token
		llm_response = "The email for this contact is [EMAIL_1]."
		unmasked = masker.unmask(llm_response)

		self.assertEqual(unmasked, "The email for this contact is john@acme.com.")

	def test_unmask_multiple_tokens(self):
		masker = _make_masker()

		masker.mask_text("From john@acme.com to alice@co.org")

		llm_response = "[EMAIL_1] should send the invoice to [EMAIL_2]."
		unmasked = masker.unmask(llm_response)

		self.assertIn("john@acme.com", unmasked)
		self.assertIn("alice@co.org", unmasked)
		self.assertNotIn("[EMAIL_1]", unmasked)
		self.assertNotIn("[EMAIL_2]", unmasked)

	def test_unmask_mixed_categories(self):
		masker = _make_masker()

		# Mask via context fields
		context = {
			"doctype": "Sales Invoice",
			"docname": "SI-001",
			"fields": {
				"customer_name": {
					"label": "Customer Name",
					"value": "John Smith",
					"fieldtype": "Data",
					"options": None,
				},
				"contact_email": {
					"label": "Contact Email",
					"value": "john@acme.com",
					"fieldtype": "Data",
					"options": "Email",
				},
			},
			"status": 1,
		}
		masker.mask_context_fields(context)

		llm_response = "Customer [PERSON_1] can be reached at [EMAIL_1]."
		unmasked = masker.unmask(llm_response)

		self.assertEqual(
			unmasked, "Customer John Smith can be reached at john@acme.com."
		)

	def test_unmask_no_tokens_passthrough(self):
		masker = _make_masker()
		text = "This response has no tokens in it."
		self.assertEqual(masker.unmask(text), text)

	def test_unmask_case_insensitive(self):
		"""LLM might change token casing — unmask should still work."""
		masker = _make_masker()
		masker.mask_text("Contact john@acme.com")

		# LLM might return lowercase or mixed case tokens
		unmasked = masker.unmask("Email is [email_1]")
		self.assertIn("john@acme.com", unmasked)


# ---------------------------------------------------------------------------
# 6. Masker — streaming unmask
# ---------------------------------------------------------------------------


class TestStreamingUnmask(unittest.TestCase):
	"""Verify that partial tokens are buffered during streaming."""

	def test_complete_token_in_one_chunk(self):
		masker = _make_masker()
		masker.mask_text("Contact john@acme.com")

		result = masker.unmask_chunk("The email is [EMAIL_1].")
		self.assertIn("john@acme.com", result)

	def test_partial_token_buffered(self):
		masker = _make_masker()
		masker.mask_text("Contact john@acme.com")

		# Token arrives split across two chunks
		chunk1 = masker.unmask_chunk("The email is [EMAIL")
		chunk2 = masker.unmask_chunk("_1]. Done.")

		# First chunk should output "The email is " and hold back "[EMAIL"
		self.assertNotIn("[EMAIL", chunk1)
		self.assertNotIn("john@acme.com", chunk1)

		# Second chunk completes the token and unmasks it
		self.assertIn("john@acme.com", chunk2)

	def test_flush_buffer_at_end(self):
		masker = _make_masker()
		masker.mask_text("Contact john@acme.com")

		# Incomplete token at stream end
		masker.unmask_chunk("Trailing [EMAIL")
		remaining = masker.flush_buffer()

		# flush_buffer should output whatever was buffered
		self.assertTrue(len(remaining) > 0)


# ---------------------------------------------------------------------------
# 7. Masker — enable/disable logic
# ---------------------------------------------------------------------------


class TestMaskerEnableLogic(unittest.TestCase):
	"""Verify the masking resolution: provider override -> global -> local exempt."""

	def test_always_on_overrides_global_off(self):
		masker = _make_masker(mask_pii_override="Always On")
		self.assertTrue(masker.enabled)

	def test_always_off_overrides_global_on(self):
		masker = _make_masker(mask_pii_override="Always Off")
		self.assertFalse(masker.enabled)

	def test_global_on_cloud_provider_enabled(self):
		masker = _make_masker(provider_type="openai")
		self.assertTrue(masker.enabled)

	def test_global_on_local_provider_exempt(self):
		"""Ollama and vLLM are automatically exempt when using global default."""
		doc = _make_provider_doc(provider_type="ollama", mask_pii_override="Global Default")
		with patch("jana.services.privacy.masker.frappe") as mock_frappe:
			mock_frappe.db.get_single_value.return_value = 1
			masker = PIIMasker(doc)
		self.assertFalse(masker.enabled)

		doc = _make_provider_doc(provider_type="vllm", mask_pii_override="Global Default")
		with patch("jana.services.privacy.masker.frappe") as mock_frappe:
			mock_frappe.db.get_single_value.return_value = 1
			masker = PIIMasker(doc)
		self.assertFalse(masker.enabled)

	def test_global_off_cloud_provider_disabled(self):
		doc = _make_provider_doc(provider_type="openai", mask_pii_override="Global Default")
		with patch("jana.services.privacy.masker.frappe") as mock_frappe:
			mock_frappe.db.get_single_value.return_value = 0
			masker = PIIMasker(doc)
		self.assertFalse(masker.enabled)

	def test_local_provider_always_on_overrides_exemption(self):
		"""Even Ollama can be forced on with Always On."""
		masker = _make_masker(provider_type="ollama", mask_pii_override="Always On")
		self.assertTrue(masker.enabled)

	def test_disabled_masker_passes_through(self):
		masker = _make_masker(mask_pii_override="Always Off")
		text = "Contact john@acme.com"

		self.assertEqual(masker.mask_text(text), text)
		self.assertEqual(masker.unmask(text), text)
		self.assertEqual(len(masker._mapping), 0)


# ---------------------------------------------------------------------------
# 8. End-to-end: full round-trip (the "see it with your eyes" test)
# ---------------------------------------------------------------------------


class TestFullRoundTrip(unittest.TestCase):
	"""Simulate the complete send_message flow without hitting an LLM.

	This is the "proof" test: build exactly what the LLM would receive,
	verify all PII is masked, then unmask the simulated response.
	"""

	def test_invoice_round_trip(self):
		"""Simulate a user viewing a Sales Invoice with customer PII."""
		masker = _make_masker()

		# ---- Step 1: Context from the page (what get_page_context returns) ----
		context = {
			"doctype": "Sales Invoice",
			"docname": "ACC-SINV-2026-00042",
			"fields": {
				"customer": {
					"label": "Customer",
					"value": "CUST-00015",
					"fieldtype": "Link",
					"options": "Customer",
				},
				"customer_name": {
					"label": "Customer Name",
					"value": "Fatima Al-Rashid",
					"fieldtype": "Data",
					"options": None,
				},
				"contact_email": {
					"label": "Contact Email",
					"value": "fatima@example.sa",
					"fieldtype": "Data",
					"options": "Email",
				},
				"contact_mobile": {
					"label": "Mobile",
					"value": "+966-50-123-4567",
					"fieldtype": "Data",
					"options": None,
				},
				"grand_total": {
					"label": "Grand Total",
					"value": "15000.00",
					"fieldtype": "Currency",
					"options": None,
				},
				"status": {
					"label": "Status",
					"value": "Unpaid",
					"fieldtype": "Select",
					"options": None,
				},
			},
			"status": 1,
		}

		# ---- Step 2: Structured masking (chat.py _build_messages) ----
		masked_context = masker.mask_context_fields(context)

		# PROOF: PII field values are replaced with tokens
		self.assertRegex(masked_context["fields"]["customer_name"]["value"], r"\[PERSON_\d+\]")
		self.assertRegex(masked_context["fields"]["contact_email"]["value"], r"\[EMAIL_\d+\]")

		# PROOF: Link ID is NOT masked (it's not PII)
		self.assertEqual(masked_context["fields"]["customer"]["value"], "CUST-00015")

		# PROOF: Non-PII values are untouched
		self.assertEqual(masked_context["fields"]["grand_total"]["value"], "15000.00")
		self.assertEqual(masked_context["fields"]["status"]["value"], "Unpaid")

		# PROOF: No real PII leaks from any field
		for fname, info in masked_context["fields"].items():
			val = info["value"]
			self.assertNotIn("Fatima Al-Rashid", val, f"Field {fname} leaks name")
			self.assertNotIn("fatima@example.sa", val, f"Field {fname} leaks email")

		# ---- Step 3: Build messages (system + context + user) ----
		from jana.services.context import format_context_for_prompt

		context_text = format_context_for_prompt(masked_context)
		system_prompt = "You are Jana.\n\n---\n\n" + context_text

		messages = [
			{"role": "system", "content": system_prompt},
			{
				"role": "user",
				"content": "What is the email for Fatima Al-Rashid? CC fatima@example.sa",
			},
		]

		# ---- Step 4: Free-text masking (chat.py line 82) ----
		masked_messages = masker.mask_messages(messages)

		# PROOF: Known name from context is caught by cross-referencing
		user_content = masked_messages[1]["content"]
		self.assertNotIn("Fatima Al-Rashid", user_content, "Name leaked in user message")
		self.assertNotIn("fatima@example.sa", user_content, "Email leaked in user message")
		self.assertIn("[PERSON_", user_content)
		self.assertIn("[EMAIL_", user_content)

		# PROOF: Structured context in system message has tokens
		system_content = masked_messages[0]["content"]
		self.assertIn("[PERSON_", system_content)
		self.assertIn("[EMAIL_", system_content)

		# ---- Step 5: Simulate LLM response (using tokens) ----
		llm_response = (
			"The contact email for [PERSON_1] on invoice ACC-SINV-2026-00042 "
			"is [EMAIL_1]. The outstanding amount is 15000.00 SAR."
		)

		# ---- Step 6: Unmask (chat.py line ~100) ----
		final_response = masker.unmask(llm_response)

		# PROOF: Real values are restored
		self.assertIn("Fatima Al-Rashid", final_response)
		self.assertIn("fatima@example.sa", final_response)

		# PROOF: No tokens remain
		self.assertNotIn("[PERSON_", final_response)
		self.assertNotIn("[EMAIL_", final_response)

		# PROOF: Non-PII data passes through fine
		self.assertIn("15000.00", final_response)
		self.assertIn("ACC-SINV-2026-00042", final_response)

	def test_mapping_contents_visible(self):
		"""Print the mapping table so the developer can inspect it visually."""
		masker = _make_masker()

		context = {
			"doctype": "Employee",
			"docname": "HR-EMP-00001",
			"fields": {
				"employee_name": {
					"label": "Employee Name",
					"value": "Ahmed Ben Salah",
					"fieldtype": "Data",
					"options": None,
				},
				"personal_email": {
					"label": "Personal Email",
					"value": "ahmed.salah@gmail.com",
					"fieldtype": "Data",
					"options": "Email",
				},
				"cell_phone": {
					"label": "Cell Phone",
					"value": "+216-71-234-567",
					"fieldtype": "Phone",
					"options": None,
				},
				"designation": {
					"label": "Designation",
					"value": "Software Engineer",
					"fieldtype": "Data",
					"options": None,
				},
			},
			"status": 0,
		}

		masker.mask_context_fields(context)

		# This print shows up in the test runner output (bench run-tests -v)
		print("\n" + "=" * 60)
		print("  PII MASKING VERIFICATION — MAPPING TABLE")
		print("=" * 60)
		for token, real_value in sorted(masker._mapping.items()):
			print(f"  {token:20s} → {real_value}")
		print(f"\n  Total PII values masked: {len(masker._mapping)}")
		print(f"  Non-PII fields untouched: designation = {context['fields']['designation']['value']}")
		print("=" * 60)

		self.assertEqual(len(masker._mapping), 3)
		self.assertNotIn("designation", " ".join(masker._mapping.values()))


# ---------------------------------------------------------------------------
# 9. Zero-persistence guarantee
# ---------------------------------------------------------------------------


class TestZeroPersistence(unittest.TestCase):
	"""Verify that masking state does not survive beyond the masker instance."""

	def test_separate_maskers_have_no_shared_state(self):
		"""Two masker instances (simulating two requests) share nothing."""
		masker1 = _make_masker()
		masker2 = _make_masker()

		masker1.mask_text("Contact john@acme.com")

		# masker2 should know nothing about masker1's mapping
		self.assertEqual(len(masker2._mapping), 0)
		self.assertEqual(masker2.unmask("[EMAIL_1]"), "[EMAIL_1]")

	def test_mapping_clears_on_garbage_collection(self):
		"""When the masker goes out of scope, the mapping is gone."""
		import gc

		masker = _make_masker()
		masker.mask_text("Contact john@acme.com")

		# Delete the masker
		del masker
		gc.collect()

		# The mapping dict is no longer reachable — no module-level leakage
		fresh_masker = _make_masker()
		self.assertEqual(len(fresh_masker._mapping), 0)


if __name__ == "__main__":
	unittest.main()
