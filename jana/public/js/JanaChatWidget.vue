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
					<p>{{ __('To get started, add your AI provider key.') }}</p>
					<a :href="settingsUrl" class="jana-btn-primary">
						{{ __('Open Jana Settings') }}
					</a>
				</div>

				<!-- Chat messages -->
				<div
					v-for="msg in messages"
					:key="msg.name || msg.id"
					:class="['jana-message', 'jana-message-' + msg.role]"
				>
					<div class="jana-message-content">{{ msg.content }}</div>
				</div>

				<!-- Loading indicator -->
				<div v-if="loading" class="jana-message jana-message-assistant">
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
		pageContext() {
			const route = frappe.get_route();
			if (route && route[0] === "Form" && route.length >= 3) {
				return { doctype: route[1], docname: route[2] };
			}
			return null;
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
			} catch (err) {
				this.messages.push({
					id: Date.now() + 1,
					role: "assistant",
					content: this.__("Sorry, something went wrong. Please try again."),
				});
			} finally {
				this.loading = false;
				this.scrollToBottom();
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
