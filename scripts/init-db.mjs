import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

async function initDB() {
  console.log('--- Initializing Baba Marketing FRENDO Database ---');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('Connected to MySQL server.');

  // Create database if not exists
  await connection.query('CREATE DATABASE IF NOT EXISTS `babascooty` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
  await connection.query('USE `babascooty`;');
  console.log('Using database babascooty.');

  // Run schema
  const schemaSql = fs.readFileSync(path.join(process.cwd(), 'scripts', 'schema.sql'), 'utf-8');
  await connection.query(schemaSql);
  console.log('Schema executed successfully.');

  // 1. Seed Admin
  const adminPassword = await bcrypt.hash('Admin@Baba2026', 10);
  await connection.query(
    `INSERT INTO admins (username, email, password_hash, name, role) 
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
       password_hash = VALUES(password_hash),
       email = VALUES(email),
       name = VALUES(name);`,
    ['admin', 'admin@babamarketing.in', adminPassword, 'Baba Marketing Administrator', 'superadmin']
  );
  console.log('Admin account verified: admin / Admin@Baba2026');

  // 2. Seed Categories
  const categories = [
    { name: 'City Scooters', slug: 'city-scooters', description: 'Agile, efficient electric scooters ideal for everyday urban commuting.' },
    { name: 'Performance Scooters', slug: 'performance-scooters', description: 'High-torque 1500W electric scooties with high speed and rugged build.' },
    { name: 'Sport Cruisers', slug: 'sport-cruisers', description: 'Aerodynamic, stylish scooters with racing aesthetics and fast acceleration.' },
    { name: 'Premium Commuters', slug: 'premium-commuters', description: 'Executive comfort with spacious footboard, premium suspension, and extra range.' },
    { name: 'Commercial Loaders', slug: 'commercial-loaders', description: 'Heavy-payload 2-wheel and 3-wheel electric loaders for delivery fleets and merchants.' },
    { name: 'Special Mobility', slug: 'special-mobility', description: 'Engineered for independent, safe, and stable accessible mobility.' },
  ];

  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    await connection.query(
      `INSERT INTO categories (name, slug, description, sort_order)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), sort_order=VALUES(sort_order);`,
      [c.name, c.slug, c.description, i + 1]
    );
  }
  console.log('Categories seeded.');

  // Retrieve category IDs
  const [catRows] = await connection.query('SELECT id, slug FROM categories');
  const catMap = {};
  catRows.forEach((r) => {
    catMap[r.slug] = r.id;
  });

  // 3. Seed 20 Models (18 PDF Models + 2 Slots)
  const modelsData = [
    {
      name: 'FRENDO B-1 S',
      model_number: 'B-1 S',
      slug: 'b-1-s',
      cat_slug: 'city-scooters',
      motor_power: '1000W BLDC Hub Motor',
      battery_voltage: '48V / 60V Dual Mode',
      controller: '48V/60V Intelligent Vector Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '10-Inch Tubeless High-Traction Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Sleek and agile urban electric scooter engineered for effortless daily city commuting and low running cost.',
      detailed_description: 'The FRENDO B-1 S is designed for riders who demand agility, efficiency, and stylish aesthetics. Powered by a dependable 1000W BLDC motor with 48V/60V multi-voltage compatibility, it gives smooth acceleration across city traffic. It features a responsive front hydraulic disc brake, reverse parking gear, central anti-theft locking, and a vivid digital speedometer cluster.',
      is_featured: true,
      price: null,
      sort_order: 1,
    },
    {
      name: 'FRENDO B-2 D',
      model_number: 'B-2 D',
      slug: 'b-2-d',
      cat_slug: 'city-scooters',
      motor_power: '1000W BLDC Hub Motor',
      battery_voltage: '48V / 60V Dual Mode',
      controller: '48V/60V Intelligent Vector Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '10-Inch Tubeless High-Traction Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Dynamic dual-tone electric scooter built with reinforced steel frame and comfortable upright seating.',
      detailed_description: 'Engineered with balanced weight distribution and high-tensile steel construction, the FRENDO B-2 D delivers supreme rider comfort. The 1000W motor provides instant response, while the 12-inch front wheel glides smoothly over road potholes.',
      is_featured: true,
      price: null,
      sort_order: 2,
    },
    {
      name: 'FRENDO B-3 ZL',
      model_number: 'B-3 ZL',
      slug: 'b-3-zl',
      cat_slug: 'city-scooters',
      motor_power: '1000W BLDC Hub Motor',
      battery_voltage: '48V / 60V Dual Mode',
      controller: '48V/60V Intelligent Vector Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '10-Inch Tubeless High-Traction Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Contemporary aerodynamic electric scooter designed for young professionals and smart city travelers.',
      detailed_description: 'FRENDO B-3 ZL stands out with sleek aerodynamic body contours, brilliant LED lighting, and exceptional battery economy. Equipped with 1000W motor, disc brakes, and full security system.',
      is_featured: false,
      price: null,
      sort_order: 3,
    },
    {
      name: 'FRENDO B-4 CH-V',
      model_number: 'B-4 CH-V',
      slug: 'b-4-ch-v',
      cat_slug: 'performance-scooters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '10-Inch Tubeless Heavy Grip Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'High-torque 1500W scooter with 60V/72V controller designed for rapid acceleration and effortless hill climbing.',
      detailed_description: 'The FRENDO B-4 CH-V unleashes raw electric power with its 1500W motor setup. Perfect for riders carrying heavy pillion weight or navigating hilly terrain. Comes with advanced electronic braking, reverse gear, and anti-theft ignition cut-off.',
      is_featured: true,
      price: null,
      sort_order: 4,
    },
    {
      name: 'FRENDO B-5 ACT',
      model_number: 'B-5 ACT',
      slug: 'b-5-act',
      cat_slug: 'performance-scooters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre (Dual 12" Setup)',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Athletic dual 12-inch wheel configuration providing maximum ground clearance and supreme stability.',
      detailed_description: 'Equipped with matching 12-inch wheels both front and rear, the B-5 ACT conquers speed bumps and rough road surfaces with ease. The 1500W motor and 72V capability deliver commanding road presence.',
      is_featured: true,
      price: null,
      sort_order: 5,
    },
    {
      name: 'FRENDO B-7 O-L',
      model_number: 'B-7 O-L',
      slug: 'b-7-o-l',
      cat_slug: 'performance-scooters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Futuristic styling with dual 12-inch wheels, powerful projector headlamp, and high energy efficiency.',
      detailed_description: 'The FRENDO B-7 O-L is designed for discerning riders who appreciate premium road stance. Features 1500W motor, 60V/72V controller, dual 12-inch alloy wheels, front disc brake, and smart remote features.',
      is_featured: false,
      price: null,
      sort_order: 6,
    },
    {
      name: 'FRENDO B-8 U-L',
      model_number: 'B-8 U-L',
      slug: 'b-8-u-l',
      cat_slug: 'performance-scooters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Ultra-refined city cruiser boasting high-output 1500W propulsion and responsive electronic control.',
      detailed_description: 'Engineered for smooth highway and city riding alike. The FRENDO B-8 U-L combines dual 12-inch wheels with 1500W powertrain and reinforced suspension for a cloud-like ride.',
      is_featured: false,
      price: null,
      sort_order: 7,
    },
    {
      name: 'FRENDO B-9 J-L',
      model_number: 'B-9 J-L',
      slug: 'b-9-j-l',
      cat_slug: 'performance-scooters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Bold urban commuter with premium suspension, spacious under-seat storage, and dual 12-inch wheels.',
      detailed_description: 'FRENDO B-9 J-L delivers heavy-duty commuting with zero petrol expense. Features 1500W motor, 60V/72V controller, dual 12-inch wheels, front disc brake, reverse gear, and remote central locking.',
      is_featured: false,
      price: null,
      sort_order: 8,
    },
    {
      name: 'FRENDO B-10 B-F5',
      model_number: 'B-10 B-F5',
      slug: 'b-10-b-f5',
      cat_slug: 'performance-scooters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'High-speed sports edition engineered with aerodynamic front apron and racing livery styling.',
      detailed_description: 'The FRENDO B-10 B-F5 brings track-inspired spirit to city streets. Powered by a heavy-duty 1500W motor and dual 12-inch alloy wheels, it offers remarkable cornering grip and prompt stopping power.',
      is_featured: true,
      price: null,
      sort_order: 9,
    },
    {
      name: 'FRENDO B-13 PR-M',
      model_number: 'B-13 PR-M',
      slug: 'b-13-pr-m',
      cat_slug: 'premium-commuters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Executive class commuter offering luxurious wide seating, generous legroom, and high load capacity.',
      detailed_description: 'Experience first-class comfort with the FRENDO B-13 PR-M. Featuring an extended wheelbase, plush cushioning, dual 12-inch wheels, 1500W motor, and multi-mode digital instrumentation.',
      is_featured: false,
      price: null,
      sort_order: 10,
    },
    {
      name: 'FRENDO B-14 V-8',
      model_number: 'B-14 V-8',
      slug: 'b-14-v-8',
      cat_slug: 'premium-commuters',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Robust all-road commuter built to handle heavy daily mileage with minimal maintenance.',
      detailed_description: 'With heavy-gauge frame reinforcement, the FRENDO B-14 V-8 is built for riders who travel long suburban distances daily. Comes complete with 1500W motor, dual 12-inch wheels, front disc brake, and reverse parking aid.',
      is_featured: false,
      price: null,
      sort_order: 11,
    },
    {
      name: 'FRENDO B-15 RB-T',
      model_number: 'B-15 RB-T',
      slug: 'b-15-rb-t',
      cat_slug: 'sport-cruisers',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Striking sport cruiser styling with dual hydraulic shocks, vibrant paint finish, and rapid throttle response.',
      detailed_description: 'Turn heads everywhere you ride with the FRENDO B-15 RB-T. Features sleek body curves, 1500W motor, dual 12-inch tubeless wheels, front disc brake, reverse gear, and remote keyless operation.',
      is_featured: false,
      price: null,
      sort_order: 12,
    },
    {
      name: 'FRENDO B-16 VN-C',
      model_number: 'B-16 VN-C',
      slug: 'b-16-vn-c',
      cat_slug: 'sport-cruisers',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Classic vintage-inspired aesthetics merged with state-of-the-art electric vehicle efficiency.',
      detailed_description: 'Timeless retro elegance meets green energy. The FRENDO B-16 VN-C gives you classic curved body lines, modern LED halo illumination, 1500W motor, dual 12-inch wheels, and digital speed instrumentation.',
      is_featured: false,
      price: null,
      sort_order: 13,
    },
    {
      name: 'FRENDO B-17 F-1',
      model_number: 'B-17 F-1',
      slug: 'b-17-f-1',
      cat_slug: 'sport-cruisers',
      motor_power: '1500W High Torque Motor',
      battery_voltage: '60V / 72V High Voltage System',
      controller: '60V/72V Heavy-Duty Sine Wave Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '12-Inch Tubeless Alloy Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Formula-inspired aerodynamic bodywork with high-illumination LED lights and athletic stance.',
      detailed_description: 'The FRENDO B-17 F-1 is built for speed enthusiasts who value clean green performance. Powered by a 1500W motor and 72V controller, featuring dual 12-inch wheels, front disc brake, reverse gear, and central anti-theft locking.',
      is_featured: true,
      price: null,
      sort_order: 14,
    },
    {
      name: 'FRENDO Handicapped Model',
      model_number: 'Handicapped Model',
      slug: 'handicapped-model',
      cat_slug: 'special-mobility',
      motor_power: '1500W Heavy-Duty Motor',
      battery_voltage: '60V / 72V High Stability System',
      controller: '60V/72V Heavy-Duty Stabilized Controller',
      front_tyre: '12-Inch Heavy Duty Tyre',
      rear_tyre: '12-Inch Stabilized Dual-Tire Configuration',
      brakes: 'Front Disc / Rear Drum Brakes with Parking Lock',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Color LCD Console)',
      reverse_gear: 'Yes (Safe Reverse Assist with Warning Alarm)',
      short_description: 'Specially engineered high-stability electric vehicle designed for independent, safe, and comfortable mobility.',
      detailed_description: 'Designed specifically for differently-abled and senior riders, the FRENDO Handicapped Model offers supreme balance, auxiliary stabilizer wheels, wide comfortable armrest seating, easy reverse assist with audible warning, and wide floorboard. Empowers everyday independence with complete safety.',
      is_featured: true,
      price: null,
      sort_order: 15,
    },
    {
      name: 'FRENDO 2-Wheel Loader',
      model_number: '2-Wheel Loader',
      slug: '2-wheel-loader',
      cat_slug: 'commercial-loaders',
      motor_power: '1500W Heavy Commercial Motor',
      battery_voltage: '60V / 72V High Load Power System',
      controller: '60V/72V Commercial Heavy-Duty Controller',
      front_tyre: '12-Inch Reinforced Heavy-Duty Tyre',
      rear_tyre: '12-Inch Heavy-Duty Commercial Tyre',
      brakes: 'Front Disc / Rear Drum Heavy-Duty Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Commercial LCD Console)',
      reverse_gear: 'Yes (High Torque Reverse Parking Mode)',
      short_description: 'Heavy payload commercial two-wheeler featuring reinforced rear cargo carrier for delivery and logistics businesses.',
      detailed_description: 'Cut delivery and parcel logistics operating costs to practically zero. The FRENDO 2-Wheel Loader features an extra-strength rear cargo carrier frame, heavy-duty dual rear shock absorbers, 1500W high-torque motor, front disc brake, and anti-theft central locking.',
      is_featured: true,
      price: null,
      sort_order: 16,
    },
    {
      name: 'FRENDO 3-Wheel Loader',
      model_number: '3-Wheel Loader',
      slug: '3-wheel-loader',
      cat_slug: 'commercial-loaders',
      motor_power: '1500W High Torque Differential Motor',
      battery_voltage: '60V / 72V Industrial Power System',
      controller: '60V/72V Heavy Industrial Controller',
      front_tyre: '12-Inch Heavy Duty Commercial Tyre',
      rear_tyre: '12-Inch Heavy Duty Dual Commercial Tyres',
      brakes: 'Front Disc / Rear Drum Brakes with Handbrake Lock',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Industrial LCD Console)',
      reverse_gear: 'Yes (Differential Reverse Gear)',
      short_description: 'High-payload three-wheel utility loader with open steel cargo tray designed for wholesale, agricultural, and factory goods.',
      detailed_description: 'Engineered for tough industrial duty, the FRENDO 3-Wheel Loader delivers huge cost savings for transport businesses. Features an open steel cargo bed, differential rear axle drive, 1500W motor, parking handbrake, and effortless reverse gear.',
      is_featured: true,
      price: null,
      sort_order: 17,
    },
    {
      name: 'FRENDO 3-Wheel Jall Loader',
      model_number: '3-Wheel Jall Loader',
      slug: '3-wheel-loader-jali',
      cat_slug: 'commercial-loaders',
      motor_power: '1500W High Torque Differential Motor',
      battery_voltage: '60V / 72V Industrial Power System',
      controller: '60V/72V Heavy Industrial Controller',
      front_tyre: '12-Inch Heavy Duty Commercial Tyre',
      rear_tyre: '12-Inch Heavy Duty Dual Commercial Tyres',
      brakes: 'Front Disc / Rear Drum Brakes with Handbrake Lock',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital Industrial LCD Console)',
      reverse_gear: 'Yes (Differential Reverse Gear)',
      short_description: 'Enclosed wire-mesh (Jali) 3-wheel commercial loader offering high-volume protected cargo transport for parcels and supplies.',
      detailed_description: 'The FRENDO 3-Wheel Jall Loader is equipped with a tall, secure wire-mesh cargo enclosure (Jali), preventing parcels and produce from falling or getting pilfered during urban deliveries. Powered by a 1500W motor with differential drive and heavy-duty suspension.',
      is_featured: true,
      price: null,
      sort_order: 18,
    },
    {
      name: 'FRENDO B-18 Pro Max',
      model_number: 'B-18 Pro Max',
      slug: 'b-18-pro-max',
      cat_slug: 'premium-commuters',
      motor_power: '1500W Next-Gen BLDC Motor',
      battery_voltage: '60V / 72V High Energy Density',
      controller: '72V Sine Wave Smart Controller',
      front_tyre: '12-Inch Premium Alloy Tyre',
      rear_tyre: '12-Inch Premium Alloy Tyre',
      brakes: 'Front Disc / Rear Disc Brakes (Dual Disc)',
      central_locking: 'Yes (Smart Keyless Entry + Alarm)',
      digital_meter: 'Yes (Full Color TFT Digital Screen)',
      reverse_gear: 'Yes (Multi-Speed Reverse Assist)',
      short_description: 'Flagship electric scooter with dual hydraulic disc brakes, smart telemetry, and luxury showroom styling.',
      detailed_description: 'Created as an editable flagship product slot for the Baba Marketing administrator. The FRENDO B-18 Pro Max showcases state-of-the-art dual disc brakes, color TFT screen, 1500W motor, and premium luxury finishes. Ready to customize or publish directly from the admin panel.',
      is_featured: false,
      price: null,
      sort_order: 19,
    },
    {
      name: 'FRENDO B-20 Eco Rider',
      model_number: 'B-20 Eco Rider',
      slug: 'b-20-eco-rider',
      cat_slug: 'city-scooters',
      motor_power: '1200W Eco-Tuned BLDC Motor',
      battery_voltage: '48V / 60V Dual Mode',
      controller: '60V Intelligent Vector Controller',
      front_tyre: '12-Inch Tubeless Alloy Tyre',
      rear_tyre: '10-Inch Tubeless High-Traction Tyre',
      brakes: 'Front Disc / Rear Drum Brakes',
      central_locking: 'Yes (Remote Keyless + Anti-Theft Alarm)',
      digital_meter: 'Yes (Digital LCD Console)',
      reverse_gear: 'Yes (Smart Reverse Parking Assist)',
      short_description: 'Eco-tuned lightweight city scooter offering ultra-high mileage and low charging time for budget-conscious riders.',
      detailed_description: 'Created as an editable product slot for the administrator. The FRENDO B-20 Eco Rider is designed for maximum kilometers per charge, featuring an energy-tuned 1200W motor, disc braking, reverse assist, and responsive handling.',
      is_featured: false,
      price: null,
      sort_order: 20,
    },
  ];

  for (const m of modelsData) {
    const catId = catMap[m.cat_slug] || null;

    // Insert Product
    const [prodRes] = await connection.query(
      `INSERT INTO products 
        (name, model_number, slug, category_id, short_description, detailed_description, price, price_label, availability, is_featured, is_published, sort_order, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
        name=VALUES(name), model_number=VALUES(model_number), category_id=VALUES(category_id),
        short_description=VALUES(short_description), detailed_description=VALUES(detailed_description),
        availability=VALUES(availability), is_featured=VALUES(is_featured), is_published=VALUES(is_published),
        sort_order=VALUES(sort_order), meta_title=VALUES(meta_title), meta_description=VALUES(meta_description);`,
      [
        m.name,
        m.model_number,
        m.slug,
        catId,
        m.short_description,
        m.detailed_description,
        m.price,
        'Contact for Best Price',
        'In Stock',
        m.is_featured,
        true,
        m.sort_order,
        `${m.name} | Baba Marketing FRENDO Electric Scooty`,
        `Explore the new ${m.name} with ${m.motor_power}, ${m.battery_voltage}, front disc brakes, and reverse gear. Visit Baba Marketing showroom in Ballabhgarh, Faridabad.`,
      ]
    );

    // Get current product ID
    const [pRows] = await connection.query('SELECT id FROM products WHERE slug = ?', [m.slug]);
    const productId = pRows[0].id;

    // Insert or update Specifications
    await connection.query(
      `INSERT INTO product_specifications 
        (product_id, motor_power, battery_voltage, controller, front_tyre, rear_tyre, brakes, central_locking, digital_meter, reverse_gear, other_specifications)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        motor_power=VALUES(motor_power), battery_voltage=VALUES(battery_voltage), controller=VALUES(controller),
        front_tyre=VALUES(front_tyre), rear_tyre=VALUES(rear_tyre), brakes=VALUES(brakes),
        central_locking=VALUES(central_locking), digital_meter=VALUES(digital_meter), reverse_gear=VALUES(reverse_gear),
        other_specifications=VALUES(other_specifications);`,
      [
        productId,
        m.motor_power,
        m.battery_voltage,
        m.controller,
        m.front_tyre,
        m.rear_tyre,
        m.brakes,
        m.central_locking,
        m.digital_meter,
        m.reverse_gear,
        JSON.stringify([
          'All-LED High Beam Projector Headlamp',
          'Telescopic Front Hydraulic Suspension',
          'Dual Rear Spring-Loaded Shock Absorbers',
          'USB Mobile Fast Charging Port',
          'Anti-Theft Wheel Locking & Siren Alarm',
          'Heavy-Duty Foldable Pillion Footrests',
        ]),
      ]
    );

    // Insert 5 images into product_images
    // Delete existing images to avoid duplicates on re-run
    await connection.query('DELETE FROM product_images WHERE product_id = ?', [productId]);

    const imgDir = path.join(process.cwd(), 'public', 'images', 'products', m.slug);
    const imageFiles = ['main.png', 'angle.png', 'cockpit.png', 'wheel.png', 'side.png'];

    for (let idx = 0; idx < imageFiles.length; idx++) {
      const fileName = imageFiles[idx];
      const filePath = `/images/products/${m.slug}/${fileName}`;
      const altLabels = ['Studio Profile', 'Showroom Angle', 'Digital Meter & Handlebar', 'Alloy Wheel & Disc Brake', 'Chassis & Side View'];
      await connection.query(
        `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [productId, filePath, `${m.name} - ${altLabels[idx]}`, idx === 0, idx + 1]
      );
    }
  }
  console.log('Seeded all 20 products with specifications and 5 images each.');

  // 4. Contact Settings (Exact info provided by user)
  const contactData = {
    business_name: 'Baba Marketing',
    brand_name: 'FRENDO',
    tagline: 'Electric Scooty | Clean Energy | Better Tomorrow',
    address: 'BJP Office, Plot No. 4, 33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004, India.',
    primary_phone: '09211086570',
    whatsapp_number: '9811481143',
    additional_phones: JSON.stringify(['9811481143', '8800894544', '9599790799', '9958571353']),
    email: 'info@babamarketing.in',
    google_maps_url: 'https://maps.google.com/?q=BJP+Office,+Plot+No.+4,+33+Futa+Road,+Near+Deepak+Dagar,+Kaili,+Ballabhgarh,+Faridabad,+Haryana+121004',
    google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14044.254198285876!2d77.3182!3d28.3245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cd99f1c7d!2sBallabhgarh%2C+Faridabad%2C+Haryana+121004!5e0!3m2!1sen!2sin!4v1',
    opening_hours: 'Monday – Saturday: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 5:00 PM',
  };

  await connection.query('DELETE FROM contact_settings;');
  await connection.query(
    `INSERT INTO contact_settings 
      (id, business_name, brand_name, tagline, address, primary_phone, whatsapp_number, additional_phones, email, google_maps_url, google_maps_embed, opening_hours)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      contactData.business_name,
      contactData.brand_name,
      contactData.tagline,
      contactData.address,
      contactData.primary_phone,
      contactData.whatsapp_number,
      contactData.additional_phones,
      contactData.email,
      contactData.google_maps_url,
      contactData.google_maps_embed,
      contactData.opening_hours,
    ]
  );
  console.log('Contact settings seeded.');

  // 5. Homepage Sections
  const homeSections = [
    {
      section_key: 'hero',
      title: 'Ride the Future with FRENDO Electric Scooty',
      subtitle: 'Experience pure electric performance, whisper-quiet mobility, and extraordinary daily savings. Discover 20 high-performance models built for Indian roads.',
      content: 'Zero petrol bills, minimal maintenance, high-torque BLDC motors, reverse parking assist, and central locking security standard on every FRENDO model.',
      is_visible: true,
      sort_order: 1,
    },
    {
      section_key: 'featured',
      title: 'Featured Electric Scooters',
      subtitle: 'Explore our most popular and versatile electric models trusted by thousands of riders.',
      content: 'From nimble city commuters to heavy commercial loaders, FRENDO delivers reliable power with cutting-edge design.',
      is_visible: true,
      sort_order: 2,
    },
    {
      section_key: 'why_choose',
      title: 'Why Choose FRENDO Electric Mobility?',
      subtitle: 'Engineered for reliability, long battery life, and true economic freedom.',
      content: JSON.stringify([
        {
          title: 'Clean Electric Energy',
          desc: '100% zero tailpipe emissions. Breathe cleaner air while enjoying whisper-quiet, vibration-free travel.',
          icon: 'Zap',
        },
        {
          title: 'Massive Cost Savings',
          desc: 'Travel at just 15 to 20 paise per kilometer compared to skyrocketing petrol costs.',
          icon: 'PiggyBank',
        },
        {
          title: 'High-Torque Performance',
          desc: '1000W and 1500W motors paired with heavy-duty 48V/60V/72V controllers for rapid acceleration and effortless hill climbing.',
          icon: 'Gauge',
        },
        {
          title: 'Full Premium Feature Set',
          desc: 'Front disc brakes, digital instrument console, reverse parking gear, and remote central locking with alarm on every model.',
          icon: 'ShieldCheck',
        },
        {
          title: '20+ Model Options',
          desc: 'From compact city scooters to dual 12-inch cruisers, accessible mobility models, and heavy-payload commercial 3-wheel loaders.',
          icon: 'Layers',
        },
        {
          title: 'Full Showroom Support',
          desc: 'Authorized Baba Marketing sales, warranty, genuine parts, and dedicated customer assistance in Faridabad.',
          icon: 'Headphones',
        },
      ]),
      is_visible: true,
      sort_order: 3,
    },
    {
      section_key: 'catalogue',
      title: 'Complete FRENDO Model Lineup',
      subtitle: 'Browse all 20 electric scooters, cruisers, and commercial loaders available at our showroom.',
      content: 'Filter by category and explore individual technical specifications, photo galleries, and instant WhatsApp enquiry.',
      is_visible: true,
      sort_order: 4,
    },
    {
      section_key: 'promotional',
      title: 'Festival & Seasonal Special Offers',
      subtitle: 'Get exclusive exchange bonuses, free helmet & accessories, and spot delivery at Baba Marketing showroom.',
      content: 'Visit our Ballabhgarh showroom today for an exhilarating free test ride! Low down payment and fast delivery options available.',
      is_visible: true,
      sort_order: 5,
    },
    {
      section_key: 'contact',
      title: 'Visit Baba Marketing Showroom',
      subtitle: 'Experience FRENDO Electric Scooters in person. Our team is ready to assist you with live demonstrations and test rides.',
      content: 'Conveniently located at 33 Futa Road, Kaili, Ballabhgarh, Faridabad.',
      is_visible: true,
      sort_order: 6,
    },
  ];

  for (const s of homeSections) {
    await connection.query(
      `INSERT INTO homepage_sections (section_key, title, subtitle, content, is_visible, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title=VALUES(title), subtitle=VALUES(subtitle), content=VALUES(content), is_visible=VALUES(is_visible), sort_order=VALUES(sort_order);`,
      [s.section_key, s.title, s.subtitle, s.content, s.is_visible, s.sort_order]
    );
  }
  console.log('Homepage sections seeded.');

  // 6. Banners
  await connection.query('DELETE FROM banners;');
  const banners = [
    {
      title: 'Ride the Future with FRENDO',
      subtitle: 'Premium Electric Scooters Built for Modern India',
      offer_text: 'Test Ride Today | Zero Petrol | 100% Electric',
      button_text: 'Explore All Models',
      button_link: '/scooters',
      image_url: '/images/products/b-1-s/main.png',
      banner_type: 'hero',
      is_active: true,
      sort_order: 1,
    },
    {
      title: 'Special Commercial Fleet Deals',
      subtitle: 'Maximize Delivery Profits with 2-Wheel & 3-Wheel Loaders',
      offer_text: 'Heavy Payload Capacity | Up to 1500W High Torque Motor',
      button_text: 'View Commercial Loaders',
      button_link: '/scooters/3-wheel-loader',
      image_url: '/images/products/3-wheel-loader/main.png',
      banner_type: 'promo',
      is_active: true,
      sort_order: 2,
    },
  ];

  for (const b of banners) {
    await connection.query(
      `INSERT INTO banners (title, subtitle, offer_text, button_text, button_link, image_url, banner_type, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [b.title, b.subtitle, b.offer_text, b.button_text, b.button_link, b.image_url, b.banner_type, b.is_active, b.sort_order]
    );
  }
  console.log('Banners seeded.');

  // 7. SEO Settings
  const seoPages = [
    {
      page_route: '/',
      meta_title: 'Baba Marketing - FRENDO Electric Scooty | Clean Energy | Better Tomorrow',
      meta_description: 'Authorized dealer of FRENDO Electric Scooters in Ballabhgarh, Faridabad. Explore 20+ models including city scooters, 1500W high-torque bikes, and commercial loaders.',
      keywords: 'FRENDO electric scooty, Baba Marketing, electric scooter Faridabad, Ballabhgarh electric scooty, commercial electric loader, electric bike Haryana',
      canonical_url: 'http://localhost:3000/',
      og_image: '/images/products/b-1-s/main.png',
    },
    {
      page_route: '/scooters',
      meta_title: 'All Electric Scooters | FRENDO Model Catalogue | Baba Marketing',
      meta_description: 'Browse the complete range of 20 FRENDO Electric Scooty models with 1000W/1500W motors, front disc brakes, reverse gear, and central locking.',
      keywords: 'FRENDO scooters, electric scooty models, B-1 S, B-2 D, B-4 CH-V, 3-wheel loader, handicapped electric scooter',
      canonical_url: 'http://localhost:3000/scooters',
      og_image: '/images/products/b-4-ch-v/main.png',
    },
    {
      page_route: '/about',
      meta_title: 'About Baba Marketing | FRENDO Electric Scooty Authorized Partner',
      meta_description: 'Learn about Baba Marketing, our vision for clean green electric mobility, and our commitment to dependable customer service and high-quality FRENDO scooters.',
      keywords: 'About Baba Marketing, FRENDO electric scooter dealer, clean green energy, Ballabhgarh EV showroom',
      canonical_url: 'http://localhost:3000/about',
      og_image: '/images/products/b-5-act/main.png',
    },
    {
      page_route: '/contact',
      meta_title: 'Contact Baba Marketing | Call & WhatsApp FRENDO Showroom',
      meta_description: 'Get in touch with Baba Marketing for test rides, prices, and queries. Call 09211086570 or WhatsApp 9811481143. Located in Ballabhgarh, Faridabad.',
      keywords: 'Baba Marketing phone, WhatsApp FRENDO scooty, EV showroom Ballabhgarh, electric scooter contact',
      canonical_url: 'http://localhost:3000/contact',
      og_image: '/images/products/b-1-s/main.png',
    },
    {
      page_route: '/location',
      meta_title: 'Find Our Showroom | Baba Marketing Ballabhgarh Faridabad',
      meta_description: 'Visit the Baba Marketing FRENDO showroom at Plot No. 4, 33 Futa Road, Kaili, Ballabhgarh, Faridabad. Open Mon-Sat 9 AM - 8 PM.',
      keywords: 'FRENDO showroom location, Baba Marketing map, Ballabhgarh EV store directions',
      canonical_url: 'http://localhost:3000/location',
      og_image: '/images/products/b-1-s/main.png',
    },
  ];

  for (const s of seoPages) {
    await connection.query(
      `INSERT INTO seo_settings (page_route, meta_title, meta_description, keywords, canonical_url, og_image)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title), meta_description=VALUES(meta_description), keywords=VALUES(keywords), canonical_url=VALUES(canonical_url), og_image=VALUES(og_image);`,
      [s.page_route, s.meta_title, s.meta_description, s.keywords, s.canonical_url, s.og_image]
    );
  }
  console.log('SEO settings seeded.');

  // 8. Website Settings
  const webSettings = {
    website_name: 'Baba Marketing – FRENDO Electric Scooty',
    tagline: 'Electric Scooty | Clean Energy | Better Tomorrow',
    footer_text: '© 2026 Baba Marketing – FRENDO Electric Scooty. All Rights Reserved. Clean Energy | Better Tomorrow.',
    logo_text: 'BABA MARKETING',
    sub_logo_text: 'FRENDO ELECTRIC SCOOTY',
    social_facebook: 'https://facebook.com',
    social_instagram: 'https://instagram.com',
    social_youtube: 'https://youtube.com',
  };

  for (const [key, val] of Object.entries(webSettings)) {
    await connection.query(
      `INSERT INTO website_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);`,
      [key, val]
    );
  }
  console.log('Website settings seeded.');

  await connection.end();
  console.log('--- Database Initialization & Seeding Complete! ---');
}

initDB().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
