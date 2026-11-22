import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const seoSettings = await query<any[]>('SELECT * FROM seo_settings ORDER BY id ASC');
    return NextResponse.json({ success: true, seoSettings });
  } catch (error: any) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const { id, page_route, meta_title, meta_description, keywords, canonical_url, og_image } = body;

    if (!page_route || !meta_title) {
      return NextResponse.json({ error: 'page_route and meta_title are required' }, { status: 400 });
    }

    await query(
      `INSERT INTO seo_settings (page_route, meta_title, meta_description, keywords, canonical_url, og_image)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description),
        keywords = VALUES(keywords),
        canonical_url = VALUES(canonical_url),
        og_image = VALUES(og_image);`,
      [
        page_route,
        meta_title,
        meta_description || '',
        keywords || '',
        canonical_url || '',
        og_image || '',
      ]
    );

    return NextResponse.json({ success: true, message: 'SEO setting saved successfully' });
  } catch (error: any) {
    console.error('Error updating SEO setting:', error);
    return NextResponse.json({ error: error.message || 'Failed to update SEO setting' }, { status: 500 });
  }
}
