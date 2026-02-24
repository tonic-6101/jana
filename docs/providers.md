# LLM Providers

Jana supports multiple LLM providers through a unified abstraction layer. You can use cloud APIs, local models, or any OpenAI-compatible endpoint.

## Supported Providers

| Provider | Type | Auth | Default Model | Streaming | Notes |
|----------|------|------|---------------|-----------|-------|
| **OpenAI** | `openai` | API Key | `gpt-4o-mini` | Yes | GPT-4o, GPT-4o-mini, GPT-3.5, etc. |
| **Anthropic** | `anthropic` | API Key | `claude-sonnet-4-20250514` | Yes | Claude Opus, Sonnet, Haiku |
| **Google Gemini** | `google` | API Key or OAuth | (varies) | Yes | Via OpenAI-compatible API |
| **OpenRouter** | `openrouter` | API Key | (varies) | Yes | Unified access to 100+ models |
| **Ollama** | `ollama` | None | `llama3.2` | Yes | Local models, no API key needed |
| **vLLM** | `vllm` | None/API Key | (varies) | Yes | Self-hosted inference server |
| **Custom** | `custom` | API Key | (varies) | Yes | Any OpenAI-compatible endpoint |

## OpenAI

The most widely used cloud LLM provider.

### Setup

1. Get an API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Create a Jana Provider:
   - **Provider Type**: `openai`
   - **API Key**: Your `sk-...` key
3. Set as default in Jana Settings

### Recommended Models

| Model | Best For | Cost |
|-------|---------|------|
| `gpt-4o-mini` | General use, fast and affordable | Low |
| `gpt-4o` | Complex reasoning, detailed analysis | Medium |
| `gpt-4-turbo` | Long context, document analysis | Medium |

## Anthropic (Claude)

Known for strong reasoning and careful, nuanced responses.

### Setup

1. Get an API key from [console.anthropic.com](https://console.anthropic.com/)
2. Create a Jana Provider:
   - **Provider Type**: `anthropic`
   - **API Key**: Your `sk-ant-...` key
3. Set as default in Jana Settings

### Recommended Models

| Model | Best For | Cost |
|-------|---------|------|
| `claude-sonnet-4-20250514` | General use, balanced quality and speed | Medium |
| `claude-haiku-4-5-20251001` | Fast responses, cost-effective | Low |

### Technical Notes

- Anthropic uses a different API format. Jana automatically handles the conversion (system prompt as top-level parameter, tool format conversion).
- Token usage is calculated as `input_tokens + output_tokens`.

## Google Gemini

Google's multimodal LLM family.

### Setup (API Key)

1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Create a Jana Provider:
   - **Provider Type**: `google`
   - **Auth Method**: `API Key`
   - **API Key**: Your Google AI API key
   - **API Base URL**: `https://generativelanguage.googleapis.com/v1beta/openai`

### Setup (OAuth)

1. Configure a Frappe **Connected App** for Google OAuth
2. Create a Jana Provider:
   - **Provider Type**: `google`
   - **Auth Method**: `OAuth`
   - **Connected App**: Link to your Connected App
3. Users authenticate individually via the OAuth flow

## OpenRouter

A unified API that provides access to models from many providers (OpenAI, Anthropic, Meta, Mistral, and more) through a single API key.

### Setup

1. Get an API key from [openrouter.ai](https://openrouter.ai/)
2. Create a Jana Provider:
   - **Provider Type**: `openrouter`
   - **API Key**: Your OpenRouter key
3. Set the model to any model available on OpenRouter (e.g., `openai/gpt-4o-mini`, `anthropic/claude-sonnet-4-20250514`)

### Why Use OpenRouter

- Access models from many providers with one API key
- Compare model performance without multiple accounts
- Unified billing across providers

### Technical Notes

Jana automatically sends `HTTP-Referer` (your site URL) and `X-Title: Jana AI` headers with OpenRouter requests, as required by their API.

## Ollama (Local Models)

Run LLM models locally on your own hardware. No data leaves your network.

### Setup

1. Install Ollama: [ollama.ai](https://ollama.ai)
2. Pull a model:
   ```bash
   ollama pull llama3.2
   # or for a smaller model:
   ollama pull phi3
   ```
3. Start Ollama: `ollama serve`
4. Create a Jana Provider:
   - **Provider Type**: `ollama`
   - **API Base URL**: `http://localhost:11434` (default)
   - **Enabled**: Yes
   - No API key needed

### Recommended Models

| Model | Size | Best For |
|-------|------|---------|
| `llama3.2` | 3B/8B | General use, good balance |
| `mistral` | 7B | Fast, efficient |
| `phi3` | 3.8B | Lightweight, quick responses |
| `codellama` | 7B+ | Code-related queries |

### Docker Considerations

If your Frappe site runs inside Docker (e.g., Frappe Manager), Ollama running on the host machine is **not reachable at `localhost`** from inside the container. Use the host machine's IP address or Docker's `host.docker.internal` (on macOS/Windows) instead.

### PII Masking

By default, PII masking is **disabled for Ollama** providers since data stays on your local network. You can override this per-provider if needed.

## vLLM

A high-performance inference server for self-hosted models.

### Setup

1. Start a vLLM server with your model
2. Create a Jana Provider:
   - **Provider Type**: `vllm`
   - **API Base URL**: Your vLLM server URL (e.g., `http://your-server:8000/v1`)
   - **API Key**: If required by your vLLM setup
3. Set the model name to match the model loaded in vLLM

vLLM serves an OpenAI-compatible API, so Jana uses the OpenAI provider class internally.

## Custom Endpoints

Any API endpoint that is compatible with the OpenAI Chat Completions format can be used.

### Setup

1. Create a Jana Provider:
   - **Provider Type**: `custom`
   - **API Base URL**: Your endpoint (e.g., `https://my-llm-proxy.example.com/v1`)
   - **API Key**: As required by your endpoint

This covers Azure OpenAI, LiteLLM proxies, and other OpenAI-compatible services.

## Provider Architecture

All providers implement the same abstract interface:

```
LLMProvider (base)
├── OpenAIProvider      ← openai, google, openrouter, vllm, custom
├── AnthropicProvider   ← anthropic
└── OllamaProvider      ← ollama
```

The `OpenAIProvider` class handles all OpenAI-compatible APIs. The `AnthropicProvider` handles Anthropic's unique API format. The `OllamaProvider` handles Ollama's native API.

## Credential Security

- API keys are stored in Frappe's database using **encrypted Password fields**
- Keys are decrypted only when making API calls — never exposed in API responses or logs
- Per-user keys (Jana User Key) are similarly encrypted
- OAuth tokens are managed by Frappe's Connected App infrastructure

## Timeouts

| Provider | Timeout |
|----------|---------|
| Cloud APIs (OpenAI, Anthropic, OpenRouter) | 120 seconds |
| Local models (Ollama) | 300 seconds (models may need to load) |
| vLLM | 120 seconds |

If a request times out, Jana returns an error message. Large models or first-time Ollama requests (which trigger model loading) may take longer.
