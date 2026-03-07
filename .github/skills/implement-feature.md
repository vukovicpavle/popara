# Playbook: Implement Feature

Use this playbook when adding new user-visible functionality to any workspace.

---

## Checklist

- [ ] **Understand the requirement**
  - Re-read the issue or ticket in full.
  - Identify affected workspace(s): `apps/*`, `packages/*`, or `tooling/*`.
  - Clarify ambiguous acceptance criteria before writing code.

- [ ] **Locate the right workspace**
  - Shared logic → `packages/`
  - App-specific UI or routes → `apps/web` or `apps/mobile`
  - API endpoints or business logic → `apps/api`

- [ ] **Design before coding**
  - Sketch the public API / component interface.
  - Consider backward compatibility (existing callers, DB schema, REST contract).
  - Flag breaking changes with `feat!` commit type.

- [ ] **Implement**
  - Follow naming conventions (see [`how-we-work.md`](../../docs/ai/how-we-work.md#naming)).
  - Keep functions small and single-purpose.
  - Export only what consumers need; keep internals private.

- [ ] **Write tests**
  - Unit tests for all new functions/components.
  - Integration test for any new public API surface.
  - See [`write-tests.md`](./write-tests.md) for detail.

- [ ] **Validate**

  ```bash
  pnpm lint
  pnpm format
  pnpm typecheck
  ```

- [ ] **Commit**

  ```
  feat(<scope>): <short description>
  ```

- [ ] **Produce agent output** using the [Output Contract](../../docs/ai/how-we-work.md#agent-output-contract).

---

## Example Prompt

```
Implement a new `useTheme` hook in `packages/ui` that reads a `theme` value
from React context and exposes `isDark: boolean` and `toggle: () => void`.
Follow the conventions in docs/ai/how-we-work.md.
```

## Example Output

```markdown
### Plan

1. Add `ThemeContext` and `ThemeProvider` in `packages/ui/src/theme/context.tsx`.
2. Add `useTheme` hook in `packages/ui/src/theme/use-theme.ts`.
3. Re-export from `packages/ui/src/index.ts`.
4. Add unit tests in `packages/ui/src/theme/use-theme.test.ts`.

### Files Changed

- `packages/ui/src/theme/context.tsx` — new context and provider
- `packages/ui/src/theme/use-theme.ts` — new hook
- `packages/ui/src/index.ts` — re-export
- `packages/ui/src/theme/use-theme.test.ts` — unit tests

### Verification

- `pnpm lint` → passed
- `pnpm format` → passed
- `pnpm typecheck` → passed

### Risks & Assumptions

- Assumes React ≥18 peer dependency already declared in `packages/ui`.
- No existing `ThemeContext` was found; created a new one.
```
