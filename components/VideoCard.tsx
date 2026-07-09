import type { VideoLink } from "@/data/schema";

function youTubeId(url: string): string | null {
  const patterns = [/[?&]v=([\w-]{11})/, /youtu\.be\/([\w-]{11})/, /\/(?:embed|shorts)\/([\w-]{11})/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function VideoCard({ video }: { video: VideoLink }) {
  const id = youTubeId(video.url);
  const thumb = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;

  return (
    <a className="video-card" href={video.url} target="_blank" rel="noreferrer">
      <span className="video-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {thumb ? <img src={thumb} alt="" loading="lazy" /> : null}
        <span className="video-play">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="video-meta">
        <span className="video-kicker">Featured interview</span>
        <span className="video-title">{video.title}</span>
        <span className="video-host">Watch on YouTube ↗</span>
      </span>
    </a>
  );
}
