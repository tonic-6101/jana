// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

// Type declarations for Dock ESM bundle (dynamic URL import)
declare module '/assets/dock/js/dock-navbar.esm.js' {
  import type { DefineComponent } from 'vue'
  import type { RouteRecordRaw } from 'vue-router'

  export const DockNavbar: DefineComponent<{}, {}, any>
  export const DockLayout: DefineComponent<{}, {}, any>
  export const DockSidebarShell: DefineComponent<{}, {}, any>
  export const DockShareButton: DefineComponent<{}, {}, any>

  export function dockSharedRoutes(prefix?: string): RouteRecordRaw[]
}

// Build-time injected version
declare const __APP_VERSION__: string
