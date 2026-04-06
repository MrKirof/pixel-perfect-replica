import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Layout, Code, BookOpen, Tag, Book, Film, Video,
  Megaphone, Search, Table, DollarSign, ArrowRight, CheckCircle2,
  Share2, PenTool, Camera, Bot, Package, BarChart3, X,
  User, Mail, Send, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ─── Service categories ─── */
const categories = [
  {
    name: "Design",
    color: "217 92% 60%",
    services: [
      { icon: Sparkles, title: "Brand & Identity", items: ["Logo Design", "Business Card", "Letterhead", "Brand Guidelines", "Visual Identity"] },
      { icon: Layout, title: "Web & App Design", items: ["Landing Page", "Full Website", "Mobile App UI", "Dashboard", "Wireframes"] },
      { icon: BookOpen, title: "Catalog & Profile", items: ["Company Profile", "Product Catalog", "Brochure", "Flyer", "Leaflet"] },
      { icon: Tag, title: "Merchandise Design", items: ["T-Shirt", "Mug", "Tote Bag", "Sticker", "Cap"] },
      { icon: Book, title: "Magazine & Book", items: ["Book Cover", "Magazine Layout", "Annual Report", "Newsletter", "eBook"] },
      { icon: Package, title: "Packaging Design", items: ["Box Design", "Label", "Pouch", "Bottle Wrap", "Unboxing Experience"] },
    ],
  },
  {
    name: "Development",
    color: "152 69% 45%",
    services: [
      { icon: Code, title: "Web & App Dev", items: ["React Website", "WordPress", "E-Commerce", "Mobile App", "Custom Web App"] },
      { icon: Table, title: "Excel & Sheets", items: ["Dashboard", "Automated Report", "Data Template", "Macro/Script", "Google Sheets"] },
      { icon: Bot, title: "AI & Automation", items: ["Chatbot", "Workflow Automation", "CRM Integration", "AI Tools", "API Integration"] },
    ],
  },
  {
    name: "Marketing",
    color: "14 90% 55%",
    services: [
      { icon: Megaphone, title: "Product Marketing", items: ["Campaign Strategy", "Landing Page", "Email Sequence", "Ad Creatives", "Funnel Setup"] },
      { icon: BarChart3, title: "Digital Marketing", items: ["Facebook Ads", "Google Ads", "Instagram Ads", "LinkedIn Ads", "Analytics Setup"] },
      { icon: Search, title: "SEO", items: ["SEO Audit", "Keyword Research", "On-Page SEO", "Blog Strategy", "Link Building"] },
      { icon: Share2, title: "Social Media", items: ["Content Calendar", "Post Design", "Reels/Shorts", "Community Management", "Growth Strategy"] },
      { icon: PenTool, title: "Copywriting & Content", items: ["Website Copy", "Blog Posts", "Ad Copy", "Email Copy", "Product Descriptions"] },
    ],
  },
  {
    name: "Production",
    color: "350 80% 55%",
    services: [
      { icon: Film, title: "Motion Graphics", items: ["Logo Animation", "Explainer Video", "Social Media Reel", "Intro/Outro", "Infographic Animation"] },
      { icon: Video, title: "Video Production", items: ["Corporate Video", "Product Video", "Testimonial", "Event Coverage", "Ad Film"] },
      { icon: Camera, title: "Photography", items: ["Product Shoot", "Lifestyle Shoot", "Corporate Headshots", "Event Photography", "Food Photography"] },
    ],
  },
  {
    name: "Business",
    color: "120 60% 40%",
    services: [
      { icon: DollarSign, title: "Accounts Management", items: ["Bookkeeping", "Invoicing", "Financial Reports", "Tax Prep", "Budget Planning"] },
    ],
  },
];

type Step = 1 | 2 | 3;

const StartProjectPopup = () => {
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const toggle = (title: string) =>
    setSelected(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in your name and email");
      return;
    }
    setStep(3);
    toast.success("Project request submitted! We'll get back within 24 hours.");
  };

  const stepLabels = ["Pick Services", "Your Info", "Done"];

  return (
    <section className="relative py-8 md:py-10 overflow-hidden rounded-2xl" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Start a Project
          </h2>
          <p className="text-muted-foreground text-sm">
            {step === 1 && "Pick the services you need — we'll handle the rest."}
            {step === 2 && "Almost there! Just your name and email."}
            {step === 3 && "We've got everything we need."}
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {stepLabels.map((label, i) => {
              const stepNum = (i + 1) as Step;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <React.Fragment key={label}>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300",
                      isDone ? "bg-accent text-accent-foreground" :
                      isActive ? "border-2 border-accent text-accent" :
                      "border border-border/30 text-muted-foreground/40"
                    )}>
                      {isDone ? <CheckCircle2 size={13} /> : stepNum}
                    </div>
                    <span className={cn(
                      "text-[11px] font-medium hidden sm:inline transition-colors",
                      isActive || isDone ? "text-foreground/80" : "text-muted-foreground/30"
                    )}>{label}</span>
                  </div>
                  {i < 2 && <div className={cn("w-8 h-px", isDone ? "bg-accent/40" : "bg-border/20")} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Categories */}
              <div className="space-y-6 mb-8">
                {categories.map(cat => (
                  <div key={cat.name}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(${cat.color})` }} />
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">{cat.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.services.map(service => {
                        const Icon = service.icon;
                        const isActive = selected.includes(service.title);
                        return (
                          <button
                            key={service.title}
                            onClick={() => toggle(service.title)}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition-all duration-200",
                              isActive
                                ? "border-accent/50 bg-accent/10 text-accent"
                                : "border-border/20 bg-white/[0.03] text-foreground/70 hover:border-border/40 hover:bg-white/[0.06]"
                            )}
                          >
                            <Icon size={15} style={isActive ? { color: `hsl(${cat.color})` } : undefined} className={!isActive ? "text-muted-foreground/50" : ""} />
                            <span className="font-medium">{service.title}</span>
                            {isActive && <CheckCircle2 size={13} className="text-accent ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected count & next */}
              <div className="flex items-center justify-between border-t border-border/10 pt-5">
                <span className="text-sm text-muted-foreground">
                  {selected.length === 0 ? "Select at least one service" : `${selected.length} service${selected.length > 1 ? "s" : ""} selected`}
                </span>
                <button
                  onClick={() => selected.length > 0 && setStep(2)}
                  disabled={selected.length === 0}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all",
                    selected.length > 0
                      ? "bg-accent text-accent-foreground hover:opacity-90"
                      : "bg-white/[0.05] text-muted-foreground/30 cursor-not-allowed"
                  )}
                >
                  Next <ChevronRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              {/* Selected summary */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-border/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50 mb-2">You picked</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50 flex items-center gap-1.5">
                    <User size={11} /> Name
                  </label>
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="bg-white/[0.04] border-border/20 rounded-xl h-12"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50 flex items-center gap-1.5">
                    <Mail size={11} /> Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="bg-white/[0.04] border-border/20 rounded-xl h-12"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-full border border-border/20 text-muted-foreground text-sm hover:text-foreground hover:border-border/40 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Submit <Send size={14} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <CheckCircle2 size={56} className="mx-auto text-accent mb-5" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">You're all set!</h3>
              <p className="text-muted-foreground text-sm">We'll review your project and get back within 24 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StartProjectPopup;
