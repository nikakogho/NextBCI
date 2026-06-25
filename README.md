# NextBCI

NextBCI is a sober, evidence-first tracker for serious brain-computer interface progress. It focuses on milestones such as trials, implants, demos, papers, regulatory moves, events, and evidence.

This repository currently contains a static-first MVP foundation. The records in the app are fictional sample data and placeholder source links. Do not treat them as factual BCI claims.

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
npm run lint
npm run typecheck
npm run build
```

## Add data

Data lives in `data/sample-data.ts`, with shared types in `data/schema.ts`.

When replacing sample data with real records:

1. Use primary sources where possible: trial registries, papers, company updates, regulatory pages, or conference pages.
2. Keep the evidence level conservative.
3. Separate demonstrated capability from interpretation.
4. Include source links for every real milestone, trial, demo, paper, and company claim.
5. Remove `isSample: true` only when the record is sourced and ready for review.

## Pages

- `/` home dashboard
- `/companies` tracked companies and labs
- `/companies/[slug]` company detail, timeline, trials, demos, and papers
- `/milestones` milestone archive
- `/trials` trial tracker
- `/demos` demo library
