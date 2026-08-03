import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const tempDir = join(tmpdir(), `nextbci-query-tests-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const requireFromTemp = createRequire(join(tempDir, "test-runner.js"));
const errors = [];

const assert = (condition, message) => {
  if (!condition) {
    errors.push(message);
  }
};

const transpileDataFile = async (fileName) => {
  const sourcePath = join(projectRoot, "data", fileName);
  const sourceText = await readFile(sourcePath, "utf8");
  const transpiled = ts.transpileModule(sourceText, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022
    },
    fileName: sourcePath,
    reportDiagnostics: true
  });

  const blockingDiagnostics = (transpiled.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
  );

  if (blockingDiagnostics.length > 0) {
    const formatted = blockingDiagnostics
      .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
      .join("\n");
    throw new Error(`Could not transpile data/${fileName}:\n${formatted}`);
  }

  await writeFile(join(tempDir, fileName.replace(/\.ts$/, ".js")), transpiled.outputText, "utf8");
};

const isDescendingByDate = (items) =>
  items.every((item, index) => index === 0 || items[index - 1].sortDate.localeCompare(item.sortDate) >= 0);

const isAscendingByDate = (items) =>
  items.every((item, index) => index === 0 || items[index - 1].sortDate.localeCompare(item.sortDate) <= 0);

try {
  await mkdir(tempDir, { recursive: true });
  await Promise.all(["schema.ts", "sourced-expansion.ts", "africa-south-america-expansion.ts", "top-company-milestones.ts", "europe-evidence.ts", "seed-data.ts", "queries.ts"].map(transpileDataFile));

  const schema = requireFromTemp("./schema.js");
  const queries = requireFromTemp("./queries.js");
  const companySlugs = new Set(queries.companies.map((company) => company.slug));
  const evidenceLevelKeys = Object.keys(schema.evidenceLevels);

  assert(queries.companies.length === 1064, "the catalog should contain 1064 organizations after the regional expansion");
  assert(
    queries.companies.filter((organization) => organization.kind === "company").length === 587,
    "the catalog should contain 587 companies"
  );
  assert(
    queries.companies.filter((organization) => organization.kind === "academic").length === 477,
    "the catalog should contain 477 academic or institutional organizations"
  );
  const normalizedOrganizationNames = queries.companies.map((organization) => organization.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(incorporated|corporation|company|limited|inc|corp|ltd|llc|plc|ag|gmbh|sa|bv|the)\b/g, "")
    .replace(/[^a-z0-9]+/g, ""));
  assert(
    new Set(normalizedOrganizationNames).size === normalizedOrganizationNames.length,
    "organization names should remain unique after conservative normalization"
  );
  const semanticallyNormalizedCompanyNames = queries.companies
    .filter((organization) => organization.kind === "company")
    .map((organization) => organization.name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\b(incorporated|corporation|company|limited|inc|corp|ltd|llc|plc|ag|gmbh|sa|bv|the|technology|technologies|tech)\b/g, "")
      .replace(/[^a-z0-9]+/g, ""));
  assert(
    new Set(semanticallyNormalizedCompanyNames).size === semanticallyNormalizedCompanyNames.length,
    "company names should remain unique after stripping common corporate and technology suffixes"
  );

  assert(
    evidenceLevelKeys.join(",") === "E0,E1,E2,E3,E4,E5,E6",
    "evidenceLevels should expose E0 through E6 in order"
  );
  assert(
    Object.values(schema.evidenceLevels).every((definition) => definition.shortLabel && definition.description),
    "each evidence level should include a shortLabel and description"
  );
  assert(
    queries.confirmedMilestones.every((milestone) => milestone.status === "confirmed"),
    "confirmedMilestones should only include confirmed records"
  );
  assert(
    queries.upcomingMilestones.every((milestone) => milestone.status === "upcoming"),
    "upcomingMilestones should only include upcoming records"
  );
  assert(isDescendingByDate(queries.confirmedMilestones), "confirmedMilestones should be newest first");
  assert(isAscendingByDate(queries.upcomingMilestones), "upcomingMilestones should be soonest first");
  assert(
    queries.allMilestones.length === queries.confirmedMilestones.length + queries.upcomingMilestones.length,
    "allMilestones should contain every confirmed and upcoming milestone"
  );
  assert(
    queries.nextMajorMilestone === queries.upcomingMilestones[0],
    "nextMajorMilestone should be the first upcoming milestone"
  );

  queries.milestones.forEach((milestone) => {
    assert(companySlugs.has(milestone.companySlug), `milestone ${milestone.id} should reference a known company`);
    assert(
      queries.getCompanyMilestones(milestone.companySlug).some((record) => record.id === milestone.id),
      `getCompanyMilestones should include ${milestone.id}`
    );
  });

  queries.trials.forEach((trial) => {
    assert(companySlugs.has(trial.companySlug), `trial ${trial.id} should reference a known company`);
  });

  queries.demos.forEach((demo) => {
    assert(companySlugs.has(demo.companySlug), `demo ${demo.id} should reference a known company`);
    assert(
      queries.getCompanyDemos(demo.companySlug).some((record) => record.id === demo.id),
      `getCompanyDemos should include ${demo.id}`
    );
  });

  queries.programProjects.forEach((project) => {
    assert(companySlugs.has(project.companySlug), `project ${project.id} should reference a known company`);
    assert(
      queries.getCompanyProjects(project.companySlug).some((record) => record.id === project.id),
      `getCompanyProjects should include ${project.id}`
    );
  });

  const allSources = [
    ...queries.companies,
    ...queries.programProjects,
    ...queries.milestones,
    ...queries.trials,
    ...queries.demos,
    ...queries.papers
  ].flatMap((record) => record.sourceLinks);
  const youtubeSources = allSources.filter((source) => /(^|\/\/)(www\.)?(youtube\.com|youtu\.be)\//i.test(source.url));
  const nonYoutubeSources = allSources.filter((source) => !youtubeSources.includes(source));

  assert(youtubeSources.length > 0, "seed data should include at least one YouTube source to exercise Watch buttons");
  youtubeSources.forEach((source) => {
    assert(queries.isYoutubeSource(source), `${source.title} should be detected as a YouTube source`);
    assert(queries.getYoutubeSource([source]) === source, `${source.title} should be returned by getYoutubeSource`);
  });
  nonYoutubeSources.forEach((source) => {
    assert(!queries.isYoutubeSource(source), `${source.title} should not be detected as a YouTube source`);
  });
  assert(
    queries.demos.some((demo) => queries.getYoutubeSource(demo.sourceLinks)),
    "at least one demo should expose a YouTube Watch action"
  );

  if (errors.length > 0) {
    console.error("Data/query tests failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Data/query tests passed.");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
