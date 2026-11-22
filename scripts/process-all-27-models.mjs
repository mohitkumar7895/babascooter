import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import mysql from 'mysql2/promise';

async function processImagesAndSeed() {
  console.log('--- Step 1: Reading img_report.json ---');
  const report = JSON.parse(fs.readFileSync('img_report.json', 'utf8'));

  const outputBase = path.join('public', 'models');
  if (!fs.existsSync(outputBase)) {
    fs.mkdirSync(outputBase, { recursive: true });
  }

  // Model names corresponding to the 27 sets
  const modelNames = [
    { name: 'FRENDO Prime B-1', code: 'FR-B1', cat: 'City Scooters', desc: 'Sleek aerodynamic urban commuter featuring digital meter and central locking.' },
    { name: 'FRENDO Ultra Sport', code: 'FR-US', cat: 'Sport Series', desc: 'High-torque BLDC motor with front disc brake and dual-tone sport styling.' },
    { name: 'FRENDO Falcon ZL', code: 'FR-ZL', cat: 'Performance', desc: 'Heavy-duty steel chassis with extended dickey storage and copper motor wiring.' },
    { name: 'FRENDO Cruiser V8', code: 'FR-V8', cat: 'City Scooters', desc: 'Plush ergonomic seating, reverse parking assist, and smooth dual suspension.' },
    { name: 'FRENDO Turbo ACT', code: 'FR-ACT', cat: 'Performance', desc: 'Enhanced ground clearance with 12-inch wheels and multi-stage controller.' },
    { name: 'FRENDO Apex OL', code: 'FR-OL', cat: 'Sport Series', desc: 'Futuristic LED projector headlamp, anti-theft alarm, and instant pick-up.' },
    { name: 'FRENDO Elegance UL', code: 'FR-UL', cat: 'City Scooters', desc: 'Ultra-refined city ride engineered for comfortable daily office and family travel.' },
    { name: 'FRENDO Stealth JL', code: 'FR-JL', cat: 'Sport Series', desc: 'Aggressive sport profile with wide alloy rims and precision hydraulic disc.' },
    { name: 'FRENDO Dynamic F5', code: 'FR-F5', cat: 'Performance', desc: 'Track-inspired electric scooter engineered for rapid acceleration.' },
    { name: 'FRENDO Royale PRM', code: 'FR-PRM', cat: 'City Scooters', desc: 'Premium chrome accents, spacious floorboard, and USB mobile charging port.' },
    { name: 'FRENDO Storm RBT', code: 'FR-RBT', cat: 'Sport Series', desc: 'All-weather durable composite panels with heavy-duty shock absorbers.' },
    { name: 'FRENDO Sprint VNC', code: 'FR-VNC', cat: 'City Scooters', desc: 'Agile lightweight urban commuter with low seat height and effortless handling.' },
    { name: 'FRENDO Velocity F1', code: 'FR-F1', cat: 'Sport Series', desc: 'Signature sport edition with LED daytime running lights and regenerative braking.' },
    { name: 'FRENDO Pro Max', code: 'FR-PMAX', cat: 'Performance', desc: 'High-capacity dual battery bay supporting up to 300 KM extended range.' },
    { name: 'FRENDO Eco Rider', code: 'FR-ECO', cat: 'City Scooters', desc: 'Maximum energy efficiency delivering ultra-low running cost of 15p per km.' },
    { name: 'FRENDO Glide Special', code: 'FR-GLIDE', cat: 'City Scooters', desc: 'Smooth whisper-quiet electric drive with front glove box and bag hook.' },
    { name: 'FRENDO Thunder GT', code: 'FR-GT', cat: 'Sport Series', desc: 'High-power output engineered for steep flyovers and dual passenger comfort.' },
    { name: 'FRENDO Classic Neo', code: 'FR-NEO', cat: 'City Scooters', desc: 'Retro modern styling paired with advanced digital console and remote key.' },
    { name: 'FRENDO Spark City', code: 'FR-SPK', cat: 'City Scooters', desc: 'Compact footprint perfect for dense city traffic and narrow parking lanes.' },
    { name: 'FRENDO Horizon Tour', code: 'FR-HZN', cat: 'Performance', desc: 'Long-range cruiser with cushioned pillion backrest and wide tubeless tyres.' },
    { name: 'FRENDO Matrix DX', code: 'FR-MTX', cat: 'Sport Series', desc: 'Sharp sharp body angles, front disc brake, and high-efficiency copper motor.' },
    { name: 'FRENDO Accessible Trike', code: 'FR-ACC', cat: 'Special Mobility', desc: 'Dedicated self-balancing mobility scooter for senior citizens and differently-abled riders.' },
    { name: 'FRENDO 2-Wheel Cargo', code: 'FR-C2W', cat: 'Commercial Loaders', desc: 'Reinforced rear carrier designed for delivery executives and commercial parcels.' },
    { name: 'FRENDO 3-Wheel Delivery Loader', code: 'FR-L3W', cat: 'Commercial Loaders', desc: 'Heavy payload 300kg commercial 3-wheel electric loader with hydraulic brakes.' },
    { name: 'FRENDO 3-Wheel Jali Cargo Loader', code: 'FR-JAL', cat: 'Commercial Loaders', desc: 'High-volume mesh cage cargo loader designed for logistics, e-commerce, and milk crates.' },
    { name: 'FRENDO Heavy Hauler Trike', code: 'FR-HHL', cat: 'Commercial Loaders', desc: 'Industrial electric trike with extra-torque differential gear and steel bed.' },
    { name: 'FRENDO Express Fleet', code: 'FR-EXP', cat: 'Commercial Loaders', desc: 'Fleet-ready electric scooter with reinforced chassis for rapid last-mile delivery.' },
  ];

  const processedModels = [];

  for (let i = 0; i < report.length; i++) {
    const grp = report[i];
    const setNum = i + 1;
    const modelMeta = modelNames[i] || {
      name: `FRENDO Series Model ${setNum}`,
      code: `FR-M${setNum < 10 ? '0' + setNum : setNum}`,
      cat: 'City Scooters',
      desc: 'High-performance FRENDO electric scooter featuring digital meter and reverse gear.'
    };

    const setFolder = path.join(outputBase, `set-${setNum}`);
    if (!fs.existsSync(setFolder)) {
      fs.mkdirSync(setFolder, { recursive: true });
    }

    const processedImgs = [];

    for (let j = 0; j < grp.items.length; j++) {
      const srcFile = path.join('public', 'img', grp.items[j].name);
      const outName = j === 0 ? 'main.jpg' : `thumb-${j}.jpg`;
      const outFile = path.join(setFolder, outName);
      const publicUrl = `/models/set-${setNum}/${outName}`;

      // High-quality resize without blur/distortion
      // Normalize to 1200x900 or 1200x1200 preserving aspect with sharp edge-fill
      const meta = await sharp(srcFile).metadata();
      const targetW = 1200;
      const targetH = Math.round((meta.height / meta.width) * 1200) || 900;

      await sharp(srcFile)
        .rotate() // auto-orient
        .resize(targetW, targetH, { fit: 'inside', withoutEnlargement: false })
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(outFile);

      processedImgs.push({
        url: publicUrl,
        isPrimary: j === 0,
        sortOrder: j,
        alt: `${modelMeta.name} view ${j + 1}`
      });
    }

    processedModels.push({
      setNum,
      name: modelMeta.name,
      modelNumber: modelMeta.code,
      slug: modelMeta.code.toLowerCase(),
      category: modelMeta.cat,
      description: modelMeta.desc,
      images: processedImgs,
      price: 15000,
      priceLabel: 'Starting ₹15,000/-',
      availability: 'Showroom In Stock'
    });

    console.log(`Processed Set ${setNum}: ${modelMeta.name} (${processedImgs.length} images)`);
  }

  // Save JSON map for quick frontend access
  fs.writeFileSync('public/models/models_catalog.json', JSON.stringify(processedModels, null, 2), 'utf8');
  console.log('Saved models_catalog.json');

  // Step 2: Seed Database
  console.log('--- Step 2: Seeding MySQL babascooty ---');
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'babascooty',
  });

  // Ensure categories exist
  const cats = [
    { name: 'City Scooters', slug: 'city-scooters' },
    { name: 'Sport Series', slug: 'sport-series' },
    { name: 'Performance', slug: 'performance' },
    { name: 'Commercial Loaders', slug: 'commercial-loaders' },
    { name: 'Special Mobility', slug: 'special-mobility' },
  ];

  for (const c of cats) {
    await pool.execute(
      'INSERT INTO categories (name, slug) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)',
      [c.name, c.slug]
    );
  }

  // Fetch category IDs
  const [catRows] = await pool.query('SELECT id, slug FROM categories');
  const catMap = {};
  catRows.forEach(r => { catMap[r.slug] = r.id; });

  // Update or insert all 27 models in products table
  for (const m of processedModels) {
    const catSlug = m.category.toLowerCase().replace(/\s+/g, '-');
    const catId = catMap[catSlug] || catRows[0].id;

    // Check if product exists by slug or model_number
    const [exist] = await pool.query('SELECT id FROM products WHERE slug = ? OR model_number = ?', [m.slug, m.modelNumber]);

    let productId;
    if (exist.length > 0) {
      productId = exist[0].id;
      await pool.execute(
        `UPDATE products SET 
          name = ?, model_number = ?, category_id = ?, short_description = ?, 
          price = ?, price_label = ?, availability = ?, is_published = TRUE, is_featured = ?
         WHERE id = ?`,
        [m.name, m.modelNumber, catId, m.description, m.price, m.priceLabel, m.availability, m.setNum <= 8, productId]
      );
    } else {
      const [res] = await pool.execute(
        `INSERT INTO products 
          (name, model_number, slug, category_id, short_description, price, price_label, availability, is_published, is_featured, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?)`,
        [m.name, m.modelNumber, m.slug, catId, m.description, m.price, m.priceLabel, m.availability, m.setNum <= 8, m.setNum]
      );
      productId = res.insertId;
    }

    // Insert or update specifications
    await pool.execute(
      `INSERT INTO product_specifications 
        (product_id, motor_power, battery_voltage, controller, front_tyre, rear_tyre, brakes, central_locking, digital_meter, reverse_gear)
       VALUES (?, '1000W / 1500W Copper Motor', '48V / 60V / 72V', 'Multi-Stage Intelligent', '90/90-12 Tubeless', '90/90-10 Tubeless', 'Front Hydraulic Disc', 'Yes', 'Yes', 'Yes')
       ON DUPLICATE KEY UPDATE 
        motor_power = VALUES(motor_power),
        battery_voltage = VALUES(battery_voltage),
        brakes = VALUES(brakes)`,
      [productId]
    );

    // Refresh images for product
    await pool.execute('DELETE FROM product_images WHERE product_id = ?', [productId]);
    for (const img of m.images) {
      await pool.execute(
        `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [productId, img.url, img.alt, img.isPrimary, img.sortOrder]
      );
    }
  }

  // Update contact settings with new phone & website
  await pool.execute(
    `UPDATE contact_settings SET 
      primary_phone = '9953564151',
      additional_phones = '09211086570',
      whatsapp_number = '9953564151',
      email = 'info@frendo.in'
     WHERE id = 1`
  );

  console.log('✅ Successfully processed all 27 models and synced with MySQL database!');
  await pool.end();
}

processImagesAndSeed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
