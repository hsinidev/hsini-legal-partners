import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ShieldAlert, Award, FileText, ChevronRight } from "lucide-react";
import { getInsightBySlug, getLegalInsights } from "@/lib/sanity";

// Next.js static paths pre-generation
export async function generateStaticParams() {
  const insights = await getLegalInsights();
  return insights.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InsightDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getInsightBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] pt-28 pb-24 font-sans selection:bg-[#b45309] selection:text-white">
      
      {/* Top Banner & Breadcrumb Nav */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4 pb-6 border-b border-primary/5">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/insights" className="hover:text-secondary transition-colors">
              Insights
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          <Link
            href="/insights"
            className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-secondary transition-colors focus-visible:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Insights</span>
          </Link>
        </div>
      </div>

      {/* Main Editorial Article Area */}
      <article className="max-w-4xl mx-auto px-6">
        
        {/* Article Metadata Header */}
        <header className="space-y-6 mb-12">
          
          {/* Category Tag */}
          <span className="inline-flex px-3 py-1 bg-secondary/5 border border-secondary/20 text-secondary text-[9px] uppercase tracking-[0.2em] font-semibold">
            {post.category}
          </span>

          {/* Huge Serif Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-primary leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Abstract / Synopsis Box */}
          <p className="text-slate-500 text-sm font-sans font-light italic leading-relaxed border-l-2 border-secondary/35 pl-4">
            {post.summary}
          </p>

          {/* Author / Time Details Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-[10px] uppercase tracking-widest text-slate-400 border-t border-slate-100 pb-4">
            
            {/* Author Credit */}
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-secondary shrink-0" />
              <span className="text-primary font-bold">{post.author}</span>
              <span className="text-slate-300 font-light">|</span>
              <span className="text-slate-400 font-light lowercase italic">{post.authorTitle}</span>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{post.date}</span>
            </div>

            {/* Reading Duration */}
            <div className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{post.readingTime}</span>
            </div>

          </div>

        </header>

        {/* Text Layout & Body Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Body Text Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Loop and render Paragraph text elegantly */}
            {post.content.map((p, idx) => (
              <p 
                key={idx} 
                className={`text-primary/95 text-base leading-relaxed font-sans font-light text-justify ${
                  idx === 0 
                    ? "first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-secondary first-letter:float-left first-letter:mr-3 first-letter:mt-1.5" 
                    : ""
                }`}
              >
                {p}
              </p>
            ))}

            {/* Premium Gold Quote Blocks */}
            {post.goldQuote && (
              <blockquote className="my-10 bg-white border border-primary/5 border-l-4 border-l-secondary p-8 shadow-md relative overflow-hidden">
                {/* Micro logo emblem under the text */}
                <FileText className="absolute right-4 bottom-4 h-16 w-16 text-slate-50 opacity-[0.03] select-none pointer-events-none" />
                <p className="font-serif text-lg text-primary italic font-normal leading-relaxed relative z-10">
                  "{post.goldQuote}"
                </p>
                {post.goldQuoteAuthor && (
                  <cite className="block text-[9px] uppercase tracking-widest font-bold text-slate-400 not-italic mt-4 font-sans text-right">
                    — {post.goldQuoteAuthor}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Rest of default text placeholder if content length is brief */}
            <p className="text-primary/95 text-base leading-relaxed font-sans font-light text-justify pt-4">
              To examine custom parameters or acquire specialized structural legal briefings tailored directly for your asset scale and sovereign boundaries, proceed to initiate privileged communications with our senior counsel panel.
            </p>

          </div>

          {/* Dynamic Sidebar with Case Meta Links */}
          <aside className="lg:col-span-4 space-y-8 bg-white border border-primary/5 p-6 shadow-sm sticky top-32">
            
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-semibold text-primary pb-2 border-b border-slate-100">
                Author & Lead Advocate
              </h3>
              <div className="space-y-2">
                <span className="font-serif text-base text-primary font-normal block">{post.author}</span>
                <span className="text-[10px] text-secondary uppercase tracking-widest font-semibold block">{post.authorTitle}</span>
                <p className="text-text-muted text-[11px] font-sans font-light leading-relaxed">
                  Focuses strictly on international risk restructuring, institutional capital defense systems, and high-stakes trade disputes.
                </p>
              </div>
            </div>

            <div className="editorial-divider" />

            <div className="space-y-4">
              <h3 className="font-serif text-sm font-semibold text-primary pb-2 border-b border-slate-100">
                Privileged Inquiry
              </h3>
              <p className="text-text-muted text-[11px] font-sans font-light leading-relaxed">
                Have high-stakes inquiries regarding structural risks detailed in this {post.category.toLowerCase()}? Secure a consult today.
              </p>
              <Link
                href="/#intake-form"
                className="w-full block py-2.5 bg-primary hover:bg-slate-800 text-white text-[10px] uppercase tracking-widest font-bold text-center transition-all rounded-none focus-visible:outline-none"
              >
                Book Private Session
              </Link>
            </div>

          </aside>

        </div>

      </article>
    </main>
  );
}
