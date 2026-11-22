'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { SeoSetting } from '@/types';

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const loadSeo = async () => {
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      if (data.seoSettings) setSeoList(data.seoSettings);
    } catch (err: any) {
      setError(err.message || 'Error loading SEO settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSeo();
  }, []);

  const handleUpdate = async (item: SeoSetting) => {
    setSavingId(item.id);
    setError('');

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error('Failed to update SEO setting');

      setSuccess(`SEO metadata saved for route "${item.page_route}"`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">Loading SEO settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">SEO & Search Optimization</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage meta titles, meta descriptions, and keywords for search engine ranking.
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

      <div className="space-y-6">
        {seoList.map((item, idx) => (
          <div key={item.id} className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold text-electric-400">
                PAGE ROUTE: {item.page_route}
              </span>

              <button
                type="button"
                onClick={() => handleUpdate(item)}
                disabled={savingId === item.id}
                className="px-4 py-1.5 rounded-xl bg-electric-500 text-navy-950 font-bold text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingId === item.id ? 'Saving...' : 'Save Meta'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Title</label>
              <input
                type="text"
                value={item.meta_title}
                onChange={(e) => {
                  const val = e.target.value;
                  setSeoList((prev) =>
                    prev.map((s, i) => (i === idx ? { ...s, meta_title: val } : s))
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={item.meta_description}
                onChange={(e) => {
                  const val = e.target.value;
                  setSeoList((prev) =>
                    prev.map((s, i) => (i === idx ? { ...s, meta_description: val } : s))
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Keywords</label>
                <input
                  type="text"
                  value={item.keywords || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSeoList((prev) =>
                      prev.map((s, i) => (i === idx ? { ...s, keywords: val } : s))
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">OpenGraph Image URL</label>
                <input
                  type="text"
                  value={item.og_image || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSeoList((prev) =>
                      prev.map((s, i) => (i === idx ? { ...s, og_image: val } : s))
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
