import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { auth } from '../../../lib/auth';
import { isAdminSession } from '../../../lib/admin';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { AdminSignOutButton } from '../../../components/admin/AdminSignOutButton';

export const instant = false;


export const metadata = {
  title: 'Beyond Admin - Travel Quotes',
  robots: { index: false, follow: false },
};

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await auth();
  if (!isAdminSession(session)) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-[#f5f2eb] flex flex-col lg:flex-row">
      {/* Left sidebar */}
      <aside className="w-full lg:w-64 xl:w-72 shrink-0 bg-[#081726] text-white flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 lg:py-6 border-b border-white/10">
          <Link
            href="/admin/travel-quotes"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] rounded-sm"
            aria-label="Beyond Admin home"
          >
            <span className="w-3 h-3 rounded-full bg-[#c59b67] shrink-0" aria-hidden="true" />
            <span className="font-serif text-sm sm:text-base tracking-[0.18em] uppercase text-white">
              Beyond <span className="text-[#e8c697]">Admin</span>
            </span>
          </Link>

          {/* Mobile sign-out */}
          <div className="lg:hidden">
            <AdminSignOutButton />
          </div>
        </div>

        <p className="hidden lg:block px-6 pt-6 pb-2 text-[9px] tracking-[0.28em] uppercase text-stone-500 font-semibold">
          Menu
        </p>

        <div className="pb-3 pt-2 lg:pt-0 lg:pb-0 lg:flex-1 lg:overflow-y-auto">
          <AdminSidebar />
        </div>

        {/* Desktop sidebar footer */}
        <div className="hidden lg:block border-t border-white/10 px-6 py-5">
          <p className="text-[9px] tracking-[0.22em] uppercase text-stone-500 font-semibold mb-1.5">
            Signed In As
          </p>
          <p className="text-xs text-stone-300 break-all leading-relaxed">{session?.user?.email}</p>
          <div className="mt-3">
            <AdminSignOutButton />
          </div>
        </div>
      </aside>

      {/* Right content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
