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

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Failed to update SEO setting (${res.status})`);

      setSuccess(`SEO metadata saved for route "${item.page_route}"`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-600 text-sm">Loading SEO settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">SEO & Search Optimization</h1>
        <p className="text-xs text-slate-600 mt-1">
          Manage meta titles, meta descriptions, and keywords for search engine ranking.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-crimson-50 border border-crimson-500/40 text-xs text-crimson-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-crimson-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-brand-100 border border-brand-300 text-xs text-brand-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="space-y-6">
        {seoList.map((item, idx) => (
          <div key={item.id} className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200 pb-3">
              <span className="font-mono text-xs font-bold text-brand-800">
                PAGE ROUTE: {item.page_route}
              </span>

              <button
                type="button"
                onClick={() => handleUpdate(item)}
                disabled={savingId === item.id}
                className="px-4 py-1.5 rounded-xl bg-brand-800 text-white font-bold text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingId === item.id ? 'Saving...' : 'Save Meta'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={item.meta_title}
                onChange={(e) => {
                  const val = e.target.value;
                  setSeoList((prev) =>
                    prev.map((s, i) => (i === idx ? { ...s, meta_title: val } : s))
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={item.meta_description}
                onChange={(e) => {
                  const val = e.target.value;
                  setSeoList((prev) =>
                    prev.map((s, i) => (i === idx ? { ...s, meta_description: val } : s))
                  );
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={item.keywords || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSeoList((prev) =>
                      prev.map((s, i) => (i === idx ? { ...s, keywords: val } : s))
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">OpenGraph Image URL</label>
                <input
                  type="text"
                  value={item.og_image || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSeoList((prev) =>
                      prev.map((s, i) => (i === idx ? { ...s, og_image: val } : s))
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
