'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Save, CheckCircle2, AlertCircle, Sparkles, Eye, EyeOff, Upload, Image as ImageIcon } from 'lucide-react';
import { HomepageSection, Banner } from '@/types';

export default function AdminHomepagePage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Promo Banner Editor
  const [promoBanner, setPromoBanner] = useState({
    id: 0,
    title: '',
    subtitle: '',
    offer_text: '',
    button_text: 'Explore Scooters',
    button_link: '/scooters',
    image_url: '',
    is_active: true,
  });

  // Hero Section Editor
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroTagline, setHeroTagline] = useState('DRIVE GREEN, LIVE BETTER!');
  const [heroImage, setHeroImage] = useState('/models/set-1/main.jpg');

  const loadData = async () => {
    try {
      const res = await fetch('/api/homepage');
      const data = await res.json();
      if (data.sections) {
        setSections(data.sections);
        const hero = data.sections.find((s: any) => s.section_key === 'hero');
        if (hero) {
          setHeroTitle(hero.title);
          setHeroSubtitle(hero.subtitle || '');
          if (hero.content) {
            try {
              const parsed = typeof hero.content === 'string' ? JSON.parse(hero.content) : hero.content;
              if (parsed?.hero_image) setHeroImage(parsed.hero_image);
              if (parsed?.tagline) setHeroTagline(parsed.tagline);
            } catch {}
          }
        }
      }
      if (data.banners) {
        setBanners(data.banners);
        const promo = data.banners.find((b: any) => b.banner_type === 'promo') || data.banners[0];
        if (promo) {
          setPromoBanner({
            id: promo.id,
            title: promo.title,
            subtitle: promo.subtitle || '',
            offer_text: promo.offer_text || '',
            button_text: promo.button_text || 'Explore Scooters',
            button_link: promo.button_link || '/scooters',
            image_url: promo.image_url || '',
            is_active: Boolean(promo.is_active),
          });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error loading homepage settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const body = new FormData();
    body.append('file', file);
    body.append('folder', 'banners');

    try {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPromoBanner((prev) => ({ ...prev, image_url: data.url }));
      setSuccess('Banner image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const body = new FormData();
    body.append('file', file);
    body.append('folder', 'banners');

    try {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setHeroImage(data.url);
      setSuccess('Hero showcase image uploaded successfully! Click "Save Hero" to apply.');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: 'hero',
          title: heroTitle,
          subtitle: heroSubtitle,
          content: {
            hero_image: heroImage,
            tagline: heroTagline,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to update hero section');
      setSuccess('Hero section updated dynamically on the website!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSavePromo = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          banner: promoBanner,
        }),
      });
      if (!res.ok) throw new Error('Failed to update banner');
      setSuccess('Promotional banner updated dynamically on the website!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleSection = async (section: HomepageSection) => {
    try {
      const newVisible = !section.is_visible;
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: section.section_key,
          is_visible: newVisible,
        }),
      });
      if (res.ok) {
        setSections((prev) =>
          prev.map((s) => (s.id === section.id ? { ...s, is_visible: newVisible } : s))
        );
      }
    } catch (err) {
      console.error('Error toggling section:', err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">Loading homepage settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Homepage & Banner Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Control hero section headings, festival promotional banners, image uploads, and section visibility.
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

      {/* Hero Section Form */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hero Section Content</span>
          </h2>
          <button
            onClick={handleSaveHero}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs shadow-glow transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Hero</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Main Heading</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="e.g. DISCOVER YOUR FUTURE WITH FRENDO E-SCOOTY"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Top Tagline</label>
            <input
              type="text"
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              placeholder="e.g. DRIVE GREEN, LIVE BETTER!"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Subtitle</label>
          <textarea
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            placeholder="e.g. Welcome to FRENDO E-SCOOTY, an electric scooter brand offering multiple models..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Hero Showcase Image Upload & Preview */}
        <div className="pt-2 border-t border-white/5">
          <label className="block text-xs font-semibold text-slate-300 mb-2">Hero Showcase Scooty Image</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-36 h-28 rounded-xl bg-slate-950 border border-amber-500/30 overflow-hidden shrink-0 shadow">
              <Image
                src={heroImage}
                alt="Hero Showcase Preview"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="flex-1 w-full space-y-2">
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/models/set-1/main.jpg or /uploads/..."
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />

              <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload New Hero Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner Form */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Festival & Promotional Banner</span>
          </h2>
          <button
            onClick={handleSavePromo}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs shadow-glow transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Banner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Title</label>
            <input
              type="text"
              value={promoBanner.title}
              onChange={(e) => setPromoBanner({ ...promoBanner, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subtitle</label>
            <input
              type="text"
              value={promoBanner.subtitle}
              onChange={(e) => setPromoBanner({ ...promoBanner, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Offer Highlight Text</label>
          <input
            type="text"
            value={promoBanner.offer_text}
            onChange={(e) => setPromoBanner({ ...promoBanner, offer_text: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
            <input
              type="text"
              value={promoBanner.button_text}
              onChange={(e) => setPromoBanner({ ...promoBanner, button_text: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Link</label>
            <input
              type="text"
              value={promoBanner.button_link}
              onChange={(e) => setPromoBanner({ ...promoBanner, button_link: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Banner Image Upload */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner Image</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {promoBanner.image_url ? (
              <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                <Image
                  src={promoBanner.image_url}
                  alt="Banner preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-20 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-500 shrink-0">
                <ImageIcon className="w-6 h-6 mb-1" />
                <span className="text-[10px]">No Image</span>
              </div>
            )}

            <div className="space-y-2 flex-1 w-full">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-all border border-white/20">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>{uploading ? 'Uploading...' : 'Upload New Banner Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <div className="text-[11px] text-slate-400">
                JPG, PNG or WebP. High resolution recommended (1200x500px).
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={promoBanner.is_active}
              onChange={(e) => setPromoBanner({ ...promoBanner, is_active: e.target.checked })}
              className="rounded bg-white/5 border-white/20 text-amber-500 focus:ring-0"
            />
            <span>Banner is Active (Visible on Homepage)</span>
          </label>
        </div>
      </div>

      {/* Homepage Sections Visibility */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
          Homepage Sections Visibility
        </h2>

        <div className="divide-y divide-white/5">
          {sections.map((sec) => (
            <div key={sec.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{sec.title}</div>
                <div className="text-[10px] text-slate-500 font-mono">KEY: {sec.section_key}</div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleSection(sec)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  sec.is_visible
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-white/5 text-slate-500'
                }`}
              >
                {sec.is_visible ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visible</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
