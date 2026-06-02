# Design Decisions Log

## Tech Stack Decisions

**Next.js 16 with webpack over turbopack**: Turbopack has compatibility issues on macOS ARM64 with this project setup, causing build failures. Switched to webpack which builds successfully.

**Recharts for visualization**: Lightweight charting library that integrates well with React and supports the drift meter requirements without adding significant bundle size.

**Client-side state management**: Used React useState rather than external state management since the app is relatively simple and doesn't require complex state sharing patterns.

## UI/UX Decisions

**Three-pane layout**: Follows the left-to-right flow specified: Policies → Rules → Scorecard. Each pane has clear headers and empty states.

**Demo Mode as default**: Ensures zero-setup experience for reviewers. Toggle is prominently placed with clear explanation of what each mode does.

**Expandable rule cards**: Rules show summary by default with expand option for detailed view. Prevents overwhelming users with too much information upfront.

**Color coding for adherence**: Green (pass), yellow (drift), red (fail) follows standard conventions for status indicators.

## Demo Data Decisions

**Food delivery agent scenario**: Chose this as it's relatable and allows for realistic policy examples without being tied to any specific company.

**Hand-tuned results**: Demo data is crafted to tell a clear story:
- Rule 1 (allergies): Shows one violation in adversarial scenario where agent skips safety protocol
- Rule 2 (refunds): Clean pass showing proper escalation
- Rule 3 (late orders): Drift case showing non-deterministic behavior
- Rule 4 (privacy): Shows social engineering failure

**Realistic transcript examples**: Kept conversations natural and showed actual failure modes rather than obvious violations.

## Implementation Decisions

**No database approach**: Keeps deployment simple and makes the app truly portable. Demo data is bundled, live data stays in browser memory.

**Zod for validation**: Provides runtime type safety for AI outputs and clear error messages when models return malformed JSON.

**Server-side API key handling**: Never expose API keys to client, even in live mode. Keys are passed per-request and never persisted.

## Known Limitations Addressed

**Chart rendering warnings**: Recharts shows dimension warnings during static site generation but works fine in browser. These warnings don't affect functionality.

**Webpack over Turbopack**: Added explicit webpack flag to package.json scripts to ensure consistent builds across environments.