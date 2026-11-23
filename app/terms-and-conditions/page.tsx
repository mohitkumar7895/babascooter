import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | FRENDO E-SCOOTY Baba Marketing',
  description: 'Terms of use and showroom purchase guidelines for Baba Marketing FRENDO electric scooters.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-16 selection:bg-brand-800 selection:text-amber-400 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-100 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest shadow-glow mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Terms</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Terms and <span className="text-gradient-gold">Conditions</span>
          </h1>
          <p className="text-xs text-slate-600 mt-2">Effective Date: November 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-10 rounded-3xl border border-brand-300 shadow-lg backdrop-blur-md">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">1. Official Catalogue & Dealership Portal</h2>
            <p>
              This website serves as the official digital showcase and B2B enquiry portal for BABA MARKETING (FRENDO E-SCOOTY).
              All final dealership agreements, wholesale orders (including purchase of 40 scooties scheme), vehicle inspections, invoicing, and handover take place in accordance with company policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">2. Product Specifications & Pricing</h2>
            <p>
              Features including starting prices (₹15,000/- All Taxes Included), heavy-duty chassis, 100% pure copper motor & wiring, disc brakes, controller options (48V / 60V / 72V), LFP battery capacities (20Ah to 75Ah), and range options (50 KM to 300 KM) reflect authentic manufacturer specifications. Actual range per charge may vary according to payload, riding conditions, tyre pressure, and gradient.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">3. 5-Year Warranty Terms</h2>
            <p>
              FRENDO E-SCOOTY offers a standard 5-Year Warranty as per applicable company warranty terms and conditions. Warranty covers certified manufacturing components and battery pack terms specified at the time of purchase.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">4. B2B Dealership & Special Offers</h2>
            <p>
              All promotional benefits (such as free transportation across India, free demo scooty, demo battery, demo charger, dealer shop rent support, electrician salary support, ₹1 Crore insurance, and NETRAX certificate) are subject to official terms on the purchase of 40 scooties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">5. Contact & Jurisdiction</h2>
            <p>
              For any queries, please contact BABA MARKETING via Call/WhatsApp at <strong className="text-brand-800">9953564151</strong> or visit our showroom at 33 Futa Road, Kaili, Ballabhgarh. Any disputes are subject to the exclusive jurisdiction of the competent courts of Faridabad, Haryana, India.
            </p>
          </section>

          <div className="pt-4 border-t border-brand-200">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-brand-800 font-bold hover:text-brand-700 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
