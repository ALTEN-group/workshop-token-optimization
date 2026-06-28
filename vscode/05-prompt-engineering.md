# VS Code · Module 05 — Lever 3: Prompt Engineering 🟡

**Goal:** turn vague asks into **precise prompts with explicit context and stop conditions**.

> Be precise · add stop conditions · provide context explicitly.

---

## The anatomy of a strong prompt

```text
[ROLE/INTENT]  What you want, in one sentence.
[CONTEXT]      Which files/facts matter.
[CONSTRAINTS]  What NOT to touch; rules to follow.
[DONE WHEN]    The stop condition the agent can verify.
```

A **stop condition** is the single biggest upgrade most people can make. It stops the agent from "helpfully" wandering into unrelated changes (which compounds errors and burns tokens).

---

## Exercise A : Rewrite a weak prompt

Weak prompt:

```text
make the search better
```

Rewrite it for the `GET /tasks/search` endpoint in [`routes.ts`](../../sample-app/src/routes.ts). Aim for all four parts above.

<details>
<summary>Sample strong rewrite</summary>

```text
In sample-app/src/routes.ts, the GET /tasks/search endpoint builds a RegExp directly
from the user's `q` query param, which allows ReDoS. Replace the regex matching with a
safe case-insensitive substring match (String.prototype.includes on lower-cased values).
Do not change any other endpoint. Done when: searching `q=review` still returns the
"Review pull request" task and no `new RegExp` remains in the file.
```

</details>

Run it (Agent mode, add only `routes.ts`). Verify the behavior in the "Done when" clause.

---

## Exercise B : Stop conditions prevent scope creep

1. New Chat, **Agent** mode. Add [`tasks.ts`](../../sample-app/src/tasks.ts).
2. Prompt **without** a stop condition:

   ```text
   clean up tasks.ts
   ```

   Observe how far it roams (renames? comments? reformat? touches other files?).
3. New Chat. Same file. Prompt **with** a tight stop condition:

   ```text
   In tasks.ts, add a one-line JSDoc comment above topTasks describing what it returns.
   Change nothing else. Done when only that comment is added.
   ```

Compare scope, edits, and your correction effort.

---

## Exercise C : Make context explicit, not assumed

Instead of "you know the conventions", state them:

```text
Follow these rules: use 2-space indentation; prefer `const`; no `any`; functions return
values rather than throwing for expected cases.
```

Notice the model can't read your mind or your team wiki, explicit beats implicit every time.

---

## Prompt checklist (keep handy)

- [ ] One clear intent
- [ ] The *right* files added (not too many)
- [ ] Explicit constraints / "don't touch X"
- [ ] A verifiable **Done when** stop condition

---

## Expected outcome

You can convert vague requests into precise, bounded prompts, and you've seen stop conditions visibly shrink scope creep and rework.

➡️ Next: [06 — Lever 4: Workflow design](06-workflow-design.md)
