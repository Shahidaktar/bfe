'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export const AdminSignOutButton: React.FC = () => {
  return (
    <button
      onClick={() => signOut({ redirectTo: '/admin/login' })}
      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-white/20 hover:border-[#c59b67] hover:text-[#e8c697] text-stone-300 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-colors cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
};
