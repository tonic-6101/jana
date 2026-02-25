# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for provider tier detection and model capability matrix."""

import unittest


class TestGetModelCapabilities(unittest.TestCase):
	"""Tests for provider_tiers.get_model_capabilities."""

	def test_known_tier1_model(self):
		"""Known Tier 1 model should return correct capabilities."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("gpt-4o")
		self.assertEqual(caps["tier"], 1)
		self.assertTrue(caps["tools"])
		self.assertTrue(caps["structured"])

	def test_known_tier2_model(self):
		"""Known Tier 2 model should return correct capabilities."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("gpt-4o-mini")
		self.assertEqual(caps["tier"], 2)

	def test_known_tier3_model(self):
		"""Known Tier 3 model should return correct capabilities."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("llama")
		self.assertEqual(caps["tier"], 3)

	def test_unknown_model_defaults_to_tier3(self):
		"""Unknown models must default to Tier 3 (highest guardrails)."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("totally-unknown-model-xyz")
		self.assertEqual(caps["tier"], 3)
		self.assertFalse(caps["tools"])
		self.assertFalse(caps["structured"])

	def test_empty_model_defaults_to_tier3(self):
		"""Empty model string should default to Tier 3."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("")
		self.assertEqual(caps["tier"], 3)

	def test_none_model_defaults_to_tier3(self):
		"""None model should default to Tier 3."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities(None)
		self.assertEqual(caps["tier"], 3)

	def test_prefix_match_versioned_model(self):
		"""Versioned model names should match by prefix."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("claude-sonnet-4-20250514")
		self.assertEqual(caps["tier"], 1)

	def test_case_insensitive_matching(self):
		"""Model name matching should be case-insensitive."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("GPT-4O")
		self.assertEqual(caps["tier"], 1)

	def test_provider_prefix_stripped(self):
		"""Provider prefixes like 'anthropic/' should be stripped."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("anthropic/claude-sonnet-4")
		self.assertEqual(caps["tier"], 1)

	def test_returns_copy_not_reference(self):
		"""Should return a copy so modifications don't affect the original."""
		from jana.services.guardrails.provider_tiers import (
			MODEL_CAPABILITIES,
			get_model_capabilities,
		)

		caps = get_model_capabilities("gpt-4o")
		caps["tier"] = 99
		self.assertEqual(MODEL_CAPABILITIES["gpt-4o"]["tier"], 1)

	def test_claude_opus_is_tier1(self):
		"""Claude Opus should be Tier 1."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("claude-opus-4")
		self.assertEqual(caps["tier"], 1)

	def test_gemma_is_tier3(self):
		"""Gemma (small local model) should be Tier 3."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("gemma")
		self.assertEqual(caps["tier"], 3)
		self.assertFalse(caps["tools"])

	def test_mistral_large_is_tier2(self):
		"""Mistral Large should be Tier 2."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("mistral-large")
		self.assertEqual(caps["tier"], 2)

	def test_mistral_without_large_is_tier3(self):
		"""Plain 'mistral' should be Tier 3."""
		from jana.services.guardrails.provider_tiers import get_model_capabilities

		caps = get_model_capabilities("mistral")
		self.assertEqual(caps["tier"], 3)


class TestGetProviderTier(unittest.TestCase):
	"""Tests for provider_tiers.get_provider_tier."""

	def test_explicit_tier1_override(self):
		"""Explicit 'Tier 1 (Strong)' should override auto-detection."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("llama", explicit_tier="Tier 1 (Strong)")
		self.assertEqual(tier, 1)

	def test_explicit_tier2_override(self):
		"""Explicit 'Tier 2 (Medium)' should override auto-detection."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o", explicit_tier="Tier 2 (Medium)")
		self.assertEqual(tier, 2)

	def test_explicit_tier3_override(self):
		"""Explicit 'Tier 3 (Weak)' should override auto-detection."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o", explicit_tier="Tier 3 (Weak)")
		self.assertEqual(tier, 3)

	def test_auto_detect_ignores_explicit(self):
		"""'Auto-detect' should not count as an explicit override."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o", explicit_tier="Auto-detect")
		self.assertEqual(tier, 1)

	def test_ollama_always_tier3(self):
		"""Ollama provider type should always return Tier 3."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("llama3.1:70b", provider_type="ollama")
		self.assertEqual(tier, 3)

	def test_vllm_always_tier3(self):
		"""vLLM provider type should always return Tier 3."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("mistral-large", provider_type="vllm")
		self.assertEqual(tier, 3)

	def test_auto_detect_from_model_name(self):
		"""Without explicit tier or local provider, should auto-detect from model."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o")
		self.assertEqual(tier, 1)

	def test_unknown_model_auto_detects_tier3(self):
		"""Unknown model without explicit tier should default to Tier 3."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("unknown-model-xyz")
		self.assertEqual(tier, 3)

	def test_explicit_tier_beats_ollama(self):
		"""Explicit tier should win even for Ollama providers."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("llama3.1", explicit_tier="Tier 1 (Strong)", provider_type="ollama")
		self.assertEqual(tier, 1)

	def test_none_explicit_tier_ignored(self):
		"""None explicit tier should be ignored."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o", explicit_tier=None)
		self.assertEqual(tier, 1)
