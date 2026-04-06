import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Distorted Metallic Sphere ── */
const MetallicSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12 + pointer.y * 0.4;
    meshRef.current.rotation.y = t * 0.18 + pointer.x * 0.4;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.4}>
        <icosahedronGeometry args={[1, 128]} />
        <MeshDistortMaterial
          color="#aabbcc"
          emissive="#110022"
          emissiveIntensity={0.15}
          roughness={0.08}
          metalness={1}
          distort={0.3}
          speed={1.8}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  );
};

/* ── Realistic Asteroid ── */
const createAsteroidGeometry = (seed: number) => {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const pos = geo.attributes.position;
  const rng = (n: number) => {
    let x = Math.sin(seed * 9301 + n * 4973) * 49297;
    return x - Math.floor(x);
  };
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    const noise = 0.7 + rng(i) * 0.6;
    v.multiplyScalar(noise);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
};

interface AsteroidData {
  radius: number;
  speed: number;
  offset: number;
  tiltX: number;
  tiltZ: number;
  scale: number;
  rotSpeed: number;
  seed: number;
  yOffset: number;
}

const ASTEROID_COUNT = 8;

const asteroidConfigs: AsteroidData[] = Array.from({ length: ASTEROID_COUNT }, (_, i) => ({
  radius: 2.2 + Math.random() * 1.3,
  speed: 0.15 + Math.random() * 0.25,
  offset: (i / ASTEROID_COUNT) * Math.PI * 2 + Math.random() * 0.5,
  tiltX: (Math.random() - 0.5) * 0.6,
  tiltZ: (Math.random() - 0.5) * 0.4,
  scale: 0.06 + Math.random() * 0.1,
  rotSpeed: 0.5 + Math.random() * 2,
  seed: i * 137 + 42,
  yOffset: (Math.random() - 0.5) * 0.8,
}));

const Asteroid = ({ data }: { data: AsteroidData }) => {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => createAsteroidGeometry(data.seed), [data.seed]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const angle = data.offset + t * data.speed;

    ref.current.position.x = Math.cos(angle) * data.radius;
    ref.current.position.z = Math.sin(angle) * data.radius;
    ref.current.position.y = data.yOffset + Math.sin(t * 0.5 + data.offset) * 0.2;

    ref.current.rotation.x = t * data.rotSpeed * 0.7;
    ref.current.rotation.y = t * data.rotSpeed;
    ref.current.rotation.z = t * data.rotSpeed * 0.4;
  });

  return (
    <mesh ref={ref} geometry={geo} scale={data.scale}>
      <meshStandardMaterial
        color="#888888"
        roughness={0.85}
        metalness={0.2}
        envMapIntensity={0.8}
      />
    </mesh>
  );
};

const AsteroidBelt = () => (
  <group rotation={[0.3, 0, 0.15]}>
    {asteroidConfigs.map((data, i) => (
      <Asteroid key={i} data={data} />
    ))}
  </group>
);

/* ── Small debris particles ── */
const OrbitParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, speeds, radii, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      radii[i] = 1.8 + Math.random() * 1.5;
      speeds[i] = 0.08 + Math.random() * 0.3;
      offsets[i] = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(offsets[i]) * radii[i];
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.0;
      positions[i * 3 + 2] = Math.sin(offsets[i]) * radii[i];
    }
    return { positions, speeds, radii, offsets };
  }, []);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32; c.height = 32;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.5)");
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
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        map={texture}
        color="#99bbff"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Main ── */
const FooterVortex = () => (
  <div className="relative h-[320px] w-full max-w-[340px] overflow-hidden">
    <div
      className="absolute inset-0 rounded-full opacity-35"
      style={{
        background: "radial-gradient(circle, hsl(220 70% 55% / 0.25), hsl(270 50% 45% / 0.12), transparent 70%)",
        filter: "blur(45px)",
      }}
    />
    <Canvas camera={{ position: [0, 0.3, 5.5], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-4, 3, -2]} intensity={0.4} color="#6644ff" />
      <pointLight position={[3, -2, 3]} intensity={0.3} color="#ff4488" />
      <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.4} penumbra={1} color="#4488ff" />

      <MetallicSphere />
      <AsteroidBelt />
      <OrbitParticles />

      <Environment preset="night" />
    </Canvas>
  </div>
);

export default FooterVortex;
