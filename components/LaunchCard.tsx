import Link from "next/link";
import type { Milestone } from "@/data/schema";
import { getCompanyName, getPrimarySource, getYoutubeSource } from "@/data/queries";
import { EvidenceBadge, MilestoneTypeBadge, StatusChip } from "@/components/Badge";
import { Countdown, TMinus } from "@/components/Countdown";
import { Signal } from "@/components/Signal";

export function LaunchCard({ milestone }: { milestone: Milestone }) {
  const company = getCompanyName(milestone.companySlug);
  const primary = getPrimarySource(milestone.sourceLinks);
  const youtube = getYoutubeSource(milestone.sourceLinks);
  const upcoming = milestone.status === "upcoming";

  return (
    <article className="launch-card">
      <div className="launch-visual">
        <Signal seed={milestone.id} />
        <StatusChip status={milestone.status} />
      </div>
      <div className="launch-body">
        <div className="launch-kicker">
          <span className="mono">{milestone.dateLabel}</span>
          <span>·</span>
          <span>{company}</span>
        </div>
        <Link className="launch-title" href={`/milestones/${milestone.id}`}>
          {milestone.title}
        </Link>
        <p className="launch-summary">{milestone.summary}</p>

        {upcoming ? <Countdown sortDate={milestone.sortDate} /> : <TMinus sortDate={milestone.sortDate} />}

        <div className="launch-foot">
          <MilestoneTypeBadge type={milestone.type} />
          <EvidenceBadge level={milestone.evidenceLevel} />
          <span style={{ flex: 1 }} />
          <Link className="btn btn-ghost btn-sm" href={`/milestones/${milestone.id}`}>
            Details
          </Link>
          {primary ? (
            <a className="btn btn-primary btn-sm" href={primary.url} target="_blank" rel="noreferrer">
              Source
            </a>
          ) : null}
          {youtube ? (
            <a className="btn btn-ghost btn-sm" href={youtube.url} target="_blank" rel="noreferrer">
              Watch
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
