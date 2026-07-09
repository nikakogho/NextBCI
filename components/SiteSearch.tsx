"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchItem, SearchKind } from "@/data/queries";

const KIND_LABEL: Record<SearchKind, string> = {
  program: "Program",
  milestone: "Milestone",
  trial: "Trial",
  demo: "Demo",
  paper: "Paper"
};

const KIND_FILTERS: Array<{ key: SearchKind | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "program", label: "Programs" },
  { key: "milestone", label: "Milestones" },
  { key: "trial", label: "Trials" },
  { key: "demo", label: "Demos" },
  { key: "paper", label: "Papers" }
];

export function SiteSearch({ index }: { index: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<SearchKind | "all">("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let items = index;
    if (kind !== "all") items = items.filter((i) => i.kind === kind);
    if (needle) {
      const terms = needle.split(/\s+/);
      items = items.filter((i) => terms.every((t) => i.text.includes(t)));
    }
    return items.slice(0, 60);
  }, [index, query, kind]);

  return (
    <div className="section">
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search programs, milestones, trials, demos, papers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search everything"
          autoFocus
        />
        <div className="chip-row">
          {KIND_FILTERS.map((f) => (
            <button className="chip" data-active={kind === f.key} key={f.key} onClick={() => setKind(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {query.trim() || kind !== "all" ? `${results.length} result${results.length === 1 ? "" : "s"}` : `${index.length} entries indexed`}
      </p>

      {results.length === 0 ? (
        <div className="empty-state">Nothing matches “{query}”. Try a company name, condition, or approach.</div>
      ) : (
        <div className="search-results">
          {results.map((r) => (
            <Link className="search-result" href={r.href} key={`${r.kind}-${r.href}-${r.title}`}>
              <span>
                <span className="r-title">{r.title}</span>
                <br />
                <span className="r-sub">{r.subtitle}</span>
              </span>
              <span className="kind-tag">{KIND_LABEL[r.kind]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
