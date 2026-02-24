// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref, readonly } from "vue"
import type { AgentSummary } from "@/types/jana"

const agents = ref<AgentSummary[]>([])
const loading = ref(false)
const fetched = ref(false)

export function useAgents() {
  async function fetchAgents(): Promise<void> {
    if (fetched.value) return
    loading.value = true
    try {
      const { call } = await import("frappe-ui")
      const result = await call("jana.api.agents.list_agents")
      agents.value = result as AgentSummary[]
      fetched.value = true
    } catch (err) {
      console.error("Failed to load agents:", err)
      agents.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    agents: readonly(agents),
    loading: readonly(loading),
    fetchAgents,
  }
}
