import Link from "next/link";
import { EvidenceBadge } from "@/components/Badge";
import { LaunchCard } from "@/components/LaunchCard";
import { Signal } from "@/components/Signal";
import { WorldMap } from "@/components/WorldMap";
import {
  companies,
  confirmedMilestones,
  demos,
  mapNodes,
  trials,
  upcomingMilestones
} from "@/data/queries";
import { evidenceLevels } from "@/data/schema";

export default function HomePage() {
  const nextUp = upcomingMilestones.slice(0, 5);
  const recent = confirmedMilestones.slice(0, 3);

  const stats = [
    { value: companies.length, label: "programs tracked" },
    { value: upcomingMilestones.length, label: "upcoming checkpoints" },
    { value: trials.length, label: "registered trials" },
    { value: demos.length, label: "sourced demos" }
  ];

  return (
    <div className="page-shell page-stack">
      {/* Hero */}
      <section className="hero">
        <div className="hero-waves">
          <Signal seed="nextbci-hero-2026" className="signal" />
        </div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">The brain-computer interface launch tracker</p>
            <h1>Watch the neural frontier, checkpoint by checkpoint.</h1>
            <p className="lede">
              NextBCI tracks the implants, trials, demos, and papers moving brain-computer interfaces forward — with a
              countdown to what&apos;s next and a live world map of who&apos;s pushing hardest.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="/map">
                Explore the map
              </Link>
              <Link className="btn btn-ghost" href="/milestones">
                Browse milestones
              </Link>
            </div>
          </div>
          <div className="stat-strip" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming feed */}
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Next milestones</p>
            <h2>Counting down to the next checkpoints</h2>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/milestones">
            Full archive →
          </Link>
        </div>
        <div className="launch-feed">
          {nextUp.map((milestone) => (
            <LaunchCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      {/* Map preview */}
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Global activity</p>
            <h2>Where BCIs are being built</h2>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/map">
            Open full map →
          </Link>
        </div>
        <WorldMap nodes={mapNodes} compact />
        <p className="muted-copy" style={{ fontSize: 13 }}>
          Redder nodes mark the most active clinical and research programs. Open the full map to select any node.
        </p>
      </section>

      {/* Recent confirmed */}
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Recently confirmed</p>
            <h2>Evidence that just changed</h2>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/milestones">
            See all →
          </Link>
        </div>
        <div className="launch-feed">
          {recent.map((milestone) => (
            <LaunchCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </section>

      {/* Evidence legend */}
      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">How to read the evidence</p>
            <h2>From rumor to approved use</h2>
          </div>
        </div>
        <div className="card-grid">
          {Object.entries(evidenceLevels).map(([level, def]) => (
            <div className="tile" key={level}>
              <EvidenceBadge level={level as keyof typeof evidenceLevels} />
              <h3>{def.label}</h3>
              <p className="muted-copy" style={{ fontSize: 13.5 }}>
                {def.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
