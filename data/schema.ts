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

export const companyCategories = {
  invasive: "Invasive",
  "minimally-invasive": "Minimally invasive",
  "non-invasive": "Non-invasive"
} as const;

export type CompanyCategory = keyof typeof companyCategories;

export const regions = {
  "north-america": "North America",
  europe: "Europe",
  asia: "Asia",
  "rest-of-world": "Rest of world"
} as const;

export type Region = keyof typeof regions;

export const organizationScales = {
  "university-research": "University research",
  "early-startup": "Early startup",
  "clinical-growth": "Clinical / growth company",
  "established-company": "Established company",
  "major-medtech": "Major medical-device company"
} as const;

export type OrganizationScale = keyof typeof organizationScales;

export const productReadiness = {
  "research-program": "Research program",
  "research-infrastructure": "Research infrastructure",
  preclinical: "Preclinical",
  "human-research": "Human research",
  "regulated-medical": "Regulated medical",
  "commercial-nonmedical": "Commercial / non-medical"
} as const;

export type ProductReadiness = keyof typeof productReadiness;

export const deviceTypes = {
  eeg: "EEG",
  meg: "MEG",
  mea: "MEA",
  ecog: "ECoG",
  intracortical: "Intracortical",
  endovascular: "Endovascular",
  fmri: "fMRI",
  fnirs: "fNIRS",
  ultrasound: "Ultrasound",
  "neural-probe": "Neural probe",
  tms: "TMS",
  tes: "tES / tDCS",
  dbs: "DBS",
  "peripheral-stimulation": "Peripheral stimulation",
  "spinal-stimulation": "Spinal stimulation",
  emg: "EMG",
  "eye-tracking": "Eye tracking",
  "optical-imaging": "Optical imaging",
  "rehab-robotics": "Rehab robotics"
} as const;

export type DeviceType = keyof typeof deviceTypes;

export type Confidence = "low" | "medium" | "high";

export type MilestoneStatus = "confirmed" | "upcoming";

export type SourceType =
  | "trial-registry"
  | "paper"
  | "company-update"
  | "institution-page"
  | "regulatory-page"
  | "conference-page"
  | "news-report"
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

export interface GeoPoint {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export interface VideoLink {
  title: string;
  url: string;
}

export interface Company {
  slug: string;
  name: string;
  kind: "company" | "academic";
  category: CompanyCategory;
  region: Region;
  modality: string;
  targetFunction: string;
  stage: string;
  evidenceLevel: EvidenceLevel;
  /** Normalized surface used by directory, search, and map filters. */
  deviceTypes?: DeviceType[];
  /** Organization maturity, deliberately not an unsupported valuation or employee-count claim. */
  organizationScale?: OrganizationScale;
  /** Translation/readiness state of the tracked program or product line. */
  readiness?: ProductReadiness;
  hq: GeoPoint;
  /** Year the program or company was founded/started. */
  founded?: number;
  /** Primary website URL. */
  website?: string;
  /** Short funding note, e.g. "$50M Series B (2024)". */
  funding?: string;
  /** Featured interview or talk video (e.g. a YouTube link). */
  interviewVideo?: VideoLink;
  summary: string;
  hypeCheck: string;
  sourceLinks: SourceLink[];
  isSample: boolean;
}

export type ResearchVerificationStatus =
  | "official-source-lead"
  | "catalog-city"
  | "country-only"
  | "not-verified";

export interface CompanyResearchLink {
  title: string;
  url: string;
  publisher: string;
}

export interface CompanyResearchProfile {
  companySlug: string;
  companyName: string;
  researchedOn: string;
  sourceProfileUrl: string;
  officialWebsite?: string;
  overview: string;
  founding: {
    year?: number;
    status: ResearchVerificationStatus;
    note: string;
    sourceUrl?: string;
  };
  headquarters: {
    status: ResearchVerificationStatus;
    display: string;
    note: string;
    sourceUrl?: string;
  };
  companyValue: {
    status: "company-reported" | "dynamic-public-value" | "not-publicly-disclosed" | "not-verified";
    label: string;
    note: string;
    sourceUrl?: string;
  };
  fundingStage: string;
  regulatoryStatus: string;
  reportedAccomplishments: Array<{
    note: string;
    sourceUrl: string;
    publisher: string;
    evidence: "company-reported";
  }>;
  papers: CompanyResearchLink[];
  videos: CompanyResearchLink[];
  notes: string;
}

export interface ProgramProject {
  id: string;
  companySlug: string;
  name: string;
  focus: string;
  modality: string;
  statusLabel: string;
  evidenceLevel: EvidenceLevel;
  latestUpdateLabel: string;
  sortDate: string;
  summary: string;
  demonstrated: string;
  notYetShown: string;
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
