import { Metadata } from 'next';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { query } from './db';
import { SeoSetting } from '@/types';
import { getCachedContact } from './data';

const fetchSeoRow = unstable_cache(
  async (pageRoute: string): Promise<SeoSetting | null> => {
    try {
      const rows = await query<SeoSetting[]>(
        'SELECT * FROM seo_settings WHERE page_route = ? LIMIT 1',
        [pageRoute]
      );
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('Error fetching SEO row:', err);
      return null;
    }
  },
  ['seo-settings'],
  { revalidate: 120, tags: ['seo'] }
);

export const getSeoMetadata = cache(
  async (pageRoute: string, fallback?: Partial<Metadata>): Promise<Metadata> => {
    try {
      const [seo, contact] = await Promise.all([fetchSeoRow(pageRoute), getCachedContact()]);

      const brand = contact || {
        business_name: 'Baba Marketing',
        brand_name: 'FRENDO',
        tagline: 'Electric Scooty | Clean Energy | Better Tomorrow',
      };

      if (seo) {
        return {
          title: `${seo.meta_title}`,
          description: seo.meta_description,
          keywords: seo.keywords ? seo.keywords.split(',').map((k) => k.trim()) : undefined,
          metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
          alternates: {
            canonical: seo.canonical_url || pageRoute,
          },
          openGraph: {
            title: seo.meta_title,
            description: seo.meta_description,
            url: seo.canonical_url || pageRoute,
            siteName: `${brand.business_name} – ${brand.brand_name}`,
            images: seo.og_image
              ? [
                  {
                    url: seo.og_image,
                    width: 1200,
                    height: 630,
                    alt: seo.meta_title,
                  },
                ]
              : undefined,
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title: seo.meta_title,
            description: seo.meta_description,
            images: seo.og_image ? [seo.og_image] : undefined,
          },
        };
      }
    } catch (err) {
      console.error('Error fetching SEO metadata:', err);
    }

    return {
      title: fallback?.title || 'Baba Marketing – FRENDO Electric Scooty',
      description: fallback?.description || 'Authorized FRENDO Electric Scooter Dealer in Ballabhgarh, Faridabad.',
    };
  }
);
