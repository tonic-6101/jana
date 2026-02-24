// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

frappe.ui.form.on("Jana Settings", {
	refresh(frm) {
		if (frm.doc.default_provider) {
			set_model_options(frm, frm.doc.default_provider);
		}
	},

	default_provider(frm) {
		frm.set_value("default_model", "");
		if (frm.doc.default_provider) {
			set_model_options(frm, frm.doc.default_provider);
		} else {
			frm.set_df_property("default_model", "fieldtype", "Data");
			frm.refresh_field("default_model");
		}
	},
});

function set_model_options(frm, provider_name) {
	frappe.call({
		method: "jana.api.providers.get_models_for_provider",
		args: { provider_name },
		callback(r) {
			if (r.message && r.message.length) {
				let options = [""].concat(r.message);
				frm.set_df_property("default_model", "fieldtype", "Select");
				frm.set_df_property("default_model", "options", options.join("\n"));
				frm.refresh_field("default_model");
			}
		},
	});
}
