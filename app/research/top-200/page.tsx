import Link from "next/link";
import { topCompanyDeepResearchProfiles } from "@/data/top-company-deep-research";

const sectionOrder = ["mission", "goal", "accomplishment", "milestone", "paper", "interview"] as const;

export default function TopCompanyResearchPage() {
  const entryCount = topCompanyDeepResearchProfiles.reduce((sum, profile) => sum + profile.items.length, 0);
  const newSourceCount = topCompanyDeepResearchProfiles.reduce((sum, profile) => sum + profile.sourceAudit.newSources, 0);
  const primarySourceCount = topCompanyDeepResearchProfiles.reduce((sum, profile) => sum + profile.sourceAudit.primarySources, 0);
  const coverage = sectionOrder.map((section) => ({
    section,
    count: topCompanyDeepResearchProfiles.filter((profile) => profile.sourceAudit.sectionsCovered.includes(section)).length
  }));

  return (
    <div className="page-shell page-stack">
      <section className="page-hero compact-hero">
        <p className="eyebrow">Evidence audit · researched 2026-08-06</p>
        <h1>Top 200 company research</h1>
        <p className="muted-copy">
          Claim-level dossiers covering organizational mission, concrete goals, accomplishments, tracker milestones,
          affiliation-verified papers, and interviews or talks. Every entry carries a source and an explicit evidence boundary.
        </p>
        <div className="stat-strip stat-strip-auto">
          <div className="stat"><b>200</b><span>companies</span></div>
          <div className="stat"><b>{entryCount}</b><span>research entries</span></div>
          <div className="stat"><b>{newSourceCount}</b><span>new source links</span></div>
          <div className="stat"><b>{primarySourceCount}</b><span>primary sources</span></div>
        </div>
      </section>

      <section className="two-col">
        <div className="panel panel-pad">
          <p className="eyebrow" style={{ marginBottom: 10 }}>Selection method</p>
          <p className="muted-copy">
            Ranks 1-100 preserve the prior curated prominence cohort. Ranks 101-200 use a reproducible score across the
            remaining commercial catalog: evidence level, readiness, maturity, milestones, trials, papers, demos,
            projects, and source depth. This is a research-priority cohort, not a valuation ranking.
          </p>
        </div>
        <div className="panel panel-pad">
          <p className="eyebrow" style={{ marginBottom: 10 }}>Research safeguards</p>
          <p className="hype">
            Company statements stay E1. Trial registration is not a positive result. PubMed papers are admitted only
            after the article affiliation text matches the company identity. Interviews document statements rather
            than corroborating them. Missing evidence is reported as not verified, never as proof of absence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Section coverage</p>
            <h2>What the source pass established</h2>
          </div>
        </div>
        <div className="stat-strip stat-strip-auto">
          {coverage.map(({ section, count }) => (
            <div className="stat" key={section}><b>{count}</b><span>{section}</span></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Ranked cohort</p>
            <h2>Company-by-company dossiers</h2>
          </div>
          <span className="badge type-badge">{topCompanyDeepResearchProfiles.length} audited</span>
        </div>
        <div className="card-grid">
          {topCompanyDeepResearchProfiles.map((profile) => (
            <Link className="tile" href={`/companies/${profile.companySlug}#deep-research`} key={profile.companySlug}>
              <div className="meta-row">
                <span className="badge type-badge">Rank {profile.rank}</span>
                <span className="badge type-badge">{profile.items.length} entries</span>
                <span className="badge status-upcoming">{profile.sourceAudit.newSources} new</span>
              </div>
              <h3 style={{ fontSize: "1.05rem" }}>{profile.companyName}</h3>
              <p className="muted-copy" style={{ fontSize: 13 }}>{profile.researchSummary}</p>
              <div className="meta-row">
                {profile.sourceAudit.sectionsCovered.map((section) => (
                  <span className="badge type-badge" key={section}>{section}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
