import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-brand-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-brand-200 shadow-card">
        <div className="relative h-14 w-48 mx-auto rounded-xl bg-white border border-brand-200 overflow-hidden shadow-sm">
          <Image
            src="/logo.jpeg"
            alt="FRENDO E-SCOOTY"
            fill
            className="object-contain p-1.5"
            sizes="200px"
          />
        </div>

        <div className="space-y-2">
          <div className="text-6xl font-black text-royal-800 tracking-tight">404</div>
          <h1 className="text-2xl font-bold text-slate-900">Model Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The scooter page you are searching for might have been updated, moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/scooters"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-amber-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Models</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
