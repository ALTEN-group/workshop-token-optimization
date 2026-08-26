# Module 5 — Lever 3: Prompt engineering 🟡

**Goal:** turn vague asks into **precise prompts with explicit context and stop conditions**.

> Be precise · add stop conditions · provide context explicitly.

---

## The anatomy of a strong prompt

```text
[INTENT]  What you want, in one sentence.
[CONTEXT]      Which files/facts matter.
[CONSTRAINTS]  What NOT to touch; rules to follow.
[DONE WHEN]    The stop condition the agent can verify.
```

A **stop condition** is the single biggest upgrade most people can make. It stops the agent from "helpfully" wandering into unrelated changes, which compounds errors quickly and burns tokens.

---

## Exercise A: Rewrite a weak prompt

Weak prompt:

```text
make the search better
```

Rewrite it for `POST /routes/search` in [`src/routes/route.js`](../src/routes/route.js). Add that file and [`src/entities/route.js`](../src/entities/route.js). Do **not** add `node_modules`.

Example that follows the anatomy above:

```text
INTENT: Make POST /routes/search run a filtered select, same pattern as POST /routes.
CONTEXT: src/routes/route.js currently uses send204 on /search. Use rEnt from
src/entities/route.js and @dwtechs/antity-pgsql the way addArraySubstack does.
CONSTRAINTS: Do not change POST /, PUT /, or /archive. Do not open node_modules.
DONE WHEN: POST /routes/search performs a filtered query and you list the files you changed.
```

Run it (Agent mode).

---

## Exercise B: Stop conditions prevent scope creep

1. New Chat, **Agent** mode. Add [`route.js`](../src/routes/route.js).
2. Prompt **without** a stop condition:

   ```text
   clean up route.js
   ```

   Observe how far it roams (renames? comments? reformat? touches other files?).

3. New Chat. Same file. Prompt **with** a tight stop condition:

   ```text
   In src/routes/route.js, add a one-line comment above all routes describing what it returns.
   Change nothing else. Done when comments are added.
   ```

Compare scope, edits, and your correction effort.

---

## Exercise C: Make context explicit, not assumed

Instead of "you know the conventions", state them:

```text
Follow these rules: use 2-space indentation; prefer `const`; use `@ts-check`; functions return
values rather than throwing for expected cases.
```

Notice the model cannot read your mind or your team wiki, explicit beats implicit every time.

---

## Prompt checklist (keep handy)

- [ ] One clear intent
- [ ] The *right* files added (not too many)
- [ ] Explicit constraints / "don't touch X"
- [ ] A verifiable **Done when** stop condition

---

## Expected outcome

You can convert vague requests into precise, bounded prompts, and you have seen stop conditions visibly shrink scope creep and rework.

➡️ Next: [6 — Lever 4: Workflow](6-workflow.md)
