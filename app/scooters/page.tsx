import React from 'react';
import { query } from '@/lib/db';
import { Product, Category, ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import { getCachedContact } from '@/lib/data';
import ScootersCatalogueClient from './ScootersCatalogueClient';

export const revalidate = 60;

export async function generateMetadata() {
  return await getSeoMetadata('/scooters');
}

async function getCatalogueData() {
  try {
    const [contact, categories, products] = await Promise.all([
      getCachedContact(),
      query<Category[]>(
        'SELECT c.*, COUNT(p.id) AS product_count FROM categories c LEFT JOIN products p ON c.id = p.category_id AND p.is_published = TRUE GROUP BY c.id ORDER BY c.sort_order ASC'
      ),
      query<Product[]>(`
      SELECT 
        p.*,
        c.name AS category_name,
        c.slug AS category_slug,
        ps.motor_power,
        ps.battery_voltage,
        ps.controller,
        ps.front_tyre,
        ps.rear_tyre,
        ps.brakes,
        ps.central_locking,
        ps.digital_meter,
        ps.reverse_gear,
        (
          SELECT image_url 
          FROM product_images 
          WHERE product_id = p.id 
          ORDER BY is_primary DESC, sort_order ASC 
          LIMIT 1
        ) AS primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_specifications ps ON p.id = ps.product_id
      WHERE p.is_published = TRUE
      ORDER BY p.sort_order ASC, p.id ASC
    `),
    ]);

    return {
      contact,
      categories: categories || [],
      products: products || [],
    };
  } catch (err) {
    console.error('Error fetching catalogue data:', err);
    return { contact: null, categories: [], products: [] };
  }
}

export default async function ScootersPage() {
  const { contact, categories, products } = await getCatalogueData();

  return (
    <div className="min-h-screen bg-brand-50 py-10 sm:py-14 border-t border-brand-300 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-100 border border-brand-300 text-xs font-bold text-brand-800 uppercase tracking-widest mb-2.5 font-serif">
            FRENDO E-SCOOTY • 27 SHOWROOM SETS
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            EXPLORE ALL 27 ELECTRIC SCOOTY MODELS
          </h1>

          <p className="mt-2 text-slate-700 text-xs sm:text-sm leading-relaxed">
            Electric Scooters Starting <strong className="text-crimson-600">₹11,000/-</strong> • Single Light Models <strong className="text-crimson-600">₹15,000/-</strong> • LFP Battery Starting <strong className="text-brand-800">₹15,000/-</strong> • <strong className="text-brand-800">60 Month Warranty</strong>.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-700">
            <span className="px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200">100% Copper Motor</span>
            <span className="px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200">Central Locking & Remote</span>
            <span className="px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200">5 Colours Available</span>
            <span className="px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200">All-India Dealership Supply</span>
          </div>
        </div>

        {/* Client Interactive Filter & Search Component */}
        <ScootersCatalogueClient
          initialProducts={products}
          categories={categories}
          whatsappNumber={contact?.whatsapp_number || '9953564151'}
        />

      </div>
    </div>
  );
}
