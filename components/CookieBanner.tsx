"use client";

import React, { useState, useEffect } from "react";
import { Shield, Cookie, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a decision
    const consent = localStorage.getItem("hsini-cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for editorial elegance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hsini-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("hsini-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md bg-[#0a0f1d] border border-secondary/20 p-6 shadow-2xl z-50 text-white"
          role="alert"
          aria-live="polite"
          aria-label="GDPR Cookie Consent Banner"
        >
          <div className="space-y-4">
            
            {/* Title / Icon Row */}
            <div className="flex items-center space-x-3 pb-2 border-b border-white/5">
              <Cookie className="h-5 w-5 text-secondary shrink-0" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-secondary">
                Privacy & Data Governance
              </span>
            </div>

            {/* Description Text */}
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              We leverage cookies to ensure the extreme reliability and premium visual speed of our site. No telemetry is shared without explicit client permission under GDPR/CCPA directives.
            </p>

            {/* Controls Button Row */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-secondary border border-secondary hover:bg-transparent hover:text-white text-[10px] uppercase tracking-widest font-bold text-white transition-all cursor-pointer rounded-none flex items-center justify-center space-x-1.5 focus-visible:outline focus-visible:outline-secondary"
              >
                <Check className="h-3 w-3" />
                <span>Accept All</span>
              </button>
              
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-transparent border border-white/10 hover:border-white/30 text-[10px] uppercase tracking-widest font-bold text-slate-300 transition-all cursor-pointer rounded-none flex items-center justify-center space-x-1.5 focus-visible:outline focus-visible:outline-white/20"
              >
                <X className="h-3 w-3" />
                <span>Decline</span>
              </button>
            </div>

            {/* Micro PRIVACY policy metadata */}
            <div className="text-[9px] text-slate-500 flex items-center justify-between pt-1">
              <span className="flex items-center space-x-1">
                <Shield className="h-2.5 w-2.5" />
                <span>End-to-End Encrypted</span>
              </span>
              <span>v1.0 Compliance</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
