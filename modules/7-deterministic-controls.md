# Module 7 — Lever 5: Deterministic controls 🟡

**Goal:** add **tests, linters, and security checks** so the agent's work is verified by machines, stopped before errors compound.

> Deterministic guardrails effectively reset per-step accuracy by catching mistakes immediately.

---

## Why guardrails change agent economics

An agent that can **run a test and see red** will fix its own mistake before it propagates. Without that signal, a wrong step silently becomes the foundation for the next step. Guardrails are how you make agent output *trustworthy at scale*.

---

## Exercise A: Add a linter (a new guardrail)

The sample app has **no ESLint config** and **no `lint` script**. Jest is named in `package.json` (`npm test`) but is **not installed**. This module is where those guardrails appear.

1. New Chat, **Agent** mode. Add [`package.json`](../package.json).
2. Prompt:

   ```text
   Add ESLint for this project: install the needed dev dependencies, create a flat eslint config that lints src/**/*.js files with the recommended JavaScript rules, and add an `npm run lint` script. Done when `npm run lint` runs and reports results.
   ```

3. Run `npm run lint`. Fix or triage what it flags (with the agent's help).

You just gave every future agent task a new automatic check.

---

## Exercise B: Tests as the contract

Labs are **cumulative**. Module 4 attached `checkRoutePattern` to `POST /routes`. These tests lock that contract in. If you skipped module 4, the 400 cases may fail until you wire the validator — that is still useful: red tests become the target.

1. New Chat, **Agent** mode. Add [`route.js`](../src/routes/route.js).
2. Prompt:

   ```text
   Install Jest and supertest, then write tests for POST /routes covering: valid input returns 201; missing values returns 400; empty values returns 400. Put them in tests/routes.test.js. Done when `npm test` actually runs the new tests. If module 4 is done, the 400 cases should be able to pass; if validation is still missing, it is fine if they fail.
   ```

3. Run `npm test`. Red tests are a contract to satisfy; green 400 cases mean module 4’s validator is doing its job.

---

## Exercise C: Enable the ReDoS guardrail

`check-route-pattern.js` already detects nested-quantifier (ReDoS) patterns and invalid regexes. The `return next({ statusCode: 400, ... })` branches may still be commented out after module 4, or they may already be live.

1. New Chat, **Agent** mode. Add [`src/middlewares/validators/check-route-pattern.js`](../src/middlewares/validators/check-route-pattern.js).
2. Prompt:

   ```text
   In src/middlewares/validators/check-route-pattern.js, enable the ReDoS and
   invalid-regex 400 responses if they are still commented out. Do not add a
   new security-instructions file. Done when invalid nested-quantifier patterns
   and uncompilable regexes return HTTP 400.
   ```

3. Confirm against the existing `POST /routes` / `PUT /routes` validator, not a new endpoint.

---

## Wire guardrails into your loop

From now on, end implementation prompts with a verifiable check, e.g.:

   ```text
   ...Done when `npm test` and `npm run lint` pass.
   ```

That single clause makes the agent self-correct instead of handing you broken work.

---

## Expected outcome

The sample app now has a linter, validation tests, and an enabled ReDoS/invalid-regex check, and you have made "green checks" your default stop condition.

➡️ Next: [8 — Persistent context](8-persistent-context.md)
