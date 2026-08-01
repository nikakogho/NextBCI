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

const tempDir = join(tmpdir(), `nextbci-regional-audit-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const modulePath = join(tempDir, "africa-south-america-expansion.mjs");
let organizations;
try {
  await mkdir(tempDir, { recursive: true });
  await writeFile(modulePath, transpiled.outputText, "utf8");
  ({ africaSouthAmericaOrganizations: organizations } = await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`));
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

const targets = organizations.flatMap((organization) => {
  const paper = organization.sourceLinks.find((source) => source.sourceType === "paper" && source.isPrimary);
  const registry = organization.sourceLinks.find((source) => source.publisher === "Research Organization Registry");
  return [
    { kind: "institution", name: organization.name, url: organization.website },
    { kind: "paper", name: organization.name, url: paper.url },
    { kind: "registry", name: organization.name, url: registry.url }
  ];
});
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
      lastResult = { ...target, status: response.status, finalUrl: response.url };
      if (response.status < 500) return lastResult;
    } catch (error) {
      lastResult = { ...target, status: "ERR", error: String(error.cause?.code ?? error.message) };
    }
    if (attempt === 0) await new Promise((resolveDelay) => setTimeout(resolveDelay, 750));
  }
  return lastResult;
};

const worker = async () => {
  while (cursor < uniqueTargets.length) results.push(await audit(uniqueTargets[cursor++]));
};
await Promise.all(Array.from({ length: 10 }, worker));

const unavailable = (result) => result.status === "ERR" || Number(result.status) >= 500 || [404, 410].includes(Number(result.status));
const evidenceFailures = results.filter((result) => result.kind !== "institution" && unavailable(result));
const institutionUnavailable = results.filter((result) => result.kind === "institution" && unavailable(result));
const accessLimited = results.filter((result) => [401, 403, 429].includes(Number(result.status)));
console.log(JSON.stringify({
  checked: results.length,
  organizations: organizations.length,
  institutionSites: new Set(targets.filter((target) => target.kind === "institution").map((target) => target.url)).size,
  papers: new Set(targets.filter((target) => target.kind === "paper").map((target) => target.url)).size,
  registries: new Set(targets.filter((target) => target.kind === "registry").map((target) => target.url)).size,
  evidenceFailures,
  institutionUnavailable: institutionUnavailable.map(({ name, url, status, error }) => ({ name, url, status, ...(error ? { error } : {}) })),
  accessLimited: accessLimited.map(({ kind, name, url, status }) => ({ kind, name, url, status }))
}, null, 2));

if (evidenceFailures.length) process.exit(1);
