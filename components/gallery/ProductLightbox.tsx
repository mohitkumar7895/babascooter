'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductLightbox({ images, productName }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="h-80 bg-brand-50 rounded-2xl flex items-center justify-center border border-brand-200 text-slate-500 font-medium">
        No images available
      </div>
    );
  }

  const activeImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-[4/3] w-full max-h-[580px] rounded-2xl bg-slate-100 border-2 border-brand-200 shadow-lg overflow-hidden group">
        <div className="relative w-full h-full cursor-pointer" onClick={() => setModalOpen(true)}>
          <Image
            src={activeImage.image_url}
            alt={activeImage.alt_text || productName}
            fill
            priority
            quality={100}
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Zoom trigger pill */}
        <button
          onClick={() => setModalOpen(true)}
          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-brand-800/95 backdrop-blur-sm text-xs font-semibold text-white flex items-center gap-1.5 hover:bg-brand-700 transition-colors shadow-sm"
        >
          <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
          <span>Click to Zoom</span>
        </button>

        {/* Image Counter Badge */}
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-royal-800/90 text-xs text-white font-mono shadow-sm">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Left / Right arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-800/90 text-amber-400 border border-amber-400 shadow-md hover:bg-amber-400 hover:text-brand-950 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-800/90 text-amber-400 border border-amber-400 shadow-md hover:bg-amber-400 hover:text-brand-950 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails list */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border-2 transition-all p-0 flex items-center justify-center ${
                isActive
                  ? 'border-brand-800 ring-2 ring-amber-400 shadow-md'
                  : 'border-slate-200 hover:border-brand-600 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || `${productName} thumb ${idx + 1}`}
                  fill
                  sizes="140px"
                  className="object-cover object-center"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <span className="text-sm text-slate-400 font-mono">
              {activeIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setModalOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className="relative w-full max-w-6xl h-[75vh] sm:h-[88vh] flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.image_url}
              alt={activeImage.alt_text || productName}
              fill
              quality={100}
              unoptimized={true}
              sizes="100vw"
              className="object-contain object-center filter drop-shadow-2xl"
            />
          </div>

          {/* Modal navigation arrows */}
          {images.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/25 text-white pointer-events-auto transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/25 text-white pointer-events-auto transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          )}

          {/* Modal caption */}
          <div className="text-center mt-4 text-sm text-slate-300 font-medium">
            {activeImage.alt_text || `${productName} view`}
          </div>
        </div>
      )}
    </div>
  );
}
