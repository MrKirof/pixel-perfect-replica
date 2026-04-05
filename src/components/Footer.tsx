import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import MarqueeStrip from "@/components/MarqueeStrip";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const socials = [
  { label: "X / Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Pre-footer CTA band */}
    <div className="border-t border-accent/50">
      <div className="py-8 overflow-hidden border-b border-border">
        <MarqueeStrip speed={20}>
          <div className="flex items-center gap-16 mr-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="font-display text-[8vw] font-extrabold text-foreground/[0.03] uppercase whitespace-nowrap leading-none">
                Design · Develop · Deliver ·
              </span>
            ))}
          </div>
        </MarqueeStrip>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-20 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        {/* Brand column */}
        <div className="md:col-span-5">
          <h3 className="font-display text-5xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight leading-[0.9]">
            MR<span className="text-accent">.</span>KIROF
          </h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs mb-8">
            A 20-person remote studio delivering design, development, and financial clarity across 11 disciplines.
          </p>
          <Link
            to="/contact"
            className="magnetic-btn inline-flex items-center gap-3 bg-accent text-accent-foreground font-display font-bold text-sm px-8 py-4 hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] transition-all duration-500 group"
            data-cursor-hover
            data-cursor-label="Let's Talk"
          >
            Start a Project
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="md:col-span-3">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Navigation
          </h4>
          <div className="flex flex-col gap-0">
            {footerLinks.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                className="group flex items-center justify-between py-3 border-b border-border/20 hover:border-accent/30 transition-all duration-300 hover:pl-2"
                data-cursor-hover
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-muted-foreground/30">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground/50 group-hover:text-foreground transition-colors font-body text-sm">{item.label}</span>
                </span>
                <ArrowUpRight size={10} className="text-muted-foreground/20 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Social + Contact */}
        <div className="md:col-span-4">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Connect
          </h4>
          <div className="flex flex-col gap-0 mb-10">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group flex items-center justify-between py-3 border-b border-border/20 hover:border-accent/30 transition-all duration-300 hover:pl-2"
                data-cursor-hover
              >
                <span className="text-foreground/50 group-hover:text-accent transition-colors font-body text-sm">{s.label}</span>
                <ArrowUpRight size={10} className="text-muted-foreground/20 group-hover:text-accent transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/40">Email</span>
              <p className="font-body text-sm text-foreground/60 mt-0.5">hello@mrkirof.com</p>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/40">Availability</span>
              <p className="font-body text-sm text-foreground/60 mt-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Currently accepting projects
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hr-gradient mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-foreground text-xs font-mono">
          © 2026 MR Kirof. Crafted with obsession.
        </p>
        <div className="flex items-center gap-8">
          <span className="text-muted-foreground/30 text-[9px] font-mono uppercase tracking-widest">
            Remote-first · Est. 2013
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="magnetic-btn w-12 h-12 border border-border flex items-center justify-center hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-500 group"
            data-cursor-hover
            data-cursor-label="Top"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
