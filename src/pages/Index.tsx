import { ArrowRight, ArrowUpRight, Sparkles, Layout, Code, Film, Trophy, Globe, CheckCircle, Star, Megaphone, Video, PenTool, Camera, BarChart3 } from "lucide-react";
import AnimatedGrid from "@/components/AnimatedGrid";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import Hero from "@/components/Hero";
import StatCounter from "@/components/StatCounter";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookCallSection from "@/components/BookCallSection";
import SEOHead from "@/components/SEOHead";



type AnimStyle = "fade" | "scale" | "blur" | "slide-left" | "slide-right";

const animVariants: Record<AnimStyle, { initial: object; whileInView: object }> = {
  fade: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92, y: 30 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
  },
  blur: {
    initial: { opacity: 0, y: 40, filter: "blur(12px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "slide-left": {
    initial: { opacity: 0, x: -80 },
    whileInView: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 80 },
    whileInView: { opacity: 1, x: 0 },
  },
};

const FadeInSection = ({ children, className = "", delay = 0, style = "fade" }: { children: React.ReactNode; className?: string; delay?: number; style?: AnimStyle }) => {
  const v = animVariants[style];
  return (
    <motion.div
      initial={v.initial as any}
      whileInView={v.whileInView as any}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const services = [
  { icon: Sparkles, title: "Brand & Identity", desc: "Brand systems that communicate personality, authority, and trust.", tags: ["Logo Design", "Brand Strategy", "Visual Identity"] },
  { icon: Layout, title: "Web & App Design", desc: "Conversion-driven interfaces that look stunning and feel effortless.", tags: ["User Research", "Wireframing", "Prototyping"] },
  { icon: Code, title: "Web & App Dev", desc: "Full-stack builds: React SPAs to CMS-powered websites.", tags: ["React", "Next.js", "Mobile Apps"] },
  { icon: Film, title: "Motion Graphics", desc: "Explainers, logo reveals, social reels, and broadcast content.", tags: ["Logo Reveals", "Reels", "Explainers"] },
  { icon: Video, title: "Video Production", desc: "End-to-end video — commercials, promos, interviews, and more.", tags: ["Commercials", "Promos", "Interviews"] },
  { icon: Camera, title: "Photography", desc: "Professional product shoots, team portraits, and event coverage.", tags: ["Product", "Portraits", "Events"] },
  { icon: Megaphone, title: "Digital Marketing", desc: "Data-driven campaigns across SEO, PPC, social, and email channels.", tags: ["SEO", "PPC", "Social Media"] },
  { icon: PenTool, title: "Copywriting & Content", desc: "Compelling copy for websites, ads, blogs, and email sequences.", tags: ["Web Copy", "Blogs", "Email"] },
  { icon: BarChart3, title: "AI & Automation", desc: "Smart chatbots, workflow automation, and AI integrations.", tags: ["Chatbots", "Workflows", "AI"] },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Link to="/services" className="block flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] snap-start">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30, rotateY: -5 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="service-card group h-full bg-card border border-border hover:border-accent/40 transition-all duration-500 hover:-translate-y-2"
        data-cursor-hover
      >
        <div className="p-6 md:p-8 relative z-10 flex flex-col h-full min-h-[260px]">
          <div className="flex items-start justify-between mb-5">
            <span className="font-mono text-xs text-muted-foreground/50 tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="w-10 h-10 border border-border/50 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
              <service.icon size={18} className="text-muted-foreground group-hover:text-accent transition-colors duration-500" />
            </div>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 group-hover:text-accent transition-colors tracking-tight leading-[1.1]">
            {service.title}
          </h3>
          <p className="text-muted-foreground font-body text-base leading-relaxed mb-auto line-clamp-2">
            {service.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border/30">
            {service.tags.map((t) => (
              <span key={t} className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 bg-secondary/50 px-2.5 py-1 group-hover:bg-accent/10 group-hover:text-accent/80 transition-colors duration-300">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[2px] bg-border relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-accent transition-all duration-700 ease-out" />
        </div>
      </motion.div>
    </Link>
  );
};

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const totalItems = services.length + 1;
  const CARD_WIDTH = 360;

  // Track active index on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / CARD_WIDTH);
      setActiveIndex(Math.min(idx, totalItems - 1));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [totalItems]);

  // Auto-slide every 3 seconds, pause on hover
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  // Drag support
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    el.scrollLeft = dragScrollLeft.current - walk;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * CARD_WIDTH, behavior: "smooth" });
  };

  const scrollToIndex = (idx: number) => {
    scrollRef.current?.scrollTo({ left: idx * CARD_WIDTH, behavior: "smooth" });
  };

  return (
    <section className="relative py-10" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <AnimatedGrid />
      <div className="mb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center text-center gap-4 sm:gap-6">
          <SectionHeading
            tag="Services"
            title="Eighteen disciplines, one team"
            description="From pixel to pipeline. Every layer of your brand covered."
          />
          <div className="flex items-center gap-4">
            <button onClick={() => scroll(-1)} className="w-12 h-12 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors" data-cursor-hover>
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button onClick={() => scroll(1)} className="w-12 h-12 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors" data-cursor-hover>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 relative z-10 pr-6 md:pr-8 lg:pr-16 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 4rem))" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
        <Link
          to="/services"
          className="flex-shrink-0 w-[300px] md:w-[340px] border border-dashed border-border hover:border-accent flex flex-col items-center justify-center gap-4 snap-start transition-colors group"
          data-cursor-hover
        >
          <div className="w-16 h-16 border border-border group-hover:border-accent flex items-center justify-center group-hover:text-accent transition-colors">
            <ArrowRight size={24} />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-accent transition-colors">
            Explore all services
          </span>
        </Link>
      </div>
      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 mt-8 relative z-10">
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === activeIndex
                ? "w-6 h-2 bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.4)]"
                : "w-2 h-2 bg-border hover:bg-muted-foreground/50"
            }`}
            data-cursor-hover
          />
        ))}
      </div>
      {/* CTA */}
      <div className="flex justify-center mt-10 relative z-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors group"
          data-cursor-hover
        >
          View all services
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

const Index = ({ onStartProject }: { onStartProject?: () => void }) => {

  return (
    <PageTransition>
      <SEOHead
        title="MrKirof - Creative Agency for Design, Development & Digital Marketing"
        description="Remote-first creative agency with 20 specialists across 18 disciplines. 1500+ clients worldwide. Brand design, web development, motion graphics, and digital marketing."
        path="/"
      />
      <Hero onStartProject={onStartProject} />


      {/* ═══════════════════════════ STATS ═══════════════════════════ */}
      <FadeInSection style="blur">
      <section className="relative py-10 overflow-hidden" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--accent) / 0.04), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { value: 12, label: "Years", suffix: "", prefix: "", tagline: "Of dedicated work", icon: Trophy, trend: { direction: "up" as const, text: "+2 YoY" } },
              { value: 1500, label: "Clients", suffix: "+", prefix: "", tagline: "Across 14 countries", icon: Globe, trend: { direction: "up" as const, text: "+34%" } },
              { value: 3000, label: "Projects", suffix: "+", prefix: "", tagline: "Zero missed deadlines", icon: CheckCircle, trend: { direction: "up" as const, text: "+28%" } },
              { value: 500, label: "5-Star Reviews", suffix: "+", prefix: "", tagline: "Client satisfaction proof", icon: Star, trend: { direction: "up" as const, text: "+52%" } },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative py-8 md:py-10 text-center md:text-left md:pl-10 first:md:pl-0"
              >
                {i > 0 && <div className="hidden md:block absolute left-0 top-8 bottom-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, #e0e0e0, transparent)' }} />}
                {i > 0 && <div className="md:hidden absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)' }} />}
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 bg-accent text-accent-foreground"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon size={20} strokeWidth={2} />
                  </motion.div>
                  <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} label={stat.label} delay={i * 150} trend={stat.trend} />
                  <p className="font-body text-xs mt-3 tracking-wide" style={{ color: '#666666' }}>{stat.tagline}</p>
                </div>
                <div className="absolute bottom-0 left-1/2 md:left-10 -translate-x-1/2 md:translate-x-0 w-0 group-hover:w-16 h-[2px] bg-accent transition-all duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </FadeInSection>


      {/* ═══════════════════════════ SERVICES ═══════════════════════════ */}
      <FadeInSection style="scale">
      <ServicesSection />
      </FadeInSection>

      {/* ═══════════════════════════ PRICING ═══════════════════════════ */}
      <FadeInSection style="slide-left">
      <PricingSection />
      </FadeInSection>

      {/* ═══════════════════════════ BOOK A CALL ═══════════════════════════ */}
      <FadeInSection style="fade">
      <BookCallSection />
      </FadeInSection>

      {/* ═══════════════════════════ TESTIMONIALS ═══════════════════════════ */}
      <FadeInSection style="slide-right">
      <TestimonialsSection />
      </FadeInSection>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <FadeInSection style="blur">
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
        {/* Massive radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]" style={{ background: 'radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.12) 0%, hsl(var(--accent) / 0.04) 30%, transparent 60%)' }} />
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, hsl(var(--accent) / 0.03) 60deg, transparent 120deg, hsl(var(--accent) / 0.02) 240deg, transparent 360deg)' }} />
        </div>
        {/* Animated orbiting rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-accent/[0.08]"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent/30 blur-[2px]" />
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-accent/[0.05]"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-accent/20 blur-[1px]" />
          </motion.div>
        </div>
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto text-center px-6 md:px-8 lg:px-16">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/[0.06] backdrop-blur-sm">
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Available Now</span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="font-display font-extrabold mb-8 leading-[0.85] tracking-tight"
              style={{ fontSize: "2.25rem" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-foreground">Ready to build</span>
              <br />
              <span className="text-foreground">something </span>
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">extraordinary</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[3px] bg-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <span className="text-foreground">?</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground font-body text-base mb-14 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Drop us a message. We respond within 24 hours, usually faster.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link
                to="/contact"
                className="magnetic-btn relative bg-accent text-accent-foreground font-display font-extrabold px-8 py-3 rounded-full inline-flex items-center gap-3 text-base overflow-hidden group transition-all duration-500"
                data-cursor-hover
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Start a Project</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/work"
                className="magnetic-btn border border-border text-foreground font-display font-bold px-7 py-3 rounded-full inline-flex items-center gap-3 text-base hover:border-accent hover:text-accent transition-all duration-500 group"
                data-cursor-hover
              >
                See Our Work
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              className="mt-16 flex items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-12 h-px bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/50">Trusted by 1500+ brands worldwide</span>
              <div className="w-12 h-px bg-border" />
            </motion.div>
          </div>
        </div>
      </section>
      </FadeInSection>
    </PageTransition>
  );
};

export default Index;
