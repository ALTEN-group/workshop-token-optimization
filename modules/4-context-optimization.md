# Module 4 — Lever 2: Context optimization 🟡

**Goal:** practice giving the agent **only the relevant files**, and use session resets to keep context clean.

> **Provide as little as possible, but as much as necessary.** Avoid full-repo context. Reset sessions frequently.

---

## Exercise A: Minimal context wins

Task: wire the **existing** `checkRoutePattern` middleware onto `POST /routes`. It is already on `PUT /routes`. The 400 branches inside the validator may still be commented out.

1. New Chat, **Agent** mode.
2. Decide the minimal set. Which files matter? Likely:
   - [`src/routes/route.js`](../src/routes/route.js) (mount the middleware on `POST /`)
   - [`src/middlewares/validators/check-route-pattern.js`](../src/middlewares/validators/check-route-pattern.js) (enable the 400 responses if they are commented out)
3. Prompt:

   ```text
   On POST /routes, add the existing checkRoutePattern middleware (it is already used on PUT /routes).
   If the 400 responses in check-route-pattern.js are commented out, uncomment them so invalid patterns return HTTP 400 with a clear message.
   Don't touch other endpoints.
   Done when both src/routes/route.js and src/middlewares/validators/check-route-pattern.js are updated as needed, then tell me to run the server.
   ```

---

## Exercise B: Over-stuffed context (anti-pattern)

1. New Chat, **Agent** mode.
2. This time add irrelevant context: the whole `src/` folder, the workshop `README.md`, the `package.json` files, then give the same prompt as Exercise A.
3. Compare: was the answer slower? Did it wander into unrelated files? Did it restate things it did not need?

You will usually see more drift and noise. Extra context is not free, it dilutes the signal and adds "lost in the middle" mistakes.

---

## Exercise C: Reset discipline

1. After finishing Exercise A, do not keep piling new unrelated tasks into that session.
2. Start a **fresh session** for the next task. Notice how a clean window means you re-supply only what is relevant, and the agent is not anchored to earlier, now-irrelevant decisions.

> Habit: **one task, one session.** When a task is done, reset.

When a session gets long (and expensive), don't keep extending it:

- Ask: `Summarize what we changed and the current state in 5 bullet points.`
- Copy that summary, **start a new Chat**, and paste it as the seed. You have compressed a huge transcript into a few lines, a manual, high-leverage context reset.

This directly fights "lost in the middle" and recency bias from long histories.

> **Compact conversation.** In Copilot Chat, type `/compact` to compress the current conversation in place (Copilot also auto-summarizes older turns). In Cursor, use a **New Chat** seeded with a tight summary — that is the same high-leverage reset. Prefer a new chat when you can.

---

## How to pick the minimal set (heuristic)

1. The file(s) you are changing.
2. The type/interface definitions they depend on.
3. One example of the pattern you want imitated.
4. Start. Add more only if the agent asks or guesses wrong.

---

## Expected outcome

You can assemble a minimal, relevant context for a real change, you have seen over-context hurt, and you have adopted the one-task-one-session reset habit.

➡️ Next: [5 — Lever 3: Prompt engineering](5-prompt-engineering.md)
