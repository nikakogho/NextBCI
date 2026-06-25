import { companies, demos, milestones, papers, trials } from "./seed-data";
import type { Company, Demo, Milestone, Paper, Trial } from "./schema";

export { companies, demos, milestones, papers, trials };

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
