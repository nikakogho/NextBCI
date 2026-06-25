import type { SourceLink } from "@/data/schema";

export function SourceLinks({ sources }: { sources: SourceLink[] }) {
  if (sources.length === 0) {
    return <p className="muted-copy text-sm">No source links attached yet.</p>;
  }

  return (
    <ul className="source-list">
      {sources.map((source) => (
        <li key={`${source.url}-${source.title}`}>
          <a className="source-link" href={source.url} target="_blank" rel="noreferrer">
            <span>{source.title}</span>
            <span className="shrink-0 text-[0.68rem] uppercase text-stone-500">
              {source.isSample ? "sample" : source.isPrimary ? "primary" : source.sourceType}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
