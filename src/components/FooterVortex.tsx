import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Accretion Disk ── */
const AccretionDisk = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 4000;

  const { positions, colors, speeds, radii, offsets, baseY } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);
    const offsets = new Float32Array(count);
    const baseY = new Float32Array(count);

    const cHot = new THREE.Color("#ffaa44");
    const cMid = new THREE.Color("#ff6622");
    const cCool = new THREE.Color("#cc2200");
    const cOuter = new THREE.Color("#441100");

    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.pow(Math.random(), 0.6) * 3.5;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (0.04 + (r - 1.2) * 0.06);

      radii[i] = r;
      offsets[i] = a;
      speeds[i] = (1.5 / Math.sqrt(r)) * (0.8 + Math.random() * 0.4);
      baseY[i] = y;

      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(a) * r;

      const t = Math.min((r - 1.2) / 3.5, 1);
      const c = t < 0.3
        ? cHot.clone().lerp(cMid, t / 0.3)
        : t < 0.6
        ? cMid.clone().lerp(cCool, (t - 0.3) / 0.3)
        : cCool.clone().lerp(cOuter, (t - 0.6) / 0.4);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, speeds, radii, offsets, baseY };
  }, []);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 32; c.height = 32;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.6)");
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
      pos[i * 3 + 1] = baseY[i] + Math.sin(t * 2 + i * 0.1) * 0.015;
      pos[i * 3 + 2] = Math.sin(a) * radii[i];
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={texture}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Event Horizon (black sphere with distortion ring) ── */
const EventHorizon = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* Black hole core */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon ring glow */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.03, 32, 128]} />
        <meshBasicMaterial color="#ffaa33" transparent opacity={0.8} />
      </mesh>

      {/* Outer photon ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.015, 16, 128]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

/* ── Gravitational Lensing Ring ── */
const LensingGlow = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(t * 0.8) * 0.05;
      ref.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.3, 64, 64]} />
      <meshBasicMaterial color="#ff8833" transparent opacity={0.12} depthWrite={false} side={THREE.BackSide} />
    </mesh>
  );
};

/* ── Jets (top & bottom particle streams) ── */
const Jet = ({ direction }: { direction: 1 | -1 }) => {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const spread = Math.random() * 0.15;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * spread;
      positions[i * 3 + 1] = direction * (0.5 + Math.random() * 4);
      positions[i * 3 + 2] = Math.sin(a) * spread;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }
    return { positions, speeds };
  }, [direction]);

  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 16; c.height = 16;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += direction * speeds[i] * 0.02;
      // Reset if too far
      if (Math.abs(pos[i * 3 + 1]) > 5) {
        pos[i * 3 + 1] = direction * 0.5;
        const a = Math.random() * Math.PI * 2;
        const spread = Math.random() * 0.1;
        pos[i * 3] = Math.cos(a) * spread;
        pos[i * 3 + 2] = Math.sin(a) * spread;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        map={texture}
        color="#8899ff"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Background Stars ── */
const Stars = () => {
  const count = 500;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = -5 - Math.random() * 20;
    }
    return p;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* ── Scene Rotation ── */
const SceneRotator = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, Math.PI * 0.15 + pointer.y * 0.15, 0.03);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.3, 0.03);
  });
  return <group ref={ref} rotation={[Math.PI * 0.15, 0, 0]}>{children}</group>;
};

/* ── Main ── */
const FooterVortex = () => (
  <div className="relative h-[360px] w-full max-w-[380px]">
    <div
      className="absolute inset-0 opacity-50"
      style={{
        background: "radial-gradient(circle, hsl(20 90% 40% / 0.2), hsl(30 80% 30% / 0.1), transparent 70%)",
        filter: "blur(50px)",
      }}
    />
    <Canvas camera={{ position: [0, 1.5, 6], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <SceneRotator>
        <EventHorizon />
        <LensingGlow />
        <AccretionDisk />
        <Jet direction={1} />
        <Jet direction={-1} />
      </SceneRotator>
      <Stars />
    </Canvas>
  </div>
);

export default FooterVortex;
