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

## Map Refinement Loop: Full-Screen Partner-Map Feel

- [x] Convert `/map` into a map-first full-screen surface with overlay summary and program directory panels.
- [x] Move zoom controls onto the map and keep OpenStreetMap tile interaction available across desktop and mobile.
- [x] Make dense clusters zoom at broad scales and spiderfy at regional scales.
- [x] Increase visual-only same-city pin separation so multiple programs in one city can be selected individually.
- [x] Run validation, lint, typecheck, build, and rendered map checks.

## Data/UI Loop: Neuralink Project Tracks and Netlify Gate

- [x] Add `programProjects` data for Neuralink Telepathy / PRIME and Blindsight / Visual Prosthesis.
- [x] Add Blindsight FDA Breakthrough Device Designation as a sourced Neuralink milestone.
- [x] Render project-track cards on `/neuralink` and `/companies/[slug]`.
- [x] Include demonstrated vs not-yet-shown evidence on project-track cards.
- [x] Add project-track validation and query tests.
- [x] Add `npm run ci`, GitHub Actions CI, `netlify.toml`, and `.netlify/` gitignore entry.
- [x] Run full CI/build verification and rendered page checks.

## Next Data Expansion Loop

- [x] Add Nudge with sourced company profile, milestones, and evidence notes.
- [x] Add Neurosity with sourced company profile, milestones, and evidence notes.
- [x] Add Muse and Emotiv as non-invasive EEG companies with clear consumer/wellness vs medical-evidence boundaries.
- [x] Expand Blackrock Neurotech with NeuroPort/Utah Array and MoveAgain project tracks, FDA 510(k) clearance, and paper anchors.
- [x] Promote a sourced top-10 EEG/dev/research-hardware batch into the main dataset.
- [x] Promote a sourced top-10 fMRI/fNIRS/hemodynamic BCI and BCI-enabling batch into the main dataset.
- [x] Promote a sourced top-10 focused-ultrasound/ultrasound-interface and adjacent neuromodulation batch into the main dataset.
- [x] Add explicit China/Europe brain-spine interface coverage with sourced result notes, project tracks, demo/doc links, and conservative evidence labels.
- [x] Promote the China BCI expansion batch into the main dataset: Tianjin University/Haihe Lab, Nankai Interventional BCI, CAS CEBSIT/Huashan, BrainCo, ShanghaiTech BCI Center, SCUT/Pazhou, and Shanghai Yansi/Huashan.
- [x] Add a ranked, sourced watchlist for Chinese BCI programs before promoting more entries into the main dataset.

## Brain-Spine Interface Data Loop

- [x] Add at least 3 China-based brain-spine or spinal-interface programs with sources: NeuCyber/CIBR Beinao, Fudan ISTBI, Zhejiang University/Nanhu, and Hainan University WukongBot.
- [x] Add at least 3 Europe-based brain-spine interface programs with sources: ONWARD ARC-BCI, NeuroRestore/EPFL-CHUV-UNIL, and CEA/Clinatec WIMAGINE.
- [x] Add demonstrated-result and not-yet-shown project-track notes for each brain-spine/spinal-interface line.
- [x] Add available official video or document links, using non-primary flags for media reports where appropriate.
- [x] Run validation, tests, lint, typecheck, and build after the data expansion.

## Candidate Sourcing Queue

These are not dataset records yet unless checked. Promote only after a source pass with primary links, a conservative evidence level, and a hype-check note.

- [x] EEG batch: promoted 10 non-invasive EEG/developer/research-hardware candidates into the main dataset.
- [x] fMRI / hemodynamic batch: promoted 10 active fMRI, fNIRS, and other hemodynamic interface programs where BCI relevance is explicit and sourced.
- [x] Focused-ultrasound batch: promoted Nudge plus 9 sourced focused-ultrasound, ultrasound-interface, and adjacent neuromodulation programs; lesioning-only programs left out.
- [x] China batch: promoted 10-plus China-based BCI programs or hospital/lab/company collaborations across invasive, interventional, non-invasive, speech, and brain-spine/spinal-interface categories. Press-only or thin-primary candidates remain watchlisted until a stronger source pass clears them.
- For every candidate, capture: slug, likely category, modality, target function, evidence level, primary source URLs, what has been demonstrated, and what has not.

## China Watchlist

Ranked candidates that are not dataset records yet:

1. Gestala - ultrasound BCI startup with credible funding/media coverage, but only thin official public detail found so far. Sources: LinkedIn company page (`https://www.linkedin.com/company/gestala`), Wired (`https://www.wired.com/story/this-chinese-startup-wants-to-build-a-new-brain-computer-interface-no-implant-required-gestalta/`), TechCrunch (`https://techcrunch.com/2026/03/11/bci-startup-gestala-raises-21-million-for-non-invasive-ultrasound-brain-tech/`), and MassDevice (`https://www.massdevice.com/chinese-ultrasound-based-bci-startup-gestala-raises-21-7m/`).
2. UESTC / Sichuan non-invasive BCI groups - included in Tianjin University's national BCI education alliance (`https://en.tju.edu.cn/info/1010/13216.htm`), but needs project-specific primary sources before promotion.
3. Beihang University BCI groups - included in Tianjin University's national BCI education alliance (`https://en.tju.edu.cn/info/1010/13216.htm`), but project-specific evidence still needs sourcing.
4. Southeast University / brain-computer-metasurface work - technically relevant via the brain-computer-metasurface paper (`https://arxiv.org/abs/2205.00280`), but needs stronger mapping from paper/demo to sustained BCI program.
5. Southern University of Science and Technology brain-on-chip / organoid interface work - interesting adjacent interface work (see Xinhua `https://www.news.cn/20240627/431d44f8824348d6b353459f9eb061b5/c.html` and Tianjin University Medical School `https://mstu.tju.edu.cn/info/1445/3971.htm`), but too far from assistive BCI until better program evidence is collected.

## NeuroFounders Bulk Expansion Loop

- [x] Use NeuroFounders Startup Map as a discovery layer and verify promoted records with official websites or durable secondary sources.
- [x] Add 100 currently missing neurotech companies that are BCI, BCI-enabling, neuroimaging, neuromodulation, assistive-control, or neural-interface infrastructure enough to fit the tracker scope.
- [x] Include at least 5 Australia/New Zealand/Oceania-region additions: Affectable Sleep, Control Bionics, Cortical Labs, EMVision, and Epiminder.
- [x] Include at least 30 Asia-outside-China additions across India, Israel, South Korea, Singapore, Japan, and Taiwan.
- [x] Keep broad consumer/wellness and adjacent neuromodulation claims clearly separated from demonstrated BCI restoration evidence through conservative evidence levels and hype-check copy.
- [x] Run validation, data tests, lint, typecheck, and build after the bulk expansion.

## NextSpaceflight Landing and Data Expansion Loop

- [x] Analyze the Next Spaceflight launches surface and write concrete, product-specific requirements in `docs/nextspaceflight-launch-feed-requirements.md`.
- [x] Add a primary next-checkpoint panel, coverage summary, activity feed mode switch, milestone-type filter, direct source actions, and shared interactive map preview to the landing page.
- [x] Add 50 new Europe-based organizations and 50 new organizations elsewhere, each with a direct official technology, product, or company reference.
- [x] Preserve conservative evidence levels and profile-level hype checks for broad neurotechnology and assistive-control records.
- [x] Run data validation, data-query tests, lint, typecheck, and production build after the expansion.

## University Research and Explore Loop

- [x] Add normalized device classes, organization profiles, and readiness states with conservative fallbacks for pre-existing records.
- [x] Add 50 additional company profiles with direct official product or technology references.
- [x] Add 50 university neurotechnology projects: 30 US, 10 Europe, and 10 Asia, represented as research organizations and project tracks.
- [x] Add prominent product-track detail to existing high-signal organization profiles.
- [x] Replace separate Programs/Search navigation with Explore and preserve legacy URLs through redirects.
- [x] Add organization, invasiveness, region, device class, organization profile, and readiness filters to Explore.
- [x] Differentiate company and university research visually on map, directory, and detail pages.
- [x] Simplify Activity, Trials, and Demos by removing repeated explanatory or source-list chrome.
- [x] Record page-by-page decisions in `docs/ux-simplification-audit.md` and run complete verification.

## NeuroFounders Complete Catalog Reconciliation

- [x] Catalog all 349 profiles on the live NeuroFounders Startup Map across all four pages.
- [x] Reconcile source profiles against existing NextBCI slugs, names, official domains, and verified aliases.
- [x] Record the 157 already-included and 192 previously-missing companies in `docs/neurofounders-company-catalog.md`.
- [x] Add all 192 missing companies with official-site and NeuroFounders profile links.
- [x] Keep profile-only evidence at E1 and avoid promoting source-map regulatory labels into unsupported evidence claims.
- [x] Plot source-only locations as explicitly labeled country-level points because verified city headquarters were not present in the source profiles.
- [x] Run validation, data tests, lint, typecheck, build, and rendered map checks after the complete reconciliation.

## NeuroFounders Company Research Enrichment

- [x] Research all 349 reconciled NeuroFounders profiles against their structured source profiles and official company sites.
- [x] Record a dated founding year, founder-attribution status, location status, funding stage, regulatory label, and conservative company-value note for every profile.
- [x] Keep private-company valuations as not publicly disclosed unless a reliable figure is available; do not substitute funding stage for net worth.
- [x] Log company-reported accomplishment leads without promoting them to demonstrated evidence milestones.
- [x] Curate official paper/publication resources and YouTube/Vimeo links where found.
- [x] Render research fields and resources on company detail pages and validate the complete 349-profile research dataset.

## Local Port and First-Load Performance

- [x] Make `npm run dev` and `npm run start` use port 3100 by default and align Netlify Dev with that target.
- [x] Move the 547-node map dataset out of landing-page HTML and React payloads into a generated static JSON asset.
- [x] Defer the homepage Leaflet bundle and map-data request until the map approaches the viewport.
- [x] Load the full map data client-side on `/map` while preserving its map-first loading shell.
- [x] Add CDN-oriented caching for the generated map dataset in `netlify.toml`.
- [x] Rebuild, compare cold payload sizes, and verify the homepage and full map in a real browser.
- [x] Add CI payload budgets for the homepage and map route shells to prevent the first-load regression from returning.

## Russia and Asia Coverage Audit

- [x] Measure existing country coverage before adding records: Russia and Central Asia were empty; Western Asia already had 16 Israel records and one Turkey record; East Asia outside China already had 24 records across Japan, South Korea, and Taiwan.
- [x] Add six sourced Russian companies and two Russian university BCI centers with city coordinates, leadership or founder status, value-disclosure status, accomplishments, and available papers or videos.
- [x] Add six Western Asian research organizations across Turkey, Saudi Arabia, and the UAE without representing announced centers as operational programs.
- [x] Add sustained or documented BCI work in Kazakhstan, Uzbekistan, and Mongolia, while keeping single-project and infrastructure records at E1.
- [x] Record the regional methodology, additions, exclusions, and remaining evidence gaps in `docs/russia-and-asia-coverage-audit.md`.

## 100 Company / 200 Research-Organization Expansion

- [x] Deduplicate discovery candidates against the existing 564 records by normalized name, slug, and base website domain.
- [x] Add exactly 100 current neurotechnology companies with an official site plus a dated discovery/audit source.
- [x] Add exactly 200 academic, hospital, nonprofit, or public research organizations with a representative 2023-2026 peer-reviewed neurotechnology paper.
- [x] Generate dated research profiles that preserve unknown founders, valuations, funding, regulatory status, videos, and papers as unknown instead of inferring them.
- [x] Publish the complete 300-record source catalog in `docs/sourced-neurotechnology-expansion-2026.md` and keep the rendered map payload static.
- [x] Replace parked, acquired, merged, semantically duplicated, or oncology-only candidates with current evidence-backed records, including a suffix-aware duplicate guard.
- [x] Finish source-reachability, semantic-duplicate, build-size, and rendered-browser verification for the 864-record catalog.
- [x] Run data validation, data-query tests, lint, typecheck, build, payload-budget checks, and a rendered map/profile smoke test.

## Africa / South America 200-Organization Expansion

- [x] Add exactly 100 new African and 100 new South American neurotechnology research organizations with recent DOI-backed evidence.
- [x] Resolve paper affiliations to active ROR identities, official institutional homepages, organization types, founding-year leads, and city coordinates.
- [x] Deduplicate normalized names and slugs against the complete 864-record catalog and within the regional expansion.
- [x] Publish a complete 200-row source catalog with country coverage and explicit evidence limitations.
- [x] Rebuild the 1,064-node static map payload, validate all profiles, audit 561 unique evidence/institution links, and run rendered map/profile smoke tests on port 3100. The link audit found no broken DOI or ROR evidence targets; 44 registry-supplied institutional homepages were unavailable from the audit host and remain explicitly non-authoritative identity leads.

## Top 100 Company Milestone Audit

- [x] Define and document a prominence-weighted cohort of 100 catalog companies without presenting the order as an objective fame score.
- [x] Measure pre-audit milestone coverage: 18 companies covered and 82 without tracker milestones.
- [x] Add 94 primary-source-backed milestone records so all 100 companies have rendered activity, including 13 explicitly labeled upcoming watch points.
- [x] Prefer FDA records, ClinicalTrials.gov, and peer-reviewed papers; keep company-only launches, implants, designations, and observational claims at conservative evidence levels.
- [x] Add a deterministic 100-company coverage validator and a reproducible Markdown audit generator.
- [x] Run the complete CI gate, regenerate the map payload, and smoke-test representative milestones, company profiles, and map markers on port 3200 (port 3100 was already owned by another local NextBCI process and was left untouched).

## Complete European Organization Evidence Audit

- [x] Define an inclusive, documented European country scope and reconcile all 352 in-scope catalog organizations.
- [x] Resolve a canonical institution-affiliated paper for every one of the 105 European academic programs.
- [x] Promote 125 qualifying paper records and 64 sponsor/collaborator or explicitly named program/device ClinicalTrials.gov records without treating registration as a positive result.
- [x] Add 40 trial-start, regulatory, or future registry checkpoints while rejecting lapsed estimated starts as upcoming milestones.
- [x] Retain 77 organizations' paper/video research resources, distinguish 23 specific YouTube videos from generic channels, and avoid promoting undated videos to canonical demos.
- [x] Add 152 limited project records where no stronger paper, trial, milestone, or dated demo qualified, keeping the uncorroborated Implex historical lead at E0 so all 352 render activity without invented accomplishments.
- [x] Publish the complete organization-by-organization audit and add deterministic full-cohort validation.
- [x] Run full CI, regenerate the 1,064-node map payload, and browser-test representative European company, academic, paper, trial, milestone, and E0 fallback-project pages plus the European map region on port 3210 with no console errors.

## Complete U.S. Organization Evidence Audit

- [x] Reconcile all 215 U.S.-headquartered catalog organizations: 136 companies and 79 academic or institutional programs.
- [x] Measure pre-audit canonical activity coverage: 73 organizations covered and 142 without rendered activity.
- [x] Add 85 qualifying papers and 54 exact-sponsor ClinicalTrials.gov records, using PubMed affiliation-filtered records for the remaining 25 academic-paper gaps.
- [x] Add 30 dated trial checkpoints and 62 limited project records so all 215 organizations render activity without treating registration, affiliation, or first-party product copy as a positive outcome.
- [x] Retain relevant paper and video resources, distinguish 36 specific video resources from generic channels, and avoid promoting undated videos to demonstrations.
- [x] Publish complete organization and source-link audits, integrate deterministic validation into CI, and preserve the original top-100 milestone baseline.
- [x] Run full CI, regenerate the 1,064-node map payload, and browser-test representative U.S. company, academic, paper, trial, milestone, fallback-project, and U.S. map views on port 3211 with no console errors.

## Top 200 Company Deep-Research Layer

- [x] Preserve the curated top-100 cohort and select ranks 101-200 with a documented evidence, activity, readiness, maturity, and source-depth score.
- [x] Research all 200 companies against official sites, ClinicalTrials.gov, and PubMed, keeping the network cache outside deterministic CI.
- [x] Reject fuzzy sponsor and publication matches; require exact normalized lead-sponsor identity and article-level company-affiliation text for new PubMed papers.
- [x] Add 984 claim-level dossier entries: mission and goal context for 200/200, accomplishments for 130, milestones for 152, newly affiliation-verified and title-relevant papers for 40, and interview/talk context for 53.
- [x] Add 544 source URLs not present in the pre-audit dataset across 178 companies, with per-item evidence levels, source links, and explicit claim boundaries.
- [x] Render the dossiers on company pages, add the `/research/top-200` cohort page, publish the 200-row audit, and enforce coverage with deterministic validation.
- [x] Run the full CI gate and verify the served cohort page plus representative invasive, paper-rich, ambiguous-name, and sparse-evidence company dossiers return complete HTML on isolated port 3212.
- [ ] Repeat visual viewport and console verification when the in-app browser runtime can initialize; the current runtime was blocked before attachment by a Windows profile-path permission error.
