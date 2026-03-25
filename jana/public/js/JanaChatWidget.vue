<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic
-->

<template>
	<div class="jana-widget" :class="{ 'jana-widget-embedded': embedded }">
		<!-- Floating bubble (hidden in embedded/dock mode) -->
		<button
			v-if="!embedded && !isOpen"
			class="jana-bubble"
			@click="openPanel"
			:title="__('Open Jana AI Assistant')"
		>
			<svg viewBox="0 0 52 52" width="52" height="52" class="jana-bubble-icon">
				<rect width="52" height="52" rx="14" fill="#7c3aed" />
				<g transform="translate(14 14)" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 6V2H8" />
					<path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
					<path d="M2 12h2" />
					<path d="M9 11v2" />
					<path d="M15 11v2" />
					<path d="M20 12h2" />
				</g>
			</svg>
		</button>

		<!-- Chat panel — in embedded mode, renders content only (DockPanelShell provides chrome) -->
		<div v-if="isOpen || embedded" :class="embedded ? 'jana-panel-embedded' : 'jana-panel'">
			<!-- Header: full chrome in standalone, action toolbar only in embedded -->
			<div v-if="!embedded" class="jana-panel-header">
				<div class="jana-panel-title">
					<strong>Jana</strong>
					<span v-if="currentView === 'sessions'" class="jana-header-label">{{ __('Chats') }}</span>
					<select
						v-else-if="agents.length > 1 && !sessionId"
						v-model="currentAgent"
						class="jana-agent-select"
						:title="__('Select Agent')"
					>
						<option v-for="a in agents" :key="a.name" :value="a.agent_name">
							{{ a.agent_name }}
						</option>
					</select>
					<span v-else class="jana-agent-name">{{ currentAgent }}</span>
				</div>
				<div class="jana-panel-actions">
					<button v-if="currentView === 'chat'" class="jana-btn-icon" @click="showSessionList" :title="__('Chat History')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
					</button>
					<button class="jana-btn-icon" @click="startNewChat" :title="__('New Chat')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<button class="jana-btn-icon" @click="openSettings" :title="__('Settings')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
					</button>
					<button class="jana-btn-icon" @click="closePanel" :title="__('Close')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
					</button>
				</div>
			</div>
			<!-- Embedded toolbar: agent selector + action buttons (no title/close — DockPanelShell provides those) -->
			<div v-else class="jana-embedded-toolbar">
				<div class="jana-panel-title">
					<span v-if="currentView === 'sessions'" class="jana-header-label">{{ __('Chats') }}</span>
					<select
						v-else-if="agents.length > 1 && !sessionId"
						v-model="currentAgent"
						class="jana-agent-select"
						:title="__('Select Agent')"
					>
						<option v-for="a in agents" :key="a.name" :value="a.agent_name">
							{{ a.agent_name }}
						</option>
					</select>
					<span v-else class="jana-agent-name">{{ currentAgent }}</span>
				</div>
				<div class="jana-panel-actions">
					<button v-if="currentView === 'chat'" class="jana-btn-icon" @click="showSessionList" :title="__('Chat History')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
					</button>
					<button class="jana-btn-icon" @click="startNewChat" :title="__('New Chat')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<button class="jana-btn-icon" @click="openSettings" :title="__('Settings')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
					</button>
				</div>
			</div>

			<!-- Legal disclaimer + language notice -->
			<div v-if="(showDisclaimer || showLangNotice) && currentView === 'chat'" class="jana-disclaimer">
				<svg class="jana-disclaimer-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" y1="8" x2="12" y2="12"></line>
					<line x1="12" y1="16" x2="12.01" y2="16"></line>
				</svg>
				<div class="jana-disclaimer-text">
					<span v-if="showDisclaimer">{{ __('Jana is an AI assistant. Responses are generated, not authoritative. Document changes require your confirmation before saving.') }}</span>
					<span v-if="showLangNotice" class="jana-lang-notice">{{ __('Jana responds in your language. Complex technical content may vary in quality across languages.') }}</span>
				</div>
				<button class="jana-disclaimer-close" @click="dismissDisclaimer" :title="__('Dismiss')">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</button>
			</div>

			<!-- Session List view -->
			<div v-if="currentView === 'sessions'" class="jana-sessions">
				<div v-if="sessionsLoading" class="jana-sessions-loading">
					<div class="jana-typing">
						<span></span><span></span><span></span>
					</div>
				</div>
				<div v-else-if="!sessions.length" class="jana-sessions-empty">
					<p>{{ __('No conversations yet') }}</p>
					<p class="jana-sessions-empty-hint">{{ __('Start a new chat to begin.') }}</p>
				</div>
				<div v-else class="jana-session-list">
					<button
						v-for="session in sessions"
						:key="session.name"
						class="jana-session-item"
						@click="loadSession(session.name)"
					>
						<div class="jana-session-item-content">
							<div class="jana-session-item-title">
								{{ session.session_title || __('New conversation') }}
							</div>
							<div class="jana-session-item-meta">
								<span class="jana-session-item-time">{{ formatTime(session.modified) }}</span>
								<span v-if="session.agent" class="jana-session-item-agent">{{ session.agent }}</span>
							</div>
						</div>
					</button>
				</div>
			</div>

			<!-- Terms acceptance view -->
			<div v-else-if="currentView === 'terms'" class="jana-terms">
				<div class="jana-terms-content">
					<h3 class="jana-terms-title">{{ __('Terms of Use') }}</h3>
					<p class="jana-terms-intro">{{ __('Before using Jana, please review and accept the following terms:') }}</p>
					<ol class="jana-terms-list">
						<li>{{ __('Jana is an AI assistant. AI-generated responses may be inaccurate, incomplete, or outdated. You are responsible for verifying all information before acting on it.') }}</li>
						<li>{{ __('If you bring your own API keys (BYOK), you are responsible for all costs and usage with your LLM provider. Jana does not manage, limit, or monitor your provider billing.') }}</li>
						<li>{{ __('Jana does not guarantee the accuracy, reliability, or suitability of AI responses for any particular purpose.') }}</li>
						<li>{{ __('Your conversations are stored on this Frappe site. Data sent to cloud LLM providers is subject to their data handling policies.') }}</li>
						<li>{{ __('Jana Community Edition is licensed under AGPL-3.0. See the full license for terms and conditions.') }}</li>
					</ol>
				</div>
				<div class="jana-terms-footer">
					<label class="jana-terms-checkbox">
						<input type="checkbox" v-model="termsAgreed" />
						<span>{{ __('I have read and agree to the Terms of Use') }}</span>
					</label>
					<button
						class="jana-btn-primary jana-terms-accept"
						:disabled="!termsAgreed || termsAccepting"
						@click="acceptTerms"
					>
						{{ termsAccepting ? '...' : __('Accept and Continue') }}
					</button>
				</div>
			</div>

			<!-- Chat view -->
			<template v-else>
				<!-- Messages -->
				<div class="jana-messages" ref="messagesContainer">
					<!-- Welcome / setup message -->
					<div v-if="!props.enabled" class="jana-welcome">
						<p>{{ __('Welcome to Jana!') }}</p>
						<template v-if="unconnectedOAuth.length">
							<p>{{ __('Connect your account to get started:') }}</p>
							<button
								v-for="op in unconnectedOAuth"
								:key="op.name"
								class="jana-btn-primary jana-oauth-btn"
								@click="connectOAuth(op)"
							>
								{{ __('Connect with {0}').replace('{0}', op.provider_name) }}
							</button>
							<div class="jana-divider">
								<span>{{ __('or') }}</span>
							</div>
						</template>
						<p v-else>{{ __('To get started, add your AI provider key.') }}</p>
						<a :href="settingsUrl" class="jana-btn-primary">
							{{ __('Open Jana Settings') }}
						</a>
					</div>

					<!-- Chat messages -->
					<div
						v-for="msg in messages"
						:key="msg.name || msg.id"
						:class="['jana-message', 'jana-message-' + msg.role, { 'jana-message-streaming': msg._streaming }]"
					>
						<div v-if="msg.role === 'user'" class="jana-message-content">{{ msg.content }}</div>
						<div v-else class="jana-message-content jana-markdown" v-html="renderMarkdown(msg.content)" @click="handleLinkClick"></div>
						<div v-if="msg.role === 'assistant' && !msg._streaming && msg.content" class="jana-message-actions">
							<button class="jana-btn-copy" @click="copyMessage(msg.content)" :title="__('Copy')">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							</button>
						</div>
					</div>

					<!-- Loading indicator (typing dots while waiting for first chunk) -->
					<div v-if="loading && !isStreamingMsg" class="jana-message jana-message-assistant">
						<div class="jana-typing">
							<span></span><span></span><span></span>
						</div>
					</div>
				</div>

				<!-- Input -->
				<div v-if="props.enabled" class="jana-input-area">
					<textarea
						ref="inputField"
						v-model="userInput"
						:placeholder="__('Ask Jana...')"
						@keydown.enter.exact.prevent="sendMessage"
						@input="autoResize"
						rows="1"
						class="jana-input"
					></textarea>
					<button
						v-if="isStreamingMsg"
						class="jana-btn-stop"
						@click="abortStream"
						:title="__('Stop generating')"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<rect x="6" y="6" width="12" height="12" rx="2"></rect>
						</svg>
					</button>
					<button
						v-else
						class="jana-btn-send"
						@click="sendMessage"
						:disabled="!userInput.trim() || loading"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
					</button>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";

// --- Types ---

interface ChatMessage {
	name?: string;
	id?: number;
	role: "user" | "assistant" | "system" | "tool";
	content: string;
	_streaming?: boolean;
}

interface SessionInfo {
	name: string;
	session_title: string;
	modified: string;
	agent?: string;
}

interface OAuthProvider {
	name: string;
	provider_name: string;
	provider_type: string;
	connected: boolean;
}

interface StreamChunk {
	content?: string;
	error?: string;
	done?: boolean;
}

interface PageContext {
	doctype: string;
	docname: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const frappe: any;

// --- Helpers that work on both Desk and non-Desk pages ---

function getCsrfToken(): string {
	if (typeof frappe !== "undefined" && frappe.csrf_token) {
		return frappe.csrf_token;
	}
	const win = window as Record<string, unknown>;
	if (win.csrf_token) return win.csrf_token as string;
	const match = document.cookie.match(/csrf_token=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : "";
}

/**
 * Call a Frappe API method. Uses fetch() directly so it works on any page.
 */
async function apiCall(
	method: string,
	args: Record<string, unknown> = {},
): Promise<unknown> {
	const resp = await fetch(`/api/method/${method}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Frappe-CSRF-Token": getCsrfToken(),
		},
		body: JSON.stringify(args),
	});
	if (!resp.ok) {
		const text = await resp.text();
		throw new Error(text || `API call failed: ${resp.status}`);
	}
	const data = await resp.json();
	return data.message;
}

// --- Props ---

const props = withDefaults(
	defineProps<{
		enabled: boolean;
		defaultAgent: string;
		streaming: boolean;
		capabilities: Record<string, boolean>;
		oauthProviders: OAuthProvider[];
		termsAccepted: boolean;
		termsVersion: string;
		embedded: boolean;
	}>(),
	{
		enabled: false,
		defaultAgent: "General Assistant",
		streaming: true,
		capabilities: () => ({}),
		oauthProviders: () => [],
		termsAccepted: false,
		termsVersion: "1.0",
		embedded: false,
	},
);

// --- State ---

const isOpen = ref(false);
const messages = ref<ChatMessage[]>([]);
const userInput = ref("");
const loading = ref(false);
const sessionId = ref<string | null>(null);
const currentAgent = ref(props.defaultAgent);
const currentView = ref<"chat" | "sessions" | "terms">("chat");
const sessions = ref<SessionInfo[]>([]);
const sessionsLoading = ref(false);
const agents = ref<Array<{ name: string; agent_name: string; description: string | null }>>([]);
const agentsLoaded = ref(false);
const disclaimerDismissed = ref(false);
const termsLocallyAccepted = ref(props.termsAccepted);
const termsAgreed = ref(false);
const termsAccepting = ref(false);
let abortController: AbortController | null = null;

// --- Template refs ---

const messagesContainer = ref<HTMLElement | null>(null);
const inputField = ref<HTMLTextAreaElement | null>(null);

// --- Translation helper ---

function __(text: string): string {
	return typeof frappe !== "undefined" && frappe.__ ? frappe.__(text) : text;
}

// --- Computed ---

const settingsUrl = computed(() => "/jana/settings");

const unconnectedOAuth = computed(() =>
	props.oauthProviders.filter((p) => !p.connected),
);

const pageContext = computed((): PageContext | null => {
	// Desk mode: frappe.get_route() returns ["Form", "DocType", "name"]
	if (typeof frappe !== "undefined" && frappe.get_route) {
		const route = frappe.get_route();
		if (route && route[0] === "Form" && route.length >= 3) {
			return { doctype: route[1], docname: route[2] };
		}
	}
	// Non-Desk: try to parse /app/doctype/name from the URL
	const match = window.location.pathname.match(/^\/app\/([^/]+)\/([^/]+)/);
	if (match) {
		const doctype = match[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
		return { doctype, docname: decodeURIComponent(match[2]) };
	}
	return null;
});

const isStreamingMsg = computed(() => {
	if (!messages.value.length) return false;
	const last = messages.value[messages.value.length - 1];
	return last?._streaming === true;
});

const showDisclaimer = computed(() =>
	(props.capabilities.create_documents || props.capabilities.modify_documents)
	&& !disclaimerDismissed.value,
);

const isNonEnglish = computed(() => {
	const lang = typeof frappe !== "undefined" && frappe.boot?.lang;
	return lang && !String(lang).startsWith("en");
});

const showLangNotice = computed(() =>
	isNonEnglish.value && !disclaimerDismissed.value,
);

// --- Methods ---

function dismissDisclaimer(): void {
	disclaimerDismissed.value = true;
	try {
		sessionStorage.setItem("jana_disclaimer_dismissed", "1");
	} catch {
		// sessionStorage unavailable — dismiss for this component lifecycle only
	}
}

function scrollToBottom(): void {
	nextTick(() => {
		if (messagesContainer.value) {
			messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
		}
	});
}

function renderMarkdown(text: string): string {
	if (!text) return "";
	// Use Desk's markdown renderer if available
	if (typeof frappe !== "undefined" && frappe.markdown) {
		return frappe.markdown(text);
	}
	// Basic fallback: escape HTML, preserve newlines
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\n/g, "<br>");
}

async function copyMessage(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
		if (typeof frappe !== "undefined" && frappe.show_alert) {
			frappe.show_alert({ message: __("Copied to clipboard"), indicator: "green" }, 2);
		}
	} catch {
		// Fallback for non-HTTPS or older browsers
	}
}

/**
 * Intercept clicks on internal links inside assistant messages.
 * Uses frappe.set_route() for SPA navigation within Desk, or
 * falls back to window.location for non-Desk pages.
 */
function handleLinkClick(event: MouseEvent): void {
	const target = event.target as HTMLElement;
	const link = target.closest("a");
	if (!link) return;

	const href = link.getAttribute("href");
	if (!href) return;

	// Only intercept internal Frappe routes
	if (href.startsWith("/app/") || href.startsWith("/api/")) {
		event.preventDefault();
		event.stopPropagation();
		if (typeof frappe !== "undefined" && frappe.set_route) {
			frappe.set_route(href);
		} else {
			window.location.href = href;
		}
	}
}

function autoResize(): void {
	const el = inputField.value;
	if (!el) return;
	el.style.height = "auto";
	el.style.height = Math.min(el.scrollHeight, 120) + "px";
}

function openPanel(): void {
	isOpen.value = true;
	if (!termsLocallyAccepted.value) {
		currentView.value = "terms";
		return;
	}
	fetchAgents();
	if (sessionId.value) {
		currentView.value = "chat";
	} else {
		currentView.value = "sessions";
		fetchSessions();
	}
	nextTick(() => {
		if (currentView.value === "chat" && inputField.value) {
			inputField.value.focus();
		}
	});
}

async function acceptTerms(): Promise<void> {
	if (!termsAgreed.value || termsAccepting.value) return;
	termsAccepting.value = true;
	try {
		await apiCall("jana.api.terms.accept_terms");
		termsLocallyAccepted.value = true;
		currentView.value = "sessions";
		fetchAgents();
		fetchSessions();
	} catch {
		console.error("[Jana] Could not accept terms");
	} finally {
		termsAccepting.value = false;
	}
}

function closePanel(): void {
	isOpen.value = false;
}

function togglePanel(): void {
	if (isOpen.value) {
		closePanel();
	} else {
		openPanel();
	}
}

function abortStream(): void {
	abortController?.abort();
	abortController = null;
}

function openSettings(): void {
	window.open(settingsUrl.value, "_blank");
}

function startNewChat(): void {
	messages.value = [];
	sessionId.value = null;
	userInput.value = "";
	currentView.value = "chat";
	fetchAgents();
	nextTick(() => {
		inputField.value?.focus();
		autoResize();
	});
}

async function showSessionList(): Promise<void> {
	currentView.value = "sessions";
	await fetchSessions();
}

async function fetchAgents(): Promise<void> {
	if (agentsLoaded.value) return;
	try {
		const result = await apiCall("jana.api.agents.list_agents");
		agents.value = (result as typeof agents.value) || [];
		agentsLoaded.value = true;
	} catch {
		// Silently fail — agent selector just won't appear
	}
}

async function fetchSessions(): Promise<void> {
	sessionsLoading.value = true;
	try {
		const result = await apiCall("jana.api.chat.get_sessions", {
			limit: 20,
			status: "active",
		});
		sessions.value = (result as SessionInfo[]) || [];
	} catch {
		sessions.value = [];
	} finally {
		sessionsLoading.value = false;
	}
}

async function loadSession(id: string): Promise<void> {
	sessionsLoading.value = true;
	try {
		const data = (await apiCall("jana.api.chat.get_session", {
			session_id: id,
		})) as {
			session: { name: string; agent?: string };
			messages: ChatMessage[];
		};
		sessionId.value = data.session.name;
		currentAgent.value = data.session.agent || props.defaultAgent;
		messages.value = (data.messages || [])
			.filter((msg) => msg.role === "user" || msg.role === "assistant")
			.map((msg) => ({
				name: msg.name,
				role: msg.role,
				content: msg.content,
			}));
		currentView.value = "chat";
		scrollToBottom();
	} catch {
		console.error("[Jana] Could not load session");
	} finally {
		sessionsLoading.value = false;
	}
}

function formatTime(datetime: string): string {
	if (!datetime) return "";
	// Use Desk's pretty date if available
	if (typeof frappe !== "undefined" && frappe.datetime?.prettyDate) {
		return frappe.datetime.prettyDate(datetime);
	}
	// Basic fallback
	try {
		const d = new Date(datetime);
		const now = new Date();
		const diffMs = now.getTime() - d.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		if (diffMins < 1) return __("just now");
		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHrs = Math.floor(diffMins / 60);
		if (diffHrs < 24) return `${diffHrs}h ago`;
		const diffDays = Math.floor(diffHrs / 24);
		return `${diffDays}d ago`;
	} catch {
		return datetime;
	}
}

async function ensureSession(): Promise<void> {
	if (sessionId.value) return;

	const ctx = pageContext.value;
	try {
		const data = (await apiCall("jana.api.chat.create_session", {
			agent: currentAgent.value,
			context_doctype: ctx?.doctype ?? null,
			context_docname: ctx?.docname ?? null,
		})) as { session_id: string };
		sessionId.value = data.session_id;
	} catch {
		console.error("[Jana] Could not create chat session");
	}
}

async function sendMessageStreaming(
	content: string,
	ctx: PageContext | null,
): Promise<void> {
	abortController = new AbortController();
	const response = await fetch(
		"/api/method/jana.api.chat.send_message_stream",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/x-ndjson",
				"X-Frappe-CSRF-Token": getCsrfToken(),
			},
			signal: abortController.signal,
			body: JSON.stringify({
				session_id: sessionId.value,
				content,
				context_doctype: ctx?.doctype ?? null,
				context_docname: ctx?.docname ?? null,
			}),
		},
	);

	if (!response.ok) {
		throw new Error(`Stream request failed: ${response.status}`);
	}

	messages.value.push({
		id: Date.now() + 1,
		role: "assistant",
		content: "",
		_streaming: true,
	});
	const msgIdx = messages.value.length - 1;
	scrollToBottom();

	const reader = response.body!.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop()!;

		for (const line of lines) {
			if (!line.trim()) continue;
			try {
				const data: StreamChunk = JSON.parse(line);
				if (data.error) {
					messages.value[msgIdx].content += "\n\n" + data.error;
					messages.value[msgIdx]._streaming = false;
					scrollToBottom();
					return;
				}
				if (data.content) {
					messages.value[msgIdx].content += data.content;
					scrollToBottom();
				}
				if (data.done) {
					messages.value[msgIdx]._streaming = false;
					scrollToBottom();
					return;
				}
			} catch {
				continue;
			}
		}
	}

	messages.value[msgIdx]._streaming = false;
	abortController = null;
	scrollToBottom();
}

async function sendMessageNonStreaming(
	content: string,
	ctx: PageContext | null,
): Promise<void> {
	const data = (await apiCall("jana.api.chat.send_message", {
		session_id: sessionId.value,
		content,
		context_doctype: ctx?.doctype ?? null,
		context_docname: ctx?.docname ?? null,
	})) as { content: string };
	messages.value.push({
		id: Date.now() + 1,
		role: "assistant",
		content: data.content,
	});
}

async function sendMessage(): Promise<void> {
	const content = userInput.value.trim();
	if (!content || loading.value) return;

	userInput.value = "";
	messages.value.push({
		id: Date.now(),
		role: "user",
		content,
	});
	scrollToBottom();

	loading.value = true;

	try {
		await ensureSession();
		if (!sessionId.value) {
			loading.value = false;
			return;
		}

		const ctx = pageContext.value;

		if (props.streaming) {
			await sendMessageStreaming(content, ctx);
		} else {
			await sendMessageNonStreaming(content, ctx);
		}
	} catch {
		const last = messages.value[messages.value.length - 1];
		if (last?.role === "assistant" && last._streaming) {
			last._streaming = false;
			if (!last.content) {
				last.content = __("Sorry, something went wrong. Please try again.");
			}
		} else {
			messages.value.push({
				id: Date.now() + 1,
				role: "assistant",
				content: __("Sorry, something went wrong. Please try again."),
			});
		}
	} finally {
		loading.value = false;
		scrollToBottom();
	}
}

async function connectOAuth(provider: OAuthProvider): Promise<void> {
	const methodName =
		provider.provider_type === "google"
			? "jana.api.oauth.initiate_google_oauth"
			: "jana.api.oauth.initiate_openrouter_oauth";
	try {
		const data = (await apiCall(methodName, {
			provider_name: provider.name,
		})) as { auth_url?: string };
		if (data?.auth_url) {
			window.location.href = data.auth_url;
		}
	} catch {
		console.error("[Jana] Could not start OAuth flow");
	}
}

// --- Watchers ---

watch(userInput, () => nextTick(autoResize));

// --- Lifecycle ---

function handleToggle(): void {
	togglePanel();
}

onMounted(() => {
	document.addEventListener("jana:toggle", handleToggle);
	try {
		disclaimerDismissed.value = sessionStorage.getItem("jana_disclaimer_dismissed") === "1";
	} catch {
		// sessionStorage unavailable
	}
	// Auto-open in embedded mode (mounted inside DockPanelShell)
	if (props.embedded) {
		openPanel();
	}
});

onUnmounted(() => {
	document.removeEventListener("jana:toggle", handleToggle);
});
</script>
