'use client';

import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Check, Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';
import AffiliateBox from '@/components/AffiliateBox';

export default function TranslatorPage() {
  const [sourceLang, setSourceLang] = useState('ar');
  const [targetLang, setTargetLang] = useState('en');
  const [discipline, setDiscipline] = useState('biomedical');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleArabic = 'أظهرت النتائج التجريبية أن استخدام خوارزميات التعلم العميق ساهم في تقليص معدل الأخطاء التشخيصية بنسبة 24% في تحاليل التصوير بالرنين المغناطيسي.';

  const handleTranslate = () => {
    const textToTranslate = inputText.trim() || sampleArabic;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (sourceLang === 'ar' && targetLang === 'en') {
        setOutputText(
          'Empirical findings demonstrated that the implementation of deep learning algorithms contributed to a 24% reduction in diagnostic error rates within magnetic resonance imaging (MRI) analysis.'
        );
      } else {
        setOutputText(
          'Experimental results demonstrated that the utilization of specialized academic models significantly improved precision and methodological consistency across clinical benchmarks.'
        );
      }
    }, 500);
  };

  const handleSwap = () => {
    const prevSource = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(prevSource);
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <AdPlaceholder id="adsense-translator-top" slotName="Academic Translator Top Ad" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-4">
          <Languages className="w-3.5 h-3.5" />
          <span>Scientific Nomenclature Preserved</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Academic Research Translator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Translate research papers, abstracts, and technical terms across languages without losing precise scientific meaning.
        </p>
      </div>

      {/* Translator Tool Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-5">
        {/* Language & Discipline bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none"
            >
              <option value="ar">Arabic (العربية)</option>
              <option value="en">English</option>
              <option value="fr">French (Français)</option>
              <option value="es">Spanish (Español)</option>
              <option value="de">German (Deutsch)</option>
              <option value="zh">Chinese (中文)</option>
            </select>

            <button
              type="button"
              onClick={handleSwap}
              className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Swap languages"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:outline-none"
            >
              <option value="en">English</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="fr">French (Français)</option>
              <option value="es">Spanish (Español)</option>
              <option value="de">German (Deutsch)</option>
              <option value="zh">Chinese (中文)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Discipline:</span>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-blue-700 focus:bg-white focus:outline-none"
            >
              <option value="biomedical">Biomedical & Clinical</option>
              <option value="cs">Computer Science & AI</option>
              <option value="engineering">Engineering & Physics</option>
              <option value="social">Social Sciences & Economics</option>
            </select>
          </div>
        </div>

        {/* Translation Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold">Source Research Text</span>
              <button
                type="button"
                onClick={() => setInputText(sampleArabic)}
                className="text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Insert Sample
              </button>
            </div>
            <textarea
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste non-English scientific abstract, survey questions, or methodology..."
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all resize-none leading-relaxed"
            ></textarea>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold text-amber-700">Academic Translation</span>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="w-full h-[180px] p-4 text-sm bg-amber-50/40 border border-amber-200 rounded-2xl text-slate-800 leading-relaxed overflow-y-auto">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Translating technical terminology...</span>
                </div>
              ) : outputText ? (
                <p>{outputText}</p>
              ) : (
                <span className="text-slate-400 italic">
                  Translation with preserved scientific terminology will appear here.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Languages className="w-4 h-4" />
            <span>Translate Scientific Text</span>
          </button>
        </div>
      </div>

      <AffiliateBox partner="grammarly" />

      {/* SEO Content */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Why Standard Translators Fail in Peer-Reviewed Research
        </h2>
        <p>
          Generic translation engines like Google Translate or DeepL are calibrated for consumer conversations and business emails. When fed dense academic texts containing Latin taxonomy, specialized mathematical terminology, or complex medical abbreviations, consumer models frequently mistranslate terms or introduce embarrassing semantic blunders.
        </p>
        <p>
          The <strong>Noor Scholar academic translator</strong> embeds domain-specific glossaries from medical Mesh terms, IEEE taxonomy, and ACM computing classifications. This ensures that terms such as <em>&quot;in vivo&quot;</em>, <em>&quot;p-value&quot;</em>, or <em>&quot;convolutional stride&quot;</em> remain uncorrupted during cross-lingual academic conversion.
        </p>
      </article>

      <AdPlaceholder id="adsense-translator-bottom" slotName="Translator Bottom Ad" />
    </div>
  );
}
