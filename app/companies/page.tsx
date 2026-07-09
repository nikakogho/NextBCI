import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/Badge";
import { companiesByActivity, getCompanyStats, heatColor, heatLabel } from "@/data/queries";

export const metadata: Metadata = {
  title: "Programs · NextBCI",
  description: "Companies and academic labs building brain-computer interfaces, ranked by current activity."
};

export default function CompaniesPage() {
  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Programs & labs</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>Who is building the neural frontier</h1>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 14 }}>
          Companies and academic programs with a real, sourced BCI evidence surface — ordered by how active each one
          is right now.
        </p>
      </section>

      <section className="card-grid">
        {companiesByActivity.map((company) => {
          const stats = getCompanyStats(company.slug);
          const color = heatColor(stats.heat);
          return (
            <Link className="tile" href={`/companies/${company.slug}`} key={company.slug}>
              <div className="meta-row" style={{ justifyContent: "space-between" }}>
                <span className="meta-row" style={{ gap: 8 }}>
                  <span
                    className="dot"
                    style={{ color, background: color, width: 9, height: 9 }}
                    aria-hidden="true"
                  />
                  <span className="badge type-badge">{company.kind === "academic" ? "Academic" : "Company"}</span>
                </span>
                <span className="badge ev" style={{ color, borderColor: color }}>
                  {heatLabel(stats.heat)}
                </span>
              </div>
              <h3>{company.name}</h3>
              <p className="muted-copy" style={{ fontSize: 12.5 }}>
                {company.hq.city}, {company.hq.country}
              </p>
              <p className="muted-copy" style={{ fontSize: 13.5 }}>{company.stage}</p>
              <div className="tile-foot">
                <EvidenceBadge level={company.evidenceLevel} />
                <span style={{ flex: 1 }} />
                <span className="mono" style={{ fontSize: 11.5, color: "var(--faint)" }}>
                  {stats.milestones}M · {stats.trials}T · {stats.demos}D · {stats.papers}P
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
