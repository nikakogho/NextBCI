# AGENTS.md

## Project
This repo is NextBCI: a sober, evidence-first tracker for serious brain-computer interface progress.

NextBCI is not a broad neurotech startup map. It tracks BCI milestones: trials, implants, demos, papers, regulatory moves, events, and evidence.

## Product rules
- Do not invent factual BCI claims as real data.
- Use sample data only when clearly marked as sample.
- Every real milestone must have source links.
- Separate demonstrated capability from hype.
- Prefer primary sources: trial registries, papers, company updates, regulatory pages, conference pages.

## Engineering rules
- Keep changes small and reviewable.
- Prefer static JSON/YAML data before adding a database.
- No auth, ads, paywalls, analytics, or scraping in the MVP.
- Do not add external services unless explicitly requested.
- Run lint/typecheck/build after meaningful code changes.
- If validation fails, fix it or document the blocker.
- Update TODO.md after each loop.

## Done means
- The requested page/feature works.
- Data renders from version-controlled files.
- Build/typecheck/lint pass where available.
- README/TODO are updated when behavior or workflow changes.