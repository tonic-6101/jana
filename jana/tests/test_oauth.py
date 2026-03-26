# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Tests for Google OAuth integration."""

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch


class TestGoogleBaseUrl(unittest.TestCase):
	"""Tests for OpenAIProvider._get_base_url() Google routing."""

	def _make_provider(self, provider_type="google", api_base_url=None):
		from jana.services.llm.openai_provider import OpenAIProvider

		doc = SimpleNamespace(
			name="Test Provider",
			provider_name="Test Provider",
			provider_type=provider_type,
			api_base_url=api_base_url,
			auth_method="OAuth",
			connected_app="Google Gemini",
		)
		return OpenAIProvider(doc, user="test@example.com")

	def test_google_default_url(self):
		"""Google provider should use generativelanguage.googleapis.com by default."""
		provider = self._make_provider("google")
		url = provider._get_base_url()
		self.assertEqual(url, "https://generativelanguage.googleapis.com/v1beta/openai")

	def test_google_custom_url(self):
		"""Google provider should allow overriding the base URL."""
		provider = self._make_provider("google", api_base_url="https://custom.example.com/v1")
		url = provider._get_base_url()
		self.assertEqual(url, "https://custom.example.com/v1")

	def test_openai_default_url(self):
		"""OpenAI provider should use api.openai.com."""
		provider = self._make_provider("openai")
		url = provider._get_base_url()
		self.assertEqual(url, "https://api.openai.com/v1")

	def test_openrouter_default_url(self):
		"""OpenRouter provider should use openrouter.ai."""
		provider = self._make_provider("openrouter")
		url = provider._get_base_url()
		self.assertEqual(url, "https://openrouter.ai/api/v1")


class TestResolveCredential(unittest.TestCase):
	"""Tests for OpenAIProvider._resolve_credential() OAuth branch."""

	def _make_provider(self, auth_method="OAuth", provider_type="google"):
		from jana.services.llm.openai_provider import OpenAIProvider

		doc = SimpleNamespace(
			name="Test Provider",
			provider_name="Test Provider",
			provider_type=provider_type,
			api_base_url=None,
			auth_method=auth_method,
			connected_app="Google Gemini",
		)
		return OpenAIProvider(doc, user="test@example.com")

	@patch("jana.services.llm.base.frappe")
	def test_google_oauth_uses_token(self, mock_frappe):
		"""Google OAuth provider should resolve credential via OAuth token."""
		provider = self._make_provider("OAuth", "google")

		mock_token_cache = MagicMock()
		mock_token_cache.get_password.return_value = "ya29.fake-google-token"

		mock_app = MagicMock()
		mock_app.get_active_token.return_value = mock_token_cache
		mock_frappe.get_doc.return_value = mock_app

		token = provider._resolve_credential()
		self.assertEqual(token, "ya29.fake-google-token")
		mock_app.get_active_token.assert_called_once_with("test@example.com")

	@patch("jana.services.llm.base.frappe")
	def test_google_oauth_no_token_raises(self, mock_frappe):
		"""Google OAuth provider should throw when no token is available."""
		mock_frappe._ = lambda x: x
		mock_frappe.ValidationError = Exception

		def throw(msg, title=None):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider = self._make_provider("OAuth", "google")

		mock_app = MagicMock()
		mock_app.get_active_token.return_value = None
		mock_frappe.get_doc.return_value = mock_app

		with self.assertRaises(Exception) as ctx:
			provider._resolve_credential()
		self.assertIn("Google account not connected", str(ctx.exception))

	@patch("jana.services.llm.base.frappe")
	def test_api_key_provider_skips_oauth(self, mock_frappe):
		"""API Key auth should not attempt OAuth resolution."""
		provider = self._make_provider("API Key", "google")

		mock_frappe.db.get_value.return_value = None

		# Mock get_decrypted_password at the module level
		with patch("jana.services.llm.base.get_decrypted_password", return_value="sk-test-key"):
			token = provider._resolve_credential()
		self.assertEqual(token, "sk-test-key")


class TestInitiateGoogleOAuth(unittest.TestCase):
	"""Tests for jana.api.oauth.initiate_google_oauth."""

	@patch("jana.api.oauth.frappe")
	def test_rejects_non_google_provider(self, mock_frappe):
		"""Should reject providers that are not Google type."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider_doc = SimpleNamespace(
			provider_type="openai",
			auth_method="OAuth",
			connected_app="Test",
		)
		mock_frappe.get_doc.return_value = provider_doc

		from jana.api.oauth import initiate_google_oauth

		with self.assertRaises(Exception) as ctx:
			initiate_google_oauth("OpenAI Provider")
		self.assertIn("only for Google", str(ctx.exception))

	@patch("jana.api.oauth.frappe")
	def test_rejects_api_key_auth(self, mock_frappe):
		"""Should reject Google providers with API Key auth."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider_doc = SimpleNamespace(
			provider_type="google",
			auth_method="API Key",
			connected_app="Test",
		)
		mock_frappe.get_doc.return_value = provider_doc

		from jana.api.oauth import initiate_google_oauth

		with self.assertRaises(Exception) as ctx:
			initiate_google_oauth("Google Provider")
		self.assertIn("not configured for OAuth", str(ctx.exception))

	@patch("jana.api.oauth.frappe")
	def test_rejects_missing_connected_app(self, mock_frappe):
		"""Should reject when Connected App is not configured."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider_doc = SimpleNamespace(
			provider_type="google",
			auth_method="OAuth",
			connected_app=None,
		)
		mock_frappe.get_doc.return_value = provider_doc

		from jana.api.oauth import initiate_google_oauth

		with self.assertRaises(Exception) as ctx:
			initiate_google_oauth("Google Provider")
		self.assertIn("Connected App is required", str(ctx.exception))

	@patch("jana.api.oauth.frappe")
	def test_returns_auth_url(self, mock_frappe):
		"""Should return auth URL from Connected App flow."""
		mock_frappe._ = lambda x: x

		provider_doc = SimpleNamespace(
			provider_type="google",
			auth_method="OAuth",
			connected_app="Google Gemini",
		)

		connected_app_doc = MagicMock()
		connected_app_doc.initiate_web_application_flow.return_value = (
			"https://accounts.google.com/o/oauth2/v2/auth?client_id=test"
		)

		def get_doc(doctype, name=None):
			if doctype == "Jana Provider":
				return provider_doc
			if doctype == "Connected App":
				return connected_app_doc
			return MagicMock()

		mock_frappe.get_doc = get_doc

		from jana.api.oauth import initiate_google_oauth

		result = initiate_google_oauth("Google Provider")
		self.assertIn("auth_url", result)
		self.assertIn("accounts.google.com", result["auth_url"])
		connected_app_doc.initiate_web_application_flow.assert_called_once_with(
			success_uri="/app",
		)


class TestGetOAuthStatus(unittest.TestCase):
	"""Tests for jana.api.oauth.get_oauth_status."""

	@patch("jana.api.oauth.frappe")
	def test_google_checks_token_cache(self, mock_frappe):
		"""Google status should check Token Cache with correct name format."""
		mock_frappe.session.user = "test@example.com"
		mock_frappe.get_all.return_value = [
			SimpleNamespace(name="Google Provider", provider_name="Google Gemini", provider_type="google"),
		]
		mock_frappe.db.get_value.return_value = "My Connected App"
		mock_frappe.db.exists.return_value = True

		from jana.api.oauth import get_oauth_status

		result = get_oauth_status()
		mock_frappe.db.exists.assert_called_with(
			"Token Cache", "My Connected App-test@example.com"
		)
		self.assertTrue(result["Google Provider"]["connected"])


class TestDisconnectOAuth(unittest.TestCase):
	"""Tests for jana.api.oauth.disconnect_oauth."""

	@patch("jana.api.oauth.frappe")
	def test_google_disconnect_uses_correct_name(self, mock_frappe):
		"""Google disconnect should delete Token Cache by name, not filter."""
		mock_frappe.session.user = "test@example.com"

		provider_doc = SimpleNamespace(
			provider_type="google",
			connected_app="Google Gemini",
		)
		mock_frappe.get_doc.return_value = provider_doc
		mock_frappe.db.exists.return_value = True

		from jana.api.oauth import disconnect_oauth

		result = disconnect_oauth("Google Provider")
		mock_frappe.db.exists.assert_called_with(
			"Token Cache", "Google Gemini-test@example.com"
		)
		mock_frappe.delete_doc.assert_called_once_with(
			"Token Cache", "Google Gemini-test@example.com", ignore_permissions=True
		)
		self.assertTrue(result["success"])


class TestGoogleHttpErrors(unittest.TestCase):
	"""Tests for Google-specific HTTP error handling in OpenAIProvider."""

	def _make_provider(self):
		from jana.services.llm.openai_provider import OpenAIProvider

		doc = SimpleNamespace(
			name="Test Provider",
			provider_name="Test Provider",
			provider_type="google",
			api_base_url=None,
			auth_method="OAuth",
			connected_app="Google Gemini",
		)
		return OpenAIProvider(doc, user="test@example.com")

	@patch("jana.services.llm.openai_provider.frappe")
	def test_401_google_token_expired(self, mock_frappe):
		"""Google 401 should mention token expired."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider = self._make_provider()
		response = MagicMock()
		response.status_code = 401

		with self.assertRaises(Exception) as ctx:
			provider._handle_http_error(Exception("401"), response)
		self.assertIn("invalid or expired", str(ctx.exception))

	@patch("jana.services.llm.openai_provider.frappe")
	def test_403_api_not_enabled(self, mock_frappe):
		"""Google 403 with 'not enabled' should guide to Cloud Console."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider = self._make_provider()
		response = MagicMock()
		response.status_code = 403
		response.json.return_value = {
			"error": {"message": "Generative Language API has not been enabled"}
		}

		with self.assertRaises(Exception) as ctx:
			provider._handle_http_error(Exception("403"), response)
		self.assertIn("not enabled", str(ctx.exception))

	@patch("jana.services.llm.openai_provider.frappe")
	def test_403_scope_denied(self, mock_frappe):
		"""Google 403 without 'not enabled' should mention scopes."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider = self._make_provider()
		response = MagicMock()
		response.status_code = 403
		response.json.return_value = {
			"error": {"message": "Permission denied"}
		}

		with self.assertRaises(Exception) as ctx:
			provider._handle_http_error(Exception("403"), response)
		self.assertIn("OAuth scopes", str(ctx.exception))

	@patch("jana.services.llm.openai_provider.frappe")
	def test_429_rate_limit(self, mock_frappe):
		"""Google 429 should mention rate limit."""
		mock_frappe._ = lambda x: x

		def throw(msg):
			raise Exception(msg)

		mock_frappe.throw = throw

		provider = self._make_provider()
		response = MagicMock()
		response.status_code = 429

		with self.assertRaises(Exception) as ctx:
			provider._handle_http_error(Exception("429"), response)
		self.assertIn("rate limit", str(ctx.exception))
