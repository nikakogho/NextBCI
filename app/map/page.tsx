import type { Metadata } from "next";
import { LazyLeafletMap } from "@/components/LazyLeafletMap";

export const metadata: Metadata = {
  title: "World map - NextBCI",
  description: "Interactive world map of BCI companies and university research programs, colored by current activity."
};

export default function MapPage() {
  return (
    <div className="map-page-shell">
      <LazyLeafletMap />
    </div>
  );
}
