'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.52 12.27c0-.79-.07-1.55-.2-2.27H12v4.31h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.26-2.09 3.59-5.16 3.59-8.66z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.87-3c-1.08.72-2.45 1.14-4.07 1.14-3.12 0-5.76-2.11-6.7-4.94H1.34v3.09A11.99 11.99 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.34a12 12 0 0 1 0 10.76l3.96-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.35.6 4.6 1.8l3.43-3.43C16.95 1.25 14.24 0 12 0 7.19 0 2.99 3.12 1.34 7.62l3.96 3.09c.94-2.83 3.58-4.94 6.7-4.94z"
    />
  </svg>
);

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn('google', { redirectTo: window.location.href });
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden font-sans"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-5 bg-[#081726] text-white flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c59b67] uppercase font-semibold block mb-0.5">
              MEMBERS
            </span>
            <h3 className="font-serif text-xl font-normal text-white">
              Create Your Account
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs text-stone-600 leading-relaxed mb-6">
            Save your itineraries, track enquiry status, and unlock member-only
            journeys. Sign in with your Google account to get started in seconds.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-300 hover:border-[#c59b67] hover:bg-stone-50 text-stone-900 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-wait"
          >
            <GoogleIcon />
            <span>{loading ? 'Redirecting…' : 'Login with Google'}</span>
          </button>

          <p className="mt-5 text-[10px] text-stone-400 text-center leading-relaxed">
            By continuing you agree to our privacy policy and terms.
          </p>
        </div>
      </div>
    </div>
  );
};
