'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Trash2,
  ExternalLink,
  BookOpen,
  Upload,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { BlogPost } from '@/types';

interface Props {
  params: { id: string };
}

export default function EditBlogPage({ params }: Props) {
  const router = useRouter();
  const blogId = params.id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: 'EV Guide',
    author: 'Baba Marketing Team',
    read_time: '4 min read',
    is_published: true,
    meta_title: '',
    meta_description: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${blogId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load article');
        return res.json();
      })
      .then((data) => {
        if (data.blog) {
          const b: BlogPost = data.blog;
          setFormData({
            title: b.title || '',
            slug: b.slug || '',
            excerpt: b.excerpt || '',
            content: b.content || '',
            featured_image: b.featured_image || '',
            category: b.category || 'EV Guide',
            author: b.author || 'Baba Marketing Team',
            read_time: b.read_time || '4 min read',
            is_published: Boolean(b.is_published),
            meta_title: b.meta_title || '',
            meta_description: b.meta_description || '',
          });
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [blogId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      setFormData((prev) => ({ ...prev, featured_image: json.url }));
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update article');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article permanently?')) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${blogId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/blogs');
      }
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading article details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Back button & Action buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <div className="flex items-center gap-2">
          {formData.is_published && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span>Edit Blog Article</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            /blog/{formData.slug}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-300 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Article updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Article Info */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            Article Title & URL
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Article Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">URL Slug *</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 font-mono">
              <span>https://babamarketing.in/blog/</span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 bg-transparent text-emerald-400 font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Cost Savings" className="bg-navy-950">Cost Savings</option>
                <option value="Maintenance & Care" className="bg-navy-950">Maintenance & Care</option>
                <option value="Technology & Safety" className="bg-navy-950">Technology & Safety</option>
                <option value="Commercial & Business" className="bg-navy-950">Commercial & Business</option>
                <option value="EV Guide" className="bg-navy-950">EV Guide</option>
                <option value="Showroom News" className="bg-navy-950">Showroom News</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reading Time</label>
              <input
                type="text"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Featured Visual Image */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            Featured Visual / Cover Image
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Preview Box */}
            <div className="sm:col-span-4 relative h-40 rounded-xl bg-slate-950 border border-white/10 overflow-hidden">
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Or Upload New Image</label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
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
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            Article Body Content
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Excerpt / Summary *
            </label>
            <textarea
              rows={3}
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Full Article Content (Markdown format supported: ## Headings, - Lists, Tables) *
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {formData.content.length} characters
              </span>
            </div>
            <textarea
              rows={16}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* SEO & Publication Status */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            SEO & Publication Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meta Description</label>
              <input
                type="text"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-white">Publish this article on the website</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/blogs"
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-black text-xs shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
