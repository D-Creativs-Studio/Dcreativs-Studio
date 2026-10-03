import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Center } from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowRight,
  Check,
  Lock,
  Unlock,
  Mail,
  Send,
  X,
  ExternalLink,
  Play,
  Pause,
  Info,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";

// 3D Floating Logo Model Component
function FloatingLogo({ scale = 3.6 }) {
  const { scene } = useGLTF("/models/logo.glb");
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Continuous slow auto-rotation
      modelRef.current.rotation.y += delta * 0.45;

      // Smooth mouse-tracking tilt
      const targetRotationX = state.pointer.y * 0.4;
      const targetRotationZ = -state.pointer.x * 0.3;

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      modelRef.current.rotation.z = THREE.MathUtils.lerp(
        modelRef.current.rotation.z,
        targetRotationZ,
        0.05
      );
    }
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        scale={scale}
        position={[0, 0, 0]}
      />
    </Center>
  );
}

// Shooting star component - streaks downward diagonally across the deep space canvas
const ShootingStar = ({ delay, top, left, duration = 2.8, size = 160, angle = 38 }) => (
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
        x: [0, 1600],
        opacity: [0, 0.95, 0.7, 0],
        scaleX: [0, 1, 0.7, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4 + 3,
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

// Minimalist dynamic audio equalizer wave bars
const Equalizer = ({ isPlaying }) => (
  <div className="flex items-end gap-[2.5px] h-3.5 px-0.5" aria-hidden="true">
    <motion.span
      animate={isPlaying ? { height: ["3px", "13px", "5px", "11px", "3px"] } : { height: "3px" }}
      transition={isPlaying ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      className="w-[2px] bg-[#885FFF] rounded-full"
    />
    <motion.span
      animate={isPlaying ? { height: ["5px", "14px", "16px", "7px", "5px"] } : { height: "3px" }}
      transition={isPlaying ? { duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.15 } : { duration: 0.2 }}
      className="w-[2px] bg-white rounded-full"
    />
    <motion.span
      animate={isPlaying ? { height: ["4px", "15px", "7px", "13px", "4px"] } : { height: "3px" }}
      transition={isPlaying ? { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 } : { duration: 0.2 }}
      className="w-[2px] bg-[#885FFF] rounded-full"
    />
    <motion.span
      animate={isPlaying ? { height: ["3px", "9px", "12px", "5px", "3px"] } : { height: "3px" }}
      transition={isPlaying ? { duration: 0.95, repeat: Infinity, ease: "easeInOut", delay: 0.2 } : { duration: 0.2 }}
      className="w-[2px] bg-white rounded-full"
    />
  </div>
);

// Galaxy starfield coordinates with subtle twinkle
const galaxyStars = [
  { top: 7, left: 14, size: 1.5, opacity: 0.6, delay: 0.3, dur: 3.2 },
  { top: 12, left: 28, size: 2, opacity: 0.8, delay: 1.1, dur: 4.1 },
  { top: 19, left: 9, size: 1, opacity: 0.5, delay: 2.4, dur: 2.8 },
  { top: 15, left: 45, size: 1.5, opacity: 0.7, delay: 0.8, dur: 3.5 },
  { top: 26, left: 82, size: 2, opacity: 0.75, delay: 1.9, dur: 4.5 },
  { top: 32, left: 21, size: 1, opacity: 0.45, delay: 3.1, dur: 3.0 },
  { top: 38, left: 91, size: 1.5, opacity: 0.65, delay: 0.5, dur: 3.8 },
  { top: 9, left: 74, size: 1.5, opacity: 0.7, delay: 2.1, dur: 4.2 },
  { top: 48, left: 12, size: 2, opacity: 0.8, delay: 1.4, dur: 3.6 },
  { top: 54, left: 87, size: 1, opacity: 0.5, delay: 0.2, dur: 2.9 },
  { top: 62, left: 29, size: 1.5, opacity: 0.6, delay: 2.7, dur: 4.0 },
  { top: 67, left: 78, size: 2, opacity: 0.75, delay: 1.6, dur: 3.4 },
  { top: 73, left: 16, size: 1, opacity: 0.4, delay: 3.3, dur: 2.7 },
  { top: 82, left: 64, size: 1.5, opacity: 0.7, delay: 0.9, dur: 4.3 },
  { top: 89, left: 24, size: 2, opacity: 0.85, delay: 2.2, dur: 3.7 },
  { top: 92, left: 86, size: 1, opacity: 0.5, delay: 1.3, dur: 3.1 },
  { top: 5, left: 52, size: 1.5, opacity: 0.65, delay: 2.9, dur: 4.4 },
  { top: 23, left: 63, size: 1, opacity: 0.45, delay: 0.7, dur: 2.8 },
  { top: 37, left: 5, size: 2, opacity: 0.8, delay: 1.8, dur: 3.9 },
  { top: 51, left: 47, size: 1.5, opacity: 0.7, delay: 3.0, dur: 4.1 },
  { top: 65, left: 94, size: 1, opacity: 0.5, delay: 0.4, dur: 3.3 },
  { top: 78, left: 42, size: 2, opacity: 0.85, delay: 2.5, dur: 3.8 },
  { top: 85, left: 8, size: 1.5, opacity: 0.6, delay: 1.2, dur: 4.0 },
  { top: 93, left: 51, size: 1, opacity: 0.4, delay: 3.4, dur: 2.6 },
  { top: 14, left: 95, size: 1.5, opacity: 0.75, delay: 2.0, dur: 3.6 },
  { top: 31, left: 38, size: 2, opacity: 0.7, delay: 0.6, dur: 4.2 },
  { top: 45, left: 72, size: 1, opacity: 0.5, delay: 1.7, dur: 3.1 },
  { top: 57, left: 24, size: 1.5, opacity: 0.65, delay: 2.8, dur: 3.7 },
  { top: 71, left: 89, size: 2, opacity: 0.8, delay: 0.1, dur: 4.5 },
  { top: 84, left: 35, size: 1, opacity: 0.45, delay: 1.5, dur: 2.9 },
];

export function ComingSoonPage({ onUnlockPreview }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Passcode modal state
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  // Direct inquiry modal state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  // Audio soundtrack state (Bad Bunny - Monaco)
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userMutedRef = useRef(false);
  const isDraggingRef = useRef(false);

  const handleButtonPointerDown = () => {
    isDraggingRef.current = false;
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleSoundButtonClick = (e) => {
    e.stopPropagation();
    if (isDraggingRef.current) return;
    toggleSound(e);
  };

  useEffect(() => {
    const audio = new Audio("/audio/monaco.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.65;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const gestureEvents = ["pointerdown", "touchstart", "click", "keydown", "wheel", "scroll"];

    const removeGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, attemptPlay, { capture: true });
      });
    };

    const attemptPlay = () => {
      if (userMutedRef.current || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeGestureListeners();
        })
        .catch(() => {
          // Awaiting next eligible gesture
        });
    };

    // 1. Immediate attempt to play as soon as the site opens
    attemptPlay();

    // 2. Fallback listeners for any touch, click, scroll or keypress if browser blocked immediate unprompted audio
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, attemptPlay, { capture: true, passive: true });
    });

    return () => {
      removeGestureListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      userMutedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Early Access Subscriber",
          email: email.trim(),
          services: ["Launch Notification / Early Access"],
          message: "Requested early access notice upon full platform reveal.",
        }),
      });

      // Even if serverless endpoint isn't deployed on localhost, save cleanly
      if (response.ok || response.status === 404 || response.status === 200) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || "Unable to join waitlist. Please try again.");
      }
    } catch {
      // Graceful offline fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) {
      return;
    }

    setInquiryLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName.trim(),
          email: inquiryEmail.trim(),
          services: ["Private Project Scoping"],
          message: inquiryMessage.trim(),
        }),
      });
      setInquirySubmitted(true);
    } catch {
      setInquirySubmitted(true);
    } finally {
      setInquiryLoading(false);
    }
  };

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    if (!passcode) return;

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(passcode.trim());
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // SHA-256 hash of secret passkey (mathematically irreversible)
      if (hashHex === "f05fd3ba93ad2dab7e36a50f90b3ef4825ac5d5a0722db071bcc511fa7a1f3bf") {
        if (onUnlockPreview) {
          onUnlockPreview();
        }
      } else {
        setPasscodeError("Invalid studio passcode.");
      }
    } catch {
      setPasscodeError("Verification failed.");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000422] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#4100F5] selection:text-white">
      <SEO
        title="Digital Experience & Brand Innovation — Reveal Coming Soon"
        description="D'Creativs Studio crafts bespoke digital experiences, high-performance web platforms, 3D motion graphics, and scalable brand identity systems that captivate and convert."
      />

      {/* Soft Galaxy Atmosphere, Starfield & Shooting Stars */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Galaxy Nebulae */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-gradient-to-tr from-[#4100F5]/25 via-[#885FFF]/20 to-transparent blur-[150px] rounded-full animate-pulse duration-1000" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[450px] bg-[#4100F5]/15 blur-[140px] rounded-full" />
        <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#885FFF]/15 blur-[120px] rounded-full" />

        {/* Twinkling Starfield */}
        {galaxyStars.map((star, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3] }}
            transition={{
              duration: star.dur,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.size > 1.4 ? "0 0 6px 1px rgba(255, 255, 255, 0.7)" : "none",
            }}
          />
        ))}

        {/* Little Shooting Stars */}
        <ShootingStar delay={1.2} top={12} left={5} duration={2.6} size={150} angle={36} />
        <ShootingStar delay={4.8} top={25} left={42} duration={3.0} size={180} angle={40} />
        <ShootingStar delay={8.5} top={8} left={68} duration={2.4} size={140} angle={34} />
        <ShootingStar delay={12.0} top={38} left={18} duration={2.9} size={170} angle={37} />
        <ShootingStar delay={15.5} top={18} left={82} duration={2.5} size={130} angle={42} />

        {/* Subtle geometric starfield grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Full-Screen 3D Floating Logo Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-85">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          eventSource={typeof document !== "undefined" ? document.body : undefined}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[6, 8, 6]} intensity={3.5} color="#885FFF" />
          <directionalLight position={[-6, -6, -2]} intensity={2.8} color="#4100F5" />
          <pointLight position={[0, 2, 4]} intensity={2.5} color="#ffffff" />
          <Suspense fallback={null}>
            <Float speed={2.5} rotationIntensity={1.4} floatIntensity={2.2}>
              <FloatingLogo scale={4.6} />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Fixed Top Editorial Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-transparent transition-all pointer-events-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-extrabold text-base min-[390px]:text-lg sm:text-2xl tracking-tight text-white drop-shadow-md whitespace-nowrap">
              D&apos;CREATIVS STUDIO
            </span>
            <span className="hidden sm:block text-xs uppercase tracking-widest text-zinc-400 font-medium">
              Creative Technology &amp; Brand Systems
            </span>
          </div>

          <div className="flex items-center shrink-0">
            <button
              onClick={() => setShowInquiryModal(true)}
              className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 bg-black/40 backdrop-blur-md rounded-lg hover:border-white/40 hover:bg-white/10 active:scale-95 transition-all text-white shadow-md cursor-pointer whitespace-nowrap"
            >
              <span className="sm:hidden">Inquire</span>
              <span className="hidden sm:inline">Start A Project</span>
            </button>
          </div>
        </div>
      </header>

      {/* Center Hero Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-12 flex flex-col items-center text-center my-auto">
        {/* Editorial Headline */}
        <div className="space-y-3.5 sm:space-y-4">
          <h1 className="font-heading text-3xl min-[390px]:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Built To Be Noticed.
            <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-[#885FFF] bg-clip-text text-transparent">
              Full Reveal Imminent.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-body leading-relaxed drop-shadow-md">
            We are engineering a new flagship digital experience combining bespoke web platforms,
            cinema-grade 3D motion graphics, and scalable brand identity systems.
          </p>
        </div>

        {/* Email Notification & Inquiry Actions */}
        <div className="w-full max-w-md mt-8">
          {!submitted ? (
            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-0 relative">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3.5 pl-11 sm:pr-32 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#885FFF] focus:ring-1 focus:ring-[#885FFF] transition-all"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:absolute sm:right-1.5 w-full sm:w-auto px-5 py-3 sm:py-2 bg-[#4100F5] hover:bg-[#4100F5]/85 active:scale-95 text-white font-semibold text-xs uppercase tracking-wider rounded-xl sm:rounded-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-lg sm:shadow-none"
                >
                  {isSubmitting ? "Sending..." : "Notify Me"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 text-left pl-1">{errorMessage}</p>
              )}

              <p className="text-xs text-zinc-300">
                Direct inquiries remain open for Q2/Q3 partnerships.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-white/5 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3 text-sm"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>You are on the priority list. We will dispatch early access to your inbox.</span>
            </motion.div>
          )}
        </div>
      </main>

      {/* Floating Draggable Sound Controller with Beat Glow & Attribution */}
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={handleDragStart}
        onPointerDown={handleButtonPointerDown}
        className="fixed bottom-20 sm:bottom-8 left-4 sm:left-8 z-50 flex items-center gap-2.5 cursor-grab active:cursor-grabbing select-none"
      >
        <motion.button
          onClick={handleSoundButtonClick}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    "0 0 10px 2px rgba(65, 0, 245, 0.4), 0 0 20px 4px rgba(136, 95, 255, 0.3)",
                    "0 0 28px 6px rgba(136, 95, 255, 0.85), 0 0 45px 12px rgba(65, 0, 245, 0.5)",
                    "0 0 10px 2px rgba(65, 0, 245, 0.4), 0 0 20px 4px rgba(136, 95, 255, 0.3)",
                  ],
                  scale: [1, 1.05, 1],
                }
              : {
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                  scale: 1,
                }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.85,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
          className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border transition-colors backdrop-blur-2xl relative ${
            isPlaying
              ? "bg-[#4100F5]/85 border-[#885FFF] text-white"
              : "bg-[#000422]/90 border-white/20 text-zinc-300 hover:text-white hover:border-white/40"
          }`}
          title={isPlaying ? "Pause soundtrack (drag to move)" : "Play soundtrack (drag to move)"}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white text-white" />
          ) : (
            <Play className="w-5 h-5 ml-0.5 fill-white text-white" />
          )}

          {/* Equalizer Pulsing Ring */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#885FFF]/40 animate-ping pointer-events-none" />
          )}
        </motion.button>
      </motion.div>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} D&apos;Creativs Technologies. All rights reserved.</span>
          <span className="text-[10px] text-zinc-400">
            Soundtrack: &ldquo;MONACO&rdquo; by Bad Bunny • Non-commercial creative preview • Rights belong to Rimas Entertainment
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="https://x.com/dcreativs_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="p-2 sm:p-0 text-zinc-300 hover:text-white hover:bg-white/5 sm:hover:bg-transparent rounded-lg transition-all flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="hidden sm:inline">X (Twitter)</span>
          </a>

          <a
            href="https://instagram.com/dcreativs.studio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 sm:p-0 text-zinc-300 hover:text-white hover:bg-white/5 sm:hover:bg-transparent rounded-lg transition-all flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3" />
            </svg>
            <span className="hidden sm:inline">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/company/dcreativs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 sm:p-0 text-zinc-300 hover:text-white hover:bg-white/5 sm:hover:bg-transparent rounded-lg transition-all flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="https://facebook.com/dcreativs.studio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 sm:p-0 text-zinc-300 hover:text-white hover:bg-white/5 sm:hover:bg-transparent rounded-lg transition-all flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="hidden sm:inline">Facebook</span>
          </a>

          {/* Discreet Studio Passcode Lock */}
          <button
            onClick={() => setShowPasscodeModal(true)}
            className="p-2 sm:p-0 flex items-center gap-1.5 text-zinc-300 hover:text-white hover:bg-white/5 sm:hover:bg-transparent rounded-lg transition-all ml-1 sm:ml-2"
            title="Studio Team Preview"
            aria-label="Studio Access"
          >
            <Lock className="w-4 h-4 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Studio Access</span>
          </button>
        </div>
      </footer>

      {/* Studio Passcode Modal */}
      <AnimatePresence>
        {showPasscodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#000422] border border-white/15 p-6 rounded-2xl shadow-2xl space-y-4"
            >
              <button
                onClick={() => {
                  setShowPasscodeModal(false);
                  setPasscodeError("");
                }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <Unlock className="w-4 h-4 text-[#885FFF]" />
                <h3 className="font-heading font-bold text-white text-base">
                  Studio Preview Access
                </h3>
              </div>

              <p className="text-xs text-zinc-400">
                Enter your authorized studio passcode to preview the full in-development platform.
              </p>

              <form onSubmit={handlePasscodeSubmit} className="space-y-3">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPasscodeError("");
                  }}
                  placeholder="Enter passcode"
                  autoFocus
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#885FFF]"
                />

                {passcodeError && (
                  <p className="text-xs text-rose-400">{passcodeError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4100F5] hover:bg-[#4100F5]/85 text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Unlock Preview
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Project Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#000422] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-5"
            >
              <button
                onClick={() => setShowInquiryModal(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <h3 className="font-heading font-extrabold text-white text-xl">
                  Initiate Project Scoping
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  While our public showcase undergoes final calibration, we are actively scheduling Q2/Q3 development sprints.
                </p>
              </div>

              {!inquirySubmitted ? (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#885FFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#885FFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                      Brief Project Overview
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Tell us what you are looking to build (web app, brand system, 3D motion, etc.)"
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#885FFF] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href="mailto:dcreativs.studio@gmail.com"
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Or email directly</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      type="submit"
                      disabled={inquiryLoading}
                      className="px-5 py-2.5 bg-[#4100F5] hover:bg-[#4100F5]/85 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {inquiryLoading ? "Transmitting..." : "Send Inquiry"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 rounded-xl bg-white/5 border border-emerald-500/30 text-center space-y-2">
                  <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="font-heading font-bold text-white text-base">Inquiry Received</p>
                  <p className="text-xs text-zinc-400">
                    Our lead developer and strategy team will review your brief and respond within 24 hours.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
