import { notFound } from "next/navigation";
import { EvidenceBadge, SampleBadge } from "@/components/Badge";
import { MilestoneCard } from "@/components/MilestoneCard";
import { SourceLinks } from "@/components/SourceLinks";
import {
  companies,
  getCompany,
  getCompanyDemos,
  getCompanyMilestones,
  getCompanyPapers,
  getCompanyTrials
} from "@/data/queries";
import { demoClassificationLabels } from "@/data/schema";

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);

  if (!company) {
    notFound();
  }

  const milestones = getCompanyMilestones(company.slug);
  const companyTrials = getCompanyTrials(company.slug);
  const companyDemos = getCompanyDemos(company.slug);
  const companyPapers = getCompanyPapers(company.slug);

  return (
    <div className="page-shell page-stack">
      <header className="section">
        <div className="meta-row">
          <EvidenceBadge level={company.evidenceLevel} />
          {company.isSample ? <SampleBadge /> : null}
        </div>
        <p className="eyebrow">{company.stage}</p>
        <h1 className="page-title">{company.name}</h1>
        <p className="lede">{company.summary}</p>
      </header>

      <section className="tracker-grid">
        <article className="data-card">
          <div className="data-card-inner">
            <h2 className="text-2xl font-black">Program summary</h2>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="font-black uppercase text-stone-500">Modality</dt>
                <dd className="mt-1">{company.modality}</dd>
              </div>
              <div>
                <dt className="font-black uppercase text-stone-500">Target function</dt>
                <dd className="mt-1">{company.targetFunction}</dd>
              </div>
              <div>
                <dt className="font-black uppercase text-stone-500">Hype check</dt>
                <dd className="mt-1 leading-6">{company.hypeCheck}</dd>
              </div>
            </dl>
          </div>
        </article>
        <article className="data-card">
          <div className="data-card-inner">
            <h2 className="text-2xl font-black">Primary source surface</h2>
            <SourceLinks sources={company.sourceLinks} />
          </div>
        </article>
      </section>

      <section className="section">
        <div>
          <p className="eyebrow">Milestone timeline</p>
          <h2 className="text-3xl font-black">Evidence changes</h2>
        </div>
        <div className="timeline">
          {milestones.map((milestone) => (
            <div className="timeline-item" key={milestone.id}>
              <div className="timeline-date">{milestone.dateLabel}</div>
              <MilestoneCard milestone={milestone} />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div>
          <p className="eyebrow">Related trials</p>
          <h2 className="text-3xl font-black">Trial tracker</h2>
        </div>
        <div className="card-grid">
          {companyTrials.map((trial) => (
            <article className="data-card" key={trial.id}>
              <div className="data-card-inner">
                <EvidenceBadge level={trial.evidenceLevel} />
                <h3 className="text-xl font-black">{trial.title}</h3>
                <p className="muted-copy text-sm">{trial.status} / {trial.condition}</p>
                <p className="text-sm leading-6">{trial.targetFunction}</p>
                <SourceLinks sources={trial.sourceLinks} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div>
          <p className="eyebrow">Related demos</p>
          <h2 className="text-3xl font-black">Capability clips and presentations</h2>
        </div>
        <div className="card-grid">
          {companyDemos.map((demo) => (
            <article className="data-card" key={demo.id}>
              <div className="data-card-inner">
                <EvidenceBadge level={demo.evidenceLevel} />
                <p className="eyebrow">{demo.dateLabel} / {demoClassificationLabels[demo.classification]}</p>
                <h3 className="text-xl font-black">{demo.title}</h3>
                <p className="muted-copy text-sm">{demo.summary}</p>
                <SourceLinks sources={demo.sourceLinks} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div>
          <p className="eyebrow">Papers and source links</p>
          <h2 className="text-3xl font-black">Published evidence surface</h2>
        </div>
        <div className="card-grid">
          {companyPapers.map((paper) => (
            <article className="data-card" key={paper.id}>
              <div className="data-card-inner">
                <EvidenceBadge level={paper.evidenceLevel} />
                <p className="eyebrow">{paper.dateLabel}</p>
                <h3 className="text-xl font-black">{paper.title}</h3>
                <p className="muted-copy text-sm">{paper.summary}</p>
                <SourceLinks sources={paper.sourceLinks} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
