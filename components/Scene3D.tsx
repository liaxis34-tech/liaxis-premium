"use client";

import { MutableRefObject, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
  Bounds,
  Center,
  Html,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import ProductModel from "./ProductModel";

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-gold/25 border-t-gold" />
        <span className="whitespace-nowrap text-[10px] uppercase tracking-widest2 text-ink/50">
          Yükleniyor
        </span>
      </div>
    </Html>
  );
}

interface Scene3DProps {
  autoRotate: boolean;
  controlsRef: MutableRefObject<OrbitControlsImpl | null>;
}

export default function Scene3D({ autoRotate, controlsRef }: Scene3DProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.35, 3.4], fov: 32 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <color attach="background" args={["#F4EFE6"]} />
      <fog attach="fog" args={["#F4EFE6", 6, 12]} />

      <ambientLight intensity={0.55} color="#FFF6E9" />
      <directionalLight
        position={[2.5, 4, 2.5]}
        intensity={1.4}
        color="#FFF3DE"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <spotLight
        position={[-3, 2.5, -2]}
        angle={0.4}
        penumbra={1}
        intensity={0.6}
        color="#D9BE8F"
      />
      <pointLight position={[0, -1.5, 2]} intensity={0.25} color="#B08D57" />

      <Suspense fallback={<ModelLoader />}>
        <Bounds fit clip observe margin={1.4}>
          <Center>
            <ProductModel />
          </Center>
        </Bounds>
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.45}
          scale={6}
          blur={2.6}
          far={2.4}
          color="#1A1712"
        />
        <Environment resolution={256}>
          <Lightformer
            intensity={2.2}
            color="#FFF6E9"
            position={[0, 4, 3]}
            scale={[6, 4, 1]}
            form="rect"
          />
          <Lightformer
            intensity={1.1}
            color="#D9BE8F"
            position={[-4, 1, -3]}
            scale={[4, 3, 1]}
            form="rect"
          />
          <Lightformer
            intensity={0.8}
            color="#F4EFE6"
            position={[4, 0, 2]}
            scale={[3, 3, 1]}
            form="rect"
          />
          <Lightformer
            intensity={0.5}
            color="#B08D57"
            position={[0, -3, -2]}
            scale={[5, 3, 1]}
            form="rect"
          />
        </Environment>
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableZoom
        autoRotate={autoRotate}
        autoRotateSpeed={1.1}
        minDistance={0.6}
        maxDistance={20}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.7}
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
