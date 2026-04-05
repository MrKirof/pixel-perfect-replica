import { useMemo } from "react";

const BackgroundPaths = () => {
  const paths = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => {
      const startX = -10 + (i % 6) * 20 + Math.random() * 10;
      const startY = -5 + Math.floor(i / 6) * 18 + Math.random() * 8;
      const endX = startX + 60 + Math.random() * 30;
      const endY = startY + 40 + Math.random() * 20;
      const cpX1 = startX + (endX - startX) * 0.3 + (Math.random() - 0.5) * 20;
      const cpY1 = startY + (endY - startY) * 0.3 + (Math.random() - 0.5) * 15;
      const cpX2 = startX + (endX - startX) * 0.7 + (Math.random() - 0.5) * 20;
      const cpY2 = startY + (endY - startY) * 0.7 + (Math.random() - 0.5) * 15;
      const opacity = 0.02 + Math.random() * 0.02;
      const delay = i * 0.3;
      const duration = 6 + Math.random() * 4;
      return { startX, startY, endX, endY, cpX1, cpY1, cpX2, cpY2, opacity, delay, duration };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((p, i) => (
          <path
            key={i}
            d={`M ${p.startX} ${p.startY} C ${p.cpX1} ${p.cpY1}, ${p.cpX2} ${p.cpY2}, ${p.endX} ${p.endY}`}
            fill="none"
            stroke="white"
            strokeWidth="0.15"
            opacity={p.opacity}
            style={{
              animation: `pathFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BackgroundPaths;
