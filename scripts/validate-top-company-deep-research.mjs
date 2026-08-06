import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const tempDir = join(tmpdir(), `nextbci-deep-validate-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const fileNames = [
  "schema.ts", "sourced-expansion.ts", "africa-south-america-expansion.ts", "top-company-milestones.ts",
  "europe-evidence.ts", "us-evidence.ts", "seed-data.ts", "top-company-deep-research-profiles.ts",
  "top-company-deep-research.ts"
];

await mkdir(tempDir, { recursive: true });
try {
  for (const fileName of fileNames) {
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

  const requireFromTemp = createRequire(join(tempDir, "validate.cjs"));
  const { companies } = requireFromTemp("./seed-data.js");
  const { topCompanyResearchSlugs, topCompanyDeepResearchProfiles } = requireFromTemp("./top-company-deep-research.js");
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  const allowedSections = new Set(["mission", "goal", "accomplishment", "milestone", "paper", "interview"]);
  const allowedEvidence = new Set(["E0", "E1", "E2", "E3", "E4", "E5", "E6"]);
  const errors = [];
  const validUrl = (value) => { try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; } };
  const text = (value) => typeof value === "string" && value.trim().length > 0;

  if (topCompanyResearchSlugs.length !== 200 || new Set(topCompanyResearchSlugs).size !== 200) {
    errors.push(`topCompanyResearchSlugs must contain exactly 200 unique companies; found ${topCompanyResearchSlugs.length}/${new Set(topCompanyResearchSlugs).size}`);
  }
  if (topCompanyDeepResearchProfiles.length !== 200) errors.push(`expected 200 deep-research profiles; found ${topCompanyDeepResearchProfiles.length}`);

  topCompanyDeepResearchProfiles.forEach((profile, index) => {
    const path = `topCompanyDeepResearchProfiles[${index}]`;
    if (profile.rank !== index + 1) errors.push(`${path}.rank must be ${index + 1}`);
    if (profile.companySlug !== topCompanyResearchSlugs[index]) errors.push(`${path}.companySlug does not match ranked cohort`);
    if (companyBySlug.get(profile.companySlug)?.kind !== "company") errors.push(`${path}.companySlug is not a catalog company`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.researchedOn)) errors.push(`${path}.researchedOn must use YYYY-MM-DD`);
    ["companyName", "selectionRationale", "researchSummary", "limitations"].forEach((key) => {
      if (!text(profile[key])) errors.push(`${path}.${key} must be non-empty`);
    });
    if (!Array.isArray(profile.items) || profile.items.length < 2) errors.push(`${path}.items must include at least mission and goal research`);
    const sections = new Set();
    const uniqueSources = new Map();
    const newSources = new Set();
    for (const [itemIndex, item] of profile.items.entries()) {
      const itemPath = `${path}.items[${itemIndex}]`;
      if (!allowedSections.has(item.section)) errors.push(`${itemPath}.section is invalid`);
      sections.add(item.section);
      if (!text(item.title) || !text(item.detail) || !text(item.caveat)) errors.push(`${itemPath} must include title, detail, and caveat`);
      if (!allowedEvidence.has(item.evidenceLevel)) errors.push(`${itemPath}.evidenceLevel is invalid`);
      if (!Array.isArray(item.sourceLinks) || !item.sourceLinks.length) errors.push(`${itemPath}.sourceLinks must be non-empty`);
      for (const [sourceIndex, link] of item.sourceLinks.entries()) {
        if (!text(link.title) || !text(link.publisher) || !validUrl(link.url)) errors.push(`${itemPath}.sourceLinks[${sourceIndex}] is invalid`);
        uniqueSources.set(link.url.replace(/\/$/, ""), link);
        if (item.isNewSource) newSources.add(link.url.replace(/\/$/, ""));
      }
      if (item.section === "paper" && !item.sourceLinks.some((link) => /pubmed\.ncbi\.nlm\.nih\.gov/i.test(link.url))) {
        errors.push(`${itemPath} paper lacks a PubMed source`);
      }
      if (item.section === "paper" && item.evidenceLevel !== "E4") errors.push(`${itemPath} affiliation-verified paper must remain E4`);
      if (item.section === "paper" && !/brain|neural|neuro|eeg|electro|cortical|cochlear|implant|stimulation|neuromodulation|cognitive|stroke|epilep|parkinson|depression|hearing|vestibular|spinal|nerve|prosthe|connectom|mri|pet|pupil|dysphagia|motor|sensory/i.test(item.title)) {
        errors.push(`${itemPath} paper title lacks a neurotechnology relevance signal`);
      }
      if ((item.section === "mission" || item.section === "accomplishment" || item.section === "interview") && item.evidenceLevel !== "E1") {
        errors.push(`${itemPath} first-party/context item must remain E1`);
      }
    }
    if (!sections.has("mission") || !sections.has("goal")) errors.push(`${path} must cover mission and goal`);
    const declared = new Set(profile.sourceAudit.sectionsCovered);
    if (declared.size !== sections.size || [...sections].some((section) => !declared.has(section))) errors.push(`${path}.sourceAudit.sectionsCovered is stale`);
    if (profile.sourceAudit.totalSources !== uniqueSources.size) errors.push(`${path}.sourceAudit.totalSources is stale`);
    if (profile.sourceAudit.newSources !== newSources.size) errors.push(`${path}.sourceAudit.newSources is stale`);
    const primarySources = [...uniqueSources.values()].filter((link) => link.isPrimary).length;
    if (profile.sourceAudit.primarySources !== primarySources) errors.push(`${path}.sourceAudit.primarySources is stale`);
  });

  const coverage = Object.fromEntries([...allowedSections].map((section) => [section, topCompanyDeepResearchProfiles.filter((profile) => profile.sourceAudit.sectionsCovered.includes(section)).length]));
  const newSourceCompanies = topCompanyDeepResearchProfiles.filter((profile) => profile.sourceAudit.newSources > 0).length;
  const newSources = topCompanyDeepResearchProfiles.reduce((sum, profile) => sum + profile.sourceAudit.newSources, 0);
  if (coverage.mission !== 200 || coverage.goal !== 200) errors.push(`mission and goal coverage must remain 200/200; found ${coverage.mission}/${coverage.goal}`);
  if (coverage.accomplishment < 120 || coverage.milestone < 140 || coverage.paper < 35 || coverage.interview < 45) {
    errors.push(`coverage regression: ${JSON.stringify(coverage)}`);
  }
  if (newSourceCompanies < 175 || newSources < 500) errors.push(`new-source coverage regressed: ${newSourceCompanies} companies / ${newSources} sources`);

  if (errors.length) {
    console.error(`Top-200 deep-research validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Top-200 deep-research validation passed: 200 companies, ${topCompanyDeepResearchProfiles.reduce((sum, profile) => sum + profile.items.length, 0)} entries, ${newSources} new sources across ${newSourceCompanies} companies, coverage ${JSON.stringify(coverage)}.`);
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
