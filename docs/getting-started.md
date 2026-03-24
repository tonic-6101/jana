# Getting Started with Jana

This guide walks you through installing Jana, configuring your first AI provider, and having your first AI-assisted conversation inside Frappe Desk.

## Prerequisites

Before installing Jana, ensure you have:

- A working **Frappe v16+** site (bench setup complete)
- **Python 3.14** or later
- **Node.js 24+** (for building the frontend)
- An API key from at least one LLM provider (OpenAI, Anthropic, etc.), **or** a local Ollama installation

## Step 1: Install the App

```bash
# Navigate to your bench directory
cd $PATH_TO_YOUR_BENCH

# Download Jana
bench get-app https://github.com/tonic-6101/jana.git

# Install on your site
bench --site your-site install-app jana
```

After installation, Jana automatically creates a **General Assistant** agent — a default AI assistant with Frappe knowledge and context awareness.

## Step 2: Configure a Provider

Jana uses **BYOK (Bring Your Own Key)** — you connect your own LLM provider account.

### Option A: Cloud Provider (OpenAI, Anthropic, etc.)

1. Log in to Frappe Desk as an Administrator
2. Go to the URL bar and navigate to: `/app/jana-provider/new`
3. Fill in the form:
   - **Provider Name**: A friendly name (e.g., "My OpenAI")
   - **Provider Type**: Select your provider (e.g., "openai")
   - **API Key**: Paste your API key
   - **Enabled**: Check this box
4. Save

### Option B: Local Model (Ollama)

1. Install [Ollama](https://ollama.ai) on your server or local machine
2. Pull a model: `ollama pull llama3.2`
3. In Frappe Desk, go to `/app/jana-provider/new`
4. Fill in:
   - **Provider Name**: "Local Ollama"
   - **Provider Type**: "ollama"
   - **API Base URL**: `http://localhost:11434` (or your Ollama server address)
   - **Enabled**: Check this box
5. Save

No API key is needed for Ollama.

## Step 3: Set the Default Provider

1. Go to `/app/jana-settings`
2. Set **Default Provider** to the provider you just created
3. Optionally set a **Default Model** (e.g., `gpt-4o-mini` for OpenAI, `claude-sonnet-4-20250514` for Anthropic, `llama3.2` for Ollama)
4. Save

## Step 4: Your First Conversation

1. Navigate to any document in Frappe Desk (e.g., open a Sales Invoice, Customer, or Employee record)
2. The Jana chat widget appears — look for the floating button
3. Click it to open the chat panel
4. Type a question like:
   - "What is this document about?"
   - "Summarize the key details"
   - "What is the outstanding amount?"
5. Jana reads the document context and responds with specific information from the record you're viewing

## Step 5: Per-User API Keys (Optional)

If you don't want to share a system-wide API key, each user can bring their own:

1. Go to `/app/jana-user-key/new`
2. Select the **Provider** and **User**
3. Enter the user's personal **API Key**
4. Enable it and Save

The system checks for a per-user key first, then falls back to the system-level key on the provider.

## What's Next

- **[User Guide](user-guide.md)** — Learn how to use Jana effectively in your daily work
- **[Configuration](configuration.md)** — Customize capabilities, streaming, and PII masking
- **[Providers](providers.md)** — Set up multiple providers and learn about each one
- **[Agents](agents.md)** — Create custom agents for specific tasks

## Troubleshooting

### "No AI provider configured"

You haven't set a default provider. Go to `/app/jana-settings` and set one.

### "Invalid API key"

Double-check your API key in the provider settings. Make sure there are no extra spaces. For OpenAI, the key starts with `sk-`.

### "Could not connect to Ollama"

Ensure Ollama is running (`ollama serve`) and the base URL in the provider matches where Ollama is listening (default: `http://localhost:11434`). If Frappe runs in Docker, you may need to use the host machine's IP instead of `localhost`.

### Widget doesn't appear

1. Clear the Frappe cache: `bench --site your-site clear-cache`
2. Hard-refresh your browser (`Ctrl+Shift+R`)
3. Ensure Jana is installed: `bench --site your-site list-apps` should include `jana`

### "Rate limit exceeded"

Your LLM provider has rate-limited your API key. Wait a moment and try again, or upgrade your provider plan.
