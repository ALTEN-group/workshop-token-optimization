# Module 02 — Stateless model 🟢

**Goal:** internalize the model is **stateless** and that the **context window** has biases, then observe both directly.

---

## Key facts

- A LLM is a **probabilistic text engine**, it predicts likely next tokens.
- It is **stateless**: no memory between calls. The **entire context is re-sent every step**.
- The context window has two biases:
  - **Lost in the middle** : info in the middle of a long context is often ignored.
  - **Recency bias** : the latest inputs dominate.

---

## Experiment 1 : Statelessness

1. New Chat (**Ask** mode). Send:

   ```text
   Remember the secret word: "spongebob". Just acknowledge.
   ```

2. Now **open a brand-new Chat session** and ask:

   ```text
   What was the secret word? Don't search the codebase.
   ```

---

## Experiment 2 : Context grows every turn

1. New Chat (**Agent** mode). Ask it to read three files (add [`src/routes/route.js`](../src/routes/route.js), [`src/services/route.js`](../src/services/route.js), [`src/entities/route.js`](../src/entities/route.js)) and summarize each.
2. Then ask a follow-up: "now explain how a POST request flows to create a route."

Notice the second answer implicitly re-includes everything from turn 1. In a long session this is how tokens **balloon**, every file and every prior answer rides along on each new turn.
Long sessions get expensive and noisier. Short, focused sessions stay sharp.

---

## Experiment 3 : Recency & "lost in the middle"

1. New Chat (**Ask** mode). Paste a long prompt where a key instruction is **buried in the middle**:

   ```text
   Here are some coding standards: [write 10-12 lines of filler standards].
   IMPORTANT: every function must log the result using @dwtechs/winstan and never throw.
   [write 10-12 more lines of filler standards]
   Now, write a Javascript function that divides two numbers.
   ```

2. See whether it honored the buried "never throw / log a Result" rule.
3. Try again in a new session, but put that rule **last**, right before the request. Compare:

   ```text
   Here are some coding standards: [write 20–24 lines of filler standards].
   Now, write a Javascript function that divides two numbers.
   IMPORTANT: every function must log the result using @dwtechs/winstan and never throw.
   ```

You will usually get better compliance when the critical rule is at the **end** (recency) rather than buried in the middle of a big prompt.

---

## Expected outcome

(1) Sessions are stateless, 
(2) Context accumulates per turn
(3) Placement within the window changes compliance. 

➡️ Next: [03 — Lever 1: Model selection](03-model-selection.md)
