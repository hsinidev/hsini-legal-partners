"use client";

import { Award, Briefcase, Landmark } from "lucide-react";
import { useState } from "react";

interface CaseResult {
  value: string;
  category: string;
  detail: string;
  industry: string;
}

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export default function CaseResults() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const results: CaseResult[] = [
    {
      value: "$45.0M Settlement",
      category: "Venture Acquisition Dispute",
      detail: "Lead defense counsel securing a full mutual release and complete technology asset retention under hostile takeover attempts.",
      industry: "Enterprise AI & Cloud Infrastructure",
    },
    {
      value: "$12.8M Verdict",
      category: "Intellectual Property Litigation",
      detail: "Obtained a complete jury verdict validating core hardware architecture patents against global semiconductor distributors.",
      industry: "Advanced Microelectronics",
    },
    {
      value: "$9.5M Resolution",
      category: "SEC Investigation Counsel",
      detail: "Navigated complex federal corporate audit, resolving compliance allegations with zero disruption to daily enterprise operations.",
      industry: "Fintech & Capital Asset Markets",
    },
    {
      value: "$4.2M Allocation",
      category: "Generational Family Trust Rebuild",
      detail: "Reconstructed offshore trust configurations, shielding assets across multiple jurisdictions for a prominent family office.",
      industry: "HNW Private Wealth Services",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      quote: "Hsini Chen brings a rare combination of lethal precision and deep commercial understanding. In our recent $45M venture acquisition stand-off, she secured outcomes that other firms declared legally unfeasible.",
      author: "Lord Alistair Sterling",
      position: "Managing Director",
      company: "Sterling Capital Ventures LLC",
    },
    {
      quote: "Hsini Chen's defense of our silicon designs was architectural in its stability. She understood our intellectual property intimately and made the jury understand its value. A landmark $12.8M win.",
      author: "Dr. Evelyn Vance",
      position: "Chief Technology Officer",
      company: "Vance Semiconductor Group",
    },
    {
      quote: "Absolute discretion, meticulous drafting, and a calming, professional authority. Hsini Chen is the only counsel our family office trusts with multi-generational wealth administration.",
      author: "Charlotte Du Pont",
      position: "Trust Trustee",
      company: "The Du Pont Family Trust",
    },
  ];

  return (
    <section 
      id="case-results" 
      className="py-24 bg-white border-b border-primary/5"
      aria-label="Past Case Victories and Client Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
            Landmark Victories
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-primary">
            A Record of Indisputable Outcomes
          </h2>
          <div className="w-16 h-[2px] bg-secondary pt-1" />
          <p className="text-text-muted text-sm font-sans font-light max-w-xl">
            Success is documented, not stated. We represent clients in high-stakes arenas where performance dictates survival.
          </p>
        </div>

        {/* 1. Results Scoreboard Grid with Editorial Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24" aria-label="Case Results Scorecard">
          {results.map((result, idx) => (
            <div 
              key={idx} 
              className="flex flex-col space-y-3 pb-8 border-b border-slate-100 group cursor-default"
            >
              {/* Value and Industry */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="font-serif text-3xl font-semibold text-secondary group-hover:translate-x-1 transition-transform duration-300">
                  {result.value}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold bg-bg-light px-2.5 py-1">
                  {result.industry}
                </span>
              </div>
              
              {/* Category */}
              <h3 className="font-serif text-lg font-semibold text-primary">
                {result.category}
              </h3>
              
              {/* Detail */}
              <p className="text-text-muted text-sm font-light leading-relaxed">
                {result.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Divider */}
        <div className="editorial-divider my-16" />

        {/* 2. Client Testimonials Spotlight Container */}
        <div className="bg-bg-light p-10 md:p-16 border-l-2 border-secondary relative overflow-hidden" aria-label="Client Testimonial Carousel">
          <div className="absolute top-6 right-8 text-slate-200/40 text-[180px] font-serif select-none pointer-events-none font-bold leading-none">
            “
          </div>

          <div className="relative z-10 space-y-8">
            {/* Quote Block */}
            <blockquote className="min-h-[140px] flex items-center">
              <p className="font-serif text-lg md:text-2xl text-primary font-light italic leading-relaxed">
                {testimonials[activeTestimonial].quote}
              </p>
            </blockquote>

            {/* Author Attribution */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-slate-200/60">
              <div>
                <p className="font-serif text-base font-semibold text-primary">
                  {testimonials[activeTestimonial].author}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {testimonials[activeTestimonial].position} — {testimonials[activeTestimonial].company}
                </p>
              </div>

              {/* Slider Dots Controllers */}
              <div className="flex space-x-2.5" role="tablist">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={activeTestimonial === idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3.5 h-3.5 border transition-all duration-300 rounded-none cursor-pointer focus-visible:outline-none ${
                      activeTestimonial === idx
                        ? "bg-secondary border-secondary scale-110"
                        : "bg-transparent border-slate-300 hover:border-secondary"
                    }`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
