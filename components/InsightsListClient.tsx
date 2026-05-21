"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { LegalInsight } from "@/lib/sanity";

interface InsightsListClientProps {
  initialInsights: LegalInsight[];
}

export default function InsightsListClient({ initialInsights }: InsightsListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Treatise", "Executive Briefing", "Case Analysis"];

  const filteredInsights = initialInsights.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || insight.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-primary/5">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Legal insight categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer rounded-none focus-visible:outline-none ${
                activeCategory === cat
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-slate-200 text-text-muted hover:border-slate-300"
              }`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search treatises & briefings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-xs focus:border-secondary focus:outline-none transition-colors rounded-none placeholder:text-slate-400 text-primary"
            aria-label="Search treatises and briefings"
          />
        </div>

      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredInsights.length > 0 ? (
            filteredInsights.map((insight, idx) => (
              <motion.article
                layout
                key={insight.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-primary/5 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300 relative group"
              >
                {/* Visual Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-100 group-hover:bg-secondary transition-colors duration-300" />

                <div className="space-y-4">
                  {/* Category & Date Metadata */}
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-slate-400">
                    <span className="text-secondary font-bold font-sans">
                      {insight.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{insight.date}</span>
                    </span>
                  </div>

                  {/* Serif Title */}
                  <h3 className="font-serif text-xl font-normal text-primary leading-snug group-hover:text-secondary transition-colors duration-300">
                    <Link href={`/insights/${insight.slug}`} className="focus:outline-none">
                      {insight.title}
                    </Link>
                  </h3>

                  {/* Summary Abstract */}
                  <p className="text-text-muted text-xs font-sans font-light leading-relaxed">
                    {insight.summary}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-primary">{insight.author}</span>
                    <span className="text-[8px] text-slate-400 uppercase tracking-wider">{insight.authorTitle}</span>
                  </div>

                  <Link 
                    href={`/insights/${insight.slug}`}
                    className="flex items-center space-x-1 text-[10px] uppercase tracking-wider font-bold text-secondary hover:text-primary transition-colors focus-visible:outline-none"
                    aria-label={`Read ${insight.title}`}
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-16 text-center border border-dashed border-slate-200 bg-white/50"
            >
              <BookOpen className="h-8 w-8 text-secondary/30 mx-auto mb-3 animate-pulse" />
              <h4 className="font-serif text-lg text-primary font-normal">No Insights Found</h4>
              <p className="text-text-muted text-xs font-light max-w-xs mx-auto mt-2 leading-relaxed">
                We currently do not have matching treatises or briefings for your keyword. Try altering your filter inputs.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
