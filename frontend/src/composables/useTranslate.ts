// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

/**
 * Translation wrapper for the Vue SPA frontend.
 * Uses Frappe's translation function when available.
 */
export function __(text: string, ...args: unknown[]): string {
  if (typeof window !== "undefined" && window.__) {
    return window.__(text, ...args);
  }
  return text;
}
