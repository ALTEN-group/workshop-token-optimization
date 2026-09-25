# Module 4 — Context optimization 🟡

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

## How to pick the minimal set (heuristic)

1. The file(s) you are changing.
2. The type/interface definitions they depend on.
3. One example of the pattern you want imitated.
4. Start. Add more only if the agent asks or guesses wrong.

---

## Expected outcome

You can assemble a minimal, relevant context for a real change, you have seen over-context hurt, and you have adopted the one-task-one-session reset habit.

➡️ Next: [5 — Context window](5-context-window.md)
