'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  ChevronRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export default function DealershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    experience: 'New Entrepreneur',
    investment: '₹10 Lakh - ₹25 Lakh (40 Scooties Pack)',
  });

  const benefits40 = [
    {
      num: 1,
      icon: Truck,
      title: 'Free Transportation Across India',
      desc: 'Zero freight or shipping expense on bulk purchase of 40 scooties delivered directly to your showroom door anywhere in India.',
    },
    {
      num: 2,
      icon: Bike,
      title: '1 Demo Scooty Absolutely Free',
      desc: 'Receive 1 showroom test-ride demonstration scooty at zero cost to let your prospective customers experience the ride live.',
    },
    {
      num: 3,
      icon: BatteryCharging,
      title: '1 Demo Battery Absolutely Free',
      desc: 'Additional high-grade LFP battery pack provided free for instant demonstration and continuous uninterrupted test rides.',
    },
    {
      num: 4,
      icon: Zap,
      title: '1 Demo Charger Absolutely Free',
      desc: 'Dedicated rapid smart charger provided free for your dealership workshop, showroom, and client battery fast-charging.',
    },
    {
      num: 5,
      icon: Award,
      title: '5-Year Warranty',
      desc: 'Full 5-year OEM warranty coverage backing every single unit as per company terms and conditions for complete peace of mind.',
    },
    {
      num: 6,
      icon: Building,
      title: 'Regular Dealer Shop Rent Support',
      desc: 'Ongoing monthly showroom rent assistance to lower initial overhead and accelerate franchise breakeven and profitability.',
    },
    {
      num: 7,
      icon: Users,
      title: 'Regular Dealer Electrician Salary Support',
      desc: 'Direct financial subsidy to support your dedicated dealership technician / electrician monthly salary.',
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
      desc: 'Complete official showroom signage, 3D backlit glow-sign boards, promotional roll-ups, wall branding, and showroom decor.',
    },
    {
      num: 10,
      icon: FileCheck,
      title: 'NETRAX Certificate',
      desc: 'Official automotive homologation and quality certification from recognized national testing authorities.',
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
      desc: 'Hands-on technical workshop training for your service crew covering motor, controller, battery, wiring, and diagnostics.',
    },
    {
      num: 13,
      icon: CreditCard,
      title: 'Assistance with Finance Code',
      desc: 'Fast-track tie-ups with leading banks and NBFCs for instant customer loan codes and zero-down-payment customer EMIs.',
    },
    {
      num: 14,
      icon: Headphones,
      title: 'Full Sales & Service Support',
      desc: 'Dedicated territory relationship manager, priority spare parts supply, and digital marketing customer lead generation in your area.',
    },
  ];

  const dealerSupportPillars = [
    { title: 'Dealer Shop Setup and Branding', desc: 'Complete 3D showroom boards, signage, lighting, and interior display stand guidance.' },
    { title: 'Electrician Training & Certification', desc: 'Comprehensive technical training on controllers, wiring, and battery safety.' },
    { title: 'Finance Code & EMI Assistance', desc: 'Fast-track onboarding with major vehicle finance partners for instant retail approvals.' },
    { title: 'Product Knowledge and Technical Support', desc: 'Detailed manuals, spec sheets, videos, and a 24/7 dedicated technical helpline.' },
    { title: 'Sales, Digital Leads & Service Support', desc: 'Online customer inquiries forwarded directly to your dealership location.' },
    { title: 'Demo Scooty and Demo Battery Support', desc: 'Complimentary demo assets to ensure your showroom operates at peak conversion.' },
    { title: 'All India Doorstep Transportation Support', desc: 'Safe, insured logistics straight from our factory/warehouse to your doorstep.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waText = `Hello Baba Marketing (FRENDO E-SCOOTY),\nI want to apply for B2B Dealership & Franchise (40 Scooties Offer).\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCity/District: ${formData.city}\nState: ${formData.state}\nBusiness Experience: ${formData.experience}\nBudget: ${formData.investment}`;
    window.open(`https://wa.me/919953564151?text=${encodeURIComponent(waText)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white py-10 sm:py-16 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-bold">B2B Dealership & Franchise</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 font-serif">
            <Briefcase className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>High-Margin Electric Vehicle Dealership</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            START YOUR OWN ELECTRIC SCOOTY BUSINESS WITH <span className="text-gradient-gold">FRENDO!</span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Join the <strong className="text-white">FRENDO Dealer Network</strong> across India. High profit margins, direct OEM supply, and complete showroom setup support.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#apply-form"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Apply for Dealership (40 Scooties Pack)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20am%20interested%20in%20FRENDO%20Dealership%20Brochure%20and%20Price%20List."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Hotline: 9953564151</span>
            </a>
          </div>
        </div>

        {/* 14 Special Benefits on 40 Scooties */}
        <div className="mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border border-amber-500/40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-serif tracking-widest text-amber-400 font-black">
                EXCLUSIVE B2B FRANCHISE PACKAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                SPECIAL BENEFITS ON THE PURCHASE OF 40 SCOOTIES
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Invest in 40 units and unlock our most generous financial, branding, and operational incentives.
              </p>
            </div>

            <a
              href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20want%20to%20claim%20the%20Special%20Benefits%20on%20Purchase%20of%2040%20Scooties."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow shrink-0 text-center"
            >
              Claim 40-Pack Offer
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {benefits40.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.num}
                  className="p-5 rounded-3xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif text-xs font-black text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 font-mono">
                        #{b.num}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-white leading-snug">
                      {b.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Included in 40 Units Deal</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🤝 7 Pillars of Dealer Support */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest font-serif">
              End-to-End Partnership
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mt-2">
              🤝 7 PILLARS OF FRENDO DEALER SUPPORT
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our aim is to help every dealer establish and grow a wildly successful, highly profitable electric scooter business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealerSupportPillars.map((p, idx) => (
              <div key={p.title} className="p-6 rounded-3xl bg-navy-900 border border-white/10 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form & Direct Connect */}
        <div id="apply-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-navy-900 p-6 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl gold-border-glow">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest font-serif">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Join Today</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight">
              APPLY FOR AUTHORIZED DEALERSHIP RIGHTS
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Submit your showroom location and preferred purchase package. Our National Dealership Manager will connect within 2 business hours with territorial exclusivity terms and discount slabs.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Showroom: 33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Hotline: <strong className="text-white">9953564151</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp: <strong className="text-white">9953564151</strong></span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-navy-950 border border-amber-500/30 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3">
              Dealership Application Form
            </h3>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Application Received!</h4>
                <p className="text-xs text-emerald-300">
                  Thank you! Our dealership desk is opening WhatsApp right now to send your brochure and pricing list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">WhatsApp / Contact Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9953564151"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">City / District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Faridabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Business Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Existing Automobile 2-Wheeler Dealer" className="bg-navy-950">Existing Automobile 2-Wheeler Dealer</option>
                    <option value="Battery / Spare Parts Trader" className="bg-navy-950">Battery / Spare Parts Trader</option>
                    <option value="New Entrepreneur" className="bg-navy-950">New Entrepreneur</option>
                    <option value="Commercial Fleet / Logistics Owner" className="bg-navy-950">Commercial Fleet / Logistics Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Target Package</label>
                  <select
                    value={formData.investment}
                    onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Special Benefits Pack (40 Scooties)" className="bg-navy-950">Special Benefits Pack (40 Scooties)</option>
                    <option value="Standard Starter Pack (20 Scooties)" className="bg-navy-950">Standard Starter Pack (20 Scooties)</option>
                    <option value="State / District Distributor (100+ Scooties)" className="bg-navy-950">State / District Distributor (100+ Scooties)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2 mt-2"
                >
                  <MessageCircle className="w-4 h-4 fill-navy-950" />
                  <span>Submit Application on WhatsApp</span>
                </button>
              </form>
            )}

            <div className="text-[10px] text-slate-400 text-center pt-2">
              All offers, benefits, and warranty coverage are subject to applicable company terms and conditions.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
