import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const sourcePath = join(projectRoot, "data", "africa-south-america-expansion.ts");
const sourceText = await readFile(sourcePath, "utf8");
const transpiled = ts.transpileModule(sourceText, {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: true },
  fileName: sourcePath,
  reportDiagnostics: true
});
const blocking = (transpiled.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
if (blocking.length) throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));

const tempDir = join(tmpdir(), `nextbci-regional-${Date.now()}-${Math.random().toString(36).slice(2)}`);
await mkdir(tempDir, { recursive: true });
const modulePath = join(tempDir, "africa-south-america-expansion.mjs");
let expansion;
try {
  await writeFile(modulePath, transpiled.outputText, "utf8");
  expansion = await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const organizations = expansion.africaSouthAmericaOrganizations;
const profiles = expansion.africaSouthAmericaResearchProfiles;
const mapNodes = JSON.parse(await readFile(join(projectRoot, "public", "map-nodes.json"), "utf8"));
const regionalSlugs = new Set(organizations.map((organization) => organization.slug));
const baselineNodes = mapNodes.filter((node) => !regionalSlugs.has(node.slug));
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const africaCodes = "DZ AO BJ BW BF BI CV CM CF TD KM CD CG CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW".split(" ");
const southAmericaCodes = "AR BO BR CL CO EC GY PY PE SR UY VE".split(" ");
const africaCountries = new Set(africaCodes.map((code) => countryNames.of(code)));
const southAmericaCountries = new Set(southAmericaCodes.map((code) => countryNames.of(code)));
const normalize = (value) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\b(incorporated|corporation|company|limited|inc|corp|ltd|llc|plc|ag|gmbh|sa|bv|the)\b/g, "").replace(/[^a-z0-9]+/g, "");
const baselineNames = new Set(baselineNodes.map((node) => normalize(node.name)));
const errors = [];
const validUrl = (value) => {
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
};

if (organizations.length !== 200) errors.push(`Expected 200 regional organizations; found ${organizations.length}`);
if (profiles.length !== 200) errors.push(`Expected 200 regional profiles; found ${profiles.length}`);
const africa = organizations.filter((organization) => africaCountries.has(organization.hq.country));
const southAmerica = organizations.filter((organization) => southAmericaCountries.has(organization.hq.country));
if (africa.length !== 100) errors.push(`Expected 100 African organizations; found ${africa.length}`);
if (southAmerica.length !== 100) errors.push(`Expected 100 South American organizations; found ${southAmerica.length}`);

const slugs = new Set();
const names = new Set();
for (const organization of organizations) {
  if (slugs.has(organization.slug)) errors.push(`Duplicate regional slug: ${organization.slug}`);
  slugs.add(organization.slug);
  const name = normalize(organization.name);
  if (names.has(name)) errors.push(`Duplicate normalized regional name: ${organization.name}`);
  if (baselineNames.has(name)) errors.push(`Regional name duplicates the pre-existing catalog: ${organization.name}`);
  names.add(name);
  if (organization.kind !== "academic") errors.push(`${organization.slug} must be an academic/institutional record`);
  if (organization.region !== "rest-of-world") errors.push(`${organization.slug} must map to rest-of-world`);
  if (organization.evidenceLevel !== "E4") errors.push(`${organization.slug} must retain peer-reviewed E4 evidence`);
  if (!organization.hq.city || !Number.isFinite(organization.hq.lat) || !Number.isFinite(organization.hq.lng)) errors.push(`${organization.slug} lacks city-level coordinates`);
  if (![...africaCountries, ...southAmericaCountries].includes(organization.hq.country)) errors.push(`${organization.slug} is outside the target regions`);
  if (!validUrl(organization.website)) errors.push(`${organization.slug} has an invalid institutional website`);
  const paper = organization.sourceLinks.find((source) => source.sourceType === "paper" && source.isPrimary);
  const institution = organization.sourceLinks.find((source) => source.sourceType === "institution-page" && source.isPrimary);
  const registry = organization.sourceLinks.find((source) => source.publisher === "Research Organization Registry");
  if (!paper || !/^https:\/\/doi\.org\//i.test(paper.url)) errors.push(`${organization.slug} lacks a primary DOI paper`);
  if (!institution || institution.url !== organization.website) errors.push(`${organization.slug} lacks its institutional homepage source`);
  if (!registry || !/^https:\/\/ror\.org\//i.test(registry.url)) errors.push(`${organization.slug} lacks its ROR identity source`);
  if (!/\b202[3-6]\b/.test(organization.summary)) errors.push(`${organization.slug} lacks a 2023-2026 publication year`);
  if (paper && /&(?:amp|lt|gt);|<\/?[a-z][^>]*>/i.test(paper.title)) errors.push(`${organization.slug} has an unclean paper title`);
}

const profileSlugs = new Set(profiles.map((profile) => profile.companySlug));
for (const slug of slugs) if (!profileSlugs.has(slug)) errors.push(`Missing regional profile for ${slug}`);
for (const slug of profileSlugs) if (!slugs.has(slug)) errors.push(`Orphan regional profile for ${slug}`);
for (const profile of profiles) {
  if (!validUrl(profile.sourceProfileUrl) || !/^https:\/\/doi\.org\//i.test(profile.sourceProfileUrl)) errors.push(`${profile.companySlug} has an invalid profile DOI`);
  if (!validUrl(profile.officialWebsite)) errors.push(`${profile.companySlug} has an invalid official website`);
  if (!/Not applicable/i.test(profile.companyValue.label)) errors.push(`${profile.companySlug} must not receive a commercial valuation`);
  if (profile.papers.length !== 1 || !validUrl(profile.papers[0]?.url)) errors.push(`${profile.companySlug} must retain one representative paper`);
  if (profile.videos.length !== 0) errors.push(`${profile.companySlug} must not infer video resources`);
  if (profile.founding.year && !/^https:\/\/ror\.org\//i.test(profile.founding.sourceUrl ?? "")) errors.push(`${profile.companySlug} founding-year lead lacks a ROR source`);
}

if (errors.length) {
  console.error(`Africa/South America expansion validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Africa/South America expansion validation passed: ${africa.length} African and ${southAmerica.length} South American organizations.`);
