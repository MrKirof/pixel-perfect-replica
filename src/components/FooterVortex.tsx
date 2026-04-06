import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;
const TRAIL_COUNT = 800;

/* ── Spiral Galaxy Particles ── */
const GalaxyParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const handlePointerMove = useCallback(
    (e: { point: THREE.Vector3 }) => {
      mouseRef.current.x = e.point.x / (viewport.width / 2);
      mouseRef.current.y = e.point.y / (viewport.height / 2);
    },
    [viewport]
  );

  const { positions, colors, sizes, basePositions, speeds, arms } =
    useMemo(() => {
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const basePositions = new Float32Array(PARTICLE_COUNT * 3);
      const speeds = new Float32Array(PARTICLE_COUNT);
      const arms = new Float32Array(PARTICLE_COUNT);

      const colorInner = new THREE.Color("hsl(200, 80%, 65%)");
      const colorMid = new THREE.Color("hsl(260, 70%, 60%)");
      const colorOuter = new THREE.Color("hsl(320, 60%, 55%)");

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 4 + 0.3;
        const armIndex = Math.floor(Math.random() * 3);
        const armAngle = (armIndex / 3) * Math.PI * 2;
        const spinAngle = radius * 1.2;
        const angle = armAngle + spinAngle;

        // Scatter from arm
        const scatter = (Math.random() - 0.5) * (0.3 + radius * 0.15);
        const scatterY = (Math.random() - 0.5) * (0.2 + radius * 0.05);

        const x = Math.cos(angle) * radius + scatter;
        const y = scatterY;
        const z = Math.sin(angle) * radius + scatter;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
        basePositions[i3] = x;
        basePositions[i3 + 1] = y;
        basePositions[i3 + 2] = z;

        speeds[i] = 0.2 + Math.random() * 0.8;
        arms[i] = armIndex;

        // Color based on distance from center
        const t = Math.min(radius / 4, 1);
        const color =
          t < 0.5
            ? colorInner.clone().lerp(colorMid, t * 2)
            : colorMid.clone().lerp(colorOuter, (t - 0.5) * 2);

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
      }

      return { positions, colors, sizes, basePositions, speeds, arms };
    }, []);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const time = clock.getElapsedTime();
    const pos = pts.geometry.attributes.position.array as Float32Array;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];
      const speed = speeds[i];

      // Rotate around Y axis
      const angle = time * speed * 0.15;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const rx = bx * cos - bz * sin;
      const rz = bx * sin + bz * cos;

      // Breathing effect
      const breathe = 1 + Math.sin(time * 0.5 + i * 0.01) * 0.08;

      // Mouse influence
      const mouseInfluence = 0.3;
      pos[i3] = rx * breathe + mx * mouseInfluence * (1 - Math.abs(by));
      pos[i3 + 1] =
        by * breathe +
        Math.sin(time * 0.8 + i * 0.005) * 0.1 +
        my * mouseInfluence * 0.5;
      pos[i3 + 2] = rz * breathe;
    }

    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = time * 0.02;
  });

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <>
      {/* Invisible plane to capture mouse */}
      <mesh visible={false} onPointerMove={handlePointerMove}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={sizes}
            count={PARTICLE_COUNT}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          map={texture}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </>
  );
};

/* ── Glowing Core ── */
const GlowCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.1);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.8 + Math.sin(t * 0.8) * 0.3);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 1.2) * 0.05;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#88ccff" transparent opacity={0.9} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#6699ff"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

/* ── Orbital Rings ── */
const OrbitalRing = ({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(128);
    return new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
  }, [radius]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
};

/* ── Orbiting Light Dots ── */
const OrbitDot = ({
  radius,
  speed,
  tilt,
  color,
  size,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  size: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (ref.current) {
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = Math.sin(t) * radius * Math.sin(tilt);
      ref.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
};

/* ── Main Component ── */
const FooterVortex = () => {
  return (
    <div className="relative h-[360px] w-full max-w-[380px]">
      {/* Ambient CSS glow behind canvas */}
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(220 80% 60% / 0.3), hsl(280 60% 50% / 0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "auto" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />

        <GalaxyParticles />
        <GlowCore />

        {/* Orbital rings */}
        <OrbitalRing radius={1.8} tilt={Math.PI / 6} speed={0.1} color="#66aaff" />
        <OrbitalRing radius={2.5} tilt={Math.PI / 3} speed={-0.07} color="#aa66ff" />
        <OrbitalRing radius={3.2} tilt={Math.PI / 4.5} speed={0.05} color="#ff66aa" />

        {/* Orbiting dots */}
        <OrbitDot radius={1.8} speed={0.4} tilt={Math.PI / 6} color="#88ddff" size={0.04} />
        <OrbitDot radius={2.5} speed={-0.3} tilt={Math.PI / 3} color="#cc88ff" size={0.035} />
        <OrbitDot radius={3.2} speed={0.2} tilt={Math.PI / 4.5} color="#ff88cc" size={0.03} />
      </Canvas>

      {/* Brand mark overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="font-display text-sm font-bold tracking-[0.3em] uppercase"
          style={{
            color: "hsl(var(--accent) / 0.6)",
            textShadow: "0 0 20px hsl(var(--accent) / 0.3)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        >
          MK
        </span>
      </div>
    </div>
  );
};

export default FooterVortex;
