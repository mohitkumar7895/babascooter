'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Filter,
  RefreshCw,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface UploadedImage {
  url: string;
  filename: string;
  folder: string;
  size: number;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [targetFolder, setTargetFolder] = useState<string>('products');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/uploads');
      const data = await res.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      let uploadCount = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const body = new FormData();
        body.append('file', file);
        body.append('folder', targetFolder);

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body,
        });

        if (res.ok) {
          uploadCount++;
        }
      }

      setSuccess(`Successfully uploaded ${uploadCount} image(s) to "${targetFolder}" folder!`);
      setTimeout(() => setSuccess(''), 4000);
      await loadImages();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (url: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"? Any page using this URL may lose its image.`)) {
      return;
    }

    try {
      const res = await fetch('/api/uploads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.url !== url));
        setSuccess(`Deleted "${filename}" successfully.`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete image');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return '';
    try {
      return new Date(isoStr).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const folders = ['all', 'products', 'banners', 'blogs', 'gallery'];

  const filteredImages = images.filter((img) => {
    if (activeFolder === 'all') return true;
    return img.folder === activeFolder;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-brand-800" />
            <span>Media & Image Manager</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Upload images from your phone or PC, view public URLs, and use them in products, hero banners, or blogs.
          </p>
        </div>

        <button
          onClick={loadImages}
          className="px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-800' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-crimson-50 border border-crimson-500/40 text-xs text-crimson-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-crimson-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-brand-100 border border-brand-300 text-xs text-brand-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Upload Zone Card */}
      <div className="p-6 rounded-2xl bg-white border border-brand-300 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-serif">
          <Upload className="w-4 h-4 text-brand-800" />
          <span>Upload New Photos / Images</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Folder / Purpose</label>
            <select
              value={targetFolder}
              onChange={(e) => setTargetFolder(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
            >
              <option value="products" className="bg-white text-slate-900">Scooters & Products (/uploads/products/)</option>
              <option value="banners" className="bg-white text-slate-900">Homepage Banners (/uploads/banners/)</option>
              <option value="blogs" className="bg-white text-slate-900">Blog Post Covers (/uploads/blogs/)</option>
              <option value="gallery" className="bg-white text-slate-900">General Gallery (/uploads/gallery/)</option>
            </select>
          </div>

          <div className="sm:col-span-8">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Images from Device</label>
            <label className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-brand-300 hover:border-brand-700 bg-brand-50 hover:bg-brand-100 cursor-pointer transition-all text-xs font-semibold text-slate-800">
              <Upload className={`w-4 h-4 text-brand-800 ${uploading ? 'animate-bounce' : ''}`} />
              <span>
                {uploading
                  ? 'Uploading images to server, please wait...'
                  : 'Click or Drag images here to upload (JPG, PNG, WEBP)'}
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Image Gallery View */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-brand-200 pb-3">
          {/* Folder Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
            {folders.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFolder(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeFolder === f
                    ? 'bg-amber-400 text-brand-950 font-black shadow-glow'
                    : 'bg-brand-50 text-slate-700 hover:bg-brand-100'
                }`}
              >
                {f === 'all' ? 'All Images' : f}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-600">
            Total Images: <strong className="text-slate-900">{filteredImages.length}</strong>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-600 text-xs">Loading media files...</div>
        ) : filteredImages.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white border border-brand-200 space-y-2">
            <FolderOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No images uploaded in this folder yet</div>
            <div className="text-xs text-slate-500">Use the upload box above to add your first photo.</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map((img) => {
              const isCopied = copiedUrl === img.url;
              return (
                <div
                  key={img.url}
                  className="rounded-2xl bg-white border border-brand-200 hover:border-brand-700 overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] w-full bg-brand-50 overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.filename}
                      fill
                      sizes="200px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Folder Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/80 backdrop-blur-sm text-amber-400 border border-brand-300">
                      {img.folder}
                    </div>

                    {/* View Full Button */}
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-white hover:text-brand-700 transition-colors opacity-0 group-hover:opacity-100"
                      title="Open full image"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Info & Actions */}
                  <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 truncate" title={img.filename}>
                        {img.filename}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1 font-mono">
                        <span>{formatSize(img.size)}</span>
                        <span>{formatDate(img.createdAt)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-brand-200 flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(img.url)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                          isCopied
                            ? 'bg-brand-800 text-white'
                            : 'bg-brand-50 hover:bg-brand-100 text-slate-800'
                        }`}
                        title="Copy image URL"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-brand-800" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(img.url, img.filename)}
                        className="p-1.5 rounded-lg bg-crimson-50 hover:bg-red-500 text-crimson-600 hover:text-white transition-colors"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
