'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-brand-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background eco green glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-400/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Brand Logo Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex flex-col items-center gap-2.5 group">
            <div className="relative h-16 w-56 overflow-hidden rounded-2xl bg-white border-2 border-brand-800/20 shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/logo.jpeg"
                alt="FRENDO E-SCOOTY - Baba Marketing"
                fill
                priority
                className="object-contain p-2"
                sizes="240px"
              />
            </div>
            <div className="text-xs text-brand-800 font-extrabold tracking-widest uppercase">
              BABA MARKETING • FRENDO E-SCOOTY
            </div>
          </Link>

          <h1 className="text-xl font-bold text-slate-900 pt-2">Admin Control Dashboard</h1>
          <p className="text-xs text-slate-600">
            Sign in with your authorized administrator credentials to manage products, images, and website content.
          </p>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-white border-2 border-brand-200 shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-crimson-50 border border-crimson-500/40 text-xs text-crimson-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-crimson-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-700 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-brand-700 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-black text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </form>

          {/* Quick Help */}
          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
            <div>Default Admin Login: <span className="font-mono font-bold text-slate-800">admin</span></div>
            <div>Password: <span className="font-mono font-bold text-slate-800">Admin@Baba2026</span></div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs font-semibold text-brand-800 hover:text-brand-600 transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
