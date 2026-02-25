# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import json

import requests

import frappe
from frappe import _

from jana.services.llm.base import LLMProvider

DEFAULT_BASE_URL = "https://api.openai.com/v1"


class OpenAIProvider(LLMProvider):
	"""OpenAI-compatible chat completions provider.

	Works with OpenAI, Azure OpenAI, OpenRouter, and any OpenAI-compatible API.
	"""

	def _get_base_url(self) -> str:
		if self.provider_type == "openrouter":
			return (self.api_base_url or "https://openrouter.ai/api/v1").rstrip("/")
		return (self.api_base_url or DEFAULT_BASE_URL).rstrip("/")

	def _resolve_credential(self) -> str:
		"""Resolve the credential for this request.

		For Google OAuth providers, uses the OAuth token from Connected App.
		For everything else, uses the standard API key resolution chain.
		"""
		if self.auth_method == "OAuth" and self.provider_type == "google":
			token = self._get_oauth_token()
			if token:
				return token
		return self._get_api_key()

	def _get_headers(self) -> dict:
		headers = {
			"Authorization": f"Bearer {self._resolve_credential()}",
			"Content-Type": "application/json",
		}
		if self.provider_type == "openrouter":
			site_url = frappe.utils.get_url()
			headers["HTTP-Referer"] = site_url
			headers["X-Title"] = "Jana AI"
		return headers

	def _build_payload(self, messages, model, temperature, max_tokens, tools, stream=False):
		payload = {
			"model": model or "gpt-4o-mini",
			"messages": messages,
			"temperature": temperature,
			"stream": stream,
		}
		if max_tokens:
			payload["max_tokens"] = max_tokens
		if tools:
			payload["tools"] = tools
		return payload

	def complete(self, messages, model=None, temperature=0.7, max_tokens=None, tools=None):
		url = f"{self._get_base_url()}/chat/completions"
		payload = self._build_payload(messages, model, temperature, max_tokens, tools)

		try:
			response = requests.post(url, headers=self._get_headers(), json=payload, timeout=120)
			response.raise_for_status()
		except requests.exceptions.HTTPError as e:
			self._handle_http_error(e, response)
		except requests.exceptions.ConnectionError:
			frappe.throw(_("Could not connect to OpenAI API. Check your API base URL."))
		except requests.exceptions.Timeout:
			frappe.throw(_("OpenAI API request timed out. Please try again."))

		try:
			data = response.json()
		except ValueError:
			frappe.throw(_("Invalid response from AI provider (not JSON)."))

		choices = data.get("choices")
		if not choices:
			error_msg = data.get("error", {}).get("message", "")
			frappe.throw(_("Unexpected response from AI provider: {0}").format(
				error_msg or _("no choices returned")
			))

		message = choices[0].get("message", {})

		result = {
			"content": message.get("content", ""),
			"model": data.get("model", model),
			"tokens_used": data.get("usage", {}).get("total_tokens", 0),
		}

		if message.get("tool_calls"):
			result["tool_calls"] = message["tool_calls"]

		return result

	def stream(self, messages, model=None, temperature=0.7, max_tokens=None, tools=None):
		url = f"{self._get_base_url()}/chat/completions"
		payload = self._build_payload(messages, model, temperature, max_tokens, tools, stream=True)

		try:
			response = requests.post(
				url, headers=self._get_headers(), json=payload, timeout=120, stream=True
			)
			response.raise_for_status()
		except requests.exceptions.HTTPError as e:
			self._handle_http_error(e, response)
		except requests.exceptions.ConnectionError:
			frappe.throw(_("Could not connect to OpenAI API. Check your API base URL."))

		chunk_count = 0
		for line in response.iter_lines():
			if not line:
				continue

			line = line.decode("utf-8")
			if not line.startswith("data: "):
				continue

			data_str = line[6:]
			if data_str == "[DONE]":
				yield {"content": "", "done": True}
				return

			try:
				data = json.loads(data_str)
				delta = data["choices"][0].get("delta", {})
				yield {
					"content": delta.get("content", ""),
					"done": False,
				}
				chunk_count += 1
				if chunk_count >= 50000:
					yield {"content": "", "done": True}
					return
			except (json.JSONDecodeError, KeyError, IndexError):
				continue

	def _handle_http_error(self, error, response):
		status = response.status_code

		if status == 401:
			frappe.throw(_("Invalid API key. Please check your OpenAI API key in Jana Settings."))
		elif status == 429:
			frappe.throw(_("Rate limit exceeded. Please wait and try again."))
		elif status == 404:
			frappe.throw(_("Model not found. Please check the model name."))
		elif status >= 500:
			frappe.throw(_("The AI provider is experiencing issues. Please try again later."))
		else:
			frappe.throw(_("AI provider request failed (HTTP {0}). Please try again.").format(status))
