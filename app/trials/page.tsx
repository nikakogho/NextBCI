import Link from "next/link";
import { EvidenceBadge, SampleBadge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { SampleNotice } from "@/components/SampleNotice";
import { SourceLinks } from "@/components/SourceLinks";
import { getCompanyName, trials } from "@/data/queries";

export default function TrialsPage() {
  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow="Trial tracker"
        title="Clinical and translational trial surface"
        description="Status, condition, target function, device or product, locations, endpoints, and sources for tracked BCI studies."
      />
      <SampleNotice />
      <section className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Status</th>
              <th>Condition</th>
              <th>Target function</th>
              <th>Device / product</th>
              <th>Locations</th>
              <th>Endpoints</th>
              <th>Sources</th>
            </tr>
          </thead>
          <tbody>
            {trials.map((trial) => (
              <tr key={trial.id}>
                <td>
                  <div className="grid gap-2">
                    <div className="meta-row">
                      <EvidenceBadge level={trial.evidenceLevel} />
                      {trial.isSample ? <SampleBadge /> : null}
                    </div>
                    <Link className="font-black hover:text-teal-800" href={`/companies/${trial.companySlug}`}>
                      {getCompanyName(trial.companySlug)}
                    </Link>
                    <span className="text-sm text-stone-600">{trial.title}</span>
                  </div>
                </td>
                <td>{trial.status}</td>
                <td>{trial.condition}</td>
                <td>{trial.targetFunction}</td>
                <td>{trial.deviceProduct}</td>
                <td>{trial.locations.join(", ")}</td>
                <td>
                  <ul className="list-disc pl-4">
                    {trial.endpoints.map((endpoint) => (
                      <li key={endpoint}>{endpoint}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <SourceLinks sources={trial.sourceLinks} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
