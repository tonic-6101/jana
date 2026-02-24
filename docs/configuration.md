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

Capabilities that are disabled will not be available to any agent regardless of the agent's configuration.

### Privacy Settings

| Field | Description | Default |
|-------|-------------|---------|
| **Mask PII** | Enable automatic PII masking before sending data to LLM providers | Disabled |

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

## Boot Configuration

Jana injects its configuration into Frappe's boot process via `extend_bootinfo`. The client-side JavaScript receives:

```javascript
frappe.boot.jana = {
  enabled: true,          // Whether Jana has a working provider
  default_agent: "General Assistant",
  streaming: true,
  capabilities: { ... },  // Capability toggles
  oauth_providers: [ ... ] // Available OAuth providers
}
```

This allows the frontend widget to know whether to show itself, which capabilities are active, and whether streaming is available — all without additional API calls.
