<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="flex h-screen flex-col bg-white">
    <!-- Header -->
    <header class="flex items-center gap-4 border-b border-gray-200 px-6 py-3 flex-shrink-0">
      <router-link
        to="/jana/chat"
        class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {{ __('Chat') }}
      </router-link>
      <h1 class="flex-1 text-lg font-semibold text-gray-900">{{ __('Settings') }}</h1>
      <Button
        v-if="st.isAdmin.value && st.settings.value"
        :label="__('Save')"
        variant="solid"
        :disabled="!st.dirty.value"
        :loading="st.saving.value"
        @click="handleSave"
      />
    </header>

    <!-- Loading -->
    <div v-if="!st.roleLoaded.value || st.loading.value" class="flex flex-1 items-center justify-center">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
    </div>

    <!-- Admin: tabbed layout -->
    <template v-else-if="st.isAdmin.value && st.settings.value">
      <Tabs :tabs="adminTabs" v-model="activeTab">
        <template #tab-panel="{ tab }">
          <!-- General -->
          <div v-if="tab.label === __('General')" class="max-w-3xl mx-auto px-6 py-6 space-y-6">
            <SectionTitle :title="__('AI Provider')" />

            <div class="grid gap-4 sm:grid-cols-2">
              <FormControl
                type="select"
                :label="__('Default Provider')"
                :options="providerOptions"
                v-model="st.settings.value.default_provider"
                @change="onProviderChange"
              />
              <FormControl
                type="select"
                :label="__('Default Model')"
                :options="modelOptions"
                v-model="st.settings.value.default_model"
              />
            </div>

            <FormControl
              type="number"
              :label="__('Max Context Tokens')"
              :description="__('Maximum tokens for the LLM context window (512–128000)')"
              v-model.number="st.settings.value.max_context_tokens"
            />

            <SectionTitle :title="__('Behavior')" />

            <div class="space-y-4">
              <Switch
                v-model="st.settings.value.enable_streaming"
                :label="__('Enable Streaming')"
                :description="__('Stream AI responses token-by-token for a real-time feel')"
              />
              <Switch
                v-model="st.settings.value.enable_tool_calling"
                :label="__('Enable Tool Calling')"
                :description="__('Allow agents to call Frappe API tools during conversations')"
              />
            </div>
          </div>

          <!-- Providers -->
          <div v-else-if="tab.label === __('Providers')" class="max-w-3xl mx-auto px-6 py-6 space-y-4">
            <div class="flex items-center justify-between">
              <SectionTitle :title="__('Configured Providers')" :description="__('Click a provider to expand and edit all settings.')" />
              <button
                class="text-sm font-medium text-blue-600 hover:text-blue-700"
                @click="showNewProvider = !showNewProvider"
              >
                {{ showNewProvider ? __('Cancel') : '+ ' + __('Add Provider') }}
              </button>
            </div>

            <!-- New Provider form -->
            <div v-if="showNewProvider" class="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 p-4 space-y-4">
              <h3 class="text-sm font-semibold text-gray-900">{{ __('New Provider') }}</h3>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Provider Name') }} *</label>
                  <input
                    v-model="newProvider.provider_name"
                    type="text"
                    :placeholder="__('e.g. My OpenAI')"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                           focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Provider Type') }} *</label>
                  <select
                    v-model="newProvider.provider_type"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                           focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="google">Google</option>
                    <option value="openrouter">OpenRouter</option>
                    <option value="ollama">Ollama</option>
                    <option value="vllm">vLLM</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Authentication') }}</label>
                  <select
                    v-model="newProvider.auth_method"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                           focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="API Key">{{ __('API Key') }}</option>
                    <option value="OAuth">{{ __('OAuth') }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('API Key') }}</label>
                  <input
                    v-model="newProvider.api_key"
                    type="password"
                    :placeholder="__('Paste your API key')"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                           placeholder:text-gray-300
                           focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('API Base URL') }}</label>
                  <input
                    v-model="newProvider.api_base_url"
                    type="text"
                    :placeholder="__('Optional — for Ollama, vLLM, custom')"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                           placeholder:text-gray-300
                           focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('PII Masking') }}</label>
                  <select
                    v-model="newProvider.mask_pii_override"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                           focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="Global Default">{{ __('Global Default') }}</option>
                    <option value="Always On">{{ __('Always On') }}</option>
                    <option value="Always Off">{{ __('Always Off') }}</option>
                  </select>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="newProvider.enabled" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <span class="text-sm text-gray-700">{{ __('Enabled') }}</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="newProvider.is_default" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <span class="text-sm text-gray-700">{{ __('Is Default') }}</span>
                </label>
              </div>
              <button
                class="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700
                       disabled:opacity-50 transition-colors"
                :disabled="!newProvider.provider_name.trim() || creatingProvider"
                @click="handleCreateProvider"
              >
                {{ creatingProvider ? __('Creating…') : __('Create Provider') }}
              </button>
            </div>

            <!-- Empty state -->
            <div v-if="!st.providers.value.length && !showNewProvider" class="py-8 text-center text-sm text-gray-400">
              {{ __('No providers configured.') }}
            </div>

            <!-- Provider cards -->
            <div v-if="st.providers.value.length" class="space-y-3">
              <ProviderCard
                v-for="p in st.providers.value"
                :key="p.name"
                :provider="p"
                :test-result="st.testResults.value[p.name]"
                :testing="st.testingProvider.value === p.name"
                @test="handleTestConnection"
                @save="handleSaveProvider"
                @delete="handleDeleteProvider"
              />
            </div>
          </div>

          <!-- Capabilities -->
          <div v-else-if="tab.label === __('Capabilities')" class="max-w-3xl mx-auto px-6 py-6 space-y-4">
            <SectionTitle
              :title="__('AI Capabilities')"
              :description="__('Control what Jana is allowed to do in conversations')"
            />

            <div class="space-y-4">
              <Switch
                v-model="st.settings.value.enable_chat"
                :label="__('Chat / Q&A')"
                :description="__('Basic conversational AI')"
              />
              <Switch
                v-model="st.settings.value.enable_read_documents"
                :label="__('Read Documents')"
                :description="__('Allow AI to read Frappe documents for context')"
              />
              <Switch
                v-model="st.settings.value.enable_draft_content"
                :label="__('Draft Content')"
                :description="__('Generate emails, descriptions, and summaries')"
              />
              <Switch
                v-model="st.settings.value.enable_create_documents"
                :label="__('Create Documents')"
                :description="__('Allow AI to create new records in the system')"
              />
              <Switch
                v-model="st.settings.value.enable_navigate"
                :label="__('Navigate to Pages')"
                :description="__('Allow AI to direct users to specific pages or reports')"
              />
              <Switch
                v-model="st.settings.value.enable_report_queries"
                :label="__('Run Report Queries')"
                :description="__('Allow AI to query reports and return data')"
              />
              <Switch
                v-model="st.settings.value.enable_modify_documents"
                :label="__('Modify Documents')"
                :description="__('Allow AI to change existing records — use with caution')"
              />
            </div>
          </div>

          <!-- Limits & Privacy -->
          <div v-else-if="tab.label === __('Limits')" class="max-w-3xl mx-auto px-6 py-6 space-y-6">
            <SectionTitle :title="__('Rate Limits')" />

            <FormControl
              type="number"
              :label="__('Messages per User per Hour')"
              :description="__('Set to 0 for unlimited')"
              v-model.number="st.settings.value.rate_limit_per_hour"
            />

            <FormControl
              type="number"
              :label="__('Session Retention (days)')"
              :description="__('Auto-archive sessions older than this. Set to 0 to keep forever.')"
              v-model.number="st.settings.value.session_retention_days"
            />

            <SectionTitle :title="__('Privacy')" />

            <Switch
              v-model="st.settings.value.mask_pii"
              :label="__('Auto-Mask PII')"
              :description="__('Automatically mask personal identifiable information (names, emails, phone numbers) before sending to cloud LLM providers. Recommended for GDPR compliance.')"
            />
          </div>

          <!-- Knowledge -->
          <div v-else-if="tab.label === __('Knowledge')" class="max-w-3xl mx-auto px-6 py-6 space-y-6">
            <SectionTitle
              :title="__('Business Context')"
              :description="__('This description is included in every AI conversation to provide business context.')"
            />

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700">
                {{ __('Business Description') }}
              </label>
              <textarea
                v-model="st.settings.value.business_description"
                rows="6"
                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm
                       focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                :placeholder="__('Describe your business, products, and services...')"
              />
            </div>

            <FormControl
              type="number"
              :label="__('Knowledge Token Budget')"
              :description="__('Maximum tokens allocated for knowledge articles in the system prompt')"
              v-model.number="st.settings.value.knowledge_token_budget"
            />

            <p class="text-xs text-gray-400">
              <a href="/app/jana-knowledge-article" target="_blank" class="hover:underline">
                {{ __('Manage knowledge articles in Desk') }} &rarr;
              </a>
            </p>
          </div>

          <!-- My Keys -->
          <div v-else-if="tab.label === __('My Keys')" class="max-w-3xl mx-auto px-6 py-6">
            <MyKeysSection
              :user-keys="st.userKeys.value"
              :providers="st.providers.value"
              :oauth-status="st.oauthStatus.value"
              @add-key="handleAddKey"
              @delete-key="handleDeleteKey"
              @connect-oauth="handleConnectOAuth"
              @disconnect-oauth="handleDisconnectOAuth"
            />
          </div>
        </template>
      </Tabs>
    </template>

    <!-- Non-admin: just My Keys -->
    <div v-else class="flex-1 overflow-y-auto">
      <div class="max-w-3xl mx-auto px-6 py-6">
        <MyKeysSection
          :user-keys="st.userKeys.value"
          :providers="st.providers.value"
          :oauth-status="st.oauthStatus.value"
          @add-key="handleAddKey"
          @delete-key="handleDeleteKey"
          @connect-oauth="handleConnectOAuth"
          @disconnect-oauth="handleDisconnectOAuth"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, defineComponent, h } from "vue"
import { Tabs, Button, FormControl, Switch, Badge, toast } from "frappe-ui"
import { __ } from "@/composables/useTranslate"
import { useSettings } from "@/composables/useSettings"
import ProviderCard from "@/components/settings/ProviderCard.vue"
import type { OAuthProviderStatus } from "@/types/jana"

const st = useSettings()
const activeTab = ref(0)

// --- New Provider form state ---
const showNewProvider = ref(false)
const creatingProvider = ref(false)
const newProvider = reactive({
  provider_name: "",
  provider_type: "openai" as string,
  auth_method: "API Key" as string,
  api_key: "",
  api_base_url: "",
  mask_pii_override: "Global Default" as string,
  enabled: true,
  is_default: false,
})

// --- Admin tabs ---
const adminTabs = computed(() => [
  { label: __("General") },
  { label: __("Providers") },
  { label: __("Capabilities") },
  { label: __("Limits") },
  { label: __("Knowledge") },
  { label: __("My Keys") },
])

// --- Provider / Model options ---
const providerOptions = computed(() => {
  const opts = st.providers.value.filter((p) => p.enabled).map((p) => ({
    label: p.provider_name,
    value: p.name,
  }))
  opts.unshift({ label: __("— Select —"), value: "" })
  return opts
})

const modelOptions = computed(() => {
  const opts = st.availableModels.value.map((m) => ({ label: m, value: m }))
  opts.unshift({ label: __("— Select —"), value: "" })
  return opts
})

function onProviderChange() {
  if (st.settings.value?.default_provider) {
    st.loadModelsFor(st.settings.value.default_provider)
  } else {
    st.availableModels.value = []
  }
}

// When settings load, also load models for current provider
watch(
  () => st.settings.value?.default_provider,
  (val) => { if (val) st.loadModelsFor(val) },
)

// --- Event handlers ---
async function handleSave() {
  try {
    await st.saveSettings()
    toast.success(__("Settings saved"))
  } catch {
    toast.error(__("Failed to save settings"))
  }
}

async function handleTestConnection(providerName: string) {
  const result = await st.testConnection(providerName)
  if (result.success) {
    toast.success(__("Connection successful") + ` (${result.latency_ms}ms)`)
  } else {
    toast.error(result.message)
  }
}

async function handleSaveProvider(providerName: string, data: Record<string, unknown>) {
  try {
    await st.saveProvider(providerName, data)
    toast.success(__("Provider saved"))
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : __("Failed to save provider")
    toast.error(msg)
  }
}

async function handleDeleteProvider(providerName: string) {
  if (!confirm(__("Delete this provider? This cannot be undone."))) return
  try {
    await st.deleteProvider(providerName)
    toast.success(__("Provider deleted"))
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : __("Failed to delete provider")
    toast.error(msg)
  }
}

async function handleCreateProvider() {
  creatingProvider.value = true
  try {
    await st.createProvider({
      provider_name: newProvider.provider_name.trim(),
      provider_type: newProvider.provider_type,
      auth_method: newProvider.auth_method,
      api_key: newProvider.api_key || undefined,
      api_base_url: newProvider.api_base_url || undefined,
      mask_pii_override: newProvider.mask_pii_override,
      enabled: newProvider.enabled ? 1 : 0,
      is_default: newProvider.is_default ? 1 : 0,
    })
    toast.success(__("Provider created"))
    showNewProvider.value = false
    // Reset form
    newProvider.provider_name = ""
    newProvider.provider_type = "openai"
    newProvider.auth_method = "API Key"
    newProvider.api_key = ""
    newProvider.api_base_url = ""
    newProvider.mask_pii_override = "Global Default"
    newProvider.enabled = true
    newProvider.is_default = false
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : __("Failed to create provider")
    toast.error(msg)
  } finally {
    creatingProvider.value = false
  }
}

async function handleAddKey(provider: string, apiKey: string) {
  try {
    await st.addUserKey(provider, apiKey)
    toast.success(__("API key added"))
  } catch {
    toast.error(__("Failed to add API key"))
  }
}

async function handleDeleteKey(keyName: string) {
  try {
    await st.deleteUserKey(keyName)
    toast.success(__("API key removed"))
  } catch {
    toast.error(__("Failed to remove API key"))
  }
}

async function handleConnectOAuth(providerName: string, providerType: string) {
  await st.connectOAuth(providerName, providerType)
}

async function handleDisconnectOAuth(providerName: string) {
  try {
    await st.disconnectOAuth(providerName)
    toast.success(__("Disconnected"))
  } catch {
    toast.error(__("Failed to disconnect"))
  }
}

// --- Init ---
onMounted(async () => {
  await st.detectRole()
  const tasks: Promise<void>[] = [st.loadProviders(), st.loadUserKeys(), st.loadOAuthStatus()]
  if (st.isAdmin.value) {
    tasks.push(st.loadSettings())
  }
  await Promise.all(tasks)
})

// --- Inline sub-components ---

const SectionTitle = defineComponent({
  props: {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  setup(props) {
    return () =>
      h("div", { class: "mb-1" }, [
        h("h2", { class: "text-sm font-semibold text-gray-900" }, props.title),
        props.description
          ? h("p", { class: "mt-0.5 text-xs text-gray-500" }, props.description)
          : null,
      ])
  },
})

const MyKeysSection = defineComponent({
  props: {
    userKeys: { type: Array, default: () => [] },
    providers: { type: Array, default: () => [] },
    oauthStatus: { type: Object, default: () => ({}) },
  },
  emits: ["add-key", "delete-key", "connect-oauth", "disconnect-oauth"],
  setup(props, { emit }) {
    const newKeyProvider = ref("")
    const newKeyValue = ref("")
    const adding = ref(false)

    async function submitKey() {
      if (!newKeyProvider.value || !newKeyValue.value) return
      adding.value = true
      try {
        emit("add-key", newKeyProvider.value, newKeyValue.value)
        newKeyProvider.value = ""
        newKeyValue.value = ""
      } finally {
        adding.value = false
      }
    }

    const oauthProviders = computed(() => {
      return Object.entries(props.oauthStatus as Record<string, OAuthProviderStatus>)
        .map(([key, val]) => ({ key, ...val }))
    })

    return () =>
      h("div", { class: "space-y-6" }, [
        // Section header
        h("div", {}, [
          h("h2", { class: "text-sm font-semibold text-gray-900" }, __("Your API Keys")),
          h(
            "p",
            { class: "mt-0.5 text-xs text-gray-500" },
            __("Bring your own API key for any provider. Your keys are encrypted and only used for your sessions."),
          ),
        ]),

        // Existing keys
        (props.userKeys as any[]).length
          ? h(
              "div",
              { class: "space-y-2" },
              (props.userKeys as any[]).map((key: any) =>
                h(
                  "div",
                  {
                    key: key.name,
                    class:
                      "flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3",
                  },
                  [
                    h("div", {}, [
                      h("p", { class: "text-sm font-medium text-gray-900" }, key.provider),
                      h(
                        "p",
                        { class: "text-xs text-gray-500" },
                        key.auth_type === "api_key"
                          ? __("API Key") + " •••••"
                          : key.auth_type,
                      ),
                    ]),
                    h(Button, {
                      label: __("Remove"),
                      variant: "subtle",
                      theme: "red",
                      size: "sm",
                      onClick: () => emit("delete-key", key.name),
                    }),
                  ],
                ),
              ),
            )
          : h(
              "p",
              { class: "py-4 text-center text-sm text-gray-400" },
              __("No API keys configured yet."),
            ),

        // Add key form
        h("div", { class: "rounded-lg border border-gray-200 p-4 space-y-3" }, [
          h("h3", { class: "text-sm font-medium text-gray-700" }, __("Add a Key")),
          h("div", { class: "grid gap-3 sm:grid-cols-2" }, [
            h(FormControl, {
              type: "select",
              placeholder: __("Select provider"),
              options: (props.providers as any[])
                .filter((p: any) => p.enabled)
                .map((p: any) => ({ label: p.provider_name, value: p.name })),
              modelValue: newKeyProvider.value,
              "onUpdate:modelValue": (v: string) => {
                newKeyProvider.value = v
              },
            }),
            h(FormControl, {
              type: "text",
              placeholder: __("Paste API key"),
              modelValue: newKeyValue.value,
              "onUpdate:modelValue": (v: string) => {
                newKeyValue.value = v
              },
            }),
          ]),
          h(Button, {
            label: __("Add Key"),
            variant: "solid",
            size: "sm",
            disabled: !newKeyProvider.value || !newKeyValue.value,
            loading: adding.value,
            onClick: submitKey,
          }),
        ]),

        // OAuth section
        oauthProviders.value.length
          ? h("div", { class: "space-y-3" }, [
              h("h3", { class: "text-sm font-semibold text-gray-900" }, __("OAuth Connections")),
              ...oauthProviders.value.map((op) =>
                h(
                  "div",
                  {
                    key: op.key,
                    class:
                      "flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3",
                  },
                  [
                    h("div", { class: "flex items-center gap-2" }, [
                      h("span", { class: "text-sm font-medium text-gray-900" }, op.provider_name),
                      h(Badge, {
                        label: op.connected ? __("Connected") : __("Not connected"),
                        theme: op.connected ? "green" : "gray",
                        variant: "subtle",
                        size: "sm",
                      }),
                    ]),
                    op.connected
                      ? h(Button, {
                          label: __("Disconnect"),
                          variant: "subtle",
                          theme: "red",
                          size: "sm",
                          onClick: () => emit("disconnect-oauth", op.key),
                        })
                      : h(Button, {
                          label: __("Connect"),
                          variant: "solid",
                          size: "sm",
                          onClick: () =>
                            emit("connect-oauth", op.key, op.provider_type),
                        }),
                  ],
                ),
              ),
            ])
          : null,
      ])
  },
})
</script>
