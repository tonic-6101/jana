# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

import json

import requests

import frappe
from frappe import _

from jana.services.llm.base import LLMProvider

DEFAULT_BASE_URL = "http://localhost:11434"


class OllamaProvider(LLMProvider):
	"""Ollama local model provider."""

	def _get_base_url(self) -> str:
		return (self.api_base_url or DEFAULT_BASE_URL).rstrip("/")

	def complete(self, messages, model=None, temperature=0.7, max_tokens=None, tools=None):
		url = f"{self._get_base_url()}/api/chat"
		payload = {
			"model": model or "llama3.2",
			"messages": messages,
			"stream": False,
			"options": {
				"temperature": temperature,
			},
		}
		if max_tokens:
			payload["options"]["num_predict"] = max_tokens
		if tools:
			payload["tools"] = self._format_tools(tools)

		try:
			response = requests.post(url, json=payload, timeout=300)
			response.raise_for_status()
		except requests.exceptions.ConnectionError:
			frappe.throw(
				_("Could not connect to Ollama at {0}. Is Ollama running?").format(
					self._get_base_url()
				)
			)
		except requests.exceptions.Timeout:
			frappe.throw(_("Ollama request timed out. The model may be loading."))

		data = response.json()
		message = data.get("message", {})

		result = {
			"content": message.get("content", ""),
			"model": data.get("model", model),
			"tokens_used": (
				data.get("prompt_eval_count", 0) + data.get("eval_count", 0)
			),
		}

		if message.get("tool_calls"):
			result["tool_calls"] = message["tool_calls"]

		return result

	def stream(self, messages, model=None, temperature=0.7, max_tokens=None, tools=None):
		url = f"{self._get_base_url()}/api/chat"
		payload = {
			"model": model or "llama3.2",
			"messages": messages,
			"stream": True,
			"options": {
				"temperature": temperature,
			},
		}
		if max_tokens:
			payload["options"]["num_predict"] = max_tokens

		try:
			response = requests.post(url, json=payload, timeout=300, stream=True)
			response.raise_for_status()
		except requests.exceptions.ConnectionError:
			frappe.throw(
				_("Could not connect to Ollama at {0}. Is Ollama running?").format(
					self._get_base_url()
				)
			)

		for line in response.iter_lines():
			if not line:
				continue

			try:
				data = json.loads(line.decode("utf-8"))
				message = data.get("message", {})
				yield {
					"content": message.get("content", ""),
					"done": data.get("done", False),
				}
				if data.get("done"):
					return
			except (json.JSONDecodeError, KeyError):
				continue

	def _format_tools(self, tools):
		"""Convert tools to Ollama format."""
		formatted = []
		for tool in tools:
			formatted.append({
				"type": "function",
				"function": {
					"name": tool.get("name", ""),
					"description": tool.get("description", ""),
					"parameters": tool.get("parameters", {}),
				},
			})
		return formatted
