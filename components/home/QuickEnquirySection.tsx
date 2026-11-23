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
  address = 'Plot No. 4, Kaili, Ballabhgarh, Faridabad, Haryana – 121004',
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
    <section className="py-12 sm:py-16 bg-brand-50 border-t border-brand-200 cv-auto" id="quick-enquiry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Showroom Information */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-800 text-xs font-bold text-white uppercase tracking-widest font-serif shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Showroom Experience & Test Ride</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-royal-800 tracking-tight">
              VISIT OUR BALLABHGARH SHOWROOM
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Experience the ride comfort, pick-up speed, and heavy-duty chassis build quality of FRENDO electric scooters in person. Test-ride any model and explore our LFP battery configurations.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-brand-200 shadow-sm">
                <MapPin className="w-4 h-4 text-crimson-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] uppercase font-serif font-bold text-brand-800 tracking-wider">Showroom Address</div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">{address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-brand-200 shadow-sm">
                <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-serif font-bold text-brand-800 tracking-wider">Direct Showroom Call</div>
                  <a href={`tel:${primaryPhone}`} className="text-xs font-bold text-royal-800 hover:text-brand-700">
                    {primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-brand-200 shadow-sm">
                <MessageCircle className="w-4 h-4 text-brand-700 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-serif font-bold text-brand-800 tracking-wider">Direct WhatsApp Enquiry</div>
                  <a
                    href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
                      'Hello Baba Marketing, I want to book a free test ride at Ballabhgarh showroom.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-800 hover:underline"
                  >
                    +91 {whatsappNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Enquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-800/20 shadow-xl gold-border-glow">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-800 mb-1">
              Book Free Test Ride & Best Price Quote
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              Fill your details and our team will connect with you in 15 minutes.
            </p>

            {success ? (
              <div className="p-6 rounded-2xl bg-brand-50 border-2 border-brand-300 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-brand-700 mx-auto" />
                <div className="text-base font-bold text-slate-900">Thank You! Enquiry Received</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our showroom manager will contact you promptly at <strong className="text-brand-800">{formData.phone || 'your number'}</strong> with model availability and best offers.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 px-5 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {error && (
                  <div className="p-3 rounded-xl bg-crimson-50 border border-crimson-500/40 text-xs text-crimson-700 flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 text-crimson-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9953564151"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">City / Area</label>
                    <input
                      type="text"
                      placeholder="e.g. Ballabhgarh, Faridabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Message / Model Preference</label>
                  <textarea
                    rows={2}
                    placeholder="Which model or battery range are you looking for?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
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
