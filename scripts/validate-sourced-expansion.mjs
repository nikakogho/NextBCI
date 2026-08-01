import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const sourcePath = join(projectRoot, "data", "sourced-expansion.ts");
const sourceText = await readFile(sourcePath, "utf8");
const transpiled = ts.transpileModule(sourceText, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
  fileName: sourcePath,
  reportDiagnostics: true
});
const blocking = (transpiled.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
if (blocking.length) throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));

const tempDir = join(tmpdir(), `nextbci-expansion-${Date.now()}-${Math.random().toString(36).slice(2)}`);
await mkdir(tempDir, { recursive: true });
const modulePath = join(tempDir, "sourced-expansion.mjs");
let expansion;
try {
  await writeFile(modulePath, transpiled.outputText, "utf8");
  expansion = await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const organizations = expansion.sourcedExpansionOrganizations;
const profiles = expansion.sourcedExpansionResearchProfiles;
const errors = [];
const companies = organizations.filter((organization) => organization.kind === "company");
const academic = organizations.filter((organization) => organization.kind === "academic");
const validUrl = (value) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};
const normalize = (value) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\b(incorporated|corporation|company|limited|inc|corp|ltd|llc|plc|ag|gmbh|sa|bv|the)\b/g, "").replace(/[^a-z0-9]+/g, "");
const retiredOrParked = new Set(["Entorian Technologies", "Neurescence", "Neuroadaptive Technologies", "Neurolutions", "NAOX"]);

if (organizations.length !== 300) errors.push(`Expected 300 sourced organizations; found ${organizations.length}`);
if (companies.length !== 100) errors.push(`Expected 100 sourced companies; found ${companies.length}`);
if (academic.length !== 200) errors.push(`Expected 200 sourced academic/institutional organizations; found ${academic.length}`);
if (profiles.length !== 300) errors.push(`Expected 300 sourced profiles; found ${profiles.length}`);

const slugs = new Set();
const names = new Set();
for (const organization of organizations) {
  if (slugs.has(organization.slug)) errors.push(`Duplicate sourced slug: ${organization.slug}`);
  slugs.add(organization.slug);
  const name = normalize(organization.name);
  if (names.has(name)) errors.push(`Duplicate normalized sourced name: ${organization.name}`);
  names.add(name);
  if (!validUrl(organization.website)) errors.push(`${organization.slug} has an invalid website`);
  if (retiredOrParked.has(organization.name)) errors.push(`${organization.slug} is retired, acquired, or parked and must not count toward the current-company quota`);
  if (!organization.sourceLinks.some((source) => source.isPrimary && validUrl(source.url))) errors.push(`${organization.slug} lacks a valid primary source`);
  if (organization.kind === "company") {
    if (organization.evidenceLevel !== "E1") errors.push(`${organization.slug} company discovery record must remain E1`);
    if (organization.hq.city !== "Country-level location") errors.push(`${organization.slug} company discovery location must remain visibly country-level`);
    if (organization.organizationScale !== "company-maturity-unverified") errors.push(`${organization.slug} must not infer company maturity from discovery`);
    if (organization.readiness !== "readiness-unverified") errors.push(`${organization.slug} must not infer product readiness from discovery`);
    if (!organization.sourceLinks.some((source) => source.sourceType === "news-report" && validUrl(source.url))) errors.push(`${organization.slug} lacks its discovery/audit source`);
  } else {
    if (organization.evidenceLevel !== "E4") errors.push(`${organization.slug} academic paper-affiliation record must be E4`);
    if (!organization.sourceLinks.some((source) => source.sourceType === "paper" && source.isPrimary)) errors.push(`${organization.slug} lacks a primary paper source`);
    if (!organization.sourceLinks.some((source) => source.sourceType === "paper" && /(^|\.)doi\.org$/i.test(new URL(source.url).hostname))) errors.push(`${organization.slug} lacks a DOI-backed representative paper`);
    if (!/\b202[3-6]\b/.test(organization.summary)) errors.push(`${organization.slug} lacks a documented 2023-2026 paper year`);
    if (organization.sourceLinks.some((source) => source.sourceType === "paper" && /&(?:amp|lt|gt);|<\/?[a-z][^>]*>/i.test(source.title))) errors.push(`${organization.slug} has an unclean paper title`);
  }
}

const profileSlugs = new Set(profiles.map((profile) => profile.companySlug));
for (const slug of slugs) if (!profileSlugs.has(slug)) errors.push(`Missing sourced profile for ${slug}`);
for (const slug of profileSlugs) if (!slugs.has(slug)) errors.push(`Orphan sourced profile for ${slug}`);
for (const profile of profiles) {
  if (!validUrl(profile.sourceProfileUrl)) errors.push(`${profile.companySlug} has an invalid profile discovery source`);
  if (profile.officialWebsite && !validUrl(profile.officialWebsite)) errors.push(`${profile.companySlug} has an invalid official website`);
  for (const item of profile.reportedAccomplishments) if (!validUrl(item.sourceUrl)) errors.push(`${profile.companySlug} has an invalid accomplishment source`);
  for (const item of [...profile.papers, ...profile.videos]) if (!validUrl(item.url)) errors.push(`${profile.companySlug} has an invalid research or video link`);
}

if (errors.length) {
  console.error(`Sourced expansion validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Sourced expansion validation passed: 100 companies and 200 academic/institutional organizations.");
