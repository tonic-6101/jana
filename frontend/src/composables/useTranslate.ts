// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

/**
 * Translation wrapper for the Vue SPA frontend.
 * Uses Frappe's translation function when available.
 */
export function __(text: string, ...args: any[]): string {
  if (typeof window !== "undefined" && (window as any).__ ) {
    return (window as any).__(text, ...args);
  }
  return text;
}
