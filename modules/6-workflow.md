# Module 6 — Lever 4: Workflow 🟡

**Goal:** split a non-trivial change into **think → Plan → Code**, each with its own clean context, and see why this beats one-shot "do everything."

> Benefits: cleaner context · better quality · lower token usage. Shorter chains keep compounding error low.

---

## The task

Add `POST /roles` to create a roles resource, following the same layering as `POST /routes` (router, service, entity, SQL if needed). Keep the app booting after every step. There is no test suite yet (that arrives in module 7).

Do **not** also refactor the existing routes stack. One change, three phases.

---

## Phase 1: Think (Agent mode, read-only by instruction)

1. New Chat, **Agent** mode, capable model.
2. Add [`src/app.js`](../src/app.js), [`src/routes/route.js`](../src/routes/route.js), [`src/services/route.js`](../src/services/route.js), [`01-route.sql`](../db/liquibase/workshop/versions/01-struct/01-route.sql).
3. Prompt:

   ```text
   Do not change source code. Map and explain how a POST /routes request flows through these files and list the responsibilities. Identify the smallest set of changes to create a new POST route to create "roles" resource. Write your analysis to THINK.md.
   ```

Agent mode can write files, so it saves `THINK.md` directly, the "Don't change source code" instruction keeps it read-only against the app. You now have a durable, reusable research artifact.

---

## Phase 2: Plan (Agent mode, read-only by instruction)

1. **New Chat**. **Agent** mode. Add `THINK.md` file as context.
2. Prompt:

   ```text
   Write a detailed PLAN.md: a numbered checklist of small, independently verifiable steps, ordered so the app keeps booting after each step. Don't change any source code yet.
   ```

Agent mode writes `PLAN.md` for you while the instruction keeps it from touching the app. Review `PLAN.md` before spending tokens on implementation, it's cheap to fix a list, expensive to redo code.

> **Note:** VS Code Copilot also has a dedicated **Plan** mode that stays read-only automatically (no "don't change code" reminder needed), but it renders the plan in chat rather than writing a file. We use **Agent** mode in all three phases here so you learn Think → Plan → Implement with durable `THINK.md`/`PLAN.md` artifacts. Once the pattern is second nature, use Plan mode for phases 1 and 2 with less ceremony.

---

## Phase 3: Implement (Agent mode, one step at a time)

1. **New Chat** (reset again). **Agent** mode.
2. Add `PLAN.md` and possibly the files needed for the first step, then prompt **one step**. Example:

   ```text
   From PLAN.md, do step 1 only. Change nothing else. Stop when that step is done and the app still starts.
   ```

3. Check your container (or that the process still starts) **each** step. Only advance when it still boots.

Because the plan lives in `PLAN.md`, the reset doesn't lose it, each Agent step reads the file instead of relying on a discarded chat.

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
