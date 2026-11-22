import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import mysql from 'mysql2/promise';

const USER_UPLOADS = 'C:/Users/Mohit Kumar/.gemini/antigravity/brain/f63d20cd-5969-45a6-aaee-e9fdaade940c/.user_uploaded';
const PRODUCTS_BASE = 'd:/Projects Provisioningtech/babascooter/public/images/products';

const SETS = [
  {
    slug: '3-wheel-loader',
    productId: 17,
    modelName: 'FRENDO 3-Wheel Loader',
    isWhiteBg: true,
    images: [
      { file: 'media_1795352112966_54c25337.jpg', name: 'main.png', alt: 'FRENDO 3-Wheel Loader - Studio Profile with Cargo Basket', isPrimary: true, sort: 1 },
      { file: 'media_1795352112966_54c25337.jpg', name: 'angle.png', alt: 'FRENDO 3-Wheel Loader - Showroom Three-Quarter Angle', isPrimary: false, sort: 2 },
      { file: 'media_1795352118153_18b30577.jpg', name: 'side.png', alt: 'FRENDO 3-Wheel Loader - Heavy Duty Diamond Flatbed & Differential Axle', isPrimary: false, sort: 3 },
      { file: 'media_1795352118153_18b30577.jpg', name: 'wheel.png', alt: 'FRENDO 3-Wheel Loader - Heavy Commercial Wheels & Rear Axle', isPrimary: false, sort: 4 },
      { file: 'media_1795352112966_54c25337.jpg', name: 'cockpit.png', alt: 'FRENDO 3-Wheel Loader - Driver Cockpit & Handlebar Controls', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'handicapped-model',
    productId: 15,
    modelName: 'FRENDO Handicapped Model',
    isWhiteBg: true,
    images: [
      { file: 'media_1795352283199_f2edab49.jpg', name: 'main.png', alt: 'FRENDO Handicapped Model - Special Mobility 3-Wheeler Studio Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795352283199_f2edab49.jpg', name: 'angle.png', alt: 'FRENDO Handicapped Model - Front Three-Quarter Dynamic Stance', isPrimary: false, sort: 2 },
      { file: 'media_1795352297820_fcd7693a.jpg', name: 'side.png', alt: 'FRENDO Handicapped Model - Ergonomic Low-Floor Chassis & Seating', isPrimary: false, sort: 3 },
      { file: 'media_1795352288319_19c4d1af.jpg', name: 'wheel.png', alt: 'FRENDO Handicapped Model - Dual Rear Safety Balance Wheels & Differential', isPrimary: false, sort: 4 },
      { file: 'media_1795352293097_02a5569f.jpg', name: 'cockpit.png', alt: 'FRENDO Handicapped Model - Rear View Showing Carrier & Wide Track Base', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-16-vn-c',
    productId: 13,
    modelName: 'FRENDO B-16 VN-C',
    isWhiteBg: false,
    images: [
      { file: 'media_1795352134854_074e0318.jpg', name: 'main.png', alt: 'FRENDO B-16 VN-C - Classic Vintage Vespa Stance', isPrimary: true, sort: 1 },
      { file: 'media_1795352123205_6b6ab9d5.jpg', name: 'angle.png', alt: 'FRENDO B-16 VN-C - Front Headlamp & Chrome Mirrors', isPrimary: false, sort: 2 },
      { file: 'media_1795352129081_51fb9f6d.jpg', name: 'side.png', alt: 'FRENDO B-16 VN-C - Elegant Vespa Flank & Curved Body Profile', isPrimary: false, sort: 3 },
      { file: 'media_1795352129081_51fb9f6d.jpg', name: 'wheel.png', alt: 'FRENDO B-16 VN-C - Alloy Disc Wheels & Chrome Rear Suspension', isPrimary: false, sort: 4 },
      { file: 'media_1795352140626_2406cd30.jpg', name: 'cockpit.png', alt: 'FRENDO B-16 VN-C - Spacious Under-Seat Battery & Storage Space', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-17-f-1',
    productId: 14,
    modelName: 'FRENDO B-17 F-1',
    isWhiteBg: true,
    images: [
      { file: 'media_1795352156908_94952b8a.jpg', name: 'main.png', alt: 'FRENDO B-17 F-1 - Matte Blue Sports Aerodynamic Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795352156908_94952b8a.jpg', name: 'angle.png', alt: 'FRENDO B-17 F-1 - Front Three-Quarter Aggressive Stance', isPrimary: false, sort: 2 },
      { file: 'media_1795352161933_d6e9b969.jpg', name: 'side.png', alt: 'FRENDO B-17 F-1 - Matte Blue High-Speed Chassis & Footboard', isPrimary: false, sort: 3 },
      { file: 'media_1795352151843_837e4555.jpg', name: 'cockpit.png', alt: 'FRENDO B-17 F-1 - LED Eyebrow Projector Headlamp Console', isPrimary: false, sort: 4 },
      { file: 'media_1795352146387_db9c65cb.jpg', name: 'wheel.png', alt: 'FRENDO B-17 F-1 - Rear Aerodynamic Wing & Taillight Tail', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-15-rb-t',
    productId: 12,
    modelName: 'FRENDO B-15 RB-T',
    isWhiteBg: true,
    images: [
      { file: 'media_1795352186941_66deba19.jpg', name: 'main.png', alt: 'FRENDO B-15 RB-T - Vibrant Yellow Cruiser Studio Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795352186941_66deba19.jpg', name: 'angle.png', alt: 'FRENDO B-15 RB-T - Three-Quarter Showroom Cruiser View', isPrimary: false, sort: 2 },
      { file: 'media_1795352182088_b40745d2.jpg', name: 'side.png', alt: 'FRENDO B-15 RB-T - Classic Yellow Flank with White Piped Seat', isPrimary: false, sort: 3 },
      { file: 'media_1795352172226_eca4236b.jpg', name: 'cockpit.png', alt: 'FRENDO B-15 RB-T - Retro Round Headlamp & Chrome Handlebar', isPrimary: false, sort: 4 },
      { file: 'media_1795352176777_186cf1d3.jpg', name: 'wheel.png', alt: 'FRENDO B-15 RB-T - Rear Chrome Carrier & Vintage Taillight', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-18-pro-max',
    productId: 19,
    modelName: 'FRENDO B-18 Pro Max',
    isWhiteBg: false,
    images: [
      { file: 'media_1795352252771_7dd1dd4c.jpg', name: 'main.png', alt: 'FRENDO B-18 Pro Max - Flagship Black Commuter Road Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795352247576_ec97a488.jpg', name: 'angle.png', alt: 'FRENDO B-18 Pro Max - Dynamic Rear Three-Quarter Stance', isPrimary: false, sort: 2 },
      { file: 'media_1795352252771_7dd1dd4c.jpg', name: 'side.png', alt: 'FRENDO B-18 Pro Max - Sleek High-Strength Frame & Long Seat', isPrimary: false, sort: 3 },
      { file: 'media_1795352238265_98895fe4.jpg', name: 'cockpit.png', alt: 'FRENDO B-18 Pro Max - Triangle Projector LED & Digital Cockpit', isPrimary: false, sort: 4 },
      { file: 'media_1795352243058_561b00e4.jpg', name: 'wheel.png', alt: 'FRENDO B-18 Pro Max - Rear Red Tail Illumination & Disc Brake', isPrimary: false, sort: 5 }
    ]
  },
  {
    slug: 'b-10-b-f5',
    productId: 9,
    modelName: 'FRENDO B-10 B-F5',
    isWhiteBg: true,
    images: [
      { file: 'media_1795352268289_752fbff4.jpg', name: 'main.png', alt: 'FRENDO B-10 B-F5 - Sky Blue Racing Sport Profile', isPrimary: true, sort: 1 },
      { file: 'media_1795352268289_752fbff4.jpg', name: 'angle.png', alt: 'FRENDO B-10 B-F5 - Aerodynamic Split Eye Headlamps View', isPrimary: false, sort: 2 },
      { file: 'media_1795352272759_54d344ee.jpg', name: 'side.png', alt: 'FRENDO B-10 B-F5 - Sky Blue Side Aero Fairing & Sport Suspension', isPrimary: false, sort: 3 },
      { file: 'media_1795352257648_74b9de43.jpg', name: 'cockpit.png', alt: 'FRENDO B-10 B-F5 - Front Direct Aggressive Stance & Dual LEDs', isPrimary: false, sort: 4 },
      { file: 'media_1795352263027_dba79358.jpg', name: 'wheel.png', alt: 'FRENDO B-10 B-F5 - Rear Monoshock & Aerodynamic Brake System', isPrimary: false, sort: 5 }
    ]
  }
];

async function processImageToPristine4x3(srcPath, destPath, isWhiteBg) {
  const meta = await sharp(srcPath).metadata();
  const w = meta.width;
  const h = meta.height;

  const targetRatio = 4 / 3; // 1.333333
  const currentRatio = w / h;

  let bg = { r: 255, g: 255, b: 255, alpha: 1 };

  if (!isWhiteBg) {
    // Sample edges for background
    const { data } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
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

  let top = 0, bottom = 0, left = 0, right = 0;

  // Add 4% padding all around so wheels / handlebars / mirrors never touch border
  const padV = Math.round(h * 0.04);
  const padH = Math.round(w * 0.04);
  
  const paddedW = w + (padH * 2);
  const paddedH = h + (padV * 2);
  const paddedRatio = paddedW / paddedH;

  if (paddedRatio < targetRatio) {
    // Too tall -> add more width
    const targetW = Math.round(paddedH * targetRatio);
    const diff = targetW - paddedW;
    left = padH + Math.floor(diff / 2);
    right = padH + (diff - Math.floor(diff / 2));
    top = padV;
    bottom = padV;
  } else {
    // Too wide -> add more height
    const targetH = Math.round(paddedW / targetRatio);
    const diff = targetH - paddedH;
    top = padV + Math.floor(diff / 2);
    bottom = padV + (diff - Math.floor(diff / 2));
    left = padH;
    right = padH;
  }

  // Generate ultra-high-resolution 100% quality PNG (no compression artifacts, zero pixel degradation)
  const buffer = await sharp(srcPath)
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
  console.log(`Saved ${path.basename(destPath)}: ${outMeta.width}x${outMeta.height} (ratio: ${(outMeta.width/outMeta.height).toFixed(3)})`);
}

async function main() {
  console.log('=== STARTING HIGH-RESOLUTION VEHICLE IMAGE INTEGRATION ===');

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

    // Delete existing product_images in DB
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
  console.log('\n=== ALL 7 VEHICLE SETS SUCCESSFULLY PROCESSED AND INTEGRATED! ===');
}

main().catch(err => {
  console.error('Fatal error during execution:', err);
  process.exit(1);
});
