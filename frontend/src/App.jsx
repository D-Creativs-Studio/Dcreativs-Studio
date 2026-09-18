import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { PortfolioCategoryPage } from "@/pages/PortfolioCategoryPage";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Footer } from "@/components/sections/Footer";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <main className="min-h-screen bg-[#030412] text-white font-body selection:bg-[#4100F5] selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioCategoryPage />} />
          <Route path="/portfolio/:categoryId" element={<PortfolioCategoryPage />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}


export default App;
