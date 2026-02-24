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
          ? 'bg-blue-600 text-white rounded-br-md'
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
</script>
