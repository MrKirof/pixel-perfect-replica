import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ProjectLightboxProps {
  project: { title: string; category: string; desc: string; image: string; tags: string[] } | null;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

      {/* Close */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onClose}
        className="absolute top-6 right-6 w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300"
        style={{ zIndex: 100000 }}
      >
        <X size={22} />
      </motion.button>

      {/* 3D perspective wrapper */}
      <div
        className="relative w-full h-full flex items-center justify-center p-6 md:p-16"
        style={{ perspective: "1800px" }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.2,
            rotateX: 50,
            rotateY: -25,
            y: 300,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.4,
            rotateX: -40,
            rotateY: 15,
            y: 150,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 120,
            mass: 0.8,
          }}
          className="relative max-w-5xl w-full flex flex-col"
          style={{ transformStyle: "preserve-3d" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1.1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="absolute -inset-12 rounded-3xl blur-[80px] -z-10"
            style={{ background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.25), transparent 70%)" }}
          />

          {/* Image with 3D depth */}
          <motion.div
            className="relative overflow-hidden rounded-t-2xl"
            style={{
              boxShadow: "0 60px 120px -30px rgba(0,0,0,0.9), 0 30px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              rotateX: 2,
              rotateY: -2,
              scale: 1.02,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[68vh] object-contain bg-black/80"
              initial={{ scale: 1.2, filter: "blur(20px) brightness(0.5)" }}
              animate={{ scale: 1, filter: "blur(0px) brightness(1)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
            />

            {/* Shine sweep */}
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "250%" }}
              transition={{ delay: 0.4, duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              }}
            />

            {/* Border glow top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-b-2xl p-6 md:p-8 border border-white/10 border-t-0"
            style={{
              background: "linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,0.99) 100%)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)",
              transformStyle: "preserve-3d",
              transform: "translateZ(-10px)",
            }}
          >
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <motion.span
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {project.category}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                  className="font-display text-xl md:text-3xl font-extrabold text-white tracking-tight leading-tight"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/45 text-sm mt-2 max-w-lg leading-relaxed"
                >
                  {project.desc}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border"
                    style={{
                      color: "hsl(var(--accent) / 0.9)",
                      backgroundColor: "hsl(var(--accent) / 0.08)",
                      borderColor: "hsl(var(--accent) / 0.2)",
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
};

export default ProjectLightbox;
