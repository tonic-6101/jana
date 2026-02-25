# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Knowledge Article text extraction tests.

Run with:
    bench --site jana.localhost run-tests --app jana --module jana.tests.test_knowledge_extraction

These tests verify PDF, DOCX, and TXT extraction without requiring
actual library installations (mocked imports).
"""

import os
import tempfile
import unittest
from unittest.mock import MagicMock, mock_open, patch

from jana.services.knowledge.extractor import (
	_resolve_file_path,
	extract_from_txt,
	extract_text,
)


class TestResolveFilePath(unittest.TestCase):
	"""Test Frappe file URL to filesystem path resolution."""

	@patch("jana.services.knowledge.extractor.frappe")
	def test_public_file_url(self, mock_frappe):
		mock_frappe.get_site_path.return_value = "/sites/test.localhost"
		result = _resolve_file_path("/files/guide.pdf")
		self.assertEqual(result, "/sites/test.localhost/public/files/guide.pdf")

	@patch("jana.services.knowledge.extractor.frappe")
	def test_private_file_url(self, mock_frappe):
		mock_frappe.get_site_path.return_value = "/sites/test.localhost"
		result = _resolve_file_path("/private/files/manual.docx")
		self.assertEqual(result, "/sites/test.localhost/private/files/manual.docx")

	@patch("jana.services.knowledge.extractor.frappe")
	def test_absolute_path_passthrough(self, mock_frappe):
		result = _resolve_file_path("/tmp/test.txt")
		self.assertEqual(result, "/tmp/test.txt")

	@patch("jana.services.knowledge.extractor.frappe")
	def test_unknown_url_returns_empty(self, mock_frappe):
		mock_frappe.get_site_path.return_value = "/sites/test.localhost"
		result = _resolve_file_path("relative/path.pdf")
		self.assertEqual(result, "")


class TestExtractText(unittest.TestCase):
	"""Test the main extract_text dispatcher."""

	@patch("jana.services.knowledge.extractor.frappe")
	def test_empty_url_returns_empty(self, mock_frappe):
		result = extract_text("")
		self.assertEqual(result, "")

	@patch("jana.services.knowledge.extractor.frappe")
	def test_none_url_returns_empty(self, mock_frappe):
		result = extract_text(None)
		self.assertEqual(result, "")

	@patch("jana.services.knowledge.extractor.os.path.isfile", return_value=True)
	@patch("jana.services.knowledge.extractor._resolve_file_path", return_value="/tmp/test.xyz")
	@patch("jana.services.knowledge.extractor.frappe")
	def test_unsupported_extension_returns_empty(self, mock_frappe, mock_resolve, mock_isfile):
		result = extract_text("/files/test.xyz")
		self.assertEqual(result, "")
		mock_frappe.log_error.assert_called()

	@patch("jana.services.knowledge.extractor.os.path.isfile", return_value=False)
	@patch("jana.services.knowledge.extractor._resolve_file_path", return_value="/tmp/missing.pdf")
	@patch("jana.services.knowledge.extractor.frappe")
	def test_missing_file_returns_empty(self, mock_frappe, mock_resolve, mock_isfile):
		result = extract_text("/files/missing.pdf")
		self.assertEqual(result, "")
		mock_frappe.log_error.assert_called()


class TestExtractFromTxt(unittest.TestCase):
	"""Test plain text file extraction."""

	def test_reads_txt_content(self):
		with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as f:
			f.write("Hello, this is test content.\nLine two.")
			f.flush()
			result = extract_from_txt(f.name)
		os.unlink(f.name)
		self.assertEqual(result, "Hello, this is test content.\nLine two.")

	def test_empty_file_returns_empty(self):
		with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as f:
			f.write("")
			f.flush()
			result = extract_from_txt(f.name)
		os.unlink(f.name)
		self.assertEqual(result, "")


class TestExtractFromPdf(unittest.TestCase):
	"""Test PDF extraction with mocked PyPDF2."""

	@patch("jana.services.knowledge.extractor.frappe")
	def test_pdf_extraction(self, mock_frappe):
		mock_page1 = MagicMock()
		mock_page1.extract_text.return_value = "Page one content"
		mock_page2 = MagicMock()
		mock_page2.extract_text.return_value = "Page two content"

		mock_reader = MagicMock()
		mock_reader.pages = [mock_page1, mock_page2]

		with patch.dict("sys.modules", {"PyPDF2": MagicMock()}):
			with patch("jana.services.knowledge.extractor.extract_from_pdf") as mock_extract:
				mock_extract.return_value = "Page one content\n\nPage two content"
				from jana.services.knowledge.extractor import extract_from_pdf

				result = mock_extract("/tmp/test.pdf")

		self.assertEqual(result, "Page one content\n\nPage two content")

	@patch("jana.services.knowledge.extractor.frappe")
	def test_pdf_missing_library(self, mock_frappe):
		"""When PyPDF2 is not installed, return empty and log error."""
		with patch.dict("sys.modules", {"PyPDF2": None}):
			from jana.services.knowledge.extractor import extract_from_pdf

			result = extract_from_pdf("/tmp/test.pdf")
		# ImportError caught — returns empty
		self.assertEqual(result, "")


class TestExtractFromDocx(unittest.TestCase):
	"""Test DOCX extraction with mocked python-docx."""

	@patch("jana.services.knowledge.extractor.frappe")
	def test_docx_missing_library(self, mock_frappe):
		"""When python-docx is not installed, return empty and log error."""
		with patch.dict("sys.modules", {"docx": None}):
			from jana.services.knowledge.extractor import extract_from_docx

			result = extract_from_docx("/tmp/test.docx")
		self.assertEqual(result, "")


class TestControllerExtraction(unittest.TestCase):
	"""Test the Knowledge Article controller extraction hook."""

	def test_extract_called_when_content_empty(self):
		"""When source_file is set and content is empty, extraction runs."""
		mock_doc = MagicMock()
		mock_doc.source_file = "/files/guide.pdf"
		mock_doc.content = None
		mock_doc.get_plain_content.return_value = ""

		with patch(
			"jana.services.knowledge.extractor.extract_text", return_value="Extracted text"
		) as mock_extract:
			from jana.jana.doctype.jana_knowledge_article.jana_knowledge_article import JanaKnowledgeArticle

			JanaKnowledgeArticle.extract_content_from_file(mock_doc)
			mock_extract.assert_called_once_with("/files/guide.pdf")

	def test_extract_not_called_when_content_present(self):
		"""When content already exists, extraction is skipped."""
		mock_doc = MagicMock()
		mock_doc.source_file = "/files/guide.pdf"
		mock_doc.content = "Existing content"
		mock_doc.get_plain_content.return_value = "Existing content"

		with patch("jana.services.knowledge.extractor.extract_text") as mock_extract:
			from jana.jana.doctype.jana_knowledge_article.jana_knowledge_article import JanaKnowledgeArticle

			JanaKnowledgeArticle.extract_content_from_file(mock_doc)
			mock_extract.assert_not_called()

	def test_extract_not_called_when_no_file(self):
		"""When no source_file is set, extraction is skipped."""
		mock_doc = MagicMock()
		mock_doc.source_file = None

		with patch("jana.services.knowledge.extractor.extract_text") as mock_extract:
			from jana.jana.doctype.jana_knowledge_article.jana_knowledge_article import JanaKnowledgeArticle

			JanaKnowledgeArticle.extract_content_from_file(mock_doc)
			mock_extract.assert_not_called()
