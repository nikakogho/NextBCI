export const evidenceLevels = {
  E0: {
    label: "Rumor / unverified claim",
    shortLabel: "Unverified",
    description: "Public claim with no durable source or independent evidence."
  },
  E1: {
    label: "Company announcement",
    shortLabel: "Announcement",
    description: "Company, lab, or sponsor statement with limited external verification."
  },
  E2: {
    label: "Public demo",
    shortLabel: "Demo",
    description: "A visible demo or talk, with capability separated from interpretation."
  },
  E3: {
    label: "Registered clinical trial",
    shortLabel: "Trial",
    description: "A trial registration, protocol page, or equivalent clinical registry entry."
  },
  E4: {
    label: "Peer-reviewed human result",
    shortLabel: "Peer reviewed",
    description: "Human results published in a peer-reviewed venue."
  },
  E5: {
    label: "Replicated / multi-patient / long-duration result",
    shortLabel: "Durable result",
    description: "Evidence across people, sites, time, or replicated protocols."
  },
  E6: {
    label: "Approved commercial medical use",
    shortLabel: "Approved use",
    description: "Approved or cleared commercial medical deployment."
  }
} as const;

export type EvidenceLevel = keyof typeof evidenceLevels;

export const milestoneTypeLabels = {
  "trial-opened": "Trial opened",
  "trial-site-added": "Trial site added",
  "first-implant": "First implant",
  "additional-implant": "Additional implant",
  "demo-released": "Demo released",
  "paper-published": "Paper published",
  "regulatory-designation": "Regulatory designation",
  "funding-round": "Funding round",
  "product-update": "Product update",
  "conference-talk": "Conference talk",
  "endpoint-readout": "Endpoint readout",
  "safety-update": "Safety update",
  "approval-clearance": "Approval / clearance",
  "commercial-deployment": "Commercial deployment"
} as const;

export type MilestoneType = keyof typeof milestoneTypeLabels;

export const demoClassificationLabels = {
  "actual-patient-use": "Actual patient use",
  "animal-demo": "Animal demo",
  "lab-demo": "Lab demo",
  "concept-animation": "Concept animation",
  "investor-product-demo": "Investor / product demo",
  "conference-talk": "Conference talk",
  "press-interview": "Press interview"
} as const;

export type DemoClassification = keyof typeof demoClassificationLabels;

export type Confidence = "low" | "medium" | "high";

export type MilestoneStatus = "confirmed" | "upcoming";

export type SourceType =
  | "trial-registry"
  | "paper"
  | "company-update"
  | "regulatory-page"
  | "conference-page"
  | "demo-video"
  | "placeholder";

export interface SourceLink {
  title: string;
  url: string;
  publisher: string;
  sourceType: SourceType;
  isPrimary?: boolean;
  isSample?: boolean;
}

export interface Company {
  slug: string;
  name: string;
  modality: string;
  targetFunction: string;
  stage: string;
  evidenceLevel: EvidenceLevel;
  summary: string;
  hypeCheck: string;
  sourceLinks: SourceLink[];
  isSample: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  companySlug: string;
  dateLabel: string;
  sortDate: string;
  status: MilestoneStatus;
  type: MilestoneType;
  evidenceLevel: EvidenceLevel;
  confidence: Confidence;
  summary: string;
  whyItMatters: string;
  hypeCheck: string;
  sourceLinks: SourceLink[];
  isSample: boolean;
}

export interface Trial {
  id: string;
  title: string;
  companySlug: string;
  status: string;
  condition: string;
  targetFunction: string;
  deviceProduct: string;
  locations: string[];
  endpoints: string[];
  evidenceLevel: EvidenceLevel;
  sourceLinks: SourceLink[];
  isSample: boolean;
}

export interface Demo {
  id: string;
  title: string;
  companySlug: string;
  dateLabel: string;
  sortDate: string;
  classification: DemoClassification;
  evidenceLevel: EvidenceLevel;
  setting: string;
  summary: string;
  hypeCheck: string;
  sourceLinks: SourceLink[];
  isSample: boolean;
}

export interface Paper {
  id: string;
  title: string;
  companySlug: string;
  dateLabel: string;
  sortDate: string;
  evidenceLevel: EvidenceLevel;
  summary: string;
  sourceLinks: SourceLink[];
  isSample: boolean;
}
