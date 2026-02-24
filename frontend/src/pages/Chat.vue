<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->
<template>
  <div class="flex h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900">Jana Chat</h1>
      <p class="mt-2 text-gray-600">{{ __("Full-page chat interface — coming in Month 2") }}</p>
      <a href="/app/jana-settings" class="mt-4 inline-block text-blue-600 hover:underline">
        {{ __("Open Jana Settings") }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { __ } from "@/composables/useTranslate";
</script>
