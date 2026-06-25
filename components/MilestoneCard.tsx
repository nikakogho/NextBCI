import Link from "next/link";
import { getCompanyName } from "@/data/queries";
import type { Milestone } from "@/data/schema";
import { ConfidenceBadge, EvidenceBadge, MilestoneTypeBadge, SampleBadge } from "./Badge";
import { SourceLinks } from "./SourceLinks";
import { getYoutubeSource, WatchButton } from "./SourceActions";

export function MilestoneCard({ milestone, compact = false }: { milestone: Milestone; compact?: boolean }) {
  const detailsHref = `/milestones/${milestone.id}`;
  const youtubeSource = getYoutubeSource(milestone.sourceLinks);

  return (
    <article className={`mission-card ${milestone.status === "upcoming" ? "mission-card-upcoming" : ""}`}>
      <Link aria-label={`Open details for ${milestone.title}`} className="mission-card-media" href={detailsHref}>
        <div className="mission-card-shade" />
        <div className="mission-date-chip">{milestone.dateLabel}</div>
        <div className="mission-card-heading">
          <h3>{milestone.title}</h3>
          <p>{getCompanyName(milestone.companySlug)}</p>
        </div>
      </Link>
      <div className="mission-card-body">
        <div className="meta-row">
          <MilestoneTypeBadge type={milestone.type} />
          <EvidenceBadge level={milestone.evidenceLevel} />
          <ConfidenceBadge confidence={milestone.confidence} />
          {milestone.isSample ? <SampleBadge /> : null}
        </div>
        <p className="muted-copy text-sm">{milestone.summary}</p>
        {!compact ? (
          <div className="mission-detail-stack">
            <div>
              <p className="text-xs font-black uppercase text-stone-500">Why it matters</p>
              <p className="mt-1 text-sm leading-6">{milestone.whyItMatters}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-stone-500">Hype check</p>
              <p className="mt-1 text-sm leading-6">{milestone.hypeCheck}</p>
            </div>
          </div>
        ) : null}
        <div className="card-action-row">
          <Link className="details-button" href={detailsHref}>
            Details
          </Link>
          {youtubeSource ? <WatchButton source={youtubeSource} /> : null}
        </div>
        <SourceLinks sources={milestone.sourceLinks} />
      </div>
    </article>
  );
}
