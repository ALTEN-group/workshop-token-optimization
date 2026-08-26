# Module 1 — Agent guessing 🟢

**Goal:** Test the cost of the "agent gambling" anti-pattern by deliberately doing it, then doing it right, and compare.

---

## Part A: Gamble on purpose (the wrong way)

1. New Chat session, **Agent** mode, model **Auto**.
2. Give it this deliberately weak prompt, **no file context, vague ask**:

   ```text
   The workshop service is broken, fix it.
   ```

3. Whatever it does, resist helping. If it asks questions or guesses wrong, give equally vague nudges ("still broken", "no that's wrong"). **Stop after 3 retries** even if unsolved.

   `Note: Part A can succeed on the first shot, but it usually burns more tokens/credits because the agent is searching and guessing more than it could.`

---

## Part B: Invest up front (the right way)

1. **Start a brand-new Chat session** (clean context).
2. **Agent** mode. Add precise context: drag and drop [`src/services/route.js`](../src/services/route.js) into the chat.
3. Use a precise prompt with a **stop condition**:

   ```text
   The workshop service throws an error at startup: `App cannot start: serviceNames is not defined`.
   Look into src/services/route.js. Fix only that ReferenceError, then stop. Do not change anything else.
   ```

4. Check the workshop service logs. Confirm the process **starts** (the `App cannot start: serviceNames is not defined` line is gone).

> After `serviceNames` is defined, `init()` still never fills `routesByMethod`, so routing can stay empty. That is a **second** bug. Out of scope here: Part B is done when startup no longer throws `serviceNames is not defined`.

---

## Part C: Compare

**Reflection:** Part B almost always wins on *every* axis, fewer tokens, faster, correct result. This is the ROI principle in action: the "bigger" prompt was the cheaper path.

---

## Compounding-error tie-in

Part A fails partly because the agent has to *guess* several things in a row (which file, which bug, how to verify). Each guess is a step with `p < 1`, and `p^n` collapses fast. Part B removed the guesses, pushing each step's `p` toward 1.0.

---

## Expected outcome

An up-front investment in context + a stop condition beats retry-until-it-works on retries, turns and correctness.

➡️ Next: [2 — Stateless model](2-stateless-model.md)
