# VS Code Track — Agent Quality & Token Optimization

This track teaches the workshop using **GitHub Copilot in Visual Studio Code** (Chat and Agent modes). Work through the modules in order, each builds on the last and uses the [`sample-app`](../../sample-app/).

> New to the ideas? Do the [tool-agnostic concepts](../../concepts/) first.

---

## Setup checklist

- [ ] VS Code installed
- [ ] **GitHub Copilot** + **GitHub Copilot Chat** extensions installed and signed in
- [ ] Sample app dependencies installed (`cd sample-app && npm install`)
- [ ] You can open the Chat view (`Ctrl+Alt+I` / `⌃⌘I`) and see the **mode** dropdown (Ask · Plan · Agent) and the **model picker**

---

## Start here

[`vscode/README.md`](vscode/README.md) 

---

## Modules

| # | Module | Level |
| --- | --- | --- |
| 00 | [Setup & ROI mindset](00-setup.md) | 🟢 |
| 01 | [Why quality matters](01-why-quality-matters.md) | 🟢 |
| 02 | [How the model thinks](02-how-the-model-thinks.md) | 🟢 |
| 03 | [Lever 1 — Model selection](03-model-selection.md) | 🟡 |
| 04 | [Lever 2 — Context optimization](04-context-optimization.md) | 🟡 |
| 05 | [Lever 3 — Prompt engineering](05-prompt-engineering.md) | 🟡 |
| 06 | [Lever 4 — Workflow design](06-workflow-design.md) | 🟡 |
| 07 | [Lever 5 — Deterministic controls](07-deterministic-controls.md) | 🟡 |
| 08 | [Advanced controls](08-advanced-controls.md) | 🔴 |
| 09 | [Power-user tips](09-power-user-tips.md) | 🔴 |
| 10 | [Capstone](10-capstone.md) | 🔴 |

---

## The scorecard (use it in every module)

Because exact token counts aren't always visible, track these **proxy metrics** for each task. Copy this into a notes file and fill it in as you go:

```text
Module: __
Task: ______________________________________

Retries to success      : ___
Agent turns / tool calls : ___
Manual correction edits  : ___
Guardrails green 1st try?: yes / no
Model used               : ___
Tokens / AI credits used : ___

What I'd do differently next time: ______________
```

The whole point of the workshop: watch these numbers **drop** as you apply each lever.

---

## A note on Chat modes

| Mode | Use it for |
| --- | --- |
| **Ask** | Questions, explanations — no file edits |
| **Plan** | Research and planning: produces a plan/checklist, no code changes |
| **Agent** | Multi-step autonomous work: reads files, edits, runs tasks |

Choosing the right mode is itself an optimization: Ask/Plan for thinking, Agent for doing.

---

## VS Code essentials you'll use throughout

| Action | How |
| --- | --- |
| Open the Chat view | `Ctrl+Alt+I` / `⌃⌘I` |
| Switch mode | mode dropdown: Ask · Plan · Agent |
| Pick a model | model picker in the Chat input box |
| Add a file to context | type `#` and pick the file |
| Clear/reset context | start a new Chat session |
| Run a command | VS Code terminal (`` Ctrl+` ``) |
| Track your usage | review token / AI credit consumption after each step |
