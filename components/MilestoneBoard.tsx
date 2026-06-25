"use client";

import { useMemo, useState } from "react";
import { MilestoneCard } from "@/components/MilestoneCard";
import type { EvidenceLevel, Milestone } from "@/data/schema";
import { evidenceLevels } from "@/data/schema";

type BoardMode = "upcoming" | "previous";
type EvidenceFilter = EvidenceLevel | "all";

export function MilestoneBoard({
  upcomingMilestones,
  previousMilestones
}: {
  upcomingMilestones: Milestone[];
  previousMilestones: Milestone[];
}) {
  const [mode, setMode] = useState<BoardMode>("upcoming");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceFilter>("all");

  const baseMilestones = mode === "upcoming" ? upcomingMilestones : previousMilestones;
  const visibleMilestones = useMemo(
    () =>
      evidenceFilter === "all"
        ? baseMilestones
        : baseMilestones.filter((milestone) => milestone.evidenceLevel === evidenceFilter),
    [baseMilestones, evidenceFilter]
  );

  return (
    <section className="tracker-board">
      <div className="board-toolbar">
        <button className="filter-button" type="button" onClick={() => setFiltersOpen((open) => !open)}>
          <span aria-hidden="true">+</span>
          Add Filter
        </button>
        <div aria-label="Milestone status" className="segmented-control" role="tablist">
          <button
            aria-selected={mode === "upcoming"}
            className="segment-button"
            onClick={() => setMode("upcoming")}
            role="tab"
            type="button"
          >
            Upcoming
            <span>{upcomingMilestones.length}</span>
          </button>
          <button
            aria-selected={mode === "previous"}
            className="segment-button"
            onClick={() => setMode("previous")}
            role="tab"
            type="button"
          >
            Previous
            <span>{previousMilestones.length}</span>
          </button>
        </div>
      </div>

      {filtersOpen ? (
        <div className="filter-panel">
          <p className="eyebrow">Evidence filter</p>
          <div className="filter-chip-row">
            <button
              aria-pressed={evidenceFilter === "all"}
              className="filter-chip"
              onClick={() => setEvidenceFilter("all")}
              type="button"
            >
              All levels
            </button>
            {Object.keys(evidenceLevels).map((level) => (
              <button
                aria-pressed={evidenceFilter === level}
                className="filter-chip"
                key={level}
                onClick={() => setEvidenceFilter(level as EvidenceLevel)}
                type="button"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="board-summary-row">
        <p>
          Showing <b>{visibleMilestones.length}</b> {mode === "upcoming" ? "upcoming checkpoints" : "previous evidence events"}
          {evidenceFilter !== "all" ? ` at ${evidenceFilter}` : ""}.
        </p>
      </div>

      <div className="launch-card-grid">
        {visibleMilestones.map((milestone) => (
          <MilestoneCard milestone={milestone} key={milestone.id} />
        ))}
      </div>
    </section>
  );
}
