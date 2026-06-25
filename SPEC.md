# NextBCI MVP Specification

## Product

NextBCI tracks evidence of real brain-computer interface progress. It is not a broad neurotech startup map. The product answers:

- What changed recently?
- What is coming next?
- What evidence exists?
- What is still hype?

## Scope

The MVP tracks serious clinical, implantable, and translational BCI progress only. It excludes broad wellness neurotech, marketing-only startup lists, ads, analytics, scraping, auth, paywalls, and external services.

## Evidence Levels

- E0: rumor / unverified claim
- E1: company announcement
- E2: public demo
- E3: registered clinical trial
- E4: peer-reviewed human result
- E5: replicated / multi-patient / long-duration result
- E6: approved commercial medical use

Evidence levels should be conservative. A demo can show that a task happened without proving general clinical benefit. A trial can show public protocol commitment without proving efficacy. A designation is not approval.

## Milestone Types

- trial opened
- trial site added
- first implant
- additional implant
- demo released
- paper published
- regulatory designation
- funding round
- product update
- conference talk
- endpoint readout
- adverse event / safety update
- approval / clearance
- commercial deployment

## Data Model

Static TypeScript data is the source of truth for the MVP.

- `Company`: name, modality, target function, stage, evidence level, summary, hype check, sources
- `Milestone`: date or window, program, type, evidence level, confidence, summary, why it matters, hype check, sources
- `Trial`: status, condition, target function, device or product, locations, endpoints, sources
- `Demo`: date, program, classification, setting, evidence level, summary, hype check, sources
- `Paper`: date, program, evidence level, summary, sources
- `SourceLink`: title, URL, publisher, source type, primary flag, sample flag

## Pages

- Home: next major milestone, latest confirmed milestones, upcoming milestones, evidence level explainer
- Companies: list of tracked companies and labs with modality, target function, stage, evidence level
- Company detail: summary, milestone timeline, related trials, demos, papers, and sources
- Milestones: archive of milestone cards with static filter chips for now
- Trials: table of status, condition, target function, device or product, locations, endpoints, sources
- Demos: video/demo library classified by demonstrated context

## Data Policy

This foundation ships with sourced seed data only. Real records must include source links. Prefer primary sources: trial registries, papers, company updates, regulatory pages, and conference pages. If fictional placeholders are reintroduced for UI testing, they must be clearly marked with `isSample: true`.
