import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <motion.div
          className="h-full bg-accent origin-left"
          style={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 lg:px-16 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="relative group flex items-center gap-2"
            data-cursor-hover
            data-cursor-label="Home"
          >
            {/* Logo mark */}
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center transition-all duration-500 group-hover:rounded-xl group-hover:shadow-[0_0_20px_hsl(217_92%_60%/0.4)]">
              <span className="text-accent-foreground font-display font-extrabold text-base leading-none">
                MR
              </span>
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground font-display hidden sm:inline">
              Kirof
            </span>
          </Link>

          {/* Desktop nav — pill container */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-0.5 bg-white/[0.15] rounded-full px-1.5 py-1.5 border border-white/[0.15] backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-1.5 group"
                    data-cursor-hover
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-accent rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 font-display ${
                        isActive
                          ? "text-accent-foreground"
                          : "text-accent-foreground/70 hover:text-accent-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 magnetic-btn bg-accent text-accent-foreground font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:shadow-[0_0_30px_hsl(217_92%_60%/0.4)] hover:scale-105 transition-all duration-500 font-display"
            data-cursor-hover
            data-cursor-label="Let's Talk"
          >
            Let's Talk
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground relative w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-muted/30 backdrop-blur-xl"
            data-cursor-hover
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu — fullscreen overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-[64px] bg-background/98 backdrop-blur-2xl z-40"
            >
              <div className="flex flex-col justify-center px-8 h-full -mt-16">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block font-display text-3xl md:text-4xl font-extrabold py-3 transition-colors ${
                        location.pathname === link.path ? "text-accent" : "text-foreground/30 hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-xs text-muted-foreground/50 mr-4">0{i + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12"
                >
                  <button
                    onClick={() => { setIsOpen(false); window.dispatchEvent(new Event('open-start-project')); }}
                    className="bg-accent text-accent-foreground font-display font-bold text-base px-8 py-4 rounded-full inline-flex items-center gap-3"
                  >
                    Start a Project
                    <ArrowUpRight size={18} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
