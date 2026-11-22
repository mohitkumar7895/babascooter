import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/validation';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idOrSlug = params.id;
    let blogRows: any[];

    if (/^\d+$/.test(idOrSlug)) {
      blogRows = await query<any[]>('SELECT * FROM blogs WHERE id = ? LIMIT 1', [Number(idOrSlug)]);
    } else {
      blogRows = await query<any[]>('SELECT * FROM blogs WHERE slug = ? LIMIT 1', [idOrSlug]);
    }

    if (!blogRows || blogRows.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    query('UPDATE blogs SET views = views + 1 WHERE id = ?', [blogRows[0].id]).catch(() => {});

    return NextResponse.json({ success: true, blog: blogRows[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth(req);
    const id = Number(params.id);
    const body = await req.json();

    const title = (body.title || '').trim();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    let slug = body.slug ? slugify(body.slug) : slugify(title);

    // Verify uniqueness excluding current post
    const existing = await query<any[]>('SELECT id FROM blogs WHERE slug = ? AND id != ? LIMIT 1', [slug, id]);
    if (existing && existing.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const excerpt = (body.excerpt || title).trim();
    const content = (body.content || '').trim();
    const featured_image = body.featured_image || null;
    const category = body.category || 'EV Guide';
    const author = body.author || 'Baba Marketing Team';
    const read_time = body.read_time || '4 min read';
    const is_published = body.is_published !== undefined ? Boolean(body.is_published) : true;
    const meta_title = body.meta_title || title;
    const meta_description = body.meta_description || excerpt.slice(0, 160);

    await query(
      `UPDATE blogs SET 
        title = ?,
        slug = ?,
        excerpt = ?,
        content = ?,
        featured_image = ?,
        category = ?,
        author = ?,
        read_time = ?,
        is_published = ?,
        meta_title = ?,
        meta_description = ?
       WHERE id = ?`,
      [
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        author,
        read_time,
        is_published,
        meta_title,
        meta_description,
        id,
      ]
    );

    return NextResponse.json({ success: true, message: 'Blog updated successfully', slug });
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth(req);
    const id = Number(params.id);

    await query('DELETE FROM blogs WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
