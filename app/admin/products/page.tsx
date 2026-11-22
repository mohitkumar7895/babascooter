'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Zap,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true');
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleTogglePublish = async (product: Product) => {
    try {
      const newStatus = !product.is_published;
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, is_published: newStatus } : p))
        );
        setActionMessage(`Updated ${product.name} to ${newStatus ? 'Published' : 'Draft'}`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setActionMessage(`Deleted "${name}" successfully.`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const filtered = products.filter((p) => {
    if (filterCategory !== 'all') {
      if (p.category_slug !== filterCategory && p.category_id?.toString() !== filterCategory) return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.model_number.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Product & Model Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage specifications, images, pricing, and visibility for all 20+ FRENDO models.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 rounded-xl bg-electric-500 text-navy-950 font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Scooter</span>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Search and Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-navy-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search model name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
          />
        </div>

        <div className="text-xs text-slate-400">
          Total: <span className="font-bold text-white">{filtered.length}</span> models
        </div>
      </div>

      {/* Table of Products */}
      <div className="rounded-2xl bg-navy-900 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Scooter</th>
                <th className="py-3.5 px-4">Model Code</th>
                <th className="py-3.5 px-4">Specs (Motor / Tyre)</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-12 rounded-xl bg-slate-950 border border-white/10 relative shrink-0 overflow-hidden">
                        <Image
                          src={p.primary_image || `/images/products/${p.slug}/main.png`}
                          alt={p.name}
                          fill
                          sizes="56px"
                          className="object-cover object-center"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">/scooters/{p.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-slate-300">
                    {p.model_number}
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    <div>{(p as any).motor_power?.split(' ')[0] || '1000W / 1500W'}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {(p as any).front_tyre || '12" Tyre'} / {(p as any).rear_tyre || '10" Tyre'}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-400">
                    {p.category_name || 'City Scooter'}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(p)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        p.is_published
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-500/40 hover:bg-amber-900'
                      }`}
                    >
                      {p.is_published ? (
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

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/scooters/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-1.5 rounded-lg bg-electric-500/10 hover:bg-electric-500 text-electric-400 hover:text-navy-950 transition-colors"
                        title="Edit Scooter"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                        title="Delete Scooter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
