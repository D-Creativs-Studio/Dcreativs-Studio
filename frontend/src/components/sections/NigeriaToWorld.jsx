import { motion } from "framer-motion";
import { WorldMap } from "@/components/ui/world-map";

const DOTS = [
  // Abia State → Los Angeles (North America - West)
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 34.0522, lng: -118.2437 } },
  // Abia State → São Paulo (South America)
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: -23.5505, lng: -46.6333 } },
  // Abia State → London (Europe)
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 51.5074, lng: -0.1278 } },
  // Abia State → Dubai (Middle East)
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 25.2048, lng: 55.2708 } },
  // Abia State → Tokyo (East Asia)
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 35.6762, lng: 139.6503 } },
  // Abia State → Sydney (Australia)
  { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: -33.8688, lng: 151.2093 } },
];

export function NigeriaToWorld() {
  return (
    <section id="nigeria-to-world" className="relative w-full bg-[#F5F5F0] overflow-hidden py-20 md:py-28">
      {/* Subtle tinted glow hints */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#4100F5]/5 blur-[140px] pointer-events-none" />

      {/* Header — constrained to readable width */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block text-xs font-bold tracking-[0.35em] uppercase text-[#4100F5] mb-5 border border-[#4100F5]/30 rounded-full px-4 py-1.5 bg-[#4100F5]/8"
          >
            Our Reach
          </motion.span>

          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0a0b1e] leading-[0.95] tracking-tight mb-5">
            From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4100F5] via-[#885FFF] to-[#4100F5]">
              Nigeria
            </span>
            <br className="hidden sm:block" />
            {" "}to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#885FFF] to-[#4100F5]">
              World.
            </span>
          </h2>

          <p className="text-[#0a0b1e]/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-body">
            Born in Abia State. Built for everywhere. We craft creative work that
            travels — across borders, time zones, and industries.
          </p>
        </motion.div>
      </div>

      {/* Map — full bleed, edge to edge, extra tall */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="relative z-10 w-full"
        style={{ aspectRatio: "2.5 / 1" }}
      >
        <WorldMap
          dots={DOTS}
          lineColor="#4100F5"
          dotColor="#4100F522"
          showLabels={false}
          animationDuration={2.5}
          loop={true}
        />
      </motion.div>
    </section>
  );
}
