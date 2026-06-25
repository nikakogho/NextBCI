import { getCompanyName } from "@/data/queries";
import type { Milestone } from "@/data/schema";
import { ConfidenceBadge, EvidenceBadge, MilestoneTypeBadge, SampleBadge } from "./Badge";
import { SourceLinks } from "./SourceLinks";

export function MilestoneCard({ milestone, compact = false }: { milestone: Milestone; compact?: boolean }) {
  return (
    <article className={`data-card ${milestone.status === "upcoming" ? "hero-card" : ""}`}>
      <div className="data-card-inner">
        <div className="meta-row">
          <MilestoneTypeBadge type={milestone.type} />
          <EvidenceBadge level={milestone.evidenceLevel} />
          <ConfidenceBadge confidence={milestone.confidence} />
          {milestone.isSample ? <SampleBadge /> : null}
        </div>
        <div>
          <p className="eyebrow">{milestone.dateLabel} / {getCompanyName(milestone.companySlug)}</p>
          <h3 className="mt-2 text-xl font-black leading-tight">{milestone.title}</h3>
        </div>
        <p className="muted-copy">{milestone.summary}</p>
        {!compact ? (
          <>
            <div>
              <p className="text-xs font-black uppercase text-stone-500">Why it matters</p>
              <p className="mt-1 text-sm leading-6">{milestone.whyItMatters}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-stone-500">Hype check</p>
              <p className="mt-1 text-sm leading-6">{milestone.hypeCheck}</p>
            </div>
          </>
        ) : null}
        <SourceLinks sources={milestone.sourceLinks} />
      </div>
    </article>
  );
}
