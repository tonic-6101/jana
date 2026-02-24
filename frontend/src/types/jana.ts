// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

export interface JanaProvider {
  name: string;
  provider_name: string;
  provider_type: "openai" | "anthropic" | "google" | "ollama" | "vllm" | "custom";
  api_base_url?: string;
  available_models?: string;
  is_default: boolean;
  enabled: boolean;
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
