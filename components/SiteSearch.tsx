"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { SearchItem, SearchKind } from "@/data/queries";

const ICONS: Record<SearchKind, ReactNode> = {
  program: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 13h.01M15 13h.01" />
    </svg>
  ),
  milestone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V4M5 4l9 3-2 3 2 3-9 2" />
    </svg>
  ),
  trial: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7 14h10" />
    </svg>
  ),
  demo: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  paper: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h9l5 5v15H6zM15 2v5h5M9 13h6M9 17h6M9 9h2" />
    </svg>
  )
};

const KIND_META: Record<SearchKind, { label: string; color: string }> = {
  program: { label: "Program", color: "#47c2ff" },
  milestone: { label: "Milestone", color: "#8b7bff" },
  trial: { label: "Trial", color: "#ffa53d" },
  demo: { label: "Demo", color: "#2fd6a6" },
  paper: { label: "Paper", color: "#ff7ab6" }
};

const KIND_ORDER: SearchKind[] = ["program", "milestone", "trial", "demo", "paper"];
const SUGGESTIONS = ["speech", "ALS", "China", "graphene", "implant", "endovascular", "vision"];

function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return <>{text}</>;
  const terms = needle.split(/\s+/).filter(Boolean);
  const lower = new Set(terms.map((t) => t.toLowerCase()));
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "ig"));
  return (
    <>
      {parts.map((part, i) =>
        lower.has(part.toLowerCase()) ? (
          <mark className="hl" key={i}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function SiteSearch({ index }: { index: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<SearchKind | "all">("all");

  const hasQuery = query.trim().length > 0;

  const textFiltered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return index;
    const terms = needle.split(/\s+/);
    return index.filter((i) => terms.every((t) => i.text.includes(t)));
  }, [index, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: textFiltered.length };
    for (const k of KIND_ORDER) c[k] = textFiltered.filter((i) => i.kind === k).length;
    return c;
  }, [textFiltered]);

  const results = useMemo(() => {
    let items = kind === "all" ? textFiltered : textFiltered.filter((i) => i.kind === kind);
    // On an empty query with no kind chosen, browse programs rather than dumping everything.
    if (!hasQuery && kind === "all") items = items.filter((i) => i.kind === "program");
    return items.slice(0, 90);
  }, [textFiltered, kind, hasQuery]);

  const browsing = !hasQuery && kind === "all";

  return (
    <div className="search-console">
      <div className="search-field">
        <svg className="s-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          placeholder="Search programs, milestones, trials, demos, papers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search everything"
          autoFocus
        />
      </div>

      <div className="seg">
        <button className="seg-btn" data-active={kind === "all"} onClick={() => setKind("all")}>
          All <span className="seg-count">{counts.all}</span>
        </button>
        {KIND_ORDER.map((k) => (
          <button className="seg-btn" data-active={kind === k} key={k} onClick={() => setKind(k)}>
            {KIND_META[k].label}s <span className="seg-count">{counts[k]}</span>
          </button>
        ))}
      </div>

      {browsing ? (
        <div className="suggest">
          <span className="filter-label">Try</span>
          {SUGGESTIONS.map((s) => (
            <button className="suggest-chip" key={s} onClick={() => setQuery(s)}>
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <p className="result-count">
        {browsing
          ? `Browsing ${results.length} programs — search above to reach everything`
          : `${results.length} result${results.length === 1 ? "" : "s"}${hasQuery ? ` for “${query.trim()}”` : ""}`}
      </p>

      {results.length === 0 ? (
        <div className="empty-state">Nothing matches “{query}”. Try a company name, condition, or approach.</div>
      ) : (
        <div className="results-grid">
          {results.map((r) => {
            const meta = KIND_META[r.kind];
            return (
              <Link className="rcard" href={r.href} key={`${r.kind}-${r.href}-${r.title}`}>
                <span
                  className="rcard-icon"
                  style={{ color: meta.color, background: `color-mix(in srgb, ${meta.color} 16%, transparent)` }}
                >
                  {ICONS[r.kind]}
                </span>
                <span className="rcard-body">
                  <span className="rcard-kind" style={{ color: meta.color }}>
                    {meta.label}
                  </span>
                  <span className="rcard-title">
                    <Highlight text={r.title} query={query} />
                  </span>
                  <span className="rcard-sub">{r.subtitle}</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
