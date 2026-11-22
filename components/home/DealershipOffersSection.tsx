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
  MessageCircle,
  Sparkles,
} from 'lucide-react';

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
      title: '5-Year Warranty',
      desc: 'Full 5-year OEM warranty coverage backing every single unit as per company terms and conditions.',
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
    const waText = `Hello Baba Marketing, I want to apply for FRENDO E-SCOOTY Dealership (40 Scooties Offer).\nName: ${formData.name}\nPhone: ${formData.phone}\nCity/State: ${formData.city}, ${formData.state}\nBackground: ${formData.experience}`;
    window.open(`https://wa.me/919953564151?text=${encodeURIComponent(waText)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="dealership" className="py-12 sm:py-16 bg-navy-950 text-white relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>High-Margin EV Opportunity</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            B2B DEALERSHIP & FRANCHISE OFFERS
          </h2>

          <p className="mt-2 text-amber-300 font-serif text-sm sm:text-base font-bold">
            Start Your Own Electric Scooty Business with FRENDO!
          </p>

          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Join the <strong className="text-white">FRENDO Dealer Network</strong> across India. High profit margins, direct OEM supply, and complete showroom setup support.
          </p>
        </div>

        {/* 14 Special Benefits on 40 Scooties Grid */}
        <div className="mb-12">
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border border-amber-500/40 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-serif tracking-widest text-amber-400 font-black">
                EXCLUSIVE B2B FRANCHISE PACKAGE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                SPECIAL BENEFITS ON THE PURCHASE OF 40 SCOOTIES
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/dealership"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20"
              >
                Full Dealership Page
              </Link>
              <a
                href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20want%20to%20claim%20the%20Special%20Benefits%20on%20Purchase%20of%2040%20Scooties."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow"
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
                  className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-serif text-xs font-black text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                        #{b.num}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-white leading-snug">
                      {b.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    <span>Included in 40 Scooties Pack</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🤝 Dealer Support & Quick Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-navy-900 p-6 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl gold-border-glow">
          
          {/* Left: 🤝 DEALER SUPPORT Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Handholding</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              🤝 COMPREHENSIVE DEALER SUPPORT
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our aim is to help dealers establish and grow their electric scooter businesses with comprehensive 360-degree support. We stand behind your showroom every step of the journey.
            </p>

            <div className="space-y-2 pt-1">
              {dealerSupportPillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>All-India Delivery</span>
              <span>•</span>
              <span>High Profit Margins</span>
              <span>•</span>
              <span>Direct OEM Rates</span>
            </div>
          </div>

          {/* Right: Quick Dealership Application Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-navy-950 border border-amber-500/30 shadow-xl space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-serif text-base font-bold text-white">
                Apply for Dealership
              </h4>
              <p className="text-[11px] text-slate-400">
                Join India's fastest-growing electric scooter network.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9953564151"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Faridabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haryana"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Business Experience</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                >
                  <option value="Existing 2-Wheeler Dealer" className="bg-navy-950">Existing 2-Wheeler Dealer</option>
                  <option value="Battery / Auto Parts Trader" className="bg-navy-950">Battery / Auto Parts Trader</option>
                  <option value="New Entrepreneur" className="bg-navy-950">New Entrepreneur</option>
                  <option value="Wholesaler / Fleet Owner" className="bg-navy-950">Wholesaler / Fleet Owner</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Submit & Connect on WhatsApp</span>
              </button>
            </form>

            <div className="text-[10px] text-slate-400 text-center">
              Direct Dealership Hotline: <strong className="text-amber-400">9953564151</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
