# Persistent Context quiz

10 questions from `workshop-persistent-context.pptx`

## 1.

What is the main objective of ROI optimization ?

- A. Output quality minus token quantity only
- B. Output quality while reducing manual input & prompt repetition
- C. Number of MCP servers attached to every chat
- D. Length of copilot-instructions.md

## 2.

What is persistent context for ?

- A. A one-off chat message that is discarded after the reply
- B. Instructions, skills, prompts, and agents that reduce repetition by staying available across interactions
- C. A larger context window so you never need files on disk
- D. Billing metadata Copilot sends to GitHub

## 3.

Where do user-level global instructions live, and what are they ?

- A. `<USERPROFILE>/.copilot/instructions/` — always-on personal defaults
- B. `<PROJECT>/.github/prompts/` — slash commands for the current task
- C. In the repository root under `.github/instructions/` for all teams to share
- D. In APM’s `mcp: {}` block, which is required for instructions

## 4.

How are scoped (project) instructions injected ?

- A. You must paste them at the top of every prompt
- B. Files under `<PROJECT>/.github/instructions/` with `applyTo` globs; matched files pull the rules in automatically
- C. They replace skills; a project should not have both
- D. They only run in GitHub Actions, never in the IDE

## 5.

What is a Copilot prompt file ?

- A. A long-lived persona that owns permissions and tools
- B. A reusable slash command (`/<promptName>`) that tells the assistant the immediate task and expected outcome
- C. The same thing as a skill, stored in `skills/*/SKILL.md`
- D. User-level config under `~/.copilot/instructions/`

## 6.

What does an agent file define ?

- A. Only the Markdown schema of an audit report
- B. A specialized persona: mindset, constraints, approach, and definition of done for a multi-step job
- C. A reusable slash command that tells Copilot which specialized agent to invoke
- D. A set of file-matching rules that automatically inject instructions into source files

## 7.

When should you reach for a skill rather than an instruction ?

- A. For a step-by-step workflow; often with references, templates and validation scripts
- B. For a one-line personal tone preference
- C. Whenever you would have used `applyTo` on a file glob
- D. Skills cannot be called by an agent; only humans invoke them

## 8.

What is Agent Package Manager (APM) for ?

- A. Replacing npm for application dependencies
- B. Installing and updating versioned persistent context (agents, instructions, skills) across projects
- C. Training a new LLM from your chat logs
- D. Raising the monthly token cap of your license

## 9.

In the unit-testing use case, which artifact does which job ?

- A. Prompt = trigger and path mapping; agent = tester persona and DoD; instruction = Jest/ESM rules via `applyTo tests/**/*.js`
- B. Skill = slash command; prompt = persona; agent = `applyTo` glob
- C. Only a skill is required; prompt and agent are optional aliases
- D. Instructions generate tests; the agent only formats Markdown

## 10.

In the code-audit use case, what is the skill’s job versus the agent’s ?

- A. The skill is the auditor persona; the agent is the validator script
- B. The agent is the auditor (scope, strategy, constraints); the skill is the report contract plus `audit-report.mjs` validation
- C. Instructions run the GitHub Action; neither agent nor skill is used
- D. The skill chooses models; the agent writes Dockerfiles
