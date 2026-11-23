import React from 'react';
import { query } from '@/lib/db';
import { ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import { getCachedContact } from '@/lib/data';
import QuickEnquirySection from '@/components/home/QuickEnquirySection';
import { Phone, MessageCircle, MapPin, Mail, Clock, Globe, Briefcase, Award } from 'lucide-react';

export const revalidate = 300;

export async function generateMetadata() {
  return await getSeoMetadata('/contact');
}

async function getContactData() {
  return await getCachedContact();
}

export default async function ContactPage() {
  const contact = await getContactData();

  const businessName = contact?.business_name || 'BABA MARKETING';
  const brandName = 'FRENDO E-SCOOTY';
  const address =
    contact?.address ||
    'Plot No. 4, Kaili, Ballabhgarh, Faridabad, Haryana – 121004, India.';
  const primaryPhone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';
  const email = contact?.email || 'info@frendo.in';
  const hours = contact?.opening_hours || 'Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 5:00 PM';

  const faqs = [
    {
      q: 'What is the starting price of FRENDO E-SCOOTY?',
      a: 'Electric Scooters start from ₹11,000/-, Single Light Models start from ₹15,000/-, and LFP Electric Scooter Batteries start from ₹15,000/-, giving you transparent tier-based manufacturer rates.',
    },
    {
      q: 'What are the available LFP battery and range options?',
      a: 'We offer 5 LFP 60V battery packs (20Ah, 30Ah, 45Ah, 60Ah, 75Ah) starting from ₹15,000/- delivering real-world running range from 50 KM up to 300 KM per charge.',
    },
    {
      q: 'What is the 40 + 20 FREE Special Distributor Offer?',
      a: 'Under our Special Distributor Offer, buy 40 scooters and get 20 scooters absolutely FREE (40 स्कूटर खरीदें और 20 स्कूटर बिल्कुल FREE पाएँ!), plus Free Transportation Across India, Demo Scooty/Battery/Charger, 60 Month Warranty, Shop Rent & Electrician Support, ₹1 Crore Insurance, Branding, NETRAX Certificate, and Free Training.',
    },
    {
      q: 'What warranty is offered on FRENDO scooters?',
      a: 'FRENDO E-SCOOTY offers a comprehensive 60 Month (5-Year) Warranty as per applicable company warranty terms and conditions.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-10 sm:py-14 border-t border-brand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest mb-3 font-serif">
            Official Contact & B2B Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            CONNECT WITH BABA MARKETING
          </h1>
          <p className="mt-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
            Authorized Showroom & Distribution Hub for <strong className="text-brand-800">FRENDO E-SCOOTY</strong>. Connect with our dealership specialists or book a free test ride in Ballabhgarh, Faridabad.
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Direct Hotline */}
          <div className="p-6 rounded-2xl bg-white border border-brand-200 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 border border-brand-300 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-brand-800 font-bold">Call Showroom</div>
              <div className="text-lg font-black text-slate-900 mt-1">{primaryPhone}</div>
              <p className="text-xs text-slate-600 mt-1">Direct phone assistance for retail and wholesale queries.</p>
            </div>
            <a
              href={`tel:${primaryPhone}`}
              className="mt-3 block text-center py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs"
            >
              Call Now
            </a>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="p-6 rounded-2xl bg-white border border-brand-300 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-brand-950 flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5 fill-brand-950" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-brand-800 font-bold">WhatsApp Hotline</div>
              <div className="text-lg font-black text-slate-900 mt-1">+91 {whatsapp}</div>
              <p className="text-xs text-slate-600 mt-1">Instant replies, model photos, prices, and franchise details.</p>
            </div>
            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent('Hello Baba Marketing, I want to inquire about FRENDO E-SCOOTY.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-bold text-xs shadow-glow"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Card 3: Showroom Location */}
          <div className="p-6 rounded-2xl bg-white border border-brand-200 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 border border-brand-300 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-brand-800 font-bold">Showroom Address</div>
              <div className="text-xs font-semibold text-slate-900 mt-1 leading-relaxed">{address}</div>
              <p className="text-[11px] text-slate-600 mt-1">Mon – Sat: 9 AM – 8 PM</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-slate-700 font-bold text-xs"
            >
              Get Directions
            </a>
          </div>

          {/* Card 4: Official Website */}
          <div className="p-6 rounded-2xl bg-white border border-brand-200 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 border border-brand-300 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-brand-800 font-bold">Official Web Portal</div>
              <div className="text-base font-bold text-slate-900 mt-1">www.frendo.in</div>
              <p className="text-xs text-slate-600 mt-1">Visit our official brand portal for regular updates and announcements.</p>
            </div>
            <a
              href="https://www.frendo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs"
            >
              Visit Portal
            </a>
          </div>
        </div>

        {/* Quick Enquiry Component */}
        <QuickEnquirySection
          primaryPhone={primaryPhone}
          whatsappNumber={whatsapp}
          address={address}
        />

        {/* FAQs */}
        <div className="pt-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">Everything you need to know about FRENDO E-SCOOTY</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-brand-200 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
