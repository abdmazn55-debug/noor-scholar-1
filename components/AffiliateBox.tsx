import React from 'react';
import { ExternalLink, Sparkles, CheckCheck } from 'lucide-react';

interface AffiliateBoxProps {
  partner?: 'grammarly' | 'quillbot' | 'all';
  className?: string;
}

export default function AffiliateBox({ partner = 'all', className = '' }: AffiliateBoxProps) {
  const partners = [
    {
      name: 'Grammarly for Researchers',
      badge: 'Academic Writing Assistant',
      desc: 'Fix tone, complex grammar, clarity, and citations directly in your browser or Word doc.',
      cta: 'Try Grammarly Free',
      url: 'https://grammarly.com',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      name: 'QuillBot AI Paraphraser',
      badge: 'Academic Paraphraser & Co-Writer',
      desc: 'Rewrite complex academic paragraphs with 7 unique modes without losing scientific meaning.',
      cta: 'Explore QuillBot Free',
      url: 'https://quillbot.com',
      color: 'bg-teal-50 border-teal-200 text-teal-800',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
  ];

  const selected = partner === 'all' ? partners : partners.filter((p) => p.name.toLowerCase().includes(partner));

  return (
    <div className={`my-8 p-6 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 rounded-2xl border border-slate-200 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
          Recommended Academic Research Tools
        </h4>
        <span className="text-[10px] text-slate-400 font-medium ml-auto">Affiliate Partner Recommendation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selected.map((item, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border flex flex-col justify-between ${item.color} bg-white shadow-2xs`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {item.badge}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-base">{item.name}</h5>
              <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">{item.desc}</p>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-2xs ${item.btnColor}`}
            >
              <span>{item.cta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
