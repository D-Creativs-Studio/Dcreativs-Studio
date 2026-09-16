import { BackgroundPaths } from "@/components/ui/background-paths";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";

export function HomePage() {
  return (
    <>
      <BackgroundPaths 
        title={
          <span className="flex flex-col items-center justify-center gap-1 sm:gap-2">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white/95">Built To Be</span>
            <span className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70">Noticed.</span>
          </span>
        }
        subtitle="A creative tech agency turning brands, products, and ideas into things people actually stop for."
      />
      <About />
      <Services />
    </>
  );
}
