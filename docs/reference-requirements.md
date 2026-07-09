# Reference Requirements: Tracker Patterns

This note records the product patterns worth borrowing from NextSpaceflight and NeuroFounders while keeping NextBCI focused on evidence-backed BCI milestones.

## Sources Reviewed

- NextSpaceflight home: https://nextspaceflight.com/
- NextSpaceflight launches archive: https://nextspaceflight.com/launches/
- NextSpaceflight rockets catalog: https://nextspaceflight.com/rockets/
- NextSpaceflight reuse/vehicles catalog: https://nextspaceflight.com/reuse/
- NeuroFounders home: https://www.neurofounders.co/
- NeuroFounders startup map: https://www.neurofounders.co/resources/start-up-map

## NextSpaceflight Patterns To Adapt

- Put the next high-signal item first, then make the rest of the archive easy to scan.
- Use an Upcoming / Previous toggle as a primary mental model for time-based records.
- Keep archive controls compact: Add Filter, segmented status controls, concise card rows.
- Show date/time at a fixed visual anchor on cards, independent of title length.
- Make cards clickable to a detail page with richer context and source actions.
- Show Watch actions only when a video stream/replay exists, and open external video links in a new tab.
- Give detail pages a source surface, key stats, and mission-specific context instead of repeating the card.
- Use related catalogs as utility views, not marketing sections.

## NeuroFounders Patterns To Adapt

- Use faceted filters for technical browsing: modality, form factor/depth, indication, regulatory state, region/funding only when relevant.
- Keep editorial and evidence records distinct. Articles can explain context, but they should not become unsourced milestones.
- Make summaries useful to scientists, founders, investors, and technically curious readers without broadening into wellness neurotech.
- Prefer structured tags and clear categories over long narrative lists.

## Patterns To Reject Or Defer

- Do not copy either site's colors, brand treatment, or broad content mix.
- Do not build a generic neurotech startup map in the MVP.
- Do not add newsletters, auth, analytics, ads, scraping, or external data services.
- Do not treat company posts, media articles, or demos as peer-reviewed evidence.
- Do not add notifications, apps, calendars, or live widgets until the static tracker is strong.

## Gaps In The Current NextBCI MVP

- Card composition needs stricter fixed zones so date chips do not appear to move when titles wrap.
- Milestone filters need more than evidence level: users should filter by program and milestone type.
- Demo archive needs interactive filters for classification, evidence level, and program.
- Home should act more like a friendly control room: compact orientation, obvious next actions, and a small recent-source surface.
- The optimized background assets need a repeatable performance benchmark so regressions are easy to catch.
- Data/query behavior needs lightweight tests in addition to schema validation.
