<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-lg rounded-xl bg-white shadow-2xl">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-900">{{ __('Terms of Use') }}</h2>
      </div>

      <!-- Body -->
      <div class="px-6 py-4 space-y-3">
        <p class="text-sm text-gray-600">
          {{ __('Before using Jana, please review and accept the following terms:') }}
        </p>

        <ol class="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>
            {{ __('Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.') }}
          </li>
          <li>
            {{ __('If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.') }}
          </li>
          <li>
            {{ __('Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.') }}
          </li>
          <li>
            {{ __('Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.') }}
          </li>
          <li>
            {{ __('Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.') }}
          </li>
        </ol>

        <a
          href="/docs/terms-of-use"
          target="_blank"
          class="inline-block text-sm text-blue-600 hover:text-blue-800 underline"
        >
          {{ __('View Full Terms of Use') }}
        </a>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-4 space-y-3">
        <label class="flex items-start gap-2 cursor-pointer">
          <input
            v-model="agreed"
            type="checkbox"
            class="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span class="text-sm text-gray-700">{{ __('I have read and agree to the Terms of Use') }}</span>
        </label>

        <button
          :disabled="!agreed || accepting"
          class="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          @click="handleAccept"
        >
          {{ accepting ? '...' : __('Accept and Continue') }}
        </button>

        <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { __ } from "@/composables/useTranslate"

const emit = defineEmits<{
  accepted: []
}>()

const agreed = ref(false)
const accepting = ref(false)
const error = ref("")

async function handleAccept(): Promise<void> {
  if (!agreed.value) return
  accepting.value = true
  error.value = ""

  try {
    const resp = await fetch("/api/method/jana.api.terms.accept_terms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": getCsrfToken(),
      },
    })

    if (!resp.ok) {
      throw new Error(`Request failed: ${resp.status}`)
    }

    emit("accepted")
  } catch (e) {
    error.value = __("Could not save acceptance. Please try again.")
  } finally {
    accepting.value = false
  }
}

function getCsrfToken(): string {
  if (typeof window !== "undefined") {
    const w = window as unknown as Record<string, unknown>
    if (w.frappe && (w.frappe as Record<string, unknown>).csrf_token) {
      return (w.frappe as Record<string, unknown>).csrf_token as string
    }
    if (w.csrf_token) return w.csrf_token as string
  }
  const match = document.cookie.match(/csrf_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ""
}
</script>
