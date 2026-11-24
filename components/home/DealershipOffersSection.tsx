'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Truck,
  Bike,
  BatteryCharging,
  Zap,
  Award,
  Building,
  Users,
  ShieldAlert,
  Paintbrush,
  FileCheck,
  GraduationCap,
  CreditCard,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Phone,
  Sparkles,
} from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function DealershipOffersSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    experience: 'New Entrepreneur',
  });

  const benefits40 = [
    {
      num: 1,
      icon: Truck,
      title: 'Free Transportation Across India',
      desc: 'Zero freight or shipping expense on bulk purchase of 40 scooties delivered directly to your showroom door.',
    },
    {
      num: 2,
      icon: Bike,
      title: '1 Demo Scooty Absolutely Free',
      desc: 'Receive 1 showroom test-ride demonstration scooty at zero cost to let your customers test-ride live.',
    },
    {
      num: 3,
      icon: BatteryCharging,
      title: '1 Demo Battery Absolutely Free',
      desc: 'Additional high-grade LFP battery pack provided free for instant demonstration and uninterrupted test rides.',
    },
    {
      num: 4,
      icon: Zap,
      title: '1 Demo Charger Absolutely Free',
      desc: 'Dedicated rapid smart charger provided free for workshop, showroom, and client battery fast-charging.',
    },
    {
      num: 5,
      icon: Award,
      title: '60 Month (5-Year) Warranty',
      desc: 'Full 60-month (5-year) OEM warranty coverage backing every single unit as per company terms and conditions.',
    },
    {
      num: 6,
      icon: Building,
      title: 'Regular Dealer Shop Rent Support',
      desc: 'Ongoing monthly showroom rent assistance to lower initial overhead and accelerate franchise profitability.',
    },
    {
      num: 7,
      icon: Users,
      title: 'Regular Dealer Electrician Salary Support',
      desc: 'Direct financial subsidy to support your dedicated dealership technician / electrician monthly compensation.',
    },
    {
      num: 8,
      icon: ShieldAlert,
      title: '₹1 Crore Insurance for Dealer Shop Owners',
      desc: 'Substantial ₹1 Crore comprehensive business and personal insurance protection for regular dealership owners.',
    },
    {
      num: 9,
      icon: Paintbrush,
      title: 'Regular Dealer Shop Branding',
      desc: 'Complete official showroom signage, 3D backlit glow-sign boards, promotional roll-ups, and showroom decor.',
    },
    {
      num: 10,
      icon: FileCheck,
      title: 'NETRAX Certificate',
      desc: 'Official automotive homologation and quality certification from recognized testing authorities.',
    },
    {
      num: 11,
      icon: Award,
      title: 'Authorized Dealer Certificate',
      desc: 'Official framed dealership authorization certificate establishing verified distribution rights in your territory.',
    },
    {
      num: 12,
      icon: GraduationCap,
      title: 'Free Electrician Training',
      desc: 'Hands-on technical workshop training for your service crew covering motor, controller, battery, and diagnostics.',
    },
    {
      num: 13,
      icon: CreditCard,
      title: 'Assistance with Finance Code',
      desc: 'Fast-track tie-ups with leading banks and NBFCs for instant customer loan codes and zero-down-payment EMIs.',
    },
    {
      num: 14,
      icon: Headphones,
      title: 'Full Sales & Service Support',
      desc: 'Dedicated territory relationship manager, priority spare parts supply, and digital marketing customer lead generation.',
    },
  ];

  const dealerSupportPillars = [
    'Dealer Shop Setup and Branding',
    'Electrician Training & Certification',
    'Finance Code & EMI Assistance',
    'Product Knowledge and Technical Support',
    'Sales, Digital Leads and Service Support',
    'Demo Scooty and Demo Battery Support',
    'All India Doorstep Transportation Support',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waText = `Hello Baba Marketing, I want to apply for FRENDO E-SCOOTY Dealership (40 + 20 FREE Distributor Offer).\nName: ${formData.name}\nPhone: ${formData.phone}\nCity/State: ${formData.city}, ${formData.state}\nBackground: ${formData.experience}`;
    window.open(`https://wa.me/919953564151?text=${encodeURIComponent(waText)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="dealership" className="py-12 sm:py-16 bg-brand-50 text-slate-900 relative border-b border-brand-200 cv-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson-600 text-xs font-bold text-white uppercase tracking-widest mb-3 shadow-sm">
            <Briefcase className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>High-Margin EV Opportunity</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-royal-800 tracking-tight">
            B2B DEALERSHIP & FRANCHISE OFFERS
          </h2>

          <p className="mt-2 text-brand-800 font-serif text-sm sm:text-base font-bold">
            Start Your Own Electric Scooty Business with FRENDO!
          </p>

          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Join the <strong className="text-brand-800">FRENDO Dealer Network</strong> across India. High profit margins, direct OEM supply, and complete showroom setup support.
          </p>
        </div>

        {/* 14 Special Benefits on 40 Scooties Grid */}
        <div className="mb-12">
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-brand-800/20 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-crimson-600 text-white text-[10px] uppercase font-serif tracking-widest font-black mb-1">
                SPECIAL DISTRIBUTOR OFFER • 40 + 20 FREE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-950 mt-0.5">
                BUY 40 SCOOTERS & GET 20 SCOOTERS FREE + 14 BENEFITS
              </h3>
              <p className="text-xs font-bold text-brand-900 mt-1">
                40 स्कूटर खरीदें और 20 स्कूटर बिल्कुल FREE पाएँ!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/dealership"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-brand-50 text-brand-900 font-bold text-xs uppercase tracking-wider transition-all border border-brand-800/25 shadow-sm"
              >
                Full Dealership Page
              </Link>
              <a
                href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20want%20to%20claim%20the%20Special%20Benefits%20on%20Purchase%20of%2040%20Scooties."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow"
              >
                Claim on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {benefits40.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.num}
                  className="p-4 rounded-2xl bg-white border border-brand-200 hover:border-brand-700 hover:shadow-md transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-800 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-xs font-black text-crimson-600 px-2 py-0.5 rounded bg-amber-400/35 border border-amber-500/40">
                        #{b.num}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {b.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-brand-100 text-[10px] text-brand-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-brand-700" />
                    <span>Included in 40 + 20 FREE Offer</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🤝 Dealer Support & Quick Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-800 text-white p-6 sm:p-10 rounded-3xl border-2 border-amber-400 shadow-xl">
          
          {/* Left: 🤝 DEALER SUPPORT Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-xs font-black text-brand-950 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-brand-950" />
              <span>Full Handholding</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              🤝 COMPREHENSIVE DEALER SUPPORT
            </h3>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Our aim is to help dealers establish and grow their electric scooter businesses with comprehensive 360-degree support. We stand behind your showroom every step of the journey.
            </p>

            <div className="space-y-2 pt-1">
              {dealerSupportPillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-2.5 text-xs text-white font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-amber-300 font-bold">
              <span>All-India Delivery</span>
              <span>•</span>
              <span>High Profit Margins</span>
              <span>•</span>
              <span>Direct OEM Rates</span>
            </div>
          </div>

          {/* Right: Quick Dealership Application Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white text-slate-900 border-2 border-amber-400 shadow-xl space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h4 className="font-serif text-base font-bold text-royal-800">
                Apply for Dealership
              </h4>
              <p className="text-[11px] text-slate-600">
                Join India's fastest-growing electric scooter network.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9953564151"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Faridabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haryana"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Business Experience</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-brand-700"
                >
                  <option value="Existing 2-Wheeler Dealer">Existing 2-Wheeler Dealer</option>
                  <option value="Battery / Auto Parts Trader">Battery / Auto Parts Trader</option>
                  <option value="New Entrepreneur">New Entrepreneur</option>
                  <option value="Wholesaler / Fleet Owner">Wholesaler / Fleet Owner</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow flex items-center justify-center gap-2 border border-amber-500"
              >
                <WhatsAppIcon className="w-4 h-4 text-brand-950" />
                <span>Submit & Connect on WhatsApp</span>
              </button>
            </form>

            <div className="text-[10px] text-slate-500 text-center">
              Direct Dealership Hotline: <strong className="text-brand-800">9953564151</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
