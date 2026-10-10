import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { Rotate3d, Sparkles, RefreshCw } from "lucide-react";

function FlaskModel({ scale = 1.35 }) {
  const { scene } = useGLTF("/models/flask.glb");
  const modelRef = useRef();

  // Subtle natural secondary rotation
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Center top>
      <primitive
        ref={modelRef}
        object={scene}
        scale={scale}
        position={[0, 0, 0]}
      />
    </Center>
  );
}

// Preload the model for instantaneous rendering
useGLTF.preload("/models/flask.glb");

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
      <RefreshCw className="w-6 h-6 animate-spin text-[#885FFF]" />
      <span className="text-xs font-mono tracking-wider uppercase">Loading 3D Vessel...</span>
    </div>
  );
}

export function Flask3DViewer({ className = "" }) {
  const [isInteracting, setIsInteracting] = useState(false);
  const controlsRef = useRef(null);

  const handleResetCamera = (e) => {
    e.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      className={`relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0F1026] via-[#090A1A] to-[#04040D] border border-white/10 shadow-[0_25px_60px_-15px_rgba(65,0,245,0.3)] group select-none ${className}`}
    >
      {/* ── Soft Ambient Glows Behind Flask ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4100F5]/25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#885FFF]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-6 left-1/4 w-40 h-40 bg-teal-400/10 rounded-full blur-[70px] pointer-events-none" />

      {/* ── Top Bar Editorial Badges ── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white/90">
          <Rotate3d className="w-3.5 h-3.5 text-[#885FFF]" />
          <span>REAL-TIME 3D WEBGL</span>
        </div>
        <button
          onClick={handleResetCamera}
          title="Reset Camera View"
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── 3D Canvas Stage ── */}
      <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0.4, 4.2], fov: 42 }}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
          }}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
        >
          {/* Lighting Rig tailored for glass and reflective surfaces */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={3.0} color="#ffffff" />
          <directionalLight position={[-5, -2, -3]} intensity={2.5} color="#885FFF" />
          <directionalLight position={[0, -5, 4]} intensity={1.2} color="#2dd4bf" />
          <pointLight position={[0, 3, 2]} intensity={2.0} color="#ffffff" />

          <Suspense fallback={null}>
            <Float
              speed={1.8}
              rotationIntensity={0.4}
              floatIntensity={0.6}
              floatingRange={[-0.05, 0.05]}
            >
              <FlaskModel scale={1.35} />
            </Float>
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            autoRotate={!isInteracting}
            autoRotateSpeed={2.0}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.7}
            dampingFactor={0.06}
          />
        </Canvas>

        <Suspense fallback={<LoadingSpinner />}>
          <div />
        </Suspense>
      </div>

      {/* ── Bottom Floating Glass Caption ── */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="backdrop-blur-xl bg-black/55 p-3.5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-heading font-bold text-[#885FFF] uppercase tracking-wider block">
              Precision Glass Vessel
            </span>
            <p className="text-[11px] text-white/70 font-normal leading-tight">
              Interactive PBR Shader & Volumetric Refraction Model
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-white/50 shrink-0">
            <span>DRAG TO ORBIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flask3DViewer;
