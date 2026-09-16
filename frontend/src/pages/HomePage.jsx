import { BackgroundPaths } from "@/components/ui/background-paths";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { NigeriaToWorld } from "@/components/sections/NigeriaToWorld";

export function HomePage() {
  return (
    <>
      <BackgroundPaths 
        title="Built To Be Noticed." 
        subtitle="A creative tech agency turning brands, products, and ideas into things people actually stop for."
      />
      <About />
      <Services />
      <NigeriaToWorld />
    </>
  );
}
