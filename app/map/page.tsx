import type { Metadata } from "next";
import { WorldMap } from "@/components/WorldMap";
import { companiesByActivity, getCompanyStats, mapNodes } from "@/data/queries";

export const metadata: Metadata = {
  title: "World map · NextBCI",
  description: "Interactive world map of brain-computer interface programs, colored by current activity."
};

export default function MapPage() {
  const countries = new Set(mapNodes.map((n) => n.country)).size;
  const veryActive = mapNodes.filter((n) => n.heat >= 0.75).length;

  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Global map</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>The BCI world map</h1>
        <p className="lede" style={{ maxWidth: "60ch", marginTop: 14 }}>
          Every tracked program plotted at its home base. Marker color reflects how much clinical and research
          activity each program is showing right now — select a node to open its profile.
        </p>
      </section>

      <section className="stat-strip">
        <div className="stat">
          <b>{mapNodes.length}</b>
          <span>mapped programs</span>
        </div>
        <div className="stat">
          <b>{countries}</b>
          <span>countries</span>
        </div>
        <div className="stat">
          <b>{veryActive}</b>
          <span>very active programs</span>
        </div>
        <div className="stat">
          <b>{companiesByActivity.filter((c) => getCompanyStats(c.slug).upcoming > 0).length}</b>
          <span>with upcoming checkpoints</span>
        </div>
      </section>

      <WorldMap nodes={mapNodes} />
    </div>
  );
}
