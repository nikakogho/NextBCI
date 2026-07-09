# NextBCI Launch-Feed Requirements

## Benchmark

The reference is the [Next Spaceflight Launches page](https://nextspaceflight.com/launches/), reviewed on 2026-07-09. Its public page presents an "Up Next" surface, a chronological launches list, an `Upcoming` / `Previous` switch, an `Add Filter` control, compact date-time-event-operator-location rows, and direct `Watch` links when a launch stream is available.

NextBCI should adopt the information architecture, not the spaceflight visual language. The product remains an evidence-first BCI tracker, not a predictions site or a generic startup directory.

## Product Requirements

1. The landing page must open on the user's immediate task: understand what BCI checkpoint is next and what evidence recently changed.
2. A primary checkpoint must be visible above the feed with its date, program, owner, evidence level, and a live countdown when the date is still upcoming.
3. The default activity feed must be chronological and start with upcoming checkpoints. Each entry must make its date, owner, title, milestone type, evidence level, and evidence link scannable without opening the detail page.
4. Users must be able to switch between upcoming and confirmed evidence without navigation. The control must state how many records are available in the active mode.
5. Users must be able to narrow the landing-page feed by milestone type. This is a local filter only; it must never hide data silently or imply a search result is exhaustive beyond the shown mode.
6. Every activity row must offer a NextBCI detail view and a direct primary source. A `Watch` action should appear only when the record includes a video source.
7. The UI must distinguish a scheduled checkpoint from confirmed evidence. A scheduled date is a planning signal, not a demonstrated result.
8. The global map preview must use the same interactive clustered map as `/map`, including zooming, marker clustering, and program popups. It must have an unambiguous link to the full map.
9. The landing page must show the tracker scale and evidence policy in a compact, data-derived summary rather than marketing claims.
10. The layout must remain usable at mobile widths: summary data wraps, filter controls do not overflow, feed rows collapse gracefully, and actions remain reachable.

## Acceptance Criteria

- The page has a primary next-checkpoint panel, an interactive activity board, source links, and a full-map pathway.
- Switching activity mode and milestone type updates the visible rows and count immediately.
- The primary source for every visible event is usable without visiting a separate detail screen.
- The map preview retains map-page behaviors rather than becoming a static image.
- All claims render from `data/seed-data.ts`; no browser scraping, external data service, or unsourced milestone is introduced.
