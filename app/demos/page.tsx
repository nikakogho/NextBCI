import Link from "next/link";
import { DemoClassificationBadge, EvidenceBadge, SampleBadge } from "@/components/Badge";
import { PageHeader } from "@/components/PageHeader";
import { SampleNotice } from "@/components/SampleNotice";
import { SourceLinks } from "@/components/SourceLinks";
import { getYoutubeSource, WatchButton } from "@/components/SourceActions";
import { demos, getCompanyName } from "@/data/queries";

export default function DemosPage() {
  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow="Demo library"
        title="What was actually demonstrated?"
        description="Demo records are classified by setting so patient use, animal work, lab demos, concept animation, investor material, talks, and interviews are not mixed together."
      />
      <SampleNotice />
      <section className="card-grid">
        {demos.map((demo) => (
          <article className="data-card" key={demo.id}>
            <div className="data-card-inner">
              <div className="meta-row">
                <DemoClassificationBadge classification={demo.classification} />
                <EvidenceBadge level={demo.evidenceLevel} />
                {demo.isSample ? <SampleBadge /> : null}
              </div>
              <div>
                <p className="eyebrow">{demo.dateLabel} / {demo.setting}</p>
                <h2 className="mt-2 text-xl font-black leading-tight">{demo.title}</h2>
                <Link className="mt-2 inline-flex text-sm font-black text-teal-800" href={`/companies/${demo.companySlug}`}>
                  {getCompanyName(demo.companySlug)}
                </Link>
              </div>
              <p className="muted-copy text-sm">{demo.summary}</p>
              <div>
                <p className="text-xs font-black uppercase text-stone-500">Hype check</p>
                <p className="mt-1 text-sm leading-6">{demo.hypeCheck}</p>
              </div>
              {getYoutubeSource(demo.sourceLinks) ? (
                <div className="card-action-row">
                  <WatchButton source={getYoutubeSource(demo.sourceLinks)!} />
                </div>
              ) : null}
              <SourceLinks sources={demo.sourceLinks} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
