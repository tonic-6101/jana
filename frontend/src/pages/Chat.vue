<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <TermsAcceptanceModal v-if="showTermsModal" @accepted="onTermsAccepted" @declined="onTermsDeclined" />

  <!-- Terms not accepted: show friendly disabled state -->
  <div v-if="!termsAccepted && !showTermsModal" class="flex h-full items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-sm text-center px-6">
      <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ __('Terms of Use required') }}</h2>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ __('You need to accept the Terms of Use before using Jana chat.') }}
      </p>
      <button
        class="mt-4 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 transition-colors"
        @click="showTermsModal = true"
      >
        {{ __('Review Terms of Use') }}
      </button>
    </div>
  </div>

  <!-- Chat area (full width — sidebar is now in App.vue) -->
  <div v-else-if="termsAccepted" class="flex h-full flex-col bg-white dark:bg-gray-900">
    <!-- Header -->
    <header class="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h1 class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
          {{ sessionTitle }}
        </h1>
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ chat.currentAgent.value }}</p>
      </div>
      <!-- Export -->
      <button
        v-if="chat.messages.value.length"
        class="rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        :title="__('Export conversation as JSON')"
        @click="handleExport"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
    </header>

    <DisclaimerBanner />

    <!-- Messages -->
    <ChatMessages
      :messages="chat.messages.value"
      :sending="chat.sending.value"
      :streaming="chat.streaming.value"
      :connection-error="chat.connectionError.value"
      @retry="chat.retryMessage($event)"
    />

    <!-- Input -->
    <ChatInput
      ref="chatInputRef"
      :disabled="chat.sending.value"
      @send="handleSend"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { __ } from "@/composables/useTranslate"
import { useChat } from "@/composables/useChat"
import ChatMessages from "@/components/chat/ChatMessages.vue"
import ChatInput from "@/components/chat/ChatInput.vue"
import DisclaimerBanner from "@/components/chat/DisclaimerBanner.vue"
import TermsAcceptanceModal from "@/components/TermsAcceptanceModal.vue"

const termsAccepted = ref(
  window.frappe?.boot?.jana?.terms_accepted ?? false,
)
const showTermsModal = ref(!termsAccepted.value)

function onTermsAccepted(): void {
  termsAccepted.value = true
  showTermsModal.value = false
}

function onTermsDeclined(): void {
  showTermsModal.value = false
}

const chat = useChat()
const chatInputRef = ref<InstanceType<typeof ChatInput> | null>(null)

const sessionTitle = computed(() => {
  if (!chat.currentSessionId.value) return __("New Chat")
  const session = chat.sessions.value.find(
    (s) => s.name === chat.currentSessionId.value,
  )
  return session?.session_title || __("Untitled Chat")
})

function handleExport(): void {
  const data = chat.exportSession()
  if (!data) return
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `jana-chat-${data.session_id || "new"}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function handleKeydown(e: KeyboardEvent): void {
  // Esc — stop streaming if active
  if (e.key === "Escape" && chat.streaming.value) {
    chat.abortStream()
  }
  // Ctrl+/ or Cmd+/ — focus chat input
  if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    chatInputRef.value?.focus()
  }
}

onMounted(() => {
  chatInputRef.value?.focus()
  document.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown)
})

async function handleSend(content: string) {
  const isNew = !chat.currentSessionId.value
  await chat.sendMessage(content)
  if (isNew) {
    await chat.fetchSessions()
  }
}
</script>
