import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Tag, Sparkles, Gift } from 'lucide-react';
import { Banner } from '@/types';

interface PromoBannerProps {
  banner?: Banner | null;
  whatsappNumber?: string;
}

export default function PromotionalBanner({ banner, whatsappNumber = '9953564151' }: PromoBannerProps) {
  if (banner && !banner.is_active) {
    return null;
  }

  const title = banner?.title || 'B2B Franchise & Showroom Festival Offers';
  const subtitle = banner?.subtitle || 'Zero Petrol. Zero Noise. 100% Copper Motor & 5-Year Warranty.';
  const offer = banner?.offer_text || 'Special Dealership Benefits on 40 Scooties: Free Transport + Free Demo Scooty + Free Demo Battery + Shop Rent Support!';
  const buttonText = banner?.button_text || 'Join Dealer Network';
  const buttonLink = banner?.button_link || '/#dealership';

  return (
    <section className="py-10 bg-white px-4 sm:px-6 lg:px-8 border-b border-brand-200">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-royal-800 border-2 border-amber-400 p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-600 text-xs font-bold text-white uppercase tracking-widest font-serif shadow-sm">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Showroom & Dealer Special</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-white/90 text-xs sm:text-sm font-medium">{subtitle}</p>

          <div className="p-3.5 rounded-xl bg-amber-400 text-brand-950 border border-amber-500 font-bold text-xs sm:text-sm shadow-sm">
            🎁 {offer}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href={buttonLink}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-glow-yellow"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                'Hello Baba Marketing, I want to inquire about the promotional dealership offers on FRENDO E-SCOOTY.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-brand-50 text-brand-900 font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-brand-700" />
              <span>Claim Offer on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
