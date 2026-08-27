# Module 3 — Lever 1: Model selection 🟡

**Goal:** match model size to task difficulty using the **model picker**, and feel the tradeoff between capability, speed, and cost.

> **Rule of thumb:** large = planning/debugging · medium = implementation · small = simple tasks · **Auto by default**.

Names rotate. Pick by **category** from whatever your org/plan lists today; confirm on [GitHub's model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison).

- **Deep reasoning/debugging:** e.g. `Claude Opus 4.8`, `Gemini 3.1 Pro`, `GPT-5.5` / `GPT-5.6 Sol`
- **General implementation:** e.g. `Claude Sonnet 5`, `MAI-Code-1-Flash`, `GPT-5.6 Terra`
- **Simple/repetitive tasks:** e.g. `Claude Haiku 4.5`, `Gemini 3.6 Flash`, `GPT-5.6 Luna`
- **Auto** lets Copilot route the request. A good default, but choosing deliberately is a skill and can change cost a lot.

Put each model in **one** bucket. If a name is missing, take the closest option in the same category.

More info:
- [GitHub's model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)
- [GitHub's model pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)

---

## Exercise A: A "planning/debugging" task (use a large model)

The sample app's [`app.js`](../src/app.js) has a subtle correctness bug.

1. New Chat, **Ask** mode, pick a **large/most-capable** model.
2. Add [`app.js`](../src/app.js).
3. Prompt:

   ```text
   Explain why the route resource fails to send data, and what the correct fix is.
   ```

Did it pinpoint the wrong response middleware (`send204` instead of `send`)? How clear and fast was the reasoning?

---

## Exercise B: A "simple" task (use a small/fast model)

1. New Chat, **Agent** mode, pick a **smaller/faster** model.
2. Add [`app.js`](../src/app.js).
3. Prompt:

   ```text
   In src/app.js, the routes mount uses send204. Switch it to send from
   src/middlewares/res/send.js so POST /routes can return JSON { rows, total }.
   Change nothing else.
   ```

A small model is perfectly capable of a one-line mechanical edit, and is cheaper/faster.

---

## Exercise C: Compare

Repeat Exercise A's *diagnosis* with a small model, and Exercise B's *one-liner* with a large model. 

**Lesson:** big models earn their cost on **ambiguous reasoning**; small models win on **well-specified mechanical** work.
Using a big model for a one-liner wastes value; using a tiny model for a gnarly bug causes retries which costs more overall.

---

## When in doubt

Don’t rely on Auto. Test models to understand which tasks they handles best.

---

## Expected outcome

You've consciously matched two tasks to several model choices and can articulate why the right-sized model maximizes token value.

➡️ Next: [4 — Lever 2: Context optimization](4-context-optimization.md)
