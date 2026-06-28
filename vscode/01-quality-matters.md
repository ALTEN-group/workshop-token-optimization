# VS Code · Module 01 — Quality Matters 🟢

**Goal:** *feel* the cost of the "agent gambling" anti-pattern by deliberately doing it, then doing it right, and compare.

---

## Part A : Gamble on purpose (the wrong way)

1. New Chat session, **Agent** mode, model **Auto**.
2. Give it this deliberately weak prompt, **no file context, vague ask**:

   ```text
   the tasks thing is broken, fix it
   ```

3. Whatever it does, resist helping. If it asks questions or guesses wrong, give equally vague nudges ("still broken", "no that's wrong"). **Stop after 3 retries** even if unsolved.

   `Note: Part A can occasionally succeed on the first shot, but it usually burns more tokens/credits because the agent is guessing.`

---

## Part B : Invest up front (the right way)

1. **Start a brand-new Chat session** (clean context, important).
2. **Agent** mode. Add precise context: drag and drop [`src/app.js`](../../src/app.js) into the chat.
3. Use a precise prompt with a **stop condition**:

   ```text
   In src/, the test "includes tasks exactly equal to the threshold" is failing. The function filterByMinPriority should treat minPriority as INCLUSIVE (>=), not exclusive (>). Fix only that function, then stop. Do not change anything else.
   ```

4. Run `npm test` in the terminal. Confirm **4/4 pass**.

Record the scorecard for Part C.

---

## Part C : Compare

**Reflection:** Part B almost always wins on *every* axis, fewer tokens *and* a correct result. That's the ROI principle in action: the "bigger" prompt was the cheaper path.

---

## Compounding-error tie-in

Part A failed partly because the agent had to *guess* several things in a row (which file, which bug, how to verify). Each guess is a step with `p < 1`, and `p^n` collapses fast. Part B removed the guesses, pushing each step's `p` toward 1.0.

---

## Expected outcome

You have two scorecards proving that an up-front investment in context + a stop condition beats retry-until-it-works on retries, turns, *and* correctness.

➡️ Next: [02 — How the model thinks](02-how-the-model-thinks.md)
