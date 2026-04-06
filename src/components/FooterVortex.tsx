import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Distorted Iridescent Sphere ── */
const IridescentSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15 + pointer.y * 0.3;
    meshRef.current.rotation.y = t * 0.2 + pointer.x * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#4488ff"
          emissive="#220044"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.95}
          distort={0.35}
          speed={2.5}
          envMapIntensity={1.8}
        />
      </mesh>
    </Float>
  );
};

/* ── Orbiting particles ── */
const OrbitParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const { positions, speeds, radii, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      radii[i] = 2 + Math.random() * 2.5;
      speeds[i] = 0.1 + Math.random() * 0.4;
      offsets[i] = Math.random() * Math.PI * 2;
      const a = offsets[i];
      positions[i * 3] = Math.cos(a) * radii[i];
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = Math.sin(a) * radii[i];
    }
    return { positions, speeds, radii, offsets };
  }, []);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const a = offsets[i] + t * speeds[i];
      pos[i * 3] = Math.cos(a) * radii[i];
      pos[i * 3 + 2] = Math.sin(a) * radii[i];
      pos[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        map={texture}
        color="#88bbff"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Glowing rings ── */
const GlowRing = ({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) => {
  const ref = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  const material = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.12 }), [color]);
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed;
  });

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <primitive object={line} />
    </group>
  );
};

/* ── Main ── */
const FooterVortex = () => (
  <div className="relative h-[360px] w-full max-w-[380px]">
    <div
      className="absolute inset-0 rounded-full opacity-40"
      style={{
        background: "radial-gradient(circle, hsl(220 80% 60% / 0.25), hsl(280 60% 50% / 0.1), transparent 70%)",
        filter: "blur(50px)",
      }}
    />
    <Canvas camera={{ position: [0, 0.5, 5], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#6644ff" />
      <pointLight position={[3, -1, 2]} intensity={0.4} color="#ff4488" />

      <IridescentSphere />
      <OrbitParticles />

      <GlowRing radius={2.2} tilt={Math.PI / 5} speed={0.08} color="#6699ff" />
      <GlowRing radius={2.8} tilt={Math.PI / 2.8} speed={-0.06} color="#9966ff" />

      <Environment preset="night" />
    </Canvas>
  </div>
);

export default FooterVortex;
