'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  BookOpen,
  Calendar,
  Clock,
  User,
  Check,
  AlertCircle,
} from 'lucide-react';
import { BlogPost } from '@/types';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const loadBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?all=true');
      const data = await res.json();
      if (data.blogs) setBlogs(data.blogs);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleTogglePublish = async (blog: BlogPost) => {
    try {
      const newStatus = !blog.is_published;
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus, title: blog.title }),
      });

      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, is_published: newStatus } : b))
        );
        setActionMessage(`Updated "${blog.title.slice(0, 30)}..." to ${newStatus ? 'Published' : 'Draft'}`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error toggling publish status:', err);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete article "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setActionMessage('Article deleted successfully');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));

  const filtered = blogs.filter((b) => {
    if (filterCategory !== 'all' && b.category !== filterCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        b.title.toLowerCase().includes(term) ||
        b.excerpt.toLowerCase().includes(term) ||
        b.slug.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-700" />
            <span>Blog Articles & Guides</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage educational EV guides, battery maintenance tips, and showroom announcements
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs shadow-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Notification Toast */}
      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-brand-100 border border-brand-300 text-xs text-brand-700 flex items-center gap-2">
          <Check className="w-4 h-4 text-brand-700 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, excerpt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-700"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-700 focus:outline-none focus:border-brand-700"
          >
            <option value="all" className="bg-white text-slate-900">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-white text-slate-900">
                {c}
              </option>
            ))}
          </select>

          <div className="text-xs text-slate-600 whitespace-nowrap">
            Total: <span className="font-bold text-slate-900">{filtered.length}</span> articles
          </div>
        </div>
      </div>

      {/* Table of Articles */}
      <div className="rounded-2xl bg-white border border-brand-200 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-brand-200">
              <tr>
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-600">
                    Loading articles...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-600">
                    No articles found. Click "Write New Article" above to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-brand-50 transition-colors">
                    {/* Article title & thumbnail */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 max-w-sm">
                        <div className="w-14 h-12 rounded-xl bg-brand-50 border border-brand-200 relative shrink-0 overflow-hidden">
                          <Image
                            src={b.featured_image || '/images/products/b-1-s/main.png'}
                            alt={b.title}
                            fill
                            sizes="56px"
                            className="object-cover object-center"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm line-clamp-1">{b.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">/blog/{b.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 font-semibold text-[10px]">
                        {b.category || 'EV Guide'}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                      {b.author || 'Admin'}
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 text-slate-700 font-mono">
                      {b.views || 0}
                    </td>

                    {/* Published Date */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {formatDate(b.published_at || b.created_at)}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(b)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          b.is_published
                            ? 'bg-brand-100 border border-brand-300 text-brand-700'
                            : 'bg-slate-100 border border-slate-300 text-slate-600'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {b.is_published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.is_published && (
                          <Link
                            href={`/blog/${b.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-slate-600 hover:text-brand-800 transition-colors"
                            title="View live article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        <Link
                          href={`/admin/blogs/${b.id}/edit`}
                          className="p-1.5 rounded-lg bg-brand-100 hover:bg-brand-200 text-brand-700 transition-colors"
                          title="Edit article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="p-1.5 rounded-lg bg-crimson-50 hover:bg-crimson-100 text-crimson-600 transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
