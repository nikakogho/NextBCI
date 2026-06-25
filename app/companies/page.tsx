import { CompanyCard } from "@/components/CompanyCard";
import { PageHeader } from "@/components/PageHeader";
import { SampleNotice } from "@/components/SampleNotice";
import { companies } from "@/data/queries";

export default function CompaniesPage() {
  return (
    <div className="page-shell page-stack">
      <PageHeader
        eyebrow="Tracked programs"
        title="Companies and labs"
        description="A focused list of serious clinical, implantable, and translational BCI programs with modality, target function, stage, and evidence level."
      />
      <SampleNotice />
      <section className="card-grid">
        {companies.map((company) => (
          <CompanyCard company={company} key={company.slug} />
        ))}
      </section>
    </div>
  );
}
