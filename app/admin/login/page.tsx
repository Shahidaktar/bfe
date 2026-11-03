import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { auth } from '../../../lib/auth';
import { isAdminSession } from '../../../lib/admin';
import { AdminLoginForm } from '../../../components/admin/AdminLoginForm';


export const metadata: Metadata = {
  title: 'Admin Sign In - Beyond Forever Earth',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  await connection();
  const session = await auth();
  if (isAdminSession(session)) redirect('/admin/travel-quotes');

  return (
    <div className="min-h-screen bg-[#05131f] flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-[#c59b67]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[420px] h-[420px] bg-[#0c2238]/60 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-7 sm:p-9">
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.28em] text-[#c59b67] uppercase font-semibold font-sans block mb-2">
            Beyond Admin
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#081726] font-normal tracking-tight">
            Sign In
          </h1>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
