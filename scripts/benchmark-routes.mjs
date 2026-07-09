const baseUrl = (process.env.BENCHMARK_BASE_URL ?? process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const sampleCount = Number.parseInt(process.env.BENCHMARK_SAMPLES ?? "5", 10);

const paths = [
  "/",
  "/milestones",
  "/milestones/paradromics-first-connect-one-implant-2026",
  "/companies",
  "/trials",
  "/demos",
  "/images/neocortex-field.webp",
  "/images/neocortex-card.webp"
];

if (!Number.isInteger(sampleCount) || sampleCount < 1) {
  console.error("BENCHMARK_SAMPLES must be a positive integer.");
  process.exit(1);
}

const formatMs = (value) => `${value.toFixed(1)}ms`;
const formatBytes = (value) => (value >= 1024 ? `${(value / 1024).toFixed(1)}KB` : `${value}B`);

const fetchSample = async (path) => {
  const url = `${baseUrl}${path}`;
  const start = performance.now();
  const response = await fetch(url, { cache: "no-store" });
  const body = await response.arrayBuffer();

  return {
    bytes: body.byteLength,
    durationMs: performance.now() - start,
    status: response.status
  };
};

const summarize = (samples) => {
  const durations = samples.map((sample) => sample.durationMs);
  const avg = durations.reduce((total, value) => total + value, 0) / durations.length;

  return {
    avg,
    bytes: samples.at(-1)?.bytes ?? 0,
    max: Math.max(...durations),
    min: Math.min(...durations),
    status: samples.at(-1)?.status ?? 0
  };
};

console.log(`Benchmarking ${baseUrl} with ${sampleCount} sample${sampleCount === 1 ? "" : "s"} per path.`);
console.log("Path                                      Status  Avg       Min       Max       Bytes");
console.log("--------------------------------------------------------------------------------------");

for (const path of paths) {
  const samples = [];

  try {
    for (let index = 0; index < sampleCount; index += 1) {
      samples.push(await fetchSample(path));
    }
  } catch (error) {
    console.error(`\nCould not benchmark ${path}. Is the local server running at ${baseUrl}?`);
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  const summary = summarize(samples);
  const line = [
    path.padEnd(41),
    String(summary.status).padEnd(7),
    formatMs(summary.avg).padEnd(9),
    formatMs(summary.min).padEnd(9),
    formatMs(summary.max).padEnd(9),
    formatBytes(summary.bytes)
  ].join(" ");

  console.log(line);

  if (summary.status >= 400) {
    process.exitCode = 1;
  }
}
