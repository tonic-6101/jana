# Language Support

## Overview

Jana's user interface supports all languages available in Frappe (75+ languages). AI response language matches your Frappe locale automatically -- no configuration needed.

## How It Works

When you send a message to Jana, the system:

1. Detects your Frappe language setting (set in User Settings > Language)
2. Injects language-specific instructions into the AI system prompt
3. Instructs the LLM to respond consistently in your language
4. Provides register guidance for languages with formal/informal distinctions

This happens transparently on every message. English users receive no language instructions (saving tokens).

## Enhanced Languages

The following languages have register-specific guidance to ensure appropriate formality:

| Language | Register Guidance |
|----------|------------------|
| Arabic | Formal Modern Standard Arabic (MSA) |
| Chinese (Simplified) | Formal Mandarin, simplified characters |
| Chinese (Traditional) | Formal Mandarin, traditional characters |
| French | Formal register (vous) |
| German | Formal register (Sie) |
| Hindi | Formal Hindi (Devanagari script) |
| Japanese | Polite form (desu-masu), keigo for business |
| Korean | Formal polite register (hapshoche) |
| Portuguese | Formal register (business context) |
| Russian | Formal register (Vy) |
| Spanish | Formal register (usted) |
| Turkish | Formal register (siz) |

All other Frappe-supported languages receive basic language instructions (respond in target language, don't code-switch).

## Quality Expectations

AI response quality varies by language and is primarily determined by the LLM model's training data:

- **English**: Highest quality -- most LLM training data is in English
- **Major languages** (listed above): Good quality with register guidance. Models like GPT-4o, Claude, and Gemini Pro perform well.
- **Other languages**: Quality depends on the specific LLM model. Larger models generally perform better across languages.

### What to Expect

- **Technical content** (code, API documentation, error messages) may have slightly lower quality in non-English languages
- **DocType names, field names, and API parameters** always stay in English (these are system identifiers)
- **Field labels** are translated when presenting document data
- **Field values** remain as stored in the database (not translated)

## Tips for Best Results

1. **Use a capable model**: GPT-4o, Claude 3.5 Sonnet, or Gemini Pro offer the best multilingual performance
2. **Write in your target language**: The LLM responds better when your input matches the expected output language
3. **Be specific**: Clear, specific questions produce better responses in any language
4. **Technical terms**: For technical questions, it's fine to mix English technical terms with your language

## Changing Your Language

To change the language Jana responds in:

1. Go to **User Settings** in Frappe (click your avatar > My Settings)
2. Change the **Language** field to your preferred language
3. Save and reload the page
4. Jana will automatically respond in your new language on the next message

Note: Changing your Frappe language also changes the entire Frappe interface language, not just Jana.
