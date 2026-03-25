// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from "fs";
import frappeuiPlugin from "frappe-ui/vite";

// Read version from package.json for build-time injection
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))

// Vite plugin: share Vue + Vue Router runtimes with Dock.
// Dock ships Vue's ESM browser build at /assets/dock/js/vendor/vue.esm.js
// and Vue Router at /assets/dock/js/vendor/vue-router.esm.js.
// By externalizing both, Jana uses the SAME instances as Dock's components
// (DockLayout, DockSidebarShell), preventing dual-instance injection failures.
const vueSharedPlugin: Plugin = {
  name: 'vue-shared',
  enforce: 'pre',
  resolveId(id: string) {
    if (id === 'vue' || id === '@vue/runtime-dom' || id === '@vue/runtime-core' || id === '@vue/reactivity') {
      return { id: '/assets/dock/js/vendor/vue.esm.js', external: true }
    }
    if (id === 'vue-router') {
      return { id: '/assets/dock/js/vendor/vue-router.esm.js', external: true }
    }
  },
}

// Vite plugin: resolve any /assets/dock/* import as external.
// Dock's ESM bundle is served by Frappe at runtime when Dock is installed.
// Without this, Rollup errors on the unresolvable URL at build time.
const dockExternalPlugin: Plugin = {
  name: 'dock-external',
  enforce: 'pre',
  resolveId(id: string) {
    if (id.startsWith('/assets/dock/')) {
      return { id, external: true }
    }
  },
}

// ── Settings ESM build ──────────────────────────────────────────────
// Builds jana-settings.esm.js — a standalone ESM bundle that exports
// JanaSettings component for Dock's unified settings hub.
// This runs as a secondary build after the main SPA build.
function settingsEsmPlugin(): Plugin {
  return {
    name: 'jana-settings-esm',
    async closeBundle() {
      const { build } = await import('vite')
      await build({
        configFile: false,
        base: '/assets/jana/js/',
        plugins: [
          vueSharedPlugin,
          vue(),
          frappeuiPlugin({ frappeProxy: false, lucideIcons: true, jinjaBootData: false }),
        ],
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
          },
        },
        build: {
          outDir: path.resolve(__dirname, '../jana/public/js'),
          emptyOutDir: false,
          lib: {
            entry: path.resolve(__dirname, 'src/dock-settings.ts'),
            formats: ['es'],
            fileName: () => 'jana-settings.esm.js',
          },
          rollupOptions: {
            external: [
              'vue',
              'vue-router',
              '@vue/runtime-dom',
              '@vue/runtime-core',
              '@vue/reactivity',
              /^\/assets\/dock\//,
            ],
            output: {
              paths: {
                vue: '/assets/dock/js/vendor/vue.esm.js',
                'vue-router': '/assets/dock/js/vendor/vue-router.esm.js',
              },
            },
          },
        },
      })
      console.log('Built jana-settings.esm.js')
    },
  }
}

// Post-build: patch jana.html with Dock CSS links.
// Runs after frappe-ui's build plugin generates the base HTML.
function janaHtmlPlugin(): Plugin {
  return {
    name: 'jana-html-patch',
    closeBundle() {
      const htmlPath = path.resolve(__dirname, '..', 'jana', 'www', 'jana.html')
      if (!fs.existsSync(htmlPath)) return
      let html = fs.readFileSync(htmlPath, 'utf-8')

      // Add Dock CSS before the first <script> or <link> in <head>
      const dockCss = `    <link rel="stylesheet" href="/assets/dock/css/dock-tokens.css">\n    <link rel="stylesheet" href="/assets/dock/css/dock-navbar.css">\n`
      if (!html.includes('dock-tokens.css')) {
        html = html.replace(
          /(<\s*script\b|<\s*link\b)/,
          dockCss + '    $1'
        )
        fs.writeFileSync(htmlPath, html)
      }
    },
  }
}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    vueSharedPlugin,
    dockExternalPlugin,
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
    janaHtmlPlugin(),
    settingsEsmPlugin(),
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
