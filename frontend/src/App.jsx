import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { WorksPage } from "@/pages/WorksPage";
import { PortfolioCategoryPage } from "@/pages/PortfolioCategoryPage";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Footer } from "@/components/sections/Footer";

function AppContent() {
  const location = useLocation();
  const isWorksCanvas = location.pathname === "/works";

  return (
    <main className="min-h-screen bg-[#030412] text-white font-body selection:bg-[#4100F5] selection:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:categoryId" element={<PortfolioCategoryPage />} />
      </Routes>
      {!isWorksCanvas && <Footer />}
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}


export default App;
