import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoClassificationBadge, EvidenceBadge, SampleBadge, StatusChip } from "@/components/Badge";
import { Signal } from "@/components/Signal";
import { SourceList } from "@/components/SourceList";
import { VideoCard } from "@/components/VideoCard";
import {
  categoryLabel,
  companies,
  getCompany,
  getCompanyDemos,
  getCompanyMilestones,
  getCompanyPapers,
  getCompanyStats,
  getCompanyTrials,
  heatColor,
  heatLabel,
  regionLabel
} from "@/data/queries";
import type { Milestone } from "@/data/schema";

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

function Timeline({ items, color }: { items: Milestone[]; color: string }) {
  return (
    <div className="timeline">
      {items.map((milestone, i) => (
        <div className="tl-item" key={milestone.id}>
          <div className="tl-rail">
            <span className="tl-node" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
            {i < items.length - 1 ? <span className="tl-line" /> : null}
          </div>
          <div className="tl-body">
            <span className="tl-date">{milestone.dateLabel}</span>
            <div className="meta-row">
              <StatusChip status={milestone.status} />
              <EvidenceBadge level={milestone.evidenceLevel} />
            </div>
            <Link className="launch-title" style={{ fontSize: "1.05rem" }} href={`/milestones/${milestone.id}`}>
              {milestone.title}
            </Link>
            <p className="muted-copy" style={{ fontSize: 13 }}>{milestone.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const milestones = getCompanyMilestones(company.slug);
  const upcoming = milestones.filter((m) => m.status === "upcoming");
  const history = milestones.filter((m) => m.status === "confirmed");
  const trials = getCompanyTrials(company.slug);
  const demos = getCompanyDemos(company.slug);
  const papers = getCompanyPapers(company.slug);
  const stats = getCompanyStats(company.slug);
  const color = heatColor(stats.heat);

  return (
    <div className="page-shell page-stack">
      <Link className="btn btn-ghost btn-sm" href="/companies" style={{ alignSelf: "flex-start" }}>
        ← All programs
      </Link>

      <section className="detail-hero">
        <div className="detail-banner">
          <Signal seed={company.slug} />
          <div className="z" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="meta-row">
              <span className="badge type-badge">{company.kind === "academic" ? "Academic" : "Company"}</span>
              <span className="badge type-badge">{categoryLabel(company.category)}</span>
              <EvidenceBadge level={company.evidenceLevel} />
              <span className="badge ev" style={{ color, borderColor: color }}>
                {heatLabel(stats.heat)}
              </span>
              {company.isSample ? <SampleBadge /> : null}
            </div>
            <h1>{company.name}</h1>
            <p className="muted-copy" style={{ fontWeight: 600 }}>
              {company.hq.city}, {company.hq.country}
            </p>
          </div>
        </div>
        <div className="detail-body">
          <p className="muted-copy">{company.summary}</p>
          <div className="stat-strip">
            <div className="stat">
              <b>{stats.milestones}</b>
              <span>milestones</span>
            </div>
            <div className="stat">
              <b>{stats.trials}</b>
              <span>trials</span>
            </div>
            <div className="stat">
              <b>{stats.demos}</b>
              <span>demos</span>
            </div>
            <div className="stat">
              <b>{stats.papers}</b>
              <span>papers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="two-col">
        <div className="panel panel-pad">
          <p className="eyebrow" style={{ marginBottom: 12 }}>Program profile</p>
          <dl className="kv">
            <dt>Approach</dt>
            <dd>{categoryLabel(company.category)}</dd>
            <dt>Modality</dt>
            <dd>{company.modality}</dd>
            <dt>Target function</dt>
            <dd>{company.targetFunction}</dd>
            <dt>Stage</dt>
            <dd>{company.stage}</dd>
            <dt>Home base</dt>
            <dd>
              {company.hq.city}, {company.hq.country} ({regionLabel(company.region)})
            </dd>
            {company.founded ? (
              <>
                <dt>Founded</dt>
                <dd>{company.founded}</dd>
              </>
            ) : null}
            {company.funding ? (
              <>
                <dt>Funding</dt>
                <dd>{company.funding}</dd>
              </>
            ) : null}
            {company.website ? (
              <>
                <dt>Website</dt>
                <dd>
                  <a href={company.website} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                    {company.website.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </>
            ) : null}
          </dl>
          <p className="hype" style={{ marginTop: 16 }}>{company.hypeCheck}</p>
        </div>
        <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Primary sources</p>
            <SourceList sources={company.sourceLinks} />
          </div>
          {company.interviewVideo ? (
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Watch</p>
              <VideoCard video={company.interviewVideo} />
            </div>
          ) : null}
        </div>
      </section>

      {upcoming.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h2>What&apos;s next for this program</h2>
            </div>
            <span className="badge type-badge">{upcoming.length} scheduled</span>
          </div>
          <Timeline items={upcoming} color={color} />
        </section>
      ) : null}

      {history.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Accomplishments</p>
              <h2>Milestone history</h2>
            </div>
            <span className="badge type-badge">{history.length} logged</span>
          </div>
          <Timeline items={history} color={color} />
        </section>
      ) : null}

      {trials.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Trials</p>
              <h2>Registered studies</h2>
            </div>
          </div>
          <div className="card-grid">
            {trials.map((trial) => (
              <div className="tile" key={trial.id}>
                <EvidenceBadge level={trial.evidenceLevel} />
                <h3 style={{ fontSize: "1.05rem" }}>{trial.title}</h3>
                <p className="muted-copy" style={{ fontSize: 13 }}>
                  {trial.status} · {trial.condition}
                </p>
                <p className="muted-copy" style={{ fontSize: 13 }}>{trial.targetFunction}</p>
                <div className="tile-foot">
                  <SourceList sources={trial.sourceLinks} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {demos.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Demos</p>
              <h2>Capability clips &amp; talks</h2>
            </div>
          </div>
          <div className="card-grid">
            {demos.map((demo) => (
              <div className="tile" key={demo.id}>
                <div className="meta-row">
                  <DemoClassificationBadge classification={demo.classification} />
                  <EvidenceBadge level={demo.evidenceLevel} />
                </div>
                <span className="tl-date">{demo.dateLabel}</span>
                <h3 style={{ fontSize: "1.05rem" }}>{demo.title}</h3>
                <p className="muted-copy" style={{ fontSize: 13 }}>{demo.summary}</p>
                <div className="tile-foot">
                  <SourceList sources={demo.sourceLinks} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {papers.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Papers</p>
              <h2>Published evidence</h2>
            </div>
          </div>
          <div className="card-grid">
            {papers.map((paper) => (
              <div className="tile" key={paper.id}>
                <EvidenceBadge level={paper.evidenceLevel} />
                <span className="tl-date">{paper.dateLabel}</span>
                <h3 style={{ fontSize: "1.05rem" }}>{paper.title}</h3>
                <p className="muted-copy" style={{ fontSize: 13 }}>{paper.summary}</p>
                <div className="tile-foot">
                  <SourceList sources={paper.sourceLinks} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
