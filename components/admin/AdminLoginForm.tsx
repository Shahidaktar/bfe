'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) {
        setError('Invalid email or password.');
        return;
      }
      router.push('/admin/travel-quotes');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="block text-xs font-semibold text-stone-700 mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@beyondforever.earth"
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="admin-password" className="block text-xs font-semibold text-stone-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c59b67] transition-colors"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c59b67] hover:bg-[#b68b55] disabled:opacity-60 disabled:cursor-wait text-[#081726] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all shadow-md cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing In…</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-stone-400 text-center leading-relaxed">
        Authorised personnel only.
      </p>
    </form>
  );
};
