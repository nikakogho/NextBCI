# UX Simplification Audit

Reviewed 2026-07-10 after the university-research and structured-discovery expansion.

## Navigation

- **Before:** `Programs` and `Search` were separate top-level destinations despite overlapping first tasks.
- **Applied:** both are replaced in navigation by `Explore`. `/companies` and `/search` redirect to `/explore` so existing links continue to work. The primary navigation now contains Home, Explore, Map, Activity, Trials, and Demos. The dedicated Neuralink page remains available from its organization profile without occupying permanent navigation space.

## Home

- **Keep:** the next-checkpoint panel and activity feed answer the highest-value question immediately.
- **Applied:** coverage now calls out university research programs and uses the neutral term "organizations" rather than treating research programs as companies.
- **Avoid:** adding another full search surface to the home page; Explore is the single discovery surface.

## Explore

- **Before:** the directory offered only text, invasiveness, and region; global search repeated the same entry point with a different result set.
- **Applied:** one exploration surface filters by organization type, invasiveness, region, device class, organization profile, readiness, and text. Card metadata is compact and directly states whether the record is a company or university research program.

## Map

- **Before:** companies and academic programs differed only by a small text badge after selection.
- **Applied:** companies use round pins, university research uses diamond pins, the map has a company/university filter, popups name the organization type, and the directory uses "organizations" consistently.

## Activity

- **Before:** the milestone archive repeated the full evidence key already present on the home page.
- **Applied:** Activity now contains only scheduled checkpoints and confirmed evidence. Detail pages retain the explanation and source context where it matters.

## Organization Detail

- **Before:** academic programs and companies had the same profile framing, with no normalized way to see device class or translation state.
- **Applied:** the profile panel shows organization type, organization profile, readiness, and device classes before the free-form modality/stage description. University project tracks use clear research-only limits instead of implying commercial readiness.

## Trials and Demos

- **Before:** every card embedded a full source list, making the archive difficult to scan.
- **Applied:** cards retain the essential classification, result summary, and one direct source action. Full evidence context remains available through the linked organization and source.

## Remaining Principle

The tracker should expand data density before UI density. New dimensions belong in structured filters and detail metadata; they should not become new top-level pages unless they answer a genuinely distinct recurring task.
