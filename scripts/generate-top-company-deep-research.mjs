import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const cachePath = resolve(projectRoot, ".research-cache", "top-company-deep-research", "source-discovery.json");
const outputPath = resolve(projectRoot, "data", "top-company-deep-research-profiles.ts");
const auditPath = resolve(projectRoot, "docs", "top-200-company-research-audit.md");
const dataFiles = [
  "schema.ts", "sourced-expansion.ts", "africa-south-america-expansion.ts", "top-company-milestones.ts",
  "europe-evidence.ts", "us-evidence.ts", "seed-data.ts", "company-research.ts",
  "top-company-deep-research-profiles.ts", "top-company-deep-research.ts"
];

const loadData = async () => {
  const tempDir = join(tmpdir(), `nextbci-deep-generate-${Date.now()}-${Math.random().toString(36).slice(2)}`);
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

const [data, discovery] = await Promise.all([loadData(), readFile(cachePath, "utf8").then(JSON.parse)]);
const companyBySlug = new Map(data.seed.companies.map((company) => [company.slug, company]));
const researchBySlug = new Map(data.research.companyResearchProfiles.map((profile) => [profile.companySlug, profile]));
const discoveryBySlug = new Map(discovery.records.map((record) => [record.slug, record]));
const group = (records) => Map.groupBy(records, (record) => record.companySlug);
const milestonesBySlug = group(data.seed.milestones);
const trialsBySlug = group(data.seed.trials);
const papersBySlug = group(data.seed.papers);
const projectsBySlug = group(data.seed.programProjects);
const knownUrls = new Set((JSON.stringify({ seed: data.seed, research: data.research }).match(/https?:\\?\/\\?\/[^\"\\\s]+/g) ?? [])
  .map((url) => url.replaceAll("\\/", "/").replace(/[),.;]+$/, "")));
const normalizeUrl = (value) => {
  try {
    const url = new URL(value);
    url.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => url.searchParams.delete(key));
    return url.href.replace(/\/$/, "");
  } catch { return value; }
};
const sourceIsNew = (url) => !knownUrls.has(url) && !knownUrls.has(normalizeUrl(url)) && !knownUrls.has(`${normalizeUrl(url)}/`);
const source = (title, url, publisher, sourceType, isPrimary = true) => ({ title, url, publisher, sourceType, isPrimary });
const host = (url) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "Official source"; } };
const clean = (value = "") => value.replace(/\s+/g, " ").trim();
const dateValue = (value) => value?.match(/^\d{4}(?:-\d{2})?(?:-\d{2})?/)?.[0];
const newestFirst = (a, b) => (b.sortDate ?? "").localeCompare(a.sortDate ?? "");
const uniqueByUrl = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const url = normalizeUrl(item.sourceLinks[0]?.url ?? "");
    if (!url || seen.has(`${item.section}:${url}`)) return false;
    seen.add(`${item.section}:${url}`);
    return true;
  });
};

const profiles = data.deep.topCompanyResearchSlugs.map((slug, index) => {
  const rank = index + 1;
  const company = companyBySlug.get(slug);
  const legacyResearch = researchBySlug.get(slug);
  const live = discoveryBySlug.get(slug) ?? { discoveredPages: [], trials: [], publications: [], errors: [] };
  if (!company) throw new Error(`Missing top-200 company ${slug}`);
  const items = [];
  const officialPages = live.discoveredPages.filter((page) => page.url && (page.title || page.excerpt));
  const missionPage = officialPages.find((page) => page.section === "mission" && sourceIsNew(page.url))
    ?? officialPages.find((page) => page.section === "mission")
    ?? officialPages[0];
  const officialUrl = missionPage?.url ?? legacyResearch?.officialWebsite ?? company.website ?? company.sourceLinks[0]?.url;

  if (officialUrl) {
    const excerpt = clean(missionPage?.excerpt ?? "");
    items.push({
      section: "mission",
      title: "Mission and operating focus",
      detail: excerpt
        ? `The official source adds this stated framing: “${excerpt}” The tracker records it as organizational intent, separate from demonstrated performance.`
        : `${company.name} states a focus on ${company.targetFunction.toLowerCase()} using ${company.modality}. This is a stated direction, not outcome evidence.`,
      evidenceLevel: "E1",
      sourceLinks: [source(missionPage?.title || `${company.name} official site`, officialUrl, host(officialUrl), "institution-page")],
      caveat: "A mission or positioning statement establishes intent only; it does not verify efficacy, readiness, or regulatory status.",
      isNewSource: sourceIsNew(officialUrl)
    });
  }

  const liveTrial = live.trials
    .filter((trial) => !/WITHDRAWN|TERMINATED/i.test(trial.status))
    .sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""))[0];
  const upcoming = (milestonesBySlug.get(slug) ?? []).filter((item) => item.status === "upcoming").sort(newestFirst)[0];
  const project = (projectsBySlug.get(slug) ?? []).sort(newestFirst)[0];
  if (liveTrial) {
    const timing = [liveTrial.startDate ? `start ${liveTrial.startDate}` : undefined, liveTrial.completionDate ? `completion ${liveTrial.completionDate}` : undefined].filter(Boolean).join("; ");
    items.push({
      section: "goal",
      title: `Current registered objective: ${liveTrial.title}`,
      detail: `ClinicalTrials.gov lists this exact-sponsor study as ${liveTrial.status.toLowerCase().replaceAll("_", " ")}${timing ? ` (${timing})` : ""}. The concrete goal is the protocol, endpoints, and population in the registry record.`,
      date: dateValue(liveTrial.startDate),
      evidenceLevel: "E3",
      sourceLinks: [source(`${liveTrial.nctId} study record`, liveTrial.url, "ClinicalTrials.gov", "trial-registry")],
      caveat: "Registration verifies a study plan and status, not a favorable result; dates and recruitment status can change.",
      isNewSource: liveTrial.isNewSource
    });
  } else if (upcoming) {
    items.push({
      section: "goal",
      title: upcoming.title,
      detail: `${upcoming.summary} ${upcoming.whyItMatters}`,
      date: upcoming.sortDate,
      evidenceLevel: upcoming.evidenceLevel,
      sourceLinks: upcoming.sourceLinks,
      caveat: upcoming.hypeCheck,
      isNewSource: false
    });
  } else if (project) {
    items.push({
      section: "goal",
      title: project.name,
      detail: `${project.summary} The tracked readiness is ${project.stage}.`,
      date: project.sortDate,
      evidenceLevel: project.evidenceLevel,
      sourceLinks: project.sourceLinks,
      caveat: project.notYetShown || "The project record establishes a tracked development line, not a completed or clinically validated outcome.",
      isNewSource: false
    });
  } else if (officialUrl) {
    items.push({
      section: "goal",
      title: `Stated development direction: ${company.targetFunction}`,
      detail: `The catalog currently describes the program as ${company.stage.toLowerCase()}, using ${company.modality}. No more concrete registry or dated public checkpoint qualified in this pass.`,
      evidenceLevel: "E1",
      sourceLinks: [source(`${company.name} official source`, officialUrl, host(officialUrl), "institution-page")],
      caveat: "This is a direction-of-work summary, not a promised delivery date or proof of capability.",
      isNewSource: sourceIsNew(officialUrl)
    });
  }

  const newsPage = officialPages.find((page) => page.section === "accomplishment" && sourceIsNew(page.url));
  if (newsPage) {
    items.push({
      section: "accomplishment",
      title: newsPage.title || "Additional official accomplishment source",
      detail: newsPage.excerpt
        ? `The official page summarizes: “${clean(newsPage.excerpt)}”`
        : "This official news or milestone page supplies additional first-party context for the company record.",
      evidenceLevel: "E1",
      sourceLinks: [source(newsPage.title || `${company.name} update`, newsPage.url, host(newsPage.url), "company-update")],
      caveat: "This is a first-party source lead. Its claims are not promoted to demonstrated capability without independent or primary clinical evidence.",
      isNewSource: true
    });
  }

  const confirmedMilestones = (milestonesBySlug.get(slug) ?? []).filter((item) => item.status === "confirmed").sort(newestFirst).slice(0, 2);
  for (const milestone of confirmedMilestones) {
    items.push({
      section: "milestone",
      title: milestone.title,
      detail: `${milestone.summary} ${milestone.whyItMatters}`,
      date: milestone.sortDate,
      evidenceLevel: milestone.evidenceLevel,
      sourceLinks: milestone.sourceLinks,
      caveat: milestone.hypeCheck,
      isNewSource: false
    });
  }

  const canonicalTrialIds = new Set((trialsBySlug.get(slug) ?? []).map((trial) => trial.registryId));
  for (const trial of live.trials.filter((item) => item.isNewSource && !canonicalTrialIds.has(item.nctId)).slice(0, 2)) {
    items.push({
      section: "milestone",
      title: `${trial.nctId}: ${trial.title}`,
      detail: `The exact-matched lead sponsor is ${trial.sponsor}; the registry status is ${trial.status.toLowerCase().replaceAll("_", " ")}.`,
      date: dateValue(trial.startDate),
      evidenceLevel: "E3",
      sourceLinks: [source(`${trial.nctId} study record`, trial.url, "ClinicalTrials.gov", "trial-registry")],
      caveat: "The record establishes registration and sponsor identity only; it does not establish safety, efficacy, completion, or published results.",
      isNewSource: true
    });
  }

  const canonicalPaperUrls = new Set((papersBySlug.get(slug) ?? []).flatMap((paper) => paper.sourceLinks.map((link) => normalizeUrl(link.url))));
  const neurotechnologyTitle = /brain|neural|neuro|eeg|electro|cortical|cochlear|implant|stimulation|neuromodulation|cognitive|stroke|epilep|parkinson|depression|hearing|vestibular|spinal|nerve|prosthe|connectom|mri|pet|pupil|dysphagia|motor|sensory/i;
  for (const publication of live.publications.filter((paper) => paper.isNewSource && neurotechnologyTitle.test(paper.title) && !canonicalPaperUrls.has(normalizeUrl(paper.url))).slice(0, 3)) {
    items.push({
      section: "paper",
      title: publication.title,
      detail: `${publication.journal}; publication date listed by PubMed as ${publication.publicationDate || "not supplied"}. The company name was matched in the PubMed affiliation query.`,
      date: dateValue(publication.publicationDate),
      evidenceLevel: "E4",
      sourceLinks: [source(`PubMed ${publication.pmid}`, publication.url, "National Library of Medicine", "paper")],
      caveat: "Affiliation supports participation in this publication; it does not show that every result validates the company’s current product or commercial claims.",
      isNewSource: true
    });
  }

  const interviewPage = officialPages.find((page) => page.section === "interview" && /interview|podcast|webinar|talk/i.test(`${page.title} ${page.url}`));
  if (interviewPage) {
    items.push({
      section: "interview",
      title: interviewPage.title || "Official interview or talk",
      detail: interviewPage.excerpt
        ? `The source description says: “${clean(interviewPage.excerpt)}”`
        : "An official interview, podcast, webinar, or talk page adds leadership and product context.",
      evidenceLevel: "E1",
      sourceLinks: [source(interviewPage.title || `${company.name} interview`, interviewPage.url, host(interviewPage.url), "company-update")],
      caveat: "An interview documents what a speaker said; it does not independently verify performance claims made in the conversation.",
      isNewSource: sourceIsNew(interviewPage.url)
    });
  } else {
    const specificVideo = legacyResearch?.videos.find((video) => !/official video or channel|youtube channel|official channel/i.test(video.title));
    if (specificVideo) items.push({
      section: "interview",
      title: specificVideo.title,
      detail: "This retained talk or video provides public context beyond the formal paper, registry, and regulator record.",
      evidenceLevel: "E1",
      sourceLinks: [source(specificVideo.title, specificVideo.url, specificVideo.publisher, "demo-video", false)],
      caveat: "A talk or video is contextual evidence; capability claims still require the stronger sources listed separately.",
      isNewSource: false
    });
  }

  const finalItems = uniqueByUrl(items);
  const uniqueSources = new Map(finalItems.flatMap((item) => item.sourceLinks).map((link) => [normalizeUrl(link.url), link]));
  const sectionsCovered = [...new Set(finalItems.map((item) => item.section))];
  const newSources = new Set(finalItems.filter((item) => item.isNewSource).flatMap((item) => item.sourceLinks.map((link) => normalizeUrl(link.url))));
  const primarySources = [...uniqueSources.values()].filter((link) => link.isPrimary).length;
  const missing = ["mission", "goal", "accomplishment", "milestone", "paper", "interview"].filter((section) => !sectionsCovered.includes(section));
  return {
    rank,
    companySlug: slug,
    companyName: company.name,
    researchedOn: discovery.researchedOn,
    selectionRationale: rank <= 100
      ? "Part of the pre-existing curated prominence cohort, weighted for recognition, human or clinical activity, regulatory maturity, longevity, and BCI infrastructure importance."
      : "Selected from the remaining commercial catalog by a reproducible score combining evidence level, readiness, organization maturity, milestones, trials, papers, demos, projects, and research-source depth.",
    researchSummary: `${finalItems.length} claim-level research entries cover ${sectionsCovered.join(", ") || "no qualifying sections"}. ${newSources.size} unique source${newSources.size === 1 ? " is" : "s are"} new to the pre-audit dataset.`,
    items: finalItems,
    sourceAudit: { totalSources: uniqueSources.size, newSources: newSources.size, primarySources, sectionsCovered },
    limitations: missing.length
      ? `No qualifying ${missing.join(", ")} source was found in this pass. Absence here means not verified in the reviewed sources, not proof that no such material exists.`
      : "All requested research sections have a source-backed entry; evidence-level caveats still apply to each claim."
  };
});

const generated = `import type { CompanyDeepResearchProfile } from "./schema";\n\n// Generated by scripts/generate-top-company-deep-research.mjs from the cached\n// 2026-08-06 official-site, ClinicalTrials.gov, and PubMed source pass.\nexport const generatedTopCompanyDeepResearchProfiles: CompanyDeepResearchProfile[] = ${JSON.stringify(profiles, null, 2)};\n`;
await writeFile(outputPath, generated, "utf8");

const coverage = Object.fromEntries(["mission", "goal", "accomplishment", "milestone", "paper", "interview"].map((section) => [
  section, profiles.filter((profile) => profile.sourceAudit.sectionsCovered.includes(section)).length
]));
const sourceTotals = profiles.reduce((totals, profile) => ({
  sources: totals.sources + profile.sourceAudit.totalSources,
  newSources: totals.newSources + profile.sourceAudit.newSources,
  primarySources: totals.primarySources + profile.sourceAudit.primarySources
}), { sources: 0, newSources: 0, primarySources: 0 });
const rows = profiles.map((profile) => `| ${profile.rank} | [${profile.companyName}](../companies/${profile.companySlug}) | ${profile.items.length} | ${profile.sourceAudit.newSources} | ${profile.sourceAudit.sectionsCovered.join(", ")} | ${profile.limitations.replaceAll("|", "/")} |`);
const audit = `# Top 200 company deep-research audit

Audited on ${discovery.researchedOn}. This layer adds claim-level mission, goals, accomplishment, milestone, paper, and interview/talk context on top of the existing tracker records. It does not treat a company page, trial registration, paper affiliation, or interview as stronger evidence than each source supports.

## Cohort method

- Ranks 1-100 preserve the prominence-weighted cohort curated on 2026-08-02.
- Ranks 101-200 use a reproducible evidence/activity/readiness score across the remaining commercial catalog: evidence level; product readiness; organization maturity; tracker milestones, trials, papers, demos, and projects; and source-depth indicators.
- This is a research-priority cohort, not an objective valuation or market-cap ranking.

## Coverage result

- Companies: ${profiles.length}.
- Claim-level entries: ${profiles.reduce((sum, profile) => sum + profile.items.length, 0)}.
- Unique sources counted within company dossiers: ${sourceTotals.sources}; ${sourceTotals.primarySources} are marked primary.
- New-to-pre-audit source URLs: ${sourceTotals.newSources} across ${profiles.filter((profile) => profile.sourceAudit.newSources > 0).length} companies.
- Section coverage: mission ${coverage.mission}/200, goals ${coverage.goal}/200, accomplishments ${coverage.accomplishment}/200, milestones ${coverage.milestone}/200, papers ${coverage.paper}/200, interviews/talks ${coverage.interview}/200.

## Evidence boundaries

- Official mission, goal, launch, and accomplishment pages are E1 statements unless a regulator, registry, paper, or independently inspectable demo supports more.
- ClinicalTrials.gov establishes a registered protocol, sponsor, and reported status. It does not establish a favorable result, and dates can move.
- PubMed affiliation matching supports company participation in a publication. It does not prove that every paper result validates the current commercial product.
- Interviews, podcasts, webinars, and talks document public statements; they do not independently corroborate claims made by speakers.
- Missing material is reported as not verified in this pass, never as proof of absence.

## Company-by-company audit

| Rank | Company | Entries | New sources | Sections | Explicit gap note |
|---:|---|---:|---:|---|---|
${rows.join("\n")}
`;
await writeFile(auditPath, audit, "utf8");
console.log(JSON.stringify({ outputPath, auditPath, profiles: profiles.length, coverage, ...sourceTotals }, null, 2));
