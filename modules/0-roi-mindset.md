# Module 0 — ROI mindset 🟢

**Goal:** get Copilot working in VS Code, run the sample app, and adopt the workshop's core principle before you write a single prompt.

> Better quality → fewer retries → lower total cost.

This workshop is written for **GitHub Copilot in VS Code**. If you are in Cursor, use Chat with Ask / Plan / Agent; keybindings and command names differ (noted where it matters).

---

## 1. Verify Copilot

1. Open the Chat view: `Ctrl+Alt+I` (Windows/Linux) or `⌃⌘I` (macOS). In Cursor, open Chat from the sidebar or Command Palette.
2. Confirm you can see:
   - the **mode** dropdown: **Ask · Plan · Agent**
   - the **model picker**

---

## 2. Run the sample app (optional)

Running the app is **not required** to follow the workshop, but later labs are clearer if it boots.

```sh
docker compose --env-file docker/conf/.env.dev -f docker/docker-compose.yml up --build -d
```

If you cannot use Docker, install dependencies locally:

```sh
npm i
```

There is no test suite yet. Startup may fail with `App cannot start: serviceNames is not defined`. That crash is the module 1 lab.

---

## 3. Adopt the ROI mindset

Before each task in this workshop, pause and ask:

1. **Is there an existing prompt or agent** I could use for this task
2. **What is the smallest correct context** for this task? (not the whole repo)
3. **What does "done" look like?** (a stop condition the agent can check)
4. **Which model** fits the difficulty
5. **Could a test or lint verify it** instead of you eyeballing the output? (You add those guardrails in module 7.)

This 10-second habit is the highest-ROI thing in the whole workshop.

---

## VS Code tips that save tokens from day one

- Start a **new Chat** between unrelated tasks.
- Add **only files that matter**, not whole folders.
- Use **Ask** mode for thinking and **Agent** mode for doing; don't burn Agent turns on a question.

---

## Expected outcome

- Copilot Chat works and you can switch modes/models.
- Optional: Docker is up, or `npm i` succeeded. You may already see the module 1 startup error in the workshop service logs.

➡️ Next: [1 — Agent guessing](1-agent-guessing.md)
