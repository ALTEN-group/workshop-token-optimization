# VS Code · Module 03 — Lever 1: Model Selection 🟡

**Goal:** match model size to task difficulty using the VS Code **model picker**, and feel the tradeoff between capability, speed, and cost.

> **Rule of thumb:** large = planning/debugging · medium = implementation · small = simple tasks · **Auto by default**.

Suggested starting point from [GitHub's model comparison page](https://docs.github.com/en/copilot/reference/ai-models/model-comparison):

- **Deep reasoning/debugging (large):** `GPT-5.5`, `GPT-5.4`, `Claude Opus 4.7`, `Gemini 2.5 Pro`
- **General implementation (medium):** `GPT-5 mini`, `GPT-4.1`, `Claude Sonnet 4.6`
- **Simple/repetitive tasks (small/fast):** `Claude Haiku 4.5`, `Gemini 3 Flash`

Pick one available in your org/plan. If a model isn't available, choose the closest option in the same category.

---

## The model picker

In the Chat input box there's a model dropdown. You'll typically see **Auto** plus several named models of varying capability. **Auto** lets Copilot route the request, a great default, but choosing deliberately is a skill worth practicing.

---

## Exercise A : A "planning/debugging" task (use a large model)

The sample app's [`tasks.ts`](../../sample-app/src/tasks.ts) has a subtle correctness bug.

1. New Chat, **Ask** mode, pick a **large/most-capable** model.
2. Add [`tasks.ts`](../../sample-app/src/tasks.ts) and [`tasks.test.ts`](../../sample-app/src/tasks.test.ts).
3. Prompt:

   ```text
   Don't change code yet. Explain why the "exactly equal to the threshold" test fails, and what the correct fix is. Be specific about the comparison operator.
   ```

Record: did it pinpoint `>` vs `>=`? How clear was the reasoning?

---

## Exercise B : A "simple" task (use a small/fast model)

1. New Chat, **Agent** mode, pick a **smaller/faster** model.
2. Add [`tasks.ts`](../../sample-app/src/tasks.ts).
3. Prompt:

   ```text
   Change the comparison in filterByMinPriority from `>` to `>=`. Nothing else.
   ```

4. Run `npm test`. Expect 4/4 green.

A small model is perfectly capable of a one-line mechanical edit, and it's cheaper/faster.

---

## Exercise C : Compare

Repeat Exercise A's *diagnosis* with a small model, and Exercise B's *one-liner* with a large model. Note in your scorecard:

| | Diagnosis (hard) | One-liner (easy) |
| --- | --- | --- |
| Large model | quality? speed? | overkill? |
| Small model | missed nuance? | fine? |

**Lesson:** big models earn their cost on **ambiguous reasoning**; small models win on **well-specified mechanical** work. Using a big model for a one-liner wastes value; using a tiny model for a gnarly bug causes retries (which costs more overall).

---

## When in doubt

Leave it on **Auto**. Reach for a specific model when you *know* the task is unusually hard (reasoning/planning/debugging) or unusually trivial (rename, format, one-line change).

---

## Expected outcome

You've consciously matched three tasks to three model choices and can articulate why the right-sized model maximizes token value.

➡️ Next: [04 — Lever 2: Context optimization](04-context-optimization.md)
