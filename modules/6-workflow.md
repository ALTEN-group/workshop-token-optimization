# Module 6 — Lever 4: Workflow 🟡

**Goal:** split a non-trivial change into **think → Plan → Code**, each with its own clean context, and see why this beats one-shot "do everything."

> Benefits: cleaner context · better quality · lower token usage. Shorter chains keep compounding error low.

---

## The task

Add `POST /roles` to create a roles resource, following the same layering as `POST /routes` (router, service, entity, SQL if needed). Keep the app booting after every step. There is no test suite yet (that arrives in module 7).

Do **not** also refactor the existing routes stack. One change, three phases.

---

## Phase 1: Think (Plan mode)

1. New Chat, **Plan** mode, capable model.
2. Add [`src/app.js`](../src/app.js), [`src/routes/route.js`](../src/routes/route.js), [`src/services/route.js`](../src/services/route.js), [`01-route.sql`](../db/liquibase/workshop/versions/01-struct/01-route.sql).
3. Prompt:

   ```text
   Map and explain how a POST /routes request flows through these files and list the responsibilities. Identify the smallest set of changes to create a new POST route to create "roles" resource. Save your findings to think.md.
   ```

Open **Chat: Show Memory Files** to confirm that `think.md` was saved. Session memory ends with the chat, so this artifact does not carry into the next phase.

---

## Phase 2: Plan (Plan mode)

1. **New Chat**. **Plan** mode. Add `THINK.md` as context.
2. Prompt:

   ```text
   Write a detailed implementation plan: a numbered checklist of small, independently verifiable steps, ordered so the app keeps booting after each step.
   ```

Plan mode saves the plan to `/memories/session/plan.md`. Review it before spending tokens on implementation; it is cheap to fix a list and expensive to redo code.

> **Agent-mode variant:** Plan mode's session-memory files do not survive this exercise's chat resets. Use **Agent** mode for Phases 1 and 2, and ask it to write `THINK.md` and `PLAN.md` to the workspace. Add a "don't change source code" reminder in that mode.

---

## Phase 3: Implement (Agent mode, one step at a time)

1. **New Chat**. **Agent** mode.
2. Add `PLAN.md` and files needed for the first step, then prompt **one step**. Example:

   ```text
   From PLAN.md, do step 1 only. Change nothing else. Stop when that step is done and the app still starts.
   ```

3. Check your container (or that the process still starts) **each** step. Only advance when it still boots.

Because the plan lives in `PLAN.md`, each implementation chat can read it.

---

## Compare against one-shot

In a **new** Chat, **Agent** mode, same files as Phase 1, try the *same* `POST /roles` work in a single prompt:

```text
Add POST /roles to create a roles resource, matching how POST /routes is layered
(router, service, entity, SQL if needed). Do the entire change in this session.
Keep the app able to start. Do not refactor existing route code.
```

Compare diffs, surprises, and how much you had to steer. The phased approach almost always produces a reviewable diff with fewer side effects.

---

## Expected outcome

You ran a real change through Think → Plan → Code with resets between phases, and you can explain how shorter, verified steps keep error from compounding.

➡️ Next: [7 — Lever 5: Deterministic controls](7-deterministic-controls.md)
