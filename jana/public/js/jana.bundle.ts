// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { createApp, type App } from "vue";
import JanaChatWidget from "./JanaChatWidget.vue";

interface JanaBootConfig {
	enabled: boolean;
	default_agent: string;
	streaming: boolean;
	capabilities: Record<string, boolean>;
	oauth_providers: Array<{
		name: string;
		provider_name: string;
		provider_type: string;
		connected: boolean;
	}>;
}

/**
 * Get CSRF token from available sources (Desk global, window boot, or cookie).
 */
function getCsrfToken(): string {
	// Desk mode: frappe.csrf_token
	if (typeof frappe !== "undefined" && (frappe as Record<string, unknown>).csrf_token) {
		return (frappe as Record<string, unknown>).csrf_token as string;
	}
	// www boot: window.csrf_token (set by Jinja in www pages)
	const win = window as Record<string, unknown>;
	if (win.csrf_token) {
		return win.csrf_token as string;
	}
	// Cookie fallback
	const match = document.cookie.match(/csrf_token=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : "";
}

/**
 * Try to get Jana config from Desk bootinfo, then fall back to API.
 */
async function getConfig(): Promise<JanaBootConfig | null> {
	// 1. Desk mode — frappe.boot.jana is populated by extend_bootinfo
	if (
		typeof frappe !== "undefined" &&
		(frappe as Record<string, unknown>).boot &&
		((frappe as Record<string, unknown>).boot as Record<string, unknown>).jana
	) {
		return ((frappe as Record<string, unknown>).boot as Record<string, JanaBootConfig>).jana;
	}

	// 2. Non-Desk mode — fetch via API
	try {
		const token = getCsrfToken();
		if (!token) return null; // Not authenticated

		const resp = await fetch("/api/method/jana.api.boot.get_widget_config", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Frappe-CSRF-Token": token,
			},
		});
		if (!resp.ok) return null;
		const data = await resp.json();
		return data.message as JanaBootConfig;
	} catch {
		return null;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const frappe: any;

class JanaWidget {
	private app: App | null = null;
	private mounted = false;

	async init(): Promise<void> {
		if (this.mounted) return;

		// Skip on Jana's own SPA — it has its own chat UI
		if (window.location.pathname.startsWith("/jana")) return;

		const config = await getConfig();
		if (!config) return;

		const mountPoint = document.createElement("div");
		mountPoint.id = "jana-chat-widget";
		document.body.appendChild(mountPoint);

		this.app = createApp(JanaChatWidget, {
			enabled: config.enabled,
			defaultAgent: config.default_agent,
			streaming: config.streaming,
			capabilities: config.capabilities,
			oauthProviders: config.oauth_providers || [],
		});

		this.app.mount(mountPoint);
		this.mounted = true;
	}

	toggle(): void {
		document.dispatchEvent(new CustomEvent("jana:toggle"));
	}
}

// Initialize when DOM is ready
const widget = new JanaWidget();

async function initWidget(): Promise<void> {
	await widget.init();

	// Register Desk keyboard shortcut if available (Ctrl+Shift+J)
	if (
		typeof frappe !== "undefined" &&
		frappe.ui?.keys?.add_shortcut
	) {
		const label = frappe.__ ? frappe.__("Toggle Jana AI Assistant") : "Toggle Jana AI Assistant";
		frappe.ui.keys.add_shortcut({
			shortcut: "ctrl+shift+j",
			action: () => widget.toggle(),
			description: label,
			ignore_inputs: true,
		});
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => initWidget());
} else {
	setTimeout(() => initWidget(), 100);
}
