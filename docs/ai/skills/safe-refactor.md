# Playbook: Safe Refactor

Use this playbook when restructuring code without changing observable behaviour.

---

## Checklist

- [ ] **Confirm scope is purely internal**
  - No change to public APIs, exported types, or CLI interfaces.
  - No intentional behaviour change — if you find a bug while refactoring, fix it in a separate commit.

- [ ] **Ensure test coverage exists before you start**
  - If the code to be refactored lacks tests, write them first (see [`write-tests.md`](./write-tests.md)).
  - Tests are your safety net — they prove behaviour is preserved.

- [ ] **Make small, incremental steps**
  - Rename → commit. Extract function → commit. Move file → commit.
  - Do not combine rename + logic change in a single commit.

- [ ] **Check all import paths after moving files**
  - Update all consumers of moved/renamed modules.
  - Use `pnpm typecheck` to catch missed references.

- [ ] **Do not reformat unrelated code**
  - If you need to reformat, do it in a dedicated `style:` commit separate from the refactor.

- [ ] **Validate**

  ```bash
  pnpm lint
  pnpm format
  pnpm typecheck
  ```

  Then run affected workspace tests.

- [ ] **Commit**

  ```
  refactor(<scope>): <short description>
  ```

- [ ] **Produce agent output** using the [Output Contract](../how-we-work.md#agent-output-contract).

---

## High-Impact Operations — Require Confirmation

Before performing any of the following, **stop and ask for explicit human approval**:

| Operation                                     | Why it's risky                              |
| --------------------------------------------- | ------------------------------------------- |
| Renaming a package or workspace directory     | Breaks all consumers and import paths       |
| Moving files across workspace boundaries      | May affect tree-shaking, bundling, aliases  |
| Changing `tsconfig.json` `paths` or `baseUrl` | Can silently break resolution in CI         |
| Removing or renaming exported symbols         | Constitutes a breaking change               |
| Mass rename affecting > 10 files              | High blast radius; easy to miss a reference |

---

## Example Prompt

```
Refactor `apps/api/src/auth/auth-service.ts` to extract the token-validation
logic into a separate `validate-token.ts` module.
No behaviour changes — only structure.
Follow the conventions in docs/ai/how-we-work.md.
```

## Example Output

```markdown
### Plan

1. Extract `validateToken` function to `apps/api/src/auth/validate-token.ts`.
2. Update `auth-service.ts` to import from the new module.
3. Update barrel export in `apps/api/src/auth/index.ts` if one exists.

### Files Changed

- `apps/api/src/auth/validate-token.ts` — extracted function (new file)
- `apps/api/src/auth/auth-service.ts` — import updated
- `apps/api/src/auth/index.ts` — re-export added

### Verification

- `pnpm lint` → passed
- `pnpm format` → passed
- `pnpm typecheck` → passed
- Existing auth tests: all passed

### Risks & Assumptions

- No public API surface changed; `validateToken` was previously private.
- No other workspace imports `auth-service` directly.
```
