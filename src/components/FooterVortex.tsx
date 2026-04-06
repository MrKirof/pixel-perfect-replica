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

/* ── Meteors flying inside sphere, fade at edges ── */
const METEOR_COUNT = 4;

interface MeteorCfg {
  angle: number;    // entry angle on the sphere edge
  yEntry: number;   // y offset at entry
  speed: number;    // how fast it crosses
  delay: number;    // stagger
  scale: number;
  rotSpeed: number;
  seed: number;
}

const meteorConfigs: MeteorCfg[] = Array.from({ length: METEOR_COUNT }, (_, i) => ({
  angle: (i / METEOR_COUNT) * Math.PI * 2 + i * 0.3,
  yEntry: (Math.random() - 0.5) * 1.0,
  speed: 0.4 + Math.random() * 0.3,
  delay: i * 1.8 + Math.random() * 1,
  scale: 0.025 + Math.random() * 0.025,
  rotSpeed: 2 + Math.random() * 4,
  seed: i * 137 + 7,
}));

const createRockGeometry = (seed: number) => {
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const rng = Math.sin(seed * 9301 + i * 4973) * 49297;
    const factor = 0.65 + (rng - Math.floor(rng)) * 0.7;
    pos.setXYZ(i, pos.getX(i) * factor, pos.getY(i) * factor, pos.getZ(i) * factor);
  }
  geo.computeVertexNormals();
  return geo;
};

const Meteor = ({ cfg }: { cfg: MeteorCfg }) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const geo = useMemo(() => createRockGeometry(cfg.seed), [cfg.seed]);

  // Trail stored positions
  const TRAIL = 40;
  const trailPos = useMemo(() => new Float32Array(TRAIL * 3), []);
  const trailSizes = useMemo(() => {
    const s = new Float32Array(TRAIL);
    for (let i = 0; i < TRAIL; i++) s[i] = 1 - i / TRAIL;
    return s;
  }, []);
  const prevPos = useRef(new THREE.Vector3(999, 999, 999));

  const trailTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32; c.height = 32;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,220,150,1)");
    g.addColorStop(0.25, "rgba(255,160,60,0.7)");
    g.addColorStop(0.6, "rgba(255,80,20,0.3)");
    g.addColorStop(1, "rgba(255,40,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(c);
  }, []);

  // Sphere interior radius — meteors travel within this
  const R = 1.25;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // progress 0→1 loop
    const cycleDuration = 3.5 / cfg.speed;
    const progress = ((t + cfg.delay) % cycleDuration) / cycleDuration;

    // Travel from one edge to opposite edge through interior
    const entryAngle = cfg.angle;
    const exitAngle = entryAngle + Math.PI; // opposite side

    const startX = Math.cos(entryAngle) * R;
    const startZ = Math.sin(entryAngle) * R * 0.6;
    const endX = Math.cos(exitAngle) * R;
    const endZ = Math.sin(exitAngle) * R * 0.6;
    const startY = cfg.yEntry * 0.8;
    const endY = -cfg.yEntry * 0.8;

    const x = THREE.MathUtils.lerp(startX, endX, progress);
    const y = THREE.MathUtils.lerp(startY, endY, progress);
    const z = THREE.MathUtils.lerp(startZ, endZ, progress);

    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.x = t * cfg.rotSpeed * 0.5;
    groupRef.current.rotation.y = t * cfg.rotSpeed;
    groupRef.current.rotation.z = t * cfg.rotSpeed * 0.3;

    // Fade in at start, fade out at end
    const fade = progress < 0.15
      ? progress / 0.15
      : progress > 0.85
      ? (1 - progress) / 0.15
      : 1;

    groupRef.current.scale.setScalar(fade);

    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.25;
    }

    // Trail update
    if (trailRef.current) {
      const pos = trailRef.current.geometry.attributes.position.array as Float32Array;

      // Only shift if meteor moved enough
      const curr = groupRef.current.position;
      if (curr.distanceTo(prevPos.current) > 0.01 || progress < 0.02) {
        for (let i = TRAIL - 1; i > 0; i--) {
          pos[i * 3] = pos[(i - 1) * 3];
          pos[i * 3 + 1] = pos[(i - 1) * 3 + 1];
          pos[i * 3 + 2] = pos[(i - 1) * 3 + 2];
        }
        prevPos.current.copy(curr);
      }

      // Reset trail on loop restart
      if (progress < 0.02) {
        for (let i = 0; i < TRAIL; i++) {
          pos[i * 3] = x;
          pos[i * 3 + 1] = y;
          pos[i * 3 + 2] = z;
        }
      }

      pos[0] = x;
      pos[1] = y;
      pos[2] = z;
      trailRef.current.geometry.attributes.position.needsUpdate = true;

      (trailRef.current.material as THREE.PointsMaterial).opacity = fade * 0.7;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh geometry={geo} scale={cfg.scale}>
          <meshStandardMaterial
            color="#cccccc"
            roughness={0.7}
            metalness={0.4}
            emissive="#ff5500"
            emissiveIntensity={0.6}
            envMapIntensity={0.6}
          />
        </mesh>
        {/* Hot glow */}
        <mesh ref={glowRef} scale={cfg.scale * 4}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#ff7722" transparent opacity={0.25} depthWrite={false} />
        </mesh>
      </group>

      {/* Fire trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={trailPos} count={TRAIL} itemSize={3} />
          <bufferAttribute attach="attributes-size" array={trailSizes} count={TRAIL} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          map={trailTex}
          color="#ff8833"
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </>
  );
};

const MeteorShower = () => (
  <group>
    {meteorConfigs.map((cfg, i) => (
      <Meteor key={i} cfg={cfg} />
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
      <MeteorShower />
      <OrbitParticles />

      <Environment preset="night" />
    </Canvas>
  </div>
);

export default FooterVortex;
