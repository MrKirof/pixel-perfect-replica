import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProjectLightboxProps {
  project: { title: string; category: string; desc: string; image: string; tags: string[] } | null;
  onClose: () => void;
}

const ProjectLightbox = ({ project, onClose }: ProjectLightboxProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X size={24} />
        </motion.button>

        {/* 3D Card Container */}
        <motion.div
          key="lightbox-card"
          initial={{ opacity: 0, scale: 0.7, rotateX: 25, rotateY: -15, z: -200 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0, z: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotateX: -20, rotateY: 10, z: -200 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full max-h-[85vh] overflow-hidden rounded-lg shadow-2xl"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[70vh] object-contain bg-black/50 rounded-t-lg"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-background/95 backdrop-blur-sm p-6 rounded-b-lg"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-lg">{project.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-lg blur-xl opacity-50 -z-10" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectLightbox;
