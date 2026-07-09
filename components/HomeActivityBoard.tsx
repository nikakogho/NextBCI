"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Countdown, TMinus } from "@/components/Countdown";
import { EvidenceBadge, MilestoneTypeBadge, StatusChip } from "@/components/Badge";
import { milestoneTypeLabels, type EvidenceLevel, type MilestoneStatus, type MilestoneType } from "@/data/schema";

export type HomeActivityItem = {
  id: string;
  title: string;
  companyName: string;
  dateLabel: string;
  sortDate: string;
  status: MilestoneStatus;
  type: MilestoneType;
  evidenceLevel: EvidenceLevel;
  summary: string;
  primarySource?: { title: string; url: string };
  videoSource?: { title: string; url: string };
};

type FeedMode = "upcoming" | "confirmed";

const MAX_VISIBLE_ITEMS = 10;

export function HomeActivityBoard({ items }: { items: HomeActivityItem[] }) {
  const [mode, setMode] = useState<FeedMode>("upcoming");
  const [type, setType] = useState<MilestoneType | "all">("all");

  const modeItems = useMemo(() => items.filter((item) => item.status === mode), [items, mode]);
  const visibleItems = useMemo(
    () => modeItems.filter((item) => type === "all" || item.type === type).slice(0, MAX_VISIBLE_ITEMS),
    [modeItems, type]
  );

  return (
    <section className="activity-board" aria-labelledby="activity-board-title">
      <div className="activity-board-head">
        <div>
          <p className="eyebrow">Activity feed</p>
          <h2 id="activity-board-title">What is next, and what changed</h2>
          <p className="muted-copy activity-board-copy">
            Scheduled checkpoints and confirmed evidence stay separate so the feed never turns a plan into a result.
          </p>
        </div>
        <Link className="btn btn-ghost btn-sm" href="/milestones">
          Full milestone archive
        </Link>
      </div>

      <div className="activity-controls" aria-label="Activity feed controls">
        <div className="activity-mode" role="group" aria-label="Milestone status">
          <button type="button" className="activity-mode-button" data-active={mode === "upcoming"} onClick={() => setMode("upcoming")}>
            Upcoming <span>{items.filter((item) => item.status === "upcoming").length}</span>
          </button>
          <button type="button" className="activity-mode-button" data-active={mode === "confirmed"} onClick={() => setMode("confirmed")}>
            Confirmed <span>{items.filter((item) => item.status === "confirmed").length}</span>
          </button>
        </div>

        <label className="activity-filter">
          <span>Milestone type</span>
          <select value={type} onChange={(event) => setType(event.target.value as MilestoneType | "all")}>
            <option value="all">All types</option>
            {Object.entries(milestoneTypeLabels).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="activity-count" aria-live="polite">
        Showing {visibleItems.length} of {modeItems.filter((item) => type === "all" || item.type === type).length} {mode} records
      </p>

      <div className="activity-list">
        {visibleItems.map((item) => {
          const upcoming = item.status === "upcoming";
          return (
            <article className="activity-row" key={item.id}>
              <div className="activity-date">
                <span>{item.dateLabel}</span>
                {upcoming ? <Countdown sortDate={item.sortDate} /> : <TMinus sortDate={item.sortDate} />}
              </div>
              <div className="activity-main">
                <div className="activity-meta">
                  <StatusChip status={item.status} />
                  <span>{item.companyName}</span>
                </div>
                <Link href={`/milestones/${item.id}`} className="activity-title">
                  {item.title}
                </Link>
                <p>{item.summary}</p>
                <div className="activity-tags">
                  <MilestoneTypeBadge type={item.type} />
                  <EvidenceBadge level={item.evidenceLevel} />
                </div>
              </div>
              <div className="activity-actions">
                <Link className="btn btn-ghost btn-sm" href={`/milestones/${item.id}`}>
                  Details
                </Link>
                {item.primarySource ? (
                  <a className="btn btn-primary btn-sm" href={item.primarySource.url} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : null}
                {item.videoSource ? (
                  <a className="btn btn-ghost btn-sm" href={item.videoSource.url} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
