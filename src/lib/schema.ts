import { z } from 'zod';

export const ConstraintType = z.enum(['MUST_DO', 'MUST_NOT_DO', 'CONDITIONAL', 'ESCALATE']);
export type ConstraintType = z.infer<typeof ConstraintType>;

export const Rule = z.object({
  id: z.string(),
  sourceText: z.string(),
  intent: z.string(),
  constraintType: ConstraintType,
  parameters: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })),
  toolBoundary: z.string().nullable(),
  restatement: z.string(),
  trigger: z.string(),
  requiredBehavior: z.string(),
});
export type Rule = z.infer<typeof Rule>;

export const Scenario = z.object({
  id: z.string(),
  ruleId: z.string(),
  kind: z.enum(['DIRECT', 'ADVERSARIAL', 'EDGE_CASE']),
  userGoal: z.string(),
  openingMessage: z.string(),
  successCondition: z.string(),
  violationCondition: z.string(),
});
export type Scenario = z.infer<typeof Scenario>;

export const Verdict = z.object({
  scenarioId: z.string(),
  upheld: z.boolean(),
  violatingTurnIndex: z.number().nullable(),
  reasoning: z.string(),
  severity: z.enum(['none', 'minor', 'major']),
});
export type Verdict = z.infer<typeof Verdict>;

export const ScorecardEntry = z.object({
  rule: Rule,
  scenarios: z.array(Scenario),
  verdicts: z.array(Verdict),
  adherenceRate: z.number(),
  driftRuns: z.array(z.number()),
});
export type ScorecardEntry = z.infer<typeof ScorecardEntry>;