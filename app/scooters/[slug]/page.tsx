import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { query } from '@/lib/db';
import { Product, ProductImage, ProductSpecification, ContactSettings } from '@/types';
import ProductLightbox from '@/components/gallery/ProductLightbox';
import ProductCard from '@/components/products/ProductCard';
import {
  MessageCircle,
  Phone,
  Zap,
  Disc,
  RotateCcw,
  Shield,
  Gauge,
  Battery,
  Cpu,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Sparkles,
  Award,
} from 'lucide-react';

interface Props {
  params: { slug: string };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;
  try {
    const pRows = await query<any[]>('SELECT name, model_number, short_description, meta_title, meta_description FROM products WHERE slug = ? LIMIT 1', [slug]);
    if (pRows && pRows.length > 0) {
      const p = pRows[0];
      return {
        title: p.meta_title || `${p.name} | FRENDO E-SCOOTY | Baba Marketing`,
        description: p.meta_description || p.short_description || `Specifications and showroom price for ${p.name} electric scooter.`,
      };
    }
  } catch (err) {}
  return {
    title: 'FRENDO E-SCOOTY | Baba Marketing',
    description: 'Electric Scooter showroom in Ballabhgarh, Faridabad',
  };
}

async function getProductDetailData(slug: string) {
  try {
    const pRows = await query<any[]>(
      `SELECT 
        p.*, 
        c.name AS category_name, 
        c.slug AS category_slug 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.slug = ? LIMIT 1`,
      [slug]
    );

    if (!pRows || pRows.length === 0) {
      return null;
    }

    const product: Product = pRows[0];

    const images = await query<ProductImage[]>(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC, id ASC',
      [product.id]
    );
    product.images = images || [];

    const sRows = await query<ProductSpecification[]>(
      'SELECT * FROM product_specifications WHERE product_id = ? LIMIT 1',
      [product.id]
    );
    product.specifications = sRows[0] || undefined;

    const contactRows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    const contact = contactRows[0] || null;

    const related = await query<Product[]>(
      `SELECT 
        p.*,
        c.name AS category_name,
        c.slug AS category_slug,
        ps.motor_power,
        ps.battery_voltage,
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
       WHERE p.id != ? AND p.is_published = TRUE
       ORDER BY (p.category_id = ?) DESC, p.sort_order ASC
       LIMIT 4`,
      [product.id, product.category_id || 0]
    );

    return { product, contact, related: related || [] };
  } catch (err) {
    console.error('Error fetching product detail:', err);
    return null;
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const data = await getProductDetailData(params.slug);

  if (!data) {
    notFound();
  }

  const { product, contact, related } = data;
  const specs = product.specifications;

  const phone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';

  const waMessage = `Hello Baba Marketing, I am interested in ${product.name} (${product.model_number}) starting at ₹15,000/-. Please share showroom availability and best offers.`;

  let otherSpecsList: string[] = [
    '100% Pure Copper Motor with High Thermal Durability',
    'Heavy-Duty Copper Wiring Harness',
    'Spacious Under-Seat Helmet Storage in Dickey',
    'Telescopic Front Hydraulic Suspension & Dual Rear Shocks',
    'USB Mobile Fast Charging Port',
    'Smart Central Locking System & Anti-Theft Siren',
    '5 Attractive Colours with UV-Resistant Automotive Paint',
    '5-Year Warranty Backed by Company Terms',
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.map((img) => img.image_url),
    description: product.short_description,
    brand: {
      '@type': 'Brand',
      name: 'FRENDO E-SCOOTY',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price || '15000',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Baba Marketing',
      },
    },
  };

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 py-8 sm:py-12 border-t border-brand-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-600 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/scooters" className="hover:text-brand-700 transition-colors">
            Scooters
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-brand-800 font-bold">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Image Lightbox Gallery */}
          <div className="lg:col-span-7">
            <ProductLightbox images={product.images || []} productName={product.name} />
          </div>

          {/* Right Column: Information, Pricing, & Direct Enquiries */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              {/* Category & Availability Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white border border-brand-200 text-brand-800 font-mono">
                  {product.category_name || 'Electric Scooty'}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-brand-100 border border-brand-300 text-brand-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {product.availability || 'Showroom In Stock'}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Model Number */}
              <div className="mt-1 text-xs font-mono text-slate-600">
                MODEL CODE: <span className="text-brand-800 font-bold">{product.model_number}</span>
              </div>

              {/* Price Card */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-brand-300 shadow-xl flex items-center justify-between gold-border-glow">
                <div>
                  <div className="text-[10px] text-brand-800 uppercase tracking-widest font-serif font-bold">
                    Starting Showroom Price
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                    {product.price ? `₹${product.price.toLocaleString('en-IN')}/-` : 'Starting ₹15,000/-'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-brand-800 font-bold">5-Year Warranty</div>
                  <div className="text-[10px] text-slate-600">All Taxes Included</div>
                </div>
              </div>

              {/* Short Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {product.short_description}
              </p>
            </div>

            {/* Core Feature Badges */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white border border-brand-200 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-brand-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-600">Motor Power</div>
                  <div className="font-bold text-slate-900">{specs?.motor_power || '1000W / 1500W Copper'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-brand-200 flex items-center gap-2.5">
                <Battery className="w-4 h-4 text-brand-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-600">Battery & Range</div>
                  <div className="font-bold text-slate-900">{specs?.battery_voltage || 'LFP 60V (50–300 KM)'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-brand-200 flex items-center gap-2.5">
                <Disc className="w-4 h-4 text-brand-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-600">Braking</div>
                  <div className="font-bold text-slate-900">{specs?.brakes || 'Front Disc Brake'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-brand-200 flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-brand-800 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-600">Reverse Assist</div>
                  <div className="font-bold text-slate-900">Reverse Gear Enabled</div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <a
                href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-brand-950" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="w-full py-3 px-6 rounded-xl bg-brand-50 hover:bg-brand-100 text-slate-900 font-bold text-xs uppercase tracking-wider border border-brand-200 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-800" />
                <span>Call Showroom ({phone})</span>
              </a>
            </div>

            {/* Showroom Visit Guarantee Box */}
            <div className="p-3.5 rounded-xl bg-white border border-brand-200 flex items-start gap-2.5 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Showroom & Test Ride: </span>
                <span>33 Futa Road, Kaili, Ballabhgarh, Faridabad. Open Mon – Sat (9 AM – 8 PM).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="mt-12 pt-8 border-t border-brand-200">
          <div className="max-w-3xl mb-6">
            <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-5 rounded bg-amber-400" />
              Technical Specifications & Features
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Official manufacturer specifications for {product.name} from FRENDO E-SCOOTY.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Specs Table */}
            <div className="rounded-2xl bg-white border border-brand-200 overflow-hidden shadow-xl">
              <div className="px-5 py-3.5 bg-brand-50 border-b border-brand-200 font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2 font-serif">
                <Gauge className="w-4 h-4 text-brand-800" />
                <span>Core Powertrain & Chassis</span>
              </div>

              <div className="divide-y divide-slate-200 text-xs">
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Model Code</span>
                  <span className="text-slate-900 font-bold font-mono">{product.model_number}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Motor Power</span>
                  <span className="text-brand-800 font-bold">{specs?.motor_power || '1000W / 1500W Copper'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Battery Voltage</span>
                  <span className="text-slate-900 font-bold">{specs?.battery_voltage || '48V / 60V / 72V (LFP)'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Controller</span>
                  <span className="text-slate-900 font-bold">{specs?.controller || 'Multi-Stage Intelligent Vector'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Front Tyre</span>
                  <span className="text-slate-900 font-bold">{specs?.front_tyre || '90/90-12 Tubeless'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Rear Tyre</span>
                  <span className="text-slate-900 font-bold">{specs?.rear_tyre || '90/90-10 Tubeless'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Braking System</span>
                  <span className="text-slate-900 font-bold">{specs?.brakes || 'Front Hydraulic Disc'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Central Locking</span>
                  <span className="text-brand-800 font-bold">{specs?.central_locking || 'Yes (Keyless + Alarm)'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Digital Speedometer</span>
                  <span className="text-brand-800 font-bold">{specs?.digital_meter || 'Yes (LCD Console)'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Reverse Gear</span>
                  <span className="text-brand-800 font-bold">{specs?.reverse_gear || 'Yes (Parking Assist)'}</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-slate-600">Warranty</span>
                  <span className="text-brand-800 font-bold">5-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Standard Features Checklist */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-brand-200 space-y-2.5">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-800" />
                  <span>Model Overview</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {product.detailed_description || product.short_description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-brand-200 space-y-3">
                <h3 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-800" />
                  <span>Standard Features & Equipment</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  {otherSpecsList.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-800 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Scooters */}
        {related && related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-brand-200">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              More FRENDO Electric Models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} whatsappNumber={whatsapp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
