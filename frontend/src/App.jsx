import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/pages/HomePage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
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
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
