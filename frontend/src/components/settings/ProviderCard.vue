<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="rounded-xl border border-gray-200 bg-white transition-shadow" :class="expanded ? 'shadow-md' : ''">
    <!-- Header row (always visible) -->
    <div
      class="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none"
      @click="expanded = !expanded"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
          :class="typeColorClasses"
        >
          {{ provider.provider_type.slice(0, 2).toUpperCase() }}
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-sm font-semibold text-gray-900 truncate">{{ provider.provider_name }}</h3>
            <span
              class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              :class="typeColorClasses"
            >
              {{ provider.provider_type }}
            </span>
            <span
              v-if="provider.is_default"
              class="inline-flex items-center rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-600"
            >
              {{ __('Default') }}
            </span>
            <span
              v-if="!provider.enabled"
              class="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500"
            >
              {{ __('Disabled') }}
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">
            {{ provider.auth_method }}
            <template v-if="provider.api_base_url"> · {{ provider.api_base_url }}</template>
          </p>
        </div>
      </div>

      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        class="flex-shrink-0 text-gray-400 transition-transform"
        :class="expanded ? 'rotate-180' : ''"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>

    <!-- Expandable form -->
    <div v-if="expanded" class="border-t border-gray-100 px-4 py-4 space-y-5">
      <!-- Provider Type + Enabled + Default -->
      <div class="grid gap-4 sm:grid-cols-3">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Provider Type') }}</label>
          <select
            :value="local.provider_type"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            @change="local.provider_type = ($event.target as HTMLSelectElement).value as any"
          >
            <option v-for="t in providerTypes" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </div>
        <div class="flex items-end gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="local.enabled"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
            />
            <span class="text-sm text-gray-700">{{ __('Enabled') }}</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="local.is_default"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
            />
            <span class="text-sm text-gray-700">{{ __('Is Default') }}</span>
          </label>
        </div>
      </div>

      <!-- Connection -->
      <div>
        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ __('Connection') }}</h4>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Authentication') }}</label>
            <select
              :value="local.auth_method"
              class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              @change="local.auth_method = ($event.target as HTMLSelectElement).value as any"
            >
              <option value="API Key">{{ __('API Key') }}</option>
              <option value="OAuth">{{ __('OAuth') }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('API Base URL') }}</label>
            <input
              v-model="local.api_base_url"
              type="text"
              :placeholder="basePlaceholder"
              class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                     placeholder:text-gray-300
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
            <p class="text-xs text-gray-400 mt-0.5">
              {{ __('Required for Ollama, vLLM, or custom endpoints.') }}
            </p>
          </div>
        </div>
      </div>

      <!-- API Key -->
      <div v-if="local.auth_method === 'API Key'">
        <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('API Key') }}</label>
        <div class="flex gap-2">
          <input
            v-model="local.api_key"
            type="password"
            :placeholder="provider.has_api_key ? __('••••••••  (key set, enter new to replace)') : __('Paste your API key')"
            class="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   placeholder:text-gray-300
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          />
        </div>
      </div>

      <!-- Models -->
      <div>
        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ __('Models') }}</h4>
        <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Available Models') }}</label>
        <textarea
          v-model="local.available_models"
          rows="3"
          :placeholder="__('Comma-separated list of available model names')"
          class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                 placeholder:text-gray-300
                 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 resize-y"
        />
      </div>

      <!-- Privacy -->
      <div>
        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ __('Privacy') }}</h4>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('PII Masking') }}</label>
          <select
            :value="local.mask_pii_override"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            @change="local.mask_pii_override = ($event.target as HTMLSelectElement).value as any"
          >
            <option value="Global Default">{{ __('Global Default') }}</option>
            <option value="Always On">{{ __('Always On') }}</option>
            <option value="Always Off">{{ __('Always Off') }}</option>
          </select>
          <p class="text-xs text-gray-400 mt-0.5">
            {{ __("Override the global PII masking setting for this provider. 'Global Default' inherits from Jana Settings.") }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="flex items-center gap-2">
          <!-- Test Connection -->
          <button
            class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium
                   text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            :disabled="testing || !provider.enabled"
            @click.stop="$emit('test', provider.name)"
          >
            <div v-if="testing" class="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            <template v-else>{{ __('Test Connection') }}</template>
          </button>
          <span v-if="testResult" class="text-xs">
            <span v-if="testResult.success" class="text-green-600">{{ __('OK') }} ({{ testResult.latency_ms }}ms)</span>
            <span v-else class="text-red-500">{{ testResult.message }}</span>
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
            @click.stop="$emit('delete', provider.name)"
          >
            {{ __('Delete') }}
          </button>
          <button
            class="rounded-lg bg-accent-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-accent-700 transition-colors disabled:opacity-50"
            :disabled="savingLocal || !localDirty"
            @click.stop="handleSave"
          >
            {{ savingLocal ? __('Saving…') : __('Save Provider') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { __ } from "@/composables/useTranslate"
import type { JanaProvider, ConnectionTestResult, ProviderType, AuthMethod, PiiOverride } from "@/types/jana"

const props = defineProps<{
  provider: JanaProvider
  testResult?: ConnectionTestResult
  testing: boolean
}>()

const emit = defineEmits<{
  test: [providerName: string]
  save: [providerName: string, data: Record<string, unknown>]
  delete: [providerName: string]
}>()

const expanded = ref(false)
const savingLocal = ref(false)

const providerTypes = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "google", label: "Google" },
  { value: "openrouter", label: "OpenRouter" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "custom", label: "Custom" },
]

// Local editable copy
const local = reactive({
  provider_type: props.provider.provider_type as ProviderType,
  enabled: !!props.provider.enabled,
  is_default: !!props.provider.is_default,
  auth_method: props.provider.auth_method as AuthMethod,
  api_base_url: props.provider.api_base_url || "",
  api_key: "",
  available_models: props.provider.available_models || "",
  mask_pii_override: (props.provider.mask_pii_override || "Global Default") as PiiOverride,
})

// Sync local state when provider prop changes externally
watch(() => props.provider, (p) => {
  local.provider_type = p.provider_type
  local.enabled = !!p.enabled
  local.is_default = !!p.is_default
  local.auth_method = p.auth_method
  local.api_base_url = p.api_base_url || ""
  local.api_key = ""
  local.available_models = p.available_models || ""
  local.mask_pii_override = (p.mask_pii_override || "Global Default") as PiiOverride
}, { deep: true })

const localDirty = computed(() => {
  const p = props.provider
  return (
    local.provider_type !== p.provider_type ||
    local.enabled !== !!p.enabled ||
    local.is_default !== !!p.is_default ||
    local.auth_method !== p.auth_method ||
    local.api_base_url !== (p.api_base_url || "") ||
    local.api_key !== "" ||
    local.available_models !== (p.available_models || "") ||
    local.mask_pii_override !== (p.mask_pii_override || "Global Default")
  )
})

const basePlaceholder = computed(() => {
  if (local.provider_type === "ollama") return "http://localhost:11434"
  if (local.provider_type === "vllm") return "http://localhost:8000/v1"
  if (local.provider_type === "openrouter") return "https://openrouter.ai/api/v1"
  return __("Optional")
})

const TYPE_COLORS: Record<string, string> = {
  openai: "bg-sky-50 text-sky-700",
  anthropic: "bg-orange-50 text-orange-700",
  google: "bg-green-50 text-green-700",
  openrouter: "bg-purple-50 text-purple-700",
  ollama: "bg-gray-100 text-gray-700",
  vllm: "bg-gray-100 text-gray-700",
  custom: "bg-gray-100 text-gray-700",
}

const typeColorClasses = computed(() => TYPE_COLORS[props.provider.provider_type] ?? "bg-gray-100 text-gray-700")

function handleSave() {
  const data: Record<string, unknown> = {
    provider_type: local.provider_type,
    enabled: local.enabled ? 1 : 0,
    is_default: local.is_default ? 1 : 0,
    auth_method: local.auth_method,
    api_base_url: local.api_base_url || null,
    available_models: local.available_models || null,
    mask_pii_override: local.mask_pii_override,
  }
  if (local.api_key) {
    data.api_key = local.api_key
  }
  emit("save", props.provider.name, data)
}
</script>
