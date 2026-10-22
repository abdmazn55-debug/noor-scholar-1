'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Quote, Copy, Check, Sparkles, BookOpen, FileText } from 'lucide-react';

export default function CitationTool() {
  const searchParams = useSearchParams();

  const [style, setStyle] = useState<'apa' | 'mla' | 'chicago' | 'harvard' | 'bibtex'>('apa');
  const [sourceType, setSourceType] = useState('journal');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('2024');
  const [volume, setVolume] = useState('14');
  const [issue, setIssue] = useState('2');
  const [pages, setPages] = useState('112-128');
  const [doi, setDoi] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const qTitle = searchParams.get('title');
    const qAuthor = searchParams.get('author');
    const qYear = searchParams.get('year');
    const qDoi = searchParams.get('doi');

    if (qTitle) {
      setTitle(qTitle);
    } else {
      setTitle((prev) => prev || 'Attention Is All You Need');
    }

    if (qAuthor) {
      setAuthor(qAuthor.replace('Author: ', '').replace('المؤلف: ', ''));
    } else {
      setAuthor(
        (prev) =>
          prev ||
          'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.'
      );
    }

    if (qYear) setYear(qYear);
    if (qDoi) setDoi(qDoi);
  }, [searchParams]);

  const generateCitation = () => {
    const safeTitle = title.trim() || 'Untitled Document';
    const safeAuthor = author.trim() || 'Anonymous';
    const safeJournal = journal.trim() || 'Journal of Academic Research';
    const safeYear = year.trim() || '2024';
    const safeVol = volume.trim();
    const safeIss = issue.trim();
    const safePages = pages.trim();
    const safeDoi = doi.trim();

    switch (style) {
      case 'apa':
        // APA 7th: Author, A. A. (Year). Title of article. Title of Periodical, volume(issue), pages. https://doi.org/xxx
        return `${safeAuthor} (${safeYear}). ${safeTitle}. ${safeJournal}${safeVol ? `, ${safeVol}` : ''}${safeIss ? `(${safeIss})` : ''}${safePages ? `, ${safePages}` : ''}.${safeDoi ? ` ${safeDoi}` : ''}`;
      case 'mla':
        // MLA 9th: Author. "Title of Article." Title of Journal, vol. x, no. x, Year, pp. xx-xx. DOI.
        return `${safeAuthor}. "${safeTitle}." ${safeJournal}${safeVol ? `, vol. ${safeVol}` : ''}${safeIss ? `, no. ${safeIss}` : ''}, ${safeYear}${safePages ? `, pp. ${safePages}` : ''}.${safeDoi ? ` ${safeDoi}` : ''}`;
      case 'chicago':
        // Chicago 17th: Author. "Title of Article." Title of Journal vol, no. iss (Year): pages. DOI.
        return `${safeAuthor}. "${safeTitle}." ${safeJournal} ${safeVol || '1'}${safeIss ? `, no. ${safeIss}` : ''} (${safeYear})${safePages ? `: ${safePages}` : ''}.${safeDoi ? ` ${safeDoi}` : ''}`;
      case 'harvard':
        // Harvard: Author, Year. Title of article. Title of journal, Volume(Issue), pp. pages.
        return `${safeAuthor}, ${safeYear}. ${safeTitle}. ${safeJournal}${safeVol ? `, ${safeVol}` : ''}${safeIss ? `(${safeIss})` : ''}${safePages ? `, pp.${safePages}` : ''}.`;
      case 'bibtex':
        // BibTeX entry
        const citeKey = safeAuthor.split(',')[0].replace(/\s+/g, '').toLowerCase() + safeYear;
        return `@article{${citeKey},
  author = {${safeAuthor}},
  title = {${safeTitle}},
  journal = {${safeJournal}},
  year = {${safeYear}},
  volume = {${safeVol || '1'}},
  number = {${safeIss || '1'}},
  pages = {${safePages || '1-10'}},
  doi = {${safeDoi || ''}}
}`;
      default:
        return '';
    }
  };

  const currentCitation = generateCitation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCitation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-12">
      {/* Style selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Citation Style:</span>
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['apa', 'mla', 'chicago', 'harvard', 'bibtex'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all uppercase cursor-pointer ${
                style === s ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Article / Paper Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
            placeholder="e.g. Deep Residual Learning for Image Recognition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Authors (Format: Last, First M., & Co-author)
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
            placeholder="e.g. He, K., Zhang, X., Ren, S., & Sun, J."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Journal / Publication Name
          </label>
          <input
            type="text"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
            placeholder="e.g. IEEE Conference on Computer Vision"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              placeholder="2024"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Volume</label>
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              placeholder="12"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Issue</label>
            <input
              type="text"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              placeholder="4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Pages</label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              placeholder="101-118"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">DOI / URL</label>
            <input
              type="text"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
              className="w-full h-11 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              placeholder="https://doi.org/10.1145/..."
            />
          </div>
        </div>
      </div>

      {/* Output Card */}
      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Formatted {style.toUpperCase()} Citation
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Citation</span>
              </>
            )}
          </button>
        </div>

        {style === 'bibtex' ? (
          <pre className="p-4 bg-slate-900 text-blue-300 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre">
            {currentCitation}
          </pre>
        ) : (
          <p className="p-4 bg-white rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed font-serif select-all">
            {currentCitation}
          </p>
        )}
      </div>
    </div>
  );
}
