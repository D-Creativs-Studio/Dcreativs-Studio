import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Clapperboard,
  CodeXml,
  Megaphone,
  MousePointerClick,
  Palette,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { teamMembers } from "@/data/teamData";
import { servicesData } from "@/data/servicesData";
import { webDevelopmentCategory } from "@/data/webDevelopmentData";

/* ─────────────────────────────────────────────────────────────────
   About page — structure modelled on anakle.com/studio, with
   D'Creativs tweaks: animated title, team strip, ghost-word reveal,
   services index, mission band and a scroll-linked featured project.
   ───────────────────────────────────────────────────────────────── */

const EASE_OUT = [0.16, 1, 0.3, 1];

// Icon for each service in the "What we do" index
const serviceIcons = {
  "brand-design": Palette,
  "web-app-development": CodeXml,
  "ui-ux-design": MousePointerClick,
  "motion-video": Clapperboard,
  "3d-visual-fx": Box,
  "social-marketing": Megaphone,
  "ai-automations": Workflow,
};
const WIPE_EASE = [0.44, 0, 0.56, 1];
const gutter = "px-[clamp(1rem,4vw,5rem)]";
// Rounded pill buttons, same style as the portfolio / service pages
const primaryBtn =
  "inline-flex w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_8px_25px_rgba(65,0,245,0.25)] transition-all duration-300 hover:scale-105 hover:from-[#5212FF] hover:to-[#9f7dff] hover:shadow-[0_12px_30px_rgba(65,0,245,0.35)]";
const secondaryBtn =
  "inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#4100F5]/20 bg-white px-6 py-3.5 font-heading text-sm font-semibold text-[#030412] shadow-sm transition-all duration-300 hover:border-[#4100F5]/40 hover:bg-[#F3F0FF] hover:text-[#4100F5]";
// Section heading size used across the site
const sectionTitle = "font-heading text-3xl sm:text-5xl font-extrabold tracking-tight";

const featuredProject = webDevelopmentCategory.caseStudies.find((p) => p.id === "web-1");

const principles = [
  {
    number: "1",
    text: "Purpose over decoration. We create work that goes beyond aesthetics — every project starts with the problem it needs to solve.",
  },
  {
    number: "2",
    text: "Creative and technical, in one room. Designers, developers and strategists shape the work together, so nothing feels disconnected.",
  },
  {
    number: "3",
    text: "Curiosity, then precision. We explore every challenge with an open mind, then deliver with care and attention to detail.",
  },
  {
    number: "4",
    text: "Built for what comes next. We don't just create for today — we build work that keeps growing with your business.",
  },
];

const mission = [
  { lead: "Make creativity", key: "more powerful." },
  { lead: "Make technology", key: "more accessible." },
  { lead: "Make innovation", key: "more meaningful." },
];

/* ── Title: letters rise from below a clipped edge, one after another ── */
function RiseTitle({ lines, accentLine }) {
  const reduce = useReducedMotion();
  let index = 0;
  return (
    <h1 className="font-heading font-black leading-tight tracking-tight text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl">
      {lines.map((line, lineIndex) => {
        const chars = [...line];
        const accent = lineIndex === accentLine;
        return (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          {chars.map((char, charIndex) => {
            const delay = 0.15 + index++ * 0.045;
            // Each letter carries its own slice of one continuous purple gradient
            const accentStyle = accent
              ? {
                  backgroundImage: "linear-gradient(90deg,#4100F5,#885FFF)",
                  backgroundSize: `${chars.length * 100}% 100%`,
                  backgroundPosition: `${(charIndex / Math.max(chars.length - 1, 1)) * 100}% 0`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }
              : undefined;
            return (
              <motion.span
                key={`${line}-${index}`}
                style={accentStyle}
                className="inline-block will-change-transform"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay, ease: EASE_OUT }}
              >
                {char === " " ? " " : char}
              </motion.span>
            );
          })}
        </span>
        );
      })}
    </h1>
  );
}

/* ── Statement: words start as faint ghosts and light up in a scattered
      order as you scroll — the pieces come together into one sentence ── */
function GhostWord({ word, progress, range, accent }) {
  const color = useTransform(progress, range, ["#D9D0FF", "#030412"]);
  const opacity = useTransform(progress, range, [0.35, 1]);
  return (
    <motion.span
      style={accent ? { opacity } : { color }}
      className={accent ? "bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent" : ""}
    >
      {word}{" "}
    </motion.span>
  );
}

function ScrollStatement({ text, accents }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  // Deterministic "random" reveal order so the effect is identical on every visit
  const thresholds = useMemo(() => {
    const order = words.map((_, i) => i).sort((a, b) => ((a * 7919) % 31) - ((b * 7919) % 31) || a - b);
    const rank = new Array(words.length);
    order.forEach((wordIndex, r) => (rank[wordIndex] = r));
    return rank.map((r) => {
      const start = (r / words.length) * 0.8;
      return [start, start + 0.2];
    });
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <p
      ref={ref}
      className="font-heading font-bold tracking-tight text-2xl sm:text-4xl leading-[1.2] text-[#030412] max-w-[26ch] sm:max-w-[32ch] lg:max-w-[36ch]"
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^a-z]/gi, "").toLowerCase();
        const accent = accents.includes(clean);
        if (reduce) {
          return (
            <span key={i} className={accent ? "text-[#4100F5]" : ""}>
              {word}{" "}
            </span>
          );
        }
        return <GhostWord key={i} word={word} progress={scrollYProgress} range={thresholds[i]} accent={accent} />;
      })}
    </p>
  );
}

/* ── Image wipe used for team portraits (same reveal as the works list) ── */
function Wipe({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 1.1, delay, ease: WIPE_EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── Fade-up for text blocks ── */
function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

/* ── Featured project: giant marquee moves with scroll, phone drifts across ── */
function FeaturedProject() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineA = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const lineB = useTransform(scrollYProgress, [0, 1], ["-45%", "0%"]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const words = Array.from({ length: 6 }, () => "Featured Project.");

  return (
    <section
      ref={ref}
      aria-labelledby="featured-heading"
      className="relative flex min-h-[700px] flex-col justify-center overflow-hidden py-24 sm:min-h-[820px] sm:py-32"
    >
      <h2 id="featured-heading" className="sr-only">Featured project: {featuredProject.title}</h2>
      <div aria-hidden="true" className="select-none font-heading font-black tracking-[-0.04em] leading-none whitespace-nowrap">
        <motion.div style={reduce ? undefined : { x: lineA }} className="text-[clamp(3.2rem,9vw,8rem)] text-[#030412]">
          {words.join(" ")}
        </motion.div>
        <motion.div
          style={reduce ? undefined : { x: lineB }}
          className="mt-2 text-[clamp(3.2rem,9vw,8rem)] text-transparent [-webkit-text-stroke:1.5px_rgba(65,0,245,0.22)]"
        >
          {words.join(" ")}
        </motion.div>
      </div>

      <Link
        to={`/works/web-development/${featuredProject.id}`}
        className="group absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        aria-label={`View featured project: ${featuredProject.title}`}
      >
        <motion.div
          style={reduce ? undefined : { y: phoneY, rotate: phoneRotate }}
          className="mx-auto w-[42vw] max-w-[230px] sm:max-w-[260px] rounded-[2.2rem] bg-[#0b0b10] p-2.5 shadow-[0_40px_80px_-20px_rgba(3,4,18,0.55)]"
        >
          <div className="relative aspect-[390/844] overflow-hidden rounded-[1.7rem] bg-black">
            <img
              src={featuredProject.cardImage}
              alt={`${featuredProject.title} website on mobile`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </div>
        </motion.div>
        <span className="mx-auto mt-5 flex w-[80vw] max-w-sm flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-heading text-sm font-semibold text-[#030412]">
          {featuredProject.title} <span className="font-normal text-[#4100F5]">· {featuredProject.type}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </section>
  );
}

export function AboutPage() {
  return (
    <div className="bg-[#F8F8F6] text-[#030412] selection:bg-[#4100F5] selection:text-white">
      <SEO
        title="About Our Creative Technology Studio"
        description="D'Creativs is a creative technology studio bringing together creativity, strategy, design, and technology to help brands stand out, connect with their audiences, and grow with purpose."
      />

      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className={`${gutter} pt-32 sm:pt-40 pb-16 sm:pb-24`}>
        <div className="site-container mx-auto">
          <p className="mb-6 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#4100F5]">About D’Creativs</p>
          <RiseTitle lines={["We are", "D’Creativs."]} accentLine={1} />

          <div className="mt-12 sm:mt-16 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4 flex flex-col justify-end order-2 lg:order-1">
              <p className="max-w-[16rem] font-body text-sm leading-relaxed text-[#030412]/80">
                Have an idea worth building? We’d love to hear about it.
              </p>
              <Link to="/contact" className={`group mt-4 ${primaryBtn}`}>
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-6 order-1 lg:order-2">
              <p className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#4100F5]">
                Creativity meets intelligent innovation.
              </p>
              <div className="mt-5 space-y-5 font-body text-base sm:text-lg leading-relaxed text-[#030412]/80">
                <p>
                  D’Creativs is a creative technology studio transforming ideas into meaningful digital experiences. From
                  compelling brand identities and engaging digital content to high-performing websites and intelligent
                  AI-powered solutions, we create work that goes beyond aesthetics.
                </p>
                <p>
                  Our multidisciplinary team combines creative thinking with technical expertise to deliver solutions
                  tailored to every client — whether we’re shaping a brand from the ground up, developing digital
                  experiences, or automating complex workflows.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. Team strip (our take on Anakle's group photo) ─── */}
      <section aria-labelledby="team-heading" className={`${gutter} pb-20 sm:pb-28`}>
        <div className="site-container mx-auto">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 id="team-heading" className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#4100F5]">
              The people behind the work
            </h2>
          </div>

          <div className="-mx-[clamp(1rem,4vw,5rem)] px-[clamp(1rem,4vw,5rem)] flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-x-4 lg:gap-y-8 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {teamMembers.map((member, i) => (
              <figure key={member.id} className="group shrink-0 snap-start w-[62vw] sm:w-[38vw] lg:w-auto">
                <Wipe delay={i * 0.08} className="relative aspect-[3/4] overflow-hidden bg-[#E9E8E3]">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                  ) : (
                    // Photo coming soon: brand gradient tile with initials
                    <div
                      role="img"
                      aria-label={`${member.name} (photo coming soon)`}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#4100F5] via-[#2a0f8f] to-[#0a0624]"
                    >
                      <span className="font-heading text-5xl font-black tracking-tight text-white/90">{member.initials}</span>
                    </div>
                  )}
                </Wipe>
                <figcaption className="mt-3">
                  <p className="font-heading text-sm font-bold leading-snug">{member.name.split(" ").slice(0, 2).join(" ")}</p>
                  <p className="mt-0.5 font-body text-xs leading-snug text-[#4100F5]">{member.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <Link to={{ pathname: "/", hash: "#team" }} className={`group mt-8 ${secondaryBtn}`}>
            Full team details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── 3. Statement: the pieces come together ─────────────── */}
      <section className={`${gutter} py-20 sm:py-32`}>
        <div className="site-container mx-auto lg:pl-[16%]">
          <ScrollStatement
            text="We bring together creativity, strategy, design, and technology to help brands stand out, connect with their audiences, and grow with purpose."
            accents={["creativity", "strategy", "design", "technology"]}
          />
        </div>
      </section>

      {/* ── 4. What we do: services index ───────────────────── */}
      <section aria-labelledby="services-heading" className={`${gutter} py-16 sm:py-24`}>
        <div className="site-container mx-auto">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="services-heading" className={sectionTitle}>What we do.</h2>
            <p className="max-w-sm font-body text-sm leading-relaxed text-[#030412]/80">
              Seven disciplines under one roof, so your brand, product and the work behind them move as one.
            </p>
          </div>
          <ul className="border-b border-[#4100F5]/15">
            {servicesData.map((service) => {
              const Icon = serviceIcons[service.slug] || Sparkles;
              return (
              <li key={service.slug} className="border-t border-[#4100F5]/15">
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 py-5 sm:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#4100F5]/[0.08] text-[#4100F5] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#4100F5] group-hover:to-[#885FFF] group-hover:text-white"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                  </span>
                  <span className="font-heading text-xl sm:text-3xl font-bold tracking-tight transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-[#4100F5]">
                    {service.text}
                  </span>
                  <span className="flex items-center gap-6">
                    <span className="hidden xl:block font-body text-sm text-[#4100F5]/70">{service.tags.slice(0, 3).join(" · ")}</span>
                    <span className="pointer-events-none hidden lg:block absolute right-16 top-1/2 h-24 w-36 -translate-y-1/2 overflow-hidden opacity-0 [clip-path:inset(0_100%_0_0)] transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0%_0_0)]">
                      <img src={service.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#885FFF] transition-all duration-300 group-hover:rotate-45 group-hover:text-[#4100F5]" />
                  </span>
                </Link>
              </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── 5. Principles: sticky label, scrolling list ─────────── */}
      <section aria-labelledby="principles-heading" className={`${gutter} py-20 sm:py-32`}>
        <div className="site-container mx-auto grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 flex flex-col gap-6 lg:min-h-[60vh] lg:justify-between">
              <h2 id="principles-heading" className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#4100F5]">
                Our Principles.
              </h2>
              <div className="hidden lg:block">
                <p className="max-w-[16rem] font-body text-sm leading-relaxed text-[#030412]/80">
                  If this sounds like how you want to work, let’s build something together.
                </p>
                <Link to="/contact" className={`group mt-4 ${primaryBtn}`}>
                  Work with us <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6 space-y-16 sm:space-y-24">
            {principles.map((item) => (
              <Reveal key={item.number} as="li" className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-2">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-[#C4B5FD]">{item.number}/</span>
                <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-[1.25] tracking-tight">{item.text}</p>
              </Reveal>
            ))}
          </ol>
          <Link to="/contact" className={`group lg:hidden ${primaryBtn}`}>
            Work with us <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── 6. Mission band ─────────────────────────────────── */}
      <section aria-labelledby="mission-heading" className={`${gutter} relative overflow-clip bg-[#030412] py-24 sm:py-36 text-white`}>
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#4100F5]/25 blur-[140px]" />
        <div className="site-container relative mx-auto">
          <h2 id="mission-heading" className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#B7A2FF]">
            Our mission is simple
          </h2>
          <div className="mt-8 space-y-2 sm:space-y-3">
            {mission.map((line, i) => (
              <Reveal key={line.key} delay={i * 0.12}>
                <p className="font-heading font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-5xl lg:text-6xl">
                  <span className="text-[#A78BFA]">{line.lead} </span>
                  <span className="bg-gradient-to-r from-white to-[#B7A2FF] bg-clip-text text-transparent">{line.key}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Story + education (our take on Anakle's careers block) ── */}
      <section aria-labelledby="story-heading" className={`${gutter} py-20 sm:py-32`}>
        <div className="site-container mx-auto grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 id="story-heading" className={sectionTitle}>Where we started.</h2>
            <div className="mt-6 space-y-5 font-body text-base sm:text-lg leading-relaxed text-[#030412]/80">
              <p>
                D’Creativs grew out of TechRise Cohort 2, where our founding team brought together skills in design,
                development, and marketing.
              </p>
              <p>
                We work across those disciplines so your website, brand, and customer journey can be considered
                together. The project scope determines which skills are involved.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className={sectionTitle}>Beyond client work.</h2>
            <div className="mt-6 space-y-5 font-body text-base sm:text-lg leading-relaxed text-[#030412]/80">
              <p>
                We’re passionate about empowering the next generation of digital creators through practical technology
                education — helping people turn their curiosity into skills, and their skills into opportunities.
              </p>
              <p>
                Every project is an opportunity to solve problems, unlock possibilities, and build something that makes a
                lasting impact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. Featured project ─────────────────────────────── */}
      <FeaturedProject />

      {/* ── 9. Closing line ─────────────────────────────────── */}
      <section className={`${gutter} pt-10 pb-20 sm:pb-28`}>
        <div className="site-container mx-auto border-t border-[#4100F5]/15 pt-16 sm:pt-24">
          <Reveal>
            <p className="max-w-[22ch] font-heading font-extrabold tracking-tight leading-[1.15] text-3xl sm:text-5xl text-[#030412]">
              We don’t just create for today.{" "}
              <span className="bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">We build for what comes next.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 10. Call to action — same navy as the footer so the two flow together ── */}
      <section aria-labelledby="about-cta-heading" className={`${gutter} relative overflow-clip bg-[#000422] pt-24 pb-20 sm:pt-32 sm:pb-28 text-white`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#4100F5]/30 blur-[150px]" />
          <div className="absolute -right-24 top-1/4 h-[300px] w-[300px] rounded-full bg-[#885FFF]/12 blur-[130px]" />
        </div>
        <div className="site-container relative mx-auto flex flex-col items-center text-center">
          <Reveal>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]">Let’s build together</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-cta-heading" className="mt-5 max-w-[20ch] font-heading text-3xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight">
              Have an idea worth building?{" "}
              <span className="bg-gradient-to-r from-[#C4B5FD] to-[#885FFF] bg-clip-text text-transparent">Let’s make it impossible to ignore.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl font-body text-base sm:text-lg leading-relaxed text-[#C4B5FD]">
              Tell us what you want to create or improve. We’ll shape the scope, timeline and next steps with you before you commit.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={primaryBtn}>
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/works"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#C4B5FD]/40 px-6 py-3.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:border-[#C4B5FD]/70 hover:bg-white/10"
            >
              See our work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="mailto:dcreativs.studio@gmail.com" className="mt-6 inline-block font-body text-sm text-[#A78BFA] underline-offset-4 hover:text-white hover:underline">
              or email dcreativs.studio@gmail.com
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
