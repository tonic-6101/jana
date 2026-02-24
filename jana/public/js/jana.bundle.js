import { createApp } from "vue";
import JanaChatWidget from "./JanaChatWidget.vue";

class JanaWidget {
	constructor() {
		this.app = null;
		this.mounted = false;
	}

	init() {
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
		// Wait for frappe.boot to be available
		if (frappe.boot) {
			widget.init();
		}
	});
} else {
	// DOM already loaded
	setTimeout(() => widget.init(), 100);
}
