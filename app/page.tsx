import Link from "next/link";
import { EvidenceBadge } from "@/components/Badge";
import { MilestoneCard } from "@/components/MilestoneCard";
import { PageHeader } from "@/components/PageHeader";
import { SampleNotice } from "@/components/SampleNotice";
import {
  companies,
  confirmedMilestones,
  demos,
  nextMajorMilestone,
  trials,
  upcomingMilestones
} from "@/data/queries";
import { evidenceLevels } from "@/data/schema";

export default function HomePage() {
  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow="NextBCI MVP"
        title="Serious BCI progress, separated from the noise."
        description="A static-first tracker for trials, implants, demos, papers, regulatory moves, and upcoming evidence checkpoints."
      />
      <SampleNotice />

      <section className="tracker-grid">
        <div className="section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Next major milestone</p>
              <h2>What to watch next</h2>
            </div>
            <Link className="nav-link border-stone-300 bg-white" href="/milestones">
              Full archive
            </Link>
          </div>
          {nextMajorMilestone ? <MilestoneCard milestone={nextMajorMilestone} /> : null}
        </div>

        <aside className="data-card dark-panel">
          <div className="data-card-inner">
            <p className="eyebrow text-teal-200">Tracker state</p>
            <div className="metric-strip">
              <div className="metric bg-white/10">
                <b>{companies.length}</b>
                <span>sample programs</span>
              </div>
              <div className="metric bg-white/10">
                <b>{confirmedMilestones.length}</b>
                <span>confirmed sample milestones</span>
              </div>
              <div className="metric bg-white/10">
                <b>{trials.length}</b>
                <span>sample trials</span>
              </div>
              <div className="metric bg-white/10">
                <b>{demos.length}</b>
                <span>sample demos</span>
              </div>
            </div>
            <p className="text-sm leading-6 text-stone-200">
              The MVP proves the tracker workflow with version-controlled data and evidence labels. Real records should
              be added only with source links.
            </p>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Latest confirmed milestones</p>
            <h2>Recent evidence changes</h2>
          </div>
          <Link className="nav-link border-stone-300 bg-white" href="/milestones">
            Browse milestones
          </Link>
        </div>
        <div className="card-grid">
          {confirmedMilestones.slice(0, 3).map((milestone) => (
            <MilestoneCard compact key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Upcoming milestones</p>
            <h2>Expected checkpoints</h2>
          </div>
        </div>
        <div className="card-grid">
          {upcomingMilestones.map((milestone) => (
            <MilestoneCard compact key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      <section className="section">
        <div>
          <p className="eyebrow">Evidence levels</p>
          <h2 className="text-3xl font-black">From rumor to approved use</h2>
        </div>
        <div className="card-grid">
          {Object.entries(evidenceLevels).map(([level, definition]) => (
            <article className="data-card" key={level}>
              <div className="data-card-inner">
                <EvidenceBadge level={level as keyof typeof evidenceLevels} />
                <h3 className="text-lg font-black">{definition.label}</h3>
                <p className="muted-copy text-sm">{definition.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
