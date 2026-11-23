import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { query } from '@/lib/db';
import { ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import { Zap, ShieldCheck, Award, Users, BatteryCharging, ArrowRight, MessageCircle, Sparkles, CheckCircle2, Phone } from 'lucide-react';

export const revalidate = 300;

export async function generateMetadata() {
  return await getSeoMetadata('/about');
}

async function getAboutData() {
  try {
    const contactRows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    return contactRows[0] || null;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const contact = await getAboutData();
  const phone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-12 sm:py-16 selection:bg-brand-800 selection:text-amber-400 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-100 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest shadow-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized FRENDO E-SCOOTY Showroom</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase leading-tight">
            About <span className="text-gradient-gold">BABA MARKETING</span>
          </h1>

          <p className="text-brand-800 font-serif text-base sm:text-lg tracking-wide">
            Drive Green, Live Better!
          </p>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Welcome to BABA MARKETING, your premier authorized showroom and distribution partner for FRENDO E-SCOOTY in Ballabhgarh, Faridabad and across India. We deliver cutting-edge electric two-wheelers, advanced LFP battery solutions, and lucrative B2B dealership opportunities.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-brand-300 shadow-xl space-y-4 relative group hover:border-brand-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-100 border border-brand-300 text-brand-800 flex items-center justify-center shadow-glow">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gradient-gold">Our Vision</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              To drive India’s electric mobility revolution with high-performance, whisper-quiet electric scooters that cost just 15 to 20 paise per kilometer. We envision clean roads, zero petrol dependence, and massive financial savings for every household and commercial operator.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-brand-300 shadow-xl space-y-4 relative group hover:border-brand-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-100 border border-brand-300 text-brand-800 flex items-center justify-center shadow-glow">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gradient-gold">Our Commitment</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every FRENDO E-SCOOTY is engineered with pure copper motor windings, heavy-duty chassis, front disc brakes, and dependable smart controllers. Backed by our standard 5-Year Warranty, genuine spares, and expert certified technicians in Ballabhgarh.
            </p>
          </div>
        </div>

        {/* Brand Story with Showcase Image */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-brand-300 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-brand-800 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Showroom & Nationwide Network
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                27 High-Performance Models Built for <span className="text-gradient-gold">Indian Roads</span>
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                Located conveniently at Plot No. 4, Kaili, Ballabhgarh, Baba Marketing showcases 27 distinct electric scooter models with Electric Scooters starting at ₹11,000/-, Single Light Models from ₹15,000/-, and LFP Batteries starting at ₹15,000/-. From sleek daily commuters to high-torque dual 12-inch cruisers and commercial loaders, our vehicles cater to every lifestyle and commercial need.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                  <div className="text-lg font-serif font-black text-crimson-600">₹11,000/-</div>
                  <div className="text-xs text-slate-600">Scooters Starting (Single Light ₹15,000/-)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                  <div className="text-lg font-serif font-black text-brand-800">50 – 300 KM</div>
                  <div className="text-xs text-slate-600">LFP Battery Range (From ₹15,000/-)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                  <div className="text-lg font-serif font-black text-brand-800">60 Month Warranty</div>
                  <div className="text-xs text-slate-600">5-Year Peace of Mind</div>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                  <div className="text-lg font-serif font-black text-crimson-600">40 + 20 FREE</div>
                  <div className="text-xs text-slate-600">Special Distributor Offer + 14 Benefits</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/scooters"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Explore 27 Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                    'Hello Baba Marketing, I would like to visit the Ballabhgarh showroom for a test ride and dealership enquiry.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-brand-100 hover:bg-white/15 text-slate-900 font-bold text-xs border border-brand-200 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-brand-700" />
                  <span>WhatsApp Enquiry ({whatsapp})</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border-2 border-brand-300 shadow-lg">
              <Image
                src="/models/set-1/main.jpg"
                alt="FRENDO E-SCOOTY Showroom Ballabhgarh"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-300 text-center">
                <div className="font-serif text-xs font-bold text-brand-800">FRENDO Flagship Electric Lineup</div>
                <div className="text-[10px] text-slate-700">Available in 5 Attractive Colours with 60 Month Warranty</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
              Why Choose <span className="text-gradient-gold">FRENDO E-SCOOTY</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">Engineered for Indian road conditions with maximum cost savings</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-brand-300 hover:border-brand-700 transition-all text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-brand-800 mx-auto" />
              <div className="font-serif text-base font-bold text-slate-900">5-Year Warranty</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Complete factory warranty on chassis, motor, wiring, and high-safety LFP battery configurations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-300 hover:border-brand-700 transition-all text-center space-y-3">
              <Award className="w-8 h-8 text-brand-800 mx-auto" />
              <div className="font-serif text-base font-bold text-slate-900">15p – 20p / KM</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Lowest running cost in class. Save up to ₹50,000 every single year compared to expensive petrol.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-300 hover:border-brand-700 transition-all text-center space-y-3">
              <Users className="w-8 h-8 text-brand-800 mx-auto" />
              <div className="font-serif text-base font-bold text-slate-900">All India Dealership</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Lucrative franchise program with rent & electrician support, free demo scooty, and NETRAX certification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-300 hover:border-brand-700 transition-all text-center space-y-3">
              <Zap className="w-8 h-8 text-brand-800 mx-auto" />
              <div className="font-serif text-base font-bold text-slate-900">Pure Copper Motor</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Heavy-duty chassis, 100% pure copper motor & wiring, front hydraulic disc brake, and central locking.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-400/25 via-brand-50 to-transparent border border-brand-300 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Ready to Upgrade or Join Our Dealer Network?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">
              Visit our showroom at Plot No. 4, Kaili, Ballabhgarh, Faridabad or speak directly with our team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="px-5 py-3 rounded-xl bg-amber-400 text-brand-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-300 shadow-glow transition-all"
            >
              <Phone className="w-4 h-4 fill-brand-950" />
              <span>Call: {phone}</span>
            </a>

            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                'Hello Baba Marketing, I would like more information on FRENDO E-SCOOTY.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-brand-100 hover:bg-brand-200 text-slate-900 font-bold text-xs border border-brand-200 flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-brand-700" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
