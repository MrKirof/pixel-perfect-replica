import { useRef } from "react";
import { ArrowRight, Check, Zap, Crown, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const plans = [
  {
    name: "Starter",
    tagline: "Essential branding & online presence",
    icon: Zap,
    features: [
      "Brand Identity & Logo Design",
      "UI/UX Design",
      "Website & App Development",
      "SEO Optimization",
      "2 revision rounds",
    ],
    cta: "Get a Quote",
    featured: false,
    gradient: "from-[hsl(220,60%,50%)] to-[hsl(200,80%,45%)]",
    glowColor: "hsl(210 70% 50% / 0.15)",
  },
  {
    name: "Professional",
    tagline: "Full creative & marketing powerhouse",
    icon: Crown,
    features: [
      "Everything in Starter",
      "Print & Editorial Design",
      "Merchandise Design",
      "Book & Magazine Design",
      "Motion Graphics",
      "Digital Product Marketing",
    ],
    cta: "Get a Quote",
    featured: true,
    gradient: "from-[hsl(var(--accent))] to-[hsl(var(--cyan))]",
    glowColor: "hsl(var(--accent) / 0.25)",
  },
  {
    name: "Enterprise",
    tagline: "All 11 disciplines with full business support",
    icon: Rocket,
    features: [
      "All 11 services included",
      "Excel & Google Sheets Solutions",
      "Accounts Management",
      "Dedicated account manager",
      "Unlimited projects & revisions",
      "Priority support",
    ],
    cta: "Contact Us",
    featured: false,
    gradient: "from-[hsl(260,60%,55%)] to-[hsl(280,70%,50%)]",
    glowColor: "hsl(270 65% 52% / 0.15)",
  },
];

const PricingCard = ({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Icon = plan.icon;

    return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      style={{ perspective: 800 }}
    >
      {plan.featured && (
        <div
          className="absolute -inset-4 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
          style={{ background: plan.glowColor }}
        />
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          plan.featured
            ? "border-accent/40 bg-accent/[0.04] shadow-[0_0_60px_-15px_hsl(var(--accent)/0.2)]"
            : "border-border/40 bg-card/40 hover:border-border"
        }`}
        data-cursor-hover
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, ${plan.glowColor}, transparent 50%)`
            ),
          }}
        />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${plan.gradient}`}
                  style={{ transform: "translateZ(20px)" }}
                >
                  <Icon size={18} className="text-white" />
                </div>
                {plan.featured && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    Popular
                  </span>
                )}
              </div>
              <h3
                className={`font-display text-2xl font-extrabold tracking-tight ${
                  plan.featured ? "text-accent" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm mt-1">{plan.tagline}</p>
            </div>
          </div>

          {/* Custom quote badge */}
          <div className="mb-8">
            <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Custom Quote
            </span>
            <p className="font-body text-xs text-muted-foreground mt-2">
              Tailored to your project scope & requirements
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Features */}
          <ul className="space-y-4 mb-10">
            {plan.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                    plan.featured
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="font-body text-sm text-foreground/80">{f}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/contact"
            className={`w-full inline-flex items-center justify-center gap-2 font-display font-bold text-sm px-8 py-4 rounded-xl transition-all duration-500 group/btn ${
              plan.featured
                ? "bg-accent text-accent-foreground hover:shadow-[0_8px_40px_hsl(var(--accent)/0.35)] hover:-translate-y-0.5"
                : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5"
            }`}
            data-cursor-hover
          >
            {plan.cta}
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 20%, hsl(var(--accent) / 0.06), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(260 60% 50% / 0.04), transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-4">
            Simple, transparent
            <br />
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-md mx-auto leading-relaxed">
            No retainers. No surprises. Just results.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground font-mono text-[10px] uppercase tracking-wider mt-12"
        >
          Every project is unique · Free consultation · NDA available
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
