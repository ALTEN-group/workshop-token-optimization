# VS Code · Module 07 — Lever 5: Deterministic Controls 🟡

**Goal:** add **tests, linters, and security checks** so the agent's work is verified by machines, not vibes, stopping errors before they compound.

> Deterministic guardrails effectively reset per-step accuracy back toward 1.0 by catching mistakes immediately. See [compounding error](../../concepts/c2-compounding-error.md).

---

## Why guardrails change agent economics

An agent that can **run a test and see red** will fix its own mistake before it propagates. Without that signal, a wrong step silently becomes the foundation for the next step, the classic `p^n` collapse. Guardrails are how you make agent output *trustworthy at scale*.

---

## Exercise A : Add a linter (a new guardrail)

The sample app has **no ESLint config** (`npm run lint` can't enforce anything yet).

1. New Chat, **Agent** mode. Add [`package.json`](../../sample-app/package.json) and [`tsconfig.json`](../../sample-app/tsconfig.json).
2. Prompt:

   ```text
   Add ESLint for this TypeScript project: install the needed dev dependencies, create a flat eslint config that lints src/**/*.ts with the recommended TypeScript rules, and make `npm run lint` work. Done when `npm run lint` runs and reports results.
   ```

3. Run `npm run lint`. Fix or triage what it flags (with the agent's help).

You just gave every future agent task a new automatic check.

---

## Exercise B : Tests as the contract

1. New Chat, **Agent** mode. Add [`routes.ts`](../../sample-app/src/routes.ts) and the existing [`tasks.test.ts`](../../sample-app/src/tasks.test.ts) as a style reference.
2. Prompt:

   ```text
   Write Jest + supertest tests for POST /tasks covering: valid input returns 201; missing title returns 400; empty title returns 400; priority out of 1–5 returns 400. Put them in src/routes.test.ts. Done when the tests run; it's fine if some fail because validation isn't implemented yet. That's the point.
   ```

3. Run `npm test`. Failing tests now **define** the validation you (or the agent) must make pass. Tests-first turns a fuzzy requirement into a deterministic target.

---

## Exercise C : Security check (fix the ReDoS)

`GET /tasks/search` builds a `RegExp` from raw user input, a denial-of-service vector.

1. New Chat, **Agent** mode. Add only [`routes.ts`](../../sample-app/src/routes.ts).
2. Prompt:

   ```text
   The GET /tasks/search endpoint passes user input straight into new RegExp(), which allows ReDoS. Replace it with a safe case-insensitive substring match. Add a test in src/routes.test.ts that a normal query still works. Done when no `new RegExp` remains and tests pass.
   ```

3. Confirm with `npm test` and a manual `curl "http://localhost:3000/tasks/search?q=ship"`.

Start the server with `npm run dev` in another terminal for the curl.

---

## Wire guardrails into your loop

From now on, end implementation prompts with a verifiable check, e.g.:

```text
...Done when `npm run build`, `npm test`, and `npm run lint` all pass.
```

That single clause makes the agent self-correct instead of handing you broken work.

---

## Expected outcome

The sample app now has a linter, validation tests, and a fixed security hole, and you've made "green checks" your default stop condition.

➡️ Next: [08 — Advanced controls](08-advanced-controls.md)
