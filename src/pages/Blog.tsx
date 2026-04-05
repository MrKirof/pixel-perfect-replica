import { useState, useMemo } from "react";
import { ArrowRight, ArrowUpRight, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BackgroundPaths from "@/components/BackgroundPaths";

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

const categories = ["All", "Branding", "Development", "Design", "Finance", "Marketing", "SEO"];

const articles = [
  {
    title: "Why Your Brand Identity Is Costing You Clients",
    author: "Elena Marsh",
    role: "Editorial Designer",
    tag: "Branding",
    date: "March 15, 2025",
    read: "5 min",
    excerpt: "Most founders treat branding as a logo. That mindset is bleeding customers. Here's why a systematic brand identity is your most undervalued growth lever, and how to fix it.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    title: "The Founder's Guide to a High-Converting Website",
    author: "Tariq Hussain",
    role: "Lead Frontend Developer",
    tag: "Development",
    date: "February 28, 2025",
    read: "8 min",
    excerpt: "Your website isn't a brochure, it's your best salesperson. We break down the exact anatomy of sites that convert at 5x the industry average.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    title: "5 Excel Tricks That Will Save Your Finance Team Hours",
    author: "Preet Kaur",
    role: "SEO & Content Strategist",
    tag: "Finance",
    date: "January 20, 2025",
    read: "4 min",
    excerpt: "Stop doing things manually. These five formulas and automation patterns have saved our clients a combined 500+ hours per year.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    title: "Motion Graphics vs. Static Ads: What Actually Converts?",
    author: "Ryu Tanaka",
    role: "Motion Designer",
    tag: "Marketing",
    date: "December 10, 2024",
    read: "6 min",
    excerpt: "We tested both across 12 campaigns. The results surprised us. and they'll change how you think about ad creative forever.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    title: "The Psychology of Color in UI Design",
    author: "Kaira Jevenu",
    role: "UI/UX Design Lead",
    tag: "Design",
    date: "November 18, 2024",
    read: "7 min",
    excerpt: "Color isn't decoration, it's communication. Learn how the right palette can increase conversions by 24% and reduce cognitive load.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    title: "SEO in 2025: What's Changed, What Hasn't",
    author: "Preet Kaur",
    role: "SEO & Content Strategist",
    tag: "SEO",
    date: "October 5, 2024",
    read: "10 min",
    excerpt: "AI overviews, zero-click searches, and the death of keyword stuffing. Here's your updated playbook for ranking in 2025.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    title: "How We Built a Real-Time Dashboard in 3 Weeks",
    author: "Tariq Hussain",
    role: "Lead Frontend Developer",
    tag: "Development",
    date: "September 12, 2024",
    read: "12 min",
    excerpt: "A technical deep-dive into the Starkline project. React, WebSockets, and the architecture decisions that made it scale.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&hue=180",
    featured: false,
  },
  {
    title: "The Complete Guide to Catalog Design",
    author: "Elena Marsh",
    role: "Editorial Designer",
    tag: "Design",
    date: "August 8, 2024",
    read: "9 min",
    excerpt: "From grid systems to paper stock. everything you need to know about creating catalogs that people actually keep.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=500&fit=crop",
    featured: false,
  },
];

const Blog = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const featured = articles.find((a) => a.featured);

  const filtered = useMemo(() => {
    let result = articles.filter((a) => !a.featured);
    if (activeTag !== "All") result = result.filter((a) => a.tag === activeTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.tag.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTag, search]);

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="pt-32 md:pt-44 pb-24 md:pb-36 relative overflow-hidden">
        <BackgroundPaths />
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-border" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Blog</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight mb-8">
              Ideas, guides &<br />
              <span className="text-gradient">insights</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg md:text-xl leading-relaxed max-w-xl">
              Thoughts on design, development, finance, and building things that last. from the team at MR Kirof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && (
        <FadeIn>
          <section className="surface py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
              <div className="group relative overflow-hidden" data-cursor-hover>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-card/60 border border-border p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-[9px] uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-1">{featured.tag}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent border border-accent/30 px-2.5 py-1">Featured</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground font-body text-base leading-relaxed mb-8">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-[10px] text-muted-foreground">{featured.author}</span>
                      <span className="text-border">·</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{featured.date}</span>
                      <span className="text-border">·</span>
                      <span className="font-mono text-[10px] text-muted-foreground inline-flex items-center gap-1">
                        <Clock size={10} /> {featured.read}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 font-mono text-sm text-accent group-hover:gap-3 transition-all">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* ── Category Filter + Articles ── */}
      <FadeIn>
        <section className="surface py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            {/* Search + Category pills */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTag(cat)}
                  className={`font-mono text-[10px] uppercase tracking-[0.15em] px-4 py-2 transition-all duration-300 ${
                    activeTag === cat
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground border border-border/40 hover:border-foreground/30 hover:text-foreground"
                  }`}
                  data-cursor-hover
                >
                  {cat}
                </button>
              ))}
              </div>
              <div className="relative w-full md:w-72">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-card border border-border pl-10 pr-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-muted-foreground/30"
                />
              </div>
            </div>

            {/* Articles grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((article, i) => (
                  <motion.article
                    key={article.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group border border-border/30 hover:border-accent/40 transition-all duration-500 overflow-hidden"
                    data-cursor-hover
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[9px] uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-1">
                          {article.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-[9px] text-muted-foreground">{article.date}</span>
                        <span className="text-border">·</span>
                        <span className="font-mono text-[9px] text-muted-foreground inline-flex items-center gap-1">
                          <Clock size={9} /> {article.read}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold leading-snug tracking-tight mb-3 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-muted-foreground/60">{article.author}</span>
                        <ArrowUpRight size={14} className="text-muted-foreground/30 group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-mono text-sm">No articles in this category yet.</p>
              </div>
            )}
          </div>
        </section>
      </FadeIn>

      {/* ── Newsletter CTA ── */}
      <FadeIn>
        <section className="surface py-24 md:py-36 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 text-center">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
              <span className="w-8 h-px bg-accent" />
              Stay Updated
              <span className="w-8 h-px bg-accent" />
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-[0.9] mb-6">
              Get insights<br />delivered <span className="text-gradient">weekly</span>
            </h2>
            <p className="text-muted-foreground font-body text-base mb-10 max-w-md mx-auto leading-relaxed">
              No spam. Just actionable insights on design, development, and growth, straight from our studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-card border border-border px-5 py-4 font-body text-sm text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30"
              />
              <button
                className="magnetic-btn bg-accent text-accent-foreground font-display font-bold px-8 py-4 inline-flex items-center justify-center gap-2 hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] transition-all duration-500"
                data-cursor-hover
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
            <p className="font-mono text-[9px] text-muted-foreground/40 mt-4">
              Join 2,000+ founders and creatives. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </FadeIn>
    </PageTransition>
  );
};

export default Blog;
