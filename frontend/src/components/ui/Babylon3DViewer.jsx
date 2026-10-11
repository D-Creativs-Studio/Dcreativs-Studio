import { useEffect, useRef, useState, useCallback } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Camera,
  Vector3,
  Color4,
  Color3,
  HemisphericLight,
  DirectionalLight,
  SceneLoader,
  CreateLineSystem,
  StandardMaterial,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import {
  RefreshCw,
  Sun,
  Zap,
  Flame,
  Grid3X3,
  X,
  Box,
  ChevronRight,
  ZoomIn,
  Hand,
  Focus,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
 * Blender-style Babylon.js viewport
 *
 *  Mouse
 *   MMB drag / LMB drag ........ Orbit
 *   Shift + MMB / RMB drag ..... Pan
 *   Ctrl + MMB drag / Wheel .... Zoom
 *  Numpad (top-row digits also work)
 *   1 / Ctrl+1 ................. Front / Back
 *   3 / Ctrl+3 ................. Right / Left
 *   7 / Ctrl+7 ................. Top / Bottom
 *   5 .......................... Toggle Perspective / Orthographic
 *   2 4 6 8 .................... Orbit in 15 degree steps
 *   9 .......................... Opposite view
 *   . / Home / F ............... Frame model
 *  Auto-perspective: axis views switch to orthographic, orbiting
 *  switches back to perspective (Blender default behaviour).
 * ──────────────────────────────────────────────────────────────── */

const ORBIT_SPEED = 0.007; // rad per pixel
const STEP = Math.PI / 12; // 15 degrees
export const DEFAULT_ALPHA = -0.72; // Blender default 3/4 front-right view
export const DEFAULT_BETA = 1.08;

// Blender axis -> Babylon world vector (Blender is Z-up, Babylon is Y-up)
const GIZMO_AXES = [
  { key: "x", vec: new Vector3(1, 0, 0), color: "#FF3352", label: "X", positive: true, view: "right" },
  { key: "y", vec: new Vector3(0, 0, 1), color: "#8BDC00", label: "Y", positive: true, view: "back" },
  { key: "z", vec: new Vector3(0, 1, 0), color: "#2890FF", label: "Z", positive: true, view: "top" },
  { key: "-x", vec: new Vector3(-1, 0, 0), color: "#FF3352", label: "", positive: false, view: "left" },
  { key: "-y", vec: new Vector3(0, 0, -1), color: "#8BDC00", label: "", positive: false, view: "front" },
  { key: "-z", vec: new Vector3(0, -1, 0), color: "#2890FF", label: "", positive: false, view: "bottom" },
];

const VIEW_ANGLES = {
  front: { alpha: -Math.PI / 2, beta: Math.PI / 2, label: "Front" },
  back: { alpha: Math.PI / 2, beta: Math.PI / 2, label: "Back" },
  right: { alpha: 0, beta: Math.PI / 2, label: "Right" },
  left: { alpha: Math.PI, beta: Math.PI / 2, label: "Left" },
  top: { alpha: -Math.PI / 2, beta: 0.001, label: "Top" },
  bottom: { alpha: -Math.PI / 2, beta: Math.PI - 0.001, label: "Bottom" },
};

/** World-space bounds of all visible geometry */
export function computeBounds(meshes) {
  const min = new Vector3(Infinity, Infinity, Infinity);
  const max = new Vector3(-Infinity, -Infinity, -Infinity);
  meshes.forEach((m) => {
    if (!m.isVisible || !m.getTotalVertices || m.getTotalVertices() === 0) return;
    m.computeWorldMatrix(true);
    const bb = m.getBoundingInfo().boundingBox;
    min.minimizeInPlace(bb.minimumWorld);
    max.maximizeInPlace(bb.maximumWorld);
  });
  if (!isFinite(min.x)) return null;
  const center = min.add(max).scale(0.5);
  const size = max.subtract(min);
  return {
    min,
    max,
    center,
    radius: Math.max(size.length() / 2, 0.001),
    maxExtent: Math.max(size.x, size.y, size.z, 0.001),
  };
}

/** Blender-style floor grid: minor + major lines, red X axis, green Y axis, radial fade */
export function buildBlenderGrid(scene, bounds) {
  const size = bounds.maxExtent;
  const minor = Math.pow(10, Math.floor(Math.log10(size / 3)));
  const major = minor * 10;
  const reach = Math.max(
    size * 6,
    Math.abs(bounds.center.x) + size * 3,
    Math.abs(bounds.center.z) + size * 3,
    minor * 20
  );
  const R = Math.ceil(reach / major) * major;
  const count = Math.round(R / minor);
  const y = bounds.min.y - size * 0.0008;
  const SEG = 32;

  const fade = (x, z) => {
    const f = Math.max(0, 1 - Math.sqrt(x * x + z * z) / R);
    return f * f;
  };

  const lines = [];
  const colors = [];
  const minorCol = [0.55, 0.57, 0.62, 0.1];
  const majorCol = [0.6, 0.62, 0.68, 0.24];
  const xAxisCol = [1.0, 0.2, 0.32, 0.9]; // Blender X (red)
  const yAxisCol = [0.55, 0.86, 0.0, 0.9]; // Blender Y (green)

  const pushLine = (fixed, alongZ, col) => {
    const pts = [];
    const cols = [];
    for (let s = 0; s <= SEG; s++) {
      const t = -R + (2 * R * s) / SEG;
      const x = alongZ ? fixed : t;
      const z = alongZ ? t : fixed;
      pts.push(new Vector3(x, y, z));
      cols.push(new Color4(col[0], col[1], col[2], col[3] * fade(x, z)));
    }
    lines.push(pts);
    colors.push(cols);
  };

  for (let i = -count; i <= count; i++) {
    if (i === 0) continue;
    const col = i % 10 === 0 ? majorCol : minorCol;
    pushLine(i * minor, true, col);
    pushLine(i * minor, false, col);
  }
  pushLine(0, false, xAxisCol); // X axis runs along world X
  pushLine(0, true, yAxisCol); // Blender Y axis runs along Babylon Z

  const grid = CreateLineSystem("blenderGrid", { lines, colors, useVertexAlpha: true }, scene);
  grid.isPickable = false;
  return grid;
}

export function Babylon3DViewer({
  modelUrl,
  modelName = "3D Asset",
  category = "CGI Production",
  polyCount = "Optimized Tris",
  description = "",
  specs = [],
  tags = [],
  className = "",
  onClose = null,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const lightsRef = useRef({});
  const navRef = useRef(null);
  const gizmoSvgRef = useRef(null);
  const gizmoRefs = useRef({});
  const materialsRef = useRef({ originals: new Map(), solid: null, wire: null });

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [shadingMode, setShadingMode] = useState("rendered");
  const [lightingPreset, setLightingPreset] = useState("studio");
  const [isOrtho, setIsOrtho] = useState(false);
  const [viewKind, setViewKind] = useState("User");
  const [showSpecs, setShowSpecs] = useState(false);

  // Lock page scroll while the viewport is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ── Engine, scene, camera, navigation ─────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    setIsLoading(true);
    setLoadProgress(0);
    setLoadError(null);

    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: false,
      stencil: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio || 1, 2));

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.098, 0.102, 0.118, 1); // Blender-like neutral dark
    sceneRef.current = scene;

    const cam = new ArcRotateCamera("viewportCam", DEFAULT_ALPHA, DEFAULT_BETA, 5, Vector3.Zero(), scene);
    cam.inputs.clear(); // our Blender navigation owns all input
    cam.minZ = 0.01;
    cam.maxZ = 100000;
    cam.lowerBetaLimit = 0.001;
    cam.upperBetaLimit = Math.PI - 0.001;
    cam.lowerRadiusLimit = 0.001;
    cam.upperRadiusLimit = 100000;
    cam.fov = 0.8;

    // Lights
    const hemiLight = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
    hemiLight.intensity = 1.35;
    hemiLight.groundColor = new Color3(0.12, 0.12, 0.2);
    const dirLight1 = new DirectionalLight("key", new Vector3(2.5, -4, 2.5), scene);
    dirLight1.intensity = 2.4;
    const dirLight2 = new DirectionalLight("rim", new Vector3(-3, -2, -3), scene);
    dirLight2.intensity = 2.2;
    dirLight2.diffuse = new Color3(0.53, 0.37, 1);
    lightsRef.current = { hemiLight, dirLight1, dirLight2 };

    // Viewport state
    const state = {
      bounds: null,
      meshes: [],
      ortho: false,
      autoOrtho: false,
      orthoScale: 1, // half-height of the ortho frustum
      kind: "User",
      grid: null,
    };

    const halfTan = () => Math.tan(cam.fov / 2);
    const sceneRadius = () => (state.bounds ? state.bounds.radius : 1);

    const setKind = (k) => {
      if (state.kind !== k) {
        state.kind = k;
        setViewKind(k);
      }
    };

    const applyOrthoFrustum = () => {
      if (!state.ortho) return;
      const aspect = engine.getAspectRatio(cam);
      cam.orthoTop = state.orthoScale;
      cam.orthoBottom = -state.orthoScale;
      cam.orthoRight = state.orthoScale * aspect;
      cam.orthoLeft = -state.orthoScale * aspect;
    };

    const setOrtho = (enable, auto = false) => {
      if (enable === state.ortho) {
        state.autoOrtho = enable && auto && state.autoOrtho;
        return;
      }
      if (enable) {
        // Match the current perspective framing, then pull the camera back so nothing clips
        state.orthoScale = cam.radius * halfTan();
        cam.radius = Math.max(cam.radius, sceneRadius() * 6);
        cam.mode = Camera.ORTHOGRAPHIC_CAMERA;
        state.ortho = true;
        state.autoOrtho = auto;
        applyOrthoFrustum();
      } else {
        cam.mode = Camera.PERSPECTIVE_CAMERA;
        cam.radius = state.orthoScale / halfTan();
        state.ortho = false;
        state.autoOrtho = false;
      }
      setIsOrtho(state.ortho);
    };

    const orbit = (dAlpha, dBeta) => {
      if (state.ortho && state.autoOrtho) setOrtho(false);
      cam.alpha += dAlpha;
      cam.beta = Math.min(Math.PI - 0.001, Math.max(0.001, cam.beta + dBeta));
      setKind("User");
    };

    const zoom = (factor) => {
      const r = sceneRadius();
      if (state.ortho) {
        state.orthoScale = Math.min(r * 40, Math.max(r * 0.005, state.orthoScale * factor));
        applyOrthoFrustum();
      } else {
        cam.radius = Math.min(r * 60, Math.max(r * 0.02, cam.radius * factor));
      }
    };

    const pan = (dxPx, dyPx) => {
      const h = canvas.clientHeight || 1;
      const worldPerPx = state.ortho ? (2 * state.orthoScale) / h : (2 * cam.radius * halfTan()) / h;
      const forward = cam.target.subtract(cam.position).normalize();
      const right = Vector3.Cross(cam.upVector, forward).normalize();
      const up = Vector3.Cross(forward, right).normalize();
      cam.target.addInPlace(right.scale(-dxPx * worldPerPx));
      cam.target.addInPlace(up.scale(dyPx * worldPerPx));
    };

    const frame = () => {
      const b = state.bounds;
      if (!b) {
        cam.setTarget(Vector3.Zero());
        return;
      }
      const aspect = engine.getAspectRatio(cam) || 1;
      const halfV = cam.fov / 2;
      const halfH = Math.atan(Math.tan(halfV) * aspect);
      const fit = b.radius / Math.sin(Math.min(halfV, halfH));
      cam.target.copyFrom(b.center);
      if (state.ortho) {
        state.orthoScale = (b.radius * 1.05) / Math.min(1, aspect);
        cam.radius = Math.max(fit, b.radius * 6);
        applyOrthoFrustum();
      } else {
        cam.radius = fit * 1.02;
      }
    };

    const snap = (view) => {
      const v = VIEW_ANGLES[view];
      if (!v) return;
      cam.alpha = v.alpha;
      cam.beta = v.beta;
      if (!state.ortho) setOrtho(true, true); // Blender auto-perspective
      setKind(v.label);
    };

    const toggleOrtho = () => setOrtho(!state.ortho, false);

    const opposite = () => {
      cam.alpha += Math.PI;
      const map = { Front: "Back", Back: "Front", Right: "Left", Left: "Right" };
      if (state.kind === "Top" || state.kind === "Bottom") {
        cam.beta = Math.PI - cam.beta;
        setKind(state.kind === "Top" ? "Bottom" : "Top");
      } else {
        setKind(map[state.kind] || "User");
      }
    };

    const reset = () => {
      if (state.ortho) setOrtho(false);
      cam.alpha = DEFAULT_ALPHA;
      cam.beta = DEFAULT_BETA;
      setKind("User");
      frame();
    };

    navRef.current = { orbit, zoom, pan, frame, snap, toggleOrtho, opposite, reset };

    // ── Gizmo (updated imperatively, only when the view changes) ──
    let lastGizmoKey = "";
    const updateGizmo = () => {
      const svg = gizmoSvgRef.current;
      if (!svg) return;
      const key = `${cam.alpha.toFixed(4)}|${cam.beta.toFixed(4)}`;
      if (key === lastGizmoKey) return;
      lastGizmoKey = key;

      const view = cam.getViewMatrix();
      const R = 27;
      const items = GIZMO_AXES.map((a) => {
        const v = Vector3.TransformNormal(a.vec, view);
        return { a, sx: v.x * R, sy: -v.y * R, depth: v.z };
      });
      items.sort((p, q) => q.depth - p.depth); // far first
      items.forEach(({ a, sx, sy }) => {
        const r = gizmoRefs.current[a.key];
        if (!r || !r.g) return;
        if (r.line) {
          r.line.setAttribute("x2", sx.toFixed(2));
          r.line.setAttribute("y2", sy.toFixed(2));
        }
        r.circle.setAttribute("cx", sx.toFixed(2));
        r.circle.setAttribute("cy", sy.toFixed(2));
        if (r.text) {
          r.text.setAttribute("x", sx.toFixed(2));
          r.text.setAttribute("y", (sy + 3.2).toFixed(2));
        }
        svg.appendChild(r.g); // re-append = depth sort
      });
    };

    engine.runRenderLoop(() => {
      applyOrthoFrustum();
      scene.render();
      updateGizmo();
    });

    // ── Canvas pointer navigation (mouse, pen, touch + pinch) ─────
    const pointers = new Map();
    let mode = null;
    let last = { x: 0, y: 0 };
    let pinch = null;

    const pinchInfo = () => {
      const [p1, p2] = [...pointers.values()];
      return {
        dist: Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1,
        mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
      };
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        mode = "pinch";
        pinch = pinchInfo();
      } else if (pointers.size === 1) {
        mode =
          e.button === 2 || e.shiftKey ? "pan" : e.ctrlKey || e.metaKey ? "zoom" : "orbit";
        last = { x: e.clientX, y: e.clientY };
        canvas.style.cursor = mode === "pan" ? "move" : mode === "zoom" ? "ns-resize" : "grabbing";
      }
    };

    const onPointerMove = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (mode === "pinch" && pointers.size >= 2) {
        const now = pinchInfo();
        zoom(pinch.dist / now.dist);
        pan(now.mid.x - pinch.mid.x, now.mid.y - pinch.mid.y);
        pinch = now;
        return;
      }

      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      if (mode === "orbit") orbit(-dx * ORBIT_SPEED, -dy * ORBIT_SPEED);
      else if (mode === "pan") pan(dx, dy);
      else if (mode === "zoom") zoom(Math.exp(dy * 0.01));
    };

    const onPointerUp = (e) => {
      pointers.delete(e.pointerId);
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      if (pointers.size === 1 && mode === "pinch") {
        const [p] = [...pointers.values()];
        mode = "orbit";
        last = { x: p.x, y: p.y };
      } else if (pointers.size === 0) {
        mode = null;
        canvas.style.cursor = "";
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dy = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      zoom(Math.exp(dy * 0.0015));
    };

    const blockDefault = (e) => e.preventDefault();
    const blockMiddle = (e) => {
      if (e.button === 1) e.preventDefault(); // stop Windows middle-click autoscroll
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("contextmenu", blockDefault);
    canvas.addEventListener("mousedown", blockMiddle);
    canvas.addEventListener("auxclick", blockDefault);
    container.addEventListener("wheel", onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(() => engine.resize());
    resizeObserver.observe(container);

    // ── Load model ────────────────────────────────────────────────
    let disposed = false;
    SceneLoader.ImportMeshAsync("", "", encodeURI(modelUrl), scene, (evt) => {
      if (evt.lengthComputable) setLoadProgress(Math.round((evt.loaded / evt.total) * 100));
      else setLoadProgress((p) => Math.min(p + 10, 95));
    })
      .then((result) => {
        if (disposed) return;
        state.meshes = result.meshes || [];
        state.bounds = computeBounds(state.meshes);
        materialsRef.current.originals = new Map(
          state.meshes.filter((m) => m.material).map((m) => [m, m.material])
        );
        if (state.bounds) state.grid = buildBlenderGrid(scene, state.bounds);
        frame();
        setLoadProgress(100);
        setIsLoading(false);
      })
      .catch((err) => {
        if (disposed) return;
        console.error("Babylon.js mesh load failed:", err);
        setIsLoading(false);
        setLoadError(err?.message || "Failed to load 3D asset");
      });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("contextmenu", blockDefault);
      canvas.removeEventListener("mousedown", blockMiddle);
      canvas.removeEventListener("auxclick", blockDefault);
      container.removeEventListener("wheel", onWheel);
      navRef.current = null;
      materialsRef.current = { originals: new Map(), solid: null, wire: null };
      scene.dispose();
      engine.dispose();
      sceneRef.current = null;
    };
  }, [modelUrl, reloadKey]);

  // ── Keyboard: Blender numpad map ────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      const nav = navRef.current;
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (!nav) return;
      const k = e.code.startsWith("Numpad") ? e.code.replace("Numpad", "") : e.key;
      const handled = {
        1: () => nav.snap(e.ctrlKey ? "back" : "front"),
        3: () => nav.snap(e.ctrlKey ? "left" : "right"),
        7: () => nav.snap(e.ctrlKey ? "bottom" : "top"),
        5: () => nav.toggleOrtho(),
        9: () => nav.opposite(),
        4: () => nav.orbit(STEP, 0),
        6: () => nav.orbit(-STEP, 0),
        8: () => nav.orbit(0, STEP),
        2: () => nav.orbit(0, -STEP),
        Decimal: () => nav.frame(),
        ".": () => nav.frame(),
        Home: () => nav.frame(),
        f: () => nav.frame(),
        F: () => nav.frame(),
      }[k];
      if (handled) {
        e.preventDefault();
        handled();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ── Lighting presets ────────────────────────────────────────────
  const applyLightingPreset = useCallback((preset) => {
    setLightingPreset(preset);
    const { hemiLight, dirLight1, dirLight2 } = lightsRef.current;
    if (!hemiLight) return;
    if (preset === "cyber") {
      hemiLight.intensity = 0.9;
      hemiLight.diffuse = new Color3(0.08, 0.1, 0.2);
      dirLight1.intensity = 3.0;
      dirLight1.diffuse = new Color3(0, 0.9, 1);
      dirLight2.intensity = 3.2;
      dirLight2.diffuse = new Color3(0.68, 0.18, 1);
    } else if (preset === "warm") {
      hemiLight.intensity = 1.1;
      hemiLight.diffuse = new Color3(0.2, 0.15, 0.1);
      dirLight1.intensity = 3.2;
      dirLight1.diffuse = new Color3(1, 0.65, 0.15);
      dirLight2.intensity = 2.2;
      dirLight2.diffuse = new Color3(0.9, 0.35, 0.1);
    } else {
      hemiLight.intensity = 1.35;
      hemiLight.diffuse = new Color3(1, 1, 1);
      dirLight1.intensity = 2.4;
      dirLight1.diffuse = new Color3(1, 1, 1);
      dirLight2.intensity = 2.2;
      dirLight2.diffuse = new Color3(0.53, 0.37, 1);
    }
  }, []);

  // ── Shading: Wireframe / Solid / Rendered (Blender viewport modes) ──
  const applyShadingMode = useCallback(
    (mode) => {
      setShadingMode(mode);
      const scene = sceneRef.current;
      const store = materialsRef.current;
      if (!scene) return;

      if (!store.solid) {
        const solid = new StandardMaterial("blenderSolid", scene);
        solid.diffuseColor = new Color3(0.8, 0.8, 0.8);
        solid.specularColor = new Color3(0.15, 0.15, 0.15);
        store.solid = solid;
      }
      if (!store.wire) {
        const wire = new StandardMaterial("blenderWire", scene);
        wire.disableLighting = true;
        wire.emissiveColor = new Color3(0.85, 0.86, 0.9);
        wire.wireframe = true;
        store.wire = wire;
      }

      store.originals.forEach((original, mesh) => {
        if (mode === "solid") mesh.material = store.solid;
        else if (mode === "wireframe") mesh.material = store.wire;
        else mesh.material = original;
      });
      if (mode === "rendered") applyLightingPreset(lightingPreset);
    },
    [applyLightingPreset, lightingPreset]
  );

  // ── HUD drag buttons (Blender's zoom / pan handles) ─────────────
  const startHudDrag = (e, kind) => {
    e.preventDefault();
    let lx = e.clientX;
    let ly = e.clientY;
    let moved = false;
    const startTarget = e.target;
    const move = (ev) => {
      const dx = ev.clientX - lx;
      const dy = ev.clientY - ly;
      lx = ev.clientX;
      ly = ev.clientY;
      if (Math.abs(dx) + Math.abs(dy) > 0) moved = true;
      const nav = navRef.current;
      if (!nav) return;
      if (kind === "zoom") nav.zoom(Math.exp(dy * 0.01));
      else if (kind === "pan") nav.pan(dx, dy);
      else if (kind === "orbit") nav.orbit(-dx * ORBIT_SPEED, -dy * ORBIT_SPEED);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      // A click (no drag) on a gizmo ball snaps to that axis view
      if (kind === "orbit" && !moved) {
        const view = startTarget?.closest?.("[data-view]")?.getAttribute("data-view");
        if (view) navRef.current?.snap(view);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const viewLabel = `${viewKind} ${isOrtho ? "Orthographic" : "Perspective"}`;

  return (
    <div
      ref={containerRef}
      style={{ touchAction: "none", overscrollBehavior: "none" }}
      className={`relative w-full h-full bg-[#191A1E] text-white select-none overflow-hidden ${className}`}
    >
      {/* ── Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full outline-none block cursor-grab"
      />

      {/* ── Header bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 bg-[#202126]/95 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-[#4100F5]/20 border border-[#885FFF]/30 flex items-center justify-center text-[#885FFF]">
            <Box className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="font-heading font-bold text-sm text-white truncate">{modelName}</h2>
            <span className="text-[10px] font-mono tracking-wider uppercase text-white/45 block truncate">
              {category} / {polyCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View snaps */}
          <div className="hidden lg:flex items-center bg-black/30 p-0.5 rounded-lg border border-white/[0.07]">
            {[
              ["front", "Front", "1"],
              ["right", "Right", "3"],
              ["top", "Top", "7"],
            ].map(([v, label, key]) => (
              <button
                key={v}
                onClick={() => navRef.current?.snap(v)}
                title={`${label} view (Numpad ${key})`}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono text-white/65 hover:text-white hover:bg-white/10 transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navRef.current?.toggleOrtho()}
              title="Toggle Perspective / Orthographic (Numpad 5)"
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                isOrtho ? "bg-[#4100F5] text-white" : "text-white/65 hover:text-white hover:bg-white/10"
              }`}
            >
              {isOrtho ? "Ortho" : "Persp"}
            </button>
          </div>

          {/* Shading */}
          <div className="flex items-center bg-black/30 p-0.5 rounded-lg border border-white/[0.07]">
            {[
              ["wireframe", "Wire"],
              ["solid", "Solid"],
              ["rendered", "Render"],
            ].map(([m, label]) => (
              <button
                key={m}
                onClick={() => applyShadingMode(m)}
                title={`${label} shading`}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                  shadingMode === m ? "bg-white/15 text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Lighting */}
          <div className="hidden sm:flex items-center bg-black/30 p-0.5 rounded-lg border border-white/[0.07]">
            {[
              ["studio", Sun, "Studio lighting"],
              ["cyber", Zap, "Neon lighting"],
              ["warm", Flame, "Warm lighting"],
            ].map(([p, Icon, title]) => (
              <button
                key={p}
                onClick={() => {
                  applyLightingPreset(p);
                  if (shadingMode !== "rendered") applyShadingMode("rendered");
                }}
                title={title}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingPreset === p ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {specs && specs.length > 0 && (
            <button
              onClick={() => setShowSpecs((s) => !s)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-heading font-semibold transition-colors ${
                showSpecs
                  ? "bg-[#4100F5] border-[#885FFF] text-white"
                  : "bg-black/30 border-white/[0.07] text-white/70 hover:text-white"
              }`}
            >
              Specs
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              title="Exit viewport (Esc)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-red-500/25 text-white/80 hover:text-white border border-white/10 hover:border-red-500/40 text-xs font-heading font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Blender view label (top-left overlay) ── */}
      <div className="absolute top-[68px] left-4 sm:left-5 z-10 pointer-events-none font-mono leading-snug">
        <div className="text-[12px] text-white/85">{viewLabel}</div>
        <div className="text-[11px] text-white/45">(1) Scene | {modelName}</div>
      </div>

      {/* ── Navigation gizmo + nav buttons (top-right, Blender layout) ── */}
      <div className="absolute top-[64px] right-3 sm:right-4 z-20 flex flex-col items-center gap-2">
        <div
          onPointerDown={(e) => startHudDrag(e, "orbit")}
          title="Drag to orbit, click an axis to align view"
          className="w-[84px] h-[84px] rounded-full hover:bg-white/[0.07] transition-colors cursor-pointer"
        >
          <svg ref={gizmoSvgRef} viewBox="-42 -42 84 84" className="w-full h-full overflow-visible">
            {GIZMO_AXES.map((a) => (
              <g
                key={a.key}
                data-view={a.view}
                ref={(el) => {
                  gizmoRefs.current[a.key] = { ...(gizmoRefs.current[a.key] || {}), g: el };
                }}
              >
                {a.positive && (
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="0"
                    stroke={a.color}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    ref={(el) => {
                      gizmoRefs.current[a.key] = { ...(gizmoRefs.current[a.key] || {}), line: el };
                    }}
                  />
                )}
                <circle
                  r={a.positive ? 7.5 : 6.5}
                  fill={a.positive ? a.color : `${a.color}40`}
                  stroke={a.positive ? "none" : a.color}
                  strokeWidth={a.positive ? 0 : 1.4}
                  ref={(el) => {
                    gizmoRefs.current[a.key] = { ...(gizmoRefs.current[a.key] || {}), circle: el };
                  }}
                />
                {a.positive && (
                  <text
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="ui-monospace, monospace"
                    fill="#111"
                    pointerEvents="none"
                    ref={(el) => {
                      gizmoRefs.current[a.key] = { ...(gizmoRefs.current[a.key] || {}), text: el };
                    }}
                  >
                    {a.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="flex flex-col gap-1.5">
          <button
            onPointerDown={(e) => startHudDrag(e, "zoom")}
            title="Drag to zoom"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-white/15 border border-white/10 text-white/75 hover:text-white flex items-center justify-center transition-colors cursor-ns-resize"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onPointerDown={(e) => startHudDrag(e, "pan")}
            title="Drag to pan"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-white/15 border border-white/10 text-white/75 hover:text-white flex items-center justify-center transition-colors cursor-move"
          >
            <Hand className="w-4 h-4" />
          </button>
          <button
            onClick={() => navRef.current?.toggleOrtho()}
            title="Toggle Perspective / Orthographic (Numpad 5)"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
              isOrtho
                ? "bg-[#4100F5] border-[#885FFF] text-white"
                : "bg-black/40 hover:bg-white/15 border-white/10 text-white/75 hover:text-white"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => navRef.current?.frame()}
            title="Frame model (Numpad . / Home)"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-white/15 border border-white/10 text-white/75 hover:text-white flex items-center justify-center transition-colors"
          >
            <Focus className="w-4 h-4" />
          </button>
          <button
            onClick={() => navRef.current?.reset()}
            title="Reset view"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-white/15 border border-white/10 text-white/75 hover:text-white flex items-center justify-center transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Controls hint ── */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-start pointer-events-none">
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/[0.07] text-[10.5px] font-mono text-white/60">
          <span><b className="text-white/85 font-semibold">MMB</b> Orbit</span>
          <span className="text-white/20">|</span>
          <span><b className="text-white/85 font-semibold">Shift+MMB</b> Pan</span>
          <span className="text-white/20">|</span>
          <span><b className="text-white/85 font-semibold">Wheel / Ctrl+MMB</b> Zoom</span>
          <span className="text-white/20">|</span>
          <span><b className="text-white/85 font-semibold">1 3 7</b> Views</span>
          <span className="text-white/20">|</span>
          <span><b className="text-white/85 font-semibold">5</b> Persp/Ortho</span>
          <span className="text-white/20">|</span>
          <span><b className="text-white/85 font-semibold">.</b> Frame</span>
          <span className="text-white/20 hidden xl:inline">|</span>
          <span className="hidden xl:inline">LMB / RMB also orbit / pan</span>
        </div>
      </div>

      {/* ── Loader ── */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#191A1E]/95 backdrop-blur-md">
          <div className="flex flex-col items-center max-w-xs w-full px-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#4100F5]/20 border border-[#885FFF]/30 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin text-[#885FFF]" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#885FFF] block">
                {category}
              </span>
              <h4 className="text-base font-heading font-bold text-white">{modelName}</h4>
            </div>
            <div className="w-full space-y-2 pt-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4100F5] to-[#885FFF] rounded-full transition-all duration-200"
                  style={{ width: `${Math.max(loadProgress, 10)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>LOADING VIEWPORT</span>
                <span>{loadProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {loadError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-black/90">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400">
            <Box className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-lg font-bold text-white mb-2">Failed to load 3D asset</h4>
          <p className="text-xs text-white/60 max-w-sm mb-4">{loadError}</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Specs drawer ── */}
      {showSpecs && (
        <div className="absolute top-[64px] right-[72px] bottom-14 w-80 max-w-[calc(100vw-6rem)] z-30 backdrop-blur-2xl bg-[#17181C]/95 rounded-2xl border border-white/10 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#885FFF] block">
                  Geometry and shader specs
                </span>
                <h4 className="font-heading font-bold text-sm text-white">{modelName}</h4>
              </div>
              <button
                onClick={() => setShowSpecs(false)}
                className="text-white/50 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                Close
              </button>
            </div>
            {description && <p className="text-xs text-white/70 leading-relaxed">{description}</p>}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50 font-mono text-[11px]">Poly Count</span>
                <span className="text-white font-mono text-[11px]">{polyCount}</span>
              </div>
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-white/50 font-mono text-[11px]">{spec.label}</span>
                  <span className="text-white font-mono text-[11px] text-right truncate max-w-[150px]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded bg-white/[0.08] border border-white/10 text-[10px] font-mono text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-white/10">
            <a
              href="/#contact"
              onClick={() => onClose?.()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4100F5] to-[#885FFF] text-white font-heading font-semibold text-xs"
            >
              <span>Inquire for a similar 3D asset</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Babylon3DViewer;
