import type { Metadata } from "next";
import Link from "next/link";
import { DemoClassificationBadge, EvidenceBadge } from "@/components/Badge";
import { SourceList } from "@/components/SourceList";
import { demos, getCompanyName, getYoutubeSource } from "@/data/queries";

export const metadata: Metadata = {
  title: "Demos · NextBCI",
  description: "Brain-computer interface demos classified by setting, so patient use isn't mixed with concept animation."
};

const sorted = [...demos].sort((a, b) => b.sortDate.localeCompare(a.sortDate));

export default function DemosPage() {
  return (
    <div className="page-shell page-stack">
      <section>
        <p className="eyebrow">Demo library</p>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 10 }}>What was actually demonstrated</h1>
        <p className="lede" style={{ maxWidth: "62ch", marginTop: 14 }}>
          Every clip is classified by setting — actual patient use, lab work, animal demos, concept animation,
          investor material, talks — so capability never gets confused with marketing.
        </p>
      </section>

      <section className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
        {sorted.map((demo) => {
          const youtube = getYoutubeSource(demo.sourceLinks);
          return (
            <div className="tile" key={demo.id}>
              <div className="meta-row" style={{ justifyContent: "space-between" }}>
                <DemoClassificationBadge classification={demo.classification} />
                <EvidenceBadge level={demo.evidenceLevel} />
              </div>
              <span className="tl-date">
                {demo.dateLabel} · {getCompanyName(demo.companySlug)}
              </span>
              <h3 style={{ fontSize: "1.05rem" }}>{demo.title}</h3>
              <p className="muted-copy" style={{ fontSize: 13.5 }}>{demo.summary}</p>
              <p className="hype">{demo.hypeCheck}</p>
              <div className="tile-foot">
                <Link className="btn btn-ghost btn-sm" href={`/companies/${demo.companySlug}`}>
                  Program →
                </Link>
                {youtube ? (
                  <a className="btn btn-primary btn-sm" href={youtube.url} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                ) : null}
              </div>
              <SourceList sources={demo.sourceLinks} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
