import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
}

export async function saveUploadedFile(file: File, folder = 'products'): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${timestamp}_${safeName}`;

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  const url = `/uploads/${folder}/${filename}`;
  return {
    url,
    filename,
    size: file.size,
  };
}
