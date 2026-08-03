import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const cacheDir = resolve(projectRoot, ".research-cache", "europe-evidence");
const auditDate = "2026-08-03";

const [cohort, paperCandidates, academicPaperCandidates, trialCandidates, videoCandidates] = await Promise.all([
  readFile(resolve(cacheDir, "cohort.json"), "utf8").then(JSON.parse),
  readFile(resolve(cacheDir, "paper-candidates.json"), "utf8").then(JSON.parse),
  readFile(resolve(cacheDir, "academic-paper-candidates.json"), "utf8").then(JSON.parse),
  readFile(resolve(cacheDir, "trial-candidates.json"), "utf8").then(JSON.parse),
  readFile(resolve(cacheDir, "video-candidates.json"), "utf8").then(JSON.parse)
]);

const bySlug = (items) => new Map(items.map((item) => [item.slug, item]));
const paperBySlug = bySlug(paperCandidates);
const academicPaperBySlug = bySlug(academicPaperCandidates);
const trialsBySlug = bySlug(trialCandidates);
const videosBySlug = Map.groupBy(videoCandidates, (item) => item.slug);
const verifiedPaperOverrides = new Map([
  ["cortivis", {
    title: "Visual percepts evoked with an intracortical 96-channel microelectrode array inserted in human occipital cortex",
    url: "https://doi.org/10.1172/JCI151331",
    doi: "10.1172/JCI151331",
    publisher: "Journal of Clinical Investigation",
    publicationDate: "2021-10-19",
    relationNote: "This peer-reviewed human study reports work from the CORTIVIS clinical protocol and links the result to NCT02983370."
  }],
  ["time-is-brain", {
    title: "Prognostic Accuracy of N20 Somatosensory Potential in Patients With Acute Ischemic Stroke and Endovascular Thrombectomy",
    url: "https://doi.org/10.1161/SVIN.122.000735",
    doi: "10.1161/SVIN.122.000735",
    publisher: "Stroke: Vascular and Interventional Neurology",
    publicationDate: "2023-06-14",
    relationNote: "This peer-reviewed PROMISE study evaluates the N20 biomarker that the founders identify as the basis of the BraiN20 program."
  }]
]);

const normalizeDate = (value) => {
  const parts = String(value ?? "").match(/\d{4}|\d{1,2}/g)?.map(Number) ?? [];
  if (!parts[0]) return undefined;
  const [year, month = 1, day = 1] = parts;
  const date = `${String(year).padStart(4, "0")}-${String(Math.min(12, Math.max(1, month))).padStart(2, "0")}-${String(Math.min(31, Math.max(1, day))).padStart(2, "0")}`;
  return Number.isNaN(new Date(`${date}T00:00:00Z`).getTime()) ? undefined : date;
};

const formatDate = (value, estimated = false) => {
  const normalized = normalizeDate(value);
  if (!normalized) return "Date not verified";
  const originalParts = String(value).match(/\d{4}|\d{1,2}/g)?.length ?? 0;
  const date = new Date(`${normalized}T00:00:00Z`);
  const label = originalParts >= 3
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date)
    : originalParts === 2
      ? new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(date)
      : String(date.getUTCFullYear());
  return estimated ? `${label} (estimated)` : label;
};

const normalizedName = (value) => value
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/\b(ltd|limited|inc|incorporated|llc|gmbh|ag|sa|plc|bv|nv|srl|spa|group|company|medical|technologies|technology|research)\b/g, " ")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const strongSponsorMatch = (organizationName, sponsorName) => {
  const organization = normalizedName(organizationName);
  const sponsor = normalizedName(sponsorName);
  if (!organization || !sponsor) return false;
  if (organization === sponsor) return true;
  const shorter = organization.length < sponsor.length ? organization : sponsor;
  const longer = organization.length < sponsor.length ? sponsor : organization;
  return shorter.split(" ").filter((token) => token.length > 2).length >= 2 && longer.includes(shorter);
};

const neuroTrialPattern = /brain|neuro|\beeg\b|epilep|parkinson|stroke|spinal|cognit|depress|migraine|nerve|prosthe|multiple sclerosis|amyotrophic|dementia|alzheimer|\btms\b|\btdcs\b|stimulat|intracran|cortical|sleep|tinnitus|exoskeleton|motor rehabilitation|cerebral/i;
const genericTrialSponsorSlugs = new Set([
  "brain-innovation-rtfmri",
  "brainlab",
  "elekta",
  "neuromed",
  "neurotechnology-lithuania",
  "noldus"
]);
const statusPriority = {
  RECRUITING: 8,
  NOT_YET_RECRUITING: 7,
  ACTIVE_NOT_RECRUITING: 6,
  ENROLLING_BY_INVITATION: 5,
  COMPLETED: 4,
  SUSPENDED: 2,
  TERMINATED: 1,
  WITHDRAWN: 0
};
const trialEligibleAcademicSlugs = new Set(["cortivis"]);

const selectTrial = (record) => {
  if ((record.kind !== "company" && !trialEligibleAcademicSlugs.has(record.slug)) || record.canonical.trials > 0 || genericTrialSponsorSlugs.has(record.slug)) return undefined;
  const studies = trialsBySlug.get(record.slug)?.studies ?? [];
  return studies
    .filter((study) => study.nctId && study.briefTitle && (study.relationshipVerified || study.sponsors.some((sponsor) => strongSponsorMatch(record.name, sponsor))))
    .filter((study) => neuroTrialPattern.test(`${study.briefTitle} ${study.conditions.join(" ")} ${study.interventions.join(" ")} ${study.briefSummary ?? ""}`))
    .filter((study) => normalizeDate(study.startDate?.date))
    .sort((a, b) =>
      (statusPriority[b.overallStatus] ?? 3) - (statusPriority[a.overallStatus] ?? 3) ||
      normalizeDate(b.startDate?.date).localeCompare(normalizeDate(a.startDate?.date))
    )[0];
};

const genericPaperTitle = /^(paper or publications resource|read|read more|read paper|read the publication|learn more|published research|ieee xplore|publications on pubmed|christoph guger|maestu 2021|blok b|pubmed-ncbi|publication\b)/i;
const humanPaperPattern = /patient|participant|volunteer|clinical|human|stroke|parkinson|dementia|alzheimer|depress|epilep|tinnitus|pain|sleep|multiple sclerosis|amyotrophic|prosthe|rehabilitation/i;

const choosePaper = (record) => {
  if (record.canonical.papers > 0) return undefined;
  if (verifiedPaperOverrides.has(record.slug)) return verifiedPaperOverrides.get(record.slug);
  if (record.kind === "academic") {
    const profileCandidate = paperBySlug.get(record.slug)?.metadata;
    const supplementalCandidate = academicPaperBySlug.get(record.slug)?.paper;
    return profileCandidate ?? supplementalCandidate;
  }
  const candidate = paperBySlug.get(record.slug)?.metadata;
  const date = normalizeDate(candidate?.publicationDate);
  if (!candidate || !date || date > auditDate || candidate.fetchError) return undefined;
  if (!candidate.title || candidate.title.length < 24 || genericPaperTitle.test(candidate.title)) return undefined;
  return candidate;
};

const paperRecords = [];
const trialRecords = [];
const milestoneRecords = [];
const projectRecords = [];
const paperSlugs = new Set();
const trialSlugs = new Set();
const milestoneSlugs = new Set();

for (const record of cohort.records) {
  const paper = choosePaper(record);
  const paperDate = normalizeDate(paper?.publicationDate);
  if (paper && paperDate && paperDate <= auditDate) {
    const title = paper.title.replace(/\s+/g, " ").trim();
    const isPreprint = /doi\.org\/10\.1101\/|biorxiv\.org|arxiv\.org/i.test(paper.url);
    const publicationLabel = isPreprint ? "preprint" : "publication";
    paperRecords.push({
      id: `europe-paper-${record.slug}`,
      title,
      companySlug: record.slug,
      dateLabel: formatDate(paper.publicationDate),
      sortDate: paperDate,
      evidenceLevel: !isPreprint && humanPaperPattern.test(title) ? "E4" : "E2",
      summary: paper.relationNote
        ? `${paper.relationNote} The paper is tracked for that specifically documented relationship, not as validation of every product or performance claim.`
        : record.kind === "academic"
        ? `A ${publicationLabel} with author affiliation to ${record.name} reports “${title}”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.`
        : `A ${publicationLabel} linked from ${record.name}'s research profile reports “${title}”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.`,
      sourceLinks: [{
        title,
        url: paper.url,
        publisher: paper.publisher || "DOI / publisher record",
        sourceType: "paper",
        isPrimary: true
      }],
      isSample: false
    });
    paperSlugs.add(record.slug);
  }

  const study = selectTrial(record);
  if (!study) continue;
  const sourceUrl = `https://clinicaltrials.gov/study/${study.nctId}`;
  const studySource = {
    title: `${study.nctId} study record`,
    url: sourceUrl,
    publisher: "ClinicalTrials.gov",
    sourceType: "trial-registry",
    isPrimary: true
  };
  trialRecords.push({
    id: `europe-trial-${record.slug}-${study.nctId.toLowerCase()}`,
    title: study.briefTitle,
    companySlug: record.slug,
    status: study.overallStatus.replaceAll("_", " ").toLowerCase(),
    condition: study.conditions.slice(0, 4).join("; ") || "Condition not specified in the cached registry fields",
    targetFunction: record.targetFunction,
    deviceProduct: study.interventions.slice(0, 5).join("; ") || record.modality,
    locations: study.locations.slice(0, 8).length ? study.locations.slice(0, 8) : ["No locations listed in the cached registry fields"],
    endpoints: study.primaryOutcomes.slice(0, 6).length ? study.primaryOutcomes.slice(0, 6) : ["See registry record for defined outcomes"],
    evidenceLevel: "E3",
    sourceLinks: [studySource],
    isSample: false
  });
  trialSlugs.add(record.slug);

  const isLeadSponsor = strongSponsorMatch(record.name, study.leadSponsor ?? "") || study.relationshipType === "named-program";
  if (record.canonical.milestones === 0 && isLeadSponsor) {
    const startDate = normalizeDate(study.startDate?.date);
    const startUpcoming = study.overallStatus === "NOT_YET_RECRUITING" || startDate > auditDate;
    // A lapsed estimated start on a still-not-recruiting record is not a valid
    // upcoming checkpoint and is not evidence that the study opened.
    if (!(study.overallStatus === "NOT_YET_RECRUITING" && startDate <= auditDate)) {
      milestoneRecords.push({
        id: `europe-milestone-${record.slug}-${study.nctId.toLowerCase()}-start`,
        title: startUpcoming ? `${record.name} study is scheduled to open` : `${record.name} study opens`,
        companySlug: record.slug,
        dateLabel: formatDate(study.startDate?.date, study.startDate?.type === "ESTIMATED"),
        sortDate: startDate,
        status: startUpcoming ? "upcoming" : "confirmed",
        type: "trial-opened",
        evidenceLevel: "E3",
        confidence: "high",
        summary: startUpcoming
          ? `The registry lists ${formatDate(study.startDate?.date, true)} as the study start and currently marks the study ${study.overallStatus.replaceAll("_", " ").toLowerCase()}.`
          : `The registry lists ${formatDate(study.startDate?.date, study.startDate?.type === "ESTIMATED")} as the study start and currently marks the study ${study.overallStatus.replaceAll("_", " ").toLowerCase()}.`,
        whyItMatters: "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
        hypeCheck: "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
        sourceLinks: [studySource],
        isSample: false
      });
      milestoneSlugs.add(record.slug);
    }

    const completion = study.completionDate ?? study.primaryCompletionDate;
    const completionDate = normalizeDate(completion?.date);
    if (completionDate && completionDate > auditDate) {
      milestoneRecords.push({
        id: `europe-milestone-${record.slug}-${study.nctId.toLowerCase()}-completion`,
        title: `${record.name} study completion window listed`,
        companySlug: record.slug,
        dateLabel: formatDate(completion.date, true),
        sortDate: completionDate,
        status: "upcoming",
        type: "endpoint-readout",
        evidenceLevel: "E3",
        confidence: "high",
        summary: `The registry lists ${formatDate(completion.date, true)} as the estimated study completion window.`,
        whyItMatters: "The registry date provides a concrete watch point for checking whether results or a status update become available.",
        hypeCheck: "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
        sourceLinks: [studySource],
        isSample: false
      });
    }
  }
}

milestoneRecords.push({
  id: "europe-milestone-time-is-brain-brain20-ce-mark",
  title: "Time is Brain reports EU MDR CE marking for BraiN20",
  companySlug: "time-is-brain",
  dateLabel: "Reported Jul 2026",
  sortDate: "2026-07-01",
  status: "confirmed",
  type: "approval-clearance",
  evidenceLevel: "E1",
  confidence: "medium",
  summary: "Time is Brain's official site and company post report that BraiN20 obtained CE marking under the EU Medical Device Regulation.",
  whyItMatters: "A CE mark is a regulatory commercialization checkpoint for the named device in Europe.",
  hypeCheck: "This pass found a first-party announcement, not an independently inspected certificate or notified-body database entry; the mark does not by itself establish improved stroke outcomes.",
  sourceLinks: [{
    title: "Time is Brain CE-mark announcement",
    url: "https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A7483474259923632129/",
    publisher: "Time is Brain",
    sourceType: "company-update",
    isPrimary: true
  }],
  isSample: false
});
milestoneSlugs.add("time-is-brain");

const initiallyCovered = (record) => Object.values(record.canonical).some((count) => count > 0);
const hasAddedCanonicalEvidence = (slug) => paperSlugs.has(slug) || trialSlugs.has(slug) || milestoneSlugs.has(slug);
const uncorroboratedFallbackSlugs = new Set(["implex"]);

for (const record of cohort.records) {
  if (initiallyCovered(record) || hasAddedCanonicalEvidence(record.slug)) continue;
  const primarySource = record.sourceLinks.find((source) => source.isPrimary && !source.url.includes("neurofounders.co"))
    ?? record.sourceLinks.find((source) => !source.url.includes("neurofounders.co"))
    ?? record.sourceLinks[0];
  if (!primarySource) throw new Error(`${record.slug} has no source for fallback project evidence`);
  const isUncorroborated = uncorroboratedFallbackSlugs.has(record.slug);
  projectRecords.push({
    id: `europe-project-${record.slug}`,
    companySlug: record.slug,
    name: `${record.name} tracked neurotechnology program`,
    focus: record.targetFunction,
    modality: record.modality,
    statusLabel: record.stage,
    evidenceLevel: isUncorroborated ? "E0" : "E1",
    latestUpdateLabel: "Evidence reviewed Aug 2026",
    sortDate: auditDate,
    summary: isUncorroborated
      ? `${record.name} is retained as an explicitly unverified historical catalog lead. The August 2026 audit could not corroborate a current operating identity or reach the listed domain.`
      : `${record.name} is retained as a source-backed European neurotechnology program focused on ${record.targetFunction.toLowerCase()} using ${record.modality.toLowerCase()}.`,
    demonstrated: isUncorroborated
      ? "Nothing beyond the existence of the prior catalog lead was verified in this pass."
      : "The linked source supports the organization's identity and stated program or product focus.",
    notYetShown: isUncorroborated
      ? "Current operations, the reported device program, clinical evidence, and company status remain unverified. Do not treat this record as evidence that the organization is active."
      : "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    sourceLinks: [{ ...primarySource, isPrimary: primarySource.isPrimary ?? true }],
    isSample: false
  });
}

const generated = {
  paperRecords,
  trialRecords,
  milestoneRecords,
  projectRecords
};
const generatedSlugs = new Set(Object.values(generated).flat().map((item) => item.companySlug));
const coverageAfter = cohort.records.filter((record) => initiallyCovered(record) || generatedSlugs.has(record.slug));
if (coverageAfter.length !== cohort.records.length) {
  throw new Error(`Generated coverage is incomplete: ${coverageAfter.length}/${cohort.records.length}`);
}

const tsOutput = `import type { Milestone, Paper, ProgramProject, Trial } from "./schema";\n\n` +
  `/** Inclusive European scope used by the 2026-08-03 evidence audit. */\n` +
  `export const europeanOrganizationSlugs = ${JSON.stringify(cohort.records.map((record) => record.slug), null, 2)} as const;\n\n` +
  `export const europeEvidencePapers: Paper[] = ${JSON.stringify(paperRecords, null, 2)};\n\n` +
  `export const europeEvidenceTrials: Trial[] = ${JSON.stringify(trialRecords, null, 2)};\n\n` +
  `export const europeEvidenceMilestones: Milestone[] = ${JSON.stringify(milestoneRecords, null, 2)};\n\n` +
  `export const europeEvidenceProjects: ProgramProject[] = ${JSON.stringify(projectRecords, null, 2)};\n`;
await writeFile(resolve(projectRoot, "data", "europe-evidence.ts"), tsOutput, "utf8");

const rows = cohort.records.map((record) => {
  const additions = [
    paperSlugs.has(record.slug) ? "paper" : null,
    trialSlugs.has(record.slug) ? "trial" : null,
    milestoneSlugs.has(record.slug) ? "milestone" : null,
    projectRecords.some((item) => item.companySlug === record.slug) ? "project profile" : null
  ].filter(Boolean);
  const representative = paperRecords.find((item) => item.companySlug === record.slug)?.sourceLinks[0]
    ?? trialRecords.find((item) => item.companySlug === record.slug)?.sourceLinks[0]
    ?? projectRecords.find((item) => item.companySlug === record.slug)?.sourceLinks[0]
    ?? record.sourceLinks[0];
  const before = Object.entries(record.canonical).filter(([, count]) => count).map(([key, count]) => `${count} ${key}`).join(", ") || "none";
  const profilePapers = record.research?.papers.length ?? 0;
  const profileVideos = record.research?.videos.length ?? 0;
  const specificVideos = videosBySlug.get(record.slug)?.length ?? 0;
  return `| ${record.country} | ${record.name.replaceAll("|", "\\|")} | ${record.kind} | ${before} | ${additions.join(", ") || "existing evidence retained"} | ${profilePapers} | ${profileVideos} (${specificVideos} specific) | [source](${representative.url}) |`;
});

const markdown = `# European organization evidence audit\n\n` +
  `Audited on ${auditDate}. The scope contains every catalog organization headquartered in a conventional European state, plus transcontinental Russia, Turkey, and Kazakhstan and the South Caucasus. This intentionally errs toward inclusion.\n\n` +
  `## Result\n\n` +
  `- Organizations audited: ${cohort.records.length} (${cohort.records.filter((record) => record.kind === "company").length} companies and ${cohort.records.filter((record) => record.kind === "academic").length} academic programs).\n` +
  `- Organizations with canonical activity before this pass: ${cohort.records.filter(initiallyCovered).length}.\n` +
  `- Added papers: ${paperRecords.length}. Every one of the ${cohort.records.filter((record) => record.kind === "academic").length} academic programs has a canonical paper after combining prior and new data.\n` +
  `- Added sponsor/collaborator-matched or explicitly named program/device trials: ${trialRecords.length}.\n` +
  `- Added trial milestones and upcoming registry checkpoints: ${milestoneRecords.length}.\n` +
  `- Added limited program profiles where no stronger canonical activity qualified: ${projectRecords.length}.\n` +
  `- Organizations with canonical activity after this pass: ${coverageAfter.length} of ${cohort.records.length}.\n` +
  `- Existing profile research links cover ${cohort.records.filter((record) => record.research?.papers.length).length} organizations with papers and ${cohort.records.filter((record) => record.research?.videos.length).length} with video/channel resources; ${videoCandidates.length} links resolve to specific YouTube videos rather than generic channels.\n\n` +
  `## Evidence rules\n\n` +
  `- DOI, PubMed, publisher metadata, OpenAlex institution identifiers, and sponsor/collaborator-matched ClinicalTrials.gov records are used as structured evidence leads. Two registry records were included through a separately checked named-program or named-device relationship, with the academic sponsor left explicit.\n` +
  `- A paper affiliation proves that the organization participated in that publication; it does not validate every program at the institution.\n` +
  `- A registered trial proves a public protocol and status, not safety, efficacy, or a positive outcome. Estimated completion dates are watch points, not promised readouts.\n` +
  `- YouTube channels remain profile research resources. A video is not promoted to a dated canonical demo unless its date and content are verified.\n` +
  `- Organizations without a qualifying paper, trial, milestone, or dated video receive a limited project record tied to an official/profile source; those records explicitly do not claim demonstrated performance.\n\n` +
  `- If a prior catalog lead cannot be corroborated as currently operating, it remains visibly marked E0 rather than being presented as an active program; this applies to Implex in this snapshot.\n\n` +
  `## Organization-by-organization reconciliation\n\n` +
  `| Country | Organization | Kind | Canonical evidence before | Added | Profile papers | Profile videos | Representative source |\n` +
  `|---|---|---|---|---|---:|---:|---|\n${rows.join("\n")}\n\n` +
  `## Reproduce\n\n` +
  `Run \`npm run research:europe\` to rebuild the cohort, \`npm run fetch:europe-evidence\` to refresh primary-source candidate caches, \`npm run generate:europe-evidence\` to regenerate the version-controlled data and audit, and \`npm run validate:data\` to enforce complete coverage.\n`;
await mkdir(resolve(projectRoot, "docs"), { recursive: true });
await writeFile(resolve(projectRoot, "docs", "european-organization-evidence-audit.md"), markdown, "utf8");

console.log(JSON.stringify({
  organizations: cohort.records.length,
  initiallyCovered: cohort.records.filter(initiallyCovered).length,
  papersAdded: paperRecords.length,
  trialsAdded: trialRecords.length,
  milestonesAdded: milestoneRecords.length,
  projectsAdded: projectRecords.length,
  coverageAfter: coverageAfter.length,
  specificVideoResources: videoCandidates.length
}, null, 2));
