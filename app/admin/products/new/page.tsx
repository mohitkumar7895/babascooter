'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Category } from '@/types';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    model_number: '',
    slug: '',
    category_id: '',
    short_description: '',
    detailed_description: '',
    price: '',
    price_label: 'Contact for Best Price',
    availability: 'In Stock',
    is_featured: false,
    is_published: true,
    // Specifications
    motor_power: '1000W BLDC Hub Motor',
    battery_voltage: '48V / 60V Advanced EV Battery',
    controller: '48V/60V Intelligent Vector Controller',
    front_tyre: '12-Inch Tubeless Tyre',
    rear_tyre: '10-Inch Tubeless Tyre',
    brakes: 'Front Disc / Rear Drum Brakes',
    central_locking: 'Yes (Keyless + Anti-theft Alarm)',
    digital_meter: 'Yes (Digital Color LCD Console)',
    reverse_gear: 'Yes (Smart Parking Assist)',
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(console.error);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const body = new FormData();
    body.append('file', file);
    body.append('folder', 'products');

    try {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setUploadedImageUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        model_number: formData.model_number,
        slug: formData.slug || undefined,
        category_id: formData.category_id ? Number(formData.category_id) : null,
        short_description: formData.short_description,
        detailed_description: formData.detailed_description,
        price: formData.price ? Number(formData.price) : null,
        price_label: formData.price_label,
        availability: formData.availability,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        specifications: {
          motor_power: formData.motor_power,
          battery_voltage: formData.battery_voltage,
          controller: formData.controller,
          front_tyre: formData.front_tyre,
          rear_tyre: formData.rear_tyre,
          brakes: formData.brakes,
          central_locking: formData.central_locking,
          digital_meter: formData.digital_meter,
          reverse_gear: formData.reverse_gear,
        },
        images: uploadedImageUrl
          ? [{ image_url: uploadedImageUrl, is_primary: true, alt_text: formData.name }]
          : [],
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create product');

      setSuccess('Scooter created successfully! Redirecting...');
      setTimeout(() => {
        router.push(`/admin/products/${data.id}/edit`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Error creating scooter model');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Add New Scooter Model</h1>
          <p className="text-xs text-slate-400">Create a new model slot with custom specifications and images</p>
        </div>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            General Model Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. FRENDO B-21 Turbo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model Number / Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. B-21 T"
                value={formData.model_number}
                onChange={(e) => setFormData({ ...formData, model_number: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">URL Slug (Optional)</label>
              <input
                type="text"
                placeholder="e.g. b-21-turbo (auto-generated if empty)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              >
                <option value="" className="bg-navy-900">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-navy-900">{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Short Description</label>
            <input
              type="text"
              placeholder="Brief 1-2 sentence overview for catalogue cards"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Detailed Description</label>
            <textarea
              rows={4}
              placeholder="Full showroom description, ergonomics, battery capability..."
              value={formData.detailed_description}
              onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Showroom Price (Optional)</label>
              <input
                type="number"
                placeholder="e.g. 65000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Price Label</label>
              <input
                type="text"
                value={formData.price_label}
                onChange={(e) => setFormData({ ...formData, price_label: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              >
                <option value="In Stock" className="bg-navy-900">In Stock</option>
                <option value="Available on Order" className="bg-navy-900">Available on Order</option>
                <option value="Coming Soon" className="bg-navy-900">Coming Soon</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded bg-white/5 border-white/20 text-electric-500 focus:ring-0"
              />
              <span>Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="rounded bg-white/5 border-white/20 text-electric-500 focus:ring-0"
              />
              <span>Published (Visible on Website)</span>
            </label>
          </div>
        </div>

        {/* Specifications */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Motor Power</label>
              <input
                type="text"
                value={formData.motor_power}
                onChange={(e) => setFormData({ ...formData, motor_power: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Battery Voltage</label>
              <input
                type="text"
                value={formData.battery_voltage}
                onChange={(e) => setFormData({ ...formData, battery_voltage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Controller</label>
              <input
                type="text"
                value={formData.controller}
                onChange={(e) => setFormData({ ...formData, controller: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Front Tyre</label>
              <input
                type="text"
                value={formData.front_tyre}
                onChange={(e) => setFormData({ ...formData, front_tyre: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Rear Tyre</label>
              <input
                type="text"
                value={formData.rear_tyre}
                onChange={(e) => setFormData({ ...formData, rear_tyre: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Brakes</label>
              <input
                type="text"
                value={formData.brakes}
                onChange={(e) => setFormData({ ...formData, brakes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Central Locking</label>
              <input
                type="text"
                value={formData.central_locking}
                onChange={(e) => setFormData({ ...formData, central_locking: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Digital Meter</label>
              <input
                type="text"
                value={formData.digital_meter}
                onChange={(e) => setFormData({ ...formData, digital_meter: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reverse Gear</label>
              <input
                type="text"
                value={formData.reverse_gear}
                onChange={(e) => setFormData({ ...formData, reverse_gear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>
          </div>
        </div>

        {/* Primary Image Upload */}
        <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">
            Primary Scooter Image
          </h2>

          <div className="flex items-center gap-4">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4 text-electric-400" />
              <span>{uploading ? 'Uploading...' : 'Choose Image File'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {uploadedImageUrl && (
              <span className="text-xs text-emerald-400 font-mono">Image uploaded: {uploadedImageUrl}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-electric-500 text-navy-950 font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Creating Scooter...' : 'Save & Continue to Gallery'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
