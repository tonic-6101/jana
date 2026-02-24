# Agents

Agents are the "brains" inside Jana. Each agent has its own personality, instructions, model configuration, and tool access. Jana is the platform; agents are the specialized configurations that determine how it behaves.

## What Is an Agent?

An agent is a combination of:

- **System Prompt** — Instructions that tell the AI how to behave, what it knows, and what it should focus on
- **Provider** (optional) — Which LLM provider to use (overrides the default)
- **Model** (optional) — Which specific model to use (overrides the default)
- **Temperature** — How creative vs. deterministic the responses are (0.0 = precise, 1.0 = creative)
- **Max Tokens** — Maximum length of the AI response
- **Tools** — Which tools the agent can use (via Jana Agent Tool child table)

## The General Assistant

When you install Jana, it creates a **General Assistant** agent automatically. This is the default agent used for all conversations unless you specify a different one.

The General Assistant:

- Understands Frappe concepts (DocTypes, permissions, workflows, Print Formats)
- Reads and summarizes document data
- Answers questions about field values and relationships
- Helps interpret business data (totals, statuses, timelines)
- Drafts content based on document context
- Clearly communicates what it can and cannot do

## Creating an Agent

1. Navigate to `/app/jana-agent/new`
2. Fill in the fields:

| Field | Required | Description |
|-------|----------|-------------|
| **Agent Name** | Yes | Unique identifier (e.g., "Invoice Specialist") |
| **System Prompt** | Yes | Instructions for the AI (see below) |
| **Description** | No | Human-readable description |
| **Provider** | No | Override the default provider |
| **Model** | No | Override the default model |
| **Temperature** | No | Creativity level (default: 0.7) |
| **Max Tokens** | No | Response length limit |
| **Is Template** | No | Whether this agent can be shared as a template |

3. Save

### Writing a Good System Prompt

The system prompt is the most important part of an agent. It tells the AI:

- **Who it is** — its role and expertise
- **What it should focus on** — the domain, task type, or workflow
- **How to respond** — tone, format, level of detail
- **What it should avoid** — off-topic responses, unsafe actions

**Example: Accounting Assistant**

```
You are an accounting specialist embedded in Frappe Desk. You help users
understand financial documents, interpret accounting data, and answer
questions about invoices, payments, journal entries, and financial reports.

When viewing a Sales Invoice, focus on: outstanding amount, payment status,
due date, tax breakdowns, and item-level details.

When viewing a Payment Entry, explain: which invoices are being paid,
the payment method, and the reconciliation status.

Be precise with numbers. Always reference specific field values from the
document. If you calculate something, show your work.
```

**Example: HR Helper**

```
You are an HR assistant for Frappe HRMS. You help employees and HR managers
understand HR documents, leave policies, attendance records, and payroll data.

Be empathetic and clear when discussing sensitive topics like leave balances
or salary details. Always remind users that payroll calculations should be
verified with HR.
```

### Tips for System Prompts

- Be specific about the domain — "accounting" not "business"
- Tell the agent what document types it will encounter
- Specify the response format you want (lists, tables, paragraphs)
- Include guardrails ("do not make up data", "admit uncertainty")
- Keep it concise — long prompts use tokens on every message

## Agent Configuration

### Temperature

| Value | Behavior | Use Case |
|-------|---------|----------|
| 0.0–0.3 | Precise, deterministic | Data analysis, calculations |
| 0.4–0.7 | Balanced | General use (default: 0.7) |
| 0.8–1.0 | Creative, varied | Drafting, brainstorming |

### Provider Override

If you want a specific agent to use a different provider:

- Set the **Provider** field to a Jana Provider record
- The agent will use this provider instead of the site default
- Useful for routing complex tasks to a more capable model

### Model Override

Similarly, you can override the model:

- Set the **Model** field to a specific model name (e.g., `gpt-4o` instead of `gpt-4o-mini`)
- The agent will use this model regardless of the default

## Agent Selection

### Default Behavior

If no agent is specified when creating a chat session, Jana uses the **General Assistant**.

### Per-Session Selection

When creating a session via the API, you can specify which agent to use:

```python
# Python (server-side)
from jana.services.chat import ChatService
service = ChatService()
session = service.create_session(agent_name="Invoice Specialist")
```

```javascript
// JavaScript (client-side)
frappe.call({
    method: "jana.api.chat.create_session",
    args: { agent: "Invoice Specialist" }
});
```

## Agent Templates

Agents can be marked as **templates** (`is_template = True`). Templates are agent configurations that can be shared, installed, and reused.

### Template Fields

| Field | Description |
|-------|-------------|
| **Template Name** | Display name for the marketplace |
| **Description** | What this template does |
| **Agent Config** | The full agent configuration (system prompt, model settings) |
| **Category** | Domain: general, accounting, crm, hr, buying |
| **Author** | Who created the template |
| **Published** | Whether it's publicly visible |

## How Agents Interact with Context

When a user sends a message, the agent receives:

1. **System prompt** — The agent's instructions
2. **Page context** — The current document's DocType, name, and field values (injected automatically)
3. **Chat history** — Previous messages in the session
4. **User message** — The current question

The page context is appended to the system prompt, so the agent always knows what the user is looking at without needing to ask.
