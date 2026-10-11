import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { WorksPage } from "@/pages/WorksPage";
import { PortfolioCategoryPage } from "@/pages/PortfolioCategoryPage";
import { ContactPage } from "@/pages/ContactPage";
import { ComingSoonPage } from "@/pages/ComingSoonPage";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Footer } from "@/components/sections/Footer";
import { Lock } from "lucide-react";

// Set to false when ready for permanent public unveil
const COMING_SOON_ACTIVE = true;
const STUDIO_AUTH_HASH = "f05fd3ba93ad2dab7e36a50f90b3ef4825ac5d5a0722db071bcc511fa7a1f3bf";

async function verifyPasskeyHash(input) {
  if (!input) return false;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input.trim());
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex === STUDIO_AUTH_HASH;
  } catch {
    return false;
  }
}

function AppContent() {
  const location = useLocation();
  const [isPreviewUnlocked, setIsPreviewUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("dc_studio_preview");
      return stored === "unlocked";
    }
    return false;
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const previewKey = params.get("preview") || params.get("key");
    if (previewKey) {
      verifyPasskeyHash(previewKey).then((isValid) => {
        if (isValid) {
          sessionStorage.setItem("dc_studio_preview", "unlocked");
          setIsPreviewUnlocked(true);
        }
      });
    }
  }, [location]);

  const handleUnlock = () => {
    sessionStorage.setItem("dc_studio_preview", "unlocked");
    setIsPreviewUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem("dc_studio_preview");
    setIsPreviewUnlocked(false);
  };

  // If Coming Soon is active and visitor is not in authorized preview mode
  if (COMING_SOON_ACTIVE && !isPreviewUnlocked) {
    return <ComingSoonPage onUnlockPreview={handleUnlock} />;
  }

  const isWorksCanvas = location.pathname === "/works";
  const isContactPage = location.pathname === "/contact";

  return (
    <main className="min-h-screen bg-[#030412] text-white font-body selection:bg-[#4100F5] selection:text-white">
      {/* Studio Preview Indicator for Team */}
      {COMING_SOON_ACTIVE && isPreviewUnlocked && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-[#000422]/90 border border-white/20 px-3.5 py-2 rounded-xl text-xs backdrop-blur-md shadow-2xl">
          <span className="text-zinc-300 font-medium">Studio Preview Mode</span>
          <button
            onClick={handleLock}
            className="flex items-center gap-1 text-[#885FFF] hover:text-white transition-colors uppercase tracking-wider text-[11px] font-semibold"
          >
            <Lock className="w-3 h-3" />
            <span>Lock</span>
          </button>
        </div>
      )}

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:categoryId" element={<PortfolioCategoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      {!isWorksCanvas && !isContactPage && <Footer />}
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
