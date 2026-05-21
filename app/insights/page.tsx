import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, ChevronRight } from "lucide-react";
import { getLegalInsights } from "@/lib/sanity";
import InsightsListClient from "@/components/InsightsListClient";

// SEO Best Practices
export const metadata = {
  title: "Insights & Legal Treatises | Hsini Legal Partners",
  description: "Read authoritative whitepapers, litigation briefings, and corporate venture capital treatises crafted by Hsini Legal Partners.",
};

export default async function InsightsPage() {
  const insights = await getLegalInsights();

  return (
    <main className="min-h-screen bg-[#f8fafc] pt-28 pb-24 font-sans selection:bg-secondary selection:text-white">
      
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-slate-400 mb-6">
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary font-semibold">Insights</span>
        </nav>

        {/* Dynamic Title Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 text-secondary bg-secondary/5 px-3 py-1 border border-secondary/15">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="text-[9px] uppercase tracking-widest font-semibold">Firm Publications</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-normal text-primary tracking-tight leading-tight">
              Authoritative Legal <span className="italic text-secondary">Insights</span>
            </h1>
            <div className="w-20 h-[3px] bg-secondary" />
          </div>
          
          <div className="lg:col-span-4">
            <p className="text-text-muted text-sm font-sans font-light leading-relaxed">
              Synthesized treatises mapping G20 venture capital boundaries, large-scale generative AI IP parameters, and founder protection legal pathways.
            </p>
          </div>
        </div>

      </div>

      {/* Main Content Grid Component */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <InsightsListClient initialInsights={insights} />
      </div>

      {/* Advisory Security Notice Footer Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="bg-white border border-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-secondary" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-primary font-bold text-sm">
              <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
              <span>Privileged Academic Context</span>
            </div>
            <p className="text-text-muted text-xs font-sans font-light leading-relaxed max-w-2xl">
              All treatises, analyses, and briefing files are published purely for educational, academic, and general guidance. Reading these archives does not formulate a client relationship nor compromise core privileged communication frameworks.
            </p>
          </div>
          <Link
            href="/#intake-form"
            className="px-6 py-3 bg-primary hover:bg-slate-800 text-white text-[10px] uppercase tracking-widest font-bold text-center whitespace-nowrap transition-all rounded-none focus-visible:outline-none shrink-0"
          >
            Retain Counsel
          </Link>
        </div>
      </div>

    </main>
  );
}
