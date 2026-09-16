import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isLightSection, setIsLightSection] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isServicePage = location.pathname.startsWith("/services");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveTab(item.name);
    const sectionId = item.href.replace("#", "");
    if (isServicePage) {
      // Navigate home first, then scroll to section
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // List of section IDs that have light backgrounds
    const lightSections = ["about", "nigeria-to-world"];

    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const triggerPoint = 140; // distance from top of viewport

      let currentSection = "home";
      let lightDetected = false;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            currentSection = sectionId;
            if (lightSections.includes(sectionId)) {
              lightDetected = true;
            }
          }
        }
      }

      const matchingItem = navItems.find(
        (item) => item.href.replace("#", "") === currentSection
      );
      if (matchingItem) {
        setActiveTab(matchingItem.name);
      }
      setIsLightSection(lightDetected);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-2 sm:px-4 max-w-[96vw]">
      {/* Main Water Pill Navbar Container */}
      <nav
        aria-label="Main Navigation"
        className={`relative flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-2 px-1.5 xs:px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full transition-all duration-500 ${
          isLightSection
            ? "bg-white/85 backdrop-blur-3xl backdrop-saturate-200 border border-[#030412]/15 shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1.5px_0_0_rgba(255,255,255,0.9),0_0_20px_rgba(65,0,245,0.06)]"
            : "bg-white/[0.05] backdrop-blur-3xl backdrop-saturate-200 border border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1.5px_0_0_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.35),0_0_25px_rgba(255,255,255,0.08)]"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative px-2.5 xs:px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2.5 text-xs xs:text-sm sm:text-base md:text-lg font-semibold font-heading rounded-full transition-colors duration-300 whitespace-nowrap ${
                isLightSection
                  ? isActive
                    ? "text-white"
                    : "text-slate-700 hover:text-[#030412] hover:bg-[#030412]/[0.05]"
                  : isActive
                  ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  : "text-slate-300/80 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavTabWater"
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 24,
                    mass: 0.8,
                  }}
                >
                  {isLightSection ? (
                    /* Light Section Active Pill — Premium Purple Accent */
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4100F5] to-[#885FFF] rounded-full shadow-[0_4px_20px_rgba(65,0,245,0.35)]" />
                  ) : (
                    /* Dark Section Active Water Droplet */
                    <>
                      <div className="absolute inset-0 bg-white/[0.18] backdrop-blur-2xl rounded-full border border-white/50 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.95),inset_0_-2px_4px_0_rgba(0,0,0,0.4),0_8px_25px_rgba(0,0,0,0.45),0_0_15px_rgba(255,255,255,0.2)]" />
                      <div className="absolute inset-x-2 sm:inset-x-3 top-[1px] sm:top-[1.5px] h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-95" />
                      <div className="absolute inset-x-3 sm:inset-x-4 bottom-[1px] sm:bottom-[1.5px] h-[1px] sm:h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full opacity-80" />
                    </>
                  )}
                </motion.div>
              )}

              <span className="relative z-10">{item.name}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}

