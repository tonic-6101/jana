// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref, type Ref } from "vue"
import { apiCall } from "@/utils/apiCall"

export type EmailIntent =
  | "general"
  | "payment_reminder"
  | "inquiry"
  | "follow_up"
  | "thank_you"
  | "complaint"

export type DescriptionStyle =
  | "professional"
  | "marketing"
  | "technical"
  | "brief"

export interface ContentResult {
  model: string | null
  tokens_used: number
}

export interface EmailResult extends ContentResult {
  subject: string
  body: string
}

export interface DescriptionResult extends ContentResult {
  description: string
}

export interface ReportSummaryResult extends ContentResult {
  summary: string
  row_count: number
}

export interface UseContentGenReturn {
  generating: Ref<boolean>
  error: Ref<string>
  draftEmail: (doctype: string, docname: string, intent?: EmailIntent, instructions?: string) => Promise<EmailResult | null>
  generateDescription: (doctype: string, docname: string, style?: DescriptionStyle, instructions?: string) => Promise<DescriptionResult | null>
  summarizeReport: (reportName: string, filters?: Record<string, unknown>, limit?: number) => Promise<ReportSummaryResult | null>
}

export function useContentGen(): UseContentGenReturn {
  const generating = ref(false)
  const error = ref("")

  async function draftEmail(
    doctype: string,
    docname: string,
    intent: EmailIntent = "general",
    instructions?: string,
  ): Promise<EmailResult | null> {
    generating.value = true
    error.value = ""
    try {
      const args: Record<string, unknown> = { doctype, docname, intent }
      if (instructions) args.instructions = instructions
      return await apiCall<EmailResult>("jana.api.content.draft_email", args)
    } catch (err) {
      error.value = String(err)
      return null
    } finally {
      generating.value = false
    }
  }

  async function generateDescription(
    doctype: string,
    docname: string,
    style: DescriptionStyle = "professional",
    instructions?: string,
  ): Promise<DescriptionResult | null> {
    generating.value = true
    error.value = ""
    try {
      const args: Record<string, unknown> = { doctype, docname, style }
      if (instructions) args.instructions = instructions
      return await apiCall<DescriptionResult>("jana.api.content.generate_description", args)
    } catch (err) {
      error.value = String(err)
      return null
    } finally {
      generating.value = false
    }
  }

  async function summarizeReport(
    reportName: string,
    filters?: Record<string, unknown>,
    limit?: number,
  ): Promise<ReportSummaryResult | null> {
    generating.value = true
    error.value = ""
    try {
      const args: Record<string, unknown> = { report_name: reportName }
      if (filters) args.filters = JSON.stringify(filters)
      if (limit) args.limit = limit
      return await apiCall<ReportSummaryResult>("jana.api.content.summarize_report", args)
    } catch (err) {
      error.value = String(err)
      return null
    } finally {
      generating.value = false
    }
  }

  return {
    generating,
    error,
    draftEmail,
    generateDescription,
    summarizeReport,
  }
}
