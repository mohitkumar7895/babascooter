'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Phone, MapPin, MessageCircle } from 'lucide-react';
import { ContactSettings } from '@/types';

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    business_name: 'BABA MARKETING',
    brand_name: 'FRENDO E-SCOOTY',
    tagline: 'Drive Green, Live Better!',
    address: '33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004',
    primary_phone: '9953564151',
    whatsapp_number: '9953564151',
    additional_phones: '9953564151',
    email: 'info@frendo.in',
    google_maps_url: '',
    google_maps_embed: '',
    opening_hours: 'Monday – Sunday: 9:00 AM – 8:00 PM (Showroom Open All 7 Days)',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.contact) {
          const c = data.contact;
          setContact(c);

          let addPhones = c.additional_phones;
          try {
            const parsed = JSON.parse(c.additional_phones);
            if (Array.isArray(parsed)) addPhones = parsed.join(', ');
          } catch {}

          setFormData({
            business_name: c.business_name || 'BABA MARKETING',
            brand_name: c.brand_name || 'FRENDO E-SCOOTY',
            tagline: c.tagline || 'Drive Green, Live Better!',
            address: c.address || '33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004',
            primary_phone: c.primary_phone || '9953564151',
            whatsapp_number: c.whatsapp_number || '9953564151',
            additional_phones: addPhones || '9953564151',
            email: c.email || 'info@frendo.in',
            google_maps_url: c.google_maps_url || '',
            google_maps_embed: c.google_maps_embed || '',
            opening_hours: c.opening_hours || 'Monday – Sunday: 9:00 AM – 8:00 PM',
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const phonesArray = formData.additional_phones
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);

      const payload = {
        contact: {
          ...formData,
          additional_phones: JSON.stringify(phonesArray),
        },
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update contact settings');

      setSuccess('Contact information updated dynamically across all website pages!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving contact information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">Loading contact settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Contact & Showroom Details</h1>
        <p className="text-xs text-slate-400 mt-1">
          Edit phone numbers, WhatsApp numbers, showroom address, and Google Maps. Changes update dynamically across Header, Footer, and contact sections.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-electric-400" />
            <span>Phone & WhatsApp Numbers</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Phone *</label>
              <input
                type="text"
                required
                value={formData.primary_phone}
                onChange={(e) => setFormData({ ...formData, primary_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary WhatsApp *</label>
              <input
                type="text"
                required
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Additional Contact Numbers (Comma separated)
            </label>
            <input
              type="text"
              value={formData.additional_phones}
              onChange={(e) => setFormData({ ...formData, additional_phones: e.target.value })}
              placeholder="9811481143, 8800894544, 9599790799, 9958571353"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>
        </div>

        {/* Showroom Address & Google Maps */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-electric-400" />
            <span>Showroom Location & Address</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Showroom Address *</label>
            <textarea
              rows={3}
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Showroom Timings</label>
            <input
              type="text"
              value={formData.opening_hours}
              onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Maps URL</label>
            <input
              type="text"
              value={formData.google_maps_url}
              onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Maps Embed URL</label>
            <input
              type="text"
              value={formData.google_maps_embed}
              onChange={(e) => setFormData({ ...formData, google_maps_embed: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-electric-500 text-navy-950 font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating Details...' : 'Save Contact Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
