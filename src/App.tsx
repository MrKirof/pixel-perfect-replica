/* MrKirof Creative Agency - Updated 2026-04-06 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import NoiseOverlay from "@/components/NoiseOverlay";

import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import BookCallSection from "@/components/BookCallSection";
import StartProjectPopup from "@/components/StartProjectPopup";

const FloatingRocks = lazy(() => import("@/components/FloatingRocks"));
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Lazy-loaded routes for code splitting
const Index = lazy(() => import("./pages/Index.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Work = lazy(() => import("./pages/Work.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const FAQ = lazy(() => import("./pages/FAQ.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Lazy load heavy SplashCursor (1000+ line WebGL component)
const SplashCursor = lazy(() => import("@/components/SplashCursor"));

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [startProjectOpen, setStartProjectOpen] = useState(false);
  const isTouchDevice = useMemo(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0), []);
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <FloatingRocks />
      </Suspense>
      <NoiseOverlay />
      {!isTouchDevice && (
        <Suspense fallback={null}>
          <SplashCursor DYE_RESOLUTION={512} SIM_RESOLUTION={64} />
        </Suspense>
      )}
      <PillNav
        logo={null}
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Work", href: "/work" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ]}
        ctaLabel="Book a Call"
        onCtaClick={() => setBookCallOpen(true)}
      />
      <Dialog open={bookCallOpen} onOpenChange={setBookCallOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 border-none bg-transparent overflow-y-auto max-h-[90vh] [&>button]:text-white [&>button]:z-50">
          <BookCallSection />
        </DialogContent>
      </Dialog>
      <Dialog open={startProjectOpen} onOpenChange={setStartProjectOpen}>
        <DialogContent className="max-w-6xl w-[95vw] p-0 border-none bg-transparent overflow-y-auto max-h-[90vh] [&>button]:text-white [&>button]:z-50">
          <StartProjectPopup />
        </DialogContent>
      </Dialog>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Index onStartProject={() => setStartProjectOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
