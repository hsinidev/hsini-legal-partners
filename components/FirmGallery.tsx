"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description: string;
}

export default function FirmGallery() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Exactly 3 curated, high-resolution architectural images
  const galleryItems: GalleryImage[] = [
    {
      id: 1,
      title: "Grand Atrium & Lobby Reception",
      category: "Offices & Atrium",
      image: "/images/lobby.png",
      location: "750 Fifth Avenue, Manhattan Headquarters",
      description: "Polished Calacatta marble floors, warm ambient lighting, mahogany accent paneling, and floor-to-ceiling glass skyline vistas.",
    },
    {
      id: 2,
      title: "Executive Chambers Law Corridor",
      category: "Executive Hallways",
      image: "/images/corridor.png",
      location: "Executive East Wing, Partner Suites",
      description: "Lined with hand-finished mahogany doors, glass partitions, linear ceiling lighting, and quiet consultation alcoves.",
    },
    {
      id: 3,
      title: "Supreme Courtroom Trial Chamber",
      category: "Judicial Chambers",
      image: "/images/courtroom.png",
      location: "Federal District Annex & Appellate Vault",
      description: "Hand-carved judge's bench with judicial seal, dark oak seats, and historic law reports archive.",
    },
  ];

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
    }
  };

  return (
    <section
      id="firm-gallery"
      className="py-24 bg-white border-b border-primary/5"
      aria-label="Firm Architecture and Chambers Showcase"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-secondary">
            Architectural Showcase
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-primary">
            Firm Architecture & Chambers
          </h2>
          <div className="w-16 h-[2px] bg-secondary pt-1" />
          <p className="text-text-muted text-sm font-sans font-light max-w-xl">
            A selective tour of our executive chambers, judicial trial rooms, and Manhattan headquarters.
          </p>
        </div>

        {/* 3-Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative bg-bg-light border border-primary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay Icon */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="h-5 w-5 text-secondary" />
                  </div>
                </div>
              </div>

              {/* Card Metadata */}
              <div className="p-6 space-y-2 bg-white">
                <div className="flex items-center space-x-2 text-xs text-secondary font-semibold uppercase tracking-wider">
                  <Camera className="h-3.5 w-3.5" />
                  <span>{item.category}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted font-light line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/80 backdrop-blur-md transition-opacity"
            onClick={closeLightbox}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-5xl bg-white border border-primary/10 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 text-primary hover:text-secondary bg-bg-light rounded-full transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev & Next Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 text-primary hover:text-secondary border border-primary/10 shadow-md transition-all hover:scale-105"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 text-primary hover:text-secondary border border-primary/10 shadow-md transition-all hover:scale-105"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[4/3] bg-primary/5">
                <Image
                  src={galleryItems[activeLightboxIndex].image}
                  alt={galleryItems[activeLightboxIndex].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-center space-y-4 bg-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-secondary">
                  {galleryItems[activeLightboxIndex].category}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-primary">
                  {galleryItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-secondary font-medium">
                  {galleryItems[activeLightboxIndex].location}
                </p>
                <p className="text-text-muted text-sm leading-relaxed font-light">
                  {galleryItems[activeLightboxIndex].description}
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      closeLightbox();
                      document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 bg-primary text-white text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-colors"
                  >
                    Schedule Consultation at this Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
