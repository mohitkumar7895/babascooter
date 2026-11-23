import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/validation';
import { revalidatePublicSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const categories = await query<any[]>(`
      SELECT 
        c.*,
        COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_published = TRUE
      GROUP BY c.id
      ORDER BY c.sort_order ASC
    `);

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { name, slug, description, sort_order } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const finalSlug = slug ? slugify(slug) : slugify(name);

    const insertRes: any = await query(
      `INSERT INTO categories (name, slug, description, sort_order)
       VALUES (?, ?, ?, ?)`,
      [name.trim(), finalSlug, description?.trim() || null, sort_order ? Number(sort_order) : 0]
    );

    revalidatePublicSite(['/', '/scooters']);
    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      id: insertRes.insertId,
    });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 });
  }
}
