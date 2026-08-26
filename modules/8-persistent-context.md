# Module 8 — Lever 6: Persistent context 🔴

**Goal:** make quality **repeatable** with persistent instructions, custom agents, skills, MCP tools, and sub-agents, so you don't re-explain context every session.

> Tools covered: instructions · agents · skills · MCP tools · sub-agents.

---

## 1. Persistent instructions (`.github/copilot-instructions.md`)

The sample app has **no** project instructions, so the agent re-guesses conventions each time. Fix that.

1. New Chat, **Agent** mode.
2. Prompt:

   ```text
   Create .github/copilot-instructions.md for the src app. Capture: JavaScript strict, 2-space indent, prefer const; Express routers live in src/routes/; services in src/services/; entities in src/entities/ using @dwtechs/antity-pgsql; mount routers in src/app.js with send204 (or send from src/middlewares/res/send.js when a JSON body is required). Every change must keep `npm test` and `npm run lint` green (added in module 7). Keep it concise.
   ```

3. Open the file, trim anything bloated (instructions are re-sent every turn, keep them tight).
4. **Test it:** new Chat, ask the agent to add a new endpoint. Notice it now follows the rules *without* you restating them. This is persistent context working for you.

Example prompt to try:

   ```text
   Add POST /application to separate routes per applications. Put routing in src/routes/application.js.
   ```

> Keep instructions **concise**. A 300-line instructions file is itself a context tax.

---

## 2. Custom agents / saved configurations

Create a focused agent that locks in repeatable behavior, including token discipline. Example: a tiny `tdd-fixer` agent for bounded, test-driven bug fixes.

1. Command Palette → **Chat: New Custom Agent** (VS Code Copilot). In Cursor, create a custom agent or a project rule with the same content.
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

A custom agent is a saved bundle of your best prompt habits, reusable token value. 
It helps token efficiency because you pre-commit to short output, minimal edits, and a strict stopping rule.

Quick test prompt with the new agent:

```text
Fix the error <Paste error log>
```

---

## 3. Skills: dynamic context loading

Skills let the agent pull in domain knowledge **only when relevant**, instead of you pasting it every time.

1. Ask in Chat: `What skills are available and when would each be used?`
2. Note how a skill is loaded **on demand**, this is context engineering at the tooling level: the heavy instructions live in a file and enter the window only when needed.

Example skill file (kept out of core instructions so it loads only when relevant):

```md
---
name: api-route-conventions
description: How this Express app mounts routers and sends responses. Use for src/app.js or src/routes/*.js edits.
---

Use for endpoint edits in `src/app.js` and `src/routes/route.js`.

## App entry (`src/app.js`)

- `app.disable("x-powered-by")`.
- JSON body: `express.json({ limit: "100kb" })`.
- Health: `app.use("health", healixRouter)` from `@dwtechs/healix-express`.
- Perf: `startTimer` before resource routers, `endTimer` after.
- Mount the route resource as: `app.use("routes", route, send204)`.
- `send204` (`src/middlewares/res/send-204.js`) always sends HTTP 204. For JSON `{ rows, total }`, use `send` from `src/middlewares/res/send.js` instead — it exists but is unused today.
- There is no `security` or `cors` middleware in this app.
- Error handling: `errorHandler(app)` from `@dwtechs/errandler-express` — register **after** routes.
- Startup: `Promise.all([routeSvc.init()]).then(() => listen(app))`.

## Route resource (`src/routes/route.js`)

- `POST /search` — currently `send204` (no search body).
- `GET /:id/history` — history middleware.
- `POST /` — `rEnt.addArraySubstack`.
- `PUT /` — `checkRoutePattern`, then `rEnt.updateArraySubstack`.
- `POST /archive` — `rEnt.archive`.
- Map writes to SQLEntity methods. Keep changes minimal.

There is no `/tasks` resource and no `src/routes/application.js` until you add them.
```

---

## 4. MCP tools: powerful, use carefully

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
Do read-only exploration in a sub-agent first; after it returns, propose the smallest patch to add POST /roles, following the POST /routes layering. Do not invent a /tasks resource.
```

---

## Expected outcome

The sample app has concise persistent instructions, you have built a reusable custom agent, and you understand when skills, MCP tools, and sub-agents add value vs. add noise.

➡️ Next: [9 — Become a Token Expert](9-token-expert.md)
