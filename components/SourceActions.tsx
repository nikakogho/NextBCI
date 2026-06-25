import type { SourceLink } from "@/data/schema";

const isYoutubeSource = (source: SourceLink): boolean =>
  source.sourceType === "demo-video" && /(^|\/\/)(www\.)?(youtube\.com|youtu\.be)\//i.test(source.url);

export const getYoutubeSource = (sources: SourceLink[]): SourceLink | undefined =>
  sources.find((source) => isYoutubeSource(source));

export const getPrimarySource = (sources: SourceLink[]): SourceLink | undefined =>
  sources.find((source) => source.isPrimary) ?? sources[0];

export function WatchButton({ source }: { source: SourceLink }) {
  return (
    <a className="watch-button" href={source.url} target="_blank" rel="noreferrer">
      Watch
    </a>
  );
}

export function PrimarySourceButton({ source }: { source: SourceLink }) {
  return (
    <a className="primary-source-button" href={source.url} target="_blank" rel="noreferrer">
      Open source
    </a>
  );
}
