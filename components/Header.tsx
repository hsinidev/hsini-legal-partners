"use client";

import { useEffect, useState } from "react";
import { Scale } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-panel shadow-sm py-4 border-b border-primary/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Editorial Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-3 text-primary group cursor-pointer focus-visible:outline-none"
          aria-label="Hsini & Partners Law Firm Logo"
        >
          <Scale className="h-6 w-6 text-secondary transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-serif tracking-widest text-lg font-bold text-primary group-hover:text-secondary transition-colors duration-300">
            HSINI <span className="font-sans font-light text-text-muted">|</span> LEGAL PARTNERS
          </span>
        </button>

        {/* Semantic Navigation Menu */}
        <nav aria-label="Primary Directory" className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("practice-areas")}
            className="text-sm font-medium text-primary-light hover:text-secondary tracking-wide transition-colors duration-300 cursor-pointer focus-visible:outline-none"
          >
            Practice Segments
          </button>
          <button
            onClick={() => scrollToSection("attorney-bio")}
            className="text-sm font-medium text-primary-light hover:text-secondary tracking-wide transition-colors duration-300 cursor-pointer focus-visible:outline-none"
          >
            Elite Credentials
          </button>
          <button
            onClick={() => scrollToSection("case-results")}
            className="text-sm font-medium text-primary-light hover:text-secondary tracking-wide transition-colors duration-300 cursor-pointer focus-visible:outline-none"
          >
            Landmark Victories
          </button>
        </nav>

        {/* Premium Gold CTA */}
        <div>
          <button
            onClick={() => scrollToSection("intake-form")}
            className="relative px-6 py-2.5 bg-primary text-white border border-primary text-xs font-semibold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-transparent hover:text-primary rounded-none cursor-pointer focus-visible:outline-none focus:ring-2 focus:ring-secondary active:scale-95"
            aria-label="Scroll to Schedule Private Consultation"
          >
            <span className="relative z-10">Private Consultation</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </div>
      </div>
    </header>
  );
}
