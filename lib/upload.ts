import { query } from '@/lib/db';

export interface UploadResult {
  url: string;
  filename: string;
  folder: string;
  size: number;
  mimeType: string;
}

export interface MediaListItem {
  url: string;
  filename: string;
  folder: string;
  size: number;
  createdAt: string;
}

let mediaTableReady = false;

export async function ensureMediaTable(): Promise<void> {
  if (mediaTableReady) return;
  await query(`
    CREATE TABLE IF NOT EXISTS media_files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      folder VARCHAR(100) NOT NULL DEFAULT 'products',
      filename VARCHAR(255) NOT NULL,
      url VARCHAR(500) NOT NULL UNIQUE,
      mime_type VARCHAR(100) NOT NULL,
      size INT NOT NULL,
      data LONGBLOB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_media_folder (folder),
      INDEX idx_media_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  mediaTableReady = true;
}

function sanitizeFolder(folder: string): string {
  const cleaned = (folder || 'products')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '');
  return cleaned || 'products';
}

export async function saveUploadedFile(file: File, folder = 'products'): Promise<UploadResult> {
  await ensureMediaTable();

  const safeFolder = sanitizeFolder(folder);
  const bytes = await file.arrayBuffer();
  let buffer: Buffer = Buffer.from(bytes);
  let mimeType = file.type || 'application/octet-stream';

  const timestamp = Date.now();
  const baseSafeName = (file.name || 'image')
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_');

  let finalFilename = `${timestamp}_${baseSafeName}`;

  // Optimize raster images with sharp to keep DB storage lean and page loads fast
  if (['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(mimeType)) {
    try {
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;
      const optimized = await sharp(buffer)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 84 })
        .toBuffer();

      buffer = optimized;
      mimeType = 'image/webp';
      const stem = baseSafeName.replace(/\.[^.]+$/, '') || 'image';
      finalFilename = `${timestamp}_${stem}.webp`;
    } catch (err) {
      // Gracefully keep original buffer if sharp is unavailable in a runtime
      console.warn('Image optimization skipped, storing original buffer:', err);
    }
  }

  const url = `/api/media/${safeFolder}/${finalFilename}`;

  await query(
    `INSERT INTO media_files (folder, filename, url, mime_type, size, data)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [safeFolder, finalFilename, url, mimeType, buffer.length, buffer]
  );

  return {
    url,
    filename: finalFilename,
    folder: safeFolder,
    size: buffer.length,
    mimeType,
  };
}

export async function listStoredMediaFiles(): Promise<MediaListItem[]> {
  await ensureMediaTable();
  const rows = await query<
    Array<{
      url: string;
      filename: string;
      folder: string;
      size: number;
      created_at: Date | string;
    }>
  >(
    `SELECT url, filename, folder, size, created_at
     FROM media_files
     ORDER BY created_at DESC`
  );

  return (rows || []).map((row) => ({
    url: row.url,
    filename: row.filename,
    folder: row.folder || 'general',
    size: Number(row.size) || 0,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at || Date.now()).toISOString(),
  }));
}

export async function deleteStoredMediaFile(url: string): Promise<boolean> {
  await ensureMediaTable();
  const res: any = await query('DELETE FROM media_files WHERE url = ?', [url]);
  return Boolean(res && res.affectedRows > 0);
}
