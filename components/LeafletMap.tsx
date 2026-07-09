"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import type { Map as LMap, Marker } from "leaflet";
import type { MarkerClusterGroup } from "leaflet";
import type { MapNode } from "@/components/WorldMap";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

const leafletStyles = `
  .leaflet-frame {
    background: #dce8ec;
    box-shadow: 0 18px 55px -26px rgba(0, 0, 0, 0.95);
  }
  .leaflet-map {
    width: 100%;
    height: min(68vh, 720px);
    min-height: 560px;
    background: #dce8ec;
  }
  .leaflet-frame .leaflet-control-zoom {
    border: 1px solid rgba(15, 23, 42, 0.35);
    box-shadow: 0 8px 22px -14px rgba(15, 23, 42, 0.75);
  }
  .leaflet-frame .leaflet-control-zoom a {
    color: #111827;
  }
  .leaflet-frame .leaflet-control-attribution {
    color: #334155;
    font-size: 10.5px;
  }
  .bci-pin {
    background: transparent;
    border: 0;
    filter: drop-shadow(0 5px 6px rgba(0, 0, 0, 0.34));
  }
  .bci-pin svg {
    display: block;
  }
  .bci-cluster-wrap {
    background: transparent;
    border: 0;
  }
  .bci-cluster {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border: 3px solid #101820;
    border-bottom-color: var(--cluster-color);
    border-radius: 999px;
    background: #fff;
    color: #101820;
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.32);
    font: 800 18px/1 var(--sans);
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
  @media (max-width: 900px) {
    .leaflet-map {
      height: 62vh;
      min-height: 460px;
    }
  }
  @media (max-width: 620px) {
    .leaflet-map {
      height: 58vh;
      min-height: 380px;
    }
  }
`;

function pinSvg(color: string): string {
  return `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1C7.3 1 1 7.3 1 15c0 10.8 14 25 14 25s14-14.2 14-25C29 7.3 22.7 1 15 1z"
      fill="${color}" stroke="rgba(0,0,0,.45)" stroke-width="1.5"/>
    <circle cx="15" cy="15" r="5.4" fill="#fff" stroke="rgba(0,0,0,.2)" stroke-width="1"/>
  </svg>`;
}

function popupHtml(n: MapNode): string {
  const kind = n.kind === "academic" ? "Academic" : "Company";
  return `<div class="map-popup">
    <div class="mp-kind" style="color:${n.heatColor}">${kind} - ${escapeHtml(n.heatLabel)}</div>
    <div class="mp-name">${escapeHtml(n.name)}</div>
    <div class="mp-loc">${escapeHtml(n.city)}, ${escapeHtml(n.country)}</div>
    <div class="mp-stats">${n.stats.milestones} milestones - ${n.stats.trials} trials - ${n.stats.demos} demos</div>
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

    const radius = Math.min(0.045, 0.018 + group.length * 0.006);
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
}

export function LeafletMap({ nodes }: { nodes: MapNode[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<MapApi | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const sorted = useMemo(() => [...nodes].sort((a, b) => b.heat - a.heat), [nodes]);
  const displayNodes = useMemo(() => spreadSameCityNodes(nodes), [nodes]);

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
        zoomControl: true,
        attributionControl: true,
        wheelPxPerZoomLevel: 90
      }).setView([25, 10], 2);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const heatByMarker = new WeakMap<Marker, { heat: number; color: string }>();

      const cluster: MarkerClusterGroup = L.markerClusterGroup({
        disableClusteringAtZoom: 15,
        maxClusterRadius: (zoom) => (zoom >= 12 ? 18 : zoom >= 7 ? 34 : 52),
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        spiderfyDistanceMultiplier: 1.35,
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
            iconSize: L.point(42, 42)
          });
        }
      });

      const markersBySlug = new Map<string, Marker>();
      for (const n of displayNodes) {
        const marker = L.marker([n.displayLat, n.displayLng], {
          icon: L.divIcon({
            className: "bci-pin",
            html: pinSvg(n.heatColor),
            iconSize: [30, 42],
            iconAnchor: [15, 40],
            popupAnchor: [0, -36]
          })
        });
        marker.bindPopup(popupHtml(n), { className: "bci-popup" });
        marker.on("popupopen", () => setSelected(n.slug));
        heatByMarker.set(marker, { heat: n.heat, color: n.heatColor });
        markersBySlug.set(n.slug, marker);
        cluster.addLayer(marker);
      }
      map.addLayer(cluster);

      const bounds = cluster.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.2), { maxZoom: 5 });

      apiRef.current = {
        reveal: (slug) => {
          const marker = markersBySlug.get(slug);
          if (!marker || !map) return;
          setSelected(slug);
          cluster.zoomToShowLayer(marker, () => marker.openPopup());
        }
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
    <div className="map-layout">
      <style>{leafletStyles}</style>
      <div className="section" style={{ gap: 14 }}>
        <div className="map-wrap leaflet-frame">
          <div ref={containerRef} className="leaflet-map" />
        </div>
        <div className="map-legend">
          <span>Marker and cluster heat = program activity:</span>
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
        <p className="muted-copy" style={{ fontSize: 12.5 }}>
          Scroll or pinch to zoom, drag to pan. Click numbered circles to drill into dense regions; same-city programs
          separate at high zoom so each pin can be selected.
        </p>
      </div>

      <aside className="map-side">
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
        </div>
      </aside>
    </div>
  );
}
