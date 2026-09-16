import { motion } from "framer-motion";
import { LogoModelBackground } from "@/components/ui/logo-model-background";

export function BackgroundPaths({
  title = "Built To Be Noticed.",
  subtitle = "A creative tech agency turning brands, products, and ideas into things people actually stop for.",
}) {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030412] text-white font-body selection:bg-[#4100F5] selection:text-white pt-40 pb-16">
      {/* 3D Floating Model Canvas Background Layer */}
      <LogoModelBackground />

      {/* Volumetric Top-Right Spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-Right Soft Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-[700px] h-[700px] bg-[#4100F5]/25 rounded-full blur-[140px]" />
        <div className="absolute -top-12 -right-12 w-[450px] h-[450px] bg-[#885FFF]/30 rounded-full blur-[90px]" />

        {/* SVG Tapered Volumetric Spotlight Cone */}
        <div className="absolute top-0 right-0 w-[700px] sm:w-[950px] h-[750px] sm:h-[1000px] pointer-events-none opacity-85">
          <svg
            viewBox="0 0 950 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <g filter="url(#spotlight-blur)">
              {/* Outer Soft Light Cone: Wide Top (x: 200-950), Narrow Bottom (x: 100-350) */}
              <polygon
                points="200,0 950,0 380,950 120,950"
                fill="url(#spotlight-grad-1)"
                opacity="0.5"
              />
              {/* Mid Volumetric Light Beam */}
              <polygon
                points="420,0 900,0 340,850 180,850"
                fill="url(#spotlight-grad-2)"
                opacity="0.7"
              />
              {/* Intense Specular Center Spotlight Beam */}
              <polygon
                points="580,0 820,0 300,700 230,700"
                fill="url(#spotlight-grad-3)"
                opacity="0.85"
              />
            </g>

            <defs>
              <filter id="spotlight-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="32" />
              </filter>

              <linearGradient
                id="spotlight-grad-1"
                x1="700"
                y1="0"
                x2="250"
                y2="950"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#885FFF" stopOpacity="0.55" />
                <stop offset="0.5" stopColor="#4100F5" stopOpacity="0.25" />
                <stop offset="1" stopColor="#030412" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="spotlight-grad-2"
                x1="660"
                y1="0"
                x2="260"
                y2="850"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="0.4" stopColor="#885FFF" stopOpacity="0.35" />
                <stop offset="1" stopColor="#4100F5" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="spotlight-grad-3"
                x1="700"
                y1="0"
                x2="265"
                y2="700"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="0.35" stopColor="#E0D5FF" stopOpacity="0.5" />
                <stop offset="1" stopColor="#885FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Hero Main Heading */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-6 tracking-tight drop-shadow-md max-w-5xl leading-[1.05]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg md:text-xl text-slate-300/80 mb-10 sm:mb-12 max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Primary Button — Filled Purple */}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full
              bg-gradient-to-r from-[#4100F5] to-[#885FFF]
              text-white font-heading font-semibold text-base sm:text-lg
              shadow-[0_0_25px_rgba(65,0,245,0.45)] hover:shadow-[0_0_40px_rgba(136,95,255,0.65)]
              hover:-translate-y-0.5 active:scale-95
              transition-all duration-300
              border border-[#885FFF]/40"
            >
              <span>Start a Project</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>

            {/* Secondary Button — Ghost/Outline */}
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full
              bg-white/[0.04] hover:bg-white/[0.10] backdrop-blur-md
              text-white font-heading font-semibold text-base sm:text-lg
              border border-white/25 hover:border-white/50
              hover:-translate-y-0.5 active:scale-95
              transition-all duration-300
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <span>See Our Work</span>
              <span className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">↗</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
