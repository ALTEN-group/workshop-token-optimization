# Module 04 — Lever 2: Context Optimization 🟡

**Goal:** practice giving the agent **only the relevant files**, and use session resets to keep context clean.

> **Provide as little as possible, but as much as necessary.** Avoid full-repo context. Reset sessions frequently.

---

## Exercise A : Minimal context wins

Task: add input validation to `POST /route.js`.

1. New Chat, **Agent** mode.
2. Decide the minimal set. Which files matter? Likely:
   - [`src/services/route.js`](../src/services/route.js)
   - [`src/validators/check-route-pattern.js`](../src/validators/check-route-pattern.js)
3. Prompt:

   ```text
   In POST /route, add middleware to validate the resource pattern before adding it in to the database.
   Use the check-route-pattern validator. update it if necessary
   Return HTTP 400 with a clear message if invalid. Don't touch other endpoints.
   Stop after editing route.js and tell me to run the server.
   ```

---

## Exercise B : Over-stuffed context (anti-pattern)

1. New Chat, **Agent** mode.
2. This time add irrelevant context: the whole `src/` folder, the workshop `README.md`, the `package.json` files, then give the same prompt as Exercise A.
3. Compare: was the answer slower? Did it wander into unrelated files? Did it restate things it did not need ?

You will usually see more drift and noise. Extra context is not free, it dilutes the signal and adds "lost in the middle" mistakes.

---

## Exercise C : Reset discipline

1. After finishing Exercise A, do not keep piling new unrelated tasks into that session.
2. Start a **fresh session** for the next task. Notice how a clean window means you re-supply only what is relevant, and the agent is not anchored to earlier, now-irrelevant decisions.

> Habit: **one task, one session.** When a task is done, reset.

---

## How to pick the minimal set (heuristic)

1. The file(s) you are changing.
2. The type/interface definitions they depend on.
3. One example of the pattern you want imitated.
4. Start. Add more only if the agent asks or guesses wrong.

---

## Expected outcome

You can assemble a minimal, relevant context for a real change, you have seen over-context hurt, and you have adopted the one-task-one-session reset habit.

➡️ Next: [05 — Lever 3: Prompt engineering](05-prompt-engineering.md)
