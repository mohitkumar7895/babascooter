import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get('all') === 'true';

    const sections = await query<any[]>('SELECT * FROM homepage_sections ORDER BY sort_order ASC');
    const banners = await query<any[]>(
      includeInactive
        ? 'SELECT * FROM banners ORDER BY sort_order ASC'
        : 'SELECT * FROM banners WHERE is_active = TRUE ORDER BY sort_order ASC'
    );
    const contact = await query<any[]>('SELECT * FROM contact_settings LIMIT 1');

    return NextResponse.json({
      success: true,
      sections: sections || [],
      banners: banners || [],
      contact: contact[0] || null,
    });
  } catch (error: any) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json({ error: 'Failed to fetch homepage data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const { section_key, title, subtitle, content, is_visible, sort_order, banner } = body;

    // Update Banner if provided
    if (banner) {
      if (banner.id) {
        await query(
          `UPDATE banners SET
            title = COALESCE(?, title),
            subtitle = COALESCE(?, subtitle),
            offer_text = COALESCE(?, offer_text),
            button_text = COALESCE(?, button_text),
            button_link = COALESCE(?, button_link),
            image_url = COALESCE(?, image_url),
            is_active = COALESCE(?, is_active),
            sort_order = COALESCE(?, sort_order)
           WHERE id = ?`,
          [
            banner.title ?? null,
            banner.subtitle ?? null,
            banner.offer_text ?? null,
            banner.button_text ?? null,
            banner.button_link ?? null,
            banner.image_url ?? null,
            banner.is_active !== undefined ? Boolean(banner.is_active) : null,
            banner.sort_order !== undefined ? Number(banner.sort_order) : null,
            Number(banner.id),
          ]
        );
      } else {
        await query(
          `INSERT INTO banners (title, subtitle, offer_text, button_text, button_link, image_url, banner_type, is_active, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            banner.title || 'Special Promotion',
            banner.subtitle || '',
            banner.offer_text || '',
            banner.button_text || 'Explore Scooters',
            banner.button_link || '/scooters',
            banner.image_url || '/images/products/b-1-s/showroom.png',
            banner.banner_type || 'promo',
            banner.is_active !== undefined ? Boolean(banner.is_active) : true,
            banner.sort_order !== undefined ? Number(banner.sort_order) : 1,
          ]
        );
      }
      return NextResponse.json({ success: true, message: 'Banner updated successfully' });
    }

    // Update Section
    if (section_key) {
      const serializedContent =
        content !== undefined
          ? content === null
            ? null
            : typeof content === 'string'
              ? content
              : JSON.stringify(content)
          : null;

      const existing = await query<any[]>(
        'SELECT id FROM homepage_sections WHERE section_key = ? LIMIT 1',
        [section_key]
      );

      if (existing && existing.length > 0) {
        await query(
          `UPDATE homepage_sections SET
            title = COALESCE(?, title),
            subtitle = COALESCE(?, subtitle),
            content = COALESCE(?, content),
            is_visible = COALESCE(?, is_visible),
            sort_order = COALESCE(?, sort_order)
           WHERE section_key = ?`,
          [
            title ?? null,
            subtitle ?? null,
            serializedContent,
            is_visible !== undefined ? Boolean(is_visible) : null,
            sort_order !== undefined ? Number(sort_order) : null,
            section_key,
          ]
        );
      } else {
        await query(
          `INSERT INTO homepage_sections (section_key, title, subtitle, content, is_visible, sort_order)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            section_key,
            title || section_key,
            subtitle || '',
            serializedContent,
            is_visible !== undefined ? Boolean(is_visible) : true,
            sort_order !== undefined ? Number(sort_order) : 0,
          ]
        );
      }

      return NextResponse.json({ success: true, message: 'Section updated successfully' });
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (error: any) {
    console.error('Error updating homepage:', error);
    return NextResponse.json({ error: error.message || 'Failed to update homepage' }, { status: 500 });
  }
}
