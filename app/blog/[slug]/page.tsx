import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { query } from '@/lib/db';
import { BlogPost } from '@/types';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  MessageCircle,
  Phone,
  ChevronRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface Props {
  params: { slug: string };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props) {
  try {
    const rows = await query<any[]>(
      'SELECT title, excerpt, meta_title, meta_description, featured_image FROM blogs WHERE slug = ? LIMIT 1',
      [params.slug]
    );
    if (rows && rows.length > 0) {
      const b = rows[0];
      return {
        title: b.meta_title || `${b.title} | FRENDO E-SCOOTY Blog`,
        description: b.meta_description || b.excerpt,
        openGraph: {
          title: b.title,
          description: b.excerpt,
          images: b.featured_image ? [b.featured_image] : ['/models/set-1/main.jpg'],
        },
      };
    }
  } catch {}
  return {
    title: 'EV Blog & Guide | FRENDO E-SCOOTY Baba Marketing',
    description: 'Electric Scooter dealership insights, battery care, and maintenance guides.',
  };
}

async function getBlogData(slug: string) {
  try {
    const rows = await query<BlogPost[]>(
      'SELECT * FROM blogs WHERE slug = ? AND is_published = TRUE LIMIT 1',
      [slug]
    );
    if (!rows || rows.length === 0) return null;
    const blog = rows[0];

    // Fetch related articles
    const related = await query<BlogPost[]>(
      'SELECT * FROM blogs WHERE id != ? AND is_published = TRUE ORDER BY (category = ?) DESC, published_at DESC LIMIT 3',
      [blog.id, blog.category]
    );

    // Increment view count asynchronously
    query('UPDATE blogs SET views = views + 1 WHERE id = ?', [blog.id]).catch(() => {});

    return { blog, related: related || [] };
  } catch (err) {
    console.error('Error fetching blog data:', err);
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getBlogData(params.slug);
  if (!data) {
    notFound();
  }

  const { blog, related } = data;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const shareText = `Check out this EV guide: ${blog.title}`;

  // Schema.org Article structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featured_image || 'https://www.frendo.in/models/set-1/main.jpg',
    datePublished: blog.published_at || blog.created_at,
    author: {
      '@type': 'Organization',
      name: blog.author || 'Baba Marketing',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Baba Marketing - FRENDO E-SCOOTY',
      url: 'https://www.frendo.in',
    },
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white py-10 sm:py-14 relative overflow-hidden selection:bg-amber-500 selection:text-navy-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/blog" className="hover:text-amber-400 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-300 font-bold truncate max-w-xs">{blog.title}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest shadow-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{blog.category || 'EV Guide'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-b border-white/10 pb-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <User className="w-4 h-4 text-amber-400" />
              <span>{blog.author || 'Baba Marketing Team'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{formatDate(blog.published_at || blog.created_at)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{blog.read_time || '5 min read'}</span>
            </span>
          </div>
        </header>

        {/* Featured Visual Image */}
        {blog.featured_image && (
          <div className="relative aspect-[16/9] w-full rounded-3xl bg-black border border-amber-500/30 shadow-2xl overflow-hidden mb-10">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Excerpt Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-navy-900/90 border-l-4 border-amber-500 border border-white/10 text-amber-200 text-sm sm:text-base font-medium leading-relaxed mb-8 shadow-xl">
          {blog.excerpt}
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-6">
          {blog.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();

            // Headings
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={index} className="font-serif text-xl sm:text-2xl font-bold text-gradient-gold mt-8 mb-3">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={index} className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 pb-2 border-b border-white/10">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            // Bullet lists
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').filter(Boolean);
              return (
                <ul key={index} className="space-y-2 pl-4 list-disc marker:text-amber-400">
                  {items.map((it, idx) => (
                    <li key={idx} className="text-slate-300 leading-relaxed">
                      {it.replace(/^[-*]\s+/, '')}
                    </li>
                  ))}
                </ul>
              );
            }

            // Numbered lists
            if (/^\d+\.\s/.test(trimmed)) {
              const items = trimmed.split('\n').filter(Boolean);
              return (
                <ol key={index} className="space-y-3 pl-4 list-decimal marker:font-bold marker:text-amber-400">
                  {items.map((it, idx) => (
                    <li key={idx} className="text-slate-300 leading-relaxed">
                      {it.replace(/^\d+\.\s+/, '')}
                    </li>
                  ))}
                </ol>
              );
            }

            // Simple Markdown Table support
            if (trimmed.includes('|') && trimmed.includes('\n')) {
              const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
              if (rows.length >= 2) {
                const headerCols = rows[0].split('|').map((c) => c.trim()).filter(Boolean);
                const dataRows = rows.slice(2);
                return (
                  <div key={index} className="my-6 overflow-x-auto rounded-2xl border border-amber-500/20 shadow-xl bg-navy-900/60">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-navy-900 text-amber-300 font-bold border-b border-amber-500/20">
                        <tr>
                          {headerCols.map((col, idx) => (
                            <th key={idx} className="p-3">
                              {col.replace(/\*\*/g, '')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-navy-950/40">
                        {dataRows.map((dRow, rIdx) => {
                          const cols = dRow.split('|').map((c) => c.trim()).filter(Boolean);
                          return (
                            <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                              {cols.map((col, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-300">
                                  {col.replace(/\*\*/g, '')}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }

            // Normal paragraphs
            return (
              <p key={index} className="text-slate-300 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* Share & WhatsApp Call-to-action */}
        <div className="mt-12 p-6 rounded-2xl bg-navy-900/80 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase text-amber-400">Found this article helpful?</div>
            <div className="font-serif text-base font-bold text-white">Share with family & colleagues</div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${shareText} https://www.frendo.in/blog/${blog.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            <Link
              href="/scooters"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore 27 Models</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Author / Showroom Guarantee Card */}
        <div className="mt-8 p-6 rounded-2xl bg-navy-900 border border-amber-500/20 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-navy-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-glow">
            BM
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3 h-3" />
              <span>Showroom & Dealership</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">BABA MARKETING – FRENDO E-SCOOTY Ballabhgarh</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Authorized showroom and service dealership at 33 Futa Road, Kaili, Ballabhgarh. Offering 27 EV models with starting price ₹15,000/- (All Taxes Included), 5-Year Warranty, and all-India dealership opportunities.
            </p>
          </div>
          <a
            href="https://wa.me/919953564151?text=Hello%20Baba%20Marketing%2C%20I%20read%20your%20article%20and%20want%20to%20book%20a%20test%20ride."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-navy-950 font-black text-xs uppercase tracking-wider shadow-glow hover:bg-amber-400 shrink-0 text-center transition-all"
          >
            Book Free Test Ride
          </a>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-white">Related EV Articles</h2>
              <Link href="/blog" className="text-xs font-bold text-amber-400 hover:text-amber-300">
                View All Guides &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="rounded-2xl bg-navy-900/60 border border-amber-500/20 p-5 shadow-lg hover:border-amber-500/50 hover:shadow-2xl transition-all flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      {rel.category || 'EV Guide'}
                    </span>
                    <h3 className="font-serif font-bold text-white text-sm group-hover:text-amber-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
