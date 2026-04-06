import { ArrowRight, ArrowUpRight, Globe, Users, Award, Trophy, Heart, Target, Rocket, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import farhanImg from "@/assets/farhan-rayyan.jpg";
import StatCounter from "@/components/StatCounter";
import BackgroundPaths from "@/components/BackgroundPaths";
import ProfileCard from "@/components/ProfileCard";

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

const team = [
  { name: "FarHan Rayyan", role: "Director & COO", handle: "farhanrayyan", bio: "Director and COO overseeing operations, strategy, and delivery across all departments.", image: farhanImg, gradient: "linear-gradient(145deg, #0f172a8c 0%, #3B82F644 100%)", glowColor: "rgba(59, 130, 246, 0.6)" },
  { name: "Sophia Chen", role: "Creative Director", handle: "sophiachen", bio: "10+ years shaping brands that win awards and hearts. Previously led design at two Y Combinator startups.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #4c1d958c 0%, #a855f744 100%)", glowColor: "rgba(168, 85, 247, 0.5)" },
  { name: "James Okafor", role: "Chief Financial Officer", handle: "jamesokafor", bio: "CPA with expertise in startup finance. Manages $8M+ in client revenue and internal operations.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #064e3b8c 0%, #10b98144 100%)", glowColor: "rgba(16, 185, 129, 0.5)" },
  { name: "Mia Patel", role: "Brand & Identity Lead", handle: "miapatel", bio: "Turns complex brand challenges into elegant visual systems. 1500+ brand projects delivered.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #831843c0 0%, #ec489944 100%)", glowColor: "rgba(236, 72, 153, 0.5)" },
  { name: "Tariq Hussain", role: "Lead Frontend Developer", handle: "tariqhussain", bio: "React & TypeScript obsessive. Pixel-perfect or nothing. Ships production code that scales.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #0c4a6e8c 0%, #0ea5e944 100%)", glowColor: "rgba(14, 165, 233, 0.5)" },
  { name: "Kaira Jevenu", role: "UI/UX Design Lead", handle: "kairajevenu", bio: "Turns complex flows into intuitive, delightful experiences. Certified in UX research methodology.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)", glowColor: "rgba(125, 190, 255, 0.5)" },
  { name: "Ryu Tanaka", role: "Motion Designer", handle: "ryutanaka", bio: "Brings brands to life through cinematic motion & animation. After Effects wizard.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #7c2d128c 0%, #f9731644 100%)", glowColor: "rgba(249, 115, 22, 0.5)" },
  { name: "Preet Kaur", role: "SEO & Content Strategist", handle: "preetkaur", bio: "Data-driven growth. Tripled organic traffic for 30+ clients. Google-certified.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #1e3a5f8c 0%, #6366f144 100%)", glowColor: "rgba(99, 102, 241, 0.5)" },
  { name: "Elena Marsh", role: "Editorial Designer", handle: "elenamarsh", bio: "Award-winning print designer. Magazines, books, and annual reports with impeccable typography.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #5b21b68c 0%, #d946ef44 100%)", glowColor: "rgba(217, 70, 239, 0.5)" },
  { name: "Dario Luca", role: "Digital Marketing Lead", handle: "darioluca", bio: "Campaign architect. $8M+ in revenue generated for clients. Performance marketing specialist.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face", gradient: "linear-gradient(145deg, #14532d8c 0%, #22c55e44 100%)", glowColor: "rgba(34, 197, 94, 0.5)" },
];

const values = [
  { icon: Target, title: "Obsessive Craft", desc: "We sweat the details others skip. Every pixel, every word, every interaction is intentional." },
  { icon: Heart, title: "Client-First", desc: "Your success is our success. We treat every project like our own. because our reputation depends on it." },
  { icon: Rocket, title: "Ship Fast, Ship Right", desc: "Speed without sacrifice. In 12 years, we've never missed a deadline. Not once." },
  { icon: Globe, title: "Remote-First", desc: "20 people across 3 continents. Async workflows that produce better work than any open-plan office." },
];

const timeline = [
  { year: "2013", title: "Founded", desc: "Marcus Riley launches Kirof as a solo brand design studio." },
  { year: "2015", title: "First 50 Clients", desc: "Expanded to web development. Hired the first 3 team members." },
  { year: "2018", title: "11 Services", desc: "Full-service offering complete. from brand to finance. Team of 12." },
  { year: "2020", title: "Fully Remote", desc: "Transitioned to remote-first. Hired across 3 continents." },
  { year: "2023", title: "3000+ Projects", desc: "Milestone: 3000 projects delivered with zero missed deadlines." },
  { year: "2025", title: "The Future", desc: "Expanding into AI-powered design systems and product strategy." },
];

const awards = [
  { award: "Awwwards Honorable Mention", project: "Starkline Platform", year: "2024" },
  { award: "Dribbble Top Agency", project: "Brand Identity Collection", year: "2024" },
  { award: "CSS Design Awards", project: "Blumora App UI", year: "2023" },
  { award: "FWA Site of the Day", project: "Pivvo Product Launch", year: "2023" },
  { award: "Webby Nominee", project: "Noxian Financial Platform", year: "2022" },
];

const About = () => {
  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <BackgroundPaths />
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-border" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">About Us</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight mb-8">
                  We craft brands<br />
                  that{" "}
                  <span className="text-gradient">endure</span>
                </h1>
                <p className="text-muted-foreground font-body text-base leading-relaxed max-w-xl">
                  A remote-first creative and financial agency built on craft, precision, and partnership. 12 years. 1500+ clients. Zero shortcuts.
                </p>
              </motion.div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-accent">20</span>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Team Members</p>
                  </div>
                  <div>
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-foreground">3</span>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Continents</p>
                  </div>
                  <div>
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-foreground">14+</span>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Countries Served</p>
                  </div>
                  <div>
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-foreground">0</span>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Missed Deadlines</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder Spotlight ── */}
      <FadeIn>
        <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, hsl(var(--accent) / 0.08), transparent 60%)' }} />
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Images */}
              <div className="lg:col-span-5">
                <div className="relative">
                  {/* Main image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 overflow-hidden rounded-lg"
                  >
                    <img
                      src={farhanImg}
                      alt="FarHan Rayyan — Director & COO"
                      className="w-full aspect-[4/5] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                  {/* Decorative accent line */}
                  <div className="absolute -left-4 top-8 w-1 h-24 bg-accent/40 rounded-full" />
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-7 pt-8 lg:pt-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Meet the Director</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight mb-4">
                    FarHan <span className="text-gradient">Rayyan</span>
                  </h2>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent/70 mb-6">Director & COO</p>
                  <div className="text-white/60 font-body text-base leading-relaxed space-y-4 mb-8 max-w-xl">
                    <p>
                      As Director & COO of Kirof, FarHan Rayyan oversees operations, strategy, and delivery across all departments. He ensures the agency runs with precision and every client gets world-class results.
                    </p>
                    <p>
                      His leadership has helped scale Kirof to a 20-person team delivering <span className="text-white font-semibold">3,000+ projects</span> across 14 countries — with zero missed deadlines.
                    </p>
                  </div>
                  {/* Quick stats */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    {[
                      { value: "12+", label: "Years Leading" },
                      { value: "1500+", label: "Clients Served" },
                      { value: "0", label: "Deadlines Missed" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <span className="font-display text-2xl font-extrabold text-accent">{s.value}</span>
                        <p className="font-mono text-xs uppercase tracking-wider text-white/30 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="magnetic-btn border border-white/20 text-white font-display text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-2 hover:border-accent hover:text-accent transition-all duration-500 group"
                    data-cursor-hover
                  >
                    Work with FarHan
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Story ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Our Story</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                  12 years of<br />building things<br />that <span className="text-gradient">last</span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="text-muted-foreground font-body text-base leading-relaxed space-y-6">
                  <p>
                    Founded in 2013, Kirof started as a solo design studio with one belief:
                    <span className="text-foreground font-semibold"> great work changes how people see a business.</span> Today
                    we're a 20-person remote team delivering across 11 disciplines, from brand identity
                    and web development to financial management and editorial design.
                  </p>
                  <p>
                    We've worked with over 1500 clients, from bootstrapped founders to established enterprises
                    across 14 countries. Every project gets the same obsessive attention to detail, whether
                    it's a logo, a full-stack platform, or a financial dashboard.
                  </p>
                  <p>
                    We don't do average. We don't do "good enough." We build things that make our clients
                    say <span className="text-accent italic">"how did we survive without this?"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Stats ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(var(--accent) / 0.04), transparent 70%)' }} />
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {[
                { value: 12, label: "Years", suffix: "", prefix: "", trend: { direction: "up" as const, text: "+2 YoY" } },
                { value: 1500, label: "Clients", suffix: "+", prefix: "", trend: { direction: "up" as const, text: "+34%" } },
                { value: 3000, label: "Projects", suffix: "+", prefix: "", trend: { direction: "up" as const, text: "+28%" } },
                { value: 500, label: "5-Star Reviews", suffix: "+", prefix: "", trend: { direction: "up" as const, text: "+52%" } },
              ].map((stat, i) => (
                <div key={stat.label} className="group relative py-12 md:py-16 text-center md:text-left md:pl-10 first:md:pl-0">
                  {i > 0 && <div className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />}
                  {i > 0 && <div className="md:hidden absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />}
                  <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} label={stat.label} delay={i * 150} trend={stat.trend} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Values ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Values</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                  What we<br />stand <span className="text-gradient">for</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group border border-border bg-card/30 p-8 hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-accent/[0.03] blur-2xl" />
                  <div className="w-12 h-12 border border-border/50 flex items-center justify-center mb-6 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                    <v.icon size={20} className="text-muted-foreground group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-base font-bold mb-3 group-hover:text-accent transition-colors">{v.title}</h3>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Timeline ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Journey</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                How we got <span className="text-gradient">here</span>
              </h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`relative flex items-start gap-8 py-8 ${
                      i % 2 === 0
                        ? "md:flex-row md:text-right"
                        : "md:flex-row-reverse md:text-left"
                    }`}
                  >
                    <div className={`flex-1 hidden md:block ${i % 2 === 0 ? "pr-12" : "pl-12"}`}>
                      {i % 2 === 0 && (
                        <div>
                          <h3 className="font-display text-base font-bold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground font-body text-base leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                      {i % 2 === 1 && (
                        <div>
                          <h3 className="font-display text-base font-bold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground font-body text-base leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>
                    {/* Center dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 border border-accent/40 bg-background flex items-center justify-center z-10">
                      <span className="font-mono text-xs text-accent">{item.year.slice(2)}</span>
                    </div>
                    <div className={`flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                      <span className="font-mono text-xs text-accent">{item.year}</span>
                      <div className="md:hidden mt-1">
                        <h3 className="font-display text-base font-bold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground font-body text-base leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Team ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Team</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                  The minds behind<br />the <span className="text-gradient">magic</span>
                </h2>
              </div>
              <p className="text-muted-foreground font-body text-base max-w-sm leading-relaxed">
                A carefully assembled team of specialists who care deeply about their craft and your success.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 md:gap-14">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <ProfileCard
                    avatarUrl={member.image}
                    name={member.name}
                    title={member.role}
                    handle={member.handle}
                    status={i === 0 ? "Founder" : "Team"}
                    showUserInfo={true}
                    innerGradient={member.gradient}
                    behindGlowColor={member.glowColor}
                    behindGlowSize="60%"
                    enableTilt={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Awards ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Recognition</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                  Awards &<br /><span className="text-gradient">features</span>
                </h2>
              </div>
            </div>
            <div className="space-y-0 divide-y divide-border/50">
              {awards.map((a, i) => (
                <motion.div
                  key={a.award}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-center justify-between py-6 md:py-8 hover:px-4 transition-all duration-500"
                  data-cursor-hover
                >
                  <div className="flex items-center gap-5">
                    <Trophy size={16} className="text-accent flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-base font-bold group-hover:text-accent transition-colors">{a.award}</h3>
                      <p className="text-muted-foreground font-body text-base mt-0.5">{a.project}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/50">{a.year}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Culture ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Culture</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9] mb-8">
                  How we<br /><span className="text-gradient">work</span>
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-accent to-transparent" />
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-8">
                  {[
                    { icon: Clock, title: "Async-First", desc: "Deep focus time over constant meetings. We communicate asynchronously, which means better thinking and fewer interruptions. Weekly syncs keep everyone aligned." },
                    { icon: Globe, title: "Remote by Design", desc: "We didn't go remote because of a pandemic. we chose it. The best talent isn't confined to one city. Our team spans 3 continents and 6 time zones." },
                    { icon: Users, title: "Small Teams, Big Impact", desc: "Every project gets a dedicated pod: a lead, a designer, and a developer. You'll never get lost in a machine. Your work gets our full attention." },
                    { icon: Award, title: "Continuous Learning", desc: "Monthly skill shares, quarterly workshops, and an annual team retreat. We invest in our people because better people make better work." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="w-10 h-10 border border-border/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground font-body text-base leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] bg-accent/[0.03] origin-center" style={{ transform: 'rotate(-12deg)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, hsl(var(--accent) / 0.06), transparent 70%)' }} />
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10 px-6 md:px-8 lg:px-16">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent mb-10">
              <span className="w-8 h-px bg-accent" />
              Join 1500+ Happy Clients
              <span className="w-8 h-px bg-accent" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-[0.85] tracking-tight mb-6">
              Ready to work with<br />a team that <span className="text-gradient">cares</span>?
            </h2>
            <p className="text-muted-foreground font-body text-base mb-14 max-w-md mx-auto leading-relaxed">
              Let's talk about your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="magnetic-btn bg-accent text-accent-foreground font-display font-extrabold px-7 py-3 rounded-full inline-flex items-center gap-3 text-base hover:shadow-[0_0_60px_hsl(var(--accent)/0.3)] transition-all duration-500 group"
                data-cursor-hover
              >
                Get in Touch <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/work"
                className="magnetic-btn border border-foreground/20 text-foreground font-display font-bold px-7 py-3 rounded-full inline-flex items-center gap-3 text-base hover:border-accent hover:text-accent transition-all duration-500 group"
                data-cursor-hover
              >
                See Our Work <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </PageTransition>
  );
};

export default About;
