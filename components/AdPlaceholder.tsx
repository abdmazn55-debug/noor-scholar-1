import React from 'react';

interface AdPlaceholderProps {
  id?: string;
  slotName?: string;
  className?: string;
}

export default function AdPlaceholder({
  id = 'adsense-top',
  slotName = 'Leaderboard Ad (728x90 / Responsive)',
  className = '',
}: AdPlaceholderProps) {
  return (
    <div
      id={id}
      className={`w-full max-w-5xl mx-auto my-6 px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center text-xs text-slate-400 min-h-[90px] transition-all hover:bg-slate-100/70 ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="uppercase tracking-widest text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
          Advertisement
        </span>
        <span className="text-[11px] text-slate-500 font-medium">Google AdSense Partner Space</span>
      </div>
      <p className="text-[11px] text-slate-400">
        {slotName} — Configured for Google AdSense monetization
      </p>
    </div>
  );
}
