import { stat } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const limits = [
  { path: ".next/server/app/index.html", limit: 120_000, label: "homepage HTML" },
  { path: ".next/server/app/index.rsc", limit: 80_000, label: "homepage React payload" },
  { path: ".next/server/app/map.html", limit: 30_000, label: "map route HTML shell" },
  { path: ".next/server/app/map.rsc", limit: 20_000, label: "map route React shell" }
];

const format = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const failures = [];

for (const item of limits) {
  const size = (await stat(resolve(projectRoot, item.path))).size;
  console.log(`${item.label}: ${format(size)} (limit ${format(item.limit)})`);
  if (size > item.limit) failures.push(`${item.label} is ${format(size)}, above the ${format(item.limit)} limit`);
}

if (failures.length) {
  console.error("First-load size check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("First-load size check passed.");
