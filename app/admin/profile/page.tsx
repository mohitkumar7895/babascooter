'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Lock, User, Shield } from 'lucide-react';

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setName(data.user.name || '');
          setEmail(data.user.email || '');
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setSuccess('Admin profile and security settings updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-600 text-sm">Loading admin profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Profile & Security</h1>
        <p className="text-xs text-slate-600 mt-1">
          Manage your account information and update password credentials.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-crimson-50 border border-crimson-500/40 text-xs text-crimson-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-crimson-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-brand-100 border border-brand-300 text-xs text-brand-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-brand-200 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-800" />
            <span>Administrator Information</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
            <input
              type="text"
              disabled
              value={user?.username || 'admin'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-500 cursor-not-allowed font-mono"
            />
            <span className="text-[10px] text-slate-500">Username cannot be changed.</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="p-6 rounded-2xl bg-white border border-brand-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-brand-200 pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-800" />
            <span>Change Password</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Password</label>
            <input
              type="password"
              placeholder="Leave blank if not changing"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-slate-900 focus:outline-none focus:border-brand-700"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-brand-800 text-white font-black text-xs shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Update Profile & Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
