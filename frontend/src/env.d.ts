// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
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
