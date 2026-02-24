#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Sync the Jana app version across all version files.

Usage:
    python bump_version.py --from-changelog
    python bump_version.py --version 0.1.0
"""

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent

VERSION_FILES = {
	"VERSION": ROOT / "VERSION",
	"jana/__init__.py": ROOT / "jana" / "__init__.py",
	"frontend/package.json": ROOT / "frontend" / "package.json",
	"README.md": ROOT / "README.md",
}


def get_version_from_changelog() -> str:
	"""Extract the latest version from docs/CHANGELOG.md."""
	changelog = (ROOT / "docs" / "CHANGELOG.md").read_text(encoding="utf-8")
	match = re.search(r"## \[(\d+\.\d+\.\d+)\]", changelog)
	if not match:
		raise SystemExit("ERROR: No version found in docs/CHANGELOG.md")
	return match.group(1)


def update_version_file(version: str) -> None:
	"""Write plain version string to VERSION."""
	VERSION_FILES["VERSION"].write_text(version + "\n", encoding="utf-8")


def update_init_py(version: str) -> None:
	"""Update __version__ in jana/__init__.py."""
	path = VERSION_FILES["jana/__init__.py"]
	content = path.read_text(encoding="utf-8")
	content = re.sub(r'__version__ = "[^"]*"', f'__version__ = "{version}"', content)
	path.write_text(content, encoding="utf-8")


def update_package_json(version: str) -> None:
	"""Update version in frontend/package.json."""
	path = VERSION_FILES["frontend/package.json"]
	data = json.loads(path.read_text(encoding="utf-8"))
	data["version"] = version
	path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def update_readme(version: str) -> None:
	"""Update the version badge in README.md."""
	path = VERSION_FILES["README.md"]
	content = path.read_text(encoding="utf-8")
	content = re.sub(
		r"version-[0-9]+\.[0-9]+\.[0-9]+",
		f"version-{version}",
		content,
	)
	path.write_text(content, encoding="utf-8")


def main():
	parser = argparse.ArgumentParser(description="Sync Jana app version across all files.")
	group = parser.add_mutually_exclusive_group(required=True)
	group.add_argument(
		"--from-changelog",
		action="store_true",
		help="Read version from the first ## [x.y.z] heading in docs/CHANGELOG.md",
	)
	group.add_argument(
		"--version",
		type=str,
		help="Explicit version string (e.g. 0.1.0)",
	)
	args = parser.parse_args()

	version = args.version if args.version else get_version_from_changelog()

	if not re.match(r"^\d+\.\d+\.\d+$", version):
		raise SystemExit(f"ERROR: Invalid version format: {version}")

	print(f"Bumping version to {version}")
	print()

	update_version_file(version)
	print(f"  VERSION               -> {version}")

	update_init_py(version)
	print(f"  jana/__init__.py      -> {version}")

	update_package_json(version)
	print(f"  frontend/package.json -> {version}")

	update_readme(version)
	print(f"  README.md             -> {version}")

	print()
	print("Done. All version files are in sync.")


if __name__ == "__main__":
	main()
