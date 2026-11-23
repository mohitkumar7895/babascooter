import React from 'react';
import { query } from '@/lib/db';
import { BlogPost } from '@/types';
import { Sparkles } from 'lucide-react';
import BlogListingClient from './BlogListingClient';

export const revalidate = 0;

export async function generateMetadata() {
  return {
    title: 'EV Blog & Electric Scooter Guides | FRENDO E-SCOOTY Ballabhgarh',
    description:
      'Read latest guides on electric scooter running costs, battery charging tips, safety features, and B2B dealership economics from Baba Marketing Ballabhgarh.',
  };
}

async function getBlogs() {
  try {
    const blogs = await query<BlogPost[]>(
      'SELECT * FROM blogs WHERE is_published = TRUE ORDER BY published_at DESC, id DESC'
    );
    return blogs || [];
  } catch (err) {
    console.error('Error fetching blogs:', err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-12 sm:py-16 selection:bg-brand-800 selection:text-amber-400 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-100 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest shadow-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FRENDO E-SCOOTY Knowledge Hub</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            Electric Mobility <span className="text-gradient-gold">Insights & Guides</span>
          </h1>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Practical advice, LFP battery charging tips, daily fuel savings comparisons, and dealership franchise economics from Baba Marketing, Ballabhgarh.
          </p>
        </div>

        {/* Client Interactive Filter & Search Component */}
        <BlogListingClient initialBlogs={blogs} />
      </div>
    </div>
  );
}
