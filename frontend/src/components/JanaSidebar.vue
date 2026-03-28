<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <!-- Mobile backdrop -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 sm:hidden"
    style="z-index: 20; background: rgba(0,0,0,0.5)"
    @click="closeMobile"
  />

  <aside
    :class="[
      'flex flex-col h-full flex-shrink-0 transition-all duration-200',
      collapsed ? 'w-16' : 'w-52',
      'max-sm:fixed max-sm:left-0 max-sm:top-14 max-sm:h-[calc(100vh-3.5rem)] max-sm:z-40',
      mobileOpen ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full',
    ]"
    style="background-color: #7c3aed"
    aria-label="Jana navigation"
  >
    <!-- New Chat button -->
    <div class="pt-3 pb-1">
      <button
        :class="[
          'flex w-full items-center gap-3 rounded-r-lg py-3 min-h-[44px] text-sm font-medium transition-all duration-200 group',
          collapsed ? 'justify-center px-0' : 'px-4',
        ]"
        style="color: white; opacity: 0.9"
        :title="collapsed ? __('New Chat') : undefined"
        @mouseenter="($event.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)'"
        @mouseleave="($event.currentTarget as HTMLElement).style.backgroundColor = ''"
        @click="handleNewChat"
      >
        <Plus class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
        <span v-if="!collapsed">{{ __('New Chat') }}</span>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="py-1 space-y-0.5">
      <router-link
        v-for="item in navItems"
        :key="item.key"
        :to="item.path"
        :class="[
          'group flex items-center gap-3 rounded-r-lg py-3 min-h-[44px] text-sm transition-all duration-200 no-underline relative',
          collapsed ? 'justify-center px-0' : 'px-4',
          isActive(item) ? 'font-semibold' : '',
        ]"
        :style="{
          color: 'white',
          opacity: isActive(item) ? 1 : 0.9,
          backgroundColor: isActive(item) ? 'rgba(255,255,255,0.2)' : undefined,
          borderRight: isActive(item) ? '4px solid white' : undefined,
        }"
        :title="collapsed ? item.label : undefined"
        @mouseenter="($event.currentTarget as HTMLElement).style.backgroundColor = isActive(item) ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'"
        @mouseleave="($event.currentTarget as HTMLElement).style.backgroundColor = isActive(item) ? 'rgba(255,255,255,0.2)' : ''"
      >
        <component
          :is="item.icon"
          :class="[
            'w-5 h-5 flex-shrink-0 transition-transform duration-200',
            isActive(item) ? 'scale-110' : 'group-hover:scale-105',
          ]"
          aria-hidden="true"
        />
        <span v-if="!collapsed" class="flex-1 text-sm">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Agent selector -->
    <div v-if="agents.length > 1 && !collapsed" class="px-3 pt-2">
      <select
        :value="currentAgent"
        class="w-full rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1"
        style="border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;
               --tw-ring-color: rgba(255,255,255,0.5)"
        @change="handleSelectAgent(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="agent in agents" :key="agent.name" :value="agent.agent_name" style="color: #1f2937; background: white">
          {{ agent.agent_name }}
        </option>
      </select>
    </div>

    <!-- Divider -->
    <div v-if="!collapsed" class="mx-3 my-2" style="border-top: 1px solid rgba(255,255,255,0.2)" />

    <!-- Recents label + search -->
    <div v-if="!collapsed" class="px-4 pb-1">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium uppercase tracking-wider" style="color: rgba(255,255,255,0.5)">
          {{ __('Recents') }}
        </span>
        <button
          class="rounded p-0.5 transition-colors"
          style="color: rgba(255,255,255,0.5)"
          :title="__('Search conversations')"
          @mouseenter="($event.currentTarget as HTMLElement).style.color = 'white'"
          @mouseleave="($event.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'"
          @click="searchOpen = !searchOpen"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
      <input
        v-if="searchOpen"
        v-model="searchQuery"
        type="text"
        :placeholder="__('Filter conversations…')"
        class="mt-1.5 w-full rounded-lg px-2.5 py-1 text-sm outline-none"
        style="border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white"
        @keydown.escape="searchOpen = false; searchQuery = ''"
      />
    </div>

    <!-- Session list -->
    <div v-if="!collapsed" class="flex-1 overflow-y-auto px-3 pb-2">
      <!-- Loading -->
      <div v-if="sessionsLoading" class="flex items-center justify-center py-6">
        <div class="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" style="border-color: rgba(255,255,255,0.6); border-top-color: transparent" />
      </div>

      <!-- Empty -->
      <div v-else-if="!filteredSessions.length" class="flex flex-col items-center py-6" style="color: rgba(255,255,255,0.5)">
        <MessageSquare :size="20" class="mb-1.5" />
        <p class="text-xs">{{ searchQuery ? __('No matches') : __('No conversations yet') }}</p>
      </div>

      <!-- Sessions -->
      <div v-else class="space-y-0.5">
        <div
          v-for="session in filteredSessions"
          :key="session.name"
          class="group relative rounded-lg px-3 py-2 cursor-pointer transition-colors"
          :style="{
            color: 'white',
            opacity: session.name === currentSessionId ? 1 : 0.9,
            backgroundColor: session.name === currentSessionId ? 'rgba(255,255,255,0.2)' : undefined,
          }"
          @mouseenter="session.name !== currentSessionId && (($event.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)')"
          @mouseleave="session.name !== currentSessionId && (($event.currentTarget as HTMLElement).style.backgroundColor = '')"
          @click="handleSelectSession(session.name)"
        >
          <div class="flex items-start justify-between gap-1.5">
            <div class="flex-1 min-w-0">
              <!-- Inline rename input -->
              <input
                v-if="renamingId === session.name"
                ref="renameInputRef"
                v-model="renameValue"
                class="w-full rounded px-1.5 py-0.5 text-sm font-medium outline-none ring-1"
                style="border: 1px solid rgba(255,255,255,0.5); background: rgba(255,255,255,0.15); color: white;
                       --tw-ring-color: rgba(255,255,255,0.5)"
                @keydown.enter="submitRename"
                @keydown.escape="cancelRename"
                @blur="submitRename"
                @click.stop
              />
              <p v-else class="text-sm truncate">
                {{ session.session_title || __('Untitled Chat') }}
              </p>
              <span class="text-xs" style="color: rgba(255,255,255,0.5)">
                {{ formatRelativeTime(session.modified) }}
              </span>
            </div>

            <!-- Action menu -->
            <div
              class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              @click.stop
            >
              <button
                class="rounded p-1 transition-colors"
                style="color: rgba(255,255,255,0.6)"
                @mouseenter="($event.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.2)'; ($event.currentTarget as HTMLElement).style.color = 'white'"
                @mouseleave="($event.currentTarget as HTMLElement).style.backgroundColor = ''; ($event.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'"
                @click="toggleMenu(session.name)"
              >
                <MoreVertical :size="14" />
              </button>

              <!-- Dropdown (uses neutral card style — overlaid on colored sidebar) -->
              <div
                v-if="openMenuId === session.name"
                class="absolute right-2 top-full z-10 mt-1 w-36 rounded-lg border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-800 py-1 shadow-lg"
              >
                <button
                  class="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  @click="startRename(session.name, session.session_title)"
                >
                  <Pencil :size="14" />
                  {{ __('Rename') }}
                </button>
                <button
                  class="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  @click="handleArchive(session.name)"
                >
                  <Archive :size="14" />
                  {{ __('Archive') }}
                </button>
                <button
                  class="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  @click="handleDelete(session.name)"
                >
                  <Trash2 :size="14" />
                  {{ __('Delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Spacer when collapsed (recents section hidden) -->
    <div v-if="collapsed" class="flex-1" />

    <!-- Footer -->
    <div class="flex-shrink-0 py-3" :class="collapsed ? 'px-2 text-center' : 'px-4'" style="border-top: 1px solid rgba(255,255,255,0.2)">
      <template v-if="!collapsed">
        <div class="text-sm font-semibold" style="color: rgba(255,255,255,0.8)">
          {{ __('Community Edition') }}
        </div>
        <span class="text-xs" style="color: rgba(255,255,255,0.6)">v{{ appVersion }}</span>
      </template>
      <span v-else class="text-xs" style="color: rgba(255,255,255,0.6)">v{{ appVersion }}</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import {
  Plus, MessageSquare, Bot, FileText,
  MoreVertical, Pencil, Archive, Trash2,
} from "lucide-vue-next"
import { __ } from "@/composables/useTranslate"
import { useChat } from "@/composables/useChat"
import { useAgents } from "@/composables/useAgents"
import type { ChatSessionSummary } from "@/types/jana"

const STORAGE_KEY = "dock-sidebar-collapsed"

const appVersion: string = __APP_VERSION__
const router = useRouter()
const route = useRoute()

const chat = useChat()
const { agents, fetchAgents } = useAgents()

const sessions = chat.sessions
const sessionsLoading = chat.sessionsLoading
const currentSessionId = chat.currentSessionId
const currentAgent = chat.currentAgent

// Sidebar toggle state — mirrors DockSidebarShell behavior
const collapsed = ref<boolean>(localStorage.getItem(STORAGE_KEY) === "true")
const mobileOpen = ref<boolean>(false)

// Session search/filter
const searchOpen = ref(false)
const searchQuery = ref("")
const filteredSessions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return sessions.value
  return sessions.value.filter((s) =>
    (s.session_title || "").toLowerCase().includes(q) ||
    (s.agent || "").toLowerCase().includes(q)
  )
})

function toggleSidebar() {
  if (window.innerWidth <= 576) {
    mobileOpen.value = !mobileOpen.value
  } else {
    collapsed.value = !collapsed.value
    localStorage.setItem(STORAGE_KEY, String(collapsed.value))
  }
}

function closeMobile() {
  mobileOpen.value = false
}

const navItems = [
  { key: "agents",   label: __("Agents"),   icon: Bot,       path: "/jana/agents" },
  { key: "content",  label: __("Content"),  icon: FileText,  path: "/jana/content" },
]

function isActive(item: { path: string; exact?: boolean }) {
  return route.path === item.path || route.path.startsWith(item.path + "/")
}

// --- Session interactions ---
const openMenuId = ref<string | null>(null)
const renamingId = ref<string | null>(null)
const renameValue = ref("")
const renameInputRef = ref<HTMLInputElement[] | null>(null)

function handleNewChat() {
  chat.startNewChat()
  router.push("/jana/chat")
}

async function handleSelectSession(sessionId: string) {
  await chat.loadSession(sessionId)
  router.push("/jana/chat")
}

function handleSelectAgent(agentName: string) {
  chat.startNewChat(agentName)
  router.push("/jana/chat")
}

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
    chat.renameSession(renamingId.value, trimmed)
  }
  renamingId.value = null
  renameValue.value = ""
}

function cancelRename() {
  renamingId.value = null
  renameValue.value = ""
}

async function handleArchive(sessionId: string) {
  openMenuId.value = null
  await chat.archiveSession(sessionId)
  if (chat.currentSessionId.value === sessionId) {
    chat.startNewChat()
  }
  await chat.fetchSessions()
}

async function handleDelete(sessionId: string) {
  if (!confirm(__("Delete this conversation? This cannot be undone."))) return
  openMenuId.value = null
  await chat.deleteSession(sessionId)
  if (chat.currentSessionId.value === sessionId) {
    chat.startNewChat()
  }
  await chat.fetchSessions()
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

onMounted(async () => {
  await Promise.all([chat.fetchSessions(), fetchAgents()])
  document.addEventListener("click", handleClickOutside)
  window.addEventListener("dock:toggleSidebar", toggleSidebar)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
  window.removeEventListener("dock:toggleSidebar", toggleSidebar)
})
</script>
