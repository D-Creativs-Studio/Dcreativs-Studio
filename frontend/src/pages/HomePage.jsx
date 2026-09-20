import { SEO } from "@/components/common/SEO";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

export function HomePage() {
  return (
    <>
      <SEO
        title="Digital Experience & Brand Innovation"
        description="D'Creativs Studio crafts bespoke digital experiences, high-performance web platforms, 3D motion graphics, and scalable brand identity systems that captivate and convert."
      />
      <BackgroundPaths 
        title={
          <span className="flex flex-col items-center justify-center gap-1 sm:gap-2">
            <span className="text-3xl min-[360px]:text-[2.1rem] min-[390px]:text-5xl sm:text-6xl md:text-7xl font-bold text-white/95">Built To Be</span>
            <span className="text-[2.75rem] min-[360px]:text-[3.25rem] min-[390px]:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] leading-[1.02]">Noticed.</span>
          </span>
        }
        subtitle="A creative tech agency turning brands, products, and ideas into things people actually stop for."
      />
      <About />
      <Services />
      <Portfolio />
      <Team />
      <Contact />
    </>
  );
}

