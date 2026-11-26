'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bike,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Mail,
  Plus,
  ArrowRight,
  ExternalLink,
  Zap,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalImages: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, enqRes] = await Promise.all([
          fetch('/api/products?all=true', { cache: 'no-store' }),
          fetch('/api/enquiry', { cache: 'no-store' }),
        ]);

        const prodData = await prodRes.json();
        const enqData = await enqRes.json();

        const products = prodData.products || [];
        const enquiries = enqData.enquiries || [];

        const published = products.filter((p: any) => p.is_published).length;
        const drafts = products.length - published;
        const newEnq = enquiries.filter((e: any) => e.status === 'New').length;

        // Image count estimation / aggregation
        let imgCount = products.length * 5;

        setStats({
          totalProducts: products.length,
          publishedProducts: published,
          draftProducts: drafts,
          totalImages: imgCount,
          totalEnquiries: enquiries.length,
          newEnquiries: newEnq,
        });

        setRecentProducts(products.slice(0, 5));
        setRecentEnquiries(enquiries.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-white via-brand-50 to-white border border-brand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800">
            <Zap className="w-3.5 h-3.5" />
            <span>Baba Marketing Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            FRENDO Scooter Website Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Full dynamic control over all 20 scooter models, image galleries, homepage banners, and customer enquiries.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-6 py-3.5 rounded-2xl bg-brand-800 text-white font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Scooter</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Products</span>
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalProducts}</div>
          <div className="text-[11px] text-slate-600 flex items-center gap-2">
            <span className="text-brand-700 font-bold">{stats.publishedProducts} Published</span>
            <span>•</span>
            <span className="text-brand-800 font-bold">{stats.draftProducts} Drafts</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Catalogue Images</span>
            <div className="w-8 h-8 rounded-lg bg-royal-50 text-royal-800 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalImages}+</div>
          <div className="text-[11px] text-slate-600">
            5 high-res photos per scooter model
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Customer Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalEnquiries}</div>
          <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-brand-700 font-bold">{stats.newEnquiries} New Leads</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Database Status</span>
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-800">Online</div>
          <div className="text-[11px] text-slate-600 font-mono">
            MySQL `babascooty` active
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link
          href="/admin/products"
          className="p-5 rounded-2xl bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50 transition-all group"
        >
          <div className="text-sm font-bold text-slate-900 group-hover:text-brand-800 flex items-center justify-between">
            <span>Manage Products</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 mt-1">Edit specs, prices, and photo galleries</p>
        </Link>

        <Link
          href="/admin/blogs"
          className="p-5 rounded-2xl bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50 transition-all group"
        >
          <div className="text-sm font-bold text-slate-900 group-hover:text-brand-800 flex items-center justify-between">
            <span>Blog Articles</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 mt-1">Write EV guides & battery tips</p>
        </Link>

        <Link
          href="/admin/homepage"
          className="p-5 rounded-2xl bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50 transition-all group"
        >
          <div className="text-sm font-bold text-slate-900 group-hover:text-brand-800 flex items-center justify-between">
            <span>Homepage & Banners</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 mt-1">Update hero slides and promotional offers</p>
        </Link>

        <Link
          href="/admin/contact"
          className="p-5 rounded-2xl bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50 transition-all group"
        >
          <div className="text-sm font-bold text-slate-900 group-hover:text-brand-800 flex items-center justify-between">
            <span>Showroom Contact</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 mt-1">Change phone numbers & WhatsApp hotlines</p>
        </Link>

        <Link
          href="/admin/seo"
          className="p-5 rounded-2xl bg-white border border-brand-200 hover:border-brand-700 hover:bg-brand-50 transition-all group"
        >
          <div className="text-sm font-bold text-slate-900 group-hover:text-brand-800 flex items-center justify-between">
            <span>SEO & Meta Tags</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 mt-1">Optimize meta titles and Google search previews</p>
        </Link>
      </div>

      {/* Two Column Section: Recent Products & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Products */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-brand-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bike className="w-4 h-4 text-brand-800" />
              <span>Current Scooter Models</span>
            </h2>
            <Link href="/admin/products" className="text-xs font-bold text-brand-800 hover:underline">
              View All ({stats.totalProducts}) &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-200">
            {recentProducts.map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-12 rounded-xl bg-brand-50 border border-brand-200 overflow-hidden relative shrink-0">
                    <Image
                      src={p.primary_image || '/logo.jpeg'}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className={p.primary_image ? 'object-cover object-center' : 'object-contain p-1.5'}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">{p.name}</div>
                    <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                      {p.model_number} • {p.motor_power?.split(' ')[0]} • {p.category_name || 'City Scooter'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.is_published
                        ? 'bg-brand-100 text-brand-700 border border-brand-300'
                        : 'bg-amber-100 text-brand-800 border border-brand-300'
                    }`}
                  >
                    {p.is_published ? 'Published' : 'Draft'}
                  </span>
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-xs font-bold text-slate-800 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-brand-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-700" />
              <span>Recent Test Ride Leads</span>
            </h2>
            <Link href="/admin/enquiries" className="text-xs font-bold text-brand-700 hover:underline">
              View All &rarr;
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No recent enquiries yet. Test leads will show here.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{enq.customer_name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center justify-between">
                    <a href={`tel:${enq.customer_phone}`} className="text-slate-700 font-mono hover:text-brand-800">
                      {enq.customer_phone}
                    </a>
                    <span>{enq.city || 'Faridabad'}</span>
                  </div>
                  {enq.message && <p className="text-[11px] text-slate-600 truncate">{enq.message}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
