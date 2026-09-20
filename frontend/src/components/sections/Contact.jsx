import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#000422] text-white pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-28 overflow-hidden select-none"
    >
      {/* ── Background Film Grain Overlay ───────────────────────── */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-30" />

      {/* ── Ambient Background Glow Orbs ───────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[650px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] bg-[#4100F5]/25 rounded-full blur-[170px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-[500px] sm:w-[650px] h-[500px] bg-[#885FFF]/20 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#6320EE]/15 rounded-full blur-[140px]" />
      </div>

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 21.3) % 100}%`,
              left: `${(i * 29.7) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: (i % 4 + 2) / 10,
              animationDuration: `${(i % 3) + 3}s`,
              animationDelay: `${(i % 4) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 min-[390px]:px-6 sm:px-10 lg:px-16 z-20">
        {/* ── Main CTA Card Container ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] border border-white/15 p-8 sm:p-14 lg:p-20 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden text-center"
        >
          {/* Glowing Top Lip Highlight */}
          <div className="absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#885FFF] to-transparent" />

          {/* Headline: "Ready to build something built to be noticed" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6"
          >
            Ready to build something{" "}
            <span className="block sm:inline bg-gradient-to-r from-white via-[#C4B5FD] to-[#885FFF] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(136,95,255,0.4)]">
              built to be noticed?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12"
          >
            Partner with our multidisciplinary studio on your next flagship product,
            brand identity, or interactive web experience. We reply within 24 hours.
          </motion.p>

          {/* ── Primary Action: Enter Form Button ────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            {/* The "Enter Form" Button -> Navigates to /contact */}
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#4100F5] via-[#5C1BF6] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9F7DFF] text-white font-heading font-bold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-[0_8px_32px_rgba(65,0,245,0.5)] hover:shadow-[0_12px_45px_rgba(136,95,255,0.65)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-[#C4B5FD]/40 w-full sm:w-auto"
            >
              <span>Enter Form</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom seamless blend gradient into cosmic footer ── */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#000422]/60 to-[#000422] pointer-events-none z-10" />
    </section>
  );
}

export default Contact;
