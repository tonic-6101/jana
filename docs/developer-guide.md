# Developer Guide

This guide covers Jana's architecture, how to extend it, and how to contribute to the project.

## Architecture Overview

Jana is a **Frappe-level application** — it integrates with Frappe's core framework and is independent of ERPNext or any other Frappe app. It communicates with other Frappe apps exclusively through Frappe's APIs and hooks.

```
┌─────────────────────────────────────────────────────┐
│                    Frappe Desk                        │
│  ┌──────────────────────────────────────────────┐   │
│  │         Jana Chat Widget (Vue 3 SPA)          │   │
│  │  Injected via app_include_js on every page    │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │ Frappe API calls             │
│  ┌────────────────────▼─────────────────────────┐   │
│  │              jana.api.*                        │   │
│  │  chat.py  │  boot.py  │  providers.py         │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                              │
│  ┌────────────────────▼─────────────────────────┐   │
│  │           jana.services.*                      │   │
│  │                                                │   │
│  │  ChatService  ─── Context ─── PII Masker      │   │
│  │       │                           │            │   │
│  │       ▼                           ▼            │   │
│  │  LLM Provider Abstraction                      │   │
│  │  ┌─────────┬──────────┬─────────┐             │   │
│  │  │ OpenAI  │Anthropic │ Ollama  │             │   │
│  │  └─────────┴──────────┴─────────┘             │   │
│  └───────────────────────────────────────────────┘   │
│                                                       │
│  ┌───────────────────────────────────────────────┐   │
│  │           jana.jana.doctype.*                  │   │
│  │  Settings │ Provider │ Agent │ Session │ Msg   │   │
│  │  Tool │ Agent Tool │ User Key │ Template       │   │
│  └───────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Directory Structure

```
jana/
├── frontend/                      # Vue 3 SPA (TypeScript)
│   ├── src/
│   │   ├── pages/                 # Route-level components
│   │   │   ├── Chat.vue
│   │   │   └── Settings.vue
│   │   ├── components/            # Reusable UI components
│   │   ├── composables/           # Vue composition hooks
│   │   │   └── useTranslate.ts
│   │   ├── types/                 # TypeScript type definitions
│   │   │   └── jana.ts
│   │   ├── App.vue                # Root component
│   │   ├── router.ts              # Vue Router
│   │   ├── main.ts                # App entry point
│   │   └── index.css              # Tailwind CSS
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── jana/                          # Python backend
│   ├── hooks.py                   # Frappe hooks configuration
│   ├── install.py                 # Post-install setup
│   ├── __init__.py                # App version
│   ├── api/                       # Whitelist API endpoints
│   │   ├── chat.py                # Chat CRUD + messaging
│   │   ├── boot.py                # extend_bootinfo hook
│   │   ├── oauth.py               # OAuth token handling
│   │   └── providers.py           # Provider management
│   ├── services/                  # Business logic (no API exposure)
│   │   ├── chat.py                # ChatService orchestration
│   │   ├── context.py             # Page context detection
│   │   ├── llm/                   # LLM provider layer
│   │   │   ├── base.py            # Abstract LLMProvider
│   │   │   ├── factory.py         # Provider factory
│   │   │   ├── openai_provider.py
│   │   │   ├── anthropic_provider.py
│   │   │   └── ollama_provider.py
│   │   └── privacy/               # PII masking
│   │       ├── detector.py        # Field classification + regex
│   │       └── masker.py          # Mask/unmask engine
│   └── jana/
│       └── doctype/               # Frappe DocTypes
│           ├── jana_settings/
│           ├── jana_provider/
│           ├── jana_agent/
│           ├── jana_chat_session/
│           ├── jana_chat_message/
│           ├── jana_tool/
│           ├── jana_agent_tool/
│           ├── jana_user_key/
│           └── jana_template/
│
├── docs/                          # Public documentation
├── pyproject.toml                 # Python project config (flit)
├── VERSION                        # Canonical version
└── README.md
```

## Core Concepts

### Frappe Hooks

Jana integrates with Frappe through standard hooks defined in `hooks.py`:

| Hook | Purpose |
|------|---------|
| `app_include_js` | Loads `jana.bundle.js` on every Desk page |
| `app_include_css` | Loads `jana.bundle.css` on every Desk page |
| `extend_bootinfo` | Injects Jana config into `frappe.boot.jana` |
| `after_install` | Creates the default General Assistant agent |
| `website_route_rules` | Routes `/jana/*` to the Vue SPA |

### Service Layer

Business logic lives in `jana/services/`, not in API endpoints or DocType controllers. This keeps the code testable and reusable:

- **`ChatService`** — Orchestrates sessions, messages, and LLM calls
- **`get_page_context()`** — Fetches document data for context injection
- **`LLMProvider`** (abstract) — Provider interface with `complete()` and `stream()`
- **`PIIMasker`** — Per-request PII masking with zero persistence

### Message Flow

When a user sends a message:

```
1. API endpoint validates input (chat.py)
2. ChatService loads session and agent
3. Provider is resolved (agent override → default)
4. PIIMasker is created for this request
5. Context is fetched (get_page_context)
6. Context fields are masked (structured PII)
7. Message list is built (system prompt + context + history + user msg)
8. Free-text PII masking on user/assistant messages
9. LLM provider.complete() or provider.stream() is called
10. Response is unmasked
11. Messages are saved to Jana Chat Message
12. Session title is auto-set (first exchange)
13. Response is returned to client
```

### Credential Resolution

The `LLMProvider` base class handles credential resolution:

```
Per-user key (Jana User Key) → System key (Jana Provider.api_key)
```

For OAuth providers, the system checks for a token in Frappe's Token Cache via the Connected App.

## DocTypes

### Data Model

```
Jana Settings (Single)
    └── default_provider → Jana Provider

Jana Provider
    ├── auth_method, api_key, api_base_url
    └── mask_pii_override

Jana User Key
    ├── user → User
    └── provider → Jana Provider

Jana Agent
    ├── system_prompt, provider, model, temperature
    └── tools (child table) → Jana Agent Tool → Jana Tool

Jana Chat Session
    ├── user → User
    ├── agent → Jana Agent
    └── context_doctype, context_docname

Jana Chat Message
    ├── session → Jana Chat Session
    ├── role, content, model, tokens_used
    └── tool_calls (JSON)

Jana Tool
    └── tool_name, tool_type, method, parameters_schema

Jana Template
    └── template_name, agent_config, category, author
```

## Adding a New LLM Provider

To add support for a new LLM provider:

1. Create a new file in `jana/services/llm/` (e.g., `my_provider.py`)
2. Extend the `LLMProvider` base class:

```python
# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

from jana.services.llm.base import LLMProvider


class MyProvider(LLMProvider):
    """My custom LLM provider."""

    def complete(self, messages, model=None, temperature=0.7,
                 max_tokens=None, tools=None):
        api_key = self._get_api_key()  # Uses credential resolution chain
        # ... make API call ...
        return {
            "content": "response text",
            "model": "model-name",
            "tokens_used": 42,
        }

    def stream(self, messages, model=None, temperature=0.7,
               max_tokens=None, tools=None):
        api_key = self._get_api_key()
        # ... make streaming API call ...
        for chunk in response:
            yield {"content": chunk.text, "done": False}
        yield {"content": "", "done": True}
```

3. Register it in `jana/services/llm/factory.py`:

```python
from jana.services.llm.my_provider import MyProvider

PROVIDER_MAP = {
    # ... existing providers ...
    "my_provider": MyProvider,
}
```

4. Add the new type to the Jana Provider DocType's `provider_type` options (in the JSON definition).

## Adding a New Agent Capability

To extend what agents can do:

1. Add a capability toggle field to **Jana Settings** (e.g., `enable_my_capability`)
2. Add the field to the `capabilities` dict in `jana/api/boot.py`
3. Check the capability in the relevant service code:

```python
enabled = frappe.db.get_single_value("Jana Settings", "enable_my_capability")
if not enabled:
    frappe.throw(_("This capability is not enabled"))
```

4. Update the TypeScript types in `frontend/src/types/jana.ts`

## Frontend Development

### Stack

- **Vue 3** with Composition API (`<script setup lang="ts">`)
- **TypeScript** (mandatory for all frontend code)
- **Tailwind CSS** for styling
- **FrappeUI** for Frappe-compatible components
- **Vite** for bundling

### TypeScript Policy

All frontend code **must** use TypeScript:

- Vue components use `<script setup lang="ts">`
- Composables and utilities are `.ts` files
- Type definitions live in `src/types/jana.ts`
- Avoid `any` — use proper types

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/jana` | Redirects to `/jana/chat` | |
| `/jana/chat` | `Chat.vue` | Full-page chat interface |
| `/jana/settings` | `Settings.vue` | Settings UI |

### Building

```bash
cd frontend
npm install
npm run dev      # Development server with HMR
npm run build    # Production build → copies to jana/www/jana.html
```

### Translation

All user-facing strings must be wrapped for translation:

```vue
<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <h1>{{ __('AI Assistant') }}</h1>
</template>
```

Backend strings use Frappe's `_()` function:

```python
from frappe import _
frappe.throw(_("Session ID is required"))
```

## Testing

```bash
# Run all Jana tests
bench run-tests --app jana

# Run a specific test module
bench run-tests --app jana --module jana.tests.test_chat
```

## Code Style

### Python

- **Linter:** Ruff (configured in `pyproject.toml`)
- **Line length:** 110 characters
- **Target:** Python 3.10+
- **License header** on every file:

```python
# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic
```

### TypeScript

- **Strict mode** enabled in `tsconfig.json`
- **License header** on every file:

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic
```

### Commit Messages

Use conventional commits:

```
feat(scope): description
fix(scope): description
docs(scope): description
refactor(scope): description
```

## Key Design Decisions

1. **Frappe-level, not ERPNext-level.** Jana has no dependency on ERPNext. It works with any Frappe app.

2. **BYOK-only.** Jana is a client application — users bring their own LLM provider credentials. There is no managed API service.

3. **Provider abstraction.** Never hard-code a specific LLM provider. All providers implement the same `LLMProvider` interface.

4. **Per-request PII masking.** Masking state (token-to-value mapping) exists only in memory for the duration of one request. Nothing persists.

5. **Context injection.** The current page's document data is automatically included in every LLM call, making Jana context-aware without the user needing to copy-paste.

6. **Widget via hooks.** Jana's chat widget is injected on every Desk page via `app_include_js`, the official Frappe mechanism for app-level JavaScript.

7. **Credential chain.** Per-user keys take priority over system keys, enabling organizations to let each user pay for their own usage.
