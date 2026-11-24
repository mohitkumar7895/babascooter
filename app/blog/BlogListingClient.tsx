'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface Props {
  initialBlogs: BlogPost[];
}

export default function BlogListingClient({ initialBlogs }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [initialBlogs]);

  const filtered = useMemo(() => {
    return initialBlogs.filter((b) => {
      if (selectedCategory !== 'all' && b.category !== selectedCategory) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = b.title.toLowerCase().includes(q);
        const matchExcerpt = b.excerpt.toLowerCase().includes(q);
        const matchCat = b.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchCat) return false;
      }
      return true;
    });
  }, [initialBlogs, selectedCategory, searchTerm]);

  const featured = filtered[0];
  const list = filtered.slice(1);

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
    <div className="space-y-10">
      {/* Search and Category Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-300 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-brand-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles e.g. LFP Battery, Savings, Disc Brakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-50 border border-brand-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-700 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 hover:text-brand-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Count */}
        <div className="text-xs text-slate-600">
          Showing <span className="font-bold text-brand-800">{filtered.length}</span> articles
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-amber-400 text-brand-950 font-black shadow-glow'
              : 'bg-white text-slate-700 border border-brand-200 hover:border-brand-700 hover:text-brand-800'
          }`}
        >
          All Topics ({initialBlogs.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-400 text-brand-950 font-black shadow-glow'
                : 'bg-white text-slate-700 border border-brand-200 hover:border-brand-700 hover:text-brand-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* If No Blogs Found */}
      {filtered.length === 0 && (
        <div className="p-16 rounded-2xl bg-white border border-brand-300 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-brand-800 mx-auto" />
          <div className="font-serif text-lg font-bold text-slate-900">No articles found</div>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Try a different search term or select another category above.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-400 text-brand-950 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Featured Blog Banner (First Article) */}
      {featured && (
        <div className="rounded-3xl bg-white border border-brand-300 shadow-lg overflow-hidden hover:border-brand-700 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Visual stage */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-brand-300 overflow-hidden">
              <Image
                src={featured.featured_image || '/models/set-1/main.jpg'}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="px-3 py-1 rounded-full bg-brand-100 border border-brand-300 text-brand-800 font-bold uppercase tracking-wider text-[11px]">
                  {featured.category || 'Featured Guide'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  <span>{featured.read_time || '5 min read'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <span>{formatDate(featured.published_at || featured.created_at)}</span>
                </span>
              </div>

              <Link href={`/blog/${featured.slug}`} className="block group">
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-brand-800 transition-colors tracking-tight leading-tight">
                  {featured.title}
                </h2>
              </Link>

              <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <User className="w-3.5 h-3.5 text-brand-800" />
                  <span>{featured.author || 'Baba Marketing Team'}</span>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remaining Blog Articles Grid */}
      {list.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl bg-white border border-brand-300 shadow-xl overflow-hidden hover:border-brand-700 hover:shadow-2xl transition-all flex flex-col group"
            >
              {/* Image */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[16/10] bg-slate-100 border-b border-brand-300 overflow-hidden"
              >
                <Image
                  src={post.featured_image || '/models/set-1/main.jpg'}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-100 border border-brand-300 text-brand-800 font-bold text-[10px] uppercase">
                      {post.category || 'EV Guide'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span>{post.read_time || '4 min read'}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group-hover:text-brand-800 transition-colors">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-600">
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-800 hover:text-brand-700 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Showroom CTA Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-amber-400/25 via-brand-50 to-transparent border border-brand-300 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-xs uppercase font-bold text-brand-800 tracking-wider flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experience FRENDO E-SCOOTY Live in Ballabhgarh</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Want to test ride before making your decision?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-xl">
            Visit our showroom at 33 Futa Road, Kaili, Ballabhgarh. Experience instant pick-up, reverse assist, and front disc braking standard on all 27 models.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/scooters"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all text-center"
          >
            Explore 27 Models
          </Link>
          <a
            href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20read%20your%20EV%20blog%20and%20want%20to%20book%20a%20free%20test%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-100 hover:bg-brand-200 border border-brand-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Book Free Test Ride</span>
          </a>
        </div>
      </div>
    </div>
  );
}
