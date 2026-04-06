import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import SEOHead from "@/components/SEOHead";

const faqs = [
  {
    category: "Working With Us",
    items: [
      { q: "How does your remote team work?", a: "We're a 20-person crew spread across 3 continents. Every project gets a dedicated lead, a private Slack channel, and weekly video check-ins. You'll never wonder what's happening. Our async workflow means progress happens around the clock." },
      { q: "What's your typical turnaround time?", a: "A brand identity ships in 1-2 weeks. A full website build takes 3-6 weeks depending on complexity. We lock timelines before kickoff, and in 12 years we've never missed a deadline. Not once." },
      { q: "How do I get started?", a: "Hit the 'Get in Touch' button, tell us what you need in 2-3 sentences. Within 24 hours you'll have a scoped brief, timeline, and transparent quote on your desk. No discovery calls required unless you want one." },
    ],
  },
  {
    category: "Services & Scope",
    items: [
      { q: "Do you work with startups or only established brands?", a: "Both, and everything in between. We've helped 40+ startups launch from scratch and rebranded Fortune-adjacent companies. Whether you're pre-seed or scaling past $10M ARR, we adapt our process to your stage." },
      { q: "Can I hire you for just one service?", a: "Absolutely. Need a single logo, one motion reel, or a killer Excel dashboard? Done. But most clients start with one service and end up bundling 3-4 because they see the quality difference across disciplines." },
      { q: "What makes Kirof different?", a: "We're a full-service IT agency that handles everything under one roof: web development, app builds, UI/UX design, branding, motion graphics, and digital strategy. No outsourcing, no freelancer handoffs. Your project stays with our in-house team from start to finish, so every piece works well together. That's how we've delivered 3000+ projects without a single missed deadline." },
    ],
  },
  {
    category: "Pricing & Payment",
    items: [
      { q: "How is pricing structured?", a: "We offer both project-based fixed pricing and monthly retainers. Every engagement starts with a transparent quote with no hidden fees, no surprise invoices. You know exactly what you're paying before we write a single line of code." },
      { q: "Do you offer payment plans?", a: "Yes. For larger projects we typically split payments into milestones: 40% upfront, 30% at midpoint, 30% on delivery. For retainers, it's a simple monthly invoice." },
      { q: "What's your refund policy?", a: "We stand behind our work. If we haven't started production, you get a full refund. Once work begins, we'll work with you until you're satisfied. Our 98% client satisfaction rate speaks for itself." },
    ],
  },
];

const FAQ = () => (
  <PageTransition>
    <section className="pt-32 pb-20 relative" style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}>
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(var(--accent) / 0.06), transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(var(--accent) / 0.04), transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 relative z-10">
        <SectionHeading
          tag="FAQ"
          title="Frequently asked questions"
          description="Can't find what you're looking for? Get in touch, we reply within 24 hours."
          align="center"
        />

        <div className="space-y-16">
          {faqs.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{String(gi + 1).padStart(2, "0")}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                <span className="font-display text-base font-bold text-muted-foreground uppercase tracking-wider">{group.category}</span>
                <div className="h-px flex-1 bg-gradient-to-l from-accent/30 to-transparent" />
              </div>

              <div className="divide-y divide-border/30">
                {group.items.map((item, i) => (
                  <motion.details
                    key={item.q}
                    className="group py-6"
                    data-cursor-hover
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <summary className="cursor-none flex items-start justify-between gap-6 list-none">
                      <div className="flex items-start gap-5">
                        <span className="font-mono text-xs text-accent/40 mt-1">{String(gi * 3 + i + 1).padStart(2, "0")}</span>
                        <h3 className="font-display text-base font-bold group-hover:text-accent transition-colors leading-snug">{item.q}</h3>
                      </div>
                      <span className="w-7 h-7 border border-border/50 rounded-full flex items-center justify-center text-muted-foreground text-xs flex-shrink-0 mt-0.5 group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground group-open:border-accent transition-all duration-300">
                        +
                      </span>
                    </summary>
                    <div className="pl-10 md:pl-[3.25rem] pt-4 pb-2">
                      <p className="text-muted-foreground font-body text-base leading-relaxed max-w-2xl border-l-2 border-accent/20 pl-5">{item.a}</p>
                    </div>
                  </motion.details>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground font-body text-base mb-6">Still have questions?</p>
          <Link
            to="/contact"
            className="magnetic-btn bg-accent text-accent-foreground font-display font-bold text-base px-6 py-2.5 rounded-full inline-flex items-center gap-3 hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] transition-all duration-500 group"
            data-cursor-hover
          >
            Get in Touch
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  </PageTransition>
);

export default FAQ;
