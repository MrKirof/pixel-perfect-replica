import { useState, useRef } from "react";
import {
  Sparkles, Layout, Code, BookOpen, Tag, Book, Film, Video,
  Megaphone, Search, Table, DollarSign, ArrowRight, ChevronDown, Layers, ExternalLink, BarChart3,
  Share2, PenTool, Camera, Bot, Package
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BackgroundPaths from "@/components/BackgroundPaths";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ServiceInfographic from "@/components/ServiceInfographic";
import SEOHead from "@/components/SEOHead";

const services = [
  {
    icon: Sparkles, title: "Brand & Identity", number: "01",
    desc: "We build brand systems that communicate personality, authority, and trust from the first glance.",
    longDesc: "Our brand process starts with deep immersion into your business, audience, and competitive landscape. We distill insights into a strategic positioning framework, then translate that into a visual identity system that scales across every medium.",
    process: ["Discovery & Research", "Strategy & Positioning", "Visual Identity Design", "Brand Guidelines & Rollout"],
    deliverables: ["Logo & Marks", "Color System", "Typography", "Brand Book", "Templates"],
    example: "Noxian. Complete rebrand from logo to brand book, resulting in 3x increase in brand recall.",
    color: "217 92% 60%",
  },
  {
    icon: Layout, title: "Web & App Design", number: "02",
    desc: "Intuitive, conversion-driven interfaces that look stunning and feel effortless.",
    longDesc: "We combine user psychology with aesthetic precision. Every screen is prototyped, tested, and iterated until the experience feels natural.",
    process: ["User Research & Personas", "Information Architecture", "High-Fidelity Design", "Usability Testing & Iteration"],
    deliverables: ["Wireframes", "UI Kit", "Prototypes", "Design System", "Handoff Files"],
    example: "Blumora. Redesigned their app, improving user retention by 42% in 3 months.",
    color: "199 89% 48%",
  },
  {
    icon: Code, title: "Web & App Dev", number: "03",
    desc: "Full-stack builds. React SPAs to CMS-powered websites. Clean code, fast performance.",
    longDesc: "We engineer products that scale. Our stack is modern, our code is maintainable, and our architecture decisions are made for the long term.",
    process: ["Architecture & Planning", "Frontend Development", "Backend & API Integration", "QA, Testing & Launch"],
    deliverables: ["Source Code", "Documentation", "CI/CD Pipeline", "Hosting Setup", "Training"],
    example: "Starkline. Built a real-time financial platform handling 10K+ concurrent users.",
    color: "152 69% 45%",
  },
  {
    icon: BookOpen, title: "Catalog & Profile", number: "04",
    desc: "Print-ready editorial design that makes your business unforgettable on paper.",
    longDesc: "We transform your content into visually compelling print materials with intentional typography and balanced layouts.",
    process: ["Content Strategy & Planning", "Grid & Layout Design", "Typography & Imagery", "Print Production & QA"],
    deliverables: ["Print-Ready PDFs", "Digital Versions", "Source Files", "Style Templates"],
    example: "Crestfield. Annual report design that won a CSS Design Award.",
    color: "280 65% 55%",
  },
  {
    icon: Tag, title: "Merchandise Design", number: "05",
    desc: "Custom merch that builds team culture and brand recognition beyond the screen.",
    longDesc: "From concept to production, we design merchandise that people actually want to wear and use.",
    process: ["Concept & Ideation", "Mock-ups & Sampling", "Material & Vendor Selection", "Production Management"],
    deliverables: ["Design Files", "Production Specs", "Vendor Coordination", "Quality Control"],
    example: "Lumara. Designed a merch line that sold out in 48 hours.",
    color: "340 75% 55%",
  },
  {
    icon: Book, title: "Magazine & Book", number: "06",
    desc: "Beautiful layouts for publications, e-books, and long-form editorial projects.",
    longDesc: "We bring stories to life through thoughtful editorial design that makes content easy and enjoyable to read.",
    process: ["Grid System & Structure", "Typography & Style Selection", "Layout Execution & Proofing", "Pre-press & Production"],
    deliverables: ["Print Layouts", "Digital Editions", "Cover Design", "Template System"],
    example: "Veltro. Quarterly magazine design spanning 60 pages per issue.",
    color: "30 85% 55%",
  },
  {
    icon: Film, title: "Motion Graphics", number: "07",
    desc: "Animated explainers, logo reveals, social reels, and broadcast-ready motion content.",
    longDesc: "Motion is the language of the modern web. We create animations that tell stories and explain complex ideas simply.",
    process: ["Creative Brief & Scripting", "Storyboarding & Styleframes", "Animation & Sound Design", "Final Render & Delivery"],
    deliverables: ["Animation Files", "Social Cuts", "Sound Design", "Source Projects"],
    example: "Pivvo. Product launch video that generated 2M+ views.",
    color: "260 70% 60%",
  },
  {
    icon: Megaphone, title: "Product Marketing", number: "08",
    desc: "Strategy + execution: campaigns, creatives, and funnels that drive real growth.",
    longDesc: "We don't just run ads, we build systems that actually drive results using real data.",
    process: ["Market & Competitor Research", "Campaign Strategy & Planning", "Creative Production & A/B Testing", "Performance Tracking & Optimization"],
    deliverables: ["Campaign Strategy", "Ad Creatives", "Landing Pages", "Analytics Dashboard"],
    example: "Veltro. Growth campaign that increased qualified leads by 180%.",
    color: "14 90% 55%",
  },
  {
    icon: Search, title: "SEO", number: "09",
    desc: "Keyword research, on-page optimization, and content strategy to rank and stay ranked.",
    longDesc: "We take a technical-first approach to SEO for sustainable, long-term growth.",
    process: ["Technical Audit & Fixes", "Keyword Research & Mapping", "Content Strategy & Optimization", "Link Building & Authority"],
    deliverables: ["SEO Audit Report", "Keyword Strategy", "Content Calendar", "Monthly Reports"],
    example: "Solace Co. From page 5 to page 1 for 15 target keywords.",
    color: "170 75% 40%",
  },
  {
    icon: Table, title: "Excel & Sheets", number: "10",
    desc: "Custom dashboards, formulas, and data pipelines that save hours every week.",
    longDesc: "We turn messy spreadsheets into powerful business tools with automated workflows.",
    process: ["Requirements & Data Audit", "Formula & Logic Architecture", "Dashboard Design & Build", "Training & Documentation"],
    deliverables: ["Custom Spreadsheets", "Dashboards", "Automation Scripts", "Training Docs"],
    example: "Tethyr. Automated financial dashboard saving 10 hours/week.",
    color: "45 85% 50%",
  },
  {
    icon: DollarSign, title: "Accounts Management", number: "11",
    desc: "Income/expense tracking, invoicing, ledger management, and financial reporting.",
    longDesc: "We keep your numbers clean, invoices on time, and financial picture easy to understand.",
    process: ["System Setup & Configuration", "Data Migration & Cleanup", "Reporting Templates & Automation", "Ongoing Management & Support"],
    deliverables: ["Financial Reports", "Invoice Templates", "Ledger Management", "Tax-Ready Docs"],
    example: "Arxfield. Managed accounts for 3 years, saving $50K.",
    color: "120 60% 40%",
  },
  {
    icon: Video, title: "Video Production", number: "12",
    desc: "End-to-end video production, from concept and scripting to shooting, editing, and final delivery.",
    longDesc: "We produce cinematic brand videos, product demos, testimonials, and social content that connect with your audience and keep them watching.",
    process: ["Creative Brief & Pre-production", "Scripting & Storyboarding", "Filming & Direction", "Post-production & Color Grading"],
    deliverables: ["Raw Footage", "Edited Videos", "Social Cuts", "Thumbnail Designs", "Subtitles & Captions"],
    example: "Zenith Labs. Brand film that boosted conversions by 65% on landing pages.",
    color: "350 80% 55%",
  },
  {
    icon: BarChart3, title: "Digital Marketing", number: "13",
    desc: "Data-driven digital marketing strategies across paid ads, social media, email, and content.",
    longDesc: "We build digital marketing systems that cover everything from getting attention to keeping customers, all backed by analytics and continuous optimization.",
    process: ["Audience Research & Segmentation", "Channel Strategy & Budget Planning", "Campaign Execution & A/B Testing", "Analytics, Reporting & Optimization"],
    deliverables: ["Marketing Strategy Doc", "Ad Campaigns", "Email Sequences", "Social Media Calendar", "Performance Reports"],
    example: "Orbitra. Multi-channel campaign that delivered 320% ROI in 90 days.",
    color: "200 80% 50%",
  },
  {
    icon: Share2, title: "Social Media Management", number: "14",
    desc: "Strategic content planning, scheduling, community engagement, and growth across all platforms.",
    longDesc: "We manage your social presence end-to-end, crafting platform-specific content, building engaged communities, and turning followers into customers.",
    process: ["Platform Audit & Strategy", "Content Calendar & Creation", "Community Management & Engagement", "Analytics & Growth Optimization"],
    deliverables: ["Content Calendar", "Platform-Specific Posts", "Engagement Reports", "Growth Strategy", "Monthly Analytics"],
    example: "Velora. Grew Instagram from 2K to 85K followers in 6 months with 8% engagement rate.",
    color: "310 70% 55%",
  },
  {
    icon: PenTool, title: "Copywriting & Content", number: "15",
    desc: "Compelling copy for websites, ads, blogs, and email sequences that convert readers into customers.",
    longDesc: "Words matter. We craft persuasive, SEO-optimized content that speaks your brand's voice and drives measurable action.",
    process: ["Brand Voice & Tone Definition", "Content Strategy & Research", "Writing & Editing", "SEO Optimization & Publishing"],
    deliverables: ["Website Copy", "Blog Articles", "Ad Copy", "Email Sequences", "Style Guide"],
    example: "Nexora. Website copy rewrite that increased conversion rate by 52%.",
    color: "55 80% 50%",
  },
  {
    icon: Camera, title: "Photography", number: "16",
    desc: "Professional product shoots, team portraits, event coverage, and lifestyle photography.",
    longDesc: "We capture your brand's essence through stunning visuals, from studio product photography to on-location lifestyle shoots.",
    process: ["Creative Direction & Mood Boards", "Location Scouting & Setup", "Photo Shoot & Direction", "Post-Processing & Retouching"],
    deliverables: ["High-Res Images", "Web-Optimized Files", "Social Media Crops", "Raw Files", "Mood Board"],
    example: "Luvian. Product photography that increased e-commerce sales by 38%.",
    color: "25 90% 55%",
  },
  {
    icon: Bot, title: "AI & Automation", number: "17",
    desc: "Smart chatbots, workflow automation, and AI integrations that save time and scale operations.",
    longDesc: "We use the latest AI tools to automate repetitive tasks, build intelligent chatbots, and create custom AI-powered workflows that transform your business efficiency.",
    process: ["Workflow Audit & Opportunity Mapping", "AI Tool Selection & Architecture", "Development & Integration", "Testing, Training & Deployment"],
    deliverables: ["Custom Chatbots", "Automated Workflows", "AI Integrations", "Documentation", "Training Sessions"],
    example: "Stratos. AI chatbot handling 70% of customer queries, reducing support costs by 45%.",
    color: "185 75% 45%",
  },
  {
    icon: Package, title: "Packaging Design", number: "18",
    desc: "Standout product packaging, labels, and unboxing experiences that make your brand unforgettable.",
    longDesc: "We design packaging that sells on the shelf and delights at unboxing, combining structural innovation with stunning visual design.",
    process: ["Research & Concept Development", "Structural & Visual Design", "Prototyping & Material Selection", "Print Production & QA"],
    deliverables: ["Packaging Mockups", "Dieline Templates", "Print-Ready Files", "Material Specs", "Unboxing Guide"],
    example: "Bloomhouse. Packaging redesign that won a Dieline Award and increased shelf pickup by 60%.",
    color: "145 65% 45%",
  },
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "We listen, research, and understand your goals, audience, and competitive landscape." },
  { step: "02", title: "Strategy", desc: "We define the roadmap. scope, timelines, deliverables, and success metrics." },
  { step: "03", title: "Execution", desc: "We design and build with precision, sharing progress at every milestone." },
  { step: "04", title: "Launch & Support", desc: "We deliver polished work and stay on for optimization and support." },
];

/* ── Animated border beam ── */
const BorderBeam = ({ color, duration = 6 }: { color: string; duration?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
    <motion.div
      className="absolute w-24 h-24 rounded-full"
      style={{
        background: `radial-gradient(circle, hsl(${color} / 0.6), transparent 70%)`,
        filter: "blur(12px)",
      }}
      animate={{
        top: ["0%", "0%", "100%", "100%", "0%"],
        left: ["0%", "100%", "100%", "0%", "0%"],
        x: ["-50%", "-50%", "-50%", "-50%", "-50%"],
        y: ["-50%", "-50%", "-50%", "-50%", "-50%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
);

/* ── Magnetic Tilt Card ── */
const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      >
        {/* ── Animated border gradient ── */}
        <div
          className="absolute inset-0 rounded-2xl p-px opacity-40 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, hsl(${service.color} / 0.5), transparent 40%, transparent 60%, hsl(${service.color} / 0.3))`,
          }}
        />

        {/* ── Main card body ── */}
        <div className="relative rounded-2xl bg-card/60 backdrop-blur-xl m-px">
          {/* ── Cursor-following glow ── */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, hsl(${service.color} / 0.08), transparent 50%)`
              ),
            }}
          />

          {/* ── Border beam on hover ── */}
          {hovered && <BorderBeam color={service.color} duration={4 + index * 0.5} />}

          {/* ── Floating number ── */}
          <motion.div
            className="absolute -top-8 font-display font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: "2.25rem",
              color: `hsl(${service.color} / 0.03)`,
              right: isEven ? "20px" : "auto",
              left: isEven ? "auto" : "20px",
            }}
            animate={hovered ? {
              color: `hsl(${service.color} / 0.08)`,
              y: -10,
              scale: 1.05,
            } : {
              color: `hsl(${service.color} / 0.03)`,
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.6 }}
          >
            {service.number}
          </motion.div>

          {/* ── Content ── */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left p-8 md:p-10 relative z-10"
            data-cursor-hover
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Left: Icon + Text */}
              <div className="flex items-start gap-8 flex-1 min-w-0">
                {/* ── Animated icon container ── */}
                <div className="relative shrink-0 mt-1">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, hsl(${service.color} / 0.15), hsl(${service.color} / 0.05))`,
                      border: `1px solid hsl(${service.color} / 0.25)`,
                      boxShadow: `0 8px 40px hsl(${service.color} / 0.12), inset 0 1px 0 hsl(${service.color} / 0.15)`,
                    }}
                    animate={hovered ? {
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: `0 12px 60px hsl(${service.color} / 0.25), inset 0 1px 0 hsl(${service.color} / 0.2)`,
                    } : {
                      scale: 1,
                      rotate: 0,
                      boxShadow: `0 8px 40px hsl(${service.color} / 0.12), inset 0 1px 0 hsl(${service.color} / 0.15)`,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      animate={hovered ? { rotate: -10, scale: 1.15 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <service.icon size={28} style={{ color: `hsl(${service.color})` }} />
                    </motion.div>

                    {/* Orbiting dot */}
                    <motion.div
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: `hsl(${service.color})`,
                        boxShadow: `0 0 12px hsl(${service.color} / 0.6)`,
                        top: "-4px",
                        left: "50%",
                        transformOrigin: "50% calc(50% + 44px)",
                      }}
                      animate={hovered ? { rotate: 360, opacity: 1 } : { rotate: 0, opacity: 0 }}
                      transition={hovered ? {
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.3 },
                      } : { duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Glow ring pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `2px solid hsl(${service.color} / 0.3)` }}
                    animate={hovered ? { scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] } : { scale: 1, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: "easeOut" }}
                  />
                </div>

                {/* ── Text content ── */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    animate={hovered ? { x: 4 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold" style={{ color: `hsl(${service.color})` }}>
                      {service.number}
                    </span>
                    <motion.div className="h-px" style={{ background: `hsl(${service.color} / 0.4)` }}
                      animate={hovered ? { width: 40 } : { width: 24 }} transition={{ duration: 0.4 }} />
                    <motion.span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/50"
                      initial={{ opacity: 0, x: -10 }}
                      animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      Explore
                    </motion.span>
                  </motion.div>

                  <motion.h3
                    className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-3 transition-colors duration-500"
                    animate={hovered ? { color: `hsl(${service.color})` } : {}}
                  >
                    {service.title}
                  </motion.h3>

                  <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Right: Infographic */}
              <div className="hidden md:block w-[200px] h-[140px] shrink-0 relative">
                <ServiceInfographic serviceNumber={service.number} color={service.color} hovered={hovered} />
              </div>

              {/* ── Expand indicator ── */}
              <motion.div
                className="mt-4 shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  border: `1px solid hsl(${service.color} / ${hovered ? 0.4 : 0.15})`,
                  background: hovered ? `hsl(${service.color} / 0.1)` : "transparent",
                }}
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown size={16} style={{ color: hovered ? `hsl(${service.color})` : undefined }} className={hovered ? "" : "text-muted-foreground/50"} />
              </motion.div>
            </div>
          </button>

          {/* ── Expanded closer look with staggered animations ── */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-8 md:px-10 pb-10">
                  <motion.div
                    className="border-t pt-8 ml-24 md:ml-28"
                    style={{ borderColor: `hsl(${service.color} / 0.15)` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-3xl">
                      {service.longDesc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                      {/* Process steps with animated connectors */}
                      <div>
                        <h4
                          className="font-mono text-xs uppercase tracking-[0.3em] mb-5 flex items-center gap-3"
                          style={{ color: `hsl(${service.color})` }}
                        >
                          <span className="w-3 h-3 rounded-full" style={{ background: `hsl(${service.color})`, boxShadow: `0 0 12px hsl(${service.color} / 0.4)` }} />
                          Process
                        </h4>
                        <div className="space-y-1">
                          {service.process.map((step, i) => (
                            <motion.div
                              key={step}
                              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                              className="flex items-center gap-4 py-3 group/step"
                            >
                              <div className="relative">
                                <div
                                  className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold rounded-lg transition-all duration-300 group-hover/step:scale-110"
                                  style={{
                                    background: `hsl(${service.color} / 0.1)`,
                                    border: `1px solid hsl(${service.color} / 0.2)`,
                                    color: `hsl(${service.color})`,
                                  }}
                                >
                                  {i + 1}
                                </div>
                                {i < service.process.length - 1 && (
                                  <div
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3"
                                    style={{ background: `hsl(${service.color} / 0.15)` }}
                                  />
                                )}
                              </div>
                              <span className="text-base text-foreground/80 group-hover/step:text-foreground transition-colors">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables with animated tags */}
                      <div>
                        <h4
                          className="font-mono text-xs uppercase tracking-[0.3em] mb-5 flex items-center gap-3"
                          style={{ color: `hsl(${service.color})` }}
                        >
                          <span className="w-3 h-3 rounded-sm rotate-45" style={{ background: `hsl(${service.color})`, boxShadow: `0 0 12px hsl(${service.color} / 0.4)` }} />
                          Deliverables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((d, i) => (
                            <motion.span
                              key={d}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="text-xs font-mono px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 cursor-default hover:scale-105"
                              style={{
                                border: `1px solid hsl(${service.color} / 0.15)`,
                                background: `hsl(${service.color} / 0.05)`,
                              }}
                            >
                              {d}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Case study with animated reveal */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="rounded-xl p-5 relative overflow-hidden"
                      style={{
                        borderLeft: `3px solid hsl(${service.color})`,
                        background: `linear-gradient(135deg, hsl(${service.color} / 0.05), transparent)`,
                      }}
                    >
                      <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                        style={{
                          background: `radial-gradient(circle, hsl(${service.color} / 0.06), transparent 70%)`,
                          filter: "blur(20px)",
                        }}
                      />
                      <span
                        className="font-mono text-xs uppercase tracking-[0.3em] block mb-2"
                        style={{ color: `hsl(${service.color})` }}
                      >
                        ✦ Case Study
                      </span>
                      <p className="text-base text-muted-foreground relative z-10">{service.example}</p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom ambient glow */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none rounded-full"
            style={{
              background: `radial-gradient(ellipse, hsl(${service.color} / 0.08), transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={hovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Animated Process Card ── */
const ProcessCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ rotateY: 5, rotateX: -3, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border border-border/50 bg-card/40 backdrop-blur-md p-8 md:p-10 relative overflow-hidden rounded-2xl transition-all duration-500 hover:border-accent/40 h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 120%, hsl(var(--accent) / 0.08), transparent 60%)",
          }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Large watermark number */}
        <motion.span
          className="font-display text-4xl md:text-5xl font-black absolute top-2 right-4 select-none pointer-events-none"
          animate={hovered ? {
            color: "hsl(var(--accent) / 0.15)",
            scale: 1.1,
            y: -5,
          } : {
            color: "hsl(var(--accent) / 0.06)",
            scale: 1,
            y: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {step.step}
        </motion.span>

        <div className="relative z-10">
          {/* Animated step indicator */}
          <motion.div
            className="w-14 h-14 mb-8 flex items-center justify-center relative rounded-xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--accent) / 0.12), hsl(var(--accent) / 0.04))",
              border: "1px solid hsl(var(--accent) / 0.2)",
            }}
            animate={hovered ? {
              boxShadow: "0 8px 40px hsl(var(--accent) / 0.2)",
              scale: 1.08,
            } : {
              boxShadow: "0 4px 20px hsl(var(--accent) / 0.08)",
              scale: 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-base text-accent font-bold">{step.step}</span>

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-accent/30"
              animate={hovered ? {
                scale: [1, 1.3, 1.3],
                opacity: [0.5, 0, 0],
              } : { scale: 1, opacity: 0 }}
              transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
            />
          </motion.div>

          <h3 className="font-display text-base md:text-3xl md:text-4xl font-bold mb-3 group-hover:text-accent transition-colors duration-500">{step.title}</h3>
          <p className="text-muted-foreground text-base leading-relaxed">{step.desc}</p>
        </div>

        {/* Connector arrow */}
        {index < processSteps.length - 1 && (
          <div className="hidden md:flex absolute top-1/2 -right-5 z-20 items-center justify-center">
            <motion.div
              className="w-10 h-10 flex items-center justify-center bg-card border border-border/50 rounded-full"
              animate={hovered ? { scale: 1.15, borderColor: "hsl(var(--accent) / 0.4)" } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={14} className="text-accent/60" />
            </motion.div>
          </div>
        )}

        {/* Top glow line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)" }}
          animate={hovered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const ref = useScrollReveal();

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="section-padding pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
        <BackgroundPaths />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <Layers size={14} className="text-accent" />
                  <div className="w-8 h-px bg-accent/30" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">What We Do</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight mb-8">
                  End-to-end<br />
                  solutions,{" "}
                  <span className="text-gradient">expertly</span>
                  <br />delivered
                </h1>
              </motion.div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  From concept to launch and beyond, we offer a comprehensive
                  suite of 11 specialized services to help you build, grow, and
                  dominate your market.
                </p>
                <div className="flex items-center gap-6">
                  {[
                    { val: "11", label: "Services", accent: true },
                    { val: "3000+", label: "Projects", accent: false },
                    { val: "100%", label: "Satisfaction", accent: false },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6">
                      {i > 0 && <div className="w-px h-12 bg-border" />}
                      <div>
                        <span className={`font-display text-3xl md:text-4xl font-extrabold ${stat.accent ? "text-accent" : "text-foreground"}`}>
                          {stat.val}
                        </span>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="surface section-padding pt-0" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="surface section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="hr-gradient mb-20" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <Layers size={14} className="text-accent" />
                <div className="w-8 h-px bg-accent/30" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">How We Work</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight">
                A process<br />built for{" "}
                <span className="text-gradient">results</span>
              </h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                Every project follows our proven four-phase methodology, ensuring
                clarity, alignment, and exceptional output from day one.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((p, i) => (
              <ProcessCard key={p.step} step={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="surface section-padding relative overflow-hidden">
        <div className="hr-gradient mb-20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-accent border border-accent/30 px-4 py-1.5 mb-8 rounded-full">
              Ready to start?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-[0.9] tracking-tight mb-6">
              Let's build something{" "}
              <span className="text-gradient">extraordinary</span>
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-xl mx-auto">
              Tell us about your project and we'll get back within 24 hours with a tailored proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-accent text-accent-foreground font-display font-bold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity inline-flex items-center gap-2 hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] transition-all duration-500"
                data-cursor-hover
              >
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <Link
                to="/work"
                className="border border-border text-foreground font-display font-bold px-6 py-2.5 rounded-full hover:border-accent/50 transition-colors inline-flex items-center gap-2"
                data-cursor-hover
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="morphing-orb w-[500px] h-[500px]" />
        </div>
      </section>
    </PageTransition>
  );
};

export default Services;
