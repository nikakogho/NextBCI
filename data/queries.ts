import { companies, demos, milestones, papers, trials } from "./seed-data";
import {
  companyCategories,
  regions,
  type Company,
  type CompanyCategory,
  type Demo,
  type Milestone,
  type Paper,
  type Region,
  type SourceLink,
  type Trial
} from "./schema";

export { companies, demos, milestones, papers, trials };

export const regionLabel = (region: Region): string => regions[region];
export const categoryLabel = (category: CompanyCategory): string => companyCategories[category];

export const companyBySlug = new Map(companies.map((company) => [company.slug, company]));

export const getCompany = (slug: string): Company | undefined => companyBySlug.get(slug);

export const getCompanyName = (slug: string): string => getCompany(slug)?.name ?? "Unknown program";

export const milestoneById = new Map(milestones.map((milestone) => [milestone.id, milestone]));

export const getMilestone = (id: string): Milestone | undefined => milestoneById.get(id);

const descendingByDate = <T extends { sortDate: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => b.sortDate.localeCompare(a.sortDate));

const ascendingByDate = <T extends { sortDate: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.sortDate.localeCompare(b.sortDate));

export const confirmedMilestones = descendingByDate(
  milestones.filter((milestone) => milestone.status === "confirmed")
);

export const upcomingMilestones = ascendingByDate(
  milestones.filter((milestone) => milestone.status === "upcoming")
);

export const allMilestones = [
  ...upcomingMilestones,
  ...confirmedMilestones
];

export const nextMajorMilestone = upcomingMilestones[0];

export const getCompanyMilestones = (slug: string): Milestone[] =>
  allMilestones.filter((milestone) => milestone.companySlug === slug);

export const getCompanyTrials = (slug: string): Trial[] =>
  trials.filter((trial) => trial.companySlug === slug);

export const getCompanyDemos = (slug: string): Demo[] =>
  descendingByDate(demos.filter((demo) => demo.companySlug === slug));

export const getCompanyPapers = (slug: string): Paper[] =>
  descendingByDate(papers.filter((paper) => paper.companySlug === slug));

export const isYoutubeSource = (source: SourceLink): boolean =>
  source.sourceType === "demo-video" && /(^|\/\/)(www\.)?(youtube\.com|youtu\.be)\//i.test(source.url);

export const getYoutubeSource = (sources: SourceLink[]): SourceLink | undefined =>
  sources.find((source) => isYoutubeSource(source));

export const getPrimarySource = (sources: SourceLink[]): SourceLink | undefined =>
  sources.find((source) => source.isPrimary) ?? sources[0];

export interface CompanyStats {
  milestones: number;
  upcoming: number;
  trials: number;
  demos: number;
  papers: number;
  /** Raw weighted activity score. */
  score: number;
  /** Activity relative to the busiest program, 0..1. */
  heat: number;
}

const MONTH_MS = 1000 * 60 * 60 * 24 * 30.4;

const monthsAgo = (sortDate: string): number => {
  const then = new Date(`${sortDate}T00:00:00Z`).getTime();
  if (Number.isNaN(then)) return 999;
  return Math.max(0, (Date.now() - then) / MONTH_MS);
};

const rawActivityScore = (slug: string): number => {
  let score = 0;
  for (const milestone of milestones) {
    if (milestone.companySlug !== slug) continue;
    if (milestone.status === "upcoming") {
      score += 2;
    } else {
      // Recent confirmed milestones count for more.
      const age = monthsAgo(milestone.sortDate);
      score += age <= 18 ? 4 : age <= 36 ? 2 : 1;
    }
  }
  score += trials.filter((trial) => trial.companySlug === slug).length * 3;
  score += demos.filter((demo) => demo.companySlug === slug).length * 1.5;
  score += papers.filter((paper) => paper.companySlug === slug).length * 1;
  return score;
};

const activityScores = new Map(companies.map((company) => [company.slug, rawActivityScore(company.slug)]));
const maxActivity = Math.max(1, ...activityScores.values());

export const getCompanyStats = (slug: string): CompanyStats => {
  const companyMilestones = milestones.filter((milestone) => milestone.companySlug === slug);
  const score = activityScores.get(slug) ?? 0;
  return {
    milestones: companyMilestones.length,
    upcoming: companyMilestones.filter((milestone) => milestone.status === "upcoming").length,
    trials: trials.filter((trial) => trial.companySlug === slug).length,
    demos: demos.filter((demo) => demo.companySlug === slug).length,
    papers: papers.filter((paper) => paper.companySlug === slug).length,
    score,
    heat: score / maxActivity
  };
};

/** Activity heat (0..1) → warm-to-hot marker color. Hotter = more active. */
export const heatColor = (heat: number): string => {
  if (heat >= 0.75) return "#ff4d55"; // hot red
  if (heat >= 0.5) return "#ff8a3d"; // orange
  if (heat >= 0.28) return "#ffc24d"; // amber
  if (heat >= 0.12) return "#5fd0ff"; // cyan
  return "#5f7d99"; // quiet
};

export const heatLabel = (heat: number): string => {
  if (heat >= 0.75) return "Very active";
  if (heat >= 0.5) return "Active";
  if (heat >= 0.28) return "Moderate";
  if (heat >= 0.12) return "Emerging";
  return "Quiet";
};

export const companiesByActivity = [...companies].sort(
  (a, b) => (activityScores.get(b.slug) ?? 0) - (activityScores.get(a.slug) ?? 0)
);

export interface MapNodeData {
  slug: string;
  name: string;
  kind: Company["kind"];
  city: string;
  country: string;
  lat: number;
  lng: number;
  heat: number;
  heatColor: string;
  heatLabel: string;
  stage: string;
  evidenceLevel: string;
  stats: { milestones: number; upcoming: number; trials: number; demos: number; papers: number };
}

export interface ProgramRow {
  slug: string;
  name: string;
  kind: Company["kind"];
  category: CompanyCategory;
  categoryLabel: string;
  region: Region;
  regionLabel: string;
  city: string;
  country: string;
  stage: string;
  evidenceLevel: string;
  founded?: number;
  funding?: string;
  website?: string;
  heat: number;
  heatColor: string;
  heatLabel: string;
  stats: { milestones: number; upcoming: number; trials: number; demos: number; papers: number };
}

export const programRows: ProgramRow[] = companiesByActivity.map((company) => {
  const stats = getCompanyStats(company.slug);
  return {
    slug: company.slug,
    name: company.name,
    kind: company.kind,
    category: company.category,
    categoryLabel: categoryLabel(company.category),
    region: company.region,
    regionLabel: regionLabel(company.region),
    city: company.hq.city,
    country: company.hq.country,
    stage: company.stage,
    evidenceLevel: company.evidenceLevel,
    founded: company.founded,
    funding: company.funding,
    website: company.website,
    heat: stats.heat,
    heatColor: heatColor(stats.heat),
    heatLabel: heatLabel(stats.heat),
    stats: {
      milestones: stats.milestones,
      upcoming: stats.upcoming,
      trials: stats.trials,
      demos: stats.demos,
      papers: stats.papers
    }
  };
});

export type SearchKind = "program" | "milestone" | "trial" | "demo" | "paper";

export interface SearchItem {
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  /** Lowercased searchable blob. */
  text: string;
}

const blob = (...parts: Array<string | undefined>): string =>
  parts.filter(Boolean).join(" ").toLowerCase();

export const searchIndex: SearchItem[] = [
  ...companies.map((company): SearchItem => ({
    kind: "program",
    title: company.name,
    subtitle: `${categoryLabel(company.category)} · ${company.hq.city}, ${company.hq.country}`,
    href: `/companies/${company.slug}`,
    text: blob(
      company.name,
      company.slug,
      company.modality,
      company.targetFunction,
      company.stage,
      company.summary,
      company.hq.city,
      company.hq.country,
      categoryLabel(company.category),
      regionLabel(company.region)
    )
  })),
  ...milestones.map((milestone): SearchItem => ({
    kind: "milestone",
    title: milestone.title,
    subtitle: `${milestone.dateLabel} · ${getCompanyName(milestone.companySlug)}`,
    href: `/milestones/${milestone.id}`,
    text: blob(milestone.title, milestone.summary, getCompanyName(milestone.companySlug), milestone.dateLabel)
  })),
  ...trials.map((trial): SearchItem => ({
    kind: "trial",
    title: trial.title,
    subtitle: `${getCompanyName(trial.companySlug)} · ${trial.condition}`,
    href: `/companies/${trial.companySlug}`,
    text: blob(trial.title, trial.condition, trial.targetFunction, trial.deviceProduct, getCompanyName(trial.companySlug))
  })),
  ...demos.map((demo): SearchItem => ({
    kind: "demo",
    title: demo.title,
    subtitle: `${demo.dateLabel} · ${getCompanyName(demo.companySlug)}`,
    href: `/companies/${demo.companySlug}`,
    text: blob(demo.title, demo.summary, getCompanyName(demo.companySlug))
  })),
  ...papers.map((paper): SearchItem => ({
    kind: "paper",
    title: paper.title,
    subtitle: `${paper.dateLabel} · ${getCompanyName(paper.companySlug)}`,
    href: `/companies/${paper.companySlug}`,
    text: blob(paper.title, paper.summary, getCompanyName(paper.companySlug))
  }))
];

export const mapNodes: MapNodeData[] = companies.map((company) => {
  const stats = getCompanyStats(company.slug);
  return {
    slug: company.slug,
    name: company.name,
    kind: company.kind,
    city: company.hq.city,
    country: company.hq.country,
    lat: company.hq.lat,
    lng: company.hq.lng,
    heat: stats.heat,
    heatColor: heatColor(stats.heat),
    heatLabel: heatLabel(stats.heat),
    stage: company.stage,
    evidenceLevel: company.evidenceLevel,
    stats: {
      milestones: stats.milestones,
      upcoming: stats.upcoming,
      trials: stats.trials,
      demos: stats.demos,
      papers: stats.papers
    }
  };
});
