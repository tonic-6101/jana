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

	Works with OpenAI, Azure OpenAI, and any OpenAI-compatible API.
	"""

	def _get_base_url(self) -> str:
		return (self.api_base_url or DEFAULT_BASE_URL).rstrip("/")

	def _get_headers(self) -> dict:
		return {
			"Authorization": f"Bearer {self._get_api_key()}",
			"Content-Type": "application/json",
		}

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

		data = response.json()
		choice = data["choices"][0]
		message = choice["message"]

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
			except (json.JSONDecodeError, KeyError, IndexError):
				continue

	def _handle_http_error(self, error, response):
		status = response.status_code
		try:
			detail = response.json().get("error", {}).get("message", str(error))
		except Exception:
			detail = str(error)

		if status == 401:
			frappe.throw(_("Invalid API key. Please check your OpenAI API key in Jana Settings."))
		elif status == 429:
			frappe.throw(_("Rate limit exceeded. Please wait and try again."))
		elif status == 404:
			frappe.throw(_("Model not found. Please check the model name."))
		else:
			frappe.throw(_("OpenAI API error ({0}): {1}").format(status, detail))
