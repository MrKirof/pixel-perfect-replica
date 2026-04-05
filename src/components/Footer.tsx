import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Contact", path: "/contact" },
];

const Footer = () => (
  <footer className="relative" style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a' }}>
    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-16 md:py-20">
      {/* Top row: Logo + CTA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14">
        <div>
          <h3 className="font-display text-3xl font-extrabold tracking-tight" style={{ color: '#1a1a1a' }}>
            Kirof<span style={{ color: 'hsl(217, 92%, 60%)' }}>.</span>
          </h3>
          <p className="text-sm mt-2 max-w-xs" style={{ color: '#666' }}>
            Remote-first creative agency delivering design, development, and financial clarity.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-display font-bold text-sm pl-8 pr-4 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg group"
          style={{ backgroundColor: 'hsl(217, 92%, 60%)', color: '#fff' }}
          data-cursor-hover
        >
          Start a Project
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Middle: Nav + Socials */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-14" style={{ borderBottom: '1px solid #e0e0e0' }}>
        <nav className="flex flex-wrap items-center gap-2">
          {footerLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="font-body text-sm px-4 py-2 rounded-full transition-all duration-200"
              style={{ color: '#555', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e8e8e8'; e.currentTarget.style.color = '#1a1a1a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#555'; }}
              data-cursor-hover
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm px-5 py-2 rounded-full transition-all duration-200"
            style={{ color: '#555', border: '1px solid #d0d0d0' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#d0d0d0'; }}
            data-cursor-hover
          >
            Behance
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm px-5 py-2 rounded-full transition-all duration-200"
            style={{ color: '#555', border: '1px solid #d0d0d0' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#d0d0d0'; }}
            data-cursor-hover
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
        <p className="text-xs font-mono" style={{ color: '#999' }}>
          © {new Date().getFullYear()} All rights reserved. Crafted with obsession.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: '#bbb' }}>
            REMOTE-FIRST · EST. 2013
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: '1px solid #d0d0d0', color: '#888' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#d0d0d0'; }}
            data-cursor-hover
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
