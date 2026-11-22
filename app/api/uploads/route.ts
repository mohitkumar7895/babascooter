import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/upload';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const uploadsBaseDir = path.join(process.cwd(), 'public', 'uploads');
    const images: Array<{
      url: string;
      filename: string;
      folder: string;
      size: number;
      createdAt: string;
    }> = [];

    // Helper to scan a directory recursively
    const scanDirectory = async (dir: string, currentFolder = '') => {
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            await scanDirectory(fullPath, currentFolder ? `${currentFolder}/${entry.name}` : entry.name);
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'].includes(ext)) {
              try {
                const fileStat = await stat(fullPath);
                const relFolder = currentFolder || 'general';
                const url = `/uploads/${currentFolder ? `${currentFolder}/` : ''}${entry.name}`;
                images.push({
                  url,
                  filename: entry.name,
                  folder: relFolder,
                  size: fileStat.size,
                  createdAt: (fileStat.birthtime || fileStat.mtime).toISOString(),
                });
              } catch {}
            }
          }
        }
      } catch (err) {
        // Directory might not exist yet
      }
    };

    await scanDirectory(uploadsBaseDir);

    // Sort newest first
    images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error('Error listing uploads:', error);
    return NextResponse.json({ error: error.message || 'Failed to list uploads' }, { status: 500 });
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
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
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
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { url } = await req.json();
    if (!url || !url.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Remove leading slash and resolve relative to public
    const cleanRelPath = url.replace(/^\//, '');
    const fullPath = path.resolve(process.cwd(), 'public', cleanRelPath);
    const uploadsBase = path.resolve(process.cwd(), 'public', 'uploads');

    // Security check: ensure path is within public/uploads
    if (!fullPath.startsWith(uploadsBase)) {
      return NextResponse.json({ error: 'Unauthorized file path' }, { status: 403 });
    }

    await unlink(fullPath);
    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete file' }, { status: 500 });
  }
}
