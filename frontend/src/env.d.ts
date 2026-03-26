// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

/// <reference types="vite/client" />

import type { JanaBootConfig } from './types/jana'

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

/** Frappe globals injected at runtime */
interface FrappeGlobal {
	boot: {
		jana?: JanaBootConfig
		dock?: { installed: boolean }
		lang?: string
		[key: string]: unknown
	}
	csrf_token: string
	call: (opts: { method: string; args?: Record<string, unknown> }) => Promise<unknown>
	[key: string]: unknown
}

declare global {
	interface Window {
		frappe: FrappeGlobal
		csrf_token: string
		__: (text: string, ...args: unknown[]) => string
		[key: string]: unknown
	}
}

declare module 'frappe-ui' {
	export const Button: any
	export const Dialog: any
	export const Input: any
	export const TextInput: any
	export const FormControl: any
	export const Badge: any
	export const Tooltip: any
	export const Spinner: any
	export const Avatar: any
	export const FeatherIcon: any
	export const Dropdown: any
	export const TabButtons: any
	export const Tabs: any
	export const Switch: any
	export const FrappeUI: any
	export const createResource: any
	export const call: any
	export const debounce: any
	export const resourcesPlugin: any
	export const setConfig: any
	export const frappeRequest: any
	export const toast: {
		success: (message: string) => void
		error: (message: string) => void
		info: (message: string) => void
		warning: (message: string) => void
	}
}

declare module 'markdown-it' {
	const MarkdownIt: any
	export default MarkdownIt
}
