import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ArrowRight, Gift, Award, CheckCircle2 } from 'lucide-react';
import { Banner } from '@/types';

interface PromoBannerProps {
  banner?: Banner | null;
  whatsappNumber?: string;
}

export default function PromotionalBanner({ banner, whatsappNumber = '9953564151' }: PromoBannerProps) {
  if (banner && !banner.is_active) {
    return null;
  }

  const title = 'SPECIAL DISTRIBUTOR OFFER: 40 + 20 FREE';
  const subtitle = '40 स्कूटर खरीदें और 20 स्कूटर बिल्कुल FREE पाएँ!';
  const offer =
    banner?.offer_text && !banner.offer_text.includes('15,000')
      ? banner.offer_text
      : 'Electric Scooter Starting ₹11,000/- • Single Light Model ₹15,000/- • Battery Starting ₹15,000/- • 60 Month Warranty!';
  const buttonText = banner?.button_text || 'Claim 40 + 20 FREE Offer';
  const buttonLink = banner?.button_link || '/dealership';

  return (
    <section className="py-10 sm:py-12 bg-white px-4 sm:px-6 lg:px-8 border-b border-brand-200">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-royal-800 border-2 border-amber-400 p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Official Offer Details & 3-Tier Rate Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-600 text-xs font-bold text-white uppercase tracking-widest font-serif shadow-sm">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Baba Marketing Offer</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-brand-950 text-xs font-black shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>60 MONTH WARRANTY</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-amber-300 text-base sm:text-lg font-black">
              {subtitle}
            </p>

            {/* Official 3-Tier Rate Boxes matching the Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md">
                <div className="bg-brand-900 px-3 py-1.5 text-[10px] font-bold text-white text-center uppercase">
                  Electric Scooter Starting
                </div>
                <div className="bg-amber-400 px-3 py-2 text-center">
                  <div className="text-lg font-black text-crimson-600 leading-none">₹11,000/-</div>
                  <div className="text-[11px] font-extrabold text-brand-950 mt-0.5">से शुरू</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md">
                <div className="bg-brand-900 px-3 py-1.5 text-[10px] font-bold text-white text-center uppercase">
                  Single Light Model
                </div>
                <div className="bg-amber-400 px-3 py-2 text-center">
                  <div className="text-lg font-black text-crimson-600 leading-none">₹15,000/-</div>
                  <div className="text-[11px] font-extrabold text-brand-950 mt-0.5">से शुरू</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md">
                <div className="bg-brand-900 px-3 py-1.5 text-[10px] font-bold text-white text-center uppercase">
                  Battery Starting Price
                </div>
                <div className="bg-amber-400 px-3 py-2 text-center">
                  <div className="text-lg font-black text-crimson-600 leading-none">₹15,000/-</div>
                  <div className="text-[11px] font-extrabold text-brand-950 mt-0.5">से शुरू</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-white/95 font-semibold text-xs sm:text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{offer}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <Link
                href={buttonLink}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2 shadow-glow-yellow"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                  'Hello Baba Marketing, I want to enquire about the 40 + 20 FREE Distributor Offer and FRENDO E-SCOOTY rates starting at ₹11,000/-.'
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

          {/* Right: Full Official FRENDO Offer Banner Poster */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white border-4 border-amber-400 shadow-2xl">
              <Image
                src="/images/frendo-offer-banner.jpg"
                alt="BABA MARKETING FRENDO E-SCOOTY - Starting ₹11,000/-, Single Light Model ₹15,000/-, Battery ₹15,000/-, Special Distributor Offer 40 + 20 FREE, 60 Month Warranty"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
