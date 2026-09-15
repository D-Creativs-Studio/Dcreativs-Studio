import { useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 px-2 sm:px-4 max-w-[96vw]">
      {/* Main Water Pill Navbar Container */}
      <nav 
        aria-label="Main Navigation"
        className="relative flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-2 px-1.5 xs:px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full 
        bg-white/[0.05] backdrop-blur-3xl backdrop-saturate-200 
        border border-white/30 
        shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1.5px_0_0_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.35),0_0_25px_rgba(255,255,255,0.08)]"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={`relative px-2.5 xs:px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2.5 text-xs xs:text-sm sm:text-base md:text-lg font-semibold font-heading rounded-full transition-colors duration-300 whitespace-nowrap ${
                isActive 
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
                  {/* Pure Translucent Water Droplet Body */}
                  <div className="absolute inset-0 bg-white/[0.18] backdrop-blur-2xl rounded-full border border-white/50 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.95),inset_0_-2px_4px_0_rgba(0,0,0,0.4),0_8px_25px_rgba(0,0,0,0.45),0_0_15px_rgba(255,255,255,0.2)]" />

                  {/* Water Meniscus Top Specular Highlight */}
                  <div className="absolute inset-x-2 sm:inset-x-3 top-[1px] sm:top-[1.5px] h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-95" />
                  
                  {/* Water Refraction Bottom Rim Light */}
                  <div className="absolute inset-x-3 sm:inset-x-4 bottom-[1px] sm:bottom-[1.5px] h-[1px] sm:h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full opacity-80" />
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
