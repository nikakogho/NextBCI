import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge, StatusChip } from "@/components/Badge";
import { Countdown } from "@/components/Countdown";
import { LaunchCard } from "@/components/LaunchCard";
import { ProgramProjectCard } from "@/components/ProgramProjectCard";
import { Signal } from "@/components/Signal";
import { SourceList } from "@/components/SourceList";
import { VideoCard } from "@/components/VideoCard";
import {
  getCompany,
  getCompanyDemos,
  getCompanyMilestones,
  getCompanyProjects,
  getCompanyStats,
  getCompanyTrials
} from "@/data/queries";

export const metadata: Metadata = {
  title: "Neuralink · NextBCI",
  description: "A dedicated tracker for Neuralink's PRIME / Telepathy program: the system, live countdowns, trials, and history."
};

const SLUG = "neuralink-prime";

const SYSTEM = [
  {
    k: "N1 Implant",
    v: "1,024 electrodes",
    d: "A coin-sized, fully implanted device reading activity across 64 ultra-fine threads; wireless and rechargeable."
  },
  {
    k: "R1 Robot",
    v: "Robotic insertion",
    d: "A surgical robot places the flexible threads into cortex with precision beyond a human hand."
  },
  {
    k: "Telepathy",
    v: "Thought control",
    d: "The application layer letting participants move a cursor and control devices by intention alone."
  }
];

export default function NeuralinkPage() {
  const company = getCompany(SLUG);
  if (!company) notFound();

  const milestones = getCompanyMilestones(SLUG);
  const upcoming = milestones.filter((m) => m.status === "upcoming");
  const history = milestones.filter((m) => m.status === "confirmed");
  const trials = getCompanyTrials(SLUG);
  const demos = getCompanyDemos(SLUG);
  const projects = getCompanyProjects(SLUG);
  const stats = getCompanyStats(SLUG);
  const nextUp = upcoming[0];

  return (
    <div className="page-shell page-stack">
      <Link className="btn btn-ghost btn-sm" href="/companies" style={{ alignSelf: "flex-start" }}>
        ← All programs
      </Link>

      <section className="hero">
        <div className="hero-waves">
          <Signal seed={SLUG} className="signal" />
        </div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Program spotlight</p>
            <h1>Neuralink</h1>
            <p className="lede">{company.summary}</p>
            <div className="hero-cta">
              {company.website ? (
                <a className="btn btn-primary" href={company.website} target="_blank" rel="noreferrer">
                  neuralink.com
                </a>
              ) : null}
              <Link className="btn btn-ghost" href={`/companies/${SLUG}`}>
                Full program page
              </Link>
            </div>
          </div>
          <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {nextUp ? (
              <>
                <p className="eyebrow">Next checkpoint</p>
                <Link className="launch-title" style={{ fontSize: "1.05rem" }} href={`/milestones/${nextUp.id}`}>
                  {nextUp.title}
                </Link>
                <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>{nextUp.dateLabel}</span>
                <Countdown sortDate={nextUp.sortDate} />
              </>
            ) : (
              <p className="muted-copy">No upcoming checkpoint on record.</p>
            )}
          </div>
        </div>
      </section>

      <section className="stat-strip stat-strip-auto">
        <div className="stat">
          <b>{stats.milestones}</b>
          <span>milestones</span>
        </div>
        <div className="stat">
          <b>{stats.upcoming}</b>
          <span>upcoming</span>
        </div>
        <div className="stat">
          <b>{stats.trials}</b>
          <span>trials</span>
        </div>
        <div className="stat">
          <b>{stats.projects}</b>
          <span>project tracks</span>
        </div>
        <div className="stat">
          <b>{stats.demos}</b>
          <span>demos</span>
        </div>
      </section>

      {projects.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Program tracks</p>
              <h2>Telepathy, Blindsight, and what is actually evidenced</h2>
            </div>
          </div>
          <div className="card-grid project-track-grid">
            {projects.map((project) => (
              <ProgramProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">The system</p>
            <h2>Implant, robot, and app</h2>
          </div>
          {company.website ? (
            <a className="btn btn-ghost btn-sm" href={company.website} target="_blank" rel="noreferrer">
              Specs on neuralink.com →
            </a>
          ) : null}
        </div>
        <div className="spec-grid">
          {SYSTEM.map((s) => (
            <div className="spec" key={s.k}>
              <div className="k">{s.k}</div>
              <div className="v">{s.v}</div>
              <div className="d">{s.d}</div>
            </div>
          ))}
        </div>
        <p className="muted-copy" style={{ fontSize: 12.5 }}>
          Hardware details are as described by Neuralink; treat capability figures as company-stated until independently
          published.
        </p>
      </section>

      {company.interviewVideo ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Watch</p>
              <h2>Founder interview</h2>
            </div>
          </div>
          <VideoCard video={company.interviewVideo} />
        </section>
      ) : null}

      {upcoming.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h2>Counting down</h2>
            </div>
          </div>
          <div className="launch-feed">
            {upcoming.map((m) => (
              <LaunchCard key={m.id} milestone={m} />
            ))}
          </div>
        </section>
      ) : null}

      {history.length > 0 ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Accomplishments</p>
              <h2>What Neuralink has actually done</h2>
            </div>
          </div>
          <div className="launch-feed">
            {history.map((m) => (
              <LaunchCard key={m.id} milestone={m} />
            ))}
          </div>
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
                <div className="meta-row">
                  <EvidenceBadge level={trial.evidenceLevel} />
                  <span className="badge type-badge">{trial.status}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem" }}>{trial.title}</h3>
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
              <h2>What was actually shown</h2>
            </div>
          </div>
          <div className="card-grid">
            {demos.map((demo) => (
              <div className="tile" key={demo.id}>
                <EvidenceBadge level={demo.evidenceLevel} />
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

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Sources</p>
            <h2>Where this comes from</h2>
          </div>
          <StatusChip status="confirmed" />
        </div>
        <div className="panel panel-pad">
          <SourceList sources={company.sourceLinks} />
        </div>
      </section>
    </div>
  );
}
