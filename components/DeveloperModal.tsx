"use client";

import React from "react";
import { X, Globe, Mail, Github, Code2, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header gradient banner */}
        <div className="h-32 bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 relative flex items-end px-6 pb-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/40 border border-white/20 text-white flex items-center justify-center hover:bg-slate-950/70 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Lead Systems Architect & Developer
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-8 pt-0 relative">
          {/* Avatar positioning */}
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="relative">
              <img
                src="/profile.png"
                alt="Hsini Mohamed"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl bg-slate-800"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Available for projects" />
            </div>

            <div className="flex gap-2">
              <a
                href="https://hsini.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
              >
                <Globe className="w-3.5 h-3.5" /> hsini.dev
              </a>
              <a
                href="https://github.com/hsinidev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
          </div>

          {/* Name & Title */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-white tracking-tight">Hsini Mohamed</h3>
              <ShieldCheck className="w-5 h-5 text-amber-400 fill-amber-400/20" />
            </div>
            <p className="text-sm font-semibold text-amber-400">
              Full-Stack Developer & SaaS Architect
            </p>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-300 leading-relaxed mb-6 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            Engineer and designer of high-performance web applications, specialized in full-stack cloud ecosystems, Next.js architecture, interactive user experiences, and modern web applications.
          </p>

          {/* Tech Stack Badges */}
          <div className="space-y-2 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-amber-400" /> Core Stack & Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "TypeScript", "React 19", "Tailwind CSS", "GSAP & Three.js", "Zustand", "Node.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700 text-[11px] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Contacts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href="https://hsini.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 flex items-center gap-3 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Official Portfolio</p>
                <p className="text-xs font-bold text-slate-200 truncate group-hover:text-amber-400">https://hsini.dev</p>
              </div>
            </a>

            <a
              href="mailto:contact@hsini.dev"
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 flex items-center gap-3 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Direct Email</p>
                <p className="text-xs font-bold text-slate-200 truncate group-hover:text-amber-400">contact@hsini.dev</p>
              </div>
            </a>
          </div>

          {/* Target deployment domain footer note */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Active VPS Deployment Target
            </span>
            <span className="font-mono text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              low.hsini.dev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
