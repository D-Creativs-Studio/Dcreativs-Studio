import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { workingTogether } from "@/data/workingTogether";
import { teamMembers } from "@/data/teamData";
import { webDevelopmentCategory } from "@/data/webDevelopmentData";

const featuredProject = webDevelopmentCategory.caseStudies.find(project => project.id === "web-2");
const founders = teamMembers.filter(member => ["01", "02"].includes(member.id));
const primaryButton = "inline-flex items-center justify-center gap-2 rounded-full bg-[#4100F5] px-6 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#5212FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#885FFF]";
const secondaryButton = "inline-flex items-center justify-center gap-2 rounded-full border border-[#030412]/15 px-6 py-3.5 font-heading text-sm font-semibold text-[#030412] transition-colors hover:bg-[#4100F5]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#885FFF]";

export function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#F8F8F6] px-4 pb-16 pt-28 text-[#030412] selection:bg-[#4100F5] selection:text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-12">
      <SEO title="About Our Creative Technology Studio" description="Meet D'Creativs Studio, explore a website project, and see how we approach scope, feedback, and handover for your website or brand." />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-16 h-[500px] w-[500px] rounded-full bg-[#885FFF]/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-4xl sm:mb-20">
          <p className="mb-5 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#4100F5]">About D’Creativs Studio</p>
          <h1 className="mb-6 text-balance font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Help customers <span className="bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">understand your business.</span>
          </h1>
          <p className="max-w-2xl font-body text-base leading-relaxed text-slate-600 sm:text-xl">
            We build websites and brand identities that explain your offer and make it easy for customers to enquire.
            When repetitive work slows you down, we can also help connect your tools and automate the routine tasks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className={primaryButton}>Discuss your project <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            <a href="#project-example" className={secondaryButton}>See a project example <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>
          <p className="mt-4 font-body text-xs leading-relaxed text-slate-500">A short enquiry starts the conversation. Scope and next steps come before a commitment.</p>
        </header>

        <section id="project-example" aria-labelledby="project-heading" className="mb-16 scroll-mt-28 overflow-hidden rounded-3xl border border-black/[0.08] bg-white sm:mb-24">
          <div className="grid lg:grid-cols-2">
            <figure className="flex flex-col bg-[#EEEDE9]">
              <img src={featuredProject.image} alt={featuredProject.imageAlt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover lg:flex-1" />
              <figcaption className="px-5 py-3 font-body text-xs text-slate-600 sm:px-8">Project imagery · {featuredProject.title}</figcaption>
            </figure>
            <div className="p-6 sm:p-9 lg:p-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#4100F5]">A closer look · Hospitality website</p>
              <h2 id="project-heading" className="mb-6 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">{featuredProject.title}</h2>
              <div className="space-y-5 font-body text-sm leading-relaxed text-slate-600 sm:text-base">
                <div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-[#030412]">The problem</h3>
                  <p>{featuredProject.sections.find(section => section.title === "The Problem").body}</p>
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-[#030412]">The approach</h3>
                  <p>Bring accommodation, lifestyle services, and dining into one website, with photography to help visitors explore the spaces and clear links to an enquiry form.</p>
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-sm font-bold text-[#030412]">What visitors can do</h3>
                  <ul className="space-y-2">
                    {["Explore accommodation and shared spaces.", "Find the available stays and services in one place.", "Send an enquiry about a stay."].map(item => (
                      <li key={item} className="flex items-start gap-2"><CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#4100F5]" /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/[0.08] pt-5 font-heading text-sm font-semibold text-[#4100F5]">
                <Link to={"/works/web-development/" + featuredProject.id} className="inline-flex items-center gap-1.5 hover:underline">Read project notes <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                <a href={featuredProject.previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">Visit website <ArrowUpRight aria-hidden="true" className="h-4 w-4" /><span className="sr-only"> (opens in a new tab)</span></a>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="people-heading" className="mb-16 sm:mb-24">
          <div className="mb-8 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#4100F5]">The people behind the work</p>
              <h2 id="people-heading" className="text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">Different skills. A shared starting point.</h2>
            </div>
            <div className="space-y-4 font-body text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>D’Creativs grew out of TechRise Cohort 2, where our founding team brought together skills in design, development, and marketing.</p>
              <p>We work across those disciplines so your website, brand, and customer journey can be considered together. The project scope determines which skills are involved.</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {founders.map(member => (
              <article key={member.id} className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" width="88" height="88" className="h-20 w-20 shrink-0 rounded-2xl bg-[#F0EDF8] object-cover object-top sm:h-[88px] sm:w-[88px]" />
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-bold leading-snug">{member.name}</h3>
                    <p className="mt-1 font-body text-xs leading-relaxed text-[#4100F5]">{member.role}</p>
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed text-slate-600">{member.bio}</p>
              </article>
            ))}
          </div>
          <Link to="/#team" className="mt-6 inline-flex items-center gap-2 rounded-md font-heading text-sm font-semibold text-[#4100F5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#885FFF]">Meet the rest of the team <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </section>

        <section aria-labelledby="process-heading" className="mb-16 sm:mb-24">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#4100F5]">From conversation to handover</p>
            <h2 id="process-heading" className="mb-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">Know what happens next.</h2>
            <p className="font-body text-sm leading-relaxed text-slate-600 sm:text-base">We agree on the work before it starts, make room for your feedback, and define what you receive at the end.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {workingTogether.map((step, index) => (
              <article key={step.title} className="min-w-0 rounded-2xl border border-black/[0.08] bg-white p-4 last:col-span-2 sm:rounded-3xl sm:p-6 md:last:col-span-1 lg:p-8">
                <span aria-hidden="true" className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#4100F5]/10 font-mono text-xs text-[#4100F5] sm:mb-5 sm:h-10 sm:w-10 sm:text-sm">0{index + 1}</span>
                <h3 className="mb-2 font-heading text-sm font-bold leading-snug sm:text-lg">{step.title}</h3>
                <p className="font-body text-[13px] leading-relaxed text-slate-600 sm:text-sm">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-cta-heading" className="relative overflow-hidden rounded-3xl bg-[#030412] px-6 py-10 text-white sm:p-12 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#4100F5]/25 blur-[90px]" />
          <div className="relative max-w-2xl">
            <h2 id="about-cta-heading" className="mb-5 text-balance font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">What does your business need to do next?</h2>
            <p className="font-body text-sm leading-relaxed text-slate-300 sm:text-lg">Tell us what you want to build or improve. We’ll discuss whether we’re a fit and outline the scope and next steps before you decide to proceed.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className={primaryButton}>Discuss your project <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <Link to="/works/web-development" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FD]">Explore website projects</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
