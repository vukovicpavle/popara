# Contributing to Documentation

Guidelines for keeping the Popara docs accurate, discoverable, and low-maintenance.

## When to Update Docs

| Situation                           | Action                                                 |
| ----------------------------------- | ------------------------------------------------------ |
| New feature shipped                 | Update or create the relevant section doc              |
| API / CLI surface changed           | Update affected docs in the same PR as the code change |
| Architecture decision made          | Add an ADR under `docs/architecture/`                  |
| Onboarding step changed             | Update `docs/getting-started/README.md`                |
| Standard or convention adopted      | Update `docs/standards/README.md`                      |
| Outdated or incorrect content found | Open a PR to fix it, even without a linked issue       |

**Rule of thumb:** If a new contributor would be confused without an update, update the docs.

## Where Things Go

```
docs/
├── getting-started/   # Installation, prerequisites, first run
├── architecture/      # System design, ADRs
├── development/       # Workflows, branching, debugging
├── standards/         # Coding conventions, commit rules, review criteria
├── operations/        # Deployment, environment config, monitoring
├── ai/                # AI agent guidelines and playbooks
├── templates/         # Reusable doc templates
└── contributing.md    # This file
```

When in doubt, place the doc in the section closest to its primary audience:

- Developer-facing how-to → `development/`
- Rule or convention → `standards/`
- System design → `architecture/`

## Creating a New Doc Page

1. Copy `docs/templates/new-doc.md` to the appropriate section.
2. Rename the file to `kebab-case.md`.
3. Fill in the template sections — remove any that don't apply.
4. Add a link to the new page from the section's `README.md`.
5. If the page is significant, link to it from `docs/README.md` too.

## Style Guidelines

- Use **Markdown** for all docs.
- Prefer **tables** for structured comparisons, **checklists** for steps, and **code blocks** for commands.
- Keep headings to a maximum of **three levels** (`##`, `###`, `####`).
- Avoid deep nesting — flatten structure where possible.
- Use relative links between docs (e.g., `../standards/README.md`), not absolute URLs.
- Write in **second person** ("you") for how-to guides and **third person** for reference material.

## Review Expectations

Documentation PRs follow the same review process as code PRs:

- At least one reviewer must approve.
- CI must pass (Prettier format check covers Markdown).
- The author is responsible for cross-linking the new page correctly.

For small fixes (typos, broken links), a single approval is sufficient.
