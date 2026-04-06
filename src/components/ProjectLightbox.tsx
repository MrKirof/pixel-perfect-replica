import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
      />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
      >
        <X size={22} />
      </motion.button>

      {/* 3D perspective container */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12"
        style={{ perspective: "1500px" }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.3,
            rotateX: 45,
            rotateY: -30,
            y: 200,
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
            scale: 0.5,
            rotateX: -30,
            rotateY: 20,
            y: 100,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative max-w-5xl w-full flex flex-col"
          style={{ transformStyle: "preserve-3d" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient glow behind card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute -inset-8 bg-accent/15 rounded-3xl blur-3xl -z-10"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -inset-16 bg-gradient-to-br from-accent/10 via-transparent to-accent/10 rounded-3xl blur-[60px] -z-20"
          />

          {/* Image container with 3D shadow */}
          <motion.div
            className="relative rounded-t-xl overflow-hidden"
            style={{
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.3)",
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[72vh] object-contain bg-black"
              initial={{ scale: 1.15, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
            />

            {/* Zoom hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5"
            >
              <ZoomIn size={14} className="text-white/70" />
              <span className="text-white/70 text-xs font-mono">Full Preview</span>
            </motion.div>

            {/* Reflection/shine effect */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>

          {/* Info bar */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#111] border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-b-xl"
            style={{
              boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2 block"
                >
                  {project.category}
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 }}
                  className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-white/50 text-sm mt-2 max-w-lg leading-relaxed"
                >
                  {project.desc}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] uppercase tracking-wider text-accent/90 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectLightbox;
