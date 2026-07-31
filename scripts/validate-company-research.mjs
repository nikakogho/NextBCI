import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");

const loadModule = async (fileName) => {
  const sourcePath = join(projectRoot, "data", fileName);
  const sourceText = await readFile(sourcePath, "utf8");
  const transpiled = ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
    fileName: sourcePath,
    reportDiagnostics: true
  });
  const blocking = (transpiled.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
  if (blocking.length) {
    throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));
  }

  const tempDir = join(tmpdir(), `nextbci-research-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await mkdir(tempDir, { recursive: true });
  const modulePath = join(tempDir, fileName.replace(/\.ts$/, ".mjs"));
  try {
    await writeFile(modulePath, transpiled.outputText, "utf8");
    return await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
};

const { companies } = await loadModule("seed-data.ts");
const { companyResearchProfiles } = await loadModule("company-research.ts");
const companySlugs = new Set(companies.map((company) => company.slug));
const seen = new Set();
const errors = [];
const text = (value) => typeof value === "string" && value.trim().length > 0;
const validUrl = (value) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

if (!Array.isArray(companyResearchProfiles) || companyResearchProfiles.length !== 349) {
  errors.push(`companyResearchProfiles must contain all 349 NeuroFounders profiles; found ${companyResearchProfiles?.length ?? "non-array"}`);
} else {
  companyResearchProfiles.forEach((profile, index) => {
    const path = `companyResearchProfiles[${index}]`;
    if (!text(profile.companySlug) || !companySlugs.has(profile.companySlug)) errors.push(`${path}.companySlug must reference a catalog company`);
    if (seen.has(profile.companySlug)) errors.push(`${path}.companySlug duplicates ${profile.companySlug}`);
    seen.add(profile.companySlug);
    ["companyName", "researchedOn", "overview", "fundingStage", "regulatoryStatus", "notes"].forEach((key) => {
      if (!text(profile[key])) errors.push(`${path}.${key} must be non-empty`);
    });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.researchedOn)) errors.push(`${path}.researchedOn must use YYYY-MM-DD`);
    if (!validUrl(profile.sourceProfileUrl)) errors.push(`${path}.sourceProfileUrl must be an http(s) URL`);
    if (profile.officialWebsite !== undefined && !validUrl(profile.officialWebsite)) errors.push(`${path}.officialWebsite must be an http(s) URL when present`);
    if (!profile.founding || !text(profile.founding.note)) errors.push(`${path}.founding must include a note`);
    if (!profile.headquarters || !text(profile.headquarters.display) || !text(profile.headquarters.note)) errors.push(`${path}.headquarters must include display and note`);
    if (!profile.companyValue || !text(profile.companyValue.label) || !text(profile.companyValue.note)) errors.push(`${path}.companyValue must include label and note`);
    [...(profile.papers ?? []), ...(profile.videos ?? [])].forEach((link, linkIndex) => {
      if (!text(link.title) || !text(link.publisher) || !validUrl(link.url)) errors.push(`${path}.resourceLinks[${linkIndex}] is invalid`);
    });
    (profile.reportedAccomplishments ?? []).forEach((item, itemIndex) => {
      if (!text(item.note) || !validUrl(item.sourceUrl) || item.evidence !== "company-reported") errors.push(`${path}.reportedAccomplishments[${itemIndex}] is invalid`);
    });
  });
}

if (errors.length) {
  console.error("Company research validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Company research validation passed: ${companyResearchProfiles.length} NeuroFounders profiles.`);
