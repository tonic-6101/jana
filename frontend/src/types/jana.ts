// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

export type ProviderType = "openai" | "anthropic" | "google" | "openrouter" | "ollama" | "vllm" | "custom";
export type AuthMethod = "API Key" | "OAuth";
export type PiiOverride = "Global Default" | "Always On" | "Always Off";

export interface JanaProvider {
  name: string;
  provider_name: string;
  provider_type: ProviderType;
  api_base_url?: string;
  available_models?: string;
  auth_method: AuthMethod;
  connected_app?: string;
  openrouter_callback_url?: string;
  is_default: boolean;
  enabled: boolean;
  mask_pii_override?: PiiOverride;
  /** Only present in get_provider detail response */
  has_api_key?: boolean;
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
  terms_accepted: boolean;
  terms_version: string;
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
  error?: boolean;
  /** Original content for retry (stored on user messages when their response fails) */
  retryContent?: string;
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

// --- Agent form types ---

/** Tool row in an agent's tools child table */
export interface AgentToolRow {
  tool: string;
  enabled: boolean;
}

/** Knowledge row in an agent's knowledge child table */
export interface AgentKnowledgeRow {
  knowledge_article: string;
  enabled: boolean;
}

/** Full agent detail from get_agent API (admin view) */
export interface AgentDetail {
  name: string;
  agent_name: string;
  description: string | null;
  system_prompt: string;
  provider: string | null;
  model: string | null;
  temperature: number;
  max_tokens: number;
  is_template: boolean;
  tools: AgentToolRow[];
  knowledge: AgentKnowledgeRow[];
}

/** Tool summary for the tool selector */
export interface ToolSummary {
  name: string;
  tool_name: string;
  tool_type: "frappe_api" | "webhook" | "custom";
  description: string;
}

/** Knowledge article summary for the knowledge selector */
export interface KnowledgeArticleSummary {
  name: string;
  article_title: string;
  category: string;
}

// --- Composable return types ---

import type { Ref, ComputedRef, DeepReadonly } from "vue";

export interface UseChatReturn {
  sessions: Ref<ChatSessionSummary[]>;
  sessionsLoading: Ref<boolean>;
  currentSessionId: Ref<string | null>;
  currentAgent: Ref<string>;
  messages: Ref<ChatMessageUI[]>;
  sending: Ref<boolean>;
  streaming: Ref<boolean>;
  connectionError: Ref<boolean>;
  fetchSessions: () => Promise<void>;
  createSession: (agentName?: string) => Promise<string>;
  loadSession: (sessionId: string) => Promise<void>;
  archiveSession: (sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  renameSession: (sessionId: string, title: string) => Promise<void>;
  startNewChat: (agentName?: string) => void;
  sendMessage: (content: string) => Promise<void>;
  retryMessage: (localId: string) => Promise<void>;
  exportSession: () => Record<string, unknown> | null;
  abortStream: () => void;
}

export interface UseSettingsReturn {
  isAdmin: Ref<boolean>;
  roleLoaded: Ref<boolean>;
  settings: Ref<JanaSettings | null>;
  providers: Ref<JanaProvider[]>;
  availableModels: Ref<string[]>;
  userKeys: Ref<JanaUserKey[]>;
  oauthStatus: Ref<Record<string, OAuthProviderStatus>>;
  loading: Ref<boolean>;
  saving: Ref<boolean>;
  dirty: ComputedRef<boolean>;
  testingProvider: Ref<string | null>;
  testResults: Ref<Record<string, ConnectionTestResult>>;
  detectRole: () => Promise<void>;
  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
  loadProviders: () => Promise<void>;
  loadModelsFor: (providerName: string) => Promise<void>;
  testConnection: (providerName: string) => Promise<ConnectionTestResult>;
  saveProvider: (providerName: string, data: Record<string, unknown>) => Promise<JanaProvider>;
  createProvider: (data: Record<string, unknown>) => Promise<JanaProvider>;
  deleteProvider: (providerName: string) => Promise<void>;
  loadUserKeys: () => Promise<void>;
  addUserKey: (provider: string, apiKey: string) => Promise<void>;
  deleteUserKey: (keyName: string) => Promise<void>;
  loadOAuthStatus: () => Promise<void>;
  connectOAuth: (providerName: string, providerType: string) => Promise<void>;
  disconnectOAuth: (providerName: string) => Promise<void>;
}

export interface UseAgentFormReturn {
  isNew: Ref<boolean>;
  loading: Ref<boolean>;
  saving: Ref<boolean>;
  deleting: Ref<boolean>;
  dirty: ComputedRef<boolean>;
  agentName: Ref<string>;
  description: Ref<string>;
  systemPrompt: Ref<string>;
  provider: Ref<string | null>;
  model: Ref<string | null>;
  temperature: Ref<number>;
  maxTokens: Ref<number>;
  isTemplate: Ref<boolean>;
  tools: Ref<AgentToolRow[]>;
  knowledge: Ref<AgentKnowledgeRow[]>;
  availableTools: Ref<ToolSummary[]>;
  availableKnowledge: Ref<KnowledgeArticleSummary[]>;
  providers: Ref<JanaProvider[]>;
  availableModels: Ref<string[]>;
  loadReferenceData: () => Promise<void>;
  loadModelsFor: (providerName: string) => Promise<void>;
  loadAgent: (name: string) => Promise<void>;
  saveAgent: () => Promise<string>;
  deleteAgent: () => Promise<void>;
  addTool: (toolName: string) => void;
  removeTool: (toolName: string) => void;
  addKnowledge: (articleName: string) => void;
  removeKnowledge: (articleName: string) => void;
  resetForm: () => void;
}

export interface UseAgentsReturn {
  agents: DeepReadonly<Ref<AgentSummary[]>>;
  loading: DeepReadonly<Ref<boolean>>;
  fetchAgents: () => Promise<void>;
}
