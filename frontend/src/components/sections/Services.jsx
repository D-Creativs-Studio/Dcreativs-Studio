import CardsRotateSlider from "@/components/ui/cards-rotate-slider";
import { servicesData } from "@/data/servicesData";
import { motion } from "framer-motion";

export function Services() {
  return (
    <section id="services" className="relative bg-[#030412] text-white" style={{ overflowX: "clip" }}>
      {/* Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[650px] h-[650px] bg-[#4100F5]/18 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#885FFF]/14 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#4100F5]/12 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Subtle Twinkling Starfield Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${(i * 17.3) % 100}%`,
              left: `${(i * 23.4) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
            }}
            initial={{
              opacity: (i % 5 + 2) / 10,
              y: 0,
              x: 0,
            }}
            animate={{
              opacity: [(i % 5 + 2) / 10, (i % 5 + 7) / 10, (i % 5 + 2) / 10],
              y: [0, (i % 2 === 0 ? -15 : 15), 0],
              x: [0, (i % 3 === 0 ? 10 : -10), 0],
            }}
            transition={{
              duration: (i % 4) + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 5) * 0.5,
            }}
          />
        ))}
      </div>

      {/* Top Header intro before horizontal track */}
      <div className="relative z-10 pt-16 sm:pt-20 pb-2 sm:pb-3 px-6 text-center max-w-3xl mx-auto">
        <p className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#885FFF] mb-3">
          Our Capabilities & Deliverables
        </p>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4">
          Services Built to{" "}
          <span className="bg-gradient-to-r from-[#4100F5] via-[#885FFF] to-[#C4B5FD] bg-clip-text text-transparent">
            Make an Impact.
          </span>
        </h2>
        <p className="font-body text-base sm:text-lg text-slate-400 font-normal">
          Scroll down to pan through our 3D rotating capabilities track.
        </p>
      </div>

      {/* 3D Rotating Cards Slider */}
      <div className="relative z-10">
        <CardsRotateSlider
          images={servicesData}
          rotationAmount={1.15}
          verticalDrift={1.2}
          perspective={1100}
          textColor="#ffffff"
        />
      </div>
    </section>
  );
}
