import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { portfolioCategories } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const activeCategory = hoveredIndex !== null ? portfolioCategories[hoveredIndex] : null;

  return (
    <section
      id="portfolio"
      className="relative bg-[#000422] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden select-none"
    >
      {/* ── Film Grain Noise Overlay ────────────────────────────── */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-30" />

      {/* ── Dynamic Ambient Background Glow ──────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            backgroundColor: activeCategory ? activeCategory.accent : "#4100F5",
            opacity: activeCategory ? 0.18 : 0.08,
            scale: activeCategory ? 1.15 : 1.0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] sm:h-[700px] rounded-full blur-[180px]"
        />
        <div className="absolute -bottom-20 right-10 w-[450px] h-[450px] bg-[#885FFF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        {/* ── Header Intro ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-8 border-b border-white/10 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#885FFF] mb-3"
            >
              Selected Work (01 — 06)
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              Curated{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-[#885FFF] bg-clip-text text-transparent">
                Creations.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-slate-400 text-sm sm:text-base lg:text-lg max-w-md md:text-right font-light leading-relaxed"
          >
            Click any discipline to explore our production case studies, engineering breakthroughs, and interactive deliverables.
          </motion.p>
        </div>

        {/* ── Project Rows List ───────────────────────────────────── */}
        <div className="flex flex-col divide-y divide-white/10 border-b border-white/10">
          {portfolioCategories.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(`/portfolio/${project.slug}`)}
                className={`group relative py-8 sm:py-10 lg:py-12 cursor-pointer transition-opacity duration-300 ${
                  isDimmed ? "opacity-30" : "opacity-100"
                }`}
              >
                {/* Row Hover Background Accent Sweep */}
                <div
                  className="absolute inset-0 -mx-6 sm:-mx-12 px-6 sm:px-12 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}14 0%, transparent 60%)`,
                  }}
                />

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 z-10">
                  {/* Left: Index & Project Name & Description */}
                  <div className="flex items-start sm:items-baseline gap-4 sm:gap-8 transition-transform duration-300 group-hover:translate-x-3">
                    <span className="font-heading text-xs sm:text-sm font-semibold tracking-widest text-slate-500 group-hover:text-white/80 transition-colors shrink-0 pt-1 sm:pt-0">
                      /{project.id}
                    </span>
                    <div>
                      <h3
                        className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white transition-colors duration-300"
                        style={{
                          color: isHovered ? project.accent : "#ffffff",
                          textShadow: isHovered ? `0 0 35px ${project.glowColor}` : "none",
                        }}
                      >
                        {project.name}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-slate-400 font-light mt-2 max-w-2xl hidden sm:block">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Middle / Right: Category, Discipline, Year, & Action Arrow */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-12 text-sm sm:text-base text-slate-400 shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                      <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                        {project.category}
                      </span>
                      <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-xs sm:text-sm font-light text-slate-500 group-hover:text-slate-300 transition-colors">
                        {project.discipline}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shrink-0"
                        style={{
                          borderColor: isHovered ? project.accent : "rgba(255, 255, 255, 0.15)",
                          backgroundColor: isHovered ? `${project.accent}1a` : "transparent",
                          color: isHovered ? project.accent : "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile description snippet */}
                <p className="sm:hidden text-xs text-slate-400 font-light mt-3 pl-8">
                  {project.shortDescription}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA / Agency Philosophy Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="font-heading text-xl sm:text-2xl font-bold mb-2 text-white">
              Have a visionary project in mind?
            </h4>
            <p className="font-body text-sm sm:text-base text-slate-400 font-light">
              We collaborate with ambitious teams worldwide to construct memorable digital systems.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white font-heading font-semibold text-sm tracking-wide shadow-lg shadow-[#4100F5]/30 hover:shadow-[#4100F5]/50 transition-all duration-300 hover:scale-105"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Portfolio;
