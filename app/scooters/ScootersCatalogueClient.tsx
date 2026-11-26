'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/types';
import { Search, SlidersHorizontal, Zap } from 'lucide-react';

interface Props {
  initialProducts: Product[];
  categories: Category[];
  whatsappNumber?: string;
}

export default function ScootersCatalogueClient({ initialProducts, categories, whatsappNumber }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'featured'>('default');

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (p.category_slug !== selectedCategory && p.category_id?.toString() !== selectedCategory) {
            return false;
          }
        }

        // Search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(term);
          const matchModel = p.model_number.toLowerCase().includes(term);
          const matchDesc = p.short_description?.toLowerCase().includes(term);
          if (!matchName && !matchModel && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'featured') return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
        return b.id - a.id;
      });
  }, [initialProducts, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and Sort Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by model e.g. FR-B1, Sport, Loader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-brand-700 transition-colors"
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

        {/* Sort and Count */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="text-xs text-slate-600">
            Showing <span className="font-bold text-brand-800">{filteredProducts.length}</span> of {initialProducts.length} models
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-800 focus:outline-none focus:border-brand-700"
            >
              <option value="default" className="bg-white text-slate-900">Catalogue Order</option>
              <option value="featured" className="bg-white text-slate-900">Popular First</option>
              <option value="name" className="bg-white text-slate-900">Model Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-amber-400 text-brand-950 font-black shadow-glow'
              : 'bg-white text-slate-700 border border-brand-200 hover:border-brand-700'
          }`}
        >
          All Models ({initialProducts.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === c.slug
                ? 'bg-amber-400 text-brand-950 font-black shadow-glow'
                : 'bg-white text-slate-700 border border-brand-200 hover:border-brand-700'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 rounded-3xl bg-white border border-brand-200 text-center space-y-3">
          <Zap className="w-10 h-10 text-brand-800 mx-auto" />
          <div className="font-serif text-lg font-bold text-slate-900">No scooter models found</div>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Try adjusting your search query or select another category above.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-brand-950 text-xs font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
}
