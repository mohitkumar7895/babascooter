import React from 'react';
import { Zap, PiggyBank, Gauge, ShieldCheck, Layers, Headphones } from 'lucide-react';

const reasons = [
  {
    title: 'Clean Electric Mobility',
    desc: '100% zero tailpipe emissions. Enjoy whisper-quiet, vibration-free travel that protects our environment for future generations.',
    icon: Zap,
  },
  {
    title: 'Massive Cost Savings',
    desc: 'Travel at just 15 to 20 paise per kilometer compared to expensive petrol. Save up to ₹30,000 to ₹50,000 every single year.',
    icon: PiggyBank,
  },
  {
    title: 'High-Torque Performance',
    desc: 'Dependable 1000W and 1500W BLDC motors paired with heavy-duty 48V/60V/72V controllers provide instant acceleration.',
    icon: Gauge,
  },
  {
    title: 'Standard Safety & Security',
    desc: 'Every FRENDO model includes front hydraulic disc brakes, digital speedometer console, reverse gear, and anti-theft remote lock.',
    icon: ShieldCheck,
  },
  {
    title: '20+ Model Options',
    desc: 'Diverse lineup covering city scooters, dual 12-inch cruisers, accessible mobility models, and heavy-payload commercial loaders.',
    icon: Layers,
  },
  {
    title: 'Authorized Showroom & Service',
    desc: 'Dedicated Baba Marketing sales, warranty, genuine spare parts, and expert service support in Ballabhgarh, Faridabad.',
    icon: Headphones,
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1.5">
            The FRENDO Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose FRENDO Electric Scooters?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered specifically for Indian road conditions with robust steel chassis, dependable electronics, and maximum everyday savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
