# Work Tasks: Reference-Inspired NextBCI Pass

These tasks are scoped for the static MVP. They should improve usefulness without adding a database, scraping, auth, analytics, or external services.

## Task 1: Card Layout Stability

- Keep the date chip fixed at the same top-left position on every milestone card and detail hero.
- Give card media a stable height and reserved bottom title zone so title length does not shift the perceived date position.
- Clamp card titles where needed, while preserving the full title on the detail page.
- Preserve click-through behavior from cards to milestone detail pages.

## Task 2: Archive Filters

- Expand milestone archive filters to include evidence level, milestone type, and program, where program means existing `companySlug` / lab-program records.
- Add a demo archive board with filters for classification, evidence level, and program.
- Keep filter controls compact and NextSpaceflight-like: Add Filter plus Upcoming / Previous on milestones and a compact archive summary on demos.
- Do not add a broad NeuroFounders-style startup taxonomy in this pass.

## Task 3: User-Friendly Home Surface

- Keep the existing compact "control room" start actions that point users to milestones, programs, trials, and demos.
- Add a recent source/action surface so users can quickly see what is sourced and whether a Watch button is available.
- Keep the page tracker-first, not a marketing landing page.

## Task 4: Performance Guardrail

- Keep the soft cortex background and card texture optimized as small WebP assets.
- Add a route benchmark script that can measure core pages and static assets against a running local server.
- Document how to run the benchmark.

## Task 5: Data Query Tests

- Add lightweight tests for query ordering, company relationships, evidence definitions, and conditional YouTube detection.
- Wire the tests into a package script.
- Keep tests static and local.
