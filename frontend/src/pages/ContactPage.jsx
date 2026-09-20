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

      {/* ── Background Elements ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-10 opacity-25" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] lg:w-[1100px] h-[700px] bg-[#4100F5]/16 rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#885FFF]/12 rounded-full blur-[180px] pointer-events-none z-0" />
      
      {/* ── 3D Floating Logo Model Canvas ───────────────────────── */}
      <LogoModelBackground className="opacity-55 sm:opacity-70" />

      {/* ── Center Stage: One Question at a Time (Positioned below fixed Navbar) ── */}
      <main className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 pt-1">
                      {servicesList.map((service) => {
                        const isSelected = formData.selectedServices.includes(service.label);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.label)}
                            className={`text-left p-4 sm:p-5 lg:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                              isSelected
                                ? "bg-[#4100F5]/20 border-[#885FFF] shadow-[0_0_20px_rgba(65,0,245,0.3)] scale-[1.01]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2.5 w-full">
                              <span className="font-heading font-bold text-sm sm:text-base text-white">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 pt-1">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier.value;
                        return (
                          <button
                            key={tier.value}
                            type="button"
                            onClick={() => handleBudgetSelect(tier.value)}
                            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                              isSelected
                                ? "bg-[#4100F5]/25 border-[#885FFF] shadow-[0_0_20px_rgba(65,0,245,0.35)] scale-[1.01]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span className="font-heading font-bold text-sm sm:text-base text-white">
                                {tier.value}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-[#885FFF] border-[#885FFF] text-white"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </div>
                            <span className="font-body text-[11px] sm:text-xs text-slate-400 leading-relaxed">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-1">
                      {timelineOptions.map((opt) => {
                        const isSelected = formData.timeline === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleTimelineSelect(opt.value)}
                            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                              isSelected
                                ? "bg-[#4100F5]/25 border-[#885FFF] shadow-[0_0_20px_rgba(65,0,245,0.35)] scale-[1.01]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 w-full">
                              <span className="font-heading font-bold text-sm sm:text-base text-white">
                                {opt.value}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? "bg-[#885FFF] border-[#885FFF] text-white"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </div>
                            <span className="font-body text-[11px] sm:text-xs text-slate-400 leading-relaxed">
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
                    Brief Transmitted! 🚀
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
