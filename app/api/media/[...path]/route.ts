import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ensureMediaTable } from '@/lib/upload';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  _req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const segments = params.path;
    if (!Array.isArray(segments) || segments.length === 0) {
      return NextResponse.json({ error: 'Invalid media path' }, { status: 400 });
    }

    // Prevent path traversal characters
    if (segments.some((seg) => !seg || seg.includes('..') || seg.includes('\\'))) {
      return NextResponse.json({ error: 'Invalid media path' }, { status: 400 });
    }

    await ensureMediaTable();

    const url = `/api/media/${segments.join('/')}`;
    const rows = await query<Array<{ data: Buffer; mime_type: string; filename: string }>>(
      'SELECT data, mime_type, filename FROM media_files WHERE url = ? LIMIT 1',
      [url]
    );

    if (!rows || rows.length === 0 || !rows[0].data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const file = rows[0];
    const body = new Uint8Array(file.data);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': file.mime_type || 'application/octet-stream',
        'Content-Length': String(body.byteLength),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Error serving media file:', error);
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 });
  }
}
