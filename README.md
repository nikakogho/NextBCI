# NextBCI

NextBCI is a launch-tracker-style, evidence-first tracker for serious brain-computer interface progress — think NextSpaceflight, but for neural interfaces. It focuses on milestones such as trials, implants, demos, papers, and regulatory moves, presented as a dark mission-control dashboard with live countdowns and an interactive world map of the programs pushing the field.

This repository contains a static-first build with a small set of sourced seed records. The dataset is not exhaustive and should be reviewed like evidence summaries, not medical advice or product recommendations.

## Interface

- Dark, mission-control visual design with a "neural signal" motif generated per record (no external images).
- Live countdowns to upcoming milestones.
- An interactive world map (`/map`) plotting every program at its home base, colored by current activity — the most active programs glow red.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Static TypeScript data files

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Next.js.

## Validate

```bash
npm run validate:data
npm run test:data
npm run lint
npm run typecheck
npm run build
```

To benchmark rendered routes and static assets against a running local server:

```bash
npm run dev
BENCHMARK_BASE_URL=http://localhost:3000 npm run benchmark:routes
```

In PowerShell, set the benchmark target like this:

```powershell
$env:BENCHMARK_BASE_URL = "http://localhost:3000"
npm run benchmark:routes
```

## Add data

Data lives in `data/seed-data.ts`, with shared types in `data/schema.ts`.

When adding or editing records:

1. Use primary sources where possible: trial registries, papers, company updates, regulatory pages, or conference pages.
2. Keep the evidence level conservative.
3. Separate demonstrated capability from interpretation.
4. Include source links for every real milestone, trial, demo, paper, and company claim.
5. Use `isSample: true` only for fictional placeholders, and do not mix placeholders into real milestone counts.
6. Run `npm run validate:data` and `npm run test:data` before review. `npm run build` also runs the data validator before compiling.

## Pages

- `/` home dashboard with hero, live milestone feed, and map preview
- `/neuralink` dedicated program spotlight (the system, live countdown, trials, history)
- `/map` interactive world map of programs, colored by activity
- `/milestones` milestone archive (upcoming countdowns + confirmed log)
- `/milestones/[id]` milestone detail with sources and program link
- `/companies` searchable program directory, filterable by approach and region
- `/companies/[slug]` program detail: profile, upcoming checkpoints, accomplishments, trials, demos, papers
- `/trials` trial tracker
- `/demos` demo library
- `/search` global search across programs, milestones, trials, demos, and papers

## Data coverage

The dataset covers clinical and translational BCI programs across the US, Europe (Netherlands, France, Switzerland, Spain), and China (Beijing, Shanghai). Each program carries an approach (invasive / minimally invasive / non-invasive), region, and — where sourced — founding year and funding. Every milestone, trial, demo, and paper links to a primary or reputable source.

## World map data

Country outlines are precomputed from `public/world-110m.json` (world-atlas topojson) into `data/world-paths.ts` by `scripts/generate-world.mjs`, using a plain equirectangular projection that `lib/geo.ts` mirrors so company markers align with the land. Regenerate with `npm run generate:world` (also runs automatically in `npm run build`).
