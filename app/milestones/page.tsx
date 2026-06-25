import { MilestoneCard } from "@/components/MilestoneCard";
import { PageHeader } from "@/components/PageHeader";
import { SampleNotice } from "@/components/SampleNotice";
import { allMilestones } from "@/data/queries";
import { evidenceLevels, milestoneTypeLabels } from "@/data/schema";

export default function MilestonesPage() {
  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow="Milestone archive"
        title="BCI evidence events"
        description="A reviewable archive of trials, implants, demos, papers, regulatory moves, safety updates, and upcoming checkpoints."
      />
      <SampleNotice />
      <section className="data-card">
        <div className="data-card-inner">
          <p className="eyebrow">Static filters for MVP</p>
          <div className="meta-row">
            {Object.values(milestoneTypeLabels).slice(0, 8).map((label) => (
              <span className="nav-link border-stone-300 bg-white" key={label}>{label}</span>
            ))}
          </div>
          <p className="muted-copy text-sm">
            These are non-interactive filter chips for now. The data model already supports evidence level, milestone
            type, status, confidence, company, and date filtering in a later loop.
          </p>
        </div>
      </section>
      <section className="card-grid">
        {allMilestones.map((milestone) => (
          <MilestoneCard milestone={milestone} key={milestone.id} />
        ))}
      </section>
      <section className="section">
        <div>
          <p className="eyebrow">Evidence key</p>
          <h2 className="text-3xl font-black">Badge meanings</h2>
        </div>
        <div className="card-grid">
          {Object.entries(evidenceLevels).map(([level, definition]) => (
            <article className="data-card" key={level}>
              <div className="data-card-inner">
                <h3 className="text-lg font-black">{level} / {definition.shortLabel}</h3>
                <p className="muted-copy text-sm">{definition.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
