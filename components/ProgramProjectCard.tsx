import { EvidenceBadge } from "@/components/Badge";
import { SourceList } from "@/components/SourceList";
import type { ProgramProject } from "@/data/schema";

export function ProgramProjectCard({ project }: { project: ProgramProject }) {
  return (
    <article className="tile project-track">
      <div className="project-track-head">
        <div>
          <p className="eyebrow">Project track</p>
          <h3>{project.name}</h3>
        </div>
        <EvidenceBadge level={project.evidenceLevel} />
      </div>

      <div className="meta-row">
        <span className="badge type-badge">{project.statusLabel}</span>
        <span className="tl-date">{project.latestUpdateLabel}</span>
      </div>

      <p className="muted-copy" style={{ fontSize: 13.5 }}>{project.summary}</p>

      <dl className="kv project-track-kv">
        <dt>Focus</dt>
        <dd>{project.focus}</dd>
        <dt>Modality</dt>
        <dd>{project.modality}</dd>
      </dl>

      <div className="project-proof-grid">
        <div className="project-proof">
          <span>Demonstrated</span>
          <p>{project.demonstrated}</p>
        </div>
        <div className="project-proof project-proof-gap">
          <span>Not yet shown</span>
          <p>{project.notYetShown}</p>
        </div>
      </div>

      <div className="tile-foot">
        <SourceList sources={project.sourceLinks} />
      </div>
    </article>
  );
}
