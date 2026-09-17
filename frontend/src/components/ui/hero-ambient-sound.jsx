import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

/**
 * Deep Abyssal & Deep Space Soundscape Generator
 * Synthesizes an immersive, cinematic acoustic experience:
 * - Algorithmic Brownian noise emulating oceanic pressure and interstellar cosmic wind
 * - Ultra-deep sub-bass drone (38Hz - 57Hz binaural drift)
 * - Warm resonant harmonic fifths (114Hz) for immense spatial depth
 * - Gentle undulating LFO wave mimicking slow abyssal tides & cosmic plasma swells
 * - Periodic distant hydrophone / pulsar sonar echoes with reverb-like decay
 * - Interactive mouse depth modulation: diving into the abyss vs rising to celestial light
 */
class DeepCosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.depthFilter = null;
    this.panner = null;
    this.oscillators = [];
    this.lfos = [];
    this.noiseNode = null;
    this.noiseGain = null;
    this.activePulses = [];
    this.sonarTimer = null;
    this.shimmerTimer = null;
    this.initialTimer = null;
    this.isPlaying = false;
    this.brownianBuffer = null;
  }

  init() {
    if (this.ctx && this.ctx.state !== "closed") return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    if (typeof window !== "undefined" && window.__activeWebAudioContexts) {
      window.__activeWebAudioContexts.add(this.ctx);
    }

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    // Dynamic Depth Low-pass Filter (muffled abyssal depth)
    this.depthFilter = this.ctx.createBiquadFilter();
    this.depthFilter.type = "lowpass";
    this.depthFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.depthFilter.Q.setValueAtTime(2.8, this.ctx.currentTime);

    // Stereo Panner
    if (this.ctx.createStereoPanner) {
      this.panner = this.ctx.createStereoPanner();
      this.panner.pan.setValueAtTime(0, this.ctx.currentTime);
      this.depthFilter.connect(this.panner);
      this.panner.connect(this.masterGain);
    } else {
      this.depthFilter.connect(this.masterGain);
    }

    this.masterGain.connect(this.ctx.destination);

    // Pre-generate 5 seconds of seamless Brownian oceanic/cosmic noise
    this.brownianBuffer = this.generateBrownianBuffer();
  }

  generateBrownianBuffer() {
    if (!this.ctx) return null;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 5; // 5 seconds stereo buffer
    const buffer = this.ctx.createBuffer(2, bufferSize, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.025;
        data[i] = lastOut * 3.2;
      }
    }
    return buffer;
  }

  start() {
    if (!this.ctx || this.ctx.state === "closed") {
      this.init();
    }
    if (!this.ctx) return;

    this.isPlaying = true;

    // Ensure masterGain is connected to destination
    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch (e) {}
      try {
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {}
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    const t = this.ctx.currentTime;
    this.stopNodes();

    // 1. Deep Oceanic / Interstellar Wind Brownian Noise
    if (this.brownianBuffer) {
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = this.brownianBuffer;
      this.noiseNode.loop = true;

      const noiseLowpass = this.ctx.createBiquadFilter();
      noiseLowpass.type = "lowpass";
      noiseLowpass.frequency.setValueAtTime(160, t);
      noiseLowpass.Q.setValueAtTime(1.8, t);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.24, t);

      this.noiseNode.connect(noiseLowpass);
      noiseLowpass.connect(this.noiseGain);
      this.noiseGain.connect(this.depthFilter);
      this.noiseNode.start(t);
    }

    // 2. Deep Trench Sub-Bass Drone (38Hz fundamental)
    const subOsc1 = this.ctx.createOscillator();
    const subGain1 = this.ctx.createGain();
    subOsc1.type = "sine";
    subOsc1.frequency.setValueAtTime(38.0, t);
    subGain1.gain.setValueAtTime(0.35, t);
    subOsc1.connect(subGain1);
    subGain1.connect(this.depthFilter);
    subOsc1.start(t);
    this.oscillators.push(subOsc1);

    // 3. Binaural Cosmic Drift Drone (57.0Hz & 57.35Hz detuned fifth)
    const droneOsc1 = this.ctx.createOscillator();
    const droneOsc2 = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    droneOsc1.type = "sine";
    droneOsc2.type = "triangle";
    droneOsc1.frequency.setValueAtTime(57.0, t);
    droneOsc2.frequency.setValueAtTime(57.35, t);
    droneGain.gain.setValueAtTime(0.18, t);
    droneOsc1.connect(droneGain);
    droneOsc2.connect(droneGain);
    droneGain.connect(this.depthFilter);
    droneOsc1.start(t);
    droneOsc2.start(t);
    this.oscillators.push(droneOsc1, droneOsc2);

    // 4. Abyssal Warmth (114.0Hz resonant octave)
    const warmOsc = this.ctx.createOscillator();
    const warmGain = this.ctx.createGain();
    warmOsc.type = "sine";
    warmOsc.frequency.setValueAtTime(114.0, t);
    warmGain.gain.setValueAtTime(0.09, t);
    warmOsc.connect(warmGain);
    warmGain.connect(this.depthFilter);
    warmOsc.start(t);
    this.oscillators.push(warmOsc);

    // 5. Very Slow Oceanic Tide LFO (0.055Hz)
    const swellLfo = this.ctx.createOscillator();
    const swellLfoGain = this.ctx.createGain();
    swellLfo.type = "sine";
    swellLfo.frequency.setValueAtTime(0.055, t);
    swellLfoGain.gain.setValueAtTime(70, t);
    swellLfo.connect(swellLfoGain);
    swellLfoGain.connect(this.depthFilter.frequency);
    swellLfo.start(t);
    this.lfos.push(swellLfo);

    // 6. Smooth Master Fade In (1.2 seconds)
    if (this.masterGain) {
      try {
        this.masterGain.gain.cancelScheduledValues(0);
        this.masterGain.gain.setValueAtTime(0.0001, t);
        this.masterGain.gain.linearRampToValueAtTime(0.45, t + 1.2);
      } catch (e) {
        this.masterGain.gain.value = 0.45;
      }
    }

    // Trigger initial activation pulses
    this.triggerSonarPulse(392);
    this.initialTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.triggerSonarPulse(523.25);
      }
    }, 450);

    // Schedule recurring pulses
    this.scheduleNextSonar();
    this.scheduleNextShimmer();
  }

  scheduleNextSonar() {
    if (!this.isPlaying) return;
    const delay = 7500 + Math.random() * 4000;
    this.sonarTimer = setTimeout(() => {
      if (this.isPlaying) {
        const freqs = [349.23, 392.0, 466.16, 523.25];
        const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];
        this.triggerSonarPulse(chosenFreq);
        this.scheduleNextSonar();
      }
    }, delay);
  }

  scheduleNextShimmer() {
    if (!this.isPlaying) return;
    const delay = 4000 + Math.random() * 5000;
    this.shimmerTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.triggerBioluminescentSpark();
        this.scheduleNextShimmer();
      }
    }, delay);
  }

  triggerSonarPulse(freq = 466.16) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(freq, now);
      bandpass.Q.setValueAtTime(5.0, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + 2.4);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.depthFilter);

      this.activePulses.push(osc);
      osc.onended = () => {
        const idx = this.activePulses.indexOf(osc);
        if (idx !== -1) this.activePulses.splice(idx, 1);
      };

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // AudioContext safety
    }
  }

  triggerBioluminescentSpark() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 950 + Math.random() * 800;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.depthFilter);

      this.activePulses.push(osc);
      osc.onended = () => {
        const idx = this.activePulses.indexOf(osc);
        if (idx !== -1) this.activePulses.splice(idx, 1);
      };

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // AudioContext safety
    }
  }

  stopNodes() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.oscillators = [];

    this.lfos.forEach((lfo) => {
      try {
        lfo.stop();
        lfo.disconnect();
      } catch {}
    });
    this.lfos = [];

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {}
      this.noiseNode = null;
    }

    if (this.activePulses) {
      this.activePulses.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.activePulses = [];
    }

    if (this.sonarTimer) {
      clearTimeout(this.sonarTimer);
      this.sonarTimer = null;
    }
    if (this.shimmerTimer) {
      clearTimeout(this.shimmerTimer);
      this.shimmerTimer = null;
    }
    if (this.initialTimer) {
      clearTimeout(this.initialTimer);
      this.initialTimer = null;
    }
  }

  stop() {
    this.isPlaying = false;

    // 1. Clear all timers immediately
    if (this.sonarTimer) {
      clearTimeout(this.sonarTimer);
      this.sonarTimer = null;
    }
    if (this.shimmerTimer) {
      clearTimeout(this.shimmerTimer);
      this.shimmerTimer = null;
    }
    if (this.initialTimer) {
      clearTimeout(this.initialTimer);
      this.initialTimer = null;
    }

    // 2. Immediately stop all sound generator nodes
    this.stopNodes();

    // 3. Immediately silence master gain and disconnect
    if (this.masterGain) {
      try {
        const t = this.ctx ? this.ctx.currentTime : 0;
        this.masterGain.gain.cancelScheduledValues(0);
        this.masterGain.gain.setValueAtTime(0, t);
        this.masterGain.gain.value = 0;
      } catch (e) {
        try {
          this.masterGain.gain.value = 0;
        } catch (e2) {}
      }

      // Hard disconnect to guarantee no sound leaks to destination
      try {
        this.masterGain.disconnect();
      } catch (e) {}
    }

    // 4. Suspend audio context hardware output
    if (this.ctx && this.ctx.state !== "closed" && this.ctx.state !== "suspended") {
      try {
        this.ctx.suspend().catch(() => {});
      } catch (e) {}
    }
  }

  updatePointer(xRatio, yRatio) {
    if (!this.ctx || !this.isPlaying) return;
    const t = this.ctx.currentTime;

    if (this.depthFilter) {
      const targetFreq = 140 + (1 - yRatio) * 420;
      this.depthFilter.frequency.setTargetAtTime(targetFreq, t, 0.25);
    }

    if (this.panner) {
      const panTarget = (xRatio - 0.5) * 0.9;
      this.panner.pan.setTargetAtTime(panTarget, t, 0.2);
    }
  }
}

// Global registry to handle hot module reloading cleanly
if (typeof window !== "undefined") {
  if (window.__globalDeepCosmicAudioEngine) {
    try {
      window.__globalDeepCosmicAudioEngine.stop();
    } catch (e) {}
  }
  if (window.__activeWebAudioContexts) {
    window.__activeWebAudioContexts.forEach((ctx) => {
      try {
        if (ctx.state !== "closed") {
          ctx.close().catch(() => {});
        }
      } catch (e) {}
    });
    window.__activeWebAudioContexts.clear();
  } else {
    window.__activeWebAudioContexts = new Set();
  }
}

function getGlobalAudioEngine() {
  if (typeof window === "undefined") return null;
  if (!window.__globalDeepCosmicAudioEngine) {
    window.__globalDeepCosmicAudioEngine = new DeepCosmicAudioEngine();
  }
  return window.__globalDeepCosmicAudioEngine;
}

export function HeroAmbientSound() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const engineRef = useRef(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    const engine = getGlobalAudioEngine();
    engineRef.current = engine;

    // Start by default if not muted by user
    if (!userMutedRef.current && engine) {
      engine.start();
    }

    // Browsers block autoplay until the user interacts with the page anywhere.
    // This auto-resumes audio seamlessly on the very first tap/click/scroll,
    // but strictly ignores clicks on the mute/sound switch itself.
    const handleFirstInteraction = (e) => {
      if (e?.target && (e.target.closest?.("[data-audio-switch]") || e.target.getAttribute?.("data-audio-switch"))) {
        return;
      }
      if (userMutedRef.current) return;

      if (engineRef.current) {
        if (!engineRef.current.isPlaying || (engineRef.current.ctx && engineRef.current.ctx.state === "suspended")) {
          engineRef.current.start();
          setIsPlaying(true);
        }
      }
      removeListeners();
    };

    const listeners = ["pointerdown", "touchstart", "keydown", "wheel"];
    const addListeners = () => {
      listeners.forEach((evt) => {
        window.addEventListener(evt, handleFirstInteraction, { passive: true });
      });
    };
    const removeListeners = () => {
      listeners.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction);
      });
    };

    addListeners();

    // Track mouse over window/hero to modulate spatial soundscape
    const handleMouseMove = (e) => {
      if (engineRef.current && engineRef.current.isPlaying) {
        const xRatio = e.clientX / window.innerWidth;
        const yRatio = e.clientY / window.innerHeight;
        engineRef.current.updatePointer(xRatio, yRatio);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      removeListeners();
      window.removeEventListener("mousemove", handleMouseMove);
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, []);

  const toggleSound = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!engineRef.current) {
      engineRef.current = getGlobalAudioEngine();
    }
    if (!engineRef.current) return;

    if (isPlaying) {
      userMutedRef.current = true;
      setIsPlaying(false);
      engineRef.current.stop();

      // Additional guarantee: suspend any active audio contexts across the window
      if (typeof window !== "undefined" && window.__activeWebAudioContexts) {
        window.__activeWebAudioContexts.forEach((ctx) => {
          try {
            if (ctx.state !== "closed" && ctx.state !== "suspended") {
              ctx.suspend().catch(() => {});
            }
          } catch (err) {}
        });
      }
    } else {
      userMutedRef.current = false;
      setIsPlaying(true);
      setShowHint(false);
      engineRef.current.start();
    }
  }, [isPlaying]);

  return (
    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-30 flex flex-col items-end pointer-events-auto">
      {/* Floating Guidance Tooltip (Desktop only) */}
      {showHint && !isPlaying && (
        <div 
          onClick={toggleSound}
          data-audio-switch="true"
          className="hidden sm:flex mb-2.5 px-3 py-1.5 rounded-full bg-[#4100F5]/30 hover:bg-[#4100F5]/50 border border-[#885FFF]/40 backdrop-blur-md text-white text-[11px] font-medium tracking-wide items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(136,95,255,0.35)] transition-all animate-pulse"
        >
          <Sparkles className="w-3 h-3 text-[#885FFF]" />
          <span>Deep Space & Oceanic Vibe</span>
        </div>
      )}

      {/* Main Glass Audio Controller Pill */}
      <button
        onClick={toggleSound}
        data-audio-switch="true"
        type="button"
        aria-label={isPlaying ? "Mute Deep Ambience" : "Play Deep Ambience"}
        className={`group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full
          backdrop-blur-xl border transition-all duration-300 select-none cursor-pointer
          ${
            isPlaying
              ? "bg-[#4100F5]/25 border-[#885FFF]/60 shadow-[0_0_25px_rgba(65,0,245,0.45)] text-white"
              : "bg-white/[0.04] hover:bg-white/[0.08] border-white/15 hover:border-white/30 text-white/70 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          }`}
      >
        {/* Animated Equalizer Wave Bars */}
        <div className="flex items-end gap-[3px] h-3.5 w-4 justify-center">
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-gradient-to-t from-[#885FFF] to-cyan-300 animate-[abyssal_1.8s_ease-in-out_infinite_alternate]"
                : "bg-white/40 h-1"
            }`}
            style={{ animationDelay: "0ms" }}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-gradient-to-t from-[#885FFF] to-cyan-300 animate-[abyssal_2.4s_ease-in-out_infinite_alternate]"
                : "bg-white/40 h-2.5"
            }`}
            style={{ animationDelay: "350ms" }}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-gradient-to-t from-[#885FFF] to-cyan-300 animate-[abyssal_1.6s_ease-in-out_infinite_alternate]"
                : "bg-white/40 h-1.5"
            }`}
            style={{ animationDelay: "700ms" }}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-gradient-to-t from-[#885FFF] to-cyan-300 animate-[abyssal_2.1s_ease-in-out_infinite_alternate]"
                : "bg-white/40 h-2"
            }`}
            style={{ animationDelay: "450ms" }}
          />
        </div>

        {/* Text Status */}
        <div className="flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider font-semibold">
          <span className="hidden min-[400px]:inline">
            {isPlaying ? "Abyss" : "Sound"}
          </span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold tracking-widest ${
              isPlaying
                ? "bg-[#885FFF]/30 text-cyan-200 border border-[#885FFF]/40"
                : "bg-white/10 text-white/50"
            }`}
          >
            {isPlaying ? "ON" : "OFF"}
          </span>
        </div>

        {/* Icon */}
        <div className="text-white/80 group-hover:text-white transition-colors">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-white/50" />
          )}
        </div>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes abyssal {
          0% { height: 3px; opacity: 0.4; }
          50% { height: 13px; opacity: 1; }
          100% { height: 5px; opacity: 0.7; }
        }
      `}} />
    </div>
  );
}

export default HeroAmbientSound;
