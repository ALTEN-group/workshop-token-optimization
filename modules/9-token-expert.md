# Module 9 — Become a Token expert 🔴

**Goal:** squeeze more value per token with filtering, collapsed tool output, and usage awareness.

> Use scripts to filter data · optimize outputs · collapse tool calls · analyze usage patterns.

---

## 1. Filter data *before* it enters the context

Don't make the agent read a file to find one thing. Pre-filter then paste only the result.
When you can, paste the small important content into Chat. You decide what's relevant, not the model wading through noise.

Create commands for your agents to pre-filter data before it enters the context.
Example: instead of full `npm test`, keep only the last 20 lines:

```bash
# A test summary instead of full test output
npm test 2>&1 | tail -n 20
```

---

## 2. Keep tool output lean

When the agent runs commands, **noisy output is tokens**. Prefer commands that emit only what's needed:

| Noisy | Lean |
| --- | --- |
| `npm test` (full log) | `npm test 2>&1 | tail -n 20` |
| `cat bigfile.js` | `sed -n '40,80p' bigfile.js` |
| `ls -R` | `git ls-files src` |

Ask the agent in your prompt to "run the quietest command you created."

Useful extras (optional):

- [rtk-ai](https://github.com/rtk-ai/rtk) — pre-filter and compress command output before it enters the LLM context.
- [Coding Pal sharp-agent instructions](https://github.com/ALTEN-group/coding-pal/blob/main/instructions/sharp-agent.instructions.md) — shorten outputs and avoid guessing.
- [Caveman](https://github.com/juliusbrussee/caveman) — keep agent replies extremely brief.

---

## 3. Analyze your own usage patterns

Reflect on the labs you just ran:

- Which tasks needed the most retries? What was missing: context, a stop condition, the wrong model?
- Where did you over-stuff context?
- Which guardrail caught the most agent mistakes?

Turn recurring fixes into **persistent instructions or skills** so you never pay for that lesson twice.

## Expected outcome

You can pre-filter inputs, keep tool output and sessions lean, compress context with Copilot `/compact` or a Cursor new-chat summary before it bloats, review chat history for recurring fixes, and improve your defaults.
