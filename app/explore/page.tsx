import type { Metadata } from "next";
import { ProgramExplorer } from "@/components/ProgramExplorer";
import { programRows } from "@/data/queries";

export const metadata: Metadata = {
  title: "Explore · NextBCI",
  description:
    "Explore companies and university research programs by invasiveness, region, device class, organization profile, and readiness."
};

export default function ExplorePage() {
  const countries = new Set(programRows.map((program) => program.country)).size;
  const universities = programRows.filter((program) => program.kind === "academic").length;

  return (
    <div className="page-shell page-stack">
      <section className="explore-intro">
        <p className="eyebrow">Explore the field</p>
        <h1>Organizations, university research, and the tools between them.</h1>
        <p className="lede">
          Search the tracker through its technical shape: who is doing the work, where it is happening, which signals or
          devices are involved, and how far each program has moved toward use.
        </p>
        <p className="explore-coverage">{programRows.length} tracked organizations · {universities} university research programs · {countries} countries</p>
      </section>

      <ProgramExplorer programs={programRows} />
    </div>
  );
}
