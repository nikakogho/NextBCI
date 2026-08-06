import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const tempDir = join(tmpdir(), `nextbci-top-200-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const files = [
  "schema.ts",
  "sourced-expansion.ts",
  "africa-south-america-expansion.ts",
  "top-company-milestones.ts",
  "europe-evidence.ts",
  "us-evidence.ts",
  "seed-data.ts",
  "company-research.ts"
];

await mkdir(tempDir, { recursive: true });
try {
  for (const fileName of files) {
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

  const requireFromTemp = createRequire(join(tempDir, "rank.cjs"));
  const { companies, milestones, trials, demos, papers, programProjects } = requireFromTemp("./seed-data.js");
  const { companyResearchProfiles } = requireFromTemp("./company-research.js");
  const { topCompanyMilestoneSlugs } = requireFromTemp("./top-company-milestones.js");
  const profileBySlug = new Map(companyResearchProfiles.map((profile) => [profile.companySlug, profile]));
  const count = (records, slug) => records.filter((record) => record.companySlug === slug).length;
  const evidenceWeight = { E0: 0, E1: 2, E2: 4, E3: 7, E4: 10, E5: 13, E6: 16 };
  const scaleWeight = {
    "company-maturity-unverified": 0,
    "early-startup": 1,
    "clinical-growth": 3,
    "established-company": 5,
    "major-medtech": 8,
    "university-research": 0
  };
  const readinessWeight = {
    "readiness-unverified": 0,
    "research-program": 1,
    "research-infrastructure": 2,
    preclinical: 2,
    "human-research": 5,
    "commercial-nonmedical": 4,
    "regulated-medical": 8
  };

  const rankedRemainder = companies
    .filter((company) => company.kind === "company" && !topCompanyMilestoneSlugs.includes(company.slug))
    .map((company) => {
      const profile = profileBySlug.get(company.slug);
      const counts = {
        milestones: count(milestones, company.slug),
        trials: count(trials, company.slug),
        demos: count(demos, company.slug),
        papers: count(papers, company.slug),
        projects: count(programProjects, company.slug),
        researchPapers: profile?.papers.length ?? 0,
        videos: profile?.videos.length ?? 0,
        accomplishments: profile?.reportedAccomplishments.length ?? 0
      };
      const score = (evidenceWeight[company.evidenceLevel] ?? 0)
        + (scaleWeight[company.organizationScale] ?? 0)
        + (readinessWeight[company.readiness] ?? 0)
        + counts.milestones * 5
        + counts.trials * 4
        + counts.demos * 2
        + counts.papers * 3
        + counts.projects * 1.5
        + Math.min(counts.researchPapers, 5)
        + Math.min(counts.videos, 2)
        + Math.min(counts.accomplishments, 3);
      return { slug: company.slug, name: company.name, score, evidence: company.evidenceLevel, ...counts };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 100);

  console.log(JSON.stringify({
    method: "existing curated top 100 followed by evidence/activity/readiness score",
    first100: [...topCompanyMilestoneSlugs],
    second100: rankedRemainder
  }, null, 2));
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
