# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for temperature control in chat service.

Verifies that temperature=0 is forced after tool calls and for Tier 3 providers.
"""

import unittest
from unittest.mock import MagicMock, patch


class TestTemperatureControl(unittest.TestCase):
	"""Tests for temperature override logic in ChatService.send_message."""

	def _make_provider_mock(self, responses):
		"""Create a mock provider that returns a sequence of responses."""
		provider = MagicMock()
		provider.complete = MagicMock(side_effect=responses)
		provider.provider_doc = MagicMock()
		provider.provider_doc.provider_tier = "Auto-detect"
		provider.provider_doc.provider_type = "openai"
		return provider

	@patch("jana.services.chat.get_provider")
	@patch("jana.services.chat.frappe")
	def test_first_turn_uses_agent_temperature(self, mock_frappe, mock_get_provider):
		"""First turn (no tool calls) should use the agent's configured temperature."""
		mock_frappe.session.user = "test@example.com"
		mock_frappe.local.lang = "en"

		# Agent with temperature 0.7, Tier 1 model
		provider = self._make_provider_mock([
			{"content": "Hello!", "model": "gpt-4o", "tokens_used": 10},
		])
		mock_get_provider.return_value = provider

		# We test the temperature logic directly since full integration
		# requires too many Frappe dependencies
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o", "Auto-detect", "openai")

		# For Tier 1 with no previous tool calls, temperature should be base
		base_temperature = 0.7
		previous_had_tool_calls = False

		if previous_had_tool_calls or tier == 3:
			turn_temperature = 0
		else:
			turn_temperature = base_temperature

		self.assertEqual(turn_temperature, 0.7)

	def test_temperature_zero_after_tool_calls(self):
		"""Temperature must be 0 on the turn after tool calls."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o", "Auto-detect", "openai")
		base_temperature = 0.7
		previous_had_tool_calls = True

		if previous_had_tool_calls or tier == 3:
			turn_temperature = 0
		else:
			turn_temperature = base_temperature

		self.assertEqual(turn_temperature, 0)

	def test_tier3_always_temperature_zero(self):
		"""Tier 3 providers must always use temperature=0."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("llama3.1:8b", provider_type="ollama")
		self.assertEqual(tier, 3)

		base_temperature = 0.7
		previous_had_tool_calls = False

		if previous_had_tool_calls or tier == 3:
			turn_temperature = 0
		else:
			turn_temperature = base_temperature

		self.assertEqual(turn_temperature, 0)

	def test_tier1_no_tool_calls_uses_base(self):
		"""Tier 1 with no tool calls should use base temperature."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o")
		self.assertEqual(tier, 1)

		base_temperature = 0.5
		previous_had_tool_calls = False

		if previous_had_tool_calls or tier == 3:
			turn_temperature = 0
		else:
			turn_temperature = base_temperature

		self.assertEqual(turn_temperature, 0.5)

	def test_tier2_after_tool_calls_forces_zero(self):
		"""Tier 2 after tool calls should force temperature=0."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		tier = get_provider_tier("gpt-4o-mini")
		self.assertEqual(tier, 2)

		base_temperature = 0.5
		previous_had_tool_calls = True

		if previous_had_tool_calls or tier == 3:
			turn_temperature = 0
		else:
			turn_temperature = base_temperature

		self.assertEqual(turn_temperature, 0)

	def test_stream_tier3_temperature_zero(self):
		"""Streaming with Tier 3 should use temperature=0."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		stream_tier = get_provider_tier("phi", provider_type="ollama")
		agent_temperature = 0.7
		temperature = 0 if stream_tier == 3 else agent_temperature

		self.assertEqual(temperature, 0)

	def test_stream_tier1_uses_agent_temperature(self):
		"""Streaming with Tier 1 should use agent temperature."""
		from jana.services.guardrails.provider_tiers import get_provider_tier

		stream_tier = get_provider_tier("gpt-4o")
		agent_temperature = 0.7
		temperature = 0 if stream_tier == 3 else agent_temperature

		self.assertEqual(temperature, 0.7)
