import dockPreset from '../../dock/frontend/src/styles/dock-tailwind-preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dockPreset],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/**/*.{vue,js,ts,jsx,tsx}',
    '../node_modules/frappe-ui/src/**/*.{vue,js,ts,jsx,tsx}',
    // Dock navbar components loaded at runtime via ESM — scan source so
    // Tailwind generates the utility classes they use (search bar, bell, etc.)
    '../../dock/frontend/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /text-\[(13|14|15|16|17|18|19)px\]/ },
    { pattern: /leading-\[(1\.2|1\.3|1\.4|1\.5|1\.6|1\.7|1\.8|1\.9|2|2\.5|3)\]/ },
  ],
  plugins: [],
}
