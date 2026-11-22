import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/validation';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const all = searchParams.get('all') === 'true';

    let sql = 'SELECT * FROM blogs WHERE 1=1';
    const params: any[] = [];

    if (!all) {
      sql += ' AND is_published = TRUE';
    }

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (search && search.trim()) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY published_at DESC, id DESC';

    const blogs = await query(sql, params);
    return NextResponse.json({ success: true, blogs });
  } catch (err: any) {
    console.error('Error fetching blogs:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(req);
    const body = await req.json();

    const title = (body.title || '').trim();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    let slug = body.slug ? slugify(body.slug) : slugify(title);
    if (!slug) slug = 'blog-' + Date.now();

    // Check slug uniqueness
    const existing = await query<any[]>('SELECT id FROM blogs WHERE slug = ? LIMIT 1', [slug]);
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

    const result: any = await query(
      `INSERT INTO blogs (title, slug, excerpt, content, featured_image, category, author, read_time, is_published, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      slug,
      message: 'Blog post created successfully',
    });
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating blog post:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
