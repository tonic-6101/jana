<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <aside class="flex flex-col h-full bg-gray-50 border-r border-gray-200">
    <!-- Header -->
    <div class="flex-shrink-0 px-4 py-3 border-b border-gray-200">
      <button
        class="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2
               text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        @click="$emit('new-chat')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {{ __('New Chat') }}
      </button>

      <!-- Agent selector (only when multiple agents exist) -->
      <div v-if="agents.length > 1" class="mt-2">
        <select
          :value="currentAgent"
          class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          @change="$emit('select-agent', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="agent in agents" :key="agent.name" :value="agent.agent_name">
            {{ agent.agent_name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Session list -->
    <div class="flex-1 overflow-y-auto">
      <!-- Loading -->
      <div v-if="sessionsLoading" class="flex items-center justify-center py-8">
        <div class="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>

      <!-- Empty -->
      <div
        v-else-if="!sessions.length"
        class="flex flex-col items-center justify-center py-8 px-4 text-gray-400"
      >
        <svg class="w-8 h-8 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <p class="text-sm text-center">{{ __('No conversations yet') }}</p>
      </div>

      <!-- Sessions -->
      <div v-else class="py-1">
        <div
          v-for="session in sessions"
          :key="session.name"
          :class="[
            'group relative mx-2 my-0.5 rounded-lg px-3 py-2.5 cursor-pointer transition-colors',
            session.name === currentSessionId
              ? 'bg-blue-50 text-blue-900'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
          @click="$emit('select-session', session.name)"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <!-- Inline rename input -->
              <input
                v-if="renamingId === session.name"
                ref="renameInputRef"
                v-model="renameValue"
                class="w-full rounded border border-blue-400 bg-white px-1.5 py-0.5 text-sm
                       font-medium text-gray-900 outline-none ring-1 ring-blue-400"
                @keydown.enter="submitRename"
                @keydown.escape="cancelRename"
                @blur="submitRename"
                @click.stop
              />
              <!-- Normal title -->
              <p v-else class="text-sm font-medium truncate">
                {{ session.session_title || __('Untitled Chat') }}
              </p>
              <div class="flex items-center gap-2 mt-0.5">
                <span v-if="session.agent" class="text-xs text-gray-400 truncate">
                  {{ session.agent }}
                </span>
                <span class="text-xs text-gray-400">
                  {{ formatRelativeTime(session.modified) }}
                </span>
              </div>
            </div>

            <!-- Action menu -->
            <div
              class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              @click.stop
            >
              <button
                class="rounded p-1 hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                @click="toggleMenu(session.name)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                v-if="openMenuId === session.name"
                class="absolute right-2 top-full z-10 mt-1 w-36 rounded-lg border border-gray-200
                       bg-white py-1 shadow-lg"
              >
                <button
                  class="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-700
                         hover:bg-gray-50"
                  @click="startRename(session.name, session.session_title)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  {{ __('Rename') }}
                </button>
                <button
                  class="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-700
                         hover:bg-gray-50"
                  @click="handleArchive(session.name)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  {{ __('Archive') }}
                </button>
                <button
                  class="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-600
                         hover:bg-red-50"
                  @click="handleDelete(session.name)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  {{ __('Delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex-shrink-0 border-t border-gray-200 px-4 py-3 space-y-1.5">
      <router-link
        to="/jana/agents"
        class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        </svg>
        {{ __('Agents') }}
      </router-link>
      <router-link
        to="/jana/content"
        class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        {{ __('Content') }}
      </router-link>
      <router-link
        to="/jana/settings"
        class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65
                   1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65
                   0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65
                   1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0
                   0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65
                   1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0
                   0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65
                   1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0
                   0 0-1.51 1z" />
        </svg>
        {{ __('Settings') }}
      </router-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue"
import { __ } from "@/composables/useTranslate"
import type { ChatSessionSummary, AgentSummary } from "@/types/jana"

defineProps<{
  sessions: ChatSessionSummary[]
  agents: readonly AgentSummary[]
  currentSessionId: string | null
  currentAgent: string
  sessionsLoading: boolean
}>()

const emit = defineEmits<{
  "new-chat": []
  "select-session": [sessionId: string]
  "rename-session": [sessionId: string, title: string]
  "archive-session": [sessionId: string]
  "delete-session": [sessionId: string]
  "select-agent": [agentName: string]
}>()

const openMenuId = ref<string | null>(null)
const renamingId = ref<string | null>(null)
const renameValue = ref("")
const renameInputRef = ref<HTMLInputElement[] | null>(null)

function toggleMenu(sessionId: string) {
  openMenuId.value = openMenuId.value === sessionId ? null : sessionId
}

function startRename(sessionId: string, currentTitle: string | null) {
  openMenuId.value = null
  renamingId.value = sessionId
  renameValue.value = currentTitle || ""
  nextTick(() => {
    const inputs = renameInputRef.value
    if (inputs && inputs.length) {
      inputs[0].focus()
      inputs[0].select()
    }
  })
}

function submitRename() {
  if (!renamingId.value) return
  const trimmed = renameValue.value.trim()
  if (trimmed) {
    emit("rename-session", renamingId.value, trimmed)
  }
  renamingId.value = null
  renameValue.value = ""
}

function cancelRename() {
  renamingId.value = null
  renameValue.value = ""
}

function handleArchive(sessionId: string) {
  openMenuId.value = null
  emit("archive-session", sessionId)
}

function handleDelete(sessionId: string) {
  if (!confirm(__("Delete this conversation? This cannot be undone."))) return
  openMenuId.value = null
  emit("delete-session", sessionId)
}

function formatRelativeTime(dateStr: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return __("just now")
  if (diffMin < 60) return `${diffMin}m`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d`
  return date.toLocaleDateString()
}

function handleClickOutside(e: MouseEvent) {
  if (openMenuId.value && !(e.target as HTMLElement).closest("[data-menu]")) {
    openMenuId.value = null
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside))
onUnmounted(() => document.removeEventListener("click", handleClickOutside))
</script>
