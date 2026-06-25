import type { Company, Demo, Milestone, Paper, SourceLink, Trial } from "./schema";

const sampleSource = (
  title: string,
  sourceType: SourceLink["sourceType"],
  path: string,
  publisher = "Sample source placeholder"
): SourceLink => ({
  title,
  url: `https://example.com/nextbci/${path}`,
  publisher,
  sourceType,
  isPrimary: sourceType !== "placeholder",
  isSample: true
});

export const companies: Company[] = [
  {
    slug: "northstar-neuro-systems",
    name: "Northstar Neuro Systems",
    modality: "Implantable cortical microelectrode array",
    targetFunction: "Communication cursor control",
    stage: "Early feasibility study setup",
    evidenceLevel: "E3",
    summary:
      "Sample profile for a clinical-stage implant program focused on restoring point-and-click communication.",
    hypeCheck:
      "This sample should not be read as a real company claim. Replace with registry and sponsor sources before treating as factual.",
    sourceLinks: [
      sampleSource("Sample clinical registry record", "trial-registry", "northstar-trial"),
      sampleSource("Sample sponsor protocol update", "company-update", "northstar-protocol")
    ],
    isSample: true
  },
  {
    slug: "signal-bridge-lab",
    name: "Signal Bridge Lab",
    modality: "Implanted ECoG speech interface",
    targetFunction: "Attempted speech decoding",
    stage: "Human research prototype",
    evidenceLevel: "E4",
    summary:
      "Sample academic lab entry for a human speech-restoration BCI program with peer-reviewed style evidence.",
    hypeCheck:
      "The displayed sample separates a measured decoding task from broader claims about everyday speech restoration.",
    sourceLinks: [
      sampleSource("Sample peer-reviewed human result", "paper", "signal-bridge-paper"),
      sampleSource("Sample conference session", "conference-page", "signal-bridge-conference")
    ],
    isSample: true
  },
  {
    slug: "reach-cortex-program",
    name: "Reach Cortex Program",
    modality: "Implanted motor cortex interface",
    targetFunction: "Robotic arm reach and grasp",
    stage: "Multi-participant translational study",
    evidenceLevel: "E5",
    summary:
      "Sample translational program showing how durable, multi-participant assistive-control evidence could be represented.",
    hypeCheck:
      "Durable lab performance is not the same thing as an approved commercial assistive product.",
    sourceLinks: [
      sampleSource("Sample long-duration cohort paper", "paper", "reach-cortex-cohort"),
      sampleSource("Sample methods supplement", "paper", "reach-cortex-methods")
    ],
    isSample: true
  },
  {
    slug: "quiet-current-medical",
    name: "Quiet Current Medical",
    modality: "Implanted neural bridge",
    targetFunction: "Upper-limb assistive control",
    stage: "Preclinical to first-in-human planning",
    evidenceLevel: "E2",
    summary:
      "Sample preclinical-to-translational entry for an implantable neural bridge program.",
    hypeCheck:
      "A polished demo is not a clinical outcome. This record stays below clinical-trial evidence until a registry or human result exists.",
    sourceLinks: [
      sampleSource("Sample public demo video", "demo-video", "quiet-current-demo"),
      sampleSource("Sample regulatory briefing placeholder", "regulatory-page", "quiet-current-regulatory")
    ],
    isSample: true
  }
];

export const milestones: Milestone[] = [
  {
    id: "sample-2026-q4-speech-readout",
    title: "Endpoint readout window for speech decoding feasibility cohort",
    companySlug: "signal-bridge-lab",
    dateLabel: "Q4 2026",
    sortDate: "2026-10-01",
    status: "upcoming",
    type: "endpoint-readout",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "Sample upcoming milestone for a scheduled feasibility readout, pending registry and publication links.",
    whyItMatters:
      "Endpoint readouts are where demos start becoming measurable clinical evidence.",
    hypeCheck:
      "A readout window is not a result. The tracker should update only when the actual source appears.",
    sourceLinks: [sampleSource("Sample trial registry readout window", "trial-registry", "speech-readout-window")],
    isSample: true
  },
  {
    id: "sample-2026-08-first-implant",
    title: "First implant window for communication cursor cohort",
    companySlug: "northstar-neuro-systems",
    dateLabel: "Aug 2026",
    sortDate: "2026-08-01",
    status: "upcoming",
    type: "first-implant",
    evidenceLevel: "E3",
    confidence: "low",
    summary:
      "Sample expected first-implant milestone, included to test upcoming milestone rendering.",
    whyItMatters:
      "First implants move a program from planning into human execution, but they do not prove efficacy.",
    hypeCheck:
      "The milestone should remain tentative until an implant confirmation appears in a primary source.",
    sourceLinks: [sampleSource("Sample first-in-human trial listing", "trial-registry", "northstar-first-implant")],
    isSample: true
  },
  {
    id: "sample-2026-05-patient-demo",
    title: "Patient-use demo of assistive cursor control released",
    companySlug: "northstar-neuro-systems",
    dateLabel: "May 14, 2026",
    sortDate: "2026-05-14",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Sample public video record showing how a patient-use demo can be captured without treating it as a clinical endpoint.",
    whyItMatters:
      "Patient-use demos help identify demonstrated capability and usability constraints.",
    hypeCheck:
      "Video evidence can show a task, not general independence or long-term reliability.",
    sourceLinks: [sampleSource("Sample patient-use demo page", "demo-video", "northstar-patient-demo")],
    isSample: true
  },
  {
    id: "sample-2026-03-trial-opened",
    title: "Clinical trial opened for implantable communication interface",
    companySlug: "northstar-neuro-systems",
    dateLabel: "Mar 2, 2026",
    sortDate: "2026-03-02",
    status: "confirmed",
    type: "trial-opened",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "Sample clinical-trial opening milestone with a registry-style source placeholder.",
    whyItMatters:
      "A registered trial creates a public protocol surface and endpoint expectations.",
    hypeCheck:
      "Trial opening does not mean the device has shown benefit or received approval.",
    sourceLinks: [sampleSource("Sample registry entry", "trial-registry", "northstar-trial-opened")],
    isSample: true
  },
  {
    id: "sample-2025-11-human-paper",
    title: "Human speech interface paper published",
    companySlug: "signal-bridge-lab",
    dateLabel: "Nov 18, 2025",
    sortDate: "2025-11-18",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "Sample paper milestone for peer-reviewed human decoding results.",
    whyItMatters:
      "Peer review raises the evidence level and lets readers inspect methods and endpoints.",
    hypeCheck:
      "A controlled decoding task is narrower than spontaneous daily communication.",
    sourceLinks: [sampleSource("Sample journal article", "paper", "speech-interface-paper")],
    isSample: true
  },
  {
    id: "sample-2025-09-long-duration",
    title: "Long-duration robotic control results reported",
    companySlug: "reach-cortex-program",
    dateLabel: "Sep 6, 2025",
    sortDate: "2025-09-06",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E5",
    confidence: "high",
    summary:
      "Sample durable-result milestone for a multi-participant implanted motor-control study.",
    whyItMatters:
      "Long-duration, multi-participant results are closer to translational evidence than one-off demos.",
    hypeCheck:
      "Replication still does not imply product readiness or reimbursement.",
    sourceLinks: [sampleSource("Sample multi-participant study", "paper", "reach-cortex-long-duration")],
    isSample: true
  },
  {
    id: "sample-2025-07-regulatory",
    title: "Regulatory designation granted for neural bridge study",
    companySlug: "quiet-current-medical",
    dateLabel: "Jul 21, 2025",
    sortDate: "2025-07-21",
    status: "confirmed",
    type: "regulatory-designation",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Sample regulatory milestone showing where designation claims would sit until linked to a primary page.",
    whyItMatters:
      "Regulatory designations can affect study path and timelines.",
    hypeCheck:
      "A designation is not clearance, approval, or proof of clinical benefit.",
    sourceLinks: [sampleSource("Sample regulatory notice", "regulatory-page", "quiet-current-designation")],
    isSample: true
  }
];

export const trials: Trial[] = [
  {
    id: "sample-northstar-communication-efs",
    title: "Implantable Communication Interface Early Feasibility Study",
    companySlug: "northstar-neuro-systems",
    status: "Not yet recruiting",
    condition: "Severe motor impairment",
    targetFunction: "Cursor selection for communication",
    deviceProduct: "Sample cortical array and decoder stack",
    locations: ["Sample Hospital A", "Sample Rehabilitation Center B"],
    endpoints: ["Task success rate", "Daily-session tolerance", "Device-related adverse events"],
    evidenceLevel: "E3",
    sourceLinks: [sampleSource("Sample trial registry", "trial-registry", "northstar-efs-trial")],
    isSample: true
  },
  {
    id: "sample-signal-bridge-speech",
    title: "Attempted Speech Decoding Feasibility Protocol",
    companySlug: "signal-bridge-lab",
    status: "Recruiting",
    condition: "Loss of natural speech",
    targetFunction: "Decoded attempted speech",
    deviceProduct: "Sample implanted ECoG grid",
    locations: ["Sample University Medical Center"],
    endpoints: ["Word error rate", "Latency", "Participant burden"],
    evidenceLevel: "E3",
    sourceLinks: [sampleSource("Sample speech trial listing", "trial-registry", "signal-speech-trial")],
    isSample: true
  },
  {
    id: "sample-reach-cortex-arm",
    title: "Robotic Arm Control With Implanted Motor Cortex Signals",
    companySlug: "reach-cortex-program",
    status: "Active, not recruiting",
    condition: "Tetraplegia",
    targetFunction: "Reach, grasp, and release",
    deviceProduct: "Sample intracortical motor interface",
    locations: ["Sample Translational Neuroscience Site"],
    endpoints: ["Command accuracy", "Session duration", "Assistance required"],
    evidenceLevel: "E5",
    sourceLinks: [sampleSource("Sample long-duration protocol", "trial-registry", "reach-cortex-trial")],
    isSample: true
  },
  {
    id: "sample-quiet-current-bridge",
    title: "Neural Bridge First-in-Human Planning Record",
    companySlug: "quiet-current-medical",
    status: "Planning",
    condition: "Upper-limb motor impairment",
    targetFunction: "Assistive upper-limb control",
    deviceProduct: "Sample implanted neural bridge",
    locations: ["To be sourced"],
    endpoints: ["Safety feasibility", "Signal stability", "Functional task completion"],
    evidenceLevel: "E2",
    sourceLinks: [sampleSource("Sample planning source", "company-update", "quiet-current-planning")],
    isSample: true
  }
];

export const demos: Demo[] = [
  {
    id: "sample-northstar-patient-use",
    title: "Assisted cursor use in a home-like communication task",
    companySlug: "northstar-neuro-systems",
    dateLabel: "May 14, 2026",
    sortDate: "2026-05-14",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "Edited patient-use video",
    summary:
      "Sample demo record for an implanted participant selecting phrases with a cursor interface.",
    hypeCheck:
      "The demo does not establish speed, reliability, adverse-event profile, or independent daily use.",
    sourceLinks: [sampleSource("Sample edited demo video", "demo-video", "northstar-demo-video")],
    isSample: true
  },
  {
    id: "sample-signal-conference",
    title: "Conference talk with attempted speech decoding clips",
    companySlug: "signal-bridge-lab",
    dateLabel: "Apr 9, 2026",
    sortDate: "2026-04-09",
    classification: "conference-talk",
    evidenceLevel: "E2",
    setting: "Conference presentation",
    summary:
      "Sample conference demo record with short clips and endpoint context.",
    hypeCheck:
      "Conference clips can be selective; the tracker should link to papers or protocols when available.",
    sourceLinks: [sampleSource("Sample conference program", "conference-page", "signal-conference-talk")],
    isSample: true
  },
  {
    id: "sample-quiet-current-animal",
    title: "Preclinical neural bridge task demonstration",
    companySlug: "quiet-current-medical",
    dateLabel: "Jan 22, 2026",
    sortDate: "2026-01-22",
    classification: "animal-demo",
    evidenceLevel: "E2",
    setting: "Preclinical lab demo",
    summary:
      "Sample animal-demo record for a closed-loop neural bridge task.",
    hypeCheck:
      "Animal performance is not human clinical evidence.",
    sourceLinks: [sampleSource("Sample preclinical demo", "demo-video", "quiet-current-animal-demo")],
    isSample: true
  },
  {
    id: "sample-reach-lab-demo",
    title: "Robotic grasp calibration session",
    companySlug: "reach-cortex-program",
    dateLabel: "Oct 3, 2025",
    sortDate: "2025-10-03",
    classification: "lab-demo",
    evidenceLevel: "E2",
    setting: "Controlled lab session",
    summary:
      "Sample lab demo showing a calibrated reach-and-grasp task under supervised conditions.",
    hypeCheck:
      "Lab calibration success should not be presented as unsupervised home use.",
    sourceLinks: [sampleSource("Sample lab demo page", "demo-video", "reach-lab-demo")],
    isSample: true
  },
  {
    id: "sample-product-animation",
    title: "Concept animation for a future wearable controller",
    companySlug: "quiet-current-medical",
    dateLabel: "Jun 12, 2025",
    sortDate: "2025-06-12",
    classification: "concept-animation",
    evidenceLevel: "E0",
    setting: "Product concept animation",
    summary:
      "Sample concept-animation record, included to make hype separation visible.",
    hypeCheck:
      "Concept animation is not evidence that a device works in people.",
    sourceLinks: [sampleSource("Sample concept page", "placeholder", "concept-animation")],
    isSample: true
  }
];

export const papers: Paper[] = [
  {
    id: "sample-signal-human-paper",
    title: "Sample peer-reviewed human speech decoding result",
    companySlug: "signal-bridge-lab",
    dateLabel: "Nov 18, 2025",
    sortDate: "2025-11-18",
    evidenceLevel: "E4",
    summary:
      "Sample paper entry for method, endpoints, and measured human decoding performance.",
    sourceLinks: [sampleSource("Sample journal article", "paper", "signal-human-paper")],
    isSample: true
  },
  {
    id: "sample-reach-duration-paper",
    title: "Sample long-duration implanted motor-control cohort",
    companySlug: "reach-cortex-program",
    dateLabel: "Sep 6, 2025",
    sortDate: "2025-09-06",
    evidenceLevel: "E5",
    summary:
      "Sample paper entry for multi-participant and long-duration assistive-control evidence.",
    sourceLinks: [sampleSource("Sample cohort paper", "paper", "reach-duration-paper")],
    isSample: true
  },
  {
    id: "sample-northstar-methods",
    title: "Sample communication cursor decoding methods preprint",
    companySlug: "northstar-neuro-systems",
    dateLabel: "Feb 10, 2026",
    sortDate: "2026-02-10",
    evidenceLevel: "E1",
    summary:
      "Sample methods record that would need peer review before moving above announcement-level evidence.",
    sourceLinks: [sampleSource("Sample methods page", "company-update", "northstar-methods")],
    isSample: true
  }
];
