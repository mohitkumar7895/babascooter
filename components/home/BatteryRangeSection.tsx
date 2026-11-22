'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Battery, BatteryCharging, Gauge, Palette, Award, Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BatteryRangeSection() {
  const [selectedBatteryIdx, setSelectedBatteryIdx] = useState(1);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const batteries = [
    {
      name: 'LFP 60V / 20Ah',
      range: '50 – 70 KM',
      usage: 'City Commute & Quick Errands',
      charging: '3 – 4 Hours',
      features: 'Lightweight Pack, Fast Smart Charging, LFP Thermal Stability',
    },
    {
      name: 'LFP 60V / 30Ah',
      range: '80 – 110 KM',
      usage: 'Daily Office & Family Rides (Most Popular)',
      charging: '4 – 5 Hours',
      features: 'High Energy Density, 2500+ Charge Cycles, Zero Degradation',
    },
    {
      name: 'LFP 60V / 45Ah',
      range: '120 – 160 KM',
      usage: 'Long Daily Travel & Commercial Use',
      charging: '5 – 6 Hours',
      features: 'Intelligent BMS Protection, Cell Balancing, Fire-Proof Metal Enclosure',
    },
    {
      name: 'LFP 60V / 60Ah',
      range: '180 – 220 KM',
      usage: 'Heavy Delivery Duty & Inter-City',
      charging: '6 – 7 Hours',
      features: 'High-Discharge Peak Current, Rapid Regen Support, Extended Warranty',
    },
    {
      name: 'LFP 60V / 75Ah',
      range: '250 – 300 KM',
      usage: 'Hyper-Range Flagship Fleet',
      charging: '7 – 8 Hours',
      features: 'Maximum 300 KM Range, Dual-Battery Bay Ready, Heavy-Duty BMS',
    },
  ];

  const colors = [
    { name: 'Royal Obsidian Black', hex: '#111827', accent: '#374151' },
    { name: 'Pearl Ivory White', hex: '#F8FAFC', accent: '#E2E8F0' },
    { name: 'Crimson Sport Red', hex: '#DC2626', accent: '#EF4444' },
    { name: 'Sapphire Metallic Blue', hex: '#1D4ED8', accent: '#3B82F6' },
    { name: 'Matte Titanium Grey', hex: '#4B5563', accent: '#6B7280' },
  ];

  const selectedBattery = batteries[selectedBatteryIdx];
  const selectedColor = colors[selectedColorIdx];

  return (
    <section id="battery-range" className="py-12 sm:py-16 bg-navy-900 text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
            <span>Advanced LFP Chemistry</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            🔋 BATTERY OPTIONS & ⚡ RUNNING RANGE
          </h2>

          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            We offer advanced <strong className="text-amber-400">LFP (Lithium Iron Phosphate)</strong> battery options with running range from <strong className="text-white">50 KM to 300 KM</strong> to meet every customer and delivery requirement.
          </p>

          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-black text-amber-300">
            Battery Starting Price: ₹15,000/- (All Taxes Included)
          </div>
        </div>

        {/* 5 LFP Battery Packs Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
          {batteries.map((b, idx) => {
            const isSelected = idx === selectedBatteryIdx;
            return (
              <button
                key={b.name}
                type="button"
                onClick={() => setSelectedBatteryIdx(idx)}
                className={`p-4 rounded-2xl text-left transition-all flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-900 border-amber-500 shadow-glow scale-[1.02]'
                    : 'bg-navy-950/80 border-white/10 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Battery className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-amber-400 font-bold">
                      Pack {idx + 1}
                    </span>
                  </div>

                  <div className="font-extrabold text-sm text-white">{b.name}</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">{b.range}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{b.usage}</div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Charge: {b.charging}</span>
                  {isSelected && <span className="font-bold text-amber-400">Selected</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Running Range & Color Customizer Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Active Battery & Range Detail Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-navy-950 border border-amber-500/30 space-y-6 flex flex-col justify-between gold-border-glow">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold font-serif">
                  Selected Battery Configuration
                </span>
                <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300">
                  LFP Technology
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {selectedBattery.name} — <span className="text-amber-400">{selectedBattery.range}</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedBattery.usage}. Built with high-safety Lithium Iron Phosphate cells that eliminate thermal runaway risk and provide over 2,500 full charge-discharge cycles.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400">Running Range</div>
                  <div className="text-base font-extrabold text-amber-400">{selectedBattery.range}</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-slate-400">Starting Price</div>
                  <div className="text-base font-extrabold text-white">₹15,000/-</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-slate-400">Full Charge Time</div>
                  <div className="text-base font-extrabold text-white">{selectedBattery.charging}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedBattery.features}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/919953564151?text=${encodeURIComponent(
                  `Hello Baba Marketing, I want to inquire about the ${selectedBattery.name} battery option (${selectedBattery.range} range) starting at ₹15,000/-.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Enquire on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-slate-400">
                Range is certified for 50 KM up to 300 KM under standard riding conditions.
              </span>
            </div>
          </div>

          {/* Right: 🎨 5 Attractive Colour Options & 5-Year Warranty */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            
            {/* Colour Selector Card */}
            <div className="p-6 rounded-3xl bg-navy-950 border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  🎨 5 Attractive Colours Available
                </h3>
              </div>

              <p className="text-xs text-slate-300">
                Choose from 5 attractive colours to match your style and preference. High-gloss & matte automotive UV coatings.
              </p>

              <div className="flex items-center gap-3 pt-1">
                {colors.map((c, idx) => {
                  const isColorActive = idx === selectedColorIdx;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        isColorActive
                          ? 'border-amber-400 ring-2 ring-amber-400/40 scale-110'
                          : 'border-slate-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    >
                      {isColorActive && (
                        <Check className={`w-4 h-4 ${idx === 1 ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs font-semibold text-amber-300">
                Selected Shade: <span className="text-white font-bold">{selectedColor.name}</span>
              </div>
            </div>

            {/* 🏆 5-Year Warranty Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-navy-950 border border-amber-500/40 space-y-3 shadow-glow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-navy-950 font-black flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-extrabold text-white">
                    🏆 5-YEAR WARRANTY
                  </h4>
                  <div className="text-xs text-amber-400 font-semibold">
                    Complete Peace of Mind
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                FRENDO E-SCOOTY offers a comprehensive <strong className="text-white">5-Year Warranty</strong> as per applicable company warranty terms and conditions. Tested motor, copper electronics, robust frame, and LFP cells.
              </p>

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Genuine OEM parts & service warranty coverage across India.</span>
              </div>
            </div>

          </div>

        </div>

        {/* View Dedicated Battery Page CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/batteries"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-400 font-bold text-xs uppercase tracking-wider transition-all shadow-glow hover:scale-105 active:scale-95"
          >
            <span>Explore Full LFP Battery Guide & 50–300 KM Specs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
