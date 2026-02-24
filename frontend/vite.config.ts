// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import frappeuiPlugin from "frappe-ui/vite";

export default defineConfig({
  plugins: [
    frappeuiPlugin({
      frappeProxy: true,
      lucideIcons: true,
      jinjaBootData: true,
      buildConfig: {
        indexHtmlPath: "../jana/www/jana.html",
        emptyOutDir: true,
        sourcemap: true,
      },
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["frappe-ui"],
  },
});
