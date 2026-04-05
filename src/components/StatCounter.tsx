import { useRef, useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
  trend?: { direction: "up" | "down"; text: string };
}

const StatCounter = ({ value, suffix = "", prefix = "", label, delay = 0, trend }: StatCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setHasAnimated(true);
            let start = 0;
            const duration = 2000;
            const step = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * value));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="group transition-all duration-700 ease-out"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="flex items-baseline gap-3">
        <p className="font-mono text-4xl md:text-6xl font-bold tracking-tighter" style={{ color: 'inherit' }}>
          {prefix}{count}{suffix}
        </p>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-wide ${
              trend.direction === "up" ? "text-accent" : "text-destructive"
            }`}
            style={{
              opacity: hasAnimated ? 1 : 0,
              transition: "opacity 0.5s ease-out 1.8s",
            }}
          >
            {trend.direction === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.text}
          </span>
        )}
      </div>
      <div className="w-8 h-px bg-accent mt-4 mb-3 group-hover:w-16 transition-all duration-500" />
      <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.25em]">
        {label}
      </p>
    </div>
  );
};

export default StatCounter;
