# VS Code · Module 10 — Capstone 🔴

**Goal:** combine all five levers to ship one clean, verified feature on the sample app, and prove the difference with your scorecard.

---

## The brief

> Add a **`PATCH /tasks/:id`** endpoint that lets a client update a task's `title`, `priority`, or `done` status. It must validate input, reject unknown IDs with 404, follow project conventions, and keep all checks green.

This touches routing, validation, business logic, and storage, a realistic, multi-step change.

---

## Run it through all five levers

Treat this as a graded exercise. Hit every lever consciously:

1. **Model selection (Lever 1)**
   - Use a **capable** model for the research/plan phases; you may drop to a **smaller** model for mechanical edits.

2. **Workflow design (Lever 4)** : do it in phases, resetting between each:
   - **Research (Ask):** add `routes.ts`, `store.ts`, `tasks.ts`, `types.ts`. Ask how updates should flow and what's missing in the store to support an update-by-id. Write the analysis to `RESEARCH.md`.
   - **Plan (Plan mode):** new session, read `RESEARCH.md` and write `PLAN.md`: a small, ordered, testable checklist. Review it before any code.
   - **Implement (Agent):** new session, one step at a time.

3. **Context optimization (Lever 2)**
   - In each phase, add **only** the files that phase needs. Reset between phases.

4. **Prompt engineering (Lever 3)**
   - Every implementation prompt must include explicit constraints and a verifiable **Done when** stop condition.

5. **Deterministic controls (Lever 5)**
   - First write/extend tests in `src/routes.test.ts` describing the new behavior (valid patch → 200; unknown id → 404; invalid priority → 400).
   - End every implement step with: `Done when npm run build, npm test, and npm run lint pass.`

If you built `.github/copilot-instructions.md` in Module 08, the agent should already honor conventions without restating them.

---

## Acceptance checklist

- [ ] `PATCH /tasks/:id` updates `title`, `priority`, and/or `done`
- [ ] Invalid input → `400`; unknown id → `404`; success → `200`
- [ ] New tests cover all three cases and pass
- [ ] `npm run build`, `npm test`, `npm run lint` all green
- [ ] No `any`, no `new RegExp` on user input, conventions followed
- [ ] You completed it in phases with session resets

---

## Final scorecard + reflection

Fill in one last scorecard for the whole capstone, then answer:

1. How many retries did this take vs. the "gamble" task back in Module 01?
2. Which lever saved you the most rework?
3. What will you turn into a persistent instruction so it's free next time?

---

## Top 5 actions : your takeaway

1. **Choose the right model.**
2. **Write clear prompts.**
3. **Split tasks.**
4. **Add deterministic guardrails.**
5. **Maintain concise instructions.**

👉 **Make every token count.**

---

🎉 You've finished the VS Code track. Want the same lessons from the terminal? Try the [Copilot CLI track](../cli/README.md).
