<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<script setup lang="ts">
// @ts-expect-error — runtime ESM served by Dock's built assets
import { DockLayout } from '/assets/dock/js/dock-navbar.esm.js'
import JanaSidebar from '@/components/JanaSidebar.vue'
</script>

<template>
  <DockLayout>
    <JanaSidebar />
    <main class="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 transition-colors">
      <router-view />
    </main>
  </DockLayout>
</template>
