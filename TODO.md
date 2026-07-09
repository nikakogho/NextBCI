# TODO

## Current Loop: MVP Foundation

- [x] Read AGENTS.md and objective.
- [x] Inspect repository state.
- [x] Create static-first Next.js TypeScript Tailwind skeleton.
- [x] Add evidence model, milestone types, demo classifications, and sample data.
- [x] Implement home, companies, company detail, milestones, trials, and demos pages.
- [x] Add reusable badges, cards, source links, and page header components.
- [x] Add README, SPEC, PLAN, and TODO.
- [x] Install dependencies.
- [x] Run lint, typecheck, and build.
- [x] Fix validation failures or document blockers.

## Current Loop: Real Seed Data

- [x] Pick 5 to 8 high-signal BCI programs.
- [x] Replace fictional sample records with sourced seed records.
- [x] Update app copy so real seed data is not labeled as sample data.
- [x] Run lint, typecheck, and build after the data swap.
- [x] Fix validation failures or document blockers.

## Visual Loop: NextSpaceflight Tracker Pattern

- [x] Explore NextSpaceflight home, launches, detail, rockets, reuse, and locations surfaces.
- [x] Add an interactive upcoming/previous milestone switch.
- [x] Retune cards, header, and archive layout toward a dense tracker-board feel without copying colors.
- [x] Run lint, typecheck, and build after the UI changes.
- [x] Inspect desktop and mobile rendered pages.

## UI Loop: Milestone Details and Watch Actions

- [x] Pin milestone-card date chips to a fixed top position.
- [x] Add milestone detail pages with source, program, why-it-matters, and hype-check sections.
- [x] Add Details links from milestone cards.
- [x] Add YouTube-only Watch buttons that open in a new tab when a video source exists.
- [x] Make the landing page friendlier with start-here actions and card-reading guidance.
- [x] Run lint, typecheck, and build after the detail-route changes.
- [x] Inspect key rendered pages.

## Data Quality Loop: Source Validation

- [x] Add schema validation for required source links before records can be marked non-sample.
- [x] Validate IDs, source URLs, evidence fields, dates, and company relationships.
- [x] Wire data validation into `npm run build`.
- [x] Run validation, lint, typecheck, and build.

## Next Recommended Loops

- [x] Replace fictional sample records with 5 to 8 sourced real seed records.
- [x] Add schema validation for required source links before records can be marked non-sample.
- [x] Add interactive filters on milestone and demo archive pages.
- [x] Add tests for data query helpers and evidence-level mappings.

## Maintenance Loop: Hydration Warning

- [x] Suppress body-level hydration warnings caused by browser extension attributes such as `cz-shortcut-listen`.
- [x] Run lint, typecheck, and build after the layout change.

## Visual Loop: Soft Cortex Theme

- [x] Generate and add a soft cyan-green neocortex background texture.
- [x] Retune global UI colors for a lighter cyan-green tracker palette.
- [x] Add favicon to remove the browser `/favicon.ico` console 404.
- [x] Remove abandoned animated spike-firing prototype.
- [x] Run lint, typecheck, and build after the visual changes.
- [x] Inspect desktop and mobile screenshots.

## Reference-Inspired Tracker Loop

- [x] Research NextSpaceflight tracker pages and NeuroFounders faceted browsing.
- [x] Write reference requirements and work-task docs.
- [x] Get two subagent reviews and reconcile the task scope.
- [x] Stabilize milestone card and detail hero date/title layout.
- [x] Expand milestone filters by evidence, type, and program.
- [x] Add demo archive filters by classification, evidence, and program.
- [x] Add a recent source/action strip to the home page.
- [x] Add a local route/static-asset benchmark script.
- [x] Add lightweight data/query tests.
- [x] Run validation, lint, typecheck, build, benchmark, and screenshot checks.

## Map Zoom and Clustering Loop

- [x] Switch `/map` from the static SVG world map to the Leaflet map.
- [x] Use OpenStreetMap tiles, colored pins, and count clusters similar to the Dangerous Things partners map reference.
- [x] Let dense clusters break apart with zoom and spread same-city programs visually at high zoom.
- [x] Run validation, lint, typecheck, build, and rendered map checks.
