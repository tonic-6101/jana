// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref } from "vue"
import type {
  ChatMessageUI,
  ChatSessionSummary,
  ChatSessionDetail,
  JanaBootConfig,
  UseChatReturn,
} from "@/types/jana"
import { apiCall } from "@/utils/apiCall"
import { __ } from "@/composables/useTranslate"

function getBootConfig(): JanaBootConfig | null {
  return window.frappe?.boot?.jana ?? null
}

function getCsrfToken(): string {
  return window.csrf_token ?? ""
}

// Module-level singleton state — shared across all consumers
const sessions = ref<ChatSessionSummary[]>([])
const sessionsLoading = ref(false)
const currentSessionId = ref<string | null>(null)
const currentAgent = ref(getBootConfig()?.default_agent ?? "General Assistant")
const messages = ref<ChatMessageUI[]>([])
const sending = ref(false)
const streaming = ref(false)

let abortController: AbortController | null = null

export function useChat(): UseChatReturn {

  // --- Session Management ---

  async function fetchSessions(): Promise<void> {
    sessionsLoading.value = true
    try {
      sessions.value = await apiCall<ChatSessionSummary[]>("jana.api.chat.get_sessions", {
        limit: 20,
        status: "active",
      })
    } catch {
      sessions.value = []
    } finally {
      sessionsLoading.value = false
    }
  }

  async function createSession(agentName?: string): Promise<string> {
    const agent = agentName ?? currentAgent.value
    const result = await apiCall<{ session_id: string }>("jana.api.chat.create_session", { agent })
    currentSessionId.value = result.session_id
    return result.session_id
  }

  async function loadSession(sessionId: string): Promise<void> {
    sessionsLoading.value = true
    try {
      const result = await apiCall<ChatSessionDetail>("jana.api.chat.get_session", {
        session_id: sessionId,
      })

      currentSessionId.value = result.session.name
      currentAgent.value = result.session.agent ?? getBootConfig()?.default_agent ?? "General Assistant"
      messages.value = (result.messages ?? [])
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m, i) => ({
          name: m.name,
          localId: m.name || `loaded-${i}`,
          role: m.role as "user" | "assistant",
          content: m.content,
          model: m.model ?? undefined,
          tokens_used: m.tokens_used ?? undefined,
          creation: m.creation,
        }))
    } finally {
      sessionsLoading.value = false
    }
  }

  async function archiveSession(sessionId: string): Promise<void> {
    await apiCall("jana.api.chat.archive_session", { session_id: sessionId })
  }

  async function deleteSession(sessionId: string): Promise<void> {
    await apiCall("jana.api.chat.delete_session", { session_id: sessionId })
  }

  async function renameSession(sessionId: string, title: string): Promise<void> {
    await apiCall("jana.api.chat.rename_session", { session_id: sessionId, title })
    const session = sessions.value.find((s) => s.name === sessionId)
    if (session) {
      session.session_title = title
    }
  }

  function startNewChat(agentName?: string): void {
    abortStream()
    currentSessionId.value = null
    messages.value = []
    sending.value = false
    streaming.value = false
    if (agentName) {
      currentAgent.value = agentName
    }
  }

  // --- Messaging ---

  async function sendMessage(content: string): Promise<void> {
    const trimmed = content.trim()
    if (!trimmed || sending.value) return

    // Ensure session exists
    if (!currentSessionId.value) {
      await createSession(currentAgent.value)
    }

    // Optimistic user message
    messages.value.push({
      localId: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    })

    sending.value = true
    const boot = getBootConfig()
    const useStreaming = boot?.streaming ?? true

    try {
      if (useStreaming) {
        await sendStreaming(trimmed)
      } else {
        await sendNonStreaming(trimmed)
      }
    } catch {
      messages.value.push({
        localId: `error-${Date.now()}`,
        role: "assistant",
        content: __("Sorry, something went wrong. Please try again."),
      })
    } finally {
      sending.value = false
      streaming.value = false
    }
  }

  async function sendStreaming(content: string): Promise<void> {
    abortController = new AbortController()

    const response = await fetch("/api/method/jana.api.chat.send_message_stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/x-ndjson",
        "X-Frappe-CSRF-Token": getCsrfToken(),
      },
      body: JSON.stringify({
        session_id: currentSessionId.value,
        content,
      }),
      signal: abortController.signal,
    })

    if (!response.ok) {
      throw new Error(`Stream request failed: ${response.status}`)
    }

    // Push the assistant message and get a reference via the reactive array.
    // In Vue 3, the local plain object bypasses the Proxy — mutations to it
    // are invisible to the reactivity system. Accessing through the array
    // index goes through the Proxy, so Vue detects every content update.
    messages.value.push({
      localId: `stream-${Date.now()}`,
      role: "assistant",
      content: "",
      streaming: true,
    })
    const msgIdx = messages.value.length - 1
    streaming.value = true

    if (!response.body) {
      throw new Error("Response body is null — streaming not supported")
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ""

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const data = JSON.parse(line)
            if (data.error) {
              messages.value[msgIdx].content += data.error
              messages.value[msgIdx].streaming = false
              return
            }
            if (data.content) {
              messages.value[msgIdx].content += data.content
            }
            if (data.done) {
              messages.value[msgIdx].streaming = false
              if (data.model) messages.value[msgIdx].model = data.model
              if (data.tokens_used) messages.value[msgIdx].tokens_used = data.tokens_used
              return
            }
          } catch {
            // skip malformed lines
          }
        }
      }
    } finally {
      messages.value[msgIdx].streaming = false
      streaming.value = false
      abortController = null
    }
  }

  interface SendMessageResponse {
    content: string
    model?: string
    tokens_used?: number
  }

  async function sendNonStreaming(content: string): Promise<void> {
    const result = await apiCall<SendMessageResponse>("jana.api.chat.send_message", {
      session_id: currentSessionId.value,
      content,
    })

    messages.value.push({
      localId: `resp-${Date.now()}`,
      role: "assistant",
      content: result.content,
      model: result.model,
      tokens_used: result.tokens_used,
    })
  }

  function abortStream(): void {
    abortController?.abort()
    abortController = null
  }

  return {
    sessions,
    sessionsLoading,
    currentSessionId,
    currentAgent,
    messages,
    sending,
    streaming,
    fetchSessions,
    createSession,
    loadSession,
    archiveSession,
    deleteSession,
    renameSession,
    startNewChat,
    sendMessage,
    abortStream,
  }
}
