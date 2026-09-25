# Token Optimization Workshop

This workshop is the second part of ALTEN's two-hour advanced training session on optimizing tokens for AI code assistants.

> [!NOTE]
> Running the project is not mandatory to follow this workshop.

## Run the sample app Docker

To start the application and its services (PostgreSQL, Liquibase migration, Traefik, application) in development mode using Docker Compose:

```sh
docker compose --env-file docker/conf/.env.dev -f docker/docker-compose.yml up --build -d
```

If you cannot launch the app in Docker, at least install the dependencies locally so you can test the LLM's outputs:

```sh
npm i
```

## Modules

| #  | Module | Description | Level |
| -- | ------ | ----------- | ----- |
| 0  | [ROI mindset](modules/0-roi-mindset.md) | Set up the environment and adopt the core ROI habit where better quality prompts yield fewer retries and lower total cost. | 🟢    |
| 1  | [Model selection](modules/1-model-selection.md) | Match model size to task complexity using the model picker to balance capability, speed, and cost. | 🟡    |
| 2  | [Agent guessing](modules/2-agent-guessing.md) | Contrast the costly "agent gambling" anti-pattern with upfront investment in precise context and stop conditions. | 🟢    |
| 3  | [Prompt engineering](modules/3-prompt-engineering.md) | Structure prompts with clear intent, explicit context, constraints, and verifiable stop conditions to stop scope creep. | 🟡    |
| 4  | [Context optimization](modules/4-context-optimization.md) | Select only the minimal relevant files rather than full folders to prevent noise, drift, and context dilution. | 🟡    |
| 5  | [Context window](modules/5-context-window.md) | Understand statelessness, context accumulation, and window biases to master session reset discipline. | 🟢    |
| 6  | [Deterministic controls](modules/6-deterministic-controls.md) | Integrate automated guardrails like linters and tests to verify agent changes and stop compounding mistakes. | 🟡    |
| 7  | [Advanced Workflow](modules/7-advanced-workflow.md) | Decompose complex tasks into Think → Plan → Implement phases with separate clean contexts to prevent compounding errors. | 🔴    |
| 8  | [Persistent context](modules/8-persistent-context.md) | Make quality repeatable using instructions, custom agents, on-demand skills, MCP tools, and sub-agents. | 🔴    |
| 9  | [Usage Analysis](modules/9-usage-analysis.md) | Develop the analytical skills needed to understand usage patterns and improve context, tools, and token efficiency. | 🔴    |

---

## How to measure "quality" without raw token counts

Throughout the labs you can use these **metrics** to make the abstract idea of "token value" concrete:

- **Retries to success:** how many times you had to re-prompt before the result was correct.
- **Turns / tool calls:** how many round-trips the agent took.
- **Correction edits:** how many manual fixes you made afterward.
- **Guardrail signal:** did the process still start, or did `npm test` / `npm run lint` pass.

Lower numbers = higher token value. Use these as a mental check after each lab; you do not need to write them down.

## The 6 levers at a glance

```text
1. Model selection        → large = plan/debug · medium = implement · small = trivial · Auto by default
2. Prompt engineering     → be precise · add stop conditions · supply context explicitly
3. Context optimization   → only relevant files · reset sessions often
4. Advanced workflow      → Think → Plan → Implement (separate, clean contexts)
5. Deterministic control  → tests · linters · security checks to stop compounding errors
6. Persistent context     → instructions · agents · skills · MCP · sub-agents (repeatable, not re-explained)
```