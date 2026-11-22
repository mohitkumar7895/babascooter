import React from 'react';
import { query } from '@/lib/db';
import { Product, Category, ContactSettings } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import ScootersCatalogueClient from './ScootersCatalogueClient';

export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata('/scooters');
}

async function getCatalogueData() {
  try {
    const contactRows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    const contact = contactRows[0] || null;

    const categories = await query<Category[]>(
      'SELECT c.*, COUNT(p.id) AS product_count FROM categories c LEFT JOIN products p ON c.id = p.category_id AND p.is_published = TRUE GROUP BY c.id ORDER BY c.sort_order ASC'
    );

    const products = await query<Product[]>(`
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
    `);

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
    <div className="min-h-screen bg-navy-950 py-10 sm:py-14 border-t border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2.5 font-serif">
            FRENDO E-SCOOTY • 27 SHOWROOM SETS
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            EXPLORE ALL 27 ELECTRIC SCOOTY MODELS
          </h1>

          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Starting Price: <strong className="text-amber-400">₹15,000/- (All Taxes Included)</strong> • LFP Battery (50 KM to 300 KM) • Heavy-Duty Chassis • Front Disc Brake • Digital Meter • 5-Year Warranty.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">100% Copper Motor</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Central Locking & Remote</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">5 Colours Available</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">All-India Dealership Supply</span>
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
