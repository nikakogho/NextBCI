import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoClassificationBadge, EvidenceBadge, SampleBadge, StatusChip } from "@/components/Badge";
import { ProgramProjectCard } from "@/components/ProgramProjectCard";
import { Signal } from "@/components/Signal";
import { SourceList } from "@/components/SourceList";
import { VideoCard } from "@/components/VideoCard";
import { getCompanyResearch } from "@/data/company-research";
import { getCompanyDeepResearch } from "@/data/top-company-deep-research";
import {
  categoryLabel,
  companies,
  deviceTypeLabel,
  getCompany,
  getCompanyDemos,
  getCompanyMilestones,
  getCompanyPapers,
  getCompanyProjects,
  getCompanyStats,
  getCompanyTrials,
  getDeviceTypes,
  getOrganizationScale,
  getReadiness,
  heatColor,
  heatLabel,
  organizationKindLabel,
  organizationScaleLabel,
  readinessLabel,
  regionLabel
} from "@/data/queries";
import type { Milestone } from "@/data/schema";

function ResearchLinks({ links }: { links: Array<{ title: string; url: string; publisher: string }> }) {
  return (
    <div className="card-grid">
      {links.map((link) => (
        <a className="tile" href={link.url} key={link.url} rel="noreferrer" target="_blank">
          <span className="eyebrow">{link.publisher}</span>
          <h3 style={{ fontSize: "1rem" }}>{link.title}</h3>
          <span className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }}>Open source ↗</span>
        </a>
      ))}
    </div>
  );
}

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
  const projects = getCompanyProjects(company.slug);
  const stats = getCompanyStats(company.slug);
  const color = heatColor(stats.heat);
  const deviceTypes = getDeviceTypes(company);
  const organizationScale = getOrganizationScale(company);
  const readiness = getReadiness(company);
  const research = getCompanyResearch(company.slug);
  const deepResearch = getCompanyDeepResearch(company.slug);
  const representativePaperUrl = company.sourceLinks.find((source) => source.sourceType === "paper")?.url
    ?? research?.papers[0]?.url;
  const discoverySourceUrl = company.kind === "academic"
    ? representativePaperUrl
    : company.sourceLinks.find((source) => !source.isPrimary)?.url ?? research?.sourceProfileUrl;
  const discoverySourceLabel = discoverySourceUrl?.includes("neurofounders.co")
    ? "NeuroFounders profile ↗"
    : company.kind === "academic"
      ? "Representative paper ↗"
      : "Discovery source ↗";

  return (
    <div className="page-shell page-stack">
      <Link className="btn btn-ghost btn-sm" href="/explore" style={{ alignSelf: "flex-start" }}>
        ← All programs
      </Link>

      <section className="detail-hero">
        <div className="detail-banner">
          <Signal seed={company.slug} />
          <div className="z" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="meta-row">
              <span className="badge type-badge">{organizationKindLabel(company.kind)}</span>
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
          <div className="stat-strip stat-strip-auto">
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
              <b>{stats.projects}</b>
              <span>projects</span>
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
            <dt>Organization</dt>
            <dd>
              {company.kind === "academic"
                ? organizationKindLabel(company.kind)
                : `${organizationKindLabel(company.kind)} · ${organizationScaleLabel(organizationScale)}`}
            </dd>
            <dt>Readiness</dt>
            <dd>{readinessLabel(readiness)}</dd>
            <dt>Device classes</dt>
            <dd>{deviceTypes.length ? deviceTypes.map(deviceTypeLabel).join(" · ") : "Not yet normalized"}</dd>
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

      {research ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">{company.kind === "academic" ? "Institution research" : "Company research"}</p>
              <h2>{company.kind === "academic" ? "Location, evidence, and source leads" : "Founding, location, value, and source leads"}</h2>
            </div>
            <span className="badge type-badge">Researched {research.researchedOn}</span>
          </div>
          <div className="two-col">
            <div className="panel panel-pad">
              <dl className="kv">
                <dt>Founded</dt>
                <dd>{research.founding.year ?? "Not verified"}</dd>
                <dt>{company.kind === "academic" ? "Founding history" : "Founders"}</dt>
                <dd>
                  {research.founding.note}{" "}
                  {research.founding.sourceUrl ? <a href={research.founding.sourceUrl} rel="noreferrer" target="_blank">Source ↗</a> : null}
                </dd>
                <dt>Location research</dt>
                <dd>
                  {research.headquarters.display}. {research.headquarters.note}{" "}
                  {research.headquarters.sourceUrl ? <a href={research.headquarters.sourceUrl} rel="noreferrer" target="_blank">Source ↗</a> : null}
                </dd>
                <dt>{company.kind === "academic" ? "Commercial valuation" : "Company value"}</dt>
                <dd>
                  <b>{research.companyValue.label}.</b> {research.companyValue.note}{" "}
                  {research.companyValue.sourceUrl ? <a href={research.companyValue.sourceUrl} rel="noreferrer" target="_blank">Source ↗</a> : null}
                </dd>
                <dt>{company.kind === "academic" ? "Organization type" : "Funding stage"}</dt>
                <dd>{research.fundingStage}</dd>
                <dt>Regulatory label</dt>
                <dd>{research.regulatoryStatus}</dd>
              </dl>
            </div>
            <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 10 }}>Research overview</p>
                <p className="muted-copy">{research.overview}</p>
              </div>
              <p className="hype">{research.notes}</p>
              <div className="meta-row">
                {discoverySourceUrl ? <a className="btn btn-ghost btn-sm" href={discoverySourceUrl} rel="noreferrer" target="_blank">{discoverySourceLabel}</a> : null}
                {research.officialWebsite ? <a className="btn btn-ghost btn-sm" href={research.officialWebsite} rel="noreferrer" target="_blank">Official website ↗</a> : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {deepResearch ? (
        <section className="section" id="deep-research">
          <div className="section-head">
            <div>
              <p className="eyebrow">Top 200 evidence dossier</p>
              <h2>Mission, goals, evidence, and public context</h2>
            </div>
            <div className="meta-row">
              <span className="badge type-badge">Rank {deepResearch.rank} / 200</span>
              <span className="badge type-badge">{deepResearch.sourceAudit.newSources} new sources</span>
              <Link className="btn btn-ghost btn-sm" href="/research/top-200">Method and cohort</Link>
            </div>
          </div>
          <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
            <p className="muted-copy">{deepResearch.researchSummary}</p>
            <p className="muted-copy" style={{ fontSize: 13 }}>{deepResearch.selectionRationale}</p>
            <p className="hype">{deepResearch.limitations}</p>
          </div>
          <div className="card-grid">
            {deepResearch.items.map((item, itemIndex) => (
              <article className="tile" key={`${item.section}-${item.sourceLinks[0]?.url}-${itemIndex}`}>
                <div className="meta-row">
                  <span className="badge type-badge">{item.section}</span>
                  <EvidenceBadge level={item.evidenceLevel} />
                  {item.isNewSource ? <span className="badge status-upcoming">New source</span> : null}
                </div>
                <div>
                  {item.date ? <p className="eyebrow" style={{ marginBottom: 6 }}>{item.date}</p> : null}
                  <h3 style={{ fontSize: "1rem" }}>{item.title}</h3>
                </div>
                <p className="muted-copy" style={{ fontSize: 13 }}>{item.detail}</p>
                <p className="hype" style={{ fontSize: 12 }}>{item.caveat}</p>
                <SourceList sources={item.sourceLinks} />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {research?.reportedAccomplishments.length ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">{company.kind === "academic" ? "Publication-linked highlights" : "Company-reported highlights"}</p>
              <h2>{company.kind === "academic" ? "Representative research contribution" : "Accomplishment leads to verify"}</h2>
            </div>
            <span className="badge type-badge">{company.kind === "academic" ? "Affiliation evidence" : "First-party claims"}</span>
          </div>
          <div className="card-grid">
            {research.reportedAccomplishments.map((item) => (
              <div className="tile" key={`${item.sourceUrl}-${item.note}`}>
                <span className="badge type-badge">{company.kind === "academic" ? "Publication evidence" : "Company-reported"}</span>
                <p className="muted-copy" style={{ fontSize: 13 }}>{item.note}</p>
                <a className="btn btn-ghost btn-sm" href={item.sourceUrl} rel="noreferrer" target="_blank">{item.publisher} ↗</a>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {research?.papers.length ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Research links</p>
              <h2>Papers and publication resources</h2>
            </div>
            <span className="badge type-badge">{research.papers.length} found</span>
          </div>
          <ResearchLinks links={research.papers} />
        </section>
      ) : null}

      {research?.videos.length ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Watch</p>
              <h2>Videos, talks, and official channels</h2>
            </div>
            <span className="badge type-badge">{research.videos.length} found</span>
          </div>
          <ResearchLinks links={research.videos} />
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Project tracks</p>
              <h2>How this program breaks down</h2>
            </div>
            <span className="badge type-badge">{projects.length} tracked</span>
          </div>
          <div className="card-grid project-track-grid">
            {projects.map((project) => (
              <ProgramProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

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
