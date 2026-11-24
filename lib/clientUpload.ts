'use client';

const MAX_DIMENSION = 1600;
const COMPRESS_THRESHOLD_BYTES = 1.5 * 1024 * 1024; // 1.5 MB

/**
 * Compresses large raster images client-side before upload so uploads stay
 * well under Vercel's 4.5 MB serverless body limit and load fast.
 */
export async function compressImageForUpload(file: File): Promise<File> {
  if (
    typeof window === 'undefined' ||
    !file.type.startsWith('image/') ||
    file.type === 'image/svg+xml' ||
    file.size <= COMPRESS_THRESHOLD_BYTES
  ) {
    return file;
  }

  try {
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new window.Image();
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = objectUrl;
      });

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return file;

      ctx.drawImage(img, 0, 0, width, height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/webp', 0.84)
      );
      if (!blob || blob.size >= file.size) {
        return file;
      }

      const stem = file.name.replace(/\.[^.]+$/, '') || 'image';
      return new File([blob], `${stem}.webp`, { type: 'image/webp' });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return file;
  }
}

export async function uploadAdminImage(
  file: File,
  folder = 'products'
): Promise<{ url: string; filename: string; size: number }> {
  const preparedFile = await compressImageForUpload(file);
  const body = new FormData();
  body.append('file', preparedFile);
  body.append('folder', folder);

  const res = await fetch('/api/uploads', {
    method: 'POST',
    body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      data.error ||
        (res.status === 413
          ? 'Image is too large. Please choose a smaller image.'
          : `Upload failed (${res.status})`)
    );
  }

  return data;
}
