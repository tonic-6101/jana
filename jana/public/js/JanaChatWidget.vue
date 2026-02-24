<template>
	<div class="jana-widget">
		<!-- Floating bubble -->
		<button
			v-if="!isOpen"
			class="jana-bubble"
			@click="openPanel"
			:title="__('Open Jana AI Assistant')"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
			</svg>
		</button>

		<!-- Chat panel (drawer) -->
		<div v-if="isOpen" class="jana-panel">
			<!-- Header -->
			<div class="jana-panel-header">
				<div class="jana-panel-title">
					<strong>Jana</strong>
					<span class="jana-agent-name">{{ currentAgent }}</span>
				</div>
				<div class="jana-panel-actions">
					<button class="jana-btn-icon" @click="newChat" :title="__('New Chat')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<button class="jana-btn-icon" @click="closePanel" :title="__('Close')">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
					</button>
				</div>
			</div>

			<!-- Messages -->
			<div class="jana-messages" ref="messagesContainer">
				<!-- Welcome / setup message -->
				<div v-if="!enabled" class="jana-welcome">
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
					<div class="jana-message-content">{{ msg.content }}</div>
				</div>

				<!-- Loading indicator (typing dots while waiting for first chunk) -->
				<div v-if="loading && !isStreaming" class="jana-message jana-message-assistant">
					<div class="jana-typing">
						<span></span><span></span><span></span>
					</div>
				</div>
			</div>

			<!-- Input -->
			<div v-if="enabled" class="jana-input-area">
				<textarea
					ref="inputField"
					v-model="userInput"
					:placeholder="__('Ask Jana...')"
					@keydown.enter.exact.prevent="sendMessage"
					rows="1"
					class="jana-input"
				></textarea>
				<button
					class="jana-btn-send"
					@click="sendMessage"
					:disabled="!userInput.trim() || loading"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "JanaChatWidget",
	props: {
		enabled: { type: Boolean, default: false },
		defaultAgent: { type: String, default: "General Assistant" },
		streaming: { type: Boolean, default: true },
		capabilities: { type: Object, default: () => ({}) },
		oauthProviders: { type: Array, default: () => [] },
	},
	data() {
		return {
			isOpen: false,
			messages: [],
			userInput: "",
			loading: false,
			sessionId: null,
			currentAgent: this.defaultAgent,
		};
	},
	computed: {
		settingsUrl() {
			return "/app/jana-settings";
		},
		unconnectedOAuth() {
			return this.oauthProviders.filter(p => !p.connected);
		},
		pageContext() {
			const route = frappe.get_route();
			if (route && route[0] === "Form" && route.length >= 3) {
				return { doctype: route[1], docname: route[2] };
			}
			return null;
		},
		isStreaming() {
			if (!this.messages.length) return false;
			const last = this.messages[this.messages.length - 1];
			return last && last._streaming === true;
		},
	},
	methods: {
		__: function (text) {
			return typeof frappe !== "undefined" && frappe.__ ? frappe.__(text) : text;
		},
		openPanel() {
			this.isOpen = true;
			this.$nextTick(() => {
				if (this.$refs.inputField) {
					this.$refs.inputField.focus();
				}
			});
		},
		closePanel() {
			this.isOpen = false;
		},
		async newChat() {
			this.messages = [];
			this.sessionId = null;
			this.userInput = "";
		},
		async ensureSession() {
			if (this.sessionId) return;

			const ctx = this.pageContext;
			try {
				const response = await frappe.call({
					method: "jana.api.chat.create_session",
					args: {
						agent: this.currentAgent,
						context_doctype: ctx ? ctx.doctype : null,
						context_docname: ctx ? ctx.docname : null,
					},
				});
				this.sessionId = response.message.session_id;
			} catch (err) {
				frappe.msgprint({
					title: this.__("Error"),
					message: this.__("Could not create chat session. Please try again."),
					indicator: "red",
				});
			}
		},
		async sendMessage() {
			const content = this.userInput.trim();
			if (!content || this.loading) return;

			this.userInput = "";
			this.messages.push({
				id: Date.now(),
				role: "user",
				content: content,
			});
			this.scrollToBottom();

			this.loading = true;

			try {
				await this.ensureSession();
				if (!this.sessionId) {
					this.loading = false;
					return;
				}

				const ctx = this.pageContext;

				if (this.streaming) {
					await this.sendMessageStreaming(content, ctx);
				} else {
					await this.sendMessageNonStreaming(content, ctx);
				}
			} catch (err) {
				const last = this.messages[this.messages.length - 1];
				if (last && last.role === "assistant" && last._streaming) {
					last._streaming = false;
					if (!last.content) {
						last.content = this.__("Sorry, something went wrong. Please try again.");
					}
				} else {
					this.messages.push({
						id: Date.now() + 1,
						role: "assistant",
						content: this.__("Sorry, something went wrong. Please try again."),
					});
				}
			} finally {
				this.loading = false;
				this.scrollToBottom();
			}
		},
		async sendMessageStreaming(content, ctx) {
			const response = await fetch("/api/method/jana.api.chat.send_message_stream", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/x-ndjson",
					"X-Frappe-CSRF-Token": frappe.csrf_token,
				},
				body: JSON.stringify({
					session_id: this.sessionId,
					content: content,
					context_doctype: ctx ? ctx.doctype : null,
					context_docname: ctx ? ctx.docname : null,
				}),
			});

			if (!response.ok) {
				throw new Error("Stream request failed: " + response.status);
			}

			const assistantMsg = {
				id: Date.now() + 1,
				role: "assistant",
				content: "",
				_streaming: true,
			};
			this.messages.push(assistantMsg);
			this.scrollToBottom();

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop();

				for (const line of lines) {
					if (!line.trim()) continue;
					try {
						const data = JSON.parse(line);
						if (data.error) {
							assistantMsg.content += "\n\n" + data.error;
							assistantMsg._streaming = false;
							this.scrollToBottom();
							return;
						}
						if (data.content) {
							assistantMsg.content += data.content;
							this.scrollToBottom();
						}
						if (data.done) {
							assistantMsg._streaming = false;
							this.scrollToBottom();
							return;
						}
					} catch (e) {
						continue;
					}
				}
			}

			assistantMsg._streaming = false;
			this.scrollToBottom();
		},
		async sendMessageNonStreaming(content, ctx) {
			const response = await frappe.call({
				method: "jana.api.chat.send_message",
				args: {
					session_id: this.sessionId,
					content: content,
					context_doctype: ctx ? ctx.doctype : null,
					context_docname: ctx ? ctx.docname : null,
				},
			});

			this.messages.push({
				id: Date.now() + 1,
				role: "assistant",
				content: response.message.content,
			});
		},
		async connectOAuth(provider) {
			const methodName =
				provider.provider_type === "google"
					? "jana.api.oauth.initiate_google_oauth"
					: "jana.api.oauth.initiate_openrouter_oauth";
			try {
				const response = await frappe.call({
					method: methodName,
					args: { provider_name: provider.name },
				});
				if (response.message && response.message.auth_url) {
					window.location.href = response.message.auth_url;
				}
			} catch (err) {
				frappe.msgprint({
					title: this.__("Error"),
					message: this.__("Could not start OAuth flow. Please try again."),
					indicator: "red",
				});
			}
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const container = this.$refs.messagesContainer;
				if (container) {
					container.scrollTop = container.scrollHeight;
				}
			});
		},
	},
};
</script>
