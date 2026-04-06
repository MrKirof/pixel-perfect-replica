import { useEffect, useRef } from "react";

const HeroScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onVisChange = () => { isVisible = !document.hidden; };
    document.addEventListener("visibilitychange", onVisChange);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    interface Star {
      x: number; y: number; vx: number; vy: number;
      o: number; r: number; ts: number; to: number;
    }
    const stars: Star[] = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * w(), y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
        o: Math.random() * 0.7 + 0.1, r: Math.random() * 1.5 + 0.3,
        ts: 0.5 + Math.random() * 2, to: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const draw = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w(), h());
      time += 0.016;

      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = w(); if (s.x > w()) s.x = 0;
        if (s.y < 0) s.y = h(); if (s.y > h()) s.y = 0;
        const tw = 0.3 + 0.7 * ((Math.sin(time * s.ts + s.to) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o * tw})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 1 }}
    />
  );
};

export default HeroScene;
