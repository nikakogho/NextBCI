import type { Company, Demo, Milestone, Paper, ProgramProject, SourceLink, Trial } from "./schema";

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
    name: "Neuralink",
    kind: "company",
    modality: "Fully implantable intracortical and cortical-stimulation BCI platform with robot-assisted placement",
    targetFunction: "Digital control, assistive-device control, speech/motor restoration research, and visual prosthesis development",
    stage: "Multiple investigational programs: PRIME / Telepathy, CAN-PRIME, CONVOY, and Blindsight / Visual Prosthesis",
    evidenceLevel: "E3",
    hq: { city: "Fremont, CA", country: "United States", lat: 37.5485, lng: -121.9886 },
    category: "invasive",
    region: "north-america",
    founded: 2016,
    website: "https://neuralink.com",
    interviewVideo: {
      title: "Elon Musk & Neuralink: Lex Fridman Podcast",
      url: "https://www.youtube.com/watch?v=Kbk9BiPhm7o"
    },
    summary:
      "Neuralink is running registered early feasibility studies of its N1 Implant and R1 Robot while also developing Blindsight, a visual-prosthesis project that has FDA Breakthrough Device Designation.",
    hypeCheck:
      "The public evidence surface is still mostly registry entries, FDA designation notices, and company-released participant updates. Treat demos and vision claims as capability claims until peer-reviewed human outcome data is available.",
    sourceLinks: [
      source("PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06429735"), "ClinicalTrials.gov"),
      source("CAN-PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06700304"), "ClinicalTrials.gov"),
      source("CONVOY assistive-device study record", "trial-registry", clinicalTrials("NCT06710626"), "ClinicalTrials.gov"),
      source("Two Years of Telepathy update", "company-update", "https://neuralink.com/updates/two-years-of-telepathy/", "Neuralink"),
      source("Blindsight breakthrough designation update", "company-update", "https://neuralink.com/updates/neuralink-receives-breakthrough-device-designation-for-blindsight/", "Neuralink"),
      source("Visual Prosthesis trial interest page", "company-update", "https://neuralink.com/trials/visual-prosthesis/", "Neuralink")
    ],
    isSample: false
  },
  {
    slug: "synchron-stentrode",
    name: "Synchron Stentrode",
    kind: "company",
    modality: "Endovascular motor neuroprosthesis implanted through the blood vessels",
    targetFunction: "Digital device control for people with severe paralysis",
    stage: "Peer-reviewed multi-patient evidence plus U.S. early feasibility follow-up",
    evidenceLevel: "E5",
    hq: { city: "Brooklyn, NY", country: "United States", lat: 40.6782, lng: -73.9442 },
    category: "minimally-invasive",
    region: "north-america",
    founded: 2012,
    website: "https://synchron.com",
    interviewVideo: {
      title: "Tom Oxley: A brain implant that turns your thoughts into text (TED)",
      url: "https://www.youtube.com/watch?v=7Fiaew7nDmE"
    },
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
    kind: "company",
    modality: "Fully implantable high-density intracortical microelectrode array with wireless telemetry",
    targetFunction: "Speech restoration, synthesized speech, and computer control for severe motor impairment",
    stage: "Recruiting Connect-One early feasibility study",
    evidenceLevel: "E3",
    hq: { city: "Austin, TX", country: "United States", lat: 30.2672, lng: -97.7431 },
    category: "invasive",
    region: "north-america",
    founded: 2015,
    website: "https://paradromics.com",
    interviewVideo: {
      title: "Matt Angle (Paradromics) on the future of high-speed brain interfaces",
      url: "https://www.youtube.com/watch?v=E2wuavyCO1E"
    },
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
    kind: "company",
    modality: "High-density flexible micro-ECoG cortical surface array",
    targetFunction: "Temporary cortical recording and mapping now; chronic assistive BCI under development",
    stage: "FDA-cleared temporary cortical interface with human intraoperative research",
    evidenceLevel: "E4",
    hq: { city: "New York, NY", country: "United States", lat: 40.7128, lng: -74.006 },
    category: "minimally-invasive",
    region: "north-america",
    founded: 2021,
    website: "https://precisionneuro.io",
    interviewVideo: {
      title: "Ben Rapoport (Precision) answers brain implant questions (WIRED)",
      url: "https://www.youtube.com/watch?v=piFhYn6KziM"
    },
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
    kind: "academic",
    modality: "Chronically implanted intracortical microelectrode arrays",
    targetFunction: "Computer cursor control, text entry, robotic-arm control, and communication",
    stage: "Long-running registered feasibility study with replicated peer-reviewed human results",
    evidenceLevel: "E5",
    hq: { city: "Providence, RI", country: "United States", lat: 41.824, lng: -71.4128 },
    category: "invasive",
    region: "north-america",
    founded: 2002,
    website: "https://www.braingate.org",
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
    kind: "academic",
    modality: "Implanted ECoG-based speech and motor BCI",
    targetFunction: "Attempted speech decoding, synthesized speech, avatar control, and motor control research",
    stage: "Recruiting registered BRAVO trial with peer-reviewed human speech results",
    evidenceLevel: "E4",
    hq: { city: "San Francisco, CA", country: "United States", lat: 37.7627, lng: -122.4577 },
    category: "minimally-invasive",
    region: "north-america",
    website: "https://changlab.ucsf.edu",
    interviewVideo: {
      title: "A Neuroprosthesis for Speech Decoding and Avatar Control (UCSF Chang Lab)",
      url: "https://www.youtube.com/watch?v=vL7yMn6kiMg"
    },
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
    kind: "academic",
    modality: "Intracortical microelectrode arrays in speech motor cortex",
    targetFunction: "Fast-calibrating brain-to-text and synthesized speech for ALS-related dysarthria",
    stage: "Peer-reviewed single-participant long-duration speech neuroprosthesis result",
    evidenceLevel: "E5",
    hq: { city: "Davis, CA", country: "United States", lat: 38.5382, lng: -121.7617 },
    category: "invasive",
    region: "north-america",
    website: "https://neuroprosthetics.science",
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
    kind: "company",
    modality: "Implanted cortical recording paired with implanted spinal cord stimulation",
    targetFunction: "Thought-driven lower-limb movement after spinal cord injury",
    stage: "Investigational ARC-BCI with peer-reviewed brain-spine interface evidence and ongoing feasibility study",
    evidenceLevel: "E4",
    hq: { city: "Eindhoven", country: "Netherlands", lat: 51.4416, lng: 5.4697 },
    category: "minimally-invasive",
    region: "europe",
    founded: 2014,
    website: "https://onwd.com",
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
  },
  {
    slug: "tsinghua-neo",
    name: "Tsinghua NEO / Neuracle",
    kind: "company",
    category: "minimally-invasive",
    region: "asia",
    modality: "Wireless, battery-free epidural minimally invasive BCI implanted in the skull without opening the dura",
    targetFunction: "Restoring hand grasp and computer control for people with high cervical spinal cord injury",
    stage: "Multi-center registration trial with dozens of participants implanted",
    evidenceLevel: "E5",
    hq: { city: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
    founded: 2023,
    summary:
      "NEO (Neural Electronic Opportunity), developed by Tsinghua University's Hong Bo with Xuanwu Hospital and commercialized via Neuracle, is a wireless epidural BCI. Its first human implant was in October 2023, and a multi-center registration trial has since implanted participants across several Chinese hospitals.",
    hypeCheck:
      "NEO is minimally invasive (epidural, dura left intact), so its signal resolution is lower than penetrating arrays; demonstrated benefit is grasp assistance and device control, not general communication.",
    sourceLinks: [
      source("Tsinghua Medicine NEO overview", "company-update", "https://www.med.tsinghua.edu.cn/en/info/1036/2381.htm", "Tsinghua University"),
      source("Fully implantable wireless BCI for humans", "paper", "https://www.cell.com/the-innovation/fulltext/S2666-6758(24)00033-X", "The Innovation"),
      source("China invasive BCI clinical trial results", "company-update", "https://www.globaltimes.cn/page/202506/1336164.shtml", "Global Times")
    ],
    isSample: false
  },
  {
    slug: "neucyber-beinao",
    name: "NeuCyber NeuroTech (Beinao)",
    kind: "company",
    category: "invasive",
    region: "asia",
    modality: "Semi-invasive cortical-surface array (Beinao-1) and penetrating flexible microelectrodes (Beinao-2)",
    targetFunction: "Motor and communication decoding for paralysis, plus neuroscience research",
    stage: "Beinao-1 in multi-patient human trials; invasive Beinao-2 moving toward clinical validation",
    evidenceLevel: "E3",
    hq: { city: "Beijing", country: "China", lat: 39.9142, lng: 116.4174 },
    founded: 2023,
    summary:
      "NeuCyber NeuroTech, backed by the Chinese Institute for Brain Research in Beijing, runs the Beinao program: the semi-invasive Beinao-1, with more than a dozen reported human implants, and the fully invasive flexible-electrode Beinao-2 now advancing toward clinical use.",
    hypeCheck:
      "Company and state-media statements describe implant counts and roadmaps; independent peer-reviewed human outcome data is still limited, and NeuCyber frames Beinao as roughly three years behind Neuralink.",
    sourceLinks: [
      source("Homegrown BCI system set to expand", "company-update", "https://www.chinadaily.com.cn/a/202606/13/WS6a2ca1fba310986e2b45fb6b.html", "China Daily"),
      source("China world-first invasive brain chip", "company-update", "https://www.technologyreview.com/2026/06/01/1138133/china-world-first-brain-chip/", "MIT Technology Review"),
      source("China catching up in brain tech", "company-update", "https://www.cnn.com/2025/07/20/china/china-brain-tech-hnk-intl-dst", "CNN")
    ],
    isSample: false
  },
  {
    slug: "neuroxess",
    name: "NeuroXess",
    kind: "company",
    category: "invasive",
    region: "asia",
    modality: "High-throughput flexible intracortical electrode arrays, including a fully implanted wireless system",
    targetFunction: "Real-time Chinese speech decoding and motor control for paralysis, ALS, and stroke",
    stage: "First-in-human flexible-electrode trials with a reported fully implanted, battery-integrated system",
    evidenceLevel: "E4",
    hq: { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
    founded: 2021,
    summary:
      "Shanghai flexible-electrode startup NeuroXess ran China's first high-throughput flexible BCI trial for Chinese speech synthesis in December 2024 (256 channels, at Huashan Hospital), published real-time Chinese decoding in Science Advances, and reports a fully implanted, wireless, battery-integrated 'triple-full' system.",
    hypeCheck:
      "Speech-decoding results are early single- and few-participant studies; several accuracy figures come from company and state-media announcements pending broader independent replication.",
    sourceLinks: [
      source("Deciphering Chinese speech in brain", "company-update", "http://english.news.cn/20250103/e7daabd73bd749cf8d92c363d1722721/c.html", "Xinhua"),
      source("Real-time decoding of full-spectrum Chinese", "paper", "https://www.science.org/doi/10.1126/sciadv.adz9968", "Science Advances"),
      source("Battery-integrated brain chip implant", "company-update", "https://www.yicaiglobal.com/news/neuroxess-achieves-milestone-with-chinas-first-battery-integrated-bci-implant", "Yicai Global")
    ],
    isSample: false
  },
  {
    slug: "stairmed",
    name: "StairMed",
    kind: "company",
    category: "minimally-invasive",
    region: "asia",
    modality: "Coin-sized minimally invasive implant with ultra-flexible electrodes placed through a 3-5 mm skull incision",
    targetFunction: "Motor and device control for paralysis and severe neurological impairment",
    stage: "First prospective clinical trial implant in March 2025; scaling toward commercialization",
    evidenceLevel: "E3",
    hq: { city: "Shanghai", country: "China", lat: 31.2404, lng: 121.4637 },
    founded: 2021,
    funding: "RMB 350M Series B, plus a later RMB 500M round led by Alibaba and Tencent (2025)",
    summary:
      "Shanghai's StairMed builds among the smallest minimally invasive BCI implants, requiring only a 3-5 mm incision. Its first prospective clinical trial implant took place in March 2025, backed by some of the largest financing rounds in China's implantable-BCI sector.",
    hypeCheck:
      "The clinical program is early (first-in-human in 2025); miniaturization and funding are real, but durable multi-patient outcome evidence has not yet been published.",
    sourceLinks: [
      source("Brain-machine firm gets major investment", "company-update", "https://global.chinadaily.com.cn/a/202502/12/WS67abf242a310a2ab06eaba81.html", "China Daily"),
      source("StairMed raises $73m for BMI and DBS", "company-update", "https://www.medicaldevice-network.com/news/stairmed-raises-73m-to-advance-bmi-and-dbs-system-development/", "Medical Device Network"),
      source("StairMed RMB 500M financing", "company-update", "https://www.prnewswire.com/news-releases/stairmed-secures-rmb-500-million-financing-led-by-alibaba-joined-by-tencent-302732525.html", "PR Newswire")
    ],
    isSample: false
  },
  {
    slug: "clinatec-wimagine",
    name: "Clinatec / CEA WIMAGINE",
    kind: "academic",
    category: "minimally-invasive",
    region: "europe",
    modality: "Bilateral epidural ECoG implants (WIMAGINE) reading cortical-surface signals",
    targetFunction: "Whole-body exoskeleton and effector control for tetraplegia",
    stage: "Peer-reviewed proof-of-concept in a tetraplegic patient; multi-patient study ongoing",
    evidenceLevel: "E4",
    hq: { city: "Grenoble", country: "France", lat: 45.1885, lng: 5.7245 },
    summary:
      "Clinatec, a CEA laboratory in Grenoble, developed the WIMAGINE epidural ECoG implant. In 2019 a tetraplegic patient used two implants to control a four-limb exoskeleton, published in The Lancet Neurology. CEA has since licensed WIMAGINE to ONWARD Medical.",
    hypeCheck:
      "The landmark result is a single-patient proof-of-concept requiring months of training; epidural ECoG trades signal detail for safety, and the exoskeleton is a research platform, not a home device.",
    sourceLinks: [
      source("Exoskeleton controlled by epidural BCI", "paper", "https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(19)30321-7/abstract", "The Lancet Neurology"),
      source("Groundbreaking neuroprosthetic (UGA)", "company-update", "https://international.univ-grenoble-alpes.fr/about/flagship-projects/a-groundbreaking-neuroprosthetic-enables-a-tetraplegic-patient-fitted-with-an-exoskeleton-to-move-808028.kjsp", "Universite Grenoble Alpes"),
      source("ONWARD licenses WIMAGINE from CEA", "company-update", "https://www.globenewswire.com/news-release/2024/10/15/2962898/0/en/ONWARD-Medical-Signs-Agreement-with-CEA-for-Exclusive-Rights-to-Clinatec-s-WIMAGINE-Brain-Computer-Interface-BCI-Technology.html", "GlobeNewswire / ONWARD")
    ],
    isSample: false
  },
  {
    slug: "ability-wyss",
    name: "ABILITY Neurotech / Wyss Center",
    kind: "company",
    category: "minimally-invasive",
    region: "europe",
    modality: "Fully implantable wireless ECoG BCI with an optical trans-scalp data link",
    targetFunction: "Communication and assistive-device control for people with ALS and severe paralysis",
    stage: "Approved in 2026 to begin its first chronic implantation study in ALS",
    evidenceLevel: "E3",
    hq: { city: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432 },
    founded: 2023,
    website: "https://abilityneuro.com",
    summary:
      "ABILITY Neurotech, a Wyss Center (Geneva) spinout, is developing a fully implantable wireless ECoG BCI with an optical data link. Building on the Wyss Center's earlier work letting a locked-in ALS patient communicate, ABILITY received regulatory approval in 2026 to begin a chronic ALS implantation study with CorTec and UMC Utrecht.",
    hypeCheck:
      "The chronic clinical study is only just beginning; earlier locked-in communication results involved very few participants, and home-ready performance is unproven.",
    sourceLinks: [
      source("ABILITY receives approval for ALS trial", "company-update", "https://www.prnewswire.com/news-releases/ability-neurotech-receives-imdd-approval-to-start-clinical-trial-for-chronic-implantation-of-brain-computer-interface-in-als-patients-302781809.html", "PR Newswire"),
      source("Fully implantable BCI consortium", "company-update", "https://wysscenter.ch/update/consortium-to-develop-fully-implantable-brain-computer-interface-to-enable-communication-for-people-with-paralysis/", "Wyss Center"),
      source("ABILITY Neurotech", "company-update", "https://abilityneuro.com/", "ABILITY Neurotech")
    ],
    isSample: false
  },
  {
    slug: "inbrain-neuroelectronics",
    name: "INBRAIN Neuroelectronics",
    kind: "company",
    category: "minimally-invasive",
    region: "europe",
    modality: "Graphene-based cortical-surface neural interface for high-resolution decoding and mapping",
    targetFunction: "Intraoperative brain mapping now; therapeutic neuromodulation and decoding under development",
    stage: "World-first human graphene BCI procedure (2024); first-in-human study enrolment completed (2026)",
    evidenceLevel: "E3",
    hq: { city: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 },
    founded: 2020,
    funding: "$50M Series B (2024)",
    summary:
      "Barcelona-based INBRAIN Neuroelectronics performed the world's first human procedure with a graphene cortical interface in September 2024 at Salford Royal Hospital in Manchester, distinguishing tumor from healthy tissue with micrometer precision, and completed enrolment of its first-in-human study in 2026.",
    hypeCheck:
      "Current human use is intraoperative mapping during tumor surgery, not a chronic assistive or therapeutic BCI; graphene's clinical advantages are still being evaluated.",
    sourceLinks: [
      source("World's first human graphene BCI procedure", "company-update", "https://www.businesswire.com/news/home/20240926260728/en/INBRAIN-Neuroelectronics-Announces-Worlds-First-Human-Graphene-Based-Brain-Computer-Interface-Procedure", "Business Wire / INBRAIN"),
      source("INBRAIN raises $50M Series B", "company-update", "https://www.businesswire.com/news/home/20241029660063/en/INBRAIN-Neuroelectronics-Raises-%2450M-Series-B-to-Advance-Graphene-Based-Brain-Computer-Interface-Technology", "Business Wire / INBRAIN"),
      source("First-in-human study enrolment complete", "company-update", "https://www.businesswire.com/news/home/20260420000990/en/INBRAIN-Neuroelectronics-Completes-Enrolment-of-Worlds-First-in-Human-Study-of-Graphene-Neural-Interfaces-for-Brain-Decoding-Mapping", "Business Wire / INBRAIN")
    ],
    isSample: false
  },
  {
    slug: "blackrock-neurotech",
    name: "Blackrock Neurotech",
    kind: "company",
    category: "invasive",
    region: "north-america",
    modality: "Utah/NeuroPort intracortical microelectrode arrays and the next-gen Neuralace high-density array",
    targetFunction: "Cursor, device, prosthetic, and communication control for paralysis and motor disorders",
    stage: "MoveAgain BCI holds FDA Breakthrough Device Designation; Utah array used across human research",
    evidenceLevel: "E5",
    hq: { city: "Salt Lake City, UT", country: "United States", lat: 40.7608, lng: -111.891 },
    founded: 2008,
    website: "https://blackrockneurotech.com",
    funding: "$200M from Tether (2024)",
    summary:
      "Salt Lake City-based Blackrock Neurotech makes the Utah/NeuroPort array — the microelectrode implant behind much of the last two decades of human BCI research — and is developing the MoveAgain assistive BCI plus the 10,000+ channel Neuralace array.",
    hypeCheck:
      "The Utah array underpins many peer-reviewed human results, but MoveAgain as an integrated commercial BCI remains investigational (breakthrough-designated), and Neuralace is still early.",
    sourceLinks: [
      source("MoveAgain gets FDA Breakthrough Device Designation", "regulatory-page", "https://www.prnewswire.com/news-releases/blackrock-neurotechs-moveagain-brain-computer-interface-system-receives-breakthrough-device-designation-from-the-fda-301425013.html", "PR Newswire / Blackrock"),
      source("Blackrock reveals Neuralace 10,000+ channel BCI", "company-update", "https://www.prnewswire.com/news-releases/blackrock-neurotech-reveals-neuralace-10-000-channel-next-gen-bci-301679826.html", "PR Newswire / Blackrock"),
      source("How the Utah Array advances BCI science", "company-update", "https://www.medicaldesignandoutsourcing.com/utah-array-brain-computer-interface-blackrock-neurotech/", "Medical Design & Outsourcing")
    ],
    isSample: false
  },
  {
    slug: "nudge",
    name: "Nudge",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Non-invasive focused-ultrasound brain interface with MRI-guided phased-array stimulation and imaging",
    targetFunction: "Deep-brain neuromodulation research for chronic pain, substance use disorder, anxiety, and future generalized brain-interface applications",
    stage: "Company-run human feasibility studies with Nudge Zero; no published Nudge human efficacy readout yet",
    evidenceLevel: "E1",
    hq: { city: "San Francisco, CA", country: "United States", lat: 37.7749, lng: -122.4194 },
    founded: 2024,
    website: "https://nudge.com",
    funding: "$100M Series A (2025)",
    summary:
      "Nudge is building a non-invasive focused-ultrasound brain-interface platform. Its first architecture, Nudge Zero, is a high-channel-count ultrasound phased array used in an MRI setting for feasibility research on deep-brain stimulation and imaging.",
    hypeCheck:
      "Nudge's own study page says current studies are initial device feasibility studies, not treatment studies. Treat therapeutic and consumer augmentation claims as roadmap until controlled human outcomes are published.",
    sourceLinks: [
      source("Nudge mission and technology", "company-update", "https://nudge.com/blog/about/", "Nudge"),
      source("Nudge study overview", "company-update", "https://nudge.com/blog/about-studies/", "Nudge"),
      source("Nudge Series A announcement", "company-update", "https://nudge.com/blog/series-a/", "Nudge"),
      source("Nudge company profile", "company-update", "https://www.linkedin.com/company/nudge-corp", "LinkedIn", false)
    ],
    isSample: false
  },
  {
    slug: "neurosity-crown",
    name: "Neurosity Crown",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "8-channel dry-contact EEG headset with onboard processing, app dashboards, and developer SDK access",
    targetFunction: "Focus and meditation neurofeedback, raw EEG data streaming, and developer BCI app prototyping",
    stage: "Commercial consumer and developer EEG platform",
    evidenceLevel: "E2",
    hq: { city: "Brooklyn, NY", country: "United States", lat: 40.7209, lng: -73.9612 },
    founded: 2018,
    website: "https://neurosity.co",
    summary:
      "Neurosity sells Crown, a non-invasive EEG headset positioned around focus, meditation, dashboards, and developer access to real-time brain data through JavaScript and Python workflows.",
    hypeCheck:
      "Crown is useful to track as a consumer/developer EEG platform, but it is not demonstrated evidence of a clinical restoration BCI or reliable medical assistive control.",
    sourceLinks: [
      source("Crown product page", "company-update", "https://neurosity.co/", "Neurosity"),
      source("Crown technical specifications", "company-update", "https://neurosity.co/tech-specs", "Neurosity"),
      source("Neurosity developer page", "company-update", "https://neurosity.co/developers", "Neurosity"),
      source("Neurosity privacy policy contact address", "company-update", "https://neurosity.co/privacy-policy", "Neurosity"),
      source("Neurosity company profile", "company-update", "https://www.linkedin.com/company/neurosity", "LinkedIn", false)
    ],
    isSample: false
  },
  {
    slug: "muse-interaxon",
    name: "Muse / InteraXon",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Consumer EEG brain-sensing headbands with meditation, sleep, neurofeedback, and research workflows",
    targetFunction: "Meditation, sleep and mental-fitness neurofeedback; low-cost EEG research and BCI prototyping",
    stage: "Commercial wellness EEG platform with peer-reviewed validation for ERP research",
    evidenceLevel: "E4",
    hq: { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
    founded: 2007,
    website: "https://choosemuse.com",
    summary:
      "InteraXon founded Muse to bring EEG out of the lab and into consumer use. Muse headbands are sold for meditation, sleep, and mental fitness, and the original Muse system has peer-reviewed validation for portable ERP research.",
    hypeCheck:
      "Peer-reviewed EEG validation and wellness neurofeedback do not establish treatment efficacy or assistive medical BCI performance. Keep Muse in the non-invasive EEG bucket, not the implanted-restoration bucket.",
    sourceLinks: [
      source("Muse team and timeline", "company-update", "https://choosemuse.com/pages/team", "Muse / InteraXon"),
      source("Muse science page", "company-update", "https://choosemuse.com/pages/science", "Muse / InteraXon"),
      source("Muse contact address", "company-update", "https://choosemuse.com/pages/contact", "Muse / InteraXon"),
      source("Choosing MUSE validation paper", "paper", "https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2017.00109/full", "Frontiers in Neuroscience"),
      source("InteraXon and Muse journey", "news-report", "https://ised-isde.canada.ca/site/canadian-intellectual-property-office/en/corporate-information/intellectual-property-blog/unlocking-success-intellectual-property-interaxon-and-muse-journey", "Canadian Intellectual Property Office", false)
    ],
    isSample: false
  },
  {
    slug: "emotiv",
    name: "Emotiv",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Wireless EEG headsets, including 14-channel Epoc X, plus software, APIs, and brain-data platforms",
    targetFunction: "Research EEG, product/user research, cognitive metrics, developer BCI apps, and non-invasive human-computer interaction",
    stage: "Commercial mobile EEG platform with peer-reviewed validation literature; not marketed as a medical device",
    evidenceLevel: "E4",
    hq: { city: "San Francisco, CA", country: "United States", lat: 37.7749, lng: -122.4194 },
    founded: 2011,
    website: "https://www.emotiv.com",
    summary:
      "Emotiv builds wireless EEG hardware and software for research, enterprise, personal neuroscience, and BCI development. Its Epoc line has independent peer-reviewed validation for research-quality ERP measurements.",
    hypeCheck:
      "Emotiv supports research and developer BCI work, but consumer EEG features and mental-command demos should not be treated as reliable clinical assistive control or disease treatment.",
    sourceLinks: [
      source("Emotiv home page", "company-update", "https://www.emotiv.com/", "Emotiv"),
      source("Emotiv about page", "company-update", "https://www.emotiv.com/about", "Emotiv"),
      source("Epoc X specifications", "company-update", "https://www.emotiv.com/epoc-x", "Emotiv"),
      source("Emotiv contact address", "company-update", "https://www.emotiv.com/contact", "Emotiv"),
      source("Emotiv EPOC validation paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/23638374/", "PubMed / PeerJ")
    ],
    isSample: false
  },
  {
    slug: "science-corp",
    name: "Science Corporation",
    kind: "company",
    category: "minimally-invasive",
    region: "north-america",
    modality: "PRIMA subretinal vision implant and a biohybrid neural interface that grows engineered neurons onto cortex",
    targetFunction: "Vision restoration now; cortical communication and control via the biohybrid interface in development",
    stage: "PRIMA in commercialization; biohybrid brain interface preclinical, preparing first human placement",
    evidenceLevel: "E2",
    hq: { city: "Alameda, CA", country: "United States", lat: 37.7652, lng: -122.2416 },
    founded: 2021,
    funding: "$230M Series C (2026), ~$1.5B valuation",
    summary:
      "Science Corporation, founded by former Neuralink president Max Hodak in Alameda, California, is commercializing the PRIMA retinal implant for vision restoration and developing a biohybrid neural interface that grows engineered neurons onto a device on the brain's surface.",
    hypeCheck:
      "PRIMA (vision) is the clinically advanced product; the biohybrid brain-computer interface is still preclinical, with first human placement not expected before roughly 2027.",
    sourceLinks: [
      source("Science Corp closes $230M Series C for PRIMA", "company-update", "https://www.businesswire.com/news/home/20260305896789/en/Science-Corporation-Closes-$230-Million-Series-C-to-Accelerate-Commercialization-of-Its-PRIMA-BCI-Retinal-Implant-the-Worlds-Most-Advanced-Vision-Restoration-Technology", "Business Wire / Science"),
      source("Science Corp raises $230M as it races to market", "company-update", "https://techcrunch.com/2026/03/05/science-corp-closes-230m-round-as-it-pushes-to-get-its-brain-implant-to-patients/", "TechCrunch"),
      source("Science Corp preparing first human brain sensor", "company-update", "https://techcrunch.com/2026/04/14/max-hodaks-science-corp-is-preparing-to-place-its-first-sensor-in-a-human-brain/", "TechCrunch")
    ],
    isSample: false
  }
];

export const programProjects: ProgramProject[] = [
  {
    id: "neuralink-telepathy-prime",
    companySlug: "neuralink-prime",
    name: "Telepathy / PRIME",
    focus: "Motor BCI for cursor, device, and assistive-control use",
    modality: "N1 intracortical recording implant placed by the R1 surgical robot",
    statusLabel: "Registered early feasibility studies with company-released participant updates",
    evidenceLevel: "E3",
    latestUpdateLabel: "Jan 2026 company update",
    sortDate: "2026-01-29",
    summary:
      "Telepathy is Neuralink's motor-control BCI application, studied through PRIME, CAN-PRIME, and CONVOY records for people with severe motor impairment.",
    demonstrated:
      "Registered human studies and company-published participant material showing digital-device interaction.",
    notYetShown:
      "Peer-reviewed human endpoint data, long-term safety readouts, and approved commercial assistive use.",
    sourceLinks: [
      source("PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06429735"), "ClinicalTrials.gov"),
      source("CAN-PRIME clinical trial record", "trial-registry", clinicalTrials("NCT06700304"), "ClinicalTrials.gov"),
      source("CONVOY assistive-device study record", "trial-registry", clinicalTrials("NCT06710626"), "ClinicalTrials.gov"),
      source("Two Years of Telepathy update", "company-update", "https://neuralink.com/updates/two-years-of-telepathy/", "Neuralink")
    ],
    isSample: false
  },
  {
    id: "neuralink-blindsight-visual-prosthesis",
    companySlug: "neuralink-prime",
    name: "Blindsight / Visual Prosthesis",
    focus: "Visual perception restoration for people with vision impairment",
    modality: "Brain implant intended to stimulate visual cortex and bypass damaged eyes or optic nerves",
    statusLabel: "FDA Breakthrough Device Designation; Neuralink visual-prosthesis interest page is live",
    evidenceLevel: "E1",
    latestUpdateLabel: "Sep 2024 designation; trial-interest page live",
    sortDate: "2024-09-17",
    summary:
      "Blindsight is Neuralink's visual-prosthesis project. Neuralink says it received FDA Breakthrough Device Designation for individuals with vision impairment and now routes interested people through a Visual Prosthesis page and patient registry.",
    demonstrated:
      "A company-announced FDA Breakthrough Device Designation and an official Neuralink Visual Prosthesis interest page.",
    notYetShown:
      "A registered human Blindsight trial, first human implant, peer-reviewed human visual-perception data, or approved/cleared clinical use.",
    sourceLinks: [
      source("Blindsight breakthrough designation update", "company-update", "https://neuralink.com/updates/neuralink-receives-breakthrough-device-designation-for-blindsight/", "Neuralink"),
      source("Visual Prosthesis trial interest page", "company-update", "https://neuralink.com/trials/visual-prosthesis/", "Neuralink"),
      source("FDA Breakthrough Devices Program overview", "regulatory-page", "https://www.fda.gov/medical-devices/how-study-and-market-your-device/breakthrough-devices-program", "U.S. FDA", false),
      source("IEEE Spectrum analysis of Blindsight claims", "news-report", "https://spectrum.ieee.org/neuralink-blindsight", "IEEE Spectrum", false)
    ],
    isSample: false
  },
  {
    id: "nudge-zero-focused-ultrasound",
    companySlug: "nudge",
    name: "Nudge Zero",
    focus: "MRI-guided focused-ultrasound stimulation and imaging for deep-brain feasibility studies",
    modality: "High-channel-count ultrasound phased array in a helmet form factor",
    statusLabel: "Human-ready research system used in initial feasibility studies",
    evidenceLevel: "E1",
    latestUpdateLabel: "Jul 2025 Series A update",
    sortDate: "2025-07-22",
    summary:
      "Nudge Zero is the company's first focused-ultrasound brain-interface architecture, intended to stimulate and image deep brain targets while used in an MRI setting.",
    demonstrated:
      "Company-published device photos/renderings, active feasibility-study pages, and a statement that the device is being used with people in research sessions.",
    notYetShown:
      "Peer-reviewed Nudge human outcomes, registered pivotal trials, approved treatments, or portable home use.",
    sourceLinks: [
      source("Nudge mission and technology", "company-update", "https://nudge.com/blog/about/", "Nudge"),
      source("Nudge study overview", "company-update", "https://nudge.com/blog/about-studies/", "Nudge"),
      source("Nudge Series A announcement", "company-update", "https://nudge.com/blog/series-a/", "Nudge")
    ],
    isSample: false
  },
  {
    id: "neurosity-crown-eeg",
    companySlug: "neurosity-crown",
    name: "Crown",
    focus: "Consumer/developer EEG for focus tracking, meditation, and neuro app prototyping",
    modality: "8-channel dry EEG headset with N3 onboard processing, Wi-Fi/Bluetooth, and SDK access",
    statusLabel: "Commercial EEG headset with public technical specifications and developer tooling",
    evidenceLevel: "E2",
    latestUpdateLabel: "2026 product/spec pages",
    sortDate: "2026-07-09",
    summary:
      "Crown is Neurosity's current non-invasive EEG headset, marketed around focus and meditation while also exposing data and SDK tooling for developers.",
    demonstrated:
      "Public product pages listing eight EEG sensors, a 256 Hz sample rate, app dashboards, and developer SDK workflows.",
    notYetShown:
      "Clinical assistive-control endpoints, FDA-cleared medical use, or peer-reviewed evidence that Crown restores function.",
    sourceLinks: [
      source("Crown product page", "company-update", "https://neurosity.co/", "Neurosity"),
      source("Crown technical specifications", "company-update", "https://neurosity.co/tech-specs", "Neurosity"),
      source("Neurosity developer page", "company-update", "https://neurosity.co/developers", "Neurosity")
    ],
    isSample: false
  },
  {
    id: "muse-eeg-headbands",
    companySlug: "muse-interaxon",
    name: "Muse EEG Headbands",
    focus: "Meditation, sleep, wellness neurofeedback, and low-cost EEG research",
    modality: "Consumer EEG headband family with brain-sensing software and research tools",
    statusLabel: "Commercial wellness platform with peer-reviewed ERP validation for the original Muse system",
    evidenceLevel: "E4",
    latestUpdateLabel: "2017 validation paper plus current Muse science pages",
    sortDate: "2017-03-10",
    summary:
      "Muse headbands bring EEG into consumer meditation and sleep workflows, while research pages and validation literature document use in portable EEG studies.",
    demonstrated:
      "Commercial EEG products and a Frontiers validation paper showing that a portable MUSE system can support ERP research tasks.",
    notYetShown:
      "Medical treatment efficacy, approved therapeutic claims, or implanted-style assistive BCI performance.",
    sourceLinks: [
      source("Muse team and timeline", "company-update", "https://choosemuse.com/pages/team", "Muse / InteraXon"),
      source("Muse science page", "company-update", "https://choosemuse.com/pages/science", "Muse / InteraXon"),
      source("Choosing MUSE validation paper", "paper", "https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2017.00109/full", "Frontiers in Neuroscience")
    ],
    isSample: false
  },
  {
    id: "emotiv-epoc-x-platform",
    companySlug: "emotiv",
    name: "Epoc X / Emotiv Platform",
    focus: "Mobile EEG hardware and software for research, BCI development, and cognitive-state applications",
    modality: "14-channel wireless EEG headset plus Cortex APIs, SDKs, and software tools",
    statusLabel: "Commercial EEG platform with validation literature and an explicit non-medical-device disclaimer",
    evidenceLevel: "E4",
    latestUpdateLabel: "2026 product/about pages; 2013 EPOC validation",
    sortDate: "2026-07-09",
    summary:
      "Emotiv's Epoc X and related software stack support mobile EEG research and developer BCI workflows while the broader Epoc line has peer-reviewed ERP validation.",
    demonstrated:
      "Public specifications for 14 EEG channels, wireless operation, cognitive metrics, API/SDK links, and peer-reviewed EPOC ERP validation.",
    notYetShown:
      "Approved medical diagnosis/treatment use or dependable clinical assistive control from consumer EEG alone.",
    sourceLinks: [
      source("Epoc X specifications", "company-update", "https://www.emotiv.com/epoc-x", "Emotiv"),
      source("Emotiv about page", "company-update", "https://www.emotiv.com/about", "Emotiv"),
      source("Emotiv EPOC validation paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/23638374/", "PubMed / PeerJ")
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
    id: "neuralink-blindsight-breakthrough-2024",
    title: "Blindsight receives FDA Breakthrough Device Designation",
    companySlug: "neuralink-prime",
    dateLabel: "Sep 17, 2024",
    sortDate: "2024-09-17",
    status: "confirmed",
    type: "regulatory-designation",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Neuralink announced FDA Breakthrough Device Designation for Blindsight, its visual-prosthesis project for people with vision impairment.",
    whyItMatters:
      "Breakthrough designation can increase FDA interaction and review priority for a device that may address an irreversibly debilitating condition.",
    hypeCheck:
      "A breakthrough designation is not approval, clearance, or proof that Blindsight restores useful vision in humans.",
    sourceLinks: [
      source("Blindsight breakthrough designation update", "company-update", "https://neuralink.com/updates/neuralink-receives-breakthrough-device-designation-for-blindsight/", "Neuralink"),
      source("FDA Breakthrough Devices Program overview", "regulatory-page", "https://www.fda.gov/medical-devices/how-study-and-market-your-device/breakthrough-devices-program", "U.S. FDA", false)
    ],
    isSample: false
  },
  {
    id: "nudge-series-a-2025",
    title: "Nudge announces $100M Series A for focused-ultrasound brain interface",
    companySlug: "nudge",
    dateLabel: "Jul 22, 2025",
    sortDate: "2025-07-22",
    status: "confirmed",
    type: "funding-round",
    evidenceLevel: "E1",
    confidence: "high",
    summary:
      "Nudge announced a $100M Series A led by Thrive Capital and Greenoaks to advance its non-invasive focused-ultrasound brain-interface platform.",
    whyItMatters:
      "The financing gives Nudge enough runway to build hardware, imaging, and human feasibility infrastructure around focused-ultrasound neuromodulation.",
    hypeCheck:
      "Funding is not clinical evidence; the same update frames the device as a platform still being developed through research studies.",
    sourceLinks: [source("Nudge Series A announcement", "company-update", "https://nudge.com/blog/series-a/", "Nudge")],
    isSample: false
  },
  {
    id: "nudge-zero-feasibility-studies-2025",
    title: "Nudge opens focused-ultrasound feasibility studies",
    companySlug: "nudge",
    dateLabel: "Apr 7, 2025",
    sortDate: "2025-04-07",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Nudge said it was conducting feasibility studies to evaluate focused ultrasound delivered to deep brain targets for chronic pain and substance use disorder research.",
    whyItMatters:
      "Human feasibility work is the first public evidence checkpoint for Nudge's deep-brain, non-invasive ultrasound approach.",
    hypeCheck:
      "Nudge's study page explicitly says the current studies are initial device feasibility studies and are not treatment studies.",
    sourceLinks: [
      source("Nudge study overview", "company-update", "https://nudge.com/blog/about-studies/", "Nudge"),
      source("Nudge mission and technology", "company-update", "https://nudge.com/blog/about/", "Nudge")
    ],
    isSample: false
  },
  {
    id: "neurosity-crown-tech-specs-2026",
    title: "Crown specs list 8-channel consumer/developer EEG platform",
    companySlug: "neurosity-crown",
    dateLabel: "Current product page",
    sortDate: "2026-07-09",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Neurosity's current Crown specs list eight EEG sensors, 256 Hz sampling, dry sensors, onboard computing, app dashboards, and developer tooling.",
    whyItMatters:
      "It places Crown in the non-invasive EEG/developer-platform tier that can support prototyping and research workflows.",
    hypeCheck:
      "A commercial EEG product page is not clinical evidence for medical restoration or assistive-device control.",
    sourceLinks: [
      source("Crown technical specifications", "company-update", "https://neurosity.co/tech-specs", "Neurosity"),
      source("Neurosity developer page", "company-update", "https://neurosity.co/developers", "Neurosity")
    ],
    isSample: false
  },
  {
    id: "muse-first-headband-2014",
    title: "Muse launches first brain-sensing headband",
    companySlug: "muse-interaxon",
    dateLabel: "2014",
    sortDate: "2014-05-01",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "InteraXon's Muse timeline says Muse launched its first brain-sensing headband in 2014, making meditation measurable and accessible.",
    whyItMatters:
      "Muse is one of the better-known consumer EEG platforms and a useful reference point for the non-invasive/wellness side of BCI-adjacent products.",
    hypeCheck:
      "A consumer product launch is not evidence of medical benefit or reliable assistive BCI performance.",
    sourceLinks: [source("Muse team and timeline", "company-update", "https://choosemuse.com/pages/team", "Muse / InteraXon")],
    isSample: false
  },
  {
    id: "muse-erp-validation-2017",
    title: "Muse validated for portable ERP research",
    companySlug: "muse-interaxon",
    dateLabel: "Mar 10, 2017",
    sortDate: "2017-03-10",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "A Frontiers in Neuroscience methods paper reported that a portable MUSE EEG system could support ERP research in visual oddball and reward-learning tasks.",
    whyItMatters:
      "Peer-reviewed validation helps distinguish low-cost EEG research utility from broad consumer wellness claims.",
    hypeCheck:
      "ERP validation does not prove that Muse treats disease or provides clinical assistive BCI control.",
    sourceLinks: [
      source("Choosing MUSE validation paper", "paper", "https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2017.00109/full", "Frontiers in Neuroscience")
    ],
    isSample: false
  },
  {
    id: "emotiv-epoc-validation-2013",
    title: "Emotiv EPOC validated for research-quality auditory ERPs",
    companySlug: "emotiv",
    dateLabel: "Feb 19, 2013",
    sortDate: "2013-02-19",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "A PeerJ validation study reported that the Emotiv EPOC gaming EEG system could record reliable late auditory ERP measurements compared with lab systems.",
    whyItMatters:
      "It gives Emotiv a peer-reviewed evidence anchor for research EEG use rather than relying only on product claims.",
    hypeCheck:
      "ERP signal validation does not establish medical diagnosis, treatment, or robust clinical BCI control.",
    sourceLinks: [
      source("Emotiv EPOC validation paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/23638374/", "PubMed / PeerJ")
    ],
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
  },
  {
    id: "tsinghua-neo-first-implant-2023",
    title: "NEO completes first human epidural BCI implant",
    companySlug: "tsinghua-neo",
    dateLabel: "Oct 24, 2023",
    sortDate: "2023-10-24",
    status: "confirmed",
    type: "first-implant",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "The Tsinghua team implanted the wireless, battery-free NEO device in a high-cervical spinal cord injury patient at Xuanwu Hospital, capturing sensorimotor signals without opening the dura.",
    whyItMatters:
      "It launched China's minimally invasive epidural BCI clinical program and demonstrated a battery-free, wireless implant approach.",
    hypeCheck:
      "Epidural recording is lower-resolution than penetrating arrays; early function was assisted grasp, not fluent communication.",
    sourceLinks: [
      source("Tsinghua Medicine NEO overview", "company-update", "https://www.med.tsinghua.edu.cn/en/info/1036/2381.htm", "Tsinghua University"),
      source("Fully implantable wireless BCI for humans", "paper", "https://www.cell.com/the-innovation/fulltext/S2666-6758(24)00033-X", "The Innovation")
    ],
    isSample: false
  },
  {
    id: "tsinghua-neo-multicenter-2026",
    title: "NEO multi-center registration trial scales across hospitals",
    companySlug: "tsinghua-neo",
    dateLabel: "2025-2026",
    sortDate: "2026-05-01",
    status: "confirmed",
    type: "trial-site-added",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "NEO moved into a multi-center registration trial, with participants implanted across several Chinese hospitals as reported by state media and the program team.",
    whyItMatters:
      "Scaling to a registration trial is the step toward a regulated, repeatable clinical product rather than a single proof-of-concept.",
    hypeCheck:
      "Reported enrollment and success rates come largely from the team and state media; detailed peer-reviewed outcomes are still emerging.",
    sourceLinks: [
      source("China invasive BCI clinical trial results", "company-update", "https://www.globaltimes.cn/page/202506/1336164.shtml", "Global Times")
    ],
    isSample: false
  },
  {
    id: "neucyber-beinao1-implants-2026",
    title: "Beinao-1 passes a dozen-plus human implants",
    companySlug: "neucyber-beinao",
    dateLabel: "Jun 2026",
    sortDate: "2026-06-13",
    status: "confirmed",
    type: "additional-implant",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "NeuCyber reported that its semi-invasive Beinao-1 system had reached more than a dozen human implants, with the longest implantation exceeding a year.",
    whyItMatters:
      "A growing implant cohort with long duration is a meaningful signal of a maturing semi-invasive BCI program.",
    hypeCheck:
      "Implant counts are company- and state-media-reported; independent peer-reviewed outcome data remains limited.",
    sourceLinks: [
      source("Homegrown BCI system set to expand", "company-update", "https://www.chinadaily.com.cn/a/202606/13/WS6a2ca1fba310986e2b45fb6b.html", "China Daily")
    ],
    isSample: false
  },
  {
    id: "neucyber-beinao2-clinical-2026",
    title: "Invasive Beinao-2 targets first clinical validation",
    companySlug: "neucyber-beinao",
    dateLabel: "Late 2026 (planned)",
    sortDate: "2026-12-15",
    status: "upcoming",
    type: "trial-opened",
    evidenceLevel: "E1",
    confidence: "low",
    summary:
      "NeuCyber's fully invasive, penetrating flexible-electrode Beinao-2 is slated to begin clinical validation after large-animal testing.",
    whyItMatters:
      "Beinao-2 is China's push toward single-neuron-resolution invasive recording comparable to Neuralink-class systems.",
    hypeCheck:
      "This is a company roadmap target; timelines for first invasive human use frequently slip.",
    sourceLinks: [
      source("China world-first invasive brain chip", "company-update", "https://www.technologyreview.com/2026/06/01/1138133/china-world-first-brain-chip/", "MIT Technology Review")
    ],
    isSample: false
  },
  {
    id: "neucyber-beinao1-36-implants-2026",
    title: "Beinao-1 aims for 36 human implants",
    companySlug: "neucyber-beinao",
    dateLabel: "2026 (planned)",
    sortDate: "2026-12-31",
    status: "upcoming",
    type: "additional-implant",
    evidenceLevel: "E1",
    confidence: "low",
    summary:
      "Under a five-year roadmap, NeuCyber targets 36 Beinao-1 human implants in 2026 before pilot deployment at top-tier hospitals.",
    whyItMatters:
      "Hitting a larger implant target would move Beinao-1 from feasibility toward routine clinical use.",
    hypeCheck:
      "This is a stated target, not a completed result; enrollment goals often move.",
    sourceLinks: [
      source("Homegrown BCI system set to expand", "company-update", "https://www.chinadaily.com.cn/a/202606/13/WS6a2ca1fba310986e2b45fb6b.html", "China Daily")
    ],
    isSample: false
  },
  {
    id: "neuroxess-chinese-speech-2024",
    title: "First flexible-electrode Chinese speech decoding trial",
    companySlug: "neuroxess",
    dateLabel: "Dec 2024",
    sortDate: "2024-12-15",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "NeuroXess implanted a 256-channel flexible array in a patient at Huashan Hospital and decoded common Chinese syllables in real time within days.",
    whyItMatters:
      "It was China's first high-throughput flexible-BCI speech result and a step toward Mandarin speech restoration.",
    hypeCheck:
      "This was a single-participant, short-duration study; reported accuracy is early and not yet broadly replicated.",
    sourceLinks: [
      source("Deciphering Chinese speech in brain", "company-update", "http://english.news.cn/20250103/e7daabd73bd749cf8d92c363d1722721/c.html", "Xinhua")
    ],
    isSample: false
  },
  {
    id: "neuroxess-triple-full-2025",
    title: "First 'triple-full' fully implanted wireless BCI",
    companySlug: "neuroxess",
    dateLabel: "Dec 2025",
    sortDate: "2025-12-10",
    status: "confirmed",
    type: "first-implant",
    evidenceLevel: "E3",
    confidence: "medium",
    summary:
      "NeuroXess reported completing its first fully implanted, fully wireless, battery-integrated BCI at Huashan Hospital — described as the world's second BCI with a built-in battery.",
    whyItMatters:
      "A fully implanted, battery-integrated system is a key hardware milestone for at-home, always-available use.",
    hypeCheck:
      "This is a first-implant hardware milestone announced by the company; durable functional outcomes are not yet published.",
    sourceLinks: [
      source("Battery-integrated brain chip implant", "company-update", "https://www.yicaiglobal.com/news/neuroxess-achieves-milestone-with-chinas-first-battery-integrated-bci-implant", "Yicai Global")
    ],
    isSample: false
  },
  {
    id: "stairmed-first-implant-2025",
    title: "StairMed completes first clinical trial implant",
    companySlug: "stairmed",
    dateLabel: "Mar 25, 2025",
    sortDate: "2025-03-25",
    status: "confirmed",
    type: "first-implant",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "StairMed performed its first prospective clinical trial implant of its coin-sized minimally invasive BCI at a leading Shanghai medical institution.",
    whyItMatters:
      "It started clinical evaluation of one of the smallest, least invasive implant approaches in the field.",
    hypeCheck:
      "A first-in-human implant begins the evidence clock; it is not yet proof of durable benefit.",
    sourceLinks: [
      source("Brain-machine firm gets major investment", "company-update", "https://global.chinadaily.com.cn/a/202502/12/WS67abf242a310a2ab06eaba81.html", "China Daily")
    ],
    isSample: false
  },
  {
    id: "clinatec-exoskeleton-2019",
    title: "Tetraplegic patient controls exoskeleton via epidural BCI",
    companySlug: "clinatec-wimagine",
    dateLabel: "Oct 2019",
    sortDate: "2019-10-04",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "A tetraplegic patient used two epidural WIMAGINE implants to control a four-limb exoskeleton, published in The Lancet Neurology as a proof-of-concept.",
    whyItMatters:
      "It was an early peer-reviewed demonstration of chronic epidural ECoG driving whole-body effector control.",
    hypeCheck:
      "A single-patient study needing extensive training; the exoskeleton is a research rig, not an approved device.",
    sourceLinks: [
      source("Exoskeleton controlled by epidural BCI", "paper", "https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(19)30321-7/abstract", "The Lancet Neurology")
    ],
    isSample: false
  },
  {
    id: "inbrain-first-graphene-2024",
    title: "World's first human graphene BCI procedure",
    companySlug: "inbrain-neuroelectronics",
    dateLabel: "Sep 2024",
    sortDate: "2024-09-26",
    status: "confirmed",
    type: "first-implant",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "INBRAIN placed a graphene cortical interface in a patient during tumor resection at Salford Royal Hospital, distinguishing healthy from cancerous tissue at micrometer scale.",
    whyItMatters:
      "It was the first human use of a graphene neural interface, a new electrode material for high-resolution recording.",
    hypeCheck:
      "This was intraoperative mapping during surgery, not a chronic assistive or therapeutic BCI.",
    sourceLinks: [
      source("World's first human graphene BCI procedure", "company-update", "https://www.businesswire.com/news/home/20240926260728/en/INBRAIN-Neuroelectronics-Announces-Worlds-First-Human-Graphene-Based-Brain-Computer-Interface-Procedure", "Business Wire / INBRAIN")
    ],
    isSample: false
  },
  {
    id: "inbrain-fih-complete-2026",
    title: "INBRAIN completes first-in-human graphene study enrolment",
    companySlug: "inbrain-neuroelectronics",
    dateLabel: "Apr 2026",
    sortDate: "2026-04-20",
    status: "confirmed",
    type: "endpoint-readout",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "INBRAIN completed enrolment of its first-in-human study of graphene neural interfaces for brain decoding and mapping.",
    whyItMatters:
      "Completing enrolment is a checkpoint toward reporting structured first-in-human graphene BCI data.",
    hypeCheck:
      "Enrolment completion is not the same as published outcomes; results will follow analysis.",
    sourceLinks: [
      source("First-in-human study enrolment complete", "company-update", "https://www.businesswire.com/news/home/20260420000990/en/INBRAIN-Neuroelectronics-Completes-Enrolment-of-Worlds-First-in-Human-Study-of-Graphene-Neural-Interfaces-for-Brain-Decoding-Mapping", "Business Wire / INBRAIN")
    ],
    isSample: false
  },
  {
    id: "ability-als-trial-approval-2026",
    title: "ABILITY approved to start chronic ALS implantation study",
    companySlug: "ability-wyss",
    dateLabel: "May 2026",
    sortDate: "2026-05-01",
    status: "confirmed",
    type: "regulatory-designation",
    evidenceLevel: "E3",
    confidence: "high",
    summary:
      "ABILITY Neurotech received Investigational Medical Device Dossier approval to begin its first chronic implantation study of a fully implantable wireless ECoG BCI in ALS patients.",
    whyItMatters:
      "It moves ABILITY from intraoperative testing into chronic clinical investigation of a home-oriented system.",
    hypeCheck:
      "Approval permits the study; it is not evidence of durable communication benefit yet.",
    sourceLinks: [
      source("ABILITY receives approval for ALS trial", "company-update", "https://www.prnewswire.com/news-releases/ability-neurotech-receives-imdd-approval-to-start-clinical-trial-for-chronic-implantation-of-brain-computer-interface-in-als-patients-302781809.html", "PR Newswire")
    ],
    isSample: false
  },
  {
    id: "ability-first-chronic-implant-2026",
    title: "ABILITY first chronic ALS implant expected",
    companySlug: "ability-wyss",
    dateLabel: "H2 2026 (expected)",
    sortDate: "2026-10-01",
    status: "upcoming",
    type: "first-implant",
    evidenceLevel: "E1",
    confidence: "low",
    summary:
      "Following approval, ABILITY's first chronic implantation of its fully implantable ECoG BCI in an ALS participant is expected, run with CorTec and UMC Utrecht.",
    whyItMatters:
      "The first chronic implant starts the durability clock for a fully implantable European ALS communication BCI.",
    hypeCheck:
      "This is an expected next step after approval, not a confirmed or scheduled procedure.",
    sourceLinks: [
      source("Fully implantable BCI consortium", "company-update", "https://wysscenter.ch/update/consortium-to-develop-fully-implantable-brain-computer-interface-to-enable-communication-for-people-with-paralysis/", "Wyss Center")
    ],
    isSample: false
  },
  {
    id: "blackrock-moveagain-breakthrough-2021",
    title: "MoveAgain BCI receives FDA Breakthrough Device Designation",
    companySlug: "blackrock-neurotech",
    dateLabel: "Nov 2021",
    sortDate: "2021-11-18",
    status: "confirmed",
    type: "regulatory-designation",
    evidenceLevel: "E1",
    confidence: "high",
    summary:
      "Blackrock's MoveAgain system — intended to let paralyzed users control a cursor, keyboard, wheelchair, or prosthetic by thought — received FDA Breakthrough Device Designation.",
    whyItMatters:
      "Breakthrough designation signals FDA prioritization and a defined path toward an integrated commercial assistive BCI.",
    hypeCheck:
      "The designation speeds review; it is not marketing clearance or proof of an approved product.",
    sourceLinks: [
      source("MoveAgain gets FDA Breakthrough Device Designation", "regulatory-page", "https://www.prnewswire.com/news-releases/blackrock-neurotechs-moveagain-brain-computer-interface-system-receives-breakthrough-device-designation-from-the-fda-301425013.html", "PR Newswire / Blackrock")
    ],
    isSample: false
  },
  {
    id: "blackrock-neuralace-reveal-2022",
    title: "Blackrock reveals Neuralace 10,000+ channel array",
    companySlug: "blackrock-neurotech",
    dateLabel: "Nov 2022",
    sortDate: "2022-11-29",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "Blackrock unveiled Neuralace, a flexible next-generation array targeting more than 10,000 channels for higher-resolution neural recording.",
    whyItMatters:
      "Channel count is a key axis of BCI performance; Neuralace is Blackrock's answer to high-density competitors.",
    hypeCheck:
      "This was a technology reveal; channel-count claims are not the same as demonstrated human performance.",
    sourceLinks: [
      source("Blackrock reveals Neuralace next-gen BCI", "company-update", "https://www.prnewswire.com/news-releases/blackrock-neurotech-reveals-neuralace-10-000-channel-next-gen-bci-301679826.html", "PR Newswire / Blackrock")
    ],
    isSample: false
  },
  {
    id: "science-corp-series-c-2026",
    title: "Science Corp closes $230M Series C",
    companySlug: "science-corp",
    dateLabel: "Mar 2026",
    sortDate: "2026-03-05",
    status: "confirmed",
    type: "funding-round",
    evidenceLevel: "E1",
    confidence: "high",
    summary:
      "Science Corporation raised a $230M Series C at roughly a $1.5B valuation to commercialize its PRIMA vision implant and fund its broader neural-interface portfolio.",
    whyItMatters:
      "It is one of the largest recent neural-interface raises and underwrites both PRIMA and the biohybrid brain program.",
    hypeCheck:
      "Funding accelerates work but is not itself clinical evidence; the biohybrid brain interface remains preclinical.",
    sourceLinks: [
      source("Science Corp closes $230M Series C", "company-update", "https://www.businesswire.com/news/home/20260305896789/en/Science-Corporation-Closes-$230-Million-Series-C-to-Accelerate-Commercialization-of-Its-PRIMA-BCI-Retinal-Implant-the-Worlds-Most-Advanced-Vision-Restoration-Technology", "Business Wire / Science")
    ],
    isSample: false
  },
  {
    id: "science-corp-first-human-biohybrid-2027",
    title: "First human biohybrid brain sensor placement expected",
    companySlug: "science-corp",
    dateLabel: "~2027 (expected)",
    sortDate: "2027-06-01",
    status: "upcoming",
    type: "first-implant",
    evidenceLevel: "E1",
    confidence: "low",
    summary:
      "Science Corp has enlisted a Yale neurosurgery lead for its first U.S. human trials of the biohybrid brain interface, with a start optimistically framed around 2027.",
    whyItMatters:
      "A first human biohybrid placement would test whether lab-grown neurons can integrate with a patient's cortex.",
    hypeCheck:
      "The company itself calls a 2027 start optimistic; preclinical-to-human timelines routinely slip.",
    sourceLinks: [
      source("Science Corp preparing first human brain sensor", "company-update", "https://techcrunch.com/2026/04/14/max-hodaks-science-corp-is-preparing-to-place-its-first-sensor-in-a-human-brain/", "TechCrunch")
    ],
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
    id: "muse-erp-validation-paper",
    title: "Choosing MUSE: Validation of a Low-Cost, Portable EEG System for ERP Research",
    companySlug: "muse-interaxon",
    dateLabel: "Mar 10, 2017",
    sortDate: "2017-03-10",
    evidenceLevel: "E4",
    summary:
      "Frontiers in Neuroscience methods paper showing that a portable MUSE EEG system could record quantifiable ERP components in visual oddball and reward-learning tasks.",
    sourceLinks: [
      source("Choosing MUSE validation paper", "paper", "https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2017.00109/full", "Frontiers in Neuroscience")
    ],
    isSample: false
  },
  {
    id: "emotiv-epoc-erp-validation-paper",
    title: "Validation of the Emotiv EPOC EEG gaming system for measuring research quality auditory ERPs",
    companySlug: "emotiv",
    dateLabel: "Feb 19, 2013",
    sortDate: "2013-02-19",
    evidenceLevel: "E4",
    summary:
      "PeerJ validation study reporting that the Emotiv EPOC could capture reliable late auditory ERP peaks suitable for research use.",
    sourceLinks: [
      source("Emotiv EPOC validation paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/23638374/", "PubMed / PeerJ")
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
  },
  {
    id: "neuroxess-chinese-speech-paper",
    title: "Real-time decoding of full-spectrum Chinese using a brain-computer interface",
    companySlug: "neuroxess",
    dateLabel: "2025",
    sortDate: "2025-06-01",
    evidenceLevel: "E4",
    summary:
      "Science Advances paper reporting real-time decoding of Mandarin Chinese speech from cortical signals using a high-throughput flexible electrode array.",
    sourceLinks: [
      source("Real-time decoding of full-spectrum Chinese", "paper", "https://www.science.org/doi/10.1126/sciadv.adz9968", "Science Advances")
    ],
    isSample: false
  },
  {
    id: "clinatec-exoskeleton-paper",
    title: "An exoskeleton controlled by an epidural wireless brain-machine interface in a tetraplegic patient",
    companySlug: "clinatec-wimagine",
    dateLabel: "Oct 2019",
    sortDate: "2019-10-04",
    evidenceLevel: "E4",
    summary:
      "Lancet Neurology proof-of-concept in which a tetraplegic patient controlled a four-limb exoskeleton using bilateral epidural ECoG (WIMAGINE) implants.",
    sourceLinks: [
      source("Exoskeleton controlled by epidural BCI", "paper", "https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(19)30321-7/abstract", "The Lancet Neurology")
    ],
    isSample: false
  }
];
