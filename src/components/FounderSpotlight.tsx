import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1] as const;

const FounderSpotlight = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative flex justify-center lg:justify-start"
          >
            <div
              ref={containerRef}
              className="relative"
              style={{ perspective: "1000px" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              data-cursor-hover
            >
              <motion.div
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  y: isHovered ? -12 : 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative z-10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-[320px] h-[420px] md:w-[380px] md:h-[500px] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"
                    alt="Mareful Kirof, Founder of MrKirof creative agency"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Name badge */}
                <div
                  className="absolute bottom-6 left-6 right-6 backdrop-blur-md rounded-xl px-5 py-3"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    transform: "translateZ(40px)",
                  }}
                >
                  <p className="font-display font-bold text-base text-white">Mareful Kirof</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/50">Founder & CEO</p>
                </div>
              </motion.div>

              {/* Floor shadow */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-[50%]"
                animate={{
                  width: isHovered ? "85%" : "75%",
                  height: isHovered ? "30px" : "20px",
                  opacity: isHovered ? 0.2 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                  background: "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 70%)",
                  filter: "blur(12px)",
                }}
              />
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">The Founder</span>
            </div>

            <h2 className="font-display text-3xl font-extrabold tracking-tight leading-[0.95] mb-6">
              A vision built on
              <br />
              <span className="hero-gradient-text">obsessive craft</span>
            </h2>

            <div className="space-y-5 text-white/60 font-body text-base leading-relaxed">
              <p>
                Mareful Kirof founded Kirof in 2013 with a simple belief: every business deserves
                design that doesn't just look good — it <span className="text-white font-medium">speaks and sells</span>.
              </p>
              <p>
                Starting as a one-person studio, he grew Kirof into a 20-person remote agency
                spanning 13 disciplines — from brand identity and motion graphics to web development
                and financial operations.
              </p>
              <p>
                With 1500+ clients across 14 countries and 3000+ projects delivered with zero missed
                deadlines, his philosophy remains unchanged: <span className="text-white font-medium">obsess over every detail,
                deliver beyond every expectation</span>.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/about"
                className="magnetic-btn inline-flex items-center gap-2 bg-accent text-accent-foreground font-display font-bold text-base px-7 py-3.5 rounded-full hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)] transition-all duration-500 group"
                data-cursor-hover
              >
                Read Our Story
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlight;
