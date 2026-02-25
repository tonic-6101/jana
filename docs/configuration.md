# Configuration

This guide covers all the settings available to system administrators for configuring Jana.

## Jana Settings

Navigate to `/app/jana-settings` in Frappe Desk. This is a Single DocType — one configuration for the entire site.

### Core Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Default Provider** | The LLM provider used when an agent doesn't specify one | (none — must be set) |
| **Default Model** | The model used when not overridden by an agent | (provider default) |
| **Enable Streaming** | Stream responses token-by-token instead of waiting for the full reply | Enabled |
| **Enable Tool Calling** | Allow agents to call tools (read docs, create docs, run reports, etc.) | Enabled |

### Capability Toggles

Each capability can be individually enabled or disabled. These are site-wide settings.

| Capability | Description | Default |
|-----------|-------------|---------|
| **Enable Chat** | Allow AI conversations | Enabled |
| **Enable Read Documents** | Allow Jana to read the current document's data | Enabled |
| **Enable Draft Content** | Allow Jana to draft text (emails, descriptions) | Disabled |
| **Enable Create Documents** | Allow Jana to propose creating new documents | Disabled |
| **Enable Navigate** | Allow Jana to suggest page navigation | Disabled |
| **Enable Report Queries** | Allow Jana to query reports | Disabled |
| **Enable Modify Documents** | Allow Jana to propose modifications to existing documents | Disabled |
| **Require Write Confirmation** | When enabled, create and update actions show a preview and require user approval before executing. Only visible when Create or Modify Documents is enabled. | Enabled |

Capabilities that are disabled will not be available to any agent regardless of the agent's configuration.

When **Require Write Confirmation** is enabled, the AI presents a preview of the proposed changes and asks the user to confirm before executing. This uses a server-side cache (5-minute TTL) and a dedicated `confirm_write` tool. The entire confirmation flow happens naturally in conversation — no separate UI is needed.

### Limits

| Field | Description | Default |
|-------|-------------|---------|
| **Rate Limit (per hour)** | Maximum AI messages a user can send per hour. Set to 0 to disable. | 60 |
| **Session Retention (days)** | Automatically archive chat sessions older than this many days. Set to 0 to keep forever. | 90 |

Rate limiting uses a Redis-based per-user counter with a 1-hour sliding window. The daily scheduler job `auto_archive_old_sessions` handles session retention.

### Knowledge

| Field | Description | Default |
|-------|-------------|---------|
| **Business Description** | Describe your business, industry, rules, and preferences. This context is included in every AI conversation. | (empty) |
| **Knowledge Token Budget** | Maximum number of tokens allocated for knowledge articles in the system prompt. Articles exceeding this budget are truncated. | 30,000 |

The business description is a global setting that applies to all agents. Write it in natural language — for example:

> "We are ABC Trading, a wholesale distributor in Riyadh. We use FIFO inventory valuation and SAR currency. Our approval thresholds: Manager up to 50,000 SAR, Director above 50,000 SAR."

This transforms generic AI responses into answers grounded in your business context.

Knowledge articles are managed separately via the **Jana Knowledge Article** DocType. See [Agents](agents.md) for how to attach articles to agents.

### Privacy Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Mask PII** | Enable automatic PII masking before sending data to LLM providers | Enabled |

See [Privacy & Data Handling](privacy.md) for detailed information.

## Jana Provider

Each LLM provider you want to use needs a Jana Provider record. Navigate to `/app/jana-provider` to manage them.

### Provider Fields

| Field | Description |
|-------|-------------|
| **Provider Name** | A display name (e.g., "My OpenAI Account") |
| **Provider Type** | The provider backend: `openai`, `anthropic`, `google`, `openrouter`, `ollama`, `vllm`, `custom` |
| **Auth Method** | How to authenticate: `API Key` or `OAuth` |
| **API Key** | Your API key (stored encrypted in the database) |
| **API Base URL** | Custom endpoint URL (required for Ollama, vLLM, and custom providers) |
| **Available Models** | Comma-separated list of model names available on this provider |
| **Connected App** | Link to a Frappe Connected App for OAuth providers |
| **Enabled** | Whether this provider is active |
| **Mask PII Override** | Per-provider PII masking: `Global Default`, `Always On`, or `Always Off` |

### Setting Up Multiple Providers

You can configure as many providers as needed. For example:

- **OpenAI** for general use (fast, cost-effective)
- **Anthropic** for complex reasoning tasks
- **Ollama** for sensitive data that must stay on-premise

Each agent can optionally specify which provider and model to use. If not specified, the default from Jana Settings is used.

## Jana User Key

Per-user API keys allow individual users to bring their own credentials. Navigate to `/app/jana-user-key`.

### Fields

| Field | Description |
|-------|-------------|
| **User** | The Frappe user this key belongs to |
| **Provider** | Which Jana Provider this key is for |
| **API Key** | The user's personal API key (stored encrypted) |
| **Enabled** | Whether this key is active |

### Credential Resolution Order

When Jana needs an API key, it checks in this order:

1. **Per-user key** — Jana User Key for the current user + provider
2. **System key** — API key on the Jana Provider document

If a per-user key exists and is enabled, it takes priority over the system key. This allows organizations to let users pay for their own LLM usage.

## Capability Defaults

When Jana is first installed, capabilities are set conservatively:

- **Chat** and **Read Documents** are enabled (safe, read-only operations)
- All write-related capabilities (**Draft**, **Create**, **Modify**) start disabled
- The administrator explicitly enables capabilities as needed

This ensures Jana starts in a safe, read-only mode and only gains write capabilities when the admin decides.

## Terms Acceptance

When a user opens Jana for the first time, they are asked to accept the [Terms of Use](terms-of-use.md) before proceeding. This is a one-time action stored permanently in the database.

- Acceptance is per-user and per-terms-version
- When terms are updated (new version), users are asked to re-accept
- Administrators can view all acceptance records at `/app/jana-terms-acceptance`
- The boot configuration includes `terms_accepted` and `terms_version` fields

## Boot Configuration

Jana injects its configuration into Frappe's boot process via `extend_bootinfo`. The client-side JavaScript receives:

```javascript
frappe.boot.jana = {
  enabled: true,          // Whether Jana has a working provider
  default_agent: "General Assistant",
  streaming: true,
  terms_accepted: true,   // Whether user accepted current terms
  terms_version: "1.0",   // Current terms version
  capabilities: { ... },  // Capability toggles
  oauth_providers: [ ... ] // Available OAuth providers
}
```

This allows the frontend widget to know whether to show itself, which capabilities are active, whether terms are accepted, and whether streaming is available — all without additional API calls.

## Roles

Jana uses two custom roles for access control:

| Role | Purpose |
|------|---------|
| **Jana Admin** | Full CRUD access to all Jana DocTypes. Can test provider connections, view agent system prompts, archive/delete any session. |
| **Jana User** | Can create and manage own chat sessions and messages. Read-only access to agents and templates. Cannot see other users' sessions. |

Both roles are created automatically during installation and on `bench migrate`. System Manager has full access to all Jana DocTypes by default.

### Owner-Scoped Access

The following DocTypes enforce owner-scoped access for Jana User:

- **Jana Chat Session** — users can only see/edit sessions where `user` matches their account
- **Jana Chat Message** — users can only see messages belonging to their own sessions
- **Jana User Key** — users can only see/edit their own API keys

Jana Admin and System Manager can access all records regardless of ownership.
