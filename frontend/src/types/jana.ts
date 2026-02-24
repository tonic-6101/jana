// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

export interface JanaProvider {
  name: string;
  provider_name: string;
  provider_type: "openai" | "anthropic" | "google" | "openrouter" | "ollama" | "vllm" | "custom";
  api_base_url?: string;
  available_models?: string;
  auth_method: "API Key" | "OAuth";
  connected_app?: string;
  openrouter_callback_url?: string;
  is_default: boolean;
  enabled: boolean;
}

export interface JanaOAuthProvider {
  name: string;
  provider_name: string;
  provider_type: string;
  connected: boolean;
}

export interface JanaAgent {
  name: string;
  agent_name: string;
  system_prompt: string;
  provider?: string;
  model?: string;
  temperature: number;
  max_tokens?: number;
  description?: string;
  is_template: boolean;
}

export interface JanaChatSession {
  name: string;
  session_title?: string;
  agent?: string;
  user: string;
  status: "active" | "archived";
  context_doctype?: string;
  context_docname?: string;
  modified: string;
}

export interface JanaChatMessage {
  name: string;
  session: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  model?: string;
  tokens_used?: number;
  creation: string;
}

export interface JanaTool {
  name: string;
  tool_name: string;
  tool_type: "frappe_api" | "webhook" | "custom";
  method?: string;
  description: string;
  parameters_schema?: string;
  enabled: boolean;
}

export interface JanaTemplate {
  name: string;
  template_name: string;
  description: string;
  agent_config: string;
  category: "general" | "accounting" | "crm" | "hr" | "buying";
  price: number;
  author: string;
  downloads: number;
  rating: number;
  published: boolean;
}

export interface JanaBootConfig {
  enabled: boolean;
  default_agent: string;
  streaming: boolean;
  oauth_providers: JanaOAuthProvider[];
  capabilities: {
    chat: boolean;
    read_documents: boolean;
    draft_content: boolean;
    create_documents: boolean;
    navigate: boolean;
    report_queries: boolean;
    modify_documents: boolean;
  };
}

// --- Runtime chat types (not DocType shapes) ---

/** Runtime message used in the chat UI */
export interface ChatMessageUI {
  name?: string;
  localId: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  model?: string;
  tokens_used?: number;
  creation?: string;
  streaming?: boolean;
}

/** Session summary from get_sessions API */
export interface ChatSessionSummary {
  name: string;
  session_title: string | null;
  agent: string | null;
  status: "active" | "archived";
  context_doctype?: string;
  context_docname?: string;
  modified: string;
}

/** Full session detail from get_session API */
export interface ChatSessionDetail {
  session: {
    name: string;
    session_title: string | null;
    agent: string | null;
    status: string;
    context_doctype?: string;
    context_docname?: string;
  };
  messages: JanaChatMessage[];
}

/** Agent summary from list_agents API */
export interface AgentSummary {
  name: string;
  agent_name: string;
  description: string | null;
  provider: string | null;
  model: string | null;
}

// --- Settings types ---

/** Jana Settings Single DocType fields */
export interface JanaSettings {
  default_provider: string | null;
  default_model: string | null;
  max_context_tokens: number;
  enable_streaming: boolean;
  enable_tool_calling: boolean;
  rate_limit_per_hour: number;
  session_retention_days: number;
  business_description: string;
  knowledge_token_budget: number;
  enable_chat: boolean;
  enable_read_documents: boolean;
  enable_draft_content: boolean;
  enable_create_documents: boolean;
  enable_navigate: boolean;
  enable_report_queries: boolean;
  enable_modify_documents: boolean;
  mask_pii: boolean;
}

/** User's own API key (BYOK) */
export interface JanaUserKey {
  name: string;
  user: string;
  provider: string;
  auth_type: "api_key" | "oauth_key" | "oauth_token";
  enabled: boolean;
  connected_at: string | null;
}

/** Result from provider test_connection API */
export interface ConnectionTestResult {
  success: boolean;
  message: string;
  latency_ms: number;
  model: string | null;
}

/** OAuth connection status for a provider */
export interface OAuthProviderStatus {
  connected: boolean;
  provider_type: string;
  provider_name: string;
}
