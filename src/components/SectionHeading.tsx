import { motion } from "framer-motion";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  number?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

const SectionHeading = ({ tag, title, description, align = "left", number }: SectionHeadingProps) => (
  <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : ""}`}>
    <motion.div
      initial={{ opacity: 0, x: align === "center" ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className={`flex items-center gap-4 mb-6 ${align === "center" ? "justify-center" : ""}`}
    >
      {number && (
        <span className="font-mono text-xs text-muted-foreground">{number}</span>
      )}
      {tag && (
        <>
          {number && <motion.div className="w-8 h-px bg-border" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease }} style={{ transformOrigin: "left" }} />}
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {tag}
          </span>
        </>
      )}
    </motion.div>

    <div className="overflow-hidden">
      <motion.h2
        className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight max-w-5xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      >
        {title}
      </motion.h2>
    </div>

    {description && (
      <motion.p
        className={`text-muted-foreground font-body text-base mt-6 max-w-2xl leading-relaxed ${align === "center" ? "mx-auto text-center" : ""}`}
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
      >
        {description}
      </motion.p>
    )}
  </div>
);

export default SectionHeading;
