# Frequently Asked Questions

## General

### What is Jana?

Jana is an AI assistant application for the Frappe framework. It adds a context-aware chat widget to Frappe Desk that can read and discuss the documents you're viewing, answer questions about your data, and help you work more efficiently.

### Does Jana require ERPNext?

No. Jana is a **Frappe-level** application. It works with any Frappe site — ERPNext, HRMS, CRM, or any custom Frappe app. It does not depend on ERPNext.

### What does "Jana" mean?

Jana (جنى) is an Arabic word meaning "harvest" or "garden of paradise" — an AI that helps you reap value from your business data.

### Is Jana free?

Yes. Jana Community Edition is free and open source under the AGPL-3.0 license.

## Setup & Installation

### How do I install Jana?

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/tonic-6101/jana.git
bench --site your-site install-app jana
```

See [Getting Started](getting-started.md) for the full walkthrough.

### Do I need an OpenAI account?

You need at least one LLM provider, but it doesn't have to be OpenAI. Jana supports:

- **OpenAI** (GPT-4o, GPT-4o-mini)
- **Anthropic** (Claude)
- **Google** (Gemini)
- **OpenRouter** (access to 100+ models with one key)
- **Ollama** (free, local, no account needed)
- **vLLM** (self-hosted)
- Any **OpenAI-compatible** endpoint

If you want to avoid cloud services entirely, use [Ollama](https://ollama.ai) to run models locally.

### Can I use Jana without sending data to the cloud?

Yes. Set up an **Ollama** or **vLLM** provider. Your data stays entirely on your network. No external API calls are made.

### How do I use my own API key?

1. Create a **Jana Provider** with your key in the provider settings
2. Or create a **Jana User Key** to set a per-user key

See [Configuration](configuration.md) for details.

## Usage

### How does Jana know what I'm looking at?

When you open a document in Frappe Desk, Jana detects the **DocType** and **document name** from the page URL. It then fetches the document's field values (respecting your permissions) and includes them in the AI prompt.

This happens automatically — you don't need to copy-paste or explain what you're viewing.

### Can Jana see documents I don't have access to?

No. Jana respects Frappe's permission system. It can only read documents that the current user has read permission for. If you don't have access, Jana won't include that data in the conversation.

### Do my conversations persist?

Yes. Chat sessions and messages are stored in the database. You can close the browser, come back later, and your conversation history is still there.

### Can other users see my conversations?

No. Chat sessions are private. Each session is owned by the user who created it, and the API enforces ownership checks.

### Can Jana modify my documents?

Not by default. Write capabilities (Create, Modify) are disabled when Jana is installed. An administrator must explicitly enable them in Jana Settings. Even when enabled, Jana will ask for confirmation before performing any write action.

### What languages does Jana support?

Jana's interface is internationalized and can be translated into any language Frappe supports. The AI responses depend on the LLM model — most major providers support English and many other languages natively.

## Privacy & Security

### Does Jana send my data to OpenAI/Anthropic?

When you use a cloud provider (OpenAI, Anthropic, etc.), your messages and document context are sent to that provider's API. This is how the AI generates responses.

To mitigate this:
- **Enable PII masking** to strip personal data before sending
- **Use local models** (Ollama/vLLM) to keep all data on your network
- Review your LLM provider's data handling policies

### What is PII masking?

PII (Personally Identifiable Information) masking automatically replaces personal data — names, emails, phone numbers — with anonymous tokens before sending to the LLM. The real values are restored in the response before you see it.

See [Privacy & Data Handling](privacy.md) for full details.

### Are API keys stored securely?

Yes. API keys are stored in Frappe's database using encrypted **Password** fields. They are decrypted only when making API calls and are never exposed in API responses, logs, or the browser.

### Does Jana comply with GDPR?

Jana provides tools to help with GDPR compliance (PII masking, local model support, per-user credential control), but compliance depends on your overall setup and usage. Consult with your data protection officer or legal team for your specific situation.

## Technical

### Which Frappe version is required?

Frappe v15.0 or later.

### Which Python version is required?

Python 3.10 or later.

### Can I add support for a new LLM provider?

Yes. Create a class that extends `LLMProvider` and implement `complete()` and `stream()`. Register it in the provider factory. See the [Developer Guide](developer-guide.md) for details.

### How does streaming work?

When streaming is enabled, Jana returns an NDJSON response (one JSON object per line). Each chunk contains partial text and a `done` flag. The frontend renders tokens as they arrive.

If the provider or Jana Settings has streaming disabled, the response falls back to a single NDJSON line with the complete response.

### Can I use Jana from Python (server-side)?

Yes. Import and use `ChatService` directly:

```python
from jana.services.chat import ChatService
service = ChatService()
result = service.send_message(session_id="...", content="Hello")
```

See the [API Reference](api-reference.md) for more examples.

### How do I clear the cache if something isn't working?

```bash
bench --site your-site clear-cache
```

Then hard-refresh your browser (`Ctrl+Shift+R`).

## Troubleshooting

### The chat widget doesn't appear

1. Check that Jana is installed: `bench --site your-site list-apps`
2. Clear the cache: `bench --site your-site clear-cache`
3. Hard-refresh the browser
4. Check the browser console for JavaScript errors

### "No AI provider configured"

Go to `/app/jana-settings` and set a **Default Provider**. Make sure the provider is **enabled** and has a valid **API key**.

### "Invalid API key"

Verify your API key in the provider settings. Ensure there are no extra spaces or line breaks. Test the key directly with the provider's own tools to confirm it works.

### "Could not connect to Ollama"

1. Ensure Ollama is running: `ollama serve`
2. Check the base URL in the provider (default: `http://localhost:11434`)
3. If Frappe runs in Docker, use the host machine's IP instead of `localhost`

### "Rate limit exceeded"

Your LLM provider has rate-limited your API key. Wait a minute and try again. Consider upgrading your provider plan or switching to a different provider.

### "Model not found"

The model name in your agent or provider doesn't match an available model. Check the provider's documentation for valid model names. Common issues:
- Typos in the model name
- Using a model that requires special access (e.g., GPT-4 requires a paid tier)
- The model was deprecated by the provider

### Responses are slow

- **Cloud providers:** Response time depends on the model and provider load. Smaller models (GPT-4o-mini, Claude Haiku) are faster.
- **Ollama:** The first request may be slow if the model needs to be loaded into memory. Subsequent requests are faster.
- **Enable streaming** in Jana Settings for a better perceived experience — you see tokens as they arrive instead of waiting for the complete response.
