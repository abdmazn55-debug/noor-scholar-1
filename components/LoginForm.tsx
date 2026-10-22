'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function LoginForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PhD Candidate / Researcher',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(
        mode === 'login'
          ? 'Successfully signed in! Welcome back to Noor Scholar.'
          : 'Account created successfully! Your researcher profile is now active.'
      );
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Switcher Tab */}
      <div className="flex p-1 mb-8 bg-slate-100 rounded-2xl">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setSuccess(null);
          }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setSuccess(null);
          }}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Create Free Account
        </button>
      </div>

      {success ? (
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{success}</h3>
          <p className="text-sm text-slate-500">
            You can now search, bookmark, and export citations across 250M+ academic papers.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <span>Go to Academic Search</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {/* Social Sign-in */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setSuccess('Signed in with Google!');
                }, 500);
              }}
              className="w-full h-11 flex items-center justify-center gap-3 px-4 border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setSuccess('Signed in with ORCID Researcher ID!');
                }, 500);
              }}
              className="w-full h-11 flex items-center justify-center gap-2 px-4 border border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 text-xs font-semibold text-emerald-800 rounded-xl transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold">iD</span>
              <span>Sign in with ORCID</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400">or with academic email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Alexander Wright"
                    className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Institutional / University Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="a.wright@cam.ac.uk"
                  className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Academic Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="PhD Candidate / Researcher">PhD Candidate / Researcher</option>
                  <option value="Professor / Faculty Member">Professor / Faculty Member</option>
                  <option value="Graduate Student (Master's)">Graduate Student (Master&apos;s)</option>
                  <option value="Undergraduate Student">Undergraduate Student</option>
                  <option value="Independent Scientist">Independent Scientist</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {loading ? <span>Authenticating...</span> : <span>{mode === 'login' ? 'Sign In to Account' : 'Create Researcher Profile'}</span>}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
