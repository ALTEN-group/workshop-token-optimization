# Module 07 — Lever 5: Deterministic Controls 🟡

**Goal:** add **tests, linters, and security checks** so the agent's work is verified by machines, stopped before errors compound.

> Deterministic guardrails effectively reset per-step accuracy by catching mistakes immediately.

---

## Why guardrails change agent economics

An agent that can **run a test and see red** will fix its own mistake before it propagates. Without that signal, a wrong step silently becomes the foundation for the next step. Guardrails are how you make agent output *trustworthy at scale*.

---

## Exercise A : Add a linter (a new guardrail)

The sample app has **no ESLint config**.

1. New Chat, **Agent** mode. Add [`package.json`](../package.json).
2. Prompt:

   ```text
   Add ESLint for this project: install the needed dev dependencies, create a flat eslint config that lints src/**/*.js files with the recommended JavaScript rules, and make `npm run lint` work. Done when `npm run lint` runs and reports results.
   ```

3. Run `npm run lint`. Fix or triage what it flags (with the agent's help).

You just gave every future agent task a new automatic check.

---

## Exercise B : Tests as the contract

1. New Chat, **Agent** mode. Add [`route.js`](../src/routes/route.js).
2. Prompt:

   ```text
   Write Jest + supertest tests for POST /routes covering: valid input returns 201; missing values returns 400; empty values returns 400. Put them in tests/routes.test.js. Done when the tests run; it is fine if most test fails because validation is not implemented yet.
   ```

3. Run `npm test`. Failing tests now **define** the validation you (or the agent) must make pass. Tests-first turns a fuzzy requirement into a deterministic target.

---

## Exercise C : Security check

1. New Chat, **Agent** mode. Add only [`route.js`](../src/routes/route.js).
2. Prompt:

   ```text
   Create security instructions for any routes that checks for SQL injection and other vulnerabilities whenever we create/update a route.
   ```

3. Confirm with a check of the existing route.

---

## Wire guardrails into your loop

From now on, end implementation prompts with a verifiable check, e.g.:

   ```text
   ...Done when `npm run build`, `npm test`, `npm run lint` and security checks pass.
   ```

That single clause makes the agent self-correct instead of handing you broken work.

---

## Expected outcome

The sample app now has a linter, validation tests, and security checks instructions, and you have made "green checks" your default stop condition.

➡️ Next: [08 — Persistent context](8-persistent-context.md)
