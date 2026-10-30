import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from 'lucide-react';
import { testimonials, sampleTestimonials } from '@/data/testimonialsData';

export function Testimonials() {
  const isPreview = testimonials.length === 0;
  const entries = isPreview ? (import.meta.env.DEV ? sampleTestimonials : []) : testimonials;
  if (!entries.length) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative overflow-hidden bg-[#000422] py-[clamp(3rem,5vw,4rem)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-0 h-80 w-80 rounded-full bg-[#4100F5]/10 blur-[100px]" />
      <div className="relative px-[clamp(1rem,4vw,4rem)]">
        <div className="site-container mx-auto">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">{isPreview ? 'Sample testimonials · layout preview' : 'Client experiences'}</p>
            <h2 id="testimonials-heading" className="text-balance font-heading text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">The experience,<br /><span className="text-[#C4B5FD]">in their words.</span></h2>
            {isPreview && <p className="mt-4 font-body text-sm leading-relaxed text-slate-400">Fictional names and quotes shown for design preview only.</p>}
          </div>
          <Link to="/works" className="inline-flex w-fit items-center gap-2 rounded-md font-heading text-sm font-semibold text-[#C4B5FD] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FD]">Explore our projects <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>

        </div>
      </div>

        <div className="testimonials-marquee relative" tabIndex={0} role="region" aria-label="Testimonials. Focus or hover to pause scrolling.">
          <div className="testimonials-track" style={{ '--testimonials-duration': `${entries.length * 8}s` }}>
          {[0, 1].map(copy => (
          <div key={copy} className="testimonials-group" aria-hidden={copy === 1 ? true : undefined}>
          {entries.map((entry, index) => (
            <figure key={entry.id} className={'testimonials-card flex flex-col rounded-3xl border p-6 sm:p-8 ' + (index % 3 === 0 ? 'border-[#885FFF]/35 bg-gradient-to-br from-[#4100F5]/25 to-[#885FFF]/10' : 'border-white/10 bg-white/[0.035]')}>
              <Quote aria-hidden="true" className="mb-6 h-7 w-7 text-[#A78BFA]" strokeWidth={1.5} />
              <blockquote className="flex-1 font-body text-base leading-relaxed text-slate-200">“{entry.quote}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#885FFF]/15 font-heading text-xs font-semibold text-[#C4B5FD]">{entry.name.split(/\s+/).slice(0, 2).map(word => word[0]).join('')}</span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold">{entry.name}</p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-slate-400">{entry.context}</p>
                </div>
              </figcaption>
            </figure>
          ))}
          </div>
          ))}
          </div>
        </div>
    </section>
  );
}
