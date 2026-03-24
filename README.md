<p align="center">
  <h1 align="center">Jana</h1>
  <p align="center">AI Assistant for the Frappe Ecosystem</p>
</p>

<p align="center">
  <a href="https://www.gnu.org/licenses/agpl-3.0"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3"></a>
  <img src="https://img.shields.io/badge/version-0.1.0-green" alt="Version">
  <img src="https://img.shields.io/badge/Frappe-v16+-purple" alt="Frappe v16+">
  <img src="https://img.shields.io/badge/Python-3.10+-yellow" alt="Python 3.14+">
</p>

---

**Jana** (Arabic: جنى — "harvest" / "garden of paradise") is an AI-powered assistant that integrates directly into Frappe Desk. It provides context-aware chat, document understanding, and natural language interaction across any Frappe-based application — ERPNext, HRMS, CRM, or any custom Frappe app.

Jana is a **Frappe-level application**. It does not depend on ERPNext and works with any Frappe site.

## Key Features

- **AI Chat Widget** — Floating assistant on every Frappe Desk page
- **Context-Aware** — Automatically detects the document you're viewing and uses its data in conversation
- **BYOK (Bring Your Own Key)** — Use your own API keys from OpenAI, Anthropic, Google, OpenRouter, or run local models with Ollama/vLLM
- **Per-User Keys** — Each user can connect their own API key; the system admin can also set a shared key
- **Multiple LLM Providers** — OpenAI, Anthropic Claude, Google Gemini, OpenRouter, Ollama, vLLM, or any OpenAI-compatible endpoint
- **Streaming Responses** — Real-time token-by-token output
- **Knowledge Base** — Business description + knowledge articles injected into every conversation for company-specific AI responses
- **Agent System** — Customizable AI agents with specific system prompts, model settings, tool and knowledge configurations
- **PII Auto-Masking** — GDPR-compliant privacy layer that strips personal data before sending to cloud LLM providers
- **Persistent Chat Sessions** — Conversations persist across page navigation with full history
- **Internationalization** — All user-facing strings are translatable

## How It Works

```
User ─── Frappe Desk ─── Jana Chat Widget (Vue 3)
                              │
                              ▼
                         Frappe API
                              │
                    ┌─────────┼──────────┐
                    ▼         ▼          ▼
              PII Masker  Context    Agent Engine
                    │     Detector       │
                    ▼         │          ▼
               LLM Provider Abstraction Layer
                    │
          ┌─────────┼───────────┬──────────┐
          ▼         ▼           ▼          ▼
       OpenAI   Anthropic    Ollama    Custom
       Google   OpenRouter    vLLM    Endpoint
```

Jana reads the current page context (DocType, document name, field values), injects business knowledge and agent-specific articles, masks any personal data, assembles a prompt with the agent's system instructions, sends it to the configured LLM provider, unmasks the response, and displays it in the chat widget.

## Quick Start

### Installation

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/tonic-6101/jana.git
bench --site your-site install-app jana
```

### Setup

1. Navigate to **Jana Settings** in Frappe Desk (search bar or URL: `/app/jana-settings`)
2. Create a **Jana Provider** with your LLM credentials (e.g., OpenAI API key)
3. Set it as the **Default Provider**
4. Open any document in Frappe Desk — the Jana chat widget appears

For detailed setup instructions, see the [Getting Started Guide](docs/getting-started.md).

## Documentation

| Document | Description |
|----------|-------------|
| [How Jana Works](docs/how-jana-works.md) | What Jana does (and doesn't do) — the orchestration layer explained |
| [Getting Started](docs/getting-started.md) | Installation, first-time setup, and your first conversation |
| [User Guide](docs/user-guide.md) | How to use Jana day-to-day (for all users) |
| [Configuration](docs/configuration.md) | Jana Settings, capability toggles, and admin options |
| [Providers](docs/providers.md) | Setting up OpenAI, Anthropic, Ollama, and other LLM providers |
| [Agents](docs/agents.md) | Understanding and creating AI agents |
| [LLM Guardrails](docs/llm-guardrails.md) | How Jana prevents hallucination and keeps AI grounded in real data |
| [LLM Security](docs/llm-security.md) | How Jana protects your data and system from AI-related risks |
| [Privacy & Data Handling](docs/privacy.md) | PII auto-masking, data flow, and GDPR compliance |
| [Developer Guide](docs/developer-guide.md) | Architecture, extending Jana, and contributing |
| [API Reference](docs/api-reference.md) | All REST API endpoints |
| [Terms of Use](docs/terms-of-use.md) | Legal terms for using Jana |
| [Language Support](docs/language-support.md) | Multilingual AI response quality and supported languages |
| [FAQ](docs/faq.md) | Frequently asked questions |
| [Changelog](docs/CHANGELOG.md) | Release history |

## Requirements

- **Frappe** v15.0 or later
- **Python** 3.10 or later
- **MariaDB** (included with Frappe)
- **Node.js** 18+ (for frontend builds)
- At least one LLM provider account (OpenAI, Anthropic, etc.) or a local Ollama installation

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend | Frappe v16+, Python 3.14+ |
| Frontend | Vue 3, TypeScript, Tailwind CSS, FrappeUI |
| Database | MariaDB (via Frappe ORM) |
| AI Providers | OpenAI, Anthropic, Google Gemini, OpenRouter, Ollama, vLLM |

## Contributing

Jana is open source under the AGPL-3.0 license. Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes using conventional commits (`feat(scope): description`)
4. Push to your fork and open a Pull Request

Please read the [Developer Guide](docs/developer-guide.md) before contributing.

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

Copyright (C) 2026 Tonic

See [LICENSE](LICENSE) for the full text.
