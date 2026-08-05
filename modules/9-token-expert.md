# Module 09 — Become a Token Expert 🔴

**Goal:** squeeze more value per token with filtering, collapsed tool output, and usage awareness.

> Use scripts to filter data · optimize outputs · collapse tool calls · analyze usage patterns.

---

## 1. Filter data *before* it enters the context

Don't make the agent read a file to find one thing. Pre-filter then paste only the result.
When you can, paste the small important content into Chat. You decide what's relevant, not the model wading through noise.

Create commands for your agents to pre-filter data before it enters the context.
Example instead of npm test you can use a command that outputs only the last 20 lines of the test output:

```bash
# A test summary instead of full test output
npm test 2>&1 | tail -n 20
```

> 💡 **Useful Compression Tools**
> ⚡ **[rtk-ai](https://github.com/rtk-ai/rtk)** — CLI tool to pre-filter and compress command output before sending to LLM context.

---

## 2. Keep tool output lean

When the agent runs commands, **noisy output is tokens**. Prefer commands that emit only what's needed:

| Noisy | Lean |
| --- | --- |
| `npm test` (full log) | `npm test 2>&1 | tail -n 20` |
| `cat bigfile.js` | `sed -n '40,80p' bigfile.js` |
| `ls -R` | `git ls-files src` |

Ask the agent in your prompt to "run the quietest command you created."

> 💡 **Useful Compression Tools**
> - 🛠️ **[Coding Pal](https://github.com/ALTEN-group/coding-pal/blob/main/instructions/sharp-agent.instructions.md)** — Use specialized instructions to shorten AI outputs and avoid guessing.
> - 🦴 **[Caveman](https://github.com/juliusbrussee/caveman)** — Force your AI coding agent to communicate in ultra-brief "caveman" talk to minimize output tokens.

---

## 3. Analyze your own usage patterns

Reflect on the scorecards you have collected:

- Which tasks needed the most retries? What was missing: context, a stop condition, the wrong model?
- Where did you over-stuff context?
- Which guardrail caught the most agent mistakes?

Turn recurring fixes into **persistent instructions or skills** so you never pay for that lesson twice.

## Expected outcome

You can pre-filter inputs, keep tool output and sessions lean, compress context with `/compact` or reset before it bloats, review chat history for recurring fixes, and improve your defaults.
