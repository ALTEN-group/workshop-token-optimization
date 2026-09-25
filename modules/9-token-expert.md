# Module 9 — Analyze your usage 🔴

**Goal:** develop the analytical skills needed to understand how you use context, tools, and tokens, then improve your working habits based on evidence.

> Observe usage · identify waste · test improvements · turn recurring lessons into defaults.

---

## 1. Observe before you optimize

Good token optimization starts with analysis. After a task or lab, review what happened and ask:

- Which tasks needed the most retries, and why?
- What information was missing, irrelevant, or repeated?
- Which tool calls produced more output than you could use?
- Where did the agent lose time or make avoidable mistakes?
- Which instruction, model, or stop condition would have changed the result?

The goal is to distinguish a one-off problem from a recurring pattern. Track a few concrete signals: retries, context size, unnecessary tool output, failed assumptions, and the time needed to reach a useful result.

---

## 2. Form a hypothesis and test it

Analytical thinking means turning an observation into a testable improvement. For example:

| Observation | Hypothesis | Experiment |
| --- | --- | --- |
| The agent rereads large files | Too much irrelevant context is being provided | Filter the files before sending them |
| A command returns pages of logs | The output contains more detail than the task requires | Keep only the summary or relevant lines |
| The same correction appears repeatedly | A missing instruction is causing the errors | Add the correction to a persistent instruction or skill |

Change one variable at a time when possible, then compare the result. Keep the improvement only when it reduces retries, output, or effort without reducing quality.

---

## 3. Filter data *before* it enters the context

Don't make the agent read a file to find one thing. Pre-filter then paste only the result.
When you can, paste the small important content into Chat. You decide what's relevant, not the model wading through noise.

Create commands for your agents to pre-filter data before it enters the context.
Example: instead of full `npm test`, keep only the last 20 lines:

```bash
# A test summary instead of full test output
npm test 2>&1 | tail -n 20
```

---

## 4. Keep tool output lean

When the agent runs commands, **noisy output is tokens**. Prefer commands that emit only what's needed:

| Noisy | Lean |
| --- | --- |
| `npm test` (full log) | `npm test 2>&1 | tail -n 20` |
| `cat bigfile.js` | `sed -n '40,80p' bigfile.js` |
| `ls -R` | `git ls-files src` |

Ask the agent in your prompt to "run the quietest command you created."

Useful extras (optional):

- [Coding Pal sharp-agent instructions](https://github.com/ALTEN-group/coding-pal/blob/main/instructions/sharp-agent.instructions.md) — shorten outputs and avoid guessing.
- [rtk-ai](https://github.com/rtk-ai/rtk) — pre-filter and compress command output before it enters the LLM context.
- [Caveman](https://github.com/juliusbrussee/caveman) — keep agent replies extremely brief.

---

## 5. Turn findings into better defaults

Once a pattern is confirmed, make the lesson reusable:

- Add a persistent instruction when the same guidance is needed across tasks.
- Create a skill when the workflow is repeatable and has clear inputs and outputs.
- Add a guardrail when it prevents a known class of mistakes.
- Choose a different model when the task's reasoning, speed, or cost requires it.
- Define a stop condition when the agent tends to continue without producing more value.

Review the next attempt to verify that the change helped. This closes the loop: observe, hypothesize, test, and standardize.

## Expected outcome

You can analyze your usage, pre-filter inputs, keep tool output and sessions lean, compress context with Copilot `/compact` before it bloats, review chat history for recurring fixes, and improve your defaults.
