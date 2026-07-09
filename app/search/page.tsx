import type { Metadata } from "next";
import { SiteSearch } from "@/components/SiteSearch";
import { searchIndex } from "@/data/queries";

export const metadata: Metadata = {
  title: "Search · NextBCI",
  description: "Search every tracked BCI program, milestone, trial, demo, and paper."
};

export default function SearchPage() {
  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Search</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>Find anything in the tracker</h1>
        <p className="lede" style={{ maxWidth: "60ch", marginTop: 14 }}>
          Search across every program, milestone, trial, demo, and paper — like looking up a company or a mission and
          jumping straight to its details.
        </p>
      </section>
      <SiteSearch index={searchIndex} />
    </div>
  );
}
