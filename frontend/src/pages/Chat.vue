<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <TermsAcceptanceModal v-if="!termsAccepted" @accepted="onTermsAccepted" />
  <div v-else class="flex h-screen bg-white">
    <!-- Sidebar (desktop: always visible, mobile: overlay) -->
    <div
      :class="[
        'flex-shrink-0 w-72 h-full z-30',
        'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:shadow-xl',
        sidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
        'md:relative md:translate-x-0',
        'transition-transform duration-200 ease-in-out',
      ]"
    >
      <ChatSidebar
        :sessions="chat.sessions.value"
        :agents="agents"
        :current-session-id="chat.currentSessionId.value"
        :current-agent="chat.currentAgent.value"
        :sessions-loading="chat.sessionsLoading.value"
        @new-chat="handleNewChat"
        @select-session="handleSelectSession"
        @rename-session="handleRenameSession"
        @archive-session="handleArchiveSession"
        @delete-session="handleDeleteSession"
        @select-agent="handleSelectAgent"
      />
    </div>

    <!-- Backdrop (mobile only) -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-20 bg-black/30 md:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main chat area -->
    <div class="flex flex-1 flex-col min-w-0">
      <!-- Header -->
      <header class="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 flex-shrink-0">
        <!-- Mobile menu button -->
        <button
          class="md:hidden rounded-lg p-1.5 hover:bg-gray-100 text-gray-500"
          @click="sidebarOpen = true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div class="flex-1 min-w-0">
          <h1 class="text-sm font-semibold text-gray-900 truncate">
            {{ sessionTitle }}
          </h1>
          <p class="text-xs text-gray-400">{{ chat.currentAgent.value }}</p>
        </div>
      </header>

      <DisclaimerBanner />

      <!-- Messages -->
      <ChatMessages
        :messages="chat.messages.value"
        :sending="chat.sending.value"
        :streaming="chat.streaming.value"
      />

      <!-- Input -->
      <ChatInput
        ref="chatInputRef"
        :disabled="chat.sending.value"
        @send="handleSend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { __ } from "@/composables/useTranslate"
import { useChat } from "@/composables/useChat"
import { useAgents } from "@/composables/useAgents"
import ChatSidebar from "@/components/chat/ChatSidebar.vue"
import ChatMessages from "@/components/chat/ChatMessages.vue"
import ChatInput from "@/components/chat/ChatInput.vue"
import DisclaimerBanner from "@/components/chat/DisclaimerBanner.vue"
import TermsAcceptanceModal from "@/components/TermsAcceptanceModal.vue"

const termsAccepted = ref(
  (window as any).frappe?.boot?.jana?.terms_accepted ?? false,
)

function onTermsAccepted(): void {
  termsAccepted.value = true
}

const chat = useChat()
const { agents, fetchAgents } = useAgents()

const sidebarOpen = ref(false)
const chatInputRef = ref<InstanceType<typeof ChatInput> | null>(null)

const sessionTitle = computed(() => {
  if (!chat.currentSessionId.value) return __("New Chat")
  const session = chat.sessions.value.find(
    (s) => s.name === chat.currentSessionId.value,
  )
  return session?.session_title || __("Untitled Chat")
})

onMounted(async () => {
  await Promise.all([chat.fetchSessions(), fetchAgents()])
  chatInputRef.value?.focus()
})

async function handleSend(content: string) {
  const isNew = !chat.currentSessionId.value
  await chat.sendMessage(content)
  if (isNew) {
    await chat.fetchSessions()
  }
}

async function handleSelectSession(sessionId: string) {
  sidebarOpen.value = false
  await chat.loadSession(sessionId)
  chatInputRef.value?.focus()
}

function handleNewChat() {
  sidebarOpen.value = false
  chat.startNewChat()
  chatInputRef.value?.focus()
}

function handleSelectAgent(agentName: string) {
  chat.startNewChat(agentName)
  chatInputRef.value?.focus()
}

async function handleRenameSession(sessionId: string, title: string) {
  await chat.renameSession(sessionId, title)
}

async function handleArchiveSession(sessionId: string) {
  await chat.archiveSession(sessionId)
  if (chat.currentSessionId.value === sessionId) {
    chat.startNewChat()
  }
  await chat.fetchSessions()
}

async function handleDeleteSession(sessionId: string) {
  await chat.deleteSession(sessionId)
  if (chat.currentSessionId.value === sessionId) {
    chat.startNewChat()
  }
  await chat.fetchSessions()
}

// Close sidebar on route change (mobile)
watch(() => chat.currentSessionId.value, () => {
  sidebarOpen.value = false
})
</script>
