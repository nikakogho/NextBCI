"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProgramRow } from "@/data/queries";
import { companyCategories, regions } from "@/data/schema";

const CATEGORY_OPTIONS = Object.entries(companyCategories) as Array<[string, string]>;
const REGION_OPTIONS = Object.entries(regions) as Array<[string, string]>;

export function ProgramExplorer({ programs }: { programs: ProgramRow[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return programs.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (region !== "all" && p.region !== region) return false;
      if (needle) {
        const hay = `${p.name} ${p.city} ${p.country} ${p.stage} ${p.categoryLabel} ${p.regionLabel}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [programs, query, category, region]);

  return (
    <div className="section">
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search programs by name, place, or approach…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search programs"
        />
        <div className="chip-row">
          <span className="filter-label">Approach</span>
          <button className="chip" data-active={category === "all"} onClick={() => setCategory("all")}>
            All
          </button>
          {CATEGORY_OPTIONS.map(([key, label]) => (
            <button className="chip" data-active={category === key} key={key} onClick={() => setCategory(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="chip-row">
          <span className="filter-label">Region</span>
          <button className="chip" data-active={region === "all"} onClick={() => setRegion("all")}>
            All
          </button>
          {REGION_OPTIONS.map(([key, label]) => (
            <button className="chip" data-active={region === key} key={key} onClick={() => setRegion(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {filtered.length} of {programs.length} programs
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">No programs match those filters.</div>
      ) : (
        <div className="card-grid">
          {filtered.map((p) => (
            <Link className="tile" href={`/companies/${p.slug}`} key={p.slug}>
              <div className="meta-row" style={{ justifyContent: "space-between" }}>
                <span className="meta-row" style={{ gap: 8 }}>
                  <span
                    className="dot"
                    style={{ color: p.heatColor, background: p.heatColor, width: 9, height: 9 }}
                    aria-hidden="true"
                  />
                  <span className="badge type-badge">{p.kind === "academic" ? "Academic" : "Company"}</span>
                </span>
                <span className="badge ev" style={{ color: p.heatColor, borderColor: p.heatColor }}>
                  {p.heatLabel}
                </span>
              </div>
              <h3>{p.name}</h3>
              <p className="muted-copy" style={{ fontSize: 12.5 }}>
                {p.city}, {p.country} · {p.categoryLabel}
              </p>
              <p className="muted-copy" style={{ fontSize: 13.5 }}>{p.stage}</p>
              <div className="tile-foot">
                <span className={`badge ev ev-${p.evidenceLevel}`}>{p.evidenceLevel}</span>
                {p.founded ? <span className="badge type-badge">Est. {p.founded}</span> : null}
                <span style={{ flex: 1 }} />
                <span className="mono" style={{ fontSize: 11.5, color: "var(--faint)" }}>
                  {p.stats.milestones}M · {p.stats.trials}T · {p.stats.demos}D · {p.stats.papers}P
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
