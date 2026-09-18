import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamMembers } from "@/data/teamData";
import { ArrowUpRight, Plus, X } from "lucide-react";

// Clean inline social icons
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
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
    className="w-3.5 h-3.5"
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
    className="w-3.5 h-3.5"
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
    className="w-3.5 h-3.5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3" />
  </svg>
);

const DribbbleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
    <path d="M8.5 2.25c2.4 4.5 4.5 9.7 5.5 19.5" />
  </svg>
);

export function Team() {
  // expandedId tracks which accordion is open (or null if all closed)
  const [expandedId, setExpandedId] = useState(teamMembers[0].id);
  // spotlightId tracks which member is displayed on the sticky picture side
  const [spotlightId, setSpotlightId] = useState(teamMembers[0].id);

  const memberRowRefs = useRef({});
  const isClickingRef = useRef(false);
  const clickTimerRef = useRef(null);

  const activeMember =
    teamMembers.find((m) => m.id === spotlightId) || teamMembers[0];

  // Hovering over a team name updates the spotlight image immediately
  const handleNameHover = (id) => {
    setSpotlightId(id);
  };

  // Clicking on a team name updates the spotlight image
  const handleNameClick = (id) => {
    isClickingRef.current = true;
    setSpotlightId(id);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  };

  // Clicking specifically on the (+) / (×) button toggles the accordion expansion
  const handleToggleAccordion = (id) => {
    isClickingRef.current = true;
    setSpotlightId(id);
    setExpandedId((prev) => (prev === id ? null : id));

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  };

  // Scroll synchronization: when user scrolls through the member roster, the sticky picture side responds
  useEffect(() => {
    const handleScrollSync = () => {
      if (isClickingRef.current) return;

      const viewportMiddle = window.innerHeight * 0.45;
      let closestId = null;
      let minDistance = Infinity;

      teamMembers.forEach((member) => {
        const el = memberRowRefs.current[member.id];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height * 0.35;
        const distance = Math.abs(elementCenter - viewportMiddle);

        if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          if (distance < minDistance) {
            minDistance = distance;
            closestId = member.id;
          }
        }
      });

      if (closestId && closestId !== spotlightId) {
        setSpotlightId(closestId);
      }
    };

    window.addEventListener("scroll", handleScrollSync, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollSync);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [spotlightId]);

  return (
    <section
      id="team"
      className="relative bg-[#000422] text-white pt-20 sm:pt-28 pb-24 sm:pb-32 select-none"
    >
      {/* ── Film Grain Overlay ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-25 overflow-hidden" />

      {/* ── Ambient Background Glows (D'Creativs Purple & Lilac) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] sm:h-[650px] bg-[#4100F5]/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-[#885FFF]/15 rounded-full blur-[180px]" />
        <div className="absolute top-2/3 left-10 w-[450px] h-[450px] bg-[#4100F5]/15 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 min-[390px]:px-6 sm:px-12 lg:px-20 z-20">
        {/* ── Section Title & Editorial Intro ──────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#885FFF] font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block"
            >
              // THE CREATIVE COLLECTIVE
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl min-[375px]:text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight"
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
            className="font-body text-slate-300 text-sm sm:text-base max-w-md leading-relaxed font-light"
          >
            An expanding collective of designers, developers, 3D artists, and
            brand strategists. United under one roof to build digital products
            and brand worlds people actually stop for.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          50/50 FULL-BLEED SPLIT SECTION (Sticky Portrait Left + Accordion Right)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full border-y border-white/10 z-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-start">
          
          {/* ── STICKY PICTURE DISPLAY STAGE (50vw) ────────────────────
              Mobile: Sticks flush to the very top taking ~45vh
              Desktop: Sticky at top-0 taking full 100vh height & 50vw width
          ─────────────────────────────────────────────────────────── */}
          <div className="sticky top-0 z-30 w-full h-[45vh] lg:h-screen overflow-hidden bg-[#000422]">
            <div className="relative w-full h-full">
              {/* Dynamic ambient brand spotlight */}
              <div
                className="absolute -top-16 -left-16 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-700 opacity-40"
                style={{ backgroundColor: activeMember.accent }}
              />

              {/* Portrait Image (100% full bleed, object-cover) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={activeMember.image}
                    alt={activeMember.name}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle contrast gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000422]/60 via-transparent to-black/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top Right: Serial Tag (hidden on mobile) */}
              <div className="hidden sm:block absolute top-6 right-6 z-20 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md font-mono text-[11px] font-bold text-white/90">
                <span className="text-[#885FFF]">// {activeMember.id}</span> / 08
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive Member Accordion Roster (50vw) ─── */}
          <div className="w-full flex flex-col border-t lg:border-t-0 lg:border-l border-white/10 bg-[#000422]">
            {teamMembers.map((member) => {
              const isExpanded = member.id === expandedId;
              const isSpotlight = member.id === spotlightId;

              return (
                <div
                  key={member.id}
                  ref={(el) => {
                    memberRowRefs.current[member.id] = el;
                  }}
                  className={`relative transition-all duration-300 border-b border-white/10 ${
                    isExpanded
                      ? "bg-[#4100F5] text-white"
                      : isSpotlight
                      ? "bg-white/[0.04] text-white"
                      : "text-white hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Row Header: Hover or click name to change photo; click (+) to see details */}
                  <div
                    onMouseEnter={() => handleNameHover(member.id)}
                    className={`w-full flex items-start justify-between gap-6 select-none group transition-all duration-200 ${
                      isExpanded
                        ? "px-6 pt-6 pb-2 sm:px-10 sm:pt-8 sm:pb-3 lg:px-12 lg:pt-9 lg:pb-3"
                        : "px-6 py-5 sm:px-10 sm:py-6 lg:px-12 lg:py-7 items-center"
                    }`}
                  >
                    {/* Team Name Area: Hovering or clicking changes the spotlight image */}
                    <button
                      type="button"
                      onClick={() => handleNameClick(member.id)}
                      className="flex-1 pr-4 text-left cursor-pointer focus:outline-none"
                      aria-label={`View photo of ${member.name}`}
                    >
                      {/* Chunky First Name */}
                      <h3
                        className={`font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none transition-colors duration-200 ${
                          isExpanded
                            ? "text-white"
                            : isSpotlight
                            ? "text-white"
                            : "text-white/90 group-hover:text-[#885FFF]"
                        }`}
                      >
                        {member.firstName}
                      </h3>

                      {/* Subtitle with Full Name */}
                      <p
                        className={`text-xs sm:text-sm md:text-base transition-colors mt-1.5 ${
                          isExpanded
                            ? "text-white/90 font-medium"
                            : isSpotlight
                            ? "text-white font-normal"
                            : "text-slate-300 font-normal"
                        }`}
                      >
                        {member.name}
                      </p>
                    </button>

                    {/* Circular Action Button (+) / (×) to toggle person details */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleAccordion(member.id);
                      }}
                      aria-label={
                        isExpanded
                          ? `Hide ${member.name} details`
                          : `Show ${member.name} details`
                      }
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer mt-0.5 ${
                        isExpanded
                          ? "border border-white/50 text-white bg-white/15 hover:bg-white/25 hover:scale-105 active:scale-95 shadow-md"
                          : "border border-white/25 text-white hover:border-white hover:bg-white/10 hover:scale-110 active:scale-95"
                      }`}
                    >
                      {isExpanded ? (
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
                      ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white stroke-[2]" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Accordion Body (Compact Quote + Bio matching reference screenshot) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:px-10 sm:pb-8 lg:px-12 lg:pb-9 pt-0">
                          {/* Editorial Serif Italic Quote */}
                          <blockquote className="font-serif italic text-base sm:text-lg lg:text-xl leading-snug text-white/95 my-2.5 sm:my-3 font-normal max-w-xl">
                            {member.quote}
                          </blockquote>

                          {/* Authentic Bio Narrative */}
                          <p className="font-body text-xs sm:text-sm lg:text-[14.5px] text-white/85 leading-relaxed max-w-xl font-normal">
                            {member.bio}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Crossing Marquee Capability Tapes (100% Full Bleed Edge-to-Edge, Zero Margins) ── */}
      <div className="relative w-full my-20 sm:my-28 py-6 sm:py-8 overflow-hidden select-none pointer-events-none z-20">
        {/* Tape 1: Slanted Right (Brand Purple #4100F5) */}
        <div className="rotate-[-2deg] w-[120vw] -ml-[10vw] bg-[#4100F5] text-white py-3 sm:py-4 shadow-2xl transform origin-center">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee font-heading font-black text-xs sm:text-base md:text-lg tracking-wider uppercase">
            <span>★ SYSTEM ARCHITECTURE</span>
            <span>•</span>
            <span>WEBGL 3D & GLSL SHADERS</span>
            <span>•</span>
            <span>BRAND IDENTITY DESIGN</span>
            <span>•</span>
            <span>NEXT.JS & DISTRIBUTED APIS</span>
            <span>•</span>
            <span>CGI CINEMATIC MOTION</span>
            <span>•</span>
            <span>GENERATIVE AI AGENTS</span>
            <span>★ SYSTEM ARCHITECTURE</span>
            <span>•</span>
            <span>WEBGL 3D & GLSL SHADERS</span>
            <span>•</span>
            <span>BRAND IDENTITY DESIGN</span>
            <span>•</span>
            <span>NEXT.JS & DISTRIBUTED APIS</span>
          </div>
        </div>

        {/* Tape 2: Slanted Opposite (Brand Lilac #885FFF) */}
        <div className="rotate-[2deg] w-[120vw] -ml-[10vw] -mt-4 sm:-mt-6 bg-[#885FFF] text-white py-3 sm:py-4 shadow-2xl transform origin-center">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee-reverse font-heading font-black text-xs sm:text-base md:text-lg tracking-wider uppercase">
            <span>✦ DIGITAL PRODUCT DESIGN</span>
            <span>—</span>
            <span>INTERACTION PROTOTYPING</span>
            <span>—</span>
            <span>DESIGN TOKENS & SYSTEMS</span>
            <span>—</span>
            <span>AWARD-WINNING INTERFACES</span>
            <span>—</span>
            <span>HIGH-PERFORMANCE FRONTENDS</span>
            <span>✦ DIGITAL PRODUCT DESIGN</span>
            <span>—</span>
            <span>INTERACTION PROTOTYPING</span>
            <span>—</span>
            <span>DESIGN TOKENS & SYSTEMS</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Callout Banner (Contained in max-w-7xl) ────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 z-20">
        <div>
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
              className="inline-flex items-center gap-2 bg-[#4100F5] hover:bg-[#5212FF] text-white font-heading font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(65,0,245,0.4)] hover:shadow-[0_8px_30px_rgba(65,0,245,0.6)] hover:-translate-y-0.5 shrink-0"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
