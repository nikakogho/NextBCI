import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const dataPath = resolve(projectRoot, "data", "sourced-expansion.ts");
const organizationMarker = "export const sourcedExpansionOrganizations: Company[] = ";
const profileMarker = "export const sourcedExpansionResearchProfiles: CompanyResearchProfile[] = ";
const enrichmentDocPath = resolve(projectRoot, "docs", "sourced-company-enrichment-2026.md");
const relevantPath = /\b(about|company|story|team|leadership|people|who-we-are|our-story|science|research|publication|resource|media|video)s?\b/i;
const claimWords = /\b(received|launched|introduced|developed|demonstrated|published|completed|approved|cleared|awarded|first patient|first-in-human|clinical trial)\b/i;
const excludedEvidenceUrls = new Set([
  "https://www.hbimed.com/wp-content/uploads/2020/10/Publications-HBI-med.pdf"
]);

const decodeEntities = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&apos;", "'")
  .replaceAll("&nbsp;", " ")
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

const visibleText = (html) => decodeEntities(html
  .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
  .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
  .replace(/<\/(?:p|div|li|h[1-6]|section|article|main|header|footer)>|<br\s*\/?\s*>/gi, ". ")
  .replace(/<[^>]+>/g, " "))
  .replace(/(?:\.\s*){2,}/g, ". ")
  .replace(/\s+/g, " ")
  .trim();

const repairMojibake = (value) => value
  .replaceAll("\u00e2\u20ac\u2122", "’")
  .replaceAll("\u00e2\u20ac\u201c", "–")
  .replaceAll("\u00e2\u20ac\u201d", "—")
  .replaceAll("\u00e2\u20ac\u0153", "“")
  .replaceAll("\u00e2\u20ac\u009d", "”")
  .replaceAll("\u00e2\u20ac\u00a6", "…")
  .replaceAll("\u00e2\u201e\u00a2", "™")
  .replaceAll("\u00c2\u00ae", "®")
  .replaceAll("\u00c2\u00a9", "©")
  .replaceAll("\u00e2\u20ac\u2039", "")
  .replaceAll("&reg;", "®")
  .replaceAll("&trade;", "™");

const cleanSnippet = (value) => {
  const cleaned = repairMojibake(decodeEntities(decodeEntities(value))).replace(/\s+/g, " ").trim();
  if (cleaned.length <= 460) return cleaned;
  const bounded = cleaned.slice(0, 454);
  return `${bounded.slice(0, bounded.lastIndexOf(" "))}…`;
};
const regexEscape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fetchHtml = async (url) => {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    headers: { "user-agent": "Mozilla/5.0 NextBCI evidence enrichment" }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { html: await response.text(), url: response.url };
};

const sameSiteLinks = (html, pageUrl) => {
  const base = new URL(pageUrl);
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    try {
      const url = new URL(decodeEntities(match[1]), base);
      if (!/^https?:$/.test(url.protocol)) continue;
      const baseHost = base.hostname.replace(/^www\./, "");
      const linkHost = url.hostname.replace(/^www\./, "");
      const text = cleanSnippet(visibleText(match[2]));
      links.push({ url: url.href.split("#")[0], text, sameSite: baseHost === linkHost });
    } catch {
      // Ignore malformed navigation links.
    }
  }
  return links;
};

const structuredOrganizations = (html) => {
  const organizations = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeEntities(match[1]).trim());
      const queue = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (queue.length) {
        const item = queue.shift();
        if (!item || typeof item !== "object") continue;
        if (Array.isArray(item)) { queue.push(...item); continue; }
        if (Array.isArray(item["@graph"])) queue.push(...item["@graph"]);
        const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
        if (types.some((type) => /Organization|Corporation|Business|Company/i.test(String(type)))) organizations.push(item);
      }
    } catch {
      // Invalid JSON-LD should not block the bounded source pass.
    }
  }
  return organizations;
};

const founderNames = (founder) => {
  const values = Array.isArray(founder) ? founder : founder ? [founder] : [];
  return values.map((value) => typeof value === "string" ? value : value?.name).filter(Boolean).map(cleanSnippet);
};

const yearFrom = (value) => {
  const match = String(value ?? "").match(/\b(19\d{2}|20[0-2]\d)\b/);
  const year = match ? Number(match[1]) : undefined;
  return year && year <= 2026 ? year : undefined;
};

const foundingYearFrom = (value) => {
  const text = String(value ?? "");
  const after = text.match(/\b(?:founded|established|formed|launched)\b[^.!?]{0,80}?\b(19\d{2}|20[0-2]\d)\b/i);
  const before = text.match(/\b(19\d{2}|20[0-2]\d)\b[^.!?]{0,45}?\b(?:founded|established|formed|launched)\b/i);
  return yearFrom(after?.[1] ?? before?.[1]);
};

const sentenceCandidates = (text) => text
  .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
  .map(cleanSnippet)
  .filter((sentence) => sentence.length >= 28 && sentence.length <= 460);

const publisherFor = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "Official source"; }
};

const normalizeEvidenceUrl = (url) => {
  try {
    const parsed = new URL(url);
    if (/safelinks\.protection\.outlook\.com$/i.test(parsed.hostname) && parsed.searchParams.get("url")) return decodeURIComponent(parsed.searchParams.get("url"));
    return parsed.href;
  } catch { return url; }
};

const hostFor = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
};

const usableFoundingSentence = (sentence, pageUrl, originalUrl, organizationName) => {
  if (hostFor(pageUrl) !== hostFor(originalUrl)) return false;
  const text = sentence.toLowerCase();
  if (!/\b(founded|co-founded|founder|established|company formed)\b/i.test(sentence)) return false;
  if (/cookie|privacy|terms|established itself|well-established|has established|established office|established a position|established global|jury of established|established neurological research|established interreader|technique (?:is|was|has been) established|founder testimonial/i.test(text)) return false;
  if (/company formed from (?:a|the) merger|formed from (?:a|the) merger/i.test(text)) return false;
  if (/^Mark's strategic approach/i.test(sentence)) return false;
  if (/\b(?:dr|prof)\.?$/i.test(sentence.trim())) return false;
  if (/\b(?:founder|co-founder|founding ceo)\b[^.]{0,80}\bof\b/i.test(sentence) && !/\b(?:founder|co-founder)\s+of\s+(?:the|this|our)\s+(?:company|business|team)/i.test(sentence)) return false;
  const normalizedSentence = text.replace(/[^a-z0-9]+/g, " ").trim();
  const normalizedName = organizationName.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const mentionsCompany = normalizedName.length >= 4 && normalizedSentence.includes(normalizedName);
  if (/\bfounding partner of\b/i.test(sentence)) return false;
  if (/\bco-founded\s+[A-ZÀ-ÖØ-Ý]/u.test(sentence) && !mentionsCompany) return false;
  const identifiesPerson = /[A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+){1,3}.{0,55}\b(?:Co-Founder|Founder|co-founded|founder)\b/u.test(sentence);
  return mentionsCompany || identifiesPerson || /four[‑-]founder team|company formed/i.test(sentence);
};

const usableAccomplishment = (sentence, pageUrl, organization) => {
  if (hostFor(pageUrl) !== hostFor(organization.website)) return false;
  const text = sentence.trim();
  if (text.length < 48) return false;
  if (/submission has been received|ready to elevate|content on this website|finance the domain|registrar lock|cookie|privacy|terms|skip to content|clinical trial services|training materials can be developed|developed expertise|developed and grown customer|articles published by our customers/i.test(text)) return false;
  if (/^(?:he|she|his|her|I\b|with over \d+ years|lead author)\b/i.test(text)) return false;
  if (/^[A-Z][A-Za-z'’-]+\s+(?:has|holds|earned|received|developed|authored|completed)\b/i.test(text) && !text.toLowerCase().includes(organization.name.toLowerCase())) return false;
  if (/^[A-ZÀ-ÖØ-Ý][\p{L}'’-]+\s+(?:has|holds|earned|developed|authored|completed)\b/iu.test(text) && !text.toLowerCase().includes(organization.name.toLowerCase())) return false;
  if (/during (?:her|his) |where (?:he|she) |prize is awarded by a jury|protocol guide is published|attempting to replicate|^developed for use|^co-developed with|custom-made solutions are developed|^[A-Z][^.!?]{0,70}\bLab\b[^.!?]{0,50}\bdeveloped\b|example code was developed|we have developed one…|has developed an innovative solution|hundreds of peer reviewed papers|leads his own laboratory|partners Prof\.$/i.test(text)) return false;
  if (/\b(?:HBImed AG|Kandu Health|Oura Health|Inscopix)\b/i.test(text) && !text.toLowerCase().includes(organization.name.toLowerCase())) return false;
  return claimWords.test(text);
};

const polishedFoundingNote = (sentence) => {
  const embeddedRole = sentence.match(/(?:"name":")?([A-ZÀ-ÖØ-Ý][^",]{2,80})","job":"([^"]*(?:Founder|founder)[^"]*)"/u);
  if (embeddedRole) return `The official team data identifies ${embeddedRole[1]} as ${embeddedRole[2]}.`;
  return sentence
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/(?:\s+(?:email|contact|&copy;|©|bottom of page)\b[\s\S]*)$/i, "")
    .replace(/\s+[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}[\s\S]*$/, "")
    .replace(/\s+([.,;:])/g, "$1")
    .replace(/\.{2,}$/, ".")
    .replace(/\s+\.$/, ".")
    .trim();
};

const enrichCompany = async (organization, profile) => {
  profile.founding = { status: "not-verified", note: "A founding year and founders were not verified during this bounded expansion pass." };
  profile.headquarters = { status: "country-only", display: organization.hq.country, note: "The dated discovery source supports the country assignment; the map intentionally uses a country-level coordinate pending city verification.", sourceUrl: profile.sourceProfileUrl };
  profile.reportedAccomplishments = [{ note: `The company currently presents a technology line centered on ${organization.targetFunction.replace(/\.$/, "").toLowerCase()}.`, sourceUrl: organization.website, publisher: organization.name, evidence: "company-reported" }];
  profile.papers = [];
  profile.videos = [];
  let homepage;
  try { homepage = await fetchHtml(organization.website); } catch { return false; }
  const pages = [homepage];
  const relevant = sameSiteLinks(homepage.html, homepage.url)
    .filter((link) => link.sameSite && relevantPath.test(`${link.url} ${link.text}`))
    .sort((a, b) => Number(/team|leadership|people|story|about/i.test(b.url)) - Number(/team|leadership|people|story|about/i.test(a.url)));
  for (const link of [...new Map(relevant.map((item) => [item.url, item])).values()].slice(0, 3)) {
    if (pages.some((page) => page.url === link.url)) continue;
    try { pages.push(await fetchHtml(link.url)); } catch { /* Keep the successful pages. */ }
  }

  const structured = pages.flatMap((page) => structuredOrganizations(page.html).map((item) => ({ item, url: page.url })));
  const structuredLead = structured.find(({ item, url }) => hostFor(url) === hostFor(organization.website) && (yearFrom(item.foundingDate) || founderNames(item.founder ?? item.founders).length));
  const structuredFounders = structuredLead ? founderNames(structuredLead.item.founder ?? structuredLead.item.founders) : [];
  const structuredYear = structuredLead ? yearFrom(structuredLead.item.foundingDate) : undefined;
  const sentences = pages.flatMap((page) => sentenceCandidates(visibleText(page.html)).map((text) => ({ text, url: page.url })));
  const foundingIndex = sentences.findIndex(({ text, url }) => usableFoundingSentence(text, url, organization.website, organization.name));
  let foundingSentence = foundingIndex >= 0 ? sentences[foundingIndex] : undefined;
  const preceding = foundingIndex > 0 && sentences[foundingIndex - 1].url === foundingSentence?.url ? sentences[foundingIndex - 1] : undefined;
  if (foundingSentence && preceding && (/^(?:he|she|they|together)\b/i.test(foundingSentence.text) || /^\b(?:19\d{2}|20[0-2]\d)\b$/.test(preceding.text))) {
    foundingSentence = { ...foundingSentence, text: cleanSnippet(`${preceding.text} ${foundingSentence.text}`) };
  }
  const sentenceYear = foundingSentence ? foundingYearFrom(foundingSentence.text) : undefined;
  const escapedName = regexEscape(organization.name).replace(/\\[.\-_]|\s+/g, "[\\s._-]*");
  const pageFoundingYear = pages.map((page) => visibleText(page.html)).map((text) => {
    const before = text.match(new RegExp(`\\b(19\\d{2}|20[0-2]\\d)\\b[\\s\\S]{0,20}${escapedName}[\\s\\S]{0,55}\\b(?:founded|established|formed)\\b`, "i"))
      ?? text.match(new RegExp(`\\b(19\\d{2}|20[0-2]\\d)\\b[\\s\\S]{0,20}\\b(?:founded|established|formed)\\b[\\s\\S]{0,70}${escapedName}`, "i"))
      ?? text.match(/\b(19\d{2}|20[0-2]\d)\b[\s\S]{0,70}\bcompany formed\b/i);
    const after = text.match(new RegExp(`${escapedName}[\\s\\S]{0,75}\\b(?:founded|established|formed)\\b[\\s\\S]{0,55}\\b(19\\d{2}|20[0-2]\\d)\\b`, "i"));
    return yearFrom(before?.[1] ?? after?.[1]);
  }).find(Boolean);

  if (structuredLead || foundingSentence) {
    profile.founding = {
      ...(structuredYear || sentenceYear || pageFoundingYear ? { year: structuredYear ?? sentenceYear ?? pageFoundingYear } : {}),
      status: "official-source-lead",
      note: structuredFounders.length
        ? `Official structured data identifies ${structuredFounders.join(", ")} as founder${structuredFounders.length === 1 ? "" : "s"}.`
        : foundingSentence
          ? polishedFoundingNote(foundingSentence.text)
          : `Official structured data reports a founding year of ${structuredYear}.`,
      sourceUrl: structuredLead?.url ?? foundingSentence.url
    };
  }

  const organizationRecord = structured.find(({ item, url }) => hostFor(url) === hostFor(organization.website) && item.address && typeof item.address === "object");
  const locality = organizationRecord?.item.address.addressLocality;
  const country = organizationRecord?.item.address.addressCountry;
  if (locality) {
    const countryLabel = typeof country === "string" ? country : country?.name;
    profile.headquarters = {
      status: "official-source-lead",
      display: [locality, countryLabel].filter(Boolean).join(", "),
      note: "Location is taken from organization structured data on the official site; the map retains its conservative country-level coordinate.",
      sourceUrl: organizationRecord.url
    };
  }

  const allLinks = pages.flatMap((page) => sameSiteLinks(page.html, page.url));
  const paperLinks = allLinks.filter((link) => /doi\.org|publication|peer.reviewed|research paper/i.test(`${link.url} ${link.text}`) && !/annual.report|investor|financial report/i.test(`${link.url} ${link.text}`) && !excludedEvidenceUrls.has(link.url));
  profile.papers = [...new Map(paperLinks.map((link) => {
    const url = normalizeEvidenceUrl(link.url);
    const genericTitle = /^(learn more|go to top|back to top|discover the scientific publication)$/i.test(link.text);
    return [url, {
    title: link.text.length >= 8 && !genericTitle ? link.text : "Official research or publication resource",
    url,
    publisher: publisherFor(url)
  }];
  })).values()].slice(0, 4);

  const videoLinks = allLinks.filter((link) => {
    if (!/youtu\.be|youtube\.com|vimeo\.com/i.test(link.url)) return false;
    try { return !/^\/?$/.test(new URL(link.url).pathname); } catch { return false; }
  });
  profile.videos = [...new Map(videoLinks.map((link) => [link.url, {
    title: link.text.length >= 5 ? link.text : "Official video or channel",
    url: link.url,
    publisher: publisherFor(link.url)
  }])).values()].slice(0, 4);

  const accomplishment = sentences.find(({ text, url }) => usableAccomplishment(text, url, organization));
  if (accomplishment) {
    profile.reportedAccomplishments = [{
      note: accomplishment.text,
      sourceUrl: accomplishment.url,
      publisher: publisherFor(accomplishment.url),
      evidence: "company-reported"
    }];
  }
  return true;
};

const main = async () => {
  const raw = await readFile(dataPath, "utf8");
  const organizationStart = raw.indexOf(organizationMarker) + organizationMarker.length;
  const profileDeclaration = raw.indexOf(profileMarker);
  const profileStart = profileDeclaration + profileMarker.length;
  const organizations = JSON.parse(raw.slice(organizationStart, raw.lastIndexOf(";", profileDeclaration)));
  const profiles = JSON.parse(raw.slice(profileStart, raw.lastIndexOf(";")));
  const companies = organizations.filter((organization) => organization.kind === "company");
  const profileBySlug = new Map(profiles.map((profile) => [profile.companySlug, profile]));
  let cursor = 0;
  let reached = 0;

  const worker = async () => {
    while (cursor < companies.length) {
      const organization = companies[cursor++];
      const profile = profileBySlug.get(organization.slug);
      if (profile && await enrichCompany(organization, profile)) reached += 1;
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));

  const parley = profileBySlug.get("parley-neurotech");
  if (parley) {
    parley.founding = {
      year: 2025,
      status: "official-source-lead",
      note: "The official company timeline says Parley formed in 2025 and spun out of the Klug Lab at the University of Colorado Anschutz Medical Campus; individual founder names were not listed in the page text.",
      sourceUrl: "https://www.parley-neuro.com/"
    };
  }

  const otolith = profileBySlug.get("otolith-labs");
  if (otolith) {
    otolith.headquarters = {
      status: "official-source-lead",
      display: "Washington, DC, US",
      note: "The official company about page identifies Washington, DC as the company's base; the map retains its conservative country-level coordinate.",
      sourceUrl: "https://otolithlabs.com/about/"
    };
    otolith.regulatoryStatus = "The company reports FDA Breakthrough Device designation for its chronic-vertigo device; designation is not marketing authorization.";
    otolith.reportedAccomplishments = [{
      note: "The company reports FDA Breakthrough Device designation for its head-worn vestibular device; this does not establish marketing authorization.",
      sourceUrl: "https://otolithlabs.com/",
      publisher: "Otolith Labs",
      evidence: "company-reported"
    }];
    otolith.papers = [{
      title: "Exploring vestibular stimulation to reduce the influence of cybersickness on virtual reality experiences",
      url: "https://doi.org/10.3389/frvir.2024.1478106",
      publisher: "Frontiers in Virtual Reality"
    }];
  }

  const generated = `/* This file is generated by scripts/generate-sourced-expansion.mjs. Do not hand-edit. */\nimport type { Company, CompanyResearchProfile } from "./schema";\n\nexport const sourcedExpansionOrganizations: Company[] = ${JSON.stringify(organizations, null, 2)};\n\nexport const sourcedExpansionResearchProfiles: CompanyResearchProfile[] = ${JSON.stringify(profiles, null, 2)};\n`;
  await writeFile(dataPath, generated, "utf8");
  const enriched = companies.map((company) => profileBySlug.get(company.slug));
  const summary = {
    companies: companies.length,
    officialSitesReached: reached,
    foundingLeads: enriched.filter((profile) => profile?.founding.status === "official-source-lead").length,
    cityLeads: enriched.filter((profile) => profile?.headquarters.status === "official-source-lead").length,
    paperLinks: enriched.reduce((sum, profile) => sum + (profile?.papers.length ?? 0), 0),
    videoLinks: enriched.reduce((sum, profile) => sum + (profile?.videos.length ?? 0), 0)
  };

  const escapeCell = (value) => String(value ?? "").replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
  const rows = companies.map((company) => {
    const profile = profileBySlug.get(company.slug);
    const founding = profile?.founding.status === "official-source-lead"
      ? `${profile.founding.year ?? "Year not verified"}; ${profile.founding.note}`
      : "Founding year and founders not verified";
    const location = `${profile?.headquarters.display ?? company.hq.country} (${profile?.headquarters.status === "official-source-lead" ? "official-site lead" : "country-level source"})`;
    const resources = `${profile?.papers.length ?? 0} paper/publication link(s); ${profile?.videos.length ?? 0} video link(s)`;
    return `| ${escapeCell(company.name)} | ${escapeCell(founding)} | ${escapeCell(location)} | ${escapeCell(profile?.companyValue?.label ?? "Not publicly disclosed")} | ${escapeCell(resources)} | [Official site](${company.website}) · [Discovery source](${profile?.sourceProfileUrl}) |`;
  });
  const enrichmentDoc = `# Sourced company enrichment audit (2026-07-31)\n\nThis table records the bounded official-site research pass for the 100-company expansion. Unknown fields remain explicitly unknown. Founding and city entries are leads from official-site text or structured data, not independently verified corporate-registry findings. Private-company net worth is not inferred from funding. Accomplishments on rendered profiles remain labelled company-reported.\n\n## Coverage\n\n- Companies: ${summary.companies}\n- Official sites reached: ${summary.officialSitesReached}\n- Official-site founding leads: ${summary.foundingLeads}\n- Official-site city leads: ${summary.cityLeads}\n- Paper/publication links retained: ${summary.paperLinks}\n- Video links retained: ${summary.videoLinks}\n\n## Company-by-company status\n\n| Company | Founding research | Location research | Value / net-worth status | Retained resources | Sources |\n| --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`;
  await writeFile(enrichmentDocPath, enrichmentDoc, "utf8");
  console.log(JSON.stringify(summary, null, 2));
};

await main();
