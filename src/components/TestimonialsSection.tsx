import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarBorder from "@/components/StarBorder";

const testimonials = [
  {
    quote: "Kirof changed how we think about our brand. They didn't just design a logo, they built us an identity.",
    name: "Rania Solis",
    title: "Founder at Noxian",
    rating: 5,
  },
  {
    quote: "Our financial dashboards were delivered on time and built exactly to spec. Couldn't be happier.",
    name: "Priya Mehta",
    title: "Head of Finance at Crestfield",
    rating: 5,
  },
  {
    quote: "The motion graphics they made for our product launch got more engagement than anything we'd ever put out.",
    name: "Leo Dubois",
    title: "Marketing Director at Blumora",
    rating: 5,
  },
  {
    quote: "Their team is sharp, fast, and incredibly easy to work with. Best agency experience we've had.",
    name: "Sara Venn",
    title: "Growth Lead at Veltro",
    rating: 5,
  },
  {
    quote: "We tripled our organic traffic in 3 months. The SEO strategy was bulletproof.",
    name: "Aisha Kone",
    title: "CMO at Tethyr",
    rating: 5,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = (index: number) => {
    if (isAnimating) return;
    setDirection(index > active ? 1 : -1);
    setIsAnimating(true);
    setActive(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const next = () => {
    const nextIdx = (active + 1) % testimonials.length;
    setDirection(1);
    goTo(nextIdx);
  };
  const prev = () => {
    const prevIdx = active === 0 ? testimonials.length - 1 : active - 1;
    setDirection(-1);
    goTo(prevIdx);
  };

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const t = testimonials[active];

  const quoteVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir * 40, filter: "blur(8px)" }),
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, y: dir * -30, filter: "blur(6px)" }),
  };

  return (
    <section className="relative py-20 md:py-32" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 mb-16">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #d0d0d0, transparent)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left label */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-mono text-xs text-muted-foreground"></span>
              <motion.div
                className="w-8 h-px bg-border"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                style={{ transformOrigin: "left" }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Testimonials</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-3xl md:text-4xl font-extrabold leading-[0.9] tracking-tight mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
              >
                What our<br />clients say
              </motion.h2>
            </div>

            <motion.p
              className="text-muted-foreground font-body text-sm leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
            >
              Don't just take our word for it, hear what our clients have to say.
            </motion.p>

            {/* Nav arrows */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              <button
                onClick={prev}
                className="w-11 h-11 border border-border flex items-center justify-center hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all"
                data-cursor-hover
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 border border-border flex items-center justify-center hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all"
                data-cursor-hover
              >
                <ArrowRight size={14} />
              </button>
              <span className="font-mono text-xs text-muted-foreground ml-3">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {/* Right quote */}
          <div className="md:col-span-8 flex flex-col justify-center">
            <StarBorder
              as="div"
              color="hsl(217 92% 60%)"
              speed="8s"
              thickness={1}
              className="rounded-2xl"
            >
              <motion.div
                className="relative min-h-[280px] flex flex-col justify-center rounded-2xl border-l-2 border-accent pl-8 md:pl-14 py-8 md:py-12"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease }}
              >
                <span className="absolute -top-4 -left-4 font-display text-[120px] md:text-[160px] leading-none text-accent/15 select-none pointer-events-none">"</span>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={quoteVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease }}
                  >
                    <div className="flex gap-1 mb-4 relative z-10">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-accent text-base"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06, duration: 0.3 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>

                    <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.15] tracking-tight mb-8 relative z-10">
                      {t.quote}
                    </p>

                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div
                        className="w-12 h-12 bg-accent flex items-center justify-center"
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.4, ease }}
                      >
                        <span className="font-display text-sm font-bold text-accent-foreground">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <p className="font-display font-bold text-sm">{t.name}</p>
                        <p className="text-muted-foreground font-mono text-[11px]">{t.title}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </StarBorder>

            {/* Progress dots */}
            <motion.div
              className="flex gap-2 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-0.5 transition-all duration-500 ${i === active ? "w-12 bg-accent" : "w-6 bg-border hover:bg-muted-foreground"}`}
                  data-cursor-hover
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
