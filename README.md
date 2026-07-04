# Token Optimization Workshop

This workshop is the second part of ALTEN's two-hour advanced training session on optimizing tokens for AI code assistants.

> [!NOTE]
> Running the project is not mandatory to follow this workshop.

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

| #  | Module                           | Level |
| -- | -------------------------------- | ----- |
| 0  | [ROI mindset](modules/0-setup.md) | 🟢    |
| 1  | [Agent guessing](modules/1-agent-guessing.md) | 🟢    |
| 2  | [Stateless model](modules/2-stateless-model.md) | 🟢    |
| 3  | [Lever 1 : Model selection](modules/3-model-selection.md) | 🟡    |
| 4  | [Lever 2 : Context optimization](modules/4-context-optimization.md) | 🟡    |
| 5  | [Lever 3 : Prompt engineering](modules/5-prompt-engineering.md) | 🟡    |
| 6  | [Lever 4 : Workflow](modules/6-workflow.md) | 🟡    |
| 7  | [Lever 5 : Deterministic controls](modules/7-deterministic-controls.md) | 🟡    |
| 8  | [Lever 6 : Persistent context](modules/8-persistent-context.md) | 🔴    |
| 9  | [Become a Token expert ](modules/9-token-expert.md) | 🔴    |

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