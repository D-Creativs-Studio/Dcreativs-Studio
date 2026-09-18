import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioCategories } from "@/data/portfolioData";
import { ArrowRight } from "lucide-react";

export function Portfolio() {
  const [isHovered, setIsHovered] = useState(false);
  const cardAreaRef = useRef(null);

  // Smooth custom cursor tracking coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Elastic spring physics for smooth, responsive cursor following
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardAreaRef.current) return;
    const rect = cardAreaRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Layers recreating the exact visual stacking order:
  // Each card sits directly on top of the other with its own border, shadow, and rotation.
  const stackLayers = [
    {
      id: "card-red-backdrop",
      title: "Red Backdrop",
      isRedBackdrop: true,
      baseRotate: 0,
      hoverRotate: 0,
      baseX: "0%",
      hoverX: "0%",
      baseY: "-2%",
      hoverY: "-14%",
      scale: 0.95,
      hoverScale: 1.0,
      zIndex: 1,
    },
    {
      id: "card-far-left-pink",
      title: portfolioCategories[1].name,
      image: portfolioCategories[1].image,
      baseRotate: -26,
      hoverRotate: -36,
      baseX: "-9%",
      hoverX: "-40%",
      baseY: "-2%",
      hoverY: "5%",
      scale: 0.90,
      hoverScale: 0.96,
      zIndex: 2,
    },
    {
      id: "card-mid-left-photo",
      title: portfolioCategories[5].name,
      image: portfolioCategories[5].image,
      baseRotate: -14,
      hoverRotate: -18,
      baseX: "-4%",
      hoverX: "-21%",
      baseY: "1%",
      hoverY: "-1%",
      scale: 0.93,
      hoverScale: 0.98,
      zIndex: 3,
    },
    {
      id: "card-bottom-peek",
      title: portfolioCategories[3].name,
      image: portfolioCategories[3].image,
      baseRotate: -4,
      hoverRotate: -2,
      baseX: "2%",
      hoverX: "2%",
      baseY: "6%",
      hoverY: "16%",
      scale: 0.92,
      hoverScale: 0.96,
      zIndex: 4,
    },
    {
      id: "card-mid-right-photo",
      title: portfolioCategories[4].name,
      image: portfolioCategories[4].image,
      baseRotate: 14,
      hoverRotate: 18,
      baseX: "6%",
      hoverX: "21%",
      baseY: "-2%",
      hoverY: "-1%",
      scale: 0.92,
      hoverScale: 0.98,
      zIndex: 5,
    },
    {
      id: "card-far-right-dark",
      title: portfolioCategories[2].name,
      image: portfolioCategories[2].image,
      baseRotate: 28,
      hoverRotate: 36,
      baseX: "10%",
      hoverX: "40%",
      baseY: "4%",
      hoverY: "5%",
      scale: 0.88,
      hoverScale: 0.96,
      zIndex: 6,
    },
    {
      id: "card-front-hero",
      title: portfolioCategories[0].name,
      image: portfolioCategories[0].image,
      isHero: true,
      baseRotate: -7,
      hoverRotate: -2,
      baseX: "-1%",
      hoverX: "0%",
      baseY: "0%",
      hoverY: "-2%",
      scale: 1.0,
      hoverScale: 1.05,
      zIndex: 10,
    },
  ];

  return (
    <section
      id="portfolio"
      className="relative bg-[#F7F7F9] text-[#0A0A0A] pt-24 sm:pt-20 md:pt-28 pb-16 sm:pb-0 min-h-[680px] sm:min-h-0 overflow-hidden select-none transition-colors duration-500 flex flex-col justify-center"
    >
      {/* ── Soft Atmospheric Ambient Lighting ────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#4100F5]/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-400/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-indigo-500/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="relative w-full z-10 flex flex-col items-center">
        {/* ── HERO STAGE: Individual Physical Cards Layered On Top Of Each Other ── */}
        <div className="relative w-full flex flex-col items-center justify-center pt-4 sm:pt-8">
          
          {/* ── Single Semantic Link with Custom Magnetic Follower Cursor ── */}
          <Link
            ref={cardAreaRef}
            to="/portfolio"
            aria-label="Explore Full Portfolio Index"
            onMouseEnter={(e) => {
              setIsHovered(true);
              handleMouseMove(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative block w-[68vw] sm:w-[44vw] md:w-[32vw] lg:w-[24vw] min-w-[240px] max-w-[380px] aspect-[3/4.2] z-10 cursor-none overflow-visible"
          >
            {stackLayers.map((layer) => {
              const currentRotate = isHovered ? layer.hoverRotate : layer.baseRotate;
              const currentX = isHovered ? layer.hoverX : layer.baseX;
              const currentY = isHovered ? layer.hoverY : layer.baseY;
              const currentScale = isHovered ? (layer.hoverScale || layer.scale) : layer.scale;

              return (
                <div
                  key={layer.id}
                  style={{
                    zIndex: layer.zIndex,
                    transform: `translate(${currentX}, ${currentY}) rotate(${currentRotate}deg) scale(${currentScale})`,
                  }}
                  className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center
                    ${
                      layer.isHero
                        ? "border-2 border-black/80 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.40)] ring-4 ring-black/5"
                        : layer.isRedBackdrop
                        ? "bg-[#D90429] border border-red-700 shadow-[0_20px_45px_-10px_rgba(217,4,41,0.35)]"
                        : "bg-white border border-white/80 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.25)]"
                    }
                  `}
                >
                  {layer.isRedBackdrop ? (
                    <div className="w-full h-full bg-[#D90429]" />
                  ) : (
                    <img
                      src={layer.image}
                      alt={layer.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Scrim on Front Hero Card */}
                  {layer.isHero && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  )}

                  {/* Editorial Tag on Front Hero Card */}
                  {layer.isHero && (
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 text-white flex flex-col justify-end pointer-events-none">
                      <p className="font-mono text-[10px] sm:text-xs text-white/70 uppercase tracking-widest mb-1">
                        Curated Works
                      </p>
                      <h3 className="font-heading text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                        Explore Portfolio
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Magnetic Custom Follower Cursor Badge (Lavender Circle + Arrow) ── */}
            <motion.div
              style={{
                left: smoothX,
                top: smoothY,
              }}
              animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-40 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-[#885FFF] text-white flex items-center justify-center shadow-[0_15px_40px_rgba(136,95,255,0.45)] border border-white/30"
              aria-hidden="true"
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] text-white" />
            </motion.div>
          </Link>

          {/* ── Giant Base Typography: "PORTFOLIO" Directly Under The Stacked Cards ── */}
          <div className="relative mt-6 sm:-mt-24 md:-mt-28 pointer-events-none select-none z-0 w-full overflow-hidden leading-none px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-baseline justify-between w-full font-heading font-black text-[13vw] sm:text-[15.5vw] md:text-[17vw] lg:text-[18.2vw] text-[#885FFF] leading-none tracking-tighter">
              <span>P</span>
              <span>O</span>
              <span>R</span>
              <span>T</span>
              <span>F</span>
              <span>O</span>
              <span>L</span>
              <span>I</span>
              <span>O</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Portfolio;
