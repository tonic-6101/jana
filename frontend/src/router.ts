// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

// Dock shared pages — calendar, people, notifications, bookmarks rendered inside Jana's layout.
// Each route lazily loads its component from Dock's ESM bundle at navigation time.
const dockEsm = '/assets/dock/js/dock-navbar.esm.js'
const dockInstalled = !!window.frappe?.boot?.dock?.installed

/** Resolve a Dock shared route's component by name. */
function dockRouteComponent(routeName: string) {
  return () =>
    import(/* @vite-ignore */ dockEsm).then((m) => {
      const route = m.dockSharedRoutes('/jana').find((r) => r.name === routeName)
      if (!route?.component) {
        throw new Error(`Dock shared route "${routeName}" not found`)
      }
      return route.component
    })
}

const dockSharedRoutes: RouteRecordRaw[] = dockInstalled ? [
  {
    path: '/jana/account',
    name: 'dock-account',
    component: dockRouteComponent('dock-account'),
    meta: { dockShared: true, title: 'My Account' },
  },
  {
    path: '/jana/calendar',
    name: 'dock-calendar',
    component: dockRouteComponent('dock-calendar'),
    meta: { dockShared: true, title: 'Calendar' },
  },
  {
    path: '/jana/people',
    name: 'dock-people',
    component: dockRouteComponent('dock-people'),
    meta: { dockShared: true, title: 'People' },
  },
  {
    path: '/jana/people/:name',
    name: 'dock-person',
    component: dockRouteComponent('dock-person'),
    meta: { dockShared: true, title: 'Contact' },
  },
  {
    path: '/jana/notifications',
    name: 'dock-notifications',
    component: dockRouteComponent('dock-notifications'),
    meta: { dockShared: true, title: 'Notifications' },
  },
  {
    path: '/jana/bookmarks',
    name: 'dock-bookmarks',
    component: dockRouteComponent('dock-bookmarks'),
    meta: { dockShared: true, title: 'Bookmarks' },
  },
  {
    path: '/jana/notes',
    name: 'dock-notes',
    component: dockRouteComponent('dock-notes'),
    meta: { dockShared: true, title: 'Notes' },
  },
  {
    path: '/jana/activity',
    name: 'dock-activity',
    component: dockRouteComponent('dock-activity'),
    meta: { dockShared: true, title: 'Activity' },
  },
  {
    path: '/jana/discussions',
    name: 'dock-discussions',
    component: dockRouteComponent('dock-discussions'),
    meta: { dockShared: true, title: 'Discussions' },
  },
  {
    path: '/jana/discussions/:name',
    name: 'dock-discussion-detail',
    component: dockRouteComponent('dock-discussion-detail'),
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
