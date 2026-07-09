"use client";

import { useState } from "react";
import Link from "next/link";
import { WORLD_VIEWBOX, countryPaths } from "@/data/world-paths";
import { MAP_HEIGHT, MAP_WIDTH, projectLngLat } from "@/lib/geo";

export interface MapNode {
  slug: string;
  name: string;
  kind: "company" | "academic";
  city: string;
  country: string;
  lat: number;
  lng: number;
  heat: number;
  heatColor: string;
  heatLabel: string;
  stage: string;
  evidenceLevel: string;
  stats: { milestones: number; upcoming: number; trials: number; demos: number; papers: number };
}

const GRATICULE_LNG = [-120, -60, 0, 60, 120];
const GRATICULE_LAT = [60, 30, 0, -30];

export function WorldMap({ nodes, compact = false }: { nodes: MapNode[]; compact?: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const positioned = nodes.map((n) => ({ node: n, ...projectLngLat(n.lng, n.lat) }));
  const active = selected ?? hovered;
  const selectedNode = nodes.find((n) => n.slug === selected) ?? null;
  const sorted = [...nodes].sort((a, b) => b.heat - a.heat);

  const map = (
    <div className="map-wrap">
      <svg className="map-svg" viewBox={WORLD_VIEWBOX} role="img" aria-label="World map of BCI programs">
        {/* graticule */}
        {GRATICULE_LNG.map((lng) => {
          const { x } = projectLngLat(lng, 0);
          return <line key={`v${lng}`} className="map-graticule" x1={x} y1={0} x2={x} y2={MAP_HEIGHT} />;
        })}
        {GRATICULE_LAT.map((lat) => {
          const { y } = projectLngLat(0, lat);
          return <line key={`h${lat}`} className="map-graticule" x1={0} y1={y} x2={MAP_WIDTH} y2={y} />;
        })}

        {/* land */}
        {countryPaths.map((c) => (
          <path key={c.id} className="map-country" d={c.d} />
        ))}

        {/* markers */}
        {positioned.map(({ node, x, y }) => {
          const isActive = active === node.slug;
          const isSelected = selected === node.slug;
          const r = isActive ? 8 : 5.5;
          return (
            <g key={node.slug}>
              {node.heat >= 0.28 ? (
                <circle
                  className="map-ring"
                  cx={x}
                  cy={y}
                  r={7}
                  stroke={node.heatColor}
                  strokeWidth={1.4}
                  style={{ animationDelay: `${(node.lat % 3) * 0.5}s` }}
                />
              ) : null}
              <circle
                className="map-marker"
                cx={x}
                cy={y}
                r={r}
                fill={node.heatColor}
                fillOpacity={0.9}
                stroke={isSelected ? "#fff" : "rgba(255,255,255,0.55)"}
                strokeWidth={isSelected ? 2 : 1}
                onMouseEnter={() => setHovered(node.slug)}
                onMouseLeave={() => setHovered((h) => (h === node.slug ? null : h))}
                onClick={() => setSelected((s) => (s === node.slug ? null : node.slug))}
              >
                <title>{`${node.name} — ${node.heatLabel}`}</title>
              </circle>
              {isActive ? (
                <text className="map-label" x={x + 10} y={y + 3.5}>
                  {node.name}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );

  if (compact) {
    return map;
  }

  return (
    <div className="map-layout">
      <div className="section" style={{ gap: 14 }}>
        {map}
        <div className="map-legend">
          <span>Marker heat = program activity:</span>
          <span className="legend-scale">
            <span className="legend-swatch" style={{ background: "#5f7d99" }} /> Quiet
          </span>
          <span className="legend-scale">
            <span className="legend-swatch" style={{ background: "#5fd0ff" }} /> Emerging
          </span>
          <span className="legend-scale">
            <span className="legend-swatch" style={{ background: "#ffc24d" }} /> Moderate
          </span>
          <span className="legend-scale">
            <span className="legend-swatch" style={{ background: "#ff8a3d" }} /> Active
          </span>
          <span className="legend-scale">
            <span className="legend-swatch" style={{ background: "#ff4d55" }} /> Very active
          </span>
        </div>
      </div>

      <aside className="map-side">
        {selectedNode ? (
          <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="meta-row">
              <span className="badge type-badge">{selectedNode.kind === "academic" ? "Academic" : "Company"}</span>
              <span className="badge ev" style={{ color: selectedNode.heatColor, borderColor: selectedNode.heatColor }}>
                {selectedNode.heatLabel}
              </span>
            </div>
            <h3 style={{ fontSize: "1.15rem" }}>{selectedNode.name}</h3>
            <p className="muted-copy" style={{ fontSize: 13 }}>
              {selectedNode.city}, {selectedNode.country}
            </p>
            <p className="muted-copy" style={{ fontSize: 13 }}>{selectedNode.stage}</p>
            <div className="meta-row" style={{ fontSize: 12, color: "var(--muted)" }}>
              <span>{selectedNode.stats.milestones} milestones</span>
              <span>·</span>
              <span>{selectedNode.stats.trials} trials</span>
              <span>·</span>
              <span>{selectedNode.stats.demos} demos</span>
              <span>·</span>
              <span>{selectedNode.stats.papers} papers</span>
            </div>
            <Link className="btn btn-primary btn-sm" href={`/companies/${selectedNode.slug}`}>
              View program
            </Link>
          </div>
        ) : (
          <div className="panel panel-pad">
            <p className="eyebrow">Interactive map</p>
            <p className="map-side-empty" style={{ marginTop: 8 }}>
              Select a node to inspect a program. Hotter markers run more active clinical and research programs right now.
            </p>
          </div>
        )}

        <div className="panel panel-pad">
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            Programs by activity
          </p>
          <div className="node-list">
            {sorted.map((node) => (
              <button
                className="node-row"
                data-active={selected === node.slug}
                key={node.slug}
                onClick={() => setSelected((s) => (s === node.slug ? null : node.slug))}
                onMouseEnter={() => setHovered(node.slug)}
                onMouseLeave={() => setHovered((h) => (h === node.slug ? null : h))}
              >
                <span className="swatch" style={{ background: node.heatColor, color: node.heatColor }} />
                <span>
                  <span className="nm">{node.name}</span>
                  <br />
                  <span className="loc">
                    {node.city} · {node.heatLabel}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
