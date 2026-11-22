import { Metadata } from 'next';
import { query } from './db';
import { SeoSetting, ContactSettings } from '@/types';

export async function getSeoMetadata(pageRoute: string, fallback?: Partial<Metadata>): Promise<Metadata> {
  try {
    const rows = await query<SeoSetting[]>(
      'SELECT * FROM seo_settings WHERE page_route = ? LIMIT 1',
      [pageRoute]
    );

    const contactRows = await query<ContactSettings[]>(
      'SELECT business_name, brand_name, tagline FROM contact_settings LIMIT 1'
    );
    const brand = contactRows[0] || {
      business_name: 'Baba Marketing',
      brand_name: 'FRENDO',
      tagline: 'Electric Scooty | Clean Energy | Better Tomorrow',
    };

    if (rows && rows.length > 0) {
      const seo = rows[0];
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
