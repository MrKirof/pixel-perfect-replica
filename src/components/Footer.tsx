import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import FooterOrb from "./FooterOrb";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = [
  { label: "Behance", href: "https://www.behance.net" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
];

const Footer = () => (
  <footer className="surface relative border-t border-border/70 bg-background text-foreground">
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-16 lg:py-20">
      <div className="grid gap-14 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="flex justify-center lg:justify-start">
          <div className="relative flex h-[360px] w-full max-w-[340px] items-center justify-center">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-background via-card to-muted opacity-80 blur-2xl" />

            <div className="relative h-[320px] w-[220px] rotate-[18deg]">
              <div className="absolute left-1/2 top-0 h-[110px] w-[72px] -translate-x-1/2 rounded-[999px] bg-foreground shadow-2xl" />
              <div className="absolute left-1/2 top-[210px] h-[110px] w-[72px] -translate-x-1/2 rounded-[999px] bg-foreground shadow-2xl" />
              <div className="absolute left-1/2 top-[86px] h-7 w-24 -translate-x-1/2 rounded-full bg-foreground/90" />
              <div className="absolute left-1/2 top-[208px] h-7 w-24 -translate-x-1/2 rounded-full bg-foreground/90" />

              <div className="absolute left-1/2 top-1/2 h-[188px] w-[188px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-background via-card to-muted p-3 shadow-2xl ring-1 ring-border/70">
                <div className="relative h-full w-full rounded-full bg-foreground shadow-inner shadow-background/10">
                  <div className="absolute inset-[14px] rounded-full border border-border/30" />
                  <div className="absolute inset-[22px] rounded-full bg-gradient-to-b from-foreground via-foreground to-secondary/80" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-sm" />
                  <div className="absolute left-1/2 top-7 h-4 w-[1px] -translate-x-1/2 rounded-full bg-background/70" />

                  {watchMarkers.map((marker) => (
                    <span
                      key={marker.angle}
                      className={`absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-[72px] rounded-full bg-background ${marker.width} ${marker.height}`}
                      style={{ transform: `translate(-50%, -72px) rotate(${marker.angle}deg)` }}
                    />
                  ))}

                  <div className="absolute left-1/2 top-1/2 h-14 w-1 -translate-x-1/2 -translate-y-[48px] rounded-full bg-background" />
                  <div className="absolute left-1/2 top-1/2 h-20 w-1 -translate-x-1/2 -translate-y-[68px] rounded-full bg-background/80 rotate-[55deg]" />
                  <div className="absolute right-[-10px] top-1/2 h-10 w-4 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-card to-muted ring-1 ring-border/70" />
                  <div className="absolute right-[34px] top-[38px] h-16 w-10 rounded-full bg-background/10 blur-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section>
            <h4 className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Navigation
            </h4>
            <nav className="grid gap-3" aria-label="Footer navigation links">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group relative inline-flex w-fit pb-1 text-base text-foreground/80 transition-colors duration-300 hover:text-foreground"
                  data-cursor-hover
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </section>

          <div className="space-y-8">
            <section>
              <h4 className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-base text-foreground/80 transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Email
              </h4>
              <a
                href="mailto:hello@mrkirof.com"
                className="text-base text-foreground transition-colors duration-300 hover:text-primary"
                data-cursor-hover
              >
                hello@mrkirof.com
              </a>
            </section>

            <section className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
              </span>
              <span className="text-base text-foreground/75">Currently accepting projects</span>
            </section>

            <Button asChild size="lg" className="h-12 w-fit rounded-full px-7 font-display text-base font-bold">
              <Link to="/contact" data-cursor-hover>
                Start a Project
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-border/70 pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-base text-muted-foreground">© 2026 All rights reserved. Crafted with obsession.</p>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
          REMOTE-FIRST · EST. 2013
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
