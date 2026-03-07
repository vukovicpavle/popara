# Playbook: Fix Bug

Use this playbook when diagnosing and resolving a defect.

---

## Checklist

- [ ] **Reproduce the bug first**
  - Read the issue description and identify a minimal reproduction case.
  - Confirm the bug exists on the current `main` branch before touching code.

- [ ] **Isolate the root cause**
  - Trace the failure to a single function, module, or data path.
  - Do not fix symptoms — fix the root cause.

- [ ] **Write a failing test first** _(regression test)_
  - The test must fail on `main` and pass after the fix.
  - See [`write-tests.md`](./write-tests.md) for guidance.

- [ ] **Fix the bug**
  - Make the smallest change that makes the failing test pass.
  - Do **not** refactor surrounding code in the same commit (open a separate [`safe-refactor`](./safe-refactor.md) task if needed).

- [ ] **Check for related issues**
  - Search for similar patterns in the same file or module.
  - If additional bugs are found, open new issues — do not fix them in this PR.

- [ ] **Validate**

  ```bash
  pnpm lint
  pnpm format
  pnpm typecheck
  ```

- [ ] **Commit**

  ```
  fix(<scope>): <short description of what was fixed>
  ```

- [ ] **Produce agent output** using the [Output Contract](../../docs/ai/how-we-work.md#agent-output-contract).

---

## Example Prompt

```
Fix the bug in `apps/api` where a missing `Authorization` header causes an
unhandled exception instead of returning a 401 response.
Reproduce it with a test first, then fix it.
Follow the conventions in docs/ai/how-we-work.md.
```

## Example Output

```markdown
### Plan

1. Add a failing test in `apps/api/src/middleware/auth.test.ts` that sends a
   request with no Authorization header and asserts a 401 response.
2. Update `apps/api/src/middleware/auth.ts` to return 401 when the header is absent.

### Files Changed

- `apps/api/src/middleware/auth.ts` — guard against missing Authorization header
- `apps/api/src/middleware/auth.test.ts` — regression test

### Verification

- `pnpm lint` → passed
- `pnpm format` → passed
- `pnpm typecheck` → passed
- New test: fails on main, passes after fix ✓

### Risks & Assumptions

- Only the missing-header case is addressed; malformed tokens are out of scope for this fix.
```
