'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Gauge,
  Sparkles,
  Briefcase,
  CheckCircle2,
  Award,
} from 'lucide-react';

interface HeroSectionProps {
  primaryPhone?: string;
  whatsappNumber?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  heroImage?: string;
}

export default function HeroSection({
  primaryPhone = '9953564151',
  whatsappNumber = '9953564151',
  title,
  subtitle,
  tagline = 'DRIVE GREEN, LIVE BETTER!',
  heroImage = '/models/set-1/main.jpg',
}: HeroSectionProps) {
  const displayTitle = title || 'DISCOVER YOUR FUTURE WITH FRENDO E-SCOOTY';
  const displaySubtitle =
    subtitle ||
    'Electric scooters with advanced LFP batteries (50–300 KM range), starting at ₹15,000/- with lucrative dealership opportunities across India.';

  return (
    <section className="relative bg-gradient-to-b from-brand-50 via-white to-white text-slate-900 pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden border-b border-brand-200">
      {/* Subtle FRENDO Eco Green & Yellow Ambient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-brand-400/15 via-amber-400/10 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-gold opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand, Headlines & Offer Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5 text-center lg:text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-400 border border-brand-800/20 text-xs font-black text-brand-950 shadow-sm max-w-full truncate">
              <span className="w-2 h-2 rounded-full bg-brand-800 animate-ping shrink-0" />
              <span className="font-serif tracking-widest uppercase font-black text-brand-950 truncate">
                {tagline}
              </span>
              <span className="text-brand-900/40 hidden sm:inline">•</span>
              <span className="text-brand-900 font-bold hidden sm:inline">FRENDO E-SCOOTY</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-royal-800">
              {displayTitle.includes('FRENDO') ? (
                <>
                  {displayTitle.split('FRENDO')[0]}
                  <span className="text-gradient-gold block sm:inline mt-1">
                    FRENDO {displayTitle.split('FRENDO')[1]}
                  </span>
                </>
              ) : (
                <span className="text-gradient-gold">{displayTitle}</span>
              )}
            </h1>

            {/* Subtitle / Intro Text */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {displaySubtitle}
            </p>

            {/* 4 Pillars Highlight Badges (Banner Green + Yellow + Crimson Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-amber-400/25 border-2 border-amber-500 text-left hover:shadow-md transition-all">
                <Zap className="w-4 h-4 text-brand-800 mb-1" />
                <div className="text-xs font-black text-crimson-600">Starting ₹15,000/-</div>
                <div className="text-[10px] text-brand-900 font-bold">All Taxes Included</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-brand-200 text-left hover:border-brand-600 transition-colors shadow-sm">
                <BatteryCharging className="w-4 h-4 text-brand-700 mb-1" />
                <div className="text-xs font-extrabold text-slate-900">LFP Battery</div>
                <div className="text-[10px] text-slate-600 font-medium">60V 20Ah to 75Ah</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-royal-200 text-left hover:border-royal-700 transition-colors shadow-sm">
                <Gauge className="w-4 h-4 text-royal-800 mb-1" />
                <div className="text-xs font-extrabold text-royal-800">50 KM – 300 KM</div>
                <div className="text-[10px] text-slate-600 font-medium">Running Range</div>
              </div>

              <div className="p-3 rounded-xl bg-crimson-50 border border-crimson-500/30 text-left hover:border-crimson-600 transition-colors shadow-sm">
                <Award className="w-4 h-4 text-crimson-600 mb-1" />
                <div className="text-xs font-extrabold text-crimson-600">5-Year Warranty</div>
                <div className="text-[10px] text-slate-700 font-medium">Company Backed</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/dealership"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border-2 border-brand-800/15"
              >
                <Briefcase className="w-4 h-4 fill-brand-950" />
                <span>Join Dealer Network (40 Scooties)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/scooters"
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-royal-800 hover:bg-royal-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore 27 Models</span>
              </Link>

              <a
                href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                  'Hello Baba Marketing, I am interested in FRENDO E-SCOOTY models and B2B Dealership.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-amber-400" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>
            </div>

            {/* Official Website & Dealership Tag */}
            <div className="pt-1 text-xs text-slate-600 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
              <span>Official Website: <strong className="text-brand-800">www.frendo.in</strong> • B2B Dealerships Open Across India</span>
            </div>

          </motion.div>

          {/* Right Column: High-Res Flagship Vehicle Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center w-full"
          >
            {/* Showroom Vehicle Stage Box */}
            <div className="relative w-full aspect-[4/3] max-w-lg rounded-3xl overflow-hidden bg-white border-2 border-brand-800/25 shadow-xl flex items-center justify-center gold-border-glow group">
              <Image
                src={heroImage}
                alt="FRENDO E-SCOOTY Prime B-1 Model"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 550px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Top Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-brand-800/95 backdrop-blur-md border border-amber-400 text-xs font-bold text-white flex items-center gap-2 shadow">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-serif tracking-wider text-amber-400">FRENDO E-SCOOTY</span>
              </div>

              {/* Bottom Price Badge */}
              <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-amber-400 border border-brand-900/20 text-crimson-600 font-black text-xs uppercase tracking-wider shadow-lg">
                Starting ₹15,000/-
              </div>
            </div>

            {/* Subtle Set Selector Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-600 font-mono">
              <span className="text-brand-800 font-bold">27 Unique Sets / Models</span>
              <span>•</span>
              <span className="text-royal-800 font-semibold">LFP 60V Battery Ready</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
