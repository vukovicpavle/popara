# Playbook: Update Docs

Use this playbook when updating READMEs, inline code comments, or files under `docs/`.

---

## Checklist

- [ ] **Identify what changed**
  - A new feature, API, script, or config was added → document it.
  - Existing behaviour changed → update affected docs.
  - A doc contains stale/wrong info → correct it.

- [ ] **Find all affected doc locations**
  - `README.md` (root and per-workspace)
  - `docs/` directory
  - Inline JSDoc comments on exported functions/types
  - GitHub issue / PR templates if a workflow changed

- [ ] **Write clearly and concisely**
  - Use plain English. Avoid jargon where possible.
  - Prefer bullet lists and code blocks over long paragraphs.
  - Keep examples runnable — copy-paste should work.

- [ ] **Keep docs in sync with code**
  - If you update a function signature, update its JSDoc.
  - If you add a new CLI flag, add it to the README table.
  - If a command changes, update every place it appears.

- [ ] **Validate Markdown** _(optional but recommended)_
  - Check for broken links and malformed tables.
  - Run `pnpm format` — Prettier formats Markdown files too.

- [ ] **Commit**

  ```
  docs(<scope>): <short description>
  ```

- [ ] **Produce agent output** using the [Output Contract](../how-we-work.md#agent-output-contract).

---

## Example Prompt

```
The `pnpm dev` script in apps/web now accepts a `--port` flag.
Update the root README and apps/web/README.md to document the new flag.
Follow the conventions in docs/ai/how-we-work.md.
```

## Example Output

```markdown
### Plan

1. Add a "Dev flags" section to `apps/web/README.md` showing `--port` usage.
2. Update the "Getting Started" section in the root `README.md` with a note
   about the flag.

### Files Changed

- `apps/web/README.md` — new "Dev flags" section
- `README.md` — updated "Getting Started" with --port note

### Verification

- `pnpm format` → passed (Markdown formatted)

### Risks & Assumptions

- No other docs referenced the `pnpm dev` invocation for `apps/web`.
```
