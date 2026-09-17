import React, { useEffect, useState } from 'react';

/**
 * Showcase marquee image data
 */
const marqueeImages = [
  {
    src: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
    title: "Brand Systems",
    tag: "Identity & Strategy",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    title: "Web Platforms",
    tag: "React & Next.js",
  },
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    title: "Motion & Reels",
    tag: "Commercial Animation",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    title: "3D & CGI FX",
    tag: "Photorealistic Render",
  },
  {
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    title: "Social Growth",
    tag: "Digital Campaigns",
  },
  {
    src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
    title: "AI & Automations",
    tag: "Smart Pipelines",
  },
  {
    src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    title: "Creative Direction",
    tag: "Visual Experience",
  },
];

/**
 * CosmicParallaxBg
 * A cosmic hero background featuring:
 *  • Starfield + Earth atmosphere glow
 *  • Large D'CREATIVS header with generous breathing room
 *  • 4-word subtitle sequence (all 4 visible at once, rotating positions on reveal)
 *  • Infinite moving marquee of showcase images resting flush on bottom line
 */
const CosmicParallaxBg = ({
  head,
  text,
  loop = true,
  className = '',
}) => {
  const [smallStars, setSmallStars] = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars, setBigStars] = useState('');

  // All words from text prop
  const words = text.split(',').map(part => part.trim());

  // Order rotation offset for position shifting
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /** Generate CSS box-shadow string for realistic starfield */
  const generateStarBoxShadow = (count) => {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(', ');
  };

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));

    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1'
    );
  }, [loop]);

  // Position-shifting interval: all 4 words remain visible, but rotate order every 2.8s
  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setOffset((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 350); // 350ms transition
    }, 2800);

    return () => clearInterval(interval);
  }, [words.length]);

  // Derive rotated words order
  const displayWords = words.map((_, i) => words[(i + offset) % words.length]);

  // Duplicate images for infinite seamless marquee loop
  const doubleImages = [...marqueeImages, ...marqueeImages];

  return (
    <div className={`cosmic-parallax-container ${className}`}>
      {/* ── Top gradient blend overlay ── */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030412] via-[#030412]/60 to-transparent z-20 pointer-events-none" />

      {/* Starfield layers */}
      <div
        id="stars"
        style={{ boxShadow: smallStars }}
        className="cosmic-stars"
      />
      <div
        id="stars2"
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"
      />
      <div
        id="stars3"
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"
      />

      {/* Horizon glow + Planet curve */}
      <div id="horizon">
        <div className="glow" />
      </div>
      <div id="earth" />

      {/* Main Title - Responsive header */}
      <div className="w-full absolute sm:relative top-[22%] sm:top-auto left-0 right-0 z-30 pointer-events-auto flex justify-center px-3 sm:px-0">
        <h2 id="title" className="select-none mb-0 sm:mb-5 leading-none text-center">
          {head.toUpperCase()}
        </h2>
      </div>

      {/* Centered Content Wrapper (Subtitle & Marquee) */}
      <div className="cosmic-content-wrapper">

        {/* ── 4-Word Subtitle Row: All 4 words visible, rotating positions ── */}
        <div
          id="subtitle"
          className="select-none min-h-[32px] flex items-center justify-center gap-3 sm:gap-6 flex-wrap mb-16 sm:mb-24 px-4"
        >
          {displayWords.map((word, idx) => (
            <React.Fragment key={word}>
              <span
                className={`inline-block font-heading font-bold text-xs sm:text-sm tracking-[0.35em] uppercase transition-all duration-500 ease-out transform ${
                  idx === 0
                    ? 'text-white drop-shadow-[0_0_15px_rgba(136,95,255,0.9)] scale-105'
                    : 'text-[#C4B5FD]/75 hover:text-white'
                } ${
                  isTransitioning
                    ? 'opacity-30 translate-y-1 scale-95 blur-sm'
                    : 'opacity-100 translate-y-0 scale-100 blur-0'
                }`}
              >
                {word}
              </span>
              {idx < displayWords.length - 1 && (
                <span className="text-[#885FFF]/50 text-xs sm:text-sm select-none">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Moving Image Marquee ───────────────────────────────── */}
        <div className="w-full overflow-hidden relative z-20 pt-2 pb-0 pointer-events-auto">
          {/* Side blur fades for marquee */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#000422] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#000422] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
            {doubleImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative flex-shrink-0 w-52 sm:w-64 h-32 sm:h-40 rounded-2xl overflow-hidden border border-white/15 bg-[#0A0C22]/90 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-105 hover:border-[#885FFF]/70 hover:shadow-[0_0_30px_rgba(65,0,245,0.5)]"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000422] via-[#000422]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Card overlay text */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex flex-col justify-end">
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#885FFF]">
                    {img.tag}
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white tracking-tight group-hover:text-[#C4B5FD] transition-colors">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CosmicParallaxBg };
