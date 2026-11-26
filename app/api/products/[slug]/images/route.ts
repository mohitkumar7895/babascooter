import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { revalidatePublicSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const slug = params.slug;
    const isId = /^\d+$/.test(slug);
    const whereClause = isId ? 'id = ?' : 'slug = ?';

    const pRows = await query<any[]>(`SELECT id, name, slug FROM products WHERE ${whereClause} LIMIT 1`, [slug]);
    if (!pRows || pRows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = pRows[0];
    const { image_url, alt_text, is_primary, sort_order } = await req.json();

    if (!image_url) {
      return NextResponse.json({ error: 'image_url is required' }, { status: 400 });
    }

    if (is_primary) {
      await query('UPDATE product_images SET is_primary = FALSE WHERE product_id = ?', [product.id]);
    }

    const insertRes: any = await query(
      `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [
        product.id,
        image_url,
        alt_text || `${product.name} image`,
        Boolean(is_primary),
        sort_order ? Number(sort_order) : 10,
      ]
    );

    revalidatePublicSite(['/', '/scooters', `/scooters/${product.slug}`]);
    return NextResponse.json({
      success: true,
      message: 'Image added successfully',
      id: insertRes.insertId,
    });
  } catch (error: any) {
    console.error('Error adding image:', error);
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const slug = params.slug;
    const isId = /^\d+$/.test(slug);
    const whereClause = isId ? 'id = ?' : 'slug = ?';

    const pRows = await query<any[]>(`SELECT id, slug FROM products WHERE ${whereClause} LIMIT 1`, [slug]);
    if (!pRows || pRows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = pRows[0];
    const { imageId, is_primary, sort_order, alt_text } = await req.json();

    if (!imageId) {
      return NextResponse.json({ error: 'imageId is required' }, { status: 400 });
    }

    if (is_primary) {
      await query('UPDATE product_images SET is_primary = FALSE WHERE product_id = ?', [product.id]);
      await query('UPDATE product_images SET is_primary = TRUE WHERE id = ? AND product_id = ?', [
        imageId,
        product.id,
      ]);
    }

    if (sort_order !== undefined) {
      await query('UPDATE product_images SET sort_order = ? WHERE id = ? AND product_id = ?', [
        Number(sort_order),
        imageId,
        product.id,
      ]);
    }

    if (alt_text !== undefined) {
      await query('UPDATE product_images SET alt_text = ? WHERE id = ? AND product_id = ?', [
        alt_text,
        imageId,
        product.id,
      ]);
    }

    revalidatePublicSite(['/', '/scooters', `/scooters/${product.slug}`]);
    return NextResponse.json({ success: true, message: 'Image updated successfully' });
  } catch (error: any) {
    console.error('Error updating image:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const imageId = searchParams.get('imageId');

    if (!imageId) {
      return NextResponse.json({ error: 'imageId query parameter is required' }, { status: 400 });
    }

    await query('DELETE FROM product_images WHERE id = ?', [Number(imageId)]);

    revalidatePublicSite(['/', '/scooters']);
    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
