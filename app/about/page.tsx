import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { query } from '@/lib/db';
import { ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import { Zap, ShieldCheck, Award, Users, BatteryCharging, ArrowRight, MessageCircle, Sparkles, CheckCircle2, Phone } from 'lucide-react';

export const revalidate = 0;

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
    <div className="min-h-screen bg-navy-950 text-white py-12 sm:py-16 selection:bg-amber-500 selection:text-navy-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest shadow-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized FRENDO E-SCOOTY Showroom</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            About <span className="text-gradient-gold">BABA MARKETING</span>
          </h1>

          <p className="text-amber-300 font-serif text-base sm:text-lg tracking-wide">
            Drive Green, Live Better!
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to BABA MARKETING, your premier authorized showroom and distribution partner for FRENDO E-SCOOTY in Ballabhgarh, Faridabad and across India. We deliver cutting-edge electric two-wheelers, advanced LFP battery solutions, and lucrative B2B dealership opportunities.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-navy-900/80 border border-amber-500/20 shadow-xl space-y-4 relative group hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-glow">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gradient-gold">Our Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To drive India’s electric mobility revolution with high-performance, whisper-quiet electric scooters that cost just 15 to 20 paise per kilometer. We envision clean roads, zero petrol dependence, and massive financial savings for every household and commercial operator.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-navy-900/80 border border-amber-500/20 shadow-xl space-y-4 relative group hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-glow">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gradient-gold">Our Commitment</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every FRENDO E-SCOOTY is engineered with pure copper motor windings, heavy-duty chassis, front disc brakes, and dependable smart controllers. Backed by our standard 5-Year Warranty, genuine spares, and expert certified technicians in Ballabhgarh.
            </p>
          </div>
        </div>

        {/* Brand Story with Showcase Image */}
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/90 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Showroom & Nationwide Network
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight">
                27 High-Performance Models Built for <span className="text-gradient-gold">Indian Roads</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Located conveniently at 33 Futa Road, Kaili, Ballabhgarh, Baba Marketing showcases 27 distinct electric scooter models with prices starting at just ₹15,000/- (All Taxes Included). From sleek daily commuters to high-torque dual 12-inch cruisers and commercial loaders, our vehicles cater to every lifestyle and commercial need.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-lg font-serif font-black text-amber-400">₹15,000/-</div>
                  <div className="text-xs text-slate-400">Starting Price (Taxes Inc.)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-lg font-serif font-black text-amber-400">50 – 300 KM</div>
                  <div className="text-xs text-slate-400">Running Range Options</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-lg font-serif font-black text-amber-400">5-Year Warranty</div>
                  <div className="text-xs text-slate-400">Comprehensive Peace of Mind</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-lg font-serif font-black text-amber-400">14 B2B Benefits</div>
                  <div className="text-xs text-slate-400">On 40 Scooties Dealership</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/scooters"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
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
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Enquiry ({whatsapp})</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border-2 border-amber-500/30 shadow-2xl">
              <Image
                src="/models/set-1/main.jpg"
                alt="FRENDO E-SCOOTY Showroom Ballabhgarh"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/30 text-center">
                <div className="font-serif text-xs font-bold text-amber-400">FRENDO Flagship Electric Lineup</div>
                <div className="text-[10px] text-slate-300">Available in 5 Attractive Colours with 5-Year Warranty</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Why Choose <span className="text-gradient-gold">FRENDO E-SCOOTY</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">Engineered for Indian road conditions with maximum cost savings</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-amber-500/20 hover:border-amber-500/50 transition-all text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="font-serif text-base font-bold text-white">5-Year Warranty</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete factory warranty on chassis, motor, wiring, and high-safety LFP battery configurations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/60 border border-amber-500/20 hover:border-amber-500/50 transition-all text-center space-y-3">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="font-serif text-base font-bold text-white">15p – 20p / KM</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lowest running cost in class. Save up to ₹50,000 every single year compared to expensive petrol.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/60 border border-amber-500/20 hover:border-amber-500/50 transition-all text-center space-y-3">
              <Users className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="font-serif text-base font-bold text-white">All India Dealership</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lucrative franchise program with rent & electrician support, free demo scooty, and NETRAX certification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900/60 border border-amber-500/20 hover:border-amber-500/50 transition-all text-center space-y-3">
              <Zap className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="font-serif text-base font-bold text-white">Pure Copper Motor</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Heavy-duty chassis, 100% pure copper motor & wiring, front hydraulic disc brake, and central locking.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-transparent border border-amber-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Ready to Upgrade or Join Our Dealer Network?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Visit our showroom at 33 Futa Road, Kaili, Ballabhgarh or speak directly with our team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-400 shadow-glow transition-all"
            >
              <Phone className="w-4 h-4 fill-navy-950" />
              <span>Call: {phone}</span>
            </a>

            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                'Hello Baba Marketing, I would like more information on FRENDO E-SCOOTY.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
