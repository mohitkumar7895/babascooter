import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | FRENDO E-SCOOTY Baba Marketing',
  description: 'Privacy policy and customer data handling principles for Baba Marketing FRENDO electric scooters website.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white py-16 selection:bg-amber-500 selection:text-navy-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest shadow-glow mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Policy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Privacy <span className="text-gradient-gold">Policy</span>
          </h1>
          <p className="text-xs text-slate-400 mt-2">Effective Date: November 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-navy-900/80 p-8 sm:p-10 rounded-3xl border border-amber-500/20 shadow-2xl backdrop-blur-md">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-gradient-gold">1. Introduction</h2>
            <p>
              BABA MARKETING (FRENDO E-SCOOTY) operates the official website <a href="https://www.frendo.in" className="text-amber-400 underline">https://www.frendo.in</a>.
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
              If you have any questions regarding our privacy practices, please contact BABA MARKETING directly via Call/WhatsApp at <strong className="text-amber-400">9953564151</strong> or visit our
              showroom at BJP Office, Plot No. 4, 33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004.
            </p>
          </section>

          <div className="pt-4 border-t border-white/10">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:text-amber-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
