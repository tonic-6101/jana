# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Provider tier detection and model capability matrix.

Assigns risk tiers to models for guardrail escalation:
- Tier 1 (Strong): Low hallucination risk — standard guardrails
- Tier 2 (Medium): Medium risk — forced low temperature for all turns
- Tier 3 (Weak):   High risk — maximum guardrails, temperature=0 always
"""

# Model name patterns → capabilities
# Keys are lowercased, matched by prefix
MODEL_CAPABILITIES: dict[str, dict] = {
	# Tier 1 — Strong models
	"gpt-4o": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"gpt-4-turbo": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"gpt-4.1": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"o1": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"o3": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"claude-opus-4": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"claude-sonnet-4": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"claude-3.5-sonnet": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"claude-3-opus": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"gemini-1.5-pro": {"tools": True, "structured": True, "stream": True, "tier": 1},
	"gemini-2.0-flash": {"tools": True, "structured": True, "stream": True, "tier": 1},
	# Tier 2 — Medium models
	"gpt-4o-mini": {"tools": True, "structured": True, "stream": True, "tier": 2},
	"gpt-3.5-turbo": {"tools": True, "structured": False, "stream": True, "tier": 2},
	"o1-mini": {"tools": True, "structured": True, "stream": True, "tier": 2},
	"claude-haiku-4": {"tools": True, "structured": True, "stream": True, "tier": 2},
	"claude-3-haiku": {"tools": True, "structured": True, "stream": True, "tier": 2},
	"gemini-1.5-flash": {"tools": True, "structured": True, "stream": True, "tier": 2},
	"mistral-large": {"tools": True, "structured": False, "stream": True, "tier": 2},
	# Tier 3 — Weak / local models
	"llama": {"tools": True, "structured": True, "stream": True, "tier": 3},
	"mistral": {"tools": False, "structured": False, "stream": True, "tier": 3},
	"codellama": {"tools": False, "structured": False, "stream": True, "tier": 3},
	"gemma": {"tools": False, "structured": False, "stream": True, "tier": 3},
	"phi": {"tools": False, "structured": False, "stream": True, "tier": 3},
	"qwen": {"tools": True, "structured": False, "stream": True, "tier": 3},
}

# Default for unknown models
_DEFAULT_CAPABILITIES = {"tools": False, "structured": False, "stream": True, "tier": 3}


def get_model_capabilities(model: str) -> dict:
	"""Look up model capabilities. Unknown models default to Tier 3.

	Args:
		model: The model name (e.g., "gpt-4o", "claude-3.5-sonnet", "llama3.1:8b").

	Returns:
		Dict with keys: tools, structured, stream, tier.
	"""
	if not model:
		return dict(_DEFAULT_CAPABILITIES)

	model_lower = model.lower()

	# Try exact match first
	if model_lower in MODEL_CAPABILITIES:
		return dict(MODEL_CAPABILITIES[model_lower])

	# Try prefix match (handles versioned names like "claude-sonnet-4-20250514")
	for pattern, caps in MODEL_CAPABILITIES.items():
		if model_lower.startswith(pattern):
			return dict(caps)

	# Try matching after stripping the provider prefix (e.g., "anthropic/claude-sonnet-4")
	if "/" in model_lower:
		model_without_prefix = model_lower.split("/", 1)[1]
		for pattern, caps in MODEL_CAPABILITIES.items():
			if model_without_prefix.startswith(pattern):
				return dict(caps)

	return dict(_DEFAULT_CAPABILITIES)


def get_provider_tier(
	model: str,
	explicit_tier: str | None = None,
	provider_type: str | None = None,
) -> int:
	"""Determine the provider tier for guardrail escalation.

	Args:
		model: The model name.
		explicit_tier: Explicit tier override from Jana Provider config
			(e.g., "Tier 1 (Strong)").
		provider_type: The provider type (e.g., "ollama", "openai").

	Returns:
		Tier number (1, 2, or 3).
	"""
	# Explicit override wins
	if explicit_tier and explicit_tier != "Auto-detect":
		if "1" in explicit_tier:
			return 1
		if "2" in explicit_tier:
			return 2
		return 3

	# All Ollama/vLLM models default to Tier 3 unless explicitly overridden
	if provider_type in ("ollama", "vllm"):
		return 3

	# Auto-detect from model name
	caps = get_model_capabilities(model)
	return caps["tier"]
