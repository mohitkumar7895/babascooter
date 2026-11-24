'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { uploadAdminImage } from '@/lib/clientUpload';
import {
  ArrowLeft,
  Save,
  BookOpen,
  Upload,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function NewBlogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '/images/products/b-1-s/main.png',
    category: 'EV Guide',
    author: 'Baba Marketing Team',
    read_time: '4 min read',
    is_published: true,
    meta_title: '',
    meta_description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') ? slugified : prev.slug,
      meta_title: prev.meta_title === '' ? `${val} | Baba Marketing Blog` : prev.meta_title,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const json = await uploadAdminImage(file, 'blogs');
      setFormData((prev) => ({ ...prev, featured_image: json.url }));
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create blog post');

      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-700" />
            <span>Write New Blog Article</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Publish educational EV guides, news, and maintenance tips for riders
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-crimson-50 border border-crimson-500/40 text-xs text-crimson-600 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-crimson-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Article Info */}
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-brand-200 pb-3">
            Article Title & URL
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Article Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Electric Scooters vs Petrol Scooters: How Much Can You Really Save in 2026?"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">URL Slug *</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-600 font-mono">
              <span>https://babamarketing.in/blog/</span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 bg-transparent text-brand-700 font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              >
                <option value="Cost Savings" className="bg-white text-slate-900">Cost Savings</option>
                <option value="Maintenance & Care" className="bg-white text-slate-900">Maintenance & Care</option>
                <option value="Technology & Safety" className="bg-white text-slate-900">Technology & Safety</option>
                <option value="Commercial & Business" className="bg-white text-slate-900">Commercial & Business</option>
                <option value="EV Guide" className="bg-white text-slate-900">EV Guide</option>
                <option value="Showroom News" className="bg-white text-slate-900">Showroom News</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Reading Time</label>
              <input
                type="text"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>
          </div>
        </div>

        {/* Featured Visual Image */}
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-brand-200 pb-3">
            Featured Visual / Cover Image
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Preview Box */}
            <div className="sm:col-span-4 relative h-40 rounded-xl bg-brand-50 border border-brand-200 overflow-hidden">
              {formData.featured_image ? (
                <Image
                  src={formData.featured_image}
                  alt="Featured Preview"
                  fill
                  sizes="200px"
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No Image</div>
              )}
            </div>

            {/* Inputs & Upload */}
            <div className="sm:col-span-8 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  placeholder="e.g. /images/products/b-1-s/main.png"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Or Upload Image File</label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-100 hover:bg-brand-200 text-slate-900 text-xs font-bold cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5 text-brand-700" />
                  <span>{uploading ? 'Uploading...' : 'Choose File to Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Excerpt & Content */}
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-brand-200 pb-3">
            Article Body Content
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Excerpt / Summary (Appears in article cards and Google search) *
            </label>
            <textarea
              rows={3}
              required
              placeholder="A brief 2 to 3 sentence summary of the article..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-700 leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Full Article Content (Markdown format supported: ## Headings, - Lists, Tables) *
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {formData.content.length} characters
              </span>
            </div>
            <textarea
              rows={14}
              required
              placeholder={`## Introduction\n\nWrite your article paragraphs here...\n\n### Key Benefits\n- Point 1\n- Point 2\n\n### Summary\nConclusion goes here...`}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-4 rounded-xl bg-brand-50 border border-brand-200 text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-brand-700 leading-relaxed"
            />
          </div>
        </div>

        {/* SEO & Publication Status */}
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-brand-200 pb-3">
            SEO & Publication Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Title</label>
              <input
                type="text"
                placeholder="Google Search Title"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Description</label>
              <input
                type="text"
                placeholder="Google Search Description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-slate-900">Publish this article immediately on the website</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/blogs"
            className="px-6 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-slate-700 text-xs font-bold transition-all"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-xs shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing...' : 'Save & Publish Article'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
