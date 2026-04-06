import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useState } from "react";
import SplashCursor from "@/components/SplashCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

import FloatingRocks from "@/components/FloatingRocks";
import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import BookCallSection from "@/components/BookCallSection";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Work from "./pages/Work.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  const { pathname } = useLocation();
  return (
    <>
      <FloatingRocks />
      <NoiseOverlay />
      <SplashCursor />
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
        ctaHref="/contact"
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
