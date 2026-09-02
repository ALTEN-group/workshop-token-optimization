# Persistent Context quiz

10 questions from `workshop-persistent-context.pptx` (August 2026), focused on harness slides 10–19. Shared intro slides (limits, LLM loop, context rot) are covered in the [token-optimization quiz](token-optimization.md). Correct answers are marked **Answer** under each question.

## 1. (Slide 5)

In the persistent-context deck, what should Agent ROI improve?

- A. Output quality minus token quantity only
- B. Output quality while reducing manual input / prompt repetition
- C. Number of MCP servers attached to every chat
- D. Length of copilot-instructions.md

**Answer: B.** This session’s lever is reuse: keep technical information available across interactions so you type the same constraints less often.

## 2. (Slide 10)

What is persistent context for?

- A. A one-off chat message that is discarded after the reply
- B. Instructions, skills, prompts, and agents that reduce repetition by staying available across interactions
- C. A larger context window so you never need files on disk
- D. Billing metadata Copilot sends to GitHub

**Answer: B.** The five artifacts (global instructions, scoped instructions, skills, prompts, agents) are the harness. coding-pal is the shared library.

## 3. (Slide 11)

Where do user-level global instructions live, and what are they?

- A. `<USERPROFILE>/.copilot/instructions/` — always-on personal defaults (tone, surgical diffs, ask before assuming)
- B. `<PROJECT>/.github/prompts/` — slash commands for the current task
- C. Only inside the model card on GitHub’s comparison page
- D. In APM’s `mcp: {}` block, which is required for instructions

**Answer: A.** Global instructions follow you across workspaces. Keep them personal and short.

## 4. (Slide 12)

How are scoped (project) instructions injected?

- A. You must paste them at the top of every prompt
- B. Files under `<PROJECT>/.github/instructions/` with `applyTo` globs; matched files pull the rules in automatically
- C. They replace skills; a project should not have both
- D. They only run in GitHub Actions, never in the IDE

**Answer: B.** `applyTo` (e.g. `src/**/*.js`) is the trigger. Use them for stack conventions, not for a one-shot task.

## 5. (Slide 13)

What is a Copilot prompt file in this deck?

- A. A long-lived persona that owns permissions and tools
- B. A reusable slash command (`/promptName`) that tells the assistant the immediate task and expected outcome
- C. The same thing as a skill, stored in `skills/*/SKILL.md`
- D. User-level config under `~/.copilot/instructions/`

**Answer: B.** Install under `<PROJECT>/.github/prompts/`. Prompts are the trigger; they are not the expert persona.

## 6. (Slide 14)

What does an agent file define?

- A. Only the Markdown schema of an audit report
- B. A specialized persona: mindset, constraints, approach, and definition of done for a multi-step job
- C. `applyTo` globs for which source files to lint
- D. The npm scripts the human must run manually

**Answer: B.** Agents live in `<PROJECT>/.github/agents/`. Users invoke them, or prompts delegate to them.

## 7. (Slide 15)

When should you reach for a skill rather than an instruction?

- A. For a step-by-step workflow (test, debug, audit) often with references, templates, and validation scripts
- B. For a one-line personal tone preference
- C. Whenever you would have used `applyTo` on a file glob
- D. Skills cannot be called by an agent; only humans invoke them

**Answer: A.** Skills describe a process, often with a contract and a validation script. Path on the slide: `.github/skills/<name>`.

## 8. (Slide 17)

What is Agent Package Manager (APM) for in this workshop?

- A. Replacing npm for application dependencies
- B. Installing and updating versioned persistent context (agents, instructions, skills) across projects
- C. Training a new LLM from your chat logs
- D. Raising the $250 monthly token cap

**Answer: B.** Share, version, and distribute the harness (e.g. from ALTEN-group/coding-pal) instead of copy-paste.

## 9. (Slide 18)

In the unit-testing use case, which artifact does which job?

- A. Prompt = trigger and path mapping; agent = tester persona and DoD; instruction = Jest/ESM rules via `applyTo tests/**/*.js`
- B. Skill = slash command; prompt = persona; agent = `applyTo` glob
- C. Only a skill is required; prompt and agent are optional aliases
- D. Instructions generate tests; the agent only formats Markdown

**Answer: A.** `/node-unit-tests` maps source → test path and delegates to the Unit Tester agent. Instructions load on test files (Jest, ESM).

## 10. (Slide 19)

In the code-audit use case, what is the skill’s job versus the agent’s?

- A. The skill is the auditor persona; the agent is only a validator script
- B. The agent is the auditor (scope, strategy, constraints); the skill is the report contract plus `audit-report.mjs` validation
- C. Instructions run the GitHub Action; neither agent nor skill is used
- D. The skill chooses models; the agent writes Dockerfiles

**Answer: B.** The agent owns persona, scope, and strategy. The skill locks the Markdown report schema and runs `audit-report.mjs`.
