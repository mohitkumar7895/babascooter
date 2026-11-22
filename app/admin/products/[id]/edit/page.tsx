'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Upload,
  Trash2,
  Star,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { Category, Product, ProductImage } from '@/types';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = params.id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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
    motor_power: '',
    battery_voltage: '',
    controller: '',
    front_tyre: '',
    rear_tyre: '',
    brakes: '',
    central_locking: 'Yes',
    digital_meter: 'Yes',
    reverse_gear: 'Yes',
  });

  const loadProduct = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        fetch(`/api/products/${productId}`),
        fetch('/api/categories'),
      ]);

      const pData = await pRes.json();
      const cData = await cRes.json();

      if (cData.categories) setCategories(cData.categories);

      if (pData.product) {
        const p = pData.product;
        setProduct(p);
        setImages(p.images || []);

        const specs = p.specifications || {};
        setFormData({
          name: p.name || '',
          model_number: p.model_number || '',
          slug: p.slug || '',
          category_id: p.category_id ? String(p.category_id) : '',
          short_description: p.short_description || '',
          detailed_description: p.detailed_description || '',
          price: p.price ? String(p.price) : '',
          price_label: p.price_label || 'Contact for Best Price',
          availability: p.availability || 'In Stock',
          is_featured: Boolean(p.is_featured),
          is_published: Boolean(p.is_published),
          motor_power: specs.motor_power || '',
          battery_voltage: specs.battery_voltage || '',
          controller: specs.controller || '',
          front_tyre: specs.front_tyre || '',
          rear_tyre: specs.rear_tyre || '',
          brakes: specs.brakes || '',
          central_locking: specs.central_locking || 'Yes',
          digital_meter: specs.digital_meter || 'Yes',
          reverse_gear: specs.reverse_gear || 'Yes',
        });
      }
    } catch (err: any) {
      setError(err.message || 'Error loading product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        name: formData.name,
        model_number: formData.model_number,
        slug: formData.slug,
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
      };

      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');

      setSuccess('Scooter information and specifications updated successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Error saving scooter');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const body = new FormData();
    body.append('file', file);
    body.append('folder', 'products');

    try {
      // 1. Upload file
      const upRes = await fetch('/api/uploads', {
        method: 'POST',
        body,
      });
      const upData = await upRes.json();
      if (!upRes.ok) throw new Error(upData.error || 'Upload failed');

      // 2. Attach image to product
      const addRes = await fetch(`/api/products/${productId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: upData.url,
          alt_text: `${formData.name} gallery image`,
          is_primary: images.length === 0,
          sort_order: images.length + 1,
        }),
      });

      if (!addRes.ok) throw new Error('Failed to attach image to product');

      setSuccess('Image uploaded and added to gallery successfully!');
      setTimeout(() => setSuccess(''), 3000);
      loadProduct();
    } catch (err: any) {
      setError(err.message || 'Image upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSetPrimary = async (imgId: number) => {
    try {
      const res = await fetch(`/api/products/${productId}/images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId: imgId, is_primary: true }),
      });
      if (res.ok) {
        setImages((prev) =>
          prev.map((img) => ({
            ...img,
            is_primary: img.id === imgId,
          }))
        );
      }
    } catch (err) {
      console.error('Error setting primary image:', err);
    }
  };

  const handleDeleteImage = async (imgId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/products/${productId}/images?imageId=${imgId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== imgId));
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Loading scooter editor...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Edit {formData.name || 'Scooter Model'}
            </h1>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              SLUG: /scooters/{formData.slug}
            </div>
          </div>
        </div>

        {formData.slug && (
          <Link
            href={`/scooters/${formData.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-electric-400 flex items-center gap-1.5"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
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

      {/* Product Image Gallery Management Section */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Product Image Gallery</h2>
            <p className="text-xs text-slate-400">
              Manage multi-angle photos (Minimum 4–5 images recommended: Studio, Poster, Cockpit, Wheels).
            </p>
          </div>

          <label className="cursor-pointer px-4 py-2 rounded-xl bg-electric-500 text-navy-950 font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-1.5">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative rounded-xl overflow-hidden bg-navy-950 border-2 p-2 flex flex-col items-center justify-between group ${
                img.is_primary ? 'border-electric-500 shadow-glow' : 'border-white/10'
              }`}
            >
              {img.is_primary && (
                <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-electric-500 text-navy-950 text-[10px] font-black">
                  PRIMARY
                </span>
              )}

              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-950">
                <Image
                  src={img.image_url}
                  alt={img.alt_text || 'Scooter image'}
                  fill
                  sizes="180px"
                  className="object-cover object-center"
                />
              </div>

              <div className="w-full pt-2 flex items-center justify-between gap-1 border-t border-white/5 text-[10px]">
                {!img.is_primary ? (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    className="text-slate-400 hover:text-electric-400 font-bold flex items-center gap-1"
                  >
                    <Star className="w-3 h-3" />
                    <span>Set Primary</span>
                  </button>
                ) : (
                  <span className="text-electric-400 font-bold">Main Cover</span>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Details and Specifications Form */}
      <form onSubmit={handleSaveProduct} className="space-y-8">
        {/* General Model Information */}
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model Number / Code *</label>
              <input
                type="text"
                required
                value={formData.model_number}
                onChange={(e) => setFormData({ ...formData, model_number: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
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
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Detailed Description</label>
            <textarea
              rows={4}
              value={formData.detailed_description}
              onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Price (Optional)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-500"
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

        {/* Technical Specifications */}
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

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-electric-500 text-navy-950 font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Product Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
