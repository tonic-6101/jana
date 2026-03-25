# Jana — Repository Guidelines

Jana is an AI assistant app for the Tonic ecosystem (Layer 3).

```
Layer 0  Frappe Core
Layer 1  Dock          ← optional dependency
Layer 3  Jana          ← this app
```

## Stack

- **Backend:** Frappe v16+, Python 3.14+, MariaDB
- **Frontend:** Vue 3 SPA + TypeScript + Tailwind CSS + FrappeUI

## Dependencies

- `frappe` (framework)

## Build & Development Commands

```bash
# Frontend development (HMR, instant feedback)
cd frontend && npm install && npm run dev

# Production build (only before pushing)
bench build --app jana

# Backend
bench --site <site> migrate
bench run-tests --app jana
bench --site <site> clear-cache
```

**During development, always use `npm run dev`.** Only run `bench build` when preparing to push.

## Coding Style

### TypeScript (mandatory for frontend)

All new code in `frontend/src/` must be TypeScript (`.ts` or `<script lang="ts">`).

### License Headers

```python
# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic
```

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
```

```vue
<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
```

Exceptions: JSON, Markdown, config files, auto-generated files.

### Translation (i18n)

All user-facing strings must be wrapped for translation:

```typescript
import { __ } from '@/composables/useTranslate'
```

```python
from frappe import _
```

After adding strings, update all CSV files in `jana/translations/`.

## Dock Integration (optional)

Jana can work standalone or integrate with Dock. If Dock is installed, Jana registers with the app switcher, search, and notifications via hook declarations in `hooks.py`. Always check for Dock's presence before using Dock features:

```python
if "dock" in frappe.get_installed_apps():
    # Dock-specific integration
```

## Commit Guidelines

```
feat(scope): description
fix(scope): description
docs(scope): description
refactor(scope): description
```

## Git Workflow

- Remote: `upstream` | Default branch: `develop`
- **Always** specify remote and branch: `git push upstream develop`
- **Always** pull before push: `git pull upstream develop --rebase`
- **Never** force push unless explicitly requested

### Preparing a Push

```bash
bench build --app jana                     # 1. Build frontend (if changed)
bench --site <site> clear-cache            # 2. Clear cache
python3 bump_version.py patch              # 3. Bump version
git add -A && git commit -m "feat: ..."    # 4. Commit
git pull upstream develop --rebase         # 5. Pull
git push upstream develop                  # 6. Push
```

### Version Files

`bump_version.py` updates all — never edit just one:

| File | Controls |
|------|----------|
| `VERSION` | Canonical source |
| `jana/__init__.py` | `__version__` |
| `pyproject.toml` | `version` |
| `frontend/package.json` | `"version"` |

## Frappe v16 — Known Issues

- Single DocType `issingle` flag may not sync during migrate — fix via SQL
- Default sort order is `creation` (not `modified`) — always specify sort explicitly
- `has_permission` hooks must return explicit `True`
- State-changing methods require POST (not GET)

## Multi-Agent Safety

- Do **not** create/apply/drop `git stash` entries unless explicitly requested
- Do **not** switch branches unless explicitly requested
- When you see unrecognized files, focus on your changes and leave others untouched

## Dependency Safety

- Exact versions for patched dependencies (no `^` or `~`)
- Patching dependencies requires explicit maintainer approval

## Bug Investigation

- Read source code of relevant dependencies before concluding
- Aim for high-confidence root cause, not surface-level fixes
