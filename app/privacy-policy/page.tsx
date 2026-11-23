import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | FRENDO E-SCOOTY Baba Marketing',
  description: 'Privacy policy and customer data handling principles for Baba Marketing FRENDO electric scooters website.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-16 selection:bg-brand-800 selection:text-amber-400 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-100 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest shadow-glow mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Policy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Privacy <span className="text-gradient-gold">Policy</span>
          </h1>
          <p className="text-xs text-slate-600 mt-2">Effective Date: November 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-8 sm:p-10 rounded-3xl border border-brand-300 shadow-lg backdrop-blur-md">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">1. Introduction</h2>
            <p>
              BABA MARKETING (FRENDO E-SCOOTY) operates the official website <a href="https://www.frendo.in" className="text-brand-800 underline">https://www.frendo.in</a>.
              We are committed to respecting and protecting the privacy of dealers, customers, and visitors who submit enquiries or book showroom test rides.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">2. Information We Collect</h2>
            <p>
              When you submit a contact enquiry, B2B dealership application, or request a showroom test ride, we collect only necessary contact information including your name,
              phone number, city, and model preferences. We do not process unsolicited third-party advertising or collect banking credentials through this website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">3. How We Use Your Information</h2>
            <p>
              Your contact details are used solely to respond to your product enquiry, arrange test rides at our Ballabhgarh showroom,
              and share official FRENDO product specifications, dealership benefits, and pricing. We never sell, rent, or trade your personal information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">4. Contact & Inquiries</h2>
            <p>
              If you have any questions regarding our privacy practices, please contact BABA MARKETING directly via Call/WhatsApp at <strong className="text-brand-800">9953564151</strong> or visit our
              showroom at BJP Office, Plot No. 4, 33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004.
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
