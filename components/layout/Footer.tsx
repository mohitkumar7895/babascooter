'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, MapPin, Mail, Clock, ShieldCheck, ChevronRight, Award, Zap, Globe } from 'lucide-react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

interface FooterProps {
  contact?: {
    business_name?: string;
    brand_name?: string;
    tagline?: string;
    address?: string;
    primary_phone?: string;
    whatsapp_number?: string;
    additional_phones?: string;
    email?: string;
    opening_hours?: string;
    google_maps_url?: string;
  };
}

export default function Footer({ contact }: FooterProps) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const businessName = contact?.business_name || 'BABA MARKETING';
  const brandName = contact?.brand_name || 'FRENDO E-SCOOTY';
  const tagline = contact?.tagline || 'Drive Green, Live Better!';
  const address =
    contact?.address ||
    'Plot No. 4, Kaili, Ballabhgarh, Faridabad, Haryana – 121004, India.';
  const primaryPhone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';
  const email = contact?.email || 'info@frendo.in';

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features & Specs', href: '/features' },
    { name: 'LFP Battery Packs (50–300 KM)', href: '/batteries' },
    { name: 'B2B Dealership (40 + 20 FREE)', href: '/dealership' },
    { name: 'All 27 Models Catalogue', href: '/scooters' },
    { name: 'EV Guides & Blog', href: '/blog' },
    { name: 'About Baba Marketing', href: '/about' },
    { name: 'Contact Showroom', href: '/contact' },
  ];

  const popularSets = [
    { name: 'FRENDO Prime B-1', slug: 'fr-b1' },
    { name: 'FRENDO Ultra Sport', slug: 'fr-us' },
    { name: 'FRENDO Turbo ACT', slug: 'fr-act' },
    { name: 'FRENDO Pro Max (300 KM)', slug: 'fr-pmax' },
    { name: 'FRENDO Accessible Trike', slug: 'fr-acc' },
    { name: 'FRENDO 3-Wheel Loader', slug: 'fr-l3w' },
  ];

  return (
    <footer className="bg-brand-800 text-white/90 border-t-4 border-amber-400 relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-12 w-48 overflow-hidden rounded-lg bg-white border-2 border-amber-400 flex items-center justify-center px-2.5 py-1 shadow-md">
              <Image
                src="/logo.jpeg"
                alt="FRENDO E-SCOOTY"
                fill
                className="object-contain p-1"
                sizes="200px"
              />
            </div>

            <p className="font-serif text-sm font-bold text-amber-400">
              {tagline}
            </p>

            <p className="text-xs text-white/80 leading-relaxed max-w-md">
              Electric scooters starting at ₹11,000/-, Single Light Models from ₹15,000/-, and LFP batteries (50–300 KM range) from ₹15,000/-, backed by 60 Month Warranty and 40 + 20 FREE distributor offer across India.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-amber-400 text-brand-950 text-[11px] font-black">
                Starting ₹11,000/-
              </span>
              <span className="px-2.5 py-1 rounded-md bg-crimson-600 text-white text-[11px] font-bold">
                60 Month Warranty
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/15 border border-white/25 text-[11px] font-bold text-white">
                40 + 20 FREE Offer
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/85 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-400/80 group-hover:text-amber-400" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Dealership Hotline */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Contact Us & Dealership
            </h3>

            <div className="space-y-2.5 text-xs text-white/90">
              <div className="font-bold text-white">{businessName} ({brandName})</div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${primaryPhone}`} className="hover:text-amber-400 font-bold text-white">
                  {primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                    'Hello Baba Marketing, I want to enquire about FRENDO E-SCOOTY models and Dealership.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 font-bold text-amber-400"
                >
                  WhatsApp: {whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="https://www.frendo.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  https://www.frendo.in
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                  'Hello Baba Marketing, I am interested in FRENDO B2B Dealership (40 + 20 FREE Offer).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow"
              >
                <span>Join Dealer Network</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/75">
          <div>
            © {new Date().getFullYear()} BABA MARKETING – FRENDO E-SCOOTY. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-white/75">
            All offers, benefits and warranty coverage are subject to applicable company terms and conditions.
          </div>
        </div>
      </div>
    </footer>
  );
}
