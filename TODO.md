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
