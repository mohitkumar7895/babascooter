'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Bike,
  Sparkles,
  PhoneCall,
  Search,
  Settings,
  Mail,
  Newspaper,
  User,
  LogOut,
  ExternalLink,
  Zap,
  Menu,
  X,
  Shield,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage) {
      fetch('/api/auth/me')
        .then((res) => {
          if (!res.ok) {
            router.push('/admin/login');
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data?.user) setAdminUser(data.user);
        })
        .catch(() => router.push('/admin/login'));
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products & Models', href: '/admin/products', icon: Bike },
    { name: 'Media & Photos', href: '/admin/media', icon: Sparkles },
    { name: 'Blog Articles', href: '/admin/blogs', icon: Newspaper },
    { name: 'Customer Enquiries', href: '/admin/enquiries', icon: Mail },
    { name: 'Homepage & Banners', href: '/admin/homepage', icon: Sparkles },
    { name: 'Contact & Showroom', href: '/admin/contact', icon: PhoneCall },
    { name: 'SEO & Meta Tags', href: '/admin/seo', icon: Search },
    { name: 'Website Settings', href: '/admin/settings', icon: Settings },
    { name: 'Admin Profile', href: '/admin/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy-900 border-r border-white/10 shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-electric-500 flex items-center justify-center text-navy-950 font-black shadow-glow">
            <Zap className="w-5 h-5 fill-navy-950" />
          </div>
          <div>
            <div className="font-black text-white text-base tracking-tight leading-none">BABA MARKETING</div>
            <div className="text-[10px] text-electric-400 font-bold tracking-wider uppercase mt-1">
              FRENDO ADMIN
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-electric-500 text-navy-950 shadow-glow font-black'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* View Live Site & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-electric-400" />
              <span>View Live Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-navy-900 border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/5 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
              Baba Marketing Admin Console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-electric-400 hover:text-white font-semibold"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2.5 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-electric-500/20 border border-electric-500/40 text-electric-400 font-bold text-xs flex items-center justify-center">
                {adminUser?.username?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white">{adminUser?.name || 'Administrator'}</div>
                <div className="text-[10px] text-slate-400">{adminUser?.email || 'admin@babamarketing.in'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 bg-navy-900 h-full flex flex-col z-10 border-r border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-electric-500 flex items-center justify-center text-navy-950 font-bold">
                  <Zap className="w-4 h-4 fill-navy-950" />
                </div>
                <span className="font-bold text-white text-sm">BABA MARKETING</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-electric-500 text-navy-950 font-black' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
