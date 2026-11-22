import React from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-navy-950 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-electric-500/10 border border-electric-500/30 text-electric-400 flex items-center justify-center mx-auto shadow-glow">
          <Zap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-6xl font-black text-white tracking-tight">404</div>
          <h1 className="text-2xl font-bold text-white">Model Page Not Found</h1>
          <p className="text-sm text-slate-400">
            The scooter page you are searching for might have been updated, moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/scooters"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-electric-500 text-navy-950 font-bold text-xs shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse 20 Models</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
