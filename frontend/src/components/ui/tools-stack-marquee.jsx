import React from "react";

/**
 * Authentic, accurate black-and-white application logos
 * Designed to render in crisp monochrome (black & white / grayscale)
 */
const TOOL_LOGOS = {
  Figma: () => (
    <svg viewBox="0 0 38 57" fill="currentColor" className="w-6 h-8">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  ),

  "Adobe Photoshop": () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-extrabold text-[13px] tracking-tight select-none">
      Ps
    </div>
  ),

  "Adobe Illustrator": () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-extrabold text-[13px] tracking-tight select-none">
      Ai
    </div>
  ),

  Indesign: () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-extrabold text-[13px] tracking-tight select-none">
      Id
    </div>
  ),

  "After Effects": () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-extrabold text-[13px] tracking-tight select-none">
      Ae
    </div>
  ),

  "Premiere Pro": () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-extrabold text-[13px] tracking-tight select-none">
      Pr
    </div>
  ),

  Audition: () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-extrabold text-[13px] tracking-tight select-none">
      Au
    </div>
  ),

  Spline: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </svg>
  ),

  "Next.js": () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-8 h-8 text-black">
      <circle cx="90" cy="90" fill="currentColor" r="90" />
      <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
      <path d="M115 54H127V126H115V54Z" fill="white" />
    </svg>
  ),

  TailwindCSS: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  ),

  "Node.js": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2L3 7.2v10.4L12 22.8l9-5.2V7.2L12 2zm6.7 14.4l-6.7 3.9-6.7-3.9V8.4l6.7-3.9 6.7 3.9v8z" />
      <path d="M12 7.5L7.5 10v4l4.5 2.5 4.5-2.5v-4L12 7.5z" />
    </svg>
  ),

  TypeScript: () => (
    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-bold text-[13px] tracking-tight select-none">
      TS
    </div>
  ),

  GSAP: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M7 12h10M12 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  Vite: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M21.5 3.5l-9.8 17.8a.8.8 0 0 1-1.4 0L2.5 7.5a.8.8 0 0 1 .7-1.2h4.5l3.2 6.2 3.1-6.2h6.8a.8.8 0 0 1 .7 1.2z" />
    </svg>
  ),

  "Cinema 4D": () => (
    <div className="w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-heading font-black text-[11px] tracking-tighter select-none">
      C4D
    </div>
  ),

  "DaVinci Resolve": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="12" cy="7" r="3.5" />
      <circle cx="7" cy="15" r="3.5" />
      <circle cx="17" cy="15" r="3.5" />
    </svg>
  ),

  Blender: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="12" cy="14" r="3" />
      <path d="M12 2a4 4 0 0 0-4 4c0 1.2.5 2.3 1.3 3L3.7 12a1 1 0 0 0-.2 1.4 1 1 0 0 0 1.4.2l5.7-3.1a4 4 0 1 0 1.4-8.5z" />
      <path d="M12 17c-2.8 0-5-2.2-5-5 0-.8.2-1.6.6-2.3L2.8 7a1 1 0 0 1-.2-1.4 1 1 0 0 1 1.4-.2l4.8 2.7c.9-.7 2-1.1 3.2-1.1 2.8 0 5 2.2 5 5s-2.2 5-5 5z" />
    </svg>
  ),

  "Unreal Engine": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path d="M12 6v6a2 2 0 0 0 4 0V6M8 6v6a6 6 0 0 0 12 0V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  "Three.js": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M3 4l9 16 9-16H3zm4.5 3h9l-4.5 8-4.5-8z" />
    </svg>
  ),

  "Octane Render": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="19" cy="8" r="2" />
      <circle cx="19" cy="16" r="2" />
      <circle cx="12" cy="20" r="2" />
      <circle cx="5" cy="16" r="2" />
      <circle cx="5" cy="8" r="2" />
    </svg>
  ),

  "Meta Business Suite": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 13.8c-1.3-1.6-2.5-3.3-3.8-3.3-1.8 0-3.2 1.6-3.2 3.5 0 2 1.4 3.6 3.2 3.6 1.3 0 2.5-1.7 3.8-3.8zm0 0c1.3-2.1 2.5-3.8 3.8-3.8 1.8 0 3.2 1.6 3.2 3.6 0 1.9-1.4 3.5-3.2 3.5-1.3 0-2.5-1.7-3.8-3.3zm0-3c-1.6-2.4-3.3-3.8-5.3-3.8C3.6 7 1 9.7 1 13.1c0 3.4 2.6 6.1 5.7 6.1 2.1 0 3.7-1.4 5.3-3.7 1.6 2.3 3.2 3.7 5.3 3.7 3.1 0 5.7-2.7 5.7-6.1 0-3.4-2.6-6.1-5.7-6.1-2 0-3.7 1.4-5.3 3.8z" />
    </svg>
  ),

  "Google Ads": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M4 14l8-10 4 3-8 10z" />
      <circle cx="18" cy="16" r="3.5" />
    </svg>
  ),

  "TikTok Ads": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M19.5 7.5a5.5 5.5 0 0 1-3.5-1.3V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1v3a2 2 0 1 0 1 1.9V2h3a5.5 5.5 0 0 0 3.5 3.5v2z" />
    </svg>
  ),

  "Google Analytics": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="12" rx="1" />
      <rect x="17" y="4" width="4" height="17" rx="1" />
    </svg>
  ),

  "OpenAI API": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M22.28 9.37a5.99 5.99 0 0 0-.5-4.83 6.09 6.09 0 0 0-6.22-2.9 6.04 6.04 0 0 0-4.66-2.1c-2.8 0-5.2 1.87-5.87 4.54A6.03 6.03 0 0 0 1.2 7.42a6.08 6.08 0 0 0 .95 6.84 5.99 5.99 0 0 0 .5 4.83 6.09 6.09 0 0 0 6.22 2.9 6.04 6.04 0 0 0 4.66 2.1c2.8 0 5.2-1.87 5.87-4.54a6.03 6.03 0 0 0 3.83-3.34 6.08 6.08 0 0 0-.95-6.84zM12 21.36c-1.88 0-3.52-.96-4.46-2.42l2.36-1.36a3.52 3.52 0 0 1 2.1.69v3.09zm-6.72-3.88a3.52 3.52 0 0 1-.7-2.1c0-.4.07-.8.2-1.16l2.36 1.36a3.52 3.52 0 0 0 2.1 3.63l-3.96-1.73zm-1.8-6.94c0-.75.24-1.46.66-2.04l2.68 1.55a3.52 3.52 0 0 0 0 4.2l-2.68 1.55a3.56 3.56 0 0 1-.66-3.26v-2zm9.17-5.18v3.09a3.52 3.52 0 0 0-2.1.69L8.19 7.78a5.16 5.16 0 0 1 4.46-2.42zm4.36 2.29a3.52 3.52 0 0 1 .7 2.1c0 .4-.07.8-.2 1.16l-2.36-1.36a3.52 3.52 0 0 0-2.1-3.63l3.96 1.73zm1.8 6.94c0 .75-.24 1.46-.66 2.04l-2.68-1.55a3.52 3.52 0 0 0 0-4.2l2.68-1.55c.42.58.66 1.29.66 2.04v3.22z" />
    </svg>
  ),

  LangChain: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-2h-2v2H8.5v-4H11v-2H8.5V8.5H13v2h2v-2h2.5v4H15v2h2.5v2H13z" />
    </svg>
  ),

  "Make (Integromat)": () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2L2 8.5v7L12 22l10-6.5v-7L12 2zm0 3.3l6.5 4.2-3.2 2.1-6.5-4.2L12 5.3zm-7 5.1l5.5 3.6v4.6L5 15v-4.6zm8.5 8.2v-4.6l5.5-3.6V15l-5.5 3.6z" />
    </svg>
  ),

  Zapier: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <rect x="10.5" y="2" width="3" height="20" rx="1.5" />
      <rect x="2" y="10.5" width="20" height="3" rx="1.5" />
      <rect x="4.5" y="4.5" width="15" height="3" rx="1.5" transform="rotate(45 12 6)" />
      <rect x="4.5" y="16.5" width="15" height="3" rx="1.5" transform="rotate(-45 12 18)" />
    </svg>
  ),

  Python: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M11.9 2c-3.5 0-3.3 1.5-3.3 1.5l.1 1.6h3.3v.5H5.8S2 5.2 2 9.5s3.3 4.2 3.3 4.2h1v-1.5c0-1.7 1.4-1.6 1.4-1.6h5.4s1.6 0 1.6-1.5V3.5S15.4 2 11.9 2zm-1.8 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zM12.1 22c3.5 0 3.3-1.5 3.3-1.5l-.1-1.6H12v-.5h6.2s3.8.4 3.8-3.9-3.3-4.2-3.3-4.2h-1v1.5c0 1.7-1.4 1.6-1.4 1.6h-5.4s-1.6 0-1.6 1.5v5.6s-.7 1.5 2.8 1.5zm1.8-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
    </svg>
  ),

  Flowise: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M6 9v3a3 3 0 0 0 3 3h3m6-6v3a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
};

// Generic clean monochrome logo fallback for any tool
const DefaultLogo = ({ name }) => (
  <div className="w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-heading font-black text-xs select-none">
    {name.slice(0, 2).toUpperCase()}
  </div>
);

/**
 * ToolsStackMarquee
 * Clean, high-end editorial display featuring ONLY the logos of applications used
 * in pure black and white (monochrome).
 */
export function ToolsStackMarquee({ tools = [] }) {
  if (!tools || tools.length === 0) return null;

  // Duplicate tools array for seamless infinite marquee loop
  const marqueeItems = [...tools, ...tools, ...tools, ...tools];

  return (
    <div className="relative my-16 sm:my-24 w-screen left-1/2 -translate-x-1/2 overflow-hidden select-none">
      {/* ── Marquee Track Container with Edge Gradient Fade Masks ── */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-[#F8F8F6] to-transparent z-20" />

        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-[#F8F8F6] to-transparent z-20" />

        {/* ── Continuous Infinite Monochrome Logo Marquee ── */}
        <div className="flex w-max items-center animate-marquee gap-10 sm:gap-16 hover:[animation-play-state:paused]">
          {marqueeItems.map((toolName, index) => {
            const LogoComponent = TOOL_LOGOS[toolName] || (() => <DefaultLogo name={toolName} />);

            return (
              <div
                key={`${toolName}-${index}`}
                className="flex items-center gap-3 text-black/80 hover:text-black transition-all duration-300 hover:scale-105"
                title={toolName}
              >
                <div className="shrink-0 flex items-center justify-center">
                  <LogoComponent />
                </div>
                <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-black whitespace-nowrap">
                  {toolName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ToolsStackMarquee;
