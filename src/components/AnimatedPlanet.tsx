import { useEffect, useRef } from "react";
import * as THREE from "three";


const NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0=floor(P),Pi1=Pi0+vec3(1.0);
  Pi0=mod289(Pi0);Pi1=mod289(Pi1);
  vec3 Pf0=fract(P),Pf1=Pf0-vec3(1.0);
  vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
  vec4 iy=vec4(Pi0.yy,Pi1.yy);
  vec4 iz0=Pi0.zzzz,iz1=Pi1.zzzz;
  vec4 ixy=permute(permute(ix)+iy);
  vec4 ixy0=permute(ixy+iz0),ixy1=permute(ixy+iz1);
  vec4 gx0=ixy0*(1.0/7.0),gy0=fract(floor(gx0)*(1.0/7.0))-0.5;
  gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);
  vec4 sz0=step(gz0,vec4(0.0));
  gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);
  vec4 gx1=ixy1*(1.0/7.0),gy1=fract(floor(gx1)*(1.0/7.0))-0.5;
  gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);
  vec4 sz1=step(gz1,vec4(0.0));
  gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);
  vec3 g000=vec3(gx0.x,gy0.x,gz0.x),g100=vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010=vec3(gx0.z,gy0.z,gz0.z),g110=vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001=vec3(gx1.x,gy1.x,gz1.x),g101=vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011=vec3(gx1.z,gy1.z,gz1.z),g111=vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;
  vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;
  float n000=dot(g000,Pf0),n100=dot(g100,vec3(Pf1.x,Pf0.yz));
  float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)),n110=dot(g110,vec3(Pf1.xy,Pf0.z));
  float n001=dot(g001,vec3(Pf0.xy,Pf1.z)),n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011=dot(g011,vec3(Pf0.x,Pf1.yz)),n111=dot(g111,Pf1);
  vec3 fade_xyz=fade(Pf0);
  vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
  return mix(n_yz.x,n_yz.y,fade_xyz.x);
}
`;

const AnimatedPlanet = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const lightDir = new THREE.Vector3(0.7, 0.5, 0.6).normalize();

    // ── Scene lights for MeshStandardMaterial rocks ──────
    const ambLight = new THREE.AmbientLight(0x444444, 1.5);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight.position.set(0.7, 0.5, 0.6);
    scene.add(dirLight);

    // ── Planet — photorealistic Earth-like ──────────────────
    const planetRadius = 9;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 256, 256);
    const planetMat = new THREE.ShaderMaterial({
      vertexShader: `
        ${NOISE_GLSL}
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vElevation;
        varying vec3 vLocalPos;
        varying vec3 vTangentNormal;
        void main() {
          vec3 pos = position;
          // 6-octave fractal noise for detailed terrain
          float n = cnoise(pos * 0.4 + uTime * 0.004) * 0.45
                  + cnoise(pos * 0.8 + uTime * 0.002) * 0.25
                  + cnoise(pos * 1.6) * 0.15
                  + cnoise(pos * 3.2) * 0.08
                  + cnoise(pos * 6.4) * 0.04
                  + cnoise(pos * 12.8) * 0.02;
          float displacement = n * 0.15;
          vElevation = n;
          vLocalPos = pos;

          // Compute tangent-space normal from noise gradient
          float eps = 0.02;
          float nx = cnoise((pos + vec3(eps,0,0)) * 0.8) - cnoise((pos - vec3(eps,0,0)) * 0.8);
          float ny = cnoise((pos + vec3(0,eps,0)) * 0.8) - cnoise((pos - vec3(0,eps,0)) * 0.8);
          float nz = cnoise((pos + vec3(0,0,eps)) * 0.8) - cnoise((pos - vec3(0,0,eps)) * 0.8);
          vec3 noiseGrad = vec3(nx, ny, nz) / (2.0 * eps);
          vec3 bumpNormal = normalize(normal - noiseGrad * 0.3);
          vTangentNormal = normalize(normalMatrix * bumpNormal);

          pos += normal * displacement;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        ${NOISE_GLSL}
        uniform vec3 uLightDir;
        uniform float uTime;
        uniform float uOpacity;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying float vElevation;
        varying vec3 vLocalPos;
        varying vec3 vTangentNormal;
        void main() {
        float e = vElevation * 0.5 + 0.5;

          // ── Jupiter-style horizontal bands ──
          vec3 normPos = normalize(vLocalPos);
          float lat = normPos.y; // -1 to 1

          // Base band pattern — EXTREME contrast Jupiter stripes
          float band = 0.0;
          band += sin(lat * 14.0) * 0.6;
          band += sin(lat * 28.0 + 1.5) * 0.3;
          band += sin(lat * 56.0 + 3.0) * 0.15;
          band += sin(lat * 9.0 - 0.7) * 0.4;

          // Minimal turbulence to keep bands sharp and readable
          float turb1 = cnoise(vLocalPos * 1.5 + vec3(uTime * 0.006, 0.0, 0.0)) * 0.06;
          band += turb1;

          // Hard step banding — sharp transitions instead of smooth
          float bandNorm = clamp(band * 0.5 + 0.5, 0.0, 1.0);

          // MAXIMUM CONTRAST — stark black vs bright white bands
          float baseLuma;
          // Use step-like functions for hard-edged bands
          float b1 = step(0.15, bandNorm) * (1.0 - step(0.30, bandNorm)); // bright band
          float b2 = step(0.40, bandNorm) * (1.0 - step(0.55, bandNorm)); // bright band
          float b3 = step(0.65, bandNorm) * (1.0 - step(0.80, bandNorm)); // bright band
          float b4 = step(0.88, bandNorm); // bright edge

          float brightMask = max(max(b1, b2), max(b3, b4));
          baseLuma = mix(0.02, 0.55, brightMask); // very dark (0.02) vs very bright (0.55)

          // Add subtle mid-tone variation within bands
          float microDetail = cnoise(vLocalPos * 3.0 + vec3(uTime * 0.004, 0.0, 0.0)) * 0.06;
          baseLuma += microDetail * brightMask;
          baseLuma = max(baseLuma, 0.01);

          // Great Red Spot analog (dark storm oval)
          float spotLat = smoothstep(0.15, 0.22, lat) * (1.0 - smoothstep(0.22, 0.32, lat));
          float spotLon = atan(normPos.z, normPos.x) + uTime * 0.006;
          float spotMask = spotLat * smoothstep(0.3, 0.0, abs(sin(spotLon * 0.5)));
          float stormDetail = cnoise(vLocalPos * 6.0 + vec3(uTime * 0.01, 0.0, 0.0)) * 0.3;
          baseLuma = mix(baseLuma, 0.03 + stormDetail * 0.04, spotMask * 0.8);

          // Polar darkening
          float polarDark = smoothstep(0.7, 1.0, abs(lat));
          baseLuma = mix(baseLuma, 0.01, polarDark * 0.9);

          // Warm Jupiter tint — dark bands get reddish-brown, bright bands get creamy tan
          vec3 darkTint = vec3(0.12, 0.06, 0.03);   // deep brown-red
          vec3 brightTint = vec3(0.55, 0.42, 0.28);  // warm tan/cream
          vec3 baseColor = mix(darkTint, brightTint, brightMask);
          // Add luma variation on top
          baseColor *= (baseLuma / max(mix(0.02, 0.55, brightMask), 0.01));

          // Minimal cloud layer — don't wash out the bands
          float cloudDensity = 0.0;
          float cloudLuma = 0.0;
          float cloudShadow = 1.0;

          vec3 N = normalize(vTangentNormal);
          vec3 L = normalize(uLightDir);
          float NdotL = dot(N, L);

          // Strong directional lighting — bright rim on one side
          float diff = smoothstep(-0.08, 0.35, NdotL);
          float ambient = 0.003;
          float lighting = diff * 0.997 + ambient;

          lighting *= cloudShadow;

          // Specular — subtle surface glint
          vec3 V = normalize(cameraPosition - vWorldPos);
          vec3 H = normalize(L + V);
          float oceanMask = 1.0 - smoothstep(0.40, 0.47, e);
          float specBase = pow(max(dot(N, H), 0.0), 256.0);
          float fresnelSpec = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
          float spec = specBase * fresnelSpec * oceanMask * diff * 0.3;

          // Dramatic Fresnel rim — bright Setrex-style edge light
          float fresnel = pow(1.0 - max(dot(normalize(vNormal), V), 0.0), 2.5);
          float rimLit = smoothstep(-0.15, 0.25, dot(normalize(vNormal), L));
          float rim = fresnel * rimLit * 1.4;
          vec3 rimColor = vec3(1.0, 1.0, 1.0) * rim;

          // Clouds lit independently
          vec3 litClouds = vec3(cloudLuma) * (diff * 0.9 + 0.1);

          vec3 color = baseColor * lighting + vec3(spec) + rimColor + litClouds;

          // Tone mapping
          color = color / (color + vec3(1.0)) * 1.15;

          gl_FragColor = vec4(color, uOpacity);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uLightDir: { value: lightDir.clone() },
        uOpacity: { value: 0 },
      },
      transparent: true,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(0, 12, -8);
    scene.add(planet);

    // ── Atmosphere shell — separate translucent sphere ──────
    const atmosGeo = new THREE.SphereGeometry(planetRadius * 1.025, 128, 128);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uLightDir;
        uniform float uOpacity;
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(cameraPosition - vWorldPos);
          vec3 L = normalize(uLightDir);

          float NdotL = dot(N, L);
          float fresnel = pow(1.0 - max(dot(N, V), 0.0), 5.0);

          // Dramatic atmosphere — bright white rim
          float litFade = smoothstep(-0.2, 0.3, NdotL);
          vec3 atmosColor = vec3(1.0, 1.0, 1.0);
          float alpha = fresnel * litFade * 0.85;

          // Subtle terminator glow
          float terminator = exp(-abs(NdotL) * 5.0) * fresnel;
          atmosColor = mix(atmosColor, vec3(0.7, 0.72, 0.75), terminator * 0.6);
          alpha += terminator * 0.15;

          gl_FragColor = vec4(atmosColor, alpha * uOpacity);
        }
      `,
      uniforms: {
        uLightDir: { value: lightDir.clone() },
        uOpacity: { value: 0 },
      },
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    atmosphere.position.copy(planet.position);
    scene.add(atmosphere);

    // ── Rock particle ring ─────────────────────────────────
    const ringInner = planetRadius * 1.3;
    const ringOuter = planetRadius * 2.5;
    const ringRockCount = 4000;
    const ringRocks: THREE.Mesh[] = [];
    const ringRockAngles: number[] = [];
    const ringRockRadii: number[] = [];
    const ringRockSpeeds: number[] = [];
    const ringRockYOffsets: number[] = [];
    const ringRockMat = new THREE.MeshStandardMaterial({
      color: 0xccbbaa,
      roughness: 0.7,
      metalness: 0.2,
      transparent: true,
      emissive: 0x332211,
      emissiveIntensity: 0.3,
    });

    for (let i = 0; i < ringRockCount; i++) {
      // Mix of small and large rocks
      const isLarge = Math.random() < 0.08;
      const size = isLarge ? 0.08 + Math.random() * 0.15 : 0.02 + Math.random() * 0.06;
      const detail = isLarge ? 1 : 0;
      const geo = new THREE.IcosahedronGeometry(size, detail);
      // Distort for irregular rocky shape
      const pos = geo.attributes.position;
      for (let v = 0; v < pos.count; v++) {
        pos.setXYZ(v,
          pos.getX(v) * (0.6 + Math.random() * 0.8),
          pos.getY(v) * (0.6 + Math.random() * 0.8),
          pos.getZ(v) * (0.6 + Math.random() * 0.8)
        );
      }
      geo.computeVertexNormals();

      const mesh = new THREE.Mesh(geo, ringRockMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = ringInner + Math.random() * (ringOuter - ringInner);
      const yOff = (Math.random() - 0.5) * 0.6; // slight vertical spread

      mesh.position.set(
        Math.cos(angle) * radius,
        yOff,
        Math.sin(angle) * radius
      );
      mesh.position.add(planet.position);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      scene.add(mesh);
      ringRocks.push(mesh);
      ringRockAngles.push(angle);
      ringRockRadii.push(radius);
      ringRockSpeeds.push(0.0003 + Math.random() * 0.0008);
      ringRockYOffsets.push(yOff);
    }

    // ── Small background asteroids ─────────────────────────
    const asteroidCount = 25;
    const asteroids: THREE.Mesh[] = [];
    const asteroidSpeeds: { rx: number; ry: number; rz: number; drift: number }[] = [];
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x665544,
      roughness: 0.9,
      metalness: 0.1,
    });
    for (let i = 0; i < asteroidCount; i++) {
      const size = 0.08 + Math.random() * 0.25;
      const geo = new THREE.IcosahedronGeometry(size, 0);
      // Distort vertices for irregular rocky shape
      const pos = geo.attributes.position;
      for (let v = 0; v < pos.count; v++) {
        pos.setXYZ(v,
          pos.getX(v) * (0.7 + Math.random() * 0.6),
          pos.getY(v) * (0.7 + Math.random() * 0.6),
          pos.getZ(v) * (0.7 + Math.random() * 0.6)
        );
      }
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, asteroidMat);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40 + 5,
        -8 - Math.random() * 30
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      asteroids.push(mesh);
      asteroidSpeeds.push({
        rx: (Math.random() - 0.5) * 0.02,
        ry: (Math.random() - 0.5) * 0.02,
        rz: (Math.random() - 0.5) * 0.01,
        drift: 0.3 + Math.random() * 0.5,
      });
    }

    // ── Falling fire asteroids (meteor shower) ──────────────
    const fireCount = 35;
    interface FallingStar {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      speed: number;
      trailGeo: THREE.BufferGeometry;
      trailPositions: Float32Array;
      trailAlphas: Float32Array;
      trailSizes: Float32Array;
      trailHistory: THREE.Vector3[];
      trailHead: number;
      trailPoints: THREE.Points;
      brightness: number;
    }
    const fallingStars: FallingStar[] = [];

    const trailPerStar = 40;

    const starTrailMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float alpha;
        attribute float size;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 0.3, 5.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float core = 1.0 - dist * 2.0;
          // Bright white head fading to soft blue tail
          vec3 color = mix(vec3(0.4, 0.6, 1.0), vec3(1.0, 1.0, 1.0), core * core * core);
          float a = core * core * vAlpha;
          gl_FragColor = vec4(color, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const randomStarStart = (): THREE.Vector3 => {
      return new THREE.Vector3(
        (Math.random() - 0.3) * 60,
        18 + Math.random() * 20,
        -3 - Math.random() * 25
      );
    };

    for (let i = 0; i < fireCount; i++) {
      const startPos = randomStarStart();
      startPos.y -= Math.random() * 45;

      const tGeo = new THREE.BufferGeometry();
      const tPos = new Float32Array(trailPerStar * 3);
      const tAlpha = new Float32Array(trailPerStar);
      const tSize = new Float32Array(trailPerStar);
      tGeo.setAttribute("position", new THREE.BufferAttribute(tPos, 3));
      tGeo.setAttribute("alpha", new THREE.BufferAttribute(tAlpha, 1));
      tGeo.setAttribute("size", new THREE.BufferAttribute(tSize, 1));
      const tPoints = new THREE.Points(tGeo, starTrailMat);
      scene.add(tPoints);

      const tHistory: THREE.Vector3[] = [];
      for (let j = 0; j < trailPerStar; j++) {
        tHistory.push(startPos.clone());
      }

      // Consistent diagonal direction like real shooting stars
      const angle = -0.6 - Math.random() * 0.4; // mostly downward-left
      const vel = new THREE.Vector3(
        Math.cos(angle) * -0.7 - Math.random() * 0.3,
        Math.sin(angle) * -1.0 - Math.random() * 0.3,
        (Math.random() - 0.5) * 0.1
      ).normalize();

      fallingStars.push({
        position: startPos.clone(),
        velocity: vel,
        speed: 0.08 + Math.random() * 0.12,
        trailGeo: tGeo,
        trailPositions: tPos,
        trailAlphas: tAlpha,
        trailSizes: tSize,
        trailHistory: tHistory,
        trailHead: 0,
        trailPoints: tPoints,
        brightness: 0.5 + Math.random() * 0.5,
      });
    }

    const starCount = 150;
    const starPositions = new Float32Array(starCount * 3);
    const starPhases = new Float32Array(starCount);
    const starFreqs = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = -15 - Math.random() * 40;
      starPhases[i] = Math.random() * Math.PI * 2;
      starFreqs[i] = 0.3 + Math.random() * 1.2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("aPhase", new THREE.BufferAttribute(starPhases, 1));
    starGeo.setAttribute("aFreq", new THREE.BufferAttribute(starFreqs, 1));
    const starMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aPhase;
        attribute float aFreq;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vAlpha = 0.25 + 0.35 * (0.5 + 0.5 * sin(uTime * aFreq + aPhase));
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (1.0 + 0.5 * sin(uTime * aFreq * 0.7 + aPhase)) * (300.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 0.5, 2.5);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = (1.0 - dist * 2.0) * vAlpha;
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
        }
      `,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // ── Micro dust particles — 2500 tiny drifting specks ───
    const dustCount = 2500;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustOpacities = new Float32Array(dustCount);
    const dustSpeeds = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 60;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      dustPositions[i * 3 + 2] = -5 - Math.random() * 40;
      dustOpacities[i] = 0.3 + Math.random() * 0.3;
      dustSpeeds[i] = 0.5 + Math.random() * 1.5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 1.2 * (300.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 0.3, 0.8);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform float uTime;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = (1.0 - dist * 2.0) * vOpacity;
          gl_FragColor = vec4(0.85, 0.87, 0.90, alpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    dustGeo.setAttribute("opacity", new THREE.BufferAttribute(dustOpacities, 1));
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // ── Mouse parallax ─────────────────────────────────────
    let mouseX = 0,
      mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const w = container.offsetWidth,
        h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ─────────────────────────────────────
    let time = 0;
    let animId: number;
    const posArray = dustGeo.attributes.position.array as Float32Array;

    // ── Staged entrance animation ─────────────────────────
    // Phase 1: 0–1s — blank sky, only stars
    // Phase 2: 1–3s — planet drops from above
    // Phase 3: 2.5–4.5s — ring rocks fly in from scattered positions
    const planetRestY = planet.position.y; // 12
    const planetStartY = planetRestY + 35; // way above
    planet.position.y = planetStartY;
    atmosphere.position.y = planetStartY;
    planetMat.uniforms.uOpacity.value = 0;
    atmosMat.uniforms.uOpacity.value = 0;
    
    // Hide ring rocks initially and store their scattered start positions
    const ringScatterAngles: number[] = [];
    const ringScatterRadii: number[] = [];
    for (let i = 0; i < ringRockCount; i++) {
      ringRocks[i].visible = false;
      (ringRocks[i].material as THREE.MeshStandardMaterial).opacity = 0;
      // Scatter: random far-out positions
      ringScatterAngles.push(Math.random() * Math.PI * 2);
      ringScatterRadii.push(ringRockRadii[i] * (3.0 + Math.random() * 3.0)); // way further out
    }

    const startZ = 28;
    const endZ = 20;
    const startCamY = -3;
    const endCamY = 0;
    const zoomDuration = 4.5;
    camera.position.set(0, startCamY, startZ);

    const animate = () => {
      time += 0.016;
      planetMat.uniforms.uTime.value = time;
      dustMat.uniforms.uTime.value = time;

      // Camera zoom
      if (time < zoomDuration) {
        const t = time / zoomDuration;
        const ease = 1 - Math.pow(1 - t, 3);
        camera.position.z = startZ + (endZ - startZ) * ease;
        camera.position.y = startCamY + (endCamY - startCamY) * ease;
      }

      // Phase 2: Planet drops in (1s–3s)
      const planetStart = 1.0;
      const planetEnd = 3.0;
      if (time >= planetStart && time <= planetEnd) {
        const t = Math.min((time - planetStart) / (planetEnd - planetStart), 1);
        // Elastic ease-out for a satisfying bounce
        const elastic = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.cos((t * 10 - 0.75) * (2 * Math.PI / 3));
        const currentY = planetStartY + (planetRestY - planetStartY) * elastic;
        planet.position.y = currentY;
        atmosphere.position.y = currentY;
        // Fade in during first half of drop
        const fadeT = Math.min(t * 2, 1);
        planetMat.uniforms.uOpacity.value = fadeT;
        atmosMat.uniforms.uOpacity.value = fadeT;
      } else if (time > planetEnd) {
        planet.position.y = planetRestY;
        atmosphere.position.y = planetRestY;
        planetMat.uniforms.uOpacity.value = 1;
        atmosMat.uniforms.uOpacity.value = 1;
      }

      // Phase 3: Ring rocks converge from scatter (2.5s–4.5s)
      const ringStart = 2.5;
      const ringEnd = 4.5;
      if (time >= ringStart) {
        const ringT = Math.min((time - ringStart) / (ringEnd - ringStart), 1);
        // Smooth ease-out
        const ringEase = 1 - Math.pow(1 - ringT, 4);
        for (let i = 0; i < ringRockCount; i++) {
          ringRocks[i].visible = true;
          (ringRocks[i].material as THREE.MeshStandardMaterial).opacity = ringEase;
          // Interpolate from scattered radius to actual radius
          const currentRadius = ringScatterRadii[i] + (ringRockRadii[i] - ringScatterRadii[i]) * ringEase;
          const a = ringRockAngles[i];
          ringRocks[i].position.set(
            Math.cos(a) * currentRadius + planet.position.x,
            ringRockYOffsets[i] + planet.position.y + (1 - ringEase) * (Math.random() - 0.5) * 4,
            Math.sin(a) * currentRadius + planet.position.z
          );
        }
      }

      planet.rotation.y += 0.0004;
      atmosphere.rotation.y = planet.rotation.y;
      // Animate ring rocks — orbit around planet (only after entrance completes)
      if (time > ringEnd) {
        for (let i = 0; i < ringRockCount; i++) {
          ringRockAngles[i] += ringRockSpeeds[i];
          const a = ringRockAngles[i];
          const r = ringRockRadii[i];
          ringRocks[i].position.set(
            Math.cos(a) * r + planet.position.x,
            ringRockYOffsets[i] + planet.position.y,
            Math.sin(a) * r + planet.position.z
          );
          ringRocks[i].rotation.x += 0.003;
          ringRocks[i].rotation.y += 0.002;
        }
      }

      // Slow dust drift
      for (let i = 0; i < dustCount; i++) {
        posArray[i * 3] += Math.sin(time * dustSpeeds[i] * 0.1 + i) * 0.0003;
        posArray[i * 3 + 1] += Math.cos(time * dustSpeeds[i] * 0.08 + i * 0.7) * 0.0002;
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Dust twinkle — modulate opacity
      const opArray = dustGeo.attributes.opacity.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        opArray[i] = 0.3 + Math.sin(time * dustSpeeds[i] + i * 1.3) * 0.15;
      }
      dustGeo.attributes.opacity.needsUpdate = true;

      // Star twinkle — individual per-star via shader
      starMat.uniforms.uTime.value = time;

      // Small asteroids — tumble and drift
      for (let i = 0; i < asteroidCount; i++) {
        const a = asteroids[i];
        const s = asteroidSpeeds[i];
        a.rotation.x += s.rx;
        a.rotation.y += s.ry;
        a.rotation.z += s.rz;
        a.position.x += Math.sin(time * s.drift * 0.1 + i) * 0.003;
        a.position.y += Math.cos(time * s.drift * 0.08 + i * 0.5) * 0.002;
      }

      // ── Falling stars — streaking across the sky ──────────
      for (let i = 0; i < fireCount; i++) {
        const fs = fallingStars[i];
        fs.position.addScaledVector(fs.velocity, fs.speed);

        // Reset when fallen out of view
        if (fs.position.y < -25) {
          const newStart = randomStarStart();
          fs.position.copy(newStart);
          for (let j = 0; j < trailPerStar; j++) {
            fs.trailHistory[j].copy(newStart);
          }
          fs.trailHead = 0;
        }

        // Update trail — tight, clean streak
        fs.trailHistory[fs.trailHead].copy(fs.position);
        fs.trailHead = (fs.trailHead + 1) % trailPerStar;
        for (let j = 0; j < trailPerStar; j++) {
          const idx = (fs.trailHead + j) % trailPerStar;
          const age = j / trailPerStar;
          fs.trailPositions[j * 3] = fs.trailHistory[idx].x;
          fs.trailPositions[j * 3 + 1] = fs.trailHistory[idx].y;
          fs.trailPositions[j * 3 + 2] = fs.trailHistory[idx].z;
          fs.trailAlphas[j] = age * age * age * fs.brightness;
          fs.trailSizes[j] = age * age * 1.8;
        }
        fs.trailGeo.attributes.position.needsUpdate = true;
        fs.trailGeo.attributes.alpha.needsUpdate = true;
        fs.trailGeo.attributes.size.needsUpdate = true;
      }

      const targetRotX = mouseY * 0.02;
      const targetRotZ = mouseX * -0.015;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.05;
      scene.rotation.z += (targetRotZ - scene.rotation.z) * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      planetGeo.dispose();
      planetMat.dispose();
      
      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      ringRockMat.dispose();
      ringRocks.forEach(r => r.geometry.dispose());
      asteroidMat.dispose();
      asteroids.forEach(a => a.geometry.dispose());
      fallingStars.forEach(fs => {
        fs.trailGeo.dispose();
      });
      starTrailMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedPlanet;
