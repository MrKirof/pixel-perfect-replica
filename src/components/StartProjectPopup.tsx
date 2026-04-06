import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Layout, Code, BookOpen, Tag, Book, Film, Video,
  Megaphone, Search, Table, DollarSign, ArrowRight, CheckCircle2,
  Share2, PenTool, Camera, Bot, Package, BarChart3, X,
  HelpCircle, User, Mail, MessageSquare, Layers, Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const services = [
  { icon: Sparkles, title: "Brand & Identity", number: "01", color: "217 92% 60%", desc: "Build brand systems that communicate personality & trust." },
  { icon: Layout, title: "UI/UX Design", number: "02", color: "199 89% 48%", desc: "Intuitive, conversion-driven interfaces." },
  { icon: Code, title: "Web & App Dev", number: "03", color: "152 69% 45%", desc: "Full-stack builds with blazing performance." },
  { icon: BookOpen, title: "Catalog & Profile", number: "04", color: "280 65% 55%", desc: "Print-ready editorial design." },
  { icon: Tag, title: "Merchandise Design", number: "05", color: "340 75% 55%", desc: "Custom merch that builds brand recognition." },
  { icon: Book, title: "Magazine & Book", number: "06", color: "30 85% 55%", desc: "Beautiful layouts for publications." },
  { icon: Film, title: "Motion Graphics", number: "07", color: "260 70% 60%", desc: "Animated explainers & broadcast motion." },
  { icon: Megaphone, title: "Product Marketing", number: "08", color: "14 90% 55%", desc: "Campaigns & funnels that drive growth." },
  { icon: Search, title: "SEO", number: "09", color: "170 75% 40%", desc: "Rank and stay ranked organically." },
  { icon: Table, title: "Excel & Sheets", number: "10", color: "45 85% 50%", desc: "Custom dashboards & data pipelines." },
  { icon: DollarSign, title: "Accounts Management", number: "11", color: "120 60% 40%", desc: "Financial tracking & reporting." },
  { icon: Video, title: "Video Production", number: "12", color: "350 80% 55%", desc: "End-to-end video from concept to delivery." },
  { icon: BarChart3, title: "Digital Marketing", number: "13", color: "200 80% 50%", desc: "Data-driven multi-channel marketing." },
  { icon: Share2, title: "Social Media", number: "14", color: "310 70% 55%", desc: "Content planning & community growth." },
  { icon: PenTool, title: "Copywriting & Content", number: "15", color: "55 80% 50%", desc: "Compelling copy that converts." },
  { icon: Camera, title: "Photography", number: "16", color: "25 90% 55%", desc: "Professional product & lifestyle shoots." },
  { icon: Bot, title: "AI & Automation", number: "17", color: "185 75% 45%", desc: "Smart chatbots & workflow automation." },
  { icon: Package, title: "Packaging Design", number: "18", color: "145 65% 45%", desc: "Eye-catching packaging & unboxing." },
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

const StartProjectPopup = () => {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", budget: "", message: "" });

  const toggleService = (title: string) => {
    setSelected(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );
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

  const budgetOptions = ["< $1K", "$1K - $5K", "$5K - $15K", "$15K - $50K", "$50K+"];

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
            Select one or more services below — or describe your custom project.
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
                  return (
                    <motion.button
                      key={service.title}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => toggleService(service.title)}
                      className={cn(
                        "relative group rounded-2xl p-4 text-left transition-all duration-400 border overflow-hidden",
                        isSelected
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
                    </motion.button>
                  );
                })}
                <motion.button
                  onClick={() => toggleService("Other")}
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
            <motion.div key="details" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your name *" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="bg-white/[0.04] border-border/20 rounded-xl h-11" />
                  <Input type="email" placeholder="Email address *" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="bg-white/[0.04] border-border/20 rounded-xl h-11" />
                </div>
                <Input placeholder="Company / Brand name" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} className="bg-white/[0.04] border-border/20 rounded-xl h-11" />
                <Textarea placeholder="Tell us about your project..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} className="bg-white/[0.04] border-border/20 rounded-xl min-h-[100px]" />
                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => setStep("select")} className="text-muted-foreground">Back</button>
                  <button type="submit" className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-bold">Submit Project</button>
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
