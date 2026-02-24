// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

frappe.ui.form.on("Jana Provider", {
	refresh(frm) {
		frm.trigger("toggle_oauth_fields");

		// Auto-set OpenRouter base URL
		if (frm.doc.provider_type === "openrouter" && !frm.doc.api_base_url) {
			frm.set_value("api_base_url", "https://openrouter.ai/api/v1");
		}

		// Show "Test Connection" button
		if (!frm.is_new() && frm.doc.enabled) {
			frm.add_custom_button(__("Test Connection"), function () {
				frm.trigger("test_connection");
			});
		}
	},

	provider_type(frm) {
		frm.trigger("toggle_oauth_fields");

		// Force API Key for local providers
		if (["ollama", "vllm"].includes(frm.doc.provider_type)) {
			frm.set_value("auth_method", "API Key");
		}

		// Auto-set OpenRouter base URL
		if (frm.doc.provider_type === "openrouter") {
			if (!frm.doc.api_base_url) {
				frm.set_value("api_base_url", "https://openrouter.ai/api/v1");
			}
		}
	},

	auth_method(frm) {
		frm.trigger("toggle_oauth_fields");
	},

	toggle_oauth_fields(frm) {
		const isOAuth = frm.doc.auth_method === "OAuth";
		const isLocal = ["ollama", "vllm"].includes(frm.doc.provider_type);

		// Hide auth_method for local providers (always API Key)
		frm.toggle_display("auth_method", !isLocal);

		// Show/hide OAuth section fields
		frm.toggle_display("connected_app",
			isOAuth && frm.doc.provider_type === "google");
		frm.toggle_display("openrouter_callback_url",
			isOAuth && frm.doc.provider_type === "openrouter");
	},

	test_connection(frm) {
		frappe.call({
			method: "jana.api.providers.get_models_for_provider",
			args: { provider_name: frm.doc.name },
			callback(r) {
				if (r.message && r.message.length) {
					frappe.msgprint({
						title: __("Connection OK"),
						message: __("Provider is reachable. {0} models available.").replace(
							"{0}", r.message.length
						),
						indicator: "green",
					});
				} else {
					frappe.msgprint({
						title: __("Warning"),
						message: __("Provider responded but no models were found."),
						indicator: "orange",
					});
				}
			},
		});
	},
});
