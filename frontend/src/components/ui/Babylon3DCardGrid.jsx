import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rotate3d,
  Box,
  Layers,
  ArrowUpRight,
  Maximize2,
  X,
  Compass,
  CheckCircle2,
  ChevronRight,
  Sliders,
} from "lucide-react";
import { Babylon3DViewer } from "@/components/ui/Babylon3DViewer";
import { models3dCatalog } from "@/data/models3dData";

/**
 * Editorial 3D Showcase Card Grid
 * Each 3D model gets its own card. Clicking "Open 3D Stage" launches
 * the model in a full Babylon.js interactive PBR canvas stage.
 */
export function Babylon3DCardGrid({ className = "", initialActiveModelId = null }) {
  const [activeModel, setActiveModel] = useState(() => {
    if (initialActiveModelId) {
      return models3dCatalog.find((m) => m.id === initialActiveModelId) || null;
    }
    return null;
  });

  // Lock background body scroll when 3D viewer modal is open
  useEffect(() => {
    if (activeModel) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeModel]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModel(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {models3dCatalog.map((model, idx) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative flex flex-col rounded-3xl bg-white border border-black/[0.08] hover:border-[#4100F5]/40 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_45px_rgba(65,0,245,0.1)]"
          >
            {/* Card Thumbnail Stage */}
            <div
              onClick={() => setActiveModel(model)}
              className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 cursor-pointer"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80" />

              {/* Top Editorial Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10 shadow-sm">
                  {model.category}
                </span>
                <span className="text-xs font-mono text-white/90 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  {model.polyCount}
                </span>
              </div>

              {/* Center Hover Action Hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-white/90 text-[#030412] font-heading font-semibold text-xs flex items-center gap-2 shadow-xl backdrop-blur-md">
                  <Rotate3d className="w-4 h-4 text-[#4100F5]" />
                  <span>Launch Babylon.js Stage</span>
                </div>
              </div>

              {/* Corner Expand Button */}
              <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 group-hover:bg-[#4100F5] text-[#030412] group-hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card Details Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-heading font-bold tracking-wider uppercase text-[#4100F5] block mb-1">
                  {model.subtitle}
                </span>
                <h3 className="font-heading text-xl font-bold text-[#030412] group-hover:text-[#4100F5] transition-colors mb-2.5">
                  {model.name}
                </h3>
                <p className="font-body text-slate-600 text-sm leading-relaxed mb-5 font-normal line-clamp-3">
                  {model.description}
                </p>
              </div>

              {/* Tags & Action Button */}
              <div className="pt-4 border-t border-black/[0.08] space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {model.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-[11px] text-slate-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Primary Button to Open Babylon.js */}
                <button
                  onClick={() => setActiveModel(model)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white font-heading font-semibold text-xs tracking-wide shadow-[0_4px_18px_rgba(65,0,245,0.25)] hover:shadow-[0_8px_25px_rgba(65,0,245,0.35)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <Rotate3d className="w-4 h-4" />
                  <span>Open in Babylon.js Canvas</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Full-screen Blender-style viewport (portalled above navbar & widgets) ── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeModel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ zIndex: 2147483000 }}
                className="fixed inset-0 w-screen h-[100dvh] bg-[#191A1E] overflow-hidden overscroll-none"
              >
                <Babylon3DViewer
                  key={activeModel.id}
                  modelUrl={activeModel.file}
                  modelName={activeModel.name}
                  category={activeModel.category}
                  polyCount={activeModel.polyCount}
                  description={activeModel.description}
                  specs={activeModel.specs}
                  tags={activeModel.tags}
                  className="w-full h-full"
                  onClose={() => setActiveModel(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default Babylon3DCardGrid;
