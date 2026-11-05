import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonialsData";

/* ─────────────────────────────────────────────────────────────────
   Client reflections — modelled on anakle.com's testimonial slider:
   one large quote at a time, round prev/next arrows, a big faint
   index number. D'Creativs tweaks: brand navy + lavender, words rise
   in one by one, gentle autoplay (pauses on hover/focus), swipe and
   arrow-key support, and dots on mobile.
   ───────────────────────────────────────────────────────────────── */

const EASE_OUT = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 11000; // long quotes need time to be read

// "NG" -> 🇳🇬 (regional indicator symbols)
const flagFor = (code) =>
  code && /^[A-Za-z]{2}$/.test(code)
    ? String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)))
    : "";

function QuoteWords({ text, reduce }) {
  const words = `“${text}”`.split(" ");
  // Keep the whole rise under ~1s whatever the quote length
  const step = Math.min(0.025, 0.9 / words.length);
  return words.map((word, i) => (
    // indent-0: text-indent is inherited into inline-blocks, which would shift and clip each word
    <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom indent-0">
      <motion.span
        className="inline-block indent-0"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.7, delay: 0.1 + i * step, ease: EASE_OUT }}
      >
        {word}
        {i < words.length - 1 ? " " : ""}
      </motion.span>
    </span>
  ));
}

export function Testimonials() {
  const entries = testimonials;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef(null);
  const total = entries.length;

  const go = useCallback((dir) => setIndex((i) => (i + dir + total) % total), [total]);

  // Gentle autoplay — off for reduced motion, while hovered/focused, or with one quote
  useEffect(() => {
    if (reduce || paused || total < 2) return undefined;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduce, total, go]);

  if (!total) return null;
  const entry = entries[index];
  const credit = [entry.role, entry.company].filter(Boolean).join(" · ") || entry.context;
  const roundBtn =
    "inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#C4B5FD]/30 bg-white/[0.04] text-[#C4B5FD] transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-[#4100F5] hover:to-[#885FFF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4B5FD]";

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-clip bg-[#000422] py-24 text-white sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#4100F5]/15 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#885FFF]/10 blur-[130px]" />

      <div className="relative px-[clamp(1rem,4vw,5rem)]">
        <div className="site-container mx-auto">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">Client reflections</p>
            <h2 id="testimonials-heading" className="font-heading text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
              The experience, <span className="bg-gradient-to-r from-[#C4B5FD] to-[#885FFF] bg-clip-text text-transparent">in their words.</span>
            </h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-[#C4B5FD]/80">
              Honest impressions from the teams we’ve worked with across brand, web and automation.
            </p>
          </div>

          {/* Slider */}
          <div
            className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* Left: arrows, counter, big index */}
            <div className="flex items-center justify-between lg:col-span-3 lg:flex-col lg:items-start">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={roundBtn}>
                  <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={roundBtn}>
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
              <span
                aria-hidden="true"
                className="select-none font-heading text-[clamp(3.5rem,8vw,7.5rem)] font-black leading-none tracking-tight text-[#C4B5FD]/10"
              >
                /{index + 1}
              </span>
            </div>

            {/* Right: one quote at a time */}
            <div
              className="min-h-[31rem] touch-pan-y sm:min-h-[26rem] lg:min-h-[24rem] lg:col-span-9"
              aria-live={paused ? "polite" : "off"}
              onPointerDown={(e) => (pointerStart.current = e.clientX)}
              onPointerUp={(e) => {
                if (pointerStart.current == null) return;
                const dx = e.clientX - pointerStart.current;
                pointerStart.current = null;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={entry.id}
                  initial={reduce ? false : { opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.25 } }}
                >
                  <blockquote className="indent-[8%] font-heading text-xl font-semibold leading-[1.35] tracking-tight sm:text-2xl lg:text-[2rem] lg:leading-[1.3]">
                    <QuoteWords text={entry.quote} reduce={reduce} />
                  </blockquote>
                  <motion.figcaption
                    className="mt-10"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
                  >
                    <p className="font-heading text-base font-bold">{entry.name}</p>
                    <p className="mt-1 font-body text-sm text-[#C4B5FD]">
                      {credit} {flagFor(entry.country)}
                    </p>
                  </motion.figcaption>
                </motion.figure>
              </AnimatePresence>

              {/* Mobile / tablet dots */}
              {total > 1 && (
                <div className="mt-10 flex items-center gap-2 lg:hidden">
                  {entries.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show testimonial ${i + 1} of ${total}`}
                      aria-current={i === index ? "true" : undefined}
                      className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gradient-to-r from-[#4100F5] to-[#885FFF]" : "w-2 bg-[#C4B5FD]/30"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
