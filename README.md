# Token Optimization Workshop

> [!NOTE]
> Installing and running the project is not mandatory to follow this workshop.


## Run the sample app Docker

To start the application and its services (PostgreSQL, Liquibase migration, Traefik, application) in development mode using Docker Compose:

```sh
docker compose --env-file docker/conf/.env.dev -f docker/docker-compose.yml up --build -d
```

If you cannot launch the app in Docker, at least install the dependencies in your local environment so you can test the LLMs correct outputs :

```sh
npm i
```

## Modules

| #   | Module                           | Concept                                       | Level |
| --- | -------------------------------- | --------------------------------------------- | ----- |
| 00  | [ROI mindset](modules/00-setup.md) | Maximize token value                          | 🟢    |
| 01  | [Agent guessing](modules/01-agent-guessing.md) | Agent ROI + compounding error                 | 🟢    |
| 02  | [Stateless model](modules/02-stateless-model.md) | Stateless LLM, context window                 | 🟢    |
| 03  | [Lever 1 : Model selection](modules/03-model-selection.md) | Right model for the job                       | 🟡    |
| 04  | [Lever 2 : Context optimization](modules/04-context-optimization.md) | As little as possible, as much as necessary   | 🟡    |
| 05  | [Lever 3 : Prompt engineering](modules/05-prompt-engineering.md) | Precise prompts + stop conditions             | 🟡    |
| 06  | [Lever 4 : Workflow](modules/06-workflow.md) | Research → Plan → Implement                   | 🟡    |
| 07  | [Lever 5 : Deterministic controls](modules/07-deterministic-controls.md) | Tests, linters, security gates                | 🟡    |
| 08  | [Lever 6 : Persistent context](modules/08-persistent-context.md) | Instructions, agents, skills, MCP, sub-agents | 🔴    |
| 09  | [Power-user tips](modules/09-power-user.md) | Scripting, filtering, usage analysis          | 🔴    |

---



## How to measure "quality" without raw token counts

Throughout the labs you can use these **metrics** to make the abstract idea of "token value" concrete:

- **Retries to success** : how many times you had to re-prompt before the result was correct.
- **Turns / tool calls** : how many round-trips the agent took.
- **Correction edits** : how many manual fixes you made afterward.
- **Guardrail signal** : did tests / lint / type-check pass on the first agent attempt?

Lower numbers = higher token value. You'll record these in a simple scorecard in each module.


## The 5 levers at a glance

```text
1. Model selection       → large = plan/debug · medium = implement · small = trivial · Auto by default
2. Context optimization  → only relevant files · reset sessions often
3. Prompt engineering    → be precise · add stop conditions · supply context explicitly
4. Workflow design       → Think → Plan → Implement (separate, clean contexts)
5. Deterministic control → tests · linters · security checks to stop compounding errors
```