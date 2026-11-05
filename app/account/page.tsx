import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { ArrowRight, CalendarDays, Clock, Compass, MapPin, Wallet } from 'lucide-react';
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { formatBucketDate, formatBucketPrice, formatBucketStatus } from '../../lib/bucketList';

export const instant = false;

export const metadata: Metadata = {
  title: 'My Bucket Lists - Beyond Forever Earth',
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  await connection();
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/create-the-bucketlist');
  }

  const bucketLists = await prisma.bucketList.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  const firstName = session.user.name?.trim().split(/\s+/)[0] ?? '';

  return (
    <div className="bg-[#FBFAF7]"> 
      <section className="relative overflow-hidden bg-[#081726] pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="https://vrfacwizigigcpowkrye.supabase.co/storage/v1/object/public/beyond/beyondbanner.jpeg"
            alt="A private island seen from above, surrounded by turquoise water"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04101b]/95 via-[#04101b]/70 to-[#04101b]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05131f] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#c59b67]" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-semibold text-[#c59b67] uppercase font-sans">
                  My Account
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
                {firstName ? `${firstName}’s ` : 'Your '}
                <span className="italic text-[#e8c697]">Bucket Lists</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                Every journey you have saved, waiting for the right moment. Open one to revisit the
                details or begin a new dream.
              </p>
            </div>

         
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-3 mb-7">
            <p className="text-[10px] sm:text-[11px] tracking-[0.26em] uppercase font-semibold text-stone-500">
              Saved journeys
            </p>
            <p className="text-xs text-stone-400">
              {bucketLists.length} {bucketLists.length === 1 ? 'bucket list' : 'bucket lists'}
            </p>
          </div>

          {bucketLists.length === 0 ? (
            <div className="rounded-2xl border border-stone-200/80 bg-white px-6 sm:px-10 py-14 sm:py-20 text-center shadow-[0_24px_60px_-48px_rgba(8,23,38,0.4)]">
              <div className="w-12 h-12 rounded-full border border-[#c59b67]/40 bg-[#c59b67]/10 flex items-center justify-center mx-auto">
                <Compass className="w-5 h-5 text-[#b68b55]" strokeWidth={1.75} />
              </div>
              <h2 className="mt-5 font-serif text-2xl sm:text-3xl text-[#081726] tracking-tight">
                No bucket lists yet
              </h2>
              <p className="mt-3 text-sm text-stone-500 leading-relaxed font-light max-w-md mx-auto">
                Choose a destination, pick your ten days and save the journey here for later.
              </p>
              <Link
                href="/create-the-bucketlist"
                className="mt-7 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#dfb27d] via-[#c59b67] to-[#b68b55] text-[#241a08] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-[0_6px_16px_-6px_rgba(197,155,103,0.55)]"
              >
                <span>Start Your Bucket List</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {bucketLists.map((item) => (
                <Link
                  key={item.id}
                  href={`/account/bucket-lists/${item.id}`}
                  className="group flex flex-col rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-[0_18px_40px_-36px_rgba(8,23,38,0.35)] hover:border-[#c59b67]/60 hover:shadow-[0_24px_50px_-32px_rgba(8,23,38,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b67] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-semibold text-[#b68b55] leading-snug">
                      {item.category}
                    </span>
                    <span className="shrink-0 rounded-full border border-[#c59b67]/30 bg-[#c59b67]/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#8a6a35]">
                      {formatBucketStatus(item.status)}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-2xl text-[#081726] tracking-tight leading-snug">
                    {item.destination}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-stone-400">
                    <MapPin className="w-3 h-3 shrink-0 text-[#c59b67]" />
                    {item.location}
                  </p>

                  <dl className="mt-5 space-y-2.5 text-[13px] text-stone-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 shrink-0 text-[#c59b67]" />
                      <dt className="sr-only">Dates</dt>
                      <dd>
                        {formatBucketDate(item.startDate)} – {formatBucketDate(item.endDate)}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-[#c59b67]" />
                      <dt className="sr-only">Duration</dt>
                      <dd>
                        {item.days} days · {item.days - 1} nights
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 shrink-0 text-[#c59b67]" />
                      <dt className="sr-only">Indicative price</dt>
                      <dd>From {formatBucketPrice(item.price)}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#081726]">
                      View details
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#c59b67] transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
