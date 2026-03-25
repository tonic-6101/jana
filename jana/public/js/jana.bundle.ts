// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { createApp, type App } from "vue";
import JanaChatWidget from "./JanaChatWidget.vue";

interface JanaBootConfig {
	enabled: boolean;
	default_agent: string;
	streaming: boolean;
	terms_accepted: boolean;
	terms_version: string;
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

/**
 * Check if Dock is installed (top bar provides the Jana button).
 */
function isDockInstalled(): boolean {
	if (
		typeof frappe !== "undefined" &&
		(frappe as Record<string, unknown>).boot
	) {
		const boot = (frappe as Record<string, unknown>).boot as Record<string, unknown>;
		const dock = boot.dock as Record<string, unknown> | undefined;
		return dock?.installed === true;
	}
	// Also check dockBoot on window (used by domain app SPAs)
	const win = window as Record<string, unknown>;
	if (win.dockBoot) {
		return (win.dockBoot as Record<string, unknown>).installed === true;
	}
	return false;
}

class JanaWidget {
	private app: App | null = null;
	private embeddedApp: App | null = null;
	private mounted = false;
	private config: JanaBootConfig | null = null;

	async init(): Promise<void> {
		if (this.mounted) return;

		// Skip on Jana's own SPA — it has its own chat UI
		if (window.location.pathname.startsWith("/jana")) return;

		this.config = await getConfig();
		if (!this.config) return;

		// When Dock is installed, the top bar button opens Jana in DockPanelShell.
		// We skip mounting the floating bubble and instead listen for panel events.
		if (isDockInstalled()) {
			this.listenForDockPanel();
			this.mounted = true;
			return;
		}

		// Standalone mode: mount the floating bubble + panel
		const mountPoint = document.createElement("div");
		mountPoint.id = "jana-chat-widget";
		document.body.appendChild(mountPoint);

		this.app = createApp(JanaChatWidget, {
			enabled: this.config.enabled,
			defaultAgent: this.config.default_agent,
			streaming: this.config.streaming,
			capabilities: this.config.capabilities,
			oauthProviders: this.config.oauth_providers || [],
			termsAccepted: this.config.terms_accepted ?? false,
			termsVersion: this.config.terms_version ?? "1.0",
			embedded: false,
		});

		this.app.mount(mountPoint);
		this.mounted = true;
	}

	/**
	 * Listen for Dock panel mount/unmount events.
	 * When the DockJanaPanel opens, it dispatches `dock:jana-panel-mount` with
	 * the container element. We create an embedded widget instance inside it.
	 */
	private listenForDockPanel(): void {
		document.addEventListener("dock:jana-panel-mount", ((e: CustomEvent) => {
			const container = e.detail?.container as HTMLElement;
			if (!container || !this.config) return;

			// Clean up any previous embedded instance
			this.destroyEmbedded();

			this.embeddedApp = createApp(JanaChatWidget, {
				enabled: this.config.enabled,
				defaultAgent: this.config.default_agent,
				streaming: this.config.streaming,
				capabilities: this.config.capabilities,
				oauthProviders: this.config.oauth_providers || [],
				termsAccepted: this.config.terms_accepted ?? false,
				termsVersion: this.config.terms_version ?? "1.0",
				embedded: true,
			});

			this.embeddedApp.mount(container);
		}) as EventListener);

		document.addEventListener("dock:jana-panel-unmount", () => {
			this.destroyEmbedded();
		});
	}

	private destroyEmbedded(): void {
		if (this.embeddedApp) {
			this.embeddedApp.unmount();
			this.embeddedApp = null;
		}
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
