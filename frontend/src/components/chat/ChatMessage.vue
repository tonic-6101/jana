<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div :class="['flex w-full', message.role === 'user' ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
        message.role === 'user'
          ? 'bg-accent-600 text-white rounded-br-md'
          : 'bg-gray-100 text-gray-900 rounded-bl-md',
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import MarkdownIt from "markdown-it"
import type { ChatMessageUI } from "@/types/jana"

const props = defineProps<{
  message: ChatMessageUI
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
