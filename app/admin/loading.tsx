import React from 'react';

export default function AdminLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-brand-200 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-28 rounded-2xl bg-white border border-brand-200 p-5" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-white border border-brand-200" />
    </div>
  );
}
