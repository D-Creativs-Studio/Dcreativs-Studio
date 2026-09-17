import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teamMembers } from "@/data/teamData";
import { ArrowUpRight, Plus, X, Play } from "lucide-react";

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
  const [isPlayingReel, setIsPlayingReel] = useState(false);

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
          50/50 SPLIT SECTION (Sticky Portrait Top/Left + Accordion)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-20 z-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 lg:gap-14 items-start">
          
          {/* ── STICKY PICTURE DISPLAY STAGE ─────────────────────────
              Mobile: Sticks flush to the very top (top-0) taking ~42vh
              Desktop: Sticks on left half (top-24) taking full side stage
          ─────────────────────────────────────────────────────────── */}
          <div className="sticky top-0 lg:top-24 z-30 w-full lg:col-span-5 mb-0 lg:mb-0 transition-all">
            <div className="relative bg-[#000422] rounded-none sm:rounded-3xl border-b sm:border border-white/10 sm:backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Dynamic ambient brand spotlight */}
              <div
                className="absolute -top-12 -left-12 w-56 h-56 rounded-full blur-[70px] pointer-events-none transition-all duration-700 opacity-40"
                style={{ backgroundColor: activeMember.accent }}
              />

              {/* Portrait Image Container (Exact 4:3 on mobile, 3:4 on desktop) */}
              <div className="relative aspect-[4/3] lg:aspect-[3/4] lg:max-h-[calc(100vh-8.5rem)] w-full overflow-hidden bg-[#000422]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeMember.image}
                      alt={activeMember.name}
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                    />
                    {/* Subtle contrast gradient at bottom for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000422] via-[#000422]/15 to-transparent opacity-80 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Top Left: Play / Reel Button */}
                <button
                  type="button"
                  onClick={() => setIsPlayingReel(!isPlayingReel)}
                  aria-label={`Play spotlight reel for ${activeMember.name}`}
                  className="absolute top-5 left-4 sm:top-4 sm:left-4 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-[#4100F5] text-[#000422] hover:text-white border border-white/40 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </button>

                {/* Floating Top Right: Serial Tag */}
                <div className="absolute top-5 right-4 sm:top-4 sm:right-4 z-20 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md font-mono text-[11px] font-bold text-white/90">
                  <span className="text-[#885FFF]">// {activeMember.id}</span> / 08
                </div>

                {/* Bottom Overlay Info (Active member summary) */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeMember.accent }}
                    />
                    <span className="font-mono text-[11px] sm:text-xs text-white/90 font-semibold tracking-wider uppercase">
                      {activeMember.discipline}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight">
                    {activeMember.name}
                  </h3>
                  <p
                    className="font-heading font-semibold text-xs sm:text-sm text-[#885FFF]"
                  >
                    {activeMember.role}
                  </p>
                </div>
              </div>

              {/* Quick Jump Thumbnail Indicator Bar */}
              <div className="hidden sm:flex items-center justify-between gap-1.5 p-3 border-t border-white/10 overflow-x-auto no-scrollbar bg-black/40">
                {teamMembers.map((m) => {
                  const isCur = m.id === spotlightId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSpotlightId(m.id)}
                      className={`relative w-8 h-8 rounded-lg overflow-hidden border transition-all duration-200 shrink-0 cursor-pointer ${
                        isCur
                          ? "border-[#885FFF] scale-105 shadow-[0_0_12px_rgba(136,95,255,0.6)]"
                          : "border-white/15 opacity-40 hover:opacity-80"
                      }`}
                      title={m.name}
                    >
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive Member Accordion Roster ─── */}
          <div className="lg:col-span-7 flex flex-col px-4 sm:px-0">
            {teamMembers.map((member) => {
              const isExpanded = member.id === expandedId;
              const isSpotlight = member.id === spotlightId;

              return (
                <div
                  key={member.id}
                  ref={(el) => {
                    memberRowRefs.current[member.id] = el;
                  }}
                  className={`relative transition-all duration-300 border-t border-white/15 first:border-t-0 lg:first:border-t ${
                    isExpanded
                      ? "bg-[#4100F5] text-white shadow-[0_12px_40px_rgba(65,0,245,0.45)] rounded-2xl my-2 border-transparent"
                      : isSpotlight
                      ? "bg-white/[0.04] text-white"
                      : "text-white hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Row Header: Hover or click name to change photo; click (+) to see details */}
                  <div
                    onMouseEnter={() => handleNameHover(member.id)}
                    className="w-full p-5 sm:p-7 md:p-8 flex items-center justify-between gap-4 select-none group"
                  >
                    {/* Team Name Area: Hovering or clicking changes the spotlight image */}
                    <button
                      type="button"
                      onClick={() => handleNameClick(member.id)}
                      className="flex-1 pr-2 text-left cursor-pointer focus:outline-none"
                      aria-label={`View photo of ${member.name}`}
                    >
                      {/* Chunky First Name */}
                      <h3
                        className={`font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none transition-colors duration-200 ${
                          isExpanded
                            ? "text-white"
                            : isSpotlight
                            ? "text-white"
                            : "text-white/80 group-hover:text-[#885FFF]"
                        }`}
                      >
                        {member.firstName}
                      </h3>

                      {/* Subtitle with Full Name & Role */}
                      <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                        <span
                          className={`text-xs sm:text-sm font-semibold transition-colors ${
                            isExpanded
                              ? "text-white/90"
                              : isSpotlight
                              ? "text-white"
                              : "text-slate-300"
                          }`}
                        >
                          {member.name}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full transition-colors ${
                            isExpanded
                              ? "bg-white/20 text-white font-semibold"
                              : isSpotlight
                              ? "bg-[#885FFF]/20 text-[#885FFF] font-semibold"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>
                    </button>

                    {/* Circular Action Button (+) / (×) to toggle person details */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleAccordion(member.id);
                      }}
                      aria-label={isExpanded ? `Hide ${member.name} details` : `Show ${member.name} details`}
                      className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer ${
                        isExpanded
                          ? "border border-white/40 text-white bg-white/15 hover:bg-white/25 hover:scale-105 active:scale-95 shadow-md"
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

                  {/* Expandable Accordion Body (Quote + Bio + Skills) */}
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
                        <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-0">
                          {/* Editorial Serif Italic Quote */}
                          <blockquote className="font-serif italic text-base sm:text-xl md:text-2xl leading-relaxed text-white/95 my-3 font-medium">
                            {member.quote}
                          </blockquote>

                          {/* Authentic Bio Narrative */}
                          <p className="font-body text-xs sm:text-sm md:text-base text-white/85 leading-relaxed max-w-2xl mb-5 font-normal">
                            {member.bio}
                          </p>

                          {/* Skill / Superpower Tags */}
                          {member.skills && (
                            <div className="flex items-center gap-2 flex-wrap mb-5">
                              {member.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-[11px] sm:text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Social Channel Links */}
                          <div className="flex items-center gap-2 pt-3 border-t border-white/20">
                            {member.socials.linkedin && (
                              <a
                                href={member.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} LinkedIn`}
                                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#4100F5] flex items-center justify-center transition-all duration-200"
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
                                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#4100F5] flex items-center justify-center transition-all duration-200"
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
                                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#4100F5] flex items-center justify-center transition-all duration-200"
                              >
                                <GithubIcon />
                              </a>
                            )}
                            {member.socials.dribbble && (
                              <a
                                href={member.socials.dribbble}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} Dribbble`}
                                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#4100F5] flex items-center justify-center transition-all duration-200"
                              >
                                <DribbbleIcon />
                              </a>
                            )}
                            {member.socials.instagram && (
                              <a
                                href={member.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${member.name} Instagram`}
                                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#4100F5] flex items-center justify-center transition-all duration-200"
                              >
                                <InstagramIcon />
                              </a>
                            )}
                          </div>
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
