import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * A mesmerising animated orb with orbiting rings, floating particles
 * and pulsing glow – pure CSS + framer-motion, no Three.js needed.
 */

const PARTICLE_COUNT = 18;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (360 / PARTICLE_COUNT) * i;
  const radius = 100 + Math.random() * 60;
  const size = 2 + Math.random() * 3;
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * -10;
  return { angle, radius, size, duration, delay };
});

const FooterOrb = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / (rect.width / 2);
      mouseY = (e.clientY - cy) / (rect.height / 2);
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      const orb = container.querySelector<HTMLDivElement>("[data-orb]");
      if (orb) {
        orb.style.transform = `rotateY(${currentX * 12}deg) rotateX(${-currentY * 12}deg)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[360px] w-full max-w-[340px] items-center justify-center"
      style={{ perspective: "800px" }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: "radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D Orb container */}
      <div
        data-orb
        className="relative"
        style={{
          width: 200,
          height: 200,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Core sphere */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, hsl(var(--accent) / 0.6), hsl(var(--accent) / 0.15) 50%, hsl(var(--foreground) / 0.05) 100%)",
            boxShadow:
              "inset -20px -20px 60px hsl(var(--accent) / 0.2), inset 10px 10px 40px hsl(var(--background) / 0.3), 0 0 80px hsl(var(--accent) / 0.15)",
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glass highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "12%",
            left: "18%",
            width: "40%",
            height: "30%",
            background:
              "radial-gradient(ellipse, hsl(var(--background) / 0.35) 0%, transparent 70%)",
            filter: "blur(6px)",
            transform: "rotate(-20deg)",
          }}
        />

        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            border: "1px solid hsl(var(--accent) / 0.2)",
            boxShadow: "0 0 30px hsl(var(--accent) / 0.1)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting Ring 1 — horizontal */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: 240,
            height: 240,
            marginTop: -120,
            marginLeft: -120,
            borderRadius: "50%",
            border: "1.5px solid hsl(var(--accent) / 0.25)",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: 75, rotateZ: [0, 360] }}
          transition={{
            rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
          }}
        >
          {/* Dot on ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              top: -4,
              left: "50%",
              marginLeft: -4,
              background: "hsl(var(--accent))",
              boxShadow: "0 0 12px hsl(var(--accent) / 0.8)",
            }}
          />
        </motion.div>

        {/* Orbiting Ring 2 — tilted */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: 200,
            height: 200,
            marginTop: -100,
            marginLeft: -100,
            borderRadius: "50%",
            border: "1px solid hsl(var(--accent) / 0.15)",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: 60, rotateY: 45, rotateZ: [0, -360] }}
          transition={{
            rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              top: -3,
              left: "50%",
              marginLeft: -3,
              background: "hsl(var(--accent) / 0.7)",
              boxShadow: "0 0 10px hsl(var(--accent) / 0.6)",
            }}
          />
        </motion.div>

        {/* Orbiting Ring 3 — vertical-ish */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: 270,
            height: 270,
            marginTop: -135,
            marginLeft: -135,
            borderRadius: "50%",
            border: "1px dashed hsl(var(--accent) / 0.12)",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: 70, rotateZ: [0, 360] }}
          transition={{
            rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              top: -2.5,
              left: "50%",
              marginLeft: -2.5,
              background: "hsl(var(--accent) / 0.5)",
              boxShadow: "0 0 8px hsl(var(--accent) / 0.4)",
            }}
          />
        </motion.div>
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `hsl(var(--accent) / ${0.3 + Math.random() * 0.4})`,
            boxShadow: `0 0 ${p.size * 2}px hsl(var(--accent) / 0.3)`,
          }}
          animate={{
            x: [
              Math.cos((p.angle * Math.PI) / 180) * p.radius,
              Math.cos(((p.angle + 180) * Math.PI) / 180) * (p.radius * 0.7),
              Math.cos(((p.angle + 360) * Math.PI) / 180) * p.radius,
            ],
            y: [
              Math.sin((p.angle * Math.PI) / 180) * p.radius,
              Math.sin(((p.angle + 180) * Math.PI) / 180) * (p.radius * 0.7),
              Math.sin(((p.angle + 360) * Math.PI) / 180) * p.radius,
            ],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Brand mark in centre */}
      <motion.div
        className="absolute font-display text-sm font-bold tracking-[0.3em] uppercase"
        style={{
          color: "hsl(var(--accent) / 0.7)",
          textShadow: "0 0 20px hsl(var(--accent) / 0.3)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        MK
      </motion.div>
    </div>
  );
};

export default FooterOrb;
