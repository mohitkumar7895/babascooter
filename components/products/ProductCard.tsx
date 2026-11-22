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
    <div className="group rounded-2xl bg-navy-900 border border-white/10 hover:border-amber-500/50 overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
      {/* Top Badges & Image Viewport */}
      <div className="relative">
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/80 backdrop-blur-sm border border-amber-500/30 text-amber-300 font-mono">
            {product.model_number}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-navy-950 shadow">
            {priceDisplay}
          </span>
        </div>

        {/* Product Image Viewport - Full Fill Edge-to-Edge, Zero Blank Borders, Zero Pixelation */}
        <Link
          href={`/scooters/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer"
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
          <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono mb-0.5">
            <span className="font-bold">{product.category_name || 'City Scooter'}</span>
            <span className="text-slate-400">5-Yr Warranty</span>
          </div>

          <Link href={`/scooters/${product.slug}`} className="block group-hover:text-amber-400 transition-colors">
            <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
            {product.short_description || 'High-performance FRENDO electric scooter with reverse gear, front disc brake, and LFP battery.'}
          </p>

          {/* Core Feature Badges */}
          <div className="mt-3 grid grid-cols-3 gap-1 text-[9px] text-slate-300 font-medium">
            <div className="p-1 rounded bg-white/5 flex flex-col items-center text-center">
              <Disc className="w-3 h-3 text-amber-400 mb-0.5" />
              <span className="truncate w-full">Front Disc</span>
            </div>
            <div className="p-1 rounded bg-white/5 flex flex-col items-center text-center">
              <RotateCcw className="w-3 h-3 text-amber-400 mb-0.5" />
              <span className="truncate w-full">Reverse Gear</span>
            </div>
            <div className="p-1 rounded bg-white/5 flex flex-col items-center text-center">
              <Shield className="w-3 h-3 text-amber-400 mb-0.5" />
              <span className="truncate w-full">Central Lock</span>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center gap-2 border-t border-white/5">
          <Link
            href={`/scooters/${product.slug}`}
            className="flex-1 py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>

          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 transition-all flex items-center justify-center shrink-0 shadow"
            title="Enquire on WhatsApp"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-navy-950" />
          </a>
        </div>
      </div>
    </div>
  );
}
