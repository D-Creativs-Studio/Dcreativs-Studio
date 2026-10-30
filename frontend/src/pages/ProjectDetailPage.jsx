import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getPortfolioByCategory } from "@/data/portfolioData";
import { SEO } from "@/components/common/SEO";

export function ProjectDetailPage() {
  const { categoryId, projectId } = useParams();
  const category = getPortfolioByCategory(categoryId);
  const project = category?.caseStudies.find((study) => study.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] text-[#030412] px-6 pt-36 pb-24">
        <SEO title="Project not found" description="This portfolio project could not be found." />
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl font-bold mb-6">Project not found</h1>
          <p className="text-slate-600 mb-8">This project link may be incorrect or no longer available.</p>
          <Link to={category ? `/works/${category.slug}` : "/works"} className="inline-flex items-center gap-2 text-[#4100F5] font-semibold">
            <ArrowLeft className="w-4 h-4" />Back to {category ? category.name : "All Work"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#F8F8F6] text-[#030412] px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 pb-24">
      <SEO
        title={`${project.title} — Project`}
        description={project.description}
        image={project.image.startsWith("http") ? project.image : `https://dcreativs.com${project.image}`}
      />
      <div className="site-container mx-auto">
        <Link to={`/works/${category.slug}#case-studies`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#4100F5] mb-10">
          <ArrowLeft className="w-4 h-4" />Back to {category.name}
        </Link>

        <header className="max-w-4xl mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#4100F5] mb-4">
            {project.type}{project.year ? ` · ${project.year}` : ""}
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">{project.title}</h1>
          <p className="text-slate-600 text-base sm:text-xl leading-relaxed max-w-3xl">{project.description}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            {project.presentationUrl && (
              <a href={project.presentationUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.client} brand presentation PDF (opens in a new tab)`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4100F5]/30 text-[#4100F5] hover:bg-[#4100F5]/5 text-sm font-semibold">
                View Brand Presentation (PDF)<ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.previewUrl && (
              <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.previewLabel || "Live Preview"}: ${project.title} (opens in a new tab)`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4100F5]/30 text-[#4100F5] hover:bg-[#4100F5]/5 text-sm font-semibold">
                {project.previewLabel || "Live Preview"}<ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4100F5] hover:bg-[#5212FF] text-white text-sm font-semibold">
              {project.ctaLabel || "Inquire Similar"}<ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <figure className="mb-12 sm:mb-16">
          <img src={project.image} alt={project.imageAlt || project.title} className={`block w-full h-auto rounded-2xl sm:rounded-3xl border border-black/10 ${project.imageCaption ? "max-h-[680px] object-contain bg-white" : ""}`} />
          {project.imageCaption && <figcaption className="mt-3 text-sm text-slate-500">{project.imageCaption}</figcaption>}
        </figure>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-16 items-start">
          <div className="min-w-0 space-y-10">
            {project.sections?.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">{section.title}</h2>
                {section.body && <p className="text-slate-700 text-base sm:text-lg leading-relaxed">{section.body}</p>}
                {section.steps && (
                  <ol className="list-decimal pl-6 space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                    {section.steps.map((step) => <li key={step} className="pl-2">{step}</li>)}
                  </ol>
                )}
              </section>
            ))}
            {project.highlight && (
              <div className="flex items-start gap-3 p-6 rounded-2xl bg-white border border-black/10">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#4100F5] mt-0.5" />
                <p className="font-semibold leading-relaxed">{project.highlight}</p>
              </div>
            )}
            {project.secondaryCtaLabel && (
              <Link to="/#contact" className="inline-flex items-center gap-2 text-[#4100F5] font-semibold underline underline-offset-4">
                {project.secondaryCtaLabel}<ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <aside className="rounded-2xl border border-black/10 bg-white p-6 space-y-7">
            <div>
              <h2 className="font-heading text-xs uppercase tracking-widest text-slate-500 mb-2">{project.audience ? "Built for" : "Client"}</h2>
              <p className="font-semibold">{project.audience || project.client}</p>
            </div>
            {project.metrics && <p className="text-sm leading-relaxed text-slate-700">{project.metrics}</p>}
            <div>
              <h2 className="font-heading text-xs uppercase tracking-widest text-slate-500 mb-3">Tech & Deliverable Scope</h2>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => <li key={tag} className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-700">{tag}</li>)}
              </ul>
            </div>
            {project.modelId && <Link to={`/works/${category.slug}#case-studies`} className="inline-flex items-center gap-2 text-[#4100F5] text-sm font-semibold">Explore the 3D showroom<ArrowUpRight className="w-4 h-4" /></Link>}
          </aside>
        </div>
        {project.boardImage && (
          <section className="mt-14 sm:mt-20" aria-label={`${project.client} brand presentation`}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6">The Identity in Detail</h2>
            <figure>
              <img src={project.boardImage} alt={project.boardAlt} loading="lazy" decoding="async" className="block w-full h-auto rounded-2xl border border-black/10" />
              {project.credit && <figcaption className="mt-4 text-sm text-slate-600">{project.credit}</figcaption>}
            </figure>
          </section>
        )}
      </div>
    </article>
  );
}
