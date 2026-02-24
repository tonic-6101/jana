# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import json

import requests

import frappe
from frappe import _

from jana.services.llm.base import LLMProvider

DEFAULT_BASE_URL = "https://api.anthropic.com"
API_VERSION = "2023-06-01"


class AnthropicProvider(LLMProvider):
	"""Anthropic Claude Messages API provider."""

	def _get_base_url(self) -> str:
		return (self.api_base_url or DEFAULT_BASE_URL).rstrip("/")

	def _get_headers(self) -> dict:
		return {
			"x-api-key": self._get_api_key(),
			"anthropic-version": API_VERSION,
			"content-type": "application/json",
		}

	def _build_payload(self, messages, model, temperature, max_tokens, tools, stream=False):
		# Anthropic requires system prompt as a top-level param, not in messages
		system_text = ""
		chat_messages = []
		for msg in messages:
			if msg.get("role") == "system":
				system_text += msg.get("content", "") + "\n"
			else:
				chat_messages.append({
					"role": msg["role"],
					"content": msg.get("content", ""),
				})

		payload = {
			"model": model or "claude-sonnet-4-20250514",
			"messages": chat_messages,
			"max_tokens": max_tokens or 4096,
			"temperature": temperature,
			"stream": stream,
		}

		if system_text.strip():
			payload["system"] = system_text.strip()

		if tools:
			payload["tools"] = self._convert_tools(tools)

		return payload

	def _convert_tools(self, tools):
		"""Convert OpenAI-style tool definitions to Anthropic format."""
		anthropic_tools = []
		for tool in tools:
			if tool.get("type") == "function":
				func = tool["function"]
				anthropic_tools.append({
					"name": func["name"],
					"description": func.get("description", ""),
					"input_schema": func.get("parameters", {"type": "object", "properties": {}}),
				})
		return anthropic_tools

	def complete(self, messages, model=None, temperature=0.7, max_tokens=None, tools=None):
		url = f"{self._get_base_url()}/v1/messages"
		payload = self._build_payload(messages, model, temperature, max_tokens, tools)

		try:
			response = requests.post(url, headers=self._get_headers(), json=payload, timeout=120)
			response.raise_for_status()
		except requests.exceptions.HTTPError as e:
			self._handle_http_error(e, response)
		except requests.exceptions.ConnectionError:
			frappe.throw(_("Could not connect to Anthropic API. Check your API base URL."))
		except requests.exceptions.Timeout:
			frappe.throw(_("Anthropic API request timed out. Please try again."))

		data = response.json()

		content = ""
		tool_calls = []
		for block in data.get("content", []):
			if block["type"] == "text":
				content += block["text"]
			elif block["type"] == "tool_use":
				tool_calls.append({
					"id": block["id"],
					"type": "function",
					"function": {
						"name": block["name"],
						"arguments": json.dumps(block["input"]),
					},
				})

		result = {
			"content": content,
			"model": data.get("model", model),
			"tokens_used": data.get("usage", {}).get("input_tokens", 0)
				+ data.get("usage", {}).get("output_tokens", 0),
		}

		if tool_calls:
			result["tool_calls"] = tool_calls

		return result

	def stream(self, messages, model=None, temperature=0.7, max_tokens=None, tools=None):
		url = f"{self._get_base_url()}/v1/messages"
		payload = self._build_payload(messages, model, temperature, max_tokens, tools, stream=True)

		try:
			response = requests.post(
				url, headers=self._get_headers(), json=payload, timeout=120, stream=True
			)
			response.raise_for_status()
		except requests.exceptions.HTTPError as e:
			self._handle_http_error(e, response)
		except requests.exceptions.ConnectionError:
			frappe.throw(_("Could not connect to Anthropic API. Check your API base URL."))

		for line in response.iter_lines():
			if not line:
				continue

			line = line.decode("utf-8")
			if not line.startswith("data: "):
				continue

			data_str = line[6:]
			try:
				data = json.loads(data_str)
				event_type = data.get("type", "")

				if event_type == "content_block_delta":
					delta = data.get("delta", {})
					if delta.get("type") == "text_delta":
						yield {"content": delta.get("text", ""), "done": False}

				elif event_type == "message_stop":
					yield {"content": "", "done": True}
					return

			except (json.JSONDecodeError, KeyError):
				continue

	def _handle_http_error(self, error, response):
		status = response.status_code
		try:
			detail = response.json().get("error", {}).get("message", str(error))
		except Exception:
			detail = str(error)

		if status == 401:
			frappe.throw(_("Invalid API key. Please check your Anthropic API key."))
		elif status == 429:
			frappe.throw(_("Rate limit exceeded. Please wait and try again."))
		elif status == 404:
			frappe.throw(_("Model not found. Please check the model name."))
		else:
			frappe.throw(_("Anthropic API error ({0}): {1}").format(status, detail))
