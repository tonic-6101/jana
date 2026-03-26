// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref, computed } from "vue"
import type {
  AgentDetail,
  AgentToolRow,
  AgentKnowledgeRow,
  ToolSummary,
  KnowledgeArticleSummary,
  JanaProvider,
  UseAgentFormReturn,
} from "@/types/jana"
import { apiCall } from "@/utils/apiCall"

export function useAgentForm(): UseAgentFormReturn {
  // --- Form state ---
  const isNew = ref(true)
  const loading = ref(false)
  const saving = ref(false)
  const deleting = ref(false)

  const agentName = ref("")
  const description = ref("")
  const systemPrompt = ref("")
  const provider = ref<string | null>(null)
  const model = ref<string | null>(null)
  const temperature = ref(0.7)
  const maxTokens = ref(0)
  const isTemplate = ref(false)
  const tools = ref<AgentToolRow[]>([])
  const knowledge = ref<AgentKnowledgeRow[]>([])

  // --- Reference data ---
  const availableTools = ref<ToolSummary[]>([])
  const availableKnowledge = ref<KnowledgeArticleSummary[]>([])
  const providers = ref<JanaProvider[]>([])
  const availableModels = ref<string[]>([])

  // --- Dirty tracking ---
  let snapshot = ""

  function takeSnapshot(): void {
    snapshot = JSON.stringify({
      agentName: agentName.value,
      description: description.value,
      systemPrompt: systemPrompt.value,
      provider: provider.value,
      model: model.value,
      temperature: temperature.value,
      maxTokens: maxTokens.value,
      isTemplate: isTemplate.value,
      tools: tools.value,
      knowledge: knowledge.value,
    })
  }

  const dirty = computed(() => {
    if (isNew.value) return true
    const current = JSON.stringify({
      agentName: agentName.value,
      description: description.value,
      systemPrompt: systemPrompt.value,
      provider: provider.value,
      model: model.value,
      temperature: temperature.value,
      maxTokens: maxTokens.value,
      isTemplate: isTemplate.value,
      tools: tools.value,
      knowledge: knowledge.value,
    })
    return current !== snapshot
  })

  // --- Load reference data ---

  async function loadReferenceData(): Promise<void> {
    const [toolsResult, knowledgeResult, providersResult] = await Promise.all([
      apiCall<ToolSummary[]>("jana.api.agents.list_tools"),
      apiCall<KnowledgeArticleSummary[]>("jana.api.agents.list_knowledge_articles"),
      apiCall<JanaProvider[]>("frappe.client.get_list", {
        doctype: "Jana Provider",
        fields: ["name", "provider_name", "provider_type", "enabled", "is_default"],
        filters: { enabled: 1 },
        order_by: "provider_name asc",
        limit_page_length: 0,
      }),
    ])
    availableTools.value = toolsResult
    availableKnowledge.value = knowledgeResult
    providers.value = providersResult
  }

  async function loadModelsFor(providerName: string): Promise<void> {
    if (!providerName) {
      availableModels.value = []
      return
    }
    try {
      availableModels.value = await apiCall<string[]>("jana.api.providers.get_models_for_provider", {
        provider_name: providerName,
      })
    } catch {
      availableModels.value = []
    }
  }

  // --- CRUD ---

  async function loadAgent(name: string): Promise<void> {
    loading.value = true
    try {
      const result = await apiCall<AgentDetail>("jana.api.agents.get_agent", {
        agent_name: name,
      })

      isNew.value = false
      agentName.value = result.agent_name
      description.value = result.description || ""
      systemPrompt.value = result.system_prompt || ""
      provider.value = result.provider || null
      model.value = result.model || null
      temperature.value = result.temperature ?? 0.7
      maxTokens.value = result.max_tokens || 0
      isTemplate.value = !!result.is_template
      tools.value = (result.tools || []).map((t) => ({
        tool: t.tool,
        enabled: !!t.enabled,
      }))
      knowledge.value = (result.knowledge || []).map((k) => ({
        knowledge_article: k.knowledge_article,
        enabled: !!k.enabled,
      }))

      if (provider.value) {
        await loadModelsFor(provider.value)
      }
      takeSnapshot()
    } finally {
      loading.value = false
    }
  }

  function buildPayload(): Record<string, unknown> {
    return {
      agent_name: agentName.value.trim(),
      description: description.value.trim(),
      system_prompt: systemPrompt.value.trim(),
      provider: provider.value || null,
      model: model.value || null,
      temperature: temperature.value,
      max_tokens: maxTokens.value || 0,
      is_template: isTemplate.value ? 1 : 0,
      tools: tools.value.map((t) => ({ tool: t.tool, enabled: t.enabled ? 1 : 0 })),
      knowledge: knowledge.value.map((k) => ({
        knowledge_article: k.knowledge_article,
        enabled: k.enabled ? 1 : 0,
      })),
    }
  }

  async function saveAgent(): Promise<string> {
    saving.value = true
    try {
      const payload = buildPayload()
      let result: Record<string, string>

      if (isNew.value) {
        result = await apiCall<Record<string, string>>("jana.api.agents.create_agent", {
          data: JSON.stringify(payload),
        })
      } else {
        result = await apiCall<Record<string, string>>("jana.api.agents.update_agent", {
          agent_name: agentName.value,
          data: JSON.stringify(payload),
        })
      }

      isNew.value = false
      takeSnapshot()
      return result.name
    } finally {
      saving.value = false
    }
  }

  async function deleteAgent(): Promise<void> {
    deleting.value = true
    try {
      await apiCall("jana.api.agents.delete_agent", {
        agent_name: agentName.value,
      })
    } finally {
      deleting.value = false
    }
  }

  // --- Tool helpers ---

  function addTool(toolName: string): void {
    if (tools.value.some((t) => t.tool === toolName)) return
    tools.value.push({ tool: toolName, enabled: true })
  }

  function removeTool(toolName: string): void {
    tools.value = tools.value.filter((t) => t.tool !== toolName)
  }

  function addKnowledge(articleName: string): void {
    if (knowledge.value.some((k) => k.knowledge_article === articleName)) return
    knowledge.value.push({ knowledge_article: articleName, enabled: true })
  }

  function removeKnowledge(articleName: string): void {
    knowledge.value = knowledge.value.filter((k) => k.knowledge_article !== articleName)
  }

  function resetForm(): void {
    isNew.value = true
    agentName.value = ""
    description.value = ""
    systemPrompt.value = ""
    provider.value = null
    model.value = null
    temperature.value = 0.7
    maxTokens.value = 0
    isTemplate.value = false
    tools.value = []
    knowledge.value = []
    availableModels.value = []
    snapshot = ""
  }

  return {
    // State
    isNew,
    loading,
    saving,
    deleting,
    dirty,
    // Fields
    agentName,
    description,
    systemPrompt,
    provider,
    model,
    temperature,
    maxTokens,
    isTemplate,
    tools,
    knowledge,
    // Reference data
    availableTools,
    availableKnowledge,
    providers,
    availableModels,
    // Methods
    loadReferenceData,
    loadModelsFor,
    loadAgent,
    saveAgent,
    deleteAgent,
    addTool,
    removeTool,
    addKnowledge,
    removeKnowledge,
    resetForm,
  }
}
