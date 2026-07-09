import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfidenceBadge, EvidenceBadge, MilestoneTypeBadge, SampleBadge, StatusChip } from "@/components/Badge";
import { Countdown, TMinus } from "@/components/Countdown";
import { Signal } from "@/components/Signal";
import { SourceList } from "@/components/SourceList";
import { allMilestones, getCompany, getCompanyName, getMilestone, getPrimarySource, getYoutubeSource } from "@/data/queries";

export function generateStaticParams() {
  return allMilestones.map((milestone) => ({ id: milestone.id }));
}

export default async function MilestoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const milestone = getMilestone(id);
  if (!milestone) notFound();

  const company = getCompany(milestone.companySlug);
  const primary = getPrimarySource(milestone.sourceLinks);
  const youtube = getYoutubeSource(milestone.sourceLinks);
  const upcoming = milestone.status === "upcoming";

  return (
    <div className="page-shell page-stack">
      <Link className="btn btn-ghost btn-sm" href="/milestones" style={{ alignSelf: "flex-start" }}>
        ← All milestones
      </Link>

      <section className="detail-hero">
        <div className="detail-banner">
          <Signal seed={milestone.id} />
          <div className="z" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="meta-row">
              <StatusChip status={milestone.status} />
              <span className="badge type-badge mono">{milestone.dateLabel}</span>
            </div>
            <h1>{milestone.title}</h1>
            <p className="muted-copy" style={{ fontWeight: 600 }}>{getCompanyName(milestone.companySlug)}</p>
          </div>
        </div>
        <div className="detail-body">
          <div className="meta-row">
            <MilestoneTypeBadge type={milestone.type} />
            <EvidenceBadge level={milestone.evidenceLevel} />
            <ConfidenceBadge confidence={milestone.confidence} />
            {milestone.isSample ? <SampleBadge /> : null}
          </div>
          {upcoming ? <Countdown sortDate={milestone.sortDate} /> : <TMinus sortDate={milestone.sortDate} />}
          <p className="muted-copy">{milestone.summary}</p>
          <div className="meta-row">
            {primary ? (
              <a className="btn btn-primary btn-sm" href={primary.url} target="_blank" rel="noreferrer">
                Open primary source
              </a>
            ) : null}
            {youtube ? (
              <a className="btn btn-ghost btn-sm" href={youtube.url} target="_blank" rel="noreferrer">
                Watch demo
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="two-col">
        <div className="panel panel-pad">
          <p className="eyebrow">Why it matters</p>
          <p className="muted-copy" style={{ marginTop: 10 }}>{milestone.whyItMatters}</p>
        </div>
        <div className="panel panel-pad">
          <p className="eyebrow">Hype check</p>
          <p className="hype" style={{ marginTop: 10 }}>{milestone.hypeCheck}</p>
        </div>
      </section>

      <section className="two-col">
        <div className="panel panel-pad">
          <p className="eyebrow" style={{ marginBottom: 12 }}>Source surface</p>
          <SourceList sources={milestone.sourceLinks} />
        </div>
        <div className="panel panel-pad">
          <p className="eyebrow" style={{ marginBottom: 12 }}>Program</p>
          {company ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 style={{ fontSize: "1.1rem" }}>{company.name}</h3>
              <p className="muted-copy" style={{ fontSize: 13.5 }}>{company.summary}</p>
              <Link className="btn btn-ghost btn-sm" href={`/companies/${company.slug}`} style={{ alignSelf: "flex-start" }}>
                View program →
              </Link>
            </div>
          ) : (
            <p className="muted-copy">No program profile attached.</p>
          )}
        </div>
      </section>
    </div>
  );
}
