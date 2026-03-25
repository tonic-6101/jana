// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

// ESM entry point for Jana's settings component.
// Dock's DockSettingsAppHost lazy-loads this bundle and renders JanaSettings
// inside the Dock SPA at /dock/settings/app/jana.
//
// This file is built as a separate Vite library entry: jana-settings.esm.js

export { default as JanaSettings } from './pages/Settings.vue'
