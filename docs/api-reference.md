# API Reference

All Jana API endpoints require authentication (Frappe session). They are accessed via standard Frappe API calls.

**Base URL:** `https://your-site/api/method/`

## Chat Endpoints

### Create Session

Creates a new chat session.

**Endpoint:** `jana.api.chat.create_session`
**Method:** POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent` | string | No | Agent name (default: "General Assistant") |
| `context_doctype` | string | No | Current page DocType |
| `context_docname` | string | No | Current document name |

**Response:**

```json
{
  "session_id": "abc123def456",
  "agent": "General Assistant",
  "status": "active"
}
```

**Example:**

```javascript
frappe.call({
    method: "jana.api.chat.create_session",
    args: {
        agent: "General Assistant",
        context_doctype: "Sales Invoice",
        context_docname: "SI-00042"
    },
    callback: function(r) {
        console.log(r.message.session_id);
    }
});
```

---

### Send Message

Sends a user message and receives an AI response (non-streaming).

**Endpoint:** `jana.api.chat.send_message`
**Method:** POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_id` | string | Yes | Chat session ID |
| `content` | string | Yes | User message text |
| `context_doctype` | string | No | Current page DocType (updates session context) |
| `context_docname` | string | No | Current document name |

**Response:**

```json
{
  "content": "The outstanding amount on this Sales Invoice is $1,250.00...",
  "model": "gpt-4o-mini",
  "tokens_used": 342
}
```

**Notes:**
- If `context_doctype` and `context_docname` are provided, the session's context is updated (useful when the user navigates to a different page mid-session)
- The user message is saved before the LLM call; the assistant response is saved after
- PII masking is applied automatically if enabled
- Whitespace is trimmed from the content

---

### Send Message (Streaming)

Sends a user message and streams the AI response as NDJSON.

**Endpoint:** `jana.api.chat.send_message_stream`
**Method:** POST

**Parameters:** Same as `send_message`

**Response:** `Content-Type: application/x-ndjson`

Each line is a JSON object:

```jsonl
{"content": "The ", "done": false}
{"content": "outstanding ", "done": false}
{"content": "amount is ", "done": false}
{"content": "$1,250.00.", "done": false}
{"content": "", "done": true, "model": "gpt-4o-mini"}
```

**Error format:**

```json
{"content": "", "done": true, "error": "Streaming failed"}
```

**Notes:**
- Falls back to non-streaming (single NDJSON line with `done: true`) if streaming is disabled in Jana Settings
- PII tokens are buffered during streaming to prevent partial token rendering
- Response headers include `Cache-Control: no-cache` and `X-Accel-Buffering: no`

---

### Get Sessions

Returns the current user's chat sessions.

**Endpoint:** `jana.api.chat.get_sessions`
**Method:** GET/POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | integer | No | Max sessions to return (default: 20) |
| `status` | string | No | Filter: `active` (default), `archived`, or `all` |

**Response:**

```json
[
  {
    "name": "abc123def456",
    "session_title": "Invoice outstanding amount question",
    "agent": "General Assistant",
    "status": "active",
    "context_doctype": "Sales Invoice",
    "context_docname": "SI-00042",
    "modified": "2026-02-24 14:30:00"
  }
]
```

**Notes:**
- Only returns sessions owned by the current user
- Defaults to active sessions; pass `status: "all"` to include archived
- Ordered by most recently modified first

---

### Archive Session

Archives a chat session. Archived sessions are excluded from `get_sessions` by default.

**Endpoint:** `jana.api.chat.archive_session`
**Method:** POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_id` | string | Yes | Chat session ID |

**Response:**

```json
{
  "session_id": "abc123def456",
  "status": "archived"
}
```

**Notes:**
- Only the session owner or a Jana Admin can archive a session
- Already-archived sessions return an error

---

### Delete Session

Permanently deletes a chat session and all its messages.

**Endpoint:** `jana.api.chat.delete_session`
**Method:** POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_id` | string | Yes | Chat session ID |

**Response:**

```json
{
  "session_id": "abc123def456",
  "deleted": true
}
```

**Notes:**
- Only the session owner or a Jana Admin can delete a session
- All child messages are cascade-deleted via the `on_trash` handler
- This action is irreversible

---

### Get Session

Returns a single session with its messages.

**Endpoint:** `jana.api.chat.get_session`
**Method:** GET/POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_id` | string | Yes | Chat session ID |

**Response:**

```json
{
  "session": {
    "name": "abc123def456",
    "session_title": "Invoice question",
    "agent": "General Assistant",
    "status": "active",
    "context_doctype": "Sales Invoice",
    "context_docname": "SI-00042"
  },
  "messages": [
    {
      "name": "msg001",
      "role": "user",
      "content": "What's the outstanding amount?",
      "model": null,
      "tokens_used": 0,
      "creation": "2026-02-24 14:30:00"
    },
    {
      "name": "msg002",
      "role": "assistant",
      "content": "The outstanding amount on SI-00042 is $1,250.00...",
      "model": "gpt-4o-mini",
      "tokens_used": 342,
      "creation": "2026-02-24 14:30:02"
    }
  ]
}
```

**Notes:**
- Returns up to 50 messages per session (ordered by creation, ascending)
- Throws an error if the session belongs to a different user

## Agent Endpoints

### List Agents

Returns all non-template agents visible to the current user.

**Endpoint:** `jana.api.agents.list_agents`
**Method:** GET/POST

**Parameters:** None

**Response:**

```json
[
  {
    "name": "General Assistant",
    "agent_name": "General Assistant",
    "description": "A helpful AI assistant for Frappe Desk",
    "provider": "My OpenAI",
    "model": "gpt-4o-mini"
  }
]
```

---

### Get Agent

Returns detailed information about a specific agent.

**Endpoint:** `jana.api.agents.get_agent`
**Method:** GET/POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_name` | string | Yes | Agent name |

**Response:**

```json
{
  "name": "General Assistant",
  "agent_name": "General Assistant",
  "description": "A helpful AI assistant",
  "provider": "My OpenAI",
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": null,
  "is_template": false,
  "tools": [
    {"tool": "read_document", "enabled": true},
    {"tool": "list_documents", "enabled": true}
  ]
}
```

**Notes:**
- The `system_prompt` field is only included for Jana Admin / System Manager users
- Returns an error if the agent does not exist

## Provider Endpoints

### Get Models for Provider

Returns available models for a given provider (known defaults + user-defined).

**Endpoint:** `jana.api.providers.get_models_for_provider`
**Method:** GET/POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider_name` | string | Yes | Jana Provider name |

---

### Test Connection

Tests connectivity to an LLM provider. Admin-only.

**Endpoint:** `jana.api.providers.test_connection`
**Method:** POST

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `provider_name` | string | Yes | Jana Provider name |

**Response:**

```json
{
  "success": true,
  "message": "Connection successful",
  "latency_ms": 847,
  "model": "gpt-4o-mini"
}
```

**Notes:**
- Only Jana Admin / System Manager can use this endpoint
- Sends a minimal completion request ("Say OK", max 5 tokens) using the cheapest model for that provider type
- On failure, returns `success: false` with the error message

## Boot Hook

### extend_bootinfo

Not called directly — this hook runs automatically when any user loads Frappe Desk. It injects Jana's configuration into `frappe.boot.jana`.

**Injected Data:**

```javascript
frappe.boot.jana = {
    enabled: true,                    // Has a configured + credentialed provider
    default_agent: "General Assistant",
    streaming: true,
    capabilities: {
        chat: true,
        read_documents: true,
        draft_content: false,
        create_documents: false,
        navigate: false,
        report_queries: false,
        modify_documents: false
    },
    oauth_providers: [
        {
            name: "Google Gemini",
            provider_name: "Google Gemini",
            provider_type: "google",
            connected: false
        }
    ]
}
```

**How `enabled` is determined:**

1. Check if a **default provider** is set in Jana Settings
2. Check if that provider has a **system-level API key** or the **current user has a per-user key**
3. Check if any **OAuth provider** is connected for the current user
4. If any credential path resolves, `enabled = true`

## Error Handling

All endpoints return standard Frappe error responses:

```json
{
  "exc_type": "ValidationError",
  "exception": "frappe.exceptions.ValidationError: Session ID is required",
  "_server_messages": "[\"Session ID is required\"]"
}
```

Common errors:

| Error | Cause |
|-------|-------|
| "Session ID is required" | Missing `session_id` parameter |
| "Message content is required" | Empty or whitespace-only `content` |
| "You do not have access to this session" | Trying to access another user's session |
| "No AI provider configured" | No default provider set |
| "Provider X is disabled" | Provider exists but is not enabled |
| "Invalid API key" | LLM provider rejected the credentials |
| "Rate limit exceeded" | User exceeded the per-hour message limit (configurable in Jana Settings) |
| "LLM rate limit exceeded" | The LLM provider's own rate limit was hit |
| "Model not found" | Invalid model name for the provider |
| "Could not connect to X" | Network error reaching the LLM API |
| "Request timed out" | LLM API didn't respond in time |

## Python Usage

For server-side integrations, you can use the `ChatService` directly:

```python
from jana.services.chat import ChatService

service = ChatService()

# Create a session
session = service.create_session(
    agent_name="General Assistant",
    context_doctype="Sales Invoice",
    context_docname="SI-00042"
)

# Send a message
response = service.send_message(
    session_id=session["session_id"],
    content="What is the outstanding amount?",
    context_doctype="Sales Invoice",
    context_docname="SI-00042"
)

print(response["content"])    # "The outstanding amount is..."
print(response["model"])      # "gpt-4o-mini"
print(response["tokens_used"])  # 342

# Get messages
messages = service.get_session_messages(session["session_id"])
```

## Provider Factory

To get a provider instance for custom integrations:

```python
from jana.services.llm.factory import get_provider

# Use default provider
provider = get_provider()

# Use specific provider
provider = get_provider("My OpenAI")

# Use with specific user's credentials
provider = get_provider("My OpenAI", user="user@example.com")

# Call the LLM directly
result = provider.complete(
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    model="gpt-4o-mini",
    temperature=0.7
)
```

## Context Service

To fetch document context programmatically:

```python
from jana.services.context import get_page_context, format_context_for_prompt

# Get structured context
context = get_page_context("Sales Invoice", "SI-00042")
# Returns: {"doctype": "Sales Invoice", "docname": "SI-00042", "fields": {...}, "status": 1}

# Format for LLM prompt
text = format_context_for_prompt(context)
# Returns: "The user is currently viewing: Sales Invoice — SI-00042\n\nDocument fields:\n  Customer: ACME Corp\n  ..."
```

**Notes:**
- Returns `None` if the current user doesn't have read permission on the document
- Automatically filters out layout fields (Section Break, Column Break, etc.)
- Field labels are translated
