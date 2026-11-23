import React from 'react';
import Link from 'next/link';
import {
  BatteryCharging,
  Battery,
  Zap,
  Gauge,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageCircle,
  Phone,
  CheckCircle2,
  ChevronRight,
  Flame,
  RotateCcw,
  Clock,
  Sparkles,
} from 'lucide-react';
import { query } from '@/lib/db';
import { ContactSettings } from '@/types';

export const metadata = {
  title: 'LFP Battery Options & Running Range (50–300 KM) | FRENDO E-SCOOTY',
  description:
    'Discover FRENDO LFP (Lithium Iron Phosphate) battery packs: 60V 20Ah to 75Ah with running range from 50 KM to 300 KM. Battery starting price ₹15,000/- with 5-Year warranty.',
};

export const revalidate = 0;

export default async function BatteriesPage() {
  let contact: ContactSettings | null = null;
  try {
    const rows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    contact = rows[0] || null;
  } catch {}

  const phone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';

  const batteryOptions = [
    {
      name: 'LFP 60V / 20Ah Battery',
      code: 'LFP-6020',
      range: '50 – 70 KM',
      usage: 'City Commute & Daily Errands',
      charging: '3 – 4 Hours Fast Charge',
      weight: 'Approx 11.5 kg',
      cycles: '2,500+ Charge Cycles',
      features: [
        'Ultra-lightweight portable metal pack',
        'Built-in smart thermal BMS',
        'Standard 3A – 5A smart charger support',
        'Zero memory effect degradation',
      ],
      price: 'Starting ₹15,000/-',
    },
    {
      name: 'LFP 60V / 30Ah Battery',
      code: 'LFP-6030',
      range: '80 – 110 KM',
      usage: 'Daily Office, College & Family (Most Popular)',
      charging: '4 – 5 Hours Fast Charge',
      weight: 'Approx 16 kg',
      cycles: '2,500+ Charge Cycles',
      features: [
        'Highest energy density for compact footprint',
        'Covers 3 full days of average Indian commute',
        'Supports fast regenerative braking',
        'Flame-proof aluminum alloy enclosure',
      ],
      price: 'Popular Choice',
      isPopular: true,
    },
    {
      name: 'LFP 60V / 45Ah Battery',
      code: 'LFP-6045',
      range: '120 – 160 KM',
      usage: 'Long Daily Travel & Delivery Professionals',
      charging: '5 – 6 Hours Fast Charge',
      weight: 'Approx 22 kg',
      cycles: '2,500+ Charge Cycles',
      features: [
        'Commercial grade continuous discharge',
        'Active cell balancing microprocessor',
        'Dual temperature monitoring sensors',
        'Heavy-duty industrial connectors',
      ],
      price: 'High Endurance',
    },
    {
      name: 'LFP 60V / 60Ah Battery',
      code: 'LFP-6060',
      range: '180 – 220 KM',
      usage: 'Zomato/Swiggy/Blinkit Logistics & Inter-District',
      charging: '6 – 7 Hours Fast Charge',
      weight: 'Approx 29 kg',
      cycles: '2,500+ Charge Cycles',
      features: [
        'Heavy delivery duty cycle capability',
        'Peak 50A high-discharge burst power',
        'Waterproof IP67 rated pack',
        'Reinforced anti-shock internal padding',
      ],
      price: 'Commercial Fleet',
    },
    {
      name: 'LFP 60V / 75Ah Battery',
      code: 'LFP-6075',
      range: '250 – 300 KM',
      usage: 'Hyper-Range Flagship Fleet & Touring',
      charging: '7 – 8 Hours (Overnight / Dual Charger)',
      weight: 'Approx 35 kg',
      cycles: '2,500+ Charge Cycles',
      features: [
        'Massive 300 KM maximum real-world range',
        'Dual-battery bay compatible architecture',
        'Bluetooth telematics BMS ready',
        'Maximum long-haul peace of mind',
      ],
      price: 'Flagship 300 KM',
      isFlagship: true,
    },
  ];

  const chemistryComparison = [
    {
      feature: 'Cell Chemistry',
      lfp: 'LFP (Lithium Iron Phosphate)',
      leadAcid: 'Lead-Acid (Old Graphene)',
      nmc: 'NMC (Nickel Manganese Cobalt)',
    },
    {
      feature: 'Charge / Discharge Cycles',
      lfp: '2,500 – 3,000 Cycles (7–10 Years)',
      leadAcid: '300 – 400 Cycles (1 Year)',
      nmc: '800 – 1,200 Cycles (3–4 Years)',
    },
    {
      feature: 'Thermal Stability & Fire Safety',
      lfp: 'Highest (Thermal runaway at 270°C+)',
      leadAcid: 'Acid leakage / Toxic fumes risk',
      nmc: 'Moderate (Prone to heat runaway at 150°C)',
    },
    {
      feature: 'Charging Time',
      lfp: '3 – 5 Hours Fast Charging',
      leadAcid: '8 – 10 Hours Slow Charging',
      nmc: '4 – 6 Hours',
    },
    {
      feature: 'Weight & Energy Density',
      lfp: 'Compact & 70% Lighter than Lead-Acid',
      leadAcid: 'Extremely Heavy (35–45 kg)',
      nmc: 'Lightweight',
    },
    {
      feature: 'Environmental Friendliness',
      lfp: 'Zero Cobalt, Non-Toxic, Recyclable',
      leadAcid: 'Hazardous Lead and Sulfuric Acid',
      nmc: 'High Cobalt, Mining Impact',
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
          <span className="text-brand-800 font-bold">LFP Batteries & Running Range</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest mb-4 font-serif">
            <BatteryCharging className="w-4 h-4 text-brand-800" />
            <span>Next-Gen LFP Chemistry • 2500+ Cycles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            🔋 LFP BATTERY OPTIONS & ⚡ <span className="text-gradient-gold">50 TO 300 KM RANGE</span>
          </h1>

          <p className="mt-3.5 text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            FRENDO electric scooters feature military-grade Lithium Iron Phosphate (LFP) battery packs. Whether you travel 20 km daily or 200 km on commercial delivery routes, choose the exact battery capacity tailored to your lifestyle.
          </p>

          <div className="mt-4 inline-block px-5 py-2 rounded-2xl bg-brand-100 border border-brand-300 text-brand-800 font-bold text-sm">
            Battery Starting Price: <strong className="text-slate-900 font-mono text-base">₹15,000/-</strong> (All Taxes Included)
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scooters"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Explore Scooters Compatible with LFP Packs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                'Hello Baba Marketing, I want a price quote for FRENDO LFP 60V Batteries (20Ah to 75Ah).'
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

        {/* 5 Battery Options Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {batteryOptions.map((b) => (
            <div
              key={b.code}
              className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between group ${
                b.isPopular || b.isFlagship
                  ? 'bg-gradient-to-b from-amber-400/25 via-brand-50 to-white border-2 border-brand-300 shadow-glow'
                  : 'bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      b.isPopular || b.isFlagship
                        ? 'bg-amber-400 text-brand-950 font-black shadow-lg'
                        : 'bg-brand-100 text-brand-800 border border-brand-300'
                    }`}
                  >
                    <BatteryCharging className="w-6 h-6" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-[10px] font-bold text-brand-800 uppercase tracking-wider font-mono">
                    {b.code}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
                  {b.name}
                </h2>

                <div className="mt-3 p-3.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-600 uppercase font-mono">Running Range</div>
                    <div className="text-xl font-black text-brand-800 font-mono mt-0.5">{b.range}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-600 uppercase font-mono">Charging</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{b.charging}</div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-700">
                  <strong className="text-slate-900">Best Suited For:</strong> {b.usage}
                </div>

                <div className="mt-4 pt-4 border-t border-brand-200 space-y-2">
                  {b.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-600 font-mono">5-Year Warranty Support</div>
                  <div className="text-xs font-bold text-brand-800">{b.cycles}</div>
                </div>

                <a
                  href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                    `Hello Baba Marketing, I am interested in ${b.name} (${b.range} range). Please share price quote.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all shadow"
                >
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Battery Chemistry Comparison Table */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-brand-300 shadow-lg mb-16 gold-border-glow">
          <div className="max-w-3xl mb-6">
            <span className="px-3 py-1 rounded-md bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest font-serif">
              Technical Comparison
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why FRENDO Uses LFP (Lithium Iron Phosphate)
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Compare LFP against outdated Lead-Acid and volatile NMC batteries in Indian tropical temperatures.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-200 text-slate-600 uppercase font-mono">
                  <th className="py-3 px-4">Feature / Metric</th>
                  <th className="py-3 px-4 text-brand-800 font-bold bg-brand-100 rounded-t-xl">
                    FRENDO LFP (Our Standard)
                  </th>
                  <th className="py-3 px-4">Old Lead-Acid / Graphene</th>
                  <th className="py-3 px-4">Generic NMC Battery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {chemistryComparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-brand-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-3.5 px-4 text-brand-800 font-semibold bg-amber-500/5">{row.lfp}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.leadAcid}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.nmc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-400/25 via-brand-50 to-brand-100/70 border border-brand-300">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900">
            Need Help Choosing the Right Battery Pack?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 max-w-xl mx-auto">
            Our EV experts at the Ballabhgarh showroom will analyze your daily running kilometers and suggest the perfect battery for maximum cost savings.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scooters"
              className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all"
            >
              Explore Compatible Scooters
            </Link>

            <Link
              href="/dealership"
              className="px-8 py-3.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-slate-900 font-bold text-xs uppercase tracking-wider border border-brand-200 transition-all"
            >
              B2B Dealership Bulk Supply
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
