// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const REDUCED_PERSPECTIVE = "4800px";

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;

const MOBILE_STEP = 0.8;
const TABLET_STEP = 5;
const DESKTOP_STEP = 10;

const MOBILE_ROTATE_IN = -20;
const TABLET_ROTATE_IN = -55;
const DESKTOP_ROTATE_IN = -95;

const MOBILE_ROTATE_OUT = 18;
const TABLET_ROTATE_OUT = 45;
const DESKTOP_ROTATE_OUT = 75;

const ROTATE_X_NEGATIVE = 5;
const ROTATE_X_POSITIVE = -5;

const ROTATION_REDUCTION_FACTOR = 0.15;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CardsRotateSliderImage {
  src?: string;
  text?: string;
  subtitle?: string;
  tags?: string[];
}

const DEFAULT_IMAGES: CardsRotateSliderImage[] = [
  {
    src: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    text: "Brand & Design",
    subtitle: "We don't just make logos. We build brand systems — identity, guidelines, visuals that hold up.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Print & Packaging"],
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    text: "Web & App Development",
    subtitle: "From landing pages to full platforms — built fast, built to scale.",
    tags: ["Websites", "Web Apps", "E-commerce", "Dashboards"],
  },
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    text: "Motion & Video",
    subtitle: "Content that moves. Reels, ads, product videos, motion graphics.",
    tags: ["Video Editing", "Motion Graphics", "Reels/Ads", "Product Videos"],
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    text: "3D & Visual FX",
    subtitle: "When flat isn't enough.",
    tags: ["3D Modeling", "Product Renders", "FX"],
  },
  {
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    text: "Social & Marketing",
    subtitle: "Built to be seen, not just posted.",
    tags: ["Content Strategy", "Social Management", "Ad Campaigns"],
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    text: "Academy / Training",
    subtitle: "We teach what we build.",
    tags: ["Bootcamps", "Webinars", "Partner Trainings"],
  },
];

export interface CardsRotateSliderProps {
  images?: CardsRotateSliderImage[];
  rotationAmount?: number;
  verticalDrift?: number;
  scrollSmoothing?: number;
  perspective?: number;
  showCaptions?: boolean;
  textColor?: string;
}

export default function CardsRotateSlider({
  images = DEFAULT_IMAGES,
  rotationAmount = 1,
  verticalDrift = 1,
  scrollSmoothing = 1,
  perspective = 1200,
  showCaptions = true,
  textColor = "#ffffff",
}: CardsRotateSliderProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;

    if (!outer || !track) return;

    const onResize = () => {
      const travel = track.scrollWidth - window.innerWidth;
      outer.style.height = `${travel + window.innerHeight}px`;
    };

    onResize();

    const resizeObserver = new ResizeObserver(onResize);

    resizeObserver.observe(track);
    window.addEventListener("resize", onResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [images]);

  useIsomorphicLayoutEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;

    if (!outer || !track) return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const isTablet = window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT;

    const context = gsap.context(() => {
      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: reducedMotion ? true : scrollSmoothing,
          invalidateOnRefresh: true,
        },
      });

      cardsRef.current.forEach((card, index) => {
        const wrapper = wrappersRef.current[index];

        if (!card || !wrapper) return;

        const total = images.length;
        const mid = Math.floor(total / 2);

        const step = (isMobile ? MOBILE_STEP : isTablet ? TABLET_STEP : DESKTOP_STEP) * verticalDrift;

        let offset: number;

        if (index < mid) {
          offset = -((mid - index) * step);
        } else {
          offset = (index - mid + 1) * step;
        }

        const rotationScale = reducedMotion ? ROTATION_REDUCTION_FACTOR : 1;

        const rotateXValue = (offset < 0 ? ROTATE_X_NEGATIVE : ROTATE_X_POSITIVE) * rotationScale;

        const rotateInValue =
          (isMobile ? MOBILE_ROTATE_IN : isTablet ? TABLET_ROTATE_IN : DESKTOP_ROTATE_IN) * rotationScale * rotationAmount;

        const rotateOutValue =
          (isMobile ? MOBILE_ROTATE_OUT : isTablet ? TABLET_ROTATE_OUT : DESKTOP_ROTATE_OUT) * rotationScale * rotationAmount;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            containerAnimation: horizontalTween,
            start: "left 100%",
            end: "right 0%",
            scrub: true,
          },
        });

        tl.fromTo(
          card,
          {
            rotateY: rotateInValue,
            rotateX: rotateXValue,
            opacity: 0.8,
            y: `${offset}vh`,
          },
          {
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            y: 0,
            ease: "none",
          },
        ).to(card, {
          rotateY: rotateOutValue,
          opacity: 0.9,
          y: `${-offset}vh`,
          ease: "none",
        });
      });

      ScrollTrigger.refresh();
    });

    return () => context.revert();
  }, [images, rotationAmount, verticalDrift, scrollSmoothing]);

  return (
    <div ref={outerRef} className="relative bg-transparent" style={{ overflowX: "clip" }}>
      <div
        className="sticky top-0 flex h-screen items-start pt-20 sm:pt-24 md:pt-28 overflow-hidden"
        style={{ perspective: reducedMotion ? REDUCED_PERSPECTIVE : `${perspective}px` }}
      >
        <div
          ref={trackRef}
          className="relative z-10 flex h-full items-start will-change-transform gap-[5vw] max-[1025px]:gap-[6vw] max-md:gap-[8vw] pl-[30vw] pr-[30vw] max-[1025px]:pl-[20vw] max-[1025px]:pr-[20vw] max-md:pl-[7.5vw] max-md:pr-[7.5vw]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              ref={(element) => {
                wrappersRef.current[index] = element;
              }}
              className="relative flex h-[50vh] w-[40vw] shrink-0 items-center justify-center max-[1025px]:h-[46vh] max-[1025px]:w-[58vw] max-md:h-[54vh] max-md:w-[85vw] max-[1025px]:[&>div]:h-[46vh] max-[1025px]:[&>div]:w-[58vw] max-md:[&>div]:h-[54vh] max-md:[&>div]:w-[85vw]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <RotationCard
                ref={(element) => {
                  cardsRef.current[index] = element;
                }}
                src={img.src}
                text={img.text}
                subtitle={img.subtitle}
                tags={img.tags}
                index={index}
                total={images.length}
                showCaptions={showCaptions}
                textColor={textColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface RotationCardProps {
  src?: string;
  index: number;
  total: number;
  text?: string;
  subtitle?: string;
  tags?: string[];
  showCaptions: boolean;
  textColor: string;
}

const RotationCard = forwardRef<HTMLDivElement, RotationCardProps>(
  ({ src, index, total, text, subtitle, tags, showCaptions, textColor }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute h-[50vh] w-[40vw] origin-right overflow-hidden rounded-3xl border border-white/20 opacity-0 shadow-[0_15px_40px_rgba(0,0,0,0.6)] max-md:h-[54vh] max-md:w-[85vw] group backdrop-blur-xl bg-[#0A0C22]/90"
        style={{
          transformStyle: "preserve-3d",
          zIndex: total - index,
        }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          <img src={src} alt={text || "slide"} className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030412] via-[#030412]/70 to-transparent" />
        </div>

        {showCaptions && (
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-heading text-xs font-semibold tracking-widest text-[#885FFF] uppercase">
                0{index + 1} / 0{total}
              </span>
              <span className="rounded-full bg-[#4100F5]/30 border border-[#4100F5]/60 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-heading text-white">
                Service Tile
              </span>
            </div>

            {text && (
              <h3
                className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-1.5 sm:mb-2"
                style={{
                  color: textColor,
                  textShadow: "0 0.15vw 0.35vw rgba(0,0,0,0.5)",
                }}
              >
                {text}
              </h3>
            )}

            {subtitle && (
              <p className="font-body text-[11px] sm:text-xs md:text-sm text-slate-300 leading-snug sm:leading-relaxed mb-3 sm:mb-4 max-w-lg line-clamp-3">
                {subtitle}
              </p>
            )}

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-2 pt-2 border-t border-white/15">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-heading font-medium bg-[#4100F5]/20 text-[#C4B5FD] border border-[#4100F5]/40 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

RotationCard.displayName = "RotationCard";
