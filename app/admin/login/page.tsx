'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Brand Logo Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-electric-500 flex items-center justify-center text-navy-950 shadow-glow font-black text-2xl">
              <Zap className="w-7 h-7 fill-navy-950" />
            </div>
            <div className="text-left">
              <div className="font-black text-2xl text-white tracking-tight leading-none">BABA MARKETING</div>
              <div className="text-xs text-electric-400 font-bold tracking-widest uppercase mt-1">
                FRENDO ELECTRIC SCOOTY
              </div>
            </div>
          </Link>

          <h1 className="text-xl font-bold text-white pt-2">Admin Control Dashboard</h1>
          <p className="text-xs text-slate-400">
            Sign in with your authorized administrator credentials to manage products, images, and website content.
          </p>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-navy-900 border border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-electric-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electric-500 to-emerald-500 text-navy-950 font-black text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Help */}
          <div className="pt-4 border-t border-white/5 text-center text-xs text-slate-500 space-y-1">
            <div>Default Admin Login: <span className="font-mono text-slate-300">admin</span></div>
            <div>Password: <span className="font-mono text-slate-300">Admin@Baba2026</span></div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
