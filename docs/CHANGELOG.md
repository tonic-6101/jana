# Changelog

## [0.0.1] - 2026-02-24

### Added

- Initial app scaffold
- Core DocTypes: Jana Settings, Provider, Agent, Chat Session, Chat Message, Tool, Agent Tool, Template, User Key
- LLM provider abstraction layer with unified `complete()` and `stream()` interface
  - OpenAI, Anthropic, Google, OpenRouter, Ollama, vLLM, Custom (OpenAI-compatible)
- BYOK (Bring Your Own Key) with per-user credential storage (Jana User Key)
  - 3-layer credential resolution: per-user key → system key → OAuth token
- OAuth authentication: OpenRouter OAuth + Google Gemini OAuth
- Basic chat backend: message handling, conversation management, session persistence
- Context detection: reads current DocType/document from URL, injects field values into LLM prompt
- PII auto-masking for GDPR compliance
  - 3-layer detection: Frappe field metadata + fieldname heuristics + regex patterns
  - Reversible token replacement (`[PERSON_1]`, `[EMAIL_1]`, etc.)
  - Streaming-compatible unmasking with buffer for partial tokens
  - Per-provider override (Always On / Always Off / Global Default)
  - Local provider exemption (Ollama, vLLM)
  - Zero-persistence guarantee — mapping only in memory, never on disk
- Streaming responses via NDJSON over POST
  - `fetch()` + `ReadableStream` on client
  - PII-aware per-chunk unmasking
  - Falls back to non-streaming when setting is disabled
- Tool-calling framework for Frappe REST API
  - 6 built-in tools: read_document, list_documents, create_document, update_document, run_report, navigate_to_page
  - Multi-turn tool loop (up to 5 iterations per message)
  - Permission-gated: Jana Settings capability toggles + Frappe `has_permission()`
  - PII masking on tool result messages
- Desk chat widget (floating panel on every page)
- `extend_bootinfo` hook — passes Jana config to client via `frappe.boot.jana`
- General Assistant agent with default system prompt (auto-created on install)
- Vue 3 + TypeScript frontend scaffold
- AGPL-3.0 license headers on all source files
- Public documentation (10 files)

### Added (Month 1 Hardening)

- Custom roles: Jana User and Jana Admin
  - Fixture-based role creation (synced on `bench migrate`)
  - Pre-model-sync patch ensures roles exist before DocType permissions reference them
- Role-based permissions on all 8 DocTypes
  - System Manager: full access + share
  - Jana Admin: CRUD on all DocTypes
  - Jana User: own sessions/messages/keys (if_owner), read-only agents/templates
- Permission hooks for owner-scoped access
  - `has_permission` hooks for Jana Chat Session, Chat Message, and User Key
  - `permission_query_conditions` for list view filtering
- Session lifecycle API
  - `archive_session` — archive a chat session (owner or admin)
  - `delete_session` — delete a session and cascade-delete all messages
  - `get_sessions` now supports `status` parameter (`active`, `archived`, `all`)
- Agent listing API
  - `list_agents` — returns all non-template agents
  - `get_agent` — returns agent details (system prompt restricted to admins)
- Per-user rate limiting for AI calls
  - Redis-based counter with 1-hour sliding window
  - Configurable limit in Jana Settings (`rate_limit_per_hour`, default: 60)
  - Integrated into both `send_message` and `send_message_stream` paths
- Provider health check
  - `test_connection` — admin-only endpoint to test LLM provider connectivity
  - Sends minimal completion request, measures latency
  - Returns `{success, message, latency_ms, model}`
- Scheduled maintenance jobs (daily)
  - `auto_archive_old_sessions` — archives sessions older than retention period
  - `cleanup_orphaned_messages` — deletes messages whose parent session no longer exists
  - Configurable retention in Jana Settings (`session_retention_days`, default: 90)
- Cascade cleanup and referential integrity
  - Session deletion cascades to all child messages
  - Agents cannot be deleted while active sessions reference them
  - Providers cannot be deleted while agents reference them
  - Tools cannot be deleted while agent tool records reference them
- Redis cache strategy for configuration
  - `get_jana_settings()` — cached singleton settings lookup
  - `get_cached_provider()` — cached provider document lookup
  - Automatic cache invalidation via `on_update` hooks
- PIIMasker performance: O(1) reverse mapping for token lookups (was O(n))

### Added (Knowledge Base)

- Business description field on Jana Settings — free-text description of your organisation, industry, rules, and preferences injected into every AI conversation
- Jana Knowledge Article DocType — structured articles with rich text content, category tags (general/policy/process/product/faq), and optional DocType scope for automatic context matching
- Jana Agent Knowledge child table — attach specific knowledge articles to agents
- Knowledge retrieval service with automatic deduplication and scope-based article selection
- Token budget management (default: 30,000 tokens, configurable in Jana Settings) with automatic truncation when articles exceed the budget
- HTML stripping for rich text content before LLM injection
- Updated prompt assembly order: business description → knowledge articles → agent system prompt → page context
- Knowledge content covered by existing PII masking pipeline — no additional configuration needed
