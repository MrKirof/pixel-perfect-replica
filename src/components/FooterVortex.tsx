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

/* ── Single Meteor with glowing trail ── */
const TRAIL_LENGTH = 80;

interface MeteorProps {
  startAngle: number;
  yStart: number;
  speed: number;
  delay: number;
  size: number;
}

const Meteor = ({ startAngle, yStart, speed, delay, size }: MeteorProps) => {
  const headRef = useRef<THREE.Group>(null);
  const trailMeshRef = useRef<THREE.Mesh>(null);
  const posHistory = useRef<THREE.Vector3[]>([]);

  // Create trail geometry (tube that follows meteor path)
  const trailGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Two triangles per segment forming a ribbon
    const verts = new Float32Array(TRAIL_LENGTH * 6); // 2 verts per point, xyz
    const uvs = new Float32Array(TRAIL_LENGTH * 4);
    const indices: number[] = [];

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      uvs[i * 4] = i / TRAIL_LENGTH;
      uvs[i * 4 + 1] = 0;
      uvs[i * 4 + 2] = i / TRAIL_LENGTH;
      uvs[i * 4 + 3] = 1;
    }

    for (let i = 0; i < TRAIL_LENGTH - 1; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    return geo;
  }, []);

  const trailMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {},
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float alpha = (1.0 - vUv.x) * 0.9;
          alpha *= smoothstep(0.0, 0.1, 1.0 - abs(vUv.y - 0.5) * 2.0);
          vec3 hot = vec3(1.0, 0.95, 0.8);
          vec3 warm = vec3(1.0, 0.5, 0.1);
          vec3 cool = vec3(0.8, 0.2, 0.05);
          vec3 col = mix(hot, warm, vUv.x * 2.0);
          col = mix(col, cool, max(vUv.x - 0.5, 0.0) * 2.0);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cycleDuration = 5.0 / speed;
    const progress = ((t + delay) % cycleDuration) / cycleDuration;

    // Meteor path: diagonal across the sphere face
    const x = THREE.MathUtils.lerp(1.8, -1.8, progress);
    const y = THREE.MathUtils.lerp(yStart + 0.8, yStart - 0.8, progress);
    const z = 1.6 + Math.sin(startAngle) * 0.3; // always in front

    // Fade in/out at edges
    const fade = progress < 0.1
      ? progress / 0.1
      : progress > 0.9
      ? (1.0 - progress) / 0.1
      : 1.0;

    if (headRef.current) {
      headRef.current.position.set(x, y, z);
      headRef.current.scale.setScalar(fade);
      headRef.current.rotation.x = t * 3;
      headRef.current.rotation.y = t * 5;
    }

    // Store position history
    posHistory.current.unshift(new THREE.Vector3(x, y, z));
    if (posHistory.current.length > TRAIL_LENGTH) {
      posHistory.current.length = TRAIL_LENGTH;
    }

    // Reset trail on loop
    if (progress < 0.02) {
      posHistory.current = [new THREE.Vector3(x, y, z)];
    }

    // Update trail ribbon geometry
    if (trailMeshRef.current && posHistory.current.length > 1) {
      const positions = trailGeo.attributes.position.array as Float32Array;
      const hist = posHistory.current;
      const ribbonWidth = size * 1.5;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const p = i < hist.length ? hist[i] : hist[hist.length - 1];
        const next = i + 1 < hist.length ? hist[i + 1] : p;
        
        // Direction perpendicular to trail path (facing camera = z-axis)
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const taper = 1 - (i / TRAIL_LENGTH);
        const w = ribbonWidth * taper * fade;

        positions[i * 6] = p.x + nx * w;
        positions[i * 6 + 1] = p.y + ny * w;
        positions[i * 6 + 2] = p.z;
        positions[i * 6 + 3] = p.x - nx * w;
        positions[i * 6 + 4] = p.y - ny * w;
        positions[i * 6 + 5] = p.z;
      }

      trailGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Meteor head */}
      <group ref={headRef}>
        {/* Bright core */}
        <mesh scale={size * 0.8}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Inner glow */}
        <mesh scale={size * 2}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#ffcc66" transparent opacity={0.5} depthWrite={false} />
        </mesh>
        {/* Outer haze */}
        <mesh scale={size * 4}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      </group>

      {/* Trail ribbon */}
      <mesh ref={trailMeshRef} geometry={trailGeo} material={trailMat} />
    </>
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

      {/* Meteors streaking across the sphere */}
      <Meteor startAngle={0.3} yStart={0.5} speed={0.5} delay={0} size={0.07} />
      <Meteor startAngle={1.2} yStart={-0.2} speed={0.4} delay={2.5} size={0.05} />
      <Meteor startAngle={2.5} yStart={0.1} speed={0.6} delay={5} size={0.06} />
      <Meteor startAngle={0.8} yStart={-0.4} speed={0.35} delay={8} size={0.04} />

      <Environment preset="night" />
    </Canvas>
  </div>
);

export default FooterVortex;
