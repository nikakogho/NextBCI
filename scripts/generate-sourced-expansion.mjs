import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const researchedOn = "2026-07-31";
const targetCompanies = 100;
const targetAcademic = 200;

const academicHomepageOverrides = {
  "University of Virginia": "https://www.virginia.edu/",
  "Providence VA Medical Center": "https://www.va.gov/providence-health-care/",
  "Centre Hospitalier Sainte-Anne": "https://www.ghu-paris.fr/",
  "University of Würzburg": "https://www.uni-wuerzburg.de/en/",
  "Chinese People's Armed Police Force Engineering University": "https://www.cppu.edu.cn/",
  "Korea Institute of Science and Technology": "https://www.kist.re.kr/eng/index.do",
  "Tel Aviv University": "https://english.tau.ac.il/",
  "Bernstein Center for Computational Neuroscience Freiburg": "https://bcf.uni-freiburg.de/",
  "Daegu Gyeongbuk Institute of Science and Technology": "https://www.dgist.ac.kr/eng/",
  "Dalian Medical University": "https://english.dmu.edu.cn/",
  "Don Carlo Gnocchi Foundation": "https://www.dongnocchi.it/",
  "Hadassah Medical Center": "https://www.hadassah.org.il/en/",
  "Hanyang University": "https://www.hanyang.ac.kr/web/eng"
};

const fixedAcademicReplacements = [{
  retire: "Health Sciences Centre",
  id: "https://www.lahore.comsats.edu.pk/AboutCIIT/whycui.aspx",
  display_name: "COMSATS University Islamabad",
  type: "education",
  country_code: "PK",
  homepage: "https://www.comsats.edu.pk/",
  geo: { city: "Lahore", region: "Punjab", latitude: 31.5204, longitude: 74.3587 },
  paper: {
    title: "A mental state aware brain computer interface for adaptive control of electric powered wheelchair",
    year: 2025,
    url: "https://doi.org/10.1038/s41598-024-82252-7",
    publisher: "Scientific Reports"
  },
  papers: [{ id: "https://doi.org/10.1038/s41598-024-82252-7" }]
}];

const openAlexTerms = [
  "brain computer interface",
  "brain machine interface",
  "neural interface",
  "neuroprosthesis",
  "deep brain stimulation",
  "spinal cord stimulation",
  "vagus nerve stimulation",
  "transcranial magnetic stimulation",
  "transcranial direct current stimulation",
  "focused ultrasound neuromodulation",
  "intracortical electrode",
  "electrocorticography interface",
  "closed loop neurostimulation",
  "EEG neurofeedback",
  "cochlear implant",
  "retinal implant",
  "neural recording electrode",
  "functional electrical stimulation",
  "wearable EEG",
  "brain decoding"
];

const redditFeeds = [
  {
    kind: "europe",
    url: "https://www.reddit.com/user/NeurotechNewsletter/comments/1v0sen5/neurotech_in_europe_market_map_and_taxonomy/.rss",
    auditUrl: "https://www.reddit.com/user/NeurotechNewsletter/comments/1v0sen5/neurotech_in_europe_market_map_and_taxonomy/"
  },
  {
    kind: "israel",
    url: "https://www.reddit.com/user/NeurotechNewsletter/comments/1v6g56v/neurotech_in_israel_market_map_and_taxonomy/.rss",
    auditUrl: "https://www.reddit.com/user/NeurotechNewsletter/comments/1v6g56v/neurotech_in_israel_market_map_and_taxonomy/"
  }
];

const israelAuditUrl = "https://www.reddit.com/user/NeurotechNewsletter/comments/1v6g56v/neurotech_in_israel_market_map_and_taxonomy/";
const fallbackIsraeliCompanies = [
  ["brain.space", "https://www.brain.space/", "Dry-sensor EEG and brain-data platform"],
  ["Excellent Brain", "https://excellent-brain.com/", "At-home EEG neurofeedback for attention and focus"],
  ["Hemispheric", "https://www.hemispheric.ai/", "Non-invasive brain-decoding foundation models"],
  ["i-BrainTech", "https://www.i-brain.tech/", "EEG neurofeedback for human performance"],
  ["InnerEye", "https://innereye.ai/", "EEG and computer-vision systems for human-machine teaming"],
  ["Myndlift", "https://www.myndlift.com/", "Home EEG neurofeedback platform"],
  ["NeuroBrave", "https://neurobrave.com/", "EEG analytics and neurotechnology platform"],
  ["NeuroHelp", "https://www.neuro-help.com/en", "Home EEG seizure forecasting and epilepsy monitoring"],
  ["Neurosteer", "https://www.neurosteer.com/", "Single-channel clinical EEG platform"],
  ["Nuri Braintech", "https://nuribrain.tech/", "PTSD-focused neural measurement and stimulation"],
  ["Wearable Devices", "https://www.wearabledevices.co.il/", "Neural wrist interface for gesture and muscle-signal control"],
  ["X-trodes", "https://xtrodes.com/", "Conformal skin electrodes for EEG, EMG, ECG, and EOG"],
  ["ActualSignal", "https://actualsignal.com/", "Continuous Parkinson's monitoring using computer vision and wearables"],
  ["BrainVivo", "https://brainvivo.com/", "AI brain imaging and functional mapping"],
  ["ELDA BrainTech", "https://www.elda-ai.com/", "Combined EEG-fMRI localization for epilepsy"],
  ["Firefly Neuroscience", "https://fireflyneuro.com/", "EEG-based brain-network analytics"],
  ["NeuraLight", "https://www.neuralight.ai/", "Oculometric digital biomarkers for neurological disease"],
  ["NeuroTrax", "https://www.neurotrax.com/", "Computerized cognitive and neurological assessment"],
  ["QuantalX Neuroscience", "https://quantalx.com/", "Electrophysiological response testing and brain-function diagnostics"],
  ["Viasonix", "https://viasonix.com/", "Transcranial Doppler and vascular diagnostics"],
  ["BrainQ", "https://brainqtech.com/", "Electromagnetic neuromodulation for stroke-recovery research"],
  ["Modulight Biotherapeutics", "https://www.modulight.bio/", "Optogenetic precision neuromodulation"],
  ["Neuro-Joy", "https://neuro-joy.com/", "Non-invasive limbic-pathway stimulation for anxiety"],
  ["Nyx Technologies", "https://www.nyx-tech.com/", "Wearable sleep neurotechnology"],
  ["Theranica", "https://theranica.com/", "Remote electrical neuromodulation wearable for migraine"],
  ["Medoc", "https://www.medoc-web.com/", "Quantitative sensory testing and pain-neurophysiology diagnostics"],
  ["Mon4t", "https://mon4t.com/", "Smartphone-based neurological assessment"],
  ["BlueWind Medical", "https://www.bluewindmedical.com/", "Implantable tibial-nerve stimulation"],
  ["BrainsWay", "https://www.brainsway.com/", "Deep transcranial magnetic stimulation systems"],
  ["Insightec", "https://insightec.com/", "MR-guided focused ultrasound for movement disorders"],
  ["Alpha Omega", "https://www.alphaomega-eng.com/", "Microelectrode recording and deep-brain-stimulation navigation"],
  ["Ceretrieve", "https://www.ceretrieve.com/", "Neurointerventional thrombectomy technology"],
  ["Inretio", "https://www.inretio.co.il/", "Protective clot-retrieval technology for ischemic stroke"],
  ["Motion Informatics", "https://motioninformatics.ai/", "FES, NMES, biofeedback, and AI-assisted rehabilitation"],
  ["Nervio", "https://www.nervio.ai/", "AI-assisted intraoperative neuromonitoring"],
  ["Rapid Medical", "https://www.rapid-medical.com/", "Adjustable neurovascular devices for stroke and aneurysm treatment"],
  ["SurgiAI", "https://surgi.ai/", "AI-assisted brain-shift and surgical navigation"]
].map(([name, website, description]) => ({
  name,
  website,
  country: "Israel",
  description,
  auditUrl: israelAuditUrl,
  auditTitle: "July 2026 Israeli neurotechnology market audit",
  auditPublisher: "The Neurotech Newsletter"
}));

const fallbackCurrentCompanies = [
  ["Augmental", "https://www.augmental.tech/", "United States", "In-mouth tongue interface for hands-free digital control", "augmental"],
  ["Solvemed", "https://solvemed.ai/", "Poland", "Camera-based pupillometry for neurological assessment", "solvemed-pure-pupillometer"],
  ["ATLAS Neuroengineering", "https://www.atlasneuro.com/", "Belgium", "Neural recording electrodes and neuroengineering research tools", "atlas-neuroengineering"],
  ["Divergence Neuro", "https://www.divergenceneuro.com/", "Canada", "EEG neurofeedback and brain-state analytics platform", "divergence-neuro"],
  ["Invictus BCI", "http://www.invictusbci.com/", "Canada", "Brain-computer interface research and assistive-control systems", "invictus-bci-incorporated"],
  ["Neurawear", "https://neurawear.co/", "Japan", "Wearable neural sensing and neurofeedback technology", "neurawear"],
  ["Neurosity", "https://neurosity.co/", "United States", "Wearable EEG hardware and developer interfaces", "neurosity"],
  ["Nuroflux", "https://nuroflux.com/", "Australia", "Wearable brain and blood-flow monitoring for stroke and neurological care", "nuroflux"],
  ["SensorStim Neurotechnology", "https://www.sensorstim.de/", "Germany", "EEG-informed sensory stimulation and neurotechnology systems", "sensorstim-neurotechnology-gmbh"],
  ["Openwater", "https://www.openwater.health/", "United States", "Optical brain sensing and therapeutic neurotechnology", "openwater"],
  ["Piramidal", "https://piramidal.ai/", "United States", "AI foundation models for clinical EEG", "piramidal-yc-w24"],
  ["PLUX Biosignals", "https://pluxbiosignals.com/", "Portugal", "EEG, EMG, and biosignal acquisition systems for research", "plux-biosignals"],
  ["Rhythmlink", "https://rhythmlink.com/", "United States", "Electrodes and accessories for EEG and intraoperative neuromonitoring", "rhythmlink-international-llc"],
  ["Zeto", "https://zeto-inc.com/", "United States", "Rapid-setup full-montage clinical EEG systems", "zeto-rapid-full-montage-eeg"],
  ["Cerenion", "https://cerenion.com/", "Finland", "Bedside EEG measurement and brain-function analysis for intensive care", "cerenion-oy"],
  ["Bearmind", "https://bearmind.tech/", "Switzerland", "Helmet-integrated head-impact sensing and neurological risk monitoring", "bearmind"],
  ["Great Lakes NeuroTechnologies", "https://glneurotech.com/", "United States", "Wearable sensing and quantitative assessment for movement disorders", "great-lakes-neurotechnologies"],
  ["CEFALY Technology", "https://cefaly.com/", "Belgium", "External trigeminal-nerve stimulation for migraine", "cefaly-technology"],
  ["EB Neuro", "http://www.ebneuro.com/", "Italy", "Clinical EEG, EMG, and neurophysiology systems", "eb-neuro-s-p-a"],
  ["Enspire DBS Therapy", "http://www.enspiredbs.com/", "United States", "Deep-brain-stimulation research for post-stroke recovery", "enspire-dbs-therapy-inc"],
  ["Control Bionics", "http://www.controlbionics.com/", "Australia", "EMG and eye-tracking assistive communication systems", "control-bionics-asx-cbl"],
  ["Phagenesis", "https://phagenesis.com/", "United Kingdom", "Pharyngeal electrical stimulation for neurogenic dysphagia", "phagenesis"]
].map(([name, website, country, description, directorySlug]) => ({
  name,
  website,
  country,
  description,
  auditUrl: `https://neurotech.com/directory/${directorySlug}`,
  auditTitle: "Current NeuroTech.com company directory profile",
  auditPublisher: "NeuroTech.com"
}));

const inactiveCompanyReplacements = [
  {
    retire: "Entorian Technologies",
    name: "HippoScreen Neurotech",
    website: "https://www.hipposcreen-nc.com/",
    country: "Taiwan",
    description: "AI-assisted EEG screening for depression and cognitive-decline risk",
    auditUrl: "https://neurotech.com/directory/hipposcreen-neurotech-corp",
    auditTitle: "Current NeuroTech.com company directory profile",
    auditPublisher: "NeuroTech.com"
  },
  {
    retire: "Neurescence",
    name: "NeuroCatch",
    website: "https://www.neurocatch.com/",
    country: "Canada",
    description: "Rapid EEG event-related-potential assessment of cognitive brain function",
    auditUrl: "https://www.neurocatch.com/news/",
    auditTitle: "Dated official NeuroCatch news and activity record",
    auditPublisher: "NeuroCatch"
  },
  {
    retire: "Neuroadaptive Technologies",
    name: "Parley Neurotech",
    website: "https://www.parley-neuro.com/",
    country: "United States",
    description: "Audio stimulation and investigational therapy for central hearing loss",
    auditUrl: "https://neurotech.com/directory/parley-neurotech-inc",
    auditTitle: "Current NeuroTech.com company directory profile",
    auditPublisher: "NeuroTech.com"
  },
  {
    retire: "Neurolutions",
    name: "neuromore",
    website: "https://neuromore.com/",
    country: "United States",
    description: "Device-agnostic real-time EEG and biosignal software for neurofeedback and brain-responsive applications",
    auditUrl: "https://neurotech.com/directory/neuromore",
    auditTitle: "Current NeuroTech.com company directory profile",
    auditPublisher: "NeuroTech.com"
  },
  {
    retire: "NAOX",
    name: "Otolith Labs",
    website: "https://otolithlabs.com/",
    country: "United States",
    description: "Non-invasive vestibular resonance stimulation in a head-worn investigational device for chronic vertigo",
    auditUrl: "https://otolithlabs.com/about/",
    auditTitle: "Official company history and current leadership page",
    auditPublisher: "Otolith Labs"
  }
];

const countryFallbacks = {
  Austria: ["Country-level location", 47.5162, 14.5501, "europe"],
  Australia: ["Country-level location", -25.2744, 133.7751, "rest-of-world"],
  Belgium: ["Country-level location", 50.5039, 4.4699, "europe"],
  Bulgaria: ["Country-level location", 42.7339, 25.4858, "europe"],
  Croatia: ["Country-level location", 45.1, 15.2, "europe"],
  Canada: ["Country-level location", 56.1304, -106.3468, "north-america"],
  China: ["Country-level location", 35.8617, 104.1954, "asia"],
  Cyprus: ["Country-level location", 35.1264, 33.4299, "europe"],
  Czechia: ["Country-level location", 49.8175, 15.473, "europe"],
  Denmark: ["Country-level location", 56.2639, 9.5018, "europe"],
  Estonia: ["Country-level location", 58.5953, 25.0136, "europe"],
  Finland: ["Country-level location", 61.9241, 25.7482, "europe"],
  France: ["Country-level location", 46.2276, 2.2137, "europe"],
  Germany: ["Country-level location", 51.1657, 10.4515, "europe"],
  Greece: ["Country-level location", 39.0742, 21.8243, "europe"],
  Hungary: ["Country-level location", 47.1625, 19.5033, "europe"],
  Iceland: ["Country-level location", 64.9631, -19.0208, "europe"],
  Ireland: ["Country-level location", 53.1424, -7.6921, "europe"],
  Israel: ["Country-level location", 31.0461, 34.8516, "asia"],
  Italy: ["Country-level location", 41.8719, 12.5674, "europe"],
  Japan: ["Country-level location", 36.2048, 138.2529, "asia"],
  Latvia: ["Country-level location", 56.8796, 24.6032, "europe"],
  Lithuania: ["Country-level location", 55.1694, 23.8813, "europe"],
  Luxembourg: ["Country-level location", 49.8153, 6.1296, "europe"],
  Malta: ["Country-level location", 35.9375, 14.3754, "europe"],
  Netherlands: ["Country-level location", 52.1326, 5.2913, "europe"],
  Norway: ["Country-level location", 60.472, 8.4689, "europe"],
  Poland: ["Country-level location", 51.9194, 19.1451, "europe"],
  Portugal: ["Country-level location", 39.3999, -8.2245, "europe"],
  Romania: ["Country-level location", 45.9432, 24.9668, "europe"],
  Serbia: ["Country-level location", 44.0165, 21.0059, "europe"],
  Singapore: ["Country-level location", 1.3521, 103.8198, "asia"],
  Slovakia: ["Country-level location", 48.669, 19.699, "europe"],
  Slovenia: ["Country-level location", 46.1512, 14.9955, "europe"],
  Spain: ["Country-level location", 40.4637, -3.7492, "europe"],
  Sweden: ["Country-level location", 60.1282, 18.6435, "europe"],
  Switzerland: ["Country-level location", 46.8182, 8.2275, "europe"],
  "South Korea": ["Country-level location", 35.9078, 127.7669, "asia"],
  Taiwan: ["Country-level location", 23.6978, 120.9605, "asia"],
  Turkey: ["Country-level location", 38.9637, 35.2433, "asia"],
  "United Kingdom": ["Country-level location", 55.3781, -3.436, "europe"],
  "United States": ["Country-level location", 39.8283, -98.5795, "north-america"]
};

const sleep = (milliseconds) => new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));

const fetchText = async (url, attempts = 5) => {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "NextBCI evidence research/1.0" } });
      if (response.ok) return await response.text();
      lastError = new Error(`${response.status} ${response.statusText} for ${url}`);
      if (response.status !== 429 && response.status < 500) break;
      const retryAfterSeconds = Number(response.headers.get("retry-after"));
      if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
        await sleep(Math.min(55_000, retryAfterSeconds * 1_000));
      }
    } catch (error) {
      lastError = error;
    }
    await sleep(5_000 * (attempt + 1));
  }
  throw lastError;
};

const fetchJson = async (url) => JSON.parse(await fetchText(url, 7));

const decodeEntities = (input) => {
  let value = input;
  for (let pass = 0; pass < 3; pass += 1) {
    value = value
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&apos;", "'")
      .replaceAll("&amp;", "&");
  }
  return value;
};

const stripTags = (input) => decodeEntities(input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

const slugify = (input) =>
  input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);

const normalizeName = (input) =>
  input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(incorporated|corporation|company|limited|inc|corp|ltd|llc|plc|ag|gmbh|sa|bv|technology|technologies|tech)\b/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();

const registrableHost = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    const labels = host.split(".");
    const multiPartSuffix = /\.(ac\.uk|co\.uk|org\.uk|edu\.au|ac\.jp|edu\.cn|edu\.sg|ac\.kr)$/i.test(host);
    return labels.slice(-(multiPartSuffix ? 3 : 2)).join(".");
  } catch {
    return "";
  }
};

const cleanCountry = (raw) => {
  const value = stripTags(raw).split(";")[0].split("/")[0].trim();
  const aliases = {
    UK: "United Kingdom",
    "United Kingdom/US": "United Kingdom",
    "Germany/US": "Germany",
    "Italy/US": "Italy",
    "Switzerland/US": "Switzerland",
    "Netherlands/US": "Netherlands",
    "Belgium/US": "Belgium"
  };
  return aliases[value] ?? value;
};

const countryName = (code) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
};

const regionForCountryCode = (code) => {
  if (["US", "CA", "MX"].includes(code)) return "north-america";
  if (["AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB"].includes(code)) return "europe";
  if (["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "GE", "HK", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MO", "MY", "MV", "MN", "MM", "NP", "KP", "OM", "PK", "PS", "PH", "QA", "SA", "SG", "KR", "LK", "SY", "TW", "TJ", "TH", "TR", "TM", "AE", "UZ", "VN", "YE"].includes(code)) return "asia";
  return "rest-of-world";
};

const classifyTechnology = (text) => {
  const value = text.toLowerCase();
  if (/intracort|ecog|electrocortic|deep.brain|brain implant|implanted brain|retinal implant|neural probe/.test(value)) {
    return { category: "invasive", modality: "Implanted neural recording or stimulation", deviceTypes: [value.includes("deep brain") ? "dbs" : value.includes("ecog") || value.includes("electrocortic") ? "ecog" : "neural-probe"] };
  }
  if (/spinal cord|vagus|peripheral nerve|cochlear implant|implant|neurostimulation/.test(value)) {
    return { category: "minimally-invasive", modality: "Implantable or peripheral neuromodulation", deviceTypes: [value.includes("spinal") ? "spinal-stimulation" : "peripheral-stimulation"] };
  }
  if (/magnetic|tms/.test(value)) return { category: "non-invasive", modality: "Transcranial magnetic stimulation", deviceTypes: ["tms"] };
  if (/ultrasound/.test(value)) return { category: "non-invasive", modality: "Focused-ultrasound neuromodulation", deviceTypes: ["ultrasound"] };
  if (/fnirs|near-infrared/.test(value)) return { category: "non-invasive", modality: "Optical neural sensing", deviceTypes: ["fnirs"] };
  if (/\beeg\b|neurofeedback/.test(value)) return { category: "non-invasive", modality: "EEG or non-invasive neural decoding", deviceTypes: ["eeg"] };
  if (/\bfmri\b|functional mri/.test(value)) return { category: "non-invasive", modality: "Functional magnetic-resonance neuroimaging", deviceTypes: ["fmri"] };
  if (/\bmri\b|magnetic resonance|brain imaging|brain mapping/.test(value)) return { category: "non-invasive", modality: "Magnetic-resonance neuroimaging", deviceTypes: ["mri"] };
  if (/eye.track|pupillometr/.test(value)) return { category: "non-invasive", modality: "Eye tracking or pupillometry", deviceTypes: ["eye-tracking"] };
  if (/myoelectric|\bemg\b|bionic|prosthe|exoskeleton|orthosis|robotic|rehabilitation|\bgait\b/.test(value)) {
    const deviceTypes = /myoelectric|\bemg\b|bionic|prosthe/.test(value) ? ["emg", "rehab-robotics"] : ["rehab-robotics"];
    if (/brain.computer|brain.machine|\bbci\b/.test(value)) deviceTypes.unshift("bci-unspecified");
    return { category: "non-invasive", modality: "Assistive control or neurorehabilitation", deviceTypes };
  }
  if (/\bfes\b|\bnmes\b|electrical stimulation|cranio.electro/.test(value)) return { category: "non-invasive", modality: "Non-invasive electrical stimulation or rehabilitation", deviceTypes: ["tes"] };
  if (/electrode|electrophysiolog|neural recording|neural interface|depth electrode|neuromonitor/.test(value)) return { category: "unspecified", modality: "Neural recording or interface infrastructure", deviceTypes: ["neural-probe"] };
  if (/neurovascular|thrombectomy|brain.shift|surgical navigation|neurosurg|inside the skull|shunt/.test(value)) return { category: "minimally-invasive", modality: "Neurosurgical or neurovascular technology", deviceTypes: ["neurosurgical"] };
  if (/computer vision|camera.based|digital cognitive|movement analysis|wearable monitoring|parkinson.s monitoring/.test(value)) return { category: "non-invasive", modality: "Digital neurological assessment or monitoring", deviceTypes: ["digital-neurology"] };
  if (/optogenetic|light.and.sound|light therapy|audio.visual|binaural|microscop|laser/.test(value)) return { category: "non-invasive", modality: "Optical or sensory neurotechnology", deviceTypes: ["optical-imaging"] };
  if (/brain.computer|brain.machine|brain decoding|\bbci\b/.test(value)) {
    return { category: /non.invasive/.test(value) ? "non-invasive" : "unspecified", modality: "Brain-computer interface (device type not verified)", deviceTypes: ["bci-unspecified"] };
  }
  return { category: "unspecified", modality: "Neural sensing, analysis, or stimulation (device type not verified)", deviceTypes: ["other-neurotech"] };
};

const relevantTitle = (title) => /brain[\s–-]*(computer|machine)|neural interface|neuroprost|deep brain stimulation|spinal cord stimulation|vagus nerve stimulation|transcranial|focused ultrasound|intracort|electrocortic|neurostimulation|neurofeedback|cochlear implant|retinal implant|neural recording|functional electrical stimulation|wearable eeg|brain decoding/i.test(title);

const parseCompanyFeeds = async () => {
  const candidates = [];
  for (const feed of redditFeeds) {
    let html;
    try {
      html = decodeEntities(await fetchText(feed.url));
    } catch (error) {
      console.warn(`Skipping temporarily unavailable feed ${feed.url}: ${error.message}`);
      continue;
    }
    if (feed.kind === "europe") {
      const matches = [...html.matchAll(/<a href="([^"]+)">([^<]+)<\/a>\s*\|\s*([^|<]+)\|\s*([^<]+)/g)];
      for (const match of matches) {
        const qualifier = stripTags(match[3]);
        if (/historical|hold|remove|provisional|active inside owner|likely active/i.test(qualifier)) continue;
        const country = cleanCountry(qualifier);
        if (!countryFallbacks[country]) continue;
        candidates.push({ name: stripTags(match[2]), website: decodeEntities(match[1]), country, description: stripTags(match[4]), auditUrl: feed.auditUrl, auditTitle: "July 2026 regional neurotechnology market audit", auditPublisher: "The Neurotech Newsletter" });
      }
    } else {
      const directBlock = html.split(/Active adjacent ecosystem/i)[0];
      const matches = [...directBlock.matchAll(/(?:•|&#8226;)?\s*<a href="([^"]+)">([^<]+)<\/a>\s*:\s*([^<]+)/g)];
      for (const match of matches) {
        candidates.push({ name: stripTags(match[2]), website: decodeEntities(match[1]), country: "Israel", description: stripTags(match[3]), auditUrl: feed.auditUrl, auditTitle: "July 2026 Israeli neurotechnology market audit", auditPublisher: "The Neurotech Newsletter" });
      }
    }
  }
  return candidates;
};

const directoryCountry = (location) => {
  const last = location.split(",").at(-1)?.trim() ?? "";
  const aliases = { USA: "United States", US: "United States", UK: "United Kingdom", Korea: "South Korea", "South Korea": "South Korea" };
  if (aliases[last]) return aliases[last];
  if (countryFallbacks[last]) return last;
  if (/\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/.test(location)) return "United States";
  return "";
};

const parseNeurotechDirectory = async () => {
  const directoryUrl = "https://neurotech.com/directory";
  const html = await fetchText(directoryUrl);
  const allowedCategories = new Set(["Brain-Computer Interfaces", "Neuromodulation", "Neurodiagnostics", "Neurofeedback", "Research Tools", "Neurotechnology"]);
  const cards = [...html.matchAll(/<a class="rounded-2xl[\s\S]*?<\/a>/g)]
    .map((match) => match[0])
    .map((card) => {
      const slug = card.match(/href="\/directory\/([^"]+)"/)?.[1];
      const fields = [...card.matchAll(/<p[^>]*>([^<]+)<\/p>/g)].map((match) => stripTags(match[1]));
      const location = card.match(/<span class="text-xs text-gray-400">([^<]+)<\/span>/)?.[1];
      return { slug, name: fields[0], category: fields[1], description: fields[2], location: stripTags(location ?? "") };
    })
    .filter((card) => card.slug && card.name && card.description && allowedCategories.has(card.category));

  const candidates = [];
  for (let offset = 0; offset < cards.length; offset += 12) {
    const batch = cards.slice(offset, offset + 12);
    const details = await Promise.all(batch.map(async (card) => {
      try {
        const profileUrl = `${directoryUrl}/${card.slug}`;
        const profile = await fetchText(profileUrl, 2);
        const website = profile.match(/>Website<\/p><a href="([^"]+)"/)?.[1];
        return { ...card, profileUrl, website };
      } catch {
        return { ...card };
      }
    }));
    for (const detail of details) {
      const country = directoryCountry(detail.location);
      if (!detail.website || !country || !countryFallbacks[country]) continue;
      candidates.push({
        name: detail.name,
        website: decodeEntities(detail.website),
        country,
        description: detail.description,
        auditUrl: detail.profileUrl,
        auditTitle: "Current NeuroTech.com company directory profile",
        auditPublisher: "NeuroTech.com"
      });
    }
  }
  return candidates;
};

const parseCheckedInCompanySnapshot = async () => {
  try {
    const markdown = await readFile(resolve(projectRoot, "docs", "sourced-neurotechnology-expansion-2026.md"), "utf8");
    const companyBlock = markdown.split("## Companies (100)")[1]?.split("## Academic and institutional organizations")[0] ?? "";
    return [...companyBlock.matchAll(/^\|\s*\d+\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*\[Official\]\(([^)]+)\).*?\[Audit\]\(([^)]+)\)\s*\|$/gm)].map((match) => {
      const auditUrl = match[5].trim();
      const isDirectory = auditUrl.includes("neurotech.com/directory/");
      return {
        name: match[1].trim().replaceAll("\\|", "|"),
        country: match[2].trim(),
        description: match[3].trim().replaceAll("\\|", "|"),
        website: match[4].trim(),
        auditUrl,
        auditTitle: isDirectory ? "Current NeuroTech.com company directory profile" : "July 2026 regional neurotechnology market audit",
        auditPublisher: isDirectory ? "NeuroTech.com" : "The Neurotech Newsletter"
      };
    });
  } catch {
    return [];
  }
};

const collectOpenAlex = async () => {
  const institutions = new Map();
  for (const term of openAlexTerms) {
    const url = new URL("https://api.openalex.org/works");
    url.searchParams.set("search", `\"${term}\"`);
    url.searchParams.set("filter", "from_publication_date:2023-01-01,to_publication_date:2026-07-31");
    url.searchParams.set("sort", "cited_by_count:desc");
    url.searchParams.set("per-page", "200");
    url.searchParams.set("select", "id,display_name,publication_year,doi,authorships,primary_location");
    const response = await fetchJson(url);
    for (const work of response.results ?? []) {
      if (!work.doi || !relevantTitle(work.display_name ?? "")) continue;
      const paper = {
        id: work.id,
        title: stripTags(work.display_name ?? ""),
        year: work.publication_year,
        url: work.doi,
        publisher: work.primary_location?.source?.display_name ?? "Peer-reviewed publication",
        term
      };
      for (const authorship of work.authorships ?? []) {
        for (const institution of authorship.institutions ?? []) {
          if (!institution.id) continue;
          const current = institutions.get(institution.id) ?? { ...institution, papers: [] };
          if (!current.papers.some((candidate) => candidate.id === paper.id)) current.papers.push(paper);
          institutions.set(institution.id, current);
        }
      }
    }
    await sleep(250);
  }
  return institutions;
};

const hydrateInstitutions = async (candidateIds) => {
  const details = new Map();
  const ids = [...candidateIds];
  for (let offset = 0; offset < ids.length; offset += 40) {
    const batch = ids.slice(offset, offset + 40).map((id) => id.split("/").at(-1)).join("|");
    const url = new URL("https://api.openalex.org/institutions");
    url.searchParams.set("filter", `openalex_id:${batch}`);
    url.searchParams.set("per-page", "100");
    url.searchParams.set("select", "id,display_name,homepage_url,geo,type,country_code,ror");
    const response = await fetchJson(url);
    for (const institution of response.results ?? []) details.set(institution.id, institution);
    await sleep(250);
  }
  return details;
};

const tsLiteral = (value) => JSON.stringify(value, null, 2);

const refreshCheckedInMetadata = async () => {
  const dataPath = resolve(projectRoot, "data", "sourced-expansion.ts");
  const raw = await readFile(dataPath, "utf8");
  const organizationMarker = "export const sourcedExpansionOrganizations: Company[] = ";
  const profileMarker = "export const sourcedExpansionResearchProfiles: CompanyResearchProfile[] = ";
  const organizationStart = raw.indexOf(organizationMarker) + organizationMarker.length;
  const profileDeclaration = raw.indexOf(profileMarker);
  const profileStart = profileDeclaration + profileMarker.length;
  if (organizationStart < organizationMarker.length || profileDeclaration < 0) {
    throw new Error("Could not parse the checked-in sourced expansion.");
  }
  const organizations = JSON.parse(raw.slice(organizationStart, raw.lastIndexOf(";", profileDeclaration)));
  const profiles = JSON.parse(raw.slice(profileStart, raw.lastIndexOf(";")));
  const previousAcademicHomepages = new Map();
  const academicTitleReplacements = new Map();

  for (const replacement of inactiveCompanyReplacements) {
    const organizationIndex = organizations.findIndex((organization) => organization.name === replacement.retire);
    const retiredOrganization = organizations[organizationIndex];
    if (organizationIndex < 0 || !retiredOrganization) continue;
    const technology = classifyTechnology(`${replacement.name} ${replacement.description}`);
    const fallback = countryFallbacks[replacement.country];
    const slug = slugify(replacement.name);
    organizations[organizationIndex] = {
      slug,
      name: replacement.name,
      kind: "company",
      category: technology.category,
      region: fallback[3],
      modality: technology.modality,
      targetFunction: replacement.description,
      stage: "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
      evidenceLevel: "E1",
      deviceTypes: technology.deviceTypes,
      organizationScale: "company-maturity-unverified",
      readiness: "readiness-unverified",
      hq: { city: fallback[0], country: replacement.country, lat: fallback[1], lng: fallback[2] },
      website: replacement.website,
      summary: `${replacement.name} is tracked for ${replacement.description.toLowerCase()}.`,
      hypeCheck: "The linked company site and dated discovery record establish a current technology lead, not clinical efficacy or product maturity. The map uses a country-level coordinate until a city is independently verified.",
      sourceLinks: [
        { title: `${replacement.name} official website`, url: replacement.website, publisher: replacement.name, sourceType: "company-update", isPrimary: true },
        { title: replacement.auditTitle, url: replacement.auditUrl, publisher: replacement.auditPublisher, sourceType: "news-report", isPrimary: replacement.auditPublisher === replacement.name }
      ],
      isSample: false
    };
    const profileIndex = profiles.findIndex((profile) => profile.companySlug === retiredOrganization.slug);
    if (profileIndex >= 0) profiles[profileIndex] = {
      companySlug: slug,
      companyName: replacement.name,
      researchedOn,
      sourceProfileUrl: replacement.auditUrl,
      officialWebsite: replacement.website,
      overview: `${replacement.name} is a currently listed neurotechnology company focused on ${replacement.description.toLowerCase()}.`,
      founding: { status: "not-verified", note: "A founding year and founders were not verified during this bounded expansion pass." },
      headquarters: { status: "country-only", display: replacement.country, note: "The dated discovery source supports the country assignment; the map intentionally uses a country-level coordinate pending city verification.", sourceUrl: replacement.auditUrl },
      companyValue: { status: "not-publicly-disclosed", label: "Not publicly disclosed", note: "No defensible current valuation was found in the sources used for this pass." },
      fundingStage: "Not independently verified",
      regulatoryStatus: "Not inferred from company inclusion; consult product-specific regulatory sources.",
      reportedAccomplishments: [{ note: `The company currently presents a technology line centered on ${replacement.description.toLowerCase()}.`, sourceUrl: replacement.website, publisher: replacement.name, evidence: "company-reported" }],
      papers: [],
      videos: [],
      notes: "This source-led profile deliberately leaves founders, valuation, funding, and regulatory status blank where they were not verified. It should be deepened before promoting performance claims."
    };
  }

  for (const replacement of fixedAcademicReplacements) {
    const organizationIndex = organizations.findIndex((organization) => organization.name === replacement.retire);
    const retiredOrganization = organizations[organizationIndex];
    if (organizationIndex < 0 || !retiredOrganization) continue;
    const slug = slugify(`${replacement.display_name}-neurotechnology`);
    const country = countryName(replacement.country_code);
    const technology = classifyTechnology(replacement.paper.title);
    organizations[organizationIndex] = {
      slug,
      name: replacement.display_name,
      kind: "academic",
      category: technology.category,
      region: regionForCountryCode(replacement.country_code),
      modality: technology.modality,
      targetFunction: `Research contribution documented in “${replacement.paper.title}”`,
      stage: "Academic or clinical research organization with a recent peer-reviewed neurotechnology contribution.",
      evidenceLevel: "E4",
      deviceTypes: technology.deviceTypes,
      organizationScale: "university-research",
      readiness: "research-program",
      hq: { city: replacement.geo.city, country, lat: replacement.geo.latitude, lng: replacement.geo.longitude },
      website: replacement.homepage,
      summary: `${replacement.display_name} is included because affiliated researchers contributed to the ${replacement.paper.year} paper “${replacement.paper.title}.”`,
      hypeCheck: "Institutional affiliation on one or more papers establishes research participation, not a dedicated product, clinical availability, or durable patient benefit.",
      sourceLinks: [
        { title: replacement.paper.title, url: replacement.paper.url, publisher: replacement.paper.publisher, sourceType: "paper", isPrimary: true },
        { title: `${replacement.display_name} institutional page`, url: replacement.homepage, publisher: replacement.display_name, sourceType: "institution-page", isPrimary: true }
      ],
      isSample: false
    };
    const profileIndex = profiles.findIndex((profile) => profile.companySlug === retiredOrganization.slug);
    if (profileIndex >= 0) profiles[profileIndex] = {
      companySlug: slug,
      companyName: replacement.display_name,
      researchedOn,
      sourceProfileUrl: replacement.paper.url,
      officialWebsite: replacement.homepage,
      overview: `${replacement.display_name} has recent peer-reviewed participation in neurotechnology, evidenced here by “${replacement.paper.title}.”`,
      founding: { status: "not-verified", note: "The institution's founding history was outside this research pass; no laboratory founding year is inferred." },
      headquarters: { status: "catalog-city", display: `${replacement.geo.city}, ${country}`, note: "Location is taken from the university's official Lahore campus page.", sourceUrl: replacement.id },
      companyValue: { status: "not-verified", label: "Not applicable — academic or clinical institution", note: "Academic and public research organizations are not assigned startup valuations." },
      fundingStage: "Academic, hospital, nonprofit, or public research",
      regulatoryStatus: "Research participation; no product approval is inferred.",
      reportedAccomplishments: [{ note: `Affiliated researchers contributed to the ${replacement.paper.year} publication “${replacement.paper.title}.”`, sourceUrl: replacement.paper.url, publisher: replacement.paper.publisher, evidence: "company-reported" }],
      papers: [{ title: replacement.paper.title, url: replacement.paper.url, publisher: replacement.paper.publisher }],
      videos: [],
      notes: "Selected as a direct replacement for an oncology-only focused-ultrasound false positive; the profile cites one representative EEG BCI paper."
    };
  }

  for (const organization of organizations) {
    if (organization.kind === "academic") {
      const paperSource = organization.sourceLinks.find((source) => source.sourceType === "paper");
      if (paperSource) {
        const previousTitle = paperSource.title;
        const cleanTitle = stripTags(previousTitle);
        if (cleanTitle !== previousTitle) {
          academicTitleReplacements.set(previousTitle, cleanTitle);
          paperSource.title = cleanTitle;
          organization.targetFunction = organization.targetFunction.replaceAll(previousTitle, cleanTitle);
          organization.summary = organization.summary.replaceAll(previousTitle, cleanTitle);
        }
      }
    }
    const technology = classifyTechnology(organization.targetFunction);
    organization.category = technology.category;
    organization.modality = technology.modality;
    organization.deviceTypes = technology.deviceTypes;
    if (organization.kind === "company") {
      organization.stage = "Current official web presence plus a dated discovery record; product maturity requires separate evidence.";
      organization.organizationScale = "company-maturity-unverified";
      organization.readiness = "readiness-unverified";
      organization.hypeCheck = "The linked company site and dated discovery record establish a current technology lead, not clinical efficacy or product maturity. The map uses a country-level coordinate until a city is independently verified.";
      continue;
    }
    const homepage = academicHomepageOverrides[organization.name];
    if (!homepage) continue;
    previousAcademicHomepages.set(organization.name, organization.website);
    organization.website = homepage;
    const institutionSource = organization.sourceLinks.find((source) => source.sourceType === "institution-page");
    if (institutionSource) institutionSource.url = homepage;
  }

  for (const profile of profiles) {
    const organization = organizations.find((candidate) => candidate.slug === profile.companySlug);
    if (!organization) continue;
    if (organization.kind === "company") {
      profile.sourceProfileUrl = organization.sourceLinks.find((source) => !source.isPrimary)?.url ?? profile.sourceProfileUrl;
      profile.headquarters.note = "The dated discovery source supports the country assignment; the map intentionally uses a country-level coordinate pending city verification.";
    } else if (academicHomepageOverrides[organization.name]) {
      profile.officialWebsite = academicHomepageOverrides[organization.name];
    }
    if (organization.kind === "academic") {
      for (const [previousTitle, cleanTitle] of academicTitleReplacements) {
        profile.overview = profile.overview.replaceAll(previousTitle, cleanTitle);
        profile.reportedAccomplishments = profile.reportedAccomplishments.map((item) => ({ ...item, note: item.note.replaceAll(previousTitle, cleanTitle) }));
        profile.papers = profile.papers.map((paper) => ({ ...paper, title: paper.title.replaceAll(previousTitle, cleanTitle) }));
      }
    }
  }

  const generated = `/* This file is generated by scripts/generate-sourced-expansion.mjs. Do not hand-edit. */\nimport type { Company, CompanyResearchProfile } from "./schema";\n\nexport const sourcedExpansionOrganizations: Company[] = ${tsLiteral(organizations)};\n\nexport const sourcedExpansionResearchProfiles: CompanyResearchProfile[] = ${tsLiteral(profiles)};\n`;
  await writeFile(dataPath, generated, "utf8");

  const docsPath = resolve(projectRoot, "docs", "sourced-neurotechnology-expansion-2026.md");
  let docs = await readFile(docsPath, "utf8");
  docs = docs
    .replace("Company records come from current July 2026 regional market audits and link both the company's official site and the audit.", "Company records come from current July 2026 regional market audits or current directory profiles and link both the company's official site and the dated discovery source.")
    .replaceAll(" · [Audit](", " · [Discovery record](")
    .replace("Company descriptions are discovery leads tied to an official site and a current regional audit.", "Company descriptions are discovery leads tied to an official site and a dated regional audit or directory profile.");
  for (const [previousTitle, cleanTitle] of academicTitleReplacements) docs = docs.replaceAll(previousTitle, cleanTitle);
  for (const [name, previousHomepage] of previousAcademicHomepages) {
    docs = docs.replace(`| ${name} |`, `| ${name} |`).replaceAll(`(${previousHomepage})`, `(${academicHomepageOverrides[name]})`);
  }
  for (const replacement of inactiveCompanyReplacements) {
    const rowPattern = new RegExp(`^\\| (\\d+) \\| ${replacement.retire.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")} \\|.*$`, "m");
    docs = docs.replace(rowPattern, (_, index) => `| ${index} | ${replacement.name} | ${replacement.country} | ${replacement.description} | [Official](${replacement.website}) · [Discovery record](${replacement.auditUrl}) |`);
  }
  for (const replacement of fixedAcademicReplacements) {
    const rowPattern = new RegExp(`^\\| (\\d+) \\| ${replacement.retire.replace(/[.*+?^${}()|[\]\\\\]/g, "\\$&")} \\|.*$`, "m");
    docs = docs.replace(rowPattern, (_, index) => `| ${index} | ${replacement.display_name} | ${countryName(replacement.country_code)} | ${replacement.paper.title} (${replacement.paper.year}) | [Paper](${replacement.paper.url}) · [Institution](${replacement.homepage}) · [Campus source](${replacement.id}) |`);
  }
  await writeFile(docsPath, docs, "utf8");
  console.log(`Refreshed checked-in metadata for ${organizations.length} organizations without network discovery.`);
};

const main = async () => {
  if (process.argv.includes("--refresh-checked-in")) {
    await refreshCheckedInMetadata();
    return;
  }
  const [mapNodesText, seedText, previousExpansionText] = await Promise.all([
    readFile(resolve(projectRoot, "public", "map-nodes.json"), "utf8"),
    readFile(resolve(projectRoot, "data", "seed-data.ts"), "utf8"),
    readFile(resolve(projectRoot, "data", "sourced-expansion.ts"), "utf8").catch(() => "")
  ]);
  const previousExpansionSlugs = new Set([...previousExpansionText.matchAll(/"slug": "([^"]+)"/g)].map((match) => match[1]));
  const existingNodes = JSON.parse(mapNodesText).filter((node) => !previousExpansionSlugs.has(node.slug));
  const existingNames = existingNodes.map((node) => normalizeName(node.name)).filter(Boolean);
  const existingSlugs = new Set(existingNodes.map((node) => node.slug));
  const existingHosts = new Set([...seedText.matchAll(/https?:\/\/[^\s"')]+/g)].map((match) => registrableHost(match[0])).filter(Boolean));
  const selectedNames = new Set(existingNames);
  const selectedHosts = new Set(existingHosts);
  const isDuplicateName = (name) => {
    const normalized = normalizeName(name);
    for (const existing of selectedNames) {
      if (existing === normalized) return true;
      if (normalized.length >= 8 && existing.includes(normalized)) return true;
      if (existing.length >= 8 && normalized.includes(existing)) return true;
    }
    return false;
  };

  const [feedCompanies, directoryCompanies, snapshotCompanies] = await Promise.all([
    parseCompanyFeeds(),
    parseNeurotechDirectory(),
    parseCheckedInCompanySnapshot()
  ]);
  const replacementCandidates = inactiveCompanyReplacements.map((replacement) => {
    const company = { ...replacement };
    delete company.retire;
    return company;
  });
  const rawCompanies = [...feedCompanies, ...fallbackIsraeliCompanies, ...fallbackCurrentCompanies, ...replacementCandidates, ...directoryCompanies, ...snapshotCompanies];
  const companies = [];
  const companyBlocklist = /^(Nuvectra|Spinal Modulation|NeuraVi|Blackfynn|Neuroelectronics Research Flanders|Mynd Analytics|CognWave Health|Limbic Neuromodulation|CortexD|Cephalogics|SensoDetect|Dreem|Enspire Medical|MindSeaTech|Endonovo Therapeutics|Neuralign|SC Neuro|Stimwave Technologies|Entorian Technologies|Neurescence|Neuroadaptive Technologies|Neurolutions|NAOX)$/i;
  for (const candidate of rawCompanies) {
    if (companies.length >= targetCompanies) break;
    if (companyBlocklist.test(candidate.name)) continue;
    const host = registrableHost(candidate.website);
    if (!host || /linkedin|archive\.org|facebook|instagram|x\.com$/.test(host)) continue;
    if (isDuplicateName(candidate.name) || selectedHosts.has(host)) continue;
    const fallback = countryFallbacks[candidate.country];
    if (!fallback) continue;
    const slugBase = slugify(candidate.name);
    let slug = slugBase;
    let suffix = 2;
    while (existingSlugs.has(slug)) slug = `${slugBase}-${suffix++}`;
    const tech = classifyTechnology(`${candidate.name} ${candidate.description}`);
    companies.push({ ...candidate, slug, host, tech, hq: fallback });
    existingSlugs.add(slug);
    selectedNames.add(normalizeName(candidate.name));
    selectedHosts.add(host);
  }
  if (companies.length !== targetCompanies) throw new Error(`Selected ${companies.length}/${targetCompanies} companies; candidate filtering needs another source pass.`);

  const openAlex = await collectOpenAlex();
  const academicTypes = new Set(["education", "healthcare", "facility", "nonprofit", "government"]);
  const rankedAcademic = [...openAlex.values()]
    .filter((institution) => academicTypes.has(institution.type) && institution.country_code && institution.papers.length > 0)
    .sort((a, b) => b.papers.length - a.papers.length || a.display_name.localeCompare(b.display_name));
  const hydrated = await hydrateInstitutions(rankedAcademic.slice(0, 900).map((institution) => institution.id));
  const academic = fixedAcademicReplacements.map((replacement) => ({
    ...replacement,
    slug: slugify(`${replacement.display_name}-neurotechnology`),
    tech: classifyTechnology(replacement.paper.title)
  }));
  for (const replacement of academic) {
    selectedNames.add(normalizeName(replacement.display_name));
    const host = registrableHost(replacement.homepage);
    if (host) selectedHosts.add(host);
    existingSlugs.add(replacement.slug);
  }
  for (const candidate of rankedAcademic) {
    if (academic.length >= targetAcademic) break;
    if (fixedAcademicReplacements.some((replacement) => replacement.retire === candidate.display_name)) continue;
    const detail = hydrated.get(candidate.id);
    if (!detail?.geo?.latitude || !detail?.geo?.longitude || !detail.country_code) continue;
    if (/^(brain|interface|faculty|neurological surgery|center for neuro-oncology|biomedical research institute|medical center|research center)$/i.test(candidate.display_name)) continue;
    const discoveredHomepage = detail.homepage_url || detail.ror || candidate.id;
    const host = registrableHost(discoveredHomepage);
    if (isDuplicateName(candidate.display_name) || (host && selectedHosts.has(host))) continue;
    const paper = candidate.papers.sort((a, b) => b.year - a.year)[0];
    const slugBase = slugify(`${candidate.display_name}-neurotechnology`);
    let slug = slugBase;
    let suffix = 2;
    while (existingSlugs.has(slug)) slug = `${slugBase}-${suffix++}`;
    const tech = classifyTechnology(paper.title);
    const homepage = academicHomepageOverrides[candidate.display_name] ?? discoveredHomepage;
    academic.push({ ...candidate, ...detail, slug, homepage, paper, tech });
    existingSlugs.add(slug);
    selectedNames.add(normalizeName(candidate.display_name));
    if (host) selectedHosts.add(host);
  }
  if (academic.length !== targetAcademic) throw new Error(`Selected ${academic.length}/${targetAcademic} academic organizations; candidate filtering needs expansion.`);

  const companyOrganizations = companies.map((company) => ({
    slug: company.slug,
    name: company.name,
    kind: "company",
    category: company.tech.category,
    region: company.hq[3],
    modality: company.tech.modality,
    targetFunction: company.description,
    stage: "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    evidenceLevel: "E1",
    deviceTypes: company.tech.deviceTypes,
    organizationScale: "company-maturity-unverified",
    readiness: "readiness-unverified",
    hq: { city: company.hq[0], country: company.country, lat: company.hq[1], lng: company.hq[2] },
    website: company.website,
    summary: `${company.name} is tracked for ${company.description.replace(/\.$/, "").toLowerCase()}.`,
    hypeCheck: "The linked company site and dated discovery record establish a current technology lead, not clinical efficacy or product maturity. The map uses a country-level coordinate until a city is independently verified.",
    sourceLinks: [
      { title: `${company.name} official website`, url: company.website, publisher: company.name, sourceType: "company-update", isPrimary: true },
      { title: company.auditTitle, url: company.auditUrl, publisher: company.auditPublisher, sourceType: "news-report", isPrimary: false }
    ],
    isSample: false
  }));

  const academicOrganizations = academic.map((institution) => {
    const country = countryName(institution.country_code);
    const city = institution.geo.city || institution.geo.region || "Country-level location";
    return {
      slug: institution.slug,
      name: institution.display_name,
      kind: "academic",
      category: institution.tech.category,
      region: regionForCountryCode(institution.country_code),
      modality: institution.tech.modality,
      targetFunction: `Research contribution documented in “${institution.paper.title}”`,
      stage: "Academic or clinical research organization with a recent peer-reviewed neurotechnology contribution.",
      evidenceLevel: "E4",
      deviceTypes: institution.tech.deviceTypes,
      organizationScale: "university-research",
      readiness: "research-program",
      hq: { city, country, lat: institution.geo.latitude, lng: institution.geo.longitude },
      website: institution.homepage,
      summary: `${institution.display_name} is included because affiliated researchers contributed to the ${institution.paper.year} paper “${institution.paper.title}.”`,
      hypeCheck: "Institutional affiliation on one or more papers establishes research participation, not a dedicated product, clinical availability, or durable patient benefit.",
      sourceLinks: [
        { title: institution.paper.title, url: institution.paper.url, publisher: institution.paper.publisher, sourceType: "paper", isPrimary: true },
        { title: `${institution.display_name} institutional page`, url: institution.homepage, publisher: institution.display_name, sourceType: "institution-page", isPrimary: true }
      ],
      isSample: false
    };
  });

  const companyProfiles = companies.map((company) => ({
    companySlug: company.slug,
    companyName: company.name,
    researchedOn,
    sourceProfileUrl: company.auditUrl,
    officialWebsite: company.website,
    overview: `${company.name} is a currently listed neurotechnology company focused on ${company.description.replace(/\.$/, "").toLowerCase()}.`,
    founding: { status: "not-verified", note: "A founding year and founders were not verified during this bounded expansion pass." },
    headquarters: { status: "country-only", display: company.country, note: "The dated discovery source supports the country assignment; the map intentionally uses a country-level coordinate pending city verification.", sourceUrl: company.auditUrl },
    companyValue: { status: "not-publicly-disclosed", label: "Not publicly disclosed", note: "No defensible current valuation was found in the sources used for this pass." },
    fundingStage: "Not independently verified",
    regulatoryStatus: "Not inferred from company inclusion; consult product-specific regulatory sources.",
    reportedAccomplishments: [{ note: `The company currently presents a technology line centered on ${company.description.replace(/\.$/, "").toLowerCase()}.`, sourceUrl: company.website, publisher: company.name, evidence: "company-reported" }],
    papers: [],
    videos: [],
    notes: "This source-led profile deliberately leaves founders, valuation, funding, and regulatory status blank where they were not verified. It should be deepened before promoting performance claims."
  }));

  const academicProfiles = academic.map((institution) => {
    const country = countryName(institution.country_code);
    const city = institution.geo.city || institution.geo.region || "Country-level location";
    return {
      companySlug: institution.slug,
      companyName: institution.display_name,
      researchedOn,
      sourceProfileUrl: institution.paper.url,
      officialWebsite: institution.homepage,
      overview: `${institution.display_name} has recent peer-reviewed participation in neurotechnology, evidenced here by “${institution.paper.title}.”`,
      founding: { status: "not-verified", note: "The institution's founding history was outside this research pass; no laboratory founding year is inferred." },
      headquarters: { status: institution.geo.city ? "catalog-city" : "country-only", display: `${city}, ${country}`, note: "Location is taken from the OpenAlex institutional record and should not be read as a laboratory-room address.", sourceUrl: institution.id },
      companyValue: { status: "not-verified", label: "Not applicable — academic or clinical institution", note: "Academic and public research organizations are not assigned startup valuations." },
      fundingStage: "Academic, hospital, nonprofit, or public research",
      regulatoryStatus: "Research participation; no product approval is inferred.",
      reportedAccomplishments: [{ note: `Affiliated researchers contributed to the ${institution.paper.year} publication “${institution.paper.title}.”`, sourceUrl: institution.paper.url, publisher: institution.paper.publisher, evidence: "company-reported" }],
      papers: [{ title: institution.paper.title, url: institution.paper.url, publisher: institution.paper.publisher }],
      videos: [],
      notes: `Selected from a deduplicated affiliation audit of recent papers matching precise neural-interface and neuromodulation queries. ${institution.papers.length} matching sampled paper(s) were associated with this institution; the profile cites one representative paper.`
    };
  });

  const organizations = [...companyOrganizations, ...academicOrganizations];
  const profiles = [...companyProfiles, ...academicProfiles];
  const generated = `/* This file is generated by scripts/generate-sourced-expansion.mjs. Do not hand-edit. */\nimport type { Company, CompanyResearchProfile } from "./schema";\n\nexport const sourcedExpansionOrganizations: Company[] = ${tsLiteral(organizations)};\n\nexport const sourcedExpansionResearchProfiles: CompanyResearchProfile[] = ${tsLiteral(profiles)};\n`;
  await writeFile(resolve(projectRoot, "data", "sourced-expansion.ts"), generated, "utf8");

  const rows = [
    "# 2026 sourced neurotechnology expansion",
    "",
    `Generated on ${researchedOn}. This catalog adds exactly **${companies.length} companies** and **${academic.length} academic, hospital, nonprofit, or public research organizations** after normalized-name, URL-host, and slug deduplication against the existing map.`,
    "",
    "Company records come from current July 2026 regional market audits or current directory profiles and link both the company's official site and the dated discovery source. Academic records require a 2023–2026 paper matching a precise neural-interface or neuromodulation query; one representative DOI and the institutional page are retained in the product data.",
    "",
    "Country-level company coordinates are deliberately labeled as such. Unknown founders, valuations, funding, regulatory status, papers, and videos remain unknown rather than being inferred.",
    "",
    "The follow-up official-site pass is documented company by company in [sourced-company-enrichment-2026.md](sourced-company-enrichment-2026.md).",
    "",
    "## Companies (100)",
    "",
    "| # | Company | Country | Tracked work | Sources |",
    "|---:|---|---|---|---|",
    ...companies.map((company, index) => `| ${index + 1} | ${company.name.replaceAll("|", "\\|")} | ${company.country} | ${company.description.replaceAll("|", "\\|")} | [Official](${company.website}) · [Discovery record](${company.auditUrl}) |`),
    "",
    "## Academic and institutional organizations (200)",
    "",
    "| # | Organization | Country | Representative recent paper | Sources |",
    "|---:|---|---|---|---|",
    ...academic.map((institution, index) => `| ${index + 1} | ${institution.display_name.replaceAll("|", "\\|")} | ${countryName(institution.country_code)} | ${institution.paper.title.replaceAll("|", "\\|")} (${institution.paper.year}) | [Paper](${institution.paper.url}) · [Institution](${institution.homepage}) · [${institution.id.includes("openalex.org") ? "OpenAlex record" : "Campus source"}](${institution.id}) |`),
    "",
    "## Live-link audit snapshot",
    "",
    "On 2026-07-31, the reproducible link audit checked all 100 company sites, all 200 institutional sites, and 192 distinct retained paper/video resources. It found no parked domains and no hard company or resource failures. Seven official institutional homepages were unreachable after retry from the audit runner because of upstream 502, timeout, or certificate-chain errors: Beijing Sport University, Charité - Universitätsmedizin Berlin, Fondazione IRCCS Istituto Neurologico Carlo Besta, Tianjin Medical University, the Institute for Research in Fundamental Sciences, Beijing Tian Tan Hospital, and Graz University of Technology. Their DOI-backed representative papers remain the inclusion evidence; rate limits and anti-bot responses are reported separately rather than mislabelled as dead links.",
    "",
    "## Method and limitations",
    "",
    "- Duplicate screening compares normalized organization names, existing slugs, and website hosts. It intentionally rejects borderline name containment matches.",
    "- A paper affiliation demonstrates participation in the cited research. It does not prove a dedicated BCI laboratory, product readiness, or clinical benefit.",
    "- Company descriptions are discovery leads tied to an official site and a dated regional audit or directory profile. They are E1 records until product-specific papers, trials, demonstrations, or regulatory records are added.",
    "- Academic records are E4 only for the cited publication; that evidence level does not transfer to every activity of the parent institution.",
    ""
  ].join("\n");
  await writeFile(resolve(projectRoot, "docs", "sourced-neurotechnology-expansion-2026.md"), rows, "utf8");
  console.log(`Generated ${organizations.length} organizations and ${profiles.length} profiles (${companies.length} companies, ${academic.length} academic).`);
};

await main();
