<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div ref="containerRef" class="flex-1 overflow-y-auto px-4 py-6 space-y-4">
    <!-- Empty state -->
    <div
      v-if="!messages.length && !sending"
      class="flex flex-col items-center justify-center h-full text-gray-400"
    >
      <svg
        class="w-12 h-12 mb-4 text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <p class="text-lg font-medium">{{ __('Start a conversation') }}</p>
      <p class="text-sm mt-1">{{ __('Type a message below to begin.') }}</p>
    </div>

    <!-- Connection error banner -->
    <div
      v-if="connectionError"
      class="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 text-sm text-red-700 dark:text-red-300"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {{ __('Connection issue — check your provider configuration in Settings.') }}
    </div>

    <!-- Messages -->
    <ChatMessage
      v-for="msg in messages"
      :key="msg.localId"
      :message="msg"
      @retry="$emit('retry', $event)"
    />

    <!-- Typing indicator -->
    <div v-if="sending && !streaming" class="flex items-start">
      <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
        <div class="typing-dots flex gap-1">
          <span /><span /><span />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue"
import { __ } from "@/composables/useTranslate"
import ChatMessage from "./ChatMessage.vue"
import type { ChatMessageUI } from "@/types/jana"

const props = defineProps<{
  messages: ChatMessageUI[]
  sending: boolean
  streaming: boolean
  connectionError?: boolean
}>()

defineEmits<{
  retry: [localId: string]
}>()

const containerRef = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight
    }
  })
}

watch(
  () => [props.messages.length, props.messages.at(-1)?.content],
  scrollToBottom,
)

watch(() => props.sending, scrollToBottom)

onMounted(scrollToBottom)
</script>
