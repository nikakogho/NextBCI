"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProgramRow } from "@/data/queries";
import { companyCategories, deviceTypes, organizationScales, productReadiness, regions } from "@/data/schema";

const CATEGORY_OPTIONS = Object.entries(companyCategories) as Array<[string, string]>;
const REGION_OPTIONS = Object.entries(regions) as Array<[string, string]>;
const DEVICE_OPTIONS = Object.entries(deviceTypes) as Array<[string, string]>;
const SCALE_OPTIONS = Object.entries(organizationScales) as Array<[string, string]>;
const READINESS_OPTIONS = Object.entries(productReadiness) as Array<[string, string]>;

export function ProgramExplorer({ programs }: { programs: ProgramRow[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [deviceType, setDeviceType] = useState("all");
  const [scale, setScale] = useState("all");
  const [readiness, setReadiness] = useState("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return programs.filter((program) => {
      if (kind !== "all" && program.kind !== kind) return false;
      if (category !== "all" && program.category !== category) return false;
      if (region !== "all" && program.region !== region) return false;
      if (deviceType !== "all" && !program.deviceTypes.includes(deviceType as never)) return false;
      if (scale !== "all" && program.organizationScale !== scale) return false;
      if (readiness !== "all" && program.readiness !== readiness) return false;
      if (!needle) return true;

      const haystack = [
        program.name,
        program.city,
        program.country,
        program.stage,
        program.categoryLabel,
        program.regionLabel,
        program.organizationKindLabel,
        program.organizationScaleLabel,
        program.readinessLabel,
        program.deviceTypeLabels.join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return needle.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [programs, query, kind, category, region, deviceType, scale, readiness]);

  const activeFilterCount = [kind, category, region, deviceType, scale, readiness].filter((value) => value !== "all").length;
  const clearFilters = () => {
    setKind("all");
    setCategory("all");
    setRegion("all");
    setDeviceType("all");
    setScale("all");
    setReadiness("all");
  };

  return (
    <section className="explorer" aria-label="Explore organizations and research programs">
      <div className="explorer-search-row">
        <label className="explorer-search-field">
          <span className="sr-only">Search organizations and research programs</span>
          <input
            placeholder="Search organizations, conditions, devices, or places"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {activeFilterCount > 0 ? (
          <button className="btn btn-ghost btn-sm" type="button" onClick={clearFilters}>
            Clear {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"}
          </button>
        ) : null}
      </div>

      <div className="explorer-filters" aria-label="Organization filters">
        <label>
          <span>Organization</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="all">All organizations</option>
            <option value="company">Companies</option>
            <option value="academic">University research</option>
          </select>
        </label>
        <label>
          <span>Invasiveness</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All approaches</option>
            {CATEGORY_OPTIONS.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Region</span>
          <select value={region} onChange={(event) => setRegion(event.target.value)}>
            <option value="all">All regions</option>
            {REGION_OPTIONS.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Device class</span>
          <select value={deviceType} onChange={(event) => setDeviceType(event.target.value)}>
            <option value="all">All device classes</option>
            {DEVICE_OPTIONS.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Organization profile</span>
          <select value={scale} onChange={(event) => setScale(event.target.value)}>
            <option value="all">All profiles</option>
            {SCALE_OPTIONS.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Readiness</span>
          <select value={readiness} onChange={(event) => setReadiness(event.target.value)}>
            <option value="all">All readiness levels</option>
            {READINESS_OPTIONS.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count">
        {filtered.length} of {programs.length} tracked organizations and research programs
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">No tracked organization matches those terms and filters.</div>
      ) : (
        <div className="explorer-grid">
          {filtered.map((program) => (
            <Link className="explorer-card" href={`/companies/${program.slug}`} key={program.slug}>
              <div className="explorer-card-head">
                <span className="organization-kind" data-kind={program.kind}>{program.organizationKindLabel}</span>
                <span className={`badge ev ev-${program.evidenceLevel}`}>{program.evidenceLevel}</span>
              </div>
              <h3>{program.name}</h3>
              <p className="explorer-location">{program.city}, {program.country}</p>
              <p className="explorer-stage">{program.stage}</p>
              <div className="explorer-facets">
                <span>{program.categoryLabel}</span>
                <span>{program.organizationScaleLabel}</span>
                <span>{program.readinessLabel}</span>
                {program.deviceTypeLabels.slice(0, 2).map((label) => <span key={label}>{label}</span>)}
              </div>
              <div className="explorer-card-foot">
                <span>{program.stats.milestones} milestones</span>
                <span>{program.stats.projects} projects</span>
                <span>{program.stats.papers} papers</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
