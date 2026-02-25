# LLM Guardrails — How Jana Prevents Hallucination

> **Context:** Jana is the orchestration layer between your Frappe environment and your chosen LLM. Jana does not generate AI responses — your model does. This document explains how Jana keeps your model grounded in real data. See [How Jana Works](how-jana-works.md) for the full picture.

## The Problem

LLMs hallucinate. Given a prompt like "create a project called Jana Development," a model might respond:

> "I've successfully created the Jana Development project. Project ID: PROJ-0001."

Three things can go wrong:

1. **Wrong DocType** — the model created a "Project" when your app uses "Custom Project" or another DocType entirely
2. **Fabricated details** — the model reported "PROJ-0001" as the ID without actually creating anything
3. **No refusal** — the model didn't say "I'm not sure which DocType to use" when the situation was ambiguous

This is called **hallucination** — confident, detailed, but factually wrong output. It is not a bug in any specific model. It is how language models work. Jana cannot eliminate it, but Jana can detect, constrain, and mitigate it.

## Core Principles

**"Prompts are suggestions; code is law."** System prompt instructions reduce hallucination but cannot eliminate it. Every critical constraint is also enforced programmatically — not just requested in the prompt.

**"Trust tool results, not the model's memory."** Every data claim must trace back to an actual tool call in the current conversation. The model's training data and general knowledge are not valid sources for document names, IDs, amounts, or statuses.

**"Fail honestly, never confidently wrong."** A user who gets "I don't know" can ask differently or look it up themselves. A user who gets fabricated data makes decisions on false information.

**"Jana routes; the model responds."** Jana injects context, routes requests, and validates results. The model generates the response. The user must always know which model is producing their results.

## The Rules

### 1. Tool Use Is Mandatory for Data Claims

The model must call a tool to retrieve or modify data before reporting results. It must never:

- State a document's status, value, or existence without querying for it
- Report that a document was created without the tool returning a success result
- Fabricate document names, IDs, amounts, dates, or status values

**How it's enforced:**
- System prompt explicitly instructs the model to never fabricate (soft)
- Tool results include source metadata so the model knows what's verified data (hard)
- Post-response validation checks that claims match actual tool results (hard)

### 2. Report Only What Tools Return

After a tool call, the model must report exactly what the tool returned — nothing more, nothing less. It must not add information that wasn't in the response, infer beyond the returned data, or guess what a failed result "should have been."

### 3. Honest Refusal Over Confident Fabrication

When the model cannot complete a request, it must refuse honestly:

- "I don't have a tool to look that up right now."
- "I'm not sure which DocType to use for that. Could you tell me the exact name?"
- "The tool returned an error. I wasn't able to complete that action."

What is never acceptable:

- Fabricating a result when no tool was called
- Guessing a DocType name when unsure
- Hiding an error behind "Done!"

### 4. DocType Grounding

Before the model can create, read, or modify documents, Jana injects the list of DocTypes that actually exist on your Frappe site. The model never has to guess. If a DocType name doesn't match, the tool call is rejected before execution.

For non-English users, Jana provides a translation table mapping translated DocType labels (e.g., "فاتورة مبيعات" in Arabic) to the internal English name ("Sales Invoice"). The model must always use the internal English name for tool calls.

### 5. Tool Results Are Validated Before Delivery

Every tool result passes through a validation layer before entering the conversation:

- The tool call ID is verified against the original request
- Results are annotated with source metadata (e.g., `"source": "frappe_api"`)
- Success and error are structurally distinct — the model cannot mistake one for the other
- Results include instructions telling the model how to present the data

### 6. Fewer Tools = Fewer Hallucinations

Research shows that filtering from 31 tools to 3 relevant tools reduces errors by 86%. Jana only exposes tools relevant to the current context — your agent's assigned tools and the capability gates in Jana Settings.

### 7. Write Operations Require Confirmation

Any operation that creates, modifies, or deletes data must be confirmed by you before execution. The model proposes; you approve. This is enforced in code, not in the prompt.

### 8. Low Temperature for Tool Calls

When the model is making tool calls (deciding which tool to use and what arguments to pass), creativity is the enemy. Jana forces `temperature=0` during tool-calling turns. The model's configured temperature is only used for free-text responses (conversation, drafting, explanations).

## Provider Tiers

Not all models are equal. A 7B parameter local model hallucinates significantly more than GPT-4o or Claude Opus. Jana applies stricter guardrails for weaker models.

| Tier | Examples | Guardrail Level |
|------|----------|----------------|
| Tier 1 (Strong) | GPT-4o, Claude 3.5+, Gemini 1.5 Pro | Standard guardrails |
| Tier 2 (Medium) | GPT-3.5, Claude Haiku, Mistral Large | Standard + forced low temperature for all turns |
| Tier 3 (Weak) | Ollama local models, small open-source models | Maximum guardrails (see below) |

**Tier 3 maximum guardrails:**

- `temperature=0` for all turns, not just tool calls
- No multi-step tool chains (max 1 tool call per turn, re-ask user between steps)
- Full response validation before display (no streaming — buffer, validate, then show)
- Post-response verification that mentioned documents actually exist

If you're not sure which tier your model falls in, Jana defaults to Tier 3 (maximum guardrails) for unknown models. You can always upgrade to a stronger model for better results.

## Multilingual Guardrails

LLMs follow instructions less reliably in non-English languages. When your Frappe language is not English, Jana applies additional measures:

**Bilingual system prompt** — Anti-hallucination rules are provided in both English and your language. English anchors the model's instruction-following (strongest in most models); your language reinforces the rules in the language the model is "thinking" in.

**DocType translation table** — Maps translated DocType labels to internal English names, so the model can understand what you mean without passing translated names to tools.

**Dual-value tool results** — Results include both internal values (for the model to use in tool calls) and translated labels (for you to read). The model is instructed to use internal values for tool parameters and translated labels for display.

**Parameter normalisation** — Dates (`15/02/2026` vs `02/15/2026`), numbers (`1.500,00` vs `1,500.00`), and Arabic-Indic numerals (`١٢٣`) are all normalised to canonical formats before tool execution.

## Conversation Drift Protection

Over long conversations, models gradually shift from grounded, tool-backed responses to fabricated ones. Turn 1 might be accurate; turn 20 might be invention.

Jana monitors for this:

- **Drift detection** tracks whether document references in the model's responses actually came from tool results
- **Periodic re-grounding** injects anti-hallucination reminders every 5 turns
- **Context window protection** places guardrail rules at the end of the system prompt (models pay more attention to recent context) and re-injects reminders in tool result annotations

## What Jana Cannot Do

Jana is not magic. These are the honest limitations:

- **Jana cannot stop hallucination entirely.** Guardrails catch many fabrications, but no system in existence prevents all LLM hallucination. If the model invents something that looks plausible and doesn't reference a specific document, the guardrails may not catch it.
- **Jana cannot make a weak model smart.** Tier 3 guardrails reduce errors, but they also reduce capability. If your model struggles with tool calling, the best solution is a stronger model — not more guardrails.
- **Post-stream corrections are not invisible.** If the model fabricates a document reference during streaming, you may see it briefly before Jana appends a correction. For Tier 3 models, Jana buffers the full response before display to prevent this.
- **Machine-translated guardrails are not used.** For languages where professional translations of the guardrail rules are not yet available, Jana falls back to English-only rules.

## Further Reading

- [How Jana Works](how-jana-works.md) — The full architecture and the three pillars
- [LLM Security](llm-security.md) — How Jana prevents exploitation and protects your data
- [Privacy & Data Handling](privacy.md) — PII auto-masking before data reaches cloud providers
- [Providers](providers.md) — Setting up your LLM provider and understanding model tiers
- [Language Support](language-support.md) — Supported languages and quality expectations
