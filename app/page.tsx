"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PracticeAreas from "@/components/PracticeAreas";
import AttorneyProfile from "@/components/AttorneyProfile";
import CaseResults from "@/components/CaseResults";
import IntakeForm from "@/components/IntakeForm";
import GlobalMap from "@/components/GlobalMap";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Header Navigation Glassmorphism Overlay */}
      <Header />

      {/* 2. Main Page Sections Assembly */}
      <main className="flex-grow">
        
        {/* Full-screen WebGL Interactive Hero */}
        <Hero />

        {/* Modular service grid cards with hover animations */}
        <PracticeAreas />

        {/* E-E-A-T high-authority attorney profile bio */}
        <AttorneyProfile />

        {/* Case Victories scoreboard and client reviews spotlight */}
        <CaseResults />

        {/* Interactive Global Offices Presence Map */}
        <GlobalMap />

        {/* Secure, progressive disclosure consultation booking form */}
        <IntakeForm />
        
      </main>

      {/* 3. Official Disclosures & Professional Footer */}
      <Footer />

      {/* 4. GDPR/CCPA Privacy Consent Cookie Banner */}
      <CookieBanner />
    </>
  );
}
