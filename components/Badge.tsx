import {
  demoClassificationLabels,
  evidenceLevels,
  milestoneTypeLabels,
  type Confidence,
  type DemoClassification,
  type EvidenceLevel,
  type MilestoneType
} from "@/data/schema";

const evidenceTone: Record<EvidenceLevel, string> = {
  E0: "border-red-300 bg-red-50 text-red-800",
  E1: "border-amber-300 bg-amber-50 text-amber-800",
  E2: "border-cyan-300 bg-cyan-50 text-cyan-900",
  E3: "border-teal-300 bg-teal-50 text-teal-900",
  E4: "border-emerald-300 bg-emerald-50 text-emerald-900",
  E5: "border-lime-300 bg-lime-50 text-lime-900",
  E6: "border-stone-400 bg-stone-100 text-stone-950"
};

const confidenceTone: Record<Confidence, string> = {
  low: "border-red-300 bg-red-50 text-red-800",
  medium: "border-amber-300 bg-amber-50 text-amber-800",
  high: "border-emerald-300 bg-emerald-50 text-emerald-900"
};

const milestoneTone: Record<MilestoneType, string> = {
  "trial-opened": "border-teal-300 bg-teal-50 text-teal-900",
  "trial-site-added": "border-teal-300 bg-teal-50 text-teal-900",
  "first-implant": "border-emerald-300 bg-emerald-50 text-emerald-900",
  "additional-implant": "border-emerald-300 bg-emerald-50 text-emerald-900",
  "demo-released": "border-cyan-300 bg-cyan-50 text-cyan-900",
  "paper-published": "border-lime-300 bg-lime-50 text-lime-900",
  "regulatory-designation": "border-violet-300 bg-violet-50 text-violet-900",
  "funding-round": "border-stone-300 bg-stone-50 text-stone-800",
  "product-update": "border-stone-300 bg-stone-50 text-stone-800",
  "conference-talk": "border-sky-300 bg-sky-50 text-sky-900",
  "endpoint-readout": "border-orange-300 bg-orange-50 text-orange-900",
  "safety-update": "border-red-300 bg-red-50 text-red-800",
  "approval-clearance": "border-zinc-400 bg-zinc-100 text-zinc-950",
  "commercial-deployment": "border-zinc-400 bg-zinc-100 text-zinc-950"
};

export function Badge({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded border px-2 py-1 text-xs font-extrabold uppercase leading-none ${className}`}
    >
      {children}
    </span>
  );
}

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return (
    <Badge className={evidenceTone[level]}>{level} - {evidenceLevels[level].shortLabel}</Badge>
  );
}

export function MilestoneTypeBadge({ type }: { type: MilestoneType }) {
  return <Badge className={milestoneTone[type]}>{milestoneTypeLabels[type]}</Badge>;
}

export function DemoClassificationBadge({ classification }: { classification: DemoClassification }) {
  return (
    <Badge className="border-cyan-300 bg-cyan-50 text-cyan-900">
      {demoClassificationLabels[classification]}
    </Badge>
  );
}

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return <Badge className={confidenceTone[confidence]}>{confidence} confidence</Badge>;
}

export function SampleBadge() {
  return <Badge className="border-stone-300 bg-white text-stone-700">Sample data</Badge>;
}
