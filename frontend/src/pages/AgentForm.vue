<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-3xl px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link
            to="/jana/agents"
            class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            :title="__('Back to Agents')"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </router-link>
          <h1 class="text-lg font-semibold text-gray-900">
            {{ form.isNew.value ? __('New Agent') : form.agentName.value }}
          </h1>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="!form.isNew.value"
            class="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            :disabled="form.deleting.value"
            @click="handleDelete"
          >
            {{ form.deleting.value ? __('Deleting…') : __('Delete') }}
          </button>
          <button
            class="rounded-lg bg-accent-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-accent-700 transition-colors disabled:opacity-50"
            :disabled="form.saving.value || !canSave"
            @click="handleSave"
          >
            {{ form.saving.value ? __('Saving…') : __('Save') }}
          </button>
        </div>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="form.loading.value" class="flex items-center justify-center py-16">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-accent-600 border-t-transparent" />
    </div>

    <!-- Form -->
    <div v-else class="mx-auto max-w-3xl px-6 py-6 space-y-8">
      <!-- Basic Info -->
      <section>
        <h2 class="text-sm font-semibold text-gray-900 mb-4">{{ __('Basic Information') }}</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ __('Agent Name') }} *</label>
            <input
              v-model="form.agentName.value"
              type="text"
              :disabled="!form.isNew.value"
              :placeholder="__('e.g. Accounting Assistant')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                     placeholder:text-gray-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400
                     disabled:bg-gray-50 disabled:text-gray-500"
            />
            <p v-if="!form.isNew.value" class="mt-1 text-xs text-gray-400">
              {{ __('Agent name cannot be changed after creation.') }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ __('Description') }}</label>
            <input
              v-model="form.description.value"
              type="text"
              :placeholder="__('Brief description of what this agent does')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                     placeholder:text-gray-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
          </div>
        </div>
      </section>

      <!-- System Prompt -->
      <section>
        <h2 class="text-sm font-semibold text-gray-900 mb-1">{{ __('System Prompt') }} *</h2>
        <p class="text-xs text-gray-400 mb-3">
          {{ __('Instructions that define the agent\'s behavior, personality, and capabilities.') }}
        </p>
        <textarea
          v-model="form.systemPrompt.value"
          rows="10"
          :placeholder="__('You are a helpful assistant that...')"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 font-mono
                 placeholder:text-gray-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400
                 resize-y"
        />
      </section>

      <!-- Model Configuration -->
      <section>
        <h2 class="text-sm font-semibold text-gray-900 mb-4">{{ __('Model Configuration') }}</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ __('Provider') }}</label>
            <select
              :value="form.provider.value ?? ''"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              @change="handleProviderChange"
            >
              <option value="">{{ __('Default (from settings)') }}</option>
              <option
                v-for="p in form.providers.value"
                :key="p.name"
                :value="p.name"
              >
                {{ p.provider_name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ __('Model') }}</label>
            <select
              v-if="form.availableModels.value.length"
              :value="form.model.value ?? ''"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              @change="form.model.value = ($event.target as HTMLSelectElement).value || null"
            >
              <option value="">{{ __('Default (from settings)') }}</option>
              <option v-for="m in form.availableModels.value" :key="m" :value="m">{{ m }}</option>
            </select>
            <input
              v-else
              v-model="modelInput"
              type="text"
              :placeholder="form.provider.value ? __('Loading models…') : __('Select a provider first, or type a model name')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                     placeholder:text-gray-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              @input="form.model.value = modelInput || null"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ __('Temperature') }}
              <span class="font-normal text-gray-400">({{ form.temperature.value.toFixed(1) }})</span>
            </label>
            <input
              v-model.number="form.temperature.value"
              type="range"
              min="0"
              max="2"
              step="0.1"
              class="w-full accent-accent-600"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>{{ __('Precise') }}</span>
              <span>{{ __('Creative') }}</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ __('Max Tokens') }}</label>
            <input
              v-model.number="form.maxTokens.value"
              type="number"
              min="0"
              step="256"
              :placeholder="__('0 = use model default')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
                     placeholder:text-gray-400 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
          </div>
        </div>
      </section>

      <!-- Tools -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <div>
            <h2 class="text-sm font-semibold text-gray-900">{{ __('Tools') }}</h2>
            <p class="text-xs text-gray-400 mt-0.5">{{ __('Functions this agent can call.') }}</p>
          </div>
        </div>

        <!-- Selected tools -->
        <div v-if="form.tools.value.length" class="space-y-2 mb-3">
          <div
            v-for="row in form.tools.value"
            :key="row.tool"
            class="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-sm text-gray-900 truncate">{{ toolLabel(row.tool) }}</span>
              <span class="text-xs text-gray-400 truncate">{{ toolDescription(row.tool) }}</span>
            </div>
            <button
              class="flex-shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              :title="__('Remove')"
              @click="form.removeTool(row.tool)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Add tool -->
        <div v-if="unselectedTools.length">
          <select
            class="w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm
                   text-gray-500 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            @change="handleAddTool"
          >
            <option value="">{{ __('+ Add a tool…') }}</option>
            <option v-for="t in unselectedTools" :key="t.name" :value="t.name">
              {{ t.tool_name }} — {{ t.description }}
            </option>
          </select>
        </div>

        <p v-if="!form.availableTools.value.length" class="text-xs text-gray-400 italic">
          {{ __('No tools configured. Create tools in Desk first.') }}
        </p>
      </section>

      <!-- Knowledge -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <div>
            <h2 class="text-sm font-semibold text-gray-900">{{ __('Knowledge') }}</h2>
            <p class="text-xs text-gray-400 mt-0.5">{{ __('Articles injected into the agent\'s context.') }}</p>
          </div>
        </div>

        <!-- Selected knowledge -->
        <div v-if="form.knowledge.value.length" class="space-y-2 mb-3">
          <div
            v-for="row in form.knowledge.value"
            :key="row.knowledge_article"
            class="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-sm text-gray-900 truncate">{{ knowledgeLabel(row.knowledge_article) }}</span>
              <span class="text-xs text-gray-400">{{ knowledgeCategory(row.knowledge_article) }}</span>
            </div>
            <button
              class="flex-shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              :title="__('Remove')"
              @click="form.removeKnowledge(row.knowledge_article)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Add knowledge -->
        <div v-if="unselectedKnowledge.length">
          <select
            class="w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm
                   text-gray-500 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            @change="handleAddKnowledge"
          >
            <option value="">{{ __('+ Add a knowledge article…') }}</option>
            <option v-for="k in unselectedKnowledge" :key="k.name" :value="k.name">
              {{ k.article_title }} ({{ k.category }})
            </option>
          </select>
        </div>

        <p v-if="!form.availableKnowledge.value.length" class="text-xs text-gray-400 italic">
          {{ __('No knowledge articles configured. Create articles in Desk first.') }}
        </p>
      </section>

      <!-- Advanced -->
      <section>
        <h2 class="text-sm font-semibold text-gray-900 mb-4">{{ __('Advanced') }}</h2>
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="form.isTemplate.value"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
          />
          <div>
            <span class="text-sm text-gray-700">{{ __('Mark as Template') }}</span>
            <p class="text-xs text-gray-400">
              {{ __('Templates are blueprints that can be shared and installed by other users.') }}
            </p>
          </div>
        </label>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { __ } from "@/composables/useTranslate"
import { useAgentForm } from "@/composables/useAgentForm"

const route = useRoute()
const router = useRouter()
const form = useAgentForm()

const modelInput = ref("")

const canSave = computed(() => {
  return form.agentName.value.trim() && form.systemPrompt.value.trim() && form.dirty.value
})

const unselectedTools = computed(() => {
  const selected = new Set(form.tools.value.map((t) => t.tool))
  return form.availableTools.value.filter((t) => !selected.has(t.name))
})

const unselectedKnowledge = computed(() => {
  const selected = new Set(form.knowledge.value.map((k) => k.knowledge_article))
  return form.availableKnowledge.value.filter((k) => !selected.has(k.name))
})

function toolLabel(toolName: string): string {
  const t = form.availableTools.value.find((t) => t.name === toolName)
  return t?.tool_name ?? toolName
}

function toolDescription(toolName: string): string {
  const t = form.availableTools.value.find((t) => t.name === toolName)
  return t?.description ?? ""
}

function knowledgeLabel(articleName: string): string {
  const k = form.availableKnowledge.value.find((k) => k.name === articleName)
  return k?.article_title ?? articleName
}

function knowledgeCategory(articleName: string): string {
  const k = form.availableKnowledge.value.find((k) => k.name === articleName)
  return k?.category ?? ""
}

function handleProviderChange(e: Event): void {
  const value = (e.target as HTMLSelectElement).value || null
  form.provider.value = value
  form.model.value = null
  modelInput.value = ""
  if (value) {
    form.loadModelsFor(value)
  } else {
    form.availableModels.value = []
  }
}

function handleAddTool(e: Event): void {
  const value = (e.target as HTMLSelectElement).value
  if (value) {
    form.addTool(value)
    ;(e.target as HTMLSelectElement).value = ""
  }
}

function handleAddKnowledge(e: Event): void {
  const value = (e.target as HTMLSelectElement).value
  if (value) {
    form.addKnowledge(value)
    ;(e.target as HTMLSelectElement).value = ""
  }
}

async function handleSave(): Promise<void> {
  try {
    const wasNew = form.isNew.value
    const name = await form.saveAgent()
    const { toast } = await import("frappe-ui")
    toast.success(__("Agent saved"))
    if (wasNew) {
      router.replace(`/jana/agents/${encodeURIComponent(name)}`)
    }
  } catch (err: unknown) {
    const { toast } = await import("frappe-ui")
    const msg = err instanceof Error ? err.message : __("Failed to save agent")
    toast.error(msg)
  }
}

async function handleDelete(): Promise<void> {
  if (!confirm(__("Delete this agent? This cannot be undone."))) return
  try {
    await form.deleteAgent()
    const { toast } = await import("frappe-ui")
    toast.success(__("Agent deleted"))
    router.push("/jana/agents")
  } catch (err: unknown) {
    const { toast } = await import("frappe-ui")
    const msg = err instanceof Error ? err.message : __("Failed to delete agent")
    toast.error(msg)
  }
}

onMounted(async () => {
  await form.loadReferenceData()

  const name = route.params.name as string
  if (name && name !== "new") {
    await form.loadAgent(name)
    modelInput.value = form.model.value || ""
  }
})

// If user navigates from /new to /:name, reload
watch(() => route.params.name, async (newName) => {
  if (!newName) return
  const name = newName as string
  if (name === "new") {
    form.resetForm()
    modelInput.value = ""
  } else {
    await form.loadAgent(name)
    modelInput.value = form.model.value || ""
  }
})
</script>
