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

declare const frappe: {
	boot: {
		jana?: JanaBootConfig;
	};
};

class JanaWidget {
	private app: App | null = null;
	private mounted = false;

	init(): void {
		if (this.mounted) return;

		const config = frappe.boot.jana;
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
}

// Initialize when Frappe is ready
const widget = new JanaWidget();

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		if (frappe.boot) {
			widget.init();
		}
	});
} else {
	setTimeout(() => widget.init(), 100);
}
