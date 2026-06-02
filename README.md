# Agent Policy Compiler

A live web application that transforms business policies written in plain English into structured, machine-checkable rules, automatically generates adversarial test scenarios, and measures agent policy adherence in real-time.

## How it works

The Agent Policy Compiler demonstrates a complete policy-as-code workflow in four steps:

1. **Compile** - Transform plain English policies into structured rules with defined parameters, constraints, and tool boundaries
2. **Generate Tests** - Automatically create adversarial test scenarios including direct compliance tests, social engineering attempts, and edge cases
3. **Run Agent** - Execute scenarios against an LLM agent using the compiled rules as instructions
4. **Judge & Measure** - Use LLM-as-judge to evaluate adherence and detect drift across multiple runs

## The thesis

For an agent to be trustworthy, the policy and the test for the policy should be authored together, and adherence should be measured, not assumed.

## Demo Mode vs Live Mode

**Demo Mode** (default) - Explore the full application with pre-computed results. No setup required.

**Live Mode** - Run real AI evaluations with your own Anthropic API key for actual policy testing.

## Local Setup

### Demo Mode (No setup required)
```bash
npm install
npm run dev
```
Open http://localhost:3000 and explore the pre-computed demo results.

### Live Mode
1. Get an Anthropic API key from https://console.anthropic.com
2. Click the Demo/Live toggle and enter your API key when prompted
3. Now you can compile real policies and run live evaluations

## Honest Limitations

- **LLM Judge Imperfection**: The system grades with an LLM judge, which is itself imperfect and may miss subtle violations or flag false positives
- **Intentionally Non-Hardened Agent**: The agent-under-test is designed to be realistic but not bulletproof - the goal is surfacing real failures, not engineering perfect compliance
- **Demo vs Reality**: Demo results are illustrative and hand-tuned for narrative clarity, while live results reflect actual model behavior with all its inconsistencies

## Technology Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **AI**: Anthropic Claude (via @anthropic-ai/sdk) for compilation, scenario generation, agent simulation, and judging
- **Validation**: Zod schemas for all AI outputs
- **Charts**: Recharts for drift visualization
- **Architecture**: Client-side React state + server-side API routes, no database required

All AI calls happen server-side to protect API keys. Demo mode works entirely client-side with bundled data.

## Screenshots

_Screenshots will be added to the docs/ directory_