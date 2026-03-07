# Playbook: Issue Triage

Use this playbook when evaluating, scoping, or prioritising a GitHub issue.

---

## Checklist

- [ ] **Read the issue in full**
  - Understand what the reporter observed vs. what they expected.
  - Note any reproduction steps, environment details, or attached logs.

- [ ] **Classify the issue type**

  | Label       | Description                                   |
  | ----------- | --------------------------------------------- |
  | `bug`       | Confirmed defect in existing behaviour        |
  | `feat`      | New feature or enhancement request            |
  | `docs`      | Documentation gap or error                    |
  | `chore`     | Maintenance: deps, tooling, CI                |
  | `question`  | Needs clarification before it can be acted on |
  | `wont-fix`  | Out of scope or intentional behaviour         |
  | `duplicate` | Already tracked in another issue              |

- [ ] **Assess reproducibility**
  - Can the issue be reproduced from the steps provided?
  - If not, add a comment asking for more detail (environment, version, minimal repro).

- [ ] **Identify the affected area**
  - Which workspace(s) does this touch? (`apps/web`, `apps/api`, `packages/*`, etc.)
  - Is it a regression (worked before) or a never-implemented case?

- [ ] **Estimate scope and risk**
  - Small (< 1 day, single file): note it.
  - Medium (1–3 days, single workspace): note it.
  - Large (> 3 days, cross-workspace or breaking change): flag for team discussion.

- [ ] **Write a triage summary comment** on the issue:

  ```markdown
  **Triage Summary**

  - Type: <bug | feat | docs | …>
  - Area: <workspace or component>
  - Reproducible: yes / no / needs-info
  - Scope: small / medium / large
  - Suggested next step: <pick a playbook or request more info>
  ```

- [ ] **Suggest the right playbook**

  | Issue type | Playbook                                         |
  | ---------- | ------------------------------------------------ |
  | Bug        | [`fix-bug.md`](./fix-bug.md)                     |
  | Feature    | [`implement-feature.md`](./implement-feature.md) |
  | Docs gap   | [`update-docs.md`](./update-docs.md)             |
  | Refactor   | [`safe-refactor.md`](./safe-refactor.md)         |
  | Tests only | [`write-tests.md`](./write-tests.md)             |

---

## Example Prompt

```
Triage GitHub issue #42: "API returns 500 when the request body is empty".
Follow the conventions in docs/ai/how-we-work.md.
```

## Example Output

```markdown
### Plan

1. Read issue #42 and reproduction steps.
2. Check `apps/api` request-parsing middleware for missing body validation.
3. Classify and scope.

### Triage Summary

- Type: bug
- Area: apps/api — request parsing middleware
- Reproducible: yes (empty POST body → unhandled null access → 500)
- Scope: small (single middleware file, ~5 lines)
- Suggested next step: use fix-bug.md playbook; write regression test first

### Risks & Assumptions

- No schema validation library is currently in use; fix will be a manual guard.
- Did not attempt a fix in this triage — scope confirmation expected first.
```
