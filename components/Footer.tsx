import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Shield, Award, CheckCircle2, Heart } from 'lucide-react';

export default function Footer() {
  const CONTACT_EMAIL = 'abdmazn55@gmail.com';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Top Banner with Contact */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Need Academic Support or Custom Institution API?</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Global Researcher Response
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-400" /> OpenAlex Indexed (250M+ Papers)
            </span>
          </div>
        </div>
      </div>

      {/* Main 15 Pages Navigation Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Noor Scholar
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Noor Scholar is the next-generation open academic search engine indexing over 250 million research papers, scientific articles, and datasets with citation graphs and free research workflow tools.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              Direct Contact & Partnerships:{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-blue-400 underline hover:text-blue-300 font-medium"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Core Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Platform & Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  1. Academic Search (Home)
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  2. All Features & Architecture
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  3. Pricing & LemonSqueezy Pro
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  4. About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  5. Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Free Research Tools (5 tools) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Free Research Tools
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/tools/citation-generator" className="hover:text-white transition-colors">
                  6. Citation Generator (APA/MLA)
                </Link>
              </li>
              <li>
                <Link href="/tools/summarizer" className="hover:text-white transition-colors">
                  7. Research Paper Summarizer
                </Link>
              </li>
              <li>
                <Link href="/tools/paraphraser" className="hover:text-white transition-colors">
                  8. Academic Paraphraser
                </Link>
              </li>
              <li>
                <Link href="/tools/plagiarism-checker" className="hover:text-white transition-colors">
                  9. Plagiarism Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/translator" className="hover:text-white transition-colors">
                  10. Academic Translator
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog & Legal (5 pages) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Guides & Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  11. Academic Blog Index
                </Link>
              </li>
              <li>
                <Link href="/blog/best-google-scholar-alternatives-2026" className="hover:text-white transition-colors">
                  12. 10 Best Google Scholar Alt
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-cite-research-paper-apa" className="hover:text-white transition-colors">
                  13. How to Cite in APA 7th
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  14. Privacy Policy (GDPR/CCPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  15. Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Noor Scholar. All rights reserved. Powered by OpenAlex Open Science Index.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-slate-300">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
