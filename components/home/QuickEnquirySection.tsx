'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MapPin, MessageCircle, Sparkles } from 'lucide-react';

interface QuickEnquiryProps {
  primaryPhone?: string;
  whatsappNumber?: string;
  address?: string;
}

export default function QuickEnquirySection({
  primaryPhone = '9953564151',
  whatsappNumber = '9953564151',
  address = '33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004',
}: QuickEnquiryProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Faridabad / Delhi NCR',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          city: formData.city,
          message: formData.message || 'Book free test ride / request price quote',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccess(true);
      setFormData({ name: '', phone: '', city: 'Faridabad / Delhi NCR', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please call or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-navy-900 border-t border-white/5" id="quick-enquiry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Showroom Information */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest font-serif">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Showroom Experience & Test Ride</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              VISIT OUR BALLABHGARH SHOWROOM
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Experience the ride comfort, pick-up speed, and heavy-duty chassis build quality of FRENDO electric scooters in person. Test-ride any model and explore our LFP battery configurations.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-navy-950 border border-white/10 shadow-sm">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] uppercase font-serif font-bold text-slate-400 tracking-wider">Showroom Address</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-navy-950 border border-white/10 shadow-sm">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-serif font-bold text-slate-400 tracking-wider">Direct Showroom Call</div>
                  <a href={`tel:${primaryPhone}`} className="text-xs font-bold text-amber-300 hover:text-amber-200">
                    {primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-navy-950 border border-white/10 shadow-sm">
                <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-serif font-bold text-slate-400 tracking-wider">Direct WhatsApp Enquiry</div>
                  <a
                    href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                      'Hello Baba Marketing, I want to book a free test ride at Ballabhgarh showroom.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    +91 {whatsappNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Enquiry Form */}
          <div className="lg:col-span-6 bg-navy-950 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl gold-border-glow">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
              Book Free Test Ride & Best Price Quote
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Fill your details and our team will connect with you in 15 minutes.
            </p>

            {success ? (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
                <div className="text-base font-bold text-white">Thank You! Enquiry Received</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our showroom manager will contact you promptly at <strong>{formData.phone || 'your number'}</strong> with model availability and best offers.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 px-5 py-2 rounded-xl bg-amber-500 text-navy-950 font-bold text-xs uppercase tracking-wider"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {error && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9953564151"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">City / Area</label>
                    <input
                      type="text"
                      placeholder="e.g. Ballabhgarh, Faridabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Message / Model Preference</label>
                  <textarea
                    rows={2}
                    placeholder="Which model or battery range are you looking for?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 fill-navy-950" />
                      <span>Request Showroom Callback</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
