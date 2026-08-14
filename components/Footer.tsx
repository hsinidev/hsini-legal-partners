"use client";

import { useState } from "react";
import { Scale, Mail, Phone, MapPin, Code, Sparkles } from "lucide-react";
import DeveloperModal from "@/components/DeveloperModal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-white border-t border-secondary/15 pt-20 pb-10" aria-label="Official Site Footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Col */}
        <div className="space-y-6 md:col-span-2">
          <div className="flex items-center space-x-3 text-secondary">
            <Scale className="h-6 w-6" />
            <span className="font-serif tracking-widest text-lg font-bold text-white">
              HSINI & PARTNERS
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
            Hsini Legal Partners provides world-class advocacy and strategic counsel to private enterprises, venture financial houses, high-growth technology groups, and private family offices globally. Driven by architectural restraint and elite diligence.
          </p>
          <div className="space-y-3 pt-4">
            <a 
              href="mailto:contact@hsini.dev" 
              className="flex items-center space-x-3 text-slate-300 hover:text-secondary text-sm transition-colors duration-300"
              aria-label="Send email to contact@hsini.dev"
            >
              <Mail className="h-4 w-4 text-secondary" />
              <span>contact@hsini.dev</span>
            </a>
            <div className="flex items-center space-x-3 text-slate-300 text-sm">
              <Phone className="h-4 w-4 text-secondary" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300 text-sm">
              <MapPin className="h-4 w-4 text-secondary" />
              <span>Suite 4500, Elite Plaza, San Francisco, CA 94104</span>
            </div>
          </div>
        </div>

        {/* Directory Col */}
        <div className="space-y-6">
          <h2 className="font-serif text-sm tracking-widest uppercase font-bold text-secondary">
            Firm Navigation
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <button 
                onClick={() => scrollToSection("practice-areas")} 
                className="text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer focus-visible:outline-none"
              >
                Practice Segments
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("attorney-bio")} 
                className="text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer focus-visible:outline-none"
              >
                Elite Credentials
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("case-results")} 
                className="text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer focus-visible:outline-none"
              >
                Landmark Victories
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("intake-form")} 
                className="text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer focus-visible:outline-none"
              >
                Consultation Request
              </button>
            </li>
          </ul>
        </div>

        {/* Compliance Col */}
        <div className="space-y-6">
          <h2 className="font-serif text-sm tracking-widest uppercase font-bold text-secondary">
            Ethical Disclosures
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Attorney Advertising Notice:</strong> Under the ethical rules of many jurisdictions, this website may be considered Attorney Advertising. Prior results described herein do not guarantee a similar outcome in future representation.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Content provided on low.hsini.dev is for informational purposes only and does not establish a formal attorney-client relationship.
          </p>

          {/* Developer Info Card Badge */}
          <div className="pt-2">
            <button
              onClick={() => setIsDevModalOpen(true)}
              className="w-full group text-left p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-wider uppercase border border-amber-500/20">
                  <Sparkles className="w-3 h-3" /> Architect
                </span>
                <span className="text-[11px] text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View Profile &rarr;
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/profile.png"
                  alt="Hsini Mohamed"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700 bg-slate-800"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    Hsini Mohamed
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    Full-Stack Developer & SaaS Architect
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-800 max-w-7xl mx-auto px-6 md:px-12 mb-8" />

      {/* Sub-Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
        <div>
          &copy; {currentYear} Hsini Legal Partners LLP. All rights reserved.
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setIsDevModalOpen(true)}
            className="hover:text-amber-400 transition-colors duration-300 flex items-center gap-1 cursor-pointer font-medium"
          >
            <Code className="w-3.5 h-3.5" /> Developer: Hsini Mohamed
          </button>
          <a href="#" className="hover:text-slate-300 transition-colors duration-300">Privacy Charter</a>
          <a href="#" className="hover:text-slate-300 transition-colors duration-300">Terms of Engagement</a>
          <a href="#" className="hover:text-slate-300 transition-colors duration-300">Accessibility Statement</a>
        </div>
      </div>

      {/* Developer Profile Modal */}
      <DeveloperModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
      />
    </footer>
  );
}

