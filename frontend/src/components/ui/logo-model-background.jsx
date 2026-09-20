import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Center } from "@react-three/drei";
import * as THREE from "three";

function Model({ scale = 4.2 }) {
  const { scene } = useGLTF("/models/logo.glb");
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Continuous auto-rotation on Y axis
      modelRef.current.rotation.y += delta * 0.5;

      // Mouse movement interactive tilt tracking with smooth lerp interpolation
      const targetRotationX = state.pointer.y * 0.45;
      const targetRotationZ = -state.pointer.x * 0.35;

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        0.06
      );
      modelRef.current.rotation.z = THREE.MathUtils.lerp(
        modelRef.current.rotation.z,
        targetRotationZ,
        0.06
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

export function LogoModelBackground({ className = "opacity-75", scale = 4.2 }) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={3} color="#885FFF" />
        <directionalLight position={[-5, -5, -2]} intensity={2.2} color="#4100F5" />
        <pointLight position={[0, 2, 4]} intensity={2.5} color="#ffffff" />
        <Suspense fallback={null}>
          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
            <Model scale={scale} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
