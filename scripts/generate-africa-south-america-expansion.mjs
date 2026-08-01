import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const researchCache = resolve(projectRoot, ".research-cache", "africa-south-america");
await mkdir(researchCache, { recursive: true });
const researchedOn = "2026-08-01";
const targetPerRegion = 100;

const regionDefinitions = {
  africa: {
    label: "Africa",
    countryCodes: "DZ|AO|BJ|BW|BF|BI|CV|CM|CF|TD|KM|CD|CG|CI|DJ|EG|GQ|ER|SZ|ET|GA|GM|GH|GN|GW|KE|LS|LR|LY|MG|MW|ML|MR|MU|MA|MZ|NA|NE|NG|RW|ST|SN|SC|SL|SO|ZA|SS|SD|TZ|TG|TN|UG|ZM|ZW"
  },
  "south-america": {
    label: "South America",
    countryCodes: "AR|BO|BR|CL|CO|EC|GY|PY|PE|SR|UY|VE"
  }
};

const searchTerms = [
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
  "brain decoding",
  "motor imagery EEG",
  "SSVEP",
  "P300 EEG",
  "fNIRS brain",
  "electroencephalography",
  "neural engineering",
  "brain signal decoding",
  "EEG seizure detection",
  "EEG",
  "tDCS",
  "TMS",
  "ECoG",
  "neuromodulation",
  "event related potential EEG",
  "brain electrophysiology",
  "neurorehabilitation robot",
  "brain stimulation"
];

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const sleep = (milliseconds) => new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));
const slugify = (value) => value
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 90);
const normalizeName = (value) => value
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/\b(incorporated|corporation|company|limited|inc|corp|ltd|llc|plc|ag|gmbh|sa|bv|the)\b/g, "")
  .replace(/[^a-z0-9]+/g, "");
const stripTags = (value) => String(value ?? "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/\s+/g, " ")
  .trim();
const validUrl = (value) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

const fetchJson = async (url, attempts = 6) => {
  const cachePath = resolve(researchCache, `${createHash("sha256").update(url.toString()).digest("hex")}.json`);
  try {
    return JSON.parse(await readFile(cachePath, "utf8"));
  } catch {
    // A cache miss proceeds to the bounded network request below.
  }
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "NextBCI evidence catalog research (https://github.com/)" },
        signal: AbortSignal.timeout(30_000)
      });
      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("retry-after"));
        await sleep(Number.isFinite(retryAfter) ? Math.min(Math.max(retryAfter * 1000, 5000), 30_000) : attempt * 5000);
        throw new Error(`${response.status} ${response.statusText}`);
      }
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const json = await response.json();
      await writeFile(cachePath, JSON.stringify(json), "utf8");
      return json;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(attempt * 750);
    }
  }
  throw lastError;
};

const relevantTitle = (title) => /brain[\s–-]*(computer|machine)|\bbci\b|neural interface|neuroprost|deep brain stimulation|spinal cord stimulation|vagus nerve stimulation|transcranial|(?:focused ultrasound.{0,60}(?:brain|neural|neuro|stimulation)|(?:brain|neural|neuro).{0,60}focused ultrasound)|intracort|electrocortic|neurostimulation|neurofeedback|cochlear implant|retinal implant|neural recording|functional electrical stimulation|wearable eeg|brain decoding|ssvep|\bp300\b|fnirs|electroencephal|neural engineering|\beeg\b|brain stimulation/i.test(title);
const lowSpecificityTitle = (title) => /bibliometric|perspective|protocol|overview|survey|trend|challenge|future direction|commentary|correspondence|readiness|ethic|expert opinion|training|^correction\b|^erratum\b|retraction|are we there yet/i.test(title);
const secondaryResearchTitle = (title) => /review|meta-analysis/i.test(title);
const directInterfaceTitle = (title) => /brain[\s–-]*(computer|machine)|\bbci\b|neural interface|neuroprost|motor imagery|ssvep|\bp300\b|brain decoding|closed.loop|electrocortic|intracort/i.test(title);

const classifyTechnology = (text) => {
  const value = text.toLowerCase();
  if (/intracort|electrocortic|brain implant|depth electrode/.test(value)) {
    return { category: "invasive", modality: "Implanted neural recording or stimulation", deviceTypes: ["bci-implant"] };
  }
  if (/deep brain|spinal cord stimulation|vagus|cochlear implant|retinal implant|neurostimulation/.test(value)) {
    const device = value.includes("spinal") ? "spinal-stimulation" : "peripheral-stimulation";
    return { category: "minimally-invasive", modality: "Implantable or peripheral neuromodulation", deviceTypes: [device] };
  }
  if (/transcranial magnetic|\btms\b/.test(value)) return { category: "non-invasive", modality: "Transcranial magnetic stimulation", deviceTypes: ["tms"] };
  if (/transcranial direct|\btdcs\b|\btacs\b/.test(value)) return { category: "non-invasive", modality: "Transcranial electrical stimulation", deviceTypes: ["tes"] };
  if (/focused ultrasound/.test(value)) return { category: "non-invasive", modality: "Focused-ultrasound neuromodulation", deviceTypes: ["ultrasound"] };
  if (/fnirs|near-infrared/.test(value)) return { category: "non-invasive", modality: "Optical neural sensing", deviceTypes: ["fnirs"] };
  if (/eeg|electroencephal|neurofeedback|motor imagery|ssvep|p300/.test(value)) return { category: "non-invasive", modality: "EEG or non-invasive neural decoding", deviceTypes: ["eeg"] };
  if (/functional electrical stimulation/.test(value)) return { category: "non-invasive", modality: "Functional electrical stimulation and neurorehabilitation", deviceTypes: ["tes", "rehab-robotics"] };
  if (/brain[\s–-]*(computer|machine)|\bbci\b|brain decoding/.test(value)) return { category: "unspecified", modality: "Brain-computer interface (device type not verified)", deviceTypes: ["bci-unspecified"] };
  return { category: "unspecified", modality: "Neural sensing, analysis, or stimulation (device type not verified)", deviceTypes: ["other-neurotech"] };
};

const paperScore = (paper) =>
  (directInterfaceTitle(paper.title) ? 400 : 0)
  + (secondaryResearchTitle(paper.title) ? -100 : 0)
  + (lowSpecificityTitle(paper.title) ? -500 : 0)
  + Math.min(paper.citedByCount, 80)
  + (paper.year - 2022) * 8;

const publicationYear = (work) => {
  const parts = work.published?.["date-parts"]?.[0]
    ?? work["published-online"]?.["date-parts"]?.[0]
    ?? work["published-print"]?.["date-parts"]?.[0];
  return Number(parts?.[0]);
};

const affiliationMatchesRegion = (affiliation, definition) => {
  const text = affiliation.toLowerCase();
  return definition.countryCodes.split("|").some((code) => {
    const country = countryNames.of(code)?.toLowerCase();
    return country && new RegExp(`(?:^|[^a-z])${country.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|[^a-z])`, "i").test(text);
  });
};

const collectRegion = async (definition) => {
  const affiliations = new Map();
  const retainWork = (work, discoveryTerm) => {
    const title = stripTags(work.title?.[0]);
    const year = publicationYear(work);
    if (!work.DOI || !relevantTitle(title) || !["journal-article", "proceedings-article"].includes(work.type) || year < 2023 || year > 2026) return;
    const paper = {
      id: `https://doi.org/${work.DOI.toLowerCase()}`,
      title,
      year,
      url: `https://doi.org/${work.DOI.toLowerCase()}`,
      citedByCount: work["is-referenced-by-count"] ?? 0,
      publisher: stripTags(work["container-title"]?.[0]) || "Peer-reviewed publication",
      discoveryTerm
    };
    for (const author of work.author ?? []) {
      for (const item of author.affiliation ?? []) {
        const raw = stripTags(item.name);
        if (!raw || !affiliationMatchesRegion(raw, definition)) continue;
        const key = raw.toLowerCase();
        const current = affiliations.get(key) ?? { raw, papers: [] };
        if (!current.papers.some((candidate) => candidate.id === paper.id)) current.papers.push(paper);
        affiliations.set(key, current);
      }
    }
  };
  for (const term of searchTerms) {
    let cursor = "*";
    for (let page = 0; page < 3; page += 1) {
      const url = new URL("https://api.crossref.org/works");
      url.searchParams.set("query.title", term);
      url.searchParams.set("filter", "from-pub-date:2023-01-01,until-pub-date:2026-08-01,has-affiliation:true");
      url.searchParams.set("rows", "1000");
      url.searchParams.set("cursor", cursor);
      url.searchParams.set("select", "DOI,title,published,published-online,published-print,author,container-title,type,is-referenced-by-count");
      const response = await fetchJson(url);
      for (const work of response.message?.items ?? []) retainWork(work, term);
      cursor = response.message?.["next-cursor"];
      if (!cursor || !(response.message?.items ?? []).length) break;
      await sleep(150);
    }
    await sleep(200);
  }

  const countryDepthTerms = ["brain computer interface", "EEG", "neural interface", "brain stimulation", "neurofeedback", "fNIRS", "TMS", "tDCS", "neurostimulation", "functional electrical stimulation"];
  const priorityCodes = definition.label === "Africa"
    ? ["EG", "ZA", "NG", "TN", "MA", "GH", "ET", "DZ", "UG", "KE", "SD", "CM", "TZ", "ZW"]
    : ["BR", "AR", "CL", "CO", "PE", "EC", "UY", "VE", "BO", "PY"];
  for (const code of priorityCodes) {
    const country = countryNames.of(code);
    for (const term of countryDepthTerms) {
      const url = new URL("https://api.crossref.org/works");
      url.searchParams.set("query.title", term);
      url.searchParams.set("query.affiliation", country);
      url.searchParams.set("filter", "from-pub-date:2023-01-01,until-pub-date:2026-08-01,has-affiliation:true");
      url.searchParams.set("rows", "250");
      url.searchParams.set("select", "DOI,title,published,published-online,published-print,author,container-title,type,is-referenced-by-count");
      const response = await fetchJson(url);
      for (const work of response.message?.items ?? []) retainWork(work, `${term} / ${country}`);
      await sleep(100);
    }
  }
  return affiliations;
};

const rorDisplayName = (organization) => organization.names?.find((name) => name.types?.includes("ror_display"))?.value
  ?? organization.names?.find((name) => name.types?.includes("label") && name.lang === "en")?.value
  ?? organization.names?.find((name) => name.types?.includes("label"))?.value;

const matchAffiliations = async (affiliations, definition) => {
  const countrySet = new Set(definition.countryCodes.split("|"));
  const ranked = [...affiliations.values()]
    .sort((a, b) => b.papers.length - a.papers.length || Math.max(...b.papers.map(paperScore)) - Math.max(...a.papers.map(paperScore)))
    .slice(0, 650);
  const matched = new Map();
  let cursor = 0;
  const worker = async () => {
    while (cursor < ranked.length) {
      const affiliation = ranked[cursor++];
      const url = new URL("https://api.ror.org/v2/organizations");
      url.searchParams.set("affiliation", affiliation.raw);
      try {
        const response = await fetchJson(url, 3);
        const match = response.items?.find((item) => item.chosen && item.score >= 0.6);
        const organization = match?.organization;
        const location = organization?.locations?.[0]?.geonames_details;
        const homepage = organization?.links?.find((link) => link.type === "website")?.value;
        const name = organization && rorDisplayName(organization);
        if (!organization || organization.status !== "active" || !name || !location || !countrySet.has(location.country_code) || !validUrl(homepage)) continue;
        const current = matched.get(organization.id) ?? {
          id: organization.id,
          display_name: name,
          homepage_url: homepage,
          country_code: location.country_code,
          type: organization.types?.[0],
          established: organization.established,
          geo: { city: location.name, latitude: location.lat, longitude: location.lng },
          papers: []
        };
        for (const paper of affiliation.papers) if (!current.papers.some((candidate) => candidate.id === paper.id)) current.papers.push(paper);
        matched.set(organization.id, current);
      } catch (error) {
        console.warn(`ROR match skipped for ${affiliation.raw}: ${error.message}`);
      }
      await sleep(125);
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
  return matched;
};

const chooseInstitutions = ({ pool, existingNames, existingSlugs, selectedNames, regionKey }) => {
  const allowedTypes = new Set(["education", "healthcare", "facility", "nonprofit", "government", "funder"]);
  const genericName = /^(ministry of (health|education)|department of (health|education)|private practice|independent researcher|research center|medical center|faculty|school of medicine|college of medicine)$|magazine|commercial publisher|consulting/i;
  const eligible = [...pool.values()].flatMap((detail) => {
    const name = stripTags(detail.display_name);
    const normalizedName = normalizeName(name);
    const slug = slugify(`${name}-neurotechnology`);
    const geo = detail?.geo;
    if (!allowedTypes.has(detail.type) || genericName.test(name)) return [];
    if (!validUrl(detail.homepage_url) || !geo?.city || !Number.isFinite(geo.latitude) || !Number.isFinite(geo.longitude)) return [];
    if (existingNames.has(normalizedName) || selectedNames.has(normalizedName) || existingSlugs.has(slug)) return [];
    const papers = detail.papers
      .filter((paper) => paper.year >= 2023 && paper.year <= 2026 && validUrl(paper.url) && relevantTitle(paper.title) && !lowSpecificityTitle(paper.title))
      .sort((a, b) => paperScore(b) - paperScore(a) || b.citedByCount - a.citedByCount);
    if (!papers.length) return [];
    return [{ ...detail, name, normalizedName, slug, papers, representativePaper: papers[0], regionKey }];
  });

  const buckets = new Map();
  for (const candidate of eligible.sort((a, b) => b.papers.length - a.papers.length || paperScore(b.representativePaper) - paperScore(a.representativePaper))) {
    const bucket = buckets.get(candidate.country_code) ?? [];
    bucket.push(candidate);
    buckets.set(candidate.country_code, bucket);
  }
  const selected = [];
  let round = 0;
  while (selected.length < targetPerRegion) {
    let added = false;
    for (const code of [...buckets.keys()].sort()) {
      const candidate = buckets.get(code)?.[round];
      if (!candidate || selected.length >= targetPerRegion) continue;
      selected.push(candidate);
      selectedNames.add(candidate.normalizedName);
      existingSlugs.add(candidate.slug);
      added = true;
    }
    if (!added) break;
    round += 1;
  }
  if (selected.length !== targetPerRegion) {
    throw new Error(`${regionDefinitions[regionKey].label}: selected ${selected.length}/${targetPerRegion}; ${eligible.length} eligible after hydration.`);
  }
  return selected;
};

const toOrganization = (institution) => {
  const paper = institution.representativePaper;
  const technology = classifyTechnology(paper.title);
  const country = countryNames.of(institution.country_code) ?? institution.country_code;
  return {
    slug: institution.slug,
    name: institution.name,
    kind: "academic",
    category: technology.category,
    region: "rest-of-world",
    modality: technology.modality,
    targetFunction: `Research contribution documented in “${paper.title}”`,
    stage: "Academic, hospital, nonprofit, or public research organization with a recent peer-reviewed neurotechnology contribution.",
    evidenceLevel: "E4",
    deviceTypes: technology.deviceTypes,
    organizationScale: "university-research",
    readiness: "research-program",
    hq: {
      city: institution.geo.city,
      country,
      lat: institution.geo.latitude,
      lng: institution.geo.longitude
    },
    website: institution.homepage_url,
    summary: `${institution.name} is included because affiliated researchers contributed to the ${paper.year} paper “${paper.title}.”`,
    hypeCheck: "Institutional affiliation on one representative paper establishes research participation, not a dedicated product, clinical availability, or durable patient benefit.",
    sourceLinks: [
      { title: paper.title, url: paper.url, publisher: paper.publisher, sourceType: "paper", isPrimary: true },
      { title: `${institution.name} institutional page`, url: institution.homepage_url, publisher: institution.name, sourceType: "institution-page", isPrimary: true },
      { title: `${institution.name} ROR record`, url: institution.id, publisher: "Research Organization Registry", sourceType: "institution-page", isPrimary: false }
    ],
    isSample: false
  };
};

const toProfile = (institution) => {
  const paper = institution.representativePaper;
  const country = countryNames.of(institution.country_code) ?? institution.country_code;
  return {
    companySlug: institution.slug,
    companyName: institution.name,
    researchedOn,
    sourceProfileUrl: paper.url,
    officialWebsite: institution.homepage_url,
    overview: `${institution.name} has recent peer-reviewed participation in neurotechnology, evidenced here by “${paper.title}.”`,
    founding: {
      status: "not-verified",
      ...(institution.established ? { year: institution.established } : {}),
      note: institution.established
        ? `ROR records an established year of ${institution.established}; this registry lead was not independently verified against a first-party history page.`
        : "The institution's general founding history and any separate laboratory founding date were not inferred from publication metadata.",
      ...(institution.established ? { sourceUrl: institution.id } : {})
    },
    headquarters: {
      status: "catalog-city",
      display: `${institution.geo.city}, ${country}`,
      note: "City and country are taken from the institution's ROR record; the linked institutional homepage is retained for first-party verification.",
      sourceUrl: institution.id
    },
    companyValue: {
      status: "not-verified",
      label: "Not applicable — academic or public research organization",
      note: "Academic, hospital, nonprofit, and public research organizations are not assigned startup valuations."
    },
    fundingStage: "Academic, hospital, nonprofit, or public research",
    regulatoryStatus: "Research participation only; no product approval or clinical availability is inferred.",
    reportedAccomplishments: [{
      note: `Affiliated researchers contributed to the ${paper.year} publication “${paper.title}.”`,
      sourceUrl: paper.url,
      publisher: paper.publisher,
      evidence: "company-reported"
    }],
    papers: [{ title: paper.title, url: paper.url, publisher: paper.publisher }],
    videos: [],
    notes: "This regional profile records one representative recent paper. Publication affiliation does not by itself establish a permanent BCI lab or clinical program."
  };
};

const renderDocs = (selectedByRegion) => {
  const lines = [
    "# Africa and South America neurotechnology expansion (2026-08-01)",
    "",
    "This catalog records 100 additional African and 100 additional South American academic, hospital, nonprofit, or public research organizations with recent DOI-backed work directly involving BCI, neural interfaces, EEG/fNIRS neural sensing, neuromodulation, neuroprostheses, or functional electrical stimulation.",
    "",
    "The paper is evidence of the named institution's participation in that publication. It is not evidence that every institution operates a permanent BCI laboratory, has a market-ready product, or has demonstrated clinical benefit.",
    ""
  ];
  for (const [regionKey, institutions] of Object.entries(selectedByRegion)) {
    const definition = regionDefinitions[regionKey];
    const countryCounts = Object.entries(institutions.reduce((counts, institution) => {
      const country = countryNames.of(institution.country_code) ?? institution.country_code;
      counts[country] = (counts[country] ?? 0) + 1;
      return counts;
    }, {})).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    lines.push(
      `## ${definition.label} (${institutions.length})`,
      "",
      `Country coverage: ${countryCounts.map(([country, count]) => `${country} ${count}`).join("; ")}.`,
      "",
      "| # | Organization | City / country | Representative recent paper | Sources |",
      "|---:|---|---|---|---|",
      ...institutions.map((institution, index) => {
        const paper = institution.representativePaper;
        const country = countryNames.of(institution.country_code) ?? institution.country_code;
        return `| ${index + 1} | ${institution.name.replaceAll("|", "\\|")} | ${institution.geo.city.replaceAll("|", "\\|")}, ${country} | ${paper.title.replaceAll("|", "\\|")} (${paper.year}) | [Paper](${paper.url}) · [Institution](${institution.homepage_url}) · [ROR](${institution.id}) |`;
      }),
      ""
    );
  }
  lines.push(
    "## Method and limitations",
    "",
    `- Discovery used Crossref searches over ${searchTerms.length} BCI and neurotechnology title terms for publications dated 2023-01-01 through 2026-08-01, then retained author affiliations explicitly naming a country in the target region.`,
    "- ROR affiliation matching resolves those raw paper affiliations to active formal organizations, current institutional homepages, organization types, and city-level coordinates.",
    "- Selection requires a DOI, a journal or proceedings article whose title directly names a tracked neurotechnology method, a formal institution type, a current institutional homepage, and city-level coordinates.",
    "- Deduplication compares normalized names and slugs against the complete checked-in NextBCI map before selection.",
    "- Country-round-robin selection reduces domination by the largest publication systems while retaining the strongest direct paper per institution.",
    "- Founding dates, founders, commercial value, and regulatory status are left unknown or not applicable rather than inferred.",
    ""
  );
  return lines.join("\n");
};

const main = async () => {
  const regionalSourcePath = resolve(projectRoot, "data", "africa-south-america-expansion.ts");
  let priorRegionalSlugs = new Set();
  try {
    const priorSource = await readFile(regionalSourcePath, "utf8");
    const organizationMarker = "export const africaSouthAmericaOrganizations: Company[] = ";
    const profileMarker = "export const africaSouthAmericaResearchProfiles: CompanyResearchProfile[] = ";
    const organizationStart = priorSource.indexOf(organizationMarker) + organizationMarker.length;
    const profileStart = priorSource.indexOf(profileMarker);
    if (organizationStart >= organizationMarker.length && profileStart > organizationStart) {
      const priorOrganizations = JSON.parse(priorSource.slice(organizationStart, priorSource.lastIndexOf(";", profileStart)));
      priorRegionalSlugs = new Set(priorOrganizations.map((organization) => organization.slug));
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const checkedInNodes = JSON.parse(await readFile(resolve(projectRoot, "public", "map-nodes.json"), "utf8"));
  const existingNodes = checkedInNodes.filter((node) => !priorRegionalSlugs.has(node.slug));
  const existingNames = new Set(existingNodes.map((node) => normalizeName(node.name)).filter(Boolean));
  const existingSlugs = new Set(existingNodes.map((node) => node.slug));
  const selectedNames = new Set();
  const selectedByRegion = {};

  for (const [regionKey, definition] of Object.entries(regionDefinitions)) {
    console.log(`Collecting ${definition.label} candidates...`);
    const pool = await collectRegion(definition);
    console.log(`${definition.label}: ${pool.size} paper-affiliated candidates before hydration.`);
    const matched = await matchAffiliations(pool, definition);
    console.log(`${definition.label}: ${matched.size} active ROR organizations after affiliation matching.`);
    const selected = chooseInstitutions({ pool: matched, existingNames, existingSlugs, selectedNames, regionKey });
    selectedByRegion[regionKey] = selected;
    console.log(`${definition.label}: selected ${selected.length} organizations across ${new Set(selected.map((item) => item.country_code)).size} countries.`);
  }

  const selected = Object.values(selectedByRegion).flat();
  const organizations = selected.map(toOrganization);
  const profiles = selected.map(toProfile);
  const generated = `/* This file is generated by scripts/generate-africa-south-america-expansion.mjs. Do not hand-edit. */\nimport type { Company, CompanyResearchProfile } from "./schema";\n\nexport const africaSouthAmericaOrganizations: Company[] = ${JSON.stringify(organizations, null, 2)};\n\nexport const africaSouthAmericaResearchProfiles: CompanyResearchProfile[] = ${JSON.stringify(profiles, null, 2)};\n`;
  await writeFile(resolve(projectRoot, "data", "africa-south-america-expansion.ts"), generated, "utf8");
  await writeFile(resolve(projectRoot, "docs", "africa-south-america-neurotechnology-expansion-2026.md"), renderDocs(selectedByRegion), "utf8");

  console.log(`Generated ${organizations.length} regional organizations and ${profiles.length} research profiles.`);
};

await main();
