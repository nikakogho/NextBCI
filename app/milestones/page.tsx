import { MilestoneBoard } from "@/components/MilestoneBoard";
import { PageHeader } from "@/components/PageHeader";
import { SampleNotice } from "@/components/SampleNotice";
import { confirmedMilestones, upcomingMilestones } from "@/data/queries";
import { evidenceLevels } from "@/data/schema";

export default function MilestonesPage() {
  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow="Milestone archive"
        title="BCI evidence events"
        description="A reviewable archive of trials, implants, demos, papers, regulatory moves, safety updates, and upcoming checkpoints."
      />
      <SampleNotice />
      <MilestoneBoard previousMilestones={confirmedMilestones} upcomingMilestones={upcomingMilestones} />
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
