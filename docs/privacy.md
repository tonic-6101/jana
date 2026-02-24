# Privacy & Data Handling

Jana includes a built-in PII (Personally Identifiable Information) auto-masking layer to help organizations comply with data protection regulations like GDPR when using cloud-based LLM providers.

## Why PII Masking Matters

When you use cloud LLM providers (OpenAI, Anthropic, etc.), your data is sent to external servers for processing. If that data contains personal information — names, emails, phone numbers, bank details — it may violate data protection regulations.

Jana's PII masking layer automatically detects and replaces personal data with anonymous tokens before sending anything to the LLM provider. The real values are restored in the response before you see it.

## How It Works

### The Data Flow

```
1. User asks: "What's the email for John Smith on this invoice?"

2. Jana detects PII in the document context:
   - "John Smith"  →  [PERSON_1]
   - "john@acme.com"  →  [EMAIL_1]

3. LLM receives: "What's the email for [PERSON_1] on this invoice?"
   Context shows: Customer Name: [PERSON_1], Email: [EMAIL_1]

4. LLM responds: "The email for [PERSON_1] is [EMAIL_1]."

5. Jana restores: "The email for John Smith is john@acme.com."

6. User sees the real values. The mapping is discarded.
```

### Detection Methods

Jana uses two layers of PII detection:

**1. Frappe Field Metadata (Primary)**

Jana knows which Frappe fields contain personal data by their fieldtype and options:

| Fieldtype / Options | PII Category |
|-------------------|--------------|
| Data (Email) | EMAIL |
| Data (Phone), Phone | PHONE |
| Data (Name) | PERSON |
| Data (IBAN) | IBAN |
| Geolocation | LOCATION |
| Password | PASSWORD |
| Link → Customer, Employee, Contact, etc. | PERSON |

Jana also uses **fieldname heuristics** for fields that don't have typed options:

- `customer_name`, `employee_name`, `full_name`, etc. → PERSON
- `email_id`, `contact_email` → EMAIL
- `mobile_no`, `contact_phone` → PHONE

**2. Regex Patterns (Secondary)**

For free-text content (user messages, chat history), Jana uses regex patterns to detect:

- Email addresses
- Phone numbers (international and domestic formats)
- IBAN numbers

### Token Format

Masked values use the format `[CATEGORY_N]`:

- `[PERSON_1]`, `[PERSON_2]` — People's names
- `[EMAIL_1]`, `[EMAIL_2]` — Email addresses
- `[PHONE_1]` — Phone numbers
- `[IBAN_1]` — Bank account numbers
- `[LOCATION_1]` — Geographic data
- `[PASSWORD_1]` — Password fields

The LLM can still reason about the data (e.g., "there are 2 people involved", "the email domain matches the company") without seeing actual personal information.

## Zero-Persistence Guarantee

The mapping between tokens and real values:

- Is created **in memory** when a message is sent
- Lives only for the duration of that single request
- Is **garbage-collected** when the request completes
- Is **never written to disk**, database, or logs

There is no way to reconstruct which `[PERSON_1]` referred to which real name after the request ends.

## Configuration

### Global Setting

In **Jana Settings** (`/app/jana-settings`):

| Field | Description | Default |
|-------|-------------|---------|
| **Mask PII** | Master toggle for PII masking | Off |

### Per-Provider Override

Each Jana Provider has a **Mask PII Override** field:

| Value | Behavior |
|-------|---------|
| `Global Default` | Follow the global setting |
| `Always On` | Force masking for this provider (even if global is off) |
| `Always Off` | Disable masking for this provider (even if global is on) |

### Local Provider Exemption

When the global setting is **on**, local providers (Ollama, vLLM) are **automatically exempt** from PII masking. Data stays on your network, so masking is unnecessary. You can override this with `Always On` if needed.

### Resolution Logic

```
Provider override = "Always On"  →  masking ON
Provider override = "Always Off" →  masking OFF
Provider override = "Global Default":
    Global setting OFF           →  masking OFF
    Global setting ON:
        Provider is local        →  masking OFF (auto-exempt)
        Provider is cloud        →  masking ON
```

## Streaming Support

PII masking works with streaming responses. Jana buffers partial tokens during streaming:

- If a `[` appears without a closing `]`, the text is held back
- When the token completes (e.g., `[PERSON_1]`), it's unmasked and sent to the user
- At stream end, any remaining buffer is flushed and unmasked

This ensures tokens are never partially rendered as `[PERSO` before being replaced.

## What Gets Masked

### Structured Context (Document Fields)

Before the current document's data is injected into the system prompt, Jana checks each field against the PII detection rules. Fields identified as PII have their values replaced with tokens.

### User Messages

After the message list is built (system prompt + history + new message), all user and assistant messages are scanned for PII patterns using regex. System messages are skipped (already handled by structured masking).

### LLM Responses

The LLM response is scanned for any tokens (`[PERSON_1]`, etc.) and they are replaced with the original values before storing and displaying.

## Limitations

- **Regex patterns are conservative.** They aim to minimize false positives in business documents. Some unusual PII formats may not be caught.
- **Context in free text.** Names mentioned in conversation without matching a known pattern may not be detected. Structured field-based detection is more reliable.
- **LLM knowledge.** If the LLM has been trained on similar data, masking outbound data doesn't prevent the LLM from having prior knowledge. PII masking protects against sending your specific data, not against the model's training data.

## Recommendations

1. **Enable PII masking** if you use cloud providers and handle personal data (customers, employees, contacts)
2. **Use local models** (Ollama) for highly sensitive data that must not leave your network
3. **Review field classifications** — Jana's detection is Frappe-aware but may not catch all custom fields. Monitor and report false negatives.
4. **Inform users** that AI conversations may process their data through external services (even with masking, the document structure is visible)
