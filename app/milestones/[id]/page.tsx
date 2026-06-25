import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfidenceBadge, EvidenceBadge, MilestoneTypeBadge, SampleBadge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { SourceLinks } from "@/components/SourceLinks";
import { getPrimarySource, getYoutubeSource, PrimarySourceButton, WatchButton } from "@/components/SourceActions";
import { allMilestones, getCompany, getCompanyName, getMilestone } from "@/data/queries";

export function generateStaticParams() {
  return allMilestones.map((milestone) => ({ id: milestone.id }));
}

export default async function MilestoneDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const milestone = getMilestone(id);

  if (!milestone) {
    notFound();
  }

  const company = getCompany(milestone.companySlug);
  const primarySource = getPrimarySource(milestone.sourceLinks);
  const youtubeSource = getYoutubeSource(milestone.sourceLinks);

  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow={`${milestone.status} milestone`}
        title={milestone.title}
        description={`${milestone.dateLabel} / ${getCompanyName(milestone.companySlug)}`}
      />

      <section className="detail-hero">
        <div className="detail-hero-media">
          <div className="mission-date-chip">{milestone.dateLabel}</div>
          <div className="detail-hero-title">
            <div className="meta-row">
              <MilestoneTypeBadge type={milestone.type} />
              <EvidenceBadge level={milestone.evidenceLevel} />
              <ConfidenceBadge confidence={milestone.confidence} />
              {milestone.isSample ? <SampleBadge /> : null}
            </div>
            <p>{getCompanyName(milestone.companySlug)}</p>
          </div>
        </div>
        <div className="detail-hero-body">
          <p className="muted-copy">{milestone.summary}</p>
          <div className="source-action-row">
            {primarySource ? <PrimarySourceButton source={primarySource} /> : null}
            {youtubeSource ? <WatchButton source={youtubeSource} /> : null}
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <article className="data-card">
          <div className="data-card-inner">
            <p className="eyebrow">Why it matters</p>
            <p className="leading-7">{milestone.whyItMatters}</p>
          </div>
        </article>
        <article className="data-card">
          <div className="data-card-inner">
            <p className="eyebrow">Hype check</p>
            <p className="leading-7">{milestone.hypeCheck}</p>
          </div>
        </article>
      </section>

      <section className="tracker-grid">
        <article className="data-card">
          <div className="data-card-inner">
            <h2 className="text-2xl font-black">Source surface</h2>
            <SourceLinks sources={milestone.sourceLinks} />
          </div>
        </article>
        <article className="data-card">
          <div className="data-card-inner">
            <h2 className="text-2xl font-black">Program</h2>
            {company ? (
              <>
                <p className="muted-copy text-sm">{company.summary}</p>
                <Link className="details-button" href={`/companies/${company.slug}`}>
                  View program
                </Link>
              </>
            ) : (
              <p className="muted-copy text-sm">No program profile attached.</p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
