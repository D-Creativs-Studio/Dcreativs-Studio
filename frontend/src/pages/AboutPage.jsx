import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "@/components/common/SEO";
import {
  ArrowRight,
  Palette,
  Code2,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  Compass,
  Zap,
  Target,
  ShieldCheck,
} from "lucide-react";

export function AboutPage() {
  const coreStats = [
    {
      value: "8",
      label: "Founding Builders",
      desc: "TechRise Cohort 2 team united under one vision",
    },
    {
      value: "1 Roof",
      label: "Design • Dev • Marketing",
      desc: "Zero vendor juggling, complete end-to-end execution",
    },
    {
      value: "50+",
      label: "Projects Shipped",
      desc: "Built to perform, scale, and earn customer trust",
    },
    {
      value: "100%",
      label: "Client Alignment",
      desc: "Honest timelines, clear communication & lasting impact",
    },
  ];

  const pillars = [
    {
      id: "01",
      icon: Palette,
      title: "Design",
      tagline: "Instant Recognition",
      description:
        "Brand identity, UI/UX, and visual systems that make a business instantly recognizable and unforgettable.",
      badge: "Visual Systems",
      color: "#c084fc",
      glow: "rgba(192, 132, 252, 0.15)",
    },
    {
      id: "02",
      icon: Code2,
      title: "Development",
      tagline: "Built for Performance",
      description:
        "Websites and web applications built for speed, responsiveness, and conversion — not just surface appearance.",
      badge: "Full-Stack Tech",
      color: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.15)",
    },
    {
      id: "03",
      icon: TrendingUp,
      title: "Marketing",
      tagline: "Visibility into Growth",
      description:
        "Content strategy, video editing, and brand positioning that commands attention and turns visibility into measurable growth.",
      badge: "Growth & Content",
      color: "#fb923c",
      glow: "rgba(251, 146, 60, 0.15)",
    },
    {
      id: "04",
      icon: GraduationCap,
      title: "Academy",
      tagline: "Next-Gen Builders",
      description:
        "Beyond client work, D'Creativs runs training programs and workshops teaching practical design, code, and marketing skills to future builders.",
      badge: "Empowerment",
      color: "#2dd4bf",
      glow: "rgba(45, 212, 191, 0.15)",
    },
  ];

  const workPrinciples = [
    {
      title: "Clear Communication & Honest Timelines",
      description:
        "No guesswork, zero vendor chaos. We keep communication open, direct, and transparent at every milestone.",
      icon: Target,
    },
    {
      title: "Built to Last, Not Just to Launch",
      description:
        "We engineer scalable architectures, clean design systems, and maintainable codebases that grow with your company.",
      icon: ShieldCheck,
    },
    {
      title: "Impact Over Fleeting Trends",
      description:
        "We don't chase trends for the sake of hype. We design and engineer what actually moves your bottom line forward.",
      icon: Zap,
    },
  ];

  const teamCapabilities = [
    "Product Design",
    "Full-Stack Development",
    "3D & Motion Graphics",
    "Brand Strategy & Identity",
    "Conversion Optimization",
    "Interactive WebGL",
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-[#030412] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden selection:bg-[#4100F5] selection:text-white">
      <SEO
        title="About Us — The Creative Tech Studio"
        description="Learn about D'Creativs Studio — a team of multidisciplinary builders combining UI/UX design, full-stack development, 3D motion, and brand strategy under one roof."
      />
      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-[#4100F5]/[0.05] rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-5 w-[500px] h-[500px] bg-[#885FFF]/[0.05] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-40 left-1/4 w-[600px] h-[600px] bg-[#38bdf8]/[0.04] rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-[#030412] leading-[1.08] mb-8"
          >
            We build things people{" "}
            <span className="bg-gradient-to-r from-[#4100F5] via-[#6833FF] to-[#885FFF] bg-clip-text text-transparent">
              actually stop for.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 font-body text-lg sm:text-2xl leading-relaxed font-normal"
          >
            D&apos;Creativs is a creative tech agency built by a team of eight,
            brought together through the{" "}
            <span className="font-semibold text-[#030412]">
              TechRise Cohort 2
            </span>{" "}
            program. We combine design, development, and marketing under one
            roof so brands can grow without juggling five different vendors.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24"
        >
          {coreStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#4100F5]/30 hover:shadow-[0_8px_30px_rgba(65,0,245,0.08)] transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#4100F5] mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-heading font-bold text-[#030412] mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-body leading-snug">
                {stat.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Section: Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-black/[0.08] bg-white/90 backdrop-blur-sm p-6 sm:p-10 lg:p-14 mb-20 sm:mb-24 shadow-[0_8px_40px_rgba(0,0,0,0.03)]"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#030412] leading-tight">
                No templates. No guesswork. Just builders who care.
              </h2>

              <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
                We started as a group of builders who believed brands deserve
                more than cookie-cutter templates and guesswork. Today,
                D&apos;Creativs is a full-service creative tech studio helping
                business owners and organizations show up online with clarity
                and confidence.
              </p>

              <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
                Our team spans product design, full-stack development, 3D and
                motion, and brand marketing, giving every project the depth and
                range it needs from initial concept to global launch.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#F8F8F6] rounded-2xl p-6 sm:p-8 border border-black/[0.06] space-y-4">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#4100F5]">
                <Compass className="w-4 h-4" />
                <span>Multidisciplinary Range</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {teamCapabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-heading font-semibold text-slate-800 bg-white px-3.5 py-2.5 rounded-xl border border-black/[0.06] shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4100F5] shrink-0" />
                    <span>{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section: What We Do (4 Pillars) */}
        <div className="mb-20 sm:mb-24">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#030412] tracking-tight">
              Everything your brand needs to scale.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#4100F5]/40 hover:shadow-[0_12px_36px_rgba(65,0,245,0.08)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-6">
                      <div
                        className="w-8 h-8 min-[390px]:w-10 min-[390px]:h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${pillar.color}20` }}
                      >
                        <Icon
                          className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 sm:w-6 sm:h-6"
                          style={{ color: pillar.color }}
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400">
                        {pillar.id}
                      </span>
                    </div>

                    <div className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-0.5 sm:mb-1 line-clamp-1">
                      {pillar.tagline}
                    </div>

                    <h3 className="text-base min-[390px]:text-lg sm:text-2xl font-heading font-extrabold text-[#030412] mb-1.5 sm:mb-3 group-hover:text-[#4100F5] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-slate-600 font-body text-[11px] min-[390px]:text-xs sm:text-sm leading-relaxed mb-3 sm:mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[10px] min-[390px]:text-[11px] sm:text-xs font-heading font-semibold text-slate-500">
                      {pillar.badge}
                    </span>
                    <span className="text-[#4100F5] text-xs sm:text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section: How We Work */}
        <div className="mb-20 sm:mb-24">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#030412] tracking-tight mb-4">
              We treat every brand like it&apos;s ours.
            </h2>
            <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
              That means clear communication, honest timelines, and work that&apos;s
              built to last, not just to launch. We don&apos;t chase trends for the sake of it;
              we build what actually moves a business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workPrinciples.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-7 border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#4100F5]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#4100F5]/10 flex items-center justify-center mb-5 text-[#4100F5]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#030412] mb-2.5">
                    {principle.title}
                  </h3>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Our Promise & Final Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[#030412] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_20px_60px_rgba(3,4,18,0.25)] text-center"
        >
          {/* Ambient inner glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#4100F5]/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#885FFF]/25 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
              Dare to be noticed.
            </h2>

            <p className="text-slate-300 font-body text-base sm:text-xl leading-relaxed font-light max-w-2xl mx-auto">
              Whether you&apos;re a startup finding your voice or an established
              brand ready for a refresh, D&apos;Creativs gives you the creative
              and technical firepower to stand out.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 bg-[#4100F5] hover:bg-[#5212FF] text-white font-heading font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_24px_rgba(65,0,245,0.4)] hover:shadow-[0_8px_32px_rgba(65,0,245,0.6)] hover:-translate-y-0.5 active:scale-95"
              >
                <span>Start a Project With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/#portfolio"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View Selected Work</span>
              </Link>
            </div>

            <div className="pt-8 text-xs font-mono text-slate-500 uppercase tracking-widest border-t border-white/10">
              D&apos;Creativs Technologies • Creative Tech Studio
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
