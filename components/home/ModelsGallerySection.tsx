'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import modelsCatalog from '@/public/models/models_catalog.json';
import { Category, Product } from '@/types';
import { getProductRate } from '@/lib/pricing';

interface GalleryImage {
  url: string;
  isPrimary: boolean;
  sortOrder: number;
  alt: string;
}

interface ModelItem {
  id: number;
  setNum: number;
  name: string;
  modelNumber: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  images: GalleryImage[];
  price: number | null;
  priceLabel: string;
  availability: string;
}

interface ModelsGallerySectionProps {
  products?: Product[];
  categories?: Category[];
  whatsappNumber?: string;
  dbLoaded?: boolean;
}

const FALLBACK_MODELS: ModelItem[] = (modelsCatalog as any[]).map((m, idx) => ({
  id: m.setNum || idx + 1,
  setNum: m.setNum || idx + 1,
  name: m.name,
  modelNumber: m.modelNumber,
  slug: m.slug,
  category: m.category || 'City Scooters',
  categorySlug: (m.category || 'city-scooters').toLowerCase().replace(/\s+/g, '-'),
  description: m.description || '',
  images: Array.isArray(m.images) ? m.images : [],
  price: m.price ?? null,
  priceLabel: m.priceLabel || 'Starting ₹11,000/-',
  availability: m.availability || 'In Stock',
}));

export default function ModelsGallerySection({
  products = [],
  categories = [],
  whatsappNumber = '9953564151',
  dbLoaded = false,
}: ModelsGallerySectionProps) {
  const models: ModelItem[] = useMemo(() => {
    if (!dbLoaded) {
      return FALLBACK_MODELS;
    }

    return products.map((p, idx) => {
      const rate = getProductRate(p);
      const imgs: GalleryImage[] =
        p.images && p.images.length > 0
          ? p.images.map((img, i) => ({
              url: img.image_url,
              isPrimary: Boolean(img.is_primary),
              sortOrder: img.sort_order ?? i,
              alt: img.alt_text || p.name,
            }))
          : p.primary_image
          ? [
              {
                url: p.primary_image,
                isPrimary: true,
                sortOrder: 0,
                alt: p.name,
              },
            ]
          : [];

      return {
        id: p.id,
        setNum: idx + 1,
        name: p.name,
        modelNumber: p.model_number,
        slug: p.slug,
        category: p.category_name || rate.tier || 'Electric Scooty',
        categorySlug: p.category_slug || '',
        description:
          p.short_description ||
          'High-performance FRENDO electric scooter with reverse gear, front disc brake, and LFP battery.',
        images: imgs,
        price: p.price,
        priceLabel: rate.priceDisplay,
        availability: p.availability || 'In Stock',
      };
    });
  }, [products, dbLoaded]);

  const categoryPills = useMemo(() => {
    if (dbLoaded && categories.length > 0) {
      return [
        { key: 'all', label: `All ${models.length} Models` },
        ...categories.map((c) => ({ key: c.slug, label: c.name })),
      ];
    }

    const uniqueCats = Array.from(new Set(models.map((m) => m.category).filter(Boolean)));
    return [
      { key: 'all', label: `All ${models.length} Models` },
      ...uniqueCats.map((name) => ({ key: name, label: name })),
    ];
  }, [categories, models, dbLoaded]);

  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeModalModel, setActiveModalModel] = useState<ModelItem | null>(null);
  const [modalImgIndex, setModalImgIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(8);

  const filtered = useMemo(() => {
    if (selectedCat === 'all') return models;
    return models.filter(
      (m) => m.categorySlug === selectedCat || m.category === selectedCat
    );
  }, [models, selectedCat]);

  const displayList = filtered.slice(0, displayCount);

  const openModal = (model: ModelItem) => {
    if (model.images.length === 0) return;
    setActiveModalModel(model);
    setModalImgIndex(0);
  };

  const closeModal = () => {
    setActiveModalModel(null);
    setModalImgIndex(0);
  };

  const waDigits = (whatsappNumber || '9953564151').replace(/\D/g, '');
  const waTarget = waDigits.startsWith('91') && waDigits.length > 10 ? waDigits : `91${waDigits}`;

  return (
    <section id="models" className="py-12 sm:py-16 bg-white text-slate-900 relative border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-royal-800 text-xs font-bold text-white uppercase tracking-widest mb-2.5 shadow-sm">
              <span>{models.length} Real Showroom Models</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-royal-800 tracking-tight">
              🛵 EXPLORE ALL {models.length} FRENDO SCOOTER MODELS
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every model is engineered with pure copper motor, front disc brakes, digital speedometer, and reverse gear. Click any model to view its complete photo gallery.
            </p>
          </div>

          <Link
            href="/scooters"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-800 hover:text-brand-600 transition-colors self-start md:self-auto"
          >
            <span>View Full {models.length} Models Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categoryPills.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setSelectedCat(cat.key);
                setDisplayCount(8);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all ${
                selectedCat === cat.key
                  ? 'bg-brand-800 text-amber-400 font-black shadow-glow'
                  : 'bg-brand-50 text-slate-700 border border-brand-200 hover:border-brand-700 hover:text-brand-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Models Grid */}
        {displayList.length === 0 ? (
          <div className="p-12 rounded-2xl bg-brand-50 border border-brand-200 text-center space-y-3">
            <Zap className="w-8 h-8 text-brand-800 mx-auto" />
            <div className="font-serif text-base font-bold text-slate-900">
              No models found in this category
            </div>
            <button
              type="button"
              onClick={() => setSelectedCat('all')}
              className="px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-bold uppercase tracking-wider"
            >
              Show All Models
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayList.map((m) => {
              const mainImg = m.images[0]?.url || '';
              const waMsg = `Hello Baba Marketing, I am interested in ${m.name} (${m.modelNumber} - ${m.priceLabel}). Please share showroom availability and best offers.`;

              return (
                <div
                  key={m.id}
                  className="group rounded-2xl bg-white border border-brand-200 hover:border-brand-700 overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Viewport */}
                  <div
                    className={`relative aspect-[4/3] w-full bg-slate-100 overflow-hidden ${
                      mainImg ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => openModal(m)}
                  >
                    {mainImg ? (
                      <Image
                        src={mainImg}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Link
                        href={`/scooters/${m.slug}`}
                        className="w-full h-full flex items-center justify-center bg-brand-50 p-6"
                      >
                        <Image
                          src="/logo.jpeg"
                          alt={m.name}
                          fill
                          sizes="240px"
                          className="object-contain p-8 opacity-80"
                        />
                      </Link>
                    )}

                    {/* Top Badge Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-royal-800/95 backdrop-blur-sm border border-white/20 text-white font-mono shadow-sm">
                        {m.modelNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-crimson-600 shadow">
                        {m.priceLabel}
                      </span>
                    </div>

                    {/* Multi-Angle Count Pill */}
                    {m.images.length > 0 && (
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-brand-900/90 backdrop-blur-sm border border-amber-400/50 text-[10px] text-white font-semibold flex items-center gap-1 group-hover:bg-amber-400 group-hover:text-brand-950 transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>
                          {m.images.length} {m.images.length === 1 ? 'Photo' : 'Photos'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[10px] font-serif uppercase tracking-wider text-brand-700 font-bold">
                        {m.category}
                      </div>

                      <Link href={`/scooters/${m.slug}`}>
                        <h3 className="font-bold text-sm text-slate-900 mt-0.5 line-clamp-1 hover:text-brand-800 transition-colors">
                          {m.name}
                        </h3>
                      </Link>

                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {m.description}
                      </p>

                      {/* Standard Features Mini Pills */}
                      <div className="mt-2.5 grid grid-cols-3 gap-1 text-[9px] text-brand-900 font-semibold">
                        <div className="p-1 rounded bg-brand-50 border border-brand-200 text-center truncate">Front Disc</div>
                        <div className="p-1 rounded bg-brand-50 border border-brand-200 text-center truncate">Reverse Gear</div>
                        <div className="p-1 rounded bg-brand-50 border border-brand-200 text-center truncate">Central Lock</div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5">
                      <Link
                        href={`/scooters/${m.slug}`}
                        className="flex-1 py-2 px-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all text-center shadow-sm"
                      >
                        <span>Model Page</span>
                        <ArrowRight className="w-3 h-3 text-amber-400" />
                      </Link>

                      {m.images.length > 0 && (
                        <button
                          type="button"
                          onClick={() => openModal(m)}
                          className="py-2 px-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                          title="Quick Gallery"
                        >
                          <Eye className="w-3.5 h-3.5 text-brand-700" />
                        </button>
                      )}

                      <a
                        href={`https://wa.me/${waTarget}?text=${encodeURIComponent(waMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all flex items-center justify-center shrink-0 border border-[#1ebe5d] shadow-sm"
                        title="Enquire on WhatsApp"
                        aria-label="Enquire on WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Models CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {filtered.length > 8 && (
            <button
              type="button"
              onClick={() => setDisplayCount((prev) => (prev === 8 ? filtered.length : 8))}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-brand-50 text-brand-800 border-2 border-brand-800 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-105 transition-all text-center border border-amber-500"
          >
            <span>Explore All {models.length} Scooter &amp; Commercial Models</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Multi-Angle Lightbox Modal */}
      <AnimatePresence>
        {activeModalModel && activeModalModel.images.length > 0 && (
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
                  Photo {modalImgIndex + 1} of {activeModalModel.images.length}
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
                  key={`${img.url}-${i}`}
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
                href={`https://wa.me/${waTarget}?text=${encodeURIComponent(
                  `Hello Baba Marketing, I am looking at ${activeModalModel.name} (${activeModalModel.modelNumber}) and want to book a test ride.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
