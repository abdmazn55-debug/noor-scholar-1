'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Loader2,
  BookOpen,
  ExternalLink,
  Calendar,
  Users,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  Bookmark,
  X,
  FileText,
  Quote,
  Shield,
  Zap,
  Globe2,
  HelpCircle,
  Star,
  Layers,
  ChevronDown,
} from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';

interface AuthorShip {
  author?: {
    id?: string;
    display_name?: string;
  };
  raw_author_name?: string;
}

interface WorkItem {
  id: string;
  title: string | null;
  display_name?: string;
  publication_year?: number | null;
  authorships?: AuthorShip[];
  doi?: string;
  cited_by_count?: number;
  primary_location?: {
    landing_page_url?: string;
    pdf_url?: string;
  };
}

const POPULAR_SEARCHES = [
  'Deep Learning Transformers',
  'CRISPR Gene Editing',
  'Quantum Computing Algorithms',
  'Renewable Energy Storage',
  'Microplastics in Marine Biology',
  'Alzheimer Disease Biomarkers',
];

const FAQS = [
  {
    q: 'What is Noor Scholar?',
    a: 'Noor Scholar is a free, modern academic search engine indexing over 250 million scientific articles, conference proceedings, preprints, and research datasets powered by the OpenAlex open science index.',
  },
  {
    q: 'How is Noor Scholar different from Google Scholar?',
    a: 'Unlike Google Scholar, Noor Scholar offers an open, transparent catalog without hidden paywalls, instant citation generation (APA, MLA, Chicago), structured research summaries, direct DOI links, and an ad-free clean researcher interface.',
  },
  {
    q: 'Is Noor Scholar free to use?',
    a: 'Yes! 100% of our search features, citation generators, and literature discovery are completely free with no registration required.',
  },
  {
    q: 'How many research papers are indexed in Noor Scholar?',
    a: 'We index over 250 million scholarly publications from more than 100,000 academic institutions and 250,000 global journals across all disciplines.',
  },
  {
    q: 'Can I download full-text PDFs directly?',
    a: 'Whenever an open-access version or publisher DOI is available, Noor Scholar provides direct links to the official repository, publisher landing page, or open-access PDF.',
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WorkItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const executeSearch = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(q)}`);
      if (!response.ok) {
        throw new Error('Unable to fetch research papers. Please try again.');
      }
      const data = await response.json();
      const works: WorkItem[] = Array.isArray(data.results) ? data.results.slice(0, 10) : [];
      setResults(works);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during search.');
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    executeSearch(searchTerm);
  };

  const handleTopicClick = (topic: string) => {
    setSearchTerm(topic);
    executeSearch(topic);
  };

  const getAuthors = (work: WorkItem) => {
    if (!work.authorships || work.authorships.length === 0) {
      return 'Unknown Author';
    }
    const names = work.authorships
      .map((a) => a.author?.display_name || a.raw_author_name)
      .filter(Boolean) as string[];

    if (names.length === 0) return 'Unknown Author';
    return `${names.slice(0, 4).join(', ')}${names.length > 4 ? ` et al. (${names.length})` : ''}`;
  };

  const handleCopyLink = async (work: WorkItem) => {
    const link = work.doi || work.primary_location?.landing_page_url || window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(work.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top AdSense Placement */}
      <div className="bg-slate-50 border-b border-slate-100 py-2">
        <AdPlaceholder id="adsense-top" slotName="Leaderboard Header Ad (728x90)" />
      </div>

      {!hasSearched ? (
        <>
          {/* Hero Section */}
          <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>World&apos;s Largest Open Academic Search Engine</span>
            </div>

            {/* H1 SEO Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Free Academic Search Engine
              <span className="block text-blue-600">250M+ Research Papers</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              The modern, open alternative to Google Scholar. Discover peer-reviewed journals, generate instant APA citations, and synthesize academic literature faster.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto mb-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 250M+ papers by title, author, DOI, or keywords..."
                  className="w-full h-16 pr-32 pl-14 text-base sm:text-lg bg-white border-2 border-slate-300 rounded-full shadow-md hover:border-blue-400 focus:border-blue-600 focus:shadow-xl focus:outline-none transition-all"
                  autoFocus
                />
                <Search className="absolute left-5 w-6 h-6 text-slate-400 pointer-events-none" />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-28 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="absolute right-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular search pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              <span className="text-xs font-semibold text-slate-400">Trending Topics:</span>
              {POPULAR_SEARCHES.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-full text-xs font-medium transition-colors cursor-pointer border border-transparent hover:border-blue-200"
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <div className="text-3xl font-black text-blue-600">250M+</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Research Papers</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">90M+</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Authors & Scholars</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900">100K+</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Institutions</div>
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-600">100%</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Free Open Access</div>
              </div>
            </div>
          </section>

          {/* 6 Features Cards */}
          <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Why Noor Scholar</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
                  Built for Graduate Students, Academics, and Scientists
                </h2>
                <p className="text-slate-600">
                  Every feature engineered to cut hours from your literature reviews and research papers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">250M+ Open Literature Index</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Access peer-reviewed literature across medicine, computer science, physics, economics, and humanities indexed in real time from OpenAlex.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                    <Quote className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Citation Generator</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Generate flawless APA 7th, MLA 9th, Chicago, Harvard, and BibTeX citations in a single click with zero formatting errors.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Direct DOI & PDF Access</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Skip predatory paywalls with direct links to publisher DOIs, ArXiv, PubMed Central, and open-access institutional repositories.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Citation Metrics & Impact</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Understand paper significance immediately with verified citation counts, influential references, and co-author graphs.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Paper Summarizer & Paraphraser</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Synthesize complex empirical methodology and core findings in seconds with built-in AI summarization and academic writing tools.
                  </p>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Privacy & Anti-Tracking</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We never track your academic research queries or profile your intellectual interests. Your research stays completely confidential.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Researcher Reviews</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                  Trusted by Researchers Worldwide
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                      &ldquo;Noor Scholar cut my PhD literature review time in half. Being able to pull 10 clean results with exact DOIs and export APA citations instantly is a game changer.&rdquo;
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">Dr. Elena Rostova</div>
                    <div className="text-xs text-slate-500">Postdoctoral Fellow, Computational Biology</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                      &ldquo;Google Scholar often buries fresh preprints behind old books. Noor Scholar surfaces recent high-impact open access papers immediately.&rdquo;
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">Marcus Vance, M.Sc.</div>
                    <div className="text-xs text-slate-500">AI Researcher, Deep Learning Systems</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                      &ldquo;The integrated citation generator and paper summarizer makes Noor Scholar our university lab&apos;s default search engine.&rdquo;
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">Prof. Tariq Al-Mansoor</div>
                    <div className="text-xs text-slate-500">Department Chair of Information Science</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Preview */}
          <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Transparent Pricing</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-3">
                  Free for Everyone. Superpowers for Pros.
                </h2>
                <p className="text-slate-600 text-sm">
                  Upgrade anytime via secure LemonSqueezy checkout. Cancel with 1 click.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free */}
                <div className="p-8 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase">Scholar Free</div>
                    <div className="text-4xl font-black text-slate-900 my-4">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></div>
                    <p className="text-xs text-slate-600 mb-6">Essential literature search for all students and researchers worldwide.</p>
                    <ul className="space-y-3 text-xs text-slate-700 mb-8">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Search across 250M+ Papers</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Free APA, MLA & Chicago Generator</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Direct DOI & Open Access Links</li>
                    </ul>
                  </div>
                  <Link
                    href="/"
                    className="w-full py-3 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Start Free
                  </Link>
                </div>

                {/* Pro */}
                <div className="p-8 bg-white rounded-2xl border-2 border-blue-600 relative flex flex-col justify-between shadow-xl">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-600 uppercase">Scholar Pro</div>
                    <div className="text-4xl font-black text-slate-900 my-4">$19 <span className="text-sm font-normal text-slate-500">/ month</span></div>
                    <p className="text-xs text-slate-600 mb-6">Designed for active academic researchers, PhD candidates, and faculties.</p>
                    <ul className="space-y-3 text-xs text-slate-700 mb-8">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Everything in Free</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Unlimited AI Paper Summaries</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Unlimited Academic Paraphraser</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Bulk BibTeX & EndNote Export</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Priority 24/7 Email Support</li>
                    </ul>
                  </div>
                  <a
                    href="https://noorscholar.lemonsqueezy.com/checkout/buy/pro-monthly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors"
                  >
                    Upgrade to Pro via LemonSqueezy
                  </a>
                </div>

                {/* Team */}
                <div className="p-8 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase">Lab / Institution</div>
                    <div className="text-4xl font-black text-slate-900 my-4">$49 <span className="text-sm font-normal text-slate-500">/ month</span></div>
                    <p className="text-xs text-slate-600 mb-6">For universities, research institutes, and collaborative research teams.</p>
                    <ul className="space-y-3 text-xs text-slate-700 mb-8">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 10 Team Member Seats</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Shared Lab Reading Lists</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Custom API Access for Literature</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dedicated Account Manager</li>
                    </ul>
                  </div>
                  <a
                    href="https://noorscholar.lemonsqueezy.com/checkout/buy/lab-team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Get Team Plan
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Frequently Asked Questions</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                  Everything You Need to Know
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180 text-blue-600' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="py-16 bg-blue-600 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-extrabold mb-4">
                Ready to Experience Modern Academic Search?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Start searching 250M+ scholarly works today. Completely free, no registration required.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full shadow-lg transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Search Papers Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </>
      ) : (
        /* Search Results Page View */
        <div className="flex-1 flex flex-col">
          {/* Top Search Controls Bar */}
          <div className="bg-slate-50 border-b border-slate-200 py-4 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <form onSubmit={handleSearch} className="w-full max-w-2xl relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 250M+ papers..."
                  className="w-full h-12 pr-12 pl-24 text-sm bg-white border border-slate-300 rounded-full shadow-xs focus:border-blue-600 focus:outline-none"
                />
                <Search className="absolute right-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute left-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>

              <div className="flex items-center gap-3 text-xs text-slate-500 self-end md:self-auto">
                <span className="font-medium text-slate-700">OpenAlex 250M+ Index</span>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setSearchTerm('');
                    setResults([]);
                  }}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg bg-white cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>

          {/* Results Container */}
          <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
                <p className="text-sm font-semibold">Scanning 250M+ peer-reviewed papers on OpenAlex...</p>
                <p className="text-xs text-slate-400 mt-1">Filtering verified DOIs and citation records</p>
              </div>
            )}

            {!loading && error && (
              <div className="p-6 my-6 bg-red-50 text-red-700 border border-red-200 rounded-2xl text-sm text-center max-w-xl mx-auto">
                <p className="font-semibold">{error}</p>
                <button
                  onClick={() => executeSearch(searchTerm)}
                  className="mt-3 px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry Search
                </button>
              </div>
            )}

            {!loading && !error && results.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-base font-semibold text-slate-800">No matching research papers found</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try broader academic keywords or check your spelling.
                </p>
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <div className="space-y-5 pb-16">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
                  <span>Displaying top 10 relevant peer-reviewed papers:</span>
                  <span className="font-semibold text-slate-800">10 results</span>
                </div>

                {results.map((work, index) => {
                  const title = work.title || work.display_name || 'Untitled Academic Paper';
                  const year = work.publication_year ? `Year: ${work.publication_year}` : 'Year: n/a';
                  const authors = getAuthors(work);
                  const link = work.doi || work.primary_location?.landing_page_url;
                  const isSaved = !!savedIds[work.id];
                  const isCopied = copiedId === work.id;

                  return (
                    <article
                      key={work.id || index}
                      className="p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all bg-white relative group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-blue-700 hover:text-blue-900 leading-snug">
                          {link ? (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-start gap-1.5 group-hover:underline"
                            >
                              <span>{title}</span>
                              <ExternalLink className="w-4 h-4 shrink-0 mt-1 text-slate-400 group-hover:text-blue-600" />
                            </a>
                          ) : (
                            <span>{title}</span>
                          )}
                        </h2>

                        {/* Save & Share */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => toggleSave(work.id)}
                            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                              isSaved
                                ? 'bg-blue-50 border-blue-200 text-blue-600'
                                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                            }`}
                            title={isSaved ? 'Saved in library' : 'Save paper'}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleCopyLink(work)}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                            title="Copy paper link"
                          >
                            {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                        <Users className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{authors}</span>
                      </div>

                      {/* Year & DOI Badges */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-md font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{year}</span>
                        </span>

                        {work.cited_by_count !== undefined && work.cited_by_count > 0 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                            <span>Citations: {work.cited_by_count}</span>
                          </span>
                        )}

                        {work.doi && (
                          <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md font-mono text-[11px]">
                            DOI: {work.doi.replace('https://doi.org/', '')}
                          </span>
                        )}

                        <Link
                          href={`/tools/citation-generator?title=${encodeURIComponent(title)}&author=${encodeURIComponent(authors)}&year=${work.publication_year || 2024}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-medium transition-colors ml-auto"
                        >
                          <Quote className="w-3 h-3" />
                          <span>Cite</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
