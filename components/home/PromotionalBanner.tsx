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
    <section className="py-10 bg-navy-950 px-4 sm:px-6 lg:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-navy-900 border border-amber-500/40 p-6 sm:p-10 relative overflow-hidden shadow-2xl gold-border-glow">
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/20 text-xs font-bold text-amber-300 uppercase tracking-widest font-serif">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Showroom & Dealer Special</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm font-medium">{subtitle}</p>

          <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/30 text-amber-300 font-semibold text-xs sm:text-sm">
            🎁 {offer}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href={buttonLink}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-glow"
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
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 border border-white/15"
            >
              <MessageCircle className="w-4 h-4 text-amber-400" />
              <span>Claim Offer on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
