import React from 'react';
import { query } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import ScootyFeaturesSection from '@/components/home/ScootyFeaturesSection';
import BatteryRangeSection from '@/components/home/BatteryRangeSection';
import ModelsGallerySection from '@/components/home/ModelsGallerySection';
import DealershipOffersSection from '@/components/home/DealershipOffersSection';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import QuickEnquirySection from '@/components/home/QuickEnquirySection';
import { Banner, Category, ContactSettings, HomepageSection, Product, ProductImage } from '@/types';
import { getSeoMetadata } from '@/lib/seo';
import { getCachedContact } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata('/');
}

async function getHomePageData() {
  try {
    const [contact, banners, sections, categories, products, allImages] = await Promise.all([
      getCachedContact(),
      query<Banner[]>('SELECT * FROM banners WHERE is_active = TRUE ORDER BY sort_order ASC'),
      query<HomepageSection[]>('SELECT * FROM homepage_sections WHERE is_visible = TRUE'),
      query<Category[]>(
        `SELECT c.*, COUNT(p.id) AS product_count
         FROM categories c
         LEFT JOIN products p ON c.id = p.category_id AND p.is_published = TRUE
         GROUP BY c.id
         ORDER BY c.sort_order ASC, c.id ASC`
      ),
      query<Product[]>(
        `SELECT
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
          ps.reverse_gear
         FROM products p
         LEFT JOIN categories c ON p.category_id = c.id
         LEFT JOIN product_specifications ps ON p.id = ps.product_id
         WHERE p.is_published = TRUE
         ORDER BY p.sort_order ASC, p.id DESC`
      ),
      query<ProductImage[]>(
        `SELECT id, product_id, image_url, alt_text, is_primary, sort_order
         FROM product_images
         ORDER BY is_primary DESC, sort_order ASC, id ASC`
      ),
    ]);

    const imagesByProduct = new Map<number, ProductImage[]>();
    for (const img of allImages || []) {
      const list = imagesByProduct.get(img.product_id) || [];
      list.push(img);
      imagesByProduct.set(img.product_id, list);
    }

    const hydratedProducts: Product[] = (products || []).map((p) => {
      const imgs = imagesByProduct.get(p.id) || [];
      return {
        ...p,
        images: imgs,
        primary_image: imgs[0]?.image_url || undefined,
      };
    });

    const promoBanner = banners.find((b) => b.banner_type === 'promo') || banners[0] || null;
    const heroSection = sections.find((s) => s.section_key === 'hero');

    return {
      contact,
      promoBanner,
      heroSection,
      sections,
      categories: categories || [],
      products: hydratedProducts,
      dbLoaded: true,
    };
  } catch (err) {
    console.error('Error fetching homepage data:', err);
    return {
      contact: null,
      promoBanner: null,
      heroSection: null,
      sections: [],
      categories: [],
      products: [],
      dbLoaded: false,
    };
  }
}

export default async function HomePage() {
  const { contact, promoBanner, heroSection, categories, products, dbLoaded } = await getHomePageData();

  const phone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';

  let heroContent: { hero_image?: string; tagline?: string } = {};
  if (heroSection?.content) {
    try {
      heroContent = typeof heroSection.content === 'string' ? JSON.parse(heroSection.content) : heroSection.content;
    } catch {}
  }

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* 1. Hero Section - Dynamic from Admin or Official FRENDO Defaults */}
      <HeroSection
        primaryPhone={phone}
        whatsappNumber={whatsapp}
        title={heroSection?.title || undefined}
        subtitle={heroSection?.subtitle || undefined}
        tagline={heroContent?.tagline || 'DRIVE GREEN, LIVE BETTER!'}
        heroImage={heroContent?.hero_image || '/models/set-1/main.jpg'}
      />

      {/* 2. Live Showroom Scooter Models Showcase from Database */}
      <ModelsGallerySection
        products={products}
        categories={categories}
        whatsappNumber={whatsapp}
        dbLoaded={dbLoaded}
      />

      {/* 3. Official FRENDO Rate Card & 40 + 20 FREE Special Distributor Offer Banner */}
      <PromotionalBanner
        banner={promoBanner}
        whatsappNumber={whatsapp}
      />

      {/* 4. Electric Scooty Features (10 Core Highlights) */}
      <ScootyFeaturesSection />

      {/* 5. LFP Battery Options (20Ah to 75Ah) & Running Range (50 KM to 300 KM) */}
      <BatteryRangeSection />

      {/* 6. B2B Dealership & Franchise Offers (40 + 20 FREE & 14 dealer benefits) */}
      <DealershipOffersSection />

      {/* 7. Quick Enquiry & Showroom Location */}
      <QuickEnquirySection
        primaryPhone={phone}
        whatsappNumber={whatsapp}
        address={contact?.address}
      />
    </div>
  );
}
