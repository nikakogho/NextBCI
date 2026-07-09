"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import type { Map as LMap, Marker } from "leaflet";
import type { MarkerClusterGroup } from "leaflet";
import type { MapNode } from "@/components/WorldMap";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

function pinSvg(color: string): string {
  return `<svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.3 0 0 6.3 0 14c0 9.9 14 24 14 24s14-14.1 14-24C28 6.3 21.7 0 14 0z"
      fill="${color}" stroke="rgba(0,0,0,.45)" stroke-width="1.2"/>
    <circle cx="14" cy="14" r="5.2" fill="#0b0f16"/>
  </svg>`;
}

function popupHtml(n: MapNode): string {
  const kind = n.kind === "academic" ? "Academic" : "Company";
  return `<div class="map-popup">
    <div class="mp-kind" style="color:${n.heatColor}">${kind} · ${escapeHtml(n.heatLabel)}</div>
    <div class="mp-name">${escapeHtml(n.name)}</div>
    <div class="mp-loc">${escapeHtml(n.city)}, ${escapeHtml(n.country)}</div>
    <div class="mp-stats">${n.stats.milestones} milestones · ${n.stats.trials} trials · ${n.stats.demos} demos</div>
    <a class="mp-link" href="/companies/${n.slug}">View program →</a>
  </div>`;
}

interface MapApi {
  reveal: (slug: string) => void;
}

export function LeafletMap({ nodes }: { nodes: MapNode[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<MapApi | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const sorted = useMemo(() => [...nodes].sort((a, b) => b.heat - a.heat), [nodes]);

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
        maxZoom: 18,
        zoomControl: true,
        attributionControl: true
      }).setView([25, 10], 2);

      L.tileLayer("https://{s}.basemap.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      const heatByMarker = new WeakMap<Marker, { heat: number; color: string }>();

      const cluster: MarkerClusterGroup = L.markerClusterGroup({
        maxClusterRadius: 44,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: (c) => {
          const children = c.getAllChildMarkers();
          let hottest = { heat: -1, color: "#5f7d99" };
          for (const child of children) {
            const info = heatByMarker.get(child as Marker);
            if (info && info.heat > hottest.heat) hottest = info;
          }
          return L.divIcon({
            html: `<div class="bci-cluster" style="border-color:${hottest.color};color:${hottest.color}"><span>${c.getChildCount()}</span></div>`,
            className: "bci-cluster-wrap",
            iconSize: L.point(40, 40)
          });
        }
      });

      const markersBySlug = new Map<string, Marker>();
      for (const n of nodes) {
        const marker = L.marker([n.lat, n.lng], {
          icon: L.divIcon({
            className: "bci-pin",
            html: pinSvg(n.heatColor),
            iconSize: [28, 38],
            iconAnchor: [14, 38],
            popupAnchor: [0, -34]
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
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.25));

      apiRef.current = {
        reveal: (slug) => {
          const marker = markersBySlug.get(slug);
          if (!marker || !map) return;
          setSelected(slug);
          cluster.zoomToShowLayer(marker, () => marker.openPopup());
        }
      };

      // Ensure correct sizing once laid out.
      setTimeout(() => map?.invalidateSize(), 120);
    })();

    return () => {
      cancelled = true;
      apiRef.current = null;
      if (map) map.remove();
    };
  }, [nodes]);

  return (
    <div className="map-layout">
      <div className="section" style={{ gap: 14 }}>
        <div className="map-wrap">
          <div ref={containerRef} className="leaflet-map" />
        </div>
        <div className="map-legend">
          <span>Marker &amp; cluster heat = program activity:</span>
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
          Scroll or pinch to zoom, drag to pan. Numbered circles are clusters — click one to zoom in, and where several
          programs share a city they fan out so you can pick each.
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
