import CardsRotateSlider from "@/components/ui/cards-rotate-slider";
import { servicesData } from "@/data/servicesData";

export function Services() {
  return (
    <section id="services" className="relative bg-[#030412] text-white" style={{ overflowX: "clip" }}>
      {/* Ambient Glow Orbs - hardware accelerated */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#4100F5]/15 rounded-full blur-[120px] pointer-events-none z-0 transform-gpu" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#885FFF]/12 rounded-full blur-[110px] pointer-events-none z-0 transform-gpu" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-[#4100F5]/10 rounded-full blur-[100px] pointer-events-none z-0 transform-gpu" />

      {/* Lightweight CSS Starfield (Zero JS overhead, smooth 60fps scrolling) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 17.3) % 100}%`,
              left: `${(i * 23.4) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: (i % 5 + 2) / 10,
              animationDuration: `${(i % 4) + 3}s`,
              animationDelay: `${(i % 5) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Top Header intro before horizontal track */}
      <div className="relative z-10 pt-10 sm:pt-16 md:pt-20 pb-0 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <p className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#885FFF] mb-2 sm:mb-3">
          Our Capabilities & Deliverables
        </p>
        <h2 className="font-heading text-2xl min-[375px]:text-3xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-2 sm:mb-4">
          Services Built to{" "}
          <span className="bg-gradient-to-r from-[#4100F5] via-[#885FFF] to-[#C4B5FD] bg-clip-text text-transparent">
            Make an Impact.
          </span>
        </h2>
        <p className="font-body text-sm sm:text-base md:text-lg text-slate-400 font-normal mb-3 sm:mb-4">
          Scroll down to pan through our 3D rotating capabilities track.
        </p>
      </div>

      {/* 3D Rotating Cards Slider */}
      <div className="relative z-10 mt-3 sm:mt-6 md:mt-0">
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
