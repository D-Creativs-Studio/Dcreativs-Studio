import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { portfolioCategories } from "@/data/portfolioData";
import { SEO } from "@/components/common/SEO";
import { Footer } from "@/components/sections/Footer";

/* ─────────────────────────────────────────────────────────────────
   Layout switch
   - Desktop (>=1024px): infinite drag / scroll canvas
   - Below 1024px: vertical editorial list (modelled on anakle.com/work)
   ───────────────────────────────────────────────────────────────── */
const DESKTOP_QUERY = "(min-width: 1024px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
  );
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

// Category order used by the mobile list and for interleaving canvas cards
const CATEGORY_ORDER = [
  "web-development",
  "brand-identity",
  "motion-video",
  "3d-visual-fx",
  "ui-ux-design",
  "ai-automations",
];

/* ── Canvas metrics: 3 columns x 2 rows, repeated infinitely ── */
function getCanvasMetrics() {
  // Generous spacing so no two cards ever crowd each other (min ~320px clear gap)
  const colPitch = 900; // widest card 580px + 320px gap
  const rowPitch = 950;
  const staggerY = 380; // middle column sits well below its neighbours
  const canvasW = 3 * colPitch; // 2700px
  const canvasH = 2 * rowPitch; // 1900px
  return { colPitch, rowPitch, staggerY, canvasW, canvasH, startX: 80, startY: 60 };
}

// One card per category: every project in a category lives under its single card.
const cardLayout = [
  // Web card uses a desktop-screen frame to show the desktop hero screenshot
  { col: 0, row: 0, slug: "web-development", w: "w-[540px] xl:w-[580px]", aspect: "aspect-[16/10]" },
  { col: 0, row: 1, slug: "brand-identity", w: "w-[450px] xl:w-[480px]", aspect: "aspect-[16/11]" },
  { col: 1, row: 0, slug: "motion-video", w: "w-[440px] xl:w-[470px]", aspect: "aspect-[16/11]" },
  { col: 1, row: 1, slug: "3d-visual-fx", w: "w-[410px] xl:w-[450px]", aspect: "aspect-[3/4]" },
  { col: 2, row: 0, slug: "ui-ux-design", w: "w-[410px] xl:w-[440px]", aspect: "aspect-[4/5]" },
  { col: 2, row: 1, slug: "ai-automations", w: "w-[450px] xl:w-[480px]", aspect: "aspect-[16/11]" },
];

/* ── Modulo wrap helper (always positive result) ─────────── */
function wrap(value, max) {
  return ((value % max) + max) % max;
}

/* ─────────────────────────────────────────────────────────────────
   Desktop: Infinite Canvas
   ───────────────────────────────────────────────────────────────── */
function WorksCanvas() {
  const containerRef = useRef(null);

  // Smooth fluid camera coordinates: target vs current (Lerp)
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const lastTime = useRef(performance.now());
  const metricsRef = useRef(getCanvasMetrics());

  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const pointerDownTime = useRef(0);
  const dragDist = useRef(0);
  const rafId = useRef(null);
  const cardRefs = useRef([]);

  // Custom cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { damping: 22, stiffness: 280, mass: 0.5 });
  const smoothCursorY = useSpring(cursorY, { damping: 22, stiffness: 280, mass: 0.5 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device and handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
      );
      metricsRef.current = getCanvasMetrics();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Render loop: update card positions with seamless center wrap ── */
  const updateCards = useCallback((ox, oy) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const m = metricsRef.current;

    // Viewport center
    const cx = vw * 0.5;
    const cy = vh * 0.5;
    const halfW = m.canvasW * 0.5;
    const halfH = m.canvasH * 0.5;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const layout = cardLayout[i];

      // Calculate base responsive coordinates
      const isStaggered = layout.col % 2 === 1;
      const baseX = m.startX + layout.col * m.colPitch;
      const baseY = m.startY + layout.row * m.rowPitch + (isStaggered ? m.staggerY : 0);

      // Symmetrically centered wrapping
      const dx = wrap(baseX - ox - cx + halfW, m.canvasW) - halfW;
      const dy = wrap(baseY - oy - cy + halfH, m.canvasH) - halfH;

      const px = cx + dx;
      const py = cy + dy;

      el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
    });
  }, []);

  /* ── Animation loop: framerate-independent smooth Lerp physics ──── */
  const tick = useCallback(() => {
    const now = performance.now();
    const dt = Math.min((now - lastTime.current) / 1000, 0.1);
    lastTime.current = now;

    if (isDragging.current) {
      // Direct 1:1 tracking while dragging for instant responsiveness
      currentOffset.current.x = targetOffset.current.x;
      currentOffset.current.y = targetOffset.current.y;
    } else {
      // Apply momentum decay if dragging just released with velocity
      if (Math.abs(dragVelocity.current.x) > 0.05 || Math.abs(dragVelocity.current.y) > 0.05) {
        targetOffset.current.x += dragVelocity.current.x;
        targetOffset.current.y += dragVelocity.current.y;
        dragVelocity.current.x *= 0.92;
        dragVelocity.current.y *= 0.92;
      }

      // Framerate-independent exponential smoothing: works identical on 60Hz, 120Hz, 144Hz
      const lerpSpeed = 9.5;
      const factor = 1 - Math.exp(-lerpSpeed * dt);

      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * factor;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * factor;
    }

    updateCards(currentOffset.current.x, currentOffset.current.y);
    rafId.current = requestAnimationFrame(tick);
  }, [updateCards]);

  // Start animation loop
  useEffect(() => {
    targetOffset.current = { x: 0, y: 0 };
    currentOffset.current = { x: 0, y: 0 };
    lastTime.current = performance.now();
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  /* ── Pointer events (mouse + touch unified) ────────────── */
  const handlePointerDown = useCallback((e) => {
    if (e.button === 2) return;
    isDragging.current = true;
    dragDist.current = 0;
    pointerDownTime.current = Date.now();
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = { x: 0, y: 0 };
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setIsGrabbing(true);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (!isTouchDevice) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }

      if (!isDragging.current) return;

      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      dragDist.current += Math.hypot(dx, dy);

      // Invert: drag right = camera pans right
      targetOffset.current.x -= dx;
      targetOffset.current.y -= dy;
      currentOffset.current.x -= dx;
      currentOffset.current.y -= dy;

      // Track release velocity for inertial glide
      dragVelocity.current = { x: -dx * 0.9, y: -dy * 0.9 };
      lastPointer.current = { x: e.clientX, y: e.clientY };
    },
    [isTouchDevice, cursorX, cursorY]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    setIsGrabbing(false);
  }, []);

  /* ── Smooth Mouse Wheel → Vertical & 2D Pan with Target Lerp ────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      e.preventDefault();

      let dx = e.deltaX;
      let dy = e.deltaY;

      // Shift + mouse wheel or trackpad horizontal pan moves horizontally; standard wheel scrolls vertically
      if (e.shiftKey && !dx && dy) {
        dx = dy;
        dy = 0;
      }

      // Normalize delta mode
      let factor = 1.0;
      if (e.deltaMode === 1) factor = 28;
      else if (e.deltaMode === 2) factor = window.innerHeight;

      // Push to TARGET offset — the animation loop will smoothly glide to it
      targetOffset.current.x += dx * factor * 0.85;
      targetOffset.current.y += dy * factor * 0.85;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#F8F8F6]">

      {/* ── FIXED "WORKS" Heading — stays centered, cards flow around it ── */}
      <div className="fixed inset-0 z-[1] flex flex-col items-center justify-center pointer-events-none select-none">
        <h1
          className="font-heading font-black tracking-tighter leading-none text-[#885FFF] inline-flex items-center justify-center"
          style={{
            fontSize: "clamp(72px, 18vw, 260px)",
            opacity: 0.14,
          }}
        >
          <span>WORKS</span>
        </h1>
        <p
          className="mt-1 sm:mt-3 text-xs sm:text-sm font-body font-medium tracking-[0.3em] uppercase"
          style={{ color: "rgba(136, 95, 255, 0.25)" }}
        >
          scroll / drag to explore
        </p>
      </div>

      {/* ── Custom Cursor (desktop only) ──────────────────── */}
      {!isTouchDevice && (
        <motion.div
          style={{ left: smoothCursorX, top: smoothCursorY }}
          animate={{
            scale: isCursorVisible ? 1 : 0,
            opacity: isCursorVisible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed -translate-x-1/2 -translate-y-1/2 z-[60] w-14 h-14 sm:w-16 sm:h-16 rounded-full pointer-events-none mix-blend-difference bg-white flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-black text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest select-none">
            {isGrabbing ? "•••" : "Drag"}
          </span>
        </motion.div>
      )}

      {/* ── Draggable Canvas Area ─────────────────────────── */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          handlePointerUp();
          setIsCursorVisible(false);
        }}
        onPointerEnter={() => {
          if (!isTouchDevice) setIsCursorVisible(true);
        }}
        className="absolute inset-0 z-[5] select-none"
        style={{
          cursor: isTouchDevice ? "default" : isGrabbing ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        {/* ── Cards — positioned via JS in the animation loop ── */}
        {cardLayout.map((layout, idx) => {
          const category = portfolioCategories.find((c) => c.slug === layout.slug);
          if (!category) return null;

          const categoryUrl = `/works/${category.slug}`;
          // Canvas is desktop-only: prefer desktop card artwork (desktop hero screenshots)
          const image = category.cardImageDesktop || category.image;
          // Every project in this category, shown as sub text on hover
          const projectNames =
            (category.caseStudies || []).map((cs) => cs.title).join(" · ") || category.category;

          return (
            <div
              key={category.slug}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="absolute top-0 left-0 will-change-transform"
              style={{ transform: `translate3d(-9999px, -9999px, 0)` }}
            >
              <Link
                to={categoryUrl}
                onClick={(e) => {
                  const dist = Math.hypot(
                    e.clientX - pointerDownPos.current.x,
                    e.clientY - pointerDownPos.current.y
                  );
                  const elapsed = Date.now() - pointerDownTime.current;
                  // If user dragged (>25px) or held (>700ms), don't trigger navigation;
                  // otherwise the Link navigates to the category page.
                  if (dist > 25 || elapsed > 700) e.preventDefault();
                }}
                className="block group cursor-pointer"
                draggable={false}
              >
                <div
                  className={`${layout.w} ${layout.aspect} relative overflow-hidden bg-[#EDEDEA]`}
                >
                  {/* Image — sharp, clean rectangle; gentle zoom on hover */}
                  <img
                    src={image}
                    alt={category.name}
                    className={`absolute inset-0 w-full h-full object-cover ${category.cardImageDesktop ? "object-top" : ""} transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]`}
                    loading="eager"
                    draggable={false}
                  />

                  {/* Legibility scrim — invisible until hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Hover-only label: category, with project name as sub text */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-10 pointer-events-none">
                    <div className="overflow-hidden">
                      <h3 className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-white text-lg sm:text-2xl font-heading font-bold tracking-tight leading-tight">
                        {category.name}
                      </h3>
                    </div>
                    <div className="overflow-hidden mt-1">
                      <p className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-0 group-hover:delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] text-white/80 text-xs sm:text-sm font-body leading-snug line-clamp-2">
                        {projectNames}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Mobile & Tablet: Vertical List (anakle.com/work pattern)
   Image wipes open left to right once the card is ~70px into view,
   followed by the category title and description.
   ───────────────────────────────────────────────────────────────── */
const WIPE_EASE = [0.44, 0, 0.56, 1];

function WorksListCard({ category }) {
  const reduceMotion = useReducedMotion();

  return (
    <Link to={`/works/${category.slug}`} className="block" draggable={false}>
      <motion.div
        className="relative w-full aspect-[35/48] sm:aspect-[633/640] overflow-hidden bg-[#EDEDEA]"
        initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "0px 0px -70px 0px" }}
        transition={{ duration: 1.2, ease: WIPE_EASE }}
      >
        <img
          src={category.listImage || category.cardImage || category.image}
          alt={category.name}
          className={`absolute inset-0 w-full h-full object-cover ${category.cardImage && !category.listImage ? "object-top" : ""}`}
          loading="lazy"
          draggable={false}
        />
      </motion.div>

      <h2 className="mt-6 text-xl sm:text-[28px] font-heading font-bold tracking-tight leading-tight text-[#0A0A0A]">
        {category.name}
      </h2>
      <p className="mt-3 text-sm sm:text-base font-body leading-relaxed text-[#0A0A0A]/70">
        {category.shortDescription}
      </p>
    </Link>
  );
}

function WorksList() {
  // Same category order as the desktop canvas
  const categories = CATEGORY_ORDER
    .map((slug) => portfolioCategories.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <div className="bg-[#F8F8F6] text-[#0A0A0A]">
      <section className="px-5 sm:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28">
        <header className="max-w-[633px] mx-auto">
          <h1 className="font-heading font-black tracking-tighter leading-none text-[56px] sm:text-[96px]">
            Works
          </h1>
          <p className="mt-4 max-w-[320px] sm:max-w-[420px] text-sm sm:text-base font-body leading-relaxed text-[#0A0A0A]/70">
            A look at the work we&apos;ve crafted across web, brand, motion, 3D and automation.
          </p>
        </header>

        <div className="max-w-[633px] mx-auto mt-14 sm:mt-20 flex flex-col gap-20">
          {categories.map((category) => (
            <WorksListCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WorksPage: picks the layout for the current screen size
   ───────────────────────────────────────────────────────────────── */
export function WorksPage() {
  const isDesktop = useIsDesktop();

  return (
    <>
      <SEO
        title="Our Work — Portfolio"
        description="Explore D'Creativs Studio's portfolio of web development, brand design, 3D CGI, motion graphics, UI/UX, and AI automation projects."
      />
      {isDesktop ? <WorksCanvas /> : <WorksList />}
    </>
  );
}

export default WorksPage;
