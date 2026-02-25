# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""
Text extraction from PDF, DOCX, and TXT files for Knowledge Articles.

All library imports are deferred so the service degrades gracefully
when PyPDF2 or python-docx are not installed.
"""

import os

import frappe


def extract_text(file_url: str) -> str:
	"""Extract text content from a file attached to a Knowledge Article.

	Args:
		file_url: Frappe file URL (e.g. ``/files/guide.pdf`` or
			``/private/files/manual.docx``).

	Returns:
		Extracted plain text, or empty string on failure.
	"""
	if not file_url:
		return ""

	file_path = _resolve_file_path(file_url)
	if not file_path or not os.path.isfile(file_path):
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message=f"File not found: {file_url}",
		)
		return ""

	ext = os.path.splitext(file_path)[1].lower()

	extractors = {
		".pdf": extract_from_pdf,
		".docx": extract_from_docx,
		".txt": extract_from_txt,
	}

	extractor = extractors.get(ext)
	if not extractor:
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message=f"Unsupported file type: {ext}",
		)
		return ""

	return extractor(file_path)


def extract_from_pdf(file_path: str) -> str:
	"""Extract text from a PDF file using PyPDF2."""
	try:
		from PyPDF2 import PdfReader
	except ImportError:
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message="PyPDF2 is not installed. Run: pip install PyPDF2",
		)
		return ""

	try:
		reader = PdfReader(file_path)
		pages = []
		for page in reader.pages:
			text = page.extract_text()
			if text:
				pages.append(text)
		return "\n\n".join(pages)
	except Exception as e:
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message=f"PDF extraction failed for {file_path}: {e}",
		)
		return ""


def extract_from_docx(file_path: str) -> str:
	"""Extract text from a DOCX file using python-docx."""
	try:
		from docx import Document
	except ImportError:
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message="python-docx is not installed. Run: pip install python-docx",
		)
		return ""

	try:
		doc = Document(file_path)
		paragraphs = []
		for para in doc.paragraphs:
			text = para.text.strip()
			if text:
				paragraphs.append(text)
		return "\n\n".join(paragraphs)
	except Exception as e:
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message=f"DOCX extraction failed for {file_path}: {e}",
		)
		return ""


def extract_from_txt(file_path: str) -> str:
	"""Read plain text from a TXT file."""
	try:
		with open(file_path, encoding="utf-8") as f:
			return f.read()
	except Exception as e:
		frappe.log_error(
			title="Jana Knowledge Extraction",
			message=f"TXT read failed for {file_path}: {e}",
		)
		return ""


def _resolve_file_path(file_url: str) -> str:
	"""Convert a Frappe file URL to an absolute filesystem path.

	Handles both public (``/files/``) and private (``/private/files/``)
	URL patterns.
	"""
	site_path = frappe.get_site_path()

	if file_url.startswith("/private/files/"):
		return os.path.join(site_path, "private", "files", file_url[len("/private/files/"):])

	if file_url.startswith("/files/"):
		return os.path.join(site_path, "public", "files", file_url[len("/files/"):])

	# Absolute path passed directly (e.g. in tests)
	if os.path.isabs(file_url):
		return file_url

	return ""
