"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;

const LEFT_DEPTH_MAX = 30;
const RIGHT_DEPTH_MAX = 40;
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

const LEFT_ANGLE_OFFSET = Math.PI;
const RIGHT_ANGLE_OFFSET = -Math.PI * 0.08;

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "data:image/jpeg;base64,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Ie3ApxV3YUnZXIH5O1eg4FOx5a8/eNTsUQ9APWqrNuOTTegk7jif3YHqSaQUj8bR7UmaExlqFtm6X+6MD61VBqxICsIX3yarCm30Jit2SZp8rcKnoKYgywFMZtzE0OQ7ajgau2r/LJGejrVDNTQNhz9KqMrMmcbojBpc1HmlzUXLsW5H3WsWf4Sw/kagDUrH9yi+5P8qiqnImK0Lsl481utvJ82w5Vj1A9KqUlLQ5N6sFFLRBRRRSKCmninUdaTVwQJKVNXorms0qe1NyRXPK63LOhS5HrUv2ketc2JGFPEkhqUrgbcl7tHWsmSRpXLt1NR89+aK3hGxLFopKK0EFFFFAH/9PwKikpa0EFLSUtMQUUUUwCiiigAooopiFooopgFFFFABRRRQAUUUlAC1eLCGMDviqFKST1pqViZRuBJJLHqaAMkD1pKmgGZB7c0ktbFN2Qk3EhHpikiALjPQc1PJGpO8nHrVbdydvAqpaMmLutC1Ocpn6VTq3N/q/yqpRN6hDYmj4R39sfnUNSbv3W0dzmoqlvYpLcWpYuNx9qipytgEetCeoNaDaKXaKUACizGKM4ANFFFUSFFFFMAooooAKKKKACiiigA4paSigApaSigBaSiigAooooA//U8BpaSlrQQUtJRQIWiiimAUUUUwCiiimIWikopgLRSUUAFFFFIAooooAKKKKQBTlcocim0UwHMzOfmNNoooAn3ho9jcGq+DS0tN6gtAo60UUAGBS0UUwCiiimAtFJRQIWikooAWiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1fAaWkpa0EFFFFAhaKKKYBRRRTAKKKKYgooooAKKKKACiiigAooopAFFFFAwooooAKKKKYgpaSlpgFFFFMBaKKKACiiigAooooEFFFFMApaSloAKKKKACiiigA0iJn1pCZJt33ic0yikM//2Q=="
];

export function CircularSplitRoll({ services }) {
  const containerRef = useRef(null);
  const leftItemsRef = useRef([]);
  const rightItemsRef = useRef([]);
  const timelineRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Use provided services or default data
  const data = useMemo(() => {
    if (services && services.length > 0) return services;
    return [
      {
        id: "brand-design",
        title: "Brand & Design",
        subtitle:
          "We don't just make logos. We build brand systems — identity, guidelines, visuals that hold up whether you're printing a card or launching a campaign.",
        tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Print & Packaging"],
        image: IMAGES[0],
      },
      {
        id: "web-app",
        title: "Web & App Development",
        subtitle: "From landing pages to full platforms — built fast, built to scale.",
        tags: ["Websites", "Web Apps", "E-commerce", "Dashboards"],
        image: IMAGES[1],
      },
      {
        id: "motion-video",
        title: "Motion & Video",
        subtitle: "Content that moves. Reels, ads, product videos, motion graphics.",
        tags: ["Video Editing", "Motion Graphics", "Reels/Ads", "Product Videos"],
        image: IMAGES[2],
      },
      {
        id: "3d-visuals",
        title: "3D & Visual FX",
        subtitle: "When flat isn't enough.",
        tags: ["3D Modeling", "Product Renders", "FX"],
        image: IMAGES[3],
      },
      {
        id: "social-marketing",
        title: "Social & Marketing",
        subtitle: "Built to be seen, not just posted.",
        tags: ["Content Strategy", "Social Management", "Ad Campaigns"],
        image: IMAGES[4],
      },
      {
        id: "academy",
        title: "Academy / Training",
        subtitle: "We teach what we build.",
        tags: ["Bootcamps", "Webinars", "Partner Trainings"],
        image: IMAGES[5],
      },
    ];
  }, [services]);

  const totalItems = data.length;
  const halfCount = Math.ceil(totalItems / 2);

  const leftServices = useMemo(() => data.slice(0, halfCount), [data, halfCount]);
  const rightServices = useMemo(() => data.slice(halfCount), [data, halfCount]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const leftElements = leftItemsRef.current.filter(Boolean);
      const rightElements = rightItemsRef.current.filter(Boolean);

      const isDesktop = window.innerWidth >= DESKTOP_WIDTH;
      const isTablet = window.innerWidth >= TABLET_MIN_WIDTH && window.innerWidth < DESKTOP_WIDTH;

      const radius = isDesktop ? 450 : isTablet ? 340 : 250;
      const arcDegrees = 140;

      const leftArcRad = (arcDegrees * Math.PI) / 180;
      const rightArcRad = (arcDegrees * Math.PI) / 180;

      const animateSide = (elements, arcRad, angleOffset, depthMax, isRight = false) => {
        const count = elements.length;
        if (count === 0) return;

        elements.forEach((el, index) => {
          const progressStep = count > 1 ? index / (count - 1) : 0;
          const angle = angleOffset + (progressStep - 0.5) * arcRad;

          const startX = Math.cos(angle) * radius * (isRight ? 1 : -1);
          const startY = Math.sin(angle) * radius;
          const startZ = (1 - progressStep) * depthMax;

          const startRotationY = isRight ? -25 : 25;
          const startRotationX = (progressStep - 0.5) * 20;

          gsap.set(el, {
            x: startX,
            y: startY,
            z: startZ,
            rotationY: startRotationY,
            rotationX: startRotationX,
            opacity: 0.25 + progressStep * 0.75,
            scale: 0.85 + progressStep * 0.15,
            transformPerspective: 1000,
            transformOrigin: isRight ? "left center" : "right center",
          });
        });
      };

      animateSide(leftElements, leftArcRad, LEFT_ANGLE_OFFSET, LEFT_DEPTH_MAX, false);
      animateSide(rightElements, rightArcRad, RIGHT_ANGLE_OFFSET, RIGHT_DEPTH_MAX, true);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      timelineRef.current = tl;

      // Animate Left Column Roll
      leftElements.forEach((el, index) => {
        const count = leftElements.length;
        const progressStep = count > 1 ? index / (count - 1) : 0;

        tl.to(
          el,
          {
            x: 0,
            y: (index - count / 2) * 60,
            z: 0,
            rotationY: 0,
            rotationX: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          progressStep * 0.5
        );
      });

      // Animate Right Column Roll
      rightElements.forEach((el, index) => {
        const count = rightElements.length;
        const progressStep = count > 1 ? index / (count - 1) : 0;

        tl.to(
          el,
          {
            x: 0,
            y: (index - count / 2) * 60,
            z: 0,
            rotationY: 0,
            rotationX: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 1,
          },
          0.2 + progressStep * 0.5
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [leftServices, rightServices, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#030412] text-white py-20 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center selection:bg-[#4100F5] selection:text-white"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#4100F5]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#885FFF]/08 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 text-center max-w-3xl mb-12 sm:mb-16">
        <p className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#885FFF] mb-3">
          What We Do
        </p>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4">
          Our Capabilities &{" "}
          <span className="bg-gradient-to-r from-[#4100F5] via-[#885FFF] to-[#C4B5FD] bg-clip-text text-transparent">
            Services.
          </span>
        </h2>
        <p className="font-body text-base sm:text-lg text-slate-400 font-normal">
          Click any card to inspect deliverables & capabilities.
        </p>
      </div>

      {/* Split Roll Stage */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 min-h-[550px]">
        {/* Left Column Arc */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 items-center md:items-end">
          {leftServices.map((service, idx) => (
            <div
              key={service.id}
              ref={(el) => (leftItemsRef.current[idx] = el)}
              onClick={() => setActiveItem(activeItem?.id === service.id ? null : service)}
              className="w-full max-w-md cursor-pointer group p-6 rounded-2xl bg-[#0A0C22]/85 backdrop-blur-2xl border border-white/10 hover:border-[#4100F5]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_35px_rgba(65,0,245,0.25)] relative overflow-hidden"
            >
              {service.image && (
                <div className="absolute top-0 right-0 w-24 h-24 opacity-15 group-hover:opacity-30 transition-opacity rounded-bl-3xl overflow-hidden pointer-events-none">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-[#A582FF] transition-colors">
                  {service.title}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/10 group-hover:border-[#4100F5]/40 transition-all">
                  Inspect +
                </span>
              </div>
              <p className="font-body text-sm text-slate-300/80 leading-relaxed mb-4">
                {service.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-[#4100F5]/15 text-[#A582FF] border border-[#4100F5]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column Arc */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 items-center md:items-start">
          {rightServices.map((service, idx) => (
            <div
              key={service.id}
              ref={(el) => (rightItemsRef.current[idx] = el)}
              onClick={() => setActiveItem(activeItem?.id === service.id ? null : service)}
              className="w-full max-w-md cursor-pointer group p-6 rounded-2xl bg-[#0A0C22]/85 backdrop-blur-2xl border border-white/10 hover:border-[#885FFF]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_35px_rgba(136,95,255,0.25)] relative overflow-hidden"
            >
              {service.image && (
                <div className="absolute top-0 right-0 w-24 h-24 opacity-15 group-hover:opacity-30 transition-opacity rounded-bl-3xl overflow-hidden pointer-events-none">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-[#C4B5FD] transition-colors">
                  {service.title}
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/10 group-hover:border-[#885FFF]/40 transition-all">
                  Inspect +
                </span>
              </div>
              <p className="font-body text-sm text-slate-300/80 leading-relaxed mb-4">
                {service.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-heading font-medium bg-[#885FFF]/15 text-[#C4B5FD] border border-[#885FFF]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Inspection Overlay */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-[#0E102E] border border-white/20 p-8 shadow-[0_20px_50px_rgba(65,0,245,0.3)] text-white"
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-lg transition-colors"
            >
              ✕
            </button>
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-[#885FFF] font-semibold">
                Service Breakdown
              </span>
              <h3 className="font-heading font-extrabold text-3xl mt-1 text-white">
                {activeItem.title}
              </h3>
            </div>
            <p className="font-body text-slate-300 text-base leading-relaxed mb-6">
              {activeItem.subtitle}
            </p>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
                Included Deliverables:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-heading font-medium bg-[#4100F5]/20 text-white border border-[#4100F5]/50 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CircularSplitRoll;
