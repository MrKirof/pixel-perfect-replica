import { useEffect, useRef, useState, useCallback } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const setupListeners = useCallback(() => {
    const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
    
    const onEnter = (e: Event) => {
      isHovering.current = true;
      const el = e.currentTarget as HTMLElement;
      const label = el.getAttribute("data-cursor-label") || "";
      setCursorLabel(label);
    };
    const onLeave = () => {
      isHovering.current = false;
      setCursorLabel("");
    };

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove);

    let cleanup = setupListeners();

    // Re-setup on DOM changes
    const observer = new MutationObserver(() => {
      cleanup();
      cleanup = setupListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const scale = isHovering.current ? 2.8 : 1;
        const opacity = isHovering.current ? 0.8 : 0.3;
        ringRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px) scale(${scale})`;
        ringRef.current.style.opacity = `${opacity}`;
        ringRef.current.style.borderColor = isHovering.current
          ? "hsl(var(--accent))"
          : "hsl(var(--accent) / 0.5)";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x + 24}px, ${pos.current.y - 8}px)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      cleanup();
      observer.disconnect();
    };
  }, [setupListeners]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ transition: "none" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999] hidden md:block"
        style={{ transition: "opacity 0.3s, border-color 0.3s" }}
      />
      {/* Label */}
      {cursorLabel && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        >
          <span className="bg-accent text-accent-foreground font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 whitespace-nowrap">
            {cursorLabel}
          </span>
        </div>
      )}
    </>
  );
};

export default CustomCursor;
