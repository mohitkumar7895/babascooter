'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, Eye, X, ChevronLeft, ChevronRight, Zap, Shield, Check, Disc, RotateCcw } from 'lucide-react';

interface ModelItem {
  setNum: number;
  name: string;
  modelNumber: string;
  slug: string;
  category: string;
  description: string;
  images: {
    url: string;
    isPrimary: boolean;
    sortOrder: number;
    alt: string;
  }[];
  price: number;
  priceLabel: string;
  availability: string;
}

export default function ModelsGallerySection() {
  const [models, setModels] = useState<ModelItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeModalModel, setActiveModalModel] = useState<ModelItem | null>(null);
  const [modalImgIndex, setModalImgIndex] = useState(0);

  useEffect(() => {
    fetch('/models/models_catalog.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setModels(data);
      })
      .catch((err) => console.error('Failed to load models catalog:', err));
  }, []);

  const categories = [
    'all',
    'City Scooters',
    'Sport Series',
    'Performance',
    'Commercial Loaders',
    'Special Mobility',
  ];

  const [displayCount, setDisplayCount] = useState(8);

  const filtered = selectedCat === 'all'
    ? models
    : models.filter((m) => m.category === selectedCat);

  // Home page pe starting ke 8 he dikhau
  const displayList = filtered.slice(0, displayCount);

  const openModal = (model: ModelItem) => {
    setActiveModalModel(model);
    setModalImgIndex(0);
  };

  const closeModal = () => {
    setActiveModalModel(null);
    setModalImgIndex(0);
  };

  return (
    <section id="models" className="py-12 sm:py-16 bg-navy-950 text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2.5">
              <span>27 Real Showroom Sets</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              🛵 EXPLORE ALL 27 FRENDO SCOOTER MODELS
            </h2>
            <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every set is engineered with pure copper motor, front disc brakes, digital speedometer, and reverse gear. Click any model to view its complete multi-angle photo gallery.
            </p>
          </div>

          <Link
            href="/scooters"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors self-start md:self-auto"
          >
            <span>View Full 27 Models Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all ${
                selectedCat === cat
                  ? 'bg-amber-500 text-navy-950 font-black shadow-glow'
                  : 'bg-navy-900 text-slate-300 border border-white/10 hover:border-amber-500/40'
              }`}
            >
              {cat === 'all' ? 'All 27 Models' : cat}
            </button>
          ))}
        </div>

        {/* Models Grid (Set-Wise with Zero Pixelation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayList.map((m) => {
            const mainImg = m.images[0]?.url || `/models/set-${m.setNum}/main.jpg`;
            const waMsg = `Hello Baba Marketing, I am interested in ${m.name} (${m.modelNumber}) starting at ₹15,000/-. Please share showroom availability and best offers.`;

            return (
              <div
                key={m.setNum}
                className="group rounded-2xl bg-navy-900 border border-white/10 hover:border-amber-500/50 overflow-hidden shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Viewport: Crisp Aspect 4/3, High-Res, Zero Distortion */}
                <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => openModal(m)}>
                  <Image
                    src={mainImg}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/80 backdrop-blur-sm border border-amber-500/30 text-amber-300 font-mono">
                      {m.modelNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-navy-950 shadow">
                      {m.priceLabel}
                    </span>
                  </div>

                  {/* Multi-Angle Count Pill */}
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] text-slate-200 font-semibold flex items-center gap-1 group-hover:bg-amber-500 group-hover:text-navy-950 transition-colors">
                    <Eye className="w-3 h-3" />
                    <span>{m.images.length} Photos</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] font-serif uppercase tracking-wider text-amber-400/90 font-bold">
                      {m.category} • Set #{m.setNum}
                    </div>

                    <Link href={`/scooters/${m.slug}`}>
                      <h3 className="font-bold text-sm text-white mt-0.5 line-clamp-1 hover:text-amber-400 transition-colors">
                        {m.name}
                      </h3>
                    </Link>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {m.description}
                    </p>

                    {/* Standard Features Mini Pills */}
                    <div className="mt-2.5 grid grid-cols-3 gap-1 text-[9px] text-slate-300 font-medium">
                      <div className="p-1 rounded bg-white/5 text-center truncate">Front Disc</div>
                      <div className="p-1 rounded bg-white/5 text-center truncate">Reverse Gear</div>
                      <div className="p-1 rounded bg-white/5 text-center truncate">Central Lock</div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-white/5 flex items-center gap-1.5">
                    <Link
                      href={`/scooters/${m.slug}`}
                      className="flex-1 py-2 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-navy-950 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-1 transition-all text-center"
                    >
                      <span>Model Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openModal(m)}
                      className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                      title="Quick Gallery"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    <a
                      href={`https://wa.me/919953564151?text=${encodeURIComponent(waMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 transition-all flex items-center justify-center shrink-0"
                      title="Enquire on WhatsApp"
                      aria-label="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-navy-950" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All 27 Models CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {filtered.length > 8 && (
            <button
              type="button"
              onClick={() => setDisplayCount((prev) => (prev === 8 ? filtered.length : 8))}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-400 font-bold text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <span>
                {displayCount === 8
                  ? `Show More Models (${filtered.length - 8} More)`
                  : 'Show Starting 8 Models'}
              </span>
            </button>
          )}

          <Link
            href="/scooters"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all text-center"
          >
            <span>Explore All 27 Scooter & Commercial Sets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Multi-Angle Lightbox Modal */}
      <AnimatePresence>
        {activeModalModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Header info */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                  {activeModalModel.name} ({activeModalModel.modelNumber})
                </h3>
                <div className="text-xs text-amber-400 font-mono">
                  Set #{activeModalModel.setNum} • Photo {modalImgIndex + 1} of {activeModalModel.images.length}
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Active Image Viewport */}
            <div
              className="relative w-full max-w-4xl aspect-[4/3] max-h-[70vh] rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/30 flex items-center justify-center my-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeModalModel.images[modalImgIndex]?.url || activeModalModel.images[0]?.url}
                alt={activeModalModel.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />

              {/* Prev / Next Arrows */}
              {activeModalModel.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImgIndex((prev) => (prev === 0 ? activeModalModel.images.length - 1 : prev - 1));
                    }}
                    className="absolute left-3 p-2.5 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-navy-950 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImgIndex((prev) => (prev === activeModalModel.images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-3 p-2.5 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-navy-950 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            <div
              className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 pt-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {activeModalModel.images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setModalImgIndex(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border-2 transition-all shrink-0 ${
                    i === modalImgIndex
                      ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 z-10">
              <Link
                href={`/scooters/${activeModalModel.slug}`}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-white/20"
              >
                <span>Open Dedicated Model Page</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>

              <a
                href={`https://wa.me/919953564151?text=${encodeURIComponent(
                  `Hello Baba Marketing, I am looking at ${activeModalModel.name} (${activeModalModel.modelNumber}) and want to book a test ride.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
