// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { createApp } from "vue";
import { FrappeUI, resourcesPlugin } from "frappe-ui";
import router from "./router";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(resourcesPlugin);
app.use(router);

if (import.meta.env.DEV) {
  // In dev mode, fetch boot data from the API
  const { call } = await import("frappe-ui");
  const values = await call("jana.www.jana.get_context_for_dev");
  for (const key in values) {
    (window as any)[key] = values[key];
  }
}

app.mount("#app");
