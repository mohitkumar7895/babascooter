import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-brand-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="h-6 w-44 bg-brand-200 rounded-full mx-auto" />
          <div className="h-10 w-3/4 bg-brand-200/80 rounded-xl mx-auto" />
          <div className="h-4 w-2/3 bg-slate-200 rounded-lg mx-auto" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="rounded-2xl bg-white border border-brand-200 p-4 space-y-3 shadow-sm"
            >
              <div className="aspect-[4/3] w-full bg-brand-100 rounded-xl" />
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-9 w-full bg-brand-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
