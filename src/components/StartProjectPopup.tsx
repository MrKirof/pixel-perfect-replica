import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Layout, Code, BookOpen, Tag, Book, Film, Video,
  Megaphone, Search, Table, DollarSign, ArrowRight, CheckCircle2,
  Share2, PenTool, Camera, Bot, Package, BarChart3, X,
  HelpCircle, ArrowLeft, Clock, Zap, Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Sparkles, title: "Brand & Identity", number: "01", color: "217 92% 60%",
    desc: "Build brand systems that communicate personality & trust.",
    details: "We craft complete brand ecosystems — from logo design and color palettes to typography systems, brand guidelines, and visual language that resonates with your audience.",
    deliverables: ["Logo & Variations", "Brand Guidelines", "Color System", "Typography Kit", "Brand Collateral"],
    timeline: "2–4 weeks",
    popular: true,
  },
  {
    icon: Layout, title: "Web & App Design", number: "02", color: "199 89% 48%",
    desc: "Intuitive, conversion-driven interfaces.",
    details: "Research-backed design that turns visitors into customers. We design wireframes, prototypes, and pixel-perfect interfaces optimized for engagement and usability.",
    deliverables: ["User Research", "Wireframes", "UI Design", "Prototyping", "Design System"],
    timeline: "3–6 weeks",
    popular: true,
  },
  {
    icon: Code, title: "Web & App Dev", number: "03", color: "152 69% 45%",
    desc: "Full-stack builds with blazing performance.",
    details: "From landing pages to complex web apps and mobile applications. We build with modern frameworks, ensuring speed, scalability, and clean code.",
    deliverables: ["Frontend Dev", "Backend API", "Database Design", "Deployment", "Maintenance"],
    timeline: "4–12 weeks",
    popular: true,
  },
  {
    icon: BookOpen, title: "Catalog & Profile", number: "04", color: "280 65% 55%",
    desc: "Print-ready editorial design.",
    details: "Professionally designed catalogs, company profiles, and brochures that showcase your products and services with stunning layouts.",
    deliverables: ["Layout Design", "Print-Ready Files", "Digital Version", "Photography Direction", "Copywriting Support"],
    timeline: "2–3 weeks",
    popular: false,
  },
  {
    icon: Tag, title: "Merchandise Design", number: "05", color: "340 75% 55%",
    desc: "Custom merch that builds brand recognition.",
    details: "T-shirts, mugs, stickers, tote bags — we design merchandise that people actually want to wear and use, turning customers into brand ambassadors.",
    deliverables: ["Merch Concepts", "Print Files", "Mockups", "Vendor Coordination", "Packaging"],
    timeline: "1–2 weeks",
    popular: false,
  },
  {
    icon: Book, title: "Magazine & Book", number: "06", color: "30 85% 55%",
    desc: "Beautiful layouts for publications.",
    details: "Editorial design for magazines, books, annual reports, and newsletters. We handle typography, layout, and production-ready files.",
    deliverables: ["Cover Design", "Interior Layout", "Typography", "Print Prep", "eBook Format"],
    timeline: "3–6 weeks",
    popular: false,
  },
  {
    icon: Film, title: "Motion Graphics", number: "07", color: "260 70% 60%",
    desc: "Animated explainers & broadcast motion.",
    details: "Eye-catching animations for social media, presentations, ads, and broadcast. From logo reveals to full explainer videos with motion design.",
    deliverables: ["Storyboard", "Animation", "Sound Design", "Multiple Formats", "Source Files"],
    timeline: "2–4 weeks",
    popular: false,
  },
  {
    icon: Megaphone, title: "Product Marketing", number: "08", color: "14 90% 55%",
    desc: "Campaigns & funnels that drive growth.",
    details: "Strategic marketing campaigns including landing pages, email sequences, ad creatives, and conversion funnels designed to maximize ROI.",
    deliverables: ["Strategy Doc", "Campaign Creatives", "Landing Pages", "Email Sequences", "Analytics Setup"],
    timeline: "2–4 weeks",
    popular: false,
  },
  {
    icon: Search, title: "SEO", number: "09", color: "170 75% 40%",
    desc: "Rank and stay ranked organically.",
    details: "Technical SEO audits, keyword research, on-page optimization, content strategy, and link building to boost your organic search visibility.",
    deliverables: ["SEO Audit", "Keyword Research", "On-Page Optimization", "Content Plan", "Monthly Reports"],
    timeline: "Ongoing",
    popular: false,
  },
  {
    icon: Table, title: "Excel & Sheets", number: "10", color: "45 85% 50%",
    desc: "Custom dashboards & data pipelines.",
    details: "Advanced spreadsheet solutions — custom dashboards, automated reports, data analysis templates, and workflow automation with Google Sheets or Excel.",
    deliverables: ["Custom Templates", "Automated Reports", "Data Dashboards", "Macros/Scripts", "Training"],
    timeline: "1–2 weeks",
    popular: false,
  },
  {
    icon: DollarSign, title: "Accounts Management", number: "11", color: "120 60% 40%",
    desc: "Financial tracking & reporting.",
    details: "Bookkeeping, invoicing, financial reporting, and accounts management to keep your business finances organized and transparent.",
    deliverables: ["Bookkeeping", "Financial Reports", "Invoice Management", "Tax Preparation", "Budget Planning"],
    timeline: "Ongoing",
    popular: false,
  },
  {
    icon: Video, title: "Video Production", number: "12", color: "350 80% 55%",
    desc: "End-to-end video from concept to delivery.",
    details: "Complete video production — scripting, shooting, editing, color grading, and delivery. Corporate videos, ads, testimonials, and social content.",
    deliverables: ["Script & Concept", "Filming", "Editing & Color", "Sound Mixing", "Final Delivery"],
    timeline: "2–6 weeks",
    popular: true,
  },
  {
    icon: BarChart3, title: "Digital Marketing", number: "13", color: "200 80% 50%",
    desc: "Data-driven multi-channel marketing.",
    details: "Facebook, Google, Instagram, LinkedIn ads and campaigns. We plan, execute, and optimize multi-channel digital marketing strategies.",
    deliverables: ["Ad Strategy", "Campaign Setup", "Creative Assets", "A/B Testing", "Performance Reports"],
    timeline: "Ongoing",
    popular: true,
  },
  {
    icon: Share2, title: "Social Media", number: "14", color: "310 70% 55%",
    desc: "Content planning & community growth.",
    details: "Content calendars, post design, community management, and growth strategies for Instagram, Facebook, LinkedIn, TikTok, and more.",
    deliverables: ["Content Calendar", "Post Designs", "Community Management", "Growth Strategy", "Analytics"],
    timeline: "Ongoing",
    popular: false,
  },
  {
    icon: PenTool, title: "Copywriting & Content", number: "15", color: "55 80% 50%",
    desc: "Compelling copy that converts.",
    details: "Website copy, blog posts, ad copy, email newsletters, and content strategy. Words that connect with your audience and drive action.",
    deliverables: ["Website Copy", "Blog Articles", "Ad Copy", "Email Content", "Content Strategy"],
    timeline: "1–3 weeks",
    popular: false,
  },
  {
    icon: Camera, title: "Photography", number: "16", color: "25 90% 55%",
    desc: "Professional product & lifestyle shoots.",
    details: "Product photography, lifestyle shoots, corporate headshots, and event coverage. Professional editing and retouching included.",
    deliverables: ["Photo Shoot", "Retouching", "Multiple Formats", "Usage Rights", "Raw Files"],
    timeline: "1–2 weeks",
    popular: false,
  },
  {
    icon: Bot, title: "AI & Automation", number: "17", color: "185 75% 45%",
    desc: "Smart chatbots & workflow automation.",
    details: "Custom AI chatbots, workflow automation, CRM integrations, and intelligent tools that save time and improve customer experience.",
    deliverables: ["AI Chatbot", "Workflow Automation", "CRM Integration", "Custom Tools", "Training & Docs"],
    timeline: "3–6 weeks",
    popular: false,
  },
  {
    icon: Package, title: "Packaging Design", number: "18", color: "145 65% 45%",
    desc: "Eye-catching packaging & unboxing.",
    details: "Product packaging, box design, label design, and unboxing experiences that stand out on shelves and delight customers.",
    deliverables: ["Packaging Concept", "Dieline & Layout", "3D Mockups", "Print-Ready Files", "Vendor Specs"],
    timeline: "2–4 weeks",
    popular: false,
  },
];

type Step = "select" | "details" | "confirmed";

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size, left: x, top: y,
      background: `radial-gradient(circle, hsl(var(--accent) / 0.2), transparent 70%)`,
    }}
    animate={{
      y: [0, -30, 0, 20, 0],
      x: [0, 15, -15, 8, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      opacity: [0.2, 0.5, 0.2, 0.4, 0.2],
    }}
    transition={{ duration: 10, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const ServiceDetailPanel = ({
  service,
  isSelected,
  onToggle,
  onClose,
}: {
  service: typeof services[0];
  isSelected: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-full rounded-2xl border border-accent/20 bg-accent/[0.04] backdrop-blur-sm p-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: `hsl(${service.color})` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{ backgroundColor: `hsl(${service.color} / 0.15)` }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon size={26} style={{ color: `hsl(${service.color})` }} />
            </motion.div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-1">
                Service {service.number}
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] border border-border/20 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5 max-w-2xl">
          {service.details}
        </p>

        {/* Info row */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-border/10">
            <Clock size={13} className="text-muted-foreground/50" />
            <span className="font-mono text-[11px] text-muted-foreground/70">{service.timeline}</span>
          </div>
          {service.popular && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
              <Star size={13} className="text-accent" />
              <span className="font-mono text-[11px] text-accent">Popular</span>
            </div>
          )}
        </div>

        {/* Deliverables */}
        <div className="mb-6">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-3">
            What you get
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.deliverables.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-border/15"
              >
                <Zap size={11} style={{ color: `hsl(${service.color})` }} />
                <span className="font-body text-xs text-foreground/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Select button */}
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "px-6 py-2.5 rounded-full font-display font-bold text-sm transition-all duration-300 flex items-center gap-2",
            isSelected
              ? "bg-accent/20 text-accent border border-accent/30"
              : "bg-accent text-accent-foreground"
          )}
        >
          {isSelected ? (
            <>
              <CheckCircle2 size={15} /> Selected
            </>
          ) : (
            <>
              <ArrowRight size={15} /> Select This Service
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const StartProjectPopup = () => {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", budget: "", message: "" });

  const toggleService = (title: string) => {
    setSelected(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );
  };

  const handleCardClick = (title: string) => {
    setExpandedService(prev => (prev === title ? null : title));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }
    setStep("confirmed");
    toast.success("Project request submitted! We'll get back to you within 24 hours.");
  };

  return (
    <section className="relative py-8 md:py-12 overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <FloatingParticle delay={0} size={200} x="5%" y="10%" />
      <FloatingParticle delay={2} size={150} x="80%" y="20%" />
      <FloatingParticle delay={4} size={180} x="70%" y="70%" />
      <FloatingParticle delay={1} size={120} x="15%" y="80%" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--accent) / 0.06), transparent 70%)' }} />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/[0.05] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/20 blur-[2px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/15 blur-[1px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-accent/20 bg-accent/[0.06] backdrop-blur-sm mb-5"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Start a Project</span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-foreground">What do you need </span>
            <span className="hero-gradient-text">built?</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-body text-sm max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Click any service to see full details — then select what you need.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {(["Services", "Details", "Done"] as const).map((label, i) => {
              const stepIndex = ["select", "details", "confirmed"].indexOf(step);
              return (
                <div key={label} className="flex items-center gap-3">
                  <motion.div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500",
                      stepIndex === i ? "border-accent text-accent" :
                      stepIndex > i ? "border-accent/40 text-accent bg-accent/10" :
                      "border-border/30 text-muted-foreground/40"
                    )}
                    animate={stepIndex === i ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {stepIndex > i ? <CheckCircle2 size={14} /> : i + 1}
                  </motion.div>
                  <span className={cn(
                    "font-mono text-[10px] uppercase tracking-wider hidden sm:inline",
                    stepIndex >= i ? "text-accent" : "text-muted-foreground/30"
                  )}>{label}</span>
                  {i < 2 && (
                    <div className="w-6 h-[2px] relative overflow-hidden">
                      <div className={cn("absolute inset-0", stepIndex > i ? "bg-accent/30" : "bg-border/20")} />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6">
                {services.map((service, i) => {
                  const Icon = service.icon;
                  const isSelected = selected.includes(service.title);
                  const isExpanded = expandedService === service.title;
                  return (
                    <React.Fragment key={service.title}>
                      <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => handleCardClick(service.title)}
                        className={cn(
                          "relative group rounded-2xl p-4 text-left transition-all duration-400 border overflow-hidden",
                          isExpanded
                            ? "border-accent/60 bg-accent/[0.12] ring-1 ring-accent/20"
                            : isSelected
                              ? "border-accent/50 bg-accent/[0.08]"
                              : "border-border/20 bg-white/[0.02] hover:border-border/40 hover:bg-white/[0.04]"
                        )}
                      >
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                            >
                              <CheckCircle2 size={12} className="text-accent-foreground" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="relative mb-3">
                          <motion.div
                            className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                            style={{ backgroundColor: `hsl(${service.color} / 0.1)` }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon size={18} style={{ color: `hsl(${service.color})` }} />
                          </motion.div>
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">
                          {service.number}
                        </div>
                        <h3 className="font-display font-bold text-xs text-foreground leading-tight mb-1">
                          {service.title}
                        </h3>
                        <p className="font-body text-[10px] text-muted-foreground/60 leading-relaxed line-clamp-2">
                          {service.desc}
                        </p>
                        {/* View details hint */}
                        <div className="mt-2 font-mono text-[9px] text-accent/60 flex items-center gap-1 group-hover:text-accent transition-colors">
                          <ArrowRight size={9} /> View details
                        </div>
                      </motion.button>

                      {/* Expanded detail panel - inserted after the card */}
                      <AnimatePresence>
                        {isExpanded && (
                          <ServiceDetailPanel
                            service={service}
                            isSelected={isSelected}
                            onToggle={() => toggleService(service.title)}
                            onClose={() => setExpandedService(null)}
                          />
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}

                {/* Other option */}
                <motion.button
                  onClick={() => {
                    toggleService("Other");
                    setExpandedService(null);
                  }}
                  className={cn(
                    "relative group rounded-2xl p-4 text-left transition-all duration-400 border overflow-hidden",
                    selected.includes("Other")
                      ? "border-accent/50 bg-accent/[0.08]"
                      : "border-dashed border-border/30 bg-white/[0.01] hover:border-border/40 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="relative mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center border border-dashed border-border/30">
                      <HelpCircle size={18} className="text-muted-foreground/50" />
                    </div>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Custom</div>
                  <h3 className="font-display font-bold text-xs text-foreground leading-tight mb-1">Something Else</h3>
                  <p className="font-body text-[10px] text-muted-foreground/60 leading-relaxed">Describe your unique project idea.</p>
                </motion.button>
              </div>

              <AnimatePresence>
                {selected.includes("Other") && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                    <Input placeholder="Describe your custom project..." value={otherText} onChange={e => setOtherText(e.target.value)} className="bg-white/[0.04] border-border/20 text-foreground rounded-xl h-11" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  {selected.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 font-mono text-[10px] text-accent">
                      {s}
                      <button onClick={() => toggleService(s)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => selected.length > 0 && setStep("details")}
                  disabled={selected.length === 0}
                  className={cn("px-6 py-2.5 rounded-full font-display font-bold text-sm transition-all", selected.length > 0 ? "bg-accent text-accent-foreground" : "bg-white/[0.05] text-muted-foreground/30")}
                >
                  Next <ArrowRight size={14} className="inline ml-2" />
                </button>
              </div>
            </motion.div>
          )}
          {step === "details" && (
            <motion.div key="details" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="max-w-md mx-auto">
              {/* Selected services summary */}
              <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-border/15">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-3">Selected Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-[11px] text-accent">
                      <CheckCircle2 size={11} /> {s}
                    </span>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                    <User size={12} /> Your Name
                  </label>
                  <Input placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="bg-white/[0.04] border-border/20 rounded-xl h-12 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                    <Mail size={12} /> Email Address
                  </label>
                  <Input type="email" placeholder="e.g. john@company.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="bg-white/[0.04] border-border/20 rounded-xl h-12 text-sm" />
                </div>
                <div className="flex justify-between pt-6">
                  <button type="button" onClick={() => setStep("select")} className="text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors px-4 py-2.5 rounded-full border border-border/20 hover:border-border/40">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-bold flex items-center gap-2"
                  >
                    Submit <Send size={14} />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
          {step === "confirmed" && (
            <motion.div key="confirmed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <CheckCircle2 size={64} className="mx-auto text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
              <p className="text-muted-foreground">We'll review your project and get back within 24 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StartProjectPopup;
