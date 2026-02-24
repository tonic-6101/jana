// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref, computed } from "vue"
import type {
  JanaSettings,
  JanaProvider,
  JanaUserKey,
  ConnectionTestResult,
  OAuthProviderStatus,
} from "@/types/jana"

const SETTINGS_FIELDS: (keyof JanaSettings)[] = [
  "default_provider",
  "default_model",
  "max_context_tokens",
  "enable_streaming",
  "enable_tool_calling",
  "rate_limit_per_hour",
  "session_retention_days",
  "business_description",
  "knowledge_token_budget",
  "enable_chat",
  "enable_read_documents",
  "enable_draft_content",
  "enable_create_documents",
  "enable_navigate",
  "enable_report_queries",
  "enable_modify_documents",
  "mask_pii",
]

async function apiCall(method: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const { call } = await import("frappe-ui")
  return call(method, args)
}

export function useSettings() {
  const isAdmin = ref(false)
  const roleLoaded = ref(false)
  const settings = ref<JanaSettings | null>(null)
  const originalSnapshot = ref("")
  const providers = ref<JanaProvider[]>([])
  const availableModels = ref<string[]>([])
  const userKeys = ref<JanaUserKey[]>([])
  const oauthStatus = ref<Record<string, OAuthProviderStatus>>({})

  const loading = ref(false)
  const saving = ref(false)
  const testingProvider = ref<string | null>(null)
  const testResults = ref<Record<string, ConnectionTestResult>>({})

  const dirty = computed(() => {
    if (!settings.value) return false
    return JSON.stringify(settings.value) !== originalSnapshot.value
  })

  // --- Role Detection ---

  async function detectRole(): Promise<void> {
    try {
      const result = (await apiCall("jana.api.agents.check_admin")) as { is_admin: boolean }
      isAdmin.value = result.is_admin
    } catch {
      isAdmin.value = false
    }
    roleLoaded.value = true
  }

  // --- Settings CRUD ---

  async function loadSettings(): Promise<void> {
    loading.value = true
    try {
      const doc = (await apiCall("frappe.client.get", {
        doctype: "Jana Settings",
        name: "Jana Settings",
      })) as Record<string, unknown>

      const s: Record<string, unknown> = {}
      for (const key of SETTINGS_FIELDS) {
        const val = doc[key]
        // Frappe returns 0/1 for Check fields — normalize to boolean
        if (typeof val === "number" && (val === 0 || val === 1)) {
          s[key] = Boolean(val)
        } else {
          s[key] = val ?? null
        }
      }
      settings.value = s as unknown as JanaSettings
      originalSnapshot.value = JSON.stringify(settings.value)
    } finally {
      loading.value = false
    }
  }

  async function saveSettings(): Promise<void> {
    if (!settings.value || !dirty.value) return
    saving.value = true
    try {
      // Convert booleans back to 0/1 for Frappe
      const payload: Record<string, unknown> = {}
      for (const key of SETTINGS_FIELDS) {
        const val = (settings.value as Record<string, unknown>)[key]
        payload[key] = typeof val === "boolean" ? (val ? 1 : 0) : val
      }
      await apiCall("frappe.client.set_value", {
        doctype: "Jana Settings",
        name: "Jana Settings",
        fieldname: payload,
      })
      originalSnapshot.value = JSON.stringify(settings.value)
    } finally {
      saving.value = false
    }
  }

  // --- Providers ---

  async function loadProviders(): Promise<void> {
    try {
      // Admin gets full detail via dedicated API
      const result = await apiCall("jana.api.providers.list_providers")
      providers.value = result as JanaProvider[]
    } catch {
      // Fallback for non-admin (limited fields)
      try {
        const result = await apiCall("frappe.client.get_list", {
          doctype: "Jana Provider",
          fields: [
            "name", "provider_name", "provider_type",
            "enabled", "is_default", "auth_method",
          ],
          limit_page_length: 0,
          order_by: "provider_name asc",
        })
        providers.value = result as JanaProvider[]
      } catch {
        providers.value = []
      }
    }
  }

  async function loadModelsFor(providerName: string): Promise<void> {
    if (!providerName) {
      availableModels.value = []
      return
    }
    try {
      const result = await apiCall("jana.api.providers.get_models_for_provider", {
        provider_name: providerName,
      })
      availableModels.value = result as string[]
    } catch {
      availableModels.value = []
    }
  }

  async function testConnection(providerName: string): Promise<ConnectionTestResult> {
    testingProvider.value = providerName
    try {
      const result = (await apiCall("jana.api.providers.test_connection", {
        provider_name: providerName,
      })) as ConnectionTestResult
      testResults.value[providerName] = result
      return result
    } catch (err) {
      const failed: ConnectionTestResult = {
        success: false,
        message: String(err),
        latency_ms: 0,
        model: null,
      }
      testResults.value[providerName] = failed
      return failed
    } finally {
      testingProvider.value = null
    }
  }

  async function saveProvider(
    providerName: string,
    data: Record<string, unknown>,
  ): Promise<JanaProvider> {
    const result = (await apiCall("jana.api.providers.save_provider", {
      provider_name: providerName,
      data: JSON.stringify(data),
    })) as JanaProvider
    const idx = providers.value.findIndex((p) => p.name === providerName)
    if (idx >= 0) {
      providers.value[idx] = result
    }
    return result
  }

  async function createProvider(data: Record<string, unknown>): Promise<JanaProvider> {
    const result = (await apiCall("jana.api.providers.create_provider", {
      data: JSON.stringify(data),
    })) as JanaProvider
    providers.value.push(result)
    return result
  }

  async function deleteProvider(providerName: string): Promise<void> {
    await apiCall("jana.api.providers.delete_provider", {
      provider_name: providerName,
    })
    providers.value = providers.value.filter((p) => p.name !== providerName)
  }

  // --- User Keys (BYOK) ---

  async function loadUserKeys(): Promise<void> {
    try {
      const result = await apiCall("frappe.client.get_list", {
        doctype: "Jana User Key",
        fields: ["name", "user", "provider", "auth_type", "enabled", "connected_at"],
        limit_page_length: 0,
        order_by: "creation desc",
      })
      userKeys.value = result as JanaUserKey[]
    } catch {
      userKeys.value = []
    }
  }

  async function addUserKey(provider: string, apiKey: string): Promise<void> {
    await apiCall("frappe.client.insert", {
      doc: {
        doctype: "Jana User Key",
        provider,
        api_key: apiKey,
        auth_type: "api_key",
        enabled: 1,
      },
    })
    await loadUserKeys()
  }

  async function deleteUserKey(keyName: string): Promise<void> {
    await apiCall("frappe.client.delete", {
      doctype: "Jana User Key",
      name: keyName,
    })
    await loadUserKeys()
  }

  // --- OAuth ---

  async function loadOAuthStatus(): Promise<void> {
    try {
      const result = (await apiCall("jana.api.oauth.get_oauth_status")) as Record<
        string,
        OAuthProviderStatus
      >
      oauthStatus.value = result
    } catch {
      oauthStatus.value = {}
    }
  }

  async function connectOAuth(providerName: string, providerType: string): Promise<void> {
    const method =
      providerType === "google"
        ? "jana.api.oauth.initiate_google_oauth"
        : "jana.api.oauth.initiate_openrouter_oauth"
    const result = (await apiCall(method, { provider_name: providerName })) as {
      auth_url: string
    }
    window.location.href = result.auth_url
  }

  async function disconnectOAuth(providerName: string): Promise<void> {
    await apiCall("jana.api.oauth.disconnect_oauth", { provider_name: providerName })
    await loadOAuthStatus()
  }

  return {
    isAdmin,
    roleLoaded,
    settings,
    providers,
    availableModels,
    userKeys,
    oauthStatus,
    loading,
    saving,
    dirty,
    testingProvider,
    testResults,
    detectRole,
    loadSettings,
    saveSettings,
    loadProviders,
    loadModelsFor,
    testConnection,
    saveProvider,
    createProvider,
    deleteProvider,
    loadUserKeys,
    addUserKey,
    deleteUserKey,
    loadOAuthStatus,
    connectOAuth,
    disconnectOAuth,
  }
}
