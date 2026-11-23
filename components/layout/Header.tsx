'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Shield,
  Briefcase,
  Zap,
  BatteryCharging,
  Sparkles,
  MapPin,
  ChevronRight,
} from 'lucide-react';

interface HeaderProps {
  contact?: {
    primary_phone?: string;
    whatsapp_number?: string;
    business_name?: string;
    brand_name?: string;
  };
}

export default function Header({ contact }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const phone = contact?.primary_phone || '9953564151';
  const whatsapp = contact?.whatsapp_number || '9953564151';

  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isAdmin) {
    return null;
  }

  // Clean, focused navigation items (no duplicates)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Batteries & Range', href: '/batteries' },
    { name: '27 Models', href: '/scooters' },
    { name: 'EV Guides', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* 1. Top FRENDO Banner Royal Blue Announcement Bar */}
      <div className="bg-royal-800 border-b border-royal-900 text-xs py-1.5 sm:py-2 px-3 sm:px-4 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">

          {/* Brand & Offer Tagline */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-white/90 truncate">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-serif uppercase tracking-wider text-amber-400 font-bold hidden xs:inline">
              FRENDO E-SCOOTY:
            </span>
            <span className="text-white font-medium truncate">
              Drive Green, Live Better! • <strong className="text-amber-400">Starting ₹15,000/-</strong>
            </span>
          </div>

          {/* Quick Contact & Admin Links */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-white/90">
            <a
              href={`tel:${phone}`}
              className="hidden md:flex items-center gap-1 hover:text-amber-400 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{phone}</span>
            </a>

            <span className="text-white/25 hidden md:inline">|</span>

            <a
              href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                'Hello Baba Marketing, I am interested in FRENDO E-SCOOTY models and B2B Dealership.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-300 text-amber-400 transition-colors font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp:</span>
              <span>{whatsapp}</span>
            </a>

            <span className="text-white/25 hidden sm:inline">|</span>

            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-white/80 hover:text-amber-400 transition-colors font-medium"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 2. Main FRENDO Eco Green Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-brand-800/95 backdrop-blur-md shadow-lg border-b-2 border-amber-400 py-2.5'
          : 'bg-brand-800 border-b-2 border-amber-400 py-3'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo Brand */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative h-10 sm:h-12 w-36 sm:w-44 overflow-hidden rounded-lg bg-white border-2 border-amber-400 flex items-center justify-center px-2 py-1 shadow-md transition-transform group-hover:scale-105">
                <Image
                  src="/logo.jpeg"
                  alt="FRENDO E-SCOOTY - Baba Marketing"
                  fill
                  priority
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 150px, 180px"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={true}
                    className={`px-3 xl:px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${isActive
                      ? 'text-brand-950 bg-amber-400 font-black shadow-sm'
                      : 'text-white hover:text-amber-300 hover:bg-white/10'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA (Dealership 40 Units Highlight) */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <Link
                href="/dealership"
                prefetch={true}
                className="px-4 xl:px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap border border-amber-500"
              >
                <Briefcase className="w-3.5 h-3.5 fill-brand-950" />
                <span>Dealership (40 Units)</span>
              </Link>
            </div>

            {/* Mobile / Tablet Action Icons */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                  'Hello Baba Marketing, I want to enquire about FRENDO E-SCOOTY.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-xl bg-amber-400 text-brand-950 text-xs font-bold shadow"
                aria-label="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4 fill-brand-950" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/25 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-900 border-b-2 border-amber-400 px-4 pt-3 pb-6 mt-2 shadow-2xl animate-in slide-in-from-top-3 duration-200 space-y-3">

            <div className="py-2.5 px-3 rounded-xl bg-brand-950/60 border border-amber-400/40 flex items-center justify-between">
              <div>
                <div className="font-serif text-xs font-bold text-amber-400">FRENDO E-SCOOTY</div>
                <div className="text-[10px] text-white/80">Drive Green, Live Better!</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-brand-950">
                Starting ₹15,000/-
              </span>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${isActive
                      ? 'text-brand-950 bg-amber-400 font-black'
                      : 'text-white hover:text-amber-300 hover:bg-white/10'
                      }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-brand-950' : 'text-white/60'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions: Dealership & Direct Call */}
            <div className="pt-2 border-t border-white/15 space-y-2">
              <Link
                href="/dealership"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <Briefcase className="w-4 h-4 fill-brand-950" />
                <span>B2B Franchise & Dealership (40 Scooties)</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${phone}`}
                  className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Us</span>
                </a>

                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>

          </div>
        )}
      </header>
    </>
  );
}
