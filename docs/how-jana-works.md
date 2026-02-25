# How Jana Works

Jana is not an AI. Jana does not generate responses. Jana does not train models, host inference servers, or run predictions.

**Jana is the orchestration layer between your Frappe environment and your chosen LLM.** You bring the model. Jana makes it stable, secure, and useful for business.

## The Architecture

```
Without Jana:
  You → LLM → response (unvalidated, ungrounded, no Frappe awareness)

With Jana:
  You → Jana → LLM → Jana → response
         ↑                    ↑
    context injection    validation, sanitisation,
    tool routing         permission checks,
    guardrail rules      grounding verification
```

When you send a message through Jana, here is what actually happens:

1. **You type a message** in the Jana chat widget on a Frappe Desk page.
2. **Jana validates the message** — checks length limits, rate limits, detects your language.
3. **Jana builds context** — loads the AI agent's system prompt, injects your business description and knowledge articles, adds data from the Frappe document you're currently viewing, appends anti-hallucination and security rules, adds language instructions if you're not using English.
4. **Jana routes to your model** — sends the assembled prompt to the LLM provider you configured (OpenAI, Anthropic, Ollama, etc.) using your API key.
5. **Your model generates a response** — this is the only step Jana does not control.
6. **Jana validates the response** — checks for fabricated document references, sanitises HTML to prevent injection, verifies tool call parameters against your actual Frappe DocTypes and field schemas, normalises locale-specific date and number formats.
7. **If the model requested a tool call** (read a document, create a record, run a report), Jana validates your Frappe permissions, confirms the DocType exists, asks for your approval on write operations, executes the tool in your user context, and annotates the result with source metadata.
8. **Jana delivers the response** — sanitised, validated, and grounded in your actual data.

Steps 1-3 and 6-8 are Jana's work. Step 5 is the model's work. The quality of step 5 depends on the model you chose. The reliability of everything else depends on Jana.

## What You Bring vs. What Jana Provides

| You Bring | Jana Provides |
|-----------|--------------|
| Your LLM provider account and API key | Orchestration logic that connects your model to your Frappe data |
| Your model choice (GPT-4o, Claude, Llama, etc.) | Guardrails that keep the model grounded in real data |
| Your data in Frappe | Context injection that gives the model awareness of your documents |
| Your budget and cost tolerance | Token usage logging for visibility (not billing management) |
| Your privacy preferences (cloud vs. local) | PII masking for cloud providers, auto-exemption for local |

## BYOK: Bring Your Own Key

Jana uses a BYOK (Bring Your Own Key) model. This is not just a pricing strategy — it is fundamental to how Jana works.

**You control cost.** You pick your provider, your model tier, your spending limits. Jana logs token usage so you can see what's happening, but does not manage your provider billing.

**You control privacy.** You choose whether your data goes to OpenAI's cloud, Anthropic's cloud, Google's cloud, or stays on your own machine via Ollama. Jana's [PII masking layer](privacy.md) adds protection for cloud providers, but the data handling decision is yours.

**You control quality.** A stronger model produces better results. If you use GPT-4o or Claude Opus, you get high-quality responses with reliable tool calling. If you use a small local model, responses may be less accurate — Jana compensates with stricter guardrails, but cannot make a weak model smarter.

**Jana is model-agnostic.** The same guardrails, tools, security controls, and language support work regardless of which provider or model you choose.

## The Three Pillars

### 1. Stability — Keeping the Model Truthful

LLMs hallucinate. They can fabricate document IDs, invent statuses, and claim actions were completed when they weren't. This is a fundamental property of how language models work, not a bug in any specific model.

Jana cannot stop a model from hallucinating. What Jana does:

- Grounds the model in your actual Frappe data by injecting real DocTypes, documents, and field values into context
- Requires the model to call a tool before claiming any data (no fabricating document names or amounts)
- Validates after the response that every document reference came from an actual tool result
- Detects conversation drift — over long chats, models gradually shift from grounded to fabricated; Jana monitors this
- Applies stricter guardrails for weaker models — local/small models get maximum constraints

**Full details:** [LLM Guardrails](llm-guardrails.md)

### 2. Security — Preventing the Model from Causing Harm

Every response from your model is treated as untrusted input — the same way a web application treats a form submission. Jana validates and sanitises before anything reaches your browser or your database.

- HTML and JavaScript are stripped from responses before rendering
- Tool call parameters are validated against your actual Frappe schemas before execution
- Navigation URLs are restricted to your own site (no external redirects)
- Every tool call runs in your Frappe permission context — Jana never escalates to Administrator
- Write operations (create, update, delete) always require your explicit confirmation
- Rate limits and length limits prevent abuse

**Full details:** [LLM Security](llm-security.md)

### 3. Control — Giving You Power Over the Model's Behaviour

Raw LLM APIs give you one lever: the prompt. Jana gives you a full control surface:

- **Agents** — define what the model can do (tools), what it knows (knowledge articles), how it behaves (system prompt, temperature), and which model to use
- **Tools** — the model can only interact with Frappe through Jana's declared tools, each with explicit permission requirements
- **Provider tiers** — different models get different guardrail levels based on their capabilities
- **Language resilience** — for non-English users, Jana injects language-specific instructions so the model responds in your language with appropriate formality
- **Capability detection** — Jana checks what your model supports (tool calling, structured output, streaming) and degrades gracefully when features are missing

## Understanding Response Quality

When you get a great answer, your model produced it. When you get a wrong answer, your model produced that too. Jana's role is to:

- Give the model the best possible context to work with
- Catch and flag fabrications after the fact
- Prevent harmful or malicious output from reaching you
- Show you transparently which model is responding

The chat widget always shows:

- **Which model is responding** — the model name and provider are displayed, not hidden
- **The model tier** — indicating the expected capability level
- **That responses are AI-generated** — by the model you configured, not by Jana

If you're unsatisfied with response quality, the first thing to try is a stronger model. Jana's guardrails reduce errors, but they cannot add intelligence that the model doesn't have.

## Further Reading

- [LLM Guardrails](llm-guardrails.md) — How Jana prevents hallucination and enforces truthfulness
- [LLM Security](llm-security.md) — How Jana prevents exploitation and protects your data
- [Privacy & Data Handling](privacy.md) — PII auto-masking and data flow
- [Providers](providers.md) — Setting up your LLM provider
- [Agents](agents.md) — Configuring AI agents
- [Language Support](language-support.md) — Multilingual response quality
