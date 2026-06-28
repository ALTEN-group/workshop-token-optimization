# VS Code · Module 09 — Power-User Tips 🔴

**Goal:** squeeze more value per token with filtering, collapsed tool output, and usage awareness.

> Use scripts to filter data · optimize outputs · collapse tool calls · analyze usage patterns.

---

## 1. Filter data *before* it enters the context

Don't make the agent read a giant file to find one thing. Pre-filter in the terminal, then paste only the result.

Examples (VS Code terminal):

```bash
# Only the lines that matter, instead of the whole file
grep -n "RegExp" sample-app/src/*.ts

# Just the dependency names, not the whole package.json
node -p "Object.keys(require('./sample-app/package.json').dependencies)"

# A test summary instead of full output
cd sample-app && npm test 2>&1 | tail -n 20
```

Paste the small result into Chat. You decide what's relevant, not the model wading through noise.

---

## 2. Keep tool output lean (Agent mode)

When the agent runs commands, **noisy output is tokens**. Prefer commands that emit only what's needed:

| Noisy | Lean |
| --- | --- |
| `npm test` (full log) | `npm test 2>&1 | tail -n 20` |
| `cat bigfile.ts` | `sed -n '40,80p' bigfile.ts` |
| `ls -R` | `git ls-files src` |

Ask the agent in your prompt to "run the quietest command that proves it works."

---

## 3. Collapse / summarize long sessions

When a session gets long (and expensive), don't keep extending it:

- Ask: `Summarize what we changed and the current state in 5 bullet points.`
- Copy that summary, **start a new Chat**, and paste it as the seed. You've compressed a huge transcript into a few lines, a manual, high-leverage context reset.

This directly fights "lost in the middle" and recency bias from long histories.

> **`/compact` works here too.** Type `/compact` in the Chat input to compress the current conversation in place. Copilot also **auto-summarizes** older turns as a conversation grows. Use `/compact` to keep working the same task cheaply, and a **New Chat** (`+`) seeded with a tight summary when you're starting something unrelated.

---

## 4. Analyze your own usage patterns

Reflect on the scorecards you've collected:

- Which tasks needed the most retries? What was missing: context, a stop condition, the wrong model?
- Where did you over-stuff context?
- Which guardrail caught the most agent mistakes?

Turn recurring fixes into **persistent instructions** (Module 08) so you never pay for that lesson twice.

---

## 5. Bundle the guardrail into the prompt

End every implementation prompt with its verification so the agent self-gates instead of handing you broken work:

```text
Implement <change> in sample-app. Done when `npm run build`, `npm test`, and `npm run lint`
all pass.
```

Then confirm in the terminal:

```bash
cd sample-app && npm run build && npm test && npm run lint
```

This is Lever 5 (deterministic controls) wired straight into your prompt loop.

---

## 6. Right tool, right mode

- **Ask** for thinking; **Agent** for doing. Don't burn Agent turns on a question.
- Reach for a big model only when reasoning is genuinely hard.
- Reset early and often.

---

## Expected outcome

You can pre-filter inputs, keep tool output and sessions lean, compress context with `/compact` or reset before it bloats, review chat history for recurring fixes, and use your scorecard history to improve your defaults.

➡️ Next: [10 — Capstone](10-capstone.md)
