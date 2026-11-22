'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone } from 'lucide-react';

interface FloatingProps {
  whatsapp?: string;
  phone?: string;
}

export default function WhatsAppFloating({ whatsapp = '9953564151', phone = '9953564151' }: FloatingProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const defaultMsg = 'Hello Baba Marketing, I am interested in FRENDO E-SCOOTY models and B2B Dealership.';

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Quick Call Button */}
      <a
        href={`tel:${phone}`}
        className="w-12 h-12 rounded-full bg-navy-900 border border-amber-500/40 text-white shadow-2xl flex items-center justify-center hover:bg-slate-900 hover:scale-110 active:scale-95 transition-all group"
        title="Call Showroom"
        aria-label="Call Showroom"
      >
        <Phone className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
      </a>

      {/* WhatsApp Button with pulse badge */}
      <a
        href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(defaultMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-navy-950 font-bold shadow-glow hover:scale-105 active:scale-95 transition-all group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-navy-950" />
        <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">
          Dealership Hotline
        </span>
      </a>
    </aside>
  );
}
