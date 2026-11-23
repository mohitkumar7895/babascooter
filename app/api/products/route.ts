import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/validation';
import { revalidatePublicSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const all = searchParams.get('all') === 'true';

    let sql = `
      SELECT 
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
        ps.reverse_gear,
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
      WHERE 1=1
    `;

    const params: any[] = [];

    if (!all) {
      sql += ' AND p.is_published = TRUE';
    }

    if (category) {
      sql += ' AND (c.slug = ? OR c.id = ?)';
      params.push(category, category);
    }

    if (featured === 'true') {
      sql += ' AND p.is_featured = TRUE';
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.model_number LIKE ? OR p.short_description LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY p.sort_order ASC, p.id ASC';

    const products = await query<any[]>(sql, params);

    return NextResponse.json({ success: true, products, count: products.length });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const {
      name,
      model_number,
      slug: customSlug,
      category_id,
      short_description,
      detailed_description,
      price,
      price_label,
      availability,
      is_featured,
      is_published,
      sort_order,
      meta_title,
      meta_description,
      specifications,
      images,
    } = body;

    if (!name || !model_number) {
      return NextResponse.json({ error: 'Name and model number are required' }, { status: 400 });
    }

    const finalSlug = customSlug ? slugify(customSlug) : slugify(name);

    // Check slug uniqueness
    const existing = await query<any[]>('SELECT id FROM products WHERE slug = ?', [finalSlug]);
    if (existing.length > 0) {
      return NextResponse.json({ error: `Slug "${finalSlug}" is already in use` }, { status: 400 });
    }

    // Insert Product
    const insertRes: any = await query(
      `INSERT INTO products 
        (name, model_number, slug, category_id, short_description, detailed_description, price, price_label, availability, is_featured, is_published, sort_order, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        model_number.trim(),
        finalSlug,
        category_id ? Number(category_id) : null,
        short_description?.trim() || '',
        detailed_description?.trim() || '',
        price ? Number(price) : null,
        price_label || 'Contact for Best Price',
        availability || 'In Stock',
        Boolean(is_featured),
        is_published !== undefined ? Boolean(is_published) : true,
        sort_order ? Number(sort_order) : 0,
        meta_title || `${name} | FRENDO Electric Scooty`,
        meta_description || short_description || '',
      ]
    );

    const productId = insertRes.insertId;

    // Insert Specifications
    if (specifications) {
      await query(
        `INSERT INTO product_specifications 
          (product_id, motor_power, battery_voltage, controller, front_tyre, rear_tyre, brakes, central_locking, digital_meter, reverse_gear, other_specifications)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          productId,
          specifications.motor_power || '1000W BLDC Hub Motor',
          specifications.battery_voltage || '48V / 60V',
          specifications.controller || 'Intelligent Vector Controller',
          specifications.front_tyre || '12-Inch Tubeless',
          specifications.rear_tyre || '10-Inch Tubeless',
          specifications.brakes || 'Front Disc / Rear Drum Brakes',
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

    // Insert Images if provided
    if (images && Array.isArray(images)) {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.image_url) {
          await query(
            `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order)
             VALUES (?, ?, ?, ?, ?)`,
            [productId, img.image_url, img.alt_text || name, i === 0 || Boolean(img.is_primary), i + 1]
          );
        }
      }
    }

    revalidatePublicSite(['/', '/scooters', `/scooters/${finalSlug}`]);
    return NextResponse.json({ success: true, message: 'Product created successfully', id: productId, slug: finalSlug });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
