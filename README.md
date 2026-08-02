# NextBCI

NextBCI is a launch-tracker-style, evidence-first tracker for serious brain-computer interface progress - think NextSpaceflight, but for neural interfaces. It focuses on milestones such as trials, implants, demos, papers, and regulatory moves, presented as a dark mission-control dashboard with live countdowns and an interactive world map of the programs pushing the field.

This repository contains a static-first build with sourced program records and source-linked evidence. The dataset is not exhaustive and should be reviewed like evidence summaries, not medical advice or product recommendations.

## Interface

- Dark, mission-control visual design with a "neural signal" motif generated per record (no external images).
- Landing-page activity console with a primary next checkpoint, live countdowns, upcoming/confirmed switching, milestone-type filtering, and direct source actions.
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

Then open `http://localhost:3100`. Port 3100 is the project default because port 3000 is commonly occupied. To use another port temporarily, run `npm exec next dev -- -p 4200`.

## Validate

```bash
npm run validate:data
npm run test:data
npm run lint
npm run typecheck
npm run build
npm run check:build-size
npm run ci
```

The network-dependent `npm run audit:sourced-links` command checks the 100 expansion-company sites, 200 institutional sites, and all retained expansion paper/video links for hard failures and parked domains. It is intentionally separate from deterministic CI because some publishers and organization sites rate-limit automated requests or block particular regions and clients.

To benchmark rendered routes and static assets against a running local server:

```bash
npm run dev
BENCHMARK_BASE_URL=http://localhost:3100 npm run benchmark:routes
```

In PowerShell, set the benchmark target like this:

```powershell
$env:BENCHMARK_BASE_URL = "http://localhost:3100"
npm run benchmark:routes
```

## Add data

Core tracker data lives in `data/seed-data.ts`, the audited top-company milestone expansion lives in `data/top-company-milestones.ts`, NeuroFounders company research lives in `data/company-research.ts`, and shared types live in `data/schema.ts`. Company-level project tracks use `programProjects` for product lines, clinical programs, or research programs that should sit under a company without pretending they are all the same kind of milestone.

When adding or editing records:

1. Use primary sources where possible: trial registries, papers, company updates, regulatory pages, or conference pages.
2. Keep the evidence level conservative.
3. Separate demonstrated capability from interpretation.
4. Include source links for every real milestone, project track, trial, demo, paper, and company claim.
5. Use `isSample: true` only for fictional placeholders, and do not mix placeholders into real milestone counts.
6. Run `npm run validate:data` and `npm run test:data` before review. `npm run build` also runs the data validator before compiling. `npm run check:build-size` protects the cold homepage and map-shell payload budgets. `npm run ci` runs the full local gate.

## Pages

- `/` home dashboard with hero, live milestone feed, and map preview
- `/neuralink` dedicated program spotlight (program tracks, the system, live countdown, trials, history)
- `/explore` unified discovery surface for companies and university research, filterable by organization type, invasiveness, region, device class, organization profile, and readiness
- `/map` full-screen interactive Leaflet world map of organizations, colored by activity, with company/university filtering, clustered pins, zoom, and city-scale pin separation
- `/milestones` activity archive (upcoming checkpoints + confirmed evidence)
- `/milestones/[id]` milestone detail with sources and program link
- `/companies` redirect to `/explore` for compatibility
- `/companies/[slug]` organization detail: profile, company research, founders/location/value notes, official-source highlights, paper/video resources, project tracks, upcoming checkpoints, accomplishments, trials, demos, and evidence papers
- `/trials` trial tracker
- `/demos` demo library
- `/search` redirect to `/explore` for compatibility

## Deploy readiness

The repo includes `netlify.toml` for Netlify's Next.js runtime:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `22`
- Netlify Dev target: `3100` (Netlify's proxy remains on `8888`)
- Map data: generated as cacheable `/map-nodes.json`; Leaflet and the 1,064-node dataset load separately from the initial landing-page payload

GitHub Actions runs `npm run ci` on pull requests, pushes to `main`, and manual dispatch. To turn on Netlify automatic deploys, link the repo/site with Netlify (`netlify init` or the Netlify UI) and let Netlify use the committed `netlify.toml` settings.

## Data coverage

The dataset covers 1,064 clinical, translational, and BCI-enabling organizations across 80 countries: 588 companies and 476 university, hospital, nonprofit, or public research organizations. It includes every company in the NeuroFounders Startup Map captured on 2026-07-31: 157 were already represented and 192 were added in the complete reconciliation. The source-by-source inclusion audit lives in [`docs/neurofounders-company-catalog.md`](docs/neurofounders-company-catalog.md); the 349-company enrichment coverage table lives in [`docs/neurofounders-company-research.md`](docs/neurofounders-company-research.md). A separate evidence audit documents the Russia, Western Asia, Central Asia, and East Asia-outside-China expansion in [`docs/russia-and-asia-coverage-audit.md`](docs/russia-and-asia-coverage-audit.md). The additional 100-company and 200-institution evidence catalog, including one retained source trail per record, lives in [`docs/sourced-neurotechnology-expansion-2026.md`](docs/sourced-neurotechnology-expansion-2026.md); its company-by-company founding, location, value-disclosure, paper, and video audit lives in [`docs/sourced-company-enrichment-2026.md`](docs/sourced-company-enrichment-2026.md). The Africa/South America expansion adds 100 organizations from each region, with DOI, ROR, city, official-page, and limitation notes in [`docs/africa-south-america-neurotechnology-expansion-2026.md`](docs/africa-south-america-neurotechnology-expansion-2026.md).

The prominence-weighted top-100 company audit lives in [`docs/top-100-company-milestone-audit.md`](docs/top-100-company-milestone-audit.md). It records the ranking method, the 18 companies that already had tracker milestones, the 82 that did not, all 94 added confirmed/upcoming records, representative primary sources, and the evidence boundaries applied to regulator decisions, registries, papers, and company announcements.

Every reconciled NeuroFounders company has a dated enrichment profile. It records founding year, founder and headquarters research status, funding and regulatory labels, a conservative company-value note, company-reported accomplishment leads, and curated official paper/publication and YouTube/Vimeo links. The 300 sourced-expansion profiles retain the same schema while explicitly leaving fields unverified when the discovery pass did not establish them. Private-company value is never inferred from funding stage, and first-party claims remain visibly separate from demonstrated NextBCI milestones.

The tracker classifies each organization by invasiveness, normalized device class, organization profile, and readiness; academic research is always separated from commercial product readiness. The dataset includes conservative slices of EEG, MEG, MEA, ECoG, intracortical, endovascular, fMRI/fNIRS/hemodynamic, focused-ultrasound, neuroimaging, neuromodulation, assistive-control, and neural-interface infrastructure programs. Company project tracks split multi-line programs such as Neuralink Telepathy vs Blindsight, Blackrock NeuroPort/Utah Array vs MoveAgain, university research tracks, and brain-spine interface lines from ONWARD, NeuroRestore/EPFL-CHUV-UNIL, CEA/Clinatec, NeuCyber/CIBR, Fudan, Zhejiang University/Nanhu, and Hainan University. Every milestone, project track, trial, demo, paper, and company or institution profile links to a primary or reputable source. NeuroFounders-only discovery records remain at E1 until product-specific primary evidence supports a stronger level. Because the source map exposes country rather than city headquarters, those new records use visibly labeled country-level map points.

The product requirements distilled from the Next Spaceflight launch-feed benchmark live in [`docs/nextspaceflight-launch-feed-requirements.md`](docs/nextspaceflight-launch-feed-requirements.md).

The page-by-page simplification decisions live in [`docs/ux-simplification-audit.md`](docs/ux-simplification-audit.md).

## World map data

The `/map` route uses Leaflet, OpenStreetMap tiles, and `leaflet.markercluster` so dense regions can be zoomed and clicked apart. The page is a map-first surface with overlay stats and an activity-sorted program directory. The homepage uses the same Leaflet map in compact mode: tiles, clusters, zoom controls, popups, and same-city pin separation are shared with `/map`, while the directory overlays stay on the full map page. Both surfaces fetch the generated `public/map-nodes.json` asset after the page shell loads; the homepage waits until its map approaches the viewport. This keeps Leaflet and the full map dataset out of the first-page HTML and React payload while preserving the interactive map. Same-city programs receive a visual-only spread in `components/LeafletMap.tsx`; source coordinates remain in `data/seed-data.ts`.

Regenerate the cacheable map dataset with `npm run generate:map-data`. It also runs automatically before local development and during production builds.

The legacy static world-map assets remain available for reference. Regenerate local country outlines from `public/world-110m.json` into `data/world-paths.ts` with `npm run generate:world` when needed (also runs automatically in `npm run build`).
