import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const raw = await readFile(resolve(projectRoot, "data", "sourced-expansion.ts"), "utf8");
const organizationMarker = "export const sourcedExpansionOrganizations: Company[] = ";
const profileMarker = "export const sourcedExpansionResearchProfiles: CompanyResearchProfile[] = ";
const organizationStart = raw.indexOf(organizationMarker) + organizationMarker.length;
const profileDeclaration = raw.indexOf(profileMarker);
const profileStart = profileDeclaration + profileMarker.length;
const organizations = JSON.parse(raw.slice(organizationStart, raw.lastIndexOf(";", profileDeclaration)));
const profiles = JSON.parse(raw.slice(profileStart, raw.lastIndexOf(";")));
const companies = organizations.filter((organization) => organization.kind === "company");
const institutions = organizations.filter((organization) => organization.kind === "academic");
const resourceUrls = profiles.flatMap((profile) => [...profile.papers, ...profile.videos].map((item) => item.url));
const targets = [
  ...companies.map((company) => ({ url: company.website, kind: "company", name: company.name })),
  ...institutions.map((institution) => ({ url: institution.website, kind: "institution", name: institution.name })),
  ...resourceUrls.map((url) => ({ url, kind: "resource", name: url }))
];
const uniqueTargets = [...new Map(targets.map((target) => [`${target.kind}:${target.url}`, target])).values()];
const results = [];
let cursor = 0;

const audit = async (target) => {
  let lastResult;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(target.url, {
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
        headers: { "user-agent": "Mozilla/5.0 NextBCI source audit" }
      });
      const body = target.kind === "company" ? (await response.text()).toLowerCase() : "";
      const parked = /domain (?:is )?for sale|buy this domain|hugedomains|sedoparking|afternic|domainmarket/.test(body);
      lastResult = { ...target, status: response.status, finalUrl: response.url, parked };
      if (response.status < 500) return lastResult;
    } catch (error) {
      lastResult = { ...target, status: "ERR", error: String(error.cause?.code ?? error.message) };
    }
    if (attempt === 0) await new Promise((resolveDelay) => setTimeout(resolveDelay, 1_000));
  }
  return lastResult;
};

const worker = async () => {
  while (cursor < uniqueTargets.length) results.push(await audit(uniqueTargets[cursor++]));
};
await Promise.all(Array.from({ length: 8 }, worker));

const unavailable = (result) => result.status === "ERR" || Number(result.status) >= 500 || [404, 410].includes(Number(result.status));
const hardFailures = results.filter((result) => result.parked || (result.kind !== "institution" && unavailable(result)));
const institutionUnavailable = results.filter((result) => result.kind === "institution" && unavailable(result) && !result.parked);
const accessLimited = results.filter((result) => [401, 403, 429].includes(Number(result.status)));
console.log(JSON.stringify({
  checked: results.length,
  companySites: companies.length,
  institutionSites: institutions.length,
  retainedResources: new Set(resourceUrls).size,
  hardFailures,
  institutionUnavailable: institutionUnavailable.map(({ name, url, status, error }) => ({ name, url, status, ...(error ? { error } : {}) })),
  accessLimited: accessLimited.map(({ name, url, status }) => ({ name, url, status }))
}, null, 2));

if (hardFailures.length) process.exit(1);
