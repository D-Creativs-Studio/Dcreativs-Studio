import { useState } from "react";
import { motion } from "framer-motion";
import { teamMembers } from "@/data/teamData";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Clean, lightweight inline SVG icons for social platforms
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export function Team() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({});

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos((prev) => ({ ...prev, [id]: { x, y } }));
  };

  return (
    <section
      id="team"
      className="relative bg-[#000422] text-white py-20 sm:py-32 px-4 min-[390px]:px-6 sm:px-12 lg:px-20 overflow-hidden select-none"
    >
      {/* ── Film Grain Overlay ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-25" />

      {/* ── Ambient Background Glows ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] sm:h-[650px] bg-[#4100F5]/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#885FFF]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-[#38bdf8]/08 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        {/* ── Header Section ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl min-[375px]:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              Meet The{" "}
              <span className="bg-gradient-to-r from-white via-[#E0E7FF] to-[#885FFF] bg-clip-text text-transparent">
                Team.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-slate-400 text-sm sm:text-base max-w-md leading-relaxed font-light"
          >
            An expanding collective of designers, developers, 3D artists, and
            brand strategists. United under one roof to build digital products
            and brand worlds people actually stop for.
          </motion.p>
        </div>

        {/* ── Awwwards-Inspired Team Bento Grid (2 cols mobile, 4 cols desktop) ─ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-16 sm:mb-20">
          {teamMembers.map((member, index) => {
            const isHovered = hoveredId === member.id;
            const pos = mousePos[member.id] || { x: 150, y: 150 };

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={(e) => handleMouseMove(e, member.id)}
                className="group relative rounded-2xl sm:rounded-3xl p-3.5 min-[390px]:p-4 sm:p-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5"
              >
                {/* Interactive cursor tracking radial spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, ${member.accent}22, transparent 70%)`,
                  }}
                />

                {/* Top glow ambient blob */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] pointer-events-none transition-opacity duration-300"
                  style={{
                    backgroundColor: member.accent,
                    opacity: isHovered ? 0.35 : 0.08,
                  }}
                />

                <div className="relative z-10">
                  {/* Top Bar: Index & Status Indicator */}
                  <div className="flex items-center justify-between mb-3 sm:mb-5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                      // {member.id}
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[9px] min-[390px]:text-[10px] sm:text-xs font-mono text-slate-400">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: member.accent }}
                      />
                      <span>{member.discipline}</span>
                    </div>
                  </div>

                  {/* Monogram Avatar Badge */}
                  <div className="mb-3.5 sm:mb-5">
                    <div
                      className="w-11 h-11 min-[390px]:w-12 min-[390px]:h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-heading font-extrabold text-base min-[390px]:text-lg sm:text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-105 border border-white/15"
                      style={{
                        background: `linear-gradient(135deg, ${member.accent}cc, #030412)`,
                        boxShadow: isHovered
                          ? `0 0 25px ${member.accent}66`
                          : "none",
                      }}
                    >
                      {member.initials}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-heading font-extrabold text-sm min-[390px]:text-base sm:text-lg text-white group-hover:text-white transition-colors leading-tight mb-1">
                    {member.name}
                  </h3>

                  <div
                    className="font-heading font-semibold text-[11px] min-[390px]:text-xs sm:text-sm mb-2 sm:mb-3 leading-snug"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </div>

                  {/* Specialty badge */}
                  <div className="text-[9px] min-[390px]:text-[10px] sm:text-xs font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06] rounded-lg px-2 py-1 mb-2.5 sm:mb-4 line-clamp-1">
                    {member.specialty}
                  </div>

                  {/* Bio */}
                  <p className="font-body text-slate-400 text-[11px] min-[390px]:text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 font-light">
                    {member.bio}
                  </p>
                </div>

                {/* Social icons footer */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] hover:bg-[#4100F5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Twitter`}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] hover:bg-[#4100F5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <TwitterIcon />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} GitHub`}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] hover:bg-[#4100F5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <GithubIcon />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Instagram`}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] hover:bg-[#4100F5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <InstagramIcon />
                      </a>
                    )}
                    {member.socials.dribbble && (
                      <a
                        href={member.socials.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Dribbble`}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] hover:bg-[#4100F5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <GlobeIcon />
                      </a>
                    )}
                    {member.socials.behance && (
                      <a
                        href={member.socials.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Behance`}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] hover:bg-[#4100F5] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      >
                        <GlobeIcon />
                      </a>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-500">
                    Active
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Callout Banner ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] backdrop-blur-md p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
              Ready to work with our creative collective?
            </h4>
            <p className="font-body text-xs sm:text-sm text-slate-400 max-w-xl font-light">
              From end-to-end brand flagships to production web applications and 3D
              experiences, we bring cross-functional firepower to every build.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#4100F5] hover:bg-[#5212FF] text-white font-heading font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(65,0,245,0.4)] hover:shadow-[0_8px_30px_rgba(65,0,245,0.6)] hover:-translate-y-0.5 shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
