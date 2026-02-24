<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="rounded-lg border border-gray-200 p-4">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="text-sm font-semibold text-gray-900">{{ provider.provider_name }}</h3>
          <Badge :label="provider.provider_type" :theme="typeTheme" variant="subtle" size="sm" />
          <Badge
            v-if="provider.is_default"
            :label="__('Default')"
            theme="blue"
            variant="outline"
            size="sm"
          />
          <Badge
            v-if="!provider.enabled"
            :label="__('Disabled')"
            theme="gray"
            variant="subtle"
            size="sm"
          />
        </div>
        <p class="mt-1 text-xs text-gray-500">
          {{ provider.auth_method }}
          <template v-if="provider.api_base_url"> &middot; {{ provider.api_base_url }}</template>
        </p>
      </div>

      <a
        :href="`/app/jana-provider/${provider.name}`"
        target="_blank"
        class="flex-shrink-0 rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        :title="__('Edit in Desk')"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </a>
    </div>

    <!-- Test connection -->
    <div class="mt-3 flex items-center gap-3">
      <Button
        :label="__('Test Connection')"
        variant="subtle"
        size="sm"
        :loading="testing"
        :disabled="!provider.enabled"
        @click="$emit('test', provider.name)"
      />
      <div v-if="testResult" class="text-xs">
        <span v-if="testResult.success" class="text-green-600">
          {{ __('Connected') }} ({{ testResult.latency_ms }}ms)
        </span>
        <span v-else class="text-red-600">
          {{ testResult.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Button, Badge } from "frappe-ui"
import { __ } from "@/composables/useTranslate"
import type { JanaProvider, ConnectionTestResult } from "@/types/jana"

const props = defineProps<{
  provider: JanaProvider
  testResult?: ConnectionTestResult
  testing: boolean
}>()

defineEmits<{
  test: [providerName: string]
}>()

const TYPE_THEMES: Record<string, string> = {
  openai: "blue",
  anthropic: "orange",
  google: "green",
  openrouter: "gray",
  ollama: "gray",
  vllm: "gray",
  custom: "gray",
}

const typeTheme = computed(() => TYPE_THEMES[props.provider.provider_type] ?? "gray")
</script>
