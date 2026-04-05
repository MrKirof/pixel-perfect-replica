import { useEffect, useRef } from "react";

const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      time += 0.003;

      const spacing = 60;
      const cols = Math.ceil(w() / spacing) + 1;
      const rows = Math.ceil(h() / spacing) + 1;

      // Draw grid lines with wave distortion
      ctx.lineWidth = 0.5;

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * spacing;
          const baseY = r * spacing;
          const distort = Math.sin(x * 0.008 + time * 2 + r * 0.5) * 4 +
                          Math.sin(x * 0.015 + time * 3) * 2;
          const y = baseY + distort;

          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.04 + 0.02 * Math.sin(time + r * 0.3);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const baseX = c * spacing;
          const y = r * spacing;
          const distort = Math.sin(y * 0.008 + time * 2 + c * 0.5) * 4 +
                          Math.cos(y * 0.012 + time * 2.5) * 2;
          const x = baseX + distort;

          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.04 + 0.02 * Math.sin(time + c * 0.3);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.stroke();
      }

      // Glow dots at intersections (sparse)
      for (let r = 0; r < rows; r += 3) {
        for (let c = 0; c < cols; c += 3) {
          const baseX = c * spacing;
          const baseY = r * spacing;
          const dx = Math.sin(baseY * 0.008 + time * 2 + c * 0.5) * 4;
          const dy = Math.sin(baseX * 0.008 + time * 2 + r * 0.5) * 4;
          const pulse = 0.15 + 0.1 * Math.sin(time * 3 + r * 0.7 + c * 0.5);

          ctx.beginPath();
          ctx.arc(baseX + dx, baseY + dy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default AnimatedGrid;
