# VS Code · Module 08 — Advanced Controls 🔴

**Goal:** make quality **repeatable** with persistent instructions, custom agents, skills, MCP tools, and sub-agents, so you don't re-explain context every session.

> Tools covered: `copilot-instructions.md` · custom agents · skills (dynamic context) · MCP tools (use carefully) · sub-agents for research.

---

## 1. Persistent instructions (`.github/copilot-instructions.md`)

The sample app has **no** project instructions, so the agent re-guesses conventions each time. Fix that.

1. New Chat, **Agent** mode.
2. Prompt:

   ```text
   Create .github/copilot-instructions.md for the sample-app. Capture: TypeScript strict, 2-space indent, prefer const, no `any`; Express routes live in src/routes.ts; business logic in src/tasks.ts; validate all request bodies and return 400 on bad input; never build a RegExp from user input; every change must keep `npm run build`, `npm test`, and `npm run lint` green. Keep it concise.
   ```

3. Open the file, trim anything bloated (instructions are re-sent every turn, keep them tight).
4. **Test it:** new Chat, ask the agent to add any new endpoint. Notice it now follows the rules *without* you restating them. That's persistent context working for you.

Example prompt to try:

```text
Add POST /tasks/:id/complete. Put routing in src/routes.ts and business logic in src/tasks.ts. Validate request input and return 400 on invalid input. Keep the change minimal and run build, test, and lint.
```

> Keep instructions **concise**. A 300-line instructions file is itself a context tax.

---

## 2. Custom agents / saved configurations

Create a focused agent that locks in repeatable behavior, including token discipline. Example: a tiny `tdd-fixer` agent for bounded, test-driven bug fixes.

1. Command Palette → **Chat: New Custom Agent**.
2. Create one named `tdd-fixer` with content like:

```md
---
name: tdd-fixer
description: Smallest safe fix with minimal output.
---

Goal: fix only the reported failure with the smallest safe edit.

Rules:
1. Output max 5 bullets unless asked for more.
2. State the failing check in 1 line.
3. Change only files needed for that failure.
4. Run `npm test`.
5. Stop when green; do not refactor unrelated code.
```

3. Use it to fix any remaining issue in the app and notice the consistent, bounded behavior.

A custom agent is a saved bundle of your best prompt habits, reusable token value. Why this helps token efficiency: you pre-commit to short output, minimal edits, and a strict stopping rule.

Quick test prompt:

```text
Fix only the failing test for task completion; keep the patch minimal and stop when tests pass.
```

---

## 3. Skills : dynamic context loading

Skills let the agent pull in domain knowledge **only when relevant**, instead of you pasting it every time. Explore what's available:

1. Ask in Chat: `What skills are available and when would each be used?`
2. Note how a skill is loaded **on demand**, this is context engineering at the tooling level: the heavy instructions live in a file and enter the window only when needed.

Example skill file (kept out of core instructions so it loads only when relevant):

```md
---
name: api-validation-rules
description: Validation and error-response rules for task endpoints.
---

Use for endpoint edits in `src/routes.ts` and `src/tasks.ts`.

Rules:
1. Validate every request body and route param.
2. Return 400 with a short error message on invalid input.
3. Never build a RegExp from user input.
4. Keep changes minimal and avoid unrelated refactors.
```

---

## 4. MCP tools : powerful, use carefully

MCP servers give the agent extra tools (databases, browsers, issue trackers, etc.).

1. Review your MCP configuration (Command Palette → search **MCP**).
2. **Caution:** each enabled MCP tool adds tool definitions to the context and can take real-world actions. Enable only what a task needs; disable the rest. More tools = more tokens + more ways to go wrong.

> Treat MCP tools like context: as few as necessary.

---

## 5. Sub-agents for research

Offload heavy read-only exploration to a sub-agent so your main session stays clean.

1. Ask the agent to "explore the codebase and report how validation is currently handled" using a sub-agent capability.
2. The sub-agent's *long* exploration happens in its own context; only the **summary** returns to your main session, keeping your primary window lean.

Example prompts:

```text
Use a sub-agent to scan `src/` and summarize where request validation happens. Return only: files, patterns, and gaps.
```

```text
Do read-only exploration in a sub-agent first; after it returns, propose the smallest patch to add POST /tasks/:id/complete.
```

---

## Expected outcome

The sample app has concise persistent instructions, you've built a reusable custom agent, and you understand when skills, MCP tools, and sub-agents add value vs. add noise.

➡️ Next: [09 — Power-user tips](09-power-user-tips.md)
