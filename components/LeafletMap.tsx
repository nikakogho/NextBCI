"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import type { LeafletEvent, Map as LMap, Marker, MarkerCluster, MarkerClusterGroup } from "leaflet";
import type { MapNode } from "@/components/WorldMap";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

const leafletStyles = `
  .leaflet-map-stage {
    position: relative;
    height: calc(100svh - 59px);
    min-height: 700px;
    overflow: hidden;
    background: #dce8ec;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  .leaflet-map {
    width: 100%;
    height: 100%;
    min-height: 100%;
    background: #dce8ec;
  }
  .leaflet-map-stage .leaflet-control-zoom {
    border: 1px solid rgba(15, 23, 42, 0.35);
    box-shadow: 0 8px 22px -14px rgba(15, 23, 42, 0.75);
  }
  .leaflet-map-stage .leaflet-control-zoom a {
    color: #111827;
  }
  .leaflet-map-stage .leaflet-control-attribution {
    color: #334155;
    font-size: 10.5px;
  }
  .leaflet-map-stage .leaflet-bottom.leaflet-left {
    bottom: 18px;
    left: 18px;
  }
  .leaflet-map-stage .leaflet-bottom.leaflet-right {
    bottom: 12px;
    right: 12px;
  }
  .bci-pin {
    background: transparent;
    border: 0;
    filter: drop-shadow(0 6px 7px rgba(0, 0, 0, 0.38));
  }
  .bci-pin svg {
    display: block;
  }
  .bci-cluster-wrap {
    background: transparent;
    border: 0;
  }
  .bci-cluster {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border: 3px solid #111827;
    border-radius: 999px;
    background: #fff;
    color: #101820;
    box-shadow: 0 5px 12px rgba(15, 23, 42, 0.36);
    font: 800 18px/1 var(--sans);
    outline: 4px solid color-mix(in srgb, var(--cluster-color) 28%, transparent);
  }
  .bci-cluster span {
    transform: translateY(-0.5px);
  }
  .bci-popup .leaflet-popup-content-wrapper {
    border-radius: 8px;
    border: 1px solid rgba(15, 23, 42, 0.22);
    box-shadow: 0 14px 34px -20px rgba(15, 23, 42, 0.75);
  }
  .bci-popup .leaflet-popup-content {
    margin: 0;
  }
  .bci-popup .leaflet-popup-tip {
    box-shadow: none;
  }
  .map-popup {
    min-width: 210px;
    padding: 13px 14px 14px;
    color: #111827;
  }
  .map-popup .mp-kind {
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .map-popup .mp-name {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 800;
    line-height: 1.2;
  }
  .map-popup .mp-loc,
  .map-popup .mp-stats {
    margin-top: 5px;
    color: #475569;
    font-size: 12.5px;
    line-height: 1.4;
  }
  .map-popup .mp-link {
    display: inline-flex;
    margin-top: 10px;
    color: #0f5f8f;
    font-size: 12.5px;
    font-weight: 800;
  }
  .map-overlay {
    position: absolute;
    z-index: 700;
    color: var(--text);
    border: 1px solid rgba(233, 239, 246, 0.16);
    background: rgba(8, 11, 17, 0.84);
    backdrop-filter: blur(16px);
    box-shadow: 0 20px 50px -28px rgba(0, 0, 0, 0.95);
  }
  .map-intro-panel {
    top: 18px;
    left: 18px;
    width: min(430px, calc(100% - 36px));
    padding: 18px;
    border-radius: 12px;
  }
  .map-intro-panel h1 {
    margin-top: 8px;
    font-size: clamp(1.55rem, 2.5vw, 2.35rem);
    letter-spacing: 0;
  }
  .map-intro-panel .lede {
    margin-top: 10px;
    max-width: 44ch;
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--muted);
  }
  .map-inline-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 14px;
  }
  .map-inline-stat {
    min-width: 0;
    border: 1px solid rgba(233, 239, 246, 0.12);
    border-radius: 8px;
    padding: 9px 8px;
    background: rgba(255, 255, 255, 0.045);
  }
  .map-inline-stat b {
    display: block;
    font-family: var(--mono);
    font-size: 17px;
    line-height: 1;
  }
  .map-inline-stat span {
    display: block;
    margin-top: 4px;
    color: var(--faint);
    font-size: 10.5px;
    line-height: 1.2;
  }
  .map-intro-panel .map-legend {
    gap: 10px;
    margin-top: 14px;
    font-size: 11.5px;
  }
  .map-intro-panel .legend-swatch {
    width: 10px;
    height: 10px;
    border-radius: 999px;
  }
  .map-directory-panel {
    top: 18px;
    right: 18px;
    width: min(360px, calc(100% - 36px));
    max-height: calc(100% - 36px);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .map-directory-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .map-directory-panel .btn {
    padding: 8px 11px;
    font-size: 12px;
    border-radius: 8px;
  }
  .map-selected {
    border-top: 1px solid rgba(233, 239, 246, 0.12);
    border-bottom: 1px solid rgba(233, 239, 246, 0.12);
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .map-selected .map-selected-title {
    font-size: 15px;
    font-weight: 800;
    line-height: 1.25;
  }
  .map-selected .map-selected-meta,
  .map-selected .map-selected-stage {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.45;
  }
  .map-directory-list {
    max-height: none;
    overflow-y: auto;
    padding-right: 2px;
  }
  .map-directory-list .node-row {
    border-radius: 8px;
  }
  .map-directory-list .node-row[data-active="true"] {
    border-color: color-mix(in srgb, var(--accent) 48%, rgba(233, 239, 246, 0.16));
    background: rgba(71, 194, 255, 0.12);
  }
  .map-city-note {
    color: var(--faint);
    font-size: 11.5px;
    line-height: 1.45;
  }
  @media (max-width: 980px) {
    .leaflet-map-stage {
      height: calc(100svh - 112px);
      min-height: 780px;
    }
    .map-directory-panel {
      top: auto;
      left: 18px;
      right: 18px;
      bottom: 18px;
      width: auto;
      max-height: 310px;
    }
    .map-directory-list {
      max-height: 150px;
    }
    .leaflet-map-stage .leaflet-bottom.leaflet-left {
      bottom: 346px;
    }
  }
  @media (max-width: 620px) {
    .leaflet-map-stage {
      height: calc(100svh - 124px);
      min-height: 760px;
    }
    .map-intro-panel {
      top: 12px;
      left: 12px;
      width: calc(100% - 24px);
      padding: 14px;
    }
    .map-intro-panel .lede {
      font-size: 12.5px;
    }
    .map-inline-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    .map-intro-panel .map-legend {
      display: none;
    }
    .map-directory-panel {
      left: 12px;
      right: 12px;
      bottom: 12px;
      max-height: 315px;
      padding: 14px;
    }
    .leaflet-map-stage .leaflet-bottom.leaflet-left {
      bottom: 334px;
      left: 12px;
    }
    .map-selected {
      display: none;
    }
  }
`;

function pinSvg(color: string): string {
  return `<svg width="32" height="45" viewBox="0 0 32 45" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1C7.7 1 1 7.7 1 16c0 11.8 15 27 15 27s15-15.2 15-27C31 7.7 24.3 1 16 1z"
      fill="${color}" stroke="rgba(0,0,0,.45)" stroke-width="1.5"/>
    <circle cx="16" cy="16" r="5.9" fill="#fff" stroke="rgba(0,0,0,.2)" stroke-width="1"/>
  </svg>`;
}

function popupHtml(n: MapNode): string {
  const kind = n.kind === "academic" ? "Academic" : "Company";
  const stats = [
    `${n.stats.milestones} milestones`,
    `${n.stats.trials} trials`,
    `${n.stats.demos} demos`
  ];
  if (n.stats.projects > 0) stats.push(`${n.stats.projects} projects`);
  return `<div class="map-popup">
    <div class="mp-kind" style="color:${n.heatColor}">${kind} - ${escapeHtml(n.heatLabel)}</div>
    <div class="mp-name">${escapeHtml(n.name)}</div>
    <div class="mp-loc">${escapeHtml(n.city)}, ${escapeHtml(n.country)}</div>
    <div class="mp-stats">${stats.join(" - ")}</div>
    <a class="mp-link" href="/companies/${n.slug}">View program -&gt;</a>
  </div>`;
}

type DisplayNode = MapNode & {
  displayLat: number;
  displayLng: number;
};

const cityKey = (n: MapNode) => `${n.city.toLowerCase()}|${n.country.toLowerCase()}`;

function spreadSameCityNodes(nodes: MapNode[]): DisplayNode[] {
  const groups = new Map<string, MapNode[]>();
  for (const node of nodes) {
    const key = cityKey(node);
    groups.set(key, [...(groups.get(key) ?? []), node]);
  }

  return nodes.map((node) => {
    const group = groups.get(cityKey(node)) ?? [node];
    const index = group.findIndex((candidate) => candidate.slug === node.slug);

    if (group.length < 2 || index < 0) {
      return { ...node, displayLat: node.lat, displayLng: node.lng };
    }

    const radius = Math.min(0.085, 0.028 + group.length * 0.011);
    const angle = (Math.PI * 2 * index) / group.length - Math.PI / 2;
    const lngScale = Math.max(0.35, Math.cos((node.lat * Math.PI) / 180));

    return {
      ...node,
      displayLat: node.lat + Math.sin(angle) * radius,
      displayLng: node.lng + (Math.cos(angle) * radius) / lngScale
    };
  });
}

interface MapApi {
  reveal: (slug: string) => void;
  reset: () => void;
}

export function LeafletMap({ nodes }: { nodes: MapNode[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<MapApi | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const sorted = useMemo(() => [...nodes].sort((a, b) => b.heat - a.heat), [nodes]);
  const displayNodes = useMemo(() => spreadSameCityNodes(nodes), [nodes]);
  const selectedNode = useMemo(() => nodes.find((node) => node.slug === selected) ?? null, [nodes, selected]);
  const summaryStats = useMemo(() => {
    const countries = new Set(nodes.map((node) => node.country)).size;
    return {
      programs: nodes.length,
      countries,
      veryActive: nodes.filter((node) => node.heat >= 0.75).length,
      upcoming: nodes.filter((node) => node.stats.upcoming > 0).length
    };
  }, [nodes]);

  useEffect(() => {
    let map: LMap | null = null;
    let cancelled = false;

    (async () => {
      const Lmod = await import("leaflet");
      const L = ((Lmod as unknown as { default?: typeof Lmod }).default ?? Lmod) as typeof import("leaflet");
      await import("leaflet.markercluster");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        worldCopyJump: true,
        minZoom: 2,
        maxZoom: 19,
        zoomControl: false,
        attributionControl: true,
        wheelPxPerZoomLevel: 68,
        wheelDebounceTime: 28
      }).setView([25, 10], 2);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.control.zoom({ position: "bottomleft" }).addTo(map);

      const heatByMarker = new WeakMap<Marker, { heat: number; color: string }>();

      const cluster: MarkerClusterGroup = L.markerClusterGroup({
        disableClusteringAtZoom: 12,
        maxClusterRadius: (zoom) => (zoom >= 11 ? 10 : zoom >= 8 ? 24 : zoom >= 5 ? 38 : 56),
        showCoverageOnHover: false,
        spiderfyOnEveryZoom: false,
        spiderfyOnMaxZoom: true,
        zoomToBoundsOnClick: false,
        spiderfyDistanceMultiplier: 1.55,
        spiderLegPolylineOptions: { weight: 1.5, color: "#111827", opacity: 0.55 },
        iconCreateFunction: (c) => {
          const children = c.getAllChildMarkers();
          let hottest = { heat: -1, color: "#5f7d99" };
          for (const child of children) {
            const info = heatByMarker.get(child as Marker);
            if (info && info.heat > hottest.heat) hottest = info;
          }
          return L.divIcon({
            html: `<div class="bci-cluster" style="--cluster-color:${hottest.color}"><span>${c.getChildCount()}</span></div>`,
            className: "bci-cluster-wrap",
            iconSize: L.point(44, 44)
          });
        }
      });
      cluster.on("clusterclick", (event: LeafletEvent) => {
        if (!map) return;
        const clickedCluster = (event as LeafletEvent & { layer: MarkerCluster }).layer;
        setSelected(null);
        if (map.getZoom() < 9) {
          clickedCluster.zoomToBounds({ padding: [72, 72], maxZoom: Math.min(map.getZoom() + 3, 10) });
        } else {
          clickedCluster.spiderfy();
        }
      });

      const markersBySlug = new Map<string, Marker>();
      for (const n of displayNodes) {
        const marker = L.marker([n.displayLat, n.displayLng], {
          icon: L.divIcon({
            className: "bci-pin",
            html: pinSvg(n.heatColor),
            iconSize: [32, 45],
            iconAnchor: [16, 43],
            popupAnchor: [0, -39]
          })
        });
        marker.bindPopup(popupHtml(n), { className: "bci-popup" });
        marker.on("popupopen", () => setSelected(n.slug));
        heatByMarker.set(marker, { heat: n.heat, color: n.heatColor });
        markersBySlug.set(n.slug, marker);
        cluster.addLayer(marker);
      }
      map.addLayer(cluster);

      const fitAll = () => {
        if (!map) return;
        const bounds = cluster.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds.pad(0.16), { maxZoom: 5 });
      };
      fitAll();

      apiRef.current = {
        reveal: (slug) => {
          const marker = markersBySlug.get(slug);
          if (!marker || !map) return;
          setSelected(slug);
          cluster.zoomToShowLayer(marker, () => marker.openPopup());
        },
        reset: fitAll
      };

      setTimeout(() => map?.invalidateSize(), 120);
    })();

    return () => {
      cancelled = true;
      apiRef.current = null;
      if (map) map.remove();
    };
  }, [displayNodes]);

  return (
    <div className="leaflet-map-stage">
      <style>{leafletStyles}</style>
      <div ref={containerRef} className="leaflet-map" />

      <section className="map-overlay map-intro-panel" aria-label="Map summary">
        <p className="eyebrow">Global map</p>
        <h1>BCI world map</h1>
        <p className="lede">
          Tracked BCI programs plotted at their home base, with marker color reflecting current activity.
        </p>
        <div className="map-inline-stats">
          <div className="map-inline-stat">
            <b>{summaryStats.programs}</b>
            <span>programs</span>
          </div>
          <div className="map-inline-stat">
            <b>{summaryStats.countries}</b>
            <span>countries</span>
          </div>
          <div className="map-inline-stat">
            <b>{summaryStats.veryActive}</b>
            <span>very active</span>
          </div>
          <div className="map-inline-stat">
            <b>{summaryStats.upcoming}</b>
            <span>upcoming</span>
          </div>
        </div>
        <div className="map-legend">
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
      </section>

      <aside className="map-overlay map-directory-panel" aria-label="Mapped programs">
        <div className="map-directory-head">
          <p className="eyebrow">Programs</p>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => apiRef.current?.reset()}>
            Show all
          </button>
        </div>

        {selectedNode ? (
          <div className="map-selected">
            <div className="meta-row">
              <span className="badge type-badge">{selectedNode.kind === "academic" ? "Academic" : "Company"}</span>
              <span className="badge ev" style={{ color: selectedNode.heatColor, borderColor: selectedNode.heatColor }}>
                {selectedNode.heatLabel}
              </span>
            </div>
            <div>
              <div className="map-selected-title">{selectedNode.name}</div>
              <div className="map-selected-meta">
                {selectedNode.city}, {selectedNode.country}
              </div>
            </div>
            <p className="map-selected-stage">{selectedNode.stage}</p>
            <Link className="btn btn-primary btn-sm" href={`/companies/${selectedNode.slug}`}>
              View program
            </Link>
          </div>
        ) : (
          <p className="map-city-note">Dense regions separate into individual pins at city scale.</p>
        )}

        <div className="node-list map-directory-list">
          {sorted.map((node) => (
            <button
              className="node-row"
              data-active={selected === node.slug}
              key={node.slug}
              onClick={() => apiRef.current?.reveal(node.slug)}
            >
              <span className="swatch" style={{ background: node.heatColor, color: node.heatColor }} />
              <span>
                <span className="nm">{node.name}</span>
                <br />
                <span className="loc">
                  {node.city} - {node.heatLabel}
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
