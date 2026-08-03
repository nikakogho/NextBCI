import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const tempDir = join(tmpdir(), `nextbci-top-milestones-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const fileNames = ["schema.ts", "sourced-expansion.ts", "africa-south-america-expansion.ts", "top-company-milestones.ts", "europe-evidence.ts", "us-evidence.ts", "seed-data.ts"];

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
  const { topCompanyMilestoneSlugs, topCompanyMilestones } = requireFromTemp("./top-company-milestones.js");
  const { europeEvidenceMilestones } = requireFromTemp("./europe-evidence.js");
  const { usEvidenceMilestones } = requireFromTemp("./us-evidence.js");
  const { companies, milestones } = requireFromTemp("./seed-data.js");
  const errors = [];
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  const targetSet = new Set(topCompanyMilestoneSlugs);
  const generatedIds = new Set(topCompanyMilestones.map((milestone) => milestone.id));
  const europeIds = new Set(europeEvidenceMilestones.map((milestone) => milestone.id));
  const usIds = new Set(usEvidenceMilestones.map((milestone) => milestone.id));
  const baseMilestones = milestones.filter((milestone) => !generatedIds.has(milestone.id) && !europeIds.has(milestone.id) && !usIds.has(milestone.id));
  const baseCoverage = new Set(baseMilestones.map((milestone) => milestone.companySlug));
  const addedCoverage = new Set(topCompanyMilestones.map((milestone) => milestone.companySlug));

  if (topCompanyMilestoneSlugs.length !== 100 || targetSet.size !== 100) errors.push("top-company cohort must contain exactly 100 unique slugs");
  for (const slug of targetSet) {
    if (companyBySlug.get(slug)?.kind !== "company") errors.push(`${slug} is missing or is not a company`);
    if (!milestones.some((milestone) => milestone.companySlug === slug)) errors.push(`${slug} has no rendered milestone`);
  }
  const originallyCovered = [...targetSet].filter((slug) => baseCoverage.has(slug));
  const newlyCovered = [...targetSet].filter((slug) => !baseCoverage.has(slug) && addedCoverage.has(slug));
  if (originallyCovered.length !== 18) errors.push(`expected 18 previously covered companies; found ${originallyCovered.length}`);
  if (newlyCovered.length !== 82) errors.push(`expected 82 newly covered companies; found ${newlyCovered.length}`);
  for (const milestone of topCompanyMilestones) {
    if (!targetSet.has(milestone.companySlug)) errors.push(`${milestone.id} is outside the top-company cohort`);
    if (!milestone.sourceLinks.some((source) => source.isPrimary)) errors.push(`${milestone.id} lacks a primary source`);
    if (milestone.status === "upcoming" && milestone.sortDate < "2026-08-02") errors.push(`${milestone.id} is marked upcoming but dated before the audit`);
  }

  if (errors.length) {
    console.error(`Top-company milestone validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Top-company milestone validation passed: 100 companies, ${originallyCovered.length} already covered, ${newlyCovered.length} newly covered, ${topCompanyMilestones.length} added records.`);
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
