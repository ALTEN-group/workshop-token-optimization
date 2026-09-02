# Token Optimization quiz

11 questions from `workshop-token-optimization.pptx`.

## 1.

What distinguishes an AI Engineer from an AI-assisted engineer ?

- A. The AI Engineer no longer writes code;
- B. The AI Engineer uses only reasoning models
- C. the AI Engineer orchestrates multiple agents. The AI-assisted engineer works with one agent at a time
- D. There is no distinction

## 2.

What is the ROI goal ?

- A. Maximize tokens so the model stays “warm”
- B. Increase output quality while reducing token consumption
- C. Always pick the largest reasoning model
- D. Fill the context window before compacting

## 3.

What an LLM actually is ?

- A. A stateful knowledge base that remembers every past chat
- B. A compiler that executes your prompt as a program
- C. A stateless word-probability machine
- D. A search engine over the repository with guaranteed recall

## 4.

You need a plan and a debugging strategy for a tricky architecture change. Which LLM do you pick ?

- A. Low-tier because planning is cheap
- B. Reasoning models for planning and implementing
- C. Always Opus, because it is the best
- D. Reasoning models for planning; Mid-tier or low tier for implementing

## 5.

How to prompt correctly ?

- A. Be precise, add stop signals, attach only relevant known context, and say when to stop
- B. Paste the whole repo so the model cannot miss a file
- C. Avoid stop conditions so the agent can keep going
- D. Never mention files; let the agent discover everything to improve its knowledge base

## 6.

What is the session rule of thumb ?

- A. One long session for the whole day so cache hits stay high
- B. One session per topic or task; start a fresh one when it grows too big; compact only with caution because it can drop useful detail
- C. Always compact before every prompt
- D. Never start a new session; reuse the previous one’s hidden state

## 7.

What is true of cached input tokens?

- A. They are billed at zero and always applied
- B. They replace output tokens after the first loop
- C. They may reduce later-loop input, but they are not guaranteed
- D. They raise the model’s context limit

## 8.

Once the context window is growing, what bias does the deck warn about?

- A. The model equally weights every token in the window
- B. Recency bias: attention shifts to the end of the context; the middle and oldest tokens get lost
- C. Only system instructions survive; user files are dropped first
- D. The model automatically compact-summarizes with no information loss

## 9.

How should you fight compound error?

- A. One large autonomous change with no tests, then a debug session
- B. Small increments with deterministic controls (test/lint) and a clear stop after each change
- C. Fewer files in the repo so the agent has less chance to make a mistake
- D. Disable stop conditions so the agent can self-heal in one pass

## 10.

What is the Think → Plan → Code pattern ?

- A. One session, one model, one prompt that does all three
- B. Separate sessions and different model sizes for think, plan, and implement, with a short summary between them
- C. Think locally, then paste the whole plan into every later prompt forever
- D. Skip Think and Plan; Code mode already reasons well enough
