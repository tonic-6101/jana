<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="min-h-full bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-3xl px-6 py-4 flex items-center gap-3">
        <router-link
          to="/jana/chat"
          class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          :title="__('Back to Chat')"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </router-link>
        <h1 class="text-lg font-semibold text-gray-900">{{ __('Content Generation') }}</h1>
      </div>
    </header>

    <!-- Content -->
    <div class="mx-auto max-w-3xl px-6 py-6 space-y-6">
      <!-- Mode selector -->
      <div class="flex gap-2">
        <button
          v-for="m in modes"
          :key="m.value"
          class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          :class="mode === m.value
            ? 'bg-accent-600 text-white'
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'"
          @click="mode = m.value; result = null; error = ''"
        >
          {{ m.label }}
        </button>
      </div>

      <!-- Email Draft Form -->
      <div v-if="mode === 'email'" class="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
        <h2 class="text-sm font-semibold text-gray-900">{{ __('Draft Email') }}</h2>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('DocType') }}</label>
            <input
              v-model="doctype"
              type="text"
              :placeholder="__('e.g. Sales Invoice')"
              class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                     placeholder:text-gray-300
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Document Name') }}</label>
            <input
              v-model="docname"
              type="text"
              :placeholder="__('e.g. SI-00042')"
              class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                     placeholder:text-gray-300
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Email Type') }}</label>
          <select
            v-model="emailIntent"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          >
            <option value="general">{{ __('General') }}</option>
            <option value="payment_reminder">{{ __('Payment Reminder') }}</option>
            <option value="inquiry">{{ __('Inquiry') }}</option>
            <option value="follow_up">{{ __('Follow Up') }}</option>
            <option value="thank_you">{{ __('Thank You') }}</option>
            <option value="complaint">{{ __('Complaint / Issue') }}</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Additional Instructions') }}</label>
          <textarea
            v-model="instructions"
            rows="2"
            :placeholder="__('Optional: specific tone, details to include, etc.')"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   placeholder:text-gray-300
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 resize-y"
          />
        </div>

        <button
          class="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white
                 hover:bg-accent-700 transition-colors disabled:opacity-50"
          :disabled="generating || !doctype || !docname"
          @click="handleDraftEmail"
        >
          {{ generating ? __('Generating...') : __('Draft Email') }}
        </button>
      </div>

      <!-- Description Form -->
      <div v-if="mode === 'description'" class="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
        <h2 class="text-sm font-semibold text-gray-900">{{ __('Generate Description') }}</h2>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('DocType') }}</label>
            <input
              v-model="doctype"
              type="text"
              :placeholder="__('e.g. Item')"
              class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                     placeholder:text-gray-300
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Document Name') }}</label>
            <input
              v-model="docname"
              type="text"
              :placeholder="__('e.g. ITEM-00001')"
              class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                     placeholder:text-gray-300
                     focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Style') }}</label>
          <select
            v-model="descStyle"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          >
            <option value="professional">{{ __('Professional') }}</option>
            <option value="marketing">{{ __('Marketing / Catalogue') }}</option>
            <option value="technical">{{ __('Technical') }}</option>
            <option value="brief">{{ __('Brief Summary') }}</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Additional Instructions') }}</label>
          <textarea
            v-model="instructions"
            rows="2"
            :placeholder="__('Optional: target audience, keywords, etc.')"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   placeholder:text-gray-300
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 resize-y"
          />
        </div>

        <button
          class="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white
                 hover:bg-accent-700 transition-colors disabled:opacity-50"
          :disabled="generating || !doctype || !docname"
          @click="handleGenerateDescription"
        >
          {{ generating ? __('Generating...') : __('Generate') }}
        </button>
      </div>

      <!-- Report Summary Form -->
      <div v-if="mode === 'report'" class="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
        <h2 class="text-sm font-semibold text-gray-900">{{ __('Summarise Report') }}</h2>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Report Name') }}</label>
          <input
            v-model="reportName"
            type="text"
            :placeholder="__('e.g. Accounts Receivable')"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm
                   placeholder:text-gray-300
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ __('Filters (JSON)') }}</label>
          <textarea
            v-model="reportFilters"
            rows="2"
            :placeholder="__('Optional: {&quot;company&quot;: &quot;My Company&quot;}')"
            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-mono
                   placeholder:text-gray-300
                   focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 resize-y"
          />
        </div>

        <button
          class="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white
                 hover:bg-accent-700 transition-colors disabled:opacity-50"
          :disabled="generating || !reportName"
          @click="handleSummarizeReport"
        >
          {{ generating ? __('Generating...') : __('Summarise') }}
        </button>
      </div>

      <!-- Error -->
      <div
        v-if="error"
        class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ error }}
      </div>

      <!-- Result -->
      <div v-if="result" class="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900">{{ __('Result') }}</h2>
          <div class="flex items-center gap-3 text-xs text-gray-400">
            <span v-if="result.model">{{ result.model }}</span>
            <span v-if="result.tokens_used">{{ result.tokens_used }} {{ __('tokens') }}</span>
            <button
              class="rounded border border-gray-200 px-2 py-0.5 text-gray-500
                     hover:bg-gray-50 transition-colors"
              @click="copyResult"
            >
              {{ copied ? __('Copied') : __('Copy') }}
            </button>
          </div>
        </div>

        <!-- Email result -->
        <template v-if="result.subject !== undefined">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-0.5">{{ __('Subject') }}</label>
            <p class="text-sm text-gray-900 font-medium">{{ result.subject }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-0.5">{{ __('Body') }}</label>
            <pre class="text-sm text-gray-800 whitespace-pre-wrap font-sans">{{ result.body }}</pre>
          </div>
        </template>

        <!-- Description result -->
        <template v-else-if="result.description !== undefined">
          <pre class="text-sm text-gray-800 whitespace-pre-wrap font-sans">{{ result.description }}</pre>
        </template>

        <!-- Report summary result -->
        <template v-else-if="result.summary !== undefined">
          <p v-if="result.row_count" class="text-xs text-gray-400">
            {{ __('Based on {0} rows').replace('{0}', String(result.row_count)) }}
          </p>
          <pre class="text-sm text-gray-800 whitespace-pre-wrap font-sans">{{ result.summary }}</pre>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { __ } from "@/composables/useTranslate"
import { useContentGen } from "@/composables/useContentGen"
import type { EmailIntent, DescriptionStyle } from "@/composables/useContentGen"

const { generating, error, draftEmail, generateDescription, summarizeReport } = useContentGen()

const modes = [
  { value: "email", label: __("Email Draft") },
  { value: "description", label: __("Description") },
  { value: "report", label: __("Report Summary") },
] as const

const mode = ref<"email" | "description" | "report">("email")

// Shared fields
const doctype = ref("")
const docname = ref("")
const instructions = ref("")

// Email-specific
const emailIntent = ref<EmailIntent>("general")

// Description-specific
const descStyle = ref<DescriptionStyle>("professional")

// Report-specific
const reportName = ref("")
const reportFilters = ref("")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const result = ref<Record<string, any> | null>(null)
const copied = ref(false)

async function handleDraftEmail() {
  result.value = null
  const res = await draftEmail(
    doctype.value,
    docname.value,
    emailIntent.value,
    instructions.value || undefined,
  )
  if (res) result.value = res
}

async function handleGenerateDescription() {
  result.value = null
  const res = await generateDescription(
    doctype.value,
    docname.value,
    descStyle.value,
    instructions.value || undefined,
  )
  if (res) result.value = res
}

async function handleSummarizeReport() {
  result.value = null
  let filters: Record<string, unknown> | undefined
  if (reportFilters.value.trim()) {
    try {
      filters = JSON.parse(reportFilters.value)
    } catch {
      error.value = __("Invalid JSON in filters field")
      return
    }
  }
  const res = await summarizeReport(reportName.value, filters)
  if (res) result.value = res
}

function copyResult() {
  if (!result.value) return
  let text = ""
  if (result.value.subject !== undefined) {
    text = `Subject: ${result.value.subject}\n\n${result.value.body}`
  } else if (result.value.description !== undefined) {
    text = result.value.description
  } else if (result.value.summary !== undefined) {
    text = result.value.summary
  }
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
