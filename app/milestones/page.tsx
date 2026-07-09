import type { Metadata } from "next";
import { LaunchCard } from "@/components/LaunchCard";
import { confirmedMilestones, upcomingMilestones } from "@/data/queries";
import { evidenceLevels } from "@/data/schema";

export const metadata: Metadata = {
  title: "Milestones · NextBCI",
  description: "Upcoming and confirmed brain-computer interface milestones, every one tied to a primary source."
};

export default function MilestonesPage() {
  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Milestone archive</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>Every BCI checkpoint worth watching</h1>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 14 }}>
          Trials, implants, demos, papers, regulatory moves, and safety updates — upcoming checkpoints counting down,
          confirmed events archived behind them.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Upcoming</p>
            <h2>Counting down</h2>
          </div>
          <span className="badge type-badge">{upcomingMilestones.length} scheduled</span>
        </div>
        <div className="launch-feed">
          {upcomingMilestones.map((milestone) => (
            <LaunchCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Confirmed</p>
            <h2>Logged evidence</h2>
          </div>
          <span className="badge type-badge">{confirmedMilestones.length} events</span>
        </div>
        <div className="launch-feed">
          {confirmedMilestones.map((milestone) => (
            <LaunchCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Evidence key</p>
            <h2>What the badges mean</h2>
          </div>
        </div>
        <div className="card-grid">
          {Object.entries(evidenceLevels).map(([level, def]) => (
            <div className="tile" key={level}>
              <h3 style={{ fontSize: "1rem" }}>
                {level} · {def.shortLabel}
              </h3>
              <p className="muted-copy" style={{ fontSize: 13 }}>
                {def.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
