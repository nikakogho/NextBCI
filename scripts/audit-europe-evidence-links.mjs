import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const isUsScope = process.argv.includes("--scope=us");
const scopeKey = isUsScope ? "us" : "europe";
const exportPrefix = isUsScope ? "usEvidence" : "europeEvidence";
const scopeLabel = isUsScope ? "U.S." : "European";
const cacheDir = resolve(projectRoot, ".research-cache", `${scopeKey}-evidence`);
const tempDir = join(tmpdir(), `nextbci-${scopeKey}-links-${Date.now()}-${Math.random().toString(36).slice(2)}`);
await Promise.all([mkdir(cacheDir, { recursive: true }), mkdir(tempDir, { recursive: true })]);

let europe;
try {
  const sourcePath = resolve(projectRoot, "data", `${scopeKey}-evidence.ts`);
  const sourceText = await readFile(sourcePath, "utf8");
  const output = ts.transpileModule(sourceText, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: sourcePath,
    reportDiagnostics: true
  });
  await writeFile(resolve(tempDir, `${scopeKey}-evidence.js`), output.outputText, "utf8");
  europe = createRequire(resolve(tempDir, "audit.cjs"))(`./${scopeKey}-evidence.js`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const records = [
  ...europe[`${exportPrefix}Papers`],
  ...europe[`${exportPrefix}Trials`],
  ...europe[`${exportPrefix}Milestones`],
  ...europe[`${exportPrefix}Projects`]
];
const sourceOwners = new Map();
for (const record of records) {
  for (const source of record.sourceLinks) {
    const owners = sourceOwners.get(source.url) ?? [];
    owners.push({ id: record.id, companySlug: record.companySlug, title: source.title });
    sourceOwners.set(source.url, owners);
  }
}

const urls = [...sourceOwners.keys()];
const results = [];
let cursor = 0;
const worker = async () => {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    let result;
    try {
      const response = await fetch(url, {
        headers: { accept: "text/html,application/xhtml+xml,application/json", "user-agent": "NextBCI evidence link audit" },
        redirect: "follow",
        signal: AbortSignal.timeout(25_000)
      });
      result = {
        url,
        status: response.status,
        finalUrl: response.url,
        category: response.ok ? "reachable" : [401, 403, 405, 429].includes(response.status) ? "blocked" : [404, 410].includes(response.status) ? "hard-failure" : "other-http",
        owners: sourceOwners.get(url)
      };
      await response.body?.cancel();
    } catch (error) {
      result = { url, status: null, category: "network-error", error: String(error), owners: sourceOwners.get(url) };
    }
    results.push(result);
  }
};

await Promise.all(Array.from({ length: 8 }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));
await writeFile(resolve(cacheDir, "link-audit.json"), `${JSON.stringify({ auditedOn: "2026-08-03", results }, null, 2)}\n`, "utf8");

const counts = Object.fromEntries(Map.groupBy(results, (item) => item.category).entries().map(([key, items]) => [key, items.length]));
const externalVerificationNotes = new Map(isUsScope ? [] : [
  ["https://neuro.chat/en/", "Current official page was independently visible in the web index on 2026-08-03; the Node audit client could not complete its request."],
  ["https://spinallymedical.com/", "Current official under-construction page was independently visible in the web index on 2026-08-03; the Node audit client could not complete its request."],
  ["https://implex-medical.com/", "No current operating identity was corroborated. The rendered catalog record is intentionally E0 and warns that the domain and operations are unverified."]
]);
const exceptional = results.filter((item) => ["hard-failure", "network-error"].includes(item.category));
const markdown = `# ${scopeLabel} evidence source-link audit\n\n` +
  `Audited on 2026-08-03. This is a transport/reachability check of the unique source URLs introduced by the ${scopeLabel} evidence dataset; it is not a claim-quality score.\n\n` +
  `- Unique URLs checked: ${results.length}.\n` +
  `- Reachable: ${counts.reachable ?? 0}.\n` +
  `- Access-controlled or rate-limited (401/403/405/429): ${counts.blocked ?? 0}. These are not treated as broken links.\n` +
  `- Network/client failures: ${counts["network-error"] ?? 0}.\n` +
  `- Hard 404/410 failures: ${counts["hard-failure"] ?? 0}.\n\n` +
  `## Exceptions\n\n` +
  `| URL | Audit result | Disposition |\n|---|---|---|\n` +
  (exceptional.length
    ? exceptional.map((item) => `| ${item.url} | ${item.category}${item.status ? ` (${item.status})` : ""} | ${externalVerificationNotes.get(item.url) ?? "Requires follow-up."} |`).join("\n")
    : `| None | — | No hard or network failures. |`) +
  `\n\nThe full machine-readable result, including access-controlled sources, is written to \`.research-cache/${scopeKey}-evidence/link-audit.json\` during the audit and is intentionally not versioned.\n`;
await writeFile(resolve(projectRoot, "docs", isUsScope ? "us-evidence-link-audit.md" : "european-evidence-link-audit.md"), markdown, "utf8");
console.log(JSON.stringify({ urls: urls.length, ...counts }, null, 2));
for (const item of exceptional) {
  console.log(`${item.category}\t${item.status ?? ""}\t${item.url}\t${item.error ?? ""}`);
}
if (counts["hard-failure"]) process.exitCode = 1;
