"use client";

import { useState } from "react";
import { MapPin, Scale, Phone, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OfficeLocation {
  id: string;
  name: string;
  coords: { x: string; y: string }; // Coordinate positions on our stylized world container
  partner: string;
  partnerTitle: string;
  phone: string;
  email: string;
  address: string;
}

export default function GlobalMap() {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation | null>(null);

  const offices: OfficeLocation[] = [
    {
      id: "san-francisco",
      name: "San Francisco HQ",
      coords: { x: "18%", y: "38%" },
      partner: "Hsini Chen, Esq.",
      partnerTitle: "Senior Managing Partner",
      phone: "+1 (800) 555-0199",
      email: "sf@hsini.dev",
      address: "Suite 4500, Elite Plaza, San Francisco, CA 94104",
    },
    {
      id: "london",
      name: "London Office",
      coords: { x: "48%", y: "28%" },
      partner: "Sir Marcus Sterling, KC",
      partnerTitle: "Director of European Practice",
      phone: "+44 (20) 7946 0958",
      email: "london@hsini.dev",
      address: "Chambers 8, The Middle Temple, London EC4Y 9AT",
    },
    {
      id: "singapore",
      name: "Singapore Hub",
      coords: { x: "78%", y: "62%" },
      partner: "Lin Wei, Esq.",
      partnerTitle: "Director of Asia-Pacific M&A",
      phone: "+65 6789 0111",
      email: "sg@hsini.dev",
      address: "Level 68, Tower 3, Marina Bay Sands, Singapore 018972",
    },
  ];

  return (
    <section 
      id="global-offices" 
      className="py-24 bg-[#070b14] border-b border-primary/5 text-white overflow-hidden relative"
      aria-label="Firm Global Presence"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary animate-fade-in-up">
            Global Office network
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-white">
            Uncompromising Global Reach
          </h2>
          <div className="w-16 h-[2px] bg-secondary pt-1" />
          <p className="text-slate-400 text-sm font-sans font-light max-w-xl">
            Our offices are situated at key capital intersections, guaranteeing seamless multi-jurisdictional advocacy for corporate syndicates and private wealth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Stylized Vector World Map Container */}
          <div className="lg:col-span-8 relative aspect-[16/9] w-full bg-[#0a0f1d] border border-white/5 shadow-2xl p-4 overflow-hidden group">
            
            {/* Dark grid background overlay representing longitudinal lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            {/* Styled world vector dots layout (Minimalist representation) */}
            <svg 
              className="absolute inset-0 w-full h-full text-slate-800 opacity-20 pointer-events-none select-none"
              viewBox="0 0 1000 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world map path circles */}
              <circle cx="150" cy="180" r="12" fill="currentColor" />
              <circle cx="180" cy="200" r="24" fill="currentColor" />
              <circle cx="210" cy="220" r="18" fill="currentColor" />
              <circle cx="480" cy="140" r="28" fill="currentColor" />
              <circle cx="510" cy="160" r="16" fill="currentColor" />
              <circle cx="780" cy="310" r="22" fill="currentColor" />
              <circle cx="810" cy="330" r="14" fill="currentColor" />
              
              {/* Connecting flight routes wireframe representing structural unity */}
              <path 
                d="M 180 200 Q 330 100 480 140 T 780 310" 
                stroke="#b45309" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
                strokeOpacity="0.4"
              />
            </svg>

            {/* Interactive Pins */}
            {offices.map((office) => (
              <button
                key={office.id}
                onClick={() => setSelectedOffice(office)}
                style={{ left: office.coords.x, top: office.coords.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 group cursor-pointer focus-visible:outline-none"
                aria-label={`Inspect details for ${office.name}`}
              >
                {/* 1. Pulsing golden radar circles */}
                <div className="absolute w-8 h-8 bg-secondary/20 rounded-full scale-100 animate-ping pointer-events-none" />
                <div className="absolute w-4 h-4 bg-secondary/40 rounded-full scale-100 animate-pulse pointer-events-none" />

                {/* 2. Core gold marker pin */}
                <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
                  selectedOffice?.id === office.id
                    ? "bg-secondary scale-125"
                    : "bg-white text-primary hover:bg-secondary hover:text-white"
                }`}>
                  <MapPin className="h-3 w-3" />
                </div>

                {/* 3. Small hover tag */}
                <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] uppercase tracking-widest px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-secondary/20">
                  {office.name}
                </span>
              </button>
            ))}

            {/* Help guidelines tag */}
            <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-widest text-slate-500 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-none" />
              <span>Click nodes to inspect regional director details</span>
            </div>
          </div>

          {/* Partner Detail Slide Drawer Panel */}
          <div className="lg:col-span-4 h-full flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              {selectedOffice ? (
                <motion.div
                  key={selectedOffice.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0a0f1d] border border-secondary/20 p-8 shadow-xl space-y-6 relative"
                  role="region"
                  aria-label={`${selectedOffice.name} Director Profile`}
                >
                  {/* Close btn */}
                  <button
                    onClick={() => setSelectedOffice(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus-visible:outline-none cursor-pointer"
                    aria-label="Close details"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-secondary text-[10px] uppercase tracking-widest font-semibold">
                      <Scale className="h-3 w-3" />
                      <span>{selectedOffice.name}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white font-normal">
                      {selectedOffice.partner}
                    </h3>
                    <p className="text-xs text-secondary-light">{selectedOffice.partnerTitle}</p>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    Providing senior tactical representation and elite deal governance locally, backed by the firm's combined global legal structure.
                  </p>

                  <div className="editorial-divider my-4" />

                  <div className="space-y-3 text-xs pt-2">
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Phone className="h-4 w-4 text-secondary shrink-0" />
                      <span>{selectedOffice.phone}</span>
                    </div>
                    <a
                      href={`mailto:${selectedOffice.email}`}
                      className="flex items-center space-x-3 text-slate-300 hover:text-secondary transition-colors"
                    >
                      <Mail className="h-4 w-4 text-secondary shrink-0" />
                      <span>{selectedOffice.email}</span>
                    </a>
                    <div className="flex items-center space-x-3 text-slate-400 font-light leading-relaxed">
                      <MapPin className="h-4 w-4 text-secondary shrink-0" />
                      <span>{selectedOffice.address}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-transparent border border-dashed border-white/10 p-8 text-center space-y-4"
                >
                  <MapPin className="h-8 w-8 text-secondary/40 mx-auto animate-bounce" />
                  <h3 className="font-serif text-lg text-slate-300">Select Global Office Node</h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed max-w-xs mx-auto">
                    Select a golden location coordinate node on the interactive map to review localized advisory coordinates and regional managing directors.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
