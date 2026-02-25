<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div
    v-if="visible"
    class="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs leading-snug text-amber-800 flex-shrink-0"
  >
    <svg
      class="mt-0.5 flex-shrink-0 text-amber-500"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <span class="flex-1">{{ __('Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.') }}</span>
    <button
      class="flex-shrink-0 rounded p-0.5 hover:bg-amber-100 text-amber-700"
      :title="__('Dismiss')"
      @click="dismiss"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { __ } from "@/composables/useTranslate"

const dismissed = ref(false)

const capabilities = computed(() => {
  const boot = (window as any).frappe?.boot?.jana
  return boot?.capabilities || {}
})

const visible = computed(() =>
  (capabilities.value.create_documents || capabilities.value.modify_documents)
  && !dismissed.value,
)

function dismiss(): void {
  dismissed.value = true
  try {
    sessionStorage.setItem("jana_disclaimer_dismissed", "1")
  } catch {
    // sessionStorage unavailable
  }
}

onMounted(() => {
  try {
    dismissed.value = sessionStorage.getItem("jana_disclaimer_dismissed") === "1"
  } catch {
    // sessionStorage unavailable
  }
})
</script>
