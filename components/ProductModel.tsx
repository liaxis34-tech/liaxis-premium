"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProductModelProps {
  scale?: number;
  floatIntensity?: number;
}

export default function ProductModel({ scale = 1, floatIntensity = 0.12 }: ProductModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/product.glb");

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "envMapIntensity" in mat) {
          mat.envMapIntensity = 1.15;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.8) * floatIntensity;
    group.current.rotation.z = Math.sin(t * 0.55) * 0.012;
  });

  return (
    <group ref={group} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/product.glb");
