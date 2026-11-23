import React from 'react';
import { query } from '@/lib/db';
import { ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2, Sparkles } from 'lucide-react';

export const revalidate = 300;

export async function generateMetadata() {
  return await getSeoMetadata('/location');
}

async function getLocationData() {
  try {
    const contactRows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    return contactRows[0] || null;
  } catch {
    return null;
  }
}

export default async function LocationPage() {
  const contact = await getLocationData();

  const businessName = contact?.business_name || 'BABA MARKETING';
  const address =
    contact?.address ||
    'BJP Office, Plot No. 4, 33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004, India.';
  const primaryPhone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';
  const hours =
    contact?.opening_hours ||
    'Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 5:00 PM';
  const mapsUrl =
    contact?.google_maps_url ||
    'https://maps.google.com/?q=BJP+Office,+Plot+No.+4,+33+Futa+Road,+Near+Deepak+Dagar,+Kaili,+Ballabhgarh,+Faridabad,+Haryana+121004';
  const mapsEmbed =
    contact?.google_maps_embed ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14044.254198285876!2d77.3182!3d28.3245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cd99f1c7d!2sBallabhgarh%2C+Faridabad%2C+Haryana+121004!5e0!3m2!1sen!2sin!4v1';

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-12 sm:py-16 selection:bg-brand-800 selection:text-amber-400 relative overflow-hidden">
      {/* Glow Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-100 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest shadow-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ballabhgarh, Faridabad Showroom</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            Find Our Showroom in <span className="text-gradient-gold">Ballabhgarh</span>
          </h1>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Visit the authorized {businessName} showroom to experience all 27 FRENDO E-SCOOTY models in person.
            Free parking, full test-rides, and spot delivery available.
          </p>
        </div>

        {/* Address and Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-brand-300 shadow-lg backdrop-blur-md space-y-6">
              <div>
                <div className="text-xs uppercase font-bold text-brand-800 tracking-wider">
                  Showroom Address
                </div>
                <div className="mt-2 text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-800 shrink-0 mt-1" />
                  <span>{address}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-200 space-y-3">
                <div className="text-xs uppercase font-bold text-slate-600 tracking-wider">
                  Direct Contact & Helpline
                </div>
                <div className="space-y-2">
                  <a
                    href={`tel:${primaryPhone}`}
                    className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 hover:text-brand-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-brand-800" />
                    <span>Call: {primaryPhone}</span>
                  </a>

                  <a
                    href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                      'Hello Baba Marketing, I am on my way to the Ballabhgarh showroom. Please share directions.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm font-semibold text-brand-800 hover:text-brand-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp: +91 {whatsapp}</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-200">
                <div className="text-xs uppercase font-bold text-slate-600 tracking-wider mb-1.5">
                  Showroom Timings
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Clock className="w-4 h-4 text-brand-800 shrink-0" />
                  <span>{hours}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 fill-brand-950" />
                  <span>Open in Google Maps Navigation</span>
                </a>
              </div>
            </div>

            {/* Visit Perks */}
            <div className="p-6 rounded-2xl bg-white border border-brand-300 shadow-xl space-y-3">
              <div className="text-xs font-serif font-bold text-brand-800 uppercase tracking-wider">Showroom Amenities</div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-800" />
                  <span>Free Customer Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-800" />
                  <span>Live Test Rides</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-800" />
                  <span>Spot Delivery Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-800" />
                  <span>Technical Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7">
            <div className="h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border-2 border-brand-300 shadow-lg relative bg-slate-100">
              <iframe
                title="Baba Marketing Showroom Location"
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
