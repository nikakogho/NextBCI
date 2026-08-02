import type { Milestone } from "./schema";

// Ranked for the 2026-08-02 milestone audit. The order is intentional and is
// documented in docs/top-100-company-milestone-audit.md.
export const topCompanyMilestoneSlugs = [
  "neuralink-prime",
  "synchron-stentrode",
  "precision-layer-7",
  "paradromics-connexus",
  "blackrock-neurotech",
  "science-corp",
  "onward-arc-bci",
  "inbrain-neuroelectronics",
  "neuroxess",
  "brainco",
  "neucyber-beinao",
  "stairmed",
  "ability-wyss",
  "emotiv",
  "muse-interaxon",
  "neurosity-crown",
  "nudge",
  "tsinghua-neo",
  "medtronic-neuromodulation",
  "abbott-neuromodulation",
  "boston-scientific-neuromodulation",
  "neuropace-rns",
  "cochlear",
  "advanced-bionics",
  "med-el",
  "insightec",
  "brainsway",
  "livanova",
  "magventure",
  "magnus-medical",
  "nexstim",
  "flow-neuroscience",
  "sooma-medical",
  "neuronetics",
  "neuroelectrics",
  "gtec-medical-engineering",
  "openbci",
  "bitbrain",
  "ant-neuro",
  "brain-products",
  "kernel-flow",
  "neurable",
  "nextmind-snap-ar",
  "ctrl-labs",
  "cognixion",
  "comind",
  "cortec",
  "cortical-labs",
  "axoft",
  "bioinduction",
  "motif-neurotech",
  "amber-therapeutics",
  "aleva-neurotherapeutics",
  "inner-cosmos",
  "openwater-lifu",
  "setpoint-medical",
  "saluda-medical",
  "cala-health",
  "electrocore",
  "cefaly",
  "theranica",
  "neuspera",
  "nalu-medical",
  "mainstay-medical",
  "neuroone-medical",
  "neurovalens",
  "neurosteer",
  "uneeg-medical",
  "epiminder",
  "epitel",
  "ceribell",
  "brainscope",
  "braincheck",
  "beacon-biosignals",
  "empatica",
  "aural-analytics",
  "altoida",
  "cognoa",
  "cognito-therapeutics",
  "brainomix",
  "firefly-neuroscience",
  "cumulus-neuroscience",
  "rune-labs",
  "artiria-medical",
  "zeta-surgical",
  "brainlab",
  "cionic",
  "mindmaze",
  "cyberdyne-hal",
  "ottobock",
  "neurosky",
  "neurosoft-bioelectronics",
  "neurosigma",
  "nia-therapeutics",
  "carthera",
  "soterix-medical",
  "idun-technologies",
  "nextsense",
  "elemind",
  "apollo-neuro"
] as const;

type FdaRecord = {
  slug: string;
  device: string;
  date: string;
  dateLabel: string;
  submission: string;
  pathway: "510(k)" | "De Novo" | "PMA";
};

const fdaUrl = ({ submission, pathway }: FdaRecord) => pathway === "PMA"
  ? `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=${submission}`
  : pathway === "De Novo"
    ? `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?ID=${submission}`
    : `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${submission}`;

const fdaMilestone = (record: FdaRecord): Milestone => ({
  id: `${record.slug}-${record.submission.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  title: `${record.device} receives FDA ${record.pathway === "PMA" ? "approval" : record.pathway === "De Novo" ? "authorization" : "clearance"}`,
  companySlug: record.slug,
  dateLabel: record.dateLabel,
  sortDate: record.date,
  status: "confirmed",
  type: "approval-clearance",
  evidenceLevel: "E6",
  confidence: "high",
  summary: `The FDA database records a ${record.pathway} decision for ${record.device} under ${record.submission}.`,
  whyItMatters: "A regulator decision establishes a defined U.S. marketing authorization and is stronger evidence than a product announcement alone.",
  hypeCheck: "Authorization applies to the cleared or approved labeling; it does not establish superiority or outcomes outside that scope.",
  sourceLinks: [{
    title: `FDA ${record.pathway} record ${record.submission}`,
    url: fdaUrl(record),
    publisher: "U.S. Food and Drug Administration",
    sourceType: "regulatory-page",
    isPrimary: true
  }],
  isSample: false
});

type TrialRecord = {
  slug: string;
  nct: string;
  title: string;
  start: string;
  startLabel: string;
  registryStatus: string;
  startStatus?: "confirmed" | "upcoming";
  completion?: string;
  completionLabel?: string;
};

const trialMilestones = (record: TrialRecord): Milestone[] => {
  const sourceLinks: Milestone["sourceLinks"] = [{
    title: `${record.nct} study record`,
    url: `https://clinicaltrials.gov/study/${record.nct}`,
    publisher: "ClinicalTrials.gov",
    sourceType: "trial-registry",
    isPrimary: true
  }];
  const startStatus = record.startStatus ?? "confirmed";
  const milestones: Milestone[] = [{
    id: `${record.slug}-${record.nct.toLowerCase()}-opened`,
    title: `${record.title} ${startStatus === "upcoming" ? "is scheduled to open" : "opens"}`,
    companySlug: record.slug,
    dateLabel: record.startLabel,
    sortDate: record.start,
    status: startStatus,
    type: "trial-opened",
    evidenceLevel: "E3",
    confidence: "high",
    summary: `The registry lists ${record.startLabel} as the ${startStatus === "upcoming" ? "estimated" : "actual"} study start and currently marks the study ${record.registryStatus.toLowerCase().replaceAll("_", " ")}.`,
    whyItMatters: startStatus === "upcoming"
      ? "A sponsor-linked registry entry provides a concrete, dated plan for a defined human study with public endpoints."
      : "A sponsor-linked registry entry confirms that the program progressed into a defined human study with public endpoints.",
    hypeCheck: "A registered or completed study is not a positive result; outcomes must be assessed when results are posted or published.",
    sourceLinks,
    isSample: false
  }];
  if (record.completion && record.completionLabel) {
    milestones.push({
      id: `${record.slug}-${record.nct.toLowerCase()}-completion-window`,
      title: `${record.title} completion window listed`,
      companySlug: record.slug,
      dateLabel: `${record.completionLabel} (estimated)`,
      sortDate: record.completion,
      status: "upcoming",
      type: "endpoint-readout",
      evidenceLevel: "E3",
      confidence: "medium",
      summary: `The registry lists ${record.completionLabel} as the estimated study completion window.`,
      whyItMatters: "The completion window is a concrete watch point for later registry results, publications, or sponsor readouts.",
      hypeCheck: "Estimated registry dates can move and do not promise that results will be posted at completion.",
      sourceLinks,
      isSample: false
    });
  }
  return milestones;
};

const officialMilestone = (record: Omit<Milestone, "isSample">): Milestone => ({ ...record, isSample: false });

const fdaRecords: FdaRecord[] = [
  { slug: "medtronic-neuromodulation", device: "adaptive DBS for the Activa, Percept and SenSight systems", date: "2025-02-20", dateLabel: "Feb 20, 2025", submission: "P960009S478", pathway: "PMA" },
  { slug: "abbott-neuromodulation", device: "Brio deep-brain stimulation system", date: "2015-06-12", dateLabel: "Jun 12, 2015", submission: "P140009", pathway: "PMA" },
  { slug: "boston-scientific-neuromodulation", device: "Vercise deep-brain stimulation system", date: "2017-12-08", dateLabel: "Dec 8, 2017", submission: "P150031", pathway: "PMA" },
  { slug: "neuropace-rns", device: "NeuroPace RNS System", date: "2013-11-14", dateLabel: "Nov 14, 2013", submission: "P100026", pathway: "PMA" },
  { slug: "cochlear", device: "Osia 3 sound-processor system", date: "2026-07-10", dateLabel: "Jul 10, 2026", submission: "K260902", pathway: "510(k)" },
  { slug: "advanced-bionics", device: "Clarion multi-strategy cochlear implant", date: "1997-06-26", dateLabel: "Jun 26, 1997", submission: "P960058", pathway: "PMA" },
  { slug: "med-el", device: "COMBI 40+ cochlear implant system", date: "2001-08-20", dateLabel: "Aug 20, 2001", submission: "P000025", pathway: "PMA" },
  { slug: "insightec", device: "Exablate Neuro focused-ultrasound system", date: "2016-07-11", dateLabel: "Jul 11, 2016", submission: "P150038", pathway: "PMA" },
  { slug: "brainsway", device: "BrainsWay Deep TMS System", date: "2025-11-07", dateLabel: "Nov 7, 2025", submission: "K251391", pathway: "510(k)" },
  { slug: "livanova", device: "aura6000 hypoglossal-nerve stimulation system", date: "2026-03-18", dateLabel: "Mar 18, 2026", submission: "P250013", pathway: "PMA" },
  { slug: "magventure", device: "MagVenture TMS Therapy System", date: "2025-08-11", dateLabel: "Aug 11, 2025", submission: "K251125", pathway: "510(k)" },
  { slug: "magnus-medical", device: "Magnus Neuromodulation System with SAINT technology", date: "2022-09-01", dateLabel: "Sep 1, 2022", submission: "K220177", pathway: "510(k)" },
  { slug: "nexstim", device: "NBS 6 navigated brain-stimulation system", date: "2026-03-20", dateLabel: "Mar 20, 2026", submission: "K252358", pathway: "510(k)" },
  { slug: "flow-neuroscience", device: "Flow FL-100 tDCS system", date: "2025-12-08", dateLabel: "Dec 8, 2025", submission: "P230024", pathway: "PMA" },
  { slug: "neuronetics", device: "NeuroStar Advanced Therapy System", date: "2024-03-22", dateLabel: "Mar 22, 2024", submission: "K231926", pathway: "510(k)" },
  { slug: "neuroelectrics", device: "Enobio Dx EEG systems", date: "2026-06-13", dateLabel: "Jun 13, 2026", submission: "K261604", pathway: "510(k)" },
  { slug: "ant-neuro", device: "visor2 TMS neuronavigation system", date: "2022-04-08", dateLabel: "Apr 8, 2022", submission: "K210109", pathway: "510(k)" },
  { slug: "setpoint-medical", device: "SetPoint vagus-nerve stimulation system for rheumatoid arthritis", date: "2025-07-30", dateLabel: "Jul 30, 2025", submission: "P240039", pathway: "PMA" },
  { slug: "saluda-medical", device: "Evoke spinal-cord stimulation system", date: "2022-02-28", dateLabel: "Feb 28, 2022", submission: "P190002", pathway: "PMA" },
  { slug: "cala-health", device: "Cala kIQ Plus", date: "2026-03-17", dateLabel: "Mar 17, 2026", submission: "K253587", pathway: "510(k)" },
  { slug: "electrocore", device: "gammaCore Sapphire non-invasive vagus-nerve stimulator", date: "2021-09-10", dateLabel: "Sep 10, 2021", submission: "K211856", pathway: "510(k)" },
  { slug: "cefaly", device: "CEFALY Connected migraine system", date: "2024-07-18", dateLabel: "Jul 18, 2024", submission: "K234029", pathway: "510(k)" },
  { slug: "theranica", device: "Nerivio and Nerivio Infinity", date: "2025-05-14", dateLabel: "May 14, 2025", submission: "K250405", pathway: "510(k)" },
  { slug: "neuspera", device: "Neuspera sacral neuromodulation system", date: "2025-06-17", dateLabel: "Jun 17, 2025", submission: "P240031", pathway: "PMA" },
  { slug: "mainstay-medical", device: "ReActiv8 implantable neurostimulation system", date: "2020-06-16", dateLabel: "Jun 16, 2020", submission: "P190021", pathway: "PMA" },
  { slug: "neuroone-medical", device: "OneRF ablation system", date: "2023-12-06", dateLabel: "Dec 6, 2023", submission: "K231675", pathway: "510(k)" },
  { slug: "neurovalens", device: "Modius Spero", date: "2026-05-08", dateLabel: "May 8, 2026", submission: "DEN250013", pathway: "De Novo" },
  { slug: "neurosteer", device: "Neurosteer EEG Recorder", date: "2022-10-24", dateLabel: "Oct 24, 2022", submission: "K221563", pathway: "510(k)" },
  { slug: "uneeg-medical", device: "UNEEG EpiSight subcutaneous EEG system", date: "2026-06-11", dateLabel: "Jun 11, 2026", submission: "K253607", pathway: "510(k)" },
  { slug: "epitel", device: "REMI Remote EEG Monitoring System", date: "2025-03-21", dateLabel: "Mar 21, 2025", submission: "K243185", pathway: "510(k)" },
  { slug: "ceribell", device: "Ceribell EEG monitor", date: "2026-06-30", dateLabel: "Jun 30, 2026", submission: "K261101", pathway: "510(k)" },
  { slug: "brainscope", device: "BrainScope TBI", date: "2019-09-11", dateLabel: "Sep 11, 2019", submission: "K190815", pathway: "510(k)" },
  { slug: "beacon-biosignals", device: "Dreem 3S EEG system", date: "2024-11-22", dateLabel: "Nov 22, 2024", submission: "K242094", pathway: "510(k)" },
  { slug: "empatica", device: "EmbraceMini seizure-monitoring wearable", date: "2025-12-22", dateLabel: "Dec 22, 2025", submission: "K252981", pathway: "510(k)" },
  { slug: "cognoa", device: "Canvas Dx autism diagnostic aid", date: "2025-04-11", dateLabel: "Apr 11, 2025", submission: "K243558", pathway: "510(k)" },
  { slug: "brainomix", device: "Brainomix 360 Hyperdensity", date: "2026-06-12", dateLabel: "Jun 12, 2026", submission: "K260406", pathway: "510(k)" },
  { slug: "firefly-neuroscience", device: "BNA brain-network analytics platform", date: "2020-12-07", dateLabel: "Dec 7, 2020", submission: "K202588", pathway: "510(k)" },
  { slug: "cumulus-neuroscience", device: "Cumulus Functional Neurophysiology Platform", date: "2023-04-27", dateLabel: "Apr 27, 2023", submission: "K221963", pathway: "510(k)" },
  { slug: "rune-labs", device: "Rune Labs Tremor Transducer System / StrivePD", date: "2022-06-10", dateLabel: "Jun 10, 2022", submission: "K213519", pathway: "510(k)" },
  { slug: "artiria-medical", device: "SmartGUIDE deflectable neurovascular guidewire", date: "2023-04-24", dateLabel: "Apr 24, 2023", submission: "K222690", pathway: "510(k)" },
  { slug: "zeta-surgical", device: "Zeta TMS Navigation System", date: "2026-07-09", dateLabel: "Jul 9, 2026", submission: "K261471", pathway: "510(k)" },
  { slug: "brainlab", device: "Brainlab cranial alignment software for biopsy, sEEG and LITT", date: "2025-01-28", dateLabel: "Jan 28, 2025", submission: "K243698", pathway: "510(k)" },
  { slug: "cionic", device: "Cionic Neural Sleeve NS-200", date: "2025-05-02", dateLabel: "May 2, 2025", submission: "K243828", pathway: "510(k)" },
  { slug: "mindmaze", device: "MindMotion GO neurorehabilitation system", date: "2018-05-17", dateLabel: "May 17, 2018", submission: "K173931", pathway: "510(k)" },
  { slug: "neurosigma", device: "Generation 2 Monarch external trigeminal nerve stimulation system", date: "2024-01-16", dateLabel: "Jan 16, 2024", submission: "K233293", pathway: "510(k)" }
];

const trialRecords: TrialRecord[] = [
  { slug: "sooma-medical", nct: "NCT06976697", title: "Home-based tDCS study for major depression", start: "2025-06-27", startLabel: "Jun 27, 2025", registryStatus: "RECRUITING", completion: "2026-12-23", completionLabel: "Dec 2026" },
  { slug: "gtec-medical-engineering", nct: "NCT06690931", title: "BCI-FES and VR Parkinson's rehabilitation study", start: "2024-12-09", startLabel: "Dec 9, 2024", registryStatus: "RECRUITING", completion: "2027-08-31", completionLabel: "Aug 2027" },
  { slug: "openbci", nct: "NCT06782360", title: "OpenBCI-sponsored human interface study", start: "2025-04-30", startLabel: "Apr 30, 2025", registryStatus: "COMPLETED" },
  { slug: "bitbrain", nct: "NCT07672977", title: "Bitbrain-sponsored neurotechnology study", start: "2025-07-01", startLabel: "Jul 1, 2025", registryStatus: "ENROLLING_BY_INVITATION", completion: "2026-12-30", completionLabel: "Dec 2026" },
  { slug: "cognixion", nct: "NCT06810219", title: "AR-BCI longitudinal study in late-stage ALS", start: "2025-01-20", startLabel: "Jan 20, 2025", registryStatus: "RECRUITING" },
  { slug: "comind", nct: "NCT06368648", title: "CoMind early feasibility study", start: "2024-11-27", startLabel: "Nov 27, 2024", registryStatus: "RECRUITING", completion: "2026-11-30", completionLabel: "Nov 2026" },
  { slug: "axoft", nct: "NCT06673264", title: "first-in-human soft neural-probe study", start: "2025-03-14", startLabel: "Mar 14, 2025", registryStatus: "COMPLETED" },
  { slug: "motif-neurotech", nct: "NCT07684794", title: "Motif network-stimulation maintenance study", start: "2026-08-10", startLabel: "Aug 10, 2026", registryStatus: "NOT_YET_RECRUITING", startStatus: "upcoming", completion: "2027-12-31", completionLabel: "Dec 2027" },
  { slug: "amber-therapeutics", nct: "NCT06885931", title: "AURA-4 implant study", start: "2025-06-24", startLabel: "Jun 24, 2025", registryStatus: "RECRUITING", completion: "2030-01-31", completionLabel: "Jan 2030" },
  { slug: "aleva-neurotherapeutics", nct: "NCT01764815", title: "directSTIM directional DBS study", start: "2012-12-01", startLabel: "Dec 2012", registryStatus: "COMPLETED" },
  { slug: "inner-cosmos", nct: "NCT05393622", title: "brain stimulation study for severe depression", start: "2022-07-28", startLabel: "Jul 28, 2022", registryStatus: "RECRUITING", completion: "2027-12-31", completionLabel: "Dec 2027" },
  { slug: "nalu-medical", nct: "NCT05870124", title: "COMFORT 2 peripheral neuropathic-pain study", start: "2023-04-27", startLabel: "Apr 27, 2023", registryStatus: "ACTIVE_NOT_RECRUITING", completion: "2027-12-31", completionLabel: "Dec 2027" },
  { slug: "epiminder", nct: "NCT07110337", title: "Minder implantable EEG DETECT study", start: "2025-12-23", startLabel: "Dec 23, 2025", registryStatus: "RECRUITING", completion: "2027-06-30", completionLabel: "Jun 2027" },
  { slug: "braincheck", nct: "NCT05497427", title: "BrainCheck normative and test-retest study", start: "2022-10-10", startLabel: "Oct 10, 2022", registryStatus: "COMPLETED" },
  { slug: "altoida", nct: "NCT06223438", title: "Altoida digital-neuro-signature study", start: "2024-01-12", startLabel: "Jan 12, 2024", registryStatus: "COMPLETED" },
  { slug: "cognito-therapeutics", nct: "NCT05637801", title: "HOPE pivotal sensory-stimulation study", start: "2022-12-13", startLabel: "Dec 13, 2022", registryStatus: "ACTIVE_NOT_RECRUITING" },
  { slug: "ottobock", nct: "NCT05628064", title: "Ottobock 1C70 prosthesis feasibility study", start: "2022-11-24", startLabel: "Nov 24, 2022", registryStatus: "COMPLETED" },
  { slug: "neurosoft-bioelectronics", nct: "NCT06205160", title: "EpiGrid high-density intraoperative ECoG study", start: "2025-01-01", startLabel: "Jan 2025", registryStatus: "RECRUITING", completion: "2027-03-31", completionLabel: "Mar 2027" },
  { slug: "carthera", nct: "NCT05902169", title: "SonoCloud-9 recurrent glioblastoma study", start: "2024-01-29", startLabel: "Jan 29, 2024", registryStatus: "RECRUITING", completion: "2028-06-30", completionLabel: "Jun 2028" },
  { slug: "soterix-medical", nct: "NCT07042217", title: "Soterix-sponsored neuromodulation study", start: "2025-07-01", startLabel: "Jul 1, 2025", registryStatus: "RECRUITING", completion: "2026-09-01", completionLabel: "Sep 2026" },
  { slug: "nextsense", nct: "NCT05257811", title: "earbud EEG feasibility study", start: "2019-09-01", startLabel: "Sep 2019", registryStatus: "COMPLETED" },
  { slug: "elemind", nct: "NCT05743114", title: "phase-locked sound sleep-onset study", start: "2020-02-02", startLabel: "Feb 2, 2020", registryStatus: "COMPLETED" }
];

const officialMilestones: Milestone[] = [
  officialMilestone({ id: "brain-products-25-years-2022", title: "Brain Products marks 25 years since BrainVision Analyzer", companySlug: "brain-products", dateLabel: "Oct 2022", sortDate: "2022-10-01", status: "confirmed", type: "product-update", evidenceLevel: "E1", confidence: "medium", summary: "Brain Products' anniversary history dates the BrainVision Analyzer launch and company origins to 1997 and marks its 25th anniversary in October 2022.", whyItMatters: "The history documents long-running commercial EEG-analysis infrastructure used by neuroscience researchers.", hypeCheck: "An anniversary is evidence of operating history, not evidence that any particular analysis is clinically valid.", sourceLinks: [{ title: "25 years of Brain Products", url: "https://pressrelease.brainproducts.com/anniversary-2022/", publisher: "Brain Products", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "kernel-flow2-shipping-2023", title: "Kernel begins shipping Flow2 systems", companySlug: "kernel-flow", dateLabel: "2023", sortDate: "2023-12-31", status: "confirmed", type: "commercial-deployment", evidenceLevel: "E1", confidence: "medium", summary: "Kernel's Q1 2024 update says it launched Flow2 in 2023 and began shipping systems to early research partners and customers.", whyItMatters: "Shipment to external research users moves the platform beyond an internal prototype.", hypeCheck: "Kernel explicitly labels Flow2 research-only; shipment is not medical-device authorization or clinical validation.", sourceLinks: [{ title: "Kernel Q1 2024 update", url: "https://www.kernel.com/newsletter/2024q1.html", publisher: "Kernel", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "neurable-mw75-delivery-2024", title: "Neurable launches and delivers MW75 Neuro", companySlug: "neurable", dateLabel: "2024", sortDate: "2024-12-31", status: "confirmed", type: "commercial-deployment", evidenceLevel: "E1", confidence: "medium", summary: "Neurable's official company timeline records the launch and delivery of its EEG-enabled MW75 Neuro headphones in 2024.", whyItMatters: "Delivery is a verifiable commercial milestone for a consumer BCI product, distinct from a prototype demonstration.", hypeCheck: "A commercial launch does not validate claims about focus, burnout, health, or productivity outcomes.", sourceLinks: [{ title: "The Neurable journey", url: "https://www.neurable.com/about", publisher: "Neurable", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "nextmind-snap-acquisition-2022", title: "Snap acquires NextMind for augmented-reality research", companySlug: "nextmind-snap-ar", dateLabel: "Mar 23, 2022", sortDate: "2022-03-23", status: "confirmed", type: "product-update", evidenceLevel: "E1", confidence: "high", summary: "Snap announced that it acquired NextMind and moved the Paris team into Snap Lab for long-term augmented-reality research.", whyItMatters: "The acquisition is a concrete organizational outcome for one of the best-known non-invasive visual-attention BCI startups.", hypeCheck: "Acquisition does not mean NextMind's developer device became a clinical or mass-market product.", sourceLinks: [{ title: "Welcome NextMind", url: "https://newsroom.snap.com/welcome-nextmind", publisher: "Snap", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "ctrl-labs-emg-open-data-2024", title: "CTRL-labs team releases large open sEMG datasets and models", companySlug: "ctrl-labs", dateLabel: "Dec 5, 2024", sortDate: "2024-12-05", status: "confirmed", type: "paper-published", evidenceLevel: "E2", confidence: "high", summary: "Meta's CTRL-labs-derived neuromotor-interface team released emg2qwerty and emg2pose, covering 301 participants and 716 hours of wrist sEMG recordings.", whyItMatters: "Open datasets and baselines make the post-acquisition neuromotor-interface program independently inspectable and reusable.", hypeCheck: "Benchmark performance is research evidence, not proof of a shipping general-purpose neural input product.", sourceLinks: [{ title: "Open-sourcing sEMG datasets for pose and typing", url: "https://ai.meta.com/blog/open-sourcing-surface-electromyography-datasets-neurips-2024/", publisher: "Meta AI", sourceType: "institution-page", isPrimary: true }] }),
  officialMilestone({ id: "cortec-first-human-implant-2025", title: "CorTec completes first human Brain Interchange implant", companySlug: "cortec", dateLabel: "Jul 2025", sortDate: "2025-07-29", status: "confirmed", type: "first-implant", evidenceLevel: "E3", confidence: "high", summary: "CorTec reported the first human implantation of Brain Interchange in an FDA IDE study at Harborview Medical Center for stroke rehabilitation.", whyItMatters: "The procedure moves the fully implanted closed-loop system from preclinical development into a registered human feasibility program.", hypeCheck: "A first implant establishes feasibility, not durable safety or restored function across patients.", sourceLinks: [{ title: "CorTec first-human implantation press release", url: "https://cortec-neuro.com/wp-content/uploads/2025/07/2025-07-29_PressRelease_CorTec.pdf", publisher: "CorTec", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "cortical-labs-dishbrain-paper-2022", title: "DishBrain closed-loop learning study is published", companySlug: "cortical-labs", dateLabel: "Oct 12, 2022", sortDate: "2022-10-12", status: "confirmed", type: "paper-published", evidenceLevel: "E2", confidence: "high", summary: "A peer-reviewed Neuron paper reported closed-loop behavior in cultured neuronal networks interfaced with a simulated Pong environment.", whyItMatters: "The paper provides inspectable methods and data behind Cortical Labs' best-known biological-computing demonstration.", hypeCheck: "Cultured-cell behavior is not human cognition, consciousness, or clinical BCI evidence.", sourceLinks: [{ title: "In vitro neurons learn and exhibit sentience when embodied in a simulated game-world", url: "https://doi.org/10.1016/j.neuron.2022.09.001", publisher: "Neuron", sourceType: "paper", isPrimary: true }] }),
  officialMilestone({ id: "bioinduction-picostim-first-implants-2021", title: "Bioinduction reports first Picostim implants", companySlug: "bioinduction", dateLabel: "Jun 30, 2021", sortDate: "2021-06-30", status: "confirmed", type: "first-implant", evidenceLevel: "E1", confidence: "medium", summary: "Bioinduction announced the first patient implantations of its skull-mounted Picostim DBS system in Parkinson's disease.", whyItMatters: "The report places the cranial-mounted stimulator in human use rather than only bench or animal work.", hypeCheck: "The announcement does not itself provide peer-reviewed safety or efficacy results.", sourceLinks: [{ title: "First Picostim implantations announcement", url: "https://www.prnewswire.com/in/news-releases/bioinduction-announces-the-world-s-first-successful-implantations-of-picostim-a-novel-less-invasive-self-contained-cranialized-brain-pacemaker-for-parkinson-s-disease-823964003.html", publisher: "Bioinduction", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "openwater-lvo-paper-2024", title: "Openwater stroke-monitor study is published", companySlug: "openwater-lifu", dateLabel: "Mar 21, 2024", sortDate: "2024-03-21", status: "confirmed", type: "paper-published", evidenceLevel: "E4", confidence: "high", summary: "A peer-reviewed 135-patient study reported performance of Openwater's portable optical blood-flow monitor for large-vessel-occlusion detection.", whyItMatters: "This is human, peer-reviewed diagnostic evidence with a comparator and explicit performance estimates.", hypeCheck: "The authors call for independent and prehospital validation; the research-use device is not an FDA-cleared diagnostic.", sourceLinks: [{ title: "Portable cerebral blood flow monitor to detect large vessel occlusion", url: "https://doi.org/10.1136/jnis-2024-021536", publisher: "Journal of NeuroInterventional Surgery", sourceType: "paper", isPrimary: true }] }),
  officialMilestone({ id: "aural-analytics-breakthrough-2023", title: "Aural Analytics receives FDA Breakthrough Device designation", companySlug: "aural-analytics", dateLabel: "Mar 29, 2023", sortDate: "2023-03-29", status: "confirmed", type: "regulatory-designation", evidenceLevel: "E1", confidence: "medium", summary: "Aural Analytics announced Breakthrough Device designation for speech-analytics software intended for use in ALS treatment monitoring.", whyItMatters: "The designation creates a more interactive FDA review path for the defined use case.", hypeCheck: "Breakthrough designation is not marketing authorization and does not establish clinical benefit.", sourceLinks: [{ title: "Aural Analytics news archive", url: "https://auralanalytics.com/news/", publisher: "Aural Analytics", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "cyberdyne-hal-cp-clearance-2024", title: "Medical HAL indication expands to cerebral palsy and other conditions", companySlug: "cyberdyne-hal", dateLabel: "May 7, 2024", sortDate: "2024-05-07", status: "confirmed", type: "approval-clearance", evidenceLevel: "E6", confidence: "high", summary: "Cyberdyne reports FDA clearance of a smaller Medical HAL model and expanded indications including cerebral palsy, HAM and hereditary spastic paraplegia.", whyItMatters: "The decision expands the regulated population and makes a smaller device model available for eligible patients.", hypeCheck: "Clearance is limited to the labeled gait-training use and does not mean HAL restores independent walking in every patient.", sourceLinks: [{ title: "Medical HAL expanded FDA clearance", url: "https://www.cyberdyne.jp/en/news/14025.html", publisher: "Cyberdyne", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "neurosky-android-tools-2016", title: "NeuroSky releases Android Developer Tools 4.2", companySlug: "neurosky", dateLabel: "Sep 19, 2016", sortDate: "2016-09-19", status: "confirmed", type: "product-update", evidenceLevel: "E1", confidence: "medium", summary: "NeuroSky's official store records version 4.2 of its Android developer tools for building MindWave Mobile 2 EEG applications.", whyItMatters: "A documented SDK release shows an accessible commercial developer ecosystem around the consumer EEG hardware.", hypeCheck: "Developer tooling and consumer EEG signals do not make MindWave a medical diagnostic or validate attention scores clinically.", sourceLinks: [{ title: "Android Developer Tools 4.2", url: "https://store.neurosky.com/products/android-developer-tools-4", publisher: "NeuroSky", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "nia-breakthrough-2026", title: "Nia memory implant receives FDA Breakthrough Device designation", companySlug: "nia-therapeutics", dateLabel: "Mar 13, 2026", sortDate: "2026-03-13", status: "confirmed", type: "regulatory-designation", evidenceLevel: "E1", confidence: "medium", summary: "Nia Therapeutics announced Breakthrough Device designation for its Smart Neurostimulation System for persistent episodic-memory loss after moderate-to-severe TBI.", whyItMatters: "The designation identifies a defined clinical indication and enables closer FDA interaction during development.", hypeCheck: "Designation is not approval and does not yet demonstrate that the implant restores memory in patients.", sourceLinks: [{ title: "Nia Breakthrough Device announcement", url: "https://niatherapeutics.com/media-hub/nia-therapeutics-receives-fda-breakthrough-device-designation-for-brain-implant", publisher: "Nia Therapeutics", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "idun-ce-mark-2024", title: "IDUN Guardian receives CE marking", companySlug: "idun-technologies", dateLabel: "Dec 2024", sortDate: "2024-12-31", status: "confirmed", type: "approval-clearance", evidenceLevel: "E1", confidence: "medium", summary: "IDUN's official milestones timeline records CE marking for its ear-EEG Guardian platform in December 2024.", whyItMatters: "The regulatory milestone documents progress beyond a research prototype in Europe.", hypeCheck: "The scope of the mark must be read from the applicable labeling; it does not validate broad wellness or diagnostic claims.", sourceLinks: [{ title: "IDUN company milestones", url: "https://iduntechnologies.com/our-company/milestones", publisher: "IDUN Technologies", sourceType: "company-update", isPrimary: true }] }),
  officialMilestone({ id: "apollo-oura-observational-study-2026", title: "Apollo and Oura observational sleep study is released", companySlug: "apollo-neuro", dateLabel: "Jul 15, 2026", sortDate: "2026-07-15", status: "confirmed", type: "paper-published", evidenceLevel: "E1", confidence: "medium", summary: "Apollo reported an observational analysis of 474,852 nights from 935 Apollo and Oura users, with wearable use associated with longer sleep among short sleepers.", whyItMatters: "The large real-world dataset is a substantive, inspectable research milestone for the consumer wearable.", hypeCheck: "This retrospective, self-selected observational analysis cannot establish that Apollo caused the sleep differences; the linked manuscript was still presented as a JMIR preprint.", sourceLinks: [{ title: "Apollo and Oura study announcement and manuscript link", url: "https://apolloneuro.com/blogs/news/apollo-oura-jmir", publisher: "Apollo Neuroscience", sourceType: "company-update", isPrimary: true }] })
];

export const topCompanyMilestones: Milestone[] = [
  ...fdaRecords.map(fdaMilestone),
  ...trialRecords.flatMap(trialMilestones),
  ...officialMilestones
];
