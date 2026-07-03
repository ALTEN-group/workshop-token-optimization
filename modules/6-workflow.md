# Module 06 — Lever 4: Workflow 🟡

**Goal:** split a non-trivial change into **think → Plan → Code**, each with its own clean context, and see why this beats one-shot "do everything."

> Benefits: cleaner context · better quality · lower token usage. Shorter chains keep compounding error low.

---

## The task

Refactor the sample app so business logic, routing, and storage are cleanly separated, and add proper validation, **without breaking the existing tests**. That's too big for one prompt.

---

## Phase 1 : Think (Ask mode, read-only by instruction)

1. New Chat, **Agent** mode, capable model.
2. Add [`app.js`](../src/app.js), [`route.js route `](../src/routes/route.js), [`route.js service`](../src/services/route.js), [`01-route.sql`](../db/liquibase/workshop/versions/01-struct/01-route.sql).
3. Prompt:

   ```text
   Do not change source code. Map and explain how a POST /route request flows through these files and list the responsibilities. Identify the smallest set of changes to create a new POST route to create "roles" resource. Write your analysis to THINK.md.
   ```

Agent mode can write files, so it saves `THINK.md` directly, the "Don't change source code" instruction keeps it read-only against the app. You now have a durable, reusable research artifact.

---

## Phase 2 : Plan (Agent mode, read-only by instruction)

1. **New Chat**. **Agent** mode. Add `THINK.md` file as context.
2. Prompt:

   ```text
   Write a detailed PLAN.md: a numbered checklist of small, independently testable steps, ordered so tests stay green throughout. Don't change any source code yet.
   ```

Agent mode writes `PLAN.md` for you while the instruction keeps it from touching the app. Review `PLAN.md` before spending tokens on implementation, it's cheap to fix a list, expensive to redo code.

> **Note:** VS Code also has a dedicated **Plan** mode that's purpose-built for this phase and stays read-only automatically (no "don't change code" reminder needed), but it renders the plan in chat rather than writing a file. We use **Agent** mode in all three phases here so you learn the underlying workflow, Think → Plan → Implement, with explicit control and durable `THINK.md`/`PLAN.md` artifacts. Once the pattern is second nature, reach for Plan mode to do Phase 1 and 2 with less ceremony.

---

## Phase 3 : Implement (Agent mode, one step at a time)

1. **New Chat** (reset again). **Agent** mode.
2. Add `PLAN.md` and possibly the files needed for the first step, then prompt **one step**. Example:

   ```text
   From PLAN.md, do step 1 only: (add description is necessary)
   ```

3. Check your container **each** step. Only advance when green.

Because the plan lives in `PLAN.md`, the reset doesn't lose it, each Agent step reads the file instead of relying on a discarded chat.

---

## Compare against one-shot

For contrast, in a fresh session try the *whole* refactor in a single prompt

Compare:
The phased approach almost always produces cleaner diffs you can actually review, with fewer surprises.

---

## Expected outcome

You ran a real change through Think → Plan → Code with resets between phases, and you can explain how shorter, verified steps keep error from compounding.

➡️ Next: [07 — Lever 5: Deterministic controls](7-deterministic-controls.md)
