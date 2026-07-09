import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");

const allowedEvidenceLevels = new Set(["E0", "E1", "E2", "E3", "E4", "E5", "E6"]);
const allowedMilestoneTypes = new Set([
  "trial-opened",
  "trial-site-added",
  "first-implant",
  "additional-implant",
  "demo-released",
  "paper-published",
  "regulatory-designation",
  "funding-round",
  "product-update",
  "conference-talk",
  "endpoint-readout",
  "safety-update",
  "approval-clearance",
  "commercial-deployment"
]);
const allowedDemoClassifications = new Set([
  "actual-patient-use",
  "animal-demo",
  "lab-demo",
  "concept-animation",
  "investor-product-demo",
  "conference-talk",
  "press-interview"
]);
const allowedSourceTypes = new Set([
  "trial-registry",
  "paper",
  "company-update",
  "regulatory-page",
  "conference-page",
  "demo-video",
  "placeholder"
]);
const allowedConfidence = new Set(["low", "medium", "high"]);
const allowedCompanyKinds = new Set(["company", "academic"]);
const allowedMilestoneStatuses = new Set(["confirmed", "upcoming"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sortDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];

const loadSeedData = async () => {
  const sourcePath = join(projectRoot, "data", "seed-data.ts");
  const sourceText = await readFile(sourcePath, "utf8");
  const transpiled = ts.transpileModule(sourceText, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true
    },
    fileName: sourcePath,
    reportDiagnostics: true
  });

  const diagnostics = transpiled.diagnostics ?? [];
  const blockingDiagnostics = diagnostics.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  if (blockingDiagnostics.length > 0) {
    const formatted = blockingDiagnostics
      .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))
      .join("\n");
    throw new Error(`Could not transpile data/seed-data.ts:\n${formatted}`);
  }

  const tempDir = join(tmpdir(), `nextbci-data-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await mkdir(tempDir, { recursive: true });
  const modulePath = join(tempDir, "seed-data.mjs");

  try {
    await writeFile(modulePath, transpiled.outputText, "utf8");
    return await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
};

const addError = (path, message) => {
  errors.push(`${path}: ${message}`);
};

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const requireText = (record, key, path) => {
  if (!isNonEmptyString(record[key])) {
    addError(`${path}.${key}`, "must be a non-empty string");
  }
};

const requireBoolean = (record, key, path) => {
  if (typeof record[key] !== "boolean") {
    addError(`${path}.${key}`, "must be a boolean");
  }
};

const requireStringArray = (record, key, path) => {
  if (!Array.isArray(record[key]) || record[key].length === 0) {
    addError(`${path}.${key}`, "must be a non-empty array");
    return;
  }

  record[key].forEach((value, index) => {
    if (!isNonEmptyString(value)) {
      addError(`${path}.${key}[${index}]`, "must be a non-empty string");
    }
  });
};

const requireMember = (record, key, allowedValues, path) => {
  if (!allowedValues.has(record[key])) {
    addError(`${path}.${key}`, `must be one of: ${[...allowedValues].join(", ")}`);
  }
};

const requireSortDate = (record, path) => {
  if (!sortDatePattern.test(record.sortDate ?? "")) {
    addError(`${path}.sortDate`, "must use YYYY-MM-DD format");
    return;
  }

  const date = new Date(`${record.sortDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== record.sortDate) {
    addError(`${path}.sortDate`, "must be a valid calendar date");
  }
};

const requireIdentifier = (value, path) => {
  if (!slugPattern.test(value ?? "")) {
    addError(path, "must be lowercase kebab-case");
  }
};

const validateSource = (source, path, parentIsSample) => {
  if (!source || typeof source !== "object") {
    addError(path, "must be an object");
    return;
  }

  requireText(source, "title", path);
  requireText(source, "url", path);
  requireText(source, "publisher", path);
  requireMember(source, "sourceType", allowedSourceTypes, path);

  if (!parentIsSample) {
    if (source.sourceType === "placeholder") {
      addError(`${path}.sourceType`, "cannot be placeholder for a non-sample record");
    }

    if (source.isSample) {
      addError(`${path}.isSample`, "cannot be true for a non-sample record");
    }

    if (isNonEmptyString(source.url)) {
      try {
        const url = new URL(source.url);
        if (!["http:", "https:"].includes(url.protocol)) {
          addError(`${path}.url`, "must be an http(s) URL for a non-sample record");
        }
        if (url.hostname === "example.com") {
          addError(`${path}.url`, "cannot use example.com for a non-sample record");
        }
      } catch {
        addError(`${path}.url`, "must be a valid URL");
      }
    }
  }
};

const validateSources = (record, path) => {
  if (!Array.isArray(record.sourceLinks)) {
    addError(`${path}.sourceLinks`, "must be an array");
    return;
  }

  if (!record.isSample && record.sourceLinks.length === 0) {
    addError(`${path}.sourceLinks`, "must include at least one source for a non-sample record");
  }

  record.sourceLinks.forEach((source, index) => validateSource(source, `${path}.sourceLinks[${index}]`, record.isSample));

  if (!record.isSample && record.sourceLinks.length > 0 && !record.sourceLinks.some((source) => source?.isPrimary)) {
    addError(`${path}.sourceLinks`, "must include at least one primary source for a non-sample record");
  }
};

const validateBaseRecord = (record, path) => {
  if (!record || typeof record !== "object") {
    addError(path, "must be an object");
    return false;
  }

  requireBoolean(record, "isSample", path);
  validateSources(record, path);
  return true;
};

const validateUniqueIds = (records, key, collectionName) => {
  const seen = new Map();
  records.forEach((record, index) => {
    const value = record?.[key];
    const path = `${collectionName}[${index}].${key}`;

    requireText(record, key, `${collectionName}[${index}]`);
    requireIdentifier(value, path);

    if (seen.has(value)) {
      addError(path, `duplicates ${collectionName}[${seen.get(value)}].${key}`);
    } else {
      seen.set(value, index);
    }
  });
};

const validateCollection = (records, collectionName) => {
  if (!Array.isArray(records)) {
    addError(collectionName, "must be an array");
    return false;
  }

  if (records.length === 0) {
    addError(collectionName, "must not be empty");
  }

  return true;
};

const validateCompany = (company, index) => {
  const path = `companies[${index}]`;
  if (!validateBaseRecord(company, path)) return;

  ["name", "modality", "targetFunction", "stage", "summary", "hypeCheck"].forEach((key) =>
    requireText(company, key, path)
  );
  requireMember(company, "evidenceLevel", allowedEvidenceLevels, path);
  requireMember(company, "kind", allowedCompanyKinds, path);

  const hq = company.hq;
  if (!hq || typeof hq !== "object") {
    addError(`${path}.hq`, "must be an object with city, country, lat, lng");
  } else {
    requireText(hq, "city", `${path}.hq`);
    requireText(hq, "country", `${path}.hq`);
    if (typeof hq.lat !== "number" || hq.lat < -90 || hq.lat > 90) {
      addError(`${path}.hq.lat`, "must be a number between -90 and 90");
    }
    if (typeof hq.lng !== "number" || hq.lng < -180 || hq.lng > 180) {
      addError(`${path}.hq.lng`, "must be a number between -180 and 180");
    }
  }
};

const validateMilestone = (milestone, index, companySlugs) => {
  const path = `milestones[${index}]`;
  if (!validateBaseRecord(milestone, path)) return;

  ["title", "companySlug", "dateLabel", "summary", "whyItMatters", "hypeCheck"].forEach((key) =>
    requireText(milestone, key, path)
  );
  requireSortDate(milestone, path);
  requireMember(milestone, "status", allowedMilestoneStatuses, path);
  requireMember(milestone, "type", allowedMilestoneTypes, path);
  requireMember(milestone, "evidenceLevel", allowedEvidenceLevels, path);
  requireMember(milestone, "confidence", allowedConfidence, path);

  if (isNonEmptyString(milestone.companySlug) && !companySlugs.has(milestone.companySlug)) {
    addError(`${path}.companySlug`, "must reference an existing company slug");
  }
};

const validateTrial = (trial, index, companySlugs) => {
  const path = `trials[${index}]`;
  if (!validateBaseRecord(trial, path)) return;

  ["title", "companySlug", "status", "condition", "targetFunction", "deviceProduct"].forEach((key) =>
    requireText(trial, key, path)
  );
  requireStringArray(trial, "locations", path);
  requireStringArray(trial, "endpoints", path);
  requireMember(trial, "evidenceLevel", allowedEvidenceLevels, path);

  if (isNonEmptyString(trial.companySlug) && !companySlugs.has(trial.companySlug)) {
    addError(`${path}.companySlug`, "must reference an existing company slug");
  }
};

const validateDemo = (demo, index, companySlugs) => {
  const path = `demos[${index}]`;
  if (!validateBaseRecord(demo, path)) return;

  ["title", "companySlug", "dateLabel", "setting", "summary", "hypeCheck"].forEach((key) =>
    requireText(demo, key, path)
  );
  requireSortDate(demo, path);
  requireMember(demo, "classification", allowedDemoClassifications, path);
  requireMember(demo, "evidenceLevel", allowedEvidenceLevels, path);

  if (isNonEmptyString(demo.companySlug) && !companySlugs.has(demo.companySlug)) {
    addError(`${path}.companySlug`, "must reference an existing company slug");
  }
};

const validatePaper = (paper, index, companySlugs) => {
  const path = `papers[${index}]`;
  if (!validateBaseRecord(paper, path)) return;

  ["title", "companySlug", "dateLabel", "summary"].forEach((key) => requireText(paper, key, path));
  requireSortDate(paper, path);
  requireMember(paper, "evidenceLevel", allowedEvidenceLevels, path);

  if (isNonEmptyString(paper.companySlug) && !companySlugs.has(paper.companySlug)) {
    addError(`${path}.companySlug`, "must reference an existing company slug");
  }
};

const data = await loadSeedData();
const { companies, milestones, trials, demos, papers } = data;

const collectionsAreArrays = [
  validateCollection(companies, "companies"),
  validateCollection(milestones, "milestones"),
  validateCollection(trials, "trials"),
  validateCollection(demos, "demos"),
  validateCollection(papers, "papers")
].every(Boolean);

if (collectionsAreArrays) {
  validateUniqueIds(companies, "slug", "companies");
  validateUniqueIds(milestones, "id", "milestones");
  validateUniqueIds(trials, "id", "trials");
  validateUniqueIds(demos, "id", "demos");
  validateUniqueIds(papers, "id", "papers");

  const companySlugs = new Set(companies.map((company) => company.slug));

  companies.forEach(validateCompany);
  milestones.forEach((milestone, index) => validateMilestone(milestone, index, companySlugs));
  trials.forEach((trial, index) => validateTrial(trial, index, companySlugs));
  demos.forEach((demo, index) => validateDemo(demo, index, companySlugs));
  papers.forEach((paper, index) => validatePaper(paper, index, companySlugs));
}

if (errors.length > 0) {
  console.error("Data validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Data validation passed: ${companies.length} companies, ${milestones.length} milestones, ${trials.length} trials, ${demos.length} demos, ${papers.length} papers.`
);
