import { Navbar } from "@/components/layout/Navbar";
import { BackgroundPaths } from "@/components/ui/background-paths";

function App() {
  return (
    <main className="min-h-screen bg-[#030412] text-white font-body selection:bg-[#4100F5] selection:text-white">
      <Navbar />
      <BackgroundPaths 
        title="Built to be noticed." 
        subtitle="A creative tech agency turning brands, products, and ideas into things people actually stop for."
      />
    </main>
  );
}

export default App;
