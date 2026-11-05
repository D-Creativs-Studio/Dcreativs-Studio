import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CircleAlert,
  CodeXml,
  Cpu,
  FileText,
  Gem,
  LayoutDashboard,
  Layers,
  Lightbulb,
  Navigation,
  Package,
  Palette,
  PenTool,
  Scissors,
  Shapes,
  Shirt,
  ShoppingBag,
  Smile,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import { getPortfolioByCategory } from "@/data/portfolioData";
import { SEO } from "@/components/common/SEO";

// Icon for each project section heading (matched case-insensitively by title)
const sectionIcons = {
  "the problem": CircleAlert,
  "the solution": Lightbulb,
  "design approach": PenTool,
  "interface features": LayoutDashboard,
  "our philosophy": Gem,
  "the collections": ShoppingBag,
  "the digital atelier": Scissors,
  "technical specification": Cpu,
  "a directional identity": Navigation,
  "colour & typography": Palette,
  "brand applications": Package,
  "a character-led brand": Smile,
  "from pattern to apparel": Shirt,
  "how it works": Workflow,
  "design and development": CodeXml,
  "business value": TrendingUp,
};
const iconFor = (title) => sectionIcons[title.trim().toLowerCase()] || FileText;

// Brand-purple icon chip used beside section headings
function IconChip({ icon: Icon, size = "md" }) {
  const box = size === "sm" ? "h-7 w-7 rounded-lg" : "h-10 w-10 sm:h-11 sm:w-11 rounded-xl";
  const glyph = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center bg-[#4100F5]/10 text-[#4100F5] ${box}`}>
      <Icon className={glyph} strokeWidth={1.9} />
    </span>
  );
}

export function ProjectDetailPage() {
  const { categoryId, projectId } = useParams();
  const category = getPortfolioByCategory(categoryId);
  const projectIndex = category?.caseStudies.findIndex((study) => study.id === projectId) ?? -1;
  const project = projectIndex >= 0 ? category.caseStudies[projectIndex] : undefined;
  // Next project in the same category (none after the last one)
  const nextProject = project ? category.caseStudies[projectIndex + 1] : undefined;

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

        {/* Mobile & tablet: a second page of the live site, captured at phone size */}
        {project.introImage && (
          <figure className="mb-12 sm:mb-16 lg:hidden">
            <div className="relative w-full max-w-[420px] mx-auto aspect-[390/844] overflow-hidden bg-[#EDEDEA] border border-black/10">
              <img
                src={project.introImage}
                alt={project.introImageAlt || project.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            {project.introImageCaption && (
              <figcaption className="mt-3 max-w-[420px] mx-auto text-sm text-slate-500">{project.introImageCaption}</figcaption>
            )}
          </figure>
        )}

        {/* Desktop: a second page of the live site, captured at desktop size */}
        {project.introImageDesktop && (
          <figure className="mb-16 hidden lg:block">
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EDEDEA] border border-black/10">
              <img
                src={project.introImageDesktop}
                alt={project.introImageAlt?.replace("on mobile", "on desktop") || project.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            {project.introImageCaption && (
              <figcaption className="mt-3 text-sm text-slate-500">{project.introImageCaption.replace("mobile view", "desktop view")}</figcaption>
            )}
          </figure>
        )}

        {/* Video projects: playable film at its true proportions (landscape or vertical reel) */}
        {project.video && (
          <figure className="mb-12 sm:mb-16">
            <div
              className={`relative mx-auto overflow-hidden border border-black/10 bg-black ${
                project.videoOrientation === "portrait" ? "w-full max-w-[420px] aspect-[9/16]" : "w-full aspect-video"
              }`}
            >
              <video
                src={project.video}
                poster={project.image}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
                aria-label={`${project.title} video`}
              />
            </div>
          </figure>
        )}

        <figure className={`mb-12 sm:mb-16 ${project.video || project.introImageDesktop ? "hidden" : project.introImage ? "hidden lg:block" : ""}`}>
          <img src={project.image} alt={project.imageAlt || project.title} loading="lazy" decoding="async" className={`block w-full h-auto rounded-2xl sm:rounded-3xl border border-black/10 ${project.imageCaption ? "max-h-[680px] object-contain bg-white" : ""}`} />
          {project.imageCaption && <figcaption className="mt-3 text-sm text-slate-500">{project.imageCaption}</figcaption>}
        </figure>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-16 items-start">
          <div className="min-w-0 space-y-10">
            {project.sections?.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 flex items-center gap-3 sm:gap-4 font-heading text-2xl sm:text-3xl font-bold">
                  <IconChip icon={iconFor(section.title)} />
                  {section.title}
                </h2>
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
              <h2 className="mb-2 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-widest text-[#4100F5]">
                <IconChip icon={project.audience ? Users : Building2} size="sm" />
                {project.audience ? "Built for" : "Client"}
              </h2>
              <p className="font-semibold">{project.audience || project.client}</p>
            </div>
            {project.metrics && <p className="text-sm leading-relaxed text-slate-700">{project.metrics}</p>}
            <div>
              <h2 className="mb-3 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-widest text-[#4100F5]">
                <IconChip icon={Layers} size="sm" />
                Tech & Deliverable Scope
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => <li key={tag} className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-700">{tag}</li>)}
              </ul>
            </div>
            {project.modelId && <Link to={`/works/${category.slug}#case-studies`} className="inline-flex items-center gap-2 text-[#4100F5] text-sm font-semibold">Explore the 3D showroom<ArrowUpRight className="w-4 h-4" /></Link>}
          </aside>
        </div>
        {project.boardImage && (
          <section className="mt-14 sm:mt-20" aria-label={`${project.client} brand presentation`}>
            <h2 className="mb-6 flex items-center gap-3 sm:gap-4 font-heading text-2xl sm:text-3xl font-bold">
              <IconChip icon={Shapes} />
              The Identity in Detail
            </h2>
            <figure>
              <img src={project.boardImage} alt={project.boardAlt} loading="lazy" decoding="async" className="block w-full h-auto rounded-2xl border border-black/10" />
              {project.credit && <figcaption className="mt-4 text-sm text-slate-600">{project.credit}</figcaption>}
            </figure>
          </section>
        )}

        {nextProject && (
          <nav aria-label="Next project" className="mt-20 sm:mt-28 pt-10 sm:pt-12 border-t border-black/10">
            <Link
              to={`/works/${category.slug}/${nextProject.id}`}
              className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_480px] gap-6 lg:gap-12 items-end"
            >
              <div className="min-w-0">
                <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#4100F5]">Next project</p>
                <h2 className="mt-3 flex items-center gap-3 sm:gap-5 font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#030412] group-hover:text-[#4100F5] transition-colors duration-300">
                  <span className="min-w-0">{nextProject.title}</span>
                  <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
                </h2>
                {nextProject.type && <p className="mt-3 text-slate-600 text-base sm:text-lg">{nextProject.type}</p>}
              </div>

              <div className={`relative w-full overflow-hidden bg-[#EDEDEA] border border-black/10 ${nextProject.cardImage ? "aspect-[4/5] sm:aspect-[3/2] lg:aspect-[16/10]" : "aspect-[16/10]"}`}>
                <picture>
                  {nextProject.cardImageDesktop && <source media="(min-width: 1024px)" srcSet={nextProject.cardImageDesktop} />}
                  <img
                    src={nextProject.cardImage || nextProject.image}
                    alt={nextProject.imageAlt || nextProject.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full ${nextProject.imageFit === "contain" && !nextProject.cardImage ? "object-contain" : "object-cover"} object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]`}
                  />
                </picture>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
