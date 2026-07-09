import type { Metadata } from "next";
import { LaunchCard } from "@/components/LaunchCard";
import { confirmedMilestones, upcomingMilestones } from "@/data/queries";

export const metadata: Metadata = {
  title: "Activity · NextBCI",
  description: "Upcoming and confirmed brain-computer interface milestones, every one tied to a source."
};

export default function MilestonesPage() {
  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Activity</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>Evidence activity, in time order</h1>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 14 }}>
          Scheduled checkpoints stay separate from confirmed evidence. Open any entry for the source, context, and
          limits of the reported result.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Upcoming</p>
            <h2>Scheduled checkpoints</h2>
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
    </div>
  );
}
