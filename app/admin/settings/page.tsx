'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    website_name: 'Baba Marketing – FRENDO Electric Scooty',
    tagline: 'Electric Scooty | Clean Energy | Better Tomorrow',
    footer_text: '© 2026 Baba Marketing – FRENDO Electric Scooty. All Rights Reserved.',
    logo_text: 'BABA MARKETING',
    sub_logo_text: 'FRENDO ELECTRIC SCOOTY',
    social_facebook: 'https://facebook.com',
    social_instagram: 'https://instagram.com',
    social_youtube: 'https://youtube.com',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.website) {
          setSettings((prev) => ({ ...prev, ...data.website }));
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
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: settings }),
      });

      if (!res.ok) throw new Error('Failed to update general settings');

      setSuccess('Website general settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Website General Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize website branding, logo labels, footer copyright, and social links.
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
            <Settings className="w-4 h-4 text-electric-400" />
            <span>Brand Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Website Name</label>
              <input
                type="text"
                value={settings.website_name}
                onChange={(e) => setSettings({ ...settings, website_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Header Logo Text</label>
              <input
                type="text"
                value={settings.logo_text}
                onChange={(e) => setSettings({ ...settings, logo_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Logo Subtitle</label>
              <input
                type="text"
                value={settings.sub_logo_text}
                onChange={(e) => setSettings({ ...settings, sub_logo_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Footer Copyright Text</label>
            <input
              type="text"
              value={settings.footer_text}
              onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            Social Media Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Facebook</label>
              <input
                type="text"
                value={settings.social_facebook || ''}
                onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Instagram</label>
              <input
                type="text"
                value={settings.social_instagram || ''}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">YouTube</label>
              <input
                type="text"
                value={settings.social_youtube || ''}
                onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-electric-500 text-navy-950 font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Website Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
