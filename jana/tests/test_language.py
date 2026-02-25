# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Language resilience service tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_language
"""

import unittest
from unittest.mock import MagicMock, patch


class TestGetLanguageInstructions(unittest.TestCase):
	"""Verify language instruction generation."""

	@patch("jana.services.language.frappe")
	def test_english_returns_empty(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("en")
		self.assertEqual(result, "")

	@patch("jana.services.language.frappe")
	def test_en_us_returns_empty(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("en-US")
		self.assertEqual(result, "")

	@patch("jana.services.language.frappe")
	def test_en_gb_returns_empty(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("en-GB")
		self.assertEqual(result, "")

	@patch("jana.services.language.frappe")
	def test_arabic_returns_instructions(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("ar")
		self.assertIn("Arabic", result)
		self.assertIn("Language Instructions", result)
		self.assertIn("MUST respond", result)

	@patch("jana.services.language.frappe")
	def test_arabic_includes_register(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("ar")
		self.assertIn("Modern Standard Arabic", result)

	@patch("jana.services.language.frappe")
	def test_german_register(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("de")
		self.assertIn("Sie", result)

	@patch("jana.services.language.frappe")
	def test_french_register(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("fr")
		self.assertIn("vous", result)

	@patch("jana.services.language.frappe")
	def test_japanese_register(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("ja")
		self.assertIn("丁寧語", result)

	@patch("jana.services.language.frappe")
	def test_korean_register(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("ko")
		self.assertIn("합쇼체", result)

	@patch("jana.services.language.frappe")
	def test_spanish_register(self, mock_frappe):
		from jana.services.language import get_language_instructions

		result = get_language_instructions("es")
		self.assertIn("usted", result)

	@patch("jana.services.language.frappe")
	def test_unknown_lang_still_returns_instructions(self, mock_frappe):
		"""An unknown code should still return basic instructions."""
		mock_frappe.db.get_value.return_value = "Swahili"

		from jana.services.language import get_language_instructions

		result = get_language_instructions("sw")
		self.assertIn("Swahili", result)
		self.assertIn("MUST respond", result)
		# No register instruction for unknown languages
		self.assertNotIn("Sie", result)

	@patch("jana.services.language.frappe")
	def test_regional_variant_falls_back(self, mock_frappe):
		"""ar-SA should fall back to ar config."""
		from jana.services.language import get_language_instructions

		result = get_language_instructions("ar-SA")
		self.assertIn("Arabic", result)
		self.assertIn("Modern Standard Arabic", result)

	@patch("jana.services.language.frappe")
	def test_none_uses_frappe_local_lang(self, mock_frappe):
		"""When lang_code is None, should read from frappe.local.lang."""
		mock_frappe.local.lang = "de"

		from jana.services.language import get_language_instructions

		result = get_language_instructions(None)
		self.assertIn("German", result)

	@patch("jana.services.language.frappe")
	def test_none_defaults_to_english(self, mock_frappe):
		"""When frappe.local.lang is not set, default to English."""
		mock_frappe.local = MagicMock(spec=[])  # No lang attribute

		from jana.services.language import get_language_instructions

		result = get_language_instructions(None)
		self.assertEqual(result, "")


class TestGetLanguageName(unittest.TestCase):
	"""Verify language name resolution."""

	@patch("jana.services.language.frappe")
	def test_known_language(self, mock_frappe):
		from jana.services.language import get_language_name

		self.assertEqual(get_language_name("de"), "German")
		self.assertEqual(get_language_name("ar"), "Arabic")
		self.assertEqual(get_language_name("ja"), "Japanese")

	@patch("jana.services.language.frappe")
	def test_regional_variant(self, mock_frappe):
		from jana.services.language import get_language_name

		self.assertEqual(get_language_name("es-MX"), "Spanish")
		self.assertEqual(get_language_name("pt-BR"), "Portuguese")

	@patch("jana.services.language.frappe")
	def test_unknown_from_frappe_db(self, mock_frappe):
		mock_frappe.db.get_value.return_value = "Amharic"

		from jana.services.language import get_language_name

		self.assertEqual(get_language_name("am"), "Amharic")

	@patch("jana.services.language.frappe")
	def test_unknown_returns_code(self, mock_frappe):
		mock_frappe.db.get_value.return_value = None

		from jana.services.language import get_language_name

		self.assertEqual(get_language_name("xx"), "xx")
