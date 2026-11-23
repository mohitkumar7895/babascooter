'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ArrowRight, Zap, Shield, RotateCcw, Disc, Eye } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export default function ProductCard({ product, whatsappNumber = '9953564151' }: ProductCardProps) {
  const primaryImg = product.primary_image || `/models/set-${product.id}/main.jpg`;
  const specs = product.specifications;

  const motor = specs?.motor_power || (product as any).motor_power || '1000W / 1500W Copper Motor';
  const battery = specs?.battery_voltage || (product as any).battery_voltage || 'LFP 60V (50–300 KM)';
  const priceDisplay = product.price_label || (product.price ? `₹${product.price.toLocaleString('en-IN')}/-` : 'Starting ₹15,000/-');

  const waMessage = `Hello Baba Marketing, I am interested in ${product.name} (${product.model_number}) starting at ₹15,000/-. Please share showroom availability and best offers.`;

  return (
    <div className="group rounded-2xl bg-white border border-brand-200 hover:border-brand-700 overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
      {/* Top Badges & Image Viewport */}
      <div className="relative">
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-royal-800/95 backdrop-blur-sm border border-white/20 text-white font-mono shadow-sm">
            {product.model_number}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-crimson-600 shadow">
            {priceDisplay}
          </span>
        </div>

        {/* Product Image Viewport */}
        <Link
          href={`/scooters/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
        >
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-brand-800 font-mono mb-0.5">
            <span className="font-bold">{product.category_name || 'City Scooter'}</span>
            <span className="text-crimson-600 font-bold">5-Yr Warranty</span>
          </div>

          <Link href={`/scooters/${product.slug}`} className="block group-hover:text-brand-800 transition-colors">
            <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
            {product.short_description || 'High-performance FRENDO electric scooter with reverse gear, front disc brake, and LFP battery.'}
          </p>

          {/* Core Feature Badges */}
          <div className="mt-3 grid grid-cols-3 gap-1 text-[9px] text-slate-700 font-semibold">
            <div className="p-1.5 rounded bg-brand-50 border border-brand-200 flex flex-col items-center text-center">
              <Disc className="w-3 h-3 text-brand-700 mb-0.5" />
              <span className="truncate w-full">Front Disc</span>
            </div>
            <div className="p-1.5 rounded bg-brand-50 border border-brand-200 flex flex-col items-center text-center">
              <RotateCcw className="w-3 h-3 text-brand-700 mb-0.5" />
              <span className="truncate w-full">Reverse Gear</span>
            </div>
            <div className="p-1.5 rounded bg-brand-50 border border-brand-200 flex flex-col items-center text-center">
              <Shield className="w-3 h-3 text-brand-700 mb-0.5" />
              <span className="truncate w-full">Central Lock</span>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-200">
          <Link
            href={`/scooters/${product.slug}`}
            className="flex-1 py-2 px-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>

          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 transition-all flex items-center justify-center shrink-0 shadow-sm border border-amber-500"
            title="Enquire on WhatsApp"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-brand-950" />
          </a>
        </div>
      </div>
    </div>
  );
}
