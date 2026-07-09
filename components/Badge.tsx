import {
  demoClassificationLabels,
  evidenceLevels,
  milestoneTypeLabels,
  type Confidence,
  type DemoClassification,
  type EvidenceLevel,
  type MilestoneType
} from "@/data/schema";

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return (
    <span className={`badge ev ev-${level}`} title={evidenceLevels[level].label}>
      {level} · {evidenceLevels[level].shortLabel}
    </span>
  );
}

export function MilestoneTypeBadge({ type }: { type: MilestoneType }) {
  return <span className="badge type-badge">{milestoneTypeLabels[type]}</span>;
}

export function DemoClassificationBadge({ classification }: { classification: DemoClassification }) {
  return <span className="badge type-badge">{demoClassificationLabels[classification]}</span>;
}

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return <span className={`badge conf-${confidence}`}>{confidence} confidence</span>;
}

export function SampleBadge() {
  return <span className="badge type-badge">Sample data</span>;
}

export function StatusChip({ status }: { status: "confirmed" | "upcoming" }) {
  return (
    <span className={`status-chip ${status}`}>
      <span className="dot" />
      {status}
    </span>
  );
}
