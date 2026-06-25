import Link from "next/link";
import type { Company } from "@/data/schema";
import { EvidenceBadge, SampleBadge } from "./Badge";
import { SourceLinks } from "./SourceLinks";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="data-card">
      <div className="data-card-inner">
        <div className="meta-row">
          <EvidenceBadge level={company.evidenceLevel} />
          {company.isSample ? <SampleBadge /> : null}
        </div>
        <div>
          <Link className="text-xl font-black leading-tight hover:text-teal-800" href={`/companies/${company.slug}`}>
            {company.name}
          </Link>
          <p className="mt-2 text-sm font-bold text-stone-600">{company.stage}</p>
        </div>
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-black uppercase text-stone-500">Modality</dt>
            <dd className="mt-1">{company.modality}</dd>
          </div>
          <div>
            <dt className="font-black uppercase text-stone-500">Target function</dt>
            <dd className="mt-1">{company.targetFunction}</dd>
          </div>
        </dl>
        <p className="muted-copy text-sm">{company.summary}</p>
        <SourceLinks sources={company.sourceLinks} />
      </div>
    </article>
  );
}
