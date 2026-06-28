# VS Code · Module 06 — Lever 4: Workflow Design 🟡

**Goal:** split a non-trivial change into **Research → Plan → Implement**, each with its own clean context, and see why this beats one-shot "do everything."

> Benefits: cleaner context · better quality · lower token usage. Shorter chains keep `p^n` high (see [compounding error](../../concepts/c2-compounding-error.md)).

---

## The task

Refactor the sample app so business logic, routing, and storage are cleanly separated, and add proper validation, **without breaking the existing tests**. That's too big for one prompt.

---

## Phase 1 : Research (Agent mode, read-only by instruction)

1. New Chat, **Agent** mode, capable model.
2. Add [`routes.ts`](../../sample-app/src/routes.ts), [`tasks.ts`](../../sample-app/src/tasks.ts), [`store.ts`](../../sample-app/src/store.ts), [`types.ts`](../../sample-app/src/types.ts).
3. Prompt:

   ```text
   Don't change any source code. Map how a POST /tasks request flows through these files and list the responsibilities that are currently mixed together. Identify the smallest set of changes to separate routing, validation, business logic, and storage. Write your analysis to RESEARCH.md.
   ```

Agent mode can write files, so it saves `RESEARCH.md` directly, the "Don't change any source code" instruction keeps it read-only against the app. You now have a durable, reusable research artifact.

---

## Phase 2 : Plan (Agent mode, read-only by instruction)

1. **New Chat** (reset!). Stay in **Agent** mode. Add `RESEARCH.md` as context.
2. Prompt:

   ```text
   Read RESEARCH.md and write PLAN.md: a numbered checklist of small, independently testable steps, ordered so tests stay green throughout. Don't change any source code yet.
   ```

Agent mode writes `PLAN.md` for you while the instruction keeps it from touching the app. Review `PLAN.md` *before* spending tokens on implementation, it's cheap to fix a list, expensive to redo code.

> **Note:** VS Code also has a dedicated **Plan** mode that's purpose-built for this phase and stays read-only automatically (no "don't change code" reminder needed), but it renders the plan in chat rather than writing a file. We use **Agent** mode in all three phases here so you learn the underlying workflow, Research → Plan → Implement, with explicit control and durable `RESEARCH.md`/`PLAN.md` artifacts. Once the pattern is second nature, reach for Plan mode to do Phase 2 with less ceremony.

---

## Phase 3 : Implement (Agent mode, one step at a time)

1. **New Chat** (reset again). Switch to **Agent** mode.
2. Add `PLAN.md` plus only the files the first step needs, then prompt **one step**. Example:

   ```text
   From PLAN.md, do step 1 only: extract input validation for POST /tasks into a validateCreateTask function in a new file src/validation.ts, and call it from routes.ts. Keep behavior identical for valid input. Done when `npm run build` passes and existing tests stay green.
   ```

3. Run `npm run build` and `npm test` after **each** step. Only advance when green.

Because the plan lives in `PLAN.md`, the reset doesn't lose it, each Agent step reads the file instead of relying on a discarded chat.

---

## Compare against one-shot

For contrast, in a fresh session try the *whole* refactor in a single prompt
("separate everything and add validation"). Compare:

| | Research→Plan→Implement | One-shot |
| --- | --- | --- |
| Tests stayed green throughout? | | |
| Retries / corrections | | |
| Could you review before code? | | |

The phased approach almost always produces cleaner diffs you can actually review, with fewer surprises.

---

## Expected outcome

You ran a real change through Research → Plan → Implement with resets between phases, and you can explain how shorter, verified steps keep error from compounding.

➡️ Next: [07 — Lever 5: Deterministic controls](07-deterministic-controls.md)
