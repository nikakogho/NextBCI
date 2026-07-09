# NextBCI

NextBCI is a launch-tracker-style, evidence-first tracker for serious brain-computer interface progress - think NextSpaceflight, but for neural interfaces. It focuses on milestones such as trials, implants, demos, papers, and regulatory moves, presented as a dark mission-control dashboard with live countdowns and an interactive world map of the programs pushing the field.

This repository contains a static-first build with a small set of sourced seed records. The dataset is not exhaustive and should be reviewed like evidence summaries, not medical advice or product recommendations.

## Interface

- Dark, mission-control visual design with a "neural signal" motif generated per record (no external images).
- Live countdowns to upcoming milestones.
- Company project-track cards for separating product/program lines such as Neuralink Telepathy and Blindsight, with demonstrated vs not-yet-shown evidence split out.
- A full-screen Leaflet world map (`/map`) plotting every program at its home base, colored by current activity, with zoomable clusters and city-scale pin separation.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Static TypeScript data files
- Leaflet and `leaflet.markercluster` for the full map

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
npm run ci
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

Data lives in `data/seed-data.ts`, with shared types in `data/schema.ts`. Company-level project tracks use `programProjects` for product lines, clinical programs, or research programs that should sit under a company without pretending they are all the same kind of milestone.

When adding or editing records:

1. Use primary sources where possible: trial registries, papers, company updates, regulatory pages, or conference pages.
2. Keep the evidence level conservative.
3. Separate demonstrated capability from interpretation.
4. Include source links for every real milestone, project track, trial, demo, paper, and company claim.
5. Use `isSample: true` only for fictional placeholders, and do not mix placeholders into real milestone counts.
6. Run `npm run validate:data` and `npm run test:data` before review. `npm run build` also runs the data validator before compiling. `npm run ci` runs the full local gate.

## Pages

- `/` home dashboard with hero, live milestone feed, and map preview
- `/neuralink` dedicated program spotlight (program tracks, the system, live countdown, trials, history)
- `/map` full-screen interactive Leaflet world map of programs, colored by activity, with clustered pins that zoom, spiderfy, and separate at city scale
- `/milestones` milestone archive (upcoming countdowns + confirmed log)
- `/milestones/[id]` milestone detail with sources and program link
- `/companies` searchable program directory, filterable by approach and region
- `/companies/[slug]` program detail: profile, project tracks, upcoming checkpoints, accomplishments, trials, demos, papers
- `/trials` trial tracker
- `/demos` demo library
- `/search` global search across programs, project tracks, milestones, trials, demos, and papers

## Deploy readiness

The repo includes `netlify.toml` for Netlify's Next.js runtime:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `22`

GitHub Actions runs `npm run ci` on pull requests, pushes to `main`, and manual dispatch. To turn on Netlify automatic deploys, link the repo/site with Netlify (`netlify init` or the Netlify UI) and let Netlify use the committed `netlify.toml` settings.

## Data coverage

The dataset covers clinical and translational BCI programs across the US, Europe (Netherlands, France, Switzerland, Spain), and China (Beijing, Shanghai), plus a conservative slice of non-invasive EEG and focused-ultrasound programs where consumer/wellness claims are separated from medical evidence. Each program carries an approach (invasive / minimally invasive / non-invasive), region, and, where sourced, founding year and funding. Every milestone, trial, demo, and paper links to a primary or reputable source.

## World map data

The `/map` route uses Leaflet, OpenStreetMap tiles, and `leaflet.markercluster` so dense regions can be zoomed and clicked apart. The page is a map-first surface with overlay stats and an activity-sorted program directory. Same-city programs receive a visual-only spread in `components/LeafletMap.tsx`; source coordinates remain in `data/seed-data.ts`.

The homepage preview still uses local country outlines precomputed from `public/world-110m.json` into `data/world-paths.ts` by `scripts/generate-world.mjs`, using a plain equirectangular projection that `lib/geo.ts` mirrors so company markers align with the land. Regenerate with `npm run generate:world` (also runs automatically in `npm run build`).
