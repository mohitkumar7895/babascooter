import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/validation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const id = Number(params.id);
    const existingRows = await query<any[]>('SELECT * FROM blogs WHERE id = ? LIMIT 1', [id]);
    if (!existingRows || existingRows.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const current = existingRows[0];
    const body = await req.json();

    const title = body.title !== undefined ? String(body.title).trim() : current.title;
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    let slug =
      body.slug !== undefined
        ? slugify(body.slug)
        : body.title !== undefined && body.title.trim() !== current.title
          ? slugify(title)
          : current.slug;

    // Verify uniqueness excluding current post
    const existing = await query<any[]>('SELECT id FROM blogs WHERE slug = ? AND id != ? LIMIT 1', [slug, id]);
    if (existing && existing.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const excerpt = body.excerpt !== undefined ? String(body.excerpt).trim() : current.excerpt;
    const content = body.content !== undefined ? String(body.content).trim() : current.content;
    const featured_image = body.featured_image !== undefined ? body.featured_image || null : current.featured_image;
    const category = body.category !== undefined ? body.category || 'EV Guide' : current.category;
    const author = body.author !== undefined ? body.author || 'Baba Marketing Team' : current.author;
    const read_time = body.read_time !== undefined ? body.read_time || '4 min read' : current.read_time;
    const is_published = body.is_published !== undefined ? Boolean(body.is_published) : Boolean(current.is_published);
    const meta_title = body.meta_title !== undefined ? body.meta_title || title : current.meta_title;
    const meta_description =
      body.meta_description !== undefined
        ? body.meta_description || (excerpt || '').slice(0, 160)
        : current.meta_description;

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
        excerpt ?? '',
        content ?? '',
        featured_image ?? null,
        category ?? 'EV Guide',
        author ?? 'Baba Marketing Team',
        read_time ?? '4 min read',
        is_published,
        meta_title ?? title,
        meta_description ?? '',
        id,
      ]
    );

    return NextResponse.json({ success: true, message: 'Blog updated successfully', slug });
  } catch (err: any) {
    console.error('Error updating blog post:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const id = Number(params.id);

    await query('DELETE FROM blogs WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err: any) {
    console.error('Error deleting blog post:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
