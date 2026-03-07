# Playbook: Write Tests

Use this playbook when adding, improving, or fixing tests for any workspace.

---

## Checklist

- [ ] **Identify what needs coverage**
  - New feature → unit + integration tests.
  - Bug fix → regression test that would have caught the bug.
  - Refactor → confirm existing tests pass; add missing coverage where found.

- [ ] **Use the existing test runner and conventions**
  - Check the workspace `package.json` for the `test` script.
  - Mirror the file structure: `src/foo/bar.ts` → `src/foo/bar.test.ts`.
  - Do not introduce a new test framework without team approval.

- [ ] **Write focused, deterministic tests**
  - One behaviour per test case.
  - Avoid relying on external services; use mocks/stubs for I/O.
  - Avoid hardcoded dates, IDs, or environment-specific values.
  - Prefer `describe` / `it` naming that reads like a sentence:
    ```
    describe('useTheme', () => {
      it('returns isDark=false by default', () => { … })
    })
    ```

- [ ] **Cover edge cases**
  - Empty inputs, boundary values, error paths.
  - If the code throws, assert the error type and message.

- [ ] **Validate**

  ```bash
  pnpm lint
  pnpm format
  pnpm typecheck
  ```

  Then run the workspace test command (e.g., `pnpm --filter <workspace> test`).

- [ ] **Commit**

  ```
  test(<scope>): <short description>
  ```

- [ ] **Produce agent output** using the [Output Contract](../../docs/ai/how-we-work.md#agent-output-contract).

---

## Test Expectations by Change Type

| Change Type    | Required Tests                                                  |
| -------------- | --------------------------------------------------------------- |
| New feature    | Unit tests for logic; integration test for public API surface   |
| Bug fix        | Regression test that would have caught the bug                  |
| Refactor       | Existing tests pass; new tests added where coverage was missing |
| Perf change    | Benchmark or metric proving improvement                         |
| Docs / CI only | No new tests required                                           |

---

## Example Prompt

```
Add tests for the `formatCurrency` utility in `packages/utils`.
It currently has no test file.
Follow the conventions in docs/ai/how-we-work.md.
```

## Example Output

```markdown
### Plan

1. Create `packages/utils/src/format-currency.test.ts`.
2. Cover: standard values, zero, negative numbers, custom locale, missing
   currency code (error path).

### Files Changed

- `packages/utils/src/format-currency.test.ts` — new test file (6 test cases)

### Verification

- `pnpm lint` → passed
- `pnpm format` → passed
- `pnpm typecheck` → passed
- `pnpm --filter @popara/utils test` → 6 passed

### Risks & Assumptions

- Used the existing test runner via `pnpm --filter @popara/utils test`.
```
