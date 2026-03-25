// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

// Dock shared pages — calendar, people, notifications, bookmarks rendered inside Jana's layout.
// Each route lazily loads its component from Dock's ESM bundle at navigation time.
const dockEsm = '/assets/dock/js/dock-navbar.esm.js'
const dockInstalled = !!(window as any).frappe?.boot?.dock?.installed

const dockSharedRoutes: RouteRecordRaw[] = dockInstalled ? [
  {
    path: '/jana/account',
    name: 'dock-account',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-account').component()),
    meta: { dockShared: true, title: 'My Account' },
  },
  {
    path: '/jana/calendar',
    name: 'dock-calendar',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-calendar').component()),
    meta: { dockShared: true, title: 'Calendar' },
  },
  {
    path: '/jana/people',
    name: 'dock-people',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-people').component()),
    meta: { dockShared: true, title: 'People' },
  },
  {
    path: '/jana/people/:name',
    name: 'dock-person',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-person').component()),
    meta: { dockShared: true, title: 'Contact' },
  },
  {
    path: '/jana/notifications',
    name: 'dock-notifications',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-notifications').component()),
    meta: { dockShared: true, title: 'Notifications' },
  },
  {
    path: '/jana/bookmarks',
    name: 'dock-bookmarks',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-bookmarks').component()),
    meta: { dockShared: true, title: 'Bookmarks' },
  },
  {
    path: '/jana/notes',
    name: 'dock-notes',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-notes').component()),
    meta: { dockShared: true, title: 'Notes' },
  },
  {
    path: '/jana/activity',
    name: 'dock-activity',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-activity').component()),
    meta: { dockShared: true, title: 'Activity' },
  },
  {
    path: '/jana/discussions',
    name: 'dock-discussions',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-discussions').component()),
    meta: { dockShared: true, title: 'Discussions' },
  },
  {
    path: '/jana/discussions/:name',
    name: 'dock-discussion-detail',
    component: () => import(/* @vite-ignore */ dockEsm).then(m => m.dockSharedRoutes('/jana').find((r: any) => r.name === 'dock-discussion-detail').component()),
    meta: { dockShared: true, title: 'Discussion' },
  },
] : []

const routes: RouteRecordRaw[] = [
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
  // Dock Shared Pages (Calendar, People, Notifications, Bookmarks, etc.)
  ...dockSharedRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
