import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import {
  saveUploadedFile,
  listStoredMediaFiles,
  deleteStoredMediaFile,
  MediaListItem,
} from '@/lib/upload';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    // 1. Load persistent DB-stored uploads (works on Vercel & local)
    const dbImages = await listStoredMediaFiles();
    const seenUrls = new Set(dbImages.map((img) => img.url));
    const images: MediaListItem[] = [...dbImages];

    // 2. Also include any legacy static files in public/uploads (read-only safe)
    const uploadsBaseDir = path.join(process.cwd(), 'public', 'uploads');
    const scanDirectory = async (dir: string, currentFolder = '') => {
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            await scanDirectory(
              fullPath,
              currentFolder ? `${currentFolder}/${entry.name}` : entry.name
            );
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'].includes(ext)) {
              try {
                const fileStat = await stat(fullPath);
                const relFolder = currentFolder || 'general';
                const url = `/uploads/${currentFolder ? `${currentFolder}/` : ''}${entry.name}`;
                if (!seenUrls.has(url)) {
                  seenUrls.add(url);
                  images.push({
                    url,
                    filename: entry.name,
                    folder: relFolder,
                    size: fileStat.size,
                    createdAt: (fileStat.birthtime || fileStat.mtime).toISOString(),
                  });
                }
              } catch {}
            }
          }
        }
      } catch {
        // Directory might not exist on serverless deployments
      }
    };

    await scanDirectory(uploadsBaseDir);

    // Sort newest first
    images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error('Error listing uploads:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list uploads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'products';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/svg+xml',
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Allowed: JPG, PNG, WEBP, AVIF, SVG' },
        { status: 400 }
      );
    }

    // 15MB limit
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 15MB limit' }, { status: 400 });
    }

    const result = await saveUploadedFile(file, folder);

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
      size: result.size,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // 1. Delete DB-stored media file (/api/media/...)
    if (url.startsWith('/api/media/')) {
      const deleted = await deleteStoredMediaFile(url);
      if (!deleted) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'File deleted successfully' });
    }

    // 2. Legacy local /uploads/... deletion (only works on writable local disk)
    if (url.startsWith('/uploads/')) {
      const cleanRelPath = url.replace(/^\//, '');
      const fullPath = path.resolve(process.cwd(), 'public', cleanRelPath);
      const uploadsBase = path.resolve(process.cwd(), 'public', 'uploads');

      if (!fullPath.startsWith(uploadsBase)) {
        return NextResponse.json({ error: 'Unauthorized file path' }, { status: 403 });
      }

      try {
        await unlink(fullPath);
        return NextResponse.json({ success: true, message: 'File deleted successfully' });
      } catch (fsErr: any) {
        if (fsErr?.code === 'EROFS' || fsErr?.code === 'EACCES') {
          return NextResponse.json(
            { error: 'Static bundled file cannot be deleted on read-only hosting. Only newly uploaded media can be removed.' },
            { status: 400 }
          );
        }
        throw fsErr;
      }
    }

    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete file' },
      { status: 500 }
    );
  }
}
