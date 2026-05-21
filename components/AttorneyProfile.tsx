"use client";

import Image from "next/image";
import { Award, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";

export default function AttorneyProfile() {
  return (
    <section 
      id="attorney-bio" 
      className="py-24 bg-white border-b border-primary/5"
      aria-label="Attorney Biography and Credentials"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Portrait Container with Premium Borders */}
          <div className="lg:col-span-5 relative group">
            {/* Elegant outer gold framing */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-secondary" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-secondary" />
            
            {/* The main portrait frame */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-light border border-primary/10 shadow-xl transition-transform duration-700 hover:scale-[1.01]">
              <Image
                src="/images/attorney.png"
                alt="Hsini Chen, Esq., Senior Managing Partner"
                fill
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-cover object-top"
                priority
              />
            </div>
            
            {/* Quick stats floating bar */}
            <div className="absolute -bottom-6 left-6 right-6 bg-primary text-white p-4 shadow-lg flex items-center justify-between border-l-2 border-secondary">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Total Verdicts & M&A</p>
                <p className="text-lg font-serif font-semibold text-white">$620M+ Combined</p>
              </div>
              <div className="h-8 w-[1px] bg-slate-800" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Years of Advocacy</p>
                <p className="text-lg font-serif font-semibold text-white">22+ Years</p>
              </div>
            </div>
          </div>

          {/* Biography Content (E-E-A-T Optimization) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-secondary">Founding Partner</p>
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-primary">
                Hsini Chen, Esq.
              </h2>
              <p className="text-sm italic text-text-muted">
                Managing Partner — Venture Capital Finance, High-Stakes Intellectual Property & Commercial Disputes
              </p>
              <div className="w-16 h-[2px] bg-secondary pt-1" />
            </div>

            <p className="text-text-main text-base leading-relaxed font-light">
              Hsini Chen represents an elite tier of advocacy in high-growth technology financing and multi-jurisdictional patent dispute management. For over two decades, she has served as key general counsel for top-tier venture funds, private billionaires, and Silicon Valley corporations in highly critical legal maneuvers.
            </p>

            <p className="text-text-main text-base leading-relaxed font-light">
              Her advisory method blends meticulous architectural analysis with robust, confident negotiation, ensuring that clients secure dominant transactional terms and clean liability containment.
            </p>

            {/* Structured Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6" aria-label="Professional Accreditation Details">
              
              {/* Academics */}
              <div className="flex space-x-3 items-start">
                <GraduationCap className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-sm font-semibold text-primary">Ivy-League Education</h3>
                  <ul className="text-xs text-text-muted space-y-1.5 mt-2 leading-relaxed">
                    <li><strong>Harvard Law School</strong> — J.D., magna cum laude</li>
                    <li><strong>Stanford University</strong> — B.A. in Economics, honors</li>
                  </ul>
                </div>
              </div>

              {/* Bar Admissions */}
              <div className="flex space-x-3 items-start">
                <ShieldCheck className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-sm font-semibold text-primary">Bar Admissions</h3>
                  <ul className="text-xs text-text-muted space-y-1.5 mt-2 leading-relaxed">
                    <li>State Bar of California (Active)</li>
                    <li>State Bar of New York (Active)</li>
                    <li>U.S. Court of Appeals for the Federal Circuit</li>
                    <li>Supreme Court of the United States</li>
                  </ul>
                </div>
              </div>

              {/* Publications */}
              <div className="flex space-x-3 items-start">
                <BookOpen className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-sm font-semibold text-primary">Published Treatises</h3>
                  <ul className="text-xs text-text-muted space-y-1.5 mt-2 leading-relaxed">
                    <li><em>“The Architecture of Venture Capital Trusts”</em> — Yale Law Journal (2023)</li>
                    <li><em>“Securitization Bounds in Tech Mergers”</em> — Stanford Law Review (2025)</li>
                  </ul>
                </div>
              </div>

              {/* Honors */}
              <div className="flex space-x-3 items-start">
                <Award className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-sm font-semibold text-primary">Selective Recognition</h3>
                  <ul className="text-xs text-text-muted space-y-1.5 mt-2 leading-relaxed">
                    <li>Chambers & Partners USA — Band 1 IP Litigation</li>
                    <li>Super Lawyers® — Selected 12 Consecutive Years</li>
                    <li>National Law Journal — Elite Trailblazer Award</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
