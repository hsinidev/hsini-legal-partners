"use client";

import { Briefcase, KeyRound, Globe, Landmark, ArrowUpRight } from "lucide-react";

interface PracticeArea {
  id: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  description: string;
  highlights: string[];
}

export default function PracticeAreas() {
  const segments: PracticeArea[] = [
    {
      id: "venture-finance",
      title: "Venture Finance & Capital",
      icon: <Briefcase className="h-6 w-6 text-secondary" />,
      subtitle: "Strategic Growth Advising",
      description: "Structuring seed-to-IPO corporate investments, cross-border equity agreements, and sovereign wealth syndication. We build frameworks that lock in terms and protect founders.",
      highlights: ["Series Seed through G Rounds", "Sovereign Debt structures", "Specialist SPAC syndications"],
    },
    {
      id: "ip-litigation",
      title: "High-Stakes IP Litigation",
      icon: <KeyRound className="h-6 w-6 text-secondary" />,
      subtitle: "Patent & Trade Secret Security",
      description: "Aggressive defense of software patents, biotechnology assets, and hardware architectures. We safeguard trade secrets from corporate espionage and secure large verdicts.",
      highlights: ["Patent Infringement Defense", "Section 337 ITC Investigations", "Trade Secret Protection"],
    },
    {
      id: "executive-ma",
      title: "Corporate M&A Counsel",
      icon: <Globe className="h-6 w-6 text-secondary" />,
      subtitle: "Corporate Structure Restructuring",
      description: "Leading complex asset splits, spin-offs, defensive takeovers, and strategic joint-ventures. Providing clear diligence that uncovers systemic liability before closing.",
      highlights: ["Hostile Defense Planning", "Cross-Border Transactions", "Post-Merger Rationalization"],
    },
    {
      id: "private-wealth",
      title: "Elite Wealth & Family Office",
      icon: <Landmark className="h-6 w-6 text-secondary" />,
      subtitle: "Generational Protection",
      description: "Managing private estates, tax-optimized wealth transfers, and foreign asset shelters for high-net-worth families. Delivering quiet security with absolute discretion.",
      highlights: ["Irrevocable Trust Networks", "Offshore Asset Containment", "Dual-Citizen Tax Structuring"],
    },
  ];

  return (
    <section 
      id="practice-areas" 
      className="py-24 bg-bg-light border-b border-primary/5"
      aria-label="Modular Practice Segments"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
            Practice Segments
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-primary">
            Sectors of Elite Jurisdiction
          </h2>
          <div className="w-16 h-[2px] bg-secondary pt-1" />
          <p className="text-text-muted text-sm font-sans font-light max-w-xl">
            We focus exclusively on complex disciplines that demand profound tactical thinking, extreme diligence, and absolute authority.
          </p>
        </div>

        {/* Card Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-label="Practice Area Grid">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className="group relative bg-white border border-primary/5 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/5 hover:border-secondary/20 flex flex-col justify-between overflow-hidden cursor-default"
            >
              {/* Subtle top indicator hover lines */}
              <div className="absolute top-0 left-0 w-0 h-[3px] bg-secondary transition-all duration-500 group-hover:w-full" />
              
              <div>
                {/* Icon & Upper Info */}
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-secondary/5 rounded-none group-hover:bg-secondary/10 transition-colors duration-300">
                    {segment.icon}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Typography */}
                <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold mb-1">
                  {segment.subtitle}
                </p>
                <h3 className="text-2xl font-serif font-normal text-primary mb-4">
                  {segment.title}
                </h3>
                
                {/* Description */}
                <p className="text-text-muted text-sm font-light leading-relaxed mb-6">
                  {segment.description}
                </p>
              </div>

              {/* Highlights - Sliding Micro-Animation Details */}
              <div className="border-t border-slate-100 pt-6 mt-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {segment.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-text-main font-light">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-none shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
