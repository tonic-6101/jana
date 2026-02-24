// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/jana",
    redirect: "/jana/chat",
  },
  {
    path: "/jana/chat",
    name: "Chat",
    component: () => import("./pages/Chat.vue"),
  },
  {
    path: "/jana/agents",
    name: "Agents",
    component: () => import("./pages/Agents.vue"),
  },
  {
    path: "/jana/agents/:name",
    name: "AgentForm",
    component: () => import("./pages/AgentForm.vue"),
  },
  {
    path: "/jana/content",
    name: "ContentGen",
    component: () => import("./pages/ContentGen.vue"),
  },
  {
    path: "/jana/settings",
    name: "Settings",
    component: () => import("./pages/Settings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
