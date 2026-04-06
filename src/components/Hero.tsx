import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TextScramble from "@/components/TextScramble";
import MarqueeStrip from "@/components/MarqueeStrip";
import HeroScene from "@/components/HeroScene";
import AnimatedPlanet from "@/components/AnimatedPlanet";

const clients = [
  "Lumara", "Veltro", "Noxian", "Starkline", "Crestfield",
  "Pivvo", "Blumora", "Tethyr", "Solace Co.", "Arxfield",
];

const Hero = ({ onStartProject }: { onStartProject?: () => void }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden px-0">
      {/* Star particles */}
      <HeroScene />

      {/* Nebula cloud overlay */}
      <div className="absolute inset-x-0 top-0 z-[2] pointer-events-none" style={{ height: '55vh' }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(180, 180, 200, 0.06) 0%, rgba(120, 130, 160, 0.03) 30%, transparent 70%)',
        }} />
        <div className="absolute inset-0 animate-nebula-drift-1" style={{
          background: 'radial-gradient(ellipse 60% 30% at 35% 25%, rgba(200, 200, 220, 0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 25% at 70% 15%, rgba(160, 170, 190, 0.04) 0%, transparent 55%)',
        }} />
        <div className="absolute inset-0 animate-nebula-drift-2" style={{
          background: 'radial-gradient(ellipse 50% 35% at 55% 30%, rgba(190, 195, 210, 0.04) 0%, transparent 60%), radial-gradient(ellipse 70% 20% at 25% 35%, rgba(170, 175, 195, 0.035) 0%, transparent 55%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 90% 40% at 50% 10%, rgba(150, 155, 175, 0.03) 0%, transparent 65%)',
        }} />
      </div>

      {/* 3D Animated Planet */}
      <AnimatedPlanet />

      {/* Content. left-aligned editorial layout */}
      <div className="relative z-10 flex-1 flex flex-col justify-center sm:justify-end pb-[12vh] sm:pb-[22vh] md:pb-[14vh]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Radial glow behind content */}
        <div className="absolute bottom-[10vh] left-0 w-[700px] h-[500px] md:w-[1000px] md:h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, hsl(var(--accent) / 0.06), transparent 70%)', filter: 'blur(60px)' }} />

        {/* Eyebrow pill */}
        <div className={`mb-6 md:mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 md:gap-3 border border-white/20 bg-white/[0.08] backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs md:text-xs uppercase tracking-[0.2em] text-white/80">
              Est. 2013 | Remote Agency
            </span>
          </div>
        </div>

        {/* Main heading. massive, left-aligned */}
        <h1 className="font-display font-extrabold text-left leading-[0.9] tracking-tight mb-6 md:mb-8 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          <span className={`block overflow-hidden`}>
            <span className={`block transition-all duration-700 ease-out text-white ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`} style={{ transitionDelay: "0.15s" }}>
              <TextScramble text="We craft brands" delay={200} />
            </span>
          </span>
          <span className={`block transition-all duration-700 ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`} style={{ transitionDelay: "0.3s" }}>
            <span className="text-white"><TextScramble text="that " delay={400} /></span>
            <span className="hero-gradient-text"><TextScramble text="speak" delay={500} /></span>
            <span className="hero-gradient-text"><TextScramble text=" & " delay={600} /></span>
            <span className="hero-gradient-text"><TextScramble text="sell" delay={700} /></span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-white/70 font-body font-medium text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "0.5s" }}>
          20 specialists. 13 disciplines. 1500+ clients across design, development, and financial operations.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "0.65s" }}>
          <Link
            to="/work"
            className="magnetic-btn bg-accent text-accent-foreground font-display font-bold text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 sm:gap-3 hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] group transition-all duration-500 ease-out"
            data-cursor-hover
          >
            Our Work
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={onStartProject}
            className="magnetic-btn border border-white/20 text-white font-display text-sm sm:text-base px-5 sm:px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 sm:gap-3 hover:border-accent hover:text-accent transition-all duration-500 ease-out"
            data-cursor-hover
          >
            Start a Project
          </button>
        </div>

        {/* Decorative line */}
        <div className={`mt-8 md:mt-14 hidden sm:flex items-center gap-4 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "0.8s" }}>
          <div className="w-16 h-px bg-accent/40" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">Scroll to explore</span>
        </div>
        </div>
      </div>

      {/* Client marquee */}
      <div className={`relative z-10 mt-auto transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "0.6s" }}>
        <div className="border-t border-white/10" />
        <div className="flex items-center py-3 sm:py-5">
          <div className="shrink-0 pl-4 sm:pl-6 pr-4 sm:pr-8 border-r border-white/10">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">200+ Brands</span>
          </div>
          <MarqueeStrip speed={60}>
            <div className="flex items-center mr-0">
              {clients.map((c, i) => {
                const sizes = ["text-xs", "text-xs", "text-xs", "text-xs", "text-xs"];
                return (
                  <span key={i} className="flex items-center gap-8">
                    <span className={`font-mono ${sizes[i % sizes.length]} uppercase tracking-[0.25em] text-white/30 whitespace-nowrap transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)] cursor-default`}>
                      {c}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-accent/30 shrink-0 mx-4" />
                  </span>
                );
              })}
            </div>
          </MarqueeStrip>
        </div>
        <div className="border-b border-white/10" />
      </div>
    </section>
  );
};

export default Hero;
