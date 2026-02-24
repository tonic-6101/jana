<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link
            to="/jana/chat"
            class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            :title="__('Back to Chat')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </router-link>
          <h1 class="text-lg font-semibold text-gray-900">{{ __('Agents') }}</h1>
        </div>
        <router-link
          v-if="isAdmin"
          to="/jana/agents/new"
          class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {{ __('New Agent') }}
        </router-link>
      </div>
    </header>

    <!-- Content -->
    <div class="mx-auto max-w-5xl px-6 py-6">
      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-16 text-gray-400"
      >
        <svg class="w-12 h-12 mb-3 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p class="text-sm font-medium text-gray-600 mb-1">{{ error }}</p>
        <button
          class="mt-3 rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          @click="loadAll"
        >
          {{ __('Retry') }}
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="!agents.length"
        class="flex flex-col items-center justify-center py-16 text-gray-400"
      >
        <svg class="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        </svg>
        <p class="text-sm font-medium mb-1">{{ __('No agents yet') }}</p>
        <p class="text-xs">{{ __('Create your first AI agent to get started.') }}</p>
      </div>

      <!-- Agent grid -->
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="agent in agents"
          :key="agent.name"
          :to="`/jana/agents/${encodeURIComponent(agent.name)}`"
          class="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                </svg>
              </div>
              <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {{ agent.agent_name }}
              </h3>
            </div>
          </div>

          <p
            v-if="agent.description"
            class="text-xs text-gray-500 line-clamp-2 mb-3"
          >
            {{ agent.description }}
          </p>
          <p v-else class="text-xs text-gray-300 italic mb-3">
            {{ __('No description') }}
          </p>

          <div class="flex flex-wrap gap-1.5">
            <span
              v-if="agent.provider"
              class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {{ agent.provider }}
            </span>
            <span
              v-if="agent.model"
              class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
            >
              {{ agent.model }}
            </span>
            <span
              v-if="!agent.provider && !agent.model"
              class="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-400"
            >
              {{ __('Default') }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { __ } from "@/composables/useTranslate"
import type { AgentSummary } from "@/types/jana"

const route = useRoute()

const agents = ref<AgentSummary[]>([])
const loading = ref(true)
const isAdmin = ref(false)
const error = ref("")

async function apiCall(method: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const { call } = await import("frappe-ui")
  return call(method, args)
}

async function detectRole(): Promise<void> {
  try {
    const result = (await apiCall("jana.api.agents.check_admin")) as { is_admin: boolean }
    isAdmin.value = result.is_admin
  } catch (err) {
    console.error("[Jana] Failed to detect user role:", err)
    isAdmin.value = false
  }
}

async function loadAgents(): Promise<void> {
  loading.value = true
  error.value = ""
  try {
    const result = await apiCall("jana.api.agents.list_agents")
    agents.value = result as AgentSummary[]
  } catch (err) {
    console.error("[Jana] Failed to load agents:", err)
    error.value = __("Could not load agents. Please refresh the page.")
    agents.value = []
  } finally {
    loading.value = false
  }
}

async function loadAll(): Promise<void> {
  await Promise.all([detectRole(), loadAgents()])
}

onMounted(loadAll)

// Reload agents when navigating back to this page (belt-and-suspenders)
watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/jana/agents") {
      loadAll()
    }
  },
)
</script>
