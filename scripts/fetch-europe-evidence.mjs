import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const cacheDir = resolve(projectRoot, ".research-cache", "europe-evidence");
await mkdir(cacheDir, { recursive: true });

const cohort = JSON.parse(await readFile(resolve(cacheDir, "cohort.json"), "utf8"));
const videosOnly = process.argv.includes("--videos-only");
const trialsOnly = process.argv.includes("--trials-only");
const sleep = (milliseconds) => new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));

const fetchCached = async (url, responseType = "json") => {
  const key = createHash("sha256").update(`${responseType}:${url}`).digest("hex");
  const cachePath = resolve(cacheDir, `${key}.${responseType === "json" ? "json" : "html"}`);
  try {
    const cached = await readFile(cachePath, "utf8");
    return responseType === "json" ? JSON.parse(cached) : cached;
  } catch {
    // Cache miss.
  }

  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          accept: responseType === "json" ? "application/json" : "text/html,application/xhtml+xml",
          "user-agent": "NextBCI evidence research (local catalog audit)"
        },
        redirect: "follow",
        signal: AbortSignal.timeout(30_000)
      });
      if (response.status === 404) return null;
      if (response.status === 429 || response.status >= 500) {
        await sleep(Math.max(Number(response.headers.get("retry-after") ?? 0) * 1000, attempt * 1_500));
        continue;
      }
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const text = await response.text();
      await writeFile(cachePath, text, "utf8");
      return responseType === "json" ? JSON.parse(text) : text;
    } catch (error) {
      lastError = error;
      await sleep(attempt * 1_000);
    }
  }
  return { fetchError: String(lastError ?? "unknown fetch error"), url };
};

const normalize = (value) => value
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/\b(ltd|limited|inc|incorporated|llc|gmbh|ag|sa|plc|bv|nv|srl|spa|group|company|medical|technologies|technology|research)\b/g, " ")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const sponsorMatches = (organizationName, sponsorName) => {
  const organization = normalize(organizationName);
  const sponsor = normalize(sponsorName);
  if (!organization || !sponsor) return false;
  if (organization === sponsor) return true;
  if (organization.length >= 6 && sponsor.includes(organization)) return true;
  if (sponsor.length >= 6 && organization.includes(sponsor)) return true;
  const organizationTokens = new Set(organization.split(" ").filter((token) => token.length > 2));
  const sponsorTokens = new Set(sponsor.split(" ").filter((token) => token.length > 2));
  const overlap = [...organizationTokens].filter((token) => sponsorTokens.has(token));
  return overlap.length >= 2 && overlap.length / Math.min(organizationTokens.size, sponsorTokens.size) >= 0.65;
};

const directPaperPattern = /doi\.org\/|pubmed|pmc\.ncbi|nature\.com\/articles|frontiersin|sciencedirect\.com\/science\/article|wiley\.com\/doi|springer\.com\/article|ieeexplore\.ieee\.org\/document|thelancet\.com\/journals|journals\.|mdpi\.com\/|plos\.org\/|biorxiv\.org\/content|arxiv\.org\/abs/i;
const firstDirectPaper = (record) => record.research?.papers.find((paper) => directPaperPattern.test(paper.url));
const specificYoutube = (record) => record.research?.videos.filter((video) => /youtu\.be\/|youtube\.com\/(watch|live)/i.test(video.url)) ?? [];

const extractMeta = (html, names) => {
  if (typeof html !== "string") return undefined;
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const forward = new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i");
    const reverse = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${escaped}["']`, "i");
    const match = html.match(forward) ?? html.match(reverse);
    if (match?.[1]) return match[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  }
  return undefined;
};

const paperMetadata = async (paper) => {
  const doiMatch = paper.url.match(/doi\.org\/(.+)$/i);
  if (doiMatch) {
    const doi = decodeURIComponent(doiMatch[1]).replace(/[?#].*$/, "");
    const payload = await fetchCached(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
    const work = payload?.message;
    if (work) {
      const parts = work.published?.["date-parts"]?.[0] ?? work.issued?.["date-parts"]?.[0] ?? [];
      return {
        title: work.title?.[0] ?? paper.title,
        url: `https://doi.org/${work.DOI ?? doi}`,
        doi: work.DOI ?? doi,
        publisher: work.publisher ?? work["container-title"]?.[0] ?? "Crossref",
        publicationDate: parts.length ? parts.map((part, index) => String(part).padStart(index ? 2 : 4, "0")).join("-") : undefined,
        source: "crossref"
      };
    }
  }

  const pubmedMatch = paper.url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/i);
  if (pubmedMatch) {
    const payload = await fetchCached(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${pubmedMatch[1]}&retmode=json`);
    const work = payload?.result?.[pubmedMatch[1]];
    if (work) {
      const year = work.pubdate?.match(/\b(19|20)\d{2}\b/)?.[0];
      const doi = work.articleids?.find((item) => item.idtype === "doi")?.value;
      return {
        title: work.title ?? paper.title,
        url: doi ? `https://doi.org/${doi}` : paper.url,
        doi,
        publisher: work.fulljournalname ?? "PubMed",
        publicationDate: year,
        source: "pubmed"
      };
    }
  }

  const html = await fetchCached(paper.url, "text");
  const title = extractMeta(html, ["citation_title", "dc.title", "og:title"]);
  const date = extractMeta(html, ["citation_publication_date", "citation_date", "article:published_time", "dc.date"]);
  const doi = extractMeta(html, ["citation_doi", "dc.identifier"]);
  const journal = extractMeta(html, ["citation_journal_title", "dc.publisher"]);
  return {
    title: title ?? paper.title,
    url: doi?.toLowerCase().startsWith("10.") ? `https://doi.org/${doi}` : paper.url,
    doi: doi?.toLowerCase().startsWith("10.") ? doi : undefined,
    publisher: journal ?? new URL(paper.url).hostname,
    publicationDate: date,
    source: "publisher-metadata",
    fetchError: typeof html === "object" ? html.fetchError : undefined
  };
};

const trialCandidates = [];
const paperCandidates = [];
const videoCandidates = [];
let cursor = 0;

const verifiedRelatedTrials = new Map([
  ["cortivis", { nctId: "NCT02983370", relationshipType: "named-program", relationshipNote: "The registry title names CORTIVIS and lists Universidad Miguel Hernandez de Elche, the program's host institution, as sponsor." }],
  ["time-is-brain", { nctId: "NCT06149754", relationshipType: "device-named", relationshipNote: "The registry intervention explicitly names the Time is Brain BraiN20 device; the academic hospital foundation is the lead sponsor." }]
]);

const toTrialCandidate = (study) => {
  const protocol = study.protocolSection ?? {};
  const sponsors = [
    protocol.sponsorCollaboratorsModule?.leadSponsor?.name,
    ...(protocol.sponsorCollaboratorsModule?.collaborators ?? []).map((item) => item.name)
  ].filter(Boolean);
  return {
    nctId: protocol.identificationModule?.nctId,
    briefTitle: protocol.identificationModule?.briefTitle,
    leadSponsor: protocol.sponsorCollaboratorsModule?.leadSponsor?.name,
    collaborators: (protocol.sponsorCollaboratorsModule?.collaborators ?? []).map((item) => item.name),
    sponsors,
    overallStatus: protocol.statusModule?.overallStatus,
    startDate: protocol.statusModule?.startDateStruct,
    primaryCompletionDate: protocol.statusModule?.primaryCompletionDateStruct,
    completionDate: protocol.statusModule?.completionDateStruct,
    conditions: protocol.conditionsModule?.conditions ?? [],
    interventions: protocol.armsInterventionsModule?.interventions?.map((item) => item.name) ?? [],
    locations: (protocol.contactsLocationsModule?.locations ?? []).map((item) =>
      [item.facility, item.city, item.state, item.country].filter(Boolean).join(", ")
    ),
    primaryOutcomes: (protocol.outcomesModule?.primaryOutcomes ?? []).map((item) => item.measure),
    briefSummary: protocol.descriptionModule?.briefSummary,
    studyType: protocol.designModule?.studyType
  };
};

const worker = async () => {
  while (cursor < cohort.records.length) {
    const record = cohort.records[cursor++];
    const queryName = record.name.replace(/\s*\/.*$/, "").replace(/\s*\(.*$/, "");
    const trialsPayload = videosOnly ? null : await fetchCached(`https://clinicaltrials.gov/api/v2/studies?query.spons=${encodeURIComponent(queryName)}&pageSize=100&format=json`);
    const studies = (trialsPayload?.studies ?? []).map((study) => {
      const candidate = toTrialCandidate(study);
      return { ...candidate, exactSponsorMatch: candidate.sponsors.some((sponsor) => sponsorMatches(record.name, sponsor)) };
    });
    if (!videosOnly) trialCandidates.push({ slug: record.slug, name: record.name, studies: studies.filter((study) => study.exactSponsorMatch) });

    const paper = firstDirectPaper(record);
    if (paper && !videosOnly && !trialsOnly) {
      paperCandidates.push({ slug: record.slug, name: record.name, original: paper, metadata: await paperMetadata(paper) });
    }

    for (const video of (trialsOnly ? [] : specificYoutube(record))) {
      const videoId = video.url.match(/(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]{6,})/)?.[1];
      if (!videoId) continue;
      const [oembed, html] = await Promise.all([
        fetchCached(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`),
        fetchCached(`https://www.youtube.com/watch?v=${videoId}`, "text")
      ]);
      videoCandidates.push({
        slug: record.slug,
        name: record.name,
        videoId,
        title: oembed?.title ?? video.title,
        publisher: oembed?.author_name ?? "YouTube",
        publicationDate:
          extractMeta(html, ["datePublished", "uploadDate"]) ??
          (typeof html === "string" ? html.match(/"(?:publishDate|uploadDate)":"(\d{4}-\d{2}-\d{2})"/)?.[1] : undefined),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        fetchError: oembed?.fetchError ?? (typeof html === "object" ? html.fetchError : undefined)
      });
    }
  }
};

await Promise.all(Array.from({ length: 6 }, worker));
if (!videosOnly) {
  for (const [slug, relationship] of verifiedRelatedTrials) {
    const target = trialCandidates.find((item) => item.slug === slug);
    if (!target || target.studies.some((study) => study.nctId === relationship.nctId)) continue;
    const payload = await fetchCached(`https://clinicaltrials.gov/api/v2/studies/${relationship.nctId}`);
    if (!payload?.protocolSection) throw new Error(`Unable to resolve verified related trial ${relationship.nctId} for ${slug}`);
    target.studies.push({
      ...toTrialCandidate(payload),
      exactSponsorMatch: false,
      relationshipVerified: true,
      relationshipType: relationship.relationshipType,
      relationshipNote: relationship.relationshipNote
    });
  }
}
trialCandidates.sort((a, b) => a.slug.localeCompare(b.slug));
paperCandidates.sort((a, b) => a.slug.localeCompare(b.slug));
videoCandidates.sort((a, b) => a.slug.localeCompare(b.slug) || a.videoId.localeCompare(b.videoId));

const writes = [];
if (!trialsOnly) writes.push(writeFile(resolve(cacheDir, "video-candidates.json"), `${JSON.stringify(videoCandidates, null, 2)}\n`, "utf8"));
if (!videosOnly) {
  writes.push(
    writeFile(resolve(cacheDir, "trial-candidates.json"), `${JSON.stringify(trialCandidates, null, 2)}\n`, "utf8")
  );
  if (!trialsOnly) writes.push(writeFile(resolve(cacheDir, "paper-candidates.json"), `${JSON.stringify(paperCandidates, null, 2)}\n`, "utf8"));
}
await Promise.all(writes);

console.log(JSON.stringify({
  organizations: cohort.records.length,
  organizationsWithExactSponsorTrials: trialCandidates.filter((record) => record.studies.length).length,
  exactSponsorTrials: trialCandidates.reduce((sum, record) => sum + record.studies.length, 0),
  paperCandidates: paperCandidates.length,
  paperMetadataFailures: paperCandidates.filter((record) => record.metadata.fetchError).length,
  specificVideos: videoCandidates.length,
  videoMetadataFailures: videoCandidates.filter((record) => record.fetchError).length
}, null, 2));
