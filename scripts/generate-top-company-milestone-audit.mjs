import { createRequire } from "node:module";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import tsModule from "typescript";

const ts = tsModule.default ?? tsModule;
const projectRoot = resolve(import.meta.dirname, "..");
const tempDir = join(tmpdir(), `nextbci-top-company-doc-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const files = ["schema.ts", "sourced-expansion.ts", "africa-south-america-expansion.ts", "top-company-milestones.ts", "seed-data.ts"];

await mkdir(tempDir, { recursive: true });
try {
  for (const fileName of files) {
    const sourcePath = join(projectRoot, "data", fileName);
    const sourceText = await readFile(sourcePath, "utf8");
    const output = ts.transpileModule(sourceText, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
      fileName: sourcePath,
      reportDiagnostics: true
    });
    await writeFile(join(tempDir, fileName.replace(/\.ts$/, ".js")), output.outputText, "utf8");
  }

  const requireFromTemp = createRequire(join(tempDir, "doc-generator.cjs"));
  const { topCompanyMilestoneSlugs, topCompanyMilestones } = requireFromTemp("./top-company-milestones.js");
  const { companies, milestones } = requireFromTemp("./seed-data.js");
  const companyBySlug = new Map(companies.map((company) => [company.slug, company]));
  const addedIds = new Set(topCompanyMilestones.map((milestone) => milestone.id));
  const baseMilestones = milestones.filter((milestone) => !addedIds.has(milestone.id));
  const baseBySlug = Map.groupBy(baseMilestones, (milestone) => milestone.companySlug);
  const addedBySlug = Map.groupBy(topCompanyMilestones, (milestone) => milestone.companySlug);
  const already = topCompanyMilestoneSlugs.filter((slug) => baseBySlug.has(slug)).length;
  const upcoming = topCompanyMilestones.filter((milestone) => milestone.status === "upcoming").length;
  const escape = (value) => value.replaceAll("|", "/");
  const rows = topCompanyMilestoneSlugs.map((slug, index) => {
    const company = companyBySlug.get(slug);
    const before = baseBySlug.get(slug) ?? [];
    const added = addedBySlug.get(slug) ?? [];
    const source = (added[0] ?? before[0])?.sourceLinks.find((link) => link.isPrimary) ?? (added[0] ?? before[0])?.sourceLinks[0];
    const sourceCell = source ? `[${escape(source.publisher)}](${source.url})` : "—";
    return `| ${index + 1} | ${escape(company.name)} | ${before.length ? "Yes" : "No"} | ${added.length} | ${added.filter((item) => item.status === "upcoming").length} | ${sourceCell} |`;
  });

  const markdown = `# Top 100 company milestone audit

Audited on 2026-08-02. This is a deliberately curated prominence cohort, not a claim that fame can be measured objectively. Ranking weights broad industry recognition, demonstrated human or clinical activity, regulatory and commercial maturity, longevity, and importance as BCI or neurotechnology infrastructure. It favors evidence-rich organizations while retaining several widely recognized consumer and research-platform companies.

## Result

- Cohort: exactly 100 commercial organizations already present in the catalog.
- Covered before this audit: ${already}.
- Previously without any tracker milestone: ${100 - already}.
- New evidence records added: ${topCompanyMilestones.length} (${topCompanyMilestones.length - upcoming} confirmed and ${upcoming} upcoming).
- Coverage after this audit: 100 of 100 companies have at least one rendered milestone.

FDA database decisions and ClinicalTrials.gov records are treated as primary regulator or registry evidence. Peer-reviewed papers are used where they directly cover the company's system. Company pages are kept at E1 unless a stronger source independently supports the claim. Estimated completion dates are rendered as upcoming watch points, never as promised readouts.

## Company-by-company coverage

| Rank | Company | Covered before | Added records | Upcoming | Representative primary evidence |
|---:|---|---:|---:|---:|---|
${rows.join("\n")}

## Evidence boundaries

- FDA 510(k), De Novo, and PMA records establish the regulator decision and its labeled scope; they do not establish superiority.
- A registered, active, or completed trial is not a positive result. Registry completion windows may move, and completed studies may never post results.
- Breakthrough Device designation is an expedited interaction pathway, not authorization to market.
- Company-reported implants, shipments, launches, and acquisitions remain E1 unless paired with a registry, regulator record, or paper.
- Consumer EEG, EMG, sleep, and wellness products are not presented as medical BCIs unless the cited regulator record supports that use.
- The Cortical Labs record is a cultured-neuron laboratory result, not evidence of human cognition or consciousness.
- Apollo's 2026 sleep analysis is described as observational and company-reported because the linked manuscript was presented as a preprint at audit time.

## Reproduction

Run \`npm run research:top-company-milestones\` to refresh the durable ClinicalTrials.gov/openFDA candidate cache, \`npm run generate:top-company-audit\` to rebuild this table, and \`npm run validate:data\` to enforce the 100-company coverage and 18/82 reconciliation.
`;

  await writeFile(join(projectRoot, "docs", "top-100-company-milestone-audit.md"), markdown, "utf8");
  console.log(`Wrote top-100 audit: ${already} already covered, ${100 - already} newly covered, ${topCompanyMilestones.length} added records.`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
