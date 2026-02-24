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
			"x-api-key": self._get_api_key(),  # uses user → system key chain
			"anthropic-version": API_VERSION,
			"content-type": "application/json",
		}

	def _build_payload(self, messages, model, temperature, max_tokens, tools, stream=False):
		"""Build Anthropic Messages API payload.

		Converts OpenAI-format messages (including tool_calls and role="tool")
		to Anthropic's native format:
		- System messages → top-level ``system`` param
		- Assistant messages with ``tool_calls`` → content array with tool_use blocks
		- Tool result messages (role="tool") → role="user" with tool_result content blocks
		"""
		system_parts = []
		chat_messages = []

		for msg in messages:
			role = msg.get("role", "")

			if role == "system":
				content = msg.get("content", "").strip()
				if content:
					system_parts.append(content)

			elif role == "assistant":
				tool_calls = msg.get("tool_calls")
				if tool_calls:
					# Convert OpenAI tool_calls to Anthropic content blocks
					content_blocks = []
					text = msg.get("content", "")
					if text:
						content_blocks.append({"type": "text", "text": text})
					for tc in tool_calls:
						func = tc.get("function", {})
						raw_input = func.get("arguments", "{}")
						try:
							parsed_input = json.loads(raw_input) if isinstance(raw_input, str) else raw_input
						except json.JSONDecodeError:
							parsed_input = {}
						content_blocks.append({
							"type": "tool_use",
							"id": tc.get("id", ""),
							"name": func.get("name", ""),
							"input": parsed_input,
						})
					chat_messages.append({"role": "assistant", "content": content_blocks})
				else:
					chat_messages.append({
						"role": "assistant",
						"content": msg.get("content", ""),
					})

			elif role == "tool":
				# Convert OpenAI tool result to Anthropic tool_result block.
				# Anthropic expects tool results as role="user" messages.
				# Merge consecutive tool results into one user message.
				tool_result_block = {
					"type": "tool_result",
					"tool_use_id": msg.get("tool_call_id", ""),
					"content": msg.get("content", ""),
				}
				# Check if the previous message is already a user message with
				# tool_result blocks (from a prior tool in the same batch)
				if (
					chat_messages
					and chat_messages[-1].get("role") == "user"
					and isinstance(chat_messages[-1].get("content"), list)
					and chat_messages[-1]["content"]
					and chat_messages[-1]["content"][0].get("type") == "tool_result"
				):
					chat_messages[-1]["content"].append(tool_result_block)
				else:
					chat_messages.append({
						"role": "user",
						"content": [tool_result_block],
					})

			elif role == "user":
				chat_messages.append({
					"role": "user",
					"content": msg.get("content", ""),
				})

		payload = {
			"model": model or "claude-sonnet-4-20250514",
			"messages": chat_messages,
			"max_tokens": max_tokens or 4096,
			"temperature": temperature,
			"stream": stream,
		}

		if system_parts:
			payload["system"] = "\n\n".join(system_parts)

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

		try:
			data = response.json()
		except ValueError:
			frappe.throw(_("Invalid response from Anthropic API (not JSON)."))

		content = ""
		tool_calls = []
		for block in data.get("content", []):
			block_type = block.get("type", "")
			if block_type == "text":
				content += block.get("text", "")
			elif block_type == "tool_use":
				tool_calls.append({
					"id": block["id"],
					"type": "function",
					"function": {
						"name": block["name"],
						"arguments": json.dumps(block.get("input", {})),
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

		chunk_count = 0
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
						chunk_count += 1
						if chunk_count >= 50000:
							yield {"content": "", "done": True}
							return

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
