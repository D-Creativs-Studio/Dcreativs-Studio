import { Activity } from "lucide-react";

/**
 * Curated metadata dictionary for creative & engineering tools
 */
const TOOL_METADATA = {
  // Design & Branding
  "Figma": {
    tag: "DESIGN SYSTEM",
    role: "Vector & Collaborative UI Architecture",
    accent: "#F24E1E",
    badge: "Cloud Master",
    metric: "100% Componentized",
  },
  "Adobe Illustrator": {
    tag: "VECTOR ENGINE",
    role: "Infinitely Scalable Brand Identity & Marks",
    accent: "#FF9A00",
    badge: "Vector Suite",
    metric: "Lossless Precision",
  },
  "Adobe Photoshop": {
    tag: "IMAGE PIPELINE",
    role: "Master Compositing & Surface Texture Work",
    accent: "#31A8FF",
    badge: "Post Production",
    metric: "32-Bit Depth",
  },
  "Indesign": {
    tag: "EDITORIAL",
    role: "High-Precision Print & Multi-Page Layouts",
    accent: "#FF3366",
    badge: "Print Ready",
    metric: "Typography Rules",
  },
  "Spline": {
    tag: "3D WEB INTERACTION",
    role: "Interactive Real-Time WebGL 3D Canvas",
    accent: "#00D8FF",
    badge: "WebGL 3D",
    metric: "60 FPS Interactive",
  },

  // Web & App Development
  "React": {
    tag: "CORE ARCHITECTURE",
    role: "Component State Management & React 19 Ecosystem",
    accent: "#61DAFB",
    badge: "Virtual DOM",
    metric: "Modular & Scalable",
  },
  "Next.js": {
    tag: "EDGE FRAMEWORK",
    role: "Server-Side Rendering, Static Edge & API Routes",
    accent: "#FFFFFF",
    badge: "Production SSR",
    metric: "Sub-100ms TTFB",
  },
  "TailwindCSS": {
    tag: "DESIGN TOKENS",
    role: "Strict Utility Design Systems & Modern Layouts",
    accent: "#38BDF8",
    badge: "Zero Runtime",
    metric: "Micro CSS Payload",
  },
  "Node.js": {
    tag: "RUNTIME ENVIRONMENT",
    role: "High-Concurrency Async Services & API Backends",
    accent: "#22C55E",
    badge: "Async Engine",
    metric: "Non-Blocking I/O",
  },
  "TypeScript": {
    tag: "TYPE RIGOR",
    role: "Static End-to-End Type Contracts & Code Safety",
    accent: "#3178C6",
    badge: "Strict Mode",
    metric: "Zero Runtime Bugs",
  },
  "GSAP": {
    tag: "PHYSICS & MOTION",
    role: "ScrollTrigger, Timeline Choreography & Physics",
    accent: "#88CE02",
    badge: "GPU Accelerated",
    metric: "Silky 60fps Scroll",
  },
  "Vite": {
    tag: "BUILD ENGINE",
    role: "Lightning Fast ESM Bundling & Hot Module Reload",
    accent: "#BD34FE",
    badge: "Instant HMR",
    metric: "Optimized Output",
  },

  // Motion & Video
  "After Effects": {
    tag: "MOTION GRAPHICS",
    role: "Cinema Compositing, Particle FX & Kinetic Type",
    accent: "#9999FF",
    badge: "Broadcast Master",
    metric: "Multi-Pass Render",
  },
  "Premiere Pro": {
    tag: "CINEMA EDITING",
    role: "Timeline Pacing, Commercial Narrative & Cuts",
    accent: "#EA77FF",
    badge: "ProRes 4444",
    metric: "4K Master Delivery",
  },
  "Cinema 4D": {
    tag: "3D MOGRAPH",
    role: "Procedural Animation, Cloners & Dynamics",
    accent: "#002BFF",
    badge: "MoGraph Engine",
    metric: "Dynamic Physics",
  },
  "DaVinci Resolve": {
    tag: "COLOR SCIENCE",
    role: "Hollywood Color Grading & Fairlight Mastering",
    accent: "#FF6600",
    badge: "ACES Pipeline",
    metric: "HDR Film Emulation",
  },
  "Audition": {
    tag: "AUDIO MASTERING",
    role: "Spectral Frequency Restoration & Sonic Mixing",
    accent: "#00E5FF",
    badge: "Surround 5.1",
    metric: "-14 LUFS Target",
  },

  // 3D & Visual FX
  "Blender": {
    tag: "3D MODELING & FX",
    role: "Cycles & Eevee Raytracing, Geometry & Nodes",
    accent: "#EA7600",
    badge: "Cycles GPU",
    metric: "Bespoke Geometry",
  },
  "Unreal Engine": {
    tag: "REAL-TIME CGI",
    role: "Lumen GI, Nanite Geometry & Cinematic Cameras",
    accent: "#5C7CFA",
    badge: "Real-Time 3D",
    metric: "Photoreal Shading",
  },
  "Unreal Engine 5": {
    tag: "REAL-TIME CGI",
    role: "Lumen GI, Nanite Geometry & Cinematic Cameras",
    accent: "#5C7CFA",
    badge: "Real-Time 3D",
    metric: "Photoreal Shading",
  },
  "Octane Render": {
    tag: "SPECTRAL GPU",
    role: "Unbiased Photorealistic Light & Glass Caustics",
    accent: "#F7931A",
    badge: "Spectral Core",
    metric: "Physically Correct",
  },
  "Three.js": {
    tag: "WEBGL RUNTIME",
    role: "Custom 3D Shaders & Browser Camera Trajectories",
    accent: "#049EF4",
    badge: "Browser Native",
    metric: "Hardware Bound",
  },
  "Substance Painter": {
    tag: "PBR MATERIALS",
    role: "8K Procedural Smart Materials & Wear Simulation",
    accent: "#D0021B",
    badge: "PBR Master",
    metric: "Multi-Channel Maps",
  },

  // Social & Marketing
  "Meta Business Suite": {
    tag: "ADS INFRASTRUCTURE",
    role: "Campaign Pixel Tracking & Algorithmic Retargeting",
    accent: "#0081FB",
    badge: "Direct Response",
    metric: "Full-Funnel CRO",
  },
  "Google Ads": {
    tag: "SEARCH INTENT",
    role: "High-Intent Keyword Bidding & Performance Max",
    accent: "#4285F4",
    badge: "Intent Engine",
    metric: "Scalable ROAS",
  },
  "TikTok Ads": {
    tag: "VIRAL CONVERSION",
    role: "Native Creative Hooks & Rapid Format Testing",
    accent: "#FE2C55",
    badge: "Short-Form",
    metric: "High Velocity",
  },
  "Google Analytics": {
    tag: "ATTRIBUTION",
    role: "GA4 Event Tracking & Deep Behavioral Funnels",
    accent: "#E37400",
    badge: "Telemetry",
    metric: "Actionable Data",
  },

  // AI & Automations
  "OpenAI API": {
    tag: "COGNITIVE MODEL",
    role: "Multi-Modal Reasoning & Structured Embeddings",
    accent: "#10A37F",
    badge: "GPT-4o Engine",
    metric: "Autonomous Agents",
  },
  "LangChain": {
    tag: "AGENT ORCHESTRATION",
    role: "Dynamic Retrieval-Augmented Generation (RAG)",
    accent: "#FF4F00",
    badge: "RAG Pipeline",
    metric: "Context Synthesis",
  },
  "Make (Integromat)": {
    tag: "CLOUD WEBHOOKS",
    role: "Multi-Branch Enterprise Logic & Real-Time Sync",
    accent: "#6D28D9",
    badge: "Zero Code Drag",
    metric: "Instant Handshakes",
  },
  "Zapier": {
    tag: "API BRIDGING",
    role: "7,000+ App Ecosystem Triggers & Automated Flow",
    accent: "#FF4A00",
    badge: "Ecosystem Sync",
    metric: "Fail-Safe Queues",
  },
  "Python": {
    tag: "DATA & AI COMPUTE",
    role: "Vector Math, Data Pipelines & Custom Scrapers",
    accent: "#3776AB",
    badge: "Compute Core",
    metric: "Algorithmic Speed",
  },
  "Flowise": {
    tag: "LLM GRAPH NODES",
    role: "Visual Node-Based Memory & Conversational Logic",
    accent: "#00E699",
    badge: "Visual Graph",
    metric: "Rapid Prototyping",
  },
  "VS Code": {
    tag: "ENGINEERING SUITE",
    role: "Strict Formatting, Real-Time Linting & Debugging",
    accent: "#007ACC",
    badge: "IDE Master",
    metric: "Zero Friction",
  },
  "GitHub": {
    tag: "VERSION CONTROL",
    role: "Git Flow, Automated CI/CD & Atomic Commits",
    accent: "#F0F6FC",
    badge: "CI/CD Pipeline",
    metric: "Branch Protection",
  },
};

// Curated Engineering & Creative Standards (Row 2 secondary track)
const STANDARDS_PIPELINE = [
  { label: "Hardware Accelerated", category: "PERFORMANCE", metric: "60-120 FPS", color: "#885FFF" },
  { label: "Zero Layout Shift", category: "CORE WEB VITALS", metric: "CLS < 0.01", color: "#4100F5" },
  { label: "Lossless Compression", category: "ASSET PIPELINE", metric: "Brotli / WebP", color: "#38BDF8" },
  { label: "Atomic Components", category: "ARCHITECTURE", metric: "Design Tokens", color: "#22C55E" },
  { label: "Sub-100ms Edge Latency", category: "DISTRIBUTION", metric: "Global CDN", color: "#F7931A" },
  { label: "Color Accurate ACES", category: "COLOR SCIENCE", metric: "Rec.709 & DCI-P3", color: "#EA77FF" },
  { label: "Strict Semantic Structure", category: "SEO & A11Y", metric: "WCAG AAA Ready", color: "#61DAFB" },
  { label: "Production-Grade Code", category: "RELIABILITY", metric: "100% Tested", color: "#00E5FF" },
];

export function ToolsStackMarquee({ tools = [], serviceName = "This Service" }) {
  if (!tools || tools.length === 0) return null;

  // Enhance provided tools with rich metadata
  const resolvedTools = tools.map((toolName, idx) => {
    const meta = TOOL_METADATA[toolName] || {
      tag: "CORE ARSENAL",
      role: "Strategic Production & Execution Pipeline",
      accent: "#885FFF",
      badge: "Production Tool",
      metric: "Industry Grade",
    };
    return {
      id: idx + 1,
      name: toolName,
      ...meta,
    };
  });

  // Duplicate arrays for seamless infinite loop
  const row1Items = [...resolvedTools, ...resolvedTools, ...resolvedTools];
  const row2Items = [...STANDARDS_PIPELINE, ...STANDARDS_PIPELINE, ...STANDARDS_PIPELINE];

  return (
    <div className="relative my-20 sm:my-28 w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      {/* ── Ambient Glow Backdrops ── */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#4100F5]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-[#885FFF]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-[#030412]">
              Tools of Precision.{" "}
              <span className="bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">
                Uncompromising Standard.
              </span>
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md font-light leading-relaxed">
            Every build relies on industry-leading software and bleeding-edge frameworks chosen for velocity, reliability, and precision.
          </p>
        </div>
      </div>

      {/* ── Marquee Track Enclosure with Seamless Edge Fade Masks ── */}
      <div className="relative w-full overflow-hidden select-none py-2">
        {/* Left Fade Mask (Off-White) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-[#F8F8F6] to-transparent z-20" />
        
        {/* Right Fade Mask (Off-White) */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-[#F8F8F6] to-transparent z-20" />

        {/* ── TRACK 1: Primary Tools Marquee (Leftward Flow) ── */}
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 mb-4 sm:mb-6 hover:[animation-play-state:paused]">
          {row1Items.map((tool, index) => (
            <div
              key={`row1-${tool.name}-${index}`}
              className="group relative flex-shrink-0 w-64 min-[390px]:w-72 sm:w-80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white border border-black/[0.08] shadow-[0_6px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.03] hover:border-[#4100F5]/50 hover:shadow-[0_15px_40px_rgba(65,0,245,0.12)] cursor-pointer"
            >
              {/* Dynamic Brand Color Accent Glow Top-Bar */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${tool.accent}, transparent)`,
                }}
              />

              {/* Card Header: Tech ID & Live Status Beacon */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-slate-500 group-hover:text-[#030412] transition-colors">
                    STACK // 0{((tool.id - 1) % tools.length) + 1}
                  </span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-semibold tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${tool.accent}14`,
                    borderColor: `${tool.accent}40`,
                    color: tool.accent === "#FFFFFF" ? "#475569" : tool.accent,
                  }}
                >
                  {tool.badge}
                </span>
              </div>

              {/* Tool Headline */}
              <div className="mb-2">
                <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#030412] tracking-tight group-hover:text-[#4100F5] transition-colors">
                  {tool.name}
                </h3>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#4100F5] block mt-0.5">
                  {tool.tag}
                </span>
              </div>

              {/* Tool Role & Description */}
              <p className="font-body text-xs text-slate-600 font-normal leading-snug mb-3 line-clamp-2">
                {tool.role}
              </p>

              {/* Bottom Metric Pill */}
              <div className="pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Activity className="w-3 h-3 text-[#4100F5]" />
                  <span>{tool.metric}</span>
                </span>
                <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                  verified ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── TRACK 2: Standards & Performance Pipeline (Reverse Rightward Flow) ── */}
        <div className="flex w-max animate-marquee-reverse gap-4 sm:gap-6 hover:[animation-play-state:paused]">
          {row2Items.map((spec, index) => (
            <div
              key={`row2-${spec.label}-${index}`}
              className="group relative flex-shrink-0 flex items-center gap-3.5 px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl bg-white/90 border border-black/[0.08] shadow-sm transition-all duration-300 hover:border-[#4100F5]/40 hover:bg-white hover:scale-105 cursor-pointer"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: spec.color,
                  boxShadow: `0 0 10px ${spec.color}`,
                }}
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-slate-700">
                  {spec.category}
                </span>
                <span className="font-heading text-xs sm:text-sm font-bold text-[#030412] tracking-tight">
                  {spec.label}
                </span>
              </div>
              <span
                className="ml-2 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border"
                style={{
                  backgroundColor: `${spec.color}15`,
                  borderColor: `${spec.color}35`,
                  color: spec.color,
                }}
              >
                {spec.metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolsStackMarquee;
