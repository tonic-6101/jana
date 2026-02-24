<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="border-t bg-white px-4 py-3 flex-shrink-0">
    <div class="flex items-end gap-2 max-w-3xl mx-auto">
      <textarea
        ref="textareaRef"
        v-model="input"
        :placeholder="__('Type a message...')"
        :disabled="disabled"
        @keydown="handleKeydown"
        rows="1"
        class="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5
               text-sm focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1
               focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        class="flex-shrink-0 rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700
               disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        :disabled="!input.trim() || disabled"
        @click="handleSend"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
    <p class="text-xs text-gray-400 text-center mt-1.5">
      {{ __('Press Enter to send, Shift+Enter for new line') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue"
import { __ } from "@/composables/useTranslate"

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  send: [content: string]
}>()

const input = ref("")
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = "auto"
  el.style.height = Math.min(el.scrollHeight, 200) + "px"
}

watch(input, () => nextTick(autoResize))

function handleSend() {
  const content = input.value.trim()
  if (!content) return
  emit("send", content)
  input.value = ""
  nextTick(autoResize)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function focus() {
  textareaRef.value?.focus()
}

defineExpose({ focus })
</script>
