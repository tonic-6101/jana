// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

frappe.ui.form.on("Jana Agent", {
	refresh(frm) {
		if (frm.doc.provider) {
			set_agent_model_options(frm, frm.doc.provider);
		}
	},

	provider(frm) {
		frm.set_value("model", "");
		if (frm.doc.provider) {
			set_agent_model_options(frm, frm.doc.provider);
		} else {
			frm.set_df_property("model", "fieldtype", "Data");
			frm.refresh_field("model");
		}
	},
});

function set_agent_model_options(frm, provider_name) {
	frappe.call({
		method: "jana.api.providers.get_models_for_provider",
		args: { provider_name },
		callback(r) {
			if (r.message && r.message.length) {
				let options = [""].concat(r.message);
				frm.set_df_property("model", "fieldtype", "Select");
				frm.set_df_property("model", "options", options.join("\n"));
				frm.refresh_field("model");
			}
		},
	});
}
