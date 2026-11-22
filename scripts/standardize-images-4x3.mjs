import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function processAllImages() {
  console.log('--- Processing All Product Images to Perfect 4:3 Full-Fill Canvas ---');

  const baseDir = path.join(process.cwd(), 'public', 'images', 'products');
  const dirs = fs.readdirSync(baseDir).filter((d) => fs.statSync(path.join(baseDir, d)).isDirectory());

  let count = 0;

  for (const d of dirs) {
    const dirPath = path.join(baseDir, d);
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    for (const f of files) {
      const filePath = path.join(dirPath, f);
      try {
        const meta = await sharp(filePath).metadata();
        const { data } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });

        // Sample 4 corners for background color
        const w = meta.width;
        const h = meta.height;
        const ch = meta.channels || 3;

        const tl = [data[0], data[1], data[2]];
        const tr = [data[(w - 1) * ch], data[(w - 1) * ch + 1], data[(w - 1) * ch + 2]];
        const bl = [data[((h - 1) * w) * ch], data[((h - 1) * w) * ch + 1], data[((h - 1) * w) * ch + 2]];
        const br = [data[((h - 1) * w + (w - 1)) * ch], data[((h - 1) * w + (w - 1)) * ch + 1], data[((h - 1) * w + (w - 1)) * ch + 2]];

        const r = Math.round((tl[0] + tr[0] + bl[0] + br[0]) / 4);
        const g = Math.round((tl[1] + tr[1] + bl[1] + br[1]) / 4);
        const b = Math.round((tl[2] + tr[2] + bl[2] + br[2]) / 4);

        const currentRatio = w / h;
        const targetRatio = 4 / 3; // 1.3333

        let top = 0, bottom = 0, left = 0, right = 0;

        if (currentRatio < targetRatio) {
          // Too tall (portrait) -> extend left & right
          const targetWidth = Math.round(h * targetRatio);
          const diff = targetWidth - w;
          left = Math.floor(diff / 2);
          right = diff - left;
        } else if (currentRatio > targetRatio) {
          // Too wide (landscape) -> extend top & bottom
          const targetHeight = Math.round(w / targetRatio);
          const diff = targetHeight - h;
          top = Math.floor(diff / 2);
          bottom = diff - top;
        }

        if (top > 0 || bottom > 0 || left > 0 || right > 0) {
          const processedBuffer = await sharp(filePath)
            .extend({
              top,
              bottom,
              left,
              right,
              background: { r, g, b, alpha: 1 },
            })
            .png({ quality: 95 })
            .toBuffer();

          fs.writeFileSync(filePath, processedBuffer);
          count++;
        }
      } catch (err) {
        console.error(`Error processing ${f} in ${d}:`, err.message);
      }
    }
  }

  console.log(`Successfully standardized ${count} product images to 4:3 full-fill ratio!`);
}

processAllImages();
