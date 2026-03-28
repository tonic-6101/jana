<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div :class="['flex w-full', message.role === 'user' ? 'justify-end' : 'justify-start']">
    <div class="max-w-[80%]">
      <div
        :class="[
          'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          message.role === 'user'
            ? 'bg-accent-600 text-white rounded-br-md'
            : message.error
              ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-bl-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md',
          message.streaming ? 'streaming-cursor' : '',
        ]"
      >
        <div
          v-if="message.role === 'user'"
          class="whitespace-pre-wrap"
        >{{ message.content }}</div>
        <div
          v-else
          class="chat-markdown"
          v-html="renderedContent"
          @click="handleLinkClick"
        />
      </div>
      <!-- Meta row: tokens + retry -->
      <div class="flex items-center gap-2 mt-1 px-1">
        <span
          v-if="message.tokens_used && !message.error"
          class="text-xs text-gray-400 dark:text-gray-500"
        >
          {{ message.tokens_used }} {{ __('tokens') }}
          <template v-if="message.model"> · {{ message.model }}</template>
        </span>
        <button
          v-if="message.error && message.retryContent"
          class="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
          @click="$emit('retry', message.localId)"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {{ __('Retry') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import MarkdownIt from "markdown-it"
import { __ } from "@/composables/useTranslate"
import type { ChatMessageUI } from "@/types/jana"

const props = defineProps<{
  message: ChatMessageUI
}>()

defineEmits<{
  retry: [localId: string]
}>()

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true,
})

const renderedContent = computed(() => {
  return md.render(props.message.content || "")
})

/**
 * Intercept clicks on internal Frappe links inside assistant messages.
 * Opens /app/... routes in the same window (navigates to Frappe Desk).
 * External links open in a new tab.
 */
function handleLinkClick(event: MouseEvent): void {
  const target = event.target as HTMLElement
  const link = target.closest("a")
  if (!link) return

  const href = link.getAttribute("href")
  if (!href) return

  if (href.startsWith("/app/") || href.startsWith("/api/")) {
    event.preventDefault()
    event.stopPropagation()
    window.location.href = href
  } else if (href.startsWith("http")) {
    // External links open in a new tab
    event.preventDefault()
    event.stopPropagation()
    window.open(href, "_blank", "noopener,noreferrer")
  }
}
</script>
