import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/Badge";
import { SourceList } from "@/components/SourceList";
import { getCompanyName, trials } from "@/data/queries";

export const metadata: Metadata = {
  title: "Trials · NextBCI",
  description: "Registered and translational brain-computer interface trials with condition, device, locations, and endpoints."
};

export default function TrialsPage() {
  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Trial tracker</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>Clinical &amp; translational trials</h1>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 14 }}>
          Status, condition, target function, device, locations, and endpoints for tracked BCI studies — each linked
          to its registry entry.
        </p>
      </section>

      <section className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}>
        {trials.map((trial) => (
          <div className="tile" key={trial.id}>
            <div className="meta-row" style={{ justifyContent: "space-between" }}>
              <EvidenceBadge level={trial.evidenceLevel} />
              <span className="badge type-badge">{trial.status}</span>
            </div>
            <Link className="launch-title" style={{ fontSize: "1.1rem" }} href={`/companies/${trial.companySlug}`}>
              {getCompanyName(trial.companySlug)}
            </Link>
            <p className="muted-copy" style={{ fontSize: 13.5 }}>{trial.title}</p>
            <dl className="kv" style={{ gridTemplateColumns: "108px 1fr" }}>
              <dt>Condition</dt>
              <dd>{trial.condition}</dd>
              <dt>Target</dt>
              <dd>{trial.targetFunction}</dd>
              <dt>Device</dt>
              <dd>{trial.deviceProduct}</dd>
              <dt>Locations</dt>
              <dd>{trial.locations.join(" · ")}</dd>
            </dl>
            <div>
              <p className="eyebrow" style={{ fontSize: 10.5, marginBottom: 6 }}>Endpoints</p>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
                {trial.endpoints.map((endpoint) => (
                  <li key={endpoint}>{endpoint}</li>
                ))}
              </ul>
            </div>
            <div className="tile-foot">
              <SourceList sources={trial.sourceLinks} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
