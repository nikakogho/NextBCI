import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");

const loadSeedData = async () => {
  const sourcePath = join(projectRoot, "data", "seed-data.ts");
  const sourceText = await readFile(sourcePath, "utf8");
  const expansionPath = join(projectRoot, "data", "sourced-expansion.ts");
  const expansionText = await readFile(expansionPath, "utf8");
  const regionalExpansionPath = join(projectRoot, "data", "africa-south-america-expansion.ts");
  const regionalExpansionText = await readFile(regionalExpansionPath, "utf8");
  const topMilestonesPath = join(projectRoot, "data", "top-company-milestones.ts");
  const topMilestonesText = await readFile(topMilestonesPath, "utf8");
  const transpiled = ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
    fileName: sourcePath,
    reportDiagnostics: true
  });
  const blocking = (transpiled.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
  if (blocking.length) {
    throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));
  }

  const tempDir = join(tmpdir(), `nextbci-map-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await mkdir(tempDir, { recursive: true });
  const modulePath = join(tempDir, "seed-data.mjs");
  const transpiledExpansion = ts.transpileModule(expansionText, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
    fileName: expansionPath,
    reportDiagnostics: true
  });
  const transpiledRegionalExpansion = ts.transpileModule(regionalExpansionText, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
    fileName: regionalExpansionPath,
    reportDiagnostics: true
  });
  const transpiledTopMilestones = ts.transpileModule(topMilestonesText, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
    fileName: topMilestonesPath,
    reportDiagnostics: true
  });
  try {
    await writeFile(join(tempDir, "sourced-expansion.mjs"), transpiledExpansion.outputText, "utf8");
    await writeFile(join(tempDir, "africa-south-america-expansion.mjs"), transpiledRegionalExpansion.outputText, "utf8");
    await writeFile(join(tempDir, "top-company-milestones.mjs"), transpiledTopMilestones.outputText, "utf8");
    await writeFile(modulePath, transpiled.outputText
      .replace('"./sourced-expansion"', '"./sourced-expansion.mjs"')
      .replace('"./africa-south-america-expansion"', '"./africa-south-america-expansion.mjs"')
      .replace('"./top-company-milestones"', '"./top-company-milestones.mjs"'), "utf8");
    return await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
};

const { companies, milestones, programProjects, trials, demos, papers } = await loadSeedData();
const monthMs = 1000 * 60 * 60 * 24 * 30.4;
const monthsAgo = (sortDate) => Math.max(0, (Date.now() - new Date(`${sortDate}T00:00:00Z`).getTime()) / monthMs);
const rawActivityScore = (slug) => {
  let score = 0;
  for (const milestone of milestones) {
    if (milestone.companySlug !== slug) continue;
    if (milestone.status === "upcoming") score += 2;
    else {
      const age = monthsAgo(milestone.sortDate);
      score += age <= 18 ? 4 : age <= 36 ? 2 : 1;
    }
  }
  score += trials.filter((item) => item.companySlug === slug).length * 3;
  score += demos.filter((item) => item.companySlug === slug).length * 1.5;
  score += papers.filter((item) => item.companySlug === slug).length;
  score += programProjects.filter((item) => item.companySlug === slug).length * 0.75;
  return score;
};
const scores = new Map(companies.map((company) => [company.slug, rawActivityScore(company.slug)]));
const maxActivity = Math.max(1, ...scores.values());
const heatColor = (heat) => heat >= 0.75 ? "#ff4d55" : heat >= 0.5 ? "#ff8a3d" : heat >= 0.28 ? "#ffc24d" : heat >= 0.12 ? "#5fd0ff" : "#5f7d99";
const heatLabel = (heat) => heat >= 0.75 ? "Very active" : heat >= 0.5 ? "Active" : heat >= 0.28 ? "Moderate" : heat >= 0.12 ? "Emerging" : "Quiet";

const mapNodes = companies.map((company) => {
  const companyMilestones = milestones.filter((item) => item.companySlug === company.slug);
  const score = scores.get(company.slug) ?? 0;
  const heat = score / maxActivity;
  return {
    slug: company.slug,
    name: company.name,
    kind: company.kind,
    city: company.hq.city,
    country: company.hq.country,
    lat: company.hq.lat,
    lng: company.hq.lng,
    heat,
    heatColor: heatColor(heat),
    heatLabel: heatLabel(heat),
    stage: company.stage,
    evidenceLevel: company.evidenceLevel,
    stats: {
      milestones: companyMilestones.length,
      upcoming: companyMilestones.filter((item) => item.status === "upcoming").length,
      trials: trials.filter((item) => item.companySlug === company.slug).length,
      demos: demos.filter((item) => item.companySlug === company.slug).length,
      papers: papers.filter((item) => item.companySlug === company.slug).length,
      projects: programProjects.filter((item) => item.companySlug === company.slug).length
    }
  };
});

const outputPath = join(projectRoot, "public", "map-nodes.json");
await writeFile(outputPath, `${JSON.stringify(mapNodes)}\n`, "utf8");
console.log(`Wrote ${mapNodes.length} cacheable map nodes to public/map-nodes.json`);
