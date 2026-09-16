import { useRef, useMemo } from "react";
import DottedMap from "dotted-map";

/**
 * WorldMap – Vite + React.
 * Uses only native SVG animations (no CSS offsetPath, no Framer Motion for circles).
 * This guarantees round dots and reliable arc animations across all browsers.
 */
export function WorldMap({
  dots = [],
  lineColor = "#885FFF",
  dotColor = "#00000025",
  showLabels = false,
  animationDuration = 2,
  loop = true,
}) {
  const svgRef = useRef(null);

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: dotColor,
        shape: "circle",
        backgroundColor: "transparent",
      }),
    [map, dotColor]
  );

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Pre-compute all projected points and paths
  const computed = dots.map((dot, i) => {
    const start = projectPoint(dot.start.lat, dot.start.lng);
    const end = projectPoint(dot.end.lat, dot.end.lng);
    const pathD = createCurvedPath(start, end);
    const staggerStart = i * 0.4; // seconds delay before this arc starts
    return { start, end, pathD, staggerStart };
  });

  const totalCycle = dots.length * 0.4 + animationDuration + 2; // full loop duration

  const repeatCount = loop ? "indefinite" : "1";

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Dotted world map background */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-cover"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
        }}
        alt="world map"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for arc lines */}
          <linearGradient id="wm-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="0.7" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>

          {/* Soft glow filter for dots */}
          <filter id="wm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Define arc paths in defs for animateMotion mpath */}
          {computed.map(({ pathD }, i) => (
            <path key={`def-${i}`} id={`wm-arc-${i}`} d={pathD} />
          ))}
        </defs>

        {/* ── Arc lines with native SVG stroke-dasharray animation ── */}
        {computed.map(({ pathD, staggerStart }, i) => (
          <path
            key={`arc-${i}`}
            d={pathD}
            fill="none"
            stroke="url(#wm-line-grad)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            pathLength="1"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1"
              to="0"
              dur={`${animationDuration}s`}
              begin={loop ? `${staggerStart}s;wm-arc-${i}-anim.end+${totalCycle - staggerStart - animationDuration}s` : `${staggerStart}s`}
              id={`wm-arc-${i}-anim`}
              fill="freeze"
              repeatCount={repeatCount === "indefinite" ? undefined : repeatCount}
            />
            {loop && (
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="0"
                dur={`${totalCycle - animationDuration}s`}
                begin={`wm-arc-${i}-anim.end`}
                fill="freeze"
              />
            )}
          </path>
        ))}

        {/* ── Travelling dot along each arc ── */}
        {computed.map(({ staggerStart }, i) => (
          <circle
            key={`traveller-${i}`}
            r="2.5"
            fill={lineColor}
            filter="url(#wm-glow)"
            opacity="0"
          >
            <animateMotion
              dur={`${animationDuration}s`}
              begin={loop ? `${staggerStart}s;wm-dot-${i}-vis.end+${totalCycle - staggerStart - animationDuration}s` : `${staggerStart}s`}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
              repeatCount={repeatCount === "indefinite" ? undefined : repeatCount}
            >
              <mpath href={`#wm-arc-${i}`} />
            </animateMotion>
            <animate
              id={`wm-dot-${i}-vis`}
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.05;0.9;1"
              dur={`${animationDuration}s`}
              begin={loop ? `${staggerStart}s;wm-dot-${i}-vis.end+${totalCycle - staggerStart - animationDuration}s` : `${staggerStart}s`}
              repeatCount={repeatCount === "indefinite" ? undefined : repeatCount}
            />
          </circle>
        ))}

        {/* ── Location dots: solid circle + pulse ring ── */}
        {computed.map(({ start, end }, i) => (
          <g key={`dots-${i}`}>
            {/* Origin dot */}
            <circle
              cx={start.x}
              cy={start.y}
              r="2.5"
              fill={lineColor}
              opacity="0.9"
              filter="url(#wm-glow)"
            />
            {/* Origin pulse */}
            <circle cx={start.x} cy={start.y} r="2.5" fill="none" stroke={lineColor} strokeWidth="0.8" opacity="0">
              <animate attributeName="r" from="2.5" to="8" dur="2.5s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>

            {/* Destination dot */}
            <circle
              cx={end.x}
              cy={end.y}
              r="2.5"
              fill={lineColor}
              opacity="0.9"
              filter="url(#wm-glow)"
            />
            {/* Destination pulse */}
            <circle cx={end.x} cy={end.y} r="2.5" fill="none" stroke={lineColor} strokeWidth="0.8" opacity="0">
              <animate attributeName="r" from="2.5" to="8" dur="2.5s" begin={`${i * 0.25 + 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" begin={`${i * 0.25 + 0.5}s`} repeatCount="indefinite" />
            </circle>

            {/* Optional label */}
            {showLabels && dot.end.label && (
              <foreignObject x={end.x - 50} y={end.y - 36} width="100" height="28">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 4, background: "rgba(13,14,42,0.9)", color: "#fff", border: "1px solid rgba(65,0,245,0.4)", whiteSpace: "nowrap" }}>
                    {dot.end.label}
                  </span>
                </div>
              </foreignObject>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
