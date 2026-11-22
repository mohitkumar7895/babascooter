'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface FeaturedScootersProps {
  products: Product[];
  categories: Category[];
  whatsappNumber?: string;
}

export default function FeaturedScooters({ products, categories, whatsappNumber }: FeaturedScootersProps) {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredProducts =
    selectedCat === 'all'
      ? products
      : products.filter(
          (p) =>
            p.category_slug === selectedCat ||
            p.category_id?.toString() === selectedCat ||
            (selectedCat === 'featured' && p.is_featured)
        );

  const displayList = filteredProducts.slice(0, 8);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1.5">
              Available at Ballabhgarh Showroom
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Electric Scooters
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Explore our top-selling models equipped with front disc brakes, digital speedometer, and reverse gear.
            </p>
          </div>

          <Link
            href="/scooters"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <span>Browse All 20 Models</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCat === 'all'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Featured
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat.slug
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/scooters"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow transition-all hover:scale-105 active:scale-95"
          >
            <span>View Full 20 Scooter Lineup</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
