'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tag,
  Shield,
  Gauge,
  Lock,
  Disc,
  Cpu,
  Zap,
  Cable,
  Package,
  Palette,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';

export default function ScootyFeaturesSection() {
  const [expanded, setExpanded] = useState(false);

  const features = [
    {
      icon: Tag,
      title: 'Starting Price: ₹15,000/-',
      subtitle: 'All Taxes Included',
      desc: 'Most accessible, competitive starting price for an electric vehicle in India with zero hidden charges.',
      highlight: true,
    },
    {
      icon: Shield,
      title: 'Heavy-Duty Chassis',
      subtitle: 'Reinforced Steel Frame',
      desc: 'Engineered specifically for rugged Indian road conditions with robust structural load capacity.',
    },
    {
      icon: Gauge,
      title: 'Digital Meter',
      subtitle: 'Multi-Info Cockpit',
      desc: 'Crystal-clear digital speedometer showing battery level, speed, trip meter, and indicator status.',
    },
    {
      icon: Lock,
      title: 'Central Locking System',
      subtitle: 'Anti-Theft Remote Key',
      desc: 'Remote key with central locking, wheel lock, and anti-theft security siren alert.',
    },
    {
      icon: Disc,
      title: 'Front Disc Brake',
      subtitle: 'Hydraulic Stopping Power',
      desc: 'High-performance hydraulic disc brake system ensuring instant stopping control on wet or dry tarmac.',
    },
    {
      icon: Cpu,
      title: '48V / 60V / 72V Controller',
      subtitle: 'Intelligent Multi-Stage',
      desc: 'Flexible controller options allowing custom tuning for acceleration, hill-climb, and speed.',
    },
    {
      icon: Zap,
      title: '100% Copper Motor',
      subtitle: 'High-Torque BLDC',
      desc: 'Pure copper winding motor delivering maximum thermal durability, silent operation, and long life.',
    },
    {
      icon: Cable,
      title: 'Copper Wiring',
      subtitle: 'Heavy-Gauge Electricals',
      desc: 'High-grade copper harness preventing overheating, energy transmission loss, and short-circuits.',
    },
    {
      icon: Package,
      title: 'Helmet Storage in Dickey',
      subtitle: 'Spacious Under-Seat Boot',
      desc: 'Generous secure under-seat storage designed to store full/half helmets, chargers, and daily groceries.',
    },
    {
      icon: Palette,
      title: '5 Attractive Colours Available',
      subtitle: 'Premium Gloss & Matte Finish',
      desc: 'Available in 5 head-turning shades crafted with multi-layer UV-resistant automotive paint.',
    },
    {
      icon: Award,
      title: '5-Year Warranty',
      subtitle: 'Company Terms & Peace of Mind',
      desc: 'Comprehensive 5-Year Warranty coverage as per applicable company warranty terms and conditions.',
      highlight: true,
    },
  ];

  const displayedFeatures = expanded ? features : features.slice(0, 4);

  return (
    <section id="features" className="py-12 sm:py-16 bg-navy-950 text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Built for Reliability</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            🛵 ELECTRIC SCOOTY FEATURES
          </h2>

          <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Every FRENDO E-SCOOTY comes packed with high-end safety, intelligent electronics, pure copper propulsion, and durable heavy-duty construction.
          </p>
        </div>

        {/* Features Grid: 4 cards visible by default */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {displayedFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                  className={`p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between group ${
                    feat.highlight
                      ? 'bg-gradient-to-b from-amber-500/15 via-slate-900/90 to-slate-900 border border-amber-500/40 shadow-glow'
                      : 'bg-slate-900/80 border border-white/10 hover:border-amber-500/30 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 transition-transform group-hover:scale-110 ${
                      feat.highlight
                        ? 'bg-amber-500 text-navy-950 font-black'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white leading-snug">
                      {feat.title}
                    </h3>

                    <div className="text-[11px] font-semibold text-amber-400/90 mt-0.5">
                      {feat.subtitle}
                    </div>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Standard on FRENDO Scooties</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Expand / Collapse Button and Dedicated Page Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-400 font-bold text-xs uppercase tracking-wider transition-all shadow-glow hover:scale-105 active:scale-95"
          >
            <span>
              {expanded ? 'Show Less (Show 4 Features)' : `View All ${features.length} Features & Specs`}
            </span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <Link
            href="/features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-500/30 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Full Features Guide Page</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}

