// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref, readonly } from "vue"
import type { AgentSummary, UseAgentsReturn } from "@/types/jana"
import { apiCall } from "@/utils/apiCall"

const agents = ref<AgentSummary[]>([])
const loading = ref(false)
const fetched = ref(false)

export function useAgents(): UseAgentsReturn {
  async function fetchAgents(): Promise<void> {
    if (fetched.value) return
    loading.value = true
    try {
      agents.value = await apiCall<AgentSummary[]>("jana.api.agents.list_agents")
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
