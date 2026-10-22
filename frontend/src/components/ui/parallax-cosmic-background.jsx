import React, { useEffect, useState } from 'react';

/**
 * CosmicParallaxBg
 * A cosmic hero background featuring:
 *  • Starfield + Earth atmosphere glow
 *  • Large D'CREATIVS header with generous breathing room
 *  • Alternating subtitle words with a slower, delayed reveal
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
  const [offset, setOffset] = useState(0);

  // Rotate during the fully hidden part of the ten-second reveal cycle.
  useEffect(() => {
    if (!loop || words.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let interval;
    const rotate = () => setOffset((current) => (current + 1) % words.length);
    const timeout = setTimeout(() => {
      rotate();
      interval = setInterval(rotate, 10000);
    }, 8500);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [loop, words.length]);

  const displayWords = words.map((_, index) => words[(index + offset) % words.length]);

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

  return (
    <div className={`cosmic-parallax-container ${className}`}>
      {/* ── Top gradient blend overlay ── */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#000422] via-[#000422]/80 to-transparent z-20 pointer-events-none" />

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

      {/* Centered Subtitle Wrapper */}
      <div className="cosmic-content-wrapper">

        {/* ── Subtitle: first and third words appear before second and fourth ── */}
        <div
          id="subtitle"
          className="select-none min-h-[32px] flex items-center justify-center gap-3 sm:gap-6 flex-wrap mb-16 sm:mb-24 px-4"
        >
          {displayWords.map((word, idx) => (
            <React.Fragment key={idx}>
              <span
                className={`cosmic-subtitle-word inline-block font-heading font-bold text-xs sm:text-sm tracking-[0.35em] uppercase text-[#C4B5FD] ${idx % 2 === 0 ? 'cosmic-subtitle-word-first' : 'cosmic-subtitle-word-delayed'}`}
                style={{ animationIterationCount: loop ? 'infinite' : 1 }}
              >
                {word}
              </span>
              {idx < words.length - 1 && (
                <span className="text-[#885FFF]/50 text-xs sm:text-sm select-none">•</span>
              )}
            </React.Fragment>
          ))}
        </div>


      </div>
    </div>
  );
};

export { CosmicParallaxBg };
