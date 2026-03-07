# AI Guidance — Popara Monorepo

This directory is the single source of truth for AI-assisted development in this repository.
Start here before picking up any task.

## Contents

| File / Directory                                                           | Purpose                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| [`how-we-work.md`](./how-we-work.md)                                       | Core conventions: structure, style, validation flow |
| [`skills/implement-feature.md`](../../.github/skills/implement-feature.md) | Playbook — add a new feature                        |
| [`skills/fix-bug.md`](../../.github/skills/fix-bug.md)                     | Playbook — diagnose and fix a bug                   |
| [`skills/write-tests.md`](../../.github/skills/write-tests.md)             | Playbook — write or improve tests                   |
| [`skills/update-docs.md`](../../.github/skills/update-docs.md)             | Playbook — update documentation                     |
| [`skills/safe-refactor.md`](../../.github/skills/safe-refactor.md)         | Playbook — safe, behaviour-preserving refactors     |
| [`skills/issue-triage.md`](../../.github/skills/issue-triage.md)           | Playbook — triage and scope a GitHub issue          |

The short-form summary for GitHub Copilot lives in [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md).

## How to Use These Docs

1. Read [`how-we-work.md`](./how-we-work.md) once to absorb repo conventions.
2. Pick the playbook that matches your current task.
3. Follow the checklist in the playbook step-by-step.
4. Produce an output using the **Agent Output Contract** defined in [`how-we-work.md`](./how-we-work.md#agent-output-contract).
5. Run the **pre-merge checklist** before marking a PR ready for review.

## Pre-Merge Checklist

Run these commands and confirm all pass:

```bash
pnpm lint        # ESLint across all workspaces
pnpm format      # Prettier format check
pnpm typecheck   # TypeScript type checking
```

CI will also validate commit message formatting via `commitlint`.
