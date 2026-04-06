import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Move } from "lucide-react";

interface ProjectLightboxProps {
  project: { title: string; category: string; desc: string; image: string; tags: string[] } | null;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      const next = prev - e.deltaY * 0.001;
      const clamped = Math.min(Math.max(next, 1), 3);
      if (clamped <= 1) setPan({ x: 0, y: 0 });
      return clamped;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStart.current = { ...pan };
  }, [zoom, pan]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    });
  }, [isDragging]);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    const container = imgContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [project, onClose, handleWheel, handleMouseMove, handleMouseUp, handleTouchMove]);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [project]);

  if (!project) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
      />

      {/* Close */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300"
        style={{ zIndex: 100000 }}
      >
        <X size={20} />
      </motion.button>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/40 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2"
        style={{ zIndex: 100000 }}
      >
        {zoom > 1 ? (
          <>
            <Move size={12} />
            {Math.round(zoom * 100)}% — Drag to pan, scroll to zoom
          </>
        ) : (
          "Scroll to zoom in"
        )}
      </motion.div>

      {/* Content */}
      <div
        className="relative w-full h-full flex items-center justify-center p-6 md:p-12"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute -inset-10 rounded-3xl blur-[60px] -z-10"
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.2), transparent 70%)" }}
          />

          {/* Image with zoom + drag */}
          <div
            ref={imgContainerRef}
            className="relative overflow-hidden rounded-t-2xl"
            style={{
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[68vh] object-contain bg-black/80 select-none pointer-events-none"
              initial={{ filter: "blur(8px) brightness(0.6)" }}
              animate={{ filter: "blur(0px) brightness(1)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
              draggable={false}
            />

            {/* Shine sweep */}
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "250%" }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              }}
            />

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-b-2xl p-6 md:p-8 border border-white/10 border-t-0"
            style={{
              background: "linear-gradient(180deg, rgba(18,18,18,0.98) 0%, rgba(10,10,10,0.99) 100%)",
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {project.category}
                </span>
                <h3 className="font-display text-xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="text-white/45 text-sm mt-2 max-w-lg leading-relaxed">
                  {project.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border"
                    style={{
                      color: "hsl(var(--accent) / 0.9)",
                      backgroundColor: "hsl(var(--accent) / 0.08)",
                      borderColor: "hsl(var(--accent) / 0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
};

export default ProjectLightbox;
