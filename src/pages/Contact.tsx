import { MapPin, ArrowRight, Mail, Clock, Globe, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import BackgroundPaths from "@/components/BackgroundPaths";

const globalLocations = [
  { x: "15%", y: "38%", city: "Los Angeles", timezone: "PST (UTC-8)", clients: "10+", projects: "15+" },
  { x: "22%", y: "35%", city: "New York", timezone: "UTC-5", clients: "12+", projects: "18+" },
  { x: "38%", y: "30%", city: "London", timezone: "UTC+0", clients: "8+", projects: "14+" },
  { x: "55%", y: "27%", city: "Dubai", timezone: "UTC+4", clients: "6+", projects: "9+" },
  { x: "68%", y: "35%", city: "Singapore", timezone: "UTC+8", clients: "5+", projects: "7+" },
  { x: "75%", y: "55%", city: "Sydney", timezone: "UTC+11", clients: "4+", projects: "6+" },
];

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

const serviceOptions = [
  "Logo & Brand Identity",
  "Web & App Design",
  "Website & App Development",
  "Print & Editorial Design",
  "Merchandise Design",
  "Book & Magazine Design",
  "Motion Graphics",
  "Digital Product Marketing",
  "SEO",
  "Excel & Google Sheets",
  "Accounts Management",
  "Others",
];

const budgetOptions = [
  "Under $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's discuss",
];

const faqs = [
  { q: "How quickly will I get a response?", a: "Within 24 hours, always. Usually much sooner." },
  { q: "Do I need to know exactly what I want?", a: "Not at all. Tell us your problem and we'll help scope the solution. That's literally our job." },
  { q: "What happens after I submit?", a: "You'll get a confirmation email. Within 24 hours, we'll send a scoped brief with timeline and transparent pricing." },
  { q: "Can we hop on a call instead?", a: "Absolutely. Book a free 30-min discovery call. no pitch, just listening." },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  const inputStyles = "w-full bg-card border border-border px-5 py-4 font-body text-base text-foreground focus:outline-none focus:border-accent transition-all duration-300 placeholder:text-muted-foreground/30";
  const labelStyles = "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block";

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <BackgroundPaths />
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Contact</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[0.9] tracking-tight mb-8">
              Let's build<br />
              something <span className="text-gradient">great</span>
            </h1>
            <p className="text-muted-foreground font-body text-base leading-relaxed max-w-xl">
              Tell us about your project. We respond within 24 hours with a scoped brief and transparent quote. No discovery calls required, unless you want one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <FadeIn>
        <section className="surface pb-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Mail, title: "Email Us", info: "hello@mrkirof.com", sub: "We reply within 24 hours" },
                { icon: Clock, title: "Working Hours", info: "Mon – Fri, 9AM – 6PM", sub: "UTC+0 / Async-first" },
                { icon: Globe, title: "Location", info: "Remote-first", sub: "Serving 14+ countries" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group border border-border bg-card/30 p-6 md:p-8 hover:border-accent/40 transition-all duration-500"
                >
                  <div className="w-10 h-10 border border-border/50 flex items-center justify-center mb-5 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                    <item.icon size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-display text-base font-bold mb-1">{item.title}</h3>
                  <p className="text-foreground font-body text-base mb-1">{item.info}</p>
                  <p className="text-muted-foreground font-mono text-xs uppercase tracking-wider">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Form + FAQ ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Form */}
              <div className="lg:col-span-7">
                <div className="mb-10">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Get in Touch</span>
                  <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                    Tell us about<br />your <span className="text-gradient">project</span>
                  </h2>
                </div>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelStyles}>Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputStyles}
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className={labelStyles}>Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputStyles}
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelStyles}>Company</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputStyles}
                          placeholder="Company name (optional)"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelStyles}>Service</label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className={inputStyles}
                          >
                            <option value="">Select a service</option>
                            {serviceOptions.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={labelStyles}>Budget</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className={inputStyles}
                          >
                            <option value="">Select budget range</option>
                            {budgetOptions.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelStyles}>Timeline</label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className={inputStyles}
                        >
                          <option value="">When do you need this?</option>
                          <option value="asap">ASAP</option>
                          <option value="1-2weeks">1-2 weeks</option>
                          <option value="1month">Within a month</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelStyles}>Message *</label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={6}
                          className={`${inputStyles} resize-none`}
                          placeholder="Tell us about your project. goals, challenges, ideas..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="magnetic-btn bg-accent text-accent-foreground font-display font-extrabold px-7 py-3 inline-flex items-center gap-3 text-base hover:shadow-[0_0_60px_hsl(var(--accent)/0.3)] transition-all duration-500 group w-full md:w-auto justify-center"
                        data-cursor-hover
                      >
                        Send Message
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="font-mono text-xs text-muted-foreground/40 uppercase tracking-wider">
                        Your data is secure · NDA available on request · We never share your information
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-accent/30 bg-accent/[0.03] p-12 text-center"
                    >
                      <CheckCircle size={48} className="text-accent mx-auto mb-6" />
                      <h3 className="font-display text-3xl md:text-4xl font-extrabold mb-3">Message Sent!</h3>
                      <p className="text-muted-foreground font-body text-base mb-8 max-w-md mx-auto leading-relaxed">
                        Thanks for reaching out. We'll review your project and get back to you within 24 hours with a scoped brief and quote.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", company: "", service: "", budget: "", timeline: "", message: "" });
                        }}
                        className="font-mono text-xs text-accent hover:underline"
                        data-cursor-hover
                      >
                        Send another message →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar. FAQ */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">FAQ</span>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[0.9] mb-8">
                    Quick <span className="text-gradient">answers</span>
                  </h3>
                  <div className="space-y-0 divide-y divide-border/50">
                    {faqs.map((faq, i) => (
                      <details key={faq.q} className="group py-5 first:pt-0" data-cursor-hover>
                        <summary className="cursor-none flex items-start justify-between gap-4 list-none">
                          <h4 className="font-display text-base font-bold group-hover:text-accent transition-colors leading-snug">
                            {faq.q}
                          </h4>
                          <span className="w-5 h-5 border border-border/50 flex items-center justify-center text-muted-foreground text-xs flex-shrink-0 mt-0.5 group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground group-open:border-accent transition-all duration-300">
                            +
                          </span>
                        </summary>
                        <div className="pt-3">
                          <p className="text-muted-foreground font-body text-base leading-relaxed">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>

                  {/* Quick links */}
                  <div className="mt-12 pt-8 border-t border-border/30">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Quick Links</h4>
                    <div className="space-y-3">
                      {[
                        { label: "View our services", href: "/services" },
                        { label: "See our work", href: "/work" },
                        { label: "Read our blog", href: "/blog" },
                        { label: "About us", href: "/about" },
                      ].map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="flex items-center justify-between group/link py-2 hover:pl-2 transition-all duration-300"
                          data-cursor-hover
                        >
                          <span className="font-body text-base text-muted-foreground group-hover/link:text-accent transition-colors">{link.label}</span>
                          <ArrowRight size={12} className="text-muted-foreground/30 group-hover/link:text-accent transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Global Reach ── */}
      <FadeIn>
        <section className="surface py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
            <div className="mb-14 flex items-end justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4 block">Global Reach</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.9]">
                  Working <span className="text-gradient">worldwide</span>
                </h2>
              </div>
              <p className="hidden md:block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Remote-first · Async-friendly
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {globalLocations.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative border border-border bg-card/30 p-6 hover:border-accent/50 hover:bg-accent/5 transition-all duration-500 overflow-hidden"
                  data-cursor-hover
                >
                  {/* Glow accent */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.6)] group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.8)] transition-shadow" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{loc.timezone}</span>
                  </div>

                  <h3 className="font-display text-base font-bold tracking-tight mb-4">{loc.city}</h3>

                  <div className="space-y-2 font-mono text-xs uppercase tracking-wider">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clients</span>
                      <span className="text-foreground font-bold">{loc.clients}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="text-foreground font-bold">{loc.projects}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/30 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-green-400/70">Active</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary stats */}
            <div className="mt-10 grid grid-cols-4 gap-4 max-w-lg">
              {[
                { value: "35+", label: "Clients" },
                { value: "54+", label: "Projects" },
                { value: "14+", label: "Countries" },
                { value: "6", label: "Timezones" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{stat.value}</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>
    </PageTransition>
  );
};

export default Contact;
