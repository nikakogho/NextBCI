import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const cacheDir = resolve(projectRoot, ".research-cache", "top-company-deep-research");
const httpCacheDir = resolve(cacheDir, "http");
await mkdir(httpCacheDir, { recursive: true });

const dataFiles = [
  "schema.ts", "sourced-expansion.ts", "africa-south-america-expansion.ts", "top-company-milestones.ts",
  "europe-evidence.ts", "us-evidence.ts", "seed-data.ts", "company-research.ts",
  "top-company-deep-research-profiles.ts", "top-company-deep-research.ts"
];

const loadData = async () => {
  const tempDir = join(tmpdir(), `nextbci-deep-research-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await mkdir(tempDir, { recursive: true });
  try {
    for (const fileName of dataFiles) {
      const sourcePath = join(projectRoot, "data", fileName);
      const output = ts.transpileModule(await readFile(sourcePath, "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
        fileName: sourcePath,
        reportDiagnostics: true
      });
      const blocking = (output.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
      if (blocking.length) throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));
      await writeFile(join(tempDir, fileName.replace(/\.ts$/, ".js")), output.outputText, "utf8");
    }
    const requireFromTemp = createRequire(join(tempDir, "load.cjs"));
    return {
      seed: requireFromTemp("./seed-data.js"),
      research: requireFromTemp("./company-research.js"),
      deep: requireFromTemp("./top-company-deep-research.js")
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
};

const data = await loadData();
const companyBySlug = new Map(data.seed.companies.map((company) => [company.slug, company]));
const profileBySlug = new Map(data.research.companyResearchProfiles.map((profile) => [profile.companySlug, profile]));
const knownUrls = new Set((JSON.stringify({ seed: data.seed, research: data.research }).match(/https?:\\?\/\\?\/[^\"\\\s]+/g) ?? [])
  .map((url) => url.replaceAll("\\/", "/").replace(/[),.;]+$/, "")));

const sleep = (milliseconds) => new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));
const cachePathFor = (url) => join(httpCacheDir, `${createHash("sha256").update(url).digest("hex")}.json`);
const fetchCached = async (url, responseType = "text") => {
  const cachePath = cachePathFor(url);
  try { return JSON.parse(await readFile(cachePath, "utf8")); } catch { /* cache miss */ }
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "NextBCI evidence research; source audit for a public BCI tracker" },
        redirect: "follow",
        signal: AbortSignal.timeout(12_000)
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const body = responseType === "json" ? await response.json() : await response.text();
      const payload = { ok: true, url: response.url, status: response.status, body };
      await writeFile(cachePath, `${JSON.stringify(payload)}\n`, "utf8");
      return payload;
    } catch (error) {
      lastError = error;
      await sleep(attempt * 350);
    }
  }
  const payload = { ok: false, url, error: String(lastError?.message ?? lastError ?? "fetch failed") };
  await writeFile(cachePath, `${JSON.stringify(payload)}\n`, "utf8");
  return payload;
};

const decodeHtml = (value = "") => value
  .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&nbsp;/gi, " ").replace(/&ndash;|&#8211;/gi, "-").replace(/&mdash;|&#8212;/gi, "-")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
const cleanText = (value = "") => decodeHtml(value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
  .replace(/\s+/g, " ").trim();
const normalizeUrl = (value) => {
  try {
    const url = new URL(value);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => url.searchParams.delete(key));
    return url.href.replace(/\/$/, "");
  } catch { return undefined; }
};
const pageMetadata = (html, url) => {
  const title = cleanText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").slice(0, 180);
  const meta = html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:description|og:description)["']/i)?.[1]
    ?? "";
  const description = cleanText(meta).slice(0, 500);
  const visible = cleanText(html).slice(0, 120_000);
  const sentences = visible.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.length >= 35 && sentence.length <= 320);
  const purposeSentence = sentences.find((sentence) => /\b(our mission|mission is|our goal|we aim|we develop|we build|dedicated to|focused on)\b/i.test(sentence));
  return { url, title: title || new URL(url).hostname, description, purposeSentence };
};
const wordExcerpt = (value, maxWords = 24) => {
  const words = cleanText(value).split(/\s+/).filter(Boolean);
  return `${words.slice(0, maxWords).join(" ")}${words.length > maxWords ? "..." : ""}`;
};
const anchorLinks = (html, baseUrl) => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .map((match) => {
    try { return { url: normalizeUrl(new URL(decodeHtml(match[1]), baseUrl).href), title: cleanText(match[2]).slice(0, 180) }; }
    catch { return undefined; }
  }).filter(Boolean);

const categories = [
  { section: "mission", pattern: /\b(about|mission|vision|purpose|company|who-we-are|our-story)\b/i },
  { section: "accomplishment", pattern: /\b(news|press|milestone|achievement|clinical|regulatory|breakthrough|results)\b/i },
  { section: "paper", pattern: /\b(research|science|publication|paper|evidence|journal)\b/i },
  { section: "interview", pattern: /\b(interview|podcast|webinar|talk|video|youtube|media)\b/i }
];
const sameSite = (candidate, website) => {
  try {
    const a = new URL(candidate).hostname.replace(/^www\./, "");
    const b = new URL(website).hostname.replace(/^www\./, "");
    return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
  } catch { return false; }
};

const exactishSponsor = (companyName, sponsorName) => {
  const normalize = (value) => value.toLowerCase().replace(/\b(incorporated|inc|corp|corporation|company|co|limited|ltd|llc|plc|gmbh|medical|technologies|technology|therapeutics|neuroscience|neurotechnology|systems)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  const company = normalize(companyName);
  const sponsor = normalize(sponsorName);
  return company.length >= 4 && sponsor.length >= 4 && company === sponsor;
};

const affiliationAliases = {
  "synchron-stentrode": ["Synchron"],
  "precision-layer-7": ["Precision Neuroscience"],
  "paradromics-connexus": ["Paradromics"],
  "blackrock-neurotech": ["Blackrock Neurotech"],
  "onward-arc-bci": ["ONWARD Medical"],
  "tsinghua-neo": ["Neuracle"],
  "medtronic-neuromodulation": ["Medtronic"],
  "abbott-neuromodulation": ["Abbott"],
  "boston-scientific-neuromodulation": ["Boston Scientific"],
  "neuropace-rns": ["NeuroPace"],
  "muse-interaxon": ["InteraXon"],
  "neurosity-crown": ["Neurosity"],
  "kernel-flow": ["Kernel"],
  "nextmind-snap-ar": ["NextMind"],
  "ctrl-labs": ["CTRL-labs"],
  "openwater-lifu": ["Openwater"],
  "eneura-edb82": ["eNeura"],
  "gowerlabs-lumo": ["Gowerlabs"],
  "sona": ["MindSpire"]
};
const articleAffiliationIds = (xml, slug, companyName) => {
  const aliases = affiliationAliases[slug] ?? [companyName.replace(/\s*\/.*$/, "").replace(/\s*\(.*$/, "")];
  const normalize = (value) => cleanText(decodeHtml(value)).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const matches = (affiliation) => aliases.some((alias) => {
    const normalizedAlias = normalize(alias);
    const normalizedAffiliation = normalize(affiliation);
    const words = normalizedAlias.split(" ");
    if (words.length > 1) return normalizedAffiliation.includes(normalizedAlias);
    if (normalizedAlias.length >= 6) return new RegExp(`(^| )${normalizedAlias}( |$)`).test(normalizedAffiliation);
    return new RegExp(`(^| )${normalizedAlias} (inc|llc|ltd|limited|corp|corporation|company|gmbh|medical|technologies|technology)( |$)`).test(normalizedAffiliation);
  });
  return new Set([...xml.matchAll(/<PubmedArticle[\s\S]*?<\/PubmedArticle>/gi)].flatMap((match) => {
    const article = match[0];
    const pmid = cleanText(article.match(/<PMID[^>]*>([^<]+)<\/PMID>/i)?.[1] ?? "");
    const affiliations = [...article.matchAll(/<Affiliation[^>]*>([\s\S]*?)<\/Affiliation>/gi)].map((item) => cleanText(item[1]));
    return pmid && affiliations.some(matches) ? [pmid] : [];
  }));
};

const researchCompany = async (slug, rank) => {
  const company = companyBySlug.get(slug);
  const profile = profileBySlug.get(slug);
  if (!company) throw new Error(`Unknown top-200 company: ${slug}`);
  const website = normalizeUrl(profile?.officialWebsite ?? company.website ?? company.sourceLinks?.[0]?.url);
  const discoveredPages = [];
  const errors = [];

  if (website) {
    const homepage = await fetchCached(website);
    if (homepage.ok) {
      const finalHome = normalizeUrl(homepage.url) ?? website;
      const homepageMeta = pageMetadata(homepage.body, finalHome);
      discoveredPages.push({ section: "mission", ...homepageMeta, excerpt: wordExcerpt(homepageMeta.description || homepageMeta.purposeSentence) });
      let candidates = anchorLinks(homepage.body, finalHome)
        .filter((link) => link.url && sameSite(link.url, finalHome));
      const origin = new URL(finalHome).origin;
      const sitemap = await fetchCached(`${origin}/sitemap.xml`);
      if (sitemap.ok) {
        candidates.push(...[...sitemap.body.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].slice(0, 1000).map((match) => ({
          url: normalizeUrl(decodeHtml(match[1].trim())), title: ""
        })).filter((link) => link.url && sameSite(link.url, finalHome)));
      }
      const seenUrls = new Set();
      candidates = candidates.filter((candidate) => !seenUrls.has(candidate.url) && seenUrls.add(candidate.url));
      for (const category of categories) {
        const candidate = candidates.find((link) => category.pattern.test(`${link.title} ${link.url}`) && !knownUrls.has(link.url));
        if (!candidate) continue;
        const page = await fetchCached(candidate.url);
        if (!page.ok) { errors.push(`${category.section}: ${page.error}`); continue; }
        const pageUrl = normalizeUrl(page.url) ?? candidate.url;
        const meta = pageMetadata(page.body, pageUrl);
        const excerpt = wordExcerpt(meta.description || meta.purposeSentence);
        if (meta.title || excerpt) discoveredPages.push({ section: category.section, ...meta, excerpt });
      }
    } else {
      errors.push(`website: ${homepage.error}`);
    }
  }

  const sponsorQuery = encodeURIComponent(company.name.replace(/\s*\/.*$/, "").replace(/\s*\(.*$/, ""));
  const trialPayload = await fetchCached(`https://clinicaltrials.gov/api/v2/studies?query.spons=${sponsorQuery}&pageSize=25&format=json`, "json");
  const trials = trialPayload.ok ? (trialPayload.body.studies ?? []).flatMap((study) => {
    const protocol = study.protocolSection ?? {};
    const sponsor = protocol.sponsorCollaboratorsModule?.leadSponsor?.name ?? "";
    const id = protocol.identificationModule?.nctId;
    if (!id || !exactishSponsor(company.name, sponsor)) return [];
    return [{
      nctId: id,
      title: protocol.identificationModule?.briefTitle ?? protocol.identificationModule?.officialTitle ?? id,
      sponsor,
      status: protocol.statusModule?.overallStatus ?? "UNKNOWN",
      startDate: protocol.statusModule?.startDateStruct?.date,
      completionDate: protocol.statusModule?.completionDateStruct?.date,
      url: `https://clinicaltrials.gov/study/${id}`,
      isNewSource: !knownUrls.has(`https://clinicaltrials.gov/study/${id}`)
    }];
  }) : [];

  const pubmedTerm = encodeURIComponent(`"${company.name.replace(/\s*\/.*$/, "")}"[Affiliation] AND (brain OR neural OR neuro OR EEG OR BCI)`);
  const pubmedSearch = await fetchCached(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=8&sort=date&term=${pubmedTerm}`, "json");
  const pubmedIds = pubmedSearch.ok ? (pubmedSearch.body.esearchresult?.idlist ?? []) : [];
  let publications = [];
  if (pubmedIds.length) {
    const [summary, articles] = await Promise.all([
      fetchCached(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${pubmedIds.join(",")}`, "json"),
      fetchCached(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=${pubmedIds.join(",")}`)
    ]);
    const affiliationIds = articles.ok ? articleAffiliationIds(articles.body, slug, company.name) : new Set();
    if (summary.ok) publications = pubmedIds.filter((id) => affiliationIds.has(id)).flatMap((id) => {
      const item = summary.body.result?.[id];
      if (!item?.title) return [];
      const url = `https://pubmed.ncbi.nlm.nih.gov/${id}/`;
      return [{ pmid: id, title: cleanText(item.title), publicationDate: item.pubdate, journal: item.fulljournalname || item.source || "PubMed", url, isNewSource: !knownUrls.has(url) && !knownUrls.has(url.replace(/\/$/, "")) }];
    });
  }

  return { rank, slug, name: company.name, website, discoveredPages, trials, publications, errors };
};

let cursor = 0;
const records = new Array(data.deep.topCompanyResearchSlugs.length);
const worker = async () => {
  while (cursor < data.deep.topCompanyResearchSlugs.length) {
    const index = cursor++;
    records[index] = await researchCompany(data.deep.topCompanyResearchSlugs[index], index + 1);
    if ((index + 1) % 10 === 0) console.log(`Researched ${index + 1}/${data.deep.topCompanyResearchSlugs.length}`);
    await sleep(150);
  }
};
await Promise.all(Array.from({ length: 8 }, worker));

const outputPath = join(cacheDir, "source-discovery.json");
await writeFile(outputPath, `${JSON.stringify({ researchedOn: "2026-08-06", records }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  companies: records.length,
  withOfficialPages: records.filter((record) => record.discoveredPages.length).length,
  withNewOfficialPages: records.filter((record) => record.discoveredPages.some((page) => !knownUrls.has(normalizeUrl(page.url)))).length,
  withExactSponsorTrials: records.filter((record) => record.trials.length).length,
  withNewTrials: records.filter((record) => record.trials.some((trial) => trial.isNewSource)).length,
  withAffiliationPapers: records.filter((record) => record.publications.length).length,
  withNewPapers: records.filter((record) => record.publications.some((paper) => paper.isNewSource)).length
}, null, 2));
