# VS Code · Module 04 — Lever 2: Context Optimization 🟡

**Goal:** practice giving the agent **only the relevant files**, and use session resets to keep context clean.

> **Provide as little as possible, but as much as necessary.** Avoid full-repo context. Reset sessions frequently.

Concept: [Context engineering](../../concepts/c3-context-engineering.md)

---

## Exercise A : Minimal context wins

Task: add input validation to `POST /tasks`.

1. New Chat, **Agent** mode.
2. **First, decide the minimal set.** Which files matter? Likely:
   - [`sample-app/src/routes.ts`](../../sample-app/src/routes.ts) (the endpoint)
   - [`sample-app/src/types.ts`](../../sample-app/src/types.ts) (the `CreateTaskInput`/`Priority` types)
3. Add **only those two**. Prompt:

   ```text
   In POST /tasks, validate the request body before creating a task:
   - title: required, non-empty string, max 200 chars
   - priority: required integer 1–5
   Return HTTP 400 with a clear message if invalid. Don't touch other endpoints.
   Stop after editing routes.ts and tell me to run the server.
   ```

Record the scorecard.

---

## Exercise B : Over-stuffed context (anti-pattern)

1. New Chat, **Agent** mode.
2. This time add **a lot** of irrelevant context: the whole `sample-app` folder, the workshop `README.md`, the `concepts/` files, then give the **same** prompt as Exercise A.
3. Compare: was the answer slower? Did it wander into unrelated files? Did it restate things it didn't need?

You'll usually see more drift and noise. Extra context isn't free, it dilutes the signal and invites "lost in the middle" mistakes.

---

## Exercise C : Reset discipline

1. After finishing Exercise A, **don't** keep piling new unrelated tasks into that session.
2. Start a **fresh Chat** for the next task. Notice how a clean window means you re-supply only what's relevant, and the agent isn't anchored to earlier, now-irrelevant decisions.

> Habit: **one task, one session.** When a task is done, reset.

---

## How to pick the minimal set (heuristic)

1. The file(s) you're changing.
2. The type/interface definitions they depend on.
3. **One** example of the pattern you want imitated (if any).
4. Stop. Add more only if the agent asks or guesses wrong.

---

## Expected outcome

You can assemble a minimal, relevant context for a real change, you've seen over-context hurt, and you've adopted the one-task-one-session reset habit.

➡️ Next: [05 — Lever 3: Prompt engineering](05-prompt-engineering.md)
