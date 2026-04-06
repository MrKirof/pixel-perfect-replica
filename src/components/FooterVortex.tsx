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
          float along = vUv.x; // 0 = head, 1 = tail
          float across = abs(vUv.y - 0.5) * 2.0; // 0 = center, 1 = edge
          
          // Core brightness - bright white-hot center that tapers
          float coreMask = smoothstep(1.0, 0.0, across) * (1.0 - along);
          float edgeSoft = smoothstep(1.0, 0.3, across);
          
          // Fire color gradient: white-hot → yellow → orange → red → dark
          vec3 whiteHot = vec3(1.0, 1.0, 0.95);
          vec3 yellow = vec3(1.0, 0.85, 0.3);
          vec3 orange = vec3(1.0, 0.45, 0.05);
          vec3 red = vec3(0.7, 0.12, 0.02);
          vec3 smoke = vec3(0.15, 0.05, 0.02);
          
          // Along the trail: hot to cool
          vec3 col = mix(whiteHot, yellow, smoothstep(0.0, 0.1, along));
          col = mix(col, orange, smoothstep(0.05, 0.35, along));
          col = mix(col, red, smoothstep(0.3, 0.7, along));
          col = mix(col, smoke, smoothstep(0.6, 1.0, along));
          
          // Across: edges are cooler/darker
          col = mix(col, orange * 0.8, across * 0.5);
          
          // Flickering turbulence
          float flicker = 0.85 + 0.15 * sin(along * 40.0 + across * 10.0);
          
          // Alpha: bright core, soft edges, fading tail
          float alpha = coreMask * edgeSoft * flicker;
          alpha *= smoothstep(1.0, 0.85, along); // fade tail end
          alpha = clamp(alpha, 0.0, 1.0);
          
          gl_FragColor = vec4(col * (1.0 + coreMask * 0.5), alpha);
        }
      `,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cycleDuration = 5.0 / speed;
    const progress = ((t + delay) % cycleDuration) / cycleDuration;

    // Meteor path: diagonal across sphere face, constrained within sphere radius
    const sphereR = 1.35; // visual sphere radius
    const x = THREE.MathUtils.lerp(sphereR, -sphereR, progress);
    const yRange = Math.sqrt(Math.max(0, sphereR * sphereR - x * x)) * 0.6;
    const y = THREE.MathUtils.lerp(yStart * yRange + yRange * 0.3, yStart * yRange - yRange * 0.3, progress);
    const z = 1.55 + Math.sin(startAngle) * 0.15; // always in front

    // Fade in/out at edges of sphere
    const edgeDist = Math.sqrt(x * x + y * y) / sphereR;
    const fade = edgeDist > 0.7
      ? Math.max(0, 1 - (edgeDist - 0.7) / 0.3)
      : progress < 0.05
      ? progress / 0.05
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
      const ribbonWidth = size * 0.5;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const p = i < hist.length ? hist[i] : hist[hist.length - 1];
        const next = i + 1 < hist.length ? hist[i + 1] : p;
        
        const dx = next.x - p.x;
        const dy = next.y - p.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // Clip trail to sphere boundary
        const sphereR = 1.35;
        const ptDist = Math.sqrt(p.x * p.x + p.y * p.y) / sphereR;
        const ptFade = ptDist > 0.65 ? Math.max(0, 1 - (ptDist - 0.65) / 0.35) : 1;

        const taper = 1 - (i / TRAIL_LENGTH);
        const w = ribbonWidth * taper * fade * ptFade;

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
        {/* White-hot core */}
        <mesh scale={size * 0.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#fffef0" />
        </mesh>
        {/* Yellow-hot inner fire */}
        <mesh scale={size * 1.2}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ffdd44" transparent opacity={0.7} depthWrite={false} />
        </mesh>
        {/* Orange corona */}
        <mesh scale={size * 2.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.25} depthWrite={false} />
        </mesh>
        {/* Red outer glow */}
        <mesh scale={size * 4.5}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#cc2200" transparent opacity={0.08} depthWrite={false} />
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
      <Meteor startAngle={0.3} yStart={0.4} speed={0.35} delay={0} size={0.05} />
      <Meteor startAngle={1.2} yStart={-0.3} speed={0.3} delay={4} size={0.04} />
      <Meteor startAngle={2.5} yStart={0.1} speed={0.4} delay={7.5} size={0.035} />
      <Meteor startAngle={0.8} yStart={-0.1} speed={0.25} delay={11} size={0.03} />

      <Environment preset="night" />
    </Canvas>
  </div>
);

export default FooterVortex;
