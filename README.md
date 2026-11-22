# Baba Marketing – FRENDO Electric Scooty Catalogue Website

A complete, premium, professional, fully dynamic electric scooter catalogue website built for **Baba Marketing – FRENDO Electric Scooty** (Ballabhgarh, Faridabad, Haryana).

---

## 🚀 Live Server & Access Information

- **Frontend Website:** [http://localhost:3000](http://localhost:3000)
- **All Models Catalogue:** [http://localhost:3000/scooters](http://localhost:3000/scooters)
- **Admin Portal:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Admin Dashboard:** [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

### 🔐 Default Admin Credentials
- **Username:** `admin` (or `admin@babamarketing.in`)
- **Password:** `Admin@Baba2026`

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript with TSX
- **Styling:** Tailwind CSS with custom Dark Navy (`#070E1E`, `#0B1736`) and Electric Green (`#00E676`) EV theme
- **Database:** MySQL (`babascooty`) via `mysql2/promise` connection pool in `lib/db.ts` (No Prisma)
- **Icons:** Lucide React
- **Animations:** Framer Motion & CSS hardware-accelerated transitions
- **Security:** BcryptJS password hashing & Jose JWT authentication in secure HTTP-only cookies
- **File Uploads:** Native Next.js App Router multipart formData pipeline saving to `/public/uploads/`

---

## 🛵 Complete Model Lineup (20 Models Initialized)

Extracted from the official **FRENDO CATALOGUE**:

1. **FRENDO B-1 S** (`/scooters/b-1-s`) – 1000W Hub Motor, 48V/60V, 12" Front / 10" Rear, Front Disc Brake
2. **FRENDO B-2 D** (`/scooters/b-2-d`) – 1000W Hub Motor, 48V/60V, 12" Front / 10" Rear, Front Disc Brake
3. **FRENDO B-3 ZL** (`/scooters/b-3-zl`) – 1000W Hub Motor, 48V/60V, 12" Front / 10" Rear, Front Disc Brake
4. **FRENDO B-4 CH-V** (`/scooters/b-4-ch-v`) – 1500W High Torque, 60V/72V, 12" Front / 10" Rear, Front Disc Brake
5. **FRENDO B-5 ACT** (`/scooters/b-5-act`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
6. **FRENDO B-7 O-L** (`/scooters/b-7-o-l`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
7. **FRENDO B-8 U-L** (`/scooters/b-8-u-l`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
8. **FRENDO B-9 J-L** (`/scooters/b-9-j-l`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
9. **FRENDO B-10 B-F5** (`/scooters/b-10-b-f5`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
10. **FRENDO B-13 PR-M** (`/scooters/b-13-pr-m`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
11. **FRENDO B-14 V-8** (`/scooters/b-14-v-8`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
12. **FRENDO B-15 RB-T** (`/scooters/b-15-rb-t`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
13. **FRENDO B-16 VN-C** (`/scooters/b-16-vn-c`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
14. **FRENDO B-17 F-1** (`/scooters/b-17-f-1`) – 1500W High Torque, 60V/72V, Dual 12" Wheels, Front Disc Brake
15. **FRENDO Handicapped Model** (`/scooters/handicapped-model`) – 1500W, 60V/72V, Auxiliary Stabilizers, Armrests, Reverse Warning
16. **FRENDO 2-Wheel Loader** (`/scooters/2-wheel-loader`) – 1500W Commercial Motor, Reinforced Cargo Rack
17. **FRENDO 3-Wheel Loader** (`/scooters/3-wheel-loader`) – 1500W Heavy Payload Differential Motor, Open Cargo Box
18. **FRENDO 3-Wheel Jall Loader** (`/scooters/3-wheel-loader-jali`) – 1500W Differential Drive, Protective Wire Mesh Cage (Jali)
19. **FRENDO B-18 Pro Max** (`/scooters/b-18-pro-max`) – Flagship Slot, 1500W, Dual Disc Brakes, Color TFT
20. **FRENDO B-20 Eco Rider** (`/scooters/b-20-eco-rider`) – Eco-Tuned Commuter Slot, 1200W, Low Running Cost

*Every single scooter includes 5 distinct high-resolution gallery images (Main Studio Shot, Catalogue Poster, Cockpit View, Wheel & Brake View, Showroom Angle).*

---

## 🏢 Business & Showroom Contact Data

- **Business Name:** Baba Marketing
- **Brand Name:** FRENDO Electric Scooty
- **Tagline:** Electric Scooty | Clean Energy | Better Tomorrow
- **Showroom Address:** BJP Office, Plot No. 4, 33 Futa Road, Near Deepak Dagar, Kaili, Ballabhgarh, Faridabad, Haryana – 121004, India.
- **Primary Phone:** 09211086570 (`tel:09211086570`)
- **Additional Numbers / WhatsApp:** 9811481143, 8800894544, 9599790799, 9958571353
- **Automated WhatsApp Enquiry:** Automatically pre-fills the scooter model name (e.g., `Hello Baba Marketing, I am interested in FRENDO B-1 S electric scooter. Please share more details.`)

---

## 🗄️ MySQL Database (`babascooty`)

Relational schema created in `scripts/schema.sql`:
- `admins`: Administrator accounts with bcrypt password hashes
- `categories`: Scooter categories with slug & sort order
- `products`: Product names, slugs, model codes, descriptions, prices, availability, publish status
- `product_images`: Separated image records referencing `product_id` with `is_primary`, `sort_order`, `alt_text`
- `product_specifications`: Motor, battery voltage, controller, tyres, brakes, central locking, digital meter, reverse gear, and additional equipment
- `homepage_sections`: Dynamic homepage content & visibility toggles
- `banners`: Hero and promotional banners
- `contact_settings`: Showroom contact details, phone numbers, map embeds
- `website_settings`: Key-value general website settings
- `seo_settings`: Dynamic per-route SEO titles, meta descriptions, canonical URLs, OG images
- `enquiries`: Incoming test ride and price quote customer leads

To re-initialize or re-seed database at any time:
```bash
npm run db:init
```

---

## 💻 Commands

- `npm run dev` - Start development server
- `npm run build` - Build production Next.js bundle
- `npm start` - Run production server on port 3000
- `npm run db:init` - Run schema migrations and seed initial data
