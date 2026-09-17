import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { portfolioCategories, getPortfolioByCategory } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/common/SEO";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Send, 
  X 
} from "lucide-react";

export function PortfolioCategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const category = getPortfolioByCategory(categoryId);

  // Fallback if category not found
  if (!category) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] text-[#030412] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-heading font-extrabold mb-4 text-[#4100F5]">Portfolio Category Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md font-light">
          The requested portfolio category does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#4100F5] hover:bg-[#5212FF] text-white font-heading font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(65,0,245,0.25)]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // Next and Previous Categories
  const currentIndex = portfolioCategories.findIndex((c) => c.slug === category.slug);
  const prevCategory = portfolioCategories[(currentIndex - 1 + portfolioCategories.length) % portfolioCategories.length];
  const nextCategory = portfolioCategories[(currentIndex + 1) % portfolioCategories.length];

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-[#030412] pt-24 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <SEO
        title={`${category.name} — Portfolio`}
        description={category.shortDescription || category.heroSubtitle}
        image={category.image.startsWith("http") ? category.image : `https://dcreativs.vercel.app${category.image}`}
      />
      {/* ── Background Subtle Ambient Glows ─────────────────────── */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] bg-[#4100F5]/[0.06] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#885FFF]/[0.05] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#4100F5]/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-20">
        {/* ── Top Navigation Bar ────────────────────────────────── */}
        <div className="mb-6 sm:mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-4 sm:pb-6">
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-heading font-semibold text-[#030412] hover:text-[#4100F5] bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full backdrop-blur-md transition-all duration-300 group shadow-sm"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
            Back to Selected Work
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-heading font-semibold tracking-widest uppercase text-slate-500">
              Category {category.id} / 0{portfolioCategories.length}
            </span>
          </div>
        </div>

        {/* ── Hero Section ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#4100F5]"
            >
              {category.category}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl min-[375px]:text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] text-[#030412]"
            >
              {category.name.split("&")[0]}
              {category.name.includes("&") && (
                <span className="bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">
                  & {category.name.split("&")[1]}
                </span>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 font-body text-base sm:text-xl leading-relaxed max-w-2xl font-normal"
            >
              {category.heroSubtitle}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-5 border-t border-black/[0.08] max-w-xl"
            >
              {category.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-[#030412] tracking-tight whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-6 py-3.5 rounded-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white shadow-[0_8px_25px_rgba(65,0,245,0.25)] hover:shadow-[0_12px_30px_rgba(65,0,245,0.35)] transition-all duration-300 hover:scale-105"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {category.serviceSlug && (
                <Link
                  to={`/services/${category.serviceSlug}`}
                  className="inline-flex items-center gap-2 font-heading font-semibold text-sm px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-black/10 text-[#030412] hover:text-[#4100F5] transition-all duration-300 shadow-sm"
                >
                  <span>Service Capabilities</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Hero Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/90 p-4 rounded-2xl border border-black/10 shadow-lg">
                  <span className="text-xs font-heading font-bold text-[#4100F5] block mb-1">
                    {category.discipline}
                  </span>
                  <p className="text-xs text-slate-700 font-normal">
                    {category.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Case Studies Grid ─────────────────────────────────── */}
        <div id="case-studies" className="mb-24 pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase mb-2 text-[#4100F5]">
                <Layers className="w-4 h-4" />
                Selected Production Work
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-[#030412]">
                Featured Case Studies
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal">
              Click any project to inspect the architecture, metrics, and deliverable breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.caseStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedCaseStudy(study)}
                className="group relative flex flex-col rounded-3xl bg-white border border-black/[0.08] hover:border-[#4100F5]/40 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {study.type.split(" ")[0]}
                    </span>
                    <span className="text-xs font-mono text-white/90 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {study.year}
                    </span>
                  </div>

                  {/* Corner Expand Button */}
                  <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 group-hover:bg-[#4100F5] text-[#030412] group-hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-heading font-bold tracking-wider uppercase text-[#4100F5] block mb-1">
                      {study.client}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-[#030412] group-hover:text-[#4100F5] transition-colors mb-3">
                      {study.title}
                    </h3>
                    <p className="font-body text-slate-600 text-sm leading-relaxed mb-6 font-normal line-clamp-3">
                      {study.description}
                    </p>
                  </div>

                  {/* Metrics & Tags */}
                  <div className="pt-4 border-t border-black/[0.08] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#030412]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#4100F5]" />
                      <span className="truncate">{study.metrics}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {study.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] text-slate-700 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {study.tags.length > 3 && (
                        <span className="px-2 py-1 text-[11px] text-slate-500 font-mono">
                          +{study.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Technologies & Stack Bar ──────────────────────────── */}
        <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-widest text-slate-500 block mb-1">
                Engineering & Creative Arsenal
              </span>
              <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#030412]">
                Technologies & Tools We Deploy for {category.name}
              </h4>
            </div>

            <div className="flex flex-wrap gap-2 max-w-xl">
              {category.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-[#F8F8F6] border border-black/[0.08] text-xs sm:text-sm text-[#030412] font-medium hover:border-[#4100F5]/40 hover:text-[#4100F5] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Category Switcher Footer ──────────────────────────── */}
        <div className="pt-10 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to={`/portfolio/${prevCategory.slug}`}
            className="flex items-center gap-3 text-slate-600 hover:text-[#4100F5] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center group-hover:border-[#4100F5] transition-colors text-[#030412] group-hover:text-[#4100F5]">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 block">PREVIOUS DISCIPLINE</span>
              <span className="font-heading text-sm font-bold text-[#030412] group-hover:text-[#4100F5] transition-colors">{prevCategory.name}</span>
            </div>
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white font-heading font-semibold text-sm transition-all duration-300 shadow-[0_8px_25px_rgba(65,0,245,0.25)] hover:scale-105"
          >
            <Send className="w-4 h-4" />
            <span>Commission a Project</span>
          </a>

          <Link
            to={`/portfolio/${nextCategory.slug}`}
            className="flex items-center gap-3 text-slate-600 hover:text-[#4100F5] transition-colors group text-right"
          >
            <div>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 block">NEXT DISCIPLINE</span>
              <span className="font-heading text-sm font-bold text-[#030412] group-hover:text-[#4100F5] transition-colors">{nextCategory.name}</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center group-hover:border-[#4100F5] transition-colors text-[#030412] group-hover:text-[#4100F5]">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>

      {/* ── Case Study Detail Modal ─────────────────────────────── */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 min-[390px]:p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F8F8F6] text-[#030412] border border-black/15 p-4 min-[390px]:p-6 sm:p-8 md:p-10 shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-[#030412] flex items-center justify-center transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-8 border border-black/10 shadow-lg">
                <img
                  src={selectedCaseStudy.image}
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {selectedCaseStudy.type} • {selectedCaseStudy.year}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-heading font-bold tracking-wide uppercase text-[#4100F5] block mb-1">
                    Client: {selectedCaseStudy.client}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#030412]">
                    {selectedCaseStudy.title}
                  </h3>
                </div>

                <a
                  href="#contact"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4100F5] hover:bg-[#5212FF] text-white text-sm font-semibold transition-transform hover:scale-105 self-start sm:self-auto shadow-md"
                >
                  <span>Inquire Similar</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <p className="font-body text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {selectedCaseStudy.description}
              </p>

              {/* Key Highlight Banner */}
              <div className="p-4 rounded-2xl border border-black/10 bg-white mb-6 flex items-center gap-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-[#4100F5]" />
                <span className="text-sm font-semibold text-[#030412]">
                  {selectedCaseStudy.highlight}
                </span>
              </div>

              {/* Scope & Tags */}
              <div className="pt-6 border-t border-black/10">
                <h5 className="font-heading text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Tech & Deliverable Scope
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs text-slate-800 font-medium shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PortfolioCategoryPage;
