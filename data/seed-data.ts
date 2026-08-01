import type {
  Company,
  Demo,
  DeviceType,
  Milestone,
  OrganizationScale,
  Paper,
  ProductReadiness,
  ProgramProject,
  SourceLink,
  Trial
} from "./schema";
import { sourcedExpansionOrganizations } from "./sourced-expansion";

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

type ExpansionCompanyInput = {
  slug: string;
  name: string;
  category: Company["category"];
  region: Company["region"];
  modality: string;
  targetFunction: string;
  stage: string;
  evidenceLevel?: Company["evidenceLevel"];
  deviceTypes?: DeviceType[];
  organizationScale?: OrganizationScale;
  readiness?: ProductReadiness;
  hq: [city: string, country: string, lat: number, lng: number];
  founded?: number;
  website: string;
  /** A direct official product, technology, paper, or video reference. */
  referenceTitle?: string;
  funding?: string;
  summary?: string;
  hypeCheck?: string;
  neurofoundersSlug?: string;
  extraSources?: SourceLink[];
};

const expansionCompany = (record: ExpansionCompanyInput): Company => ({
  slug: record.slug,
  name: record.name,
  kind: "company",
  category: record.category,
  region: record.region,
  modality: record.modality,
  targetFunction: record.targetFunction,
  stage: record.stage,
  evidenceLevel: record.evidenceLevel ?? "E1",
  deviceTypes: record.deviceTypes,
  organizationScale: record.organizationScale,
  readiness: record.readiness,
  hq: { city: record.hq[0], country: record.hq[1], lat: record.hq[2], lng: record.hq[3] },
  founded: record.founded,
  website: record.website,
  funding: record.funding,
  summary:
    record.summary ??
    `${record.name} is tracked as a sourced neurotechnology company working on ${record.targetFunction.toLowerCase()}. Its main tracked modality is ${record.modality}.`,
  hypeCheck:
    record.hypeCheck ??
    "This is a company/profile record, not proof of clinical benefit. Product claims need separate trial, paper, regulatory, or deployment evidence before being counted as demonstrated BCI restoration.",
  sourceLinks: [
    source(
      record.referenceTitle ?? `${record.name} official technology / product information`,
      "company-update",
      record.website,
      record.name
    ),
    ...(record.neurofoundersSlug
      ? [
          source(
            `${record.name} NeuroFounders profile`,
            "news-report",
            `https://www.neurofounders.co/startups/${record.neurofoundersSlug}`,
            "NeuroFounders",
            false
          )
        ]
      : []),
    ...(record.extraSources ?? [])
  ],
  isSample: false
});

type AcademicProgramInput = {
  slug: string;
  name: string;
  category: Company["category"];
  region: Company["region"];
  modality: string;
  targetFunction: string;
  hq: [city: string, country: string, lat: number, lng: number];
  website: string;
  founded?: number;
  evidenceLevel?: Company["evidenceLevel"];
  deviceTypes?: DeviceType[];
  summary?: string;
  referenceTitle?: string;
};

const academicProgram = (record: AcademicProgramInput): Company => ({
  slug: record.slug,
  name: record.name,
  kind: "academic",
  category: record.category,
  region: record.region,
  modality: record.modality,
  targetFunction: record.targetFunction,
  stage: "University research program; project-level evidence is tracked separately from commercial readiness.",
  evidenceLevel: record.evidenceLevel ?? "E1",
  deviceTypes: record.deviceTypes,
  organizationScale: "university-research",
  readiness: "research-program",
  hq: { city: record.hq[0], country: record.hq[1], lat: record.hq[2], lng: record.hq[3] },
  founded: record.founded,
  website: record.website,
  summary:
    record.summary ??
    `${record.name} is tracked as a university research program focused on ${record.targetFunction.toLowerCase()}.`,
  hypeCheck:
    "This is a research-program profile. A lab's presence, grant activity, or paper record is not itself proof of a deployable clinical product or durable patient benefit.",
  sourceLinks: [
    source(record.referenceTitle ?? `${record.name} official research page`, "institution-page", record.website, record.name)
  ],
  isSample: false
});

type ResearchProjectInput = {
  id: string;
  companySlug: string;
  name: string;
  focus: string;
  modality: string;
  evidenceLevel?: ProgramProject["evidenceLevel"];
  sortDate?: string;
  sourceUrl: string;
  publisher: string;
  sourceTitle?: string;
  summary?: string;
  demonstrated?: string;
  notYetShown?: string;
};

const researchProject = (record: ResearchProjectInput): ProgramProject => ({
  id: record.id,
  companySlug: record.companySlug,
  name: record.name,
  focus: record.focus,
  modality: record.modality,
  statusLabel: "University research program",
  evidenceLevel: record.evidenceLevel ?? "E1",
  latestUpdateLabel: "Official research page linked",
  sortDate: record.sortDate ?? "2026-01-01",
  summary:
    record.summary ??
    `${record.name} is tracked for ${record.focus.toLowerCase()} using ${record.modality.toLowerCase()}.`,
  demonstrated:
    record.demonstrated ??
    "The linked university or laboratory source establishes the active research focus. Specific performance claims are not promoted here without a project-level paper, demo, trial, or regulatory record.",
  notYetShown:
    record.notYetShown ??
    "No general clinical availability or durable patient benefit is inferred from this university research profile.",
  sourceLinks: [
    source(record.sourceTitle ?? `${record.name} official research reference`, "institution-page", record.sourceUrl, record.publisher)
  ],
  isSample: false
});

const productTrack = (record: ResearchProjectInput): ProgramProject => ({
  ...researchProject(record),
  statusLabel: "Company product / technology track",
  latestUpdateLabel: "Official product or technology page linked",
  demonstrated:
    record.demonstrated ??
    "The linked first-party source documents this product or technology line. Its inclusion does not extend the claim beyond the stated indication, intended use, or demonstrated setting.",
  notYetShown:
    record.notYetShown ??
    "Product availability, regulatory status, and outcome evidence must be read from the linked source and separate trial or paper records; this profile does not establish broader clinical benefit."
});

type NeurofoundersCompanyInput = {
  slug: string;
  name: string;
  country: string;
  founded: string;
  category: string;
  modality: string;
  formFactor: string;
  interfaceDepth: string;
  indication: string;
  targetUser: string;
  regulatory: string;
  funding: string;
  website: string;
  profileUrl: string;
};

const neurofoundersCountryCoordinates: Record<string, [lat: number, lng: number]> = {
  "Argentina": [
    -38.4161,
    -63.6167
  ],
  "Australia": [
    -25.2744,
    133.7751
  ],
  "Austria": [
    47.5162,
    14.5501
  ],
  "Belgium": [
    50.5039,
    4.4699
  ],
  "Canada": [
    56.1304,
    -106.3468
  ],
  "China": [
    35.8617,
    104.1954
  ],
  "Czechia": [
    49.8175,
    15.473
  ],
  "Denmark": [
    56.2639,
    9.5018
  ],
  "Finland": [
    61.9241,
    25.7482
  ],
  "France": [
    46.2276,
    2.2137
  ],
  "Germany": [
    51.1657,
    10.4515
  ],
  "Hong Kong": [
    22.3193,
    114.1694
  ],
  "Hungary": [
    47.1625,
    19.5033
  ],
  "India": [
    20.5937,
    78.9629
  ],
  "Ireland": [
    53.1424,
    -7.6921
  ],
  "Israel": [
    31.0461,
    34.8516
  ],
  "Italy": [
    41.8719,
    12.5674
  ],
  "Japan": [
    36.2048,
    138.2529
  ],
  "Netherlands": [
    52.1326,
    5.2913
  ],
  "Poland": [
    51.9194,
    19.1451
  ],
  "Spain": [
    40.4637,
    -3.7492
  ],
  "Switzerland": [
    46.8182,
    8.2275
  ],
  "Turkey": [
    38.9637,
    35.2433
  ],
  "UK": [
    55.3781,
    -3.436
  ],
  "United Kingdom": [
    55.3781,
    -3.436
  ],
  "United States": [
    39.8283,
    -98.5795
  ],
  "USA": [
    39.8283,
    -98.5795
  ]
};

const neurofoundersEurope = new Set([
  "Austria", "Belgium", "Czechia", "Denmark", "Finland", "France", "Germany", "Hungary", "Ireland",
  "Italy", "Netherlands", "Poland", "Spain", "Switzerland", "UK", "United Kingdom"
]);

const neurofoundersAsia = new Set(["China", "Hong Kong", "India", "Israel", "Japan", "Turkey"]);

const neurofoundersDeviceTypes: Partial<Record<string, DeviceType[]>> = {
  "(f)MRI": ["fmri"],
  DBS: ["dbs"],
  ECoG: ["ecog"],
  EEG: ["eeg"],
  EMG: ["emg"],
  Endovascular: ["endovascular"],
  ExG: ["eeg", "emg"],
  Intracortical: ["intracortical"],
  MEA: ["mea"],
  MEG: ["meg"],
  "Motor prosthetics": ["emg", "rehab-robotics"],
  "Nerve stimulator": ["peripheral-stimulation"],
  SCS: ["spinal-stimulation"],
  TMS: ["tms"],
  Ultrasound: ["ultrasound"],
  VNS: ["peripheral-stimulation"],
  "Visual prosthesis": ["neural-probe"],
  fNIRS: ["fnirs", "optical-imaging"],
  "tDCS/tES": ["tes"]
};

const neurofoundersRegion = (country: string): Company["region"] => {
  if (country === "USA" || country === "United States" || country === "Canada") return "north-america";
  if (neurofoundersEurope.has(country)) return "europe";
  if (neurofoundersAsia.has(country)) return "asia";
  return "rest-of-world";
};

const neurofoundersCategory = (record: NeurofoundersCompanyInput): Company["category"] => {
  if (record.interfaceDepth === "Minimally invasive" || record.modality === "Endovascular") {
    return "minimally-invasive";
  }
  if (
    record.interfaceDepth === "Implantable" &&
    (record.modality === "ECoG" || record.modality === "Intracortical")
  ) {
    return "invasive";
  }
  if (record.interfaceDepth === "Implantable") return "minimally-invasive";
  return "non-invasive";
};

const neurofoundersReadiness = (regulatory: string): ProductReadiness => {
  if (/FDA|CE-Marked|Other approval/.test(regulatory)) return "regulated-medical";
  if (regulatory === "Investigational") return "human-research";
  if (regulatory === "Preclinical") return "preclinical";
  if (regulatory === "Non-medical") return "commercial-nonmedical";
  return "research-infrastructure";
};

const neurofoundersCompany = (record: NeurofoundersCompanyInput): Company => {
  const readiness = neurofoundersReadiness(record.regulatory);
  const coordinates = neurofoundersCountryCoordinates[record.country];
  const formFactorArticle = /^[aeiou]/i.test(record.formFactor) ? "an" : "a";
  if (!coordinates) {
    throw new Error("Missing country-level map coordinates for " + record.country);
  }

  return {
    slug: record.slug,
    name: record.name,
    kind: "company",
    category: neurofoundersCategory(record),
    region: neurofoundersRegion(record.country),
    modality: record.modality,
    targetFunction: record.indication + " technology for " + record.targetUser.toLowerCase(),
    stage: record.regulatory + "; " + record.category + " profile",
    evidenceLevel: "E1",
    deviceTypes: neurofoundersDeviceTypes[record.modality],
    organizationScale:
      readiness === "regulated-medical" || readiness === "human-research" ? "clinical-growth" : "early-startup",
    readiness,
    hq: {
      city: "Country-level location",
      country: record.country,
      lat: coordinates[0],
      lng: coordinates[1]
    },
    founded: /^\d{4}$/.test(record.founded) ? Number(record.founded) : undefined,
    website: record.website,
    funding: record.funding === "Unknown" ? undefined : record.funding + " (NeuroFounders profile)",
    summary:
      "NeuroFounders categorizes " + record.name + " under " + record.category.toLowerCase() + ". " +
      "Its profile lists " + record.modality + " in " + formFactorArticle + " " + record.formFactor.toLowerCase() +
      " format, focused on " + record.indication.toLowerCase() + " for " + record.targetUser.toLowerCase() + ".",
    hypeCheck:
      "This catalog entry records the company's stated focus. It does not independently verify clinical benefit or extend the listed regulatory status to every product; product-level claims require primary trial, paper, or regulatory evidence.",
    sourceLinks: [
      source(record.name + " official website", "company-update", record.website, record.name),
      source(record.name + " NeuroFounders profile", "news-report", record.profileUrl, "NeuroFounders", false)
    ],
    isSample: false
  };
};

const neurofoundersCatalogCompanies: Company[] = [
  {"slug":"cranius-therapeutics","name":"CraniUS Therapeutics","country":"USA","founded":"2021","category":"Tools and Infrastructure","modality":"Others","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Tumors","targetUser":"Clinicians","regulatory":"Preclinical","funding":"Series A","website":"https://craniustherapeutics.com/","profileUrl":"https://www.neurofounders.co/startups/cranius-therapeutics"},
  {"slug":"ctrl-labs","name":"CTRL-labs (Meta)","country":"USA","founded":"2015","category":"Consumer Neurotech","modality":"EMG","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Acquired","website":"https://tech.facebook.com/reality-labs/","profileUrl":"https://www.neurofounders.co/startups/ctrl-labs"},
  {"slug":"curonix","name":"Curonix","country":"USA","founded":"2003","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Unknown","website":"https://curonix.com/intl/","profileUrl":"https://www.neurofounders.co/startups/curonix"},
  {"slug":"dandelion-science","name":"Dandelion Science","country":"USA","founded":"2020","category":"Neuromodulation","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Vision","targetUser":"Clinicians","regulatory":"Investigational","funding":"Non-dilutive","website":"https://www.dandelion.science/","profileUrl":"https://www.neurofounders.co/startups/dandelion-science"},
  {"slug":"deegtal","name":"DEEGtal","country":"Switzerland","founded":"2024","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Epilepsy","targetUser":"Clinicians","regulatory":"Investigational","funding":"Seed","website":"https://www.deegtal.ai/","profileUrl":"https://www.neurofounders.co/startups/deegtal"},
  {"slug":"deepspin","name":"DeepSpin","country":"Germany","founded":"2020","category":"Neuroimaging","modality":"(f)MRI","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"General brain health","targetUser":"Clinicians","regulatory":"Investigational","funding":"Seed","website":"https://deepspin.io/","profileUrl":"https://www.neurofounders.co/startups/deepspin"},
  {"slug":"eightsix-science","name":"Eightsix Science","country":"UK","founded":"2023","category":"Tools and Infrastructure","modality":"Others","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"Preclinical","funding":"Pre-seed","website":"https://eightsix.science/","profileUrl":"https://www.neurofounders.co/startups/eightsix-science"},
  {"slug":"electrocore","name":"ElectroCore","country":"USA","founded":"2005","category":"Neuromodulation","modality":"VNS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Public","website":"https://www.electrocore.com/","profileUrl":"https://www.neurofounders.co/startups/electrocore"},
  {"slug":"elemind","name":"Elemind","country":"USA","founded":"2019","category":"Consumer Neurotech","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"https://elemindtech.com/","profileUrl":"https://www.neurofounders.co/startups/elemind"},
  {"slug":"empatica","name":"Empatica","country":"USA","founded":"2013","category":"Diagnostics and Assessment","modality":"Multimodal","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Parkinson's","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Series B","website":"https://www.empatica.com/","profileUrl":"https://www.neurofounders.co/startups/empatica"},
  {"slug":"emteq-labs","name":"Emteq Labs","country":"UK","founded":"2015","category":"Tools and Infrastructure","modality":"Biomarkers","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Researchers","regulatory":"Research only","funding":"Seed","website":"https://www.emteqlabs.com/","profileUrl":"https://www.neurofounders.co/startups/emteq-labs"},
  {"slug":"encora-therapeutics","name":"Encora Therapeutics","country":"USA","founded":"2018","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Seed","website":"https://encoratherapeutics.com/","profileUrl":"https://www.neurofounders.co/startups/encora-therapeutics"},
  {"slug":"eneura-edb82","name":"eNeura","country":"United States","founded":"2000","category":"Neuromodulation","modality":"TMS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Series C+","website":"https://eneura.com/","profileUrl":"https://www.neurofounders.co/startups/eneura-edb82"},
  {"slug":"epia-neuro","name":"Epia Neuro","country":"USA","founded":"2021","category":"Brain-Computer Interface","modality":"ECoG","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Epilepsy","targetUser":"Clinicians","regulatory":"Preclinical","funding":"Unknown","website":"https://epianeuro.com/","profileUrl":"https://www.neurofounders.co/startups/epia-neuro"},
  {"slug":"epiwatch","name":"EpiWatch","country":"USA","founded":"2017","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Epilepsy","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Seed","website":"https://epiwatch.com/","profileUrl":"https://www.neurofounders.co/startups/epiwatch"},
  {"slug":"evocal-health","name":"EVOCAL Health","country":"Germany","founded":"2020","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Pharma","regulatory":"Investigational","funding":"Defunct","website":"https://evocalhealth.com/","profileUrl":"https://www.neurofounders.co/startups/evocal-health"},
  {"slug":"eysz","name":"Eysz","country":"USA","founded":"2018","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Psychiatry","targetUser":"Clinicians","regulatory":"Investigational","funding":"Non-dilutive","website":"http://www.eyszlab.com/","profileUrl":"https://www.neurofounders.co/startups/eysz"},
  {"slug":"farow","name":"Farow","country":"Belgium","founded":"2017","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Epilepsy","targetUser":"Mixed","regulatory":"CE-Marked","funding":"Non-dilutive","website":"https://www.epihunter.com/","profileUrl":"https://www.neurofounders.co/startups/farow"},
  {"slug":"finalspark","name":"FinalSpark","country":"Switzerland","founded":"2014","category":"Tools and Infrastructure","modality":"MEA","formFactor":"Other","interfaceDepth":"Ex vivo","indication":"Research","targetUser":"Researchers","regulatory":"Research only","funding":"Seed","website":"https://finalspark.com/neuroplatform/","profileUrl":"https://www.neurofounders.co/startups/finalspark"},
  {"slug":"flectothink","name":"FlectoThink","country":"China","founded":"2020","category":"Consumer Neurotech","modality":"EEG","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"https://www.flexolinkai.com/","profileUrl":"https://www.neurofounders.co/startups/flectothink"},
  {"slug":"fluent-bci","name":"Fluent","country":"Australia","founded":"2025","category":"Brain-Computer Interface","modality":"ECoG","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Communication","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://fluentbci.com/","profileUrl":"https://www.neurofounders.co/startups/fluent-bci"},
  {"slug":"general-sense","name":"General Sense","country":"USA","founded":"2020","category":"Tools and Infrastructure","modality":"Others","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Mixed","regulatory":"Non-medical","funding":"Seed","website":"https://www.canaery.com/","profileUrl":"https://www.neurofounders.co/startups/general-sense"},
  {"slug":"gestala","name":"Gestala","country":"China","founded":"2026","category":"Brain-Computer Interface","modality":"Ultrasound","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Clinicians","regulatory":"Preclinical","funding":"Seed","website":"https://www.gestala.com/","profileUrl":"https://www.neurofounders.co/startups/gestala"},
  {"slug":"great-lakes-neurotech","name":"Great Lakes NeuroTech","country":"USA","founded":"2010","category":"Tools and Infrastructure","modality":"Others","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Parkinson's","targetUser":"Researchers","regulatory":"Research only","funding":"Non-dilutive","website":"https://www.glneurotech.com/","profileUrl":"https://www.neurofounders.co/startups/great-lakes-neurotech"},
  {"slug":"grey-matter-neurosciences","name":"Grey Matter Neurosciences","country":"Canada","founded":"2024","category":"Neuromodulation","modality":"Ultrasound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Dementia/impairment","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://greymatterneurosciences.com/","profileUrl":"https://www.neurofounders.co/startups/grey-matter-neurosciences"},
  {"slug":"halo-neuroscience","name":"Halo Neuroscience","country":"USA","founded":"2013","category":"Consumer Neurotech","modality":"tDCS/tES","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Acquired","website":"https://haloneuroscience.com/","profileUrl":"https://www.neurofounders.co/startups/halo-neuroscience"},
  {"slug":"i-braintech","name":"i-BrainTech","country":"Israel","founded":"2019","category":"Consumer Neurotech","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Mixed","regulatory":"Unknown","funding":"Seed","website":"https://www.i-brain.tech/","profileUrl":"https://www.neurofounders.co/startups/i-braintech"},
  {"slug":"icometrix","name":"Icometrix","country":"Belgium","founded":"2011","category":"Neuroimaging","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Acquired","website":"https://www.icometrix.com/","profileUrl":"https://www.neurofounders.co/startups/icometrix"},
  {"slug":"iconeus","name":"ICONEUS","country":"France","founded":"2016","category":"Neuroimaging","modality":"Ultrasound","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Researchers","regulatory":"Research only","funding":"Non-dilutive","website":"http://iconeus.com/","profileUrl":"https://www.neurofounders.co/startups/iconeus"},
  {"slug":"imeka","name":"Imeka","country":"USA","founded":"2011","category":"Neuroimaging","modality":"(f)MRI","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Seed","website":"http://www.imeka.ca/","profileUrl":"https://www.neurofounders.co/startups/imeka"},
  {"slug":"insai","name":"Insai","country":"Denmark","founded":"2019","category":"Neuromodulation","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Pharma","regulatory":"Research only","funding":"Unknown","website":"https://insai.tech/","profileUrl":"https://www.neurofounders.co/startups/insai"},
  {"slug":"insellar","name":"Insellar","country":"Germany","founded":"2025","category":"Neuromodulation","modality":"DBS","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://www.insellar.com/","profileUrl":"https://www.neurofounders.co/startups/insellar"},
  {"slug":"intactis-bio","name":"Intactis Bio","country":"United States","founded":"2024","category":"Tools and Infrastructure","modality":"MEA","formFactor":"Software/app","interfaceDepth":"Ex vivo","indication":"Research","targetUser":"Developers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://www.intactis.bio/","profileUrl":"https://www.neurofounders.co/startups/intactis-bio"},
  {"slug":"iota-biosciences","name":"Iota Biosciences","country":"USA","founded":"2017","category":"Tools and Infrastructure","modality":"Ultrasound","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Other","targetUser":"Researchers","regulatory":"Preclinical","funding":"Acquired","website":"https://iota.bio/","profileUrl":"https://www.neurofounders.co/startups/iota-biosciences"},
  {"slug":"kandu","name":"Kandu","country":"USA","founded":"2019","category":"Diagnostics and Assessment","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Stroke","targetUser":"Patients","regulatory":"Other approval","funding":"Series A","website":"http://www.kandu.com/","profileUrl":"https://www.neurofounders.co/startups/kandu"},
  {"slug":"karavela-ai","name":"Karavela AI","country":"France","founded":"2025","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Pre-seed","website":"https://karavela.ai/","profileUrl":"https://www.neurofounders.co/startups/karavela-ai"},
  {"slug":"kinesix-xr","name":"Kinesix XR","country":"Canada","founded":"2018","category":"Diagnostics and Assessment","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Rehabilitation","targetUser":"Patients","regulatory":"Investigational","funding":"Unknown","website":"https://kinesixvr.com/","profileUrl":"https://www.neurofounders.co/startups/kinesix-xr"},
  {"slug":"kneu-health","name":"Kneu Health","country":"UK","founded":"2022","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Parkinson's","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Seed","website":"https://kneu.com/","profileUrl":"https://www.neurofounders.co/startups/kneu-health"},
  {"slug":"koniku","name":"Koniku","country":"USA","founded":"2015","category":"Tools and Infrastructure","modality":"MEA","formFactor":"Other","interfaceDepth":"Ex vivo","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Series B","website":"https://koniku.com/","profileUrl":"https://www.neurofounders.co/startups/koniku"},
  {"slug":"kyma-neuro","name":"Kyma Neuro","country":"United States","founded":"2026","category":"Tools and Infrastructure","modality":"Software","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Developers","regulatory":"Non-medical","funding":"Unknown","website":"https://www.kymaneuro.com/","profileUrl":"https://www.neurofounders.co/startups/kyma-neuro"},
  {"slug":"linus-health","name":"Linus Health","country":"USA","founded":"2019","category":"Diagnostics and Assessment","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Dementia/impairment","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series B","website":"http://www.linushealth.com/","profileUrl":"https://www.neurofounders.co/startups/linus-health"},
  {"slug":"longeviti-neuro-solutions","name":"Longeviti Neuro Solutions","country":"USA","founded":"2016","category":"Tools and Infrastructure","modality":"Ultrasound","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series A","website":"http://www.longeviti.com/","profileUrl":"https://www.neurofounders.co/startups/longeviti-neuro-solutions"},
  {"slug":"lyeons-neurotech","name":"LYEONS Neurotech","country":"USA","founded":"2020","category":"Consumer Neurotech","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://lyeons.com/","profileUrl":"https://www.neurofounders.co/startups/lyeons-neurotech"},
  {"slug":"machinemd","name":"MachineMD","country":"Switzerland","founded":"2019","category":"Diagnostics and Assessment","modality":"Others","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"CE-Marked","funding":"Seed","website":"https://www.machinemd.com/2019","profileUrl":"https://www.neurofounders.co/startups/machinemd"},
  {"slug":"machine-medicine","name":"Machine Medicine","country":"UK","founded":"2017","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Parkinson's","targetUser":"Mixed","regulatory":"Research only","funding":"Seed","website":"https://machinemedicine.com/","profileUrl":"https://www.neurofounders.co/startups/machine-medicine"},
  {"slug":"magnetic-tides","name":"Magnetic Tides","country":"USA","founded":"2019","category":"Neuromodulation","modality":"TMS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Stroke","targetUser":"Patients","regulatory":"Investigational","funding":"Non-dilutive","website":"https://www.magnetictides.com/","profileUrl":"https://www.neurofounders.co/startups/magnetic-tides"},
  {"slug":"magnus-medical","name":"Magnus Medical","country":"USA","founded":"2021","category":"Neuromodulation","modality":"TMS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Series B","website":"https://www.magnusmedical.com/","profileUrl":"https://www.neurofounders.co/startups/magnus-medical"},
  {"slug":"manava-plus","name":"Manava Plus","country":"Italy","founded":"2022","category":"Neuromodulation","modality":"SCS","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Preclinical","funding":"Non-dilutive","website":"https://manava.plus/","profileUrl":"https://www.neurofounders.co/startups/manava-plus"},
  {"slug":"marbles-health","name":"Marbles Health","country":"India","founded":"2020","category":"Neuromodulation","modality":"tDCS/tES","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"Other approval","funding":"Seed","website":"https://www.marbles.health/","profileUrl":"https://www.neurofounders.co/startups/marbles-health"},
  {"slug":"maxwell-biosystems","name":"MaxWell Biosystems","country":"Switzerland","founded":"2016","category":"Tools and Infrastructure","modality":"MEA","formFactor":"Other","interfaceDepth":"Ex vivo","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Series A","website":"http://www.mxwbio.com/","profileUrl":"https://www.neurofounders.co/startups/maxwell-biosystems"},
  {"slug":"merge-labs","name":"Merge Labs","country":"USA","founded":"2025","category":"Brain-Computer Interface","modality":"Ultrasound","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Other","regulatory":"Preclinical","funding":"Seed","website":"https://www.merge.io/blog","profileUrl":"https://www.neurofounders.co/startups/merge-labs"},
  {"slug":"mindrove","name":"MindRove","country":"Hungary","founded":"2017","category":"Tools and Infrastructure","modality":"EMG","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Mixed","regulatory":"Non-medical","funding":"Seed","website":"https://mindrove.com/","profileUrl":"https://www.neurofounders.co/startups/mindrove"},
  {"slug":"mintneuro","name":"MintNeuro","country":"UK","founded":"2022","category":"Tools and Infrastructure","modality":"Intracortical","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Multi-indication","targetUser":"Mixed","regulatory":"Research only","funding":"Non-dilutive","website":"https://mintneuro.com/","profileUrl":"https://www.neurofounders.co/startups/mintneuro"},
  {"slug":"mjn-neuroserveis","name":"MJN Neuroserveis","country":"Spain","founded":"2014","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Epilepsy","targetUser":"Patients","regulatory":"CE-Marked","funding":"Non-dilutive","website":"https://mjn.cat/en/","profileUrl":"https://www.neurofounders.co/startups/mjn-neuroserveis"},
  {"slug":"mobia-medical","name":"Mobia Medical","country":"United States","founded":"2007","category":"Neuromodulation","modality":"VNS","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Stroke","targetUser":"Patients","regulatory":"FDA approved (PMA)","funding":"Public","website":"https://www.mobia.com/","profileUrl":"https://www.neurofounders.co/startups/mobia-medical"},
  {"slug":"morph-labs","name":"Morph Labs","country":"USA","founded":"2023","category":"Brain-Computer Interface","modality":"Motor prosthetics","formFactor":"Prosthetic/assistive","interfaceDepth":"Non-invasive","indication":"Rehabilitation","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://morphlabs.tech/","profileUrl":"https://www.neurofounders.co/startups/morph-labs"},
  {"slug":"myndlift","name":"Myndlift","country":"Israel","founded":"2016","category":"Consumer Neurotech","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Series A","website":"https://www.myndlift.com/","profileUrl":"https://www.neurofounders.co/startups/myndlift"},
  {"slug":"myndspan","name":"MYndspan","country":"UK","founded":"2020","category":"Neuroimaging","modality":"MEG","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Non-dilutive","website":"https://myndspan.com/","profileUrl":"https://www.neurofounders.co/startups/myndspan"},
  {"slug":"naox-technologies","name":"NAOX Technologies","country":"France","founded":"2018","category":"Neuroimaging","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Mixed","regulatory":"FDA cleared (510k)","funding":"Seed","website":"https://naox-technologies.com/","profileUrl":"https://www.neurofounders.co/startups/naox-technologies"},
  {"slug":"naqi-logix","name":"Naqi Logix","country":"Canada","founded":"2020","category":"Consumer Neurotech","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Mixed","regulatory":"Non-medical","funding":"Seed","website":"https://www.naqilogix.com/","profileUrl":"https://www.neurofounders.co/startups/naqi-logix"},
  {"slug":"nervonik","name":"Nervonik","country":"USA","founded":"2020","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://nervonik.com/","profileUrl":"https://www.neurofounders.co/startups/nervonik"},
  {"slug":"netholabs","name":"Netholabs","country":"UK","founded":"2022","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Researchers","regulatory":"Research only","funding":"Seed","website":"https://netholabs.com/","profileUrl":"https://www.neurofounders.co/startups/netholabs"},
  {"slug":"neubond","name":"Neubond","country":"United Kingdom","founded":"2024","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Stroke","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://neubond.co.uk/","profileUrl":"https://www.neurofounders.co/startups/neubond"},
  {"slug":"neunos","name":"Neunos","country":"Hungary","founded":"2018","category":"Neuromodulation","modality":"Intracortical","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Epilepsy","targetUser":"Patients","regulatory":"Investigational","funding":"Non-dilutive","website":"http://www.neunos.com/","profileUrl":"https://www.neurofounders.co/startups/neunos"},
  {"slug":"neupulse","name":"Neupulse","country":"UK","founded":"2021","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Neurodevelopmental","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.neupulse.co/","profileUrl":"https://www.neurofounders.co/startups/neupulse"},
  {"slug":"neural-galaxy","name":"Neural Galaxy","country":"China","founded":"2019","category":"Neuromodulation","modality":"TMS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://www.neuralgalaxy.com/","profileUrl":"https://www.neurofounders.co/startups/neural-galaxy"},
  {"slug":"neuralight","name":"NeuraLight","country":"Israel","founded":"2021","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Parkinson's","targetUser":"Pharma","regulatory":"Research only","funding":"Series A","website":"https://neuralight.ai/","profileUrl":"https://www.neurofounders.co/startups/neuralight"},
  {"slug":"neuralpulse","name":"NeuralPulse","country":"UK","founded":"2025","category":"Neuromodulation","modality":"Intracortical","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Epilepsy","targetUser":"Patients","regulatory":"Investigational","funding":"Non-dilutive","website":"https://www.neural-pulse.com/","profileUrl":"https://www.neurofounders.co/startups/neuralpulse"},
  {"slug":"neuramatrix","name":"NeuraMatrix","country":"China","founded":"2019","category":"Tools and Infrastructure","modality":"Multimodal","formFactor":"Other","interfaceDepth":"Other","indication":"Research","targetUser":"Researchers","regulatory":"Unknown","funding":"Series A","website":"https://www.neuramatrix.com.cn/","profileUrl":"https://www.neurofounders.co/startups/neuramatrix"},
  {"slug":"neuraura","name":"Neuraura","country":"Canada","founded":"2017","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Women's health","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.getlooop.com/","profileUrl":"https://www.neurofounders.co/startups/neuraura"},
  {"slug":"neuraworx","name":"NeuraWorx","country":"USA","founded":"2021","category":"Neuromodulation","modality":"Others","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.neuraworx.com/","profileUrl":"https://www.neurofounders.co/startups/neuraworx"},
  {"slug":"neurinnov","name":"Neurinnov","country":"France","founded":"2018","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Investigational","funding":"Non-dilutive","website":"https://neurinnov.com/","profileUrl":"https://www.neurofounders.co/startups/neurinnov"},
  {"slug":"neuroacoustics","name":"Neuroacoustics","country":"USA","founded":"2023","category":"Neuromodulation","modality":"Light/sound","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://www.neuroacoustics.io/","profileUrl":"https://www.neurofounders.co/startups/neuroacoustics"},
  {"slug":"neurobell","name":"NeuroBell","country":"Ireland","founded":"2022","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Epilepsy","targetUser":"Clinicians","regulatory":"Investigational","funding":"Seed","website":"https://www.neurobell.com/","profileUrl":"https://www.neurofounders.co/startups/neurobell"},
  {"slug":"neurobionics","name":"NeuroBionics","country":"USA","founded":"2023","category":"Tools and Infrastructure","modality":"Endovascular","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Multi-indication","targetUser":"Mixed","regulatory":"Preclinical","funding":"Seed","website":"https://neurobionics.io/","profileUrl":"https://www.neurofounders.co/startups/neurobionics"},
  {"slug":"neurobrave","name":"NeuroBrave","country":"USA","founded":"2020","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Mixed","regulatory":"Non-medical","funding":"Seed","website":"http://neurobrave.com/","profileUrl":"https://www.neurofounders.co/startups/neurobrave"},
  {"slug":"neurocast","name":"Neurocast","country":"Netherlands","founded":"2017","category":"Diagnostics and Assessment","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Mixed","regulatory":"Investigational","funding":"Seed","website":"https://www.neurocast.ai/","profileUrl":"https://www.neurofounders.co/startups/neurocast"},
  {"slug":"neuroclues","name":"neuroClues","country":"Belgium","founded":"2020","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Non-invasive","indication":"Parkinson's","targetUser":"Clinicians","regulatory":"CE-Marked","funding":"Series A","website":"https://neuroclues.com/","profileUrl":"https://www.neurofounders.co/startups/neuroclues"},
  {"slug":"neuroconcise","name":"NeuroCONCISE","country":"UK","founded":"2016","category":"Tools and Infrastructure","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Seed","website":"http://www.neuroconcise.co.uk/","profileUrl":"https://www.neurofounders.co/startups/neuroconcise"},
  {"slug":"neurode","name":"Neurode","country":"Australia","founded":"2021","category":"Neuromodulation","modality":"tDCS/tES","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"Investigational","funding":"Pre-seed","website":"https://www.neurodelabs.com/","profileUrl":"https://www.neurofounders.co/startups/neurode"},
  {"slug":"neuroem-therapeutics","name":"NeuroEM Therapeutics","country":"USA","founded":"2013","category":"Neuromodulation","modality":"Others","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Dementia/impairment","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://neuroem.com/","profileUrl":"https://www.neurofounders.co/startups/neuroem-therapeutics"},
  {"slug":"neuro-event-labs","name":"Neuro Event Labs","country":"Finland","founded":"2015","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Non-invasive","indication":"Epilepsy","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series A","website":"https://neuroeventlabs.com/","profileUrl":"https://www.neurofounders.co/startups/neuro-event-labs"},
  {"slug":"neurolief","name":"Neurolief","country":"Israel","founded":"2014","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"FDA approved (PMA)","funding":"Seed","website":"http://www.neurolief.com/","profileUrl":"https://www.neurofounders.co/startups/neurolief"},
  {"slug":"neurolife","name":"NeuroLife","country":"United States","founded":"2026","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Rehabilitation","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.neurolifetech.com/","profileUrl":"https://www.neurofounders.co/startups/neurolife"},
  {"slug":"neurolight","name":"NeuroLight","country":"USA","founded":"2017","category":"Neuromodulation","modality":"Light/sound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Patients","regulatory":"Investigational","funding":"Non-dilutive","website":"https://www.neurolight.co/","profileUrl":"https://www.neurofounders.co/startups/neurolight"},
  {"slug":"neuronic","name":"Neuronic","country":"UK","founded":"2021","category":"Consumer Neurotech","modality":"Light/sound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Bootstrapped","website":"https://www.neuronic.online/","profileUrl":"https://www.neurofounders.co/startups/neuronic"},
  {"slug":"neuronoff","name":"Neuronoff","country":"USA","founded":"2017","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.neuronoff.com/","profileUrl":"https://www.neurofounders.co/startups/neuronoff"},
  {"slug":"neuronostics","name":"Neuronostics","country":"UK","founded":"2018","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Epilepsy","targetUser":"Clinicians","regulatory":"CE-Marked","funding":"Seed","website":"https://neuronostics.com/","profileUrl":"https://www.neurofounders.co/startups/neuronostics"},
  {"slug":"neuros-medical","name":"Neuros Medical","country":"USA","founded":"2008","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"FDA approved (PMA)","funding":"Series C+","website":"https://www.neurosmedical.com/","profileUrl":"https://www.neurofounders.co/startups/neuros-medical"},
  {"slug":"neurosteer","name":"Neurosteer","country":"USA","founded":"2015","category":"Neuroimaging","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Non-dilutive","website":"https://www.neurosteer.com/","profileUrl":"https://www.neurofounders.co/startups/neurosteer"},
  {"slug":"neurotrack","name":"Neurotrack","country":"USA","founded":"2012","category":"Diagnostics and Assessment","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Dementia/impairment","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series C+","website":"http://www.neurotrack.com/","profileUrl":"https://www.neurofounders.co/startups/neurotrack"},
  {"slug":"neuroventis","name":"Neuroventis","country":"Belgium","founded":"2017","category":"Diagnostics and Assessment","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Mixed","regulatory":"CE-Marked","funding":"Acquired","website":"http://www.neuroventis.care/","profileUrl":"https://www.neurofounders.co/startups/neuroventis"},
  {"slug":"neurox","name":"NeuroX","country":"UK","founded":"2024","category":"Consumer Neurotech","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Unknown","website":"https://www.neurox.co.uk/","profileUrl":"https://www.neurofounders.co/startups/neurox"},
  {"slug":"neuspera","name":"Neuspera","country":"USA","founded":"2019","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Other","targetUser":"Patients","regulatory":"FDA approved (PMA)","funding":"Series C+","website":"https://www.neuspera.com/","profileUrl":"https://www.neurofounders.co/startups/neuspera"},
  {"slug":"neuvana","name":"Neuvana","country":"USA","founded":"2015","category":"Consumer Neurotech","modality":"VNS","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Non-dilutive","website":"https://neuvanalife.com/","profileUrl":"https://www.neurofounders.co/startups/neuvana"},
  {"slug":"nextmind-snap-ar","name":"NextMind (Snap AR)","country":"France","founded":"2017","category":"Consumer Neurotech","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Consumers","regulatory":"Non-medical","funding":"Acquired","website":"https://ar.snap.com/welcome-nextmind","profileUrl":"https://www.neurofounders.co/startups/nextmind-snap-ar"},
  {"slug":"nimbus","name":"Nimbus","country":"Netherlands","founded":"2025","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Developers","regulatory":"Research only","funding":"Unknown","website":"https://nimbusbci.com/","profileUrl":"https://www.neurofounders.co/startups/nimbus"},
  {"slug":"noctrix-health","name":"Noctrix Health","country":"USA","founded":"2018","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Patients","regulatory":"Other approval","funding":"Acquired","website":"https://www.noctrixhealth.com/","profileUrl":"https://www.neurofounders.co/startups/noctrix-health"},
  {"slug":"noxisense","name":"Noxisense","country":"Argentina","founded":"2024","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Mixed","regulatory":"Preclinical","funding":"Non-dilutive","website":"https://www.noxisense.com/","profileUrl":"https://www.neurofounders.co/startups/noxisense"},
  {"slug":"nubrain","name":"Nubrain","country":"USA","founded":"2025","category":"Tools and Infrastructure","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Researchers","regulatory":"Research only","funding":"Seed","website":"https://nubrain.com/","profileUrl":"https://www.neurofounders.co/startups/nubrain"},
  {"slug":"nuromova-technology","name":"Nuromova Technology","country":"Hong Kong","founded":"2026","category":"Consumer Neurotech","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Unknown","website":"https://nuromova.com/","profileUrl":"https://www.neurofounders.co/startups/nuromova-technology"},
  {"slug":"nuropod","name":"Nuropod","country":"United Kingdom","founded":"2015","category":"Consumer Neurotech","modality":"VNS","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Unknown","website":"https://nuropod.com/","profileUrl":"https://www.neurofounders.co/startups/nuropod"},
  {"slug":"nuuron","name":"Nuuron","country":"Germany","founded":"2023","category":"Neuromodulation","modality":"Light/sound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Dementia/impairment","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.nuuron.com/","profileUrl":"https://www.neurofounders.co/startups/nuuron"},
  {"slug":"oculogica","name":"Oculogica","country":"USA","founded":"2014","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Head injury","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Non-dilutive","website":"https://www.oculogica.com/","profileUrl":"https://www.neurofounders.co/startups/oculogica"},
  {"slug":"open-neurotech","name":"Open Neurotech","country":"USA","founded":"2025","category":"Tools and Infrastructure","modality":"Others","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Paralysis/motor","targetUser":"Researchers","regulatory":"Research only","funding":"Unknown","website":"https://openneuro.tech/","profileUrl":"https://www.neurofounders.co/startups/open-neurotech"},
  {"slug":"optohive","name":"Optohive","country":"Switzerland","founded":"2024","category":"Neuroimaging","modality":"fNIRS","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"General brain health","targetUser":"Researchers","regulatory":"Research only","funding":"Non-dilutive","website":"https://optohive.io/","profileUrl":"https://www.neurofounders.co/startups/optohive"},
  {"slug":"orbit","name":"Orbit","country":"USA","founded":"2024","category":"Tools and Infrastructure","modality":"Software","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Developers","regulatory":"Research only","funding":"Pre-seed","website":"https://orbitneuro.com/","profileUrl":"https://www.neurofounders.co/startups/orbit"},
  {"slug":"oymotion-technology","name":"OYMotion Technology","country":"China","founded":"2015","category":"Tools and Infrastructure","modality":"Motor prosthetics","formFactor":"Prosthetic/assistive","interfaceDepth":"Non-invasive","indication":"Rehabilitation","targetUser":"Mixed","regulatory":"Unknown","funding":"Series C+","website":"https://www.oymotion.com/en/indexen","profileUrl":"https://www.neurofounders.co/startups/oymotion-technology"},
  {"slug":"panaxium","name":"Panaxium","country":"Canada","founded":"2016","category":"Neuromodulation","modality":"ECoG","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Stroke","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://panaxium.com/","profileUrl":"https://www.neurofounders.co/startups/panaxium"},
  {"slug":"panda-surgical","name":"Panda Surgical","country":"UK","founded":"2022","category":"Tools and Infrastructure","modality":"Others","formFactor":"Surgical system","interfaceDepth":"Other","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"Preclinical","funding":"Seed","website":"https://www.panda-surgical.com/","profileUrl":"https://www.neurofounders.co/startups/panda-surgical"},
  {"slug":"pathmaker-neurosystems","name":"PathMaker Neurosystems","country":"USA","founded":"2014","category":"Neuromodulation","modality":"tDCS/tES","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Investigational","funding":"Non-dilutive","website":"https://pmneuro.com/","profileUrl":"https://www.neurofounders.co/startups/pathmaker-neurosystems"},
  {"slug":"phantom-neuro","name":"Phantom Neuro","country":"USA","founded":"2016","category":"Tools and Infrastructure","modality":"EMG","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Rehabilitation","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"http://www.phantomneuro.com/","profileUrl":"https://www.neurofounders.co/startups/phantom-neuro"},
  {"slug":"pieeg","name":"PiEEG","country":"UK","founded":"2022","category":"Tools and Infrastructure","modality":"EEG","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Research","targetUser":"Researchers","regulatory":"Research only","funding":"Non-dilutive","website":"https://pieeg.com/","profileUrl":"https://www.neurofounders.co/startups/pieeg"},
  {"slug":"pigpug-health","name":"PigPug Health","country":"USA","founded":"2018","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Neurodevelopmental","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://pigpug.co/","profileUrl":"https://www.neurofounders.co/startups/pigpug-health"},
  {"slug":"piramidal","name":"Piramidal","country":"USA","founded":"2024","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"General brain health","targetUser":"Clinicians","regulatory":"Investigational","funding":"Seed","website":"https://piramidal.ai/","profileUrl":"https://www.neurofounders.co/startups/piramidal"},
  {"slug":"pison-technology","name":"Pison Technology","country":"USA","founded":"2016","category":"Tools and Infrastructure","modality":"ExG","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://pison.com/","profileUrl":"https://www.neurofounders.co/startups/pison-technology"},
  {"slug":"pixyl","name":"PIXYL","country":"France","founded":"2015","category":"Neuroimaging","modality":"(f)MRI","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Acquired","website":"https://pixyl.ai/","profileUrl":"https://www.neurofounders.co/startups/pixyl"},
  {"slug":"positrigo","name":"Positrigo","country":"Switzerland","founded":"2018","category":"Neuroimaging","modality":"Others","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series A","website":"https://www.positrigo.com/","profileUrl":"https://www.neurofounders.co/startups/positrigo"},
  {"slug":"presidio-medical","name":"Presidio Medical","country":"USA","founded":"2017","category":"Neuromodulation","modality":"SCS","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Pain/migraine","targetUser":"Patients","regulatory":"Investigational","funding":"Series C+","website":"http://presidiomedical.com/","profileUrl":"https://www.neurofounders.co/startups/presidio-medical"},
  {"slug":"prima-mente","name":"Prima Mente","country":"UK","founded":"2023","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Dementia/impairment","targetUser":"Pharma","regulatory":"Investigational","funding":"Seed","website":"https://www.primamente.com/","profileUrl":"https://www.neurofounders.co/startups/prima-mente"},
  {"slug":"prophetic","name":"Prophetic","country":"USA","founded":"2023","category":"Consumer Neurotech","modality":"Ultrasound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Consumers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://prophetic.com/","profileUrl":"https://www.neurofounders.co/startups/prophetic"},
  {"slug":"purple-gaze","name":"Purple Gaze","country":"Netherlands","founded":"2019","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"General brain health","targetUser":"Researchers","regulatory":"Research only","funding":"Pre-seed","website":"http://purplegaze.io/","profileUrl":"https://www.neurofounders.co/startups/purple-gaze"},
  {"slug":"qmenta","name":"QMENTA","country":"USA","founded":"2013","category":"Neuroimaging","modality":"(f)MRI","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Seed","website":"http://www.qmenta.com/","profileUrl":"https://www.neurofounders.co/startups/qmenta"},
  {"slug":"quantanosis","name":"Quantanosis","country":"United States","founded":"2020","category":"Tools and Infrastructure","modality":"Ultrasound","formFactor":"Surgical system","interfaceDepth":"Non-invasive","indication":"Stroke","targetUser":"Patients","regulatory":"Preclinical","funding":"Seed","website":"https://www.quantanosis.ai/","profileUrl":"https://www.neurofounders.co/startups/quantanosis"},
  {"slug":"qv-bioelectronics","name":"QV Bioelectronics","country":"UK","founded":"2018","category":"Neuromodulation","modality":"Others","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Tumors","targetUser":"Patients","regulatory":"Preclinical","funding":"Seed","website":"http://www.qvbio.co.uk/","profileUrl":"https://www.neurofounders.co/startups/qv-bioelectronics"},
  {"slug":"qviti","name":"QVITI","country":"Poland","founded":"2010","category":"Neuromodulation","modality":"tDCS/tES","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Rehabilitation","targetUser":"Clinicians","regulatory":"Other approval","funding":"Unknown","website":"http://neurodevice.pl/en/","profileUrl":"https://www.neurofounders.co/startups/qviti"},
  {"slug":"reach-neuro","name":"Reach Neuro","country":"USA","founded":"2021","category":"Neuromodulation","modality":"SCS","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Stroke","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"http://www.reachneuro.com/","profileUrl":"https://www.neurofounders.co/startups/reach-neuro"},
  {"slug":"resolve-stroke","name":"Resolve Stroke","country":"France","founded":"2022","category":"Neuroimaging","modality":"Ultrasound","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"Stroke","targetUser":"Clinicians","regulatory":"Investigational","funding":"Seed","website":"https://www.resolvestroke.com/","profileUrl":"https://www.neurofounders.co/startups/resolve-stroke"},
  {"slug":"retispec","name":"RetiSpec","country":"Canada","founded":"2016","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Non-invasive","indication":"Dementia/impairment","targetUser":"Clinicians","regulatory":"Research only","funding":"Series A","website":"http://retispec.ai/","profileUrl":"https://www.neurofounders.co/startups/retispec"},
  {"slug":"revision-implant","name":"ReVision Implant","country":"Belgium","founded":"2020","category":"Brain-Computer Interface","modality":"Visual prosthesis","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Vision","targetUser":"Patients","regulatory":"Preclinical","funding":"Series A","website":"https://revision-implant.com/","profileUrl":"https://www.neurofounders.co/startups/revision-implant"},
  {"slug":"rhovica-neuroimaging","name":"Rhovica Neuroimaging","country":"Switzerland","founded":"2023","category":"Tools and Infrastructure","modality":"Others","formFactor":"Surgical system","interfaceDepth":"Minimally invasive","indication":"Other","targetUser":"Clinicians","regulatory":"Preclinical","funding":"Seed","website":"https://rhovica.com/","profileUrl":"https://www.neurofounders.co/startups/rhovica-neuroimaging"},
  {"slug":"ruten-inc","name":"Ruten Inc","country":"USA","founded":"2016","category":"Brain-Computer Interface","modality":"Intracortical","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Preclinical","funding":"Seed","website":"https://www.ruten-neuro.com/","profileUrl":"https://www.neurofounders.co/startups/ruten-inc"},
  {"slug":"sabi","name":"Sabi","country":"USA","founded":"2023","category":"Consumer Neurotech","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"https://sabi.com/","profileUrl":"https://www.neurofounders.co/startups/sabi"},
  {"slug":"samphire-neuroscience","name":"Samphire Neuroscience","country":"UK","founded":"2021","category":"Neuromodulation","modality":"tDCS/tES","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Women's health","targetUser":"Mixed","regulatory":"CE-Marked","funding":"Seed","website":"http://www.samphireneuro.com/","profileUrl":"https://www.neurofounders.co/startups/samphire-neuroscience"},
  {"slug":"sana-health","name":"Sana Health","country":"USA","founded":"2015","category":"Neuromodulation","modality":"Light/sound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"Other approval","funding":"Series A","website":"http://www.sana.io/","profileUrl":"https://www.neurofounders.co/startups/sana-health"},
  {"slug":"sanmai","name":"Sanmai","country":"USA","founded":"2020","category":"Neuromodulation","modality":"Ultrasound","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://sanmai.tech/","profileUrl":"https://www.neurofounders.co/startups/sanmai"},
  {"slug":"secondwave-systems","name":"SecondWave Systems","country":"USA","founded":"2019","category":"Neuromodulation","modality":"Ultrasound","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://www.secondwaveus.com/","profileUrl":"https://www.neurofounders.co/startups/secondwave-systems"},
  {"slug":"sensars","name":"Sensars","country":"USA","founded":"2014","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Other","targetUser":"Patients","regulatory":"Investigational","funding":"Pre-seed","website":"https://www.sensars.com/","profileUrl":"https://www.neurofounders.co/startups/sensars"},
  {"slug":"sense-neuro-diagnostics","name":"Sense Neuro Diagnostics","country":"USA","founded":"2017","category":"Diagnostics and Assessment","modality":"Others","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Stroke","targetUser":"Clinicians","regulatory":"Investigational","funding":"Series B","website":"http://www.senseneuro.com/","profileUrl":"https://www.neurofounders.co/startups/sense-neuro-diagnostics"},
  {"slug":"senseye","name":"Senseye","country":"USA","founded":"2015","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Psychiatry","targetUser":"Clinicians","regulatory":"Investigational","funding":"Series B","website":"http://www.senseye.co/","profileUrl":"https://www.neurofounders.co/startups/senseye"},
  {"slug":"sensome","name":"Sensome","country":"France","founded":"2014","category":"Tools and Infrastructure","modality":"Endovascular","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Stroke","targetUser":"Clinicians","regulatory":"Investigational","funding":"Series B","website":"https://www.sensome.com/","profileUrl":"https://www.neurofounders.co/startups/sensome"},
  {"slug":"sevaro","name":"Sevaro","country":"USA","founded":"2019","category":"Tools and Infrastructure","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"Other approval","funding":"Series B","website":"https://sevaro.com/","profileUrl":"https://www.neurofounders.co/startups/sevaro"},
  {"slug":"sharper-sense","name":"Sharper Sense","country":"USA","founded":"2020","category":"Consumer Neurotech","modality":"VNS","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"http://www.sharpersense.com/","profileUrl":"https://www.neurofounders.co/startups/sharper-sense"},
  {"slug":"shiratronics","name":"ShiraTronics","country":"USA","founded":"2018","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Pain/migraine","targetUser":"Patients","regulatory":"Investigational","funding":"Series B","website":"https://shiratronics.com/","profileUrl":"https://www.neurofounders.co/startups/shiratronics"},
  {"slug":"somareality","name":"Somareality","country":"Austria","founded":"2020","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Seed","website":"http://somareality.com/","profileUrl":"https://www.neurofounders.co/startups/somareality"},
  {"slug":"somnee","name":"Somnee","country":"USA","founded":"2017","category":"Consumer Neurotech","modality":"tDCS/tES","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"http://somneesleep.com/","profileUrl":"https://www.neurofounders.co/startups/somnee"},
  {"slug":"sona","name":"SONA","country":"UK","founded":"2019","category":"Consumer Neurotech","modality":"VNS","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://sona.help/","profileUrl":"https://www.neurofounders.co/startups/sona"},
  {"slug":"sond","name":"SOND","country":"United States","founded":"2022","category":"Consumer Neurotech","modality":"Others","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"https://sond.com/","profileUrl":"https://www.neurofounders.co/startups/sond"},
  {"slug":"sonomind","name":"SonoMind","country":"France","founded":"2024","category":"Neuromodulation","modality":"Ultrasound","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://www.sonomind.com/","profileUrl":"https://www.neurofounders.co/startups/sonomind"},
  {"slug":"sound-wave-innovation","name":"Sound Wave Innovation","country":"Japan","founded":"2020","category":"Neuromodulation","modality":"Ultrasound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Dementia/impairment","targetUser":"Patients","regulatory":"Investigational","funding":"Series C+","website":"https://sw-innovation.com/","profileUrl":"https://www.neurofounders.co/startups/sound-wave-innovation"},
  {"slug":"spark-biomedical","name":"Spark Biomedical","country":"USA","founded":"2018","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"FDA cleared (510k)","funding":"Series A","website":"http://www.sparkbiomedical.com/","profileUrl":"https://www.neurofounders.co/startups/spark-biomedical"},
  {"slug":"spinally","name":"Spinally","country":"Spain","founded":"2022","category":"Neuromodulation","modality":"SCS","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Pain/migraine","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://spinallymedical.com/","profileUrl":"https://www.neurofounders.co/startups/spinally"},
  {"slug":"spinex","name":"SpineX","country":"USA","founded":"2018","category":"Neuromodulation","modality":"SCS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://spinex.co/","profileUrl":"https://www.neurofounders.co/startups/spinex"},
  {"slug":"spiro-medical","name":"Spiro Medical","country":"USA","founded":"2023","category":"Neuromodulation","modality":"Nerve stimulator","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Other","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://www.spiro-medical.com/","profileUrl":"https://www.neurofounders.co/startups/spiro-medical"},
  {"slug":"starfish-neuroscience","name":"Starfish Neuroscience","country":"USA","founded":"2022","category":"Tools and Infrastructure","modality":"Others","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"Preclinical","funding":"Unknown","website":"https://starfishneuroscience.com/","profileUrl":"https://www.neurofounders.co/startups/starfish-neuroscience"},
  {"slug":"stimvia","name":"Stimvia","country":"Czechia","founded":"2014","category":"Neuromodulation","modality":"VNS","formFactor":"External device","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Patients","regulatory":"CE-Marked","funding":"Series A","website":"https://www.stimvia.com/en/","profileUrl":"https://www.neurofounders.co/startups/stimvia"},
  {"slug":"subsense-inc","name":"Subsense Inc","country":"USA","founded":"2024","category":"Brain-Computer Interface","modality":"Others","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"Preclinical","funding":"Series A","website":"https://www.subsense-bci.com/","profileUrl":"https://www.neurofounders.co/startups/subsense-inc"},
  {"slug":"subtle-medical","name":"Subtle Medical","country":"USA","founded":"2017","category":"Neuroimaging","modality":"(f)MRI","formFactor":"Software/app","interfaceDepth":"Software","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series C+","website":"http://www.subtlemedical.com/","profileUrl":"https://www.neurofounders.co/startups/subtle-medical"},
  {"slug":"surf-therapeutics","name":"Surf Therapeutics","country":"USA","founded":"2023","category":"Neuromodulation","modality":"Ultrasound","formFactor":"Other","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"https://www.surftherapeutics.com/","profileUrl":"https://www.neurofounders.co/startups/surf-therapeutics"},
  {"slug":"sychedelic","name":"Sychedelic","country":"India","founded":"2023","category":"Consumer Neurotech","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://sychedelic.com/","profileUrl":"https://www.neurofounders.co/startups/sychedelic"},
  {"slug":"synaptive-medical","name":"Synaptive Medical","country":"Canada","founded":"2012","category":"Neuroimaging","modality":"(f)MRI","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"Tumors","targetUser":"Clinicians","regulatory":"CE-Marked","funding":"Series C+","website":"https://www.synaptivemedical.com/","profileUrl":"https://www.neurofounders.co/startups/synaptive-medical"},
  {"slug":"synaptrix-labs","name":"Synaptrix Labs","country":"USA","founded":"2023","category":"Brain-Computer Interface","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Preclinical","funding":"Seed","website":"https://www.synaptrix-labs.com/","profileUrl":"https://www.neurofounders.co/startups/synaptrix-labs"},
  {"slug":"synchneuro","name":"SynchNeuro","country":"USA","founded":"2021","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Patients","regulatory":"Preclinical","funding":"Seed","website":"http://www.synchneuro.com/","profileUrl":"https://www.neurofounders.co/startups/synchneuro"},
  {"slug":"synchroni","name":"Synchroni","country":"USA","founded":"2024","category":"Tools and Infrastructure","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Pre-seed","website":"https://synchroni.co/","profileUrl":"https://www.neurofounders.co/startups/synchroni"},
  {"slug":"synergia-medical","name":"Synergia Medical","country":"Belgium","founded":"2015","category":"Neuromodulation","modality":"VNS","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Epilepsy","targetUser":"Patients","regulatory":"Investigational","funding":"Series B","website":"https://www.synergia-medical.com/","profileUrl":"https://www.neurofounders.co/startups/synergia-medical"},
  {"slug":"syntropic","name":"Syntropic","country":"Austria","founded":"2023","category":"Neuromodulation","modality":"Light/sound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Patients","regulatory":"Investigational","funding":"Seed","website":"http://www.syntropicmedical.com/","profileUrl":"https://www.neurofounders.co/startups/syntropic"},
  {"slug":"temple","name":"Temple","country":"India","founded":"2025","category":"Consumer Neurotech","modality":"Others","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"https://temple.com/","profileUrl":"https://www.neurofounders.co/startups/temple"},
  {"slug":"the-biological-computing-co","name":"The Biological Computing Co","country":"USA","founded":"2022","category":"Tools and Infrastructure","modality":"MEA","formFactor":"Other","interfaceDepth":"Ex vivo","indication":"Research","targetUser":"Mixed","regulatory":"Research only","funding":"Seed","website":"https://www.tbc.co/","profileUrl":"https://www.neurofounders.co/startups/the-biological-computing-co"},
  {"slug":"therasonic","name":"TheraSonic","country":"France","founded":"2023","category":"Tools and Infrastructure","modality":"Ultrasound","formFactor":"Surgical system","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Pharma","regulatory":"Preclinical","funding":"Pre-seed","website":"https://www.therasonic.fr/","profileUrl":"https://www.neurofounders.co/startups/therasonic"},
  {"slug":"theta-neurotech","name":"Theta Neurotech","country":"USA","founded":"2022","category":"Neuroimaging","modality":"EEG","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Epilepsy","targetUser":"Patients","regulatory":"Preclinical","funding":"Pre-seed","website":"https://www.thetaneurotech.com/","profileUrl":"https://www.neurofounders.co/startups/theta-neurotech"},
  {"slug":"thymia","name":"Thymia","country":"UK","founded":"2020","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Psychiatry","targetUser":"Clinicians","regulatory":"Investigational","funding":"Seed","website":"https://thymia.ai/","profileUrl":"https://www.neurofounders.co/startups/thymia"},
  {"slug":"tiposi","name":"Tiposi","country":"USA","founded":"2020","category":"Neuroimaging","modality":"Others","formFactor":"Imaging system","interfaceDepth":"Non-invasive","indication":"Stroke","targetUser":"Clinicians","regulatory":"Investigational","funding":"Bootstrapped","website":"https://tiposi.com/","profileUrl":"https://www.neurofounders.co/startups/tiposi"},
  {"slug":"uneeg-medical","name":"UNEEG Medical","country":"Denmark","founded":"2005","category":"Neuroimaging","modality":"EEG","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Epilepsy","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Non-dilutive","website":"http://uneeg.com/","profileUrl":"https://www.neurofounders.co/startups/uneeg-medical"},
  {"slug":"universal-brain","name":"Universal Brain","country":"USA","founded":"2022","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Psychiatry","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Seed","website":"https://universal-brain.com/","profileUrl":"https://www.neurofounders.co/startups/universal-brain"},
  {"slug":"u-the-mind-company","name":"U: The mind company","country":"USA","founded":"2018","category":"Consumer Neurotech","modality":"tDCS/tES","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Pre-seed","website":"https://uthemind.company/","profileUrl":"https://www.neurofounders.co/startups/u-the-mind-company"},
  {"slug":"vagustim","name":"Vagustim","country":"Turkey","founded":"2019","category":"Consumer Neurotech","modality":"VNS","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Seed","website":"https://vagustim.io/","profileUrl":"https://www.neurofounders.co/startups/vagustim"},
  {"slug":"vielight","name":"Vielight","country":"Canada","founded":"2011","category":"Consumer Neurotech","modality":"Light/sound","formFactor":"Headset/cap","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Investigational","funding":"Unknown","website":"https://www.vielight.com/","profileUrl":"https://www.neurofounders.co/startups/vielight"},
  {"slug":"viewmind","name":"ViewMind","country":"USA","founded":"2016","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Dementia/impairment","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"http://www.viewmind.com/","profileUrl":"https://www.neurofounders.co/startups/viewmind"},
  {"slug":"vistim-labs","name":"Vistim Labs","country":"USA","founded":"2021","category":"Diagnostics and Assessment","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Dementia/impairment","targetUser":"Clinicians","regulatory":"Other approval","funding":"Seed","website":"http://vistimlabs.com/","profileUrl":"https://www.neurofounders.co/startups/vistim-labs"},
  {"slug":"vonova","name":"Vonova","country":"USA","founded":"2019","category":"Tools and Infrastructure","modality":"Endovascular","formFactor":"Implant","interfaceDepth":"Minimally invasive","indication":"Multi-indication","targetUser":"Patients","regulatory":"Preclinical","funding":"Seed","website":"http://www.vonova.io/","profileUrl":"https://www.neurofounders.co/startups/vonova"},
  {"slug":"wave-neuroscience","name":"Wave Neuroscience","country":"USA","founded":"2019","category":"Neuromodulation","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Psychiatry","targetUser":"Mixed","regulatory":"FDA cleared (510k)","funding":"Series B","website":"https://www.waveneuro.com/","profileUrl":"https://www.neurofounders.co/startups/wave-neuroscience"},
  {"slug":"wearable-devices","name":"Wearable Devices","country":"Israel","founded":"2014","category":"Tools and Infrastructure","modality":"EMG","formFactor":"Wearable (body)","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Public","website":"https://www.wearabledevices.co.il/","profileUrl":"https://www.neurofounders.co/startups/wearable-devices"},
  {"slug":"winterlight-labs","name":"Winterlight Labs","country":"Canada","founded":"2015","category":"Diagnostics and Assessment","modality":"Biomarkers","formFactor":"Software/app","interfaceDepth":"Software","indication":"Dementia/impairment","targetUser":"Researchers","regulatory":"Research only","funding":"Acquired","website":"http://www.winterlightlabs.com/","profileUrl":"https://www.neurofounders.co/startups/winterlight-labs"},
  {"slug":"wise","name":"WISE","country":"Italy","founded":"2011","category":"Tools and Infrastructure","modality":"ECoG","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Tumors","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Series C+","website":"https://wiseneuro.com/","profileUrl":"https://www.neurofounders.co/startups/wise"},
  {"slug":"wisear","name":"Wisear","country":"France","founded":"2019","category":"Consumer Neurotech","modality":"EEG","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Wellness","targetUser":"Consumers","regulatory":"Non-medical","funding":"Acquired","website":"https://www.wisear.io/","profileUrl":"https://www.neurofounders.co/startups/wisear"},
  {"slug":"xanastim","name":"XanaStim","country":"Switzerland","founded":"2021","category":"Neuromodulation","modality":"VNS","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"Sleep","targetUser":"Patients","regulatory":"Investigational","funding":"Unknown","website":"https://www.xanastim.com/","profileUrl":"https://www.neurofounders.co/startups/xanastim"},
  {"slug":"x-trodes","name":"X-trodes","country":"Israel","founded":"2019","category":"Tools and Infrastructure","modality":"EEG","formFactor":"Patch","interfaceDepth":"Non-invasive","indication":"Other","targetUser":"Mixed","regulatory":"FDA cleared (510k)","funding":"Seed","website":"http://www.xtrodes.com/","profileUrl":"https://www.neurofounders.co/startups/x-trodes"},
  {"slug":"yneuro","name":"Yneuro","country":"France","founded":"2019","category":"Consumer Neurotech","modality":"Software","formFactor":"Software/app","interfaceDepth":"Software","indication":"Other","targetUser":"Developers","regulatory":"Non-medical","funding":"Seed","website":"http://www.yneuro.com/","profileUrl":"https://www.neurofounders.co/startups/yneuro"},
  {"slug":"zander-labs","name":"Zander Labs","country":"Netherlands","founded":"2016","category":"Tools and Infrastructure","modality":"EEG","formFactor":"Software/app","interfaceDepth":"Software","indication":"Research","targetUser":"Mixed","regulatory":"Non-medical","funding":"Non-dilutive","website":"https://www.zanderlabs.com/","profileUrl":"https://www.neurofounders.co/startups/zander-labs"},
  {"slug":"zenowell","name":"ZenoWell","country":"Germany","founded":"2024","category":"Consumer Neurotech","modality":"VNS","formFactor":"Earbud/headphone","interfaceDepth":"Non-invasive","indication":"General brain health","targetUser":"Consumers","regulatory":"Non-medical","funding":"Unknown","website":"https://zenowell.ai/","profileUrl":"https://www.neurofounders.co/startups/zenowell"},
  {"slug":"zeta-surgical","name":"Zeta Surgical","country":"USA","founded":"2018","category":"Tools and Infrastructure","modality":"Software","formFactor":"Surgical system","interfaceDepth":"Other","indication":"Multi-indication","targetUser":"Clinicians","regulatory":"FDA cleared (510k)","funding":"Seed","website":"https://www.zetasurgical.com/","profileUrl":"https://www.neurofounders.co/startups/zeta-surgical"},
  {"slug":"zhiran-medical","name":"Zhiran Medical","country":"China","founded":"2022","category":"Brain-Computer Interface","modality":"Intracortical","formFactor":"Implant","interfaceDepth":"Implantable","indication":"Paralysis/motor","targetUser":"Patients","regulatory":"Investigational","funding":"Series A","website":"https://bciflex.com/","profileUrl":"https://www.neurofounders.co/startups/zhiran-medical"}
].map(neurofoundersCompany);


export const companies: Company[] = [
  ...neurofoundersCatalogCompanies,
  // Global priority company expansion: official product or technology material is linked for every profile.
  expansionCompany({ slug: "medtronic-neuromodulation", name: "Medtronic", category: "minimally-invasive", region: "north-america", modality: "Implantable DBS, spinal-cord stimulation, and neurostimulation systems", targetFunction: "Neurological and chronic-pain treatment through implanted neuromodulation", stage: "Major medical-device company with commercial neuromodulation product lines", evidenceLevel: "E6", deviceTypes: ["dbs", "spinal-stimulation", "peripheral-stimulation"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Minneapolis, MN", "United States", 44.9778, -93.265], website: "https://www.medtronic.com/us-en/healthcare-professionals/therapies-procedures/neurological.html" }),
  expansionCompany({ slug: "abbott-neuromodulation", name: "Abbott Neuromodulation", category: "minimally-invasive", region: "north-america", modality: "Implantable DBS, spinal-cord stimulation, and peripheral nerve stimulation", targetFunction: "Movement-disorder and chronic-pain treatment through implanted neuromodulation", stage: "Major medical-device company with commercial neuromodulation product lines", evidenceLevel: "E6", deviceTypes: ["dbs", "spinal-stimulation", "peripheral-stimulation"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Abbott Park, IL", "United States", 42.2589, -87.877], website: "https://www.neuromodulation.abbott/us/en/healthcare-professionals.html" }),
  expansionCompany({ slug: "boston-scientific-neuromodulation", name: "Boston Scientific Neuromodulation", category: "minimally-invasive", region: "north-america", modality: "Implantable DBS, spinal-cord stimulation, and peripheral nerve stimulation", targetFunction: "Movement-disorder and chronic-pain treatment through implanted neuromodulation", stage: "Major medical-device company with commercial neuromodulation product lines", evidenceLevel: "E6", deviceTypes: ["dbs", "spinal-stimulation", "peripheral-stimulation"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Marlborough, MA", "United States", 42.3459, -71.5523], founded: 1979, website: "https://www.bostonscientific.com/en-US/medical-specialties/pain-management.html" }),
  expansionCompany({ slug: "neuropace-rns", name: "NeuroPace", category: "minimally-invasive", region: "north-america", modality: "Responsive neurostimulation with chronic intracranial EEG recording", targetFunction: "Seizure reduction and long-term epilepsy brain-network monitoring", stage: "Commercial responsive neurostimulation company", evidenceLevel: "E6", deviceTypes: ["eeg", "ecog", "dbs"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Mountain View, CA", "United States", 37.3861, -122.0839], founded: 1997, website: "https://www.neuropace.com/" }),
  expansionCompany({ slug: "cochlear", name: "Cochlear", category: "minimally-invasive", region: "rest-of-world", modality: "Cochlear and auditory-brainstem neural prostheses", targetFunction: "Hearing restoration through implanted auditory neural interfaces", stage: "Major neural-prosthetics company with commercial cochlear-implant systems", evidenceLevel: "E6", deviceTypes: ["neural-probe", "peripheral-stimulation"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Sydney", "Australia", -33.8688, 151.2093], founded: 1981, website: "https://www.cochlear.com/us/en/professionals/products-and-candidacy/nucleus" }),
  expansionCompany({ slug: "advanced-bionics", name: "Advanced Bionics", category: "minimally-invasive", region: "north-america", modality: "Cochlear implant and hearing neuroprosthesis systems", targetFunction: "Hearing restoration through implanted auditory neural interfaces", stage: "Established commercial cochlear-implant company", evidenceLevel: "E6", deviceTypes: ["neural-probe", "peripheral-stimulation"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Valencia, CA", "United States", 34.413, -118.555], founded: 1993, website: "https://www.advancedbionics.com/" }),
  expansionCompany({ slug: "med-el", name: "MED-EL", category: "minimally-invasive", region: "europe", modality: "Cochlear, auditory-brainstem, and middle-ear implant systems", targetFunction: "Hearing restoration through implanted auditory neural interfaces", stage: "Established commercial hearing-implant company", evidenceLevel: "E6", deviceTypes: ["neural-probe", "peripheral-stimulation"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Innsbruck", "Austria", 47.2692, 11.4041], founded: 1977, website: "https://www.medel.com/" }),
  expansionCompany({ slug: "envoy-medical", name: "Envoy Medical", category: "minimally-invasive", region: "north-america", modality: "Implantable hearing neuroprosthesis and auditory-interface systems", targetFunction: "Hearing restoration for people with severe sensorineural hearing loss", stage: "Clinical and commercial hearing-implant company", evidenceLevel: "E2", deviceTypes: ["neural-probe", "peripheral-stimulation"], organizationScale: "clinical-growth", readiness: "human-research", hq: ["White Plains, NY", "United States", 41.0339, -73.7629], founded: 1995, website: "https://envoymedical.com/" }),
  expansionCompany({ slug: "iotamotion", name: "iotaMotion", category: "minimally-invasive", region: "north-america", modality: "Robotic and image-guided cochlear-implant insertion technology", targetFunction: "Improving precision and consistency in auditory neural-prosthesis surgery", stage: "Clinical-stage surgical neurotechnology company", evidenceLevel: "E2", deviceTypes: ["neural-probe", "rehab-robotics"], organizationScale: "clinical-growth", readiness: "human-research", hq: ["Iowa City, IA", "United States", 41.6611, -91.5302], founded: 2015, website: "https://iotamotion.com/" }),
  expansionCompany({ slug: "nyxoah", name: "Nyxoah", category: "minimally-invasive", region: "europe", modality: "Implantable hypoglossal-nerve stimulation for sleep apnea", targetFunction: "Sleep-apnea treatment through peripheral-nerve stimulation", stage: "Commercial implantable neuromodulation company", evidenceLevel: "E2", deviceTypes: ["peripheral-stimulation"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Mont-Saint-Guibert", "Belgium", 50.6343, 4.6104], founded: 2009, website: "https://nyxoah.com/" }),
  expansionCompany({ slug: "respicardia", name: "Respicardia", category: "minimally-invasive", region: "north-america", modality: "Implantable phrenic-nerve stimulation system", targetFunction: "Central sleep-apnea treatment through peripheral-nerve stimulation", stage: "Commercial implantable neurostimulation company", evidenceLevel: "E6", deviceTypes: ["peripheral-stimulation"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Minnetonka, MN", "United States", 44.9212, -93.4687], founded: 2006, website: "https://respicardia.com/" }),
  expansionCompany({ slug: "mainstay-medical", name: "Mainstay Medical", category: "minimally-invasive", region: "europe", modality: "Implantable restorative neurostimulation for multifidus muscle activation", targetFunction: "Chronic mechanical back-pain treatment through neuromodulation", stage: "Commercial implantable neurostimulation company", evidenceLevel: "E6", deviceTypes: ["peripheral-stimulation"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Dublin", "Ireland", 53.3498, -6.2603], founded: 2008, website: "https://mainstaymedical.com/" }),
  expansionCompany({ slug: "neuraptive", name: "Neuraptive Therapeutics", category: "minimally-invasive", region: "north-america", modality: "Implantable nerve-interface and biologic nerve-repair platform", targetFunction: "Peripheral nerve repair and restoration of motor function", stage: "Clinical-stage peripheral-nerve restoration company", evidenceLevel: "E1", deviceTypes: ["peripheral-stimulation", "neural-probe"], organizationScale: "clinical-growth", readiness: "human-research", hq: ["Chesterbrook, PA", "United States", 40.0715, -75.459], founded: 2016, website: "https://neuraptive.com/" }),
  expansionCompany({ slug: "motif-neurotech", name: "Motif Neurotech", category: "minimally-invasive", region: "north-america", modality: "Minimally invasive deep transcranial magnetic stimulation platform", targetFunction: "Targeted psychiatric neuromodulation research", stage: "Clinical-stage minimally invasive neurostimulation company", evidenceLevel: "E1", deviceTypes: ["tms"], organizationScale: "clinical-growth", readiness: "human-research", hq: ["New York, NY", "United States", 40.7128, -74.006], founded: 2022, website: "https://motifneurotech.com/" }),
  expansionCompany({ slug: "rune-labs", name: "Rune Labs", category: "non-invasive", region: "north-america", modality: "Neural-data platform integrating device and clinical data", targetFunction: "Measurement and optimization of neurological care, including Parkinson's disease", stage: "Commercial neuroinformatics company", evidenceLevel: "E2", deviceTypes: ["dbs", "eeg"], organizationScale: "clinical-growth", readiness: "commercial-nonmedical", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2018, website: "https://runelabs.io/" }),
  expansionCompany({ slug: "brainsgate", name: "BrainsGate", category: "non-invasive", region: "asia", modality: "External sphenopalatine-ganglion stimulation platform", targetFunction: "Acute ischemic-stroke neuromodulation research", stage: "Clinical-stage stroke neuromodulation company", evidenceLevel: "E3", deviceTypes: ["peripheral-stimulation"], organizationScale: "clinical-growth", readiness: "human-research", hq: ["Caesarea", "Israel", 32.5187, 34.9047], founded: 2000, website: "https://brainsgate.com/" }),
  expansionCompany({ slug: "neurovigil", name: "NeuroVigil", category: "non-invasive", region: "north-america", modality: "Single-channel EEG and machine-learning neurophysiology analysis", targetFunction: "Longitudinal brain-state monitoring and neurological biomarker research", stage: "Commercial neurophysiology company", evidenceLevel: "E1", deviceTypes: ["eeg"], organizationScale: "clinical-growth", readiness: "commercial-nonmedical", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2007, website: "https://neurovigil.com/" }),
  expansionCompany({ slug: "alpha-stim", name: "Alpha-Stim", category: "non-invasive", region: "north-america", modality: "Cranial electrotherapy stimulation and microcurrent devices", targetFunction: "Non-invasive stimulation for anxiety, insomnia, and pain-management indications", stage: "Commercial non-invasive stimulation company", evidenceLevel: "E2", deviceTypes: ["tes"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Mineral Wells, TX", "United States", 32.8085, -98.1128], founded: 1981, website: "https://alpha-stim.com/" }),
  expansionCompany({ slug: "tvns-technologies", name: "tVNS Technologies", category: "non-invasive", region: "europe", modality: "Transcutaneous vagus-nerve stimulation devices", targetFunction: "Non-invasive autonomic and neurological neuromodulation research", stage: "Commercial wearable neurostimulation company", evidenceLevel: "E1", deviceTypes: ["peripheral-stimulation"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Erlangen", "Germany", 49.5897, 11.0078], founded: 2016, website: "https://t-vns.com/" }),
  expansionCompany({ slug: "parasym", name: "Parasym", category: "non-invasive", region: "europe", modality: "Non-invasive vagus-nerve stimulation wearable", targetFunction: "Autonomic and inflammatory-condition neuromodulation research", stage: "Commercial wearable neurostimulation company", evidenceLevel: "E1", deviceTypes: ["peripheral-stimulation"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2019, website: "https://parasym.co/" }),
  expansionCompany({ slug: "pulsetto", name: "Pulsetto", category: "non-invasive", region: "europe", modality: "Consumer vagus-nerve stimulation wearable", targetFunction: "Stress and sleep support through non-invasive peripheral stimulation", stage: "Consumer neurotechnology company", evidenceLevel: "E1", deviceTypes: ["peripheral-stimulation"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Vilnius", "Lithuania", 54.6872, 25.2797], founded: 2020, website: "https://pulsetto.tech/" }),
  expansionCompany({ slug: "mendi", name: "Mendi", category: "non-invasive", region: "europe", modality: "fNIRS neurofeedback wearable", targetFunction: "Attention and cognitive-training measurement through optical neurofeedback", stage: "Consumer neurotechnology company", evidenceLevel: "E1", deviceTypes: ["fnirs", "optical-imaging"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Stockholm", "Sweden", 59.3293, 18.0686], founded: 2018, website: "https://mendi.io/" }),
  expansionCompany({ slug: "sensai", name: "Sens.ai", category: "non-invasive", region: "north-america", modality: "EEG-informed neurofeedback and light-sound stimulation platform", targetFunction: "Cognitive-training and brain-state feedback applications", stage: "Consumer neurotechnology company", evidenceLevel: "E1", deviceTypes: ["eeg", "tes"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Toronto", "Canada", 43.6532, -79.3832], founded: 2020, website: "https://sens.ai/" }),
  expansionCompany({ slug: "nextsense", name: "NextSense", category: "non-invasive", region: "north-america", modality: "In-ear EEG and sleep-monitoring platform", targetFunction: "Ambulatory brain-state and sleep measurement", stage: "Clinical and consumer neurotechnology company", evidenceLevel: "E1", deviceTypes: ["eeg"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Berkeley, CA", "United States", 37.8715, -122.273], founded: 2018, website: "https://nextsense.io/" }),
  expansionCompany({ slug: "idun-technologies", name: "IDUN Technologies", category: "non-invasive", region: "europe", modality: "Dry-electrode ear-EEG and biosignal platform", targetFunction: "Continuous cognitive-state and physiological monitoring", stage: "Early wearable neurotechnology company", evidenceLevel: "E1", deviceTypes: ["eeg"], organizationScale: "early-startup", readiness: "research-infrastructure", hq: ["Zurich", "Switzerland", 47.3769, 8.5417], founded: 2017, website: "https://iduntechnologies.com/" }),
  expansionCompany({ slug: "earable-neuroscience", name: "Earable Neuroscience", category: "non-invasive", region: "asia", modality: "In-ear EEG, motion, and biosignal sensing platform", targetFunction: "Sleep, cognitive-state, and neurological-health measurement", stage: "Commercial wearable neurotechnology company", evidenceLevel: "E1", deviceTypes: ["eeg"], organizationScale: "clinical-growth", readiness: "commercial-nonmedical", hq: ["Ho Chi Minh City", "Vietnam", 10.8231, 106.6297], founded: 2019, website: "https://earable.ai/" }),
  expansionCompany({ slug: "imotions", name: "iMotions", category: "non-invasive", region: "europe", modality: "Multimodal biosignal, EEG, eye-tracking, and human-behavior research platform", targetFunction: "Human neuroscience and cognitive research infrastructure", stage: "Established research-technology company", evidenceLevel: "E2", deviceTypes: ["eeg", "eye-tracking"], organizationScale: "established-company", readiness: "research-infrastructure", hq: ["Copenhagen", "Denmark", 55.6761, 12.5683], founded: 2005, website: "https://imotions.com/" }),
  expansionCompany({ slug: "mind-media", name: "Mind Media", category: "non-invasive", region: "europe", modality: "EEG neurofeedback and psychophysiology systems", targetFunction: "Clinical and research brain-state feedback workflows", stage: "Established neurofeedback technology company", evidenceLevel: "E2", deviceTypes: ["eeg"], organizationScale: "established-company", readiness: "research-infrastructure", hq: ["Herten", "Netherlands", 51.1805, 5.8263], founded: 1993, website: "https://mindmedia.com/" }),
  expansionCompany({ slug: "thought-technology", name: "Thought Technology", category: "non-invasive", region: "north-america", modality: "EEG biofeedback and physiological measurement systems", targetFunction: "Neurofeedback, psychophysiology, and clinical-research infrastructure", stage: "Established biofeedback technology company", evidenceLevel: "E2", deviceTypes: ["eeg"], organizationScale: "established-company", readiness: "research-infrastructure", hq: ["Montreal", "Canada", 45.5017, -73.5673], founded: 1975, website: "https://thoughttechnology.com/" }),
  expansionCompany({ slug: "brainlab", name: "Brainlab", category: "non-invasive", region: "europe", modality: "Image-guided surgery, digital neurosurgery, and neuro-navigation platform", targetFunction: "Neurosurgical planning and procedure guidance", stage: "Major medical-software and device company", evidenceLevel: "E2", deviceTypes: ["optical-imaging"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Munich", "Germany", 48.1351, 11.582], founded: 1989, website: "https://www.brainlab.com/" }),
  expansionCompany({ slug: "elekta", name: "Elekta", category: "minimally-invasive", region: "europe", modality: "Stereotactic radiosurgery, neuro-navigation, and precision radiation systems", targetFunction: "Brain-tumor and functional-neurosurgery treatment infrastructure", stage: "Major medical-device company", evidenceLevel: "E6", deviceTypes: ["optical-imaging"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Stockholm", "Sweden", 59.3293, 18.0686], founded: 1972, website: "https://www.elekta.com/" }),
  expansionCompany({ slug: "omniscient-neurotechnology", name: "Omniscient Neurotechnology", category: "non-invasive", region: "rest-of-world", modality: "AI connectomics and brain-network imaging software", targetFunction: "Personalized brain mapping for neurosurgical and neurological-care workflows", stage: "Clinical neuroimaging software company", evidenceLevel: "E2", deviceTypes: ["fmri", "optical-imaging"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Sydney", "Australia", -33.8688, 151.2093], founded: 2018, website: "https://o8t.com/" }),
  expansionCompany({ slug: "rapidai", name: "RapidAI", category: "non-invasive", region: "north-america", modality: "AI neuroimaging workflow software for stroke and vascular emergencies", targetFunction: "Faster brain-imaging triage and treatment coordination", stage: "Commercial clinical neuroimaging company", evidenceLevel: "E6", deviceTypes: ["optical-imaging"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["San Mateo, CA", "United States", 37.563, -122.3255], founded: 2012, website: "https://www.rapidai.com/" }),
  expansionCompany({ slug: "viz-ai", name: "Viz.ai", category: "non-invasive", region: "north-america", modality: "AI neuroimaging and care-coordination platform", targetFunction: "Stroke and neurological-emergency imaging workflows", stage: "Commercial clinical neuroimaging company", evidenceLevel: "E6", deviceTypes: ["optical-imaging"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2016, website: "https://www.viz.ai/" }),
  expansionCompany({ slug: "insightec", name: "Insightec", category: "non-invasive", region: "asia", modality: "MRI-guided focused ultrasound platform", targetFunction: "Non-invasive ablation and neuromodulation for movement-disorder care and research", stage: "Established focused-ultrasound medical-device company", evidenceLevel: "E6", deviceTypes: ["ultrasound", "fmri"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Haifa", "Israel", 32.794, 34.9896], founded: 1999, website: "https://insightec.com/" }),
  expansionCompany({ slug: "sonavex", name: "Sonavex", category: "non-invasive", region: "north-america", modality: "Portable ultrasound and AI imaging platform", targetFunction: "Point-of-care vascular and tissue imaging; adjacent neuroimaging infrastructure", stage: "Commercial ultrasound-imaging company", evidenceLevel: "E2", deviceTypes: ["ultrasound"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Baltimore, MD", "United States", 39.2904, -76.6122], founded: 2018, website: "https://sonavex.com/" }),
  expansionCompany({ slug: "surgical-theater", name: "Surgical Theater", category: "non-invasive", region: "north-america", modality: "3D patient-specific neurosurgical visualization and planning", targetFunction: "Neurosurgical planning and clinician-patient communication", stage: "Commercial surgical visualization company", evidenceLevel: "E2", deviceTypes: ["optical-imaging"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Cleveland, OH", "United States", 41.4993, -81.6944], founded: 2010, website: "https://surgicaltheater.net/" }),
  expansionCompany({ slug: "nico-corporation", name: "NICO Corporation", category: "minimally-invasive", region: "north-america", modality: "Minimally invasive neurosurgical and brain-tissue access systems", targetFunction: "Neurosurgical procedure support and neural-interface enabling access", stage: "Established neurosurgical device company", evidenceLevel: "E2", deviceTypes: ["neural-probe"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Indianapolis, IN", "United States", 39.7684, -86.1581], founded: 2007, website: "https://niconeuro.com/" }),
  expansionCompany({ slug: "nurotron", name: "Nurotron", category: "minimally-invasive", region: "asia", modality: "Cochlear implant and auditory neural-prosthesis systems", targetFunction: "Hearing restoration through implanted auditory neural interfaces", stage: "Commercial cochlear-implant company", evidenceLevel: "E2", deviceTypes: ["neural-probe", "peripheral-stimulation"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Hangzhou", "China", 30.2741, 120.1551], founded: 2006, website: "https://www.nurotron.com/" }),
  expansionCompany({ slug: "neosensory", name: "Neosensory", category: "non-invasive", region: "north-america", modality: "Wearable sensory-substitution and vibrotactile signal interface", targetFunction: "Accessible sensory augmentation and hearing-support research", stage: "Commercial sensory-interface company", evidenceLevel: "E1", deviceTypes: ["rehab-robotics"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Palo Alto, CA", "United States", 37.4419, -122.143], founded: 2015, website: "https://neosensory.com/" }),
  expansionCompany({ slug: "esper-bionics", name: "Esper Bionics", category: "non-invasive", region: "europe", modality: "EMG-controlled robotic prosthetic hand and digital fitting platform", targetFunction: "Upper-limb prosthetic control and rehabilitation", stage: "Commercial prosthetics and assistive-interface company", evidenceLevel: "E2", deviceTypes: ["emg", "rehab-robotics"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Kyiv", "Ukraine", 50.4501, 30.5234], founded: 2019, website: "https://esperbionics.com/" }),
  expansionCompany({ slug: "atom-limbs", name: "Atom Limbs", category: "non-invasive", region: "north-america", modality: "EMG-controlled bionic arm platform", targetFunction: "Affordable upper-limb prosthetic control", stage: "Early assistive-interface company", evidenceLevel: "E1", deviceTypes: ["emg", "rehab-robotics"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2019, website: "https://atomlimbs.com/" }),
  expansionCompany({ slug: "unlimited-tomorrow", name: "Unlimited Tomorrow", category: "non-invasive", region: "europe", modality: "3D-printed EMG-controlled prosthetic arms", targetFunction: "Accessible upper-limb prosthetic control", stage: "Commercial assistive-technology company", evidenceLevel: "E2", deviceTypes: ["emg", "rehab-robotics"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Bristol", "United Kingdom", 51.4545, -2.5879], founded: 2014, website: "https://www.unlimitedtomorrow.com/" }),
  expansionCompany({ slug: "myomo", name: "Myomo", category: "non-invasive", region: "north-america", modality: "EMG-sensed powered orthosis for upper-limb movement", targetFunction: "Restoring arm and hand movement after stroke, SCI, and neurological injury", stage: "Commercial myoelectric rehabilitation company", evidenceLevel: "E2", deviceTypes: ["emg", "rehab-robotics"], organizationScale: "established-company", readiness: "regulated-medical", hq: ["Boston, MA", "United States", 42.3601, -71.0589], founded: 2004, website: "https://myomo.com/" }),
  expansionCompany({ slug: "wandercraft", name: "Wandercraft", category: "non-invasive", region: "europe", modality: "Self-balancing robotic exoskeletons", targetFunction: "Mobility assistance and gait rehabilitation after neurological injury", stage: "Commercial rehabilitation-robotics company", evidenceLevel: "E2", deviceTypes: ["rehab-robotics"], organizationScale: "clinical-growth", readiness: "regulated-medical", hq: ["Paris", "France", 48.8566, 2.3522], founded: 2012, website: "https://www.wandercraft.eu/" }),
  expansionCompany({ slug: "myoswiss", name: "MyoSwiss", category: "non-invasive", region: "europe", modality: "Wearable robotic exoskeleton for gait support", targetFunction: "Mobility assistance and gait rehabilitation after neurological injury", stage: "Commercial rehabilitation-robotics company", evidenceLevel: "E2", deviceTypes: ["rehab-robotics"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Zurich", "Switzerland", 47.3769, 8.5417], founded: 2020, website: "https://myoswiss.com/" }),
  expansionCompany({ slug: "btemia", name: "B-Temia", category: "non-invasive", region: "north-america", modality: "Powered exoskeleton and human-augmentation systems", targetFunction: "Gait assistance and neurorehabilitation", stage: "Commercial rehabilitation-robotics company", evidenceLevel: "E2", deviceTypes: ["rehab-robotics"], organizationScale: "clinical-growth", readiness: "commercial-nonmedical", hq: ["Quebec City", "Canada", 46.8139, -71.208], founded: 2010, website: "https://btemia.com/" }),
  expansionCompany({ slug: "axiobionics", name: "Axiobionics", category: "non-invasive", region: "north-america", modality: "Functional electrical stimulation and rehabilitation systems", targetFunction: "Restoring movement and function after spinal cord injury and stroke", stage: "Commercial neurorehabilitation company", evidenceLevel: "E2", deviceTypes: ["tes", "rehab-robotics"], organizationScale: "early-startup", readiness: "commercial-nonmedical", hq: ["Wilmington, DE", "United States", 39.7391, -75.5398], founded: 2009, website: "https://axiobionics.com/" }),
  expansionCompany({ slug: "ottobock", name: "Ottobock", category: "non-invasive", region: "europe", modality: "Myoelectric prosthetics, orthotics, and rehabilitation technology", targetFunction: "Mobility and upper-limb assistive control", stage: "Major assistive-device company", evidenceLevel: "E2", deviceTypes: ["emg", "rehab-robotics"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Duderstadt", "Germany", 51.5091, 10.2598], website: "https://www.ottobock.com/" }),
  expansionCompany({ slug: "ossur", name: "Ossur", category: "non-invasive", region: "europe", modality: "Bionic prosthetics, orthotics, and mobility technology", targetFunction: "Upper- and lower-limb assistive control and rehabilitation", stage: "Major assistive-device company", evidenceLevel: "E2", deviceTypes: ["emg", "rehab-robotics"], organizationScale: "major-medtech", readiness: "regulated-medical", hq: ["Reykjavik", "Iceland", 64.1466, -21.9426], website: "https://www.ossur.com/" }),
  // Russia: company and BCI-enabling infrastructure records with direct first-party sources.
  expansionCompany({
    slug: "neurobotics-russia",
    name: "Neurobotics",
    category: "non-invasive",
    region: "europe",
    modality: "Dry-electrode EEG headsets, BCI software, neurorehabilitation, and assistive robotics",
    targetFunction: "Non-invasive neural control, biofeedback, education, and assistive-device research",
    stage: "Established BCI and neurophysiology equipment company",
    evidenceLevel: "E2",
    deviceTypes: ["eeg", "emg", "rehab-robotics"],
    organizationScale: "established-company",
    readiness: "research-infrastructure",
    hq: ["Zelenograd, Moscow", "Russia", 55.9825, 37.1814],
    founded: 2004,
    website: "https://neurobotics.ru/en/",
    referenceTitle: "Neurobotics neurophysiology and BCI portfolio",
    summary: "Neurobotics develops NeuroPlay dry-electrode EEG systems, BCI software, neurorehabilitation equipment, and assistive robots in Zelenograd. Its official technical history documents BCI competition results, patents, and a publication list.",
    hypeCheck: "The company has public products and demonstrations, but its performance and rehabilitation claims are not treated as clinical benefit without independent human outcome evidence.",
    extraSources: [
      source("Neurobotics company history, products, patents, and publications", "company-update", "https://neurobotics.ru/synopsis/", "Neurobotics"),
      source("NeuroPlay EEG and BCI product manual", "institution-page", "https://neurobotics.ru/repo/neuroplaypro/NeuroPlay-Manual-v1.9-EN.pdf", "Neurobotics")
    ]
  }),
  expansionCompany({
    slug: "neiry",
    name: "Neiry",
    category: "minimally-invasive",
    region: "europe",
    modality: "Consumer EEG systems plus preclinical invasive neural interfaces and stimulation",
    targetFunction: "Brain-state monitoring, device control, and preclinical bidirectional BCI research",
    stage: "Commercial non-invasive products; invasive work remains preclinical or company-announced",
    evidenceLevel: "E2",
    deviceTypes: ["eeg", "neural-probe", "dbs"],
    organizationScale: "clinical-growth",
    readiness: "preclinical",
    hq: ["Moscow", "Russia", 55.7558, 37.6173],
    founded: 2017,
    website: "https://neiry.ru/en",
    funding: "Company reports a RUB 4.25B valuation; not independently verified",
    referenceTitle: "Neiry technology portfolio",
    summary: "Neiry, founded by Alexander Panov, sells non-invasive neurotechnology products and reports an expanding preclinical invasive program spanning thin-film electrodes, stimulation, and animal BCI experiments.",
    hypeCheck: "The invasive accomplishments are animal studies and company reports. They are not human clinical evidence, and the company's valuation is recorded as a company-reported figure rather than independently verified net worth.",
    extraSources: [
      source("Neiry technologies and registration-certificate claims", "company-update", "https://neiry.ru/en/tech", "Neiry"),
      source("Neiry conference video and biodrone demonstration", "demo-video", "https://neiry.ru/en/news/kh4icf9o11-neiryconf-2025-biorobots-and-other-neuro", "Neiry")
    ]
  }),
  expansionCompany({
    slug: "neurochat-russia",
    name: "NeuroChat",
    category: "non-invasive",
    region: "europe",
    modality: "P300 EEG communication and neurotraining platform",
    targetFunction: "Text entry and digital communication for people with severe speech and motor impairment",
    stage: "Commercial EEG communication system with published pilot research",
    evidenceLevel: "E4",
    deviceTypes: ["eeg"],
    organizationScale: "clinical-growth",
    readiness: "commercial-nonmedical",
    hq: ["Moscow", "Russia", 55.7386, 37.5495],
    founded: 2016,
    website: "https://neuro.chat/en/",
    referenceTitle: "NeuroChat official system history and demonstration",
    summary: "NeuroChat is a P300 EEG communication and training system led by Natalia Galkina with scientific leadership from Alexander Kaplan. The company traces its first two-room demonstration to 2016 and commercial phase to 2019.",
    hypeCheck: "A peer-reviewed post-stroke aphasia study supports text-entry feasibility, but the company site's broad cognitive-training and health language should not be read as established clinical efficacy.",
    extraSources: [
      source("Post-stroke aphasia text entry with NeuroChat", "paper", "https://www.sciencejournals.ru/view-article/?a=JourVND2004003Ganin&j=jourvnd&n=4&v=70&y=2020", "Journal of Higher Nervous Activity"),
      source("NeuroChat user manual", "institution-page", "https://neuro.chat/upload/user_files/doc/rukovodstvo_polzovatelya.pdf", "NeuroChat")
    ]
  }),
  expansionCompany({
    slug: "bitronics-lab",
    name: "BiTronics Lab",
    category: "non-invasive",
    region: "europe",
    modality: "Educational EEG, EMG, biosignal, and human-machine-interaction kits",
    targetFunction: "Teaching and prototyping neurotechnology and biosignal interfaces",
    stage: "Commercial educational neurotechnology company",
    evidenceLevel: "E1",
    deviceTypes: ["eeg", "emg"],
    organizationScale: "early-startup",
    readiness: "research-infrastructure",
    hq: ["Moscow", "Russia", 55.7558, 37.6173],
    founded: 2015,
    website: "https://bitronicslab.com/en/",
    referenceTitle: "BiTronics Lab neurotechnology education portfolio",
    summary: "BiTronics Lab was founded by MIPT graduates and develops educational hardware, curricula, and software for physiology, neurotechnology, and human-machine interaction.",
    hypeCheck: "This is BCI-enabling education and prototyping infrastructure, not a clinical BCI or evidence of restored patient function.",
    extraSources: [source("BiTronics Lab company and production details", "company-update", "https://bitronicslab.com/terms", "BiTronics Lab")]
  }),
  expansionCompany({
    slug: "neurotech-smc",
    name: "SMC Neurotech",
    category: "non-invasive",
    region: "europe",
    modality: "Clinical EEG, EMG, evoked-potential, biofeedback, and rehabilitation systems",
    targetFunction: "Electrophysiology diagnostics and biofeedback-supported neurological rehabilitation",
    stage: "Established Russian medical-device manufacturer",
    evidenceLevel: "E1",
    deviceTypes: ["eeg", "emg", "rehab-robotics"],
    organizationScale: "established-company",
    readiness: "regulated-medical",
    hq: ["Taganrog", "Russia", 47.2362, 38.8969],
    founded: 1992,
    website: "https://neurotech.ru/en/about/",
    referenceTitle: "SMC Neurotech official company history",
    summary: "SMC Neurotech develops and manufactures electrophysiology and rehabilitation systems in Taganrog. The company says its founding ideas originated with physician Valery Kotlyarov and lists Vadim Sakharov and Kotlyarov as current directors.",
    hypeCheck: "The company is relevant as EEG and rehabilitation infrastructure. Its product registrations and biofeedback systems do not by themselves demonstrate a direct brain-computer interface or clinical superiority.",
    extraSources: [source("Kinesis rehabilitation and biofeedback system", "company-update", "https://neurotech.ru/en/products/kinezis/", "SMC Neurotech")]
  }),
  expansionCompany({
    slug: "mitsar-eeg",
    name: "Mitsar",
    category: "non-invasive",
    region: "europe",
    modality: "Clinical and research EEG systems with real-time BCI interfaces",
    targetFunction: "EEG acquisition for clinical neurophysiology, research, and non-invasive BCI development",
    stage: "Established EEG medical-device company",
    evidenceLevel: "E4",
    deviceTypes: ["eeg"],
    organizationScale: "established-company",
    readiness: "regulated-medical",
    hq: ["Saint Petersburg", "Russia", 59.9311, 30.3609],
    founded: 1996,
    website: "https://mitsar-eeg.com/about-us/",
    referenceTitle: "Mitsar official company history",
    summary: "Mitsar was founded in 1996 by four Russian engineers and produces EEG hardware and software in Saint Petersburg. Its systems have been used as the acquisition layer in peer-reviewed BCI studies.",
    hypeCheck: "The peer-reviewed result cited here validates a BCI study that used Mitsar acquisition hardware; it does not establish that Mitsar itself developed the decoder or therapy.",
    extraSources: [
      source("Mitsar company brochure and regulatory claims", "institution-page", "https://www.mitsar-eeg.com/download/MitsarEEG_Brochure_2020.pdf", "Mitsar"),
      source("Encephalophone clinical pilot using Mitsar EEG", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC12206841/", "PubMed Central")
    ]
  }),
  // University research programs are shown as research organizations, not companies.
  // Russia.
  academicProgram({ slug: "msu-neurocomputer-interfaces", name: "MSU Laboratory for Neurophysiology and Neuro-Computer Interfaces", category: "non-invasive", region: "europe", modality: "EEG P300 and motor-imagery BCI, neurofeedback, and assistive communication", targetFunction: "Communication and rehabilitation research using non-invasive brain-computer interfaces", deviceTypes: ["eeg", "emg", "eye-tracking", "tms"], evidenceLevel: "E4", hq: ["Moscow", "Russia", 55.7033, 37.5287], founded: 1986, website: "https://human.bio.msu.ru/lab_neurophysiology.html", summary: "Alexander Kaplan founded the Human Brain Research Group in 1986; the current MSU laboratory develops EEG BCI methods including the scientific foundation used by NeuroChat.", referenceTitle: "MSU Laboratory for Neurophysiology and Neuro-Computer Interfaces" }),
  academicProgram({ slug: "hse-bioelectric-interfaces", name: "HSE Center for Bioelectric Interfaces", category: "minimally-invasive", region: "europe", modality: "EEG, MEG, ECoG, neurofeedback, and state-dependent stimulation", targetFunction: "Non-invasive and invasive BCI methods for communication, prosthetic control, and neurofeedback", deviceTypes: ["eeg", "meg", "ecog", "tms", "tes", "emg"], evidenceLevel: "E1", hq: ["Moscow", "Russia", 55.7632, 37.6354], website: "https://bioelectric.hse.ru/", summary: "Directed by Alexey Ossadtchi, the HSE center develops bioelectric interfaces using EEG, MEG, EMG, and ECoG, including prosthetic-control and communication applications.", referenceTitle: "HSE Center for Bioelectric Interfaces" }),

  // Western Asia.
  academicProgram({ slug: "ktu-biomedical-bci", name: "Karadeniz Technical University Biomedical Research Laboratory", category: "non-invasive", region: "asia", modality: "EEG BCI, biomedical signal processing, and AI-assisted health systems", targetFunction: "Long-distance BCI communication and human-machine interaction research", deviceTypes: ["eeg"], evidenceLevel: "E1", hq: ["Trabzon", "Turkey", 41.0027, 39.7168], website: "https://www.ktu.edu.tr/ee/biomedical-research-laboratory-bal", summary: "Led by Onder Aydemir, KTU's Biomedical Research Laboratory conducts EEG BCI and biomedical-signal research, including a funded long-distance BCI communication project.", referenceTitle: "KTU Biomedical Research Laboratory" }),
  academicProgram({ slug: "itu-cognitive-systems-bci", name: "ITU Cognitive Systems Laboratory", category: "non-invasive", region: "asia", modality: "EEG BCI, cognitive-state monitoring, signal processing, and machine learning", targetFunction: "Brain-computer interaction and cognitive human-machine systems research", deviceTypes: ["eeg"], evidenceLevel: "E1", hq: ["Istanbul", "Turkey", 41.1053, 29.0254], website: "https://cognitive.itu.edu.tr/", summary: "Istanbul Technical University's Cognitive Systems Laboratory lists brain-computer interfaces as a current research focus alongside cognitive monitoring and signal processing.", referenceTitle: "ITU Cognitive Systems Laboratory" }),
  academicProgram({ slug: "kaust-neuroai", name: "KAUST NeuroAI", category: "non-invasive", region: "asia", modality: "Multimodal EEG-fNIRS neural decoding, foundation models, and brain-guided robotics", targetFunction: "Brain-computer control, assistive communication, and rehabilitative robotics", deviceTypes: ["eeg", "fnirs", "rehab-robotics"], evidenceLevel: "E1", hq: ["Thuwal", "Saudi Arabia", 22.3095, 39.1044], website: "https://cemse.kaust.edu.sa/research/resources/kaust-neuroai", summary: "Led by Mohamed Elhoseiny and Hernando Ombao, KAUST NeuroAI develops multimodal EEG-fNIRS decoding, brain-to-text and brain-to-image models, and BCI control for assistive robotic systems.", referenceTitle: "KAUST NeuroAI research program" }),
  academicProgram({ slug: "neom-paradromics-bci-center", name: "NEOM-Paradromics BCI Center of Excellence", category: "invasive", region: "asia", modality: "Planned high-data-rate implanted BCI clinical research center", targetFunction: "Future clinical research and regional access to BCI-based therapies", deviceTypes: ["intracortical", "neural-probe"], evidenceLevel: "E1", hq: ["NEOM", "Saudi Arabia", 28.0, 35.0], website: "https://spa.gov.sa/en/N2260420", summary: "NEOM and Paradromics announced in February 2025 that a BCI Center of Excellence would be established in NEOM for clinical research and eventual MENA-region care.", referenceTitle: "Saudi Press Agency announcement of the NEOM-Paradromics agreement" }),
  academicProgram({ slug: "kfsh-neuroscience-center", name: "KFSHRC Neuroscience Centre of Excellence", category: "invasive", region: "asia", modality: "Robot-assisted deep-brain stimulation and advanced neurological care", targetFunction: "Precision DBS surgery and clinical neuroscience programs", deviceTypes: ["dbs", "neural-probe", "optical-imaging"], evidenceLevel: "E1", hq: ["Riyadh", "Saudi Arabia", 24.7136, 46.6753], website: "https://www.spa.gov.sa/en/N2633987", summary: "King Faisal Specialist Hospital and Research Centre reports using an integrated robotic system for DBS procedures through its Neuroscience Centre of Excellence in 2026.", referenceTitle: "Saudi Press Agency report on KFSHRC robot-assisted DBS" }),
  academicProgram({ slug: "mbzuai-assistive-bci", name: "MBZUAI Assistive BCI Research", category: "non-invasive", region: "asia", modality: "Brain-signal decoding for assistive robotic control", targetFunction: "Restoring independence through brain-controlled robots and assistive AI", deviceTypes: ["rehab-robotics"], evidenceLevel: "E2", hq: ["Abu Dhabi", "United Arab Emirates", 24.4539, 54.3773], website: "https://research.mbzuai.ac.ae/", summary: "Hisham Cholakkal's team at MBZUAI publicly demonstrated a brain-signal interface controlling a robotic dog as an assistive-mobility research example.", referenceTitle: "MBZUAI research showcase with assistive BCI demonstration" }),

  // Central Asia and Mongolia.
  academicProgram({ slug: "nazarbayev-bci-research", name: "Nazarbayev University BCI and Neural AI Research", category: "non-invasive", region: "asia", modality: "EEG BCI, brain-controlled robotics, explainable neural AI, and rehabilitation systems", targetFunction: "Assistive robot control, stroke rehabilitation, and epilepsy-focused neural decoding", deviceTypes: ["eeg", "rehab-robotics"], evidenceLevel: "E4", hq: ["Astana", "Kazakhstan", 51.0907, 71.3989], website: "https://research.nu.edu.kz/en/persons/berdakh-abibullaev/", summary: "Berdakh Abibullaev and collaborators at Nazarbayev University maintain active BCI projects spanning telepresence robots, stroke-rehabilitation exoskeletons, explainable EEG decoding, and epilepsy care.", referenceTitle: "Nazarbayev University BCI project portfolio" }),
  academicProgram({ slug: "uzbekistan-neurocognitive-lab", name: "Uzbekistan Laboratory of Neurocognitive Research", category: "non-invasive", region: "asia", modality: "EEG, eye tracking, psychophysiology, and BCI research infrastructure", targetFunction: "Neurocognitive research, BCI prototyping, and neurorehabilitation education", deviceTypes: ["eeg", "eye-tracking", "emg"], evidenceLevel: "E1", hq: ["Tashkent", "Uzbekistan", 41.2995, 69.2401], website: "https://cfyi.uz/neurocognitive", summary: "The Center for Youth Initiatives' neurocognitive laboratory in Tashkent maintains EEG, eye-tracking, and psychophysiology equipment explicitly intended for BCI and neurorehabilitation research.", referenceTitle: "Laboratory of Neurocognitive Research equipment and remit" }),
  academicProgram({ slug: "must-mongolia-bci", name: "Mongolian University of Science and Technology BCI Research", category: "non-invasive", region: "asia", modality: "EEG signal processing and imagined-action BCI prototypes", targetFunction: "Exploratory brain-command classification for device control", deviceTypes: ["eeg"], evidenceLevel: "E1", hq: ["Ulaanbaatar", "Mongolia", 47.8864, 106.9057], website: "https://must.edu.mn/media/uploads/2023/05/30/emhtegel23-8.pdf", summary: "A MUST electronics research team published an institution-hosted EEG BCI prototype that classified imagined light-control commands; this record represents a documented project, not a mature dedicated lab.", referenceTitle: "MUST proceedings paper on an EEG BCI prototype" }),
  academicProgram({ slug: "stanford-nptl", name: "Stanford Neural Prosthetics Translational Laboratory", category: "invasive", region: "north-america", modality: "Intracortical neural recording and speech/motor decoding", targetFunction: "Restoring communication and motor control through neural prostheses", deviceTypes: ["intracortical", "neural-probe"], evidenceLevel: "E4", hq: ["Stanford, CA", "United States", 37.4275, -122.1697], website: "https://med.stanford.edu/neurosurgery/research/brain-machine-interface.html" }),
  academicProgram({ slug: "pitt-rnel", name: "University of Pittsburgh Rehab Neural Engineering Labs", category: "invasive", region: "north-america", modality: "Intracortical BCI, sensory feedback, and robotic-arm control", targetFunction: "Restoring upper-limb movement and sensation after paralysis", deviceTypes: ["intracortical", "neural-probe", "rehab-robotics"], evidenceLevel: "E4", hq: ["Pittsburgh, PA", "United States", 40.4406, -79.9959], website: "https://www.rnel.pitt.edu/" }),
  academicProgram({ slug: "utah-bionic-engineering", name: "University of Utah Bionic Engineering Lab", category: "invasive", region: "north-america", modality: "Peripheral nerve interfaces, Utah arrays, and sensory prosthetics", targetFunction: "Bidirectional prosthetic control and sensory restoration", deviceTypes: ["neural-probe", "peripheral-stimulation", "emg"], evidenceLevel: "E4", hq: ["Salt Lake City, UT", "United States", 40.7608, -111.891], website: "https://bionicengineeringlab.org/" }),
  academicProgram({ slug: "columbia-neurotechnology", name: "Columbia Neurotechnology Research", category: "non-invasive", region: "north-america", modality: "EEG, neural decoding, and biomedical signal processing", targetFunction: "Non-invasive BCI and neuroengineering education and research", deviceTypes: ["eeg"], evidenceLevel: "E2", hq: ["New York, NY", "United States", 40.8075, -73.9626], website: "https://neurotechcenter.columbia.edu/" }),
  academicProgram({ slug: "duke-neuroengineering", name: "Duke Center for Neuroengineering", category: "invasive", region: "north-america", modality: "Neural interfaces, systems neuroscience, and neuroprosthetics", targetFunction: "Understanding and restoring neural function through engineering", deviceTypes: ["intracortical", "neural-probe"], evidenceLevel: "E2", hq: ["Durham, NC", "United States", 35.994, -78.8986], website: "https://neuroengineering.duke.edu/" }),
  academicProgram({ slug: "johns-hopkins-neuroengineering", name: "Johns Hopkins Neuroengineering Research", category: "minimally-invasive", region: "north-america", modality: "Neural interfaces, neuroimaging, prosthetics, and stimulation", targetFunction: "Restoring and measuring neurological function", deviceTypes: ["ecog", "peripheral-stimulation", "rehab-robotics"], evidenceLevel: "E2", hq: ["Baltimore, MD", "United States", 39.3299, -76.6205], website: "https://www.bme.jhu.edu/research/neuroengineering/" }),
  academicProgram({ slug: "umich-direct-bci", name: "University of Michigan Direct Brain Interface Lab", category: "invasive", region: "north-america", modality: "Intracortical recording, neural decoding, and closed-loop stimulation", targetFunction: "Brain-controlled assistive technology and neural repair research", deviceTypes: ["intracortical", "neural-probe"], evidenceLevel: "E2", hq: ["Ann Arbor, MI", "United States", 42.2808, -83.743], website: "https://directbraininterface.engin.umich.edu/" }),
  academicProgram({ slug: "northwestern-neurotechnology", name: "Northwestern Neurotechnology Research", category: "minimally-invasive", region: "north-america", modality: "Neural engineering, neurostimulation, and rehabilitation technology", targetFunction: "Neural repair and assistive technology research", deviceTypes: ["peripheral-stimulation", "rehab-robotics"], evidenceLevel: "E2", hq: ["Evanston, IL", "United States", 42.0565, -87.6753], website: "https://www.mccormick.northwestern.edu/biomedical/research/neuroengineering.html" }),
  academicProgram({ slug: "uc-berkeley-neurotechnology", name: "UC Berkeley Neurotechnology Research", category: "non-invasive", region: "north-america", modality: "Neuroimaging, neural decoding, and computational neuroscience", targetFunction: "Understanding and decoding brain activity for neurotechnology", deviceTypes: ["fmri", "eeg"], evidenceLevel: "E2", hq: ["Berkeley, CA", "United States", 37.8715, -122.273], website: "https://neuroscience.berkeley.edu/" }),
  academicProgram({ slug: "ucla-neural-engineering", name: "UCLA Neural Engineering Research", category: "invasive", region: "north-america", modality: "Neural interfaces, neuroimaging, and neurosurgical technology", targetFunction: "Neural recording, stimulation, and neurological treatment research", deviceTypes: ["ecog", "neural-probe", "fmri"], evidenceLevel: "E2", hq: ["Los Angeles, CA", "United States", 34.0689, -118.4452], website: "https://www.neurosurgery.ucla.edu/research" }),
  academicProgram({ slug: "usc-neural-prosthetics", name: "USC Neural Prosthetics Research", category: "invasive", region: "north-america", modality: "Neural interfaces, bionics, and biomedical signal processing", targetFunction: "Restoring motor and sensory function through neuroprosthetics", deviceTypes: ["intracortical", "peripheral-stimulation", "rehab-robotics"], evidenceLevel: "E2", hq: ["Los Angeles, CA", "United States", 34.0224, -118.2851], website: "https://bme.usc.edu/research/neuroengineering/" }),
  academicProgram({ slug: "uw-neurotechnology", name: "University of Washington Neurotechnology Research", category: "non-invasive", region: "north-america", modality: "Neural engineering, brain imaging, and assistive human-computer interaction", targetFunction: "Neurotechnology and rehabilitation research", deviceTypes: ["eeg", "fmri", "rehab-robotics"], evidenceLevel: "E2", hq: ["Seattle, WA", "United States", 47.6553, -122.3035], website: "https://neurotech.uw.edu/" }),
  academicProgram({ slug: "umn-neuroengineering", name: "University of Minnesota Neuroengineering Research", category: "invasive", region: "north-america", modality: "Neural interfaces, stimulation, and neural signal processing", targetFunction: "Restoring communication and movement through neurotechnology", deviceTypes: ["ecog", "neural-probe", "eeg"], evidenceLevel: "E2", hq: ["Minneapolis, MN", "United States", 44.974, -93.2277], website: "https://cse.umn.edu/bme/research/neural-engineering" }),
  academicProgram({ slug: "georgia-tech-neural-interfaces", name: "Georgia Tech Neural Interfaces Research", category: "invasive", region: "north-america", modality: "Neural interfaces, neuroelectronics, and neuroprosthetics", targetFunction: "Translational neural engineering and assistive systems", deviceTypes: ["neural-probe", "peripheral-stimulation"], evidenceLevel: "E2", hq: ["Atlanta, GA", "United States", 33.7756, -84.3963], website: "https://neuro.gatech.edu/" }),
  academicProgram({ slug: "rice-neural-engineering", name: "Rice Neural Engineering Research", category: "minimally-invasive", region: "north-america", modality: "Neuroengineering, stimulation, and neural signal interfaces", targetFunction: "Neural repair, sensing, and assistive technology research", deviceTypes: ["neural-probe", "ultrasound"], evidenceLevel: "E2", hq: ["Houston, TX", "United States", 29.7174, -95.4018], website: "https://neuroengineering.rice.edu/" }),
  academicProgram({ slug: "ut-austin-neural-engineering", name: "UT Austin Neural Engineering Research", category: "non-invasive", region: "north-america", modality: "Neural decoding, neuroimaging, and computational neuroengineering", targetFunction: "Understanding and interfacing with brain networks", deviceTypes: ["fmri", "eeg"], evidenceLevel: "E2", hq: ["Austin, TX", "United States", 30.2849, -97.7341], website: "https://neural.eng.utexas.edu/" }),
  academicProgram({ slug: "case-western-neural-engineering", name: "Case Western Neural Engineering Research", category: "invasive", region: "north-america", modality: "Peripheral nerve interfaces, functional electrical stimulation, and prosthetics", targetFunction: "Restoring hand and arm function after neurological injury", deviceTypes: ["peripheral-stimulation", "emg", "rehab-robotics"], evidenceLevel: "E4", hq: ["Cleveland, OH", "United States", 41.5043, -81.6084], website: "https://engineering.case.edu/bme/research/neural-engineering" }),
  academicProgram({ slug: "upenn-neuroengineering", name: "University of Pennsylvania Neuroengineering Research", category: "invasive", region: "north-america", modality: "Neural interfaces, neuroimaging, and brain-network stimulation", targetFunction: "Clinical and basic research in neural repair and brain-machine interfaces", deviceTypes: ["ecog", "dbs", "fmri"], evidenceLevel: "E2", hq: ["Philadelphia, PA", "United States", 39.9522, -75.1932], website: "https://www.med.upenn.edu/ndcn/" }),
  academicProgram({ slug: "nyu-neural-science", name: "NYU Neural Science Research", category: "non-invasive", region: "north-america", modality: "Neural decoding, cognitive neuroscience, and computational modeling", targetFunction: "Foundational neuroscience for brain-computer interfaces", deviceTypes: ["fmri", "eeg"], evidenceLevel: "E1", hq: ["New York, NY", "United States", 40.7295, -73.9965], website: "https://neuroscience.nyu.edu/" }),
  academicProgram({ slug: "asu-neural-interface", name: "Arizona State University Neural Interface Research", category: "invasive", region: "north-america", modality: "Neural interfaces, biosensors, and neurorehabilitation engineering", targetFunction: "Neural sensing and restoration research", deviceTypes: ["neural-probe", "eeg"], evidenceLevel: "E2", hq: ["Tempe, AZ", "United States", 33.4242, -111.9281], website: "https://neuroscience.asu.edu/" }),
  academicProgram({ slug: "wustl-neurotechnology", name: "Washington University Neurotechnology Research", category: "non-invasive", region: "north-america", modality: "Neuroimaging, neural circuits, and computational neuroscience", targetFunction: "Brain-network measurement and neurotechnology research", deviceTypes: ["fmri", "meg"], evidenceLevel: "E2", hq: ["St. Louis, MO", "United States", 38.6488, -90.3108], website: "https://neuroscience.wustl.edu/" }),
  academicProgram({ slug: "cornell-neurotechnology", name: "Cornell Neurotechnology Research", category: "minimally-invasive", region: "north-america", modality: "Neural microsystems, neuroelectronics, and brain-signal analysis", targetFunction: "Next-generation neural interfaces and neurotechnology tools", deviceTypes: ["neural-probe", "eeg"], evidenceLevel: "E2", hq: ["Ithaca, NY", "United States", 42.4534, -76.4735], website: "https://neurotech.cornell.edu/" }),
  academicProgram({ slug: "princeton-neural-circuits", name: "Princeton Neural Circuits Research", category: "invasive", region: "north-america", modality: "Large-scale neural recording, imaging, and computational neuroscience", targetFunction: "Foundational neural-circuit understanding and interface-enabling methods", deviceTypes: ["neural-probe", "optical-imaging"], evidenceLevel: "E2", hq: ["Princeton, NJ", "United States", 40.3431, -74.6551], website: "https://pni.princeton.edu/" }),
  academicProgram({ slug: "vanderbilt-neural-engineering", name: "Vanderbilt Neural Engineering Research", category: "minimally-invasive", region: "north-america", modality: "Neural interfaces, neuroimaging, and neurorehabilitation", targetFunction: "Restoring and measuring neurological function", deviceTypes: ["eeg", "peripheral-stimulation", "rehab-robotics"], evidenceLevel: "E2", hq: ["Nashville, TN", "United States", 36.1447, -86.8027], website: "https://www.vanderbilt.edu/brain-institute/" }),

  academicProgram({ slug: "imperial-neural-interfaces", name: "Imperial College London Neural Interfaces Research", category: "minimally-invasive", region: "europe", modality: "Neural interfaces, neurotechnology, and biomedical engineering", targetFunction: "Translational neural sensing and stimulation research", deviceTypes: ["neural-probe", "eeg"], evidenceLevel: "E2", hq: ["London", "United Kingdom", 51.4988, -0.1749], website: "https://www.imperial.ac.uk/bioengineering/research/neurotechnology/" }),
  academicProgram({ slug: "ucl-neurotechnology", name: "UCL Neurotechnology Research", category: "non-invasive", region: "europe", modality: "Brain imaging, neural decoding, and clinical neuroscience", targetFunction: "Understanding and treating neurological disease with neurotechnology", deviceTypes: ["fmri", "meg", "eeg"], evidenceLevel: "E2", hq: ["London", "United Kingdom", 51.5246, -0.134], website: "https://www.ucl.ac.uk/neurology/research" }),
  academicProgram({ slug: "oxford-neural-engineering", name: "University of Oxford Neural Engineering Research", category: "non-invasive", region: "europe", modality: "Neuroimaging, neural circuits, and computational neuroscience", targetFunction: "Brain-network measurement and neurotechnology research", deviceTypes: ["fmri", "meg"], evidenceLevel: "E2", hq: ["Oxford", "United Kingdom", 51.7548, -1.2544], website: "https://www.ndcn.ox.ac.uk/" }),
  academicProgram({ slug: "cambridge-neural-interface", name: "University of Cambridge Neural Interface Research", category: "minimally-invasive", region: "europe", modality: "Neural interfaces, neuroelectronics, and neuroscience", targetFunction: "Neural recording and stimulation research", deviceTypes: ["neural-probe", "ecog"], evidenceLevel: "E2", hq: ["Cambridge", "United Kingdom", 52.2043, 0.1149], website: "https://www.neuroscience.cam.ac.uk/" }),
  academicProgram({ slug: "glasgow-bci", name: "University of Glasgow BCI Research", category: "non-invasive", region: "europe", modality: "EEG, rehabilitation technology, and human-computer interaction", targetFunction: "Non-invasive BCI and assistive technology research", deviceTypes: ["eeg", "rehab-robotics"], evidenceLevel: "E2", hq: ["Glasgow", "United Kingdom", 55.8721, -4.289], website: "https://www.gla.ac.uk/research/az/neuro/" }),
  academicProgram({ slug: "warwick-neurotechnology", name: "University of Warwick Neurotechnology Research", category: "non-invasive", region: "europe", modality: "Biomedical engineering, neural signals, and rehabilitation technology", targetFunction: "Neuroengineering and assistive-technology research", deviceTypes: ["eeg", "emg"], evidenceLevel: "E1", hq: ["Coventry", "United Kingdom", 52.3793, -1.5616], website: "https://warwick.ac.uk/fac/sci/eng/research/biomedical/" }),
  academicProgram({ slug: "tuebingen-bci", name: "University of Tuebingen BCI Research", category: "non-invasive", region: "europe", modality: "EEG BCI, neurofeedback, and clinical communication research", targetFunction: "Communication and self-regulation through non-invasive BCI", deviceTypes: ["eeg"], evidenceLevel: "E4", hq: ["Tuebingen", "Germany", 48.5216, 9.0576], website: "https://uni-tuebingen.de/en/research/" }),
  academicProgram({ slug: "freiburg-brainlinks", name: "University of Freiburg BrainLinks-BrainTools", category: "minimally-invasive", region: "europe", modality: "Neural interfaces, robotics, and brain-machine communication", targetFunction: "Bidirectional neurotechnology and assistive systems research", deviceTypes: ["neural-probe", "eeg", "rehab-robotics"], evidenceLevel: "E2", hq: ["Freiburg", "Germany", 47.999, 7.8421], website: "https://www.brainlinks-braintools.uni-freiburg.de/" }),
  academicProgram({ slug: "tu-delft-neural-engineering", name: "TU Delft Neural Engineering Research", category: "minimally-invasive", region: "europe", modality: "Neural interfaces, biomedical electronics, and neurorehabilitation", targetFunction: "Translational neurotechnology and assistive-device research", deviceTypes: ["neural-probe", "eeg"], evidenceLevel: "E2", hq: ["Delft", "Netherlands", 52.0116, 4.3571], website: "https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/biomedical-engineering" }),
  academicProgram({ slug: "ku-leuven-neuroelectronics", name: "KU Leuven Neuroelectronics Research", category: "minimally-invasive", region: "europe", modality: "Neuromodulation, neuroelectronics, and clinical neural engineering", targetFunction: "Precision stimulation and neural-interface research", deviceTypes: ["dbs", "neural-probe"], evidenceLevel: "E2", hq: ["Leuven", "Belgium", 50.8798, 4.7005], website: "https://gbiomed.kuleuven.be/english/research/50000743/research/research-units/neuromodulation" }),

  academicProgram({ slug: "university-tokyo-neurotech", name: "University of Tokyo Neurotechnology Research", category: "non-invasive", region: "asia", modality: "Neuroimaging, neural decoding, and computational neuroscience", targetFunction: "Brain measurement and neural-interface research", deviceTypes: ["fmri", "eeg"], evidenceLevel: "E2", hq: ["Tokyo", "Japan", 35.7127, 139.761], website: "https://www.u-tokyo.ac.jp/en/research/" }),
  academicProgram({ slug: "osaka-neuroprosthetics", name: "Osaka University Neuroprosthetics Research", category: "minimally-invasive", region: "asia", modality: "ECoG, neural decoding, and rehabilitation engineering", targetFunction: "Restoring communication and movement through neuroprosthetics", deviceTypes: ["ecog", "rehab-robotics"], evidenceLevel: "E2", hq: ["Suita", "Japan", 34.8226, 135.523], website: "https://www.osaka-u.ac.jp/en/research" }),
  academicProgram({ slug: "kyoto-neuroengineering", name: "Kyoto University Neuroengineering Research", category: "non-invasive", region: "asia", modality: "Neuroscience, brain imaging, and neural signal analysis", targetFunction: "Foundational neurotechnology and BCI research", deviceTypes: ["eeg", "fmri"], evidenceLevel: "E2", hq: ["Kyoto", "Japan", 35.0262, 135.7808], website: "https://www.kyoto-u.ac.jp/en/research" }),
  academicProgram({ slug: "keio-neural-interfaces", name: "Keio University Neural Interfaces Research", category: "minimally-invasive", region: "asia", modality: "Clinical neuroscience, ECoG, and neural decoding", targetFunction: "Translational neural-interface and neuroprosthetics research", deviceTypes: ["ecog", "eeg"], evidenceLevel: "E2", hq: ["Tokyo", "Japan", 35.6489, 139.7427], website: "https://www.keio.ac.jp/en/research/" }),
  academicProgram({ slug: "nus-neurotechnology", name: "National University of Singapore Neurotechnology Research", category: "non-invasive", region: "asia", modality: "Biomedical engineering, neural signals, and neuroimaging", targetFunction: "Neurotechnology and assistive-health research", deviceTypes: ["eeg", "fnirs"], evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.2966, 103.7764], website: "https://cde.nus.edu.sg/bme/" }),
  academicProgram({ slug: "ntu-neurotechnology", name: "Nanyang Technological University Neurotechnology Research", category: "non-invasive", region: "asia", modality: "Neuroengineering, neuroimaging, and rehabilitation technology", targetFunction: "Brain-health and assistive-technology research", deviceTypes: ["eeg", "fnirs", "rehab-robotics"], evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.3483, 103.6831], website: "https://www.ntu.edu.sg/medicine/research" }),
  academicProgram({ slug: "kaist-neural-interface", name: "KAIST Neural Interface Research", category: "invasive", region: "asia", modality: "Neural interfaces, semiconductor neuroelectronics, and neural decoding", targetFunction: "High-performance neural recording and neurotechnology research", deviceTypes: ["neural-probe", "intracortical"], evidenceLevel: "E2", hq: ["Daejeon", "South Korea", 36.372, 127.362], website: "https://bioeng.kaist.ac.kr/" }),
  academicProgram({ slug: "seoul-national-bci", name: "Seoul National University BCI Research", category: "non-invasive", region: "asia", modality: "EEG, neuroimaging, and neural signal processing", targetFunction: "Non-invasive BCI and clinical neurotechnology research", deviceTypes: ["eeg", "fmri"], evidenceLevel: "E2", hq: ["Seoul", "South Korea", 37.4599, 126.9519], website: "https://en.snu.ac.kr/research" }),
  academicProgram({ slug: "korea-university-neurotech", name: "Korea University Neurotechnology Research", category: "minimally-invasive", region: "asia", modality: "Biomedical engineering, neural interfaces, and neurorehabilitation", targetFunction: "Neural-interface and assistive-technology research", deviceTypes: ["eeg", "neural-probe"], evidenceLevel: "E2", hq: ["Seoul", "South Korea", 37.5894, 127.032], website: "https://bioeng.korea.ac.kr/" }),
  academicProgram({ slug: "national-taiwan-bci", name: "National Taiwan University BCI Research", category: "non-invasive", region: "asia", modality: "EEG, neural signal processing, and rehabilitation engineering", targetFunction: "Non-invasive BCI and assistive technology research", deviceTypes: ["eeg", "rehab-robotics"], evidenceLevel: "E2", hq: ["Taipei", "Taiwan", 25.0173, 121.5397], website: "https://www.ntu.edu.tw/english/research" }),
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
    targetFunction: "Thought-driven upper- and lower-limb movement after spinal cord injury",
    stage: "Investigational ARC-BCI with peer-reviewed brain-spine interface evidence and seven human implants reported",
    evidenceLevel: "E4",
    hq: { city: "Eindhoven", country: "Netherlands", lat: 51.4416, lng: 5.4697 },
    category: "minimally-invasive",
    region: "europe",
    founded: 2014,
    website: "https://onwd.com",
    summary:
      "ONWARD's ARC-BCI program builds on a Nature brain-spine interface demonstration and an ongoing study of cortical recording combined with implanted spinal cord stimulation. ONWARD reported seven ARC-BCI study participants by January 2026, including upper- and lower-limb restoration cases.",
    hypeCheck:
      "The highest-signal result is still a peer-reviewed one-participant brain-spine interface study, while later implant counts are company-announced feasibility progress. ARC-BCI remains investigational and is not cleared for broad commercial use.",
    sourceLinks: [
      source("Brain-controlled spinal cord stimulation trial", "trial-registry", clinicalTrials("NCT06243952"), "ClinicalTrials.gov"),
      source("ARC-BCI overview", "company-update", "https://www.onwd.com/brain-computer-interface/", "ONWARD Medical"),
      source("Seven ARC-BCI participants reported", "company-update", "https://ir.onwd.com/static-files/48e1c5b9-e843-4895-ac81-e0e936a841e2", "ONWARD Medical"),
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
    modality: "Semi-invasive cortical-surface array (Beinao-1), penetrating flexible microelectrodes (Beinao-2), and Beinao-1 paired with spinal stimulation",
    targetFunction: "Motor and communication decoding for paralysis, brain-controlled spinal stimulation, plus neuroscience research",
    stage: "Beinao-1 in multi-patient human trials, including a brain-controlled spinal-stimulation/exoskeleton case",
    evidenceLevel: "E3",
    hq: { city: "Beijing", country: "China", lat: 39.9142, lng: 116.4174 },
    founded: 2023,
    summary:
      "NeuCyber NeuroTech, backed by the Chinese Institute for Brain Research in Beijing, runs the Beinao program: the semi-invasive Beinao-1, the fully invasive flexible-electrode Beinao-2, and a brain-controlled spinal-stimulation/exoskeleton pathway for spinal cord injury.",
    hypeCheck:
      "CIBR and state-media statements describe implant counts, motor/speech reconstruction, and one Beinao-plus-spinal-stimulation walking case; detailed peer-reviewed human outcome data for the brain-spine use case is still limited.",
    sourceLinks: [
      source("CIBR Beinao No.1 achievement note", "company-update", "https://en.cibr.ac.cn/detail/cibrNewsnews/80c9eacb37164c5fadc21c696edf5cd7", "Chinese Institute for Brain Research, Beijing"),
      source("Beinao brain-spinal cord-exoskeleton report", "company-update", "https://www.globaltimes.cn/page/202605/1361687.shtml", "Global Times", false),
      source("Beinao-1 simultaneous BCI and spinal stimulation report", "company-update", "https://www.chinadailyhk.com/hk/article/635325", "Xinhua / China Daily Hong Kong", false),
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
    slug: "fudan-bsi",
    name: "Fudan ISTBI Brain-Spine Interface",
    kind: "academic",
    category: "invasive",
    region: "asia",
    modality: "Minimally invasive implanted brain-spine interface that decodes motor intention and drives spinal nerve-root stimulation",
    targetFunction: "Restoring voluntary leg movement, standing, and assisted stepping after spinal cord injury",
    stage: "Four human proof-of-concept surgeries reported across Zhongshan and Huashan Hospitals",
    evidenceLevel: "E2",
    hq: { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
    website: "https://istbi.fudan.edu.cn",
    summary:
      "Professor Jia Fumin's team at Fudan University's Institute of Science and Technology for Brain-Inspired Intelligence reported a triple-integrated brain-spine interface for spinal cord injury. Fudan says four proof-of-concept surgeries were completed by March 2025, with patients regaining leg movement or assisted stepping after surgery.",
    hypeCheck:
      "This is a university-announced proof-of-concept series, not a peer-reviewed clinical trial readout or approved therapy. Treat rapid post-op walking clips as early feasibility evidence until protocols, adverse events, and longer follow-up are published.",
    sourceLinks: [
      source("Fudan English BSI report", "company-update", "https://www.fudan.edu.cn/en/2025/0305/c344a144344/page.htm", "Fudan University"),
      source("Fudan Chinese BSI feature", "company-update", "https://news.fudan.edu.cn/2025/0304/c1268a144336/page.htm", "Fudan University"),
      source("Jia Fumin faculty profile", "company-update", "https://istbi.fudan.edu.cn/info/1774/4623.htm", "Fudan University"),
      source("Fudan BSI video report", "demo-video", "https://cn.chinadaily.com.cn/a/202503/07/WS67ca8cd9a310510f19eea453.html", "China Daily", false)
    ],
    isSample: false
  },
  {
    slug: "zju-nanhu-spinal-interface",
    name: "Zhejiang University / Nanhu Spinal Interface",
    kind: "academic",
    category: "minimally-invasive",
    region: "asia",
    modality: "Closed-loop spinal nerve interface with implanted spinal stimulation, wireless controller, EMG sensing, and adaptive feedback software",
    targetFunction: "Standing, walking, stair climbing, balance, and partial sensory/autonomic recovery after spinal cord injury",
    stage: "China-first closed-loop spinal nerve interface case with functional walking reported by Zhejiang University",
    evidenceLevel: "E2",
    hq: { city: "Hangzhou", country: "China", lat: 30.2741, lng: 120.1551 },
    website: "https://www.zju.edu.cn",
    summary:
      "The Second Affiliated Hospital of Zhejiang University School of Medicine, Nanhu Brain-Computer Interface Institute, Brain-Machine Intelligence Lab, and Zhejiang University biomedical-engineering collaborators reported China's first closed-loop spinal nerve interface implantation in a 61-year-old man with paraplegia.",
    hypeCheck:
      "This is a spinal-interface result led by BCI/neuroengineering teams, but public descriptions emphasize EMG and spinal feedback rather than direct cortical decoding. Track it as brain-spine-adjacent until cortical BCI control is explicitly demonstrated.",
    sourceLinks: [
      source("ZJU closed-loop spinal nerve interface report", "company-update", "https://www.zju.edu.cn/english/2025/0619/c19573a3063161/page.htm", "Zhejiang University"),
      source("ZJU/SAHZU walking video", "demo-video", "https://www.facebook.com/ZhejiangUniversityChina/videos/from-paralysis-to-walking-again-%EF%B8%8Fafter-a-devastating-spinal-injury-61-year-old-m/9811658218962668/", "Zhejiang University / Facebook", false),
      source("Global Times ZJU spinal interface report", "news-report", "https://www.globaltimes.cn/page/202505/1334573.shtml", "Global Times", false)
    ],
    isSample: false
  },
  {
    slug: "hainan-wukongbot-bsi",
    name: "Hainan University WukongBot BSI",
    kind: "academic",
    category: "non-invasive",
    region: "asia",
    modality: "Brain-Spine-Machine interface using non-invasive EEG intention decoding to control epidural electrical stimulation",
    targetFunction: "Preclinical proof-of-concept for mind-controlled lower-limb movement after spinal cord injury",
    stage: "Published macaque proof-of-concept and university-reported May 2025 anesthetized-macaque movement experiment",
    evidenceLevel: "E2",
    hq: { city: "Haikou", country: "China", lat: 20.0442, lng: 110.1999 },
    website: "https://en.hainanu.edu.cn",
    summary:
      "Hainan University's BCI integrated-circuit and neural-engineering team describes a Brain-Spine-Machine closed-loop system that directly collects brain motor signals, bypasses damaged spinal cords, and activates muscles. Its WukongBot paper reports human motion intentions driving left-right stepping-like lower-limb movements in an anesthetized macaque.",
    hypeCheck:
      "This is preclinical and partly cross-species: human intention signals controlled stimulation in an anesthetized monkey. It is not yet a human spinal-cord-injury therapy.",
    sourceLinks: [
      source("Hainan University BCI chip and Brain-Spine-Machine report", "company-update", "https://en.hainanu.edu.cn/info/1131/12891.htm", "Hainan University"),
      source("Liang Fengyan faculty profile and BSI publication list", "company-update", "https://bme.hainanu.edu.cn/info/1106/10921.htm", "Hainan University"),
      source("WukongBot BIO Integration paper", "paper", "https://bio-integration.org/10-15212-bioi-2025-0171/", "BIO Integration")
    ],
    isSample: false
  },
  {
    slug: "tianjin-haihe-bci",
    name: "Tianjin University / Haihe BCI Lab",
    kind: "academic",
    category: "non-invasive",
    region: "asia",
    modality: "Non-invasive EEG brain-computer interaction using hybrid SSVEP, P300, motor imagery, optical/electrical monitoring, and clinical neuroICU workflows",
    targetFunction: "High-speed typing, large-command-set control, neurointensive monitoring, diagnosis, modulation, and rehabilitation",
    stage: "Public 216-command high-speed BCI demo plus multi-center neuroICU clinical-trial program",
    evidenceLevel: "E2",
    hq: { city: "Tianjin", country: "China", lat: 39.3434, lng: 117.3616 },
    website: "https://en.tju.edu.cn",
    summary:
      "Tianjin University's Brain-Computer Interaction and Human-Machine Fusion Haihe Laboratory is one of China's clearest non-invasive BCI hubs. It reported a 216-key high-speed spelling system and launched a multi-center neuroICU BCI clinical-trial program with major Chinese hospitals.",
    hypeCheck:
      "The 216-key system is a public performance and the neuroICU work is announced as clinical translation, but published clinical endpoints and standardized registry records remain limited.",
    sourceLinks: [
      source("TJU 216-key non-invasive BCI report", "company-update", "https://en.tju.edu.cn/info/1010/7179.htm", "Tianjin University"),
      source("TJU neuroICU multi-center BCI trial launch", "company-update", "https://en.tju.edu.cn/info/1010/10336.htm", "Tianjin University"),
      source("TJU national BCI education alliance", "company-update", "https://en.tju.edu.cn/info/1010/13216.htm", "Tianjin University"),
      source("High-speed hybrid BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/36608342/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering")
    ],
    isSample: false
  },
  {
    slug: "nankai-interventional-bci",
    name: "Nankai Interventional BCI",
    kind: "academic",
    category: "minimally-invasive",
    region: "asia",
    modality: "Endovascular stent-electrode brain-computer interface placed through blood vessels near motor cortex",
    targetFunction: "Motor-function rehabilitation, robotic-arm control, and limb movement restoration without craniotomy",
    stage: "Animal, non-human-primate, and first human interventional BCI reports from Nankai University",
    evidenceLevel: "E2",
    hq: { city: "Tianjin", country: "China", lat: 39.0842, lng: 117.2009 },
    website: "https://en.nankai.edu.cn",
    summary:
      "Professor Duan Feng's Nankai University team develops an interventional/endovascular BCI designed to collect brain signals through vascular access. Nankai reports sheep experiments, non-human-primate robotic-arm control, sensor retrieval, and a human motor-restoration case using interventional BCI plus FES.",
    hypeCheck:
      "The public human result is institution-announced and not yet a peer-reviewed endpoint readout. Treat safety, retrieval, and functional claims as early clinical feasibility signals.",
    sourceLinks: [
      source("Nankai human interventional BCI restoration report", "company-update", "https://en.nankai.edu.cn/2025/0911/c23047a577316/page.htm", "Nankai University"),
      source("Nankai non-human-primate interventional BCI report", "company-update", "https://en.nankai.edu.cn/2023/0613/c22796a515048/page.htm", "Nankai University"),
      source("Nankai sheep interventional BCI report", "company-update", "https://en.nankai.edu.cn/2022/0801/c22796a465078/page.htm", "Nankai University"),
      source("Interventional BCI long-term EEG sheep paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/40257874/", "PubMed")
    ],
    isSample: false
  },
  {
    slug: "cas-cebsit-invasive-bci",
    name: "CAS CEBSIT / Huashan Invasive BCI",
    kind: "academic",
    category: "invasive",
    region: "asia",
    modality: "High-throughput wireless invasive BCI with cortical microelectrode recording",
    targetFunction: "Digital control, gaming, wheelchair control, robot-dog control, and future robotic-arm grasping for severe paralysis or limb loss",
    stage: "China first prospective invasive BCI clinical-trial program reported with multiple public cases",
    evidenceLevel: "E2",
    hq: { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
    website: "https://english.cebsit.cas.cn",
    summary:
      "The Chinese Academy of Sciences Center for Excellence in Brain Science and Intelligence Technology, with Huashan Hospital and collaborators, reported a wireless invasive BCI clinical-trial program in Shanghai. Public reports describe a first participant playing a racing game and later cases controlling a wheelchair and robotic dog.",
    hypeCheck:
      "Most results are official or media-reported demonstrations rather than peer-reviewed clinical outcomes. The system should be tracked as early invasive clinical translation, not an approved assistive BCI.",
    sourceLinks: [
      source("CAS invasive BCI clinical-trial report", "company-update", "https://english.cas.cn/newsroom/cas_media/202506/t20250616_1045625.shtml", "Chinese Academy of Sciences"),
      source("CAS/CEBSIT second-case report", "company-update", "https://english.cas.cn/newsroom/cas_media/202512/t20251219_1138007.shtml", "Chinese Academy of Sciences"),
      source("CEBSIT first invasive BCI trial media report", "news-report", "https://www.globaltimes.cn/page/202506/1336164.shtml", "Global Times", false),
      source("CEBSIT wheelchair and robot-dog report", "news-report", "https://www.globaltimes.cn/page/202512/1350829.shtml", "Global Times", false)
    ],
    isSample: false
  },
  {
    slug: "brainco",
    name: "BrainCo",
    kind: "company",
    category: "non-invasive",
    region: "asia",
    modality: "Wearable non-invasive EEG/neural-signal acquisition, AI decoding, and bionic prosthetic control",
    targetFunction: "Bionic hand/knee control, attention training, social communication training, sleep and stress products, and neuro-AI human-machine interaction",
    stage: "Commercial non-invasive BCI product portfolio with public bionic-prosthetic deployments",
    evidenceLevel: "E2",
    hq: { city: "Hangzhou", country: "China", lat: 30.2741, lng: 120.1551 },
    founded: 2015,
    website: "https://www.brainco.cn/en-US",
    summary:
      "BrainCo is a Hangzhou-based non-invasive BCI company with EEG-based products across bionic hands, training systems, sleep/stress devices, and neuro-AI interaction. Official product pages list the BrainCo Intelligent Bionic Hand and BCI modulation products; local reporting describes full production of smart bionic prosthetics.",
    hypeCheck:
      "BrainCo has real commercial neurotechnology products, but product pages mix assistive prosthetics, wellness, education, and health-management claims. Do not treat consumer/wellness BCI claims as clinical restoration evidence without controlled outcomes.",
    sourceLinks: [
      source("BrainCo BCI technology and products", "company-update", "https://www.brainco.cn/en-US/technology", "BrainCo"),
      source("BrainCo about page", "company-update", "https://www.brainco.cn/en-US/about", "BrainCo"),
      source("BrainCo bionic prosthetics production report", "news-report", "https://www.ehangzhou.gov.cn/2025-02/26/c_292773.htm", "Hangzhou Municipal Government", false),
      source("BrainCo accessibility update", "company-update", "https://www.brainco.cn/en-US/news/ss68tshjwmoocsayo5elb7nl", "BrainCo")
    ],
    isSample: false
  },
  {
    slug: "shanghaitech-bci-center",
    name: "ShanghaiTech BCI Research Center",
    kind: "academic",
    category: "invasive",
    region: "asia",
    modality: "Interdisciplinary BCI center spanning neural mechanisms, ultra-flexible neural interfaces, implantable systems, intelligent BCI software, and clinical translation",
    targetFunction: "Clinical BCI translation, invasive Chinese-language BCI, bidirectional BCI interaction, and AI-enabled neurotechnology",
    stage: "Research center launched in 2026 with BCI clinical-translation agenda",
    evidenceLevel: "E1",
    hq: { city: "Shanghai", country: "China", lat: 31.1796, lng: 121.5904 },
    website: "https://www.shanghaitech.edu.cn",
    summary:
      "ShanghaiTech University launched its Research Center for Brain-Computer Interface in May 2026, with stated focus areas in neural interfaces, implantable systems, intelligent BCI systems, invasive Chinese-language BCI, large AI models, and clinical translational applications.",
    hypeCheck:
      "This is an institutional capacity and research-direction signal, not a demonstrated product or clinical endpoint. Track it as a watchable center until project-specific results are published.",
    sourceLinks: [
      source("ShanghaiTech BCI Research Center launch", "company-update", "https://www.shanghaitech.edu.cn/en/2026/0519/c1260a1122115/page.htm", "ShanghaiTech University")
    ],
    isSample: false
  },
  {
    slug: "scut-pazhou-multimodal-bci",
    name: "SCUT / Pazhou Multimodal BCI",
    kind: "academic",
    category: "non-invasive",
    region: "asia",
    modality: "Wearable multimodal non-invasive BCI using EEG, hybrid paradigms, fMRI/brain-signal analysis, and adaptive decoding",
    targetFunction: "Wheelchair control, BCI mouse/web browsing, disorders-of-consciousness assessment, rehabilitation support, and wearable neurohealth products",
    stage: "Long-running academic BCI program with peer-reviewed wheelchair/control papers and product-transfer reporting",
    evidenceLevel: "E4",
    hq: { city: "Guangzhou", country: "China", lat: 23.1291, lng: 113.2644 },
    website: "https://www.scut.edu.cn",
    summary:
      "Yuanqing Li's South China University of Technology and Pazhou Lab line has published hybrid BCI wheelchair, BCI mouse, awareness-detection, and multimodal non-invasive BCI work. Guangzhou reporting says the team won a 2024 Guangdong technology invention award and that translated wearable BCI products are entering hospitals, homes, and sports settings.",
    hypeCheck:
      "The strongest evidence is academic prototypes and publications; local deployment and product-transfer reporting should not be read as broad clinical efficacy without trial endpoints.",
    sourceLinks: [
      source("SCUT main BCI program summary", "company-update", "https://www2.scut.edu.cn/autonlab/4514/list.htm", "South China University of Technology"),
      source("Yuanqing Li SCUT profile", "company-update", "https://www2.scut.edu.cn/auto_en/2015/0716/c6242a94208/page.htm", "South China University of Technology"),
      source("Pazhou Lab Yuanqing Li profile", "company-update", "https://www.pazhoulab.com/2025/11/7252/", "Pazhou Lab"),
      source("Guangzhou BCI product-transfer report", "news-report", "https://kjj.gz.gov.cn/xwlb/yw/content/post_10662998.html", "Guangzhou Science and Technology Bureau", false),
      source("Hybrid BCI wheelchair paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22692936/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering")
    ],
    isSample: false
  },
  {
    slug: "shanghai-yansi-speech-bci",
    name: "Shanghai Yansi / Huashan Speech BCI",
    kind: "academic",
    category: "minimally-invasive",
    region: "asia",
    modality: "High-density flexible ECoG and AI language decoding for Mandarin Chinese speech BCI",
    targetFunction: "Chinese speech decoding and future communication restoration for ALS, stroke, and anarthria",
    stage: "Peer-reviewed real-time Mandarin decoding result and clinical-trial-phase reporting",
    evidenceLevel: "E4",
    hq: { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
    summary:
      "The Shanghai Yansi Institute of Brain-like Artificial Intelligence and Huashan Hospital collaboration reported Mandarin Chinese speech decoding from implanted high-density cortical signals, including a Science Advances paper on full-spectrum Chinese decoding.",
    hypeCheck:
      "The result is important for tonal-language speech BCI, but the public clinical work still uses small, specialized participant contexts and is not an approved communication aid.",
    sourceLinks: [
      source("Shanghai speech BCI government report", "company-update", "https://english.shanghai.gov.cn/en-InnovationPolicies/20250722/c4b71a2bb59b404e8a25660a8531b013.html", "Shanghai Municipal Government"),
      source("Shanghai Chinese-speech BCI science report", "company-update", "https://stcsm.sh.gov.cn/news/20250108/8a4556cc3536464e8a3f81b122443a3e.html", "Shanghai Science and Technology Commission"),
      source("Real-time decoding of full-spectrum Chinese paper", "paper", "https://www.science.org/doi/10.1126/sciadv.adz9968", "Science Advances"),
      source("PubMed record for Mandarin speech BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/41191764/", "PubMed")
    ],
    isSample: false
  },
  {
    slug: "clinatec-wimagine",
    name: "Clinatec / CEA WIMAGINE",
    kind: "academic",
    category: "minimally-invasive",
    region: "europe",
    modality: "Bilateral epidural ECoG implants (WIMAGINE) reading cortical-surface signals for exoskeleton and spinal-stimulation control",
    targetFunction: "Whole-body exoskeleton control, brain-spine interface control, and future neurorehabilitation feedback",
    stage: "Peer-reviewed exoskeleton proof-of-concept plus WIMAGINE contribution to the 2023 Nature brain-spine interface",
    evidenceLevel: "E4",
    hq: { city: "Grenoble", country: "France", lat: 45.1885, lng: 5.7245 },
    summary:
      "Clinatec, a CEA laboratory in Grenoble, developed the WIMAGINE epidural ECoG implant. In 2019 a tetraplegic patient used two implants to control a four-limb exoskeleton, and in 2023 WIMAGINE was part of the Nature brain-spine interface that restored thought-driven walking in one participant. CEA has since licensed WIMAGINE to ONWARD Medical.",
    hypeCheck:
      "The landmark result is a single-patient proof-of-concept requiring months of training; epidural ECoG trades signal detail for safety, and the exoskeleton is a research platform, not a home device.",
    sourceLinks: [
      source("Exoskeleton controlled by epidural BCI", "paper", "https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(19)30321-7/abstract", "The Lancet Neurology"),
      source("CEA WIMAGINE brain-spine and exoskeleton summary", "company-update", "https://www.cea.fr/presse/Pages/actualites-communiques/sante-sciences-du-vivant/innovation-wimagine-espoir-personnes-handicapees-recompense-ces-2024.aspx", "CEA"),
      source("CEA-Leti WIMAGINE rehabilitation update", "company-update", "https://www.cea.fr/cea-tech/leti/english/Pages/What%27s-On/News/AVC-Brain-Computer-Interface.aspx", "CEA-Leti"),
      source("Groundbreaking neuroprosthetic (UGA)", "company-update", "https://international.univ-grenoble-alpes.fr/about/flagship-projects/a-groundbreaking-neuroprosthetic-enables-a-tetraplegic-patient-fitted-with-an-exoskeleton-to-move-808028.kjsp", "Universite Grenoble Alpes"),
      source("Exoskeleton controlled by BCI video", "demo-video", "https://www.youtube.com/watch?v=1GyJBBB8O_M", "YouTube", false),
      source("ONWARD licenses WIMAGINE from CEA", "company-update", "https://www.globenewswire.com/news-release/2024/10/15/2962898/0/en/ONWARD-Medical-Signs-Agreement-with-CEA-for-Exclusive-Rights-to-Clinatec-s-WIMAGINE-Brain-Computer-Interface-BCI-Technology.html", "GlobeNewswire / ONWARD")
    ],
    isSample: false
  },
  {
    slug: "neurorestore-epfl-bsi",
    name: "NeuroRestore / EPFL-CHUV-UNIL",
    kind: "academic",
    category: "invasive",
    region: "europe",
    modality: "Wireless digital bridge linking cortical ECoG decoding to epidural spinal cord stimulation",
    targetFunction: "Thought-controlled standing, walking, stair climbing, and future arm/hand restoration after paralysis",
    stage: "Peer-reviewed one-participant human brain-spine interface result plus earlier primate BSI evidence",
    evidenceLevel: "E4",
    hq: { city: "Lausanne", country: "Switzerland", lat: 46.5197, lng: 6.6323 },
    website: "https://www.neurorestore.swiss",
    summary:
      "NeuroRestore, the EPFL/CHUV/UNIL center led by Grégoire Courtine and Jocelyne Bloch, reported a wireless brain-spine interface that restored voluntary walking control in one person with chronic tetraplegia, building on earlier primate brain-spine interface work.",
    hypeCheck:
      "The human digital-bridge result is landmark peer-reviewed evidence, but it remains one participant with specialized implants and intensive rehabilitation. It is not yet a scalable therapy available to routine patients.",
    sourceLinks: [
      source("EPFL thought-controlled walking report", "company-update", "https://actu.epfl.ch/news/thought-controlled-walking-again-after-spinal-co-3/", "EPFL"),
      source("NeuroRestore BSI press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore"),
      source("Brain-spine interface Nature paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("NeuroRestore official BSI video", "demo-video", "https://vimeo.com/829445531", "NeuroRestore / Vimeo"),
      source("EPFL primate BSI report", "company-update", "https://actu.epfl.ch/news/primates-regain-control-of-paralyzed-limb/", "EPFL")
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
    stage: "FDA-cleared NeuroPort electrode; MoveAgain BCI holds FDA Breakthrough Device Designation; Utah arrays used across long-duration human BCI research",
    evidenceLevel: "E5",
    hq: { city: "Salt Lake City, UT", country: "United States", lat: 40.7608, lng: -111.891 },
    founded: 2008,
    website: "https://blackrockneurotech.com",
    funding: "$200M from Tether (2024)",
    summary:
      "Salt Lake City-based Blackrock Neurotech makes the Utah/NeuroPort array — the microelectrode implant behind much of the last two decades of human BCI research — and is developing the MoveAgain assistive BCI plus the 10,000+ channel Neuralace array.",
    hypeCheck:
      "The NeuroPort electrode has FDA 510(k) clearance and the Utah array underpins many peer-reviewed human results, but MoveAgain as an integrated commercial assistive BCI remains investigational, and Neuralace is still early.",
    sourceLinks: [
      source("NeuroPort Electrode 96 product page", "company-update", "https://blackrockneurotech.com/products/neuroport-electrode/", "Blackrock Neurotech"),
      source("FDA 510(k) K110010 NeuroPort entry", "regulatory-page", "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K110010", "U.S. FDA"),
      source("MoveAgain gets FDA Breakthrough Device Designation", "regulatory-page", "https://www.prnewswire.com/news-releases/blackrock-neurotechs-moveagain-brain-computer-interface-system-receives-breakthrough-device-designation-from-the-fda-301425013.html", "PR Newswire / Blackrock"),
      source("Blackrock reveals Neuralace 10,000+ channel BCI", "company-update", "https://www.prnewswire.com/news-releases/blackrock-neurotech-reveals-neuralace-10-000-channel-next-gen-bci-301679826.html", "PR Newswire / Blackrock"),
      source("NEJM NeuroPort speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Utah array longevity and reliability paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/34847547/", "PubMed / Journal of Neural Engineering"),
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
    slug: "forest-neurotech",
    name: "Forest Neurotech",
    kind: "company",
    category: "minimally-invasive",
    region: "north-america",
    modality: "Ultrasound-based whole-brain interface for imaging and neuromodulation",
    targetFunction: "Whole-brain read/write research, neural-circuit mapping, and future therapeutic brain-interface applications",
    stage: "Nonprofit focused research organization developing Forest 1; early safety work reported, no approved product",
    evidenceLevel: "E1",
    hq: { city: "Los Angeles, CA", country: "United States", lat: 34.0522, lng: -118.2437 },
    founded: 2023,
    website: "https://forestneurotech.org",
    funding: "$14M non-dilutive commitment (2024)",
    summary:
      "Forest Neurotech is a nonprofit focused research organization developing ultrasound-based brain-computer interfaces. Its Forest 1 whole-brain computer interface is described as a wearable ultrasonic neural interface for imaging and neuromodulation where direct brain access is available.",
    hypeCheck:
      "Forest is one of the clearest ultrasound-BCI efforts, but its public evidence is still mostly platform description, funding, and early safety-trial reporting rather than demonstrated clinical restoration of communication or movement.",
    sourceLinks: [
      source("Forest Neurotech overview", "company-update", "https://forestneurotech.org/", "Forest Neurotech"),
      source("Forest 1 whole-brain interface", "company-update", "https://forestneurotech.org/forest-1", "Forest Neurotech"),
      source("Forest team intro", "company-update", "https://forestneurotech.org/team-intro", "Forest Neurotech"),
      source("Forest funding announcement", "company-update", "https://www.businesswire.com/news/home/20240311581698/en/Convergent-Research-Announces-Major-New-Funding-Commitment-to-Forest-Neurotech", "Business Wire / Convergent Research"),
      source("Forest early safety trial reporting", "news-report", "https://www.theguardian.com/science/2025/jan/20/brain-implant-boost-mood-ultrasound-nhs-trial", "The Guardian", false)
    ],
    isSample: false
  },
  {
    slug: "openwater-lifu",
    name: "Openwater Open-LIFU",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Open-source light and focused-ultrasound medical-device platform",
    targetFunction: "Programmable ultrasound neuromodulation, optical/hemodynamic measurement, disease treatment research, and long-term BCI-adjacent sensing goals",
    stage: "Open-source platform in clinical research; current public products are medical research tools, not approved BCIs",
    evidenceLevel: "E1",
    hq: { city: "San Francisco, CA", country: "United States", lat: 37.7749, lng: -122.4194 },
    founded: 2016,
    website: "https://www.openwater.health",
    summary:
      "Openwater is building open-source, lower-cost medical devices that combine light and sound. Its technology page frames Open-LIFU for treatment, Open-Motion for measurement, and closed-loop adjustment as a modular platform.",
    hypeCheck:
      "Openwater has long discussed BCI ambitions, but the current public evidence is stronger for open medical-device infrastructure and clinical trials than for a demonstrated thought-to-text or assistive BCI.",
    sourceLinks: [
      source("Openwater home page", "company-update", "https://www.openwater.health/", "Openwater"),
      source("Openwater technology page", "company-update", "https://www.openwater.health/technology", "Openwater"),
      source("Openwater contact page", "company-update", "https://www.openwater.health/contact", "Openwater"),
      source("Openwater founder resume", "company-update", "https://www.maryloujepsen.com/resume", "Mary Lou Jepsen", false),
      source("Focused Ultrasound Foundation profile", "company-update", "https://www.fusfoundation.org/posts/company-profile-openwater/", "Focused Ultrasound Foundation", false)
    ],
    isSample: false
  },
  {
    slug: "attune-neurosciences",
    name: "Attune Neurosciences",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Wearable low-intensity focused-ultrasound neuromodulation with EEG and motion sensing",
    targetFunction: "Deep-brain neuromodulation for chronic pain, depression, sleep, addiction, and future closed-loop human-performance research",
    stage: "Clinical-stage investigational wearable focused-ultrasound platform",
    evidenceLevel: "E1",
    hq: { city: "San Francisco, CA", country: "United States", lat: 37.7849, lng: -122.4094 },
    founded: 2019,
    website: "https://www.attuneneuro.com",
    summary:
      "Attune Neurosciences develops a wearable low-intensity focused-ultrasound platform for non-invasive deep-brain neuromodulation, with research profiles describing EEG and motion sensing on the investigational head-worn device.",
    hypeCheck:
      "Attune is a neuromodulation platform, not yet a demonstrated assistive BCI. Closed-loop or human-performance BCI interpretations should stay prospective until published studies show that loop in humans.",
    sourceLinks: [
      source("Attune home page", "company-update", "https://attuneneuro.com/", "Attune Neurosciences"),
      source("Attune research page", "company-update", "https://www.attuneneuro.com/research", "Attune Neurosciences"),
      source("Attune MTEC profile", "company-update", "https://mtec-sc.org/life-sciences/attune-neurosciences", "MTEC", false),
      source("Attune wearable feasibility paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11640868/", "PubMed Central")
    ],
    isSample: false
  },
  {
    slug: "neurofus-sonic-concepts",
    name: "NeuroFUS / Sonic Concepts",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Turnkey low-intensity transcranial focused-ultrasound neuromodulation research system",
    targetFunction: "Human and animal TUS/tFUS neuromodulation research, protocol development, and BCI-enabling stimulation studies",
    stage: "Commercial research hardware for neuroscience and medical-device R&D",
    evidenceLevel: "E2",
    hq: { city: "Bothell, WA", country: "United States", lat: 47.7601, lng: -122.2054 },
    website: "https://neurofus.com",
    summary:
      "NeuroFUS, powered by Sonic Concepts, provides laboratory-ready low-intensity focused-ultrasound systems for transcranial brain and peripheral nerve modulation research.",
    hypeCheck:
      "NeuroFUS is enabling hardware. Its presence in the stack does not prove any specific therapeutic, cognitive, or assistive BCI outcome without a separate study.",
    sourceLinks: [
      source("NeuroFUS home page", "company-update", "https://neurofus.com/", "NeuroFUS"),
      source("NeuroFUS neuromodulation overview", "company-update", "https://neurofus.com/fus-neuromodulation/", "NeuroFUS"),
      source("NeuroFUS about/collaborators", "company-update", "https://neurofus.com/about/", "NeuroFUS"),
      source("Sonic Concepts contact page", "company-update", "https://sonicconcepts.com/contact-us/", "Sonic Concepts")
    ],
    isSample: false
  },
  {
    slug: "navifus",
    name: "NaviFUS",
    kind: "company",
    category: "non-invasive",
    region: "asia",
    modality: "Neuronavigation-guided transcranial focused-ultrasound system for BBB opening and neuromodulation",
    targetFunction: "Brain-drug delivery, epilepsy neuromodulation, CNS disease trials, and focused-ultrasound platform research",
    stage: "Human clinical trials and pilot neuromodulation publications; no approved BCI indication",
    evidenceLevel: "E4",
    hq: { city: "Taipei", country: "Taiwan", lat: 25.033, lng: 121.5654 },
    website: "https://navifus.com",
    summary:
      "NaviFUS builds a neuronavigation-guided focused-ultrasound system for non-invasive CNS therapy, including blood-brain-barrier opening and low-intensity neuromodulation studies.",
    hypeCheck:
      "NaviFUS has human neuromodulation evidence in epilepsy and active clinical studies, but it is not a communication or control BCI product.",
    sourceLinks: [
      source("NaviFUS home page", "company-update", "https://navifus.com/", "NaviFUS"),
      source("NaviFUS system page", "company-update", "https://navifus.com/navifus-system/", "NaviFUS"),
      source("NaviFUS epilepsy pilot article", "company-update", "https://navifus.com/2021/11/24/epilepsy-trial-for-fus-neuromodulation/", "NaviFUS"),
      source("NaviFUS epilepsy trial record", "trial-registry", clinicalTrials("NCT05947656"), "ClinicalTrials.gov"),
      source("Neuronavigation-guided focused ultrasound paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7327352/", "PubMed Central")
    ],
    isSample: false
  },
  {
    slug: "caltech-fus-bmi",
    name: "Caltech fUS BMI",
    kind: "academic",
    category: "minimally-invasive",
    region: "north-america",
    modality: "Functional ultrasound imaging brain-machine interface through a cranial acoustic window",
    targetFunction: "Motor-intention decoding and closed-loop cursor/control research using ultrasonic hemodynamic readout",
    stage: "Peer-reviewed closed-loop non-human-primate fUS-BMI; human fUS through cranial windows remains proof-of-principle",
    evidenceLevel: "E2",
    hq: { city: "Pasadena, CA", country: "United States", lat: 34.1478, lng: -118.1445 },
    website: "https://www.caltech.edu",
    summary:
      "Caltech teams led by the Shapiro, Andersen, and Christopoulos research groups demonstrated functional-ultrasound BMI work, including online closed-loop decoding of motor plans in non-human primates.",
    hypeCheck:
      "The strongest closed-loop results are non-human primate studies and rely on ultrasound access conditions that are not yet a consumer-grade non-invasive headset.",
    sourceLinks: [
      source("Caltech ultrasound BMI news", "company-update", "https://www.caltech.edu/about/news/ultrasound-enables-less-invasive-brainmachine-interfaces", "Caltech"),
      source("Caltech reading minds with ultrasound", "company-update", "https://www.caltech.edu/about/news/reading-minds-with-ultrasound-a-less-invasive-technique-to-decode-the-brains-intentions", "Caltech"),
      source("Closed-loop ultrasonic BMI paper", "paper", "https://www.nature.com/articles/s41593-023-01500-7", "Nature Neuroscience"),
      source("Shapiro Lab ultrasonic BMI note", "company-update", "https://shapirolab.caltech.edu/?p=1288", "Caltech Shapiro Lab")
    ],
    isSample: false
  },
  {
    slug: "cmu-tfus-bci",
    name: "Carnegie Mellon tFUS BCI",
    kind: "academic",
    category: "non-invasive",
    region: "north-america",
    modality: "EEG BCI paired with transcranial focused-ultrasound neuromodulation",
    targetFunction: "Bidirectional non-invasive BCI, visual-motion BCI speller performance enhancement, and ultrasonic feedback/stimulation research",
    stage: "Peer-reviewed 25-participant human study showing improved BCI speller performance with tFUS",
    evidenceLevel: "E4",
    hq: { city: "Pittsburgh, PA", country: "United States", lat: 40.4406, lng: -79.9959 },
    website: "https://www.cmu.edu",
    summary:
      "Carnegie Mellon's Bin He lab demonstrated a non-invasive BCI study where transcranial focused ultrasound to visual area V5 improved human visual-motion BCI speller performance.",
    hypeCheck:
      "This is a strong human BCI paper, but it improves an EEG speller task in a controlled study; it is not a released assistive communication system.",
    sourceLinks: [
      source("CMU bidirectional BCI release", "company-update", "https://engineering.cmu.edu/news-events/news/2024/06/11-enhancing-bci.html", "Carnegie Mellon University"),
      source("CMU He Lab", "company-update", "https://www.cmu.edu/bme/helab/", "Carnegie Mellon University"),
      source("Nature Communications tFUS BCI paper", "paper", "https://www.nature.com/articles/s41467-024-48576-8", "Nature Communications"),
      source("NCCIH research summary", "company-update", "https://www.nccih.nih.gov/research/research-results/transcranial-focused-ultrasound-improves-the-performance-of-a-noninvasive-brain-computer-interface", "NCCIH", false)
    ],
    isSample: false
  },
  {
    slug: "wvu-rni-lifu",
    name: "WVU Rockefeller Neuroscience Institute LIFU",
    kind: "academic",
    category: "non-invasive",
    region: "north-america",
    modality: "Low-intensity focused-ultrasound neuromodulation for deep brain targets",
    targetFunction: "Addiction/craving neuromodulation, brain health trials, and biomarker-driven focused-ultrasound research",
    stage: "Human clinical neuromodulation studies; not a direct BCI product",
    evidenceLevel: "E4",
    hq: { city: "Morgantown, WV", country: "United States", lat: 39.6295, lng: -79.9559 },
    website: "https://wvumedicine.org/our-care/institutes/rni/",
    summary:
      "WVU Rockefeller Neuroscience Institute runs human low-intensity focused-ultrasound neuromodulation research, including addiction/craving studies targeting the nucleus accumbens.",
    hypeCheck:
      "This is clinically important focused-ultrasound neuromodulation, but it is not a BCI for computer control or communication. Track it as adjacent interface evidence.",
    sourceLinks: [
      source("WVU RNI research overview", "company-update", "https://wvumedicine.org/our-care/institutes/rni/our-research/", "WVU Medicine"),
      source("WVU focused-ultrasound state funding", "company-update", "https://wvutoday.wvu.edu/stories/2024/10/28/wvu-rockefeller-neuroscience-institute-receives-state-funding-to-expand-research-and-treatment-for-food-addiction-and-post-traumatic-stress-disorder", "WVU Today"),
      source("LIFU neuromodulation trial record", "trial-registry", clinicalTrials("NCT05997030"), "ClinicalTrials.gov"),
      source("Opioid-use focused ultrasound paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/39798597/", "PubMed")
    ],
    isSample: false
  },
  {
    slug: "sononeu-sonogenetics",
    name: "SonoNeu",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Sonogenetics platform pairing engineered ultrasound-sensitive proteins with focused ultrasound delivery",
    targetFunction: "Programmable cellular control, drug-free neuromodulation, and longer-term ultrasound interface biology for peripheral and central nervous system disorders",
    stage: "Stealth exit with ARPA-H-supported preclinical sonogenetics translation program",
    evidenceLevel: "E1",
    hq: { city: "Palo Alto, CA", country: "United States", lat: 37.4419, lng: -122.143 },
    website: "https://www.sononeu.com",
    funding: "Part of up to $41.3M ARPA-H sonogenetics program (2026)",
    summary:
      "SonoNeu is a Salk Institute spinout co-founded with General Inception to translate sonogenetics: using focused ultrasound to control engineered ultrasound-responsive cells with spatial and temporal precision.",
    hypeCheck:
      "SonoNeu is not a computer-control BCI today. It belongs in the ultrasound interface queue because sonogenetics could become a precise biological write-interface, but public work is preclinical translation.",
    sourceLinks: [
      source("SonoNeu home page", "company-update", "https://www.sononeu.com/", "SonoNeu"),
      source("ARPA-H sonogenetics award", "regulatory-page", "https://arpa-h.gov/explore-funding/awards/3941", "ARPA-H"),
      source("Salk ARPA-H sonogenetics announcement", "company-update", "https://www.salk.edu/news-release/salk-institute-to-lead-arpa-h-project-with-up-to-41-3m-to-advance-sonogenetics-as-a-noninvasive-therapeutic/", "Salk Institute"),
      source("SonoNeu stealth-exit release", "company-update", "https://www.globenewswire.com/news-release/2026/04/07/3268843/0/en/sononeu-exits-stealth-as-key-part-of-us-government-funded-research-program-worth-up-to-41-3m-to-advance-sonogenetics-into-clinic.html", "GlobeNewswire / SonoNeu")
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
    slug: "gtec-unicorn",
    name: "g.tec / Unicorn Hybrid Black",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "EEG-based BCI platforms, biosignal amplifiers, wearable EEG headsets, and clinical/research BCI software",
    targetFunction: "BCI prototyping, neurofeedback, motor-imagery/P300/SSVEP research, neurorehabilitation, and assistive communication research",
    stage: "Commercial research and clinical BCI platform ecosystem with published validation and application literature",
    evidenceLevel: "E4",
    hq: { city: "Schiedlberg", country: "Austria", lat: 48.0565, lng: 14.2894 },
    website: "https://www.gtec.at",
    summary:
      "g.tec develops integrated BCI platforms spanning EEG acquisition hardware, real-time signal processing, application frameworks, hackathon/developer tooling, and clinical/research systems such as Unicorn Hybrid Black, recoveriX, mindBEAGLE, and intendiX.",
    hypeCheck:
      "g.tec is a serious BCI infrastructure company, but most public EEG demonstrations are research, rehabilitation, or developer workflows rather than proof of a universal consumer mind-control interface.",
    sourceLinks: [
      source("g.tec BCI platform overview", "company-update", "https://www.gtec.at/", "g.tec"),
      source("Unicorn Hybrid Black BCI platform", "company-update", "https://www.gtec.at/product/unicorn-hybrid-black-bci-platform/", "g.tec"),
      source("g.tec headquarters listing", "company-update", "https://www.advantageaustria.org/ae/company/en/g-tec-medical-engineering-gmbh", "Advantage Austria", false)
    ],
    isSample: false
  },
  {
    slug: "openbci-galea",
    name: "OpenBCI / Galea",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Open-source EEG, EMG, ECG, EOG, and multimodal biosensing hardware including Galea for XR research",
    targetFunction: "Developer BCI tools, neurofeedback, biosensing research, XR interaction, accessibility prototyping, and open-source neurotechnology",
    stage: "Commercial developer/research platform with open-source hardware and Galea mixed-reality biosensing headset",
    evidenceLevel: "E2",
    hq: { city: "Brooklyn, NY", country: "United States", lat: 40.7306, lng: -73.9352 },
    website: "https://openbci.com",
    summary:
      "OpenBCI makes open-source tools for biosensing and neuroscience, from boards and headsets to Galea, a multimodal headset intended to combine biosensing with spatial-computing workflows.",
    hypeCheck:
      "OpenBCI is infrastructure for researchers, artists, developers, and accessibility demos; it should not be counted as clinical evidence for a finished medical BCI product.",
    sourceLinks: [
      source("OpenBCI home page", "company-update", "https://openbci.com/", "OpenBCI"),
      source("Galea biosensing headset", "company-update", "https://galea.co/", "OpenBCI / Galea"),
      source("OpenBCI privacy and registered office", "company-update", "https://docs.openbci.com/FAQ/Privacy/", "OpenBCI Docs")
    ],
    isSample: false
  },
  {
    slug: "cognixion-one",
    name: "Cognixion ONE",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Non-invasive EEG integrated with augmented reality, AI, and steady-state visual evoked potential classification",
    targetFunction: "Assistive communication and control for people with complex disabilities, plus researcher-facing Axon-R workflows",
    stage: "FDA Breakthrough Device Designation for Cognixion ONE Axon; Axon-R listed for research use only",
    evidenceLevel: "E1",
    hq: { city: "Santa Barbara, CA", country: "United States", lat: 34.4208, lng: -119.6982 },
    website: "https://www.cognixion.com",
    summary:
      "Cognixion builds non-invasive EEG/AR communication technology aimed at assistive communication for people with severe motor or speech impairments. Its Axon-R research platform combines AR, EEG, AI, and SSVEP classification in a headset.",
    hypeCheck:
      "Cognixion ONE has FDA Breakthrough Device Designation, not clearance or approval. The company also states Axon-R is for research use only and makes no medical claims on its products.",
    sourceLinks: [
      source("Cognixion home page", "company-update", "https://www.cognixion.com/", "Cognixion"),
      source("Cognixion FDA Breakthrough announcement", "company-update", "https://www.cognixion.com/blog/2023/5/3/cognixion-receives-fda-breakthrough-device-designation-for-its-brain-computer-interface-with-augmented-reality-for-assistive-communication", "Cognixion"),
      source("Cognixion contact page", "company-update", "https://www.cognixion.com/contact", "Cognixion")
    ],
    isSample: false
  },
  {
    slug: "neurable-mw75",
    name: "Neurable MW75 Neuro",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Consumer EEG headphones with dry fabric EEG sensors and AI focus/cognitive-state software",
    targetFunction: "Focus tracking, brain-break prompts, cognitive insights, and everyday non-invasive BCI interface research",
    stage: "Commercial EEG headphone platform for wellness/productivity, not a medical BCI",
    evidenceLevel: "E2",
    hq: { city: "Boston, MA", country: "United States", lat: 42.3601, lng: -71.0589 },
    founded: 2016,
    website: "https://www.neurable.com",
    summary:
      "Neurable sells EEG-enabled headphones such as MW75 Neuro and MW75 Neuro LT, using dry fabric sensors and AI software to track focus and provide productivity-oriented neurofeedback.",
    hypeCheck:
      "The current public product is a consumer wellness/productivity device. Focus tracking and cognitive reports are not evidence of clinical diagnosis, treatment, or assistive communication restoration.",
    sourceLinks: [
      source("MW75 Neuro product page", "company-update", "https://www.neurable.com/products/mw75neuro", "Neurable"),
      source("MW75 Neuro LT product page", "company-update", "https://www.neurable.com/products/mw75neurolt", "Neurable"),
      source("Neurable contact page", "company-update", "https://www.neurable.com/contact", "Neurable"),
      source("Neurable company profile", "company-update", "https://www.m-ventures.com/portfolio/neurable", "M Ventures", false)
    ],
    isSample: false
  },
  {
    slug: "bitbrain",
    name: "Bitbrain",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Wireless and mobile EEG, dry/textile EEG, multimodal biosignal hardware, and BCI software platforms",
    targetFunction: "BCI communication/control research, motor rehabilitation, neuroprosthesis integration, passive BCI, neurofeedback, and brain-to-vehicle research",
    stage: "Commercial research platform with BCI application work including MoreGrasp and brain-to-vehicle examples",
    evidenceLevel: "E2",
    hq: { city: "Zaragoza", country: "Spain", lat: 41.6488, lng: -0.8891 },
    founded: 2010,
    website: "https://www.bitbrain.com",
    summary:
      "Bitbrain develops high-tech EEG and multimodal monitoring devices plus software for applied neuroscience and BCI research, including P300 wheelchair work, MoreGrasp neuroprosthesis integration, and brain-to-vehicle experiments.",
    hypeCheck:
      "Bitbrain's products support many BCI research workflows, but the public evidence surface should be treated as enabling infrastructure and project demonstrations unless a given clinical endpoint is separately sourced.",
    sourceLinks: [
      source("Bitbrain home page", "company-update", "https://www.bitbrain.com/en", "Bitbrain"),
      source("Bitbrain BCI applications", "company-update", "https://www.bitbrain.com/applications/brain-computer-interface", "Bitbrain"),
      source("Bitbrain contact page", "company-update", "https://www.bitbrain.com/neurotechnology-contact", "Bitbrain")
    ],
    isSample: false
  },
  {
    slug: "ant-neuro-eego",
    name: "ANT Neuro eego",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Research-grade EEG amplifiers, EEG caps, high-density EEG systems, and real-time eego rt BCI hardware",
    targetFunction: "Real-time BCI, neurofeedback, neurorehabilitation, high-density EEG research, and mobile EEG studies",
    stage: "Commercial research and clinical EEG platform; eego rt is positioned for BCI and neurofeedback",
    evidenceLevel: "E2",
    hq: { city: "Hengelo", country: "Netherlands", lat: 52.2574, lng: 6.7928 },
    website: "https://www.ant-neuro.com",
    summary:
      "ANT Neuro provides EEG hardware and software for clinical and research applications. Its eego rt platform is explicitly designed for real-time BCI, neurofeedback, and neurorehabilitation use.",
    hypeCheck:
      "ANT Neuro is an EEG systems vendor and BCI-enabling platform. Device availability and certification do not by themselves prove a specific assistive BCI clinical outcome.",
    sourceLinks: [
      source("eego rt product page", "company-update", "https://www.ant-neuro.com/products/eego-rt", "ANT Neuro"),
      source("ANT Neuro BCI application page", "company-update", "https://www.ant-neuro.com/applications/bci", "ANT Neuro"),
      source("ANT Neuro contact page", "company-update", "https://www.ant-neuro.com/contact-us", "ANT Neuro")
    ],
    isSample: false
  },
  {
    slug: "neurosky",
    name: "NeuroSky",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Single-lead EEG biosensors and consumer/developer EEG headsets such as MindWave Mobile 2",
    targetFunction: "Low-cost attention/meditation sensing, education, entertainment, wellness, OEM BCI applications, and developer prototyping",
    stage: "Commercial consumer/OEM EEG biosensor platform",
    evidenceLevel: "E2",
    hq: { city: "San Jose, CA", country: "United States", lat: 37.3382, lng: -121.8863 },
    website: "https://neurosky.com",
    summary:
      "NeuroSky supplies single-lead EEG biosensors and MindWave headsets for consumer, education, entertainment, wellness, OEM, and developer applications.",
    hypeCheck:
      "Single-lead EEG can be useful for simple attention/meditation and developer demos, but it has limited spatial information and should not be framed as clinical assistive BCI evidence.",
    sourceLinks: [
      source("NeuroSky home page", "company-update", "https://neurosky.com/", "NeuroSky"),
      source("MindWave product page", "company-update", "https://store.neurosky.com/pages/mindwave", "NeuroSky"),
      source("NeuroSky contact page", "company-update", "https://neurosky.com/contact-us/", "NeuroSky")
    ],
    isSample: false
  },
  {
    slug: "cgx-cognionics",
    name: "CGX / Cognionics",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Wireless dry EEG headsets, active dry electrodes, gel EEG options, and mobile neuroimaging systems",
    targetFunction: "Dry EEG research, real-world neuroimaging, human factors, affective science, sleep monitoring, and BCI-enabling data acquisition",
    stage: "Commercial dry EEG research hardware platform",
    evidenceLevel: "E2",
    hq: { city: "San Diego, CA", country: "United States", lat: 32.7157, lng: -117.1611 },
    website: "https://www.cgxsystems.com",
    summary:
      "CGX, formerly Cognionics, builds wireless dry EEG headsets and electrode technology for researchers who need mobile EEG without gel preparation.",
    hypeCheck:
      "CGX is best tracked as enabling EEG hardware. Dry EEG mobility is important, but the company page is not evidence of a specific therapeutic or assistive BCI outcome.",
    sourceLinks: [
      source("CGX home page", "company-update", "https://www.cgxsystems.com/", "CGX"),
      source("CGX product page", "company-update", "https://www.cgxsystems.com/products", "CGX"),
      source("CGX technology page", "company-update", "https://www.cgxsystems.com/technology", "CGX"),
      source("CGX contact page", "company-update", "https://www.cgxsystems.com/contact", "CGX")
    ],
    isSample: false
  },
  {
    slug: "mentalab-explore",
    name: "Mentalab Explore",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Mobile EEG/ExG amplifiers, open APIs, Lab Streaming Layer support, and wireless timing/synchronization tools",
    targetFunction: "Mobile EEG research, BCI and neurofeedback systems, motor-imagery/SSVEP examples, hyperscanning, and real-time neurointerfaces",
    stage: "Commercial mobile EEG research platform with BCI and neurofeedback workflows",
    evidenceLevel: "E2",
    hq: { city: "Munich", country: "Germany", lat: 48.1351, lng: 11.582 },
    website: "https://mentalab.com",
    summary:
      "Mentalab builds portable EEG/ExG devices for mobile research and explicitly positions Explore Pro for BCI and neurofeedback systems with open APIs, LSL, and sub-millisecond event timing.",
    hypeCheck:
      "Mentalab supports real-time BCI research and has validation literature, but it remains a research platform unless a particular downstream medical or assistive application is separately demonstrated.",
    sourceLinks: [
      source("Mentalab BCI and neurofeedback page", "company-update", "https://mentalab.com/mobile-eeg-for-brain-computer-interface-bci-and-neurofeedback/", "Mentalab"),
      source("Mentalab product page", "company-update", "https://mentalab.com/products/", "Mentalab"),
      source("Mentalab Explore validation paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/36402176/", "PubMed")
    ],
    isSample: false
  },
  {
    slug: "mbraintrain-smarting",
    name: "mBrainTrain Smarting",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Wireless mobile EEG systems including Smarting S and Smarting PRO for real-world EEG research",
    targetFunction: "Mobile EEG, hyperscanning, cognitive neuroscience, auditory and movement studies, and BCI-enabling raw EEG streaming",
    stage: "Commercial mobile EEG research platform",
    evidenceLevel: "E2",
    hq: { city: "Belgrade", country: "Serbia", lat: 44.7866, lng: 20.4489 },
    founded: 2012,
    website: "https://mbraintrain.com",
    summary:
      "mBrainTrain builds Smarting mobile EEG systems for wireless, out-of-lab research, with real-time raw data streaming and mobile workflows.",
    hypeCheck:
      "mBrainTrain is enabling hardware for mobile EEG and BCI research; it should not be treated as a standalone clinical BCI therapy or assistive communication product.",
    sourceLinks: [
      source("Smarting wireless EEG page", "company-update", "https://mbraintrain.com/smarting-wireless-eeg/", "mBrainTrain"),
      source("mBrainTrain who-we-are page", "company-update", "https://mbraintrain.com/who-we-are/", "mBrainTrain"),
      source("mBrainTrain privacy policy contact", "company-update", "https://mbraintrain.com/company-privacy-policy/", "mBrainTrain"),
      source("mBrainTrain company profile", "company-update", "https://www.blockstart.eu/portfolio/mbrain-train/", "BlockStart", false)
    ],
    isSample: false
  },
  {
    slug: "kernel-flow",
    name: "Kernel Flow",
    kind: "company",
    category: "non-invasive",
    region: "north-america",
    modality: "Wearable time-domain fNIRS system for high-density hemodynamic brain measurement",
    targetFunction: "Real-time brain measurement, cognitive-state research, neurofeedback-enabling studies, and hemodynamic BCI research infrastructure",
    stage: "Commercial research platform with peer-reviewed device validation; not marketed as a medical BCI",
    evidenceLevel: "E4",
    hq: { city: "Los Angeles, CA", country: "United States", lat: 34.0522, lng: -118.2437 },
    founded: 2016,
    website: "https://www.kernel.com",
    summary:
      "Kernel Flow is a wearable time-domain fNIRS platform designed to measure cortical blood-oxygenation changes at scale, giving researchers a portable hemodynamic brain-data system for cognition, mental-health, and human-performance studies.",
    hypeCheck:
      "Flow is a research neuroimaging platform, not a demonstrated assistive BCI for paralysis or communication. Kernel documentation says Flow data is research/informational and not clinically significant by itself.",
    sourceLinks: [
      source("Kernel Flow technology page", "company-update", "https://www.kernel.com/technology", "Kernel"),
      source("Kernel developer page", "company-update", "https://www.kernel.com/developers", "Kernel"),
      source("Kernel Flow device validation paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8765296/", "PubMed Central"),
      source("Kernel Flow medical-device/IRB note", "company-update", "https://docs.kernel.com/docs/is-flow-a-medical-device-irb", "Kernel Docs")
    ],
    isSample: false
  },
  {
    slug: "nirx-fnirs",
    name: "NIRx fNIRS",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Wearable and lab-based fNIRS systems with real-time Turbo-Satori BCI/neurofeedback workflows",
    targetFunction: "fNIRS BCI, neurofeedback, mobile neuroimaging, multimodal EEG/fNIRS studies, and hemodynamic signal acquisition",
    stage: "Commercial fNIRS platform with explicit BCI/neurofeedback software support and peer-reviewed Turbo-Satori paper",
    evidenceLevel: "E4",
    hq: { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
    website: "https://nirx.net",
    summary:
      "NIRx provides fNIRS systems such as NIRSport2 and NIRScout plus Turbo-Satori real-time analysis software, explicitly supporting fNIRS-based BCI and neurofeedback research.",
    hypeCheck:
      "NIRx is enabling research infrastructure. Real-time fNIRS classification and feedback support should not be counted as an approved clinical BCI outcome unless a downstream study separately demonstrates it.",
    sourceLinks: [
      source("NIRx BCI and neurofeedback page", "company-update", "https://nirx.net/fnirs-bci-neurofeedback", "NIRx"),
      source("Turbo-Satori page", "company-update", "https://nirx.net/turbosatori", "NIRx"),
      source("NIRSport2 product page", "company-update", "https://nirx.net/nirsport", "NIRx"),
      source("Turbo-Satori peer-reviewed paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5629919/", "PubMed Central"),
      source("NIRx contact page", "company-update", "https://nirx.net/contact", "NIRx")
    ],
    isSample: false
  },
  {
    slug: "artinis-brite",
    name: "Artinis Brite / OxyMon",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Wearable and lab-based fNIRS/NIRS systems with EEG-fNIRS integration options",
    targetFunction: "fNIRS BCI, neurofeedback, neurorehabilitation research, cognitive workload, and hybrid EEG/fNIRS studies",
    stage: "Commercial fNIRS research hardware; BCI relevance documented in company application notes",
    evidenceLevel: "E2",
    hq: { city: "Elst", country: "Netherlands", lat: 51.9194, lng: 5.8417 },
    website: "https://artinis.com",
    summary:
      "Artinis builds portable and wearable fNIRS devices such as Brite and OxyMon, and publishes application material on fNIRS use in BCI and neurofeedback workflows.",
    hypeCheck:
      "Artinis hardware can be used in fNIRS-BCI research, but product availability and application notes are not themselves proof of clinical rehabilitation efficacy or everyday assistive control.",
    sourceLinks: [
      source("Artinis fNIRS in BCI and neurofeedback", "company-update", "https://artinis.com/blogpost-all/fnirs-in-brain-computer-interface-and-neurofeedback", "Artinis"),
      source("Artinis Brite product page", "company-update", "https://artinis.com/brite", "Artinis"),
      source("Artinis fNIRS-EEG package", "company-update", "https://artinis.com/nirs-eeg-package", "Artinis"),
      source("Artinis FAQ", "company-update", "https://artinis.com/faq", "Artinis")
    ],
    isSample: false
  },
  {
    slug: "gowerlabs-lumo",
    name: "Gowerlabs LUMO",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Wearable high-density diffuse optical tomography / fNIRS system",
    targetFunction: "High-density hemodynamic brain imaging for neuroscience, real-time BCI research, and naturalistic neurotechnology studies",
    stage: "Commercial high-density fNIRS/DOT platform with peer-reviewed system evaluation and BCI-use impact evidence",
    evidenceLevel: "E4",
    hq: { city: "London", country: "United Kingdom", lat: 51.5072, lng: -0.1276 },
    website: "https://www.gowerlabs.co.uk",
    summary:
      "Gowerlabs' LUMO is a modular wearable high-density fNIRS/DOT system. UCL impact material links Gowerlabs systems to real-time BCI development, including Facebook Reality Labs' non-invasive thought-typing research.",
    hypeCheck:
      "LUMO is a powerful optical brain-imaging platform, but its public BCI role is enabling research rather than a released assistive communication product.",
    sourceLinks: [
      source("LUMO product page", "company-update", "https://www.gowerlabs.co.uk/lumo", "Gowerlabs"),
      source("Gowerlabs home page", "company-update", "https://www.gowerlabs.co.uk/", "Gowerlabs"),
      source("UCL Gowerlabs impact case study", "news-report", "https://www.ucl.ac.uk/impact/case-studies/2022/apr/gowerlabs-advancing-optical-brain-imaging-neuroscience-applications-industry", "University College London", false),
      source("Wearable high-density fNIRS evaluation", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8033536/", "PubMed Central")
    ],
    isSample: false
  },
  {
    slug: "cortivision-photon",
    name: "Cortivision Photon",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Wireless fNIRS systems, Photon Cap, Spectrum, and fNIRS-plus-EEG integrations",
    targetFunction: "fNIRS BCI studies, hybrid EEG/fNIRS research, VR/mobile neuroimaging, and microgravity human-computer-interaction experiments",
    stage: "Commercial fNIRS research platform; company-announced PhotonGrav fNIRS-BCI experiment on the ISS",
    evidenceLevel: "E1",
    hq: { city: "Lublin", country: "Poland", lat: 51.2465, lng: 22.5684 },
    website: "https://www.cortivision.com",
    summary:
      "Cortivision builds mobile fNIRS systems and publishes BCI-specific use cases. Its PhotonGrav project tested whether fNIRS-based BCI technology could operate in microgravity during the Ax-4 mission.",
    hypeCheck:
      "PhotonGrav is an important environment test, not evidence that Cortivision has a clinical assistive BCI. Treat the space claim as company-reported until peer-reviewed results appear.",
    sourceLinks: [
      source("Cortivision BCI use case", "company-update", "https://www.cortivision.com/use-case/brain-computer-interfaces-bci/", "Cortivision"),
      source("Cortivision products page", "company-update", "https://www.cortivision.com/products/", "Cortivision"),
      source("Cortivision space projects", "company-update", "https://www.cortivision.com/space-projects/", "Cortivision"),
      source("Cortivision contact page", "company-update", "https://www.cortivision.com/spectrum-contact/", "Cortivision")
    ],
    isSample: false
  },
  {
    slug: "brain-innovation-rtfmri",
    name: "Brain Innovation",
    kind: "company",
    category: "non-invasive",
    region: "europe",
    modality: "Real-time fMRI and fNIRS analysis software, including Turbo-BrainVoyager and Turbo-Satori",
    targetFunction: "Real-time fMRI BCI, fMRI neurofeedback, fNIRS BCI, and neurofeedback experiment software",
    stage: "Commercial research software used for real-time fMRI and fNIRS BCI/neurofeedback workflows",
    evidenceLevel: "E4",
    hq: { city: "Maastricht", country: "Netherlands", lat: 50.8514, lng: 5.691 },
    website: "https://brainvoyager.com",
    summary:
      "Brain Innovation develops BrainVoyager, Turbo-BrainVoyager, and Satori/Turbo-Satori software. Its product pages explicitly position Turbo-BrainVoyager for real-time fMRI neurofeedback and BCI applications, while Turbo-Satori has a peer-reviewed fNIRS BCI/neurofeedback paper.",
    hypeCheck:
      "This is enabling software, not a medical device that restores function by itself. Clinical or assistive claims need to be tied to specific studies using the software.",
    sourceLinks: [
      source("Brain Innovation product overview", "company-update", "https://brainvoyager.com/", "Brain Innovation"),
      source("Turbo-BrainVoyager product page", "company-update", "https://brainvoyager.com/products/turbo-brainvoyager/", "Brain Innovation"),
      source("Turbo-Satori peer-reviewed paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5629919/", "PubMed Central"),
      source("Turbo-Satori publication record", "paper", "https://cris.maastrichtuniversity.nl/en/publications/turbo-satori-a-neurofeedback-and-brain-computer-interface-toolbox/", "Maastricht University")
    ],
    isSample: false
  },
  {
    slug: "eth-relab-fnirs",
    name: "ETH RELab fNIRS BCI",
    kind: "academic",
    category: "non-invasive",
    region: "europe",
    modality: "Wearable modular fNIRS plus biosignal interfaces for motor-intention decoding",
    targetFunction: "Upper-limb motion-intention decoding, stroke rehabilitation guidance, and home-environment fNIRS BCI research",
    stage: "Academic research project with published feasibility work",
    evidenceLevel: "E4",
    hq: { city: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
    website: "https://relab.ethz.ch",
    summary:
      "ETH Zurich's Rehabilitation Engineering Laboratory develops fNIRS-based BCI systems for real-time decoding of upper-limb motion intention and stroke-rehabilitation feedback.",
    hypeCheck:
      "This is academic feasibility and rehabilitation-interface research, not a commercial therapy or proven home-use assistive BCI.",
    sourceLinks: [
      source("ETH fNIRS BCI project", "company-update", "https://relab.ethz.ch/research/current-research-projects/interfacing-the-brain-using-functional-near-infrared-spectroscop.html", "ETH Zurich"),
      source("ETH current research projects", "company-update", "https://relab.ethz.ch/research/current-research-projects.html", "ETH Zurich"),
      source("Hybrid fNIRS-biosignal BCI feasibility paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3637588/", "PubMed Central")
    ],
    isSample: false
  },
  {
    slug: "holland-bloorview-prism",
    name: "Holland Bloorview PRISM Lab",
    kind: "academic",
    category: "non-invasive",
    region: "north-america",
    modality: "Clinical BCI program using EEG and near-infrared spectroscopy/fNIRS communication paradigms",
    targetFunction: "Communication and environmental access for children and youth with severe disabilities and limited speech or movement",
    stage: "Clinical BCI program plus peer-reviewed pediatric and fNIRS communication studies",
    evidenceLevel: "E4",
    hq: { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
    website: "https://hollandbloorview.ca",
    summary:
      "Holland Bloorview's PRISM Lab and Clinical BCI Program develop access technologies for people with complex disabilities, including near-infrared spectroscopy and fNIRS BCI communication paradigms.",
    hypeCheck:
      "The clinical program provides training and research access pathways; public papers still show small-sample or pediatric feasibility rather than an approved standalone communication product.",
    sourceLinks: [
      source("Holland Bloorview BCI overview", "company-update", "https://hollandbloorview.ca/research-education/bloorview-research-institute/innovations-industry-opportunities/brain-computer", "Holland Bloorview"),
      source("Clinical BCI Program", "company-update", "https://hollandbloorview.ca/clinical-brain-computer-interface-bci-program", "Holland Bloorview"),
      source("Online fNIRS imagined-speech BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/30260320/", "PubMed"),
      source("Pediatric fNIRS BCI paper", "paper", "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2022.938708/full", "Frontiers in Human Neuroscience")
    ],
    isSample: false
  },
  {
    slug: "maastricht-rtfmri-bci",
    name: "Maastricht real-time fMRI BCI",
    kind: "academic",
    category: "non-invasive",
    region: "europe",
    modality: "Real-time fMRI brain-computer interfaces using whole-brain hemodynamic signals",
    targetFunction: "Motor-independent communication, fMRI spelling, neurofeedback, and high-spatial-resolution non-invasive BCI research",
    stage: "Academic rt-fMRI BCI program with fMRI spelling and review literature",
    evidenceLevel: "E4",
    hq: { city: "Maastricht", country: "Netherlands", lat: 50.8514, lng: 5.701 },
    website: "https://www.maastrichtuniversity.nl",
    summary:
      "Maastricht researchers led work on real-time fMRI BCIs, including an fMRI-based spelling device and later reviews framing rt-fMRI as a high-spatial-resolution but nonportable BCI approach.",
    hypeCheck:
      "Real-time fMRI BCI is expensive, scanner-bound, noisy, and slow compared with electrical BCIs. It is best tracked as research evidence and a fallback communication paradigm, not a near-term consumer product.",
    sourceLinks: [
      source("Real-time fMRI for brain-computer interfacing", "paper", "https://cris.maastrichtuniversity.nl/en/publications/real-time-fmri-for-brain-computer-interfacing/", "Maastricht University"),
      source("fMRI spelling device paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22748322/", "PubMed / Current Biology"),
      source("Topographic somatosensory imagery for rt-fMRI BCI", "paper", "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2019.00427/full", "Frontiers in Human Neuroscience")
    ],
    isSample: false
  },
  {
    slug: "yale-rtfmri-bci",
    name: "Yale real-time fMRI BCI",
    kind: "academic",
    category: "non-invasive",
    region: "north-america",
    modality: "Real-time fMRI BCI mapped to each participant's neural manifold geometry",
    targetFunction: "Fast learning of brain-controlled game/avatar control and future non-invasive motor or communication interfaces",
    stage: "Peer-reviewed 2026 Nature Neuroscience human learning study",
    evidenceLevel: "E4",
    hq: { city: "New Haven, CT", country: "United States", lat: 41.3083, lng: -72.9279 },
    website: "https://news.yale.edu",
    summary:
      "Yale researchers used real-time fMRI and manifold-aware feedback mappings to let participants control a video-game avatar with brain activity, showing much faster learning when the BCI aligned with natural neural geometry.",
    hypeCheck:
      "The study used healthy participants in an fMRI scanner. It is a strong research result, but not yet a portable system for patients or a clinical communication aid.",
    sourceLinks: [
      source("Yale rt-fMRI BCI news release", "company-update", "https://news.yale.edu/2026/06/09/brain-computer-interface-works-not-against-brain", "Yale University"),
      source("Nature Neuroscience rt-fMRI BCI paper", "paper", "https://www.nature.com/articles/s41593-026-02311-2", "Nature Neuroscience")
    ],
    isSample: false
  },
  expansionCompany({ slug: "affectable-sleep", name: "Affectable Sleep", category: "non-invasive", region: "rest-of-world", modality: "EEG/light-sound sleep headband with closed-loop auditory stimulation", targetFunction: "Consumer sleep neurofeedback and slow-wave sleep support", stage: "Non-medical consumer neurotech profile; clinical evidence not yet tracked", hq: ["Sydney", "Australia", -33.8688, 151.2093], founded: 2020, website: "https://www.affectablesleep.com", neurofoundersSlug: "affectable-sleep" }),
  expansionCompany({ slug: "control-bionics", name: "Control Bionics", category: "non-invasive", region: "rest-of-world", modality: "EMG-based NeuroNode access technology paired with eye gaze and AAC software", targetFunction: "Communication and computer access for people with ALS, spinal cord injury, cerebral palsy, and other motor impairments", stage: "Commercial assistive-technology company with FDA-cleared NeuroNode access system listed by NeuroFounders", evidenceLevel: "E2", hq: ["Melbourne", "Australia", -37.8136, 144.9631], founded: 2006, website: "https://www.controlbionics.com/", neurofoundersSlug: "control-bionics" }),
  expansionCompany({ slug: "cortical-labs", name: "Cortical Labs", category: "minimally-invasive", region: "rest-of-world", modality: "MEA-based biological-computing systems using living neurons", targetFunction: "Ex vivo neural-computation research infrastructure and synthetic-biological intelligence tools", stage: "Research and developer platform; not a human BCI product", evidenceLevel: "E2", hq: ["Melbourne", "Australia", -37.8136, 144.9631], founded: 2019, website: "https://corticallabs.com", neurofoundersSlug: "cortical-labs" }),
  expansionCompany({ slug: "emvision", name: "EMVision", category: "non-invasive", region: "rest-of-world", modality: "Portable electromagnetic neuroimaging for bedside stroke assessment", targetFunction: "Stroke imaging and triage support outside conventional CT/MRI workflows", stage: "Investigational portable neuroimaging platform with clinical translation underway", evidenceLevel: "E1", hq: ["Brisbane", "Australia", -27.4698, 153.0251], founded: 2017, website: "https://www.emvisionmedical.com/", neurofoundersSlug: "emvision" }),
  expansionCompany({ slug: "epiminder", name: "Epiminder", category: "minimally-invasive", region: "rest-of-world", modality: "Minimally invasive long-term EEG monitoring implant for epilepsy", targetFunction: "Continuous seizure monitoring and epilepsy-management evidence generation", stage: "Australian implantable EEG company with other-approval regulatory profile listed by NeuroFounders", evidenceLevel: "E2", hq: ["Melbourne", "Australia", -37.8136, 144.9631], founded: 2017, website: "http://www.epiminder.com/", neurofoundersSlug: "epiminder" }),

  expansionCompany({ slug: "anthriq-nexstem", name: "Anthriq / NexStem", category: "non-invasive", region: "asia", modality: "Wireless EEG headset, SDK, APIs, and biosignal platform", targetFunction: "Developer infrastructure for real-time non-invasive BCI and biosignal applications", stage: "Research-only EEG hardware and software stack", evidenceLevel: "E1", hq: ["Bengaluru", "India", 12.9716, 77.5946], founded: 2020, website: "https://nexstem.ai/", neurofoundersSlug: "anthriq" }),
  expansionCompany({ slug: "brainsightai", name: "BrainSightAI", category: "non-invasive", region: "asia", modality: "MRI/fMRI/connectomics software platform", targetFunction: "Brain mapping, neuroimaging decision support, and treatment-planning workflows", stage: "India-based neuroimaging software company with other-approval profile listed by NeuroFounders", evidenceLevel: "E2", hq: ["Bengaluru", "India", 12.9716, 77.5946], founded: 2019, website: "https://www.brainsightai.com", neurofoundersSlug: "brainsightai" }),
  expansionCompany({ slug: "brainq", name: "BRAIN.Q", category: "non-invasive", region: "asia", modality: "AI-personalized electromagnetic stimulation for post-stroke recovery", targetFunction: "Home-based stroke rehabilitation and brain-network modulation", stage: "Investigational/approved-market stroke-recovery service reporting; not a BCI control product", evidenceLevel: "E2", hq: ["Jerusalem", "Israel", 31.7683, 35.2137], founded: 2016, website: "https://brainqtech.com/", neurofoundersSlug: "brain-q" }),
  expansionCompany({ slug: "brainsway", name: "BrainsWay", category: "non-invasive", region: "asia", modality: "Deep transcranial magnetic stimulation", targetFunction: "Non-invasive neuromodulation for psychiatric and neurological indications", stage: "Commercial FDA-cleared TMS platform listed by NeuroFounders", evidenceLevel: "E6", hq: ["Jerusalem", "Israel", 31.7683, 35.2137], founded: 2003, website: "https://www.brainsway.com/", neurofoundersSlug: "brainsway" }),
  expansionCompany({ slug: "elda-braintech", name: "ELDA BrainTech", category: "non-invasive", region: "asia", modality: "EEG analytics and neuroimaging software", targetFunction: "Epilepsy-oriented EEG analysis and brain-health decision support", stage: "Investigational neuroimaging/EEG software profile", evidenceLevel: "E1", hq: ["Tel Aviv", "Israel", 32.0853, 34.7818], founded: 2022, website: "https://www.elda-ai.com", neurofoundersSlug: "elda-braintech" }),
  expansionCompany({ slug: "alpha-omega-neuro", name: "Alpha Omega", category: "minimally-invasive", region: "asia", modality: "Microelectrode recording, neural navigation, and stimulation systems for DBS and neuroscience", targetFunction: "Functional neurosurgery guidance and neural recording infrastructure", stage: "Established commercial neuroscience and DBS-navigation equipment company", evidenceLevel: "E2", hq: ["Nazareth", "Israel", 32.6996, 35.3035], website: "https://www.alphaomega-eng.com/Company-Overview" }),
  expansionCompany({ slug: "graymatters-health", name: "GrayMatters Health", category: "non-invasive", region: "asia", modality: "EEG-fMRI-pattern biomarker and neurofeedback therapy platform", targetFunction: "Digital biomarker-guided neurofeedback for PTSD, depression, and interventional psychiatry", stage: "FDA-cleared Prism for PTSD reported by company; broader indications still emerging", evidenceLevel: "E6", hq: ["Haifa", "Israel", 32.794, 34.9896], website: "https://www.graymatters-health.com/technology", extraSources: [source("GrayMatters Health FDA 510(k) clearance update", "regulatory-page", "https://www.graymatters-health.com/news-events/us-fda-grants-graymatters-health-510k-clearance-to-market-prism-for-ptsd", "GrayMatters Health")] }),
  expansionCompany({ slug: "theranica", name: "Theranica", category: "non-invasive", region: "asia", modality: "Remote electrical neuromodulation wearable for migraine", targetFunction: "Drug-free migraine acute and preventive neuromodulation", stage: "Commercial prescribed neuromodulation product with FDA-cleared claims on company material", evidenceLevel: "E6", hq: ["Netanya", "Israel", 32.3215, 34.8532], founded: 2016, website: "https://theranica.com/" }),
  expansionCompany({ slug: "firefly-neuroscience", name: "Firefly Neuroscience / ElMindA", category: "non-invasive", region: "asia", modality: "EEG/ERP brain-network analytics and biomarker platform", targetFunction: "Objective brain function assessment and neurological/psychiatric monitoring", stage: "FDA-cleared brain network analytics company with Israeli ElMindA roots", evidenceLevel: "E6", hq: ["Tel Aviv", "Israel", 32.0853, 34.7818], website: "https://fireflyneuro.com/" }),
  expansionCompany({ slug: "mon4t", name: "Mon4t", category: "non-invasive", region: "asia", modality: "Smartphone-based neurological motor and cognitive assessment", targetFunction: "Remote neurological assessment and monitoring for movement, cognition, and psychiatric symptoms", stage: "FDA-cleared remote neurology platform according to company site", evidenceLevel: "E6", hq: ["Binyamina", "Israel", 32.5232, 34.9467], website: "https://mon4t.com/" }),
  expansionCompany({ slug: "ybrain", name: "Ybrain", category: "non-invasive", region: "asia", modality: "Wearable tDCS/tES and EEG/qEEG mental-health technology", targetFunction: "Home and clinic mental-health neuromodulation and brain-state monitoring", stage: "Korea-based non-invasive neuromodulation company with commercial and clinical programs", evidenceLevel: "E2", hq: ["Seongnam", "South Korea", 37.4449, 127.1389], website: "https://www.ybrain.com/en/technology/" }),
  expansionCompany({ slug: "imedisync", name: "iMediSync", category: "non-invasive", region: "asia", modality: "Dry EEG headset, EEG/HRV analytics, and photobiomodulation device stack", targetFunction: "AI brain mapping, early cognitive screening, and mental-health analytics", stage: "Commercial Korean EEG/AI platform with iSyncWave and iSyncBrain products", evidenceLevel: "E2", hq: ["Seoul", "South Korea", 37.5665, 126.978], website: "https://www.imedisync.com/en/" }),
  expansionCompany({ slug: "neurophet", name: "NEUROPHET", category: "non-invasive", region: "asia", modality: "AI brain-imaging analysis and neuro-navigation software", targetFunction: "Brain-disease diagnosis support, treatment planning, and imaging biomarkers", stage: "Commercial Korean AI brain-imaging company with certified products listed on official site", evidenceLevel: "E2", hq: ["Seoul", "South Korea", 37.5665, 126.978], founded: 2016, website: "https://www.neurophet.com/en" }),
  expansionCompany({ slug: "looxid-labs", name: "Looxid Labs", category: "non-invasive", region: "asia", modality: "Wearable EEG plus AI analytics for cognitive and wellness applications", targetFunction: "Brain-state monitoring, VR/attention analytics, meditation, and healthcare-adjacent biosignal tools", stage: "Korea-based EEG/AI product company with Link Band and Mind Breeze offerings", evidenceLevel: "E2", hq: ["Seoul", "South Korea", 37.5665, 126.978], website: "https://looxidlabs.com/" }),
  expansionCompany({ slug: "neofect", name: "Neofect", category: "non-invasive", region: "asia", modality: "Sensorized rehabilitation devices and digital neurorehabilitation software", targetFunction: "Stroke and neurological rehabilitation through smart gloves, home rehab, and therapy analytics", stage: "Commercial Korea-origin rehabilitation technology company", evidenceLevel: "E2", hq: ["Seongnam", "South Korea", 37.4449, 127.1389], website: "https://www.neofect.com/en/" }),
  expansionCompany({ slug: "neurotx", name: "NeuroTx", category: "non-invasive", region: "asia", modality: "AI neural decoding, electroceuticals, BCI, and digital neuro-intervention platform", targetFunction: "Personalized neuro-intervention and digital therapeutics from biosignal decoding", stage: "Early commercial Korean neurotechnology platform", evidenceLevel: "E1", hq: ["Seoul", "South Korea", 37.5665, 126.978], founded: 2015, website: "https://neurotx.kr/" }),
  expansionCompany({ slug: "neeuro", name: "Neeuro", category: "non-invasive", region: "asia", modality: "SenzeBand EEG headband and brain-computing software", targetFunction: "Brain fitness, digital therapeutics, stress management, and developer BCI infrastructure", stage: "Commercial Singapore EEG/BCI product company", evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.3521, 103.8198], website: "https://www.neeuro.com/" }),
  expansionCompany({ slug: "neuroglee", name: "Neuroglee", category: "non-invasive", region: "asia", modality: "Digital cognitive intervention and dementia-care software", targetFunction: "Memory and dementia care management, digital therapeutics, and cognitive support", stage: "Singapore-origin digital dementia-care company; not a BCI hardware product", evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.3521, 103.8198], website: "https://www.neuroglee.com/" }),
  expansionCompany({ slug: "neurowyzr", name: "Neurowyzr", category: "non-invasive", region: "asia", modality: "Digital brain function screening and cognitive-assessment software", targetFunction: "Early cognitive decline screening and brain-health clinical workflows", stage: "Singapore neuroscience clinic/software company with DBFS screening product", evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.3521, 103.8198], founded: 2019, website: "https://neurowyzr.com/about/" }),
  expansionCompany({ slug: "synphne", name: "SynPhNe", category: "non-invasive", region: "asia", modality: "Wearable EEG/EMG neurorehabilitation biofeedback platform", targetFunction: "Stroke, traumatic brain injury, and motor rehabilitation through coupled brain-muscle training", stage: "Singapore wearable rehabilitation system with clinical and commercial reporting", evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.3521, 103.8198], website: "https://www.synphne.com/" }),
  expansionCompany({ slug: "cyberdyne-hal", name: "Cyberdyne HAL", category: "non-invasive", region: "asia", modality: "Wearable cyborg/exoskeleton using bioelectrical signals for motion support", targetFunction: "Neurorehabilitation and motor-function assistance for neurological and mobility disorders", stage: "Commercial Japanese robotics/neurorehabilitation platform with regulatory approvals in multiple markets", evidenceLevel: "E2", hq: ["Tsukuba", "Japan", 36.0835, 140.0764], founded: 2004, website: "https://www.cyberdyne.jp/english/" }),
  expansionCompany({ slug: "meltin-mmi", name: "MELTIN MMI", category: "non-invasive", region: "asia", modality: "Bio-signal robotic hand and avatar-control interface", targetFunction: "Robotic prosthetic/control interfaces and human-machine augmentation", stage: "Japan-based bio-signal robotics company", evidenceLevel: "E2", hq: ["Tokyo", "Japan", 35.6762, 139.6503], website: "https://www.meltin.jp/en/" }),
  expansionCompany({ slug: "pgv-eeg", name: "PGV", category: "non-invasive", region: "asia", modality: "Patch-type flexible EEG sensor and AI brainwave analysis service", targetFunction: "Wearable EEG acquisition for research, clinical studies, and neuro-marketing", stage: "Osaka University startup with commercial patch EEG platform", evidenceLevel: "E2", hq: ["Tokyo", "Japan", 35.6762, 139.6503], founded: 2016, website: "https://www.pgv.co.jp/en/" }),
  expansionCompany({ slug: "lifescapes-bci", name: "LIFESCAPES", category: "non-invasive", region: "asia", modality: "Brain-machine interface and rehabilitation technology from Japanese academic translation", targetFunction: "Neurorehabilitation and assistive-control applications", stage: "Japan BCI/neurorehabilitation startup; public evidence still mostly company profile material", evidenceLevel: "E1", hq: ["Tokyo", "Japan", 35.6762, 139.6503], website: "https://lifescapes.jp/en/" }),
  expansionCompany({ slug: "neurobit-ai", name: "Neurobit", category: "non-invasive", region: "asia", modality: "AI sleep and physiological-signal analytics", targetFunction: "Sleep-health analytics and clinical decision support from biosignals", stage: "Singapore/Taiwan-linked sleep analytics company with AI platform", evidenceLevel: "E1", hq: ["Singapore", "Singapore", 1.3521, 103.8198], website: "https://www.neurobit.com/" }),
  expansionCompany({ slug: "brain-navi", name: "Brain Navi Biotechnology", category: "minimally-invasive", region: "asia", modality: "AI-enabled neurosurgical navigation robot and neuro-endoscopy platform", targetFunction: "Neurosurgical navigation and robotic support for image-guided brain procedures", stage: "Taiwan neurosurgical robot company with FDA-cleared NaoTrac update on official site", evidenceLevel: "E6", hq: ["Hsinchu", "Taiwan", 24.8138, 120.9675], founded: 2015, website: "https://brainnavi.com/about/" }),
  expansionCompany({ slug: "neuphony", name: "Neuphony", category: "non-invasive", region: "asia", modality: "Wearable EEG headset and neurofeedback software", targetFunction: "Consumer and research EEG, neurofeedback, and brain-computer-interface experiments", stage: "India-based EEG headset company with peer-reviewed validation emerging", evidenceLevel: "E2", hq: ["New Delhi", "India", 28.6139, 77.209], website: "https://neuphony.com", extraSources: [source("Neuphony EEG validation paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC12833066/", "PubMed Central")] }),
  expansionCompany({ slug: "brainalive", name: "BrainAlive", category: "non-invasive", region: "asia", modality: "EEG, neurofeedback, and BCI research tools", targetFunction: "Brain-computer-interface education, EEG acquisition, neurofeedback, and research infrastructure", stage: "India-based EEG/BCI tools company", evidenceLevel: "E1", hq: ["Bengaluru", "India", 12.9716, 77.5946], website: "https://brainalive.com" }),
  expansionCompany({ slug: "neuroleap", name: "NeuroLeap", category: "non-invasive", region: "asia", modality: "qEEG brain mapping, neurofeedback, and brain-training platform", targetFunction: "Non-invasive brain assessment and neurofeedback interventions", stage: "India-based clinical/wellness neurofeedback provider", evidenceLevel: "E1", hq: ["Mumbai", "India", 19.076, 72.8777], website: "https://www.neuroleap.com" }),
  expansionCompany({ slug: "neuroequilibrium", name: "NeuroEquilibrium", category: "non-invasive", region: "asia", modality: "Vestibular diagnostics, eye-tracking, and neuro-otology clinical platform", targetFunction: "Balance, vertigo, and vestibular neurological assessment", stage: "India-based clinical neurodiagnostic network; adjacent to BCI rather than direct interface", evidenceLevel: "E1", hq: ["Jaipur", "India", 26.9124, 75.7873], website: "https://www.neuroequilibrium.in" }),

  expansionCompany({ slug: "threebrain", name: "3Brain", category: "minimally-invasive", region: "europe", modality: "High-resolution microelectrode array platforms for in-vitro electrophysiology", targetFunction: "Neuroscience research and drug-discovery infrastructure using ex vivo neural recordings", stage: "Commercial research-only MEA platform", evidenceLevel: "E2", hq: ["Zurich", "Switzerland", 47.3769, 8.5417], founded: 2011, website: "https://www.3brain.com/", neurofoundersSlug: "3brain" }),
  expansionCompany({ slug: "aleva-neurotherapeutics", name: "Aleva Neurotherapeutics", category: "minimally-invasive", region: "europe", modality: "Directional deep brain stimulation electrodes using MEMS technology", targetFunction: "DBS therapy support for Parkinson's disease and essential tremor", stage: "CE-marked directional DBS system listed by NeuroFounders", evidenceLevel: "E6", hq: ["Lausanne", "Switzerland", 46.5197, 6.6323], founded: 2013, website: "https://aleva-neuro.com", neurofoundersSlug: "aleva-neurotherapeutics" }),
  expansionCompany({ slug: "alljoined", name: "Alljoined", category: "non-invasive", region: "north-america", modality: "Foundation models for EEG and visual-perception decoding", targetFunction: "Machine-learning infrastructure for non-invasive neural decoding and image reconstruction research", stage: "Early research/developer infrastructure company", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2023, website: "https://www.alljoined.com/", neurofoundersSlug: "alljoined" }),
  expansionCompany({ slug: "altoida", name: "Altoida", category: "non-invasive", region: "north-america", modality: "Digital cognitive biomarkers and multimodal NeuroMarker software", targetFunction: "Cognitive assessment and neurodegenerative monitoring", stage: "Investigational digital-biomarker company", evidenceLevel: "E1", hq: ["Washington, DC", "United States", 38.9072, -77.0369], founded: 2016, website: "https://altoida.com/", neurofoundersSlug: "altoida" }),
  expansionCompany({ slug: "alto-neuroscience", name: "Alto Neuroscience", category: "non-invasive", region: "north-america", modality: "Neurobiology-informed biomarkers for precision psychiatry", targetFunction: "Patient stratification and treatment-response prediction in psychiatry", stage: "Public precision-psychiatry biotech; adjacent biomarker platform", evidenceLevel: "E1", hq: ["Los Altos, CA", "United States", 37.3852, -122.1141], founded: 2019, website: "https://altoneuroscience.com", neurofoundersSlug: "alto-neuroscience" }),
  expansionCompany({ slug: "amber-therapeutics", name: "Amber Therapeutics", category: "minimally-invasive", region: "europe", modality: "Adaptive implantable neuromodulation for pelvic nerve targets", targetFunction: "Closed-loop therapy for mixed urinary incontinence", stage: "Investigational implantable neuromodulation company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2021, website: "https://www.amber-tx.com", neurofoundersSlug: "amber-therapeutics" }),
  expansionCompany({ slug: "ampa-health", name: "Ampa Health", category: "non-invasive", region: "north-america", modality: "Portable transcranial magnetic stimulation", targetFunction: "Expanded-access TMS workflows for mental-health care", stage: "FDA-cleared TMS access model listed by NeuroFounders", evidenceLevel: "E6", hq: ["New York, NY", "United States", 40.7128, -74.006], founded: 2022, website: "https://www.ampahealth.com/", neurofoundersSlug: "ampa-health" }),
  expansionCompany({ slug: "aora", name: "Aora", category: "non-invasive", region: "north-america", modality: "Behind-the-ear multimodal neurofeedback wearable", targetFunction: "Cognitive load, neural recovery, burnout risk, and brain-state tracking", stage: "Early non-medical consumer neurotech company", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2026, website: "https://aoramind.com", neurofoundersSlug: "aora" }),
  expansionCompany({ slug: "apollo-neuro", name: "Apollo Neuro", category: "non-invasive", region: "north-america", modality: "Vibrotactile wearable neuromodulation", targetFunction: "Stress resilience, focus, sleep support, and wellness neurotechnology", stage: "Commercial non-medical consumer neurotech product", evidenceLevel: "E2", hq: ["Pittsburgh, PA", "United States", 40.4406, -79.9959], founded: 2018, website: "https://apolloneuro.com", neurofoundersSlug: "apollo-neuro" }),
  expansionCompany({ slug: "arctop", name: "Arctop", category: "non-invasive", region: "north-america", modality: "Hardware-agnostic neural decoding APIs and cognitive-state software", targetFunction: "Real-time cognitive and intention metrics from neural activity", stage: "Research/developer software platform", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2016, website: "https://arctop.com/", neurofoundersSlug: "arctop" }),
  expansionCompany({ slug: "artiria-medical", name: "Artiria Medical", category: "minimally-invasive", region: "europe", modality: "Micro-articulated neurovascular guidewire systems", targetFunction: "Minimally invasive neurovascular access and stroke intervention support", stage: "FDA-cleared neurovascular access company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Lausanne", "Switzerland", 46.5197, 6.6323], founded: 2019, website: "https://www.artiria-medical.com", neurofoundersSlug: "artiria-medical" }),
  expansionCompany({ slug: "atlas-wearable", name: "Atlas", category: "non-invasive", region: "north-america", modality: "Behind-the-ear EEG wearable", targetFunction: "Readiness, focus, and cognitive-signal monitoring in real-world settings", stage: "Early consumer neurotech wearable", evidenceLevel: "E1", hq: ["Austin, TX", "United States", 30.2672, -97.7431], founded: 2025, website: "https://www.atlaswearable.com", neurofoundersSlug: "atlas" }),
  expansionCompany({ slug: "aural-analytics", name: "Aural Analytics", category: "non-invasive", region: "north-america", modality: "Speech analytics and digital neurological biomarkers", targetFunction: "Non-invasive neurological assessment and monitoring from speech", stage: "Clinical-grade speech-biomarker company", evidenceLevel: "E2", hq: ["Scottsdale, AZ", "United States", 33.4942, -111.9261], founded: 2015, website: "https://auralanalytics.com", neurofoundersSlug: "aural-analytics" }),
  expansionCompany({ slug: "awear", name: "AWEAR", category: "non-invasive", region: "north-america", modality: "Ear-worn EEG wearable and AI wellness software", targetFunction: "Brainwave tracking, stress insights, and emotional-wellness monitoring", stage: "Non-medical consumer EEG wearable", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2023, website: "https://aweartech.com", neurofoundersSlug: "awear" }),
  expansionCompany({ slug: "axoft", name: "Axoft", category: "invasive", region: "north-america", modality: "Ultrasoft implantable neural interfaces with high electrode density", targetFunction: "Long-term high-density neural communication for future BCI and therapeutic applications", stage: "Preclinical/investigational implantable BCI company", evidenceLevel: "E1", hq: ["Cambridge, MA", "United States", 42.3736, -71.1097], founded: 2021, website: "https://axoft.us/", neurofoundersSlug: "axoft" }),
  expansionCompany({ slug: "axorus", name: "Axorus", category: "non-invasive", region: "europe", modality: "Photoacoustic visual prosthesis using contact lens and laser-glasses system", targetFunction: "Non-invasive vision restoration for degenerative blindness", stage: "Preclinical visual-prosthesis company", evidenceLevel: "E1", hq: ["Paris", "France", 48.8566, 2.3522], founded: 2019, website: "https://www.axorus.com/", neurofoundersSlug: "axorus" }),
  expansionCompany({ slug: "beacon-biosignals", name: "Beacon Biosignals", category: "non-invasive", region: "north-america", modality: "Sleep EEG capture, AI biomarkers, and clinical-trial data infrastructure", targetFunction: "Precision neuroscience clinical-trial endpoints and EEG biomarker analytics", stage: "FDA-cleared EEG infrastructure company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Boston, MA", "United States", 42.3601, -71.0589], founded: 2019, website: "https://beacon.bio", neurofoundersSlug: "beacon-biosignals" }),
  expansionCompany({ slug: "bia-neuroscience", name: "Bia Neuroscience", category: "non-invasive", region: "north-america", modality: "fNIRS sleep mask with audio neurofeedback", targetFunction: "Sleep monitoring and neurofeedback-guided sleep support", stage: "Consumer neurotech sleep platform", evidenceLevel: "E1", hq: ["Montreal", "Canada", 45.5019, -73.5674], founded: 2021, website: "https://getbia.com", neurofoundersSlug: "bia-neuroscience" }),
  expansionCompany({ slug: "biological-input-output-systems", name: "Biological Input Output Systems", category: "minimally-invasive", region: "north-america", modality: "Implantable peripheral neural interface for bidirectional device communication", targetFunction: "Movement and sensation restoration through nervous-system input/output interfaces", stage: "Investigational implantable universal neural-interface company", evidenceLevel: "E1", hq: ["Cambridge, MA", "United States", 42.3736, -71.1097], founded: 2021, website: "https://www.biologicinputoutputsystems.com/", neurofoundersSlug: "biological-input-output-systems" }),
  expansionCompany({ slug: "bioserenity", name: "BioSerenity", category: "non-invasive", region: "europe", modality: "Ambulatory EEG and connected neurology diagnostic devices", targetFunction: "Remote EEG acquisition, diagnostics, and clinical monitoring", stage: "Commercial connected neurology diagnostics company listed as FDA-cleared by NeuroFounders", evidenceLevel: "E6", hq: ["Paris", "France", 48.8566, 2.3522], founded: 2014, website: "https://www.bioserenity.com/", neurofoundersSlug: "bioserenity" }),
  expansionCompany({ slug: "bios-health", name: "BIOS Health", category: "minimally-invasive", region: "europe", modality: "Peripheral neural data interpretation and closed-loop bioelectronic software", targetFunction: "Precision medicine from nervous-system signals and future bioelectronic therapies", stage: "Research/developer neural-interface infrastructure company", evidenceLevel: "E1", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2015, website: "https://www.bios.health", neurofoundersSlug: "bios-health" }),
  expansionCompany({ slug: "bottneuro", name: "Bottneuro", category: "non-invasive", region: "europe", modality: "Personalized transcranial electrical stimulation system", targetFunction: "Home-based cognitive and neurological-disorder treatment support", stage: "Investigational non-invasive neuromodulation company", evidenceLevel: "E1", hq: ["Basel", "Switzerland", 47.5596, 7.5886], founded: 2021, website: "http://www.bottneuro.ch", neurofoundersSlug: "bottneuro" }),
  expansionCompany({ slug: "brainbit", name: "BrainBit", category: "non-invasive", region: "north-america", modality: "Wearable dry-electrode EEG, EMG, ECG devices and SDKs", targetFunction: "Neurofeedback, brain-state monitoring, and biosignal app development", stage: "Commercial non-medical biosensing hardware and SDK company", evidenceLevel: "E2", hq: ["New York, NY", "United States", 40.7128, -74.006], founded: 2015, website: "https://brainbit.com", neurofoundersSlug: "brainbit" }),
  expansionCompany({ slug: "braincapture", name: "BrainCapture", category: "non-invasive", region: "europe", modality: "Portable EEG and telemedicine software", targetFunction: "Remote epilepsy detection and ambulatory neurological diagnostics", stage: "CE-marked portable EEG diagnostics company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Copenhagen", "Denmark", 55.6761, 12.5683], founded: 2019, website: "https://braincapture.dk", neurofoundersSlug: "braincapture" }),
  expansionCompany({ slug: "braincheck", name: "BrainCheck", category: "non-invasive", region: "north-america", modality: "Software-based cognitive assessment platform", targetFunction: "Rapid cognitive screening, monitoring, and diagnostic support", stage: "FDA-cleared digital cognitive-assessment company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Houston, TX", "United States", 29.7604, -95.3698], founded: 2014, website: "https://www.braincheck.com/", neurofoundersSlug: "braincheck" }),
  expansionCompany({ slug: "brainkey", name: "BrainKey", category: "non-invasive", region: "north-america", modality: "MRI visualization and brain-health insight software", targetFunction: "Consumer-facing MRI interpretation, brain-age visualization, and lifestyle insights", stage: "Non-medical neuroimaging software company", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2018, website: "https://www.brainkey.ai", neurofoundersSlug: "brainkey" }),
  expansionCompany({ slug: "brainomix", name: "Brainomix", category: "non-invasive", region: "europe", modality: "AI neuroimaging software for stroke and neurological conditions", targetFunction: "Rapid standardized brain-scan analysis and treatment-decision support", stage: "FDA-cleared/CE-marked neuroimaging software profile listed by NeuroFounders", evidenceLevel: "E6", hq: ["Oxford", "United Kingdom", 51.752, -1.2577], founded: 2010, website: "https://www.brainomix.com/", neurofoundersSlug: "brainomix" }),
  expansionCompany({ slug: "brainpatch", name: "BrainPatch", category: "non-invasive", region: "europe", modality: "Non-invasive neurostimulation headset", targetFunction: "Meditation-state induction, stress reduction, and wellness neurotechnology", stage: "Non-medical consumer neurostimulation company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2018, website: "https://brainpatch.ai//", neurofoundersSlug: "brainpatch" }),
  expansionCompany({ slug: "brainphonics", name: "Brainphonics", category: "non-invasive", region: "europe", modality: "EEG-based auditory brain-response assessment software", targetFunction: "Objective hearing assessment from neural responses to speech and everyday sounds", stage: "Investigational EEG diagnostics company", evidenceLevel: "E1", hq: ["Leuven", "Belgium", 50.8798, 4.7005], founded: 2024, website: "https://brainphonics.com", neurofoundersSlug: "brainphonics" }),
  expansionCompany({ slug: "brainquant", name: "Brainquant", category: "non-invasive", region: "europe", modality: "MRI software and brain-volume quantification", targetFunction: "Dementia and cognitive-impairment neuroimaging analytics", stage: "Preclinical/early neuroimaging software company", evidenceLevel: "E1", hq: ["Zurich", "Switzerland", 47.3769, 8.5417], founded: 2025, website: "https://www.brainquant.ch", neurofoundersSlug: "brainquant" }),
  expansionCompany({ slug: "brainscan-ai", name: "BrainScan", category: "non-invasive", region: "europe", modality: "AI brain CT/MRI image analysis software", targetFunction: "Neurological image triage and decision support", stage: "CE-marked neuroimaging software listed by NeuroFounders", evidenceLevel: "E6", hq: ["Gdansk", "Poland", 54.352, 18.6466], founded: 2016, website: "https://www.brainscan.ai/", neurofoundersSlug: "brainscan" }),
  expansionCompany({ slug: "brainscope", name: "BrainScope", category: "non-invasive", region: "north-america", modality: "EEG-based head-injury assessment device and software", targetFunction: "Concussion and traumatic-brain-injury assessment support", stage: "FDA-cleared EEG head-injury assessment company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Bethesda, MD", "United States", 38.9847, -77.0947], founded: 2006, website: "https://www.brainscope.com/", neurofoundersSlug: "brainscope" }),
  expansionCompany({ slug: "braintrip", name: "BrainTrip", category: "non-invasive", region: "europe", modality: "EEG dementia-screening software", targetFunction: "Cognitive impairment and dementia screening from EEG markers", stage: "CE-marked EEG diagnostic software profile listed by NeuroFounders", evidenceLevel: "E6", hq: ["Ljubljana", "Slovenia", 46.0569, 14.5058], founded: 2019, website: "https://braintrip.net/", neurofoundersSlug: "braintrip" }),
  expansionCompany({ slug: "brnlit-ai", name: "BRNLIT AI", category: "non-invasive", region: "europe", modality: "Light/sound software for cognitive and wellness applications", targetFunction: "Consumer wellness and light/sound-guided mental-state support", stage: "Early non-medical consumer neurotech software company", evidenceLevel: "E1", hq: ["Zurich", "Switzerland", 47.3769, 8.5417], founded: 2025, website: "https://www.brnlit.ai/en", neurofoundersSlug: "brnlit-ai" }),
  expansionCompany({ slug: "cadence-neuroscience", name: "Cadence Neuroscience", category: "minimally-invasive", region: "north-america", modality: "Implantable multimodal epilepsy neuromodulation system", targetFunction: "Epilepsy detection and responsive therapy development", stage: "Investigational implantable epilepsy neuromodulation company", evidenceLevel: "E1", hq: ["Redmond, WA", "United States", 47.674, -122.1215], founded: 2017, website: "https://www.cadenceneuro.com", neurofoundersSlug: "cadence-neuroscience" }),
  expansionCompany({ slug: "cahira-technologies", name: "Cahira Technologies", category: "minimally-invasive", region: "north-america", modality: "Minimally invasive neural-interface technology", targetFunction: "Early-stage BCI and neuromodulation interface development", stage: "Preclinical company profile with limited public technical detail", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2025, website: "https://www.linkedin.com/company/cahiratech/", neurofoundersSlug: "cahira-technologies" }),
  expansionCompany({ slug: "cala-health", name: "Cala Health", category: "non-invasive", region: "north-america", modality: "Peripheral nerve stimulation wearable", targetFunction: "Essential tremor and Parkinsonian tremor neuromodulation", stage: "Commercial FDA-cleared neuromodulation company listed by NeuroFounders", evidenceLevel: "E6", hq: ["San Mateo, CA", "United States", 37.563, -122.3255], founded: 2014, website: "https://calahealth.com", neurofoundersSlug: "cala-health" }),
  expansionCompany({ slug: "cambridge-cognition", name: "Cambridge Cognition", category: "non-invasive", region: "europe", modality: "Digital cognitive biomarkers and clinical-assessment software", targetFunction: "Cognitive assessment in clinical trials and healthcare workflows", stage: "Commercial digital cognitive-assessment platform listed as FDA-cleared by NeuroFounders", evidenceLevel: "E6", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2002, website: "https://cambridgecognition.com", neurofoundersSlug: "cambridge-cognition" }),
  expansionCompany({ slug: "cambridge-neurotech", name: "Cambridge NeuroTech", category: "minimally-invasive", region: "europe", modality: "Silicon neural probes and electrophysiology infrastructure", targetFunction: "Research neural recording tools for neuroscience and BCI-enabling studies", stage: "Research-only neural probe and recording technology company", evidenceLevel: "E2", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2013, website: "https://www.cambridgeneurotech.com", neurofoundersSlug: "cambridge-neurotech" }),
  expansionCompany({ slug: "capri-medical", name: "Capri Medical", category: "minimally-invasive", region: "europe", modality: "Peripheral nerve stimulation implant for chronic pain", targetFunction: "Minimally invasive pain neuromodulation", stage: "Investigational neuromodulation company", evidenceLevel: "E1", hq: ["Galway", "Ireland", 53.2707, -9.0568], founded: 2018, website: "https://www.capri-medical.com/", neurofoundersSlug: "capri-medical" }),
  expansionCompany({ slug: "carthera", name: "Carthera", category: "minimally-invasive", region: "europe", modality: "Implantable ultrasound system for blood-brain-barrier opening", targetFunction: "Drug-delivery support for brain tumors and neurological conditions", stage: "Investigational implantable ultrasound platform", evidenceLevel: "E1", hq: ["Paris", "France", 48.8566, 2.3522], founded: 2010, website: "https://carthera.eu", neurofoundersSlug: "carthera" }),
  expansionCompany({ slug: "cefaly", name: "Cefaly", category: "non-invasive", region: "europe", modality: "External trigeminal nerve stimulation wearable", targetFunction: "Migraine prevention and acute treatment neuromodulation", stage: "Commercial FDA-cleared migraine neuromodulation company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Liege", "Belgium", 50.6326, 5.5797], founded: 2004, website: "https://www.cefaly.com", neurofoundersSlug: "cefaly" }),
  expansionCompany({ slug: "cerca-magnetics", name: "Cerca Magnetics", category: "non-invasive", region: "europe", modality: "Wearable optically pumped magnetometer MEG systems", targetFunction: "Non-invasive brain imaging for research and clinical translation", stage: "Research-only wearable MEG company", evidenceLevel: "E2", hq: ["Nottingham", "United Kingdom", 52.9548, -1.1581], founded: 2020, website: "https://www.cercamagnetics.com", neurofoundersSlug: "cerca-magnetics" }),
  expansionCompany({ slug: "cercare-medical", name: "Cercare Medical", category: "non-invasive", region: "europe", modality: "CT/MRI perfusion and neuroimaging decision-support software", targetFunction: "Stroke and neurological image analysis", stage: "CE-marked neuroimaging software company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Aarhus", "Denmark", 56.1629, 10.2039], founded: 2013, website: "https://cercare-medical.com", neurofoundersSlug: "cercare-medical" }),
  expansionCompany({ slug: "cerebriu", name: "Cerebriu", category: "non-invasive", region: "europe", modality: "MRI workflow and AI neuroimaging software", targetFunction: "Fast brain MRI decision support, stroke workflows, and scan optimization", stage: "CE-marked neuroimaging software company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Copenhagen", "Denmark", 55.6761, 12.5683], founded: 2018, website: "https://www.cerebriu.com", neurofoundersSlug: "cerebriu" }),
  expansionCompany({ slug: "ceregate", name: "CereGate", category: "minimally-invasive", region: "europe", modality: "Software-mediated neuromodulation and DBS programming", targetFunction: "Parkinson's and neurological symptom control through adaptive stimulation software", stage: "Investigational software neuromodulation company", evidenceLevel: "E1", hq: ["Munich", "Germany", 48.1351, 11.582], founded: 2019, website: "https://www.ceregate.com/", neurofoundersSlug: "ceregate" }),
  expansionCompany({ slug: "cerevia-neurosciences", name: "Cerevia Neurosciences", category: "non-invasive", region: "north-america", modality: "Transcranial magnetic stimulation for cognitive impairment", targetFunction: "Dementia and cognitive-impairment neuromodulation research", stage: "Preclinical non-invasive neuromodulation company", evidenceLevel: "E1", hq: ["Boston, MA", "United States", 42.3601, -71.0589], founded: 2025, website: "https://cerevia.care", neurofoundersSlug: "cerevia-neurosciences" }),
  expansionCompany({ slug: "ceribell", name: "Ceribell", category: "non-invasive", region: "north-america", modality: "Rapid-response EEG headset and seizure-detection software", targetFunction: "Point-of-care seizure detection and epilepsy monitoring", stage: "Commercial FDA-cleared EEG diagnostics company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Sunnyvale, CA", "United States", 37.3688, -122.0363], founded: 2014, website: "https://www.ceribell.com/", neurofoundersSlug: "ceribell" }),
  expansionCompany({ slug: "charco-neurotech", name: "Charco Neurotech", category: "non-invasive", region: "europe", modality: "Wearable vibrotactile stimulation for Parkinson's symptoms", targetFunction: "Parkinson's symptom-management neuromodulation and movement support", stage: "CE-marked non-invasive neuromodulation company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2019, website: "https://charconeurotech.com/", neurofoundersSlug: "charco-neurotech" }),
  expansionCompany({ slug: "cionic", name: "Cionic", category: "non-invasive", region: "north-america", modality: "Wearable functional electrical stimulation and gait-assistance system", targetFunction: "Mobility assistance and neurorehabilitation for neurological movement disorders", stage: "FDA-cleared wearable mobility neuromodulation company listed by NeuroFounders", evidenceLevel: "E6", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2018, website: "http://cionic.com", neurofoundersSlug: "cionic" }),
  expansionCompany({ slug: "clarity-technologies", name: "Clarity Technologies", category: "non-invasive", region: "north-america", modality: "Light/sound neuromodulation platform", targetFunction: "Non-invasive neuromodulation for dementia and cognitive impairment", stage: "Investigational light/sound neuromodulation company", evidenceLevel: "E1", hq: ["Boston, MA", "United States", 42.3601, -71.0589], founded: 2022, website: "https://www.clarity-technologies.com/", neurofoundersSlug: "clarity" }),
  expansionCompany({ slug: "clee-medical", name: "Clee Medical", category: "minimally-invasive", region: "europe", modality: "Minimally invasive neurotechnology tools", targetFunction: "Procedure support and neural-interface infrastructure", stage: "Preclinical minimally invasive tools company with limited public detail", evidenceLevel: "E1", hq: ["Lausanne", "Switzerland", 46.5197, 6.6323], founded: 2024, website: "https://www.cleemedical.com/", neurofoundersSlug: "clee-medical" }),
  expansionCompany({ slug: "coapt", name: "Coapt", category: "non-invasive", region: "north-america", modality: "EMG pattern-recognition control systems", targetFunction: "Advanced upper-limb prosthetic control and rehabilitation interfaces", stage: "Commercial FDA-cleared prosthetic-control infrastructure company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Chicago, IL", "United States", 41.8781, -87.6298], founded: 2012, website: "https://coaptengineering.com/", neurofoundersSlug: "coapt" }),
  expansionCompany({ slug: "cogitat", name: "Cogitat", category: "non-invasive", region: "europe", modality: "EEG decoding software and BCI data infrastructure", targetFunction: "Hardware-agnostic brain-signal interpretation for BCI applications", stage: "Early BCI software/data company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2020, website: "https://cogitat.io/", neurofoundersSlug: "cogitat" }),
  expansionCompany({ slug: "cognision", name: "Cognision", category: "non-invasive", region: "north-america", modality: "EEG/ERP cognitive assessment software", targetFunction: "Dementia and cognitive-impairment assessment support", stage: "FDA-cleared EEG neuroimaging software profile listed by NeuroFounders", evidenceLevel: "E6", hq: ["Pittsburgh, PA", "United States", 40.4406, -79.9959], founded: 2004, website: "https://www.cognision.com/", neurofoundersSlug: "cognision" }),
  expansionCompany({ slug: "cognito-therapeutics", name: "Cognito Therapeutics", category: "non-invasive", region: "north-america", modality: "Light/sound gamma-frequency neuromodulation", targetFunction: "Alzheimer's and cognitive-impairment neuromodulation therapy development", stage: "Investigational clinical-stage neuromodulation company", evidenceLevel: "E3", hq: ["Cambridge, MA", "United States", 42.3736, -71.1097], founded: 2016, website: "https://www.cognitotx.com", neurofoundersSlug: "cognito-therapeutics" }),
  expansionCompany({ slug: "cognoa", name: "Cognoa", category: "non-invasive", region: "north-america", modality: "Software-based neurodevelopmental diagnostic support", targetFunction: "Autism and pediatric neurodevelopmental assessment workflows", stage: "Other-approval digital diagnostic company listed by NeuroFounders", evidenceLevel: "E6", hq: ["Palo Alto, CA", "United States", 37.4419, -122.143], founded: 2013, website: "https://cognoa.com", neurofoundersSlug: "cognoa" }),
  expansionCompany({ slug: "cogwear", name: "Cogwear", category: "non-invasive", region: "north-america", modality: "Wearable EEG and cognitive-state analytics", targetFunction: "Research-grade real-world EEG monitoring and cognitive-state tracking", stage: "Research-only wearable EEG infrastructure company", evidenceLevel: "E1", hq: ["Philadelphia, PA", "United States", 39.9526, -75.1652], founded: 2019, website: "https://www.cogweartech.com/", neurofoundersSlug: "cogwear" }),
  expansionCompany({ slug: "coherence-neuro", name: "Coherence Neuro", category: "minimally-invasive", region: "europe", modality: "Implantable neuromodulation for brain tumor care", targetFunction: "Tumor-oriented neuromodulation and neural-interface therapy development", stage: "Investigational implantable neuromodulation company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2022, website: "https://coherenceneuro.com", neurofoundersSlug: "coherence-neuro" }),
  expansionCompany({ slug: "comind", name: "CoMind", category: "non-invasive", region: "europe", modality: "Optical non-invasive brain monitoring", targetFunction: "Brain health monitoring and clinical neuroimaging workflows", stage: "Investigational non-invasive neuroimaging company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2018, website: "https://www.comind.io/", neurofoundersSlug: "comind" }),
  expansionCompany({ slug: "connectoma-neurotech", name: "Connectoma Neurotech", category: "non-invasive", region: "europe", modality: "TMS and computational neuromodulation software", targetFunction: "Personalized psychiatry neuromodulation", stage: "Early non-invasive neuromodulation company", evidenceLevel: "E1", hq: ["Barcelona", "Spain", 41.3874, 2.1686], founded: 2024, website: "https://www.connectoma.com", neurofoundersSlug: "connectoma-neurotech" }),
  expansionCompany({ slug: "connectome-health", name: "Connectome Health", category: "non-invasive", region: "europe", modality: "fNIRS consumer brain-health wearable/software", targetFunction: "General brain-health monitoring and consumer neurotech insights", stage: "Non-medical consumer fNIRS neurotech company", evidenceLevel: "E1", hq: ["Zurich", "Switzerland", 47.3769, 8.5417], founded: 2024, website: "https://www.connectome.health", neurofoundersSlug: "connectome-health" }),
  expansionCompany({ slug: "cordance-medical", name: "Cordance Medical", category: "non-invasive", region: "north-america", modality: "Non-invasive ultrasound neuromodulation", targetFunction: "Therapeutic ultrasound neuromodulation for multiple neurological indications", stage: "Preclinical non-invasive ultrasound neuromodulation company", evidenceLevel: "E1", hq: ["Mountain View, CA", "United States", 37.3861, -122.0839], founded: 2018, website: "https://www.cordancemedical.com/", neurofoundersSlug: "cordance-medical" }),
  expansionCompany({ slug: "cortec", name: "CorTec", category: "minimally-invasive", region: "europe", modality: "Implantable ECoG and closed-loop neurotechnology platform", targetFunction: "Neural recording/stimulation infrastructure for rehabilitation and BCI research", stage: "Investigational implantable BCI-enabling platform company", evidenceLevel: "E2", hq: ["Freiburg", "Germany", 47.999, 7.8421], founded: 2010, website: "https://cortec-neuro.com/", neurofoundersSlug: "cortec" }),
  expansionCompany({ slug: "corticale", name: "Corticale", category: "minimally-invasive", region: "europe", modality: "ECoG neural recording and stimulation interfaces", targetFunction: "Communication BCI and cortical-interface research infrastructure", stage: "Research-only implantable BCI company", evidenceLevel: "E1", hq: ["Genoa", "Italy", 44.4056, 8.9463], founded: 2021, website: "https://www.corticale.com/", neurofoundersSlug: "corticale" }),

  // Europe expansion: official product or technology page is linked for every profile.
  expansionCompany({ slug: "neuroelectrics", name: "Neuroelectrics", category: "non-invasive", region: "europe", modality: "Personalized EEG, HD-tES, and closed-loop brain stimulation platform", targetFunction: "Research and clinical translation of EEG-guided non-invasive neuromodulation", stage: "Commercial neurotechnology platform; separate therapeutic efficacy claims require indication-specific evidence", evidenceLevel: "E2", hq: ["Barcelona", "Spain", 41.3874, 2.1686], founded: 2011, website: "https://www.neuroelectrics.com/technology/" }),
  expansionCompany({ slug: "cortivis", name: "Cortivis", category: "minimally-invasive", region: "europe", modality: "High-channel-count neural interfaces and implantable BCI systems", targetFunction: "Cortical signal recording for assistive control and neuroscience research", stage: "Early implantable BCI company; public technical claims are tracked as company evidence", evidenceLevel: "E1", hq: ["Madrid", "Spain", 40.4168, -3.7038], founded: 2019, website: "https://cortivis.com/" }),
  expansionCompany({ slug: "time-is-brain", name: "Time is Brain", category: "non-invasive", region: "europe", modality: "Portable brain-monitoring technology for acute stroke workflows", targetFunction: "Faster stroke triage through non-invasive cerebral monitoring", stage: "Clinical neurodiagnostic company; utility depends on prospective workflow and outcome evidence", evidenceLevel: "E1", hq: ["Barcelona", "Spain", 41.3874, 2.1686], founded: 2020, website: "https://timeisbrain.com/" }),
  expansionCompany({ slug: "corify-care", name: "Corify Care", category: "non-invasive", region: "europe", modality: "Non-invasive electrocardiographic imaging and signal analysis", targetFunction: "Cardiac electrophysiology mapping; adjacent bioelectric-signal infrastructure rather than a BCI", stage: "Commercial clinical signal-mapping company", evidenceLevel: "E2", hq: ["Madrid", "Spain", 40.4168, -3.7038], founded: 2017, website: "https://corify.care/" }),
  expansionCompany({ slug: "starlab-neuroscience", name: "Starlab", category: "non-invasive", region: "europe", modality: "EEG neurotechnology, neurofeedback, and brain-data services", targetFunction: "Brain-state measurement and applied neurotechnology research", stage: "Long-running European neurotechnology company", evidenceLevel: "E2", hq: ["Barcelona", "Spain", 41.3874, 2.1686], founded: 2000, website: "https://www.starlabgroup.com/" }),
  expansionCompany({ slug: "neuromod-devices", name: "Neuromod Devices", category: "non-invasive", region: "europe", modality: "Bimodal neuromodulation combining sound and tongue stimulation", targetFunction: "Tinnitus treatment through prescribed non-invasive neuromodulation", stage: "Commercial medical-device company with indication-specific regulatory and clinical evidence to be tracked separately", evidenceLevel: "E2", hq: ["Dublin", "Ireland", 53.3498, -6.2603], founded: 2010, website: "https://www.neuromoddevices.com/" }),
  expansionCompany({ slug: "neurosoft-bioelectronics", name: "Neurosoft Bioelectronics", category: "minimally-invasive", region: "europe", modality: "Soft implantable cortical interfaces for recording and stimulation", targetFunction: "High-resolution neural recording for epilepsy, neuroprosthetics, and BCI research", stage: "Implantable neuroelectronics company with research and clinical translation programs", evidenceLevel: "E2", hq: ["Paris", "France", 48.8566, 2.3522], founded: 2018, website: "https://neurosoft-bio.com/" }),
  expansionCompany({ slug: "quantalx-neuroscience", name: "QuantalX Neuroscience", category: "non-invasive", region: "europe", modality: "EEG-based cognitive assessment and biomarker software", targetFunction: "Objective cognitive-function assessment for neurological disease and clinical trials", stage: "Commercial neurodiagnostic software company", evidenceLevel: "E2", hq: ["Paris", "France", 48.8566, 2.3522], founded: 2018, website: "https://quantalx.com/" }),
  expansionCompany({ slug: "bioinduction", name: "Bioinduction", category: "minimally-invasive", region: "europe", modality: "Miniaturized wireless neuromodulation implants", targetFunction: "Closed-loop neural sensing and stimulation for chronic neurological conditions", stage: "Implantable neurotechnology company with investigational programs", evidenceLevel: "E1", hq: ["Bristol", "United Kingdom", 51.4545, -2.5879], founded: 2012, website: "https://www.bioinduction.com/" }),
  expansionCompany({ slug: "nia-therapeutics", name: "Nia Therapeutics", category: "minimally-invasive", region: "europe", modality: "Closed-loop brain stimulation for memory-network modulation", targetFunction: "Cognitive restoration research through responsive neuromodulation", stage: "Clinical-stage neurostimulation company", evidenceLevel: "E2", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2019, website: "https://niatherapeutics.com/" }),
  expansionCompany({ slug: "magstim", name: "Magstim", category: "non-invasive", region: "europe", modality: "Transcranial magnetic stimulation systems", targetFunction: "Clinical and research TMS for neuropsychiatric and neurophysiology applications", stage: "Established TMS device manufacturer", evidenceLevel: "E2", hq: ["Whitland", "United Kingdom", 51.8221, -4.6144], founded: 1990, website: "https://www.magstim.com/" }),
  expansionCompany({ slug: "nurokor", name: "NuroKor", category: "non-invasive", region: "europe", modality: "Wearable electrical neurostimulation systems", targetFunction: "At-home neuromodulation and rehabilitation support", stage: "Commercial consumer and clinical-adjacent stimulation company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2016, website: "https://nurokor.com/" }),
  expansionCompany({ slug: "brainwavebank", name: "BrainWaveBank", category: "non-invasive", region: "europe", modality: "EEG analytics and personalized digital neurotherapy platform", targetFunction: "Brain-state measurement and mental-health support research", stage: "Early digital neurotechnology company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2018, website: "https://brainwavebank.com/" }),
  expansionCompany({ slug: "renishaw-neuro-solutions", name: "Renishaw Neuro Solutions", category: "minimally-invasive", region: "europe", modality: "Neurosurgical robotics, stereotactic systems, and implantable neural-interface tools", targetFunction: "Precise neural implant placement and translational neuroscience infrastructure", stage: "Established neurotechnology infrastructure supplier", evidenceLevel: "E2", hq: ["Wotton-under-Edge", "United Kingdom", 51.6328, -2.3451], founded: 1973, website: "https://www.renishaw.com/en/neuro-solutions--27864" }),
  expansionCompany({ slug: "sinaptica-therapeutics", name: "Sinaptica Therapeutics", category: "non-invasive", region: "europe", modality: "Personalized non-invasive TMS neuromodulation", targetFunction: "Alzheimer's disease and cognitive-impairment therapy development", stage: "Clinical-stage non-invasive neuromodulation company", evidenceLevel: "E3", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2016, website: "https://sinapticatx.com/" }),
  expansionCompany({ slug: "galvani-bioelectronics", name: "Galvani Bioelectronics", category: "minimally-invasive", region: "europe", modality: "Peripheral-nerve bioelectronic medicine and neuromodulation", targetFunction: "Treating chronic disease through targeted neural signals", stage: "Bioelectronic-medicine company; not a cortical BCI", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2016, website: "https://www.galvani.bio/" }),
  expansionCompany({ slug: "gripable", name: "GripAble", category: "non-invasive", region: "europe", modality: "Sensorized hand-rehabilitation device and software", targetFunction: "Stroke and neurological upper-limb rehabilitation measurement and therapy", stage: "Commercial digital rehabilitation company", evidenceLevel: "E2", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2018, website: "https://gripable.co/" }),
  expansionCompany({ slug: "neurofenix", name: "Neurofenix", category: "non-invasive", region: "europe", modality: "Home-based stroke rehabilitation device and digital therapy", targetFunction: "Upper-limb recovery and remote neurorehabilitation after stroke", stage: "Commercial rehabilitation-technology company", evidenceLevel: "E2", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2016, website: "https://www.neurofenix.com/" }),
  expansionCompany({ slug: "myndplay", name: "MyndPlay", category: "non-invasive", region: "europe", modality: "EEG neurofeedback and brain-computer interface software", targetFunction: "Brain-state training, attention research, and non-invasive BCI interaction", stage: "Commercial EEG/neurofeedback company", evidenceLevel: "E1", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 2009, website: "https://myndplay.com/" }),
  expansionCompany({ slug: "tmsi", name: "TMSi", category: "non-invasive", region: "europe", modality: "Research-grade EEG, EMG, and biosignal acquisition systems", targetFunction: "Neuroscience, BCI, and clinical-research signal capture", stage: "Established neurophysiology hardware company", evidenceLevel: "E2", hq: ["Oldenzaal", "Netherlands", 52.3139, 6.9292], founded: 1998, website: "https://www.tmsi.com/" }),
  expansionCompany({ slug: "ant-neuro", name: "ANT Neuro", category: "non-invasive", region: "europe", modality: "EEG, MEG, TMS navigation, and neuroimaging systems", targetFunction: "Research and clinical neurophysiology infrastructure", stage: "Established neuroscience technology supplier", evidenceLevel: "E2", hq: ["Hengelo", "Netherlands", 52.265, 6.793], founded: 1997, website: "https://www.ant-neuro.com/" }),
  expansionCompany({ slug: "mindaffect", name: "MindAffect", category: "non-invasive", region: "europe", modality: "EEG-based communication BCI and attention-decoding software", targetFunction: "Accessible computer control and communication interfaces", stage: "Commercial non-invasive BCI company", evidenceLevel: "E2", hq: ["Eindhoven", "Netherlands", 51.4416, 5.4697], founded: 2018, website: "https://mindaffect.nl/" }),
  expansionCompany({ slug: "salvia-bioelectronics", name: "Salvia BioElectronics", category: "minimally-invasive", region: "europe", modality: "Implantable peripheral-nerve stimulation for migraine", targetFunction: "Neuromodulation therapy for chronic migraine", stage: "Clinical-stage implantable bioelectronics company", evidenceLevel: "E2", hq: ["Eindhoven", "Netherlands", 51.4416, 5.4697], founded: 2017, website: "https://salvianeuro.com/" }),
  expansionCompany({ slug: "artinis-medical-systems", name: "Artinis Medical Systems", category: "non-invasive", region: "europe", modality: "fNIRS and diffuse optical brain-monitoring systems", targetFunction: "Functional brain and muscle monitoring for research and clinical studies", stage: "Established optical-neuroimaging supplier", evidenceLevel: "E2", hq: ["Elst", "Netherlands", 51.9192, 5.8422], founded: 2002, website: "https://www.artinis.com/" }),
  expansionCompany({ slug: "noldus", name: "Noldus Information Technology", category: "non-invasive", region: "europe", modality: "Behavioral research, eye-tracking, and human-observation technology", targetFunction: "Quantifying behavior and cognitive interaction in neuroscience research", stage: "Established research-technology company", evidenceLevel: "E2", hq: ["Wageningen", "Netherlands", 51.9692, 5.6654], founded: 1989, website: "https://www.noldus.com/" }),
  expansionCompany({ slug: "nemo-healthcare", name: "NEMO Healthcare", category: "non-invasive", region: "europe", modality: "Non-invasive electrophysiology monitoring and AI signal analysis", targetFunction: "Prenatal and clinical monitoring; adjacent biosignal technology rather than BCI control", stage: "Commercial clinical-monitoring company", evidenceLevel: "E2", hq: ["Veldhoven", "Netherlands", 51.418, 5.406], founded: 2011, website: "https://nemohealthcare.com/" }),
  expansionCompany({ slug: "mindmaze", name: "MindMaze", category: "non-invasive", region: "europe", modality: "Digital neurorehabilitation, motion sensing, and neuroimaging-informed therapy", targetFunction: "Stroke and neurological recovery assessment and rehabilitation", stage: "Commercial neurorehabilitation company", evidenceLevel: "E2", hq: ["Lausanne", "Switzerland", 46.5197, 6.6323], founded: 2012, website: "https://www.mindmaze.com/" }),
  expansionCompany({ slug: "precisis", name: "Precisis", category: "minimally-invasive", region: "europe", modality: "Minimally invasive cortical stimulation system", targetFunction: "Epilepsy neuromodulation and seizure management", stage: "Implantable neurostimulation company", evidenceLevel: "E2", hq: ["Heidelberg", "Germany", 49.3988, 8.6724], founded: 2014, website: "https://precisis.de/" }),
  expansionCompany({ slug: "brain-products", name: "Brain Products", category: "non-invasive", region: "europe", modality: "EEG, fNIRS, and psychophysiology research hardware and software", targetFunction: "High-quality brain-signal acquisition for neuroscience and BCI research", stage: "Established neurophysiology technology supplier", evidenceLevel: "E2", hq: ["Gilching", "Germany", 48.107, 11.299], founded: 1997, website: "https://www.brainproducts.com/" }),
  expansionCompany({ slug: "nirx", name: "NIRx", category: "non-invasive", region: "europe", modality: "Functional near-infrared spectroscopy brain-imaging systems", targetFunction: "Portable optical neuroimaging for cognitive and BCI research", stage: "Established fNIRS technology company", evidenceLevel: "E2", hq: ["Berlin", "Germany", 52.52, 13.405], founded: 2008, website: "https://nirx.de/" }),
  expansionCompany({ slug: "implex", name: "Implex", category: "minimally-invasive", region: "europe", modality: "Long-term EEG monitoring implants and epilepsy systems", targetFunction: "Continuous seizure recording and epilepsy-management evidence generation", stage: "Implantable neurodiagnostic company", evidenceLevel: "E2", hq: ["Munich", "Germany", 48.1351, 11.582], founded: 2017, website: "https://implex-medical.com/" }),
  expansionCompany({ slug: "neurocare-group", name: "neurocare group", category: "non-invasive", region: "europe", modality: "EEG, neurofeedback, and brain-stimulation services", targetFunction: "Personalized mental-health assessment and neuromodulation support", stage: "Commercial neurocare provider", evidenceLevel: "E1", hq: ["Munich", "Germany", 48.1351, 11.582], founded: 2000, website: "https://www.neurocaregroup.com/" }),
  expansionCompany({ slug: "gtec-medical-engineering", name: "g.tec medical engineering", category: "non-invasive", region: "europe", modality: "EEG, ECoG, BCI spellers, and rehabilitation systems", targetFunction: "Non-invasive and invasive BCI research, communication, and neurorehabilitation", stage: "Established BCI hardware and software company", evidenceLevel: "E2", hq: ["Schiedlberg", "Austria", 48.093, 14.264], founded: 1999, website: "https://www.gtec.at/" }),
  expansionCompany({ slug: "sooma-medical", name: "Sooma Medical", category: "non-invasive", region: "europe", modality: "Home-use transcranial direct current stimulation", targetFunction: "Prescription neuromodulation for depression and related conditions", stage: "Commercial medical-device company", evidenceLevel: "E2", hq: ["Helsinki", "Finland", 60.1699, 24.9384], founded: 2013, website: "https://soomamedical.com/" }),
  expansionCompany({ slug: "cerenion", name: "Cerenion", category: "non-invasive", region: "europe", modality: "Automated EEG analysis for intensive care", targetFunction: "Continuous brain-function monitoring and neurological prognosis support", stage: "Commercial EEG analytics company", evidenceLevel: "E2", hq: ["Helsinki", "Finland", 60.1699, 24.9384], founded: 2017, website: "https://cerenion.com/" }),
  expansionCompany({ slug: "nexstim", name: "Nexstim", category: "non-invasive", region: "europe", modality: "Navigated TMS and EEG-guided brain mapping", targetFunction: "Non-invasive functional brain mapping and therapeutic stimulation", stage: "Commercial neuro-navigation and TMS company", evidenceLevel: "E2", hq: ["Helsinki", "Finland", 60.1699, 24.9384], founded: 2000, website: "https://www.nexstim.com/" }),
  expansionCompany({ slug: "flow-neuroscience", name: "Flow Neuroscience", category: "non-invasive", region: "europe", modality: "At-home tDCS and digital behavioral therapy", targetFunction: "Depression treatment support through non-invasive stimulation", stage: "Commercial neuromodulation company", evidenceLevel: "E1", hq: ["Malmo", "Sweden", 55.605, 13.0038], founded: 2016, website: "https://www.flowneuroscience.com/" }),
  expansionCompany({ slug: "smart-eye", name: "Smart Eye", category: "non-invasive", region: "europe", modality: "Eye-tracking, driver-monitoring, and human-insight systems", targetFunction: "Behavioral and attentional measurement that can complement accessible human-machine interfaces", stage: "Established eye-tracking technology company", evidenceLevel: "E2", hq: ["Gothenburg", "Sweden", 57.7089, 11.9746], founded: 1999, website: "https://smarteye.se/" }),
  expansionCompany({ slug: "livanova", name: "LivaNova", category: "minimally-invasive", region: "europe", modality: "Vagus nerve stimulation and neuromodulation systems", targetFunction: "Epilepsy, depression, and autonomic neuromodulation treatment", stage: "Established commercial medical-device company", evidenceLevel: "E2", hq: ["London", "United Kingdom", 51.5072, -0.1276], founded: 1987, website: "https://www.livanova.com/" }),
  expansionCompany({ slug: "magventure", name: "MagVenture", category: "non-invasive", region: "europe", modality: "Transcranial magnetic stimulation systems", targetFunction: "Clinical and research non-invasive neuromodulation", stage: "Established TMS device manufacturer", evidenceLevel: "E2", hq: ["Farum", "Denmark", 55.8086, 12.3607], founded: 1992, website: "https://magventure.com/" }),
  expansionCompany({ slug: "brainplus", name: "Brain+", category: "non-invasive", region: "europe", modality: "Digital cognitive-assessment and rehabilitation software", targetFunction: "Cognitive health and dementia support", stage: "Commercial digital neurohealth company", evidenceLevel: "E1", hq: ["Copenhagen", "Denmark", 55.6761, 12.5683], founded: 2012, website: "https://www.brain-plus.com/" }),
  expansionCompany({ slug: "platoscience", name: "PlatoScience", category: "non-invasive", region: "europe", modality: "Transcranial electrical stimulation hardware and research tools", targetFunction: "Non-invasive neuromodulation research and clinical translation", stage: "Commercial stimulation-technology company", evidenceLevel: "E1", hq: ["Copenhagen", "Denmark", 55.6761, 12.5683], founded: 2014, website: "https://www.platoscience.com/" }),
  expansionCompany({ slug: "newronika", name: "Newronika", category: "minimally-invasive", region: "europe", modality: "Adaptive deep-brain stimulation platform", targetFunction: "Closed-loop stimulation for Parkinson's disease and neurological conditions", stage: "Clinical-stage adaptive neuromodulation company", evidenceLevel: "E2", hq: ["Milan", "Italy", 45.4642, 9.19], founded: 2015, website: "https://www.newronika.com/" }),
  expansionCompany({ slug: "neurotechnology-lithuania", name: "Neurotechnology", category: "non-invasive", region: "europe", modality: "Biometrics, brainwave analysis, and EEG software development tools", targetFunction: "Signal-processing infrastructure for neurotechnology and developer research", stage: "Established software and biometrics company", evidenceLevel: "E1", hq: ["Vilnius", "Lithuania", 54.6872, 25.2797], founded: 1990, website: "https://www.neurotechnology.com/" }),
  expansionCompany({ slug: "oxehealth", name: "Oxehealth", category: "non-invasive", region: "europe", modality: "Video-based physiological and behavioral measurement", targetFunction: "Remote health and behavioral observation; adjacent neurohealth measurement technology", stage: "Commercial digital health company", evidenceLevel: "E1", hq: ["Oxford", "United Kingdom", 51.752, -1.2577], founded: 2012, website: "https://www.oxehealth.com/" }),
  expansionCompany({ slug: "cumulus-neuroscience", name: "Cumulus Neuroscience", category: "non-invasive", region: "europe", modality: "Wearable EEG and digital biomarkers for decentralized studies", targetFunction: "Longitudinal brain-health measurement in neurological trials", stage: "Commercial digital biomarker company", evidenceLevel: "E2", hq: ["Belfast", "United Kingdom", 54.5973, -5.9301], founded: 2017, website: "https://cumulusneuroscience.com/" }),
  expansionCompany({ slug: "neurovalens", name: "Neurovalens", category: "non-invasive", region: "europe", modality: "Vestibular and cranial-nerve stimulation wearables", targetFunction: "Metabolic and mental-health neuromodulation research", stage: "Commercial wearable neuromodulation company", evidenceLevel: "E1", hq: ["Belfast", "United Kingdom", 54.5973, -5.9301], founded: 2013, website: "https://neurovalens.com/" }),
  expansionCompany({ slug: "ear-switch", name: "EarSwitch", category: "non-invasive", region: "europe", modality: "In-ear muscle-signal interface for hands-free device control", targetFunction: "Accessible communication and control for people with motor impairments", stage: "Early assistive human-machine interface company", evidenceLevel: "E1", hq: ["Cambridge", "United Kingdom", 52.2053, 0.1218], founded: 2020, website: "https://earswitch.co.uk/" }),
  expansionCompany({ slug: "tobii", name: "Tobii", category: "non-invasive", region: "europe", modality: "Eye-tracking hardware, assistive control, and human-attention analytics", targetFunction: "Hands-free computer access and measurement of visual attention", stage: "Established assistive-interface and eye-tracking company", evidenceLevel: "E2", hq: ["Danderyd", "Sweden", 59.404, 18.041], founded: 2001, website: "https://www.tobii.com/" }),
  expansionCompany({ slug: "munevo", name: "Munevo", category: "non-invasive", region: "europe", modality: "Smart-glasses head-control interface for powered wheelchairs", targetFunction: "Independent mobility and assistive device control for people with motor impairments", stage: "Commercial assistive-interface company", evidenceLevel: "E2", hq: ["Munich", "Germany", 48.1351, 11.582], founded: 2018, website: "https://www.munevo.com/" }),

  // Rest-of-world expansion: company profile records link directly to official technical material.
  expansionCompany({ slug: "neuroone-medical", name: "NeuroOne Medical Technologies", category: "minimally-invasive", region: "north-america", modality: "Thin-film cortical electrodes for sEEG, recording, stimulation, and ablation", targetFunction: "Epilepsy mapping and future neural-recording applications", stage: "Commercial and investigational implantable neurotechnology company", evidenceLevel: "E2", hq: ["Eden Prairie, MN", "United States", 44.8547, -93.4708], founded: 2017, website: "https://n1medical.com/" }),
  expansionCompany({ slug: "neurosigma", name: "NeuroSigma", category: "non-invasive", region: "north-america", modality: "External trigeminal nerve stimulation systems", targetFunction: "Non-invasive neuromodulation for epilepsy and neuropsychiatric research", stage: "Medical-device neuromodulation company", evidenceLevel: "E2", hq: ["Los Angeles, CA", "United States", 34.0522, -118.2437], founded: 2008, website: "https://neurosigma.com/" }),
  expansionCompany({ slug: "soterix-medical", name: "Soterix Medical", category: "non-invasive", region: "north-america", modality: "tES, TMS, EEG, and neurophysiology research systems", targetFunction: "Non-invasive brain stimulation and BCI-enabling research infrastructure", stage: "Established neuroscience technology supplier", evidenceLevel: "E2", hq: ["Woodbridge, NY", "United States", 40.8257, -73.8879], founded: 2008, website: "https://soterixmedical.com/" }),
  expansionCompany({ slug: "neuronetics", name: "Neuronetics", category: "non-invasive", region: "north-america", modality: "Transcranial magnetic stimulation systems", targetFunction: "Clinical non-invasive neuromodulation for depression and mental-health care", stage: "Established commercial TMS company", evidenceLevel: "E2", hq: ["Malvern, PA", "United States", 40.0362, -75.5138], founded: 2003, website: "https://neuronetics.com/" }),
  expansionCompany({ slug: "nurolux", name: "NuroLux", category: "non-invasive", region: "north-america", modality: "Wearable diffuse optical neuroimaging", targetFunction: "Functional brain monitoring for concussion and brain-injury assessment", stage: "Clinical neuroimaging company", evidenceLevel: "E1", hq: ["Los Angeles, CA", "United States", 34.0522, -118.2437], founded: 2020, website: "https://nurolux.com/" }),
  expansionCompany({ slug: "bionaut-labs", name: "Bionaut Labs", category: "minimally-invasive", region: "north-america", modality: "Remotely navigated microscale medical robots for CNS drug delivery", targetFunction: "Targeted treatment delivery in the brain; not a BCI", stage: "Clinical-stage neurotherapeutics platform company", evidenceLevel: "E1", hq: ["Los Angeles, CA", "United States", 34.0522, -118.2437], founded: 2016, website: "https://bionautlabs.com/" }),
  expansionCompany({ slug: "inner-cosmos", name: "Inner Cosmos", category: "minimally-invasive", region: "north-america", modality: "Implantable and wearable neurostimulation systems", targetFunction: "Mood-disorder neuromodulation research", stage: "Early implantable neurotechnology company", evidenceLevel: "E1", hq: ["New York, NY", "United States", 40.7128, -74.006], founded: 2021, website: "https://www.innercosmos.io/" }),
  expansionCompany({ slug: "neural-analytics", name: "Neural Analytics", category: "non-invasive", region: "north-america", modality: "Portable transcranial Doppler ultrasound and AI analytics", targetFunction: "Bedside cerebral blood-flow monitoring for stroke and neurocritical care", stage: "Commercial neurodiagnostic company", evidenceLevel: "E2", hq: ["Los Angeles, CA", "United States", 34.0522, -118.2437], founded: 2013, website: "https://neuralanalytics.com/" }),
  expansionCompany({ slug: "zeto", name: "Zeto", category: "non-invasive", region: "north-america", modality: "Rapid EEG headsets and cloud EEG interpretation", targetFunction: "Point-of-care seizure and brain-function assessment", stage: "Commercial EEG technology company", evidenceLevel: "E2", hq: ["Santa Clara, CA", "United States", 37.3541, -121.9552], founded: 2013, website: "https://zeto-inc.com/" }),
  expansionCompany({ slug: "epitel", name: "Epitel", category: "non-invasive", region: "north-america", modality: "Wearable EEG sensors and cloud seizure-monitoring software", targetFunction: "Long-term seizure detection and epilepsy research", stage: "Commercial wearable EEG company", evidenceLevel: "E2", hq: ["Salt Lake City, UT", "United States", 40.7608, -111.891], founded: 2014, website: "https://epitel.com/" }),
  expansionCompany({ slug: "neuro42", name: "Neuro42", category: "non-invasive", region: "north-america", modality: "Portable MRI and robotic image-guided intervention platform", targetFunction: "Accessible brain imaging and neuro-intervention workflows", stage: "Clinical neuroimaging company", evidenceLevel: "E1", hq: ["San Francisco, CA", "United States", 37.7749, -122.4194], founded: 2019, website: "https://www.neuro42.ai/" }),
  expansionCompany({ slug: "intheon", name: "Intheon", category: "non-invasive", region: "north-america", modality: "Wireless EEG and multimodal biosignal acquisition systems", targetFunction: "Research-grade ambulatory brain and physiology recording", stage: "Commercial neurophysiology technology company", evidenceLevel: "E2", hq: ["San Diego, CA", "United States", 32.7157, -117.1611], founded: 2009, website: "https://intheon.io/" }),
  expansionCompany({ slug: "cognixion", name: "Cognixion", category: "non-invasive", region: "north-america", modality: "Augmented reality, eye tracking, and accessible communication software", targetFunction: "Communication and computer access for people with complex disabilities", stage: "Commercial assistive-interface company", evidenceLevel: "E2", hq: ["Santa Barbara, CA", "United States", 34.4208, -119.6982], founded: 2019, website: "https://cognixion.com/" }),
  expansionCompany({ slug: "mindset-neurotech", name: "Mindset Neurotech", category: "minimally-invasive", region: "north-america", modality: "Focused ultrasound neuromodulation platform", targetFunction: "Non-invasive and minimally invasive neuromodulation research", stage: "Clinical-stage neuromodulation company", evidenceLevel: "E1", hq: ["Toronto", "Canada", 43.6532, -79.3832], founded: 2018, website: "https://mindsetneurotech.com/" }),
  expansionCompany({ slug: "myndmove", name: "MyndMove", category: "non-invasive", region: "north-america", modality: "Functional electrical stimulation and interactive rehabilitation software", targetFunction: "Restoring upper-limb function through neurorehabilitation", stage: "Commercial rehabilitation-technology company", evidenceLevel: "E2", hq: ["Mississauga", "Canada", 43.589, -79.6441], founded: 2014, website: "https://myndmove.com/" }),
  expansionCompany({ slug: "rogue-research", name: "Rogue Research", category: "non-invasive", region: "north-america", modality: "Neuronavigation and TMS research systems", targetFunction: "Precise non-invasive stimulation and neuroimaging-guided research", stage: "Established neuroscience technology company", evidenceLevel: "E2", hq: ["Montreal", "Canada", 45.5017, -73.5673], founded: 2000, website: "https://rogue-research.com/" }),
  expansionCompany({ slug: "humanware", name: "HumanWare", category: "non-invasive", region: "north-america", modality: "Vision and communication assistive technology", targetFunction: "Independent access to digital information and communication", stage: "Established assistive-technology company", evidenceLevel: "E2", hq: ["Drummondville", "Canada", 45.8833, -72.4833], founded: 1988, website: "https://www.humanware.com/" }),
  expansionCompany({ slug: "compumedics", name: "Compumedics", category: "non-invasive", region: "rest-of-world", modality: "EEG, sleep diagnostics, and neurophysiology systems", targetFunction: "Clinical EEG, sleep assessment, and brain-signal monitoring", stage: "Established neurodiagnostic technology company", evidenceLevel: "E2", hq: ["Melbourne", "Australia", -37.8136, 144.9631], founded: 1987, website: "https://www.compumedics.com.au/" }),
  expansionCompany({ slug: "neurotech-international", name: "Neurotech International", category: "non-invasive", region: "rest-of-world", modality: "Neurostimulation and digital neurodevelopmental therapy platform", targetFunction: "Paediatric neurodevelopmental-condition research", stage: "Clinical-stage neurotechnology company", evidenceLevel: "E1", hq: ["Perth", "Australia", -31.9505, 115.8605], founded: 2016, website: "https://neurotechinternational.com/" }),
  expansionCompany({ slug: "saluda-medical", name: "Saluda Medical", category: "minimally-invasive", region: "rest-of-world", modality: "Closed-loop spinal-cord stimulation and neural sensing", targetFunction: "Chronic pain neuromodulation with physiologic feedback", stage: "Commercial neuromodulation company", evidenceLevel: "E2", hq: ["Sydney", "Australia", -33.8688, 151.2093], founded: 2013, website: "https://saludamedical.com/" }),
  expansionCompany({ slug: "mave-health", name: "Mave Health", category: "non-invasive", region: "asia", modality: "Wearable brain stimulation and digital mental-health platform", targetFunction: "Non-invasive mental-health neuromodulation", stage: "India-based neurotechnology company", evidenceLevel: "E1", hq: ["Bengaluru", "India", 12.9716, 77.5946], founded: 2021, website: "https://mavehealth.com/" }),
  expansionCompany({ slug: "jolly-good", name: "Jolly Good", category: "non-invasive", region: "asia", modality: "Virtual reality and digital therapeutics platform", targetFunction: "Psychiatric and neurorehabilitation training applications", stage: "Japan-based digital neurohealth company", evidenceLevel: "E1", hq: ["Tokyo", "Japan", 35.6762, 139.6503], founded: 2014, website: "https://jollygood.co.jp/" }),
  expansionCompany({ slug: "neu-corporation", name: "NeU Corporation", category: "non-invasive", region: "asia", modality: "Wearable brain imaging and neurofeedback technology", targetFunction: "Cognitive-state monitoring and mental-health research", stage: "Japan-based neurotechnology company", evidenceLevel: "E1", hq: ["Tokyo", "Japan", 35.6762, 139.6503], founded: 2017, website: "https://neu-brains.com/" }),
  expansionCompany({ slug: "xenoma", name: "Xenoma", category: "non-invasive", region: "asia", modality: "Smart apparel, motion sensing, and human-performance analytics", targetFunction: "Wearable sensing for rehabilitation, mobility, and human-machine interaction", stage: "Commercial wearable-technology company", evidenceLevel: "E1", hq: ["Tokyo", "Japan", 35.6762, 139.6503], founded: 2015, website: "https://xenoma.com/" }),
  expansionCompany({ slug: "brain4care", name: "brain4care", category: "non-invasive", region: "rest-of-world", modality: "Non-invasive intracranial-pressure waveform monitoring", targetFunction: "Neurological monitoring and neurocritical-care decision support", stage: "Commercial neurodiagnostic company", evidenceLevel: "E2", hq: ["Sao Carlos", "Brazil", -22.0174, -47.8907], founded: 2014, website: "https://brain4care.com/" }),
  expansionCompany({ slug: "openbci", name: "OpenBCI", category: "non-invasive", region: "north-america", modality: "Open-source EEG, EMG, and biosensing hardware and software", targetFunction: "Developer and research infrastructure for non-invasive BCI and neurotechnology", stage: "Established open neurotechnology platform", evidenceLevel: "E2", hq: ["Brooklyn, NY", "United States", 40.6782, -73.9442], founded: 2014, website: "https://openbci.com/" }),
  expansionCompany({ slug: "neurable", name: "Neurable", category: "non-invasive", region: "north-america", modality: "Ear-EEG and brain-signal interfaces embedded in consumer wearables", targetFunction: "Cognitive-state measurement and hands-free human-computer interaction", stage: "Commercial EEG-interface company", evidenceLevel: "E2", hq: ["Boston, MA", "United States", 42.3601, -71.0589], founded: 2015, website: "https://neurable.com/" }),
  expansionCompany({ slug: "setpoint-medical", name: "SetPoint Medical", category: "minimally-invasive", region: "north-america", modality: "Implantable vagus-nerve stimulation system", targetFunction: "Bioelectronic treatment of inflammatory disease", stage: "Clinical and commercial bioelectronic-medicine company", evidenceLevel: "E2", hq: ["Valencia, CA", "United States", 34.413, -118.555], founded: 2006, website: "https://setpointmedical.com/" }),
  expansionCompany({ slug: "inspire-medical-systems", name: "Inspire Medical Systems", category: "minimally-invasive", region: "north-america", modality: "Implantable hypoglossal-nerve stimulation", targetFunction: "Sleep-apnea therapy through peripheral-nerve stimulation", stage: "Established commercial neuromodulation company", evidenceLevel: "E2", hq: ["Golden Valley, MN", "United States", 44.9917, -93.3602], founded: 2007, website: "https://www.inspiresleep.com/" }),
  expansionCompany({ slug: "axonics", name: "Axonics", category: "minimally-invasive", region: "north-america", modality: "Sacral neuromodulation systems", targetFunction: "Bladder and bowel dysfunction treatment through peripheral-nerve stimulation", stage: "Established commercial neuromodulation company", evidenceLevel: "E2", hq: ["Irvine, CA", "United States", 33.6846, -117.8265], founded: 2013, website: "https://www.axonics.com/" }),
  expansionCompany({ slug: "nevro", name: "Nevro", category: "minimally-invasive", region: "north-america", modality: "Spinal-cord stimulation systems", targetFunction: "Chronic-pain neuromodulation", stage: "Established commercial neuromodulation company", evidenceLevel: "E2", hq: ["Redwood City, CA", "United States", 37.4852, -122.2364], founded: 2006, website: "https://www.nevro.com/" }),
  expansionCompany({ slug: "vivosense", name: "VivoSense", category: "non-invasive", region: "north-america", modality: "Wearable-sensor analytics and digital biomarker platform", targetFunction: "Clinical research measurement, including neurological studies", stage: "Commercial digital biomarker company", evidenceLevel: "E1", hq: ["Newport Beach, CA", "United States", 33.6189, -117.9298], founded: 2010, website: "https://vivosense.com/" }),
  expansionCompany({ slug: "cognivue", name: "Cognivue", category: "non-invasive", region: "north-america", modality: "Computerized cognitive-assessment platform", targetFunction: "Objective cognitive screening and neuropsychological assessment", stage: "Commercial cognitive-assessment company", evidenceLevel: "E2", hq: ["Victor, NY", "United States", 42.9826, -77.4089], founded: 2006, website: "https://www.cognivue.com/" }),
  expansionCompany({ slug: "cognionics", name: "Cognionics", category: "non-invasive", region: "north-america", modality: "Dry-electrode mobile EEG systems", targetFunction: "Ambulatory brain-signal recording for research and BCI development", stage: "Commercial wearable EEG company", evidenceLevel: "E2", hq: ["San Diego, CA", "United States", 32.7157, -117.1611], founded: 2009, website: "https://cognionics.com/" }),
  expansionCompany({ slug: "psyonic", name: "Psyonic", category: "non-invasive", region: "north-america", modality: "Bionic prosthetic hand with sensory feedback and EMG control", targetFunction: "Upper-limb prosthetic control and sensory restoration", stage: "Commercial assistive-technology company", evidenceLevel: "E2", hq: ["San Diego, CA", "United States", 32.7157, -117.1611], founded: 2015, website: "https://psyonic.io/" }),
  expansionCompany({ slug: "mobius-bionics", name: "Mobius Bionics", category: "non-invasive", region: "north-america", modality: "Powered exoskeleton and mobility-assistance systems", targetFunction: "Walking and rehabilitation support after neurological injury", stage: "Commercial assistive-mobility company", evidenceLevel: "E2", hq: ["Merrillville, IN", "United States", 41.4828, -87.3328], founded: 2020, website: "https://mobiusbionics.com/" }),
  expansionCompany({ slug: "ekso-bionics", name: "Ekso Bionics", category: "non-invasive", region: "north-america", modality: "Robotic exoskeletons for rehabilitation and industrial support", targetFunction: "Gait rehabilitation and mobility assistance", stage: "Established exoskeleton company", evidenceLevel: "E2", hq: ["Richmond, CA", "United States", 37.9358, -122.3477], founded: 2005, website: "https://eksobionics.com/" }),
  expansionCompany({ slug: "rewalk-robotics", name: "ReWalk Robotics", category: "non-invasive", region: "north-america", modality: "Powered exoskeleton and rehabilitation technology", targetFunction: "Mobility assistance for spinal cord injury and stroke rehabilitation", stage: "Established commercial exoskeleton company", evidenceLevel: "E2", hq: ["Marlborough, MA", "United States", 42.3459, -71.5523], founded: 2001, website: "https://rewalk.com/" }),
  expansionCompany({ slug: "voxneuro", name: "VoxNeuro", category: "non-invasive", region: "north-america", modality: "EEG-based cognitive-health assessment and brain analytics", targetFunction: "Objective brain-function monitoring for neurological and psychiatric care", stage: "Commercial EEG assessment company", evidenceLevel: "E2", hq: ["Vancouver", "Canada", 49.2827, -123.1207], founded: 2011, website: "https://voxneuro.com/" }),
  expansionCompany({ slug: "fourier-intelligence", name: "Fourier Intelligence", category: "non-invasive", region: "asia", modality: "Rehabilitation robotics, exoskeletons, and digital therapy systems", targetFunction: "Neurological rehabilitation and mobility recovery", stage: "Commercial rehabilitation-robotics company", evidenceLevel: "E2", hq: ["Singapore", "Singapore", 1.3521, 103.8198], founded: 2017, website: "https://fourierintelligence.com/" }),
  expansionCompany({ slug: "nexalin-technology", name: "Nexalin Technology", category: "non-invasive", region: "north-america", modality: "Non-invasive cranial electrotherapy stimulation systems", targetFunction: "Mental-health and neurological neuromodulation research", stage: "Commercial stimulation-technology company", evidenceLevel: "E1", hq: ["Houston, TX", "United States", 29.7604, -95.3698], founded: 2010, website: "https://nexalin.com/" }),
  expansionCompany({ slug: "thync", name: "Thync", category: "non-invasive", region: "north-america", modality: "Wearable peripheral-nerve stimulation", targetFunction: "Stress and sleep support through non-invasive neuromodulation", stage: "Consumer neurotechnology company", evidenceLevel: "E1", hq: ["Los Gatos, CA", "United States", 37.2358, -121.9624], founded: 2011, website: "https://thync.com/" }),
  expansionCompany({ slug: "fisher-wallace-labs", name: "Fisher Wallace Laboratories", category: "non-invasive", region: "north-america", modality: "Cranial electrotherapy stimulation device", targetFunction: "Non-invasive mood and sleep neuromodulation", stage: "Commercial stimulation-device company", evidenceLevel: "E1", hq: ["New York, NY", "United States", 40.7128, -74.006], founded: 2007, website: "https://www.fisherwallace.com/" }),
  expansionCompany({ slug: "evoke-neuroscience", name: "Evoke Neuroscience", category: "non-invasive", region: "north-america", modality: "EEG/ERP brain-health assessment and analytics", targetFunction: "Objective neurophysiology measurement for cognitive and mental-health workflows", stage: "Commercial EEG analytics company", evidenceLevel: "E2", hq: ["New York, NY", "United States", 40.7128, -74.006], founded: 2009, website: "https://evokeneuroscience.com/" }),
  expansionCompany({ slug: "neurometrix", name: "NeuroMetrix", category: "non-invasive", region: "north-america", modality: "Wearable neurodiagnostic and nerve-conduction technology", targetFunction: "Peripheral-nerve assessment and chronic-condition monitoring", stage: "Commercial neurodiagnostic company", evidenceLevel: "E2", hq: ["Woburn, MA", "United States", 42.4793, -71.1523], founded: 1996, website: "https://www.neurometrix.com/" }),
  expansionCompany({ slug: "microtransponder", name: "MicroTransponder", category: "minimally-invasive", region: "north-america", modality: "Paired vagus-nerve stimulation for rehabilitation", targetFunction: "Upper-limb recovery after stroke through targeted neuromodulation", stage: "Commercial and clinical neuromodulation company", evidenceLevel: "E2", hq: ["Dallas, TX", "United States", 32.7767, -96.797], founded: 2007, website: "https://microtransponder.com/" }),
  expansionCompany({ slug: "nalu-medical", name: "Nalu Medical", category: "minimally-invasive", region: "north-america", modality: "Miniaturized implantable neurostimulation systems", targetFunction: "Chronic-pain neuromodulation", stage: "Commercial implantable neurostimulation company", evidenceLevel: "E2", hq: ["Carlsbad, CA", "United States", 33.1581, -117.3506], founded: 2014, website: "https://nalumed.com/" }),
  expansionCompany({ slug: "spr-therapeutics", name: "SPR Therapeutics", category: "minimally-invasive", region: "north-america", modality: "Peripheral nerve stimulation systems", targetFunction: "Acute and chronic pain treatment through neuromodulation", stage: "Commercial neurostimulation company", evidenceLevel: "E2", hq: ["Cleveland, OH", "United States", 41.4993, -81.6944], founded: 2010, website: "https://www.sprtherapeutics.com/" }),
  expansionCompany({ slug: "helius-medical", name: "Helius Medical Technologies", category: "non-invasive", region: "north-america", modality: "Portable neuromodulation stimulator paired with physical therapy", targetFunction: "Neurorehabilitation support for gait and balance impairment", stage: "Commercial neurorehabilitation company", evidenceLevel: "E2", hq: ["Newtown, PA", "United States", 40.229, -74.936], founded: 2013, website: "https://heliusmedical.com/" }),
  expansionCompany({ slug: "neurokinetics", name: "Neuro Kinetics", category: "non-invasive", region: "north-america", modality: "Eye-movement measurement and vestibular diagnostic systems", targetFunction: "Objective neurological and vestibular assessment", stage: "Commercial neurodiagnostic company", evidenceLevel: "E2", hq: ["Pittsburgh, PA", "United States", 40.4406, -79.9959], founded: 1987, website: "https://www.neuro-kinetics.com/" }),
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
  },
  ...sourcedExpansionOrganizations
];

export const programProjects: ProgramProject[] = [
  // University-research cohort: 30 US projects, 10 Europe projects, and 10 Asia projects.
  researchProject({ id: "braingate-intracortical-bci", companySlug: "braingate-consortium", name: "BrainGate intracortical communication and control", focus: "intracortical BCI communication and assistive control", modality: "Intracortical neural recording and decoding", evidenceLevel: "E5", sourceUrl: "https://www.braingate.org/", publisher: "BrainGate Consortium" }),
  researchProject({ id: "ucsf-speech-neuroprosthesis", companySlug: "ucsf-bravo", name: "UCSF speech neuroprosthesis", focus: "decoding intended speech from cortical activity", modality: "ECoG speech decoding and avatar/voice synthesis research", evidenceLevel: "E4", sourceUrl: "https://changlab.ucsf.edu/", publisher: "UCSF Chang Lab" }),
  researchProject({ id: "ucdavis-speech-neuroprosthesis", companySlug: "uc-davis-speech-neuroprosthesis", name: "UC Davis speech neuroprosthesis", focus: "restoring speech through cortical decoding", modality: "Intracortical speech decoding and language modeling", evidenceLevel: "E4", sourceUrl: "https://neurosurgery.ucdavis.edu/research", publisher: "UC Davis Neurosurgery" }),
  researchProject({ id: "caltech-focused-ultrasound-bci", companySlug: "caltech-fus-bmi", name: "Caltech focused-ultrasound BCI", focus: "non-invasive neural decoding with ultrasound-based interface methods", modality: "Focused ultrasound and functional neuroimaging", evidenceLevel: "E2", sourceUrl: "https://andersenlab.caltech.edu/", publisher: "Caltech Andersen Lab" }),
  researchProject({ id: "cmu-tfus-bci-project", companySlug: "cmu-tfus-bci", name: "CMU tFUS BCI research", focus: "focused-ultrasound neuromodulation and non-invasive BCI methods", modality: "Transcranial focused ultrasound and neural decoding", evidenceLevel: "E2", sourceUrl: "https://www.cmu.edu/", publisher: "Carnegie Mellon University" }),
  researchProject({ id: "yale-rtfmri-manifold-bci", companySlug: "yale-rtfmri-bci", name: "Yale manifold-aware real-time fMRI BCI", focus: "brain-control learning aligned to neural manifold geometry", modality: "Real-time fMRI neurofeedback and BCI", evidenceLevel: "E4", sourceUrl: "https://news.yale.edu/2026/06/09/brain-computer-interface-works-not-against-brain", publisher: "Yale University" }),
  researchProject({ id: "stanford-speech-handwriting-bci", companySlug: "stanford-nptl", name: "Stanford speech and handwriting BCI", focus: "high-rate communication from intracortical motor signals", modality: "Intracortical neural recording and language decoding", evidenceLevel: "E4", sourceUrl: "https://med.stanford.edu/neurosurgery/research/brain-machine-interface.html", publisher: "Stanford Medicine" }),
  researchProject({ id: "pitt-bidirectional-neuroprosthesis", companySlug: "pitt-rnel", name: "Pittsburgh bidirectional neuroprosthesis", focus: "robotic arm control with sensory feedback", modality: "Intracortical recording, microstimulation, and robotics", evidenceLevel: "E4", sourceUrl: "https://www.rnel.pitt.edu/", publisher: "University of Pittsburgh" }),
  researchProject({ id: "utah-bidirectional-prosthetics", companySlug: "utah-bionic-engineering", name: "Utah bidirectional prosthetics", focus: "peripheral neural interfaces for prosthetic control and sensation", modality: "Utah arrays, peripheral nerve interfaces, and EMG", evidenceLevel: "E4", sourceUrl: "https://bionicengineeringlab.org/", publisher: "University of Utah" }),
  researchProject({ id: "columbia-eeg-bci", companySlug: "columbia-neurotechnology", name: "Columbia EEG BCI research", focus: "hands-on and translational non-invasive BCI methods", modality: "EEG acquisition and signal processing", evidenceLevel: "E2", sourceUrl: "https://neurotechcenter.columbia.edu/", publisher: "Columbia University" }),
  researchProject({ id: "duke-neural-prosthetics", companySlug: "duke-neuroengineering", name: "Duke neural prosthetics research", focus: "neural-interface methods and systems neuroscience", modality: "Neural recording and stimulation", evidenceLevel: "E2", sourceUrl: "https://neuroengineering.duke.edu/", publisher: "Duke University" }),
  researchProject({ id: "hopkins-neural-repair", companySlug: "johns-hopkins-neuroengineering", name: "Johns Hopkins neural repair and interfaces", focus: "neuroprosthetics, stimulation, and neural measurement", modality: "Neural interfaces and neuroimaging", evidenceLevel: "E2", sourceUrl: "https://www.bme.jhu.edu/research/neuroengineering/", publisher: "Johns Hopkins University" }),
  researchProject({ id: "umich-direct-brain-interface", companySlug: "umich-direct-bci", name: "Michigan Direct Brain Interface research", focus: "closed-loop neural decoding and stimulation", modality: "Intracortical BCI and neural probes", evidenceLevel: "E2", sourceUrl: "https://directbraininterface.engin.umich.edu/", publisher: "University of Michigan" }),
  researchProject({ id: "northwestern-neural-repair", companySlug: "northwestern-neurotechnology", name: "Northwestern neural repair technology", focus: "neural restoration and rehabilitation engineering", modality: "Neurostimulation and rehabilitation systems", evidenceLevel: "E2", sourceUrl: "https://www.mccormick.northwestern.edu/biomedical/research/neuroengineering.html", publisher: "Northwestern University" }),
  researchProject({ id: "berkeley-neural-decoding", companySlug: "uc-berkeley-neurotechnology", name: "Berkeley neural decoding research", focus: "computational decoding and brain-network measurement", modality: "fMRI and EEG methods", evidenceLevel: "E2", sourceUrl: "https://neuroscience.berkeley.edu/", publisher: "UC Berkeley" }),
  researchProject({ id: "ucla-neural-interface", companySlug: "ucla-neural-engineering", name: "UCLA neural interface research", focus: "neural recording, stimulation, and neurosurgical technology", modality: "ECoG, neural probes, and imaging", evidenceLevel: "E2", sourceUrl: "https://www.neurosurgery.ucla.edu/research", publisher: "UCLA" }),
  researchProject({ id: "usc-neuroprosthetics", companySlug: "usc-neural-prosthetics", name: "USC neuroprosthetics research", focus: "motor and sensory restoration through neural interfaces", modality: "Neural interfaces, bionics, and signal processing", evidenceLevel: "E2", sourceUrl: "https://bme.usc.edu/research/neuroengineering/", publisher: "University of Southern California" }),
  researchProject({ id: "uw-neurotechnology-project", companySlug: "uw-neurotechnology", name: "Washington neurotechnology research", focus: "assistive neurotechnology and brain measurement", modality: "EEG, fMRI, and rehabilitation technology", evidenceLevel: "E2", sourceUrl: "https://neurotech.uw.edu/", publisher: "University of Washington" }),
  researchProject({ id: "umn-neural-engineering-project", companySlug: "umn-neuroengineering", name: "Minnesota neural engineering research", focus: "neural interfaces and neural signal processing", modality: "ECoG, EEG, and neural probes", evidenceLevel: "E2", sourceUrl: "https://cse.umn.edu/bme/research/neural-engineering", publisher: "University of Minnesota" }),
  researchProject({ id: "georgia-tech-neural-interface-project", companySlug: "georgia-tech-neural-interfaces", name: "Georgia Tech neural interfaces research", focus: "neuroelectronics and neuroprosthetic systems", modality: "Neural probes and peripheral stimulation", evidenceLevel: "E2", sourceUrl: "https://neuro.gatech.edu/", publisher: "Georgia Institute of Technology" }),
  researchProject({ id: "rice-neural-engineering-project", companySlug: "rice-neural-engineering", name: "Rice neural engineering research", focus: "neural sensing, stimulation, and repair", modality: "Neural interfaces and focused ultrasound", evidenceLevel: "E2", sourceUrl: "https://neuroengineering.rice.edu/", publisher: "Rice University" }),
  researchProject({ id: "ut-austin-neural-engineering-project", companySlug: "ut-austin-neural-engineering", name: "UT Austin neural engineering research", focus: "brain-network measurement and neural decoding", modality: "fMRI and EEG", evidenceLevel: "E2", sourceUrl: "https://neural.eng.utexas.edu/", publisher: "University of Texas at Austin" }),
  researchProject({ id: "case-western-nerve-interface", companySlug: "case-western-neural-engineering", name: "Case Western nerve-interface research", focus: "functional electrical stimulation and upper-limb restoration", modality: "Peripheral nerve interfaces, EMG, and FES", evidenceLevel: "E4", sourceUrl: "https://engineering.case.edu/bme/research/neural-engineering", publisher: "Case Western Reserve University" }),
  researchProject({ id: "upenn-neural-engineering-project", companySlug: "upenn-neuroengineering", name: "Penn neural engineering research", focus: "brain-network stimulation and clinical neural interfaces", modality: "ECoG, DBS, and fMRI", evidenceLevel: "E2", sourceUrl: "https://www.med.upenn.edu/ndcn/", publisher: "University of Pennsylvania" }),
  researchProject({ id: "nyu-neural-science-project", companySlug: "nyu-neural-science", name: "NYU neural decoding research", focus: "computational neuroscience relevant to neural interfaces", modality: "fMRI and EEG", evidenceLevel: "E1", sourceUrl: "https://neuroscience.nyu.edu/", publisher: "New York University" }),
  researchProject({ id: "asu-neural-interface-project", companySlug: "asu-neural-interface", name: "ASU neural interface research", focus: "neural sensing and neurorehabilitation methods", modality: "Neural probes and EEG", evidenceLevel: "E2", sourceUrl: "https://neuroscience.asu.edu/", publisher: "Arizona State University" }),
  researchProject({ id: "wustl-neurotechnology-project", companySlug: "wustl-neurotechnology", name: "Washington University neurotechnology research", focus: "brain-network measurement and computational neuroscience", modality: "fMRI and MEG", evidenceLevel: "E2", sourceUrl: "https://neuroscience.wustl.edu/", publisher: "Washington University in St. Louis" }),
  researchProject({ id: "cornell-neurotechnology-project", companySlug: "cornell-neurotechnology", name: "Cornell neurotechnology research", focus: "neural microsystems and interface-enabling hardware", modality: "Neural probes and EEG", evidenceLevel: "E2", sourceUrl: "https://neurotech.cornell.edu/", publisher: "Cornell University" }),
  researchProject({ id: "princeton-neural-circuits-project", companySlug: "princeton-neural-circuits", name: "Princeton neural circuits research", focus: "large-scale neural recording and circuit measurement", modality: "Neural probes and optical imaging", evidenceLevel: "E2", sourceUrl: "https://pni.princeton.edu/", publisher: "Princeton University" }),
  researchProject({ id: "vanderbilt-neural-engineering-project", companySlug: "vanderbilt-neural-engineering", name: "Vanderbilt neural engineering research", focus: "neurorehabilitation and neural measurement", modality: "EEG, stimulation, and rehabilitation systems", evidenceLevel: "E2", sourceUrl: "https://www.vanderbilt.edu/brain-institute/", publisher: "Vanderbilt University" }),

  researchProject({ id: "imperial-neural-interface-project", companySlug: "imperial-neural-interfaces", name: "Imperial neural interfaces research", focus: "translational neural sensing and stimulation", modality: "Neural probes and EEG", evidenceLevel: "E2", sourceUrl: "https://www.imperial.ac.uk/bioengineering/research/neurotechnology/", publisher: "Imperial College London" }),
  researchProject({ id: "ucl-neurotechnology-project", companySlug: "ucl-neurotechnology", name: "UCL neurotechnology research", focus: "clinical brain imaging and neural decoding", modality: "fMRI, MEG, and EEG", evidenceLevel: "E2", sourceUrl: "https://www.ucl.ac.uk/neurology/research", publisher: "University College London" }),
  researchProject({ id: "oxford-neural-engineering-project", companySlug: "oxford-neural-engineering", name: "Oxford neural engineering research", focus: "brain-network measurement and computational neurotechnology", modality: "fMRI and MEG", evidenceLevel: "E2", sourceUrl: "https://www.ndcn.ox.ac.uk/", publisher: "University of Oxford" }),
  researchProject({ id: "cambridge-neural-interface-project", companySlug: "cambridge-neural-interface", name: "Cambridge neural interface research", focus: "neuroelectronics and neural recording", modality: "Neural probes and ECoG", evidenceLevel: "E2", sourceUrl: "https://www.neuroscience.cam.ac.uk/", publisher: "University of Cambridge" }),
  researchProject({ id: "glasgow-bci-project", companySlug: "glasgow-bci", name: "Glasgow non-invasive BCI research", focus: "EEG BCI and assistive technology", modality: "EEG and rehabilitation technology", evidenceLevel: "E2", sourceUrl: "https://www.gla.ac.uk/research/az/neuro/", publisher: "University of Glasgow" }),
  researchProject({ id: "warwick-neurotechnology-project", companySlug: "warwick-neurotechnology", name: "Warwick neurotechnology research", focus: "biomedical neural signals and assistive technology", modality: "EEG and EMG", evidenceLevel: "E1", sourceUrl: "https://warwick.ac.uk/fac/sci/eng/research/biomedical/", publisher: "University of Warwick" }),
  researchProject({ id: "tuebingen-bci-project", companySlug: "tuebingen-bci", name: "Tuebingen BCI research", focus: "communication and neurofeedback through EEG BCI", modality: "EEG", evidenceLevel: "E4", sourceUrl: "https://uni-tuebingen.de/en/research/", publisher: "University of Tuebingen" }),
  researchProject({ id: "freiburg-brainlinks-project", companySlug: "freiburg-brainlinks", name: "Freiburg BrainLinks-BrainTools", focus: "bidirectional neural interfaces and brain-machine communication", modality: "Neural probes, EEG, and robotics", evidenceLevel: "E2", sourceUrl: "https://www.brainlinks-braintools.uni-freiburg.de/", publisher: "University of Freiburg" }),
  researchProject({ id: "tu-delft-neural-engineering-project", companySlug: "tu-delft-neural-engineering", name: "TU Delft neural engineering research", focus: "neuroelectronics and assistive technology", modality: "Neural probes and EEG", evidenceLevel: "E2", sourceUrl: "https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/biomedical-engineering", publisher: "TU Delft" }),
  researchProject({ id: "ku-leuven-neuroelectronics-project", companySlug: "ku-leuven-neuroelectronics", name: "KU Leuven neuroelectronics research", focus: "precision neuromodulation and neural interfaces", modality: "DBS and neural probes", evidenceLevel: "E2", sourceUrl: "https://gbiomed.kuleuven.be/english/research/50000743/research/research-units/neuromodulation", publisher: "KU Leuven" }),

  researchProject({ id: "utokyo-neurotechnology-project", companySlug: "university-tokyo-neurotech", name: "University of Tokyo neurotechnology research", focus: "brain measurement and neural decoding", modality: "fMRI and EEG", evidenceLevel: "E2", sourceUrl: "https://www.u-tokyo.ac.jp/en/research/", publisher: "University of Tokyo" }),
  researchProject({ id: "osaka-neuroprosthetics-project", companySlug: "osaka-neuroprosthetics", name: "Osaka neuroprosthetics research", focus: "communication and movement restoration", modality: "ECoG and rehabilitation technology", evidenceLevel: "E2", sourceUrl: "https://www.osaka-u.ac.jp/en/research", publisher: "Osaka University" }),
  researchProject({ id: "kyoto-neuroengineering-project", companySlug: "kyoto-neuroengineering", name: "Kyoto neuroengineering research", focus: "neural signal analysis and brain measurement", modality: "EEG and fMRI", evidenceLevel: "E2", sourceUrl: "https://www.kyoto-u.ac.jp/en/research", publisher: "Kyoto University" }),
  researchProject({ id: "keio-neural-interfaces-project", companySlug: "keio-neural-interfaces", name: "Keio neural interfaces research", focus: "clinical neural decoding and neuroprosthetics", modality: "ECoG and EEG", evidenceLevel: "E2", sourceUrl: "https://www.keio.ac.jp/en/research/", publisher: "Keio University" }),
  researchProject({ id: "nus-neurotechnology-project", companySlug: "nus-neurotechnology", name: "NUS neurotechnology research", focus: "biomedical signals and assistive neurotechnology", modality: "EEG and fNIRS", evidenceLevel: "E2", sourceUrl: "https://cde.nus.edu.sg/bme/", publisher: "National University of Singapore" }),
  researchProject({ id: "ntu-neurotechnology-project", companySlug: "ntu-neurotechnology", name: "NTU neurotechnology research", focus: "neuroengineering and rehabilitation technology", modality: "EEG, fNIRS, and robotics", evidenceLevel: "E2", sourceUrl: "https://www.ntu.edu.sg/medicine/research", publisher: "Nanyang Technological University" }),
  researchProject({ id: "kaist-neural-interface-project", companySlug: "kaist-neural-interface", name: "KAIST neural interface research", focus: "neuroelectronics and high-performance recording", modality: "Neural probes and intracortical interfaces", evidenceLevel: "E2", sourceUrl: "https://bioeng.kaist.ac.kr/", publisher: "KAIST" }),
  researchProject({ id: "snu-bci-project", companySlug: "seoul-national-bci", name: "Seoul National BCI research", focus: "non-invasive BCI and clinical neurotechnology", modality: "EEG and fMRI", evidenceLevel: "E2", sourceUrl: "https://en.snu.ac.kr/research", publisher: "Seoul National University" }),
  researchProject({ id: "korea-university-neurotech-project", companySlug: "korea-university-neurotech", name: "Korea University neurotechnology research", focus: "neural interfaces and neurorehabilitation", modality: "EEG and neural probes", evidenceLevel: "E2", sourceUrl: "https://bioeng.korea.ac.kr/", publisher: "Korea University" }),
  researchProject({ id: "ntu-taiwan-bci-project", companySlug: "national-taiwan-bci", name: "National Taiwan BCI research", focus: "non-invasive BCI and assistive technology", modality: "EEG and rehabilitation technology", evidenceLevel: "E2", sourceUrl: "https://www.ntu.edu.tw/english/research", publisher: "National Taiwan University" }),

  // Product-track enrichment for prominent existing organizations.
  productTrack({ id: "emotiv-epoc-x-track", companySlug: "emotiv", name: "EMOTIV EPOC X", focus: "research-grade mobile EEG acquisition and brain-signal analysis", modality: "Wireless EEG headset and software", evidenceLevel: "E2", sourceUrl: "https://www.emotiv.com/epoc-x", publisher: "EMOTIV" }),
  productTrack({ id: "muse-s-track", companySlug: "muse-interaxon", name: "Muse S", focus: "consumer EEG-based meditation and sleep feedback", modality: "Wearable EEG and physiological sensing", evidenceLevel: "E1", sourceUrl: "https://choosemuse.com/muse-s/", publisher: "InteraXon" }),
  productTrack({ id: "neurosity-crown-track", companySlug: "neurosity-crown", name: "Neurosity Crown", focus: "developer-facing cognitive-state and BCI experimentation", modality: "Wearable EEG interface", evidenceLevel: "E1", sourceUrl: "https://neurosity.co/crown", publisher: "Neurosity" }),
  productTrack({ id: "nudge-lifu-track", companySlug: "nudge", name: "Nudge low-intensity focused ultrasound platform", focus: "non-invasive focused-ultrasound neuromodulation research", modality: "Low-intensity focused ultrasound", evidenceLevel: "E1", sourceUrl: "https://www.nudge.com/", publisher: "Nudge" }),
  productTrack({ id: "brainco-focuscalm-track", companySlug: "brainco", name: "BrainCo FocusCalm", focus: "consumer brain-state feedback and attention training", modality: "Wearable EEG and feedback software", evidenceLevel: "E1", sourceUrl: "https://www.brainco.tech/", publisher: "BrainCo" }),
  productTrack({ id: "onward-arc-ex-track", companySlug: "onward-arc-bci", name: "ONWARD ARC-EX", focus: "external spinal-cord stimulation for upper-body function after spinal cord injury", modality: "Spinal stimulation and rehabilitation technology", evidenceLevel: "E2", sourceUrl: "https://www.onwd.com/arc-ex/", publisher: "ONWARD Medical" }),
  productTrack({ id: "neuroelectrics-starstim-track", companySlug: "neuroelectrics", name: "Neuroelectrics Starstim", focus: "EEG-guided high-definition transcranial electrical stimulation", modality: "EEG and tES", evidenceLevel: "E2", sourceUrl: "https://www.neuroelectrics.com/starstim/", publisher: "Neuroelectrics" }),
  productTrack({ id: "openbci-galea-track", companySlug: "openbci", name: "OpenBCI Galea", focus: "multimodal biosignal acquisition for neurotechnology development", modality: "EEG, EMG, EDA, eye tracking, and physiological sensing", evidenceLevel: "E2", sourceUrl: "https://openbci.com/galea/", publisher: "OpenBCI" }),
  productTrack({ id: "gtec-unicorn-track", companySlug: "gtec-unicorn", name: "g.tec Unicorn BCI", focus: "non-invasive BCI prototyping and education", modality: "Wearable EEG headset and BCI software", evidenceLevel: "E2", sourceUrl: "https://www.gtec.at/product/unicorn-hybrid-black/", publisher: "g.tec medical engineering" }),
  productTrack({ id: "mindaffect-bci-track", companySlug: "mindaffect", name: "MindAffect Decoder", focus: "EEG-based communication and environmental control", modality: "Non-invasive EEG BCI software", evidenceLevel: "E2", sourceUrl: "https://mindaffect.nl/", publisher: "MindAffect" }),
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
    id: "blackrock-neuroport-utah-array",
    companySlug: "blackrock-neurotech",
    name: "NeuroPort / Utah Array",
    focus: "Intracortical recording and stimulation platform for human BCI research",
    modality: "Penetrating Utah-style microelectrode arrays plus NeuroPort acquisition hardware",
    statusLabel: "FDA 510(k)-cleared electrode/recording component; chronic assistive BCI use remains investigational",
    evidenceLevel: "E6",
    latestUpdateLabel: "2011 FDA 510(k); active human BCI research use",
    sortDate: "2011-02-09",
    summary:
      "Blackrock's NeuroPort/Utah Array platform is an enabling intracortical interface used across human BCI research, including motor-control and speech-neuroprosthesis studies.",
    demonstrated:
      "FDA 510(k) records for the NeuroPort cortical microelectrode array system and peer-reviewed human studies using NeuroPort arrays and acquisition hardware.",
    notYetShown:
      "The clearance is for recording/monitoring components and does not by itself approve a chronic home assistive BCI product such as MoveAgain.",
    sourceLinks: [
      source("FDA 510(k) K110010 NeuroPort entry", "regulatory-page", "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K110010", "U.S. FDA"),
      source("NeuroPort Electrode 96 product page", "company-update", "https://blackrockneurotech.com/products/neuroport-electrode/", "Blackrock Neurotech"),
      source("NEJM NeuroPort speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Open-access NEJM full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "blackrock-moveagain",
    companySlug: "blackrock-neurotech",
    name: "MoveAgain",
    focus: "Commercial assistive BCI path for cursor, keyboard, wheelchair, and prosthetic control",
    modality: "Intracortical array signals decoded to external device commands",
    statusLabel: "FDA Breakthrough Device Designation announced; no commercial clearance yet",
    evidenceLevel: "E1",
    latestUpdateLabel: "Nov 2021 FDA Breakthrough announcement",
    sortDate: "2021-11-18",
    summary:
      "MoveAgain is Blackrock's integrated assistive-BCI product program, framed around restoring control of digital and mobility devices for people with paralysis.",
    demonstrated:
      "Company-announced FDA Breakthrough Device Designation and a product description grounded in prior human intracortical BCI research.",
    notYetShown:
      "FDA marketing clearance, published MoveAgain pivotal outcomes, or routine commercial home deployment.",
    sourceLinks: [
      source("MoveAgain gets FDA Breakthrough Device Designation", "regulatory-page", "https://www.prnewswire.com/news-releases/blackrock-neurotechs-moveagain-brain-computer-interface-system-receives-breakthrough-device-designation-from-the-fda-301425013.html", "PR Newswire / Blackrock"),
      source("Blackrock MoveAgain overview", "company-update", "https://blackrockneurotech.com/insights/blackrock-neurotech-moveagain-brain-computer-interface-system/", "Blackrock Neurotech")
    ],
    isSample: false
  },
  {
    id: "onward-arc-bci-digital-bridge",
    companySlug: "onward-arc-bci",
    name: "ARC-BCI / DigitalBridge",
    focus: "Thought-driven spinal cord stimulation after spinal cord injury",
    modality: "Implanted cortical decoding linked wirelessly to implanted epidural spinal cord stimulation",
    statusLabel: "Peer-reviewed one-participant digital bridge; feasibility study active with seven ARC-BCI participants reported",
    evidenceLevel: "E4",
    latestUpdateLabel: "Jan 2026 participant-count update",
    sortDate: "2026-01-22",
    summary:
      "ONWARD's ARC-BCI program pairs brain-signal decoding with ARC-IM spinal cord stimulation so intended leg or arm movement can trigger targeted stimulation patterns.",
    demonstrated:
      "A Nature paper reported one participant standing, walking, and climbing stairs with a wireless brain-spine interface; ONWARD later reported seven ARC-BCI study participants across upper- and lower-limb restoration work.",
    notYetShown:
      "Peer-reviewed multi-participant endpoint data, long-term durability across a larger cohort, regulatory clearance, or routine clinical availability.",
    sourceLinks: [
      source("ARC-BCI overview", "company-update", "https://www.onwd.com/brain-computer-interface/", "ONWARD Medical"),
      source("Seven ARC-BCI participants reported", "company-update", "https://ir.onwd.com/static-files/48e1c5b9-e843-4895-ac81-e0e936a841e2", "ONWARD Medical"),
      source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("Brain-controlled spinal cord stimulation trial", "trial-registry", clinicalTrials("NCT06243952"), "ClinicalTrials.gov")
    ],
    isSample: false
  },
  {
    id: "neucyber-beinao-spinal-stimulation",
    companySlug: "neucyber-beinao",
    name: "Beinao-1 Brain-Spinal Cord-Exoskeleton Path",
    focus: "Motor-intention decoding linked to spinal stimulation and exoskeleton-assisted walking",
    modality: "Semi-invasive Beinao-1 cortical recording paired with temporally patterned spinal cord stimulation and lower-limb exoskeleton training",
    statusLabel: "CIBR-reported human walking case inside a broader Beinao-1 clinical program",
    evidenceLevel: "E3",
    latestUpdateLabel: "2026 CIBR and state-media reports",
    sortDate: "2026-06-22",
    summary:
      "NeuCyber/CIBR's Beinao-1 program includes a brain-spinal cord-exoskeleton pathway for spinal cord injury alongside motor and speech reconstruction use cases.",
    demonstrated:
      "CIBR reports that one paraplegia patient used Beinao-controlled spinal stimulation plus lower-limb exoskeleton training and achieved autonomous walking with axillary crutches.",
    notYetShown:
      "Peer-reviewed protocol details, independent outcome measures, adverse-event reporting, and reproducibility across a larger spinal-cord-injury cohort.",
    sourceLinks: [
      source("CIBR Beinao No.1 achievement note", "company-update", "https://en.cibr.ac.cn/detail/cibrNewsnews/80c9eacb37164c5fadc21c696edf5cd7", "Chinese Institute for Brain Research, Beijing"),
      source("Beinao brain-spinal cord-exoskeleton report", "company-update", "https://www.globaltimes.cn/page/202605/1361687.shtml", "Global Times", false),
      source("Beinao-1 simultaneous BCI and spinal stimulation report", "company-update", "https://www.chinadailyhk.com/hk/article/635325", "Xinhua / China Daily Hong Kong", false)
    ],
    isSample: false
  },
  {
    id: "fudan-ai-bsi",
    companySlug: "fudan-bsi",
    name: "AI-Empowered Brain-Spine Interface",
    focus: "Restoring lower-limb movement and assisted walking after spinal cord injury",
    modality: "Minimally invasive motor-intention decoding linked to spinal nerve-root stimulation",
    statusLabel: "Four university-reported human proof-of-concept surgeries by March 2025",
    evidenceLevel: "E2",
    latestUpdateLabel: "Mar 2025 Fudan report",
    sortDate: "2025-03-05",
    summary:
      "Fudan's Institute of Science and Technology for Brain-Inspired Intelligence reported a triple-integrated brain-spine interface led by Jia Fumin's team.",
    demonstrated:
      "Fudan reports four proof-of-concept surgeries, including rapid post-operative leg movement and assisted stepping/walking outcomes in spinal-cord-injury patients.",
    notYetShown:
      "Peer-reviewed clinical outcomes, a public trial registry, standardized endpoint data, adverse-event reporting, or longer follow-up across the reported cases.",
    sourceLinks: [
      source("Fudan English BSI report", "company-update", "https://www.fudan.edu.cn/en/2025/0305/c344a144344/page.htm", "Fudan University"),
      source("Fudan Chinese BSI feature", "company-update", "https://news.fudan.edu.cn/2025/0304/c1268a144336/page.htm", "Fudan University"),
      source("Fudan BSI video report", "demo-video", "https://cn.chinadaily.com.cn/a/202503/07/WS67ca8cd9a310510f19eea453.html", "China Daily", false)
    ],
    isSample: false
  },
  {
    id: "zju-closed-loop-spinal-interface",
    companySlug: "zju-nanhu-spinal-interface",
    name: "Closed-Loop Spinal Nerve Interface",
    focus: "Standing, walking, stair climbing, balance, and partial sensory/autonomic recovery after spinal cord injury",
    modality: "Sixteen-contact spinal electrode, wireless stimulation controller, EMG sensing, and adaptive closed-loop software",
    statusLabel: "Zhejiang University-reported first China closed-loop spinal nerve interface case",
    evidenceLevel: "E2",
    latestUpdateLabel: "Jun 2025 ZJU report",
    sortDate: "2025-06-19",
    summary:
      "Zhejiang University, SAHZU, Nanhu Brain-Computer Interface Institute, and Brain-Machine Intelligence Lab reported a closed-loop spinal nerve interface in a 61-year-old man with paraplegia.",
    demonstrated:
      "ZJU reports that the participant could stand and walk unaided within 15 days and recovered basic mobility by two months, with additional sensory and autonomic improvements described.",
    notYetShown:
      "Direct cortical BCI control, peer-reviewed outcomes, larger-cohort reproducibility, or enough detail to classify it as a direct brain-spine interface rather than a spinal-interface result.",
    sourceLinks: [
      source("ZJU closed-loop spinal nerve interface report", "company-update", "https://www.zju.edu.cn/english/2025/0619/c19573a3063161/page.htm", "Zhejiang University"),
      source("ZJU/SAHZU walking video", "demo-video", "https://www.facebook.com/ZhejiangUniversityChina/videos/from-paralysis-to-walking-again-%EF%B8%8Fafter-a-devastating-spinal-injury-61-year-old-m/9811658218962668/", "Zhejiang University / Facebook", false),
      source("Global Times ZJU spinal interface report", "news-report", "https://www.globaltimes.cn/page/202505/1334573.shtml", "Global Times", false)
    ],
    isSample: false
  },
  {
    id: "hainan-wukongbot-brain-spine-machine",
    companySlug: "hainan-wukongbot-bsi",
    name: "WukongBot Brain-Spine-Machine Interface",
    focus: "Preclinical non-invasive BSI proof-of-concept for lower-limb movement after spinal cord injury",
    modality: "Non-invasive EEG intention decoding linked to epidural electrical stimulation",
    statusLabel: "Published macaque proof-of-concept; not a human SCI therapy yet",
    evidenceLevel: "E2",
    latestUpdateLabel: "2025 university report and BIO Integration paper",
    sortDate: "2025-11-11",
    summary:
      "Hainan University's WukongBot work tests a Brain-Spine-Machine pathway where decoded movement intent bypasses spinal injury and drives lower-limb stimulation.",
    demonstrated:
      "The paper and university report describe human motion intentions driving alternating lower-limb movements in an anesthetized macaque through a non-invasive BCI plus stimulation loop.",
    notYetShown:
      "Human spinal-cord-injury use, awake animal locomotion, chronic implant performance, or clinical endpoint data.",
    sourceLinks: [
      source("Hainan University BCI chip and Brain-Spine-Machine report", "company-update", "https://en.hainanu.edu.cn/info/1131/12891.htm", "Hainan University"),
      source("WukongBot BIO Integration paper", "paper", "https://bio-integration.org/10-15212-bioi-2025-0171/", "BIO Integration"),
      source("Liang Fengyan faculty profile and BSI publication list", "company-update", "https://bme.hainanu.edu.cn/info/1106/10921.htm", "Hainan University")
    ],
    isSample: false
  },
  {
    id: "tianjin-haihe-noninvasive-bci",
    companySlug: "tianjin-haihe-bci",
    name: "Haihe Non-Invasive BCI Platform",
    focus: "Large-command-set EEG typing/control and neuroICU translation",
    modality: "Hybrid SSVEP, P300, motor imagery, optical/electrical monitoring, and clinical neuroICU workflows",
    statusLabel: "216-key public demo plus multi-center neuroICU trial launch",
    evidenceLevel: "E2",
    latestUpdateLabel: "2025 neuroICU trial launch; 2026 BCI education alliance",
    sortDate: "2026-05-29",
    summary:
      "Tianjin University's Haihe BCI program combines high-speed non-invasive typing/control research with clinical neuroICU monitoring and modulation translation.",
    demonstrated:
      "TJU reported a 216-key spelling/control system with over 300 bits/min online average information transfer rate, and announced a multi-center neuroICU BCI trial program with major Chinese hospitals.",
    notYetShown:
      "Peer-reviewed clinical endpoint data for the neuroICU program, registry-linked trial records, or evidence that the large-command-set demo works reliably outside supervised settings.",
    sourceLinks: [
      source("TJU 216-key non-invasive BCI report", "company-update", "https://en.tju.edu.cn/info/1010/7179.htm", "Tianjin University"),
      source("TJU neuroICU multi-center BCI trial launch", "company-update", "https://en.tju.edu.cn/info/1010/10336.htm", "Tianjin University"),
      source("High-speed hybrid BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/36608342/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering")
    ],
    isSample: false
  },
  {
    id: "nankai-endovascular-bci",
    companySlug: "nankai-interventional-bci",
    name: "Interventional / Endovascular BCI",
    focus: "Minimally invasive motor decoding and rehabilitation through vascular access",
    modality: "Stent-electrode array implanted through blood vessels near cortex, paired with decoding and FES in the human restoration report",
    statusLabel: "Animal, primate, retrieval, and human feasibility reports",
    evidenceLevel: "E2",
    latestUpdateLabel: "Jul 2025 human restoration report",
    sortDate: "2025-07-03",
    summary:
      "Nankai's interventional BCI line tries to occupy the middle ground between scalp EEG and open-craniotomy implants by placing electrodes endovascularly.",
    demonstrated:
      "Nankai reports sheep signal acquisition, non-human-primate robotic-arm control, successful sensor retrieval, and a 2025 human case where interventional BCI plus FES supported impaired-limb motor restoration.",
    notYetShown:
      "Published peer-reviewed human outcomes, larger-cohort safety and thrombosis data, and direct comparison against conventional rehabilitation or other implant approaches.",
    sourceLinks: [
      source("Nankai human interventional BCI restoration report", "company-update", "https://en.nankai.edu.cn/2025/0911/c23047a577316/page.htm", "Nankai University"),
      source("Nankai non-human-primate interventional BCI report", "company-update", "https://en.nankai.edu.cn/2023/0613/c22796a515048/page.htm", "Nankai University"),
      source("Nankai sheep interventional BCI report", "company-update", "https://en.nankai.edu.cn/2022/0801/c22796a465078/page.htm", "Nankai University")
    ],
    isSample: false
  },
  {
    id: "cas-cebsit-wireless-invasive-bci",
    companySlug: "cas-cebsit-invasive-bci",
    name: "Wireless Invasive Clinical BCI",
    focus: "High-throughput implanted BCI for digital and embodied-device control",
    modality: "Wireless invasive cortical recording implant and external decoding system",
    statusLabel: "Public China clinical-trial reports with gaming, wheelchair, and robot-dog control",
    evidenceLevel: "E2",
    latestUpdateLabel: "2025 CAS/CEBSIT case reports",
    sortDate: "2025-12-19",
    summary:
      "CAS CEBSIT's invasive BCI program with Huashan Hospital is one of China's most visible implanted BCI clinical-translation efforts.",
    demonstrated:
      "CAS and media reports describe a March 2025 implant in a participant with limb loss who later played a racing game, plus a later high-level paraplegia case controlling a smart wheelchair and robot dog.",
    notYetShown:
      "Peer-reviewed endpoint data, trial registration details, long-term implant performance, or validated home-use assistive workflows.",
    sourceLinks: [
      source("CAS invasive BCI clinical-trial report", "company-update", "https://english.cas.cn/newsroom/cas_media/202506/t20250616_1045625.shtml", "Chinese Academy of Sciences"),
      source("CAS/CEBSIT second-case report", "company-update", "https://english.cas.cn/newsroom/cas_media/202512/t20251219_1138007.shtml", "Chinese Academy of Sciences"),
      source("CEBSIT wheelchair and robot-dog report", "news-report", "https://www.globaltimes.cn/page/202512/1350829.shtml", "Global Times", false)
    ],
    isSample: false
  },
  {
    id: "brainco-noninvasive-bci-products",
    companySlug: "brainco",
    name: "Non-Invasive BCI Product Stack",
    focus: "Wearable EEG products, bionic prosthetics, and neuro-AI human-machine interfaces",
    modality: "Dry/wearable EEG, nerve/muscle signal interpretation, AI decoding, and prosthetic control",
    statusLabel: "Commercial products and public prosthetic deployments",
    evidenceLevel: "E2",
    latestUpdateLabel: "2025-2026 product and deployment updates",
    sortDate: "2026-04-01",
    summary:
      "BrainCo's product stack spans assistive bionic hands/knees, attention and social-communication training systems, sleep/stress devices, and broader non-invasive BCI interaction.",
    demonstrated:
      "Official pages list multiple BCI product families, BrainCo says it has reached large-scale production for at least one device, and Hangzhou reporting describes bionic prosthetics entering full production.",
    notYetShown:
      "Independent clinical endpoint data across the wellness/training products, or evidence that consumer neurofeedback claims translate into durable medical benefit.",
    sourceLinks: [
      source("BrainCo BCI technology and products", "company-update", "https://www.brainco.cn/en-US/technology", "BrainCo"),
      source("BrainCo about page", "company-update", "https://www.brainco.cn/en-US/about", "BrainCo"),
      source("BrainCo accessibility update", "company-update", "https://www.brainco.cn/en-US/news/ss68tshjwmoocsayo5elb7nl", "BrainCo"),
      source("BrainCo bionic prosthetics production report", "news-report", "https://www.ehangzhou.gov.cn/2025-02/26/c_292773.htm", "Hangzhou Municipal Government", false)
    ],
    isSample: false
  },
  {
    id: "shanghaitech-bci-center-track",
    companySlug: "shanghaitech-bci-center",
    name: "Research Center for Brain-Computer Interface",
    focus: "Interdisciplinary BCI research center for implantable systems, intelligent decoding, and clinical translation",
    modality: "Neural interfaces, implantable systems, intelligent BCI software, and AI-enabled clinical translation",
    statusLabel: "Institutional research center launched May 2026",
    evidenceLevel: "E1",
    latestUpdateLabel: "May 2026 center launch",
    sortDate: "2026-05-13",
    summary:
      "ShanghaiTech's BCI center is a new institutional platform intended to connect biomedical engineering, life sciences, clinical medicine, and intelligent systems.",
    demonstrated:
      "ShanghaiTech officially launched the center and named research directions including ultra-flexible neural interfaces, bidirectional BCI interaction, invasive Chinese-language BCI, and clinical translational applications.",
    notYetShown:
      "Named device programs, registered trials, published participant outcomes, or a specific commercial translation path.",
    sourceLinks: [
      source("ShanghaiTech BCI Research Center launch", "company-update", "https://www.shanghaitech.edu.cn/en/2026/0519/c1260a1122115/page.htm", "ShanghaiTech University")
    ],
    isSample: false
  },
  {
    id: "scut-pazhou-multimodal-bci-track",
    companySlug: "scut-pazhou-multimodal-bci",
    name: "Multimodal Non-Invasive BCI",
    focus: "Wearable non-invasive BCI for wheelchair control, awareness assessment, rehabilitation, and neurohealth products",
    modality: "Hybrid EEG paradigms, multimodal brain-signal analysis, fMRI methods, and product-transfer hardware/software",
    statusLabel: "Peer-reviewed academic BCI prototypes plus product-transfer reporting",
    evidenceLevel: "E4",
    latestUpdateLabel: "2025-2026 Pazhou/Guangzhou updates",
    sortDate: "2026-01-16",
    summary:
      "The SCUT/Pazhou BCI line is a long-running non-invasive research and translation program led by Yuanqing Li.",
    demonstrated:
      "Published papers include hybrid BCI wheelchair control, BCI mouse/web browsing, and audiovisual awareness-detection work; local reporting describes wearable BCI products entering hospitals, homes, and sports settings.",
    notYetShown:
      "Randomized clinical evidence for the translated product set, broad real-world reliability data, or regulatory clearance details for each application.",
    sourceLinks: [
      source("SCUT main BCI program summary", "company-update", "https://www2.scut.edu.cn/autonlab/4514/list.htm", "South China University of Technology"),
      source("Pazhou Lab Yuanqing Li profile", "company-update", "https://www.pazhoulab.com/2025/11/7252/", "Pazhou Lab"),
      source("Hybrid BCI wheelchair paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22692936/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering"),
      source("Guangzhou BCI product-transfer report", "news-report", "https://kjj.gz.gov.cn/xwlb/yw/content/post_10662998.html", "Guangzhou Science and Technology Bureau", false)
    ],
    isSample: false
  },
  {
    id: "shanghai-yansi-mandarin-speech-bci",
    companySlug: "shanghai-yansi-speech-bci",
    name: "Mandarin Speech BCI",
    focus: "Real-time Chinese speech decoding from cortical signals",
    modality: "High-density flexible ECoG with AI language modeling for Mandarin syllables and sentences",
    statusLabel: "Peer-reviewed Science Advances result and clinical-trial-phase reporting",
    evidenceLevel: "E4",
    latestUpdateLabel: "2025 Science Advances paper",
    sortDate: "2025-11-07",
    summary:
      "Shanghai Yansi and Huashan Hospital's speech BCI work is focused on Mandarin Chinese decoding, where tone and syllable structure make the task different from English speech BCI.",
    demonstrated:
      "A Science Advances paper reports real-time full-spectrum Chinese decoding from cortical signals, with public Shanghai reporting describing clinical-trial-phase work and implanted epilepsy-patient sessions.",
    notYetShown:
      "Long-term take-home use, larger patient cohorts with speech impairment, and approved clinical communication-aid deployment.",
    sourceLinks: [
      source("Real-time decoding of full-spectrum Chinese paper", "paper", "https://www.science.org/doi/10.1126/sciadv.adz9968", "Science Advances"),
      source("Shanghai speech BCI government report", "company-update", "https://english.shanghai.gov.cn/en-InnovationPolicies/20250722/c4b71a2bb59b404e8a25660a8531b013.html", "Shanghai Municipal Government"),
      source("PubMed record for Mandarin speech BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/41191764/", "PubMed")
    ],
    isSample: false
  },
  {
    id: "clinatec-wimagine-brain-spine",
    companySlug: "clinatec-wimagine",
    name: "WIMAGINE Exoskeleton and Brain-Spine Platform",
    focus: "Epidural ECoG control of exoskeletons and spinal-stimulation neuroprostheses",
    modality: "Bilateral WIMAGINE ECoG implants decoded into external effector or spinal-stimulation commands",
    statusLabel: "Peer-reviewed exoskeleton proof-of-concept and WIMAGINE contribution to 2023 BSI result",
    evidenceLevel: "E4",
    latestUpdateLabel: "2024 CEA WIMAGINE update",
    sortDate: "2024-01-09",
    summary:
      "CEA/Clinatec's WIMAGINE implant underpins both the 2019 exoskeleton proof-of-concept and the cortical-decoding side of the 2023 brain-spine interface collaboration.",
    demonstrated:
      "A tetraplegic participant controlled a four-limb exoskeleton in a Lancet Neurology proof-of-concept, and CEA describes WIMAGINE as part of the Nature brain-spine interface that restored thought-driven walking in one participant.",
    notYetShown:
      "A broadly deployed exoskeleton product, multi-participant brain-spine efficacy, or approved rehabilitation use.",
    sourceLinks: [
      source("Exoskeleton controlled by epidural BCI", "paper", "https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(19)30321-7/abstract", "The Lancet Neurology"),
      source("CEA WIMAGINE brain-spine and exoskeleton summary", "company-update", "https://www.cea.fr/presse/Pages/actualites-communiques/sante-sciences-du-vivant/innovation-wimagine-espoir-personnes-handicapees-recompense-ces-2024.aspx", "CEA"),
      source("CEA-Leti WIMAGINE rehabilitation update", "company-update", "https://www.cea.fr/cea-tech/leti/english/Pages/What%27s-On/News/AVC-Brain-Computer-Interface.aspx", "CEA-Leti"),
      source("Exoskeleton controlled by BCI video", "demo-video", "https://www.youtube.com/watch?v=1GyJBBB8O_M", "YouTube", false)
    ],
    isSample: false
  },
  {
    id: "neurorestore-digital-bridge",
    companySlug: "neurorestore-epfl-bsi",
    name: "Digital Bridge Brain-Spine Interface",
    focus: "Wireless thought-controlled spinal stimulation for standing, walking, and stair climbing",
    modality: "Cortical ECoG decoding connected to epidural spinal cord stimulation",
    statusLabel: "Peer-reviewed one-participant human result with official demo video",
    evidenceLevel: "E4",
    latestUpdateLabel: "May 2023 Nature result",
    sortDate: "2023-05-24",
    summary:
      "NeuroRestore's digital bridge re-established a communication loop between cortical movement intention and spinal stimulation in one participant with chronic tetraplegia.",
    demonstrated:
      "The participant could stand, walk, and climb stairs using the implanted brain-spine interface, with NeuroRestore/EPFL publishing both a Nature paper and official video material.",
    notYetShown:
      "Peer-reviewed replication in a larger cohort, a commercial-grade implant package, or routine availability outside specialized research settings.",
    sourceLinks: [
      source("EPFL thought-controlled walking report", "company-update", "https://actu.epfl.ch/news/thought-controlled-walking-again-after-spinal-co-3/", "EPFL"),
      source("NeuroRestore BSI press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore"),
      source("Brain-spine interface Nature paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("NeuroRestore official BSI video", "demo-video", "https://vimeo.com/829445531", "NeuroRestore / Vimeo")
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
    id: "onward-seven-arc-bci-participants-2026",
    title: "ONWARD reports seven ARC-BCI study participants",
    companySlug: "onward-arc-bci",
    dateLabel: "Jan 22, 2026",
    sortDate: "2026-01-22",
    status: "confirmed",
    type: "additional-implant",
    evidenceLevel: "E1",
    confidence: "medium",
    summary:
      "ONWARD reported that seven study participants had received ARC-BCI systems across upper- and lower-limb restoration work.",
    whyItMatters:
      "Participant count helps track whether the brain-spine concept is moving beyond the original one-person Nature demonstration.",
    hypeCheck:
      "This is a company-announced feasibility update, not a peer-reviewed multi-participant outcome paper.",
    sourceLinks: [
      source("Seven ARC-BCI participants reported", "company-update", "https://ir.onwd.com/static-files/48e1c5b9-e843-4895-ac81-e0e936a841e2", "ONWARD Medical"),
      source("Brain-controlled spinal cord stimulation trial", "trial-registry", clinicalTrials("NCT06243952"), "ClinicalTrials.gov")
    ],
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
    id: "neurorestore-digital-bridge-nature-2023",
    title: "NeuroRestore digital bridge walking study published",
    companySlug: "neurorestore-epfl-bsi",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "NeuroRestore, EPFL, CHUV, UNIL, CEA, and ONWARD collaborators published the wireless digital bridge result in Nature.",
    whyItMatters:
      "It is the clearest peer-reviewed human brain-spine interface evidence: decoded movement intention directly controlled spinal stimulation.",
    hypeCheck:
      "It remains a one-participant research result and should not be read as routine restored walking for SCI patients.",
    sourceLinks: [
      source("Brain-spine interface Nature paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("NeuroRestore BSI press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore"),
      source("NeuroRestore official BSI video", "demo-video", "https://vimeo.com/829445531", "NeuroRestore / Vimeo")
    ],
    isSample: false
  },
  {
    id: "clinatec-wimagine-brain-spine-2023",
    title: "WIMAGINE contributes to Nature brain-spine interface",
    companySlug: "clinatec-wimagine",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "CEA describes its WIMAGINE epidural ECoG implant as the cortical recording component used in the 2023 brain-spine interface collaboration.",
    whyItMatters:
      "It links Clinatec's WIMAGINE platform to both exoskeleton control and spinal-stimulation control.",
    hypeCheck:
      "The peer-reviewed brain-spine result is still one participant and does not make WIMAGINE a cleared rehabilitation product.",
    sourceLinks: [
      source("CEA WIMAGINE brain-spine and exoskeleton summary", "company-update", "https://www.cea.fr/presse/Pages/actualites-communiques/sante-sciences-du-vivant/innovation-wimagine-espoir-personnes-handicapees-recompense-ces-2024.aspx", "CEA"),
      source("CEA-Leti WIMAGINE rehabilitation update", "company-update", "https://www.cea.fr/cea-tech/leti/english/Pages/What%27s-On/News/AVC-Brain-Computer-Interface.aspx", "CEA-Leti"),
      source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature")
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
    id: "neucyber-beinao-spinal-stim-walking-2026",
    title: "Beinao-1 brain-spinal cord-exoskeleton walking case reported",
    companySlug: "neucyber-beinao",
    dateLabel: "2026",
    sortDate: "2026-06-22",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "CIBR reported that a Beinao-1 participant with paraplegia used brain-controlled spinal stimulation and exoskeleton training to walk with axillary crutches.",
    whyItMatters:
      "It is one of the clearest China-based public claims for a brain-spine interface applied to spinal cord injury.",
    hypeCheck:
      "The public record is still mainly institutional and media reporting; peer-reviewed BSI outcome data has not been published.",
    sourceLinks: [
      source("CIBR Beinao No.1 achievement note", "company-update", "https://en.cibr.ac.cn/detail/cibrNewsnews/80c9eacb37164c5fadc21c696edf5cd7", "Chinese Institute for Brain Research, Beijing"),
      source("Beinao brain-spinal cord-exoskeleton report", "company-update", "https://www.globaltimes.cn/page/202605/1361687.shtml", "Global Times", false),
      source("Beinao-1 simultaneous BCI and spinal stimulation report", "company-update", "https://www.chinadailyhk.com/hk/article/635325", "Xinhua / China Daily Hong Kong", false)
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
    id: "fudan-bsi-poc-series-2025",
    title: "Fudan reports four brain-spine interface proof-of-concept surgeries",
    companySlug: "fudan-bsi",
    dateLabel: "Mar 2025",
    sortDate: "2025-03-05",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Fudan reported four proof-of-concept brain-spine interface surgeries for spinal cord injury, including rapid leg-movement and assisted walking outcomes.",
    whyItMatters:
      "It explicitly adds a China-based brain-spine interface line to the tracker with official university documentation.",
    hypeCheck:
      "The reports are not yet peer-reviewed clinical outcomes and should be treated as early feasibility evidence.",
    sourceLinks: [
      source("Fudan English BSI report", "company-update", "https://www.fudan.edu.cn/en/2025/0305/c344a144344/page.htm", "Fudan University"),
      source("Fudan Chinese BSI feature", "company-update", "https://news.fudan.edu.cn/2025/0304/c1268a144336/page.htm", "Fudan University"),
      source("Fudan BSI video report", "demo-video", "https://cn.chinadaily.com.cn/a/202503/07/WS67ca8cd9a310510f19eea453.html", "China Daily", false)
    ],
    isSample: false
  },
  {
    id: "zju-spinal-interface-walking-2025",
    title: "ZJU reports closed-loop spinal nerve interface walking result",
    companySlug: "zju-nanhu-spinal-interface",
    dateLabel: "Jun 19, 2025",
    sortDate: "2025-06-19",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Zhejiang University reported a 61-year-old paraplegia patient standing and walking after a closed-loop spinal nerve interface implant.",
    whyItMatters:
      "It is a China-based spinal-interface result from BCI/neuroengineering teams and helps distinguish adjacent spinal-interface progress from direct cortical BSI.",
    hypeCheck:
      "Public descriptions emphasize spinal stimulation, EMG, and feedback software, not direct cortical decoding.",
    sourceLinks: [
      source("ZJU closed-loop spinal nerve interface report", "company-update", "https://www.zju.edu.cn/english/2025/0619/c19573a3063161/page.htm", "Zhejiang University"),
      source("ZJU/SAHZU walking video", "demo-video", "https://www.facebook.com/ZhejiangUniversityChina/videos/from-paralysis-to-walking-again-%EF%B8%8Fafter-a-devastating-spinal-injury-61-year-old-m/9811658218962668/", "Zhejiang University / Facebook", false)
    ],
    isSample: false
  },
  {
    id: "hainan-wukongbot-paper-2025",
    title: "WukongBot brain-spine interface proof-of-concept paper published",
    companySlug: "hainan-wukongbot-bsi",
    dateLabel: "Nov 2025",
    sortDate: "2025-11-11",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Hainan University authors published WukongBot, a non-invasive BCI to spinal-stimulation proof-of-concept in a monkey model.",
    whyItMatters:
      "It adds a China-based preclinical BSI route that is explicit about a brain-to-spine stimulation loop.",
    hypeCheck:
      "The result is preclinical and cross-species; it is not a human SCI therapy.",
    sourceLinks: [
      source("WukongBot BIO Integration paper", "paper", "https://bio-integration.org/10-15212-bioi-2025-0171/", "BIO Integration"),
      source("Hainan University BCI chip and Brain-Spine-Machine report", "company-update", "https://en.hainanu.edu.cn/info/1131/12891.htm", "Hainan University")
    ],
    isSample: false
  },
  {
    id: "tianjin-haihe-216-key-bci-2023",
    title: "Tianjin University reports 216-key non-invasive BCI system",
    companySlug: "tianjin-haihe-bci",
    dateLabel: "May 18, 2023",
    sortDate: "2023-05-18",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Tianjin University reported a non-invasive BCI system supporting a 216-key virtual keyboard and high-speed mind typing.",
    whyItMatters:
      "Large command sets and fast selection are central limits for practical non-invasive EEG BCIs.",
    hypeCheck:
      "A conference/public demo is not the same as unsupervised home communication or clinical assistive use.",
    sourceLinks: [
      source("TJU 216-key non-invasive BCI report", "company-update", "https://en.tju.edu.cn/info/1010/7179.htm", "Tianjin University"),
      source("High-speed hybrid BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/36608342/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering")
    ],
    isSample: false
  },
  {
    id: "tianjin-neuroicu-bci-trial-2025",
    title: "Tianjin University launches multi-center neuroICU BCI trial program",
    companySlug: "tianjin-haihe-bci",
    dateLabel: "Aug 24, 2025",
    sortDate: "2025-08-24",
    status: "confirmed",
    type: "trial-opened",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "TJU and Tianjin Huanhu Hospital announced a multi-center clinical-trial program applying non-invasive BCI technology in neurointensive care units.",
    whyItMatters:
      "It expands BCI translation beyond classic assistive typing into bedside monitoring, diagnosis, treatment, and modulation workflows.",
    hypeCheck:
      "This is an announced clinical-trial program; published endpoints and registry-level details still need to be tracked.",
    sourceLinks: [
      source("TJU neuroICU multi-center BCI trial launch", "company-update", "https://en.tju.edu.cn/info/1010/10336.htm", "Tianjin University")
    ],
    isSample: false
  },
  {
    id: "nankai-interventional-human-2025",
    title: "Nankai reports human interventional BCI motor-restoration case",
    companySlug: "nankai-interventional-bci",
    dateLabel: "Jul 3, 2025",
    sortDate: "2025-07-03",
    status: "confirmed",
    type: "demo-released",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Nankai reported a 67-year-old hemiplegic patient regaining affected-limb task ability after interventional BCI implantation paired with FES.",
    whyItMatters:
      "It is a China-based endovascular/interventional BCI human feasibility signal, distinct from both scalp EEG and craniotomy-based implants.",
    hypeCheck:
      "The result is institution-announced and needs peer-reviewed clinical data before being treated as established efficacy.",
    sourceLinks: [
      source("Nankai human interventional BCI restoration report", "company-update", "https://en.nankai.edu.cn/2025/0911/c23047a577316/page.htm", "Nankai University")
    ],
    isSample: false
  },
  {
    id: "cas-cebsit-invasive-bci-trial-2025",
    title: "CAS CEBSIT and Huashan report wireless invasive BCI trial",
    companySlug: "cas-cebsit-invasive-bci",
    dateLabel: "Mar 25, 2025",
    sortDate: "2025-03-25",
    status: "confirmed",
    type: "first-implant",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "CAS CEBSIT and Huashan Hospital reported a wireless invasive BCI implantation in a participant with severe limb loss, followed by public mind-controlled gaming material.",
    whyItMatters:
      "It marks a visible China-based invasive BCI clinical-translation pathway independent from the already tracked NeuroXess and NeuCyber programs.",
    hypeCheck:
      "The public evidence is still demonstration/reporting, not a peer-reviewed multi-participant endpoint paper.",
    sourceLinks: [
      source("CAS invasive BCI clinical-trial report", "company-update", "https://english.cas.cn/newsroom/cas_media/202506/t20250616_1045625.shtml", "Chinese Academy of Sciences"),
      source("CEBSIT first invasive BCI trial media report", "news-report", "https://www.globaltimes.cn/page/202506/1336164.shtml", "Global Times", false)
    ],
    isSample: false
  },
  {
    id: "brainco-bionic-prosthetics-production-2025",
    title: "BrainCo smart bionic prosthetics move into production",
    companySlug: "brainco",
    dateLabel: "Feb 26, 2025",
    sortDate: "2025-02-26",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Hangzhou reporting described BrainCo launching full production of smart bionic prosthetics using non-invasive neural-signal interpretation.",
    whyItMatters:
      "It represents the commercial, non-invasive side of China's BCI ecosystem, separate from implant-heavy paralysis programs.",
    hypeCheck:
      "Bionic prosthetic deployment is meaningful, but it should not be conflated with implanted BCI clinical restoration evidence.",
    sourceLinks: [
      source("BrainCo bionic prosthetics production report", "news-report", "https://www.ehangzhou.gov.cn/2025-02/26/c_292773.htm", "Hangzhou Municipal Government", false),
      source("BrainCo BCI technology and products", "company-update", "https://www.brainco.cn/en-US/technology", "BrainCo")
    ],
    isSample: false
  },
  {
    id: "shanghaitech-bci-center-2026",
    title: "ShanghaiTech launches Research Center for Brain-Computer Interface",
    companySlug: "shanghaitech-bci-center",
    dateLabel: "May 13, 2026",
    sortDate: "2026-05-13",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E1",
    confidence: "high",
    summary:
      "ShanghaiTech University launched a dedicated BCI research center focused on neural interfaces, implantable systems, intelligent BCI systems, and clinical translation.",
    whyItMatters:
      "It adds a formal Shanghai academic BCI hub to the tracker, useful for watching future clinical and engineering output.",
    hypeCheck:
      "A center launch is infrastructure, not evidence of a working device or patient outcome.",
    sourceLinks: [
      source("ShanghaiTech BCI Research Center launch", "company-update", "https://www.shanghaitech.edu.cn/en/2026/0519/c1260a1122115/page.htm", "ShanghaiTech University")
    ],
    isSample: false
  },
  {
    id: "scut-pazhou-bci-transfer-2025",
    title: "SCUT/Pazhou multimodal BCI reports product-transfer progress",
    companySlug: "scut-pazhou-multimodal-bci",
    dateLabel: "2025",
    sortDate: "2025-12-01",
    status: "confirmed",
    type: "product-update",
    evidenceLevel: "E2",
    confidence: "medium",
    summary:
      "Guangzhou reporting described the SCUT/Pazhou multimodal BCI line moving wearable non-invasive BCI products into hospitals, homes, and sports settings.",
    whyItMatters:
      "It represents a translational non-invasive BCI path in Guangdong grounded in a long academic publication record.",
    hypeCheck:
      "Product-transfer reporting is not a substitute for application-specific clinical trial data.",
    sourceLinks: [
      source("Guangzhou BCI product-transfer report", "news-report", "https://kjj.gz.gov.cn/xwlb/yw/content/post_10662998.html", "Guangzhou Science and Technology Bureau", false),
      source("Pazhou Lab Yuanqing Li profile", "company-update", "https://www.pazhoulab.com/2025/11/7252/", "Pazhou Lab"),
      source("Hybrid BCI wheelchair paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22692936/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering")
    ],
    isSample: false
  },
  {
    id: "shanghai-yansi-mandarin-speech-paper-2025",
    title: "Mandarin Chinese speech BCI paper published",
    companySlug: "shanghai-yansi-speech-bci",
    dateLabel: "Nov 2025",
    sortDate: "2025-11-07",
    status: "confirmed",
    type: "paper-published",
    evidenceLevel: "E4",
    confidence: "high",
    summary:
      "The Shanghai Yansi / Huashan collaboration published real-time full-spectrum Chinese speech decoding using a brain-computer interface.",
    whyItMatters:
      "Speech BCI evidence has been English-heavy; Mandarin decoding tests tonal-language communication restoration more directly.",
    hypeCheck:
      "The result is still a specialized research setting, not a take-home communication product for Mandarin speakers with paralysis.",
    sourceLinks: [
      source("Real-time decoding of full-spectrum Chinese paper", "paper", "https://www.science.org/doi/10.1126/sciadv.adz9968", "Science Advances"),
      source("PubMed record for Mandarin speech BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/41191764/", "PubMed"),
      source("Shanghai speech BCI government report", "company-update", "https://english.shanghai.gov.cn/en-InnovationPolicies/20250722/c4b71a2bb59b404e8a25660a8531b013.html", "Shanghai Municipal Government")
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
    id: "blackrock-neuroport-510k-2011",
    title: "NeuroPort cortical microelectrode array receives FDA 510(k) clearance",
    companySlug: "blackrock-neurotech",
    dateLabel: "Feb 9, 2011",
    sortDate: "2011-02-09",
    status: "confirmed",
    type: "approval-clearance",
    evidenceLevel: "E6",
    confidence: "high",
    summary:
      "FDA 510(k) K110010 lists Blackrock Microsystems' NeuroPort cortical microelectrode array system as substantially equivalent.",
    whyItMatters:
      "It is the key regulatory anchor for Blackrock's human-use cortical electrode platform.",
    hypeCheck:
      "This clearance covers the electrode/recording component and is not approval of the MoveAgain assistive BCI system or any chronic home-use BCI product.",
    sourceLinks: [
      source("FDA 510(k) K110010 NeuroPort entry", "regulatory-page", "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K110010", "U.S. FDA"),
      source("FDA 510(k) summary PDF", "regulatory-page", "https://www.accessdata.fda.gov/cdrh_docs/pdf11/K110010.pdf", "U.S. FDA"),
      source("NeuroPort Electrode 96 product page", "company-update", "https://blackrockneurotech.com/products/neuroport-electrode/", "Blackrock Neurotech")
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
      source("NeuroRestore press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore"),
      source("NeuroRestore official BSI video", "demo-video", "https://vimeo.com/829445531", "NeuroRestore / Vimeo")
    ],
    isSample: false
  },
  {
    id: "neurorestore-digital-bridge-video",
    title: "Official digital-bridge brain-spine walking video",
    companySlug: "neurorestore-epfl-bsi",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    classification: "actual-patient-use",
    evidenceLevel: "E4",
    setting: "Peer-reviewed human brain-spine interface study",
    summary:
      "NeuroRestore's official video accompanies the Nature digital-bridge result showing thought-controlled standing, walking, and stair climbing in one participant.",
    hypeCheck:
      "The video illustrates the peer-reviewed case; it is not evidence of routine clinical deployment or broad reproducibility.",
    sourceLinks: [
      source("NeuroRestore official BSI video", "demo-video", "https://vimeo.com/829445531", "NeuroRestore / Vimeo"),
      source("Brain-spine interface Nature paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("EPFL thought-controlled walking report", "company-update", "https://actu.epfl.ch/news/thought-controlled-walking-again-after-spinal-co-3/", "EPFL")
    ],
    isSample: false
  },
  {
    id: "clinatec-wimagine-exoskeleton-demo",
    title: "WIMAGINE-controlled exoskeleton proof-of-concept",
    companySlug: "clinatec-wimagine",
    dateLabel: "Oct 2019",
    sortDate: "2019-10-04",
    classification: "actual-patient-use",
    evidenceLevel: "E4",
    setting: "Peer-reviewed exoskeleton BCI proof-of-concept",
    summary:
      "A tetraplegic participant used two WIMAGINE epidural ECoG implants to control a four-limb exoskeleton in a supervised research setup.",
    hypeCheck:
      "The exoskeleton required extensive training and support; it was not a home mobility product.",
    sourceLinks: [
      source("Exoskeleton controlled by epidural BCI", "paper", "https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(19)30321-7/abstract", "The Lancet Neurology"),
      source("Exoskeleton controlled by BCI video", "demo-video", "https://www.youtube.com/watch?v=1GyJBBB8O_M", "YouTube", false),
      source("CEA WIMAGINE brain-spine and exoskeleton summary", "company-update", "https://www.cea.fr/presse/Pages/actualites-communiques/sante-sciences-du-vivant/innovation-wimagine-espoir-personnes-handicapees-recompense-ces-2024.aspx", "CEA")
    ],
    isSample: false
  },
  {
    id: "neucyber-beinao-spinal-stim-demo",
    title: "Beinao-1 brain-controlled spinal stimulation walking case",
    companySlug: "neucyber-beinao",
    dateLabel: "2026",
    sortDate: "2026-06-22",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "CIBR-reported human spinal-cord-injury case",
    summary:
      "CIBR reported a Beinao-1 participant using motor intention decoding to trigger spinal stimulation and exoskeleton-assisted walking with crutches.",
    hypeCheck:
      "The available evidence is institution/media reporting rather than a peer-reviewed human BSI outcomes paper.",
    sourceLinks: [
      source("CIBR Beinao No.1 achievement note", "company-update", "https://en.cibr.ac.cn/detail/cibrNewsnews/80c9eacb37164c5fadc21c696edf5cd7", "Chinese Institute for Brain Research, Beijing"),
      source("Beinao brain-spinal cord-exoskeleton report", "company-update", "https://www.globaltimes.cn/page/202605/1361687.shtml", "Global Times", false),
      source("Beinao-1 simultaneous BCI and spinal stimulation report", "company-update", "https://www.chinadailyhk.com/hk/article/635325", "Xinhua / China Daily Hong Kong", false)
    ],
    isSample: false
  },
  {
    id: "fudan-bsi-assisted-walking-demo",
    title: "Fudan brain-spine interface assisted walking reports",
    companySlug: "fudan-bsi",
    dateLabel: "Mar 2025",
    sortDate: "2025-03-05",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "Fudan/Huashan/Zhongshan proof-of-concept reporting",
    summary:
      "Fudan reported rapid leg movement and assisted stepping or walking outcomes after brain-spine interface surgeries for spinal cord injury.",
    hypeCheck:
      "Treat the video/reporting as early feasibility evidence until peer-reviewed protocols and follow-up are available.",
    sourceLinks: [
      source("Fudan English BSI report", "company-update", "https://www.fudan.edu.cn/en/2025/0305/c344a144344/page.htm", "Fudan University"),
      source("Fudan Chinese BSI feature", "company-update", "https://news.fudan.edu.cn/2025/0304/c1268a144336/page.htm", "Fudan University"),
      source("Fudan BSI video report", "demo-video", "https://cn.chinadaily.com.cn/a/202503/07/WS67ca8cd9a310510f19eea453.html", "China Daily", false)
    ],
    isSample: false
  },
  {
    id: "zju-spinal-interface-walking-demo",
    title: "ZJU closed-loop spinal interface walking demo",
    companySlug: "zju-nanhu-spinal-interface",
    dateLabel: "Jun 19, 2025",
    sortDate: "2025-06-19",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "Zhejiang University and SAHZU reported clinical case",
    summary:
      "ZJU reported a paraplegia participant standing and walking after an implanted closed-loop spinal nerve interface using stimulation, EMG sensing, and adaptive feedback.",
    hypeCheck:
      "This is spinal-interface evidence from BCI teams, but not yet direct cortical brain-spine decoding.",
    sourceLinks: [
      source("ZJU closed-loop spinal nerve interface report", "company-update", "https://www.zju.edu.cn/english/2025/0619/c19573a3063161/page.htm", "Zhejiang University"),
      source("ZJU/SAHZU walking video", "demo-video", "https://www.facebook.com/ZhejiangUniversityChina/videos/from-paralysis-to-walking-again-%EF%B8%8Fafter-a-devastating-spinal-injury-61-year-old-m/9811658218962668/", "Zhejiang University / Facebook", false)
    ],
    isSample: false
  },
  {
    id: "hainan-wukongbot-macaque-demo",
    title: "WukongBot human-intention to macaque lower-limb movement demo",
    companySlug: "hainan-wukongbot-bsi",
    dateLabel: "2025",
    sortDate: "2025-11-11",
    classification: "animal-demo",
    evidenceLevel: "E2",
    setting: "Preclinical Brain-Spine-Machine proof-of-concept",
    summary:
      "Hainan University reported human movement-intention signals driving alternating lower-limb movements in an anesthetized macaque through a non-invasive BCI and epidural stimulation loop.",
    hypeCheck:
      "The setup is preclinical and cross-species, so it should not be framed as restored walking in a human patient.",
    sourceLinks: [
      source("Hainan University BCI chip and Brain-Spine-Machine report", "company-update", "https://en.hainanu.edu.cn/info/1131/12891.htm", "Hainan University"),
      source("WukongBot BIO Integration paper", "paper", "https://bio-integration.org/10-15212-bioi-2025-0171/", "BIO Integration")
    ],
    isSample: false
  },
  {
    id: "tianjin-haihe-216-key-demo",
    title: "216-key non-invasive BCI typing/control demo",
    companySlug: "tianjin-haihe-bci",
    dateLabel: "May 18, 2023",
    sortDate: "2023-05-18",
    classification: "lab-demo",
    evidenceLevel: "E2",
    setting: "World Intelligence Congress public release",
    summary:
      "Tianjin University reported a high-speed non-invasive BCI spelling setup with a 216-key virtual keyboard and Chinese/English input switching.",
    hypeCheck:
      "This is a supervised public/demo result; it does not prove daily-use communication reliability.",
    sourceLinks: [
      source("TJU 216-key non-invasive BCI report", "company-update", "https://en.tju.edu.cn/info/1010/7179.htm", "Tianjin University"),
      source("High-speed hybrid BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/36608342/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering")
    ],
    isSample: false
  },
  {
    id: "nankai-interventional-bci-human-demo",
    title: "Interventional BCI plus FES impaired-limb movement case",
    companySlug: "nankai-interventional-bci",
    dateLabel: "Jul 2025",
    sortDate: "2025-07-03",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "Nankai-reported human clinical feasibility case",
    summary:
      "Nankai reported a human interventional BCI case where a hemiplegic patient regained the ability to grasp objects and retrieve medication after implantation and closed-loop FES training.",
    hypeCheck:
      "The demonstration is institution-reported and needs peer-reviewed outcomes plus longer follow-up.",
    sourceLinks: [
      source("Nankai human interventional BCI restoration report", "company-update", "https://en.nankai.edu.cn/2025/0911/c23047a577316/page.htm", "Nankai University")
    ],
    isSample: false
  },
  {
    id: "cas-cebsit-mind-control-demo",
    title: "Wireless invasive BCI gaming, wheelchair, and robot-dog demos",
    companySlug: "cas-cebsit-invasive-bci",
    dateLabel: "2025",
    sortDate: "2025-12-19",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "CAS/CEBSIT and Huashan public case reports",
    summary:
      "CAS/CEBSIT reports describe participants using an invasive wireless BCI for mind-controlled gaming and, in a later case, controlling a smart wheelchair and robot dog.",
    hypeCheck:
      "Public demos show feasibility, not endpoint-validated assistive use or long-term reliability.",
    sourceLinks: [
      source("CAS invasive BCI clinical-trial report", "company-update", "https://english.cas.cn/newsroom/cas_media/202506/t20250616_1045625.shtml", "Chinese Academy of Sciences"),
      source("CAS/CEBSIT second-case report", "company-update", "https://english.cas.cn/newsroom/cas_media/202512/t20251219_1138007.shtml", "Chinese Academy of Sciences"),
      source("CEBSIT wheelchair and robot-dog report", "news-report", "https://www.globaltimes.cn/page/202512/1350829.shtml", "Global Times", false)
    ],
    isSample: false
  },
  {
    id: "brainco-bionic-hand-demo",
    title: "BrainCo non-invasive bionic hand public-use reports",
    companySlug: "brainco",
    dateLabel: "2025-2026",
    sortDate: "2026-04-01",
    classification: "actual-patient-use",
    evidenceLevel: "E2",
    setting: "Commercial product and public deployment reporting",
    summary:
      "BrainCo official and Hangzhou reports describe users performing tasks with BrainCo bionic prosthetics controlled through non-invasive neural, muscle, and AI signal interpretation.",
    hypeCheck:
      "This supports product deployment, but it should not be treated as evidence for BrainCo's broader wellness or training claims.",
    sourceLinks: [
      source("BrainCo BCI technology and products", "company-update", "https://www.brainco.cn/en-US/technology", "BrainCo"),
      source("BrainCo accessibility update", "company-update", "https://www.brainco.cn/en-US/news/ss68tshjwmoocsayo5elb7nl", "BrainCo"),
      source("BrainCo bionic prosthetics production report", "news-report", "https://www.ehangzhou.gov.cn/2025-02/26/c_292773.htm", "Hangzhou Municipal Government", false)
    ],
    isSample: false
  },
  {
    id: "scut-pazhou-wheelchair-demo",
    title: "SCUT/Pazhou hybrid BCI wheelchair control",
    companySlug: "scut-pazhou-multimodal-bci",
    dateLabel: "2012-2016",
    sortDate: "2016-01-01",
    classification: "lab-demo",
    evidenceLevel: "E4",
    setting: "Peer-reviewed non-invasive BCI wheelchair research",
    summary:
      "SCUT/Pazhou's publication record includes hybrid EEG BCI systems for simulated and real wheelchair control plus automated indoor wheelchair navigation.",
    hypeCheck:
      "These are research prototypes and do not establish a marketed wheelchair-control medical product.",
    sourceLinks: [
      source("Hybrid BCI wheelchair paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22692936/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering"),
      source("Indoor BCI wheelchair paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/26054072/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering"),
      source("SCUT main BCI program summary", "company-update", "https://www2.scut.edu.cn/autonlab/4514/list.htm", "South China University of Technology")
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
    id: "yale-rtfmri-bci-manifold-paper",
    title: "Human learning of noninvasive brain-computer interfaces via manifold geometry",
    companySlug: "yale-rtfmri-bci",
    dateLabel: "Jun 9, 2026",
    sortDate: "2026-06-09",
    evidenceLevel: "E4",
    summary:
      "Nature Neuroscience paper from Yale reporting real-time fMRI BCI avatar control that learned faster when feedback mappings followed each participant's neural manifold geometry.",
    sourceLinks: [
      source("Nature Neuroscience rt-fMRI BCI paper", "paper", "https://www.nature.com/articles/s41593-026-02311-2", "Nature Neuroscience"),
      source("Yale rt-fMRI BCI news release", "company-update", "https://news.yale.edu/2026/06/09/brain-computer-interface-works-not-against-brain", "Yale University")
    ],
    isSample: false
  },
  {
    id: "cmu-tfus-bci-paper",
    title: "Transcranial focused ultrasound to V5 enhances human visual motion brain-computer interface by modulating feature-based attention",
    companySlug: "cmu-tfus-bci",
    dateLabel: "Jun 11, 2024",
    sortDate: "2024-06-11",
    evidenceLevel: "E4",
    summary:
      "Nature Communications paper from Carnegie Mellon researchers reporting a human EEG BCI speller study where V5-targeted transcranial focused ultrasound reduced visual-motion BCI error versus controls.",
    sourceLinks: [
      source("Nature Communications tFUS BCI paper", "paper", "https://www.nature.com/articles/s41467-024-48576-8", "Nature Communications"),
      source("CMU tFUS BCI news release", "company-update", "https://engineering.cmu.edu/news-events/news/2024/06/11-enhancing-bci.html", "Carnegie Mellon University")
    ],
    isSample: false
  },
  {
    id: "caltech-fus-bmi-paper",
    title: "Decoding motor plans using a closed-loop ultrasonic brain-machine interface",
    companySlug: "caltech-fus-bmi",
    dateLabel: "Nov 30, 2023",
    sortDate: "2023-11-30",
    evidenceLevel: "E2",
    summary:
      "Nature Neuroscience paper from Caltech/USC collaborators reporting closed-loop functional-ultrasound BMI control in two rhesus macaques, supporting a possible less-invasive epidural interface path.",
    sourceLinks: [
      source("Closed-loop ultrasonic BMI paper", "paper", "https://www.nature.com/articles/s41593-023-01500-7", "Nature Neuroscience"),
      source("Caltech ultrasound BMI news release", "company-update", "https://www.caltech.edu/about/news/reading-minds-with-ultrasound-a-less-invasive-technique-to-decode-the-brains-intentions", "Caltech")
    ],
    isSample: false
  },
  {
    id: "kernel-flow-device-paper",
    title: "Kernel Flow: a high channel count scalable time-domain functional near-infrared spectroscopy system",
    companySlug: "kernel-flow",
    dateLabel: "Jan 2022",
    sortDate: "2022-01-13",
    evidenceLevel: "E4",
    summary:
      "Peer-reviewed device paper describing Kernel Flow as a wearable time-domain fNIRS system for scalable, non-invasive optical brain imaging.",
    sourceLinks: [source("Kernel Flow device validation paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8765296/", "PubMed Central")],
    isSample: false
  },
  {
    id: "gowerlabs-lumo-evaluation-paper",
    title: "Evaluating a new generation of wearable high-density diffuse optical tomography technology",
    companySlug: "gowerlabs-lumo",
    dateLabel: "Apr 2021",
    sortDate: "2021-04-12",
    evidenceLevel: "E4",
    summary:
      "Peer-reviewed evaluation of wearable high-density diffuse optical tomography/fNIRS technology underlying the LUMO platform.",
    sourceLinks: [source("Wearable high-density fNIRS evaluation", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8033536/", "PubMed Central")],
    isSample: false
  },
  {
    id: "brain-innovation-turbo-satori-paper",
    title: "Turbo-Satori: a neurofeedback and brain-computer interface toolbox for real-time fNIRS",
    companySlug: "brain-innovation-rtfmri",
    dateLabel: "Oct 2017",
    sortDate: "2017-10-01",
    evidenceLevel: "E4",
    summary:
      "Neurophotonics paper describing Turbo-Satori as a real-time fNIRS toolbox for neurofeedback and BCI applications.",
    sourceLinks: [
      source("Turbo-Satori peer-reviewed paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5629919/", "PubMed Central"),
      source("Turbo-Satori publication record", "paper", "https://cris.maastrichtuniversity.nl/en/publications/turbo-satori-a-neurofeedback-and-brain-computer-interface-toolbox/", "Maastricht University")
    ],
    isSample: false
  },
  {
    id: "holland-bloorview-imagined-speech-fnirs-paper",
    title: "Online classification of imagined speech using functional near-infrared spectroscopy signals",
    companySlug: "holland-bloorview-prism",
    dateLabel: "2019",
    sortDate: "2019-01-01",
    evidenceLevel: "E4",
    summary:
      "Peer-reviewed online fNIRS BCI study from the PRISM/Holland Bloorview research line using imagined speech as a more intuitive communication paradigm.",
    sourceLinks: [source("Online fNIRS imagined-speech BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/30260320/", "PubMed")],
    isSample: false
  },
  {
    id: "maastricht-fmri-spelling-paper",
    title: "A real-time fMRI-based spelling device immediately enabling robust motor-independent communication",
    companySlug: "maastricht-rtfmri-bci",
    dateLabel: "Jun 28, 2012",
    sortDate: "2012-06-28",
    evidenceLevel: "E4",
    summary:
      "Current Biology paper reporting an fMRI-based spelling device that decoded freely chosen answers in real time within a single scanning session.",
    sourceLinks: [source("fMRI spelling device paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22748322/", "PubMed / Current Biology")],
    isSample: false
  },
  {
    id: "eth-relab-fnirs-bci-feasibility-paper",
    title: "Detection of motor execution using a hybrid fNIRS-biosignal BCI",
    companySlug: "eth-relab-fnirs",
    dateLabel: "Apr 2013",
    sortDate: "2013-04-19",
    evidenceLevel: "E4",
    summary:
      "Feasibility study testing single-trial motor-execution detection using a hybrid fNIRS and biosignal BCI approach tied to ETH Zurich's rehabilitation-interface research.",
    sourceLinks: [source("Hybrid fNIRS-biosignal BCI feasibility paper", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3637588/", "PubMed Central")],
    isSample: false
  },
  {
    id: "blackrock-neuroport-speech-paper",
    title: "An Accurate and Rapidly Calibrating Speech Neuroprosthesis",
    companySlug: "blackrock-neurotech",
    dateLabel: "Aug 15, 2024",
    sortDate: "2024-08-15",
    evidenceLevel: "E5",
    summary:
      "NEJM paper reporting a one-participant ALS speech neuroprosthesis that used four NeuroPort Arrays from Blackrock Neurotech in speech motor cortex.",
    sourceLinks: [
      source("NEJM speech neuroprosthesis paper", "paper", "https://www.nejm.org/doi/full/10.1056/NEJMoa2314132", "New England Journal of Medicine"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/", "PubMed Central")
    ],
    isSample: false
  },
  {
    id: "blackrock-utah-array-longevity-paper",
    title: "Longevity and reliability of chronic unit recordings using the Utah, intracortical multi-electrode arrays",
    companySlug: "blackrock-neurotech",
    dateLabel: "Dec 28, 2021",
    sortDate: "2021-12-28",
    evidenceLevel: "E4",
    summary:
      "Journal of Neural Engineering paper analyzing chronic unit-recording longevity and reliability for Utah intracortical multi-electrode arrays.",
    sourceLinks: [
      source("Utah array longevity and reliability paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/34847547/", "PubMed / Journal of Neural Engineering"),
      source("Open-access full text", "paper", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8981395/", "PubMed Central")
    ],
    isSample: false
  },
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
    id: "neurorestore-brain-spine-interface-paper",
    title: "Walking naturally after spinal cord injury using a brain-spine interface",
    companySlug: "neurorestore-epfl-bsi",
    dateLabel: "May 24, 2023",
    sortDate: "2023-05-24",
    evidenceLevel: "E4",
    summary:
      "Nature paper from the NeuroRestore/EPFL/CHUV/UNIL-led collaboration describing a wireless digital bridge between cortical signals and spinal cord stimulation in one participant with chronic tetraplegia.",
    sourceLinks: [
      source("Brain-spine interface paper", "paper", "https://www.nature.com/articles/s41586-023-06094-5", "Nature"),
      source("NeuroRestore BSI press summary", "company-update", "https://www.neurorestore.swiss/press-1/bci2023", "NeuroRestore"),
      source("NeuroRestore official BSI video", "demo-video", "https://vimeo.com/829445531", "NeuroRestore / Vimeo")
    ],
    isSample: false
  },
  {
    id: "hainan-wukongbot-bsi-paper",
    title: "WukongBot: A Brain-Spine Interface Proof of Concept Based on Non-Invasive Brain-Computer Interface for Spinal Cord Injury in a Monkey",
    companySlug: "hainan-wukongbot-bsi",
    dateLabel: "Nov 2025",
    sortDate: "2025-11-11",
    evidenceLevel: "E2",
    summary:
      "BIO Integration paper reporting a preclinical non-invasive BCI to epidural stimulation loop where human motion intentions drove lower-limb movements in an anesthetized macaque.",
    sourceLinks: [
      source("WukongBot BIO Integration paper", "paper", "https://bio-integration.org/10-15212-bioi-2025-0171/", "BIO Integration"),
      source("Hainan University BCI chip and Brain-Spine-Machine report", "company-update", "https://en.hainanu.edu.cn/info/1131/12891.htm", "Hainan University")
    ],
    isSample: false
  },
  {
    id: "tianjin-high-speed-hybrid-bci-paper",
    title: "A high-speed hybrid brain-computer interface with more than 200 targets",
    companySlug: "tianjin-haihe-bci",
    dateLabel: "2023",
    sortDate: "2023-01-01",
    evidenceLevel: "E4",
    summary:
      "Peer-reviewed paper from the Tianjin University BCI line describing a high-speed non-invasive hybrid BCI with more than 200 command targets.",
    sourceLinks: [
      source("High-speed hybrid BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/36608342/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering"),
      source("TJU 216-key non-invasive BCI report", "company-update", "https://en.tju.edu.cn/info/1010/7179.htm", "Tianjin University")
    ],
    isSample: false
  },
  {
    id: "nankai-interventional-bci-sheep-paper",
    title: "An Interventional Brain-Computer Interface for Long-Term EEG Collection and Motion Classification of a Quadruped Mammal",
    companySlug: "nankai-interventional-bci",
    dateLabel: "2025",
    sortDate: "2025-04-01",
    evidenceLevel: "E2",
    summary:
      "Preclinical paper describing Nankai's endovascular/interventional BCI approach for long-term intracerebral EEG collection and motion classification in sheep.",
    sourceLinks: [
      source("Interventional BCI long-term EEG sheep paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/40257874/", "PubMed"),
      source("Nankai sheep interventional BCI report", "company-update", "https://en.nankai.edu.cn/2022/0801/c22796a465078/page.htm", "Nankai University")
    ],
    isSample: false
  },
  {
    id: "scut-hybrid-bci-wheelchair-paper",
    title: "A hybrid brain computer interface to control the direction and speed of a simulated or real wheelchair",
    companySlug: "scut-pazhou-multimodal-bci",
    dateLabel: "2012",
    sortDate: "2012-09-01",
    evidenceLevel: "E4",
    summary:
      "Peer-reviewed SCUT-linked paper reporting hybrid EEG BCI control of simulated and real wheelchairs using motor imagery and P300 signals.",
    sourceLinks: [
      source("Hybrid BCI wheelchair paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/22692936/", "PubMed / IEEE Transactions on Neural Systems and Rehabilitation Engineering"),
      source("SCUT main BCI program summary", "company-update", "https://www2.scut.edu.cn/autonlab/4514/list.htm", "South China University of Technology")
    ],
    isSample: false
  },
  {
    id: "shanghai-yansi-mandarin-speech-bci-paper",
    title: "Real-time decoding of full-spectrum Chinese using brain-computer interface",
    companySlug: "shanghai-yansi-speech-bci",
    dateLabel: "Nov 2025",
    sortDate: "2025-11-07",
    evidenceLevel: "E4",
    summary:
      "Science Advances paper reporting real-time Mandarin Chinese speech decoding from high-density flexible ECoG signals, connected to the Shanghai Yansi / Huashan speech BCI line.",
    sourceLinks: [
      source("Real-time decoding of full-spectrum Chinese paper", "paper", "https://www.science.org/doi/10.1126/sciadv.adz9968", "Science Advances"),
      source("PubMed record for Mandarin speech BCI paper", "paper", "https://pubmed.ncbi.nlm.nih.gov/41191764/", "PubMed"),
      source("Shanghai speech BCI government report", "company-update", "https://english.shanghai.gov.cn/en-InnovationPolicies/20250722/c4b71a2bb59b404e8a25660a8531b013.html", "Shanghai Municipal Government")
    ],
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
