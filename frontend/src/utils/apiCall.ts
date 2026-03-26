// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

/**
 * Typed wrapper around frappe-ui's call().
 * Single cast point — consumers get type-safe results without inline assertions.
 */
export async function apiCall<T = unknown>(
  method: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  const { call } = await import("frappe-ui")
  return call(method, args) as Promise<T>
}
