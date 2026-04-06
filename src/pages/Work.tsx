import { useState } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink, Layers, Smartphone, Globe, Palette, BookOpen, Car, Scissors, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BackgroundPaths from "@/components/BackgroundPaths";
import SEOHead from "@/components/SEOHead";

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const filters = ["All", "Website", "Branding", "Packaging", "Print", "Social Media"];

const projects = [
  {
    title: "Aetheris Intelligence Brand",
    category: "Brand Identity",
    filter: "Branding",
    desc: "Complete brand identity design for Aetheris Intelligence, a modern AI-focused tech brand.",
    image: "/works/aetheris-intelligence-brand.webp",
    tags: ["Branding", "AI", "Identity"],
  },
  {
    title: "Dark Tech Website Design",
    category: "Website Design",
    filter: "Website",
    desc: "Sleek, dark-themed website design for a technology company with modern UI patterns.",
    image: "/works/dark-tech-website-design.webp",
    tags: ["Web Design", "Dark UI", "Tech"],
  },
  {
    title: "BeMyTravelMuse Web Design",
    category: "Website Design",
    filter: "Website",
    desc: "Web design concept for BeMyTravelMuse, a travel blog platform with immersive visuals.",
    image: "/works/web-design-concept-for-bemytravelmuse.webp",
    tags: ["Web Design", "Travel", "Blog"],
  },
  {
    title: "Website Design",
    category: "Website Design",
    filter: "Website",
    desc: "Clean, modern website design with attention to typography and user experience.",
    image: "/works/website.webp",
    tags: ["Web Design", "UI/UX", "Modern"],
  },
  {
    title: "Principled Education Consulting Logo",
    category: "Brand Identity",
    filter: "Branding",
    desc: "Professional logo design for Principled Education Consulting, trustworthy and academic.",
    image: "/works/logo-for-principled-education-consulting.webp",
    tags: ["Logo", "Education", "Consulting"],
  },
  {
    title: "Book Cover Design",
    category: "Print Design",
    filter: "Print",
    desc: "Bold book cover design with bold visual storytelling and strong typography.",
    image: "/works/book-cover.webp",
    tags: ["Print", "Book", "Typography"],
  },
  {
    title: "Rokitta Rust Guard Packaging",
    category: "Packaging Design",
    filter: "Packaging",
    desc: "Product packaging design for Rokitta Rust Guard, clean, informative, and shelf-ready.",
    image: "/works/rokitta-rust-guard-packaging.webp",
    tags: ["Packaging", "Product", "Retail"],
  },
  {
    title: "Social Media Design",
    category: "Social Media",
    filter: "Social Media",
    desc: "Engaging social media content design with visuals that grab attention and brand consistency.",
    image: "/works/social-media.webp",
    tags: ["Social Media", "Content", "Digital"],
  },
  {
    title: "SUV Wrap Design",
    category: "Brand Identity",
    filter: "Branding",
    desc: "Bold vehicle wrap design for an SUV with high-impact mobile branding.",
    image: "/works/suv-wrap-design.webp",
    tags: ["Vehicle Wrap", "Branding", "Outdoor"],
  },
  {
    title: "Technology Meets Life",
    category: "Website Design",
    filter: "Website",
    desc: "Where technology meets everyday life, a concept design exploring human-tech harmony.",
    image: "/works/technology-meets-life.webp",
    tags: ["Concept", "Tech", "Lifestyle"],
  },
  {
    title: "Tree Cutting Service",
    category: "Brand Identity",
    filter: "Branding",
    desc: "Brand and marketing design for a professional tree cutting service company.",
    image: "/works/tree-cutting-service.webp",
    tags: ["Service", "Branding", "Local"],
  },
  {
    title: "YOLO",
    category: "Print Design",
    filter: "Print",
    desc: "Creative print design with bold expression and vibrant visual language.",
    image: "/works/yolo.webp",
    tags: ["Print", "Creative", "Bold"],
  },
];

const categoryIcons: Record<string, typeof Globe> = {
  "Website": Globe,
  "Branding": Palette,
  "Packaging": Package,
  "Print": BookOpen,
  "Social Media": Smartphone,
};

const Work = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.filter === active);

  const counts: Record<string, number> = {};
  filters.forEach(f => {
    counts[f] = f === "All" ? projects.length : projects.filter(p => p.filter === f).length;
  });

  return (
    <PageTransition>
      <SEOHead
        title="Our Work - Portfolio & Case Studies"
        description="Browse 3000+ projects across website design, branding, packaging, print, and social media. Real work, real impact from MrKirof creative agency."
        path="/work"
      />
      {/* ── Hero ── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
        <BackgroundPaths />
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-border" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Portfolio</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight mb-8">
                  Real work,<br />
                  <span className="text-gradient">real impact</span>
                </h1>
                <p className="text-muted-foreground font-body text-base leading-relaxed max-w-xl">
                  From website design to branding to packaging, every project is crafted with precision.
                </p>
              </motion.div>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl md:text-4xl font-extrabold text-accent">3000+</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Projects</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl md:text-4xl font-extrabold text-foreground">1500+</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Happy Clients</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl md:text-4xl font-extrabold text-foreground">11</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Disciplines</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <FadeIn>
        <section className="py-16 md:py-24 relative" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
            {/* Filter tabs with counts */}
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f) => {
                const Icon = categoryIcons[f];
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`font-mono text-xs uppercase tracking-[0.15em] px-4 py-2.5 transition-all duration-300 inline-flex items-center gap-2 ${
                      active === f
                        ? "text-accent-foreground bg-accent"
                        : "text-white/40 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                    data-cursor-hover
                  >
                    {Icon && <Icon size={12} />}
                    {f}
                    <span className={`ml-1 ${active === f ? "opacity-60" : "opacity-40"}`}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Project grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
              >
                {filtered.map((project, i) => {
                  const spans = [
                    "md:col-span-7 aspect-[4/3]",
                    "md:col-span-5 aspect-[4/3]",
                    "md:col-span-5 aspect-[4/3]",
                    "md:col-span-7 aspect-[4/3]",
                    "md:col-span-4 aspect-square",
                    "md:col-span-4 aspect-square",
                    "md:col-span-4 aspect-square",
                  ];
                  return (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`group relative overflow-hidden rounded-sm ${spans[i % 7]}`}
                      data-cursor-hover
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category} by MrKirof`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-50 group-hover:opacity-95 transition-opacity duration-500" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        {/* Category badge */}
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                          {project.category}
                        </span>
                        <h3 className="font-display text-base font-extrabold tracking-tight text-white leading-tight mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/50 font-body text-xs leading-relaxed max-w-sm translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 mb-3 line-clamp-2">
                          {project.desc}
                        </p>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                          {project.tags.map((t) => (
                            <span key={t} className="font-mono text-xs uppercase tracking-wider text-accent/80 bg-accent/10 px-2 py-0.5 rounded-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 left-0 w-0 h-0 group-hover:w-12 group-hover:h-12 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-accent" />
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-accent" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn>
        <section className="py-16 md:py-24 relative overflow-hidden bg-accent text-accent-foreground">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-black/[0.03] origin-center" style={{ transform: 'rotate(-12deg)' }} />
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10 px-6 md:px-8 lg:px-16">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-foreground/60 mb-10">
              <span className="w-8 h-px bg-accent-foreground/30" />
              Start Your Project
              <span className="w-8 h-px bg-accent-foreground/30" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-[0.85] tracking-tight mb-6">
              Have a project<br />in mind?
            </h2>
            <p className="text-accent-foreground/60 font-body text-base mb-14 max-w-md mx-auto leading-relaxed">
              Let's discuss how we can bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="magnetic-btn bg-background text-foreground font-display font-extrabold px-7 py-3 rounded-full inline-flex items-center gap-3 text-base hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] transition-all duration-500 group"
              data-cursor-hover
            >
              Start a Conversation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </FadeIn>
    </PageTransition>
  );
};

export default Work;
