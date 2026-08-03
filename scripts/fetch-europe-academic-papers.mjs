import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const cacheDir = resolve(projectRoot, ".research-cache", "europe-evidence");
await mkdir(cacheDir, { recursive: true });
const cohort = JSON.parse(await readFile(resolve(cacheDir, "cohort.json"), "utf8"));

const directPaperPattern = /doi\.org\/|pubmed|pmc\.ncbi|nature\.com\/articles|frontiersin|sciencedirect\.com\/science\/article|wiley\.com\/doi|springer\.com\/article|ieeexplore\.ieee\.org\/document|thelancet\.com\/journals|journals\.|mdpi\.com\/|plos\.org\/|biorxiv\.org\/content|arxiv\.org\/abs/i;
const aliases = {
  "ku-leuven-neuroelectronics": "KU Leuven",
  "clinatec-wimagine": "Clinatec",
  "freiburg-brainlinks": "University of Freiburg",
  "tuebingen-bci": "University of Tuebingen",
  "nazarbayev-bci-research": "Nazarbayev University",
  "maastricht-rtfmri-bci": "Maastricht University",
  "tu-delft-neural-engineering": "Delft University of Technology",
  "hse-bioelectric-interfaces": "HSE University",
  "msu-neurocomputer-interfaces": "Moscow State University",
  "eth-relab-fnirs": "ETH Zurich",
  "neurorestore-epfl-bsi": "EPFL",
  "itu-cognitive-systems-bci": "Istanbul Technical University",
  "ktu-biomedical-bci": "Karadeniz Technical University",
  "imperial-neural-interfaces": "Imperial College London",
  "ucl-neurotechnology": "University College London",
  "cambridge-neural-interface": "University of Cambridge",
  "glasgow-bci": "University of Glasgow",
  "oxford-neural-engineering": "University of Oxford",
  "warwick-neurotechnology": "University of Warwick"
};
const countryCodes = {
  Belgium: "BE", France: "FR", Germany: "DE", Kazakhstan: "KZ", Netherlands: "NL",
  Russia: "RU", Switzerland: "CH", Turkey: "TR", "United Kingdom": "GB", UK: "GB"
};
const verifiedPaperOverrides = {
  "tuebingen-bci": {
    title: "World's fastest brain-computer interface: Combining EEG2Code with deep learning",
    url: "https://doi.org/10.1371/journal.pone.0221909",
    doi: "10.1371/journal.pone.0221909",
    publicationDate: "2019-09-06",
    publisher: "PLOS ONE",
    verification: "Publisher record lists the University of Tuebingen Department of Computer Engineering affiliation."
  },
  "hse-bioelectric-interfaces": {
    title: "NFBLab—A Versatile Software for Neurofeedback and Brain-Computer Interface Research",
    url: "https://doi.org/10.3389/fninf.2018.00100",
    doi: "10.3389/fninf.2018.00100",
    publicationDate: "2018-12-24",
    publisher: "Frontiers in Neuroinformatics",
    verification: "The paper lists HSE's Center for Bioelectric Interfaces as an author affiliation."
  }
};
const keywords = /brain.computer|neural interface|neuroprost|electroencephal|\beeg\b|\becog\b|intracortical|brain stimulation|deep brain|neurostimulation|neurotechnology|neural engineering|brain signal|motor imagery|brain.?machine|\bbci\b/i;

const fetchJson = async (url) => {
  const cachePath = resolve(cacheDir, `${createHash("sha256").update(`openalex:${url}`).digest("hex")}.json`);
  try { return JSON.parse(await readFile(cachePath, "utf8")); } catch { /* cache miss */ }
  const response = await fetch(url, {
    headers: { "user-agent": "NextBCI evidence research (local catalog audit)" },
    signal: AbortSignal.timeout(30_000)
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  const text = await response.text();
  await writeFile(cachePath, text, "utf8");
  return JSON.parse(text);
};

const targets = cohort.records.filter((record) =>
  record.kind === "academic" &&
  !record.research?.papers.some((paper) => directPaperPattern.test(paper.url))
);
const output = [];

for (const target of targets) {
  if (verifiedPaperOverrides[target.slug]) {
    output.push({
      slug: target.slug,
      name: target.name,
      institution: { displayName: aliases[target.slug] ?? target.name },
      paper: verifiedPaperOverrides[target.slug],
      alternatives: []
    });
    continue;
  }
  const alias = aliases[target.slug] ?? target.name;
  const institutions = await fetchJson(`https://api.openalex.org/institutions?search=${encodeURIComponent(alias)}&per-page=10`);
  const countryCode = countryCodes[target.country];
  const institution = institutions.results?.find((item) => item.country_code === countryCode) ?? institutions.results?.[0];
  if (!institution) {
    output.push({ slug: target.slug, name: target.name, error: "No OpenAlex institution match" });
    continue;
  }

  const candidates = new Map();
  for (const query of ["brain computer interface", "neural interface", "neurotechnology", "EEG BCI"]) {
    const works = await fetchJson(
      `https://api.openalex.org/works?filter=institutions.id:${institution.id.replace("https://openalex.org/", "")},from_publication_date:2010-01-01&search=${encodeURIComponent(query)}&sort=relevance_score:desc&per-page=25`
    );
    for (const work of works.results ?? []) {
      if (work.doi && keywords.test(`${work.title} ${work.primary_topic?.display_name ?? ""}`)) candidates.set(work.id, work);
    }
  }
  const ranked = [...candidates.values()].sort((a, b) =>
    (b.cited_by_count ?? 0) - (a.cited_by_count ?? 0) || b.publication_date.localeCompare(a.publication_date)
  );
  const work = ranked[0];
  output.push({
    slug: target.slug,
    name: target.name,
    institution: { id: institution.id, displayName: institution.display_name, ror: institution.ror },
    paper: work ? {
      title: work.title,
      url: work.doi,
      doi: work.doi.replace(/^https:\/\/doi\.org\//, ""),
      publicationDate: work.publication_date,
      publisher: work.primary_location?.source?.display_name ?? "DOI",
      citedByCount: work.cited_by_count,
      openAlexId: work.id
    } : null,
    alternatives: ranked.slice(1, 5).map((item) => ({ title: item.title, doi: item.doi, publicationDate: item.publication_date }))
  });
}

await writeFile(resolve(cacheDir, "academic-paper-candidates.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  targets: targets.length,
  withInstitutionMatch: output.filter((item) => item.institution).length,
  withPaper: output.filter((item) => item.paper).length,
  missingPaper: output.filter((item) => !item.paper).map((item) => item.slug)
}, null, 2));
