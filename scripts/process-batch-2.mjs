import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import mysql from 'mysql2/promise';

const USER_UPLOADS = 'C:/Users/Mohit Kumar/.gemini/antigravity/brain/f63d20cd-5969-45a6-aaee-e9fdaade940c/.user_uploaded';
const PRODUCTS_BASE = 'd:/Projects Provisioningtech/babascooter/public/images/products';

const SETS = [
  {
    slug: 'b-2-d',
    productId: 2,
    modelName: 'FRENDO B-2 D',
    isWhiteBg: true,
    images: [
      { file: 'media_1795353750961_fd767566.jpg', name: 'main.png', alt: 'FRENDO B-2 D - White & Red Dual-Tone Showroom Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795353750961_fd767566.jpg', name: 'angle.png', alt: 'FRENDO B-2 D - Front Three-Quarter Dynamic Stance', isPrimary: false, sort: 2 },
      { file: 'media_1795353756763_b7411549.jpg', name: 'side.png', alt: 'FRENDO B-2 D - Dual-Tone Side Profile & Chrome Luggage Rack', isPrimary: false, sort: 3 },
      { file: 'media_1795353745443_19d2bd25.jpg', name: 'cockpit.png', alt: 'FRENDO B-2 D - Retro Circular Headlamp with Red Rim Console', isPrimary: false, sort: 4 },
      { file: 'media_1795353762584_9bba04eb.jpg', name: 'wheel.png', alt: 'FRENDO B-2 D - Rear Red Housing & Wide Rear Tire', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-20-eco-rider',
    productId: 20,
    modelName: 'FRENDO B-20 Eco Rider',
    isWhiteBg: false,
    images: [
      { file: 'media_1795353776276_ed250888.jpg', name: 'main.png', alt: 'FRENDO B-20 Eco Rider - Cream Beige Classic Stance', isPrimary: true, sort: 1 },
      { file: 'media_1795353768761_3e2493ed.jpg', name: 'angle.png', alt: 'FRENDO B-20 Eco Rider - Front Direct Dual Grille View', isPrimary: false, sort: 2 },
      { file: 'media_1795353798982_6ecacb59.jpg', name: 'side.png', alt: 'FRENDO B-20 Eco Rider - Side Profile with Dual Shocks', isPrimary: false, sort: 3 },
      { file: 'media_1795353781560_fc92a894.jpg', name: 'cockpit.png', alt: 'FRENDO B-20 Eco Rider - Rear Three-Quarter Stance', isPrimary: false, sort: 4 },
      { file: 'media_1795353776276_ed250888.jpg', name: 'wheel.png', alt: 'FRENDO B-20 Eco Rider - Alloy Wheels & Electric Motor Hub', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-4-ch-v',
    productId: 4,
    modelName: 'FRENDO B-4 CH-V',
    isWhiteBg: true,
    images: [
      { file: 'media_1795353824545_7313d766.jpg', name: 'main.png', alt: 'FRENDO B-4 CH-V - Crimson Metallic Red Studio Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795353829902_32b38072.jpg', name: 'angle.png', alt: 'FRENDO B-4 CH-V - Front Three-Quarter Dynamic Stance', isPrimary: false, sort: 2 },
      { file: 'media_1795353817843_3920708c.jpg', name: 'side.png', alt: 'FRENDO B-4 CH-V - Crimson Red Side Profile with Silver Bezel', isPrimary: false, sort: 3 },
      { file: 'media_1795353806366_f17aeb73.jpg', name: 'cockpit.png', alt: 'FRENDO B-4 CH-V - Pentagonal High-Beam LED Projector Headlamp', isPrimary: false, sort: 4 },
      { file: 'media_1795353811449_ec08c844.jpg', name: 'wheel.png', alt: 'FRENDO B-4 CH-V - Rear Tail Lamp Cluster & Disc Brake', isPrimary: false, sort: 5 }
    ]
  }
];

async function processImageToPristine4x3(srcPath, destPath, isWhiteBg) {
  let pipeline = sharp(srcPath);
  let meta = await pipeline.metadata();

  // If image is small (e.g. 500px), upscale using Lanczos3 to 1000px so it matches 1024px quality
  if (meta.width < 800) {
    const scale = 2;
    pipeline = pipeline.resize(meta.width * scale, meta.height * scale, {
      kernel: sharp.kernel.lanczos3
    });
    meta = await pipeline.metadata();
  }

  const w = meta.width;
  const h = meta.height;
  const targetRatio = 4 / 3;

  let bg = { r: 255, g: 255, b: 255, alpha: 1 };

  if (!isWhiteBg) {
    const { data } = await pipeline.raw().toBuffer({ resolveWithObject: true });
    const ch = meta.channels || 3;
    const tl = [data[0], data[1], data[2]];
    const tr = [data[(w - 1) * ch], data[(w - 1) * ch + 1], data[(w - 1) * ch + 2]];
    const bl = [data[((h - 1) * w) * ch], data[((h - 1) * w) * ch + 1], data[((h - 1) * w) * ch + 2]];
    const br = [data[((h - 1) * w + (w - 1)) * ch], data[((h - 1) * w + (w - 1)) * ch + 1], data[((h - 1) * w + (w - 1)) * ch + 2]];
    bg = {
      r: Math.round((tl[0] + tr[0] + bl[0] + br[0]) / 4),
      g: Math.round((tl[1] + tr[1] + bl[1] + br[1]) / 4),
      b: Math.round((tl[2] + tr[2] + bl[2] + br[2]) / 4),
      alpha: 1
    };
  }

  const padV = Math.round(h * 0.04);
  const padH = Math.round(w * 0.04);
  const paddedW = w + (padH * 2);
  const paddedH = h + (padV * 2);
  const paddedRatio = paddedW / paddedH;

  let top = 0, bottom = 0, left = 0, right = 0;

  if (paddedRatio < targetRatio) {
    const targetW = Math.round(paddedH * targetRatio);
    const diff = targetW - paddedW;
    left = padH + Math.floor(diff / 2);
    right = padH + (diff - Math.floor(diff / 2));
    top = padV;
    bottom = padV;
  } else {
    const targetH = Math.round(paddedW / targetRatio);
    const diff = targetH - paddedH;
    top = padV + Math.floor(diff / 2);
    bottom = padV + (diff - Math.floor(diff / 2));
    left = padH;
    right = padH;
  }

  const buffer = await pipeline
    .extend({
      top,
      bottom,
      left,
      right,
      background: bg
    })
    .png({ quality: 100, compressionLevel: 6, adaptiveFiltering: true })
    .toBuffer();

  fs.writeFileSync(destPath, buffer);
  const outMeta = await sharp(destPath).metadata();
  console.log(`Saved ${path.basename(destPath)}: ${outMeta.width}x${outMeta.height}`);
}

async function main() {
  console.log('=== PROCESSING BATCH 2 VEHICLE SETS ===');

  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'babascooty'
  });

  for (const set of SETS) {
    console.log(`\n--- Processing Set: ${set.modelName} (${set.slug}) ---`);
    const targetDir = path.join(PRODUCTS_BASE, set.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    await connection.execute('DELETE FROM product_images WHERE product_id = ?', [set.productId]);

    for (const item of set.images) {
      const srcPath = path.join(USER_UPLOADS, item.file);
      const destPath = path.join(targetDir, item.name);

      await processImageToPristine4x3(srcPath, destPath, set.isWhiteBg);

      const dbUrl = `/images/products/${set.slug}/${item.name}`;
      await connection.execute(
        `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [set.productId, dbUrl, item.alt, item.isPrimary ? 1 : 0, item.sort]
      );
    }

    console.log(`Updated database and files for ${set.modelName}!`);
  }

  await connection.end();
  console.log('\n=== BATCH 2 SUCCESSFULLY INTEGRATED! ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
