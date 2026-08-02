import Link from "next/link";
import { EvidenceBadge, MilestoneTypeBadge, StatusChip } from "@/components/Badge";
import { Countdown } from "@/components/Countdown";
import { HomeActivityBoard, type HomeActivityItem, type HomeActivityTotals } from "@/components/HomeActivityBoard";
import { LazyLeafletMap } from "@/components/LazyLeafletMap";
import { Signal } from "@/components/Signal";
import {
  companies,
  confirmedMilestones,
  demos,
  getCompanyName,
  getPrimarySource,
  getYoutubeSource,
  papers,
  trials,
  upcomingMilestones
} from "@/data/queries";
import { evidenceLevels, milestoneTypeLabels, type Milestone, type MilestoneStatus, type MilestoneType } from "@/data/schema";

const toActivityItem = (milestone: (typeof upcomingMilestones)[number]): HomeActivityItem => {
  const primary = getPrimarySource(milestone.sourceLinks);
  const video = getYoutubeSource(milestone.sourceLinks);

  return {
    id: milestone.id,
    title: milestone.title,
    companyName: getCompanyName(milestone.companySlug),
    dateLabel: milestone.dateLabel,
    sortDate: milestone.sortDate,
    status: milestone.status,
    type: milestone.type,
    evidenceLevel: milestone.evidenceLevel,
    summary: milestone.summary,
    primarySource: primary ? { title: primary.title, url: primary.url } : undefined,
    videoSource: video ? { title: video.title, url: video.url } : undefined
  };
};

export default function HomePage() {
  // The complete archive is static-generated at /milestones. Keep only a recent
  // preview in the client payload so catalog growth cannot slow the first visit.
  const activityItems = [...upcomingMilestones.slice(0, 20), ...confirmedMilestones.slice(0, 30)].map(toActivityItem);
  const milestonesByStatus: Record<MilestoneStatus, Milestone[]> = {
    upcoming: upcomingMilestones,
    confirmed: confirmedMilestones
  };
  const activityTotals = Object.fromEntries(
    (["upcoming", "confirmed"] as const).map((status) => [
      status,
      {
        all: milestonesByStatus[status].length,
        ...Object.fromEntries(
          (Object.keys(milestoneTypeLabels) as MilestoneType[]).map((type) => [
            type,
            milestonesByStatus[status].filter((milestone) => milestone.type === type).length
          ])
        )
      }
    ])
  ) as HomeActivityTotals;
  const primary = activityItems.find((item) => item.status === "upcoming");
  const evidenceRecordCount = upcomingMilestones.length + confirmedMilestones.length + trials.length + demos.length + papers.length;
  const countryCount = new Set(companies.map((company) => company.hq.country)).size;
  const universityCount = companies.filter((company) => company.kind === "academic").length;

  return (
    <div className="page-shell home-page-stack">
      <section className="home-masthead" aria-labelledby="home-title">
        <Signal seed="nextbci-activity-horizon" className="home-masthead-signal" />
        <div className="home-masthead-copy">
          <p className="eyebrow">Evidence-first BCI activity monitor</p>
          <h1 id="home-title">The next BCI checkpoint, in context.</h1>
          <p>
            Follow implants, trials, demos, papers, and regulatory steps as a live research field, with every milestone
            tied back to a source and every claim held to its evidence level.
          </p>
          <div className="home-masthead-actions">
            <Link className="btn btn-primary" href="/milestones">
              Browse activity
            </Link>
            <Link className="btn btn-ghost" href="/map">
              Open world map
            </Link>
          </div>
        </div>

        {primary ? (
          <aside className="primary-checkpoint" aria-label="Next known checkpoint">
            <div className="primary-checkpoint-head">
              <span>Next known checkpoint</span>
              <StatusChip status={primary.status} />
            </div>
            <p className="primary-checkpoint-date">{primary.dateLabel}</p>
            <Link href={`/milestones/${primary.id}`} className="primary-checkpoint-title">
              {primary.title}
            </Link>
            <p className="primary-checkpoint-company">{primary.companyName}</p>
            <Countdown sortDate={primary.sortDate} />
            <div className="primary-checkpoint-tags">
              <MilestoneTypeBadge type={primary.type} />
              <EvidenceBadge level={primary.evidenceLevel} />
            </div>
            <div className="primary-checkpoint-actions">
              <Link className="btn btn-ghost btn-sm" href={`/milestones/${primary.id}`}>
                Details
              </Link>
              {primary.primarySource ? (
                <a className="btn btn-primary btn-sm" href={primary.primarySource.url} target="_blank" rel="noreferrer">
                  Source
                </a>
              ) : null}
            </div>
          </aside>
        ) : null}
      </section>

      <section className="home-stat-bar" aria-label="Tracker coverage">
        <div>
          <b>{companies.length}</b>
          <span>organizations tracked</span>
        </div>
        <div>
          <b>{universityCount}</b>
          <span>university research programs</span>
        </div>
        <div>
          <b>{evidenceRecordCount}</b>
          <span>source-linked evidence records</span>
        </div>
        <div>
          <b>{countryCount}</b>
          <span>countries represented</span>
        </div>
      </section>

      <HomeActivityBoard items={activityItems} totals={activityTotals} />

      <section className="home-map-section" aria-labelledby="home-map-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">Global field</p>
            <h2 id="home-map-title">Where the programs are</h2>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/map">
            Full map
          </Link>
        </div>
        <LazyLeafletMap variant="compact" />
        <div className="home-map-footer">
          <span>{companies.length} organizations across {countryCount} countries</span>
          <Link href="/explore">Explore organizations</Link>
        </div>
      </section>

      <section className="home-evidence-section" aria-labelledby="evidence-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">Evidence policy</p>
            <h2 id="evidence-title">Claims are not all the same</h2>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/milestones">
            Evidence archive
          </Link>
        </div>
        <div className="evidence-ladder">
          {Object.entries(evidenceLevels).map(([level, definition]) => (
            <div className="evidence-step" key={level}>
              <EvidenceBadge level={level as keyof typeof evidenceLevels} />
              <div>
                <h3>{definition.label}</h3>
                <p>{definition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
