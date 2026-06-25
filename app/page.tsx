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
        eyebrow="NextBCI tracker"
        title="Follow BCI evidence without the fog."
        description="A static-first board for trials, implants, demos, papers, regulatory moves, and the next checkpoints worth watching."
      />
      <SampleNotice />

      <section className="home-intro-grid">
        <article className="data-card home-start-card">
          <div className="data-card-inner">
            <p className="eyebrow">Start here</p>
            <h2 className="text-3xl font-black">What changed, what is next, and how strong is the evidence?</h2>
            <p className="muted-copy">
              NextBCI reads like a launch tracker for neurotechnology: upcoming checkpoints first, previous evidence
              behind it, and every claim tied back to a source.
            </p>
            <div className="home-action-row">
              <Link className="primary-source-button" href="/milestones">
                Browse milestones
              </Link>
              <Link className="details-button" href="/companies">
                View programs
              </Link>
              <Link className="details-button" href="/demos">
                Watch demos
              </Link>
            </div>
          </div>
        </article>

        <aside className="data-card dark-panel">
          <div className="data-card-inner">
            <p className="eyebrow">Tracker state</p>
            <div className="metric-strip">
              <div className="metric">
                <b>{companies.length}</b>
                <span>sourced programs</span>
              </div>
              <div className="metric">
                <b>{confirmedMilestones.length}</b>
                <span>confirmed milestones</span>
              </div>
              <div className="metric">
                <b>{trials.length}</b>
                <span>registered trials</span>
              </div>
              <div className="metric">
                <b>{demos.length}</b>
                <span>sourced demos</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

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

        <aside className="data-card">
          <div className="data-card-inner">
            <p className="eyebrow">How to read a card</p>
            <div className="guide-list">
              <div>
                <b>Evidence level</b>
                <span>How strong the public evidence is, from announcement to approved use.</span>
              </div>
              <div>
                <b>Hype check</b>
                <span>What the milestone does not prove yet.</span>
              </div>
              <div>
                <b>Sources</b>
                <span>Registry, paper, company, regulatory, or demo links attached to the claim.</span>
              </div>
            </div>
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
