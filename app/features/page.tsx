import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
  ChevronRight,
  Sliders,
  Check,
} from 'lucide-react';
import { getCachedContact } from '@/lib/data';

export const metadata = {
  title: 'Electric Scooty Features & Specifications | FRENDO E-SCOOTY',
  description:
    'Explore the complete features of FRENDO electric scooters: Starting ₹15,000/-, Heavy-Duty Chassis, Digital Meter, Central Locking, Front Disc Brake, Copper Motor, and 5-Year Warranty.',
};

export const revalidate = 300;

export default async function FeaturesPage() {
  const contact = await getCachedContact();

  const phone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';

  const allFeatures = [
    {
      icon: Tag,
      title: 'Starting Price: ₹15,000/-',
      subtitle: 'All Taxes Included & Zero Hidden Cost',
      badge: 'Unbeatable Value',
      desc: 'Most accessible starting price in India for an electric two-wheeler. Includes GST and standard showroom setup, giving you maximum everyday mobility at minimal initial investment.',
      highlights: [
        'Complete scooty package from ₹15,000/-',
        'Transparent manufacturer pricing',
        'Direct subsidy on bulk dealership packs',
      ],
      heroHighlight: true,
    },
    {
      icon: Shield,
      title: 'Heavy-Duty Reinforced Chassis',
      subtitle: 'Automotive-Grade Tubular Steel Frame',
      badge: 'Rugged Durability',
      desc: 'Engineered specifically to conquer demanding Indian road conditions, potholes, and speed bumps. Multi-layer anti-rust electrostatic powder coating guarantees zero structural corrosion over years of intensive usage.',
      highlights: [
        'High load capacity for 2 adult riders + payload',
        'Precision robot-welded joints',
        'Anti-rust primer coating',
      ],
    },
    {
      icon: Gauge,
      title: 'Digital High-Contrast Speedometer',
      subtitle: 'Multi-Info Sunlight-Readable Cockpit',
      badge: 'Smart Cockpit',
      desc: 'High-visibility digital cockpit that remains crystal-clear even under direct scorching sunlight. Displays real-time speed, battery percentage gauge, trip meter, headlight, and turn indicator status.',
      highlights: [
        'Accurate battery state of charge (SoC)',
        'Trip distance & odometer memory',
        'Integrated diagnostic fault indicators',
      ],
    },
    {
      icon: Lock,
      title: 'Central Locking & Anti-Theft Siren',
      subtitle: 'Smart Wireless Remote Key System',
      badge: 'Maximum Security',
      desc: 'Dual smart remote keys with keyless ignition, remote motor lock, and an ultra-sensitive motion alarm siren that deters unauthorized tampering or forced wheel movement.',
      highlights: [
        'Keyless remote start & push-button ride',
        'Automatic rear motor wheel lock',
        'High-decibel anti-theft alarm siren',
      ],
    },
    {
      icon: Disc,
      title: 'Front Hydraulic Disc Brake',
      subtitle: 'Instant Stopping Control & Safety',
      badge: 'Active Safety',
      desc: 'High-performance ventilated front hydraulic disc brake paired with a responsive rear drum setup. Provides short stopping distance and stable straight-line braking on wet or dusty roads.',
      highlights: [
        'Ventilated steel rotor for heat dissipation',
        'Dual-piston hydraulic calliper',
        'Electronic motor cut-off during braking',
      ],
    },
    {
      icon: Cpu,
      title: '48V / 60V / 72V Vector Controller',
      subtitle: 'Intelligent Multi-Stage Power Tuning',
      badge: 'Advanced Brain',
      desc: 'Microprocessor-driven vector sinusoidal controller delivering butter-smooth throttle response, intelligent hill-climb torque boost, and continuous battery thermal protection.',
      highlights: [
        'Smooth roll-on acceleration without jerks',
        'Regenerative braking energy recovery',
        'Over-voltage and short-circuit safeguards',
      ],
    },
    {
      icon: Zap,
      title: '100% Pure Copper BLDC Motor',
      subtitle: 'High-Torque Waterproof Hub Propulsion',
      badge: 'Pure Copper',
      desc: 'Equipped with heavy-gauge pure copper winding motor that stays cool under extended high-load city runs. Delivers whisper-quiet performance, instant pick-up, and superior hill climbing.',
      highlights: [
        '100% pure copper magnetic coils',
        'IP67 dust & water-resistant casing',
        'Zero carbon brushes for maintenance-free life',
      ],
      heroHighlight: true,
    },
    {
      icon: Cable,
      title: 'Heavy-Gauge Copper Wiring Harness',
      subtitle: 'Automotive Flame-Retardant Loom',
      badge: 'Safe Electricals',
      desc: 'High-conductivity pure copper wiring harness with flame-retardant silicone insulation and waterproof sealed coupler connectors preventing voltage drops and thermal short-circuits.',
      highlights: [
        'Flame-retardant automotive insulation',
        'High current carrying capacity',
        'Waterproof sealed junction connectors',
      ],
    },
    {
      icon: Package,
      title: 'Spacious Helmet Storage in Dickey',
      subtitle: 'Under-Seat Boot with USB Mobile Port',
      badge: 'Daily Utility',
      desc: 'Generously proportioned under-seat lockable dickey designed to securely store full-face or half helmets, chargers, daily groceries, and handbags, alongside a dedicated fast USB phone charging port.',
      highlights: [
        'Fits helmet and fast charger easily',
        'Weatherproof rubber boot seal',
        'Convenient 5V USB mobile charging outlet',
      ],
    },
    {
      icon: Palette,
      title: '5 Attractive Colours Available',
      subtitle: 'Multi-Coat UV-Resistant Automotive Finish',
      badge: 'Premium Paint',
      desc: 'Available in five head-turning showroom shades: Royal Obsidian Black, Pearl Ivory White, Crimson Sport Red, Sapphire Metallic Blue, and Matte Titanium Grey.',
      highlights: [
        'Gloss & matte finish options',
        'UV-resistant clear coat against sun fading',
        'Scratch-resistant automotive paint',
      ],
    },
    {
      icon: Award,
      title: 'Comprehensive 5-Year Warranty',
      subtitle: 'Official Manufacturer Coverage',
      badge: 'Peace of Mind',
      desc: 'Backed by FRENDO’s comprehensive 5-Year Warranty as per applicable company terms and conditions. Ensures hassle-free ownership with direct OEM technical and spare parts assistance.',
      highlights: [
        '5-Year coverage as per company terms',
        'Authorized dealer service support',
        'Genuine original spare parts availability',
      ],
      heroHighlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-10 sm:py-16 border-t border-brand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-600 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-brand-800 font-bold">Scooty Features & Specs</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest mb-4 font-serif">
            <Sparkles className="w-4 h-4 text-brand-800" />
            <span>Standard Across All FRENDO Models</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            🛵 FRENDO ELECTRIC SCOOTY <span className="text-gradient-gold">CORE FEATURES</span>
          </h1>

          <p className="mt-3.5 text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            From our entry ₹15,000/- models to our 300 KM hyper-range scooters, every FRENDO vehicle is engineered with pure copper motor, front hydraulic disc brake, heavy-duty chassis, and 5-Year warranty.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scooters"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Explore 27 Models with These Features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                'Hello Baba Marketing, I want to know more about FRENDO Electric Scooty features and prices.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white hover:bg-brand-100 text-brand-800 border border-brand-300 font-bold text-xs transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Detailed Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {allFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between group ${
                  feat.heroHighlight
                    ? 'bg-gradient-to-b from-amber-400/25 via-brand-50 to-white border-2 border-brand-300 shadow-glow'
                    : 'bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        feat.heroHighlight
                          ? 'bg-amber-400 text-brand-950 font-black shadow-lg'
                          : 'bg-brand-100 text-brand-800 border border-brand-300'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-[10px] font-bold text-brand-800 uppercase tracking-wider font-mono">
                      {feat.badge}
                    </span>
                  </div>

                  <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
                    {feat.title}
                  </h2>

                  <div className="text-xs font-semibold text-brand-800 mt-1">
                    {feat.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
                    {feat.desc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-brand-200 space-y-2">
                    {feat.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-xs text-slate-800">
                        <Check className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-200 flex items-center justify-between text-xs text-slate-600 font-mono">
                  <span>Standard Equipment</span>
                  <span className="text-brand-800 font-bold">100% OEM Tested</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison / Specs Summary Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-300 shadow-lg mb-16 gold-border-glow">
          <div className="max-w-3xl mb-8">
            <span className="px-3 py-1 rounded-md bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest font-serif">
              Engineering Excellence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Indian Riders Prefer FRENDO Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Engineered from the ground up for Indian roads, weather conditions, and everyday savings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <div className="text-2xl font-black text-brand-800 font-mono">15p – 20p</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Per Kilometer Cost</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Save over ₹40,000 every year compared to petrol.</div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <div className="text-2xl font-black text-brand-800 font-mono">100% Copper</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Motor & Wiring Harness</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Zero aluminum degradation, low heat, long lifetime.</div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <div className="text-2xl font-black text-brand-800 font-mono">5-Year</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Warranty Backing</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Official company terms, reliable parts availability.</div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <div className="text-2xl font-black text-brand-800 font-mono">50 – 300 KM</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Running Range Flexibility</div>
              <div className="text-[11px] text-slate-600 mt-0.5">5 distinct LFP battery configurations to choose from.</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-400/25 via-brand-50 to-brand-100/70 border border-brand-300">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
            Experience FRENDO Features with a Free Test Ride
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 max-w-xl mx-auto">
            Visit our Ballabhgarh showroom to test the pickup speed, hydraulic brakes, and comfort in person.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scooters"
              className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all"
            >
              Browse All 27 Models
            </Link>

            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-slate-900 font-bold text-xs uppercase tracking-wider border border-brand-200 transition-all"
            >
              Showroom Directions & Contact
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
