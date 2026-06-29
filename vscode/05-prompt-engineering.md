# Module 05 — Lever 3: Prompt Engineering 🟡

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

## Exercise A : Rewrite a weak prompt

Weak prompt:

```text
make the search better
```

Rewrite it for the `GET /route/search` endpoint in [`route.js`](../../src/routes/route.js).


```text
In src/routes/route.js, the GET /route/search endpoint does nothing.
Look into node_modules @dwtechs/Antity-pgsql library and use it to handle the search functionality with filter capabilities.

```

Run it (Agent mode, add only `route.js`).

---

## Exercise B : Stop conditions prevent scope creep

1. New Chat, **Agent** mode. Add [`route.js`](../../src/routes/route.js).
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

## Exercise C : Make context explicit, not assumed

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

➡️ Next: [06 — Lever 4: Workflow design](06-workflow-design.md)
