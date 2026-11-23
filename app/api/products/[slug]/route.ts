import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/validation';
import { revalidatePublicSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;

    // Check if searching by slug or by numeric id
    const isId = /^\d+$/.test(slug);
    const whereClause = isId ? 'p.id = ?' : 'p.slug = ?';

    const pRows = await query<any[]>(
      `SELECT 
        p.*,
        c.name AS category_name,
        c.slug AS category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE ${whereClause} LIMIT 1`,
      [slug]
    );

    if (!pRows || pRows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = pRows[0];

    // Fetch Images
    const images = await query<any[]>(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC, id ASC',
      [product.id]
    );

    // Fetch Specifications
    const sRows = await query<any[]>(
      'SELECT * FROM product_specifications WHERE product_id = ? LIMIT 1',
      [product.id]
    );

    product.images = images || [];
    product.specifications = sRows[0] || null;

    // Also get primary image convenience
    product.primary_image = images && images.length > 0 ? images[0].image_url : null;

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error fetching single product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
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

    const pRows = await query<any[]>(`SELECT * FROM products WHERE ${whereClause} LIMIT 1`, [slug]);
    if (!pRows || pRows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const currentProduct = pRows[0];
    const productId = currentProduct.id;
    const body = await req.json();

    const {
      name,
      model_number,
      slug: newSlug,
      category_id,
      short_description,
      detailed_description,
      price,
      price_label,
      special_offers,
      availability,
      is_featured,
      is_published,
      sort_order,
      meta_title,
      meta_description,
      specifications,
    } = body;

    const finalSlug = newSlug ? slugify(newSlug) : undefined;

    // Check slug collision if changing slug
    if (finalSlug) {
      const collision = await query<any[]>(
        'SELECT id FROM products WHERE slug = ? AND id != ?',
        [finalSlug, productId]
      );
      if (collision.length > 0) {
        return NextResponse.json({ error: `Slug "${finalSlug}" is already in use` }, { status: 400 });
      }
    }

    const nextCategoryId =
      category_id !== undefined ? (category_id ? Number(category_id) : null) : currentProduct.category_id;
    const nextPrice = price !== undefined ? (price ? Number(price) : null) : currentProduct.price;
    const nextSpecialOffers =
      special_offers !== undefined ? special_offers : currentProduct.special_offers;

    // Update Product Table
    await query(
      `UPDATE products SET
        name = COALESCE(?, name),
        model_number = COALESCE(?, model_number),
        slug = COALESCE(?, slug),
        category_id = ?,
        short_description = COALESCE(?, short_description),
        detailed_description = COALESCE(?, detailed_description),
        price = ?,
        price_label = COALESCE(?, price_label),
        special_offers = ?,
        availability = COALESCE(?, availability),
        is_featured = COALESCE(?, is_featured),
        is_published = COALESCE(?, is_published),
        sort_order = COALESCE(?, sort_order),
        meta_title = COALESCE(?, meta_title),
        meta_description = COALESCE(?, meta_description)
       WHERE id = ?`,
      [
        name?.trim() || null,
        model_number?.trim() || null,
        finalSlug || null,
        nextCategoryId ?? null,
        short_description !== undefined ? short_description : null,
        detailed_description !== undefined ? detailed_description : null,
        nextPrice ?? null,
        price_label || null,
        nextSpecialOffers ?? null,
        availability || null,
        is_featured !== undefined ? Boolean(is_featured) : null,
        is_published !== undefined ? Boolean(is_published) : null,
        sort_order !== undefined ? Number(sort_order) : null,
        meta_title || null,
        meta_description || null,
        productId,
      ]
    );

    // Update or Insert Specifications
    if (specifications) {
      await query(
        `INSERT INTO product_specifications 
          (product_id, motor_power, battery_voltage, controller, front_tyre, rear_tyre, brakes, central_locking, digital_meter, reverse_gear, other_specifications)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          motor_power = VALUES(motor_power),
          battery_voltage = VALUES(battery_voltage),
          controller = VALUES(controller),
          front_tyre = VALUES(front_tyre),
          rear_tyre = VALUES(rear_tyre),
          brakes = VALUES(brakes),
          central_locking = VALUES(central_locking),
          digital_meter = VALUES(digital_meter),
          reverse_gear = VALUES(reverse_gear),
          other_specifications = VALUES(other_specifications);`,
        [
          productId,
          specifications.motor_power || '',
          specifications.battery_voltage || '',
          specifications.controller || '',
          specifications.front_tyre || '',
          specifications.rear_tyre || '',
          specifications.brakes || '',
          specifications.central_locking || 'Yes',
          specifications.digital_meter || 'Yes',
          specifications.reverse_gear || 'Yes',
          specifications.other_specifications
            ? typeof specifications.other_specifications === 'string'
              ? specifications.other_specifications
              : JSON.stringify(specifications.other_specifications)
            : null,
        ]
      );
    }

    revalidatePublicSite(['/', '/scooters', `/scooters/${finalSlug || currentProduct.slug}`]);
    return NextResponse.json({ success: true, message: 'Product updated successfully', slug: finalSlug || slug });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const slug = params.slug;
    const isId = /^\d+$/.test(slug);
    const whereClause = isId ? 'id = ?' : 'slug = ?';

    const pRows = await query<any[]>(`SELECT id FROM products WHERE ${whereClause} LIMIT 1`, [slug]);
    if (!pRows || pRows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productId = pRows[0].id;

    // Delete product (cascade will delete specs and images)
    await query('DELETE FROM products WHERE id = ?', [productId]);

    revalidatePublicSite(['/', '/scooters']);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
