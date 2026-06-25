import type { Company, Demo, Milestone, Paper, SourceLink, Trial } from "./schema";

const source = (
  title: string,
  sourceType: SourceLink["sourceType"],
  url: string,
  publisher: string,
  isPrimary = true
): SourceLink => ({
  title,
  url,
  publisher,
  sourceType,
  isPrimary
});

const clinicalTrials = (nctId: string): string => `https://clinicaltrials.gov/study/${nctId}`;

export const companies: Company[] = [
  {
    slug: "neuralink-prime",
    name: "Neuralink PRIME / Telepathy",
    modality: "Fully implantable intracortical microelectrode BCI with robot-assisted placement",
    targetFunction: "Digital device control and assistive-device control for people with severe paralysis",
    stage: "Recruiting early feasibility studies",
    evidenceLevel: "E3",
    summary:
      "Neuralink's PRIME program is a registered early feasibility study of the N1 Implant and R1 Robot for people with severe motor impairment.",
    hypeCheck:
      "The public evidence surface is still mostly registry entries and company-released participant updates. Treat demos as capability clips until peer-reviewed human outcome data is available.",
    sourceLinks: [
      source("PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06429735"), "ClinicalTrials.gov"),
      source("CAN-PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06700304"), "ClinicalTrials.gov"),
      source("CONVOY assistive-device study record", "trial-registry", clinicalTrials("NCT06710626"), "ClinicalTrials.gov"),
      source("Two Years of Telepathy update", "company-update", "https://neuralink.com/updates/two-years-of-telepathy/", "Neuralink")
    ],
    isSample: false
  },
  {
    slug: "synchron-stentrode",
    name: "Synchron Stentrode",
    modality: "Endovascular motor neuroprosthesis implanted through the blood vessels",
    targetFunction: "Digital device control for people with severe paralysis",
    stage: "Peer-reviewed multi-patient evidence plus U.S. early feasibility follow-up",
    evidenceLevel: "E5",
    summary:
      "Synchron has published human safety and feasibility evidence for a fully implanted endovascular BCI and has a U.S. COMMAND early feasibility study listed in ClinicalTrials.gov.",
    hypeCheck:
      "The strongest evidence is safety and digital-control feasibility. It is still investigational and not an approved consumer communication product.",
    sourceLinks: [
      source("COMMAND clinical trial record", "trial-registry", clinicalTrials("NCT05035823"), "ClinicalTrials.gov"),
      source("SWITCH study full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9857731/", "JAMA Neurology / PubMed Central"),
      source("Synchron research page", "company-update", "https://synchron.com/research", "Synchron"),
      source("COMMAND results press release", "company-update", "https://www.businesswire.com/news/home/20240930433219/en/Synchron-Announces-Positive-Results-from-U.S.-COMMAND-Study-of-Endovascular-Brain-Computer-Interface", "Business Wire / Synchron")
    ],
    isSample: false
  },
  {
    slug: "paradromics-connexus",
    name: "Paradromics Connexus",
    modality: "Fully implantable high-density intracortical microelectrode array with wireless telemetry",
    targetFunction: "Speech restoration, synthesized speech, and computer control for severe motor impairment",
    stage: "Recruiting Connect-One early feasibility study",
    evidenceLevel: "E3",
    summary:
      "Paradromics moved from acute human recording into the FDA-approved Connect-One early feasibility study, with the first long-term Connexus implant reported in June 2026.",
    hypeCheck:
      "First implants and acute recordings are important execution milestones, but they are not yet evidence that the communication endpoint works in daily use.",
    sourceLinks: [
      source("Connect-One clinical trial record", "trial-registry", clinicalTrials("NCT07357428"), "ClinicalTrials.gov"),
      source("Connect-One clinical study page", "company-update", "https://paradromics.com/clinical-study/", "Paradromics"),
      source("First Connexus clinical implant release", "company-update", "https://www.businesswire.com/news/home/20260617963732/en/Paradromics-and-University-of-Michigan-Complete-First-Connexus-BCI-Implantation-for-the-FDA-Approved-Connect-One-Clinical-Study", "Business Wire / Paradromics"),
      source("University of Michigan first implant report", "company-update", "https://www.michiganmedicine.org/news-release/university-michigan-implants-first-human-paradromics-wireless-brain-computer-interface-designed", "Michigan Medicine")
    ],
    isSample: false
  },
  {
    slug: "precision-layer-7",
    name: "Precision Neuroscience Layer 7",
    modality: "High-density flexible micro-ECoG cortical surface array",
    targetFunction: "Temporary cortical recording and mapping now; chronic assistive BCI under development",
    stage: "FDA-cleared temporary cortical interface with human intraoperative research",
    evidenceLevel: "E4",
    summary:
      "Precision's Layer 7-T has FDA 510(k) clearance for temporary cortical recording, monitoring, and stimulation, while the company's assistive BCI goals remain investigational.",
    hypeCheck:
      "The 510(k) clearance is for a temporary cortical electrode use case, not for an approved home communication or robotic-control BCI.",
    sourceLinks: [
      source("FDA 510(k) K242618 database entry", "regulatory-page", "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K242618", "U.S. FDA"),
      source("FDA 510(k) summary PDF", "regulatory-page", "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242618.pdf", "U.S. FDA"),
      source("For clinicians: Layer 7 in use", "company-update", "https://www.precisionneuro.io/for-clinicians", "Precision Neuroscience"),
      source("Initial Layer 7 human experience", "paper", "https://thejns.org/focus/view/journals/neurosurg-focus/60/2/article-pE3.xml", "Neurosurgical Focus")
    ],
    isSample: false
  },
  {
    slug: "braingate-consortium",
    name: "BrainGate Consortium",
    modality: "Chronically implanted intracortical microelectrode arrays",
    targetFunction: "Computer cursor control, text entry, robotic-arm control, and communication",
    stage: "Long-running registered feasibility study with replicated peer-reviewed human results",
    evidenceLevel: "E5",
    summary:
      "BrainGate is a long-running academic clinical BCI program with registered trial infrastructure and multiple peer-reviewed demonstrations in people with tetraplegia or severe motor impairment.",
    hypeCheck:
      "The evidence is unusually rich for research BCIs, but the system remains an investigational clinical research platform rather than an approved commercial product.",
    sourceLinks: [
      source("BrainGate2 clinical trial record", "trial-registry", clinicalTrials("NCT00912041"), "ClinicalTrials.gov"),
      source("BrainGate clinical trials page", "trial-registry", "https://www.braingate.org/clinical-trials/", "BrainGate"),
      source("Handwriting brain-to-text paper", "paper", "https://www.nature.com/articles/s41586-021-03506-2", "Nature"),
      source("Interim BrainGate safety profile", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10074470/", "PubMed Central")
    ],
    isSample: false
  },
  {
    slug: "ucsf-bravo",
    name: "UCSF BRAVO / Chang Lab",
    modality: "Implanted ECoG-based speech and motor BCI",
    targetFunction: "Attempted speech decoding, synthesized speech, avatar control, and motor control research",
    stage: "Recruiting registered BRAVO trial with peer-reviewed human speech results",
    evidenceLevel: "E4",
    summary:
      "The BRAVO trial studies ECoG signals for motor and speech control, including peer-reviewed demonstrations of attempted-speech decoding and avatar control.",
    hypeCheck:
      "The results are controlled research demonstrations in a small number of participants, not a general-purpose speech-restoration device.",
    sourceLinks: [
      source("BRAVO clinical trial record", "trial-registry", clinicalTrials("NCT03698149"), "ClinicalTrials.gov"),
      source("UCSF BRAVO clinical-trials page", "trial-registry", "https://clinicaltrials.ucsf.edu/trial/NCT03698149", "UCSF Clinical Trials"),
      source("Speech neuroprosthesis overview", "company-update", "https://changlab.ucsf.edu/speech-neuroprosthesis", "UCSF Chang Lab"),
      source("Speech decoding and avatar control paper", "paper", "https://www.nature.com/articles/s41586-023-06443-4", "Nature")
    ],
    isSample: false
  },
  {
    slug: "uc-davis-speech-neuroprosthesis",
    name: "UC Davis Speech Neuroprosthesis",
    modality: "Intracortical microelectrode arrays in speech motor cortex",
    targetFunction: "Fast-calibrating brain-to-text and synthesized speech for ALS-related dysarthria",
    stage: "Peer-reviewed single-participant long-duration speech neuroprosthesis result",
    evidenceLevel: "E5",
    summary:
      "UC Davis-led investigators reported a speech neuroprosthesis that rapidly calibrated and supported months of communication use in a participant with ALS-related severe dysarthria.",
    hypeCheck:
      "This is a major human result, but it is still a single-participant research study and should not be generalized to all users or diseases.",
    sourceLinks: [
      source("NEJM speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/", "PubMed Central"),
      source("BrainGate publication page", "paper", "https://www.braingate.org/publications/an-accurate-and-rapidly-calibrating-speech-neuroprosthesis-2/", "BrainGate"),
      source("UC Davis lab news", "company-update", "https://neuroprosthetics.science/?news=", "UC Davis Neuroprosthetics Lab")
    ],
    isSample: false
  },
  {
    slug: "onward-arc-bci",
    name: "ONWARD ARC-BCI / DigitalBridge",
    modality: "Implanted cortical recording paired with implanted spinal cord stimulation",
    targetFunction: "Thought-driven lower-limb movement after spinal cord injury",
    stage: "Investigational ARC-BCI with peer-reviewed brain-spine interface evidence and ongoing feasibility study",
    evidenceLevel: "E4",
    summary:
      "ONWARD's ARC-BCI program builds on a Nature brain-spine interface demonstration and an ongoing study of cortical recording combined with lumbar spinal cord stimulation.",
    hypeCheck:
      "The highest-signal result is a peer-reviewed one-participant brain-spine interface study. ARC-BCI remains investigational and is not cleared for broad commercial use.",
    sourceLinks: [
      source("Brain-controlled spinal cord stimulation trial", "trial-registry", clinicalTrials("NCT06243952"), "ClinicalTrials.gov"),
      source("ARC-BCI overview", "company-update", "https://www.onwd.com/brain-computer-interface/", "ONWARD Medical"),
      source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("ARC-BCI breakthrough designation release", "regulatory-page", "https://ir.onwd.com/static-files/3785d988-41cc-444f-a6b3-8180e0e3ec5c", "ONWARD Medical")
    ],
    isSample: false
  }
];

export const milestones: Milestone[] = [
  {
    id: "neuralink-prime-primary-completion-2026",
    title: "PRIME primary completion window listed",
    companySlug: "neuralink-prime",
    dateLabel: "Jun 2026 (estimated)",
    sortDate: "2026-06-30",
    status: "upcoming",
    type: "endpoint-readout",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "The PRIME registry lists June 2026 as the estimated primary completion month for device- and procedure-related adverse-event endpoints.",
    whyItMatters:
      "Primary completion windows are a useful watchlist marker for when safety data may become easier to evaluate.",
    hypeCheck:
      "A registry completion window is not a published readout and may move without fanfare.",
    sourceLinks: [source("PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06429735"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "synchron-command-study-completion-2026",
    title: "COMMAND study completion window",
    companySlug: "synchron-stentrode",
    dateLabel: "Sep 2026 (estimated)",
    sortDate: "2026-09-01",
    status: "upcoming",
    type: "endpoint-readout",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "The COMMAND early feasibility study lists September 2026 as the estimated study completion month.",
    whyItMatters:
      "A completed U.S. early feasibility study could strengthen the evidence surface beyond earlier announcements.",
    hypeCheck:
      "Completion does not automatically mean public peer-reviewed results will appear immediately.",
    sourceLinks: [source("COMMAND clinical trial record", "trial-registry", clinicalTrials("NCT05035823"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "paradromics-connect-one-primary-completion-2027",
    title: "Connect-One primary safety completion window",
    companySlug: "paradromics-connexus",
    dateLabel: "May 2027 (estimated)",
    sortDate: "2027-05-01",
    status: "upcoming",
    type: "endpoint-readout",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "The Connect-One registry lists May 2027 as the estimated primary completion month for the device-related adverse-event safety endpoint.",
    whyItMatters:
      "This is the first scheduled checkpoint for long-term Connexus safety evidence in the clinical study.",
    hypeCheck:
      "The endpoint is safety-focused; it is not a guarantee of demonstrated speech restoration.",
    sourceLinks: [source("Connect-One clinical trial record", "trial-registry", clinicalTrials("NCT07357428"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "onward-arc-bsi-primary-completion-2030",
    title: "ARC-BSI feasibility primary completion window",
    companySlug: "onward-arc-bci",
    dateLabel: "Jul 2030 (estimated)",
    sortDate: "2030-07-01",
    status: "upcoming",
    type: "endpoint-readout",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "The brain-controlled spinal cord stimulation study lists July 2030 as the estimated primary completion month for preliminary safety.",
    whyItMatters:
      "The study extends the brain-spine interface concept into a longer formal clinical evidence path.",
    hypeCheck:
      "This is a distant study timeline and should not be read as near-term commercial availability.",
    sourceLinks: [source("Brain-controlled spinal cord stimulation trial", "trial-registry", clinicalTrials("NCT06243952"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "paradromics-first-connect-one-implant-2026",
    title: "First long-term Connexus BCI implant completed",
    companySlug: "paradromics-connexus",
    dateLabel: "Jun 17, 2026",
    sortDate: "2026-06-17",
    status: "confirmed",
    type: "first-implant",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "Paradromics and University of Michigan reported the first long-term Connexus BCI implantation in the FDA-approved Connect-One early feasibility study.",
    whyItMatters:
      "This moves Connexus from acute human recording into longitudinal clinical evaluation.",
    hypeCheck:
      "An implant milestone starts the evidence clock; it does not prove communication benefit yet.",
    sourceLinks: [
      source("University of Michigan first implant report", "company-update", "https://www.michiganmedicine.org/news-release/university-michigan-implants-first-human-paradromics-wireless-brain-computer-interface-designed", "Michigan Medicine"),
      source("Connect-One clinical trial record", "trial-registry", clinicalTrials("NCT07357428"), "ClinicalTrials.gov")
    ],
    isSample: false
  },
  {
    id: "precision-layer-7-human-experience-2026",
    title: "Initial Layer 7 intraoperative human experience published",
    companySlug: "precision-layer-7",
    dateLabel: "Feb 2026",
    sortDate: "2026-02-01",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "A Neurosurgical Focus paper reported initial human intraoperative use of Precision's Layer 7 micro-ECoG array for real-time BCI tasks including speech classification and cursor control.",
    whyItMatters:
      "Peer-reviewed human intraoperative results help separate measured recording performance from product claims.",
    hypeCheck:
      "The study is acute intraoperative research, not evidence of chronic independent home use.",
    sourceLinks: [source("Initial Layer 7 human experience", "paper", "https://thejns.org/focus/view/journals/neurosurg-focus/60/2/article-pE3.xml", "Neurosurgical Focus")],
    isSample: false
  },
  {
    id: "neuralink-two-years-telepathy-2026",
    title: "Neuralink reports 21 trial participants worldwide",
    companySlug: "neuralink-prime",
    dateLabel: "Jan 2026",
    sortDate: "2026-01-29",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Neuralink's Two Years of Telepathy update announced 21 participants enrolled across its trials worldwide.",
    whyItMatters:
      "Reported enrollment scale is a useful operational signal when cross-checked against registered trials.",
    hypeCheck:
      "This is a company-reported participant count, not independently published clinical outcome evidence.",
    sourceLinks: [source("Two Years of Telepathy update", "company-update", "https://neuralink.com/updates/two-years-of-telepathy/", "Neuralink")],
    isSample: false
  },
  {
    id: "paradromics-ide-approval-2025",
    title: "FDA IDE approval announced for Connect-One",
    companySlug: "paradromics-connexus",
    dateLabel: "Nov 20, 2025",
    sortDate: "2025-11-20",
    status: "confirmed",
    type: "regulatory-designation",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Paradromics announced FDA Investigational Device Exemption approval to begin the Connect-One early feasibility study with Connexus.",
    whyItMatters:
      "IDE approval is the regulatory gateway for the first longitudinal human trial of this implant.",
    hypeCheck:
      "An IDE permits a study; it is not product clearance or proof of clinical benefit.",
    sourceLinks: [
      source("IDE approval press release", "company-update", "https://paradromics.com/news/paradromics-receives-fda-approval-for-the-connect-one-clinical-study-with-the-connexus-brain-computer-interface/", "Paradromics"),
      source("Connect-One clinical trial record", "trial-registry", clinicalTrials("NCT07357428"), "ClinicalTrials.gov")
    ],
    isSample: false
  },
  {
    id: "precision-layer-7-clearance-2025",
    title: "Layer 7-T receives FDA 510(k) clearance",
    companySlug: "precision-layer-7",
    dateLabel: "Mar 30, 2025",
    sortDate: "2025-03-30",
    status: "confirmed",
    type: "approval-clearance",
    evidenceLevel: "E6",
    confidence: "high",
    summary:
      "FDA records list Layer 7-T as substantially equivalent under 510(k) K242618 for a cortical electrode use case.",
    whyItMatters:
      "This gives Precision a cleared temporary cortical-interface product while it continues assistive BCI development.",
    hypeCheck:
      "The clearance is for temporary recording, monitoring, and stimulation on the brain surface; it is not approval of a chronic assistive BCI.",
    sourceLinks: [
      source("FDA 510(k) K242618 database entry", "regulatory-page", "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K242618", "U.S. FDA"),
      source("FDA 510(k) summary PDF", "regulatory-page", "https://www.accessdata.fda.gov/cdrh_docs/pdf24/K242618.pdf", "U.S. FDA")
    ],
    isSample: false
  },
  {
    id: "uc-davis-nejm-speech-2024",
    title: "Fast-calibrating speech neuroprosthesis published in NEJM",
    companySlug: "uc-davis-speech-neuroprosthesis",
    dateLabel: "Aug 15, 2024",
    sortDate: "2024-08-15",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E5",
    confidence: "high",
    summary:
      "UC Davis-led investigators reported an intracortical speech neuroprosthesis that rapidly calibrated and supported months of use in a participant with ALS-related severe dysarthria.",
    whyItMatters:
      "Long-duration use and rapid calibration are central translational barriers for speech BCIs.",
    hypeCheck:
      "It remains a single-participant research result, not an approved speech-restoration product.",
    sourceLinks: [
      source("NEJM speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "synchron-command-results-2024",
    title: "COMMAND 12-month safety endpoint reported",
    companySlug: "synchron-stentrode",
    dateLabel: "Sep 30, 2024",
    sortDate: "2024-09-30",
    status: "confirmed",
    type: "endpoint-readout",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Synchron announced that all six COMMAND participants met the primary 12-month safety endpoint with no device-related serious adverse events causing death or permanent increased disability.",
    whyItMatters:
      "Multi-participant U.S. feasibility follow-up is a key safety signal for an endovascular BCI approach.",
    hypeCheck:
      "This is a sponsor-announced result; peer-reviewed publication would strengthen the evidence level.",
    sourceLinks: [
      source("COMMAND results press release", "company-update", "https://www.businesswire.com/news/home/20240930433219/en/Synchron-Announces-Positive-Results-from-U.S.-COMMAND-Study-of-Endovascular-Brain-Computer-Interface", "Business Wire / Synchron"),
      source("COMMAND clinical trial record", "trial-registry", clinicalTrials("NCT05035823"), "ClinicalTrials.gov")
    ],
    isSample: false
  },
  {
    id: "onward-arc-bci-breakthrough-2024",
    title: "ARC-BCI receives FDA Breakthrough Device Designation",
    companySlug: "onward-arc-bci",
    dateLabel: "Feb 29, 2024",
    sortDate: "2024-02-29",
    status: "confirmed",
    type: "regulatory-designation",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "ONWARD announced FDA Breakthrough Device Designation for ARC-BCI, a brain-computer interface paired with ARC-IM spinal cord stimulation.",
    whyItMatters:
      "The designation signals FDA engagement around the brain-spine interface path.",
    hypeCheck:
      "Breakthrough designation can speed regulatory interaction, but it is not clearance, approval, or proof of efficacy.",
    sourceLinks: [
      source("ARC-BCI breakthrough designation release", "regulatory-page", "https://ir.onwd.com/static-files/3785d988-41cc-444f-a6b3-8180e0e3ec5c", "ONWARD Medical")
    ],
    isSample: false
  },
  {
    id: "ucsf-avatar-nature-2023",
    title: "Speech decoding and avatar control paper published",
    companySlug: "ucsf-bravo",
    dateLabel: "Aug 23, 2023",
    sortDate: "2023-08-23",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "The UCSF-led BRAVO team published a Nature study on attempted-speech decoding, synthesized speech, and avatar control from ECoG signals.",
    whyItMatters:
      "The result expands speech BCI evidence from text decoding into multimodal communication.",
    hypeCheck:
      "It is a controlled research result in a small participant set, not a deployed communication device.",
    sourceLinks: [
      source("Speech decoding and avatar control paper", "paper", "https://www.nature.com/articles/s41586-023-06443-4", "Nature"),
      source("Speech neuroprosthesis overview", "company-update", "https://changlab.ucsf.edu/speech-neuroprosthesis", "UCSF Chang Lab"),
      source("UCSF demo video", "demo-video", "https://www.youtube.com/watch?v=vL7yMn6kiMg", "UCSF")
    ],
    isSample: false
  },
  {
    id: "onward-brain-spine-nature-2023",
    title: "Brain-spine interface walking study published",
    companySlug: "onward-arc-bci",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "A Nature paper reported a wireless brain-spine interface enabling one participant with chronic tetraplegia to stand and walk in community settings.",
    whyItMatters:
      "It shows a direct brain-to-spinal-stimulation control loop in a human participant.",
    hypeCheck:
      "The result is one participant and a specialized implanted setup; it should not be generalized to routine clinical care.",
    sourceLinks: [
      source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("NeuroRestore press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore")
    ],
    isSample: false
  },
  {
    id: "synchron-switch-jama-2023",
    title: "SWITCH endovascular BCI case series published",
    companySlug: "synchron-stentrode",
    dateLabel: "Jan 9, 2023",
    sortDate: "2023-01-09",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E5",
    confidence: "high",
    summary:
      "The SWITCH study reported long-term safety and digital-device control feasibility for a fully implanted endovascular BCI in four people.",
    whyItMatters:
      "A peer-reviewed multi-participant human result is a higher evidence tier than a single edited demo.",
    hypeCheck:
      "The study supports feasibility and safety signals, not broad commercial readiness.",
    sourceLinks: [source("SWITCH study full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9857731/", "JAMA Neurology / PubMed Central")],
    isSample: false
  },
  {
    id: "braingate-handwriting-nature-2021",
    title: "Handwriting brain-to-text result published",
    companySlug: "braingate-consortium",
    dateLabel: "May 12, 2021",
    sortDate: "2021-05-12",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "BrainGate researchers published real-time attempted-handwriting decoding from motor cortex activity in a participant with paralysis.",
    whyItMatters:
      "The result showed a high-bandwidth communication path using temporally rich imagined handwriting movements.",
    hypeCheck:
      "It was a controlled research task, not a take-home commercial typing product.",
    sourceLinks: [
      source("Handwriting brain-to-text paper", "paper", "https://www.nature.com/articles/s41586-021-03506-2", "Nature"),
      source("BrainGate publication videos", "demo-video", "https://www.braingate.org/publication-videos/", "BrainGate")
    ],
    isSample: false
  },
  {
    id: "braingate-robot-arm-nature-2012",
    title: "Robotic reach-and-grasp control published",
    companySlug: "braingate-consortium",
    dateLabel: "May 2012",
    sortDate: "2012-05-16",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E5",
    confidence: "high",
    summary:
      "BrainGate-associated researchers published human robotic-arm reach-and-grasp control using intracortical signals.",
    whyItMatters:
      "It remains one of the landmark demonstrated-capability results for implanted motor BCIs.",
    hypeCheck:
      "Robotic-arm control in a supervised study is not the same as independent daily prosthetic use.",
    sourceLinks: [source("Robotic-arm control full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3640850/", "Nature / PubMed Central")],
    isSample: false
  }
];

export const trials: Trial[] = [
  {
    id: "neuralink-prime-nct06429735",
    title: "Precise Robotically Implanted Brain-Computer Interface",
    companySlug: "neuralink-prime",
    status: "Recruiting",
    condition: "Tetraplegia, quadriplegia, cervical spinal cord injury, ALS, and paralysis",
    targetFunction: "External device control with an implanted BCI",
    deviceProduct: "N1 Implant and R1 Robot",
    locations: ["Barrow Neurological Institute", "University of Miami"],
    endpoints: ["Device-related adverse events", "Procedure-related adverse events"],
    evidenceLevel: "E3",
    sourceLinks: [source("PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06429735"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "synchron-command-nct05035823",
    title: "COMMAND Early Feasibility Study",
    companySlug: "synchron-stentrode",
    status: "Active, not recruiting",
    condition: "Severe paralysis from neurologic disorders including ALS, stroke, muscular dystrophy, or spinal cord injury",
    targetFunction: "Digital device control",
    deviceProduct: "Motor Neuroprosthesis (MNP)",
    locations: ["University at Buffalo Neurosurgery", "Mount Sinai Health System", "University of Pittsburgh Medical Center"],
    endpoints: ["Treatment-related serious adverse events"],
    evidenceLevel: "E3",
    sourceLinks: [source("COMMAND clinical trial record", "trial-registry", clinicalTrials("NCT05035823"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "paradromics-connect-one-nct07357428",
    title: "Connect-One Early Feasibility Study of Connexus BCI",
    companySlug: "paradromics-connexus",
    status: "Recruiting",
    condition: "ALS, neuromuscular disease, stroke, tetraplegia, cervical spinal cord injury, or dysarthria",
    targetFunction: "Speech restoration and computer control",
    deviceProduct: "Connexus Brain-Computer Interface",
    locations: ["UC Davis", "Massachusetts General Hospital", "University of Michigan"],
    endpoints: ["Number of subjects with device-related adverse events"],
    evidenceLevel: "E3",
    sourceLinks: [source("Connect-One clinical trial record", "trial-registry", clinicalTrials("NCT07357428"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "braingate2-nct00912041",
    title: "BrainGate2 Feasibility Study",
    companySlug: "braingate-consortium",
    status: "Recruiting",
    condition: "Tetraplegia, spinal cord injury, ALS, brainstem infarction, locked-in syndrome, or muscular dystrophy",
    targetFunction: "Computer cursor and assistive-device control",
    deviceProduct: "BrainGate2 intracortical neural interface sensor",
    locations: ["UC Davis", "Stanford", "Emory", "Massachusetts General Hospital"],
    endpoints: ["Safety of the BrainGate2 Neural Interface System"],
    evidenceLevel: "E3",
    sourceLinks: [source("BrainGate2 clinical trial record", "trial-registry", clinicalTrials("NCT00912041"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "ucsf-bravo-nct03698149",
    title: "ECoG BMI for Motor and Speech Control",
    companySlug: "ucsf-bravo",
    status: "Recruiting",
    condition: "ALS, spinal cord injury, stroke, multiple sclerosis, or muscular dystrophy",
    targetFunction: "Motor and speech control with ECoG signals",
    deviceProduct: "PMT / Blackrock combination device",
    locations: ["University of California San Francisco"],
    endpoints: ["Treatment-emergent adverse events", "Speech decoding objectives", "Motor-control objectives"],
    evidenceLevel: "E3",
    sourceLinks: [source("BRAVO clinical trial record", "trial-registry", clinicalTrials("NCT03698149"), "ClinicalTrials.gov")],
    isSample: false
  },
  {
    id: "onward-arc-bsi-nct06243952",
    title: "Brain Controlled Spinal Cord Stimulation for Lower Limb Rehabilitation",
    companySlug: "onward-arc-bci",
    status: "Active, not recruiting",
    condition: "Spinal cord injury and paraplegia",
    targetFunction: "Brain-controlled lower-limb spinal cord stimulation",
    deviceProduct: "ARC-BSI Lumbar system",
    locations: ["CHUV, Lausanne"],
    endpoints: ["Preliminary safety"],
    evidenceLevel: "E3",
    sourceLinks: [source("Brain-controlled spinal cord stimulation trial", "trial-registry", clinicalTrials("NCT06243952"), "ClinicalTrials.gov")],
    isSample: false
  }
];

export const demos: Demo[] = [
  {
    id: "neuralink-telepathy-participant-demo",
    title: "Telepathy participant digital-control demos",
    companySlug: "neuralink-prime",
    dateLabel: "Jan 2026",
    sortDate: "2026-01-29",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "Company-released participant update",
    summary:
      "Neuralink's Telepathy update includes public participant material showing use of the implanted system for computer interaction.",
    hypeCheck:
      "A company-edited demo can show a task happening, but it does not establish long-term safety, speed, or general clinical benefit.",
    sourceLinks: [source("Two Years of Telepathy update", "company-update", "https://neuralink.com/updates/two-years-of-telepathy/", "Neuralink")],
    isSample: false
  },
  {
    id: "precision-layer-7-intraoperative-demo",
    title: "Layer 7 intraoperative speech and cursor-control tasks",
    companySlug: "precision-layer-7",
    dateLabel: "Feb 2026",
    sortDate: "2026-02-01",
    classification: "lab-demo",
    evidenceLevel: "E4",
    setting: "Awake-craniotomy research sessions",
    summary:
      "Initial human Layer 7 research included intraoperative BCI tasks such as speech classification and cursor-control experiments.",
    hypeCheck:
      "These were acute supervised sessions during clinical surgery, not chronic take-home use.",
    sourceLinks: [source("Initial Layer 7 human experience", "paper", "https://thejns.org/focus/view/journals/neurosurg-focus/60/2/article-pE3.xml", "Neurosurgical Focus")],
    isSample: false
  },
  {
    id: "uc-davis-conversation-demo",
    title: "Rapidly calibrated conversational speech neuroprosthesis",
    companySlug: "uc-davis-speech-neuroprosthesis",
    dateLabel: "Aug 15, 2024",
    sortDate: "2024-08-15",
    classification: "actual-patient-use",
    evidenceLevel: "E5",
    setting: "Peer-reviewed human research system",
    summary:
      "The NEJM report describes a participant using an intracortical speech neuroprosthesis for self-paced conversation over many sessions.",
    hypeCheck:
      "The performance is high-signal, but it remains one participant in a supervised research context.",
    sourceLinks: [
      source("NEJM speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "ucsf-speech-avatar-demo",
    title: "Attempted speech decoded to text, speech audio, and avatar movement",
    companySlug: "ucsf-bravo",
    dateLabel: "Aug 23, 2023",
    sortDate: "2023-08-23",
    classification: "actual-patient-use",
    evidenceLevel: "E4",
    setting: "Peer-reviewed ECoG speech neuroprosthesis study",
    summary:
      "The UCSF BRAVO team demonstrated attempted-speech decoding into text, synthesized speech, and a talking avatar.",
    hypeCheck:
      "The demo is grounded in a Nature paper but still represents controlled research, not a ready clinical product.",
    sourceLinks: [
      source("Speech decoding and avatar control paper", "paper", "https://www.nature.com/articles/s41586-023-06443-4", "Nature"),
      source("UCSF demo video", "demo-video", "https://www.youtube.com/watch?v=vL7yMn6kiMg", "UCSF")
    ],
    isSample: false
  },
  {
    id: "onward-brain-spine-walking-demo",
    title: "Brain-spine interface enables thought-driven walking",
    companySlug: "onward-arc-bci",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    classification: "actual-patient-use",
    evidenceLevel: "E4",
    setting: "Peer-reviewed brain-spine interface study",
    summary:
      "Researchers reported a wireless brain-spine interface that let one participant stand and walk with thought-driven spinal cord stimulation.",
    hypeCheck:
      "This is a landmark one-participant implanted-system result, not routine restored walking for spinal cord injury.",
    sourceLinks: [
      source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("NeuroRestore press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore")
    ],
    isSample: false
  },
  {
    id: "synchron-switch-home-use",
    title: "Endovascular BCI digital-device control at home",
    companySlug: "synchron-stentrode",
    dateLabel: "Jan 9, 2023",
    sortDate: "2023-01-09",
    classification: "actual-patient-use",
    evidenceLevel: "E5",
    setting: "Peer-reviewed multi-participant case series",
    summary:
      "The SWITCH study reported digital-device control using a fully implanted endovascular BCI in people with severe paralysis.",
    hypeCheck:
      "The case series is meaningful human evidence, but it is not proof of broad commercial accessibility or efficacy for every user.",
    sourceLinks: [source("SWITCH study full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9857731/", "JAMA Neurology / PubMed Central")],
    isSample: false
  },
  {
    id: "braingate-handwriting-demo",
    title: "Attempted handwriting decoded into text",
    companySlug: "braingate-consortium",
    dateLabel: "May 12, 2021",
    sortDate: "2021-05-12",
    classification: "lab-demo",
    evidenceLevel: "E4",
    setting: "Supervised BrainGate research sessions",
    summary:
      "A BrainGate participant used attempted handwriting movements to generate text in real time from motor cortex signals.",
    hypeCheck:
      "The result shows a strong controlled communication task, not independent daily product use.",
    sourceLinks: [
      source("Handwriting brain-to-text paper", "paper", "https://www.nature.com/articles/s41586-021-03506-2", "Nature"),
      source("BrainGate publication videos", "demo-video", "https://www.braingate.org/publication-videos/", "BrainGate")
    ],
    isSample: false
  }
];

export const papers: Paper[] = [
  {
    id: "precision-layer-7-initial-experience-paper",
    title: "Initial experience with the Precision Neuroscience Layer 7 micro-ECoG array",
    companySlug: "precision-layer-7",
    dateLabel: "Feb 2026",
    sortDate: "2026-02-01",
    evidenceLevel: "E4",
    summary:
      "Peer-reviewed initial human intraoperative experience with the Layer 7 high-density cortical surface array.",
    sourceLinks: [source("Initial Layer 7 human experience", "paper", "https://thejns.org/focus/view/journals/neurosurg-focus/60/2/article-pE3.xml", "Neurosurgical Focus")],
    isSample: false
  },
  {
    id: "uc-davis-rapid-speech-paper",
    title: "An Accurate and Rapidly Calibrating Speech Neuroprosthesis",
    companySlug: "uc-davis-speech-neuroprosthesis",
    dateLabel: "Aug 15, 2024",
    sortDate: "2024-08-15",
    evidenceLevel: "E5",
    summary:
      "NEJM paper reporting a long-duration, rapidly calibrated intracortical speech neuroprosthesis in one participant with ALS-related severe dysarthria.",
    sourceLinks: [
      source("NEJM speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "ucsf-avatar-paper",
    title: "A high-performance neuroprosthesis for speech decoding and avatar control",
    companySlug: "ucsf-bravo",
    dateLabel: "Aug 23, 2023",
    sortDate: "2023-08-23",
    evidenceLevel: "E4",
    summary:
      "Nature paper on multimodal attempted-speech decoding from ECoG signals into text, speech audio, and avatar movement.",
    sourceLinks: [
      source("Speech decoding and avatar control paper", "paper", "https://www.nature.com/articles/s41586-023-06443-4", "Nature"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10826467/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "onward-brain-spine-interface-paper",
    title: "Walking naturally after spinal cord injury using a brain-spine interface",
    companySlug: "onward-arc-bci",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    evidenceLevel: "E4",
    summary:
      "Nature paper describing a wireless digital bridge between cortical signals and spinal cord stimulation in one participant with chronic tetraplegia.",
    sourceLinks: [source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature")],
    isSample: false
  },
  {
    id: "synchron-switch-paper",
    title: "Assessment of Safety of a Fully Implanted Endovascular Brain-Computer Interface for Severe Paralysis in 4 Patients",
    companySlug: "synchron-stentrode",
    dateLabel: "Jan 9, 2023",
    sortDate: "2023-01-09",
    evidenceLevel: "E5",
    summary:
      "JAMA Neurology case series on long-term safety and feasibility of a fully implanted endovascular BCI.",
    sourceLinks: [source("SWITCH study full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9857731/", "JAMA Neurology / PubMed Central")],
    isSample: false
  },
  {
    id: "braingate-interim-safety-paper",
    title: "Interim safety profile from the BrainGate2 feasibility study",
    companySlug: "braingate-consortium",
    dateLabel: "2023",
    sortDate: "2023-04-01",
    evidenceLevel: "E5",
    summary:
      "Peer-reviewed interim safety analysis for the long-running BrainGate2 implanted intracortical BCI feasibility study.",
    sourceLinks: [source("Interim BrainGate safety profile", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10074470/", "PubMed Central")],
    isSample: false
  },
  {
    id: "braingate-handwriting-paper",
    title: "High-performance brain-to-text communication via handwriting",
    companySlug: "braingate-consortium",
    dateLabel: "May 12, 2021",
    sortDate: "2021-05-12",
    evidenceLevel: "E4",
    summary:
      "Nature paper on decoding attempted handwriting movements from motor cortex into real-time text.",
    sourceLinks: [
      source("Handwriting brain-to-text paper", "paper", "https://www.nature.com/articles/s41586-021-03506-2", "Nature"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8163299/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "braingate-robot-arm-paper",
    title: "Reach and grasp by people with tetraplegia using a neurally controlled robotic arm",
    companySlug: "braingate-consortium",
    dateLabel: "May 2012",
    sortDate: "2012-05-16",
    evidenceLevel: "E5",
    summary:
      "Peer-reviewed human robotic-arm reach-and-grasp control using intracortical neural signals.",
    sourceLinks: [source("Robotic-arm control full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3640850/", "Nature / PubMed Central")],
    isSample: false
  }
];
