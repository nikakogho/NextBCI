import { createRequire } from "node:module";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const isUsScope = process.argv.includes("--scope=us");
const scopeKey = isUsScope ? "us" : "europe";
const cacheDir = resolve(projectRoot, ".research-cache", `${scopeKey}-evidence`);
const tempDir = join(tmpdir(), `nextbci-${scopeKey}-evidence-${Date.now()}-${Math.random().toString(36).slice(2)}`);

// Inclusive geographic scope: conventional European states plus transcontinental
// Russia, Turkey, and Kazakhstan and the South Caucasus. This errs toward inclusion.
export const europeCountries = new Set([
  "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
  "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
  "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
  "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania",
  "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
  "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia",
  "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "UK", "Ukraine", "United Kingdom",
  "Vatican City"
]);
const scopeCountries = isUsScope ? new Set(["United States"]) : europeCountries;

const fileNames = [
  "schema.ts",
  "sourced-expansion.ts",
  "africa-south-america-expansion.ts",
  "top-company-milestones.ts",
  "europe-evidence.ts",
  "company-research.ts"
];
try {
  await access(resolve(projectRoot, "data", "us-evidence.ts"));
  fileNames.push("us-evidence.ts");
} catch {
  // The first U.S. inventory run happens before the generated module exists.
}
fileNames.push("seed-data.ts");

const transpile = async (fileName) => {
  const sourcePath = resolve(projectRoot, "data", fileName);
  const sourceText = await readFile(sourcePath, "utf8");
  const output = ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: sourcePath,
    reportDiagnostics: true
  });
  const blocking = (output.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
  if (blocking.length) {
    throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));
  }
  await writeFile(resolve(tempDir, fileName.replace(/\.ts$/, ".js")), output.outputText, "utf8");
};

await mkdir(cacheDir, { recursive: true });
await mkdir(tempDir, { recursive: true });
let data;
try {
  await Promise.all(fileNames.map(transpile));
  const requireFromTemp = createRequire(resolve(tempDir, "research.cjs"));
  data = {
    seed: requireFromTemp("./seed-data.js"),
    research: requireFromTemp("./company-research.js"),
    europe: requireFromTemp("./europe-evidence.js"),
    us: fileNames.includes("us-evidence.ts") ? requireFromTemp("./us-evidence.js") : null
  };
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const generatedModules = [data.europe, data.us].filter(Boolean);
const generatedIds = {
  milestones: new Set(generatedModules.flatMap((module) => [...(module.europeEvidenceMilestones ?? []), ...(module.usEvidenceMilestones ?? [])]).map((item) => item.id)),
  trials: new Set(generatedModules.flatMap((module) => [...(module.europeEvidenceTrials ?? []), ...(module.usEvidenceTrials ?? [])]).map((item) => item.id)),
  demos: new Set(),
  papers: new Set(generatedModules.flatMap((module) => [...(module.europeEvidencePapers ?? []), ...(module.usEvidencePapers ?? [])]).map((item) => item.id)),
  projects: new Set(generatedModules.flatMap((module) => [...(module.europeEvidenceProjects ?? []), ...(module.usEvidenceProjects ?? [])]).map((item) => item.id))
};
const grouped = (items) => Map.groupBy(items, (item) => item.companySlug);
const canonical = {
  milestones: grouped(data.seed.milestones.filter((item) => !generatedIds.milestones.has(item.id))),
  trials: grouped(data.seed.trials.filter((item) => !generatedIds.trials.has(item.id))),
  demos: grouped(data.seed.demos),
  papers: grouped(data.seed.papers.filter((item) => !generatedIds.papers.has(item.id))),
  projects: grouped(data.seed.programProjects.filter((item) => !generatedIds.projects.has(item.id)))
};
const profiles = new Map(data.research.companyResearchProfiles.map((profile) => [profile.companySlug, profile]));

const records = data.seed.companies
  .filter((company) => scopeCountries.has(company.hq.country))
  .map((company) => {
    const profile = profiles.get(company.slug);
    const counts = Object.fromEntries(
      Object.entries(canonical).map(([key, values]) => [key, values.get(company.slug)?.length ?? 0])
    );
    return {
      slug: company.slug,
      name: company.name,
      kind: company.kind,
      city: company.hq.city,
      country: company.hq.country,
      region: company.region,
      category: company.category,
      modality: company.modality,
      targetFunction: company.targetFunction,
      stage: company.stage,
      website: company.website,
      sourceLinks: company.sourceLinks,
      canonical: counts,
      research: profile
        ? {
            officialWebsite: profile.officialWebsite,
            reportedAccomplishments: profile.reportedAccomplishments,
            papers: profile.papers,
            videos: profile.videos
          }
        : null
    };
  })
  .sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));

const hasCanonicalEvidence = (record) => Object.values(record.canonical).some((count) => count > 0);
const outputPath = resolve(cacheDir, "cohort.json");
await writeFile(outputPath, `${JSON.stringify({ researchedOn: "2026-08-03", scope: [...scopeCountries], records }, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  outputPath,
  organizations: records.length,
  companies: records.filter((record) => record.kind === "company").length,
  academic: records.filter((record) => record.kind === "academic").length,
  withCanonicalEvidence: records.filter(hasCanonicalEvidence).length,
  withoutCanonicalEvidence: records.filter((record) => !hasCanonicalEvidence(record)).length,
  withResearchPapers: records.filter((record) => record.research?.papers.length).length,
  withResearchVideos: records.filter((record) => record.research?.videos.length).length,
  withReportedAccomplishments: records.filter((record) => record.research?.reportedAccomplishments.length).length,
  withoutResearchProfile: records.filter((record) => !record.research).length
}, null, 2));
