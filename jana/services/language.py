# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Language resilience service for multilingual AI responses.

Generates language-specific instructions injected into the system prompt
to ensure the LLM responds consistently in the user's Frappe locale.
"""

import frappe

# Language metadata: display name and register/formality instruction.
# Languages with formal/informal distinctions get explicit guidance.
LANGUAGE_CONFIG = {
	"ar": {
		"name": "Arabic",
		"native_name": "العربية",
		"register": (
			"Use formal Modern Standard Arabic (فصحى) unless the user writes in a specific dialect."
		),
	},
	"de": {
		"name": "German",
		"native_name": "Deutsch",
		"register": (
			"Use the formal register (Sie) unless the user explicitly uses informal language (du)."
		),
	},
	"es": {
		"name": "Spanish",
		"native_name": "Español",
		"register": (
			"Use the formal register (usted) unless the user explicitly uses informal language (tú)."
		),
	},
	"fr": {
		"name": "French",
		"native_name": "Français",
		"register": (
			"Use the formal register (vous) unless the user explicitly uses informal language (tu)."
		),
	},
	"hi": {
		"name": "Hindi",
		"native_name": "हिन्दी",
		"register": (
			"Use formal Hindi (आप) with Devanagari script. "
			"Avoid excessive English borrowings unless they are standard technical terms."
		),
	},
	"ja": {
		"name": "Japanese",
		"native_name": "日本語",
		"register": (
			"Use polite language (丁寧語 / desu-masu form). "
			"Use keigo (敬語) when discussing formal business processes."
		),
	},
	"ko": {
		"name": "Korean",
		"native_name": "한국어",
		"register": (
			"Use the formal polite register (합쇼체 / hapshoche). Use honorifics when appropriate."
		),
	},
	"pt": {
		"name": "Portuguese",
		"native_name": "Português",
		"register": "Use the formal register (você/o senhor) in a business context.",
	},
	"ru": {
		"name": "Russian",
		"native_name": "Русский",
		"register": (
			"Use the formal register (Вы) unless the user uses informal language (ты)."
		),
	},
	"tr": {
		"name": "Turkish",
		"native_name": "Türkçe",
		"register": "Use the formal register (siz) in business communication.",
	},
	"zh": {
		"name": "Chinese",
		"native_name": "中文",
		"register": (
			"Use formal Mandarin Chinese with simplified characters (简体中文) "
			"unless the locale specifies traditional."
		),
	},
	"zh-TW": {
		"name": "Chinese (Traditional)",
		"native_name": "中文（繁體）",
		"register": "Use formal Mandarin Chinese with traditional characters (繁體中文).",
	},
}


def get_language_name(lang_code: str) -> str:
	"""Get the display name for a language code.

	Checks LANGUAGE_CONFIG first, then falls back to Frappe's Language list.
	"""
	config = LANGUAGE_CONFIG.get(lang_code) or LANGUAGE_CONFIG.get(
		lang_code.split("-")[0]
	)
	if config:
		return config["name"]

	# Frappe stores language names in the Language DocType
	try:
		name = frappe.db.get_value("Language", lang_code, "language_name")
		if name:
			return name
	except Exception:
		pass

	return lang_code


def get_language_instructions(lang_code: str | None = None) -> str:
	"""Build language-specific system prompt instructions.

	Args:
		lang_code: Frappe locale code (e.g. "ar", "de", "fr", "ja").
			If None, reads from frappe.local.lang.

	Returns:
		Language instruction text to inject into the system prompt,
		or empty string for English users.
	"""
	if not lang_code:
		lang_code = getattr(frappe.local, "lang", None) or "en"

	# English users don't need language instructions
	if lang_code.startswith("en"):
		return ""

	language_name = get_language_name(lang_code)
	base_lang = lang_code.split("-")[0]
	config = LANGUAGE_CONFIG.get(lang_code) or LANGUAGE_CONFIG.get(base_lang) or {}

	parts = [
		"# Language Instructions",
		f"The user's interface language is {language_name} ({lang_code}).",
		f"You MUST respond in {language_name}.",
		f"Maintain consistent use of {language_name} throughout your entire response.",
		"Do not switch to English mid-response unless quoting code, API names, or technical identifiers.",
		"When presenting data from documents, translate field labels but keep field values as-is.",
		"Keep tool parameters, DocType names, and API field names in English (these are system identifiers).",
	]

	register = config.get("register")
	if register:
		parts.append(register)

	return "\n".join(parts)
