import { Suspense, useRef, useState, useEffect, useMemo, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, OrbitControls, Float, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { 
  Rotate3d, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  Sun, 
  Zap, 
  Flame, 
  Grid3X3, 
  Layers, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Sliders,
  CheckCircle2,
  Box,
  Compass
} from "lucide-react";
import { models3dCatalog } from "@/data/models3dData";

/**
 * Robust Error Boundary to gracefully recover if a GLB model fails to parse.
 */
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Model load error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/80 backdrop-blur-md z-30">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
            <Box className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-lg font-bold text-white mb-2">Model Load Interrupted</h4>
          <p className="text-xs text-white/60 max-w-sm mb-5 font-normal">
            The selected 3D asset could not be initialized in WebGL memory. You can switch to another model below.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              if (this.props.onRetry) this.props.onRetry();
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
          >
            Retry Loading
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Animated Loading Screen reflecting Drei's useProgress
 */
function ModelLoadingOverlay({ modelName, category }) {
  const { progress } = useProgress();
  const roundedProgress = Math.round(progress) || 0;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#090A1A]/90 via-[#04040D]/95 to-black/95 backdrop-blur-md z-20 transition-opacity duration-300">
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center space-y-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-[#4100F5]/20 border border-[#885FFF]/30 flex items-center justify-center text-[#885FFF]">
            <RefreshCw className="w-6 h-6 animate-spin text-[#885FFF]" />
          </div>
          <div className="absolute -inset-2 bg-[#4100F5]/20 rounded-3xl blur-xl -z-10" />
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#885FFF] block">
            {category || "3D CGI Asset"}
          </span>
          <h4 className="text-base font-heading font-bold text-white tracking-wide">
            {modelName}
          </h4>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2 pt-2">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] rounded-full transition-all duration-200"
              style={{ width: `${Math.max(roundedProgress, 8)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
            <span>STREAMING GEOMETRY</span>
            <span>{roundedProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Camera Controller to smoothly adapt FOV & position when switching models
 */
function CameraRig({ cameraPosition = [0, 0, 4.2] }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    camera.lookAt(0, 0, 0);
  }, [cameraPosition, camera]);

  return null;
}

/**
 * Lighting Rig with 3 configurable presets: Studio, Cyber Neon, Warm Amber
 */
function LightingRig({ lightingPreset }) {
  if (lightingPreset === "cyber") {
    return (
      <>
        <ambientLight intensity={0.9} color="#0d1127" />
        <directionalLight position={[6, 6, 4]} intensity={3.0} color="#00e5ff" />
        <directionalLight position={[-6, -3, -4]} intensity={3.2} color="#b026ff" />
        <pointLight position={[0, 4, 2]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[0, -4, 2]} intensity={1.2} color="#3b82f6" />
      </>
    );
  }

  if (lightingPreset === "warm") {
    return (
      <>
        <ambientLight intensity={1.1} color="#271c14" />
        <directionalLight position={[5, 7, 5]} intensity={3.2} color="#f59e0b" />
        <directionalLight position={[-5, -2, -3]} intensity={2.0} color="#ea580c" />
        <directionalLight position={[0, -3, 3]} intensity={1.0} color="#fbbf24" />
        <pointLight position={[2, 3, 3]} intensity={1.8} color="#fef3c7" />
      </>
    );
  }

  // Default: Studio Neutral
  return (
    <>
      <ambientLight intensity={1.3} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={3.0} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={2.4} color="#885FFF" />
      <directionalLight position={[0, -5, 4]} intensity={1.2} color="#2dd4bf" />
      <pointLight position={[0, 3, 2]} intensity={2.0} color="#ffffff" />
    </>
  );
}

/**
 * Renderable 3D Model Instance with Wireframe & Auto-Scale
 */
function ModelScene({ model, isWireframe, autoRotate, controlsRef }) {
  const encodedPath = encodeURI(model.file);
  const { scene } = useGLTF(encodedPath);
  const groupRef = useRef();

  // Clone scene so wireframe toggle does not permanently corrupt cached materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    return clone;
  }, [scene]);

  // Apply wireframe dynamically
  useEffect(() => {
    if (!clonedScene) return;
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material = child.material.map((m) => {
            const mat = m.clone();
            mat.wireframe = isWireframe;
            return mat;
          });
        } else {
          const mat = child.material.clone();
          mat.wireframe = isWireframe;
          child.material = mat;
        }
      }
    });
  }, [clonedScene, isWireframe]);

  // Subtle continuous slow rotation if autoRotate is active
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Center top={false}>
      <group
        ref={groupRef}
        scale={model.scale || 1.0}
        position={model.position || [0, 0, 0]}
      >
        <primitive object={clonedScene} />
      </group>
    </Center>
  );
}

/**
 * Main 3D Model Showroom Component
 */
export function Model3DShowroom({ 
  className = "", 
  initialModelId = null,
  onModelSelect = null 
}) {
  const [activeModelIndex, setActiveModelIndex] = useState(() => {
    if (initialModelId) {
      const idx = models3dCatalog.findIndex((m) => m.id === initialModelId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [lightingPreset, setLightingPreset] = useState("studio"); // "studio" | "cyber" | "warm"
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const controlsRef = useRef(null);
  const containerRef = useRef(null);

  const currentModel = models3dCatalog[activeModelIndex] || models3dCatalog[0];

  // Sync external initialModelId changes if passed
  useEffect(() => {
    if (initialModelId) {
      const idx = models3dCatalog.findIndex((m) => m.id === initialModelId);
      if (idx >= 0) setActiveModelIndex(idx);
    }
  }, [initialModelId]);

  const handleSelectModel = (index) => {
    setActiveModelIndex(index);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    if (onModelSelect) {
      onModelSelect(models3dCatalog[index]);
    }
  };

  const handleResetCamera = (e) => {
    e.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleNextModel = () => {
    handleSelectModel((activeModelIndex + 1) % models3dCatalog.length);
  };

  const handlePrevModel = () => {
    handleSelectModel((activeModelIndex - 1 + models3dCatalog.length) % models3dCatalog.length);
  };

  // Toggle theater full-screen view
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#0F1026] via-[#090A1A] to-[#04040D] border border-white/10 shadow-[0_25px_60px_-15px_rgba(65,0,245,0.35)] group select-none transition-all duration-500 ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none border-none h-screen w-screen"
          : `aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] ${className}`
      }`}
    >
      {/* ── Ambient Background Lighting Spheres ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#4100F5]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-[#885FFF]/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-52 h-52 bg-teal-400/10 rounded-full blur-[80px] pointer-events-none" />

      {/* ── Top Bar Controls & Status ── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Model Category & Identifier */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white shadow-sm">
            <Rotate3d className="w-3.5 h-3.5 text-[#885FFF]" />
            <span className="font-semibold uppercase tracking-wider">3D WEBGL STUDIO</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/70">
            <span>MODEL {activeModelIndex + 1} / {models3dCatalog.length}</span>
          </div>
        </div>

        {/* Right: Studio Controls Bar */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Lighting Mode Presets */}
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
            <button
              onClick={() => setLightingPreset("studio")}
              title="Studio Neutral Lighting"
              className={`p-1.5 rounded-full transition-all ${
                lightingPreset === "studio"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightingPreset("cyber")}
              title="Cyber Neon Lighting"
              className={`p-1.5 rounded-full transition-all ${
                lightingPreset === "cyber"
                  ? "bg-[#885FFF] text-white shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightingPreset("warm")}
              title="Golden Hour Lighting"
              className={`p-1.5 rounded-full transition-all ${
                lightingPreset === "warm"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Wireframe Shading Toggle */}
          <button
            onClick={() => setIsWireframe((prev) => !prev)}
            title={isWireframe ? "Rendered Shading Mode" : "Wireframe Topology Mode"}
            className={`px-2.5 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono transition-all flex items-center gap-1.5 ${
              isWireframe
                ? "bg-[#885FFF] border-[#885FFF] text-white shadow-[0_0_15px_rgba(136,95,255,0.4)]"
                : "bg-black/40 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isWireframe ? "WIREFRAME" : "SHADED"}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              autoRotate
                ? "bg-white/15 border-white/20 text-white"
                : "bg-black/40 border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Camera View */}
          <button
            onClick={handleResetCamera}
            title="Reset Camera Angle"
            className="p-2 rounded-full bg-black/40 hover:bg-white/15 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Info Drawer Toggle */}
          <button
            onClick={() => setShowInfoDrawer((prev) => !prev)}
            title="Model Architecture & Specs"
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              showInfoDrawer
                ? "bg-[#4100F5] border-[#885FFF] text-white"
                : "bg-black/40 border-white/10 text-white/70 hover:text-white hover:bg-white/15"
            }`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen / Theater Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Theater Mode" : "Expand Theater Mode"}
            className="p-2 rounded-full bg-black/40 hover:bg-white/15 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── 3D Canvas Stage ── */}
      <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
        <ModelErrorBoundary onRetry={() => handleSelectModel(activeModelIndex)}>
          <Canvas
            camera={{ 
              position: currentModel.cameraPosition || [0, 0.4, 4.2], 
              fov: currentModel.fov || 42 
            }}
            gl={{
              alpha: true,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.35,
            }}
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
          >
            <CameraRig cameraPosition={currentModel.cameraPosition} />
            <LightingRig lightingPreset={lightingPreset} />

            <Suspense fallback={null}>
              <Float
                speed={1.4}
                rotationIntensity={0.25}
                floatIntensity={0.4}
                floatingRange={[-0.04, 0.04]}
              >
                <ModelScene
                  key={`${currentModel.id}-${isWireframe}`}
                  model={currentModel}
                  isWireframe={isWireframe}
                  autoRotate={autoRotate && !isInteracting}
                  controlsRef={controlsRef}
                />
              </Float>
            </Suspense>

            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={true}
              minDistance={1.2}
              maxDistance={12.0}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.7}
              dampingFactor={0.06}
            />
          </Canvas>
        </ModelErrorBoundary>

        {/* Suspense Loading State */}
        <Suspense fallback={<ModelLoadingOverlay modelName={currentModel.name} category={currentModel.category} />}>
          <div />
        </Suspense>
      </div>

      {/* ── Left / Right Quick Model Switcher Arrows ── */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <button
          onClick={handlePrevModel}
          title="Previous 3D Model"
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <button
          onClick={handleNextModel}
          title="Next 3D Model"
          className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Slide-Over Technical Specs Drawer ── */}
      {showInfoDrawer && (
        <div className="absolute top-16 right-4 bottom-28 w-80 max-w-[calc(100vw-2rem)] z-30 backdrop-blur-2xl bg-black/85 rounded-2xl border border-white/15 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto transition-all animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#885FFF] block">
                  TECHNICAL SPECS
                </span>
                <h4 className="font-heading font-bold text-sm text-white">
                  {currentModel.name}
                </h4>
              </div>
              <button
                onClick={() => setShowInfoDrawer(false)}
                className="text-white/50 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-normal">
              {currentModel.description}
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white/50 font-mono text-[11px]">Polygon Budget</span>
                <span className="text-white font-mono font-medium text-[11px]">{currentModel.polyCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-white/50 font-mono text-[11px]">Texture Map</span>
                <span className="text-white font-mono font-medium text-[11px] text-right truncate max-w-[150px]">
                  {currentModel.textureFormat}
                </span>
              </div>
              {currentModel.specs?.map((spec, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                  <span className="text-white/50 font-mono text-[11px]">{spec.label}</span>
                  <span className="text-white font-mono font-medium text-[11px] text-right truncate max-w-[150px]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentModel.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded bg-white/[0.08] border border-white/10 text-[10px] font-mono text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => {
                if (isFullscreen) setIsFullscreen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white font-heading font-semibold text-xs transition-all shadow-md"
            >
              <span>Inquire for Similar 3D CGI</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ── Bottom Section: Active Model Meta + Model Selector Carousel ── */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex flex-col gap-2.5">
        {/* Model Title & Drag Hint */}
        <div className="backdrop-blur-xl bg-black/60 p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between gap-3 pointer-events-auto">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-heading font-bold text-[#885FFF] uppercase tracking-wider truncate">
                {currentModel.category}
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/30" />
              <span className="hidden sm:inline-block text-[11px] font-mono text-white/50">
                {currentModel.polyCount}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-heading font-bold text-white tracking-tight truncate">
              {currentModel.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-white/50 px-2.5 py-1 rounded-md bg-white/5 border border-white/5">
              <Compass className="w-3 h-3 text-[#885FFF]" />
              <span>DRAG TO ROTATE • SCROLL TO ZOOM</span>
            </div>

            <button
              onClick={() => setShowInfoDrawer((prev) => !prev)}
              className="text-xs font-heading font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            >
              Specs
            </button>
          </div>
        </div>

        {/* Model Selector Strip */}
        <div className="pointer-events-auto overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 min-w-max pb-0.5">
            {models3dCatalog.map((model, idx) => {
              const isActive = idx === activeModelIndex;
              return (
                <button
                  key={model.id}
                  onClick={() => handleSelectModel(idx)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-left transition-all duration-200 border flex items-center gap-2.5 ${
                    isActive
                      ? "bg-gradient-to-r from-[#4100F5]/80 to-[#885FFF]/80 border-[#885FFF] text-white shadow-[0_4px_20px_rgba(65,0,245,0.4)] scale-[1.02]"
                      : "bg-black/60 hover:bg-black/80 border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-white ring-2 ring-[#885FFF]" : "bg-white/30"
                    }`}
                  />
                  <div>
                    <span className="text-xs font-heading font-bold block leading-tight whitespace-nowrap">
                      {model.name}
                    </span>
                    <span className="text-[10px] font-mono opacity-70 block leading-tight whitespace-nowrap">
                      {model.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model3DShowroom;
