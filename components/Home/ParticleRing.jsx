"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "@/utils/utils";
import Link from "next/link";

const ParticleRing = () => {
  return (
    <div className="relative ">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "180px" }}
        className="bg-slate-900"
      >
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>

      {/* Centered clickable text */}
      <Link
        href="/contact"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-slate-200 font-medium text-2xl md:text-4xl cursor-pointer hover:text-blue-400 transition-colors">
          Contact Us
        </h1>
      </Link>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive="#0B8AE5"
        emissiveIntensity={0.5}
        roughness={0.5}
        color="#0B8AE5"
      />
    </Sphere>
  );
};

export default ParticleRing;
