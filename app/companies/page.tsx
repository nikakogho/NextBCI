import type { Metadata } from "next";
import { ProgramExplorer } from "@/components/ProgramExplorer";
import { programRows } from "@/data/queries";

export const metadata: Metadata = {
  title: "Programs · NextBCI",
  description:
    "A searchable directory of companies and academic labs building brain-computer interfaces worldwide, filterable by approach and region."
};

export default function CompaniesPage() {
  const total = programRows.length;
  const countries = new Set(programRows.map((p) => p.country)).size;

  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Program directory</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>Who is building the neural frontier</h1>
        <p className="lede" style={{ maxWidth: "64ch", marginTop: 14 }}>
          {total} companies and academic programs across {countries} countries, each with a real, sourced BCI evidence
          surface. Search or filter by approach and region, and open any program for its full history.
        </p>
      </section>

      <ProgramExplorer programs={programRows} />
    </div>
  );
}
