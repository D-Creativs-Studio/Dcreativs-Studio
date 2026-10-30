import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { teamMembers } from "@/data/teamData";

export function TeamPage() {
  return (
    <div className="relative overflow-hidden bg-[#F8F8F6] px-4 pb-16 pt-28 text-[#030412] selection:bg-[#4100F5] selection:text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-12">
      <SEO title="Meet Our Team" description="Meet the people behind D'Creativs Studio and explore their skills in design, development, AI, content, and marketing." />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-16 h-[500px] w-[500px] rounded-full bg-[#885FFF]/[0.08] blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <Link to="/about" className="mb-8 inline-flex items-center gap-2 rounded-md font-heading text-sm font-semibold text-[#4100F5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#885FFF]">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> About the studio
          </Link>
          <p className="mb-5 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#4100F5]">The people behind the work</p>
          <h1 className="mb-6 text-balance font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Meet the <span className="bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">team.</span></h1>
          <p className="max-w-2xl font-body text-base leading-relaxed text-slate-600 sm:text-xl">Designers, developers, and strategists working together to help your business communicate clearly and build useful digital experiences.</p>
        </header>

        <section aria-label="Our team members" className="grid gap-6 md:grid-cols-2">
          {teamMembers.map(member => (
            <article key={member.id} className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white">
              <div className="relative overflow-hidden bg-[#F0EDF8]">
                <img src={member.image} alt={member.name} loading="lazy" decoding="async" width="640" height="560" style={{ objectPosition: member.imagePosition || "center top" }} className="aspect-[8/7] w-full object-cover" />
                <span aria-hidden="true" className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-xs text-[#4100F5]">{member.id}</span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-widest text-[#4100F5]">{member.discipline}</p>
                <h2 className="break-words font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">{member.name}</h2>
                <p className="mt-2 font-heading text-sm font-semibold text-[#4100F5]">{member.role}</p>
                <p className="mt-5 font-body text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <ul aria-label={`${member.firstName}'s skills`} className="mt-6 flex flex-wrap gap-2">
                  {member.skills.map(skill => <li key={skill} className="rounded-full bg-[#4100F5]/5 px-3 py-2 font-body text-xs text-[#4100F5]">{skill}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section aria-labelledby="team-contact-heading" className="mt-16 rounded-3xl bg-[#030412] px-6 py-10 text-white sm:mt-24 sm:p-12">
          <h2 id="team-contact-heading" className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Have a project in mind?</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-slate-300">Tell us what you want to build or improve. We can discuss the skills, scope, and next steps your project needs.</p>
          <Link to="/contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#4100F5] px-6 py-3.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#5212FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FD]">Discuss your project <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </section>
      </div>
    </div>
  );
}
