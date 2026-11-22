import React from 'react';
import { query } from '@/lib/db';
import { ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import QuickEnquirySection from '@/components/home/QuickEnquirySection';
import { Phone, MessageCircle, MapPin, Mail, Clock, Globe, Briefcase, Award } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata('/contact');
}

async function getContactData() {
  try {
    const contactRows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    return contactRows[0] || null;
  } catch {
    return null;
  }
}

export default async function ContactPage() {
  const contact = await getContactData();

  const businessName = contact?.business_name || 'BABA MARKETING';
  const brandName = 'FRENDO E-SCOOTY';
  const address =
    contact?.address ||
    '33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004, India.';
  const primaryPhone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';
  const email = contact?.email || 'info@frendo.in';
  const hours = contact?.opening_hours || 'Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 5:00 PM';

  const faqs = [
    {
      q: 'What is the starting price of FRENDO E-SCOOTY?',
      a: 'The starting price is ₹15,000/- (All Taxes Included), making it the most affordable and accessible electric vehicle in India.',
    },
    {
      q: 'What are the available LFP battery and range options?',
      a: 'We offer 5 LFP 60V battery packs (20Ah, 30Ah, 45Ah, 60Ah, 75Ah) delivering real-world running range from 50 KM up to 300 KM per charge.',
    },
    {
      q: 'What are the B2B Dealership benefits on purchase of 40 scooties?',
      a: 'On purchase of 40 scooties, you get Free Transportation Across India, 1 Free Demo Scooty, 1 Free Demo Battery, 1 Free Demo Charger, 5-Year Warranty, Shop Rent Support, Electrician Salary Support, ₹1 Crore Insurance, Branding, NETRAX Certificate, Dealer Certificate, and Free Training.',
    },
    {
      q: 'What warranty is offered on FRENDO scooters?',
      a: 'FRENDO E-SCOOTY offers a comprehensive 5-Year Warranty as per applicable company warranty terms and conditions.',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white py-10 sm:py-14 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 font-serif">
            Official Contact & B2B Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            CONNECT WITH BABA MARKETING
          </h1>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Authorized Showroom & Distribution Hub for <strong className="text-amber-400">FRENDO E-SCOOTY</strong>. Connect with our dealership specialists or book a free test ride in Ballabhgarh, Faridabad.
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Direct Hotline */}
          <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-amber-400 font-bold">Call Showroom</div>
              <div className="text-lg font-black text-white mt-1">{primaryPhone}</div>
              <p className="text-xs text-slate-400 mt-1">Direct phone assistance for retail and wholesale queries.</p>
            </div>
            <a
              href={`tel:${primaryPhone}`}
              className="mt-3 block text-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 font-bold text-xs"
            >
              Call Now
            </a>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="p-6 rounded-2xl bg-navy-900 border border-amber-500/30 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-navy-950 flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5 fill-navy-950" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-amber-400 font-bold">WhatsApp Hotline</div>
              <div className="text-lg font-black text-white mt-1">+91 {whatsapp}</div>
              <p className="text-xs text-slate-400 mt-1">Instant replies, model photos, prices, and franchise details.</p>
            </div>
            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent('Hello Baba Marketing, I want to inquire about FRENDO E-SCOOTY.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs shadow-glow"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Card 3: Showroom Location */}
          <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-amber-400 font-bold">Showroom Address</div>
              <div className="text-xs font-semibold text-white mt-1 leading-relaxed">{address}</div>
              <p className="text-[11px] text-slate-400 mt-1">Mon – Sat: 9 AM – 8 PM</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
            >
              Get Directions
            </a>
          </div>

          {/* Card 4: Official Website */}
          <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 shadow-card flex flex-col justify-between space-y-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <div className="font-serif text-xs uppercase tracking-wider text-amber-400 font-bold">Official Web Portal</div>
              <div className="text-base font-bold text-white mt-1">www.frendo.in</div>
              <p className="text-xs text-slate-400 mt-1">Visit our official brand portal for regular updates and announcements.</p>
            </div>
            <a
              href="https://www.frendo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 font-bold text-xs"
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
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">Everything you need to know about FRENDO E-SCOOTY</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-navy-900 border border-white/10 space-y-2">
                <h3 className="font-bold text-sm text-white">{faq.q}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
