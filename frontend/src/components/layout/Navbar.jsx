import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const isSubPage = location.pathname !== "/";

  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/works")) return "Portfolio";
    if (location.pathname.startsWith("/services")) return "Services";
    if (location.pathname.startsWith("/about")) return "About";
    return "Home";
  });
  const [isLightSection, setIsLightSection] = useState(
    () => location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/works") || location.pathname.startsWith("/services") || location.pathname.startsWith("/about")
  );
  const navigate = useNavigate();

  // Lock to prevent scroll-spy from interrupting programmatic smooth scroll
  const isManualClickRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTarget = (sectionId) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const sectionId = item.href.replace("#", "");

    // Lock scroll-spy during navigation so the pill slides cleanly to target
    isManualClickRef.current = true;
    setActiveTab(item.name);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    // Release lock once programmatic scroll settles
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 1100);

    if (isSubPage) {
      navigate("/");
      setTimeout(() => {
        scrollToTarget(sectionId);
      }, 150);
    } else {
      scrollToTarget(sectionId);
    }
  };

  useEffect(() => {
    // List of section IDs that have light backgrounds
    const lightSections = ["about", "nigeria-to-world", "portfolio"];

    // User manual wheel/touch immediately releases click lock
    const handleUserInteraction = () => {
      isManualClickRef.current = false;
    };

    const handleScroll = () => {
      // Check if user is scrolled near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition >= documentHeight - 120;

      // When on portfolio/works sub-pages, retain Portfolio active tab and light mode
      if (location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/works")) {
        setIsLightSection(true);
        if (!isManualClickRef.current) {
          setActiveTab(isNearBottom ? "Contact" : "Portfolio");
        }
        return;
      }

      // When on service sub-pages, retain Services active tab and light mode
      if (location.pathname.startsWith("/services")) {
        setIsLightSection(true);
        if (!isManualClickRef.current) {
          setActiveTab(isNearBottom ? "Contact" : "Services");
        }
        return;
      }

      // When on about page, retain About active tab and light mode
      if (location.pathname.startsWith("/about")) {
        setIsLightSection(true);
        if (!isManualClickRef.current) {
          setActiveTab(isNearBottom ? "Contact" : "About");
        }
        return;
      }

      // Homepage scroll spy logic
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const triggerPoint = 180; // distance from top of viewport

      let currentSection = "home";
      let lightDetected = false;

      if (isNearBottom) {
        currentSection = "contact";
      } else {
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
      }

      setIsLightSection(lightDetected);

      if (!isManualClickRef.current) {
        if (currentSection === "home") setActiveTab("Home");
        else if (currentSection === "about") setActiveTab("About");
        else if (currentSection === "services") setActiveTab("Services");
        else if (currentSection === "portfolio") setActiveTab("Portfolio");
        else if (currentSection === "contact") setActiveTab("Contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [location.pathname]);

  return (
    <header className="fixed top-3.5 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-16px)] pointer-events-auto">
      <nav
        aria-label="Main Navigation"
        className={`relative flex items-center justify-center gap-0.5 min-[390px]:gap-1 p-1 sm:p-1.5 rounded-full transition-all duration-500 ${
          isLightSection
            ? "bg-white/85 backdrop-blur-3xl backdrop-saturate-200 border border-[#030412]/15 shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.9)]"
            : "bg-[#000422]/80 backdrop-blur-3xl backdrop-saturate-200 border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.4)]"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative flex items-center justify-center px-2 min-[375px]:px-2.5 min-[390px]:px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[11px] min-[375px]:text-[11.5px] min-[390px]:text-xs sm:text-sm md:text-sm font-semibold font-heading leading-none rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer select-none ${
                isLightSection
                  ? isActive
                    ? "text-white"
                    : "text-slate-700 hover:text-[#030412] hover:bg-[#030412]/[0.05]"
                  : isActive
                  ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  : "text-slate-300/80 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavTabWater"
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden pointer-events-none"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    mass: 0.5,
                  }}
                >
                  {isLightSection ? (
                    /* Light Section Active Pill — Premium Purple Accent */
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4100F5] to-[#885FFF] rounded-full shadow-[0_2px_10px_rgba(65,0,245,0.35)]" />
                  ) : (
                    /* Dark Section Active Water Droplet */
                    <>
                      <div className="absolute inset-0 bg-white/[0.16] backdrop-blur-xl rounded-full border border-white/40 shadow-[inset_0_1.5px_3px_0_rgba(255,255,255,0.8),inset_0_-1.5px_3px_0_rgba(0,0,0,0.3)]" />
                      <div className="absolute inset-x-2 sm:inset-x-3 top-[1px] h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-90" />
                      <div className="absolute inset-x-2.5 sm:inset-x-4 bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full opacity-70" />
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

export default Navbar;
