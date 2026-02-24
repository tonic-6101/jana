# User Guide

This guide is for anyone using Jana in their daily work — you don't need to be a developer. It covers how to chat with Jana, manage sessions, and get the most out of context-aware AI assistance.

## The Chat Widget

Jana adds a floating chat widget to every page in Frappe Desk. When you click it, a chat panel opens where you can ask questions and get AI-powered answers.

### How Context Works

Jana is **context-aware**. When you're viewing a document (Sales Invoice, Customer, Task, etc.), Jana automatically knows:

- **Which DocType** you're looking at (e.g., Sales Invoice)
- **Which document** you're on (e.g., SI-00042)
- **The field values** of that document (customer name, total, status, etc.)

This means you can ask questions like:

- "What's the outstanding amount on this invoice?"
- "Who is the customer for this order?"
- "What's the status of this document?"

Jana will answer using the actual data from the document you're viewing — not generic explanations.

### What Jana Can Do

| Capability | Description |
|-----------|-------------|
| **Chat** | Have a natural language conversation about your data |
| **Read Documents** | Understand and summarize the document you're currently viewing |
| **Answer Questions** | Explain Frappe concepts, DocTypes, workflows, and field meanings |
| **Interpret Data** | Help you understand totals, statuses, linked records, and timelines |
| **Draft Content** | Help compose email text, descriptions, notes, and summaries based on document context |
| **Use Tools** | Read other documents, create records, run reports — with your permission and within your Frappe access rights |

### What Jana Cannot Do

- Access documents you don't have permission to view
- Perform actions on the system without your explicit confirmation
- Access external websites or systems
- Guarantee the accuracy of calculations — always verify critical figures

## Chat Sessions

### Starting a New Chat

Click the chat widget and start typing. Jana creates a new session automatically. The session is titled based on your first message.

### Persistent Sessions

Your chat sessions persist across page navigation. If you navigate from a Sales Invoice to a Customer record, your conversation continues — but Jana's context updates to the new page.

### Chat History

You can view your past chat sessions. Each session stores:

- All messages (yours and Jana's)
- Which agent was used
- The page context at the time of the conversation

### Archiving Sessions

You can archive a session when you no longer need it but want to keep the history. Archived sessions are hidden from the default session list but can be viewed by filtering for archived sessions.

### Deleting Sessions

Deleting a session permanently removes it and all its messages. This action cannot be undone.

### New Chat

Click **New Chat** to start a fresh conversation at any time. This creates a new session with no prior context.

### Session Retention

Your administrator may configure automatic archiving of old sessions. By default, sessions older than 90 days are archived automatically. This helps keep the session list manageable.

## Business Context

Your administrator can configure Jana with business-specific knowledge that makes AI responses more relevant.

### Business Description

In **Jana Settings**, the Business Description field lets your admin describe your organisation — industry, currency, approval rules, conventions. This context is included in every conversation, so Jana's answers reflect your actual business instead of giving generic advice.

### Knowledge Articles

Your admin can create **Knowledge Articles** (`/app/jana-knowledge-article`) containing policies, SOPs, product information, FAQs, and other reference material. These articles can be:

- **Attached to specific agents** — an Accounting agent might have articles about your chart of accounts
- **Scoped to a DocType** — an article about invoice policies is automatically included when you're viewing a Sales Invoice

You don't need to do anything to benefit from knowledge articles — they're injected into the AI's context automatically. If you notice Jana giving answers that don't match your company's policies, ask your admin to add a knowledge article with the correct information.

## Ask AI — Natural Language Querying

Jana includes a **Data Analyst** agent that answers business questions by running Frappe reports for you. Instead of navigating to a report page, selecting filters, and interpreting rows — just ask in plain English.

### How to Use It

1. Open the Jana chat widget
2. Switch to the **Data Analyst** agent (from the agent selector)
3. Ask your question

### Example Questions

- "Show me overdue invoices"
- "How many leads did we get from the website this month?"
- "What's the stock balance for Item A?"
- "Compare this quarter's revenue to last quarter"
- "Who are our top 5 customers by revenue?"

### How It Works

The Data Analyst agent:
1. Discovers all reports you have access to (based on your Frappe permissions)
2. Selects the most relevant report for your question
3. Constructs the right filters (date ranges, statuses, party names)
4. Runs the report and summarises the results
5. Offers to drill down if you need more detail

If no report matches your question exactly, the agent falls back to querying documents directly.

### Tips

- Include time periods in your question: "this month", "last quarter", "since January"
- Mention specific entities: "for Customer X", "in the Accounts department"
- Ask follow-up questions: "Show me the details on the largest one"
- The agent works with any report you have access to in Frappe, including custom reports

## Tips for Better Results

### Be Specific

Instead of "tell me about this", try "what is the outstanding amount and when is it due?"

### Reference the Page

Jana knows your current page. Ask questions that relate to what you're looking at:

- On an Invoice: "Summarize the line items"
- On a Customer: "What's their contact email?"
- On a Task: "Is this overdue?"

### Ask for Explanations

Jana understands Frappe concepts:

- "What does docstatus 1 mean?"
- "How do I submit this document?"
- "What is a workflow state?"

### Ask for Help Drafting

Jana can help you compose text:

- "Draft a follow-up email for this invoice"
- "Write a description for this item based on the details"
- "Summarize this document for my manager"

## Understanding AI Responses

Jana's responses are **AI-generated**. Keep in mind:

- Responses are based on the document data available and the LLM model's knowledge
- For financial figures, legal details, or compliance matters, always **verify against the actual records**
- Jana may occasionally be incorrect — it will tell you when it's uncertain
- The quality of responses depends on the LLM provider and model you're using

## Multiple Users

Each user has their own:

- **Chat sessions** — your conversations are private to your account
- **API key** (optional) — you can use your own key via Jana User Key
- **Permissions** — Jana respects Frappe's permission system. You can only ask about documents you have access to

## Rate Limiting

To ensure fair usage, your administrator may set a limit on how many messages you can send per hour (default: 60). If you reach the limit, wait a few minutes before sending more messages. The counter resets automatically.

## Supported Languages

Jana's interface supports internationalization. The AI responses themselves depend on the LLM model's language capabilities — most major providers support multiple languages. You can ask questions in any language your LLM provider supports.
