import type { Metadata } from "next";
import { LeafletMap } from "@/components/LeafletMap";
import { mapNodes } from "@/data/queries";

export const metadata: Metadata = {
  title: "World map - NextBCI",
  description: "Interactive world map of BCI companies and university research programs, colored by current activity."
};

export default function MapPage() {
  return (
    <div className="map-page-shell">
      <LeafletMap nodes={mapNodes} />
    </div>
  );
}
