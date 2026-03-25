# Jana

**AI Assistant for Frappe Framework**

[![Version](https://img.shields.io/badge/version-0.1.1-blue.svg)](https://github.com/tonic-6101/jana/releases)
[![Frappe](https://img.shields.io/badge/frappe-v16+-green.svg)](https://frappeframework.com)
[![License](https://img.shields.io/badge/license-AGPL--3.0-orange.svg)](LICENSE)

<p align="center">
  <img src=".github/jana-icon.svg" alt="Jana" width="128">
</p>

Jana is an AI-powered assistant built on the [Frappe Framework](https://frappeframework.com). Designed for teams who want context-aware AI without leaving their Frappe ecosystem, Jana provides chat, document understanding, and natural language interaction across any Frappe-based application — with support for multiple LLM providers and GDPR-compliant privacy.

---

## Features

### AI Chat Widget

A floating assistant available on every Frappe Desk page — ask questions, get explanations, and interact with your data in natural language.

- Floating chat widget accessible from any page
- Real-time streaming responses (token-by-token output)
- Persistent chat sessions across page navigation
- Full conversation history

### Context Awareness

Jana automatically detects the document you're viewing and uses its data in conversation — no copy-pasting required.

- Automatic DocType and document detection
- Field values injected into conversation context
- Grounded responses based on real document data
- LLM guardrails to prevent hallucination

### Multi-Provider Support (BYOK)

Bring Your Own Key — use your preferred LLM provider. Each user can connect their own API key, or the system admin can set a shared key.

- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- OpenRouter
- Ollama (local models)
- vLLM (self-hosted)
- Any OpenAI-compatible endpoint

### Customizable Agents

Create AI agents tailored to specific roles with custom system prompts, model settings, and tool configurations.

- Define agents with specific personas and instructions
- Assign tools and knowledge articles per agent
- Configure model and temperature per agent
- Switch between agents in chat

### Knowledge Base

Inject business-specific knowledge into every conversation so Jana understands your company, processes, and terminology.

- Business description injected into all conversations
- Knowledge articles for domain-specific context
- Per-agent knowledge assignments
- Company-specific AI responses

### Content Generator

Generate structured content — emails, summaries, reports — using AI with your business context.

- Template-driven content generation
- Business-aware output
- Reusable prompt templates

### PII Auto-Masking

GDPR-compliant privacy layer that strips personal data before sending to cloud LLM providers and unmasks it in the response.

- Automatic detection and masking of personal data
- Data never leaves your server in identifiable form
- Unmasking on response for seamless user experience
- Configurable masking rules

### Persistent Chat Sessions

Conversations are saved and accessible across page navigation — pick up where you left off.

- Session history per user and document
- Resume conversations after navigating away
- Search and browse past sessions

### Internationalization

All user-facing strings are translatable — use Jana in your language.

- Translatable UI strings
- Multilingual AI response support depending on provider

### Dock Integration

When [Dock](https://github.com/tonic-6101/dock) is installed, Jana integrates into the ecosystem navigation and panel system.

- App registered in the Dock app switcher
- Jana panel accessible from the Dock navbar
- Settings accessible from Dock settings panel
- Notification types registered in Dock

### App Integrations

Other ecosystem apps can expose tools to Jana for AI-powered insights — property data from Home, project summaries from Orga, and more.

- Tool-based integration system
- Apps register Jana tools via hooks
- No hard dependency — tools available only when apps are installed

---

## Installation

### Prerequisites

- Frappe Framework v16 or higher
- Python 3.14+
- Node.js 24+
- MariaDB 10.6+
- At least one LLM provider account (OpenAI, Anthropic, etc.) or a local Ollama installation

### Install via Bench

```bash
# Get the app
bench get-app jana https://github.com/tonic-6101/jana.git

# Install on your site
bench --site your-site.localhost install-app jana

# Run migrations
bench --site your-site.localhost migrate

# Build assets
bench build --app jana
```

### Access the Application

After installation, access Jana at: `https://your-site.localhost/jana`

---

## Quick Start

1. **Configure a Provider**: Go to Jana Settings and create a provider with your LLM credentials
2. **Set as Default**: Mark the provider as default
3. **Open Any Document**: Navigate to any document in Frappe Desk
4. **Start Chatting**: Click the Jana widget and ask a question about the document
5. **Explore Agents**: Create custom agents for specific workflows

---

## Documentation

| Document | Description |
|----------|-------------|
| [How Jana Works](docs/how-jana-works.md) | The orchestration layer explained |
| [Getting Started](docs/getting-started.md) | Installation and first-time setup |
| [User Guide](docs/user-guide.md) | Day-to-day usage |
| [Configuration](docs/configuration.md) | Settings and capability toggles |
| [Providers](docs/providers.md) | LLM provider setup |
| [Agents](docs/agents.md) | Creating and managing AI agents |
| [LLM Guardrails](docs/llm-guardrails.md) | How Jana prevents hallucination |
| [LLM Security](docs/llm-security.md) | Data protection and AI security |
| [Privacy & Data Handling](docs/privacy.md) | PII masking and GDPR compliance |
| [Developer Guide](docs/developer-guide.md) | Architecture and contributing |
| [API Reference](docs/api-reference.md) | REST API endpoints |
| [Changelog](docs/CHANGELOG.md) | Release history |

---

## Technology Stack

- **Backend**: Frappe Framework, Python 3.14+
- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **UI Components**: FrappeUI
- **Database**: MariaDB
- **AI Providers**: OpenAI, Anthropic, Google Gemini, OpenRouter, Ollama, vLLM
- **Build**: Vite

---

## Contributing

Contributions are welcome! This project uses `pre-commit` for code formatting and linting:

```bash
cd apps/jana
pre-commit install
```

Pre-commit runs the following tools automatically:

- **ruff** — Python linting and formatting
- **eslint** — TypeScript/JavaScript linting
- **prettier** — Code formatting
- **pyupgrade** — Python syntax modernization

---

## Support

- **Issues**: [GitHub Issues](https://github.com/tonic-6101/jana/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tonic-6101/jana/discussions)

---

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

See [LICENSE](LICENSE) for details.

```
SPDX-License-Identifier: AGPL-3.0-or-later
Copyright (C) 2024-2026 Tonic
```

---

## Acknowledgments

Built with [Frappe Framework](https://frappeframework.com) and [FrappeUI](https://github.com/frappe/frappe-ui).
