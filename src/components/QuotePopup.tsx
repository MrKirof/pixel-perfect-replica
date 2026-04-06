import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, Zap, Crown, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const planIcons: Record<string, React.ElementType> = {
  Starter: Zap,
  Professional: Crown,
  Enterprise: Rocket,
};

const planGradients: Record<string, string> = {
  Starter: "from-[hsl(220,60%,50%)] to-[hsl(200,80%,45%)]",
  Professional: "from-[hsl(var(--accent))] to-[hsl(var(--cyan))]",
  Enterprise: "from-[hsl(260,60%,55%)] to-[hsl(280,70%,50%)]",
};

interface QuotePopupProps {
  planName: string | null;
  features: string[];
}

const QuotePopup = ({ planName, features }: QuotePopupProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const Icon = planName ? planIcons[planName] || Zap : Zap;
  const gradient = planName ? planGradients[planName] || planGradients.Starter : planGradients.Starter;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setSubmitted(true);
    toast.success("Quote request sent! We'll get back within 24 hours.");
  };

  return (
    <section className="relative py-8 md:py-10 overflow-hidden rounded-2xl" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="max-w-md mx-auto px-6 md:px-10 relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Plan header */}
              <div className="text-center mb-6">
                <div className={cn("w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br", gradient)}>
                  <Icon size={24} className="text-white" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-1">
                  {planName} Plan
                </h2>
                <p className="text-muted-foreground text-sm">
                  Get a custom quote for your project
                </p>
              </div>

              {/* Features summary */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-border/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50 mb-3">What's included</div>
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 size={12} className="text-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/50 flex items-center gap-1.5">
                    <Mail size={11} /> Your Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-white/[0.04] border-border/20 rounded-xl h-12"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Request Quote <Send size={14} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="done"
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
              <h3 className="text-xl font-bold mb-2">Quote requested!</h3>
              <p className="text-muted-foreground text-sm">
                We'll review your {planName} plan requirements and get back within 24 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuotePopup;