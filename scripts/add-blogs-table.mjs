import mysql from 'mysql2/promise';

async function initBlogs() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'babascooty',
  });

  console.log('Creating blogs table...');

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS \`blogs\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`title\` VARCHAR(255) NOT NULL,
      \`slug\` VARCHAR(255) UNIQUE NOT NULL,
      \`excerpt\` TEXT NOT NULL,
      \`content\` LONGTEXT NOT NULL,
      \`featured_image\` VARCHAR(500) NULL,
      \`category\` VARCHAR(100) DEFAULT 'EV Guide',
      \`author\` VARCHAR(100) DEFAULT 'Baba Marketing Team',
      \`read_time\` VARCHAR(50) DEFAULT '4 min read',
      \`is_published\` BOOLEAN DEFAULT TRUE,
      \`meta_title\` VARCHAR(255) NULL,
      \`meta_description\` TEXT NULL,
      \`views\` INT DEFAULT 0,
      \`published_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX \`idx_slug\` (\`slug\`),
      INDEX \`idx_published\` (\`is_published\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('Checking existing blogs count...');
  const [rows] = await pool.execute('SELECT COUNT(*) as count FROM blogs');
  if (rows[0].count === 0) {
    console.log('Seeding initial blog posts...');
    const blogs = [
      {
        title: 'Electric Scooters vs Petrol Scooters: How Much Can You Really Save in 2026?',
        slug: 'electric-scooters-vs-petrol-scooters-savings-guide-2026',
        excerpt: 'With petrol hovering near ₹95 to ₹100 per liter in Haryana and Delhi NCR, switching to a FRENDO electric scooter reduces your running cost from ₹2.50/km down to just 15 to 20 paise/km. Here is the realistic breakdown.',
        content: `## Why Running Cost Matters More Than Ever

For most daily commuters in Ballabhgarh, Faridabad, and across Delhi NCR, monthly fuel expense has become a heavy burden. An average daily commute of 35 km on a conventional petrol scooter consumes roughly 0.85 to 1 liter of petrol each day. At ₹98 per liter, that amounts to nearly ₹2,500 to ₹3,000 every single month just on petrol!

In comparison, charging a FRENDO electric scooter consumes about 1.2 to 1.8 units of domestic electricity per full charge (delivering 65 to 80 km of range). At average local electricity tariffs of ₹7 to ₹8 per unit, a complete charge costs just ₹10 to ₹14.

### The Real Numbers: Petrol vs FRENDO Electric

| Metric | 110cc Petrol Scooter | FRENDO Electric Scooty |
| :--- | :--- | :--- |
| **Fuel / Energy Cost per km** | ₹2.40 – ₹2.80 | **₹0.15 – ₹0.20** |
| **Daily Cost (35 km commute)** | ~ ₹90 | **~ ₹6** |
| **Monthly Cost (30 days)** | ~ ₹2,700 | **~ ₹180** |
| **Yearly Fuel Expense** | ~ ₹32,400 | **~ ₹2,160** |
| **3-Year Fuel Expense** | **~ ₹97,200** | **~ ₹6,480** |

### Zero Engine Oil & Negligible Maintenance

Beyond fuel, petrol scooters demand regular oil changes, spark plug replacements, carburetor or fuel injector servicing, and frequent air filter replacements every 3,000 to 4,000 km. 

A FRENDO electric scooter has no engine, no gearbox, and no engine oil. The BLDC hub motor is sealed and maintenance-free, featuring regenerative braking and direct electronic drive.

### The Bottom Line

Over a typical 3-year ownership cycle, a FRENDO rider in Ballabhgarh saves upwards of ₹85,000 to ₹90,000 in direct fuel and maintenance expenses—effectively paying off the entire cost of the scooter!`,
        featured_image: '/images/products/b-1-s/main.png',
        category: 'Cost Savings',
        author: 'Baba Marketing Team',
        read_time: '5 min read',
        meta_title: 'Electric Scooter vs Petrol Scooter Savings Guide 2026 | Baba Marketing',
        meta_description: 'Discover how much you can save every month by switching to FRENDO electric scooter in Ballabhgarh and Faridabad. Full petrol cost comparison.',
      },
      {
        title: 'Best Practices for Charging & Maximizing Your Electric Scooter Battery Life',
        slug: 'best-practices-charging-maximizing-battery-life',
        excerpt: 'Simple daily charging habits can double the lifespan of your electric scooty battery. Learn the golden rules of smart EV battery care from our showroom technicians.',
        content: `## Taking Care of Your Electric Scooter Battery

The battery pack is the heart of any electric vehicle. Whether your FRENDO model is equipped with a 48V, 60V, or 72V configuration, following manufacturer-recommended charging protocols ensures maximum range and longevity.

### 1. Avoid Complete Drain (0% State)
Modern EV batteries thrive in the 20% to 85% state of charge. Avoid riding until the scooter is completely dead. Plug in your charger when the battery meter shows one or two bars remaining.

### 2. Let the Battery Cool Before Charging
After a long ride or riding under peak afternoon summer sun in Haryana, give the scooter 15 to 20 minutes to rest before plugging in the charger. Charging a hot battery increases internal chemical stress.

### 3. Always Use the OEM Smart Charger
Every FRENDO model comes with a dedicated micro-controller smart charger matched precisely to the voltage and ampere curve of your vehicle. Never use third-party or generic chargers with mismatched voltage.

### 4. Unplug When Fully Charged
FRENDO chargers feature smart auto-cutoff protection. However, it is always best practice to disconnect the main socket once the green "Charged" indicator illuminates.

### 5. Proper Storage in Off-Season
If you plan to travel or keep the scooter unused for more than two weeks, charge the battery to around 60% and park the vehicle in a shaded, dry area away from direct rain or dampness.`,
        featured_image: '/images/products/b-4-ch-v/main.png',
        category: 'Maintenance & Care',
        author: 'Technical Team • Baba Marketing',
        read_time: '4 min read',
        meta_title: 'Electric Scooter Battery Maintenance & Charging Tips | FRENDO',
        meta_description: 'Expert tips on charging and maximizing battery lifespan for FRENDO electric scooters from authorized Ballabhgarh showroom experts.',
      },
      {
        title: 'Why Hydraulic Disc Brakes and Reverse Gear Are Essential on Indian Roads',
        slug: 'why-hydraulic-disc-brakes-and-reverse-gear-matter',
        excerpt: 'Standard safety features make a massive difference in daily traffic. Discover why all FRENDO electric scooters come equipped with front disc brakes and reverse parking assist.',
        content: `## Safety Features Built for Real Traffic

Indian city roads demand lightning-fast reflexes and agile maneuverability. Navigating tight market lanes, congested bus stops, and uneven roads requires reliable stopping power and effortless parking.

### The Power of Hydraulic Front Disc Brakes

Conventional drum brakes rely on mechanical cables that stretch over time, losing stopping bite and requiring frequent manual adjustments. In contrast, the front hydraulic disc brakes standard on all FRENDO models provide:

- **Instant Stopping Bite:** Hydraulic fluid transmits 100% of your lever pressure directly to the twin-piston caliper.
- **Superior Wet Weather Braking:** Disc rotors quickly shed water, dust, and road grime, delivering consistent braking distance even in heavy monsoon rains.
- **Minimal Driver Fatigue:** A gentle two-finger pull delivers progressive, confidence-inspiring deceleration without locking up the front wheel.

### Smart Reverse Parking Mode: No More Pushing Heavy Scooters

Have you ever tried pulling a heavy two-wheeler backward out of a steep downhill parking spot or crowded market corner? 

Every FRENDO electric scooty features an electronic Reverse Assist switch on the right handlebar. A gentle push of the switch engages low-speed reverse power, allowing the scooter to glide backward smoothly with zero physical strain on your knees or back.

### Central Anti-Theft Alarm & Remote Keyless Start

Every model at Baba Marketing showroom also includes keyless push-button ignition and an anti-theft security module with motion sensors. If someone tries to move or tamper with your parked scooter, the rear wheel automatically locks and the loud siren sounds.`,
        featured_image: '/images/products/b-5-act/main.png',
        category: 'Technology & Safety',
        author: 'Baba Marketing Showroom',
        read_time: '4 min read',
        meta_title: 'Disc Brakes and Reverse Gear in Electric Scooters | FRENDO Features',
        meta_description: 'Learn why front hydraulic disc brakes, reverse gear assist, and central locking are standard on all FRENDO electric scooties.',
      },
      {
        title: 'Commercial Electric Loaders: How Local Businesses in Faridabad Are Slashing Delivery Costs',
        slug: 'commercial-electric-loaders-reducing-business-delivery-costs',
        excerpt: 'From wholesale vegetable vendors to parcel distributors and water delivery agencies, commercial electric 3-wheel loaders are revolutionizing last-mile delivery economics in Haryana.',
        content: `## The Last-Mile Delivery Revolution in Ballabhgarh

Local business logistics—delivering milk crates, bakery goods, wholesale vegetables, courier packages, and hardware supplies—relies on high daily mileage within a 20 to 30 km radius.

Relying on traditional petrol or diesel three-wheelers burns upwards of ₹400 to ₹600 in fuel every single business day. Over a 26-working-day month, that adds up to more than ₹10,000 to ₹15,000 spent purely on fuel!

### Enter the FRENDO Commercial Loader Lineup

At Baba Marketing Ballabhgarh showroom, we stock three dedicated commercial vehicle models:

1. **FRENDO 2-Wheel Loader:** Agile single-rider vehicle with reinforced rear cargo platform, perfect for quick parcel couriers, laundry services, and medicine deliveries.
2. **FRENDO 3-Wheel Loader:** Heavy-duty flatbed commercial trike with high-torque BLDC motor, heavy leaf-spring suspension, and 250+ kg payload capacity.
3. **FRENDO 3-Wheel Jall Loader:** Enclosed wire-mesh cage design ensuring secure transportation of parcels, bottles, and groceries without goods spilling during transit.

### Financial Impact for Small Businesses

A FRENDO 3-wheel loader fully charges overnight on a regular 15A wall socket for less than ₹25. With a full payload range of 60 to 80 km, your daily transportation cost drops from ₹450 down to ₹25!

That is a monthly direct profit boost of **₹11,000 to ₹13,000** back into the business owner's pocket.

Visit Baba Marketing at 33 Futa Road, Kaili, Ballabhgarh to test drive our commercial loaders and inspect the chassis build quality.`,
        featured_image: '/images/products/3-wheel-loader/main.png',
        category: 'Commercial & Business',
        author: 'Commercial Fleet Specialist',
        read_time: '6 min read',
        meta_title: 'Electric Commercial 3-Wheel Loaders in Ballabhgarh | Baba Marketing',
        meta_description: 'Explore FRENDO electric commercial 2-wheel and 3-wheel loaders in Faridabad. Slash your daily business delivery expenses by up to 90%.',
      },
    ];

    for (const b of blogs) {
      await pool.execute(
        `INSERT INTO blogs (title, slug, excerpt, content, featured_image, category, author, read_time, is_published, meta_title, meta_description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          b.title,
          b.slug,
          b.excerpt,
          b.content,
          b.featured_image,
          b.category,
          b.author,
          b.read_time,
          true,
          b.meta_title,
          b.meta_description,
        ]
      );
    }
    console.log('Seeded 4 initial blog posts successfully!');
  } else {
    console.log('Blogs table already has ' + rows[0].count + ' articles.');
  }

  await pool.end();
  console.log('Migration finished successfully.');
}

initBlogs().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
