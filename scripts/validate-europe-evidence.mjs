import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const isUsScope = process.argv.includes("--scope=us");
const scopeKey = isUsScope ? "us" : "europe";
const scopeLabel = isUsScope ? "U.S." : "European";
const tempDir = join(tmpdir(), `nextbci-${scopeKey}-validation-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const fileNames = [
  "schema.ts",
  "sourced-expansion.ts",
  "africa-south-america-expansion.ts",
  "top-company-milestones.ts",
  "europe-evidence.ts",
  "us-evidence.ts",
  "seed-data.ts"
];
const auditDate = "2026-08-03";
const europeCountries = new Set([
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
  "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
  "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
  "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania",
  "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
  "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia",
  "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "UK", "Ukraine", "United Kingdom",
  "Vatican City"
]);

await mkdir(tempDir, { recursive: true });
try {
  for (const fileName of fileNames) {
    const sourcePath = join(projectRoot, "data", fileName);
    const sourceText = await readFile(sourcePath, "utf8");
    const output = ts.transpileModule(sourceText, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
      fileName: sourcePath,
      reportDiagnostics: true
    });
    const blocking = (output.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
    if (blocking.length) throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));
    await writeFile(join(tempDir, fileName.replace(/\.ts$/, ".js")), output.outputText, "utf8");
  }

  const requireFromTemp = createRequire(join(tempDir, "validator.cjs"));
  const seed = requireFromTemp("./seed-data.js");
  const evidence = requireFromTemp(`./${scopeKey}-evidence.js`);
  const errors = [];
  const organizationSlugs = isUsScope ? evidence.usOrganizationSlugs : evidence.europeanOrganizationSlugs;
  const evidencePapers = isUsScope ? evidence.usEvidencePapers : evidence.europeEvidencePapers;
  const evidenceTrials = isUsScope ? evidence.usEvidenceTrials : evidence.europeEvidenceTrials;
  const evidenceMilestones = isUsScope ? evidence.usEvidenceMilestones : evidence.europeEvidenceMilestones;
  const evidenceProjects = isUsScope ? evidence.usEvidenceProjects : evidence.europeEvidenceProjects;
  const expected = isUsScope
    ? { total: 215, companies: 136, academic: 79, papers: 85, trials: 54, milestones: 30, projects: 62 }
    : { total: 352, companies: 247, academic: 105, papers: 125, trials: 64, milestones: 40, projects: 152 };
  const targetSlugs = new Set(organizationSlugs);
  const expectedTargets = seed.companies.filter((company) => isUsScope ? company.hq.country === "United States" : europeCountries.has(company.hq.country));
  const companyBySlug = new Map(seed.companies.map((company) => [company.slug, company]));
  const generatedCollections = [
    evidencePapers,
    evidenceTrials,
    evidenceMilestones,
    evidenceProjects
  ];
  const generatedRecords = generatedCollections.flat();
  const generatedIds = new Set(generatedRecords.map((item) => item.id));

  if (targetSlugs.size !== expected.total || organizationSlugs.length !== expected.total) {
    errors.push(`${scopeLabel} cohort must contain exactly ${expected.total} unique organizations; found ${targetSlugs.size}`);
  }
  const expectedSlugs = new Set(expectedTargets.map((company) => company.slug));
  if (expectedTargets.filter((item) => item.kind === "company").length !== expected.companies || expectedTargets.filter((item) => item.kind === "academic").length !== expected.academic) {
    errors.push(`${scopeLabel} cohort must contain ${expected.companies} companies and ${expected.academic} academic programs`);
  }
  for (const slug of expectedSlugs) if (!targetSlugs.has(slug)) errors.push(`${slug} is in geographic scope but missing from the cohort`);
  for (const slug of targetSlugs) {
    if (!expectedSlugs.has(slug)) errors.push(`${slug} is in the cohort but outside the documented country scope`);
    if (!companyBySlug.has(slug)) errors.push(`${slug} does not reference a catalog organization`);
  }
  if (generatedIds.size !== generatedRecords.length) errors.push(`Generated ${scopeLabel} evidence IDs must be unique`);
  if (evidencePapers.length !== expected.papers) errors.push(`Expected ${expected.papers} generated papers; found ${evidencePapers.length}`);
  if (evidenceTrials.length !== expected.trials) errors.push(`Expected ${expected.trials} generated trials; found ${evidenceTrials.length}`);
  if (evidenceMilestones.length !== expected.milestones) errors.push(`Expected ${expected.milestones} generated milestones; found ${evidenceMilestones.length}`);
  if (evidenceProjects.length !== expected.projects) errors.push(`Expected ${expected.projects} fallback projects; found ${evidenceProjects.length}`);

  for (const item of generatedRecords) {
    if (!targetSlugs.has(item.companySlug)) errors.push(`${item.id} points outside the ${scopeLabel} cohort`);
    if (!item.sourceLinks?.some((source) => source.isPrimary)) errors.push(`${item.id} lacks a primary source`);
    if (item.isSample) errors.push(`${item.id} must not be marked sample data`);
  }
  for (const paper of evidencePapers) {
    if (paper.sortDate > auditDate) errors.push(`${paper.id} is future-dated but rendered as a published paper`);
    if (!paper.sourceLinks.every((source) => source.sourceType === "paper")) errors.push(`${paper.id} must use a paper source`);
  }
  for (const trial of evidenceTrials) {
    if (!trial.sourceLinks.every((source) => /clinicaltrials\.gov\/study\/NCT\d+/i.test(source.url))) {
      errors.push(`${trial.id} must link to a ClinicalTrials.gov study record`);
    }
  }
  for (const milestone of evidenceMilestones) {
    if (milestone.status === "upcoming" && milestone.sortDate <= auditDate) {
      errors.push(`${milestone.id} is marked upcoming with a lapsed date`);
    }
  }
  if (!isUsScope && !evidenceTrials.some((item) => item.companySlug === "cortivis" && item.sourceLinks.some((source) => source.url.endsWith("NCT02983370")))) {
    errors.push("Cortivis must retain its named-program ClinicalTrials.gov record");
  }
  if (!isUsScope && !evidenceTrials.some((item) => item.companySlug === "time-is-brain" && item.sourceLinks.some((source) => source.url.endsWith("NCT06149754")))) {
    errors.push("Time is Brain must retain its BraiN20-named ClinicalTrials.gov record");
  }
  if (!isUsScope && !evidenceProjects.some((item) => item.companySlug === "implex" && item.evidenceLevel === "E0")) {
    errors.push("Implex must remain explicitly unverified while its operating identity cannot be corroborated");
  }

  const hasActivity = (slug) =>
    seed.milestones.some((item) => item.companySlug === slug) ||
    seed.trials.some((item) => item.companySlug === slug) ||
    seed.demos.some((item) => item.companySlug === slug) ||
    seed.papers.some((item) => item.companySlug === slug) ||
    seed.programProjects.some((item) => item.companySlug === slug);
  for (const slug of targetSlugs) if (!hasActivity(slug)) errors.push(`${slug} has no canonical rendered activity after the audit`);
  for (const company of expectedTargets.filter((item) => item.kind === "academic")) {
    if (!seed.papers.some((paper) => paper.companySlug === company.slug)) errors.push(`${company.slug} academic program lacks a canonical paper`);
  }

  const auditText = await readFile(join(projectRoot, "docs", isUsScope ? "us-organization-evidence-audit.md" : "european-organization-evidence-audit.md"), "utf8");
  const auditRows = auditText.split("\n").filter((line) => /^\| [^|-]/.test(line)).length - 1;
  if (auditRows !== expected.total) errors.push(`${scopeLabel} audit table must contain ${expected.total} rows; found ${auditRows}`);

  if (errors.length) {
    console.error(`${scopeLabel} evidence validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(
      `${scopeLabel} evidence validation passed: ${expected.total} organizations, ${expected.papers} papers, ${expected.trials} trials, ${expected.milestones} milestones, ${expected.projects} limited projects.`
    );
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
