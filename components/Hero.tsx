"use client";

import JusticePillars from "./JusticePillars";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  const scrollToIntake = () => {
    const element = document.getElementById("intake-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPractice = () => {
    const element = document.getElementById("practice-areas");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-[#070b14] flex flex-col justify-center items-center overflow-hidden px-6 md:px-12"
      aria-label="Welcome Presentation"
    >
      {/* 1. Subtle Radial Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none animate-pulse-gold" />

      {/* 2. Interactive WebGL Three.js Colonnade Canvas */}
      <JusticePillars />

      {/* 3. Immersive Typography Overlays */}
      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center space-y-8 mt-16">
        
        {/* Subtle Luxury Category Indicator */}
        <div className="flex items-center space-x-2 text-secondary tracking-[0.25em] text-xs font-semibold uppercase animate-fade-in-up">
          <ShieldCheck className="h-4 w-4 mr-1 text-secondary" />
          <span>Supreme Architectural Advocacy</span>
        </div>

        {/* Oversized Serif Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.08] tracking-tight max-w-4xl animate-fade-in-up [animation-delay:200ms]">
          Elite Representation. <br />
          <span className="italic font-light text-slate-300">Uncompromising</span> Diligence.
        </h1>

        {/* Minimal Decorative Line */}
        <div className="w-16 h-[1px] bg-secondary my-2 animate-fade-in-up [animation-delay:400ms]" />

        {/* ADA Muted Description */}
        <p className="text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed font-sans font-light animate-fade-in-up [animation-delay:600ms]">
          Hsini Legal Partners provides peerless counsel for corporate acquisitions, intellectual property defense, and private estate protection. Built for high-net-worth individuals and pioneering enterprises.
        </p>

        {/* High-Contrast Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 animate-fade-in-up [animation-delay:800ms]">
          <button
            onClick={scrollToIntake}
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-white border border-secondary text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-white hover:text-primary hover:border-white rounded-none cursor-pointer focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary active:scale-98 flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Retain Counsel</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={scrollToPractice}
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/20 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:border-white hover:bg-white/5 rounded-none cursor-pointer focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white active:scale-98"
          >
            Explore Practice Segments
          </button>
        </div>
      </div>

      {/* 4. Elegant Scroll Indicator Pin */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 pointer-events-none opacity-40 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
        <div className="w-[1px] h-8 bg-secondary" />
      </div>
    </section>
  );
}
