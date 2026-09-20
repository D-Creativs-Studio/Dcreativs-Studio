import { useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { portfolioCategories } from "@/data/portfolioData";
import { SEO } from "@/components/common/SEO";
import { ArrowUpRight, ArrowRight, Move } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Responsive Canvas & Card Configuration
   Canvas dimensions and spacing adapt dynamically:
   - Mobile (<640px): snug 30-40px spacing tailored for touch
   - Tablet (640-1023px): balanced medium spacing
   - Desktop (>=1024px): spacious high-end editorial constellation
   ───────────────────────────────────────────────────────────────── */

function getCanvasMetrics(vw) {
  if (vw < 640) {
    // Mobile phones (e.g. 375px - 430px)
    const colPitch = 290;  // 250px card + ~40px gap
    const rowPitch = 560;  // snug vertical spacing with stagger
    const staggerY = 170;  // alternating column stagger
    const canvasW = 4 * colPitch; // 1160px
    const canvasH = 3 * rowPitch; // 1680px
    return { colPitch, rowPitch, staggerY, canvasW, canvasH, startX: 20, startY: 30 };
  } else if (vw < 1024) {
    // Tablets (e.g. 640px - 1023px)
    const colPitch = 440;  // 340px card + 100px gap
    const rowPitch = 660;
    const staggerY = 220;
    const canvasW = 4 * colPitch; // 1760px
    const canvasH = 3 * rowPitch; // 1980px
    return { colPitch, rowPitch, staggerY, canvasW, canvasH, startX: 40, startY: 40 };
  } else {
    // Desktop (>= 1024px)
    const colPitch = 720;  // 440px card + 280px gap
    const rowPitch = 820;
    const staggerY = 250;
    const canvasW = 4 * colPitch; // 2880px
    const canvasH = 3 * rowPitch; // 2460px
    return { colPitch, rowPitch, staggerY, canvasW, canvasH, startX: 80, startY: 60 };
  }
}

// 12 Portfolio Category Cards across 4 columns × 3 rows (2 per category for seamless looping)
const cardLayout = [
  // ── Column 1 (col: 0) ──────────────────────────────────
  {
    col: 0,
    row: 0,
    slug: "web-development",
    image: "/projects/pulse.jpg",
    w: "w-[240px] min-[400px]:w-[260px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[450px]",
    aspect: "aspect-[3/4]",
  },
  {
    col: 0,
    row: 1,
    slug: "brand-identity",
    image: "/projects/aurora.jpg",
    w: "w-[250px] min-[400px]:w-[270px] sm:w-[350px] md:w-[410px] lg:w-[450px] xl:w-[480px]",
    aspect: "aspect-[16/11]",
  },
  {
    col: 0,
    row: 2,
    slug: "ui-ux-design",
    image: "/projects/vantage.jpg",
    w: "w-[230px] min-[400px]:w-[250px] sm:w-[320px] md:w-[370px] lg:w-[410px] xl:w-[440px]",
    aspect: "aspect-[4/5]",
  },

  // ── Column 2 (col: 1) ──────────────────────────────────
  {
    col: 1,
    row: 0,
    slug: "motion-video",
    image: "/projects/ember.jpg",
    w: "w-[250px] min-[400px]:w-[270px] sm:w-[340px] md:w-[400px] lg:w-[440px] xl:w-[470px]",
    aspect: "aspect-[16/11]",
  },
  {
    col: 1,
    row: 1,
    slug: "3d-visual-fx",
    image: "/projects/drift.jpg",
    w: "w-[240px] min-[400px]:w-[260px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[450px]",
    aspect: "aspect-[3/4]",
  },
  {
    col: 1,
    row: 2,
    slug: "ai-automations",
    image: "/projects/synapse.jpg",
    w: "w-[240px] min-[400px]:w-[260px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[450px]",
    aspect: "aspect-[3/4]",
  },

  // ── Column 3 (col: 2) ──────────────────────────────────
  {
    col: 2,
    row: 0,
    slug: "web-development",
    image: "/projects/monolith.jpg",
    w: "w-[240px] min-[400px]:w-[260px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[450px]",
    aspect: "aspect-[3/4]",
  },
  {
    col: 2,
    row: 1,
    slug: "brand-identity",
    image: "/projects/aurora.jpg",
    w: "w-[250px] min-[400px]:w-[270px] sm:w-[350px] md:w-[410px] lg:w-[450px] xl:w-[480px]",
    aspect: "aspect-[16/11]",
  },
  {
    col: 2,
    row: 2,
    slug: "ui-ux-design",
    image: "/projects/pulse.jpg",
    w: "w-[230px] min-[400px]:w-[250px] sm:w-[320px] md:w-[370px] lg:w-[410px] xl:w-[440px]",
    aspect: "aspect-[4/5]",
  },

  // ── Column 4 (col: 3) ──────────────────────────────────
  {
    col: 3,
    row: 0,
    slug: "motion-video",
    image: "/projects/drift.jpg",
    w: "w-[230px] min-[400px]:w-[250px] sm:w-[320px] md:w-[370px] lg:w-[410px] xl:w-[440px]",
    aspect: "aspect-[4/5]",
  },
  {
    col: 3,
    row: 1,
    slug: "3d-visual-fx",
    image: "/projects/monolith.jpg",
    w: "w-[240px] min-[400px]:w-[260px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[450px]",
    aspect: "aspect-[3/4]",
  },
  {
    col: 3,
    row: 2,
    slug: "ai-automations",
    image: "/projects/pulse.jpg",
    w: "w-[250px] min-[400px]:w-[270px] sm:w-[350px] md:w-[410px] lg:w-[450px] xl:w-[480px]",
    aspect: "aspect-[16/11]",
  },
];

/* ── Modulo wrap helper (always positive result) ─────────── */
function wrap(value, max) {
  return ((value % max) + max) % max;
}

/* ─────────────────────────────────────────────────────────────────
   WorksPage Component
   ───────────────────────────────────────────────────────────────── */
export function WorksPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Smooth fluid camera coordinates: target vs current (Lerp)
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const lastTime = useRef(performance.now());
  const metricsRef = useRef(getCanvasMetrics(typeof window !== "undefined" ? window.innerWidth : 1200));

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
      metricsRef.current = getCanvasMetrics(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Build category lookup map ──────────────────────────── */
  const categoryMap = useRef({});
  useEffect(() => {
    portfolioCategories.forEach((cat) => {
      categoryMap.current[cat.slug] = cat;
    });
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
      <SEO
        title="Our Work — Portfolio"
        description="Explore D'Creativs Studio's portfolio of web development, brand design, 3D CGI, motion graphics, UI/UX, and AI automation projects."
      />

      {/* ── FIXED "WORKS" Heading — stays centered, cards flow around it ── */}
      <div className="fixed inset-0 z-[1] flex flex-col items-center justify-center pointer-events-none select-none">
        <h1
          className="font-heading font-black tracking-tighter leading-none text-[#885FFF] inline-flex items-center justify-center"
          style={{
            fontSize: "clamp(72px, 18vw, 260px)",
            opacity: 0.14,
          }}
        >
          <span>WORK</span>
          <span className="relative inline-flex items-center justify-center ml-[0.01em]">
            {/* The S aperture */}
            <span className="inline-block overflow-hidden pb-1 -mb-1">
              <motion.span
                className="inline-block will-change-transform"
                animate={{
                  y: ["0%", "0%", "102%", "102%", "0%", "0%"],
                  opacity: [1, 1, 0, 0, 1, 1],
                }}
                transition={{
                  duration: 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.35, 0.5, 0.7, 0.85, 1],
                }}
              >
                S
              </motion.span>
            </span>

            {/* Terminal Block under the S */}
            <motion.span
              className="absolute -bottom-1.5 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[85%] rounded-sm bg-[#885FFF] will-change-transform"
              style={{
                height: "clamp(5px, 0.9vw, 15px)",
              }}
              animate={{
                opacity: [0.65, 0.65, 1, 1, 0.65, 0.65],
                scaleX: [1, 1, 1.12, 1.12, 1, 1],
              }}
              transition={{
                duration: 0.45,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.35, 0.5, 0.7, 0.85, 1],
              }}
            />
          </span>
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
          const category = categoryMap.current[layout.slug] || portfolioCategories.find(c => c.slug === layout.slug);
          if (!category) return null;

          const title = category.name;
          const subtitle = category.category;
          const image = layout.image || category.image;
          const desc = category.shortDescription;
          const number = category.id;

          return (
            <div
              key={`${layout.slug}-${idx}`}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="absolute top-0 left-0 will-change-transform"
              style={{ transform: `translate3d(-9999px, -9999px, 0)` }}
            >
              <Link
                to={`/works/${category.slug}`}
                onClick={(e) => {
                  const dist = Math.hypot(
                    e.clientX - pointerDownPos.current.x,
                    e.clientY - pointerDownPos.current.y
                  );
                  const elapsed = Date.now() - pointerDownTime.current;
                  // If user dragged (>25px) or held (>700ms), don't trigger navigation
                  if (dist > 25 || elapsed > 700) {
                    e.preventDefault();
                    return;
                  }
                  // Deliberate click/tap: navigate directly to category portfolio
                  navigate(`/works/${category.slug}`);
                }}
                className="block group cursor-pointer"
                draggable={false}
              >
                <div
                  className={`${layout.w} ${layout.aspect} relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.32)]`}
                  style={{
                    boxShadow: "0 20px 50px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Image */}
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    draggable={false}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 90px ${category.accent}`,
                    }}
                  />

                  {/* Top badges: ID and Portfolio tag */}
                  <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 z-10 flex items-center gap-2">
                    <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-black/60 text-white/90 backdrop-blur-md border border-white/15">
                      {number}
                    </span>
                    <span className="hidden sm:inline-block px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/15 text-white/90 backdrop-blur-md border border-white/15">
                      Portfolio
                    </span>
                  </div>

                  {/* Arrow button */}
                  <div className="absolute top-3.5 sm:top-5 right-3.5 sm:right-5 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 sm:bg-white/10 group-hover:bg-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-[#030412] transition-colors" />
                  </div>

                  {/* Card content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7 z-10 flex flex-col justify-end">
                    <p className="text-[#885FFF] font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-1 font-semibold">
                      {subtitle}
                    </p>
                    <h3 className="text-white text-base sm:text-xl lg:text-2xl font-heading font-bold tracking-tight leading-tight">
                      {title}
                    </h3>
                    <p className="hidden sm:block text-white/70 text-xs sm:text-sm font-body mt-1.5 line-clamp-2 leading-relaxed max-w-sm">
                      {desc}
                    </p>
                    <div className="mt-2.5 sm:mt-3 flex items-center gap-1 text-[11px] sm:text-xs font-heading font-semibold text-white/90 group-hover:text-white transition-colors">
                      <span className="underline underline-offset-4 decoration-[#885FFF]">Explore Portfolio</span>
                      <ArrowRight className="w-3 h-3 text-[#885FFF] transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* ── Mobile affordance hint (auto-fades) ──────────── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none sm:hidden"
      >
        <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-heading font-semibold tracking-wide flex items-center gap-2">
          <Move className="w-3.5 h-3.5 text-[#885FFF]" />
          <span>Drag to explore</span>
        </div>
      </motion.div>
    </div>
  );
}

export default WorksPage;
