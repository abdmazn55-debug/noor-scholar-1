import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign In & Create Account - Noor Scholar',
  description: 'Sign in to Noor Scholar to access your saved literature, citations, and research library.',
  keywords: ['Noor Scholar login', 'academic account', 'ORCID sign in'],
};

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-sm mb-4">
          <BookOpen className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Noor Scholar Academic Account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Save your literature reviews, track citation alerts, and export BibTeX libraries.
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
