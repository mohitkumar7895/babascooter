'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Check, Clock, User, MessageSquare } from 'lucide-react';
import { Enquiry } from '@/types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiry');
      const data = await res.json();
      if (data.enquiries) setEnquiries(data.enquiries);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleUpdateStatus = async (id: number, status: 'New' | 'Contacted' | 'Closed') => {
    try {
      const res = await fetch('/api/enquiry', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status } : e))
        );
      }
    } catch (err) {
      console.error('Error updating enquiry status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Enquiries & Test Rides</h1>
        <p className="text-xs text-slate-600 mt-1">
          Review leads submitted from the website test ride and contact forms.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-brand-200 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-slate-600 text-xs">Loading customer leads...</div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No customer enquiries submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-brand-200">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Phone / WhatsApp</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Message / Interest</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-brand-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {enq.customer_name}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      <a href={`tel:${enq.customer_phone}`} className="hover:text-brand-700">
                        {enq.customer_phone}
                      </a>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {enq.city || 'Faridabad'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {enq.message || 'Book free test ride'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'New'
                            ? 'bg-brand-100 text-brand-700 border border-brand-300'
                            : enq.status === 'Contacted'
                            ? 'bg-royal-50 text-royal-800 border border-royal-200'
                            : 'bg-brand-50 text-slate-600'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 text-[10px] text-slate-900 focus:outline-none focus:border-brand-700"
                      >
                        <option value="New" className="bg-white text-slate-900">New</option>
                        <option value="Contacted" className="bg-white text-slate-900">Contacted</option>
                        <option value="Closed" className="bg-white text-slate-900">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
