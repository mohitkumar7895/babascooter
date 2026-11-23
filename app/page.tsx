import React from 'react';
import { query } from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import ScootyFeaturesSection from '@/components/home/ScootyFeaturesSection';
import BatteryRangeSection from '@/components/home/BatteryRangeSection';
import ModelsGallerySection from '@/components/home/ModelsGallerySection';
import DealershipOffersSection from '@/components/home/DealershipOffersSection';
import PromotionalBanner from '@/components/home/PromotionalBanner';
import QuickEnquirySection from '@/components/home/QuickEnquirySection';
import { Banner, ContactSettings, HomepageSection } from '@/types';
import { getSeoMetadata } from '@/lib/seo';

export const revalidate = 0; // Always fresh from MySQL

export async function generateMetadata() {
  return await getSeoMetadata('/');
}

async function getHomePageData() {
  try {
    const contactRows = await query<ContactSettings[]>('SELECT * FROM contact_settings LIMIT 1');
    const contact = contactRows[0] || null;

    const banners = await query<Banner[]>('SELECT * FROM banners WHERE is_active = TRUE ORDER BY sort_order ASC');
    const promoBanner = banners.find((b) => b.banner_type === 'promo') || banners[0] || null;

    const sections = await query<HomepageSection[]>('SELECT * FROM homepage_sections WHERE is_visible = TRUE');
    const heroSection = sections.find((s) => s.section_key === 'hero');

    return {
      contact,
      promoBanner,
      heroSection,
      sections,
    };
  } catch (err) {
    console.error('Error fetching homepage data:', err);
    return {
      contact: null,
      promoBanner: null,
      heroSection: null,
      sections: [],
    };
  }
}

export default async function HomePage() {
  const { contact, promoBanner, heroSection } = await getHomePageData();

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
      {/* 1. Hero Section - Dynamic from Admin or Luxury Gold Defaults */}
      <HeroSection
        primaryPhone={phone}
        whatsappNumber={whatsapp}
        title={heroSection?.title || undefined}
        subtitle={heroSection?.subtitle || undefined}
        tagline={heroContent?.tagline || 'DRIVE GREEN, LIVE BETTER!'}
        heroImage={heroContent?.hero_image || '/models/set-1/main.jpg'}
      />

      {/* 2. Electric Scooty Features (10 Core Highlights) */}
      <ScootyFeaturesSection />

      {/* 3. LFP Battery Options (20Ah to 75Ah) & Running Range (50 KM to 300 KM) */}
      <BatteryRangeSection />

      {/* 4. Real Showroom Sets Showcase (27 Models from public/models) */}
      <ModelsGallerySection />

      {/* 5. B2B Dealership & Franchise Offers (Special benefits on 40 scooties & 7 dealer support pillars) */}
      <DealershipOffersSection />

      {/* 6. Promotional / Showroom Offer Banner */}
      <PromotionalBanner
        banner={promoBanner}
        whatsappNumber={whatsapp}
      />

      {/* 8. Quick Enquiry & Showroom Location */}
      <QuickEnquirySection
        primaryPhone={phone}
        whatsappNumber={whatsapp}
        address={contact?.address}
      />
    </div>
  );
}
