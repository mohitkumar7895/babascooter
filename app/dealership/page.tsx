'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ChevronRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

export default function DealershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    experience: 'New Entrepreneur',
    investment: '40 + 20 FREE Special Distributor Offer',
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
      title: '60 Month (5-Year) Warranty',
      desc: 'Full 60-month (5-year) OEM warranty coverage backing every single unit as per company terms and conditions for complete peace of mind.',
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
    const waText = `Hello Baba Marketing (FRENDO E-SCOOTY),\nI want to apply for B2B Dealership & Franchise (40 + 20 FREE Distributor Offer).\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCity/District: ${formData.city}\nState: ${formData.state}\nBusiness Experience: ${formData.experience}\nBudget: ${formData.investment}`;
    window.open(`https://wa.me/919953564151?text=${encodeURIComponent(waText)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-10 sm:py-16 border-t border-brand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-600 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-brand-800 font-bold">B2B Dealership & Franchise</span>
        </nav>

        {/* Hero Header + Official 40 + 20 FREE Offer Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson-600 text-xs font-bold text-white uppercase tracking-widest mb-4 font-serif shadow-sm">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Special Distributor Offer: 40 + 20 FREE</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-black text-royal-800 tracking-tight leading-tight">
              40 + 20 FREE DISTRIBUTOR OFFER WITH <span className="text-gradient-gold">FRENDO!</span>
            </h1>

            <p className="mt-2.5 text-crimson-600 text-base sm:text-lg font-black">
              40 स्कूटर खरीदें और 20 स्कूटर बिल्कुल FREE पाएँ!
            </p>

            <p className="mt-2 text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Electric Scooter starting <strong className="text-crimson-600">₹11,000/-</strong>, Single Light Model <strong className="text-crimson-600">₹15,000/-</strong>, Battery starting <strong className="text-crimson-600">₹15,000/-</strong> &amp; <strong className="text-brand-800">60 Month Warranty</strong>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#apply-form"
                className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-105 transition-all flex items-center gap-2 border border-amber-500"
              >
                <span>Claim 40 + 20 FREE Offer</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20am%20interested%20in%20the%2040%20%2B%2020%20FREE%20FRENDO%20Distributor%20Offer%20and%20Price%20List."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Hotline: 9953564151</span>
              </a>
            </div>
          </div>

          {/* Official FRENDO Banner Poster */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-white border-4 border-brand-800 shadow-xl">
              <Image
                src="/images/frendo-offer-banner.jpg"
                alt="BABA MARKETING FRENDO E-SCOOTY Special Distributor Offer 40 + 20 FREE"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* 14 Special Benefits on 40 + 20 FREE Offer */}
        <div className="mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-brand-800/20 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-crimson-600 text-white text-[10px] uppercase font-serif tracking-widest font-black">
                SPECIAL DISTRIBUTOR OFFER • 40 + 20 FREE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-950 mt-1">
                BUY 40 SCOOTERS, GET 20 FREE + 14 DEALER BENEFITS
              </h2>
              <p className="text-xs sm:text-sm text-brand-900 font-semibold mt-1">
                40 स्कूटर खरीदें और 20 स्कूटर बिल्कुल FREE पाएँ — plus all financial, branding, and operational incentives below.
              </p>
            </div>

            <a
              href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20want%20to%20claim%20the%2040%20%2B%2020%20FREE%20Special%20Distributor%20Offer."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow shrink-0 text-center"
            >
              Claim 40 + 20 FREE
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {benefits40.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.num}
                  className="p-5 rounded-3xl bg-white border border-brand-300 hover:border-brand-700 hover:bg-brand-50 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 border border-brand-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif text-xs font-black text-brand-800 px-2.5 py-1 rounded bg-brand-100 font-mono">
                        #{b.num}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {b.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-200 text-[11px] text-brand-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-800 shrink-0" />
                    <span>Included in 40 + 20 FREE Offer</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🤝 7 Pillars of Dealer Support */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-md bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest font-serif">
              End-to-End Partnership
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              🤝 7 PILLARS OF FRENDO DEALER SUPPORT
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Our aim is to help every dealer establish and grow a wildly successful, highly profitable electric scooter business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealerSupportPillars.map((p, idx) => (
              <div key={p.title} className="p-6 rounded-3xl bg-white border border-brand-200 space-y-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 font-mono font-bold flex items-center justify-center text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form & Direct Connect */}
        <div id="apply-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-12 rounded-3xl border border-brand-300 shadow-lg gold-border-glow">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest font-serif">
              <Sparkles className="w-4 h-4 text-brand-800" />
              <span>Join Today</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              APPLY FOR AUTHORIZED DEALERSHIP RIGHTS
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Submit your showroom location and preferred purchase package. Our National Dealership Manager will connect within 2 business hours with territorial exclusivity terms and discount slabs.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-800">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-800 shrink-0" />
                <span>Showroom: Plot No. 4, Kaili, Ballabhgarh, Faridabad, Haryana – 121004</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-800 shrink-0" />
                <span>Direct Hotline: <strong className="text-slate-900">9953564151</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: <strong className="text-slate-900">9953564151</strong></span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-brand-50 border border-brand-300 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-brand-200 pb-3">
              Dealership Application Form
            </h3>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-brand-100 border border-brand-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-brand-700 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">Application Received!</h4>
                <p className="text-xs text-brand-700">
                  Thank you! Our dealership desk is opening WhatsApp right now to send your brochure and pricing list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">WhatsApp / Contact Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9953564151"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">City / District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Faridabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Business Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-700 focus:outline-none focus:border-brand-700"
                  >
                    <option value="Existing Automobile 2-Wheeler Dealer" className="bg-white text-slate-900">Existing Automobile 2-Wheeler Dealer</option>
                    <option value="Battery / Spare Parts Trader" className="bg-white text-slate-900">Battery / Spare Parts Trader</option>
                    <option value="New Entrepreneur" className="bg-white text-slate-900">New Entrepreneur</option>
                    <option value="Commercial Fleet / Logistics Owner" className="bg-white text-slate-900">Commercial Fleet / Logistics Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Package</label>
                  <select
                    value={formData.investment}
                    onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-700 focus:outline-none focus:border-brand-700"
                  >
                    <option value="40 + 20 FREE Special Distributor Offer" className="bg-white text-slate-900">40 + 20 FREE Special Distributor Offer</option>
                    <option value="Standard Starter Pack (20 Scooties)" className="bg-white text-slate-900">Standard Starter Pack (20 Scooties)</option>
                    <option value="State / District Distributor (100+ Scooties)" className="bg-white text-slate-900">State / District Distributor (100+ Scooties)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2 mt-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-brand-950" />
                  <span>Submit Application on WhatsApp</span>
                </button>
              </form>
            )}

            <div className="text-[10px] text-slate-600 text-center pt-2">
              All offers, benefits, and warranty coverage are subject to applicable company terms and conditions.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
