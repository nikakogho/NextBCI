import type { SourceLink } from "@/data/schema";

const sourceTypeLabel: Record<SourceLink["sourceType"], string> = {
  "trial-registry": "Registry",
  paper: "Paper",
  "company-update": "Company",
  "regulatory-page": "Regulatory",
  "conference-page": "Conference",
  "news-report": "News",
  "demo-video": "Video",
  placeholder: "Placeholder"
};

export function SourceList({ sources }: { sources: SourceLink[] }) {
  if (sources.length === 0) {
    return <p className="muted-copy text-sm">No sources attached.</p>;
  }
  return (
    <div className="source-list">
      {sources.map((source) => (
        <a className="source-item" href={source.url} key={source.url} target="_blank" rel="noreferrer">
          <span>
            <span className="s-title">{source.title}</span>
            <br />
            <span className="s-pub">{source.publisher}</span>
          </span>
          <span className="source-type-tag">{sourceTypeLabel[source.sourceType]}</span>
        </a>
      ))}
    </div>
  );
}
