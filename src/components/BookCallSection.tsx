import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Calendar as CalendarIcon, ArrowRight, Clock, User, Mail, MessageSquare, CheckCircle2, Sparkles, Globe } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays, startOfDay, isBefore } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import StarBorder from "@/components/StarBorder";


const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM",
];

const TIMEZONES = [
  { value: "America/New_York", label: "EST (UTC-5)", short: "EST" },
  { value: "America/Chicago", label: "CST (UTC-6)", short: "CST" },
  { value: "America/Denver", label: "MST (UTC-7)", short: "MST" },
  { value: "America/Los_Angeles", label: "PST (UTC-8)", short: "PST" },
  { value: "Europe/London", label: "GMT (UTC+0)", short: "GMT" },
  { value: "Europe/Berlin", label: "CET (UTC+1)", short: "CET" },
  { value: "Asia/Dubai", label: "GST (UTC+4)", short: "GST" },
  { value: "Asia/Kolkata", label: "IST (UTC+5:30)", short: "IST" },
  { value: "Asia/Dhaka", label: "BST (UTC+6)", short: "BST" },
  { value: "Asia/Shanghai", label: "CST (UTC+8)", short: "CST" },
  { value: "Asia/Tokyo", label: "JST (UTC+9)", short: "JST" },
  { value: "Australia/Sydney", label: "AEST (UTC+10)", short: "AEST" },
];

type Step = "date" | "time" | "details" | "confirmed";

const FloatingOrb = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, left: x, top: y, background: 'radial-gradient(circle, hsl(var(--accent) / 0.15), transparent 70%)' }}
    animate={{
      y: [0, -20, 0, 15, 0],
      x: [0, 10, -10, 5, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const BookCallSection = () => {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedTimezone, setSelectedTimezone] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return TIMEZONES.find(t => t.value === tz)?.value || "America/New_York";
    } catch { return "America/New_York"; }
  });
  const [tzDropdownOpen, setTzDropdownOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email");
      return;
    }
    setStep("confirmed");
    toast.success("Booking confirmed! We'll be in touch soon.");
  };

  const handleReset = () => {
    setStep("date");
    setSelectedDate(undefined);
    setSelectedTime("");
    setFormData({ name: "", email: "", message: "" });
    setTzDropdownOpen(false);
  };

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today) || date.getDay() === 0 || date.getDay() === 6;
  };

  const stepIndex = ["date", "time", "details", "confirmed"].indexOf(step);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Floating orbs */}
      <FloatingOrb delay={0} size={300} x="10%" y="20%" />
      <FloatingOrb delay={2} size={200} x="75%" y="60%" />
      <FloatingOrb delay={4} size={150} x="60%" y="10%" />
      <FloatingOrb delay={1} size={250} x="85%" y="30%" />

      {/* Large radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)' }} />

      {/* Animated ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-accent/[0.06] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/30 blur-[2px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/[0.06] backdrop-blur-sm mb-8"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Book a Call
                </span>
              </motion.div>

              <motion.h2
                className="font-display text-3xl md:text-4xl font-extrabold leading-[0.85] tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-foreground">Let's build</span>
                <br />
                <span className="text-foreground">something </span>
                <span className="hero-gradient-text">amazing</span>
              </motion.h2>

              <motion.p
                className="text-muted-foreground font-body text-base leading-relaxed mb-10 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Pick a date and time. We'll discuss your vision, explore possibilities, and chart a roadmap — zero commitment.
              </motion.p>

              {/* Progress indicator */}
              <motion.div
                className="flex items-center gap-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {(["Date", "Time", "Details"] as const).map((label, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <motion.div
                      className={cn(
                        "relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-2 overflow-hidden",
                        stepIndex === i + 0 ? "border-accent text-accent" :
                        stepIndex > i ? "border-accent/40 text-accent bg-accent/10" :
                        "border-border/50 text-muted-foreground/50"
                      )}
                      animate={stepIndex === i ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {/* Glow ring for active step */}
                      {stepIndex === i && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0.4), inset 0 0 10px hsl(var(--accent) / 0.1)' }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      {stepIndex > i ? <CheckCircle2 size={16} /> : i + 1}
                    </motion.div>
                    <span className={cn(
                      "font-mono text-xs uppercase tracking-wider hidden sm:inline",
                      stepIndex >= i ? "text-accent" : "text-muted-foreground/40"
                    )}>{label}</span>
                    {i < 2 && (
                      <div className="w-8 h-[2px] relative overflow-hidden">
                        <div className={cn("absolute inset-0 transition-all duration-700", stepIndex > i ? "bg-accent/40" : "bg-border/30")} />
                        {stepIndex > i && (
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-accent/60"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Features */}
              <motion.div
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {[
                  { icon: Sparkles, text: "Free consultation" },
                  { icon: CheckCircle2, text: "No commitment" },
                  { icon: Clock, text: "30 min session" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <item.icon size={12} className="text-accent" />
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right — 3D Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              {/* StarBorder wrapping the card */}
              <StarBorder
                as="div"
                color="hsl(217 92% 60%)"
                speed="5s"
                thickness={2}
                className="rounded-3xl"
              >
                <div
                  className="relative rounded-3xl overflow-hidden bg-card/95 shadow-[0_30px_80px_hsl(var(--background)/0.35)]"
                  style={{ backdropFilter: "blur(40px)" }}
                >
                  {/* Glare overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.07]"
                    style={{
                      background: useTransform(
                        [glareX, glareY],
                        ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, white, transparent 60%)`
                      ),
                    }}
                  />

                  {/* Header */}
                  <div className="px-7 py-5 border-b border-border/20 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
                        animate={{ rotate: step === "confirmed" ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CalendarIcon size={18} className="text-accent" />
                      </motion.div>
                      <div>
                        <h3 className="font-display font-bold text-base text-foreground">Discovery Call</h3>
                        <p className="font-mono text-xs text-muted-foreground mt-0.5">30 min · Free · Online</p>
                      </div>
                    </div>
                    {selectedDate && step !== "date" && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleReset}
                        className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent/80 transition-colors px-3 py-1.5 rounded-full border border-accent/20 hover:border-accent/40"
                      >
                        Reset
                      </motion.button>
                    )}
                  </div>

                  {/* Content area */}
                  <div className="p-7 min-h-[430px] flex flex-col relative z-10">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Date */}
                      {step === "date" && (
                        <motion.div
                          key="date"
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col items-center"
                        >
                          <div className="flex items-center gap-2 mb-5">
                            <CalendarIcon size={14} className="text-accent" />
                            <span className="font-display font-semibold text-base text-foreground">Pick your date</span>
                          </div>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={disabledDays}
                            className="pointer-events-auto"
                            fromDate={new Date()}
                            toDate={addDays(new Date(), 60)}
                          />
                        </motion.div>
                      )}

                      {/* Step 2: Time */}
                      {step === "time" && (
                        <motion.div
                          key="time"
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-accent" />
                              <span className="font-display font-semibold text-base text-foreground">Choose a time</span>
                            </div>
                          </div>
                          {selectedDate && (
                            <p className="font-mono text-xs text-muted-foreground mb-3">
                              📅 {format(selectedDate, "EEEE, MMMM d, yyyy")}
                              <button onClick={() => setStep("date")} className="ml-2 text-accent hover:underline">change</button>
                            </p>
                          )}

                          {/* Timezone selector */}
                          <motion.div
                            className="relative mb-4"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <button
                              type="button"
                              onClick={() => setTzDropdownOpen(!tzDropdownOpen)}
                              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-border/30 bg-secondary/30 hover:border-accent/40 hover:bg-secondary/50 transition-all text-xs font-mono"
                            >
                              <div className="flex items-center gap-2">
                                <Globe size={13} className="text-accent" />
                                <span className="text-muted-foreground">Timezone:</span>
                                <span className="text-foreground font-semibold">
                                  {TIMEZONES.find(t => t.value === selectedTimezone)?.label}
                                </span>
                              </div>
                              <motion.span
                                animate={{ rotate: tzDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-muted-foreground"
                              >
                                ▾
                              </motion.span>
                            </button>
                            <AnimatePresence>
                              {tzDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5, scaleY: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                  exit={{ opacity: 0, y: -5, scaleY: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-border/30 bg-card/98 backdrop-blur-xl shadow-2xl max-h-48 overflow-y-auto"
                                  style={{ transformOrigin: 'top' }}
                                >
                                  {TIMEZONES.map((tz) => (
                                    <button
                                      key={tz.value}
                                      onClick={() => { setSelectedTimezone(tz.value); setTzDropdownOpen(false); }}
                                      className={cn(
                                        "w-full text-left px-4 py-2.5 text-xs font-mono transition-all flex items-center justify-between",
                                        selectedTimezone === tz.value
                                          ? "bg-accent/10 text-accent"
                                          : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                                      )}
                                    >
                                      <span>{tz.label}</span>
                                      {selectedTimezone === tz.value && (
                                        <CheckCircle2 size={12} className="text-accent" />
                                      )}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                            {TIME_SLOTS.map((time, i) => (
                              <motion.button
                                key={time}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.03, duration: 0.3 }}
                                onClick={() => handleTimeSelect(time)}
                                className={cn(
                                  "relative px-3 py-3 rounded-xl border text-xs font-mono transition-all duration-300 overflow-hidden group",
                                  selectedTime === time
                                    ? "border-accent bg-accent/15 text-accent shadow-[0_0_20px_hsl(var(--accent)/0.2)]"
                                    : "border-border/30 text-muted-foreground hover:border-accent/50 hover:text-accent hover:bg-accent/5 hover:shadow-[0_0_15px_hsl(var(--accent)/0.1)]"
                                )}
                              >
                                <span className="relative z-10">{time}</span>
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Details */}
                      {step === "details" && (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <User size={14} className="text-accent" />
                            <span className="font-display font-semibold text-base text-foreground">Your details</span>
                          </div>
                          {selectedDate && (
                            <p className="font-mono text-xs text-muted-foreground mb-5">
                              📅 {format(selectedDate, "EEE, MMM d")} · ⏰ {selectedTime} · 🌍 {TIMEZONES.find(t => t.value === selectedTimezone)?.short}
                              <button onClick={() => setStep("time")} className="ml-2 text-accent hover:underline">change</button>
                            </p>
                          )}
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative">
                              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                              <Input
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                className="pl-10 h-12 rounded-xl border-border/30 bg-secondary/30 focus:border-accent/50 focus:bg-secondary/50 transition-all"
                                required
                              />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
                              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                              <Input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                className="pl-10 h-12 rounded-xl border-border/30 bg-secondary/30 focus:border-accent/50 focus:bg-secondary/50 transition-all"
                                required
                              />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
                              <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-muted-foreground/50" />
                              <Textarea
                                placeholder="Tell us about your project (optional)"
                                value={formData.message}
                                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                                className="pl-10 min-h-[80px] rounded-xl border-border/30 bg-secondary/30 focus:border-accent/50 focus:bg-secondary/50 transition-all"
                              />
                            </motion.div>
                            <motion.button
                              type="submit"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="w-full relative overflow-hidden bg-accent text-accent-foreground font-display font-bold text-base px-6 py-2.5 rounded-xl inline-flex items-center justify-center gap-3 group transition-all duration-500"
                              whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(var(--accent) / 0.4)" }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="relative z-10 flex items-center gap-3">
                                Confirm Booking
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </span>
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              />
                            </motion.button>
                          </form>
                        </motion.div>
                      )}

                      {/* Step 4: Confirmed */}
                      {step === "confirmed" && (
                        <motion.div
                          key="confirmed"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col items-center justify-center text-center flex-1"
                        >
                          {/* Success animation */}
                          <motion.div
                            className="relative mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                          >
                            <motion.div
                              className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center"
                              animate={{ boxShadow: ["0 0 0px hsl(var(--accent) / 0)", "0 0 40px hsl(var(--accent) / 0.3)", "0 0 0px hsl(var(--accent) / 0)"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <CheckCircle2 size={36} className="text-accent" />
                            </motion.div>
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                                style={{ left: "50%", top: "50%" }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                  x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                                  y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                                  opacity: 0,
                                  scale: 0,
                                }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                              />
                            ))}
                          </motion.div>

                          <motion.h3
                            className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            You're All Set! 🎉
                          </motion.h3>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <p className="text-muted-foreground font-body text-base mb-2">Your call is booked for</p>
                            <p className="font-display font-bold text-accent text-base">
                              {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                            </p>
                            <p className="font-display font-semibold text-accent text-base mb-1">
                              at {selectedTime}
                            </p>
                            <p className="font-mono text-xs text-muted-foreground mb-6">
                              🌍 {TIMEZONES.find(t => t.value === selectedTimezone)?.label}
                            </p>
                          </motion.div>
                          <motion.p
                            className="text-muted-foreground font-body text-xs max-w-xs mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            We'll send a confirmation to <strong className="text-foreground">{formData.email}</strong>
                          </motion.p>
                          <motion.button
                            onClick={handleReset}
                            className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent/80 transition-colors px-5 py-2 rounded-full border border-accent/20 hover:border-accent/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            Book another call
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </StarBorder>
            </motion.div>

            {/* Decorative corner accents */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookCallSection;
