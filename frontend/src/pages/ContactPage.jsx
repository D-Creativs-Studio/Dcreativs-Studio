import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { LogoModelBackground } from "@/components/ui/logo-model-background";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
  CheckCircle2,
  ShieldCheck,
  CornerDownLeft,
} from "lucide-react";

// Available services to multi-select
const servicesList = [
  { id: "brand", label: "Brand Identity & Strategy", desc: "Logos, visual systems, guidelines, brand worlds" },
  { id: "web", label: "Web & Platform Engineering", desc: "Flagship websites, web apps, headless platforms" },
  { id: "uiux", label: "UI/UX & Product Design", desc: "Design systems, mobile & desktop app interfaces" },
  { id: "motion", label: "3D Motion & Visual Graphics", desc: "Cinema-grade 3D, animation, motion graphics" },
  { id: "mobile", label: "Mobile App Development", desc: "iOS, Android, cross-platform applications" },
  { id: "direction", label: "Creative Direction & Advisory", desc: "Art direction, campaign concepts, digital strategy" },
];

// Budget tiers
const budgetTiers = [
  { value: "< $3,000", hint: "Scoped sprint / initial phase" },
  { value: "$3,000 – $7,500", hint: "Standard product or brand build" },
  { value: "$7,500 – $15,000", hint: "Comprehensive digital flagship" },
  { value: "$15,000+", hint: "Enterprise / complex platform" },
  { value: "Flexible / Undecided", hint: "Open to scoping advice" },
];

// Timeline options
const timelineOptions = [
  { value: "Immediate (< 1 month)", hint: "Fast-tracked kickoff" },
  { value: "1 – 3 months", hint: "Standard production sprint" },
  { value: "3+ months", hint: "Planned future release" },
  { value: "Exploratory stage", hint: "Early scoping & feasibility" },
];

// Shooting star component - streaks downward diagonally across the deep space canvas
const ShootingStar = ({ delay, top, left, duration = 2.5, size = 190, angle = 40 }) => (
  <div
    className="absolute pointer-events-none z-0 overflow-visible"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${angle}deg)`,
    }}
  >
    <motion.div
      initial={{ x: -100, opacity: 0, scaleX: 0 }}
      animate={{
        x: [0, 1500],
        opacity: [0, 0.95, 0.7, 0],
        scaleX: [0, 1, 0.7, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#C4B5FD] to-white"
      style={{
        width: `${size}px`,
        boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.9), 0 0 20px 2px rgba(136, 95, 255, 0.5)",
      }}
    />
  </div>
);

// Subtle static galaxy starfield coordinates for deterministic celestial rendering
const galaxyStars = [
  { top: 6, left: 12, size: 1.5, opacity: 0.6, delay: 0.3, dur: 3.2 },
  { top: 12, left: 28, size: 2, opacity: 0.8, delay: 1.1, dur: 4.1 },
  { top: 20, left: 8, size: 1, opacity: 0.5, delay: 2.4, dur: 2.8 },
  { top: 16, left: 45, size: 1.5, opacity: 0.7, delay: 0.8, dur: 3.5 },
  { top: 28, left: 82, size: 2, opacity: 0.75, delay: 1.9, dur: 4.5 },
  { top: 34, left: 22, size: 1, opacity: 0.45, delay: 3.1, dur: 3.0 },
  { top: 40, left: 91, size: 1.5, opacity: 0.65, delay: 0.5, dur: 3.8 },
  { top: 10, left: 74, size: 1.5, opacity: 0.7, delay: 2.1, dur: 4.2 },
  { top: 48, left: 14, size: 2, opacity: 0.8, delay: 1.4, dur: 3.6 },
  { top: 54, left: 85, size: 1, opacity: 0.5, delay: 0.2, dur: 2.9 },
  { top: 62, left: 30, size: 1.5, opacity: 0.6, delay: 2.7, dur: 4.0 },
  { top: 68, left: 78, size: 2, opacity: 0.75, delay: 1.6, dur: 3.4 },
  { top: 74, left: 18, size: 1, opacity: 0.4, delay: 3.3, dur: 2.7 },
  { top: 82, left: 64, size: 1.5, opacity: 0.7, delay: 0.9, dur: 4.3 },
  { top: 88, left: 26, size: 2, opacity: 0.85, delay: 2.2, dur: 3.7 },
  { top: 92, left: 88, size: 1, opacity: 0.5, delay: 1.3, dur: 3.1 },
  { top: 5, left: 52, size: 1.5, opacity: 0.65, delay: 2.9, dur: 4.4 },
  { top: 24, left: 63, size: 1, opacity: 0.45, delay: 0.7, dur: 2.8 },
  { top: 38, left: 5, size: 2, opacity: 0.8, delay: 1.8, dur: 3.9 },
  { top: 52, left: 48, size: 1.5, opacity: 0.7, delay: 3.0, dur: 4.1 },
  { top: 66, left: 95, size: 1, opacity: 0.5, delay: 0.4, dur: 3.3 },
  { top: 78, left: 42, size: 2, opacity: 0.85, delay: 2.5, dur: 3.8 },
  { top: 86, left: 7, size: 1.5, opacity: 0.6, delay: 1.2, dur: 4.0 },
  { top: 94, left: 51, size: 1, opacity: 0.4, delay: 3.4, dur: 2.6 },
  { top: 15, left: 96, size: 1.5, opacity: 0.75, delay: 2.0, dur: 3.6 },
  { top: 32, left: 39, size: 2, opacity: 0.7, delay: 0.6, dur: 4.2 },
  { top: 46, left: 72, size: 1, opacity: 0.5, delay: 1.7, dur: 3.1 },
  { top: 58, left: 24, size: 1.5, opacity: 0.65, delay: 2.8, dur: 3.7 },
  { top: 72, left: 88, size: 2, opacity: 0.8, delay: 0.1, dur: 4.5 },
  { top: 84, left: 36, size: 1, opacity: 0.45, delay: 1.5, dur: 2.9 },
];

export function ContactPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    selectedServices: ["Web & Platform Engineering"],
    budget: "",
    timeline: "",
    message: "",
    email: "",
    phone: "",
  });

  const totalSteps = 7;

  // Auto-focus active input when step changes
  useEffect(() => {
    setErrorMsg("");
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Validation per step
  const validateCurrentStep = () => {
    setErrorMsg("");
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          setErrorMsg("Please enter your name to continue.");
          return false;
        }
        return true;
      case 2:
        return true;
      case 3:
        if (formData.selectedServices.length === 0) {
          setErrorMsg("Please select at least one discipline.");
          return false;
        }
        return true;
      case 4:
        if (!formData.budget) {
          setErrorMsg("Please select a budget range.");
          return false;
        }
        return true;
      case 5:
        if (!formData.timeline) {
          setErrorMsg("Please select a target timeline.");
          return false;
        }
        return true;
      case 6:
        if (!formData.message.trim()) {
          setErrorMsg("Please share a brief note about your project.");
          return false;
        }
        return true;
      case 7:
        if (!formData.email.trim() || !formData.email.includes("@")) {
          setErrorMsg("Please provide a valid work email address.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setErrorMsg("");
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Keyboard navigation: Enter key advances
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (e.target.tagName.toLowerCase() === "textarea") {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          handleNext();
        }
        return;
      }
      e.preventDefault();
      handleNext();
    }
  };

  const handleServiceToggle = (label) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(label);
      let updated;
      if (exists) {
        updated = prev.selectedServices.filter((s) => s !== label);
      } else {
        updated = [...prev.selectedServices, label];
      }
      return { ...prev, selectedServices: updated };
    });
  };

  const handleBudgetSelect = (val) => {
    setFormData((prev) => ({ ...prev, budget: val }));
    setTimeout(() => {
      setDirection(1);
      setCurrentStep(5);
    }, 200);
  };

  const handleTimelineSelect = (val) => {
    setFormData((prev) => ({ ...prev, timeline: val }));
    setTimeout(() => {
      setDirection(1);
      setCurrentStep(6);
    }, 200);
  };

  const handleFinalSubmit = () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-[#000422] text-white flex flex-col justify-between relative overflow-hidden select-none">
      <SEO
        title="Start a Project | D'Creativs Studio"
        description="Initiate an interactive project inquiry with D'Creativs Studio. Tell us about your brand, technical requirements, and vision."
      />

      {/* ── Background: Subtle Galaxy & Nebula Clouds ─────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Deep cosmic nebula gradients */}
        <div className="absolute -top-32 -left-32 w-[700px] lg:w-[950px] h-[700px] lg:h-[950px] bg-gradient-to-br from-[#4100F5]/22 via-[#240090]/15 to-transparent rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] lg:w-[1200px] h-[700px] bg-[#4100F5]/18 rounded-full blur-[200px]" />
        <div className="absolute -bottom-24 -right-24 w-[600px] lg:w-[850px] h-[600px] lg:h-[850px] bg-gradient-to-tl from-[#885FFF]/16 via-[#4100F5]/12 to-transparent rounded-full blur-[170px]" />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/[0.04] rounded-full blur-[130px]" />

        {/* Twinkling Galaxy Starfield */}
        {galaxyStars.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: star.size >= 2 ? "0 0 6px 1px rgba(255,255,255,0.8)" : "none",
              animationDuration: `${star.dur}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Shooting Stars (streaking downward diagonally) */}
        <ShootingStar top={-5} left={8} delay={0.5} duration={2.4} size={220} angle={39} />
        <ShootingStar top={6} left={-8} delay={2.7} duration={3.0} size={180} angle={42} />
        <ShootingStar top={-7} left={36} delay={5.0} duration={2.2} size={240} angle={40} />
        <ShootingStar top={14} left={15} delay={7.3} duration={2.8} size={190} angle={41} />
        <ShootingStar top={-3} left={58} delay={9.6} duration={3.2} size={200} angle={38} />
        <ShootingStar top={22} left={6} delay={12.0} duration={2.5} size={210} angle={43} />
      </div>

      {/* ── 3D Floating Logo Model Canvas (Left on Desktop, Full Background on Mobile) ── */}
      <LogoModelBackground
        className="opacity-60 sm:opacity-75 lg:opacity-100 lg:w-[35%] lg:right-auto lg:left-0 transition-opacity duration-500"
        scale={3.5}
      />

      {/* ── Gaussian Blur Layer Beneath The Form (Mobile Only, 5px blur) ────────── */}
      {/* On mobile the 3D model sits behind the form, so soft diffusion is applied */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center lg:hidden">
        <div className="w-[94vw] max-w-5xl h-[620px] rounded-[44px] backdrop-blur-[5px] bg-[#000422]/35 shadow-[0_0_60px_30px_rgba(0,4,34,0.65)] border border-white/[0.03]" />
      </div>

      {/* ── Film Grain Overlay ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-15 opacity-25" />

      {/* ── Center Stage: Split Screen on Desktop (Spacious 3D Logo on Left, Wide Form on Right) ── */}
      <main className="relative z-20 flex-1 flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-20 lg:pt-24 pb-8 lg:pb-12 w-full max-w-7xl 2xl:max-w-[1560px] mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column Spacer on Desktop: Leaves the left 4 columns open for the 3D rotating logo */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-4 pointer-events-none" aria-hidden="true" />

          {/* Right Column on Desktop (8 columns) / Centered on Mobile: Spacious Form Console */}
          <div className="col-span-1 lg:col-span-8 xl:col-span-8 w-full rounded-3xl sm:rounded-[36px] bg-[#000422]/60 sm:bg-[#000422]/50 backdrop-blur-xl sm:backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.7),0_0_40px_rgba(65,0,245,0.06)] p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {!isSubmitted ? (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-8 select-text"
              >
                {/* ════════════════ STEP 1: NAME ════════════════ */}
                {currentStep === 1 && (
                  <div className="space-y-6 max-w-3xl">
                    <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block">
                      01 — INTRODUCTION
                    </span>
                    <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
                      Let&apos;s start with your name.
                      <span className="block text-slate-400 text-sm sm:text-base md:text-lg font-light mt-2">
                        Who are we speaking with?
                      </span>
                    </h1>

                    <div className="pt-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onKeyDown={handleKeyDown}
                        placeholder="Your full name"
                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#885FFF] pb-3 text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 2: COMPANY ════════════════ */}
                {currentStep === 2 && (
                  <div className="space-y-6 max-w-3xl">
                    <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block">
                      02 — YOUR BRAND
                    </span>
                    <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
                      Great to meet you, {formData.name.split(" ")[0] || "friend"}.
                      <span className="block text-slate-400 text-sm sm:text-base md:text-lg font-light mt-2">
                        What is your company, brand, or project called?
                      </span>
                    </h1>

                    <div className="pt-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onKeyDown={handleKeyDown}
                        placeholder="Company or project name (optional)"
                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#885FFF] pb-3 text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white placeholder-slate-600 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 3: CAPABILITIES ════════════════ */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block mb-1.5">
                        03 — CAPABILITIES
                      </span>
                      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                        What do you need built or designed?
                      </h1>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light mt-1.5">
                        Select all disciplines that apply to this initiative.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                      {servicesList.map((service) => {
                        const isSelected = formData.selectedServices.includes(service.label);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.label)}
                            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 overflow-hidden ${
                              isSelected
                                ? "bg-[#4100F5]/20 border-[#885FFF] shadow-[0_0_20px_rgba(65,0,245,0.3)] scale-[1.01]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 w-full">
                              <span className="font-heading font-bold text-sm sm:text-base text-white min-w-0 flex-1 pr-1">
                                {service.label}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  isSelected
                                    ? "bg-[#885FFF] border-[#885FFF] text-white"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <span className="font-body text-xs text-slate-400 leading-relaxed">
                              {service.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 4: BUDGET ════════════════ */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block mb-1.5">
                        04 — INVESTMENT
                      </span>
                      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                        What is your estimated budget?
                      </h1>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light mt-1.5">
                        This helps us tailor scope, milestones, and resource allocation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier.value;
                        const isFullWidth = tier.value === "Flexible / Undecided";
                        return (
                          <button
                            key={tier.value}
                            type="button"
                            onClick={() => handleBudgetSelect(tier.value)}
                            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 overflow-hidden ${
                              isFullWidth ? "sm:col-span-2" : ""
                            } ${
                              isSelected
                                ? "bg-[#4100F5]/25 border-[#885FFF] shadow-[0_0_20px_rgba(65,0,245,0.35)] scale-[1.01]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3 w-full">
                              <span className="font-heading font-bold text-sm sm:text-base text-white min-w-0 flex-1 pr-1">
                                {tier.value}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-[#885FFF] border-[#885FFF] text-white"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <span className="font-body text-xs text-slate-400 leading-relaxed">
                              {tier.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 5: TIMELINE ════════════════ */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block mb-1.5">
                        05 — SCHEDULE
                      </span>
                      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                        When do you aim to launch?
                      </h1>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light mt-1.5">
                        Tell us your anticipated delivery timeframe.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                      {timelineOptions.map((opt) => {
                        const isSelected = formData.timeline === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleTimelineSelect(opt.value)}
                            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 overflow-hidden ${
                              isSelected
                                ? "bg-[#4100F5]/25 border-[#885FFF] shadow-[0_0_20px_rgba(65,0,245,0.35)] scale-[1.01]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3 w-full">
                              <span className="font-heading font-bold text-sm sm:text-base text-white min-w-0 flex-1 pr-1">
                                {opt.value}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-[#885FFF] border-[#885FFF] text-white"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <span className="font-body text-xs text-slate-400 leading-relaxed">
                              {opt.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 6: PROJECT DETAILS ════════════════ */}
                {currentStep === 6 && (
                  <div className="space-y-6 max-w-4xl">
                    <div>
                      <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block mb-1.5">
                        06 — THE VISION
                      </span>
                      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                        Tell us about the project.
                      </h1>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light mt-1.5">
                        Share your goals, scope, and any benchmark references you admire.
                      </p>
                    </div>

                    <div className="pt-1">
                      <textarea
                        ref={inputRef}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onKeyDown={handleKeyDown}
                        placeholder="What are you building, what problem does it solve, and what is your ambition?"
                        className="w-full bg-white/[0.04] border border-white/15 focus:border-[#885FFF] focus:bg-white/[0.07] rounded-2xl p-4 sm:p-5 text-sm sm:text-base font-body text-white placeholder-slate-500 outline-none transition-all resize-none shadow-inner min-h-[160px] sm:min-h-[190px]"
                      />
                    </div>
                  </div>
                )}

                {/* ════════════════ STEP 7: CONTACT DETAILS ════════════════ */}
                {currentStep === 7 && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <span className="text-[#885FFF] font-mono text-xs font-semibold tracking-wider block mb-1.5">
                        07 — WHERE TO REACH YOU
                      </span>
                      <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                        Where should we send the proposal?
                      </h1>
                      <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light mt-1.5">
                        We review briefs within 24 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                          Work Email *
                        </label>
                        <input
                          ref={inputRef}
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onKeyDown={handleKeyDown}
                          placeholder="name@company.com"
                          className="w-full bg-white/[0.04] border border-white/15 focus:border-[#885FFF] focus:bg-white/[0.07] rounded-xl p-3.5 sm:p-4 text-sm sm:text-base font-body text-white placeholder-slate-500 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onKeyDown={handleKeyDown}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/[0.04] border border-white/15 focus:border-[#885FFF] focus:bg-white/[0.07] rounded-xl p-3.5 sm:p-4 text-sm sm:text-base font-body text-white placeholder-slate-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-body text-slate-400 pt-1">
                      <ShieldCheck className="w-4 h-4 text-[#885FFF]" />
                      <span>Mutual NDA and strict confidentiality guaranteed.</span>
                    </div>
                  </div>
                )}

                {/* ── Error Message Notification ──────────────────────── */}
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs sm:text-sm font-body text-rose-400 font-medium"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                {/* ── Navigation Actions: Back & Continue ─────────────────── */}
                <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white/05 hover:bg-white/10 text-slate-300 hover:text-white font-heading text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-white/10"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9F7DFF] text-white font-heading font-semibold text-xs sm:text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(65,0,245,0.4)] hover:shadow-[0_6px_25px_rgba(65,0,245,0.6)] cursor-pointer disabled:opacity-60 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : currentStep === totalSteps ? (
                        <>
                          <span>Submit Project Brief</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                      Press <CornerDownLeft className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ════════════════ SUCCESS SCREEN ════════════════ */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-6 py-8 max-w-xl mx-auto"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#4100F5] to-[#885FFF] p-1 shadow-[0_0_35px_rgba(65,0,245,0.6)]">
                  <div className="w-full h-full rounded-full bg-[#000422] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#885FFF]" />
                  </div>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    Brief Transmitted
                  </h2>
                  <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>.
                    Our team will review your brief and reply to{" "}
                    <span className="text-[#C4B5FD] font-semibold">{formData.email}</span> within 24 hours.
                  </p>
                </div>

                {/* Brief Snapshot Card */}
                <div className="max-w-md mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-5 text-left text-xs sm:text-sm font-body space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Disciplines:</span>
                    <span className="font-medium text-white text-right max-w-[60%] truncate">
                      {formData.selectedServices.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Budget Range:</span>
                    <span className="font-medium text-[#C4B5FD]">{formData.budget}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-slate-400">Target Timeline:</span>
                    <span className="font-medium text-white">{formData.timeline}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Turnaround SLA:</span>
                    <span className="font-medium text-emerald-400">Guaranteed Reply &lt; 24 hrs</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9F7DFF] text-white font-heading font-semibold text-xs sm:text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(65,0,245,0.4)]"
                  >
                    Return to Homepage
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/works")}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs sm:text-sm transition-colors border border-white/15"
                  >
                    Explore Portfolio
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ── Minimal Bottom Footer ───────────────────────────────── */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-white/05">
        <p>© {new Date().getFullYear()} D&apos;Creativs Studio. All rights reserved.</p>
        <p className="font-mono text-[11px] text-slate-500">Built To Be Noticed</p>
      </footer>
    </div>
  );
}

export default ContactPage;
