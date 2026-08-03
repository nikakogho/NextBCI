import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { createRequire } from "node:module";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const cacheDir = resolve(projectRoot, ".research-cache", "top-company-milestones");
await mkdir(cacheDir, { recursive: true });

const transpile = async (fileName, tempDir) => {
  const sourcePath = resolve(projectRoot, "data", fileName);
  const sourceText = await readFile(sourcePath, "utf8");
  const output = ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: sourcePath,
    reportDiagnostics: true
  });
  const blocking = (output.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
  if (blocking.length) throw new Error(blocking.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n")).join("\n"));
  await writeFile(resolve(tempDir, fileName.replace(/\.ts$/, ".js")), output.outputText, "utf8");
};

const tempDir = resolve(tmpdir(), `nextbci-top-company-research-${Date.now()}-${Math.random().toString(36).slice(2)}`);
await mkdir(tempDir, { recursive: true });
let data;
try {
  await Promise.all([
    "schema.ts",
    "sourced-expansion.ts",
    "africa-south-america-expansion.ts",
    "seed-data.ts",
    "company-research.ts",
    "top-company-milestones.ts",
    "europe-evidence.ts"
  ].map((fileName) => transpile(fileName, tempDir)));
  const requireFromTemp = createRequire(resolve(tempDir, "research.cjs"));
  data = {
    seed: requireFromTemp("./seed-data.js"),
    research: requireFromTemp("./company-research.js"),
    target: requireFromTemp("./top-company-milestones.js")
  };
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const fdaAliases = {
  "medtronic-neuromodulation": "Medtronic",
  "abbott-neuromodulation": "Abbott",
  "boston-scientific-neuromodulation": "Boston Scientific",
  "neuropace-rns": "NeuroPace",
  cochlear: "Cochlear",
  "advanced-bionics": "Advanced Bionics",
  "med-el": "MED-EL",
  insightec: "Insightec",
  brainsway: "BrainsWay",
  livanova: "LivaNova",
  magventure: "MagVenture",
  "magnus-medical": "Magnus Medical",
  nexstim: "Nexstim",
  neuronetics: "Neuronetics",
  neuroelectrics: "Neuroelectrics",
  "flow-neuroscience": "Flow Neuroscience",
  "sooma-medical": "Sooma",
  "inner-cosmos": "Inner Cosmos",
  "setpoint-medical": "SetPoint Medical",
  "saluda-medical": "Saluda Medical",
  "cala-health": "Cala Health",
  electrocore: "electroCore",
  cefaly: "CEFALY",
  theranica: "Theranica",
  neuspera: "Neuspera",
  "nalu-medical": "Nalu Medical",
  "mainstay-medical": "Mainstay Medical",
  "neuroone-medical": "NeuroOne Medical Technologies",
  neurovalens: "Neurovalens",
  "uneeg-medical": "UNEEG Medical",
  epiminder: "Epiminder",
  epitel: "Epitel",
  ceribell: "Ceribell",
  brainscope: "BrainScope",
  braincheck: "BrainCheck",
  "beacon-biosignals": "Beacon Biosignals",
  empatica: "Empatica",
  "aural-analytics": "Aural Analytics",
  altoida: "Altoida",
  cognoa: "Cognoa",
  brainomix: "Brainomix",
  "firefly-neuroscience": "Firefly Neuroscience",
  "artiria-medical": "Artiria Medical",
  "zeta-surgical": "Zeta Surgical",
  brainlab: "Brainlab",
  cionic: "Cionic",
  mindmaze: "MindMaze",
  ottobock: "Ottobock",
  neurosigma: "NeuroSigma",
  "nia-therapeutics": "Nia Therapeutics",
  carthera: "Carthera"
};

const sleep = (milliseconds) => new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));
const fetchJson = async (url) => {
  const cachePath = resolve(cacheDir, `${createHash("sha256").update(url).digest("hex")}.json`);
  try { return JSON.parse(await readFile(cachePath, "utf8")); } catch { /* cache miss */ }
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "NextBCI evidence research (contact: local catalog maintainer)" },
        signal: AbortSignal.timeout(30_000)
      });
      if (response.status === 404) return { results: [], studies: [] };
      if (response.status === 429 || response.status >= 500) {
        await sleep(Math.max(Number(response.headers.get("retry-after") ?? 0) * 1000, attempt * 2_000));
        continue;
      }
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const payload = await response.json();
      await writeFile(cachePath, `${JSON.stringify(payload)}\n`, "utf8");
      return payload;
    } catch (error) {
      lastError = error;
      await sleep(attempt * 1_500);
    }
  }
  throw lastError ?? new Error(`Unable to fetch ${url}`);
};

const companyBySlug = new Map(data.seed.companies.map((company) => [company.slug, company]));
const profileBySlug = new Map(data.research.companyResearchProfiles.map((profile) => [profile.companySlug, profile]));
const existingMilestonesBySlug = Map.groupBy(data.seed.milestones, (milestone) => milestone.companySlug);
const targets = data.target.topCompanyMilestoneSlugs.map((slug, index) => {
  const company = companyBySlug.get(slug);
  if (!company || company.kind !== "company") throw new Error(`Top-company target is missing or not commercial: ${slug}`);
  return { rank: index + 1, slug, company };
});

let cursor = 0;
const records = [];
const worker = async () => {
  while (cursor < targets.length) {
    const target = targets[cursor++];
    const alias = fdaAliases[target.slug];
    const trialQuery = encodeURIComponent(target.company.name.replace(/\s*\/.*$/, "").replace(/\s*\(.*$/, ""));
    const clinicalTrials = await fetchJson(`https://clinicaltrials.gov/api/v2/studies?query.spons=${trialQuery}&pageSize=100&format=json`);
    let clearances = [];
    let approvals = [];
    if (alias) {
      const encodedAlias = encodeURIComponent(`\"${alias}\"`);
      const [clearancePayload, approvalPayload] = await Promise.all([
        fetchJson(`https://api.fda.gov/device/510k.json?search=applicant:${encodedAlias}&sort=decision_date:desc&limit=100`),
        fetchJson(`https://api.fda.gov/device/pma.json?search=applicant:${encodedAlias}&sort=decision_date:desc&limit=100`)
      ]);
      clearances = clearancePayload.results ?? [];
      approvals = approvalPayload.results ?? [];
    }
    records.push({
      rank: target.rank,
      slug: target.slug,
      name: target.company.name,
      existingMilestones: existingMilestonesBySlug.get(target.slug) ?? [],
      profileAccomplishments: profileBySlug.get(target.slug)?.reportedAccomplishments ?? [],
      clinicalTrials: clinicalTrials.studies ?? [],
      fda510k: clearances,
      fdaPma: approvals
    });
    await sleep(600);
  }
};

await Promise.all(Array.from({ length: 4 }, worker));
records.sort((a, b) => a.rank - b.rank);
const outputPath = resolve(cacheDir, "candidates.json");
await writeFile(outputPath, `${JSON.stringify({ researchedOn: "2026-08-02", records }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  targets: records.length,
  alreadyCovered: records.filter((record) => record.existingMilestones.length).length,
  withTrials: records.filter((record) => record.clinicalTrials.length).length,
  with510k: records.filter((record) => record.fda510k.length).length,
  withPma: records.filter((record) => record.fdaPma.length).length,
  withProfileAccomplishments: records.filter((record) => record.profileAccomplishments.length).length
}, null, 2));
